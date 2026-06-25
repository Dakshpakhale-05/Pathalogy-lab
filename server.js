 const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));

// Error handling middleware for JSON parsings errors
app.use((err, req, res, next) => {
    if (err) {
        console.error('Express Parser Error:', err);
        return res.status(err.status || 500).json({ error: err.message || 'Payload parsing error' });
    }
    next();
});

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Disable caching for API requests to ensure real-time catalog edits display instantly
app.use('/api', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

// Serve static assets from the current directory
app.use(express.static(__dirname));

// Database paths
const USERS_PATH = path.join(__dirname, 'db', 'users.json');
const BOOKINGS_PATH = path.join(__dirname, 'db', 'bookings.json');
const PRESCRIPTIONS_PATH = path.join(__dirname, 'db', 'prescriptions.json');
const REPORTS_PATH = path.join(__dirname, 'db', 'reports.json');
const CATALOG_PATH = path.join(__dirname, 'db', 'catalog.json');
const SEARCHES_PATH = path.join(__dirname, 'db', 'searches.json');

// In-memory OTP storage (phone -> { otp, name, timestamp })
const otpStore = {};

// Helper functions for reading/writing database JSON files
function readDb(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify(filePath.endsWith('reports.json') ? {} : []));
        }
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data || (filePath.endsWith('reports.json') ? '{}' : '[]'));
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
        return filePath.endsWith('reports.json') ? {} : [];
    }
}

function writeDb(filePath, content) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error(`Error writing to ${filePath}:`, error);
        return false;
    }
}

// ==========================================
// API ENDPOINTS
// ==========================================

// 1. AUTHENTICATION

// OTP-Based Authentication for Patients
app.post('/api/auth/send-otp', (req, res) => {
    const { name, phone } = req.body;
    if (!name || !phone) {
        return res.status(400).json({ error: 'Name and Phone Number are required' });
    }

    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (!/^\d{10}$/.test(cleanPhone)) {
        return res.status(400).json({ error: 'Please enter a valid 10-digit phone number' });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store in-memory with timestamp
    otpStore[cleanPhone] = {
        otp,
        name: cleanName,
        timestamp: Date.now()
    };

    // Return success along with the OTP (for UI simulation)
    res.status(200).json({
        message: 'OTP sent successfully',
        phone: cleanPhone,
        otp: otp
    });
});

app.post('/api/auth/verify-otp', (req, res) => {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
        return res.status(400).json({ error: 'Phone number and OTP are required' });
    }

    const cleanPhone = phone.trim();
    const cleanOtp = otp.trim();

    const record = otpStore[cleanPhone];
    if (!record) {
        return res.status(400).json({ error: 'No OTP requested for this phone number' });
    }

    // OTP expires in 5 minutes
    if (Date.now() - record.timestamp > 5 * 60 * 1000) {
        delete otpStore[cleanPhone];
        return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    }

    if (record.otp !== cleanOtp) {
        return res.status(400).json({ error: 'Invalid OTP code. Please try again.' });
    }

    // OTP is valid! Find or create user
    const users = readDb(USERS_PATH);
    let matchedUser = users.find(u => u.phone === cleanPhone);

    if (!matchedUser) {
        // Automatically register new user
        const generatedEmail = `${cleanPhone}@accurapath.com`;
        matchedUser = {
            name: record.name,
            email: generatedEmail,
            phone: cleanPhone,
            pass: '' // No password needed for OTP login
        };
        users.push(matchedUser);
        writeDb(USERS_PATH, users);
    }

    // Clean up OTP store
    delete otpStore[cleanPhone];

    res.status(200).json({
        message: 'Login successful',
        user: { name: matchedUser.name, email: matchedUser.email, phone: matchedUser.phone }
    });
});

app.post('/api/auth/register', (req, res) => {
    const { name, email, phone, pass } = req.body;
    if (!name || !email || !phone || !pass) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const users = readDb(USERS_PATH);
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        return res.status(400).json({ error: 'Email is already registered' });
    }

    const newUser = { name, email, phone, pass };
    users.push(newUser);
    writeDb(USERS_PATH, users);

    res.status(201).json({ message: 'Registration successful', user: { name, email, phone } });
});

