// Test and Package Database
let database = {
    packages: [
        {
            id: 'SF-01',
            name: 'Swasthfit Super Active Full Body Checkup',
            tag: 'Popular Package',
            parameters: 82,
            price: 1499,
            originalPrice: 2999,
            tests: [
                'Complete Blood Count (CBC) - 24 parameters',
                'Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)',
                'Liver Function Test (LFT) - 11 parameters',
                'Kidney Function Test (KFT) - 8 parameters',
                'Thyroid Profile (T3, T4, TSH)',
                'HbA1c (Average Blood Sugar)',
                'Vitamin D & Vitamin B12',
                'Urine Routine Analysis - 18 parameters'
            ]
        },
        {
            id: 'SF-02',
            name: 'Swasthfit Complete Care Package',
            tag: 'Essential Care',
            parameters: 56,
            price: 999,
            originalPrice: 1999,
            tests: [
                'Complete Blood Count (CBC)',
                'Diabetes Screening (Fasting Blood Sugar)',
                'Cholesterol Profile',
                'Kidney Panel (Urea, Creatinine)',
                'Thyroid Profile (TSH)',
                'Urine Routine Analysis'
            ]
        },
        {
            id: 'SF-03',
            name: 'Senior Citizen Advanced Health Package',
            tag: 'Specialized Care',
            parameters: 74,
            price: 1999,
            originalPrice: 3999,
            tests: [
                'Complete Blood Count (CBC)',
                'Lipid Profile (Heart Risk Assessment)',
                'Liver Function Panel',
                'Kidney Function Panel',
                'HbA1c & Fasting Glucose',
                'Rheumatoid Factor (RA) & Bone Health',
                'Calcium & Uric Acid',
                'PSA (For Men) / Thyroid Profile (For Women)'
            ]
        }
    ],
    tests: [
        {
            id: 'T-01',
            name: 'Complete Blood Count (CBC)',
            code: 'CBC',
            prep: 'No fasting required',
            sample: 'Blood (EDTA)',
            time: '12 Hours',
            price: 349
        },
        {
            id: 'T-02',
            name: 'Thyroid Profile (T3, T4, TSH)',
            code: 'THYROID',
            prep: 'Fasting preferred but not mandatory',
            sample: 'Blood (Serum)',
            time: '12 Hours',
            price: 499
        },
        {
            id: 'T-03',
            name: 'HbA1c (Glycated Haemoglobin)',
            code: 'HBA1C',
            prep: 'No fasting required',
            sample: 'Blood (EDTA)',
            time: '12 Hours',
            price: 399
        },
        {
            id: 'T-04',
            name: 'Lipid Profile (Cholesterol Panel)',
            code: 'LIPID',
            prep: '10-12 hours fasting mandatory',
            sample: 'Blood (Serum)',
            time: '12 Hours',
            price: 549
        },
        {
            id: 'T-05',
            name: 'Vitamin D (25-Hydroxy)',
            code: 'VITD',
            prep: 'No fasting required',
            sample: 'Blood (Serum)',
            time: '24 Hours',
            price: 699
        },
        {
            id: 'T-06',
            name: 'Diabetes Screening (Fasting & PP)',
            code: 'DIABETES',
            prep: 'Fasting (8-10 hrs) & 2 hrs Post Meal samples',
            sample: 'Blood (Sodium Fluoride)',
            time: '12 Hours',
            price: 249
        }
    ]
};

// Mock Reports Database
const mockReports = {
    'LC-101': {
        patient: {
            name: 'Aditya Sharma',
            age: '42',
            gender: 'Male',
            date: '16-Jun-2026',
            refBy: 'Dr. R. K. Gupta, MD'
        },
        results: [
            {
                category: 'Diabetes Screening',
                tests: [
                    { name: 'Fasting Blood Glucose', value: 104, unit: 'mg/dL', min: 70, max: 100, status: 'borderline' },
                    { name: 'HbA1c (Average Sugar)', value: 5.8, unit: '%', min: 4.0, max: 5.6, status: 'borderline' }
                ]
            },
            {
                category: 'Lipid Profile',
                tests: [
                    { name: 'Total Cholesterol', value: 212, unit: 'mg/dL', min: 100, max: 200, status: 'high' },
                    { name: 'HDL Cholesterol (Good)', value: 45, unit: 'mg/dL', min: 40, max: 60, status: 'normal' },
                    { name: 'LDL Cholesterol (Bad)', value: 138, unit: 'mg/dL', min: 50, max: 100, status: 'high' },
                    { name: 'Triglycerides', value: 145, unit: 'mg/dL', min: 50, max: 150, status: 'normal' }
                ]
            },
            {
                category: 'Complete Blood Count (CBC)',
                tests: [
                    { name: 'Haemoglobin', value: 14.8, unit: 'g/dL', min: 13.0, max: 17.0, status: 'normal' },
                    { name: 'White Blood Cell Count', value: 6800, unit: '/cumm', min: 4000, max: 11000, status: 'normal' },
                    { name: 'Platelet Count', value: 245000, unit: '/cumm', min: 150000, max: 450000, status: 'normal' }
                ]
            }
        ],
        advice: 'Patient shows borderline fasting glucose and mildly elevated LDL cholesterol levels. Lifestyle modification recommended: reduce saturated fat intake, engage in 30 minutes of cardio daily, and retest in 3 months. Consult physician for personalized medical advice.'
    },
    'LC-102': {
        patient: {
            name: 'Priya Patel',
            age: '29',
            gender: 'Female',
            date: '15-Jun-2026',
            refBy: 'Dr. Sunita Sen, MS'
        },
        results: [
            {
                category: 'Thyroid Function',
                tests: [
                    { name: 'TSH (Thyroid Stimulating Hormone)', value: 4.8, unit: 'uIU/mL', min: 0.4, max: 4.2, status: 'high' },
                    { name: 'Free T3', value: 2.9, unit: 'pg/mL', min: 2.0, max: 4.4, status: 'normal' },
                    { name: 'Free T4', value: 1.1, unit: 'ng/dL', min: 0.8, max: 2.0, status: 'normal' }
                ]
            },
            {
                category: 'Vitamins Profile',
                tests: [
                    { name: 'Vitamin D (25-Hydroxy)', value: 18, unit: 'ng/mL', min: 30, max: 100, status: 'high' }, // low in reality but high flag simulates warning/red
                    { name: 'Vitamin B12', value: 290, unit: 'pg/mL', min: 211, max: 911, status: 'normal' }
                ]
            }
        ],
        advice: 'TSH is slightly elevated (mild hypothyroidism potential). Vitamin D is deficient (<20 ng/mL). Daily Vitamin D3 supplementation (60k IU weekly for 8 weeks) is advised under physician supervision. Re-evaluate thyroid panel in 6 weeks.'
    }
};

// Global State
let cart = [];
let checkoutStep = 1;
let selectedGender = 'Male';
let selectedSlot = '';
let activeCoupon = null;

// Persistent Database State
let users = JSON.parse(localStorage.getItem('users') || '[]');
let currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
let prescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');

// Merge mockReports with localStorage reports
if (!localStorage.getItem('reports')) {
    localStorage.setItem('reports', JSON.stringify(mockReports));
}
let reports = JSON.parse(localStorage.getItem('reports') || '{}');

// DOM Load
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

async function initApp() {
    // Load catalog dynamically from backend database
    try {
        const catRes = await fetch('/api/catalog');
        if (catRes.ok) {
            database = await catRes.json();
        }
    } catch (e) {
        console.error("Failed to load catalog from server, using local fallback", e);
    }

    // Load cart from localStorage
    cart = JSON.parse(localStorage.getItem('cart') || '[]');

    renderPackages();
    renderTests();
    setupEventListeners();
    setupTestimonials();
    setupCartCounter();
    updateCartDisplay();
    updateUserWidgetState(); // Setup auth header state

    // Auto-open admin portal if logged in
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        const workspace = document.getElementById('admin-workspace');
        if (workspace) {
            workspace.classList.add('active');
            loadAdminDashboard();
            initAdminNotifications();
        }
    }
}