app.post('/api/auth/login', (req, res) => {
    const { email, pass } = req.body;
    if (!email || !pass) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const users = readDb(USERS_PATH);
    const matchedUser = users.find(u => 
        (u.email.toLowerCase() === email.toLowerCase() || u.phone === email) && 
        u.pass === pass
    );

    if (!matchedUser) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({
        message: 'Login successful',
        user: { name: matchedUser.name, email: matchedUser.email, phone: matchedUser.phone }
    });
});

app.post('/api/auth/reset', (req, res) => {
    const { identity, newPass } = req.body;
    if (!identity || !newPass) {
        return res.status(400).json({ error: 'Email/Phone and New Password are required' });
    }

    const users = readDb(USERS_PATH);
    const userIndex = users.findIndex(u => 
        (u.email && u.email.toLowerCase() === identity.toLowerCase()) || 
        (u.phone && u.phone === identity)
    );

    if (userIndex === -1) {
        return res.status(404).json({ error: 'No account found with this Email or Phone Number' });
    }

    // Update password
    users[userIndex].pass = newPass;
    writeDb(USERS_PATH, users);

    res.status(200).json({ message: 'Password reset successful' });
});

app.post('/api/auth/admin-login', (req, res) => {
    const { identity, pass } = req.body;
    if (!identity || !pass) {
        return res.status(400).json({ error: 'Email/Phone and Password are required' });
    }

    const adminEmail = '909mehulbichpuriya@gmail.com';
    const adminPhone = '9644306633';

    if (identity.toLowerCase() !== adminEmail.toLowerCase() && identity !== adminPhone) {
        return res.status(401).json({ error: 'Access denied. Only the administrator account can log in here.' });
    }

    const users = readDb(USERS_PATH);
    const adminUser = users.find(u => 
        (u.email.toLowerCase() === adminEmail.toLowerCase() || u.phone === adminPhone) && 
        u.pass === pass
    );

    if (!adminUser) {
        return res.status(401).json({ error: 'Invalid password.' });
    }

    res.status(200).json({ message: 'Admin login successful' });
});

// 2. BOOKINGS
app.get('/api/bookings', (req, res) => {
    const bookings = readDb(BOOKINGS_PATH);
    res.json(bookings);
});

app.post('/api/bookings', (req, res) => {
    const booking = req.body;
    if (!booking || !booking.patientName || !booking.patientPhone) {
        return res.status(400).json({ error: 'Invalid booking data' });
    }

    const bookings = readDb(BOOKINGS_PATH);
    // Enforce default phlebotomist to Mehul Bichpuriya (9303831588)
    booking.phlebotomist = 'Mehul Bichpuriya';
    bookings.push(booking);
    writeDb(BOOKINGS_PATH, bookings);

    res.status(201).json({ message: 'Booking successful', booking });
});

app.put('/api/bookings/:id', (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    const bookings = readDb(BOOKINGS_PATH);
    const bIndex = bookings.findIndex(b => b.id === id);

    if (bIndex === -1) {
        return res.status(404).json({ error: 'Booking not found' });
    }

    // List of allowed fields to update
    const allowedFields = [
        'patientName', 'patientAge', 'patientGender', 'patientPhone', 
        'patientAddress', 'slotDate', 'slotTime', 'items', 'totalPrice', 
        'status', 'phlebotomist'
    ];

    for (const field of allowedFields) {
        if (updateFields[field] !== undefined) {
            bookings[bIndex][field] = updateFields[field];
        }
    }

    writeDb(BOOKINGS_PATH, bookings);
    res.json({ message: 'Booking updated successfully', booking: bookings[bIndex] });
});

app.delete('/api/bookings/:id', (req, res) => {
    const { id } = req.params;
    const bookings = readDb(BOOKINGS_PATH);
    const bIndex = bookings.findIndex(b => b.id === id);

    if (bIndex === -1) {
        return res.status(404).json({ error: 'Booking not found' });
    }

    // Remove booking
    bookings.splice(bIndex, 1);
    writeDb(BOOKINGS_PATH, bookings);

    // Clean up associated report if it exists
    const reports = readDb(REPORTS_PATH);
    for (const reportCode of Object.keys(reports)) {
        if (reports[reportCode].bookingId === id) {
            delete reports[reportCode];
        }
    }
    writeDb(REPORTS_PATH, reports);

    res.json({ message: 'Booking deleted successfully' });
});

// 3. PRESCRIPTIONS
app.get('/api/prescriptions', (req, res) => {
    const prescriptions = readDb(PRESCRIPTIONS_PATH);
    res.json(prescriptions);
});

app.post('/api/prescriptions', (req, res) => {
    const prescription = req.body;
    if (!prescription || !prescription.name || !prescription.phone) {
        return res.status(400).json({ error: 'Invalid prescription data' });
    }

    const prescriptions = readDb(PRESCRIPTIONS_PATH);
    prescriptions.push(prescription);
    writeDb(PRESCRIPTIONS_PATH, prescriptions);

    res.status(201).json({ message: 'Prescription uploaded', prescription });
});

app.put('/api/prescriptions/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const prescriptions = readDb(PRESCRIPTIONS_PATH);
    const pIndex = prescriptions.findIndex(p => p.id === id);

    if (pIndex === -1) {
        return res.status(404).json({ error: 'Prescription not found' });
    }

    if (status) prescriptions[pIndex].status = status;

    writeDb(PRESCRIPTIONS_PATH, prescriptions);
    res.json({ message: 'Prescription updated successfully', prescription: prescriptions[pIndex] });
});

// 4. REPORTS
app.get('/api/reports/:id', (req, res) => {
    const { id } = req.params;
    const userEmail = req.query.userEmail;
    const reports = readDb(REPORTS_PATH);

    const report = reports[id.toUpperCase()];
    if (!report) {
        return res.status(404).json({ error: 'Report not found' });
    }

    // Secure reports: Check if report belongs to user.
    // Skip protection for mock demo reports LC-101 and LC-102 so they stay available.
    const upperId = id.toUpperCase();
    if (upperId !== 'LC-101' && upperId !== 'LC-102') {
        const bookings = readDb(BOOKINGS_PATH);
        const booking = bookings.find(b => b.id === report.bookingId);
        
        if (booking) {
            // Check if the booking belongs to this email
            if (!userEmail || booking.userEmail.toLowerCase() !== userEmail.toLowerCase()) {
                return res.status(403).json({ error: 'Access denied. This report belongs to a different patient account.' });
            }
        }
    }

    res.json(report);
});

app.post('/api/reports', (req, res) => {
    const { reportCode, reportData } = req.body;
    if (!reportCode || !reportData) {
        return res.status(400).json({ error: 'Invalid report data' });
    }

    const reports = readDb(REPORTS_PATH);
    reports[reportCode.toUpperCase()] = reportData;
    writeDb(REPORTS_PATH, reports);

    // Automatically change booking status to 'ready' if compiled
    if (reportData.bookingId) {
        const bookings = readDb(BOOKINGS_PATH);
        const bIndex = bookings.findIndex(b => b.id === reportData.bookingId);
        if (bIndex !== -1) {
            bookings[bIndex].status = 'ready';
            bookings[bIndex].reportCode = reportCode;
            writeDb(BOOKINGS_PATH, bookings);
        }
    }

    res.status(201).json({ message: 'Report generated successfully', report: reportData });
});

// 5. CATALOG (PACKAGES & TESTS)
app.get('/api/catalog', (req, res) => {
    const catalog = readDb(CATALOG_PATH);
    res.json(catalog);
});