// Render Featured Packages
function renderPackages() {
    const grid = document.getElementById('packages-grid');
    if (!grid) return;
    
    grid.innerHTML = database.packages.map(pkg => `
        <div class="package-card" data-id="${pkg.id}">
            <span class="package-ribbon">${pkg.tag}</span>
            <div class="package-body">
                <div class="package-title-area">
                    <span class="package-tag">Health Package</span>
                    <h3>${pkg.name}</h3>
                </div>
                <div class="package-parameters">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    Includes ${pkg.parameters} Parameters
                </div>
                
                <a href="#" class="package-details-btn" onclick="togglePackageDetails(event, '${pkg.id}')">
                    <span>View Tests Included</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </a>
                
                <ul class="package-tests-list" id="tests-list-${pkg.id}" style="display: none;">
                    ${pkg.tests.map(t => `
                        <li class="package-test-item">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            ${t}
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="package-footer">
                <div class="package-price-row">
                    <div class="price-box">
                        <span class="price-label">Special Price:</span>
                        <span class="price-current">₹${pkg.price}</span>
                        <span class="price-original">₹${pkg.originalPrice}</span>
                    </div>
                    <span class="price-discount">${Math.round((pkg.originalPrice - pkg.price) / pkg.originalPrice * 100)}% OFF</span>
                </div>
                <button class="btn-add-cart ${isItemInCart(pkg.id) ? 'added' : ''}" onclick="handleCartClick('${pkg.id}', 'package')">
                    ${isItemInCart(pkg.id) ? 'Added to Cart' : 'Add to Cart'}
                </button>
            </div>
        </div>
    `).join('');
}

// Render Individual Tests
function renderTests() {
    const grid = document.getElementById('tests-grid');
    if (!grid) return;
    
    grid.innerHTML = database.tests.map(test => `
        <div class="test-card" data-id="${test.id}">
            <div class="test-header">
                <span class="test-code">${test.code}</span>
                <span class="test-badge-prep">${test.prep.includes('fasting mandatory') ? 'Fasting Required' : 'No Fasting'}</span>
            </div>
            <h3>${test.name}</h3>
            <div class="test-meta">
                <span>
                    Price: ₹${test.price}
                </span>
                <span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    Sample: ${test.sample}
                </span>

            </div>
            <div class="test-footer">
                <span class="test-price">₹${test.price}</span>
                <button class="test-btn-add ${isItemInCart(test.id) ? 'added' : ''}" onclick="handleCartClick('${test.id}', 'test')">
                    ${isItemInCart(test.id) ? '✓' : '+'}
                </button>
            </div>
        </div>
    `).join('');
}

// Toggle Package Details Accordion
window.togglePackageDetails = function(event, pkgId) {
    event.preventDefault();
    const list = document.getElementById(`tests-list-${pkgId}`);
    const btn = event.currentTarget;
    if (list.style.display === 'none') {
        list.style.display = 'block';
        btn.querySelector('span').innerText = 'Hide Tests Included';
        btn.querySelector('svg').style.transform = 'rotate(180deg)';
    } else {
        list.style.display = 'none';
        btn.querySelector('span').innerText = 'View Tests Included';
        btn.querySelector('svg').style.transform = 'rotate(0deg)';
    }
};

// Event Listeners setup
function setupEventListeners() {
    // Location Select Toggle
    const locSel = document.getElementById('location-selector');
    const locDropdown = document.getElementById('location-dropdown');
    
    if (locSel && locDropdown) {
        locSel.addEventListener('click', (e) => {
            e.stopPropagation();
            locDropdown.classList.toggle('active');
        });
        
        document.querySelectorAll('.location-option').forEach(opt => {
            opt.addEventListener('click', (e) => {
                const city = e.target.innerText;
                document.getElementById('current-city').innerText = city;
                locDropdown.classList.remove('active');
            });
        });
        
        document.addEventListener('click', () => {
            locDropdown.classList.remove('active');
        });
    }

    // Global Search Autocomplete
    const searchInput = document.getElementById('global-search');
    const suggestions = document.getElementById('search-suggestions');
    if (searchInput && suggestions) {
        let searchDebounceTimeout = null;
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (searchDebounceTimeout) {
                clearTimeout(searchDebounceTimeout);
            }
            if (query.length >= 2) {
                searchDebounceTimeout = setTimeout(() => {
                    logUserSearch(query);
                }, 1500);
            }
            if (query.length < 2) {
                suggestions.classList.remove('active');
                return;
            }

            // Filter packages and tests
            const filteredPkgs = database.packages.filter(p => p.name.toLowerCase().includes(query));
            const filteredTests = database.tests.filter(t => t.name.toLowerCase().includes(query) || t.code.toLowerCase().includes(query));

            if (filteredPkgs.length === 0 && filteredTests.length === 0) {
                suggestions.innerHTML = `<div class="suggestion-item"><span class="suggestion-name">No matching tests found</span></div>`;
            } else {
                suggestions.innerHTML = [
                    ...filteredPkgs.map(p => `
                        <div class="suggestion-item" onclick="addSuggestedItem('${p.id}', 'package')">
                            <span class="suggestion-name">${p.name}</span>
                            <span class="suggestion-type">Package</span>
                        </div>
                    `),
                    ...filteredTests.map(t => `
                        <div class="suggestion-item" onclick="addSuggestedItem('${t.id}', 'test')">
                            <span class="suggestion-name">${t.name} (${t.code})</span>
                            <span class="suggestion-type">Test</span>
                        </div>
                    `)
                ].join('');
            }
            suggestions.classList.add('active');
        });

        // Hide suggestions on document click
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
                suggestions.classList.remove('active');
            }
        });
    }

    // Cart Drawer Toggle
    const cartBtn = document.getElementById('cart-btn');
    const cartClose = document.getElementById('cart-close-btn');
    const overlay = document.getElementById('cart-overlay');
    const drawer = document.getElementById('cart-drawer');
    
    if (cartBtn && drawer && overlay && cartClose) {
        cartBtn.addEventListener('click', () => {
            overlay.classList.add('active');
            drawer.classList.add('active');
        });
        cartClose.addEventListener('click', () => {
            closeCartDrawer();
        });
        overlay.addEventListener('click', () => {
            closeCartDrawer();
        });
    }

    // Modal Close Triggers
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal-overlay').classList.remove('active');
        });
    });

    // Drag and Drop Prescription Handling
    const dropArea = document.getElementById('prescription-drop');
    const fileInput = document.getElementById('prescription-file');
    if (dropArea && fileInput) {
        dropArea.addEventListener('click', () => fileInput.click());

        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropArea.classList.add('highlight');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropArea.classList.remove('highlight');
            }, false);
        });

        dropArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            handlePrescriptionFile(files[0]);
        });

        fileInput.addEventListener('change', (e) => {
            handlePrescriptionFile(e.target.files[0]);
        });
    }

    // FAQ Accordions
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Gender Selection buttons
    document.querySelectorAll('.gender-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.gender-option').forEach(el => el.classList.remove('active'));
            btn.classList.add('active');
            selectedGender = btn.getAttribute('data-gender');
        });
    });

    // Time Slot Selection buttons
    document.querySelectorAll('.slot-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.slot-item').forEach(el => el.classList.remove('active'));
            btn.classList.add('active');
            selectedSlot = btn.innerText;
        });
    });

    // Setup coupon application
    const applyCouponBtn = document.getElementById('apply-coupon-btn');
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', applyCoupon);
    }
}

// Suggested Item click addition
window.addSuggestedItem = function(id, type) {
    const query = document.getElementById('global-search').value;
    if (query && query.trim()) {
        logUserSearch(query);
    }
    handleCartClick(id, type);
    document.getElementById('search-suggestions').classList.remove('active');
    document.getElementById('global-search').value = '';
    
    // Open cart automatically to show additions
    document.getElementById('cart-overlay').classList.add('active');
    document.getElementById('cart-drawer').classList.add('active');
};

// Check if item is in cart
function isItemInCart(id) {
    return cart.some(item => item.id === id);
}

// Cart adding/removing logic
function handleCartClick(id, type) {
    if (isItemInCart(id)) {
        cart = cart.filter(item => item.id !== id);
    } else {
        let itemData;
        if (type === 'package') {
            itemData = database.packages.find(p => p.id === id);
        } else {
            itemData = database.tests.find(t => t.id === id);
        }
        cart.push(itemData);
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Re-render items to show green "Added" states
    renderPackages();
    renderTests();
    
    setupCartCounter();
    updateCartDisplay();
}

// Setup top navbar badge count
function setupCartCounter() {
    const badge = document.getElementById('cart-badge-count');
    if (badge) {
        badge.innerText = cart.length;
    }
}

// Close cart drawer
function closeCartDrawer() {
    document.getElementById('cart-overlay').classList.remove('active');
    document.getElementById('cart-drawer').classList.remove('active');
}

// Re-render items inside the Cart Drawer
function updateCartDisplay() {
    const itemsList = document.getElementById('cart-items-list');
    const emptyState = document.getElementById('cart-empty');
    const summary = document.getElementById('cart-summary-box');
    const couponBox = document.getElementById('coupon-section-box');
    const itemsContainer = document.getElementById('cart-items-container');
    const checkoutWizard = document.getElementById('checkout-wizard');
    const trackerContainer = document.getElementById('tracker-container');

    if (!itemsList) return;

    // Reset checkout forms/tracker views if cart is modified
    checkoutWizard.classList.remove('active');
    trackerContainer.classList.remove('active');
    itemsContainer.style.display = 'block';

    if (cart.length === 0) {
        emptyState.style.display = 'block';
        summary.style.display = 'none';
        couponBox.style.display = 'none';
        itemsList.innerHTML = '';
        return;
    }

    emptyState.style.display = 'none';
    summary.style.display = 'block';
    couponBox.style.display = 'block';

    itemsList.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-header">
                <span class="cart-item-title">${item.name}</span>
                <button class="cart-item-remove" onclick="handleCartClick('${item.id}', '${item.id.startsWith('SF') ? 'package' : 'test'}')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
            </div>
            <div class="cart-item-footer">
                <span class="cart-item-price">₹${item.price}</span>
            </div>
        </div>
    `).join('');

    calculateCartTotals();
    updateCartActionButtons();
}

window.handleCartAction = function() {
    const checkoutWizard = document.getElementById('checkout-wizard');
    if (!checkoutWizard.classList.contains('active')) {
        startCheckout();
    } else {
        nextStep();
    }
};

window.updateCartActionButtons = function() {
    const actionBtn = document.getElementById('cart-action-btn');
    const backBtn = document.getElementById('cart-back-btn');
    const checkoutWizard = document.getElementById('checkout-wizard');
    const trackerContainer = document.getElementById('tracker-container');
    const summaryBox = document.getElementById('cart-summary-box');

    if (!summaryBox || !actionBtn || !backBtn) return;

    if (trackerContainer && trackerContainer.classList.contains('active')) {
        // Tracker is active (booking completed), hide summary actions entirely
        summaryBox.style.display = 'none';
        return;
    }

    if (!checkoutWizard || !checkoutWizard.classList.contains('active')) {
        // We are looking at the cart items list
        backBtn.style.display = 'none';
        actionBtn.style.display = 'block';
        actionBtn.innerText = 'Proceed to Checkout';
        actionBtn.className = 'checkout-btn'; // default styling (yellow)
    } else {
        // We are in checkout wizard
        backBtn.style.display = 'block';
        actionBtn.style.display = 'block';
        actionBtn.className = 'checkout-btn primary-action'; // blue styling

        if (checkoutStep === 1 || checkoutStep === 2) {
            actionBtn.innerText = 'Continue';
        } else if (checkoutStep === 3) {
            actionBtn.innerText = 'Confirm Booking';
        }
    }
};

function calculateCartTotals() {
    let subtotal = cart.reduce((acc, val) => acc + val.price, 0);
    let discount = 0;
    
    if (activeCoupon) {
        discount = Math.round(subtotal * activeCoupon.percent);
    }
    
    let total = subtotal - discount;

    document.getElementById('sum-subtotal').innerText = `₹${subtotal}`;
    document.getElementById('sum-discount').innerText = `-₹${discount}`;
    document.getElementById('sum-total').innerText = `₹${total}`;
}

// Coupon code logic
function applyCoupon() {
    const code = document.getElementById('coupon-code').value.toUpperCase().trim();
    const msg = document.getElementById('coupon-msg');
    
    if (code === 'HEALTH10') {
        activeCoupon = { code: 'HEALTH10', percent: 0.1 };
        msg.className = 'coupon-message success';
        msg.innerText = 'HEALTH10 applied! 10% discount subtracted.';
    } else if (code === 'FIT20') {
        activeCoupon = { code: 'FIT20', percent: 0.2 };
        msg.className = 'coupon-message success';
        msg.innerText = 'FIT20 applied! 20% discount subtracted.';
    } else {
        activeCoupon = null;
        msg.className = 'coupon-message error';
        msg.innerText = 'Invalid coupon code.';
    }
    calculateCartTotals();
}

// Checkout Form Wizard Handling
window.startCheckout = function() {
    if (!currentUser) {
        alert('Please login or create an account to book your test.');
        window.location.href = 'login.html';
        return;
    }
    
    // Set dynamic date picker limits (locked to 3 days starting today)
    const bookingDateInput = document.getElementById('booking-date');
    if (bookingDateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        bookingDateInput.min = `${yyyy}-${mm}-${dd}`;

        const maxDateObj = new Date();
        maxDateObj.setDate(today.getDate() + 3);
        const maxYyyy = maxDateObj.getFullYear();
        let maxMm = maxDateObj.getMonth() + 1;
        let maxDd = maxDateObj.getDate();
        if (maxDd < 10) maxDd = '0' + maxDd;
        if (maxMm < 10) maxMm = '0' + maxMm;
        bookingDateInput.max = `${maxYyyy}-${maxMm}-${maxDd}`;
    }

    document.getElementById('cart-items-container').style.display = 'none';
    document.getElementById('checkout-wizard').classList.add('active');
    showCheckoutStep(1);
};

function showCheckoutStep(step) {
    checkoutStep = step;
    document.querySelectorAll('.checkout-step-panel').forEach(panel => {
        panel.style.display = 'none';
    });
    document.getElementById(`step-${step}`).style.display = 'block';
    updateCartActionButtons();
}

window.nextStep = function() {
    if (checkoutStep === 1) {
        const name = document.getElementById('patient-name').value.trim();
        const age = document.getElementById('patient-age').value.trim();
        const phone = document.getElementById('patient-phone').value.trim();
        
        if (!name || !age || !phone) {
            alert('Please fill in Name, Age, and Phone Number.');
            return;
        }
        showCheckoutStep(2);
    } else if (checkoutStep === 2) {
        const address = document.getElementById('patient-address').value.trim();
        const pin = document.getElementById('patient-pin').value.trim();
        
        if (!address || !pin) {
            alert('Please provide sample collection Address and Pincode.');
            return;
        }
        showCheckoutStep(3);
    } else if (checkoutStep === 3) {
        const dateVal = document.getElementById('booking-date').value;
        if (!dateVal || !selectedSlot) {
            alert('Please select a Date and a Time Slot.');
            return;
        }
        
        // Validate date range on submission (3-day window)
        const parts = dateVal.split('-');
        const selectedDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        selectedDate.setHours(0, 0, 0, 0);
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const maxDate = new Date();
        maxDate.setDate(today.getDate() + 3);
        maxDate.setHours(0, 0, 0, 0);
        
        if (selectedDate < today || selectedDate > maxDate) {
            alert('Appointments can only be scheduled within a 3-day window from today.');
            return;
        }
        
        processFinalBooking();
    }
};

window.prevStep = function() {
    if (checkoutStep > 1) {
        showCheckoutStep(checkoutStep - 1);
    } else {
        // Go back to cart list view
        document.getElementById('checkout-wizard').classList.remove('active');
        document.getElementById('cart-items-container').style.display = 'block';
        updateCartActionButtons();
    }
};

// Simulate Final Booking Checkout
async function processFinalBooking() {
    // Capture values
    const name = document.getElementById('patient-name').value.trim();
    const age = document.getElementById('patient-age').value.trim();
    const phone = document.getElementById('patient-phone').value.trim();
    const address = document.getElementById('patient-address').value.trim();
    const pin = document.getElementById('patient-pin').value.trim();
    const dateVal = document.getElementById('booking-date').value;
    
    const totalAmount = document.getElementById('sum-total').innerText;
    const itemsText = cart.map(item => item.name).join(', ');

    const newBooking = {
        id: 'B-' + (Date.now().toString().slice(-6)),
        patientName: name,
        patientAge: age,
        patientGender: selectedGender,
        patientPhone: phone,
        patientAddress: address + ', Indore - ' + pin,
        slotDate: dateVal,
        slotTime: selectedSlot,
        items: itemsText,
        totalPrice: totalAmount,
        status: 'confirmed', // confirmed, assigned, collected, processing, ready
        phlebotomist: 'Mehul Bichpuriya', // Default phlebotomist set to Mehul Bichpuriya
        userEmail: currentUser ? currentUser.email : 'guest',
        dateCreated: new Date().toLocaleDateString()
    };

    try {
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBooking)
        });
        if (!response.ok) throw new Error('Failed to save booking on server');

        // Clear input fields
        document.getElementById('patient-name').value = '';
        document.getElementById('patient-age').value = '';
        document.getElementById('patient-phone').value = '';
        document.getElementById('patient-address').value = '';
        document.getElementById('patient-pin').value = '';
        document.getElementById('booking-date').value = '';
        document.querySelectorAll('.gender-option').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.gender-option')[0].classList.add('active');
        selectedGender = 'Male';
        document.querySelectorAll('.slot-item').forEach(el => el.classList.remove('active'));
        selectedSlot = '';

        // Hide wizard, show live tracker panel
        document.getElementById('checkout-wizard').classList.remove('active');
        document.getElementById('tracker-container').classList.add('active');
        
        // Clear coupon and empty checkout inputs for future bookings
        activeCoupon = null;
        document.getElementById('coupon-code').value = '';
        document.getElementById('coupon-msg').innerText = '';
        
        // Set custom tracking targets
        window.currentTrackingBookingId = newBooking.id;

        // Clear cart
        cart = [];
        localStorage.removeItem('cart');
        setupCartCounter();
        updateCartDisplay();

        simulateTrackerTimeline(newBooking);
    } catch (err) {
        alert('Error creating booking: ' + err.message);
    }
}