app.put('/api/catalog/package/:id', (req, res) => {
    const { id } = req.params;
    const updatedPackage = req.body;
    
    const catalog = readDb(CATALOG_PATH);
    const pIndex = catalog.packages.findIndex(p => p.id === id);
    
    if (pIndex === -1) {
        return res.status(404).json({ error: 'Package not found' });
    }
    
    // Update package fields
    if (updatedPackage.name) catalog.packages[pIndex].name = updatedPackage.name;
    if (updatedPackage.price !== undefined) catalog.packages[pIndex].price = parseInt(updatedPackage.price);
    if (updatedPackage.originalPrice !== undefined) catalog.packages[pIndex].originalPrice = parseInt(updatedPackage.originalPrice);
    if (updatedPackage.parameters !== undefined) catalog.packages[pIndex].parameters = parseInt(updatedPackage.parameters);
    if (updatedPackage.tag) catalog.packages[pIndex].tag = updatedPackage.tag;
    if (updatedPackage.tests) catalog.packages[pIndex].tests = updatedPackage.tests;
    
    writeDb(CATALOG_PATH, catalog);
    res.json({ message: 'Package updated successfully', package: catalog.packages[pIndex] });
});

app.put('/api/catalog/test/:id', (req, res) => {
    const { id } = req.params;
    const updatedTest = req.body;
    
    const catalog = readDb(CATALOG_PATH);
    const tIndex = catalog.tests.findIndex(t => t.id === id);
    
    if (tIndex === -1) {
        return res.status(404).json({ error: 'Test not found' });
    }
    
    // Update test fields
    if (updatedTest.name) catalog.tests[tIndex].name = updatedTest.name;
    if (updatedTest.price !== undefined) catalog.tests[tIndex].price = parseInt(updatedTest.price);
    if (updatedTest.code) catalog.tests[tIndex].code = updatedTest.code;
    if (updatedTest.prep) catalog.tests[tIndex].prep = updatedTest.prep;
    if (updatedTest.sample) catalog.tests[tIndex].sample = updatedTest.sample;
    if (updatedTest.time) catalog.tests[tIndex].time = updatedTest.time;
    
    writeDb(CATALOG_PATH, catalog);
    res.json({ message: 'Test updated successfully', test: catalog.tests[tIndex] });
});

app.post('/api/catalog/test', (req, res) => {
    const newTest = req.body;
    if (!newTest || !newTest.name || !newTest.price) {
        return res.status(400).json({ error: 'Invalid test data' });
    }
    
    const catalog = readDb(CATALOG_PATH);
    // Auto-generate test ID (e.g. T-07, T-08)
    const nextIdNum = catalog.tests.reduce((max, t) => {
        const idNum = parseInt(t.id.replace('T-', '')) || 0;
        return idNum > max ? idNum : max;
    }, 0) + 1;
    const newId = `T-${nextIdNum < 10 ? '0' + nextIdNum : nextIdNum}`;
    
    const testRecord = {
        id: newId,
        name: newTest.name,
        price: parseInt(newTest.price),
        code: newTest.code || newId,
        prep: newTest.prep || 'No fasting required',
        sample: newTest.sample || 'Blood',
        time: newTest.time || '24 Hours'
    };
    
    catalog.tests.push(testRecord);
    writeDb(CATALOG_PATH, catalog);
    res.status(201).json({ message: 'Test added successfully', test: testRecord });
});

app.post('/api/catalog/package', (req, res) => {
    const newPkg = req.body;
    if (!newPkg || !newPkg.name || !newPkg.price) {
        return res.status(400).json({ error: 'Invalid package data' });
    }
    
    const catalog = readDb(CATALOG_PATH);
    // Auto-generate package ID (e.g. SF-04, SF-05)
    const nextIdNum = catalog.packages.reduce((max, p) => {
        const idNum = parseInt(p.id.replace('SF-', '')) || 0;
        return idNum > max ? idNum : max;
    }, 0) + 1;
    const newId = `SF-${nextIdNum < 10 ? '0' + nextIdNum : nextIdNum}`;
    
    const packageRecord = {
        id: newId,
        name: newPkg.name,
        tag: newPkg.tag || 'Popular Package',
        parameters: parseInt(newPkg.parameters) || 0,
        price: parseInt(newPkg.price),
        originalPrice: parseInt(newPkg.originalPrice) || parseInt(newPkg.price) * 2,
        tests: Array.isArray(newPkg.tests) ? newPkg.tests : []
    };
    
    catalog.packages.push(packageRecord);
    writeDb(CATALOG_PATH, catalog);
    res.status(201).json({ message: 'Package added successfully', package: packageRecord });
});