// Tracker simulator timeline progression
function simulateTrackerTimeline(bookingObj) {
    const steps = [
        { status: 'confirmed', delay: 1000 },
        { status: 'assigned', delay: 4000 },
        { status: 'collected', delay: 8000 },
        { status: 'processing', delay: 12000 },
        { status: 'ready', delay: 16000 }
    ];

    // Helper to check if the current tracking booking's status changed
    const updateUiFromBooking = async () => {
        try {
            const response = await fetch('/api/bookings');
            if (!response.ok) return;
            const latestBookings = await response.json();
            const currentB = latestBookings.find(b => b.id === window.currentTrackingBookingId);
            if (!currentB) return;

            // Reset classes
            document.querySelectorAll('.tracker-step').forEach(step => {
                step.className = 'tracker-step';
            });

            // Set status states
            const stat = currentB.status;
            const phleb = currentB.phlebotomist || 'Mehul Bichpuriya';

            if (stat === 'confirmed') {
                document.getElementById('track-step-1').classList.add('completed');
                document.getElementById('track-step-2').classList.add('current');
            } else if (stat === 'assigned') {
                document.getElementById('track-step-1').classList.add('completed');
                document.getElementById('track-step-2').classList.add('completed');
                document.getElementById('track-step-3').classList.add('current');
                
                // Show phleb details
                document.getElementById('track-phleb-details').style.display = 'flex';
                document.getElementById('track-phleb-details').querySelector('.phleb-info h5').innerText = phleb;
            } else if (stat === 'collected') {
                document.getElementById('track-step-1').classList.add('completed');
                document.getElementById('track-step-2').classList.add('completed');
                document.getElementById('track-step-3').classList.add('completed');
                document.getElementById('track-step-4').classList.add('current');
                document.getElementById('track-phleb-details').style.display = 'flex';
                document.getElementById('track-phleb-details').querySelector('.phleb-info h5').innerText = phleb;
            } else if (stat === 'processing') {
                document.getElementById('track-step-1').classList.add('completed');
                document.getElementById('track-step-2').classList.add('completed');
                document.getElementById('track-step-3').classList.add('completed');
                document.getElementById('track-step-4').classList.add('completed');
                document.getElementById('track-step-5').classList.add('current');
                document.getElementById('track-phleb-details').style.display = 'flex';
                document.getElementById('track-phleb-details').querySelector('.phleb-info h5').innerText = phleb;
            } else if (stat === 'ready') {
                document.querySelectorAll('.tracker-step').forEach(step => step.classList.add('completed'));
                document.getElementById('view-report-direct-btn').style.display = 'block';
                document.getElementById('track-phleb-details').style.display = 'flex';
                document.getElementById('track-phleb-details').querySelector('.phleb-info h5').innerText = phleb;
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Run local timer progression to simulate step progress unless Admin changes it
    steps.forEach((step, idx) => {
        setTimeout(async () => {
            // Check if user is still tracking this booking
            if (window.currentTrackingBookingId !== bookingObj.id) return;
            
            try {
                // Fetch current booking state
                const response = await fetch('/api/bookings');
                if (!response.ok) return;
                const currentBookings = await response.json();
                const bIndex = currentBookings.findIndex(b => b.id === bookingObj.id);
                if (bIndex === -1) return;

                let currentStatus = currentBookings[bIndex].status;
                
                // Auto progress simulation
                if (idx > 0) {
                    let prevSimStatus = steps[idx-1].status;
                    if (currentStatus === prevSimStatus) {
                        // Put new status to server
                        await fetch(`/api/bookings/${bookingObj.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ status: step.status, phlebotomist: 'Mehul Bichpuriya' })
                        });
                    }
                }
                updateUiFromBooking();
            } catch (err) {
                console.error(err);
            }
        }, step.delay);
    });

    // Run poll/render immediately
    updateUiFromBooking();
    // Keep checking every 1s for manual admin updates while drawer is active
    const checkInterval = setInterval(() => {
        if (!document.getElementById('cart-drawer').classList.contains('active') || window.currentTrackingBookingId !== bookingObj.id) {
            clearInterval(checkInterval);
            return;
        }
        updateUiFromBooking();
    }, 1000);
}

// Redirect from tracker button to smart report
window.viewBookingReport = async function() {
    closeCartDrawer();
    try {
        const response = await fetch('/api/bookings');
        if (!response.ok) throw new Error('Failed to load bookings');
        const bookingsList = await response.json();
        const currentB = bookingsList.find(b => b.id === window.currentTrackingBookingId);
        
        const emailParam = currentUser ? encodeURIComponent(currentUser.email) : 'guest';
        let reportData = null;
        let reportCodeToShow = 'LC-101';

        if (currentB && currentB.reportCode) {
            const repRep = await fetch(`/api/reports/${currentB.reportCode}?userEmail=${emailParam}`);
            if (repRep.ok) {
                reportData = await repRep.json();
                reportCodeToShow = currentB.reportCode;
            }
        }
        
        if (!reportData) {
            // Fallback to LC-101 default report if not compiled yet
            const backupRep = await fetch(`/api/reports/LC-101?userEmail=${emailParam}`);
            if (backupRep.ok) {
                reportData = await backupRep.json();
            } else {
                throw new Error('Failed to fetch fallback report');
            }
        }

        // Dynamically override patient information from the booking details
        if (currentB && reportData) {
            reportData.patient = {
                name: currentB.patientName,
                age: currentB.patientAge,
                gender: currentB.patientGender,
                date: currentB.slotDate,
                refBy: `Dr. ${currentB.phlebotomist || 'Mehul Bichpuriya'}, MD`
            };
        }

        openSmartReport(reportCodeToShow, reportData);
    } catch (err) {
        alert('Error fetching report: ' + err.message);
    }
};

// Open Specific Modals
window.openModal = function(modalId) {
    document.getElementById(modalId).classList.add('active');
};

window.closeModal = function(modalId) {
    document.getElementById(modalId).classList.remove('active');
};

// Prescription upload helper
function handlePrescriptionFile(file) {
    if (!file) return;
    const indicator = document.getElementById('prescription-indicator');
    const filename = document.getElementById('prescription-filename');
    
    filename.innerText = `Selected: ${file.name} (${Math.round(file.size / 1024)} KB)`;
    indicator.style.display = 'flex';
}

window.submitPrescription = async function() {
    const fileInput = document.getElementById('prescription-file');
    const name = document.getElementById('presc-name').value.trim();
    const phone = document.getElementById('presc-phone').value.trim();
    
    if (fileInput.files.length === 0) {
        alert('Please select or drag a prescription file.');
        return;
    }
    if (!name || !phone) {
        alert('Please provide your Name and Mobile Number.');
        return;
    }
    
    const newPresc = {
        id: 'P-' + Date.now().toString().slice(-6),
        name: name,
        phone: phone,
        filename: fileInput.files[0] ? fileInput.files[0].name : 'prescription.jpg',
        status: 'pending'
    };

    try {
        const response = await fetch('/api/prescriptions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPresc)
        });
        if (!response.ok) throw new Error('Server returned an error');

        alert('Thank you! Prescription uploaded successfully. Pathologist Mehul Bichpuriya will review it and call you within 15 minutes.');
        closeModal('modal-prescription');
        
        // Clear form
        document.getElementById('presc-name').value = '';
        document.getElementById('presc-phone').value = '';
        document.getElementById('prescription-indicator').style.display = 'none';
        fileInput.value = '';
    } catch (err) {
        alert('Error submitting prescription: ' + err.message);
    }
};

// Report Portal Lookup
window.lookupReport = async function() {
    const input = document.getElementById('report-receipt-id').value.trim().toUpperCase();
    if (!input) {
        alert('Please enter a Receipt ID / Patient ID.');
        return;
    }

    // Require patients to log in to search for their custom reports
    const isDemoReport = (input === 'LC-101' || input === 'LC-102');
    if (!isDemoReport && !currentUser) {
        alert('Please log in to your patient account first to search for this report.');
        window.location.href = 'login.html';
        return;
    }

    try {
        const emailParam = currentUser ? encodeURIComponent(currentUser.email) : 'guest';
        const response = await fetch(`/api/reports/${input}?userEmail=${emailParam}`);
        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || 'Receipt/Patient ID not found on server. Try entering LC-101 or LC-102.');
        }
        const report = await response.json();
        closeModal('modal-report-portal');
        openSmartReport(input, report);
    } catch (err) {
        alert(err.message);
    }
};

// Smart Report Modal Builder
function openSmartReport(patientId, reportData) {
    const container = document.getElementById('smart-report-view-content');
    if (!container) return;

    window.currentReportPdfData = reportData.pdfData || null;
    
    let pdfBlockHtml = '';
    if (reportData.pdfData) {
        pdfBlockHtml = `
            <div style="background-color: var(--primary-light); padding: 14px; border-radius: var(--border-radius-sm); border: 1px solid rgba(0, 71, 174, 0.15); margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="fa-solid fa-file-pdf" style="color: var(--danger-color); font-size: 24px;"></i>
                    <div style="font-family: 'Outfit', sans-serif;">
                        <h5 style="margin: 0; color: var(--text-dark); font-size: 13px; font-weight: 700;">Official PDF Report Available</h5>
                        <p style="margin: 2px 0 0 0; color: var(--text-muted); font-size: 11px;">Compiled and verified by Mehul Bichpuriya</p>
                    </div>
                </div>
                <button onclick="downloadPdfReport('${patientId}')" class="checkout-btn" style="width: auto; padding: 8px 16px; font-size: 12px; margin: 0; background-color: var(--primary-color); color: white;">
                    Download PDF <i class="fa-solid fa-download"></i>
                </button>
            </div>
        `;
    }

    const resultsHtml = reportData.results.map(group => `
        <div class="report-parameter-group">
            <h4>${group.category}</h4>
            ${group.tests.map(test => {
                let sliderPos = 20; // default normal
                if (test.status === 'borderline') {
                    sliderPos = 55;
                } else if (test.status === 'high') {
                    sliderPos = 85;
                }

                return `
                    <div class="parameter-row">
                        <div class="param-title-val">
                            <span>${test.name}</span>
                            <span class="param-val ${test.status}">${test.value} ${test.unit}</span>
                        </div>
                        <div class="indicator-bar">
                            <div class="indicator-pointer" style="left: ${sliderPos}%;"></div>
                        </div>
                        <div class="range-labels">
                            <span>Low (< ${test.min})</span>
                            <span>Normal (${test.min} - ${test.max})</span>
                            <span>High (> ${test.max})</span>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `).join('');

    container.innerHTML = `
        <div class="report-header-card">
            <div class="flex-between">
                <h2>Smart Health Report</h2>
                <span style="font-weight: 700; color: var(--secondary-color);">ID: ${patientId}</span>
            </div>
            <div class="report-patient-info">
                <div><strong>Patient Name:</strong> ${reportData.patient.name}</div>
                <div><strong>Age/Gender:</strong> ${reportData.patient.age} Yrs / ${reportData.patient.gender}</div>
                <div><strong>Sample Collection:</strong> ${reportData.patient.date}</div>
                <div><strong>Pathologist:</strong> ${reportData.patient.refBy || 'Mehul Bichpuriya, MD'}</div>
            </div>
        </div>
        
        ${pdfBlockHtml}
        
        ${resultsHtml}
        
        <div class="smart-doc-comment">
            <h5>Pathologist Recommendation & Clinical Insights</h5>
            <p>${reportData.advice}</p>
        </div>
    `;

    openModal('modal-smart-report');
}

window.downloadPdfReport = function(patientId) {
    if (window.currentReportPdfData) {
        const link = document.createElement('a');
        link.href = window.currentReportPdfData;
        link.download = `Report_${patientId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert('PDF report data not found.');
    }
};

// ==========================================
// CUSTOMER AUTH & DASHBOARD LOGIC
// ==========================================

function updateUserWidgetState() {
    const nameSpan = document.getElementById('user-display-name');
    const avatar = document.getElementById('user-avatar-icon');
    const mobileUserCard = document.getElementById('mobile-user-card');

    if (currentUser) {
        if (nameSpan) nameSpan.innerText = currentUser.name;
        if (avatar) avatar.innerHTML = `<i class="fa-solid fa-user-check" style="color: var(--accent-color);"></i>`;
        
        if (mobileUserCard) {
            mobileUserCard.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                    <div style="width: 44px; height: 44px; border-radius: 50%; background-color: var(--primary-light); color: var(--primary-color); display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 700; border: 2px solid var(--primary-color);">
                        ${currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div style="flex-grow: 1; min-width: 0;">
                        <div style="font-weight: 700; color: var(--text-dark); font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${currentUser.name}</div>
                        <div style="font-size: 12px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${currentUser.phone || currentUser.email}</div>
                    </div>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button onclick="closeMobileNav(); loadPatientDashboard(); openModal('modal-patient-dashboard');" style="flex: 1; padding: 8px; border: 1px solid var(--primary-color); background-color: var(--bg-white); color: var(--primary-color); border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.2s;">
                        My Profile
                    </button>
                    <button onclick="closeMobileNav(); logoutCustomer();" style="padding: 8px 12px; border: 1px solid var(--danger-color); background-color: var(--danger-color); color: white; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.2s;">
                        <i class="fa-solid fa-right-from-bracket"></i>
                    </button>
                </div>
            `;
        }
    } else {
        if (nameSpan) nameSpan.innerText = 'Login / Register';
        if (avatar) avatar.innerHTML = `<i class="fa-solid fa-user"></i>`;
        
        if (mobileUserCard) {
            mobileUserCard.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                    <div style="width: 44px; height: 44px; border-radius: 50%; background-color: #f1f5f9; color: var(--text-muted); display: flex; align-items: center; justify-content: center; font-size: 18px; border: 2px solid #cbd5e1;">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div>
                        <div style="font-weight: 700; color: var(--text-dark); font-size: 15px;">Guest Patient</div>
                        <div style="font-size: 12px; color: var(--text-muted);">Login to track bookings & reports</div>
                    </div>
                </div>
                <a href="login.html" style="display: block; text-align: center; padding: 10px; background-color: var(--primary-color); color: white; border-radius: 6px; font-size: 13px; font-weight: 700; text-decoration: none; transition: background-color 0.2s;">
                    Login / Register
                </a>
            `;
        }
    }
}

window.handleProfileWidgetClick = function() {
    if (currentUser) {
        loadPatientDashboard();
        openModal('modal-patient-dashboard');
    } else {
        window.location.href = 'login.html';
    }
};

window.togglePatientTab = function(tab) {
    document.querySelectorAll('.patient-menu-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.patient-section-tab').forEach(el => el.style.display = 'none');

    document.getElementById(`pmenu-${tab}`).classList.add('active');
    document.getElementById(`psec-${tab}`).style.display = 'block';
};

async function loadPatientDashboard() {
    if (!currentUser) return;
    
    // Populate profile text fields
    document.getElementById('prof-name').innerText = currentUser.name;
    document.getElementById('prof-email').innerText = currentUser.email;
    document.getElementById('prof-phone').innerText = currentUser.phone;

    try {
        const response = await fetch('/api/bookings');
        if (!response.ok) throw new Error('Failed to load bookings');
        const allBookings = await response.json();
        const userBookings = allBookings.filter(b => b.userEmail.toLowerCase() === currentUser.email.toLowerCase());
        const bookingsList = document.getElementById('patient-orders-list');

        if (userBookings.length === 0) {
            bookingsList.innerHTML = `<p style="font-size: 13px; color: var(--text-muted); text-align: center; margin-top: 20px;">No bookings found yet. Explore packages to book home checks!</p>`;
            return;
        }

        bookingsList.innerHTML = userBookings.map(b => {
            let statusPillColor = b.status || 'confirmed';

            return `
                <div class="order-history-card">
                    <div class="order-history-header">
                        <span style="font-weight: 700; color: var(--primary-color);">${b.id}</span>
                        <span class="status-pill ${statusPillColor}">${b.status.toUpperCase()}</span>
                    </div>
                    <div style="font-size: 13px; display: flex; flex-direction: column; gap: 4px;">
                        <div><strong>Tests/Packages:</strong> ${b.items}</div>
                        <div><strong>Date & Slot:</strong> ${b.slotDate} (${b.slotTime})</div>
                        <div><strong>Pathologist Assigned:</strong> ${b.phlebotomist || 'Mehul Bichpuriya'}</div>
                        <div><strong>Total Paid:</strong> ${b.totalPrice}</div>
                        ${b.status !== 'ready' ? `
                            <button class="checkout-btn" style="margin-top: 10px; padding: 6px; font-size: 12px; background-color: #f59e0b; color: white;" onclick="editThisBooking('${b.id}')">
                                Edit <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        ` : ''}
                </div>
            `;
        }).join('');
    } catch (err) {
        console.error(err);
    }
}

window.trackThisBooking = async function(bookingId) {
    closeModal('modal-patient-dashboard');
    
    try {
        const response = await fetch('/api/bookings');
        if (!response.ok) return;
        const activeBookings = await response.json();
        const booking = activeBookings.find(b => b.id === bookingId);
        if (!booking) return;

        // Set tracking variables
        window.currentTrackingBookingId = booking.id;

        // Trigger cart drawer timeline screen
        document.getElementById('cart-items-container').style.display = 'none';
        document.getElementById('checkout-wizard').classList.remove('active');
        document.getElementById('tracker-container').classList.add('active');
        document.getElementById('cart-overlay').classList.add('active');
        document.getElementById('cart-drawer').classList.add('active');

        simulateTrackerTimeline(booking);
    } catch (err) {
        console.error(err);
    }
};

window.logoutCustomer = function() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    closeModal('modal-patient-dashboard');
    updateUserWidgetState();
    alert('Logged out successfully.');
    window.location.reload();
};

// ==========================================
// ADMIN CONTROL DASHBOARD LOGIC
// ==========================================

window.logoutAdmin = function() {
    localStorage.removeItem('adminLoggedIn');
    document.getElementById('admin-workspace').classList.remove('active');
    window.location.href = '/';
};

window.toggleAdminTab = function(tab) {
    document.querySelectorAll('.admin-sidebar .patient-menu-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.admin-section').forEach(el => el.classList.remove('active'));

    document.getElementById(`amenu-${tab}`).classList.add('active');
    document.getElementById(`asec-${tab}`).classList.add('active');

    if (tab === 'catalog') {
        loadAdminCatalog();
    } else if (tab === 'customers') {
        loadAdminCustomers();
    }
};

async function loadAdminDashboard() {
    try {
        const bookingsRes = await fetch('/api/bookings');
        const prescriptionsRes = await fetch('/api/prescriptions');
        
        if (!bookingsRes.ok || !prescriptionsRes.ok) throw new Error('Failed to load dashboard data');
        
        const serverBookings = await bookingsRes.json();
        const serverPrescriptions = await prescriptionsRes.json();

        // Calculate admin stats
        const totalCount = serverBookings.length;
        const processingCount = serverBookings.filter(b => b.status === 'processing' || b.status === 'collected').length;
        const pendingReports = serverBookings.filter(b => b.status !== 'ready').length;
        const revenueSum = serverBookings.reduce((sum, b) => {
            let numericPrice = parseInt(b.totalPrice.replace(/[^0-9]/g, '')) || 0;
            return sum + numericPrice;
        }, 0);

        document.getElementById('astat-total').innerText = totalCount;
        document.getElementById('astat-processing').innerText = processingCount;
        document.getElementById('astat-pending').innerText = pendingReports;
        document.getElementById('astat-revenue').innerText = '₹' + revenueSum;

        // Render bookings table rows
        const bookingsRows = document.getElementById('admin-bookings-rows');
        if (serverBookings.length === 0) {
            bookingsRows.innerHTML = `<tr><td colspan="9" style="text-align: center; color: var(--text-muted);">No collections scheduled yet.</td></tr>`;
        } else {
            bookingsRows.innerHTML = serverBookings.map(b => `
                <tr>
                    <td><strong>${b.patientName}</strong> (${b.patientAge}/${b.patientGender})</td>
                    <td>
                        ${b.patientPhone}
                        <a href="https://wa.me/${b.patientPhone.replace(/\D/g, '').length === 10 ? '91' + b.patientPhone.replace(/\D/g, '') : b.patientPhone.replace(/\D/g, '')}" 
                           target="_blank" 
                           style="color: #25D366; font-size: 16px; margin-left: 6px; display: inline-flex; align-items: center; vertical-align: middle;" 
                           title="Chat on WhatsApp">
                            <i class="fa-brands fa-whatsapp"></i>
                        </a>
                    </td>
                    <td style="min-width: 160px; word-break: break-word; line-height: 1.4;">
                        ${b.patientAddress}
                        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.patientAddress)}" 
                           target="_blank" 
                           style="color: #EA4335; font-size: 16px; margin-left: 6px; display: inline-flex; align-items: center; vertical-align: middle;" 
                           title="View Address on Google Maps">
                            <i class="fa-solid fa-map-location-dot"></i>
                        </a>
                    </td>
                    <td>${b.slotDate}<br><span style="font-size: 11px; color: var(--text-muted);">${b.slotTime}</span></td>
                    <td style="min-width: 140px; word-break: break-word; line-height: 1.4;">${b.items}</td>
                    <td><strong>${b.totalPrice}</strong></td>
                    <td>
                        <select class="admin-select" id="phleb-sel-${b.id}">
                            <option value="Mehul Bichpuriya" selected>Mehul Bichpuriya</option>
                        </select>
                    </td>
                    <td>
                        <select class="admin-select" id="status-sel-${b.id}">
                            <option value="confirmed" ${b.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                            <option value="assigned" ${b.status === 'assigned' ? 'selected' : ''}>Assigned</option>
                            <option value="collected" ${b.status === 'collected' ? 'selected' : ''}>Collected</option>
                            <option value="processing" ${b.status === 'processing' ? 'selected' : ''}>Processing</option>
                            <option value="ready" ${b.status === 'ready' ? 'selected' : ''}>Ready</option>
                        </select>
                    </td>
                    <td class="admin-actions-cell">
                        <button class="checkout-btn" style="padding: 6px 8px; font-size: 11px;" onclick="saveBookingState('${b.id}')">Update</button>
                        <button class="checkout-btn" style="padding: 6px 8px; font-size: 11px; background-color: var(--danger-color); color: white;" onclick="deleteBooking('${b.id}')">Delete</button>
                    </td>
                </tr>
            `).join('');
        }

        // Render prescriptions list
        const prescRows = document.getElementById('admin-prescriptions-rows');
        if (serverPrescriptions.length === 0) {
            prescRows.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">No prescription uploads found.</td></tr>`;
        } else {
            prescRows.innerHTML = serverPrescriptions.map(p => `
                <tr>
                    <td><strong>${p.name}</strong></td>
                    <td>
                        ${p.phone}
                        <a href="https://wa.me/${p.phone.replace(/\D/g, '').length === 10 ? '91' + p.phone.replace(/\D/g, '') : p.phone.replace(/\D/g, '')}" 
                           target="_blank" 
                           style="color: #25D366; font-size: 16px; margin-left: 6px; display: inline-flex; align-items: center; vertical-align: middle;" 
                           title="Chat on WhatsApp">
                            <i class="fa-brands fa-whatsapp"></i>
                        </a>
                    </td>
                    <td><a href="#" style="color: var(--primary-color); font-weight: 600;" onclick="alert('Viewing: ${p.filename}')"><i class="fa-solid fa-file-image"></i> ${p.filename}</a></td>
                    <td>
                        ${p.status === 'pending' ? `
                            <button class="checkout-btn" style="padding: 6px 12px; font-size: 11px; background-color: var(--accent-color);" onclick="processPrescriptionCallback('${p.id}')">Confirm Callback</button>
                        ` : `
                            <span class="status-pill ready">PROCESSED</span>
                        `}
                    </td>
                </tr>
            `).join('');
        }

        // Load patient bookings options inside report compiler dropdown
        const selectBooking = document.getElementById('rep-booking-id');
        selectBooking.innerHTML = serverBookings.map(b => `
            <option value="${b.id}">${b.patientName} (${b.id} - ${b.items})</option>
        `).join('');
    } catch (err) {
        console.error(err);
    }
}

window.saveBookingState = async function(bookingId) {
    const phleb = document.getElementById(`phleb-sel-${bookingId}`).value;
    const status = document.getElementById(`status-sel-${bookingId}`).value;

    try {
        const response = await fetch(`/api/bookings/${bookingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phlebotomist: phleb, status: status })
        });
        if (!response.ok) throw new Error('Failed to save booking state on server');
        alert('Booking details updated successfully.');
        loadAdminDashboard();
    } catch (err) {
        alert(err.message);
    }
};

window.deleteBooking = async function(bookingId) {
    if (!confirm(`Are you sure you want to delete patient booking ID: ${bookingId}?`)) {
        return;
    }

    try {
        const response = await fetch(`/api/bookings/${bookingId}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete booking on server');
        alert('Booking deleted successfully.');
        loadAdminDashboard();
    } catch (err) {
        alert(err.message);
    }
};

window.processPrescriptionCallback = async function(prescId) {
    try {
        const response = await fetch(`/api/prescriptions/${prescId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'processed' })
        });
        if (!response.ok) throw new Error('Failed to update prescription callback status');
        alert('Callback processed successfully.');
        loadAdminDashboard();
    } catch (err) {
        alert(err.message);
    }
};

window.saveAdminReport = async function() {
    const bookingId = document.getElementById('rep-booking-id').value;
    const reportCode = document.getElementById('rep-receipt-code').value.trim().toUpperCase();
    const glucose = parseInt(document.getElementById('rep-val-sugar').value) || 90;
    const hba1c = parseFloat(document.getElementById('rep-val-hba1c').value) || 5.2;
    const cholesterol = parseInt(document.getElementById('rep-val-chol').value) || 180;
    const hemoglobin = parseFloat(document.getElementById('rep-val-hemo').value) || 14.2;
    const advice = document.getElementById('rep-advice').value.trim();

    if (!bookingId || !reportCode || !advice) {
        alert('Report ID, Patient Booking, and Doctor advice are required.');
        return;
    }

    // Helper to read file as base64 Promise
    const readPdfFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error('Failed to read PDF file'));
            reader.readAsDataURL(file);
        });
    };

    let pdfData = null;
    const pdfFileInput = document.getElementById('rep-pdf-file');
    if (pdfFileInput && pdfFileInput.files.length > 0) {
        const file = pdfFileInput.files[0];
        if (file.size > 5 * 1024 * 1024) {
            alert('PDF file is too large. Please select a PDF file smaller than 5MB.');
            return;
        }
        try {
            pdfData = await readPdfFile(file);
        } catch (fileErr) {
            alert(fileErr.message);
            return;
        }
    }

    try {
        // Fetch booking details from server
        const response = await fetch('/api/bookings');
        if (!response.ok) throw new Error('Failed to retrieve bookings');
        const serverBookings = await response.json();
        const booking = serverBookings.find(b => b.id === bookingId);
        if (!booking) return;

        // Determine status flags
        const getSugarFlag = (v) => v > 100 ? 'borderline' : 'normal';
        const getHbA1cFlag = (v) => v > 5.6 ? 'borderline' : 'normal';
        const getCholFlag = (v) => v > 200 ? 'high' : 'normal';

        const newReport = {
            bookingId: bookingId,
            patient: {
                name: booking.patientName,
                age: booking.patientAge,
                gender: booking.patientGender,
                date: booking.slotDate || new Date().toLocaleDateString(),
                refBy: 'Dr. Mehul Bichpuriya, MD'
            },
            results: [
                {
                    category: 'Diabetes Screening',
                    tests: [
                        { name: 'Fasting Blood Glucose', value: glucose, unit: 'mg/dL', min: 70, max: 100, status: getSugarFlag(glucose) },
                        { name: 'HbA1c (Average Sugar)', value: hba1c, unit: '%', min: 4.0, max: 5.6, status: getHbA1cFlag(hba1c) }
                    ]
                },
                {
                    category: 'Lipid Profile & CBC',
                    tests: [
                        { name: 'Total Cholesterol', value: cholesterol, unit: 'mg/dL', min: 100, max: 200, status: getCholFlag(cholesterol) },
                        { name: 'Haemoglobin', value: hemoglobin, unit: 'g/dL', min: 13.0, max: 17.0, status: 'normal' }
                    ]
                }
            ],
            advice: advice,
            pdfData: pdfData
        };

        const saveRes = await fetch('/api/reports', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reportCode, reportData: newReport })
        });
        if (!saveRes.ok) {
            const errData = await saveRes.json().catch(() => ({}));
            throw new Error(errData.error || `Server returned status ${saveRes.status}`);
        }

        alert(`Smart Report ${reportCode} generated successfully! The patient can now view it using this report ID.`);
        
        // Clear inputs
        document.getElementById('rep-receipt-code').value = '';
        document.getElementById('rep-val-sugar').value = '';
        document.getElementById('rep-val-hba1c').value = '';
        document.getElementById('rep-val-chol').value = '';
        document.getElementById('rep-val-hemo').value = '';
        document.getElementById('rep-advice').value = '';
        if (pdfFileInput) pdfFileInput.value = '';

        loadAdminDashboard();
    } catch (err) {
        alert('Error compiling report: ' + err.message);
    }
};

// Testimonials automatic and manual slider
let testimonialIndex = 0;
function setupTestimonials() {
    const slides = document.querySelectorAll('.testimonial-slide');
    if (slides.length === 0) return;

    window.changeTestimonial = function(direction) {
        slides[testimonialIndex].classList.remove('active');
        testimonialIndex = (testimonialIndex + direction + slides.length) % slides.length;
        slides[testimonialIndex].classList.add('active');
    };

    // Auto rotate every 8 seconds
    setInterval(() => {
        changeTestimonial(1);
    }, 8000);
}

// Mobile navigation drawer controls
window.openMobileNav = function() {
    document.getElementById('mobile-nav-overlay').classList.add('active');
    document.getElementById('mobile-nav-drawer').classList.add('active');
};

window.closeMobileNav = function() {
    document.getElementById('mobile-nav-overlay').classList.remove('active');
    document.getElementById('mobile-nav-drawer').classList.remove('active');
};

// Open Patient Dashboard to Bookings tab directly
window.openMyBookings = function() {
    if (currentUser) {
        loadPatientDashboard();
        togglePatientTab('bookings');
        openModal('modal-patient-dashboard');
    } else {
        window.location.href = 'login.html';
    }
};

// ==========================================
// ADMIN NOTIFICATION POLLING
// ==========================================
let knownBookingIds = [];
let knownPrescriptionIds = [];
let adminPollInterval = null;

function initAdminNotifications() {
    if (localStorage.getItem('adminLoggedIn') !== 'true') return;

    // Fetch initial baseline of bookings
    fetch('/api/bookings')
        .then(res => {
            if (!res.ok) throw new Error('Failed to fetch bookings');
            return res.json();
        })
        .then(bookings => {
            knownBookingIds = bookings.map(b => b.id);
        })
        .catch(err => console.error("Baseline bookings check error:", err));

    // Fetch initial baseline of prescriptions
    fetch('/api/prescriptions')
        .then(res => {
            if (!res.ok) throw new Error('Failed to fetch prescriptions');
            return res.json();
        })
        .then(prescriptions => {
            knownPrescriptionIds = prescriptions.map(p => p.id);
        })
        .catch(err => console.error("Baseline prescriptions check error:", err));

    if (adminPollInterval) clearInterval(adminPollInterval);
    adminPollInterval = setInterval(checkNewAdminEvents, 5000);
}

async function checkNewAdminEvents() {
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
        if (adminPollInterval) {
            clearInterval(adminPollInterval);
            adminPollInterval = null;
        }
        return;
    }

    try {
        const bookingsRes = await fetch('/api/bookings');
        const prescriptionsRes = await fetch('/api/prescriptions');
        
        if (!bookingsRes.ok || !prescriptionsRes.ok) return;
        
        const bookings = await bookingsRes.json();
        const prescriptions = await prescriptionsRes.json();

        let hasNewEvent = false;

        // Check for new bookings
        bookings.forEach(b => {
            if (!knownBookingIds.includes(b.id)) {
                knownBookingIds.push(b.id);
                showAdminToast('booking', b);
                hasNewEvent = true;
            }
        });

        // Check for new prescriptions
        prescriptions.forEach(p => {
            if (!knownPrescriptionIds.includes(p.id)) {
                knownPrescriptionIds.push(p.id);
                showAdminToast('prescription', p);
                hasNewEvent = true;
            }
        });

        if (hasNewEvent) {
            playNotificationSound();
            loadAdminDashboard();
        }
    } catch (err) {
        console.error("Admin poll error:", err);
    }
}

function showAdminToast(type, data) {
    let container = document.getElementById('admin-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'admin-toast-container';
        container.style.cssText = `
            position: fixed;
            top: 24px;
            right: 24px;
            z-index: 99999;
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-width: 380px;
            width: calc(100% - 48px);
        `;
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(8px);
        border-radius: var(--border-radius-md, 12px);
        box-shadow: 0 10px 25px -5px rgba(0, 71, 174, 0.15), 0 8px 10px -6px rgba(0, 71, 174, 0.15);
        border: 1px solid rgba(0, 71, 174, 0.12);
        border-left: 5px solid ${type === 'booking' ? '#10b981' : '#f59e0b'};
        padding: 16px;
        display: flex;
        align-items: flex-start;
        gap: 14px;
        position: relative;
        transition: all 0.3s ease;
        animation: toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    `;

    const title = type === 'booking' ? 'New Home Booking!' : 'New Prescription Uploaded!';
    const icon = type === 'booking' ? 'fa-house-chimney-medical' : 'fa-file-prescription';
    const color = type === 'booking' ? '#10b981' : '#f59e0b';
    const detail = type === 'booking' 
        ? `<strong>${data.patientName}</strong> has scheduled a test booking for <strong>${data.slotDate}</strong>.` 
        : `<strong>${data.name}</strong> uploaded a prescription for callback.`;

    toast.innerHTML = `
        <div style="background-color: ${color}15; color: ${color}; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 16px;">
            <i class="fa-solid ${icon}"></i>
        </div>
        <div style="flex-grow: 1; font-family: 'Outfit', sans-serif;">
            <h4 style="margin: 0 0 4px 0; color: #0f172a; font-size: 14px; font-weight: 700;">${title}</h4>
            <p style="margin: 0; color: #475569; font-size: 13px; line-height: 1.4;">${detail}</p>
            <span style="font-size: 11px; color: #94a3b8; display: block; margin-top: 6px;">Just now</span>
        </div>
        <button style="background: none; border: none; color: #94a3b8; cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; font-size: 14px; transition: color 0.2s;" onclick="this.parentElement.remove()">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 6000);
}

function playNotificationSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        
        function beep(freq, delay, duration) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
            
            gain.gain.setValueAtTime(0.1, ctx.currentTime + delay);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + duration - 0.05);
            
            osc.start(ctx.currentTime + delay);
            osc.stop(ctx.currentTime + delay + duration);
        }
        
        beep(880, 0, 0.12);
        beep(1046.5, 0.15, 0.18);
    } catch (e) {
        console.error("Audio Context playback error:", e);
    }
}

// HELPER: Apply 3-day appointment date constraints
function applyDateLimits(inputElement) {
    if (!inputElement) return;
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    inputElement.min = `${yyyy}-${mm}-${dd}`;

    const maxDateObj = new Date();
    maxDateObj.setDate(today.getDate() + 3);
    const maxYyyy = maxDateObj.getFullYear();
    let maxMm = maxDateObj.getMonth() + 1;
    let maxDd = maxDateObj.getDate();
    if (maxDd < 10) maxDd = '0' + maxDd;
    if (maxMm < 10) maxMm = '0' + maxMm;
    inputElement.max = `${maxYyyy}-${maxMm}-${maxDd}`;
}

// User Booking Edit modal trigger
window.editThisBooking = async function(bookingId) {
    closeModal('modal-patient-dashboard');
    try {
        const response = await fetch('/api/bookings');
        if (!response.ok) throw new Error('Failed to fetch bookings list');
        const bookingsList = await response.json();
        const booking = bookingsList.find(b => b.id === bookingId);
        if (!booking) throw new Error('Booking not found');

        // Populate fields
        document.getElementById('edit-booking-id').value = booking.id;
        document.getElementById('edit-patient-name').value = booking.patientName;
        document.getElementById('edit-patient-age').value = booking.patientAge;
        document.getElementById('edit-patient-gender').value = booking.patientGender || 'Male';
        document.getElementById('edit-patient-phone').value = booking.patientPhone;
        document.getElementById('edit-patient-address').value = booking.patientAddress;
        
        const dateInput = document.getElementById('edit-booking-date');
        dateInput.value = booking.slotDate;
        applyDateLimits(dateInput);

        document.getElementById('edit-booking-slot').value = booking.slotTime;

        // Build packages & tests checkboxes list
        let html = '<h5 style="margin: 0; font-size: 13px; font-weight: 700; color: var(--text-dark); border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Health Packages</h5>';
        database.packages.forEach(pkg => {
            const checked = booking.items.includes(pkg.name) ? 'checked' : '';
            html += `
                <label style="display: flex; align-items: flex-start; gap: 8px; font-size: 13px; font-weight: 500; cursor: pointer; color: var(--text-dark); margin: 4px 0;">
                    <input type="checkbox" class="edit-item-checkbox" data-price="${pkg.price}" data-name="${pkg.name}" value="${pkg.id}" ${checked} onchange="updateEditedPrice()" style="margin-top: 3px;">
                    <div>
                        <strong>${pkg.name}</strong>
                        <div style="font-size: 11px; color: var(--text-muted);">₹${pkg.price} • ${pkg.parameters} Parameters</div>
                    </div>
                </label>
            `;
        });

        html += '<h5 style="margin: 10px 0 0 0; font-size: 13px; font-weight: 700; color: var(--text-dark); border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Individual Blood Tests</h5>';
        database.tests.forEach(test => {
            const checked = booking.items.includes(test.name) ? 'checked' : '';
            html += `
                <label style="display: flex; align-items: flex-start; gap: 8px; font-size: 13px; font-weight: 500; cursor: pointer; color: var(--text-dark); margin: 4px 0;">
                    <input type="checkbox" class="edit-item-checkbox" data-price="${test.price}" data-name="${test.name}" value="${test.id}" ${checked} onchange="updateEditedPrice()" style="margin-top: 3px;">
                    <div>
                        <strong>${test.name}</strong>
                        <div style="font-size: 11px; color: var(--text-muted);">₹${test.price} • ${test.prep}</div>
                    </div>
                </label>
            `;
        });

        document.getElementById('edit-items-list-container').innerHTML = html;
        updateEditedPrice();

        openModal('modal-edit-booking');
    } catch (err) {
        alert('Error loading booking: ' + err.message);
    }
};

window.updateEditedPrice = function() {
    let total = 0;
    document.querySelectorAll('.edit-item-checkbox:checked').forEach(cb => {
        total += parseInt(cb.getAttribute('data-price'));
    });
    document.getElementById('edit-booking-price-tag').innerText = `₹${total}`;
};

window.saveEditedBooking = async function(event) {
    event.preventDefault();
    
    const id = document.getElementById('edit-booking-id').value;
    const patientName = document.getElementById('edit-patient-name').value.trim();
    const patientAge = document.getElementById('edit-patient-age').value.trim();
    const patientGender = document.getElementById('edit-patient-gender').value;
    const patientPhone = document.getElementById('edit-patient-phone').value.trim();
    const patientAddress = document.getElementById('edit-patient-address').value.trim();
    const slotDate = document.getElementById('edit-booking-date').value;
    const slotTime = document.getElementById('edit-booking-slot').value;

    const checkedCbs = document.querySelectorAll('.edit-item-checkbox:checked');
    if (checkedCbs.length === 0) {
        alert('Please select at least one test or package.');
        return;
    }

    // Double check date limits
    const dateObj = new Date(slotDate);
    dateObj.setHours(0,0,0,0);
    const minDate = new Date();
    minDate.setHours(0,0,0,0);
    const maxDate = new Date();
    maxDate.setDate(minDate.getDate() + 3);
    maxDate.setHours(0,0,0,0);

    if (dateObj < minDate || dateObj > maxDate) {
        alert('Appointment date must be scheduled within 3 days from today.');
        return;
    }

    const names = Array.from(checkedCbs).map(cb => cb.getAttribute('data-name')).join(', ');
    let totalPriceVal = 0;
    checkedCbs.forEach(cb => totalPriceVal += parseInt(cb.getAttribute('data-price')));
    const totalPrice = `₹${totalPriceVal}`;

    try {
        const response = await fetch(`/api/bookings/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                patientName,
                patientAge,
                patientGender,
                patientPhone,
                patientAddress,
                slotDate,
                slotTime,
                items: names,
                totalPrice
            })
        });

        if (!response.ok) throw new Error('Failed to save booking edits on server');
        
        alert('Booking successfully updated!');
        closeModal('modal-edit-booking');
        
        // Reopen patient dashboard to refresh booking history view
        loadPatientDashboard();
        openModal('modal-patient-dashboard');
    } catch (err) {
        alert('Error updating booking: ' + err.message);
    }
};

// Catalog Management Tab Loader
async function loadAdminCatalog() {
    try {
        const response = await fetch('/api/catalog');
        if (!response.ok) throw new Error('Failed to load catalog data');
        database = await response.json();

        // Render Packages Rows
        const pkgRows = document.getElementById('admin-packages-rows');
        if (pkgRows) {
            pkgRows.innerHTML = database.packages.map(p => `
                <tr>
                    <td><strong>${p.id}</strong></td>
                    <td>${p.name}</td>
                    <td>₹${p.price}</td>
                    <td>₹${p.originalPrice}</td>
                    <td>${p.parameters}</td>
                    <td><span class="package-tag">${p.tag}</span></td>
                    <td>
                        <div style="display: flex; flex-direction: column; gap: 6px;">
                            <button class="checkout-btn" style="margin: 0; padding: 4px 8px; font-size: 11px; background-color: #f59e0b; color: white;" onclick="editAdminPackage('${p.id}')">
                                Edit <i class="fa-solid fa-pen"></i>
                            </button>
                            <button class="checkout-btn" style="margin: 0; padding: 4px 8px; font-size: 11px; background-color: var(--danger-color); color: white;" onclick="deleteAdminPackage('${p.id}')">
                                Delete <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        // Render Tests Rows
        const testRows = document.getElementById('admin-tests-rows');
        if (testRows) {
            testRows.innerHTML = database.tests.map(t => `
                <tr>
                    <td><strong>${t.id}</strong></td>
                    <td>${t.name}</td>
                    <td>₹${t.price}</td>
                    <td><code>${t.code}</code></td>
                    <td>${t.prep}</td>
                    <td>${t.sample}</td>

                    <td>
                        <div style="display: flex; flex-direction: column; gap: 6px;">
                            <button class="checkout-btn" style="margin: 0; padding: 4px 8px; font-size: 11px; background-color: #f59e0b; color: white;" onclick="editAdminTest('${t.id}')">
                                Edit <i class="fa-solid fa-pen"></i>
                            </button>
                            <button class="checkout-btn" style="margin: 0; padding: 4px 8px; font-size: 11px; background-color: var(--danger-color); color: white;" onclick="deleteAdminTest('${t.id}')">
                                Delete <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }
    } catch (err) {
        console.error("Error loading admin catalog:", err);
    }
}

// Edit Dialog Triggers
window.editAdminPackage = function(pkgId) {
    const pkg = database.packages.find(p => p.id === pkgId);
    if (!pkg) return;

    document.getElementById('edit-pkg-id').value = pkg.id;
    document.getElementById('edit-pkg-name').value = pkg.name;
    document.getElementById('edit-pkg-price').value = pkg.price;
    document.getElementById('edit-pkg-origprice').value = pkg.originalPrice;
    document.getElementById('edit-pkg-params').value = pkg.parameters;
    document.getElementById('edit-pkg-tag').value = pkg.tag;
    document.getElementById('edit-pkg-tests').value = pkg.tests.join('\n');

    openModal('modal-edit-admin-package');
};

window.editAdminTest = function(testId) {
    const test = database.tests.find(t => t.id === testId);
    if (!test) return;

    document.getElementById('edit-test-id').value = test.id;
    document.getElementById('edit-test-name').value = test.name;
    document.getElementById('edit-test-price').value = test.price;
    document.getElementById('edit-test-code').value = test.code;
    document.getElementById('edit-test-prep').value = test.prep;
    document.getElementById('edit-test-sample').value = test.sample;


    openModal('modal-edit-admin-test');
};

// Save handlers
window.saveAdminPackage = async function(event) {
    event.preventDefault();

    const id = document.getElementById('edit-pkg-id').value;
    const name = document.getElementById('edit-pkg-name').value.trim();
    const price = parseInt(document.getElementById('edit-pkg-price').value);
    const originalPrice = parseInt(document.getElementById('edit-pkg-origprice').value);
    const parameters = parseInt(document.getElementById('edit-pkg-params').value);
    const tag = document.getElementById('edit-pkg-tag').value.trim();
    const tests = document.getElementById('edit-pkg-tests').value.split('\n').map(t => t.trim()).filter(Boolean);

    try {
        const response = await fetch(`/api/catalog/package/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, originalPrice, parameters, tag, tests })
        });

        if (!response.ok) throw new Error('Failed to update package details');

        alert('Package details updated successfully!');
        closeModal('modal-edit-admin-package');
        
        // Refresh catalog view and user-facing cards
        await initApp(); 
        loadAdminCatalog();
    } catch (err) {
        alert('Error: ' + err.message);
    }
};

window.saveAdminTest = async function(event) {
    event.preventDefault();

    const id = document.getElementById('edit-test-id').value;
    const name = document.getElementById('edit-test-name').value.trim();
    const price = parseInt(document.getElementById('edit-test-price').value);
    const code = document.getElementById('edit-test-code').value.trim();
    const prep = document.getElementById('edit-test-prep').value.trim();
    const sample = document.getElementById('edit-test-sample').value.trim();

    try {
        const response = await fetch(`/api/catalog/test/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, code, prep, sample })
        });

        if (!response.ok) throw new Error('Failed to update test details');

        alert('Test details updated successfully!');
        closeModal('modal-edit-admin-test');
        
        // Refresh catalog view and user-facing cards
        await initApp(); 
        loadAdminCatalog();
    } catch (err) {
        alert('Error: ' + err.message);
    }
};

window.openAddAdminTestModal = function() {
    document.getElementById('add-admin-test-form').reset();
    openModal('modal-add-admin-test');
};

window.saveNewAdminTest = async function(event) {
    event.preventDefault();

    const name = document.getElementById('add-test-name').value.trim();
    const price = parseInt(document.getElementById('add-test-price').value);
    const code = document.getElementById('add-test-code').value.trim();
    const prep = document.getElementById('add-test-prep').value.trim();
    const sample = document.getElementById('add-test-sample').value.trim();

    try {
        const response = await fetch('/api/catalog/test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, code, prep, sample })
        });

        if (!response.ok) throw new Error('Failed to add new blood test');

        alert('New blood test added to catalog successfully!');
        closeModal('modal-add-admin-test');
        
        // Refresh catalog view and user-facing cards
        await initApp(); 
        loadAdminCatalog();
    } catch (err) {
        alert('Error: ' + err.message);
    }
};

window.openAddAdminPackageModal = function() {
    document.getElementById('add-admin-package-form').reset();
    openModal('modal-add-admin-package');
};

window.saveNewAdminPackage = async function(event) {
    event.preventDefault();

    const name = document.getElementById('add-pkg-name').value.trim();
    const price = parseInt(document.getElementById('add-pkg-price').value);
    const originalPrice = parseInt(document.getElementById('add-pkg-origprice').value);
    const parameters = parseInt(document.getElementById('add-pkg-params').value);
    const tag = document.getElementById('add-pkg-tag').value.trim();
    const tests = document.getElementById('add-pkg-tests').value.split('\n').map(t => t.trim()).filter(Boolean);

    try {
        const response = await fetch('/api/catalog/package', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, originalPrice, parameters, tag, tests })
        });

        if (!response.ok) throw new Error('Failed to add new health package');

        alert('New health package added to catalog successfully!');
        closeModal('modal-add-admin-package');
        
        // Refresh catalog view and user-facing cards
        await initApp(); 
        loadAdminCatalog();
    } catch (err) {
        alert('Error: ' + err.message);
    }
};

window.deleteAdminPackage = async function(pkgId) {
    if (!confirm('Are you sure you want to delete this health package from the catalog?')) {
        return;
    }

    try {
        const response = await fetch(`/api/catalog/package/${pkgId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || 'Failed to delete package');
        }

        alert('Package deleted from catalog successfully!');
        
        // Refresh catalog view and user-facing cards
        await initApp(); 
        loadAdminCatalog();
    } catch (err) {
        alert('Error: ' + err.message);
    }
};

window.deleteAdminTest = async function(testId) {
    if (!confirm('Are you sure you want to delete this blood test from the catalog?')) {
        return;
    }

    try {
        const response = await fetch(`/api/catalog/test/${testId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || 'Failed to delete test');
        }

        alert('Blood test deleted from catalog successfully!');
        
        // Refresh catalog view and user-facing cards
        await initApp(); 
        loadAdminCatalog();
    } catch (err) {
        alert('Error: ' + err.message);
    }
};

window.logUserSearch = async function(query) {
    if (!query || !query.trim()) return;
    try {
        const email = currentUser ? currentUser.email : 'guest';
        await fetch('/api/user-searches', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: query.trim(), email })
        });
    } catch (err) {
        console.error('Error logging search query:', err);
    }
};