app.delete('/api/catalog/package/:id', (req, res) => {
    const { id } = req.params;
    const catalog = readDb(CATALOG_PATH);
    const pIndex = catalog.packages.findIndex(p => p.id === id);
    
    if (pIndex === -1) {
        return res.status(404).json({ error: 'Package not found' });
    }
    
    catalog.packages.splice(pIndex, 1);
    writeDb(CATALOG_PATH, catalog);
    res.json({ message: 'Package deleted successfully' });
});

app.delete('/api/catalog/test/:id', (req, res) => {
    const { id } = req.params;
    const catalog = readDb(CATALOG_PATH);
    const tIndex = catalog.tests.findIndex(t => t.id === id);
    
    if (tIndex === -1) {
        return res.status(404).json({ error: 'Test not found' });
    }
    
    catalog.tests.splice(tIndex, 1);
    writeDb(CATALOG_PATH, catalog);
    res.json({ message: 'Test deleted successfully' });
});

// 6. CUSTOMER REGISTRY & SEARCH LOGGER
app.post('/api/user-searches', (req, res) => {
    const { query, email } = req.body;
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    const searches = readDb(SEARCHES_PATH);
    
    // Auto-generate search ID (S-01, S-02)
    const nextIdNum = searches.reduce((max, s) => {
        const idNum = parseInt(s.id.replace('S-', '')) || 0;
        return idNum > max ? idNum : max;
    }, 0) + 1;
    const newId = `S-${nextIdNum < 10 ? '0' + nextIdNum : nextIdNum}`;

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const searchEntry = {
        id: newId,
        email: email || 'guest',
        query: query.trim(),
        timestamp
    };

    searches.push(searchEntry);
    writeDb(SEARCHES_PATH, searches);
    res.status(201).json({ message: 'Search query logged successfully', search: searchEntry });
});

app.get('/api/admin/customers', (req, res) => {
    const users = readDb(USERS_PATH);
    res.json(users);
});

app.get('/api/admin/searches', (req, res) => {
    const searches = readDb(SEARCHES_PATH);
    res.json(searches);
});

app.delete('/api/admin/customers/:email', (req, res) => {
    const { email } = req.params;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const adminEmail = '909mehulbichpuriya@gmail.com';
    if (email.toLowerCase() === adminEmail.toLowerCase()) {
        return res.status(400).json({ error: 'Cannot delete the administrator account' });
    }

    const users = readDb(USERS_PATH);
    const uIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());

    if (uIndex === -1) {
        return res.status(404).json({ error: 'Customer account not found' });
    }

    // Remove user
    users.splice(uIndex, 1);
    writeDb(USERS_PATH, users);

    // Clean up searches belonging to this user
    const searches = readDb(SEARCHES_PATH);
    const updatedSearches = searches.filter(s => s.email.toLowerCase() !== email.toLowerCase());
    writeDb(SEARCHES_PATH, updatedSearches);

    res.json({ message: 'Customer account deleted successfully' });
});

app.delete('/api/admin/searches/:id', (req, res) => {
    const { id } = req.params;
    const searches = readDb(SEARCHES_PATH);
    const sIndex = searches.findIndex(s => s.id === id);

    if (sIndex === -1) {
        return res.status(404).json({ error: 'Search log entry not found' });
    }

    // Remove search log
    searches.splice(sIndex, 1);
    writeDb(SEARCHES_PATH, searches);

    res.json({ message: 'Search log entry deleted successfully' });
});

// Serve index.html for main route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start listening
app.listen(PORT, () => {
    // Determine local network IP address
    const networkInterfaces = os.networkInterfaces();
    let localIp = 'localhost';
    
    for (const name of Object.keys(networkInterfaces)) {
        for (const net of networkInterfaces[name]) {
            // Skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            if (net.family === 'IPv4' && !net.internal) {
                localIp = net.address;
            }
        }
    }

    console.log(`=======================================================`);
    console.log(`AccuraPath Lab Diagnostics Backend Server is running!`);
    console.log(`Local Access: http://localhost:${PORT}`);
    console.log(`Wi-Fi Network Access (Mobile/Laptop): http://${localIp}:${PORT}`);
    console.log(`=======================================================`);
});