window.loadAdminCustomers = async function() {
    try {
        const usersRes = await fetch('/api/admin/customers');
        const searchesRes = await fetch('/api/admin/searches');
        
        if (!usersRes.ok || !searchesRes.ok) throw new Error('Failed to fetch patients or searches data');
        
        const users = await usersRes.json();
        const searches = await searchesRes.json();
        
        // Render Registered Customer Accounts
        const customersRows = document.getElementById('admin-customers-rows');
        if (customersRows) {
            if (users.length === 0) {
                customersRows.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No registered customer accounts found.</td></tr>`;
            } else {
                customersRows.innerHTML = users.map(u => {
                    const userSearches = searches
                        .filter(s => s.email && s.email.toLowerCase() === u.email.toLowerCase())
                        .map(s => s.query);
                    
                    const uniqueSearches = [...new Set(userSearches)];
                    
                    let searchesHtml = '';
                    if (uniqueSearches.length === 0) {
                        searchesHtml = '<span style="font-size: 12px; color: var(--text-muted);">No searches yet</span>';
                    } else {
                        searchesHtml = uniqueSearches.map(q => 
                            `<span style="display: inline-block; background: rgba(0, 168, 150, 0.08); color: var(--accent-color); padding: 3px 8px; border-radius: 50px; font-size: 11px; font-weight: 600; margin: 2px 4px 2px 0; border: 1px solid rgba(0, 168, 150, 0.15);">${q}</span>`
                        ).join('');
                    }
                    
                    let passHint = '';
                    if (u.pass) {
                        if (u.pass.length <= 2) {
                            passHint = '••';
                        } else {
                            passHint = u.pass.substring(0, 2) + '•'.repeat(u.pass.length - 2);
                        }
                    } else {
                        passHint = 'N/A';
                    }
                    
                    const cleanedPhone = u.phone ? u.phone.replace(/\D/g, '') : '';
                    const waLink = cleanedPhone ? `
                        <a href="https://wa.me/${cleanedPhone.length === 10 ? '91' + cleanedPhone : cleanedPhone}" 
                           target="_blank" 
                           style="color: #25D366; font-size: 16px; margin-left: 6px; display: inline-flex; align-items: center; vertical-align: middle;" 
                           title="Chat on WhatsApp">
                            <i class="fa-brands fa-whatsapp"></i>
                        </a>
                    ` : '';
                    
                    const isSystemAdmin = u.email.toLowerCase() === '909mehulbichpuriya@gmail.com';
                    const actionButton = isSystemAdmin
                        ? '<span style="font-size: 11px; color: var(--text-muted); font-style: italic;">Admin (System)</span>'
                        : `<button class="checkout-btn" style="padding: 4px 8px; font-size: 11px; background-color: var(--danger-color); color: white; width: auto; margin: 0;" onclick="deleteAdminCustomer('${u.email}')">Delete</button>`;

                    return `
                        <tr>
                            <td><strong>${u.name}</strong></td>
                            <td>${u.email}</td>
                            <td>
                                ${u.phone || 'N/A'}
                                ${waLink}
                            </td>
                            <td><code style="font-family: monospace; font-size: 13px; letter-spacing: 1px;">${passHint}</code></td>
                            <td><div style="max-width: 350px; display: flex; flex-wrap: wrap;">${searchesHtml}</div></td>
                            <td>${actionButton}</td>
                        </tr>
                    `;
                }).join('');
            }
        }
        
        // Render chronological searches log (newest first)
        const searchesRows = document.getElementById('admin-searches-rows');
        if (searchesRows) {
            if (searches.length === 0) {
                searchesRows.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">No search queries logged yet.</td></tr>`;
            } else {
                const reversedSearches = [...searches].reverse();
                searchesRows.innerHTML = reversedSearches.map(s => {
                    const isGuest = !s.email || s.email.toLowerCase() === 'guest';
                    const userBadge = isGuest 
                        ? `<span style="display: inline-block; background: rgba(108, 117, 125, 0.1); color: #6c757d; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600;">Guest Visitor</span>`
                        : `<span style="display: inline-block; background: rgba(0, 71, 174, 0.08); color: var(--primary-color); padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600;">${s.email}</span>`;
                    
                    const deleteSearchButton = `<button class="checkout-btn" style="padding: 4px 8px; font-size: 11px; background-color: var(--danger-color); color: white; width: auto; margin: 0;" onclick="deleteAdminSearch('${s.id}')">Delete</button>`;

                    return `
                        <tr>
                            <td style="font-size: 13px; color: var(--text-muted);">${s.timestamp}</td>
                            <td>${userBadge}</td>
                            <td><strong style="color: var(--text-dark);">${s.query}</strong></td>
                            <td>${deleteSearchButton}</td>
                        </tr>
                    `;
                }).join('');
            }
        }
    } catch (err) {
        console.error('Error loading admin customers:', err);
    }
};

window.deleteAdminCustomer = async function(email) {
    if (!confirm(`Are you sure you want to delete the registered customer account for '${email}'? This will permanently remove their profile data and associated searches.`)) {
        return;
    }

    try {
        const response = await fetch(`/api/admin/customers/${encodeURIComponent(email)}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || 'Failed to delete customer account');
        }

        alert('Customer account and search activity logs deleted successfully!');
        loadAdminCustomers();
    } catch (err) {
        alert('Error: ' + err.message);
    }
};

window.deleteAdminSearch = async function(searchId) {
    if (!confirm('Are you sure you want to remove this search log entry from the logs history?')) {
        return;
    }

    try {
        const response = await fetch(`/api/admin/searches/${searchId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || 'Failed to delete search entry');
        }

        loadAdminCustomers();
    } catch (err) {
        alert('Error: ' + err.message);
    }
};

