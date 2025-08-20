// بيانات التقييمات (مؤقتة - يمكن ربطها بقاعدة بيانات)
const reviewsData = {
    1: [
        {
            id: 1,
            name: "أحمد محمد",
            rating: 5,
            comment: "كبسة رائعة ونكهة أصيلة، الأسرة محترمة جداً والطعام طازج",
            date: "2024-01-15",
            verified: true
        },
        {
            id: 2,
            name: "فاطمة العلي",
            rating: 4,
            comment: "طعم جميل والتوصيل سريع، بس الكمية كانت قليلة شوي",
            date: "2024-01-10",
            verified: true
        },
        {
            id: 3,
            name: "سعد الغامدي",
            rating: 5,
            comment: "أفضل كبسة جربتها، تستاهل كل ريال دفعته",
            date: "2024-01-08",
            verified: false
        }
    ],
    2: [
        {
            id: 4,
            name: "نورا أحمد",
            rating: 5,
            comment: "كنافة لذيذة جداً وطازجة، تذكرني بطعم البيت",
            date: "2024-01-12",
            verified: true
        },
        {
            id: 5,
            name: "خالد السعيد",
            rating: 4,
            comment: "حلويات ممتازة والأسعار معقولة",
            date: "2024-01-05",
            verified: true
        }
    ],
    3: [
        {
            id: 6,
            name: "مريم الحربي",
            rating: 5,
            comment: "فطائر السبانخ رهيبة والعجينة طرية",
            date: "2024-01-14",
            verified: true
        }
    ]
};

// الحصول على تقييمات أسرة معينة
function getReviewsForFamily(familyId) {
    return reviewsData[familyId] || [];
}

// حساب متوسط التقييم
function calculateAverageRating(reviews) {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
}

// حساب توزيع التقييمات
function calculateRatingDistribution(reviews) {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
        distribution[review.rating]++;
    });
    return distribution;
}

// إنشاء نجوم التقييم
function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            starsHTML += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }
    
    return starsHTML;
}

// إنشاء بطاقة تقييم
function createReviewCard(review) {
    const reviewDate = new Date(review.date).toLocaleDateString('ar-SA');
    
    return `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="reviewer-details">
                        <h5 class="reviewer-name">
                            ${review.name}
                            ${review.verified ? '<i class="fas fa-check-circle verified-badge" title="عميل موثق"></i>' : ''}
                        </h5>
                        <div class="review-rating">
                            ${createStarRating(review.rating)}
                        </div>
                    </div>
                </div>
                <span class="review-date">${reviewDate}</span>
            </div>
            <div class="review-content">
                <p>${review.comment}</p>
            </div>
        </div>
    `;
}

// إظهار نموذج إضافة تقييم
function showAddReviewForm() {
    document.getElementById('add-review-form').style.display = 'block';
}

// إخفاء نموذج إضافة تقييم
function hideAddReviewForm() {
    document.getElementById('add-review-form').style.display = 'none';
}

// إرسال تقييم جديد
function submitReview(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const newReview = {
        id: Date.now(),
        name: formData.get('name'),
        rating: parseInt(formData.get('rating')),
        comment: formData.get('comment'),
        date: new Date().toISOString().split('T')[0],
        verified: false
    };
    
    // إضافة التقييم للبيانات
    if (!reviewsData[currentFamily.id]) {
        reviewsData[currentFamily.id] = [];
    }
    reviewsData[currentFamily.id].unshift(newReview);
    
    // إعادة تحميل قسم التقييمات
    document.getElementById('reviews-panel').innerHTML = createReviewsSection(currentFamily);
    
    // إخفاء النموذج
    hideAddReviewForm();
    
    // إظهار رسالة نجاح
    showNotification('تم إضافة تقييمك بنجاح!', 'success');
}

// بيانات الأسر المنتجة
const familiesData = [
    {
        id: 1,
        name: "أسرة أم محمد للأكلات الشعبية",
        location: "الرياض - حي النرجس",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
        rating: 4.8,
        orders: 250,
        specialties: ["كبسة", "مندي", "مظبي"],
        description: "نقدم أشهى الأكلات الشعبية السعودية بنكهة أصيلة ومذاق لا يُنسى",
        phone: "+966501234567",
        whatsapp: "966501234567",
        menu: {
            main: [
                {
                    id: 1,
                    name: "كبسة لحم",
                    description: "كبسة لحم بالطريقة التقليدية مع الخضار والتوابل الخاصة",
                    price: 45,
                    time: "45 دقيقة",
                    image: "https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=400"
                },
                {
                    id: 2,
                    name: "مندي دجاج",
                    description: "مندي دجاج مشوي في التنور مع الأرز البسمتي",
                    price: 35,
                    time: "60 دقيقة",
                    image: "https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=400"
                }
            ],
            appetizers: [
                {
                    id: 3,
                    name: "سلطة فتوش",
                    description: "سلطة فتوش طازجة مع الخضار الموسمية",
                    price: 15,
                    time: "10 دقائق",
                    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"
                }
            ]
        }
    },
    {
        id: 2,
        name: "مطبخ أم عبدالله للحلويات",
        location: "جدة - حي الصفا",
        image: "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800",
        rating: 4.9,
        orders: 180,
        specialties: ["كنافة", "بقلاوة", "معمول"],
        description: "متخصصون في الحلويات الشرقية والغربية بأجود المكونات",
        phone: "+966502345678",
        whatsapp: "966502345678",
        menu: {
            desserts: [
                {
                    id: 4,
                    name: "كنافة بالجبن",
                    description: "كنافة طازجة بالجبن العكاوي والقطر",
                    price: 25,
                    time: "30 دقيقة",
                    image: "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=400"
                },
                {
                    id: 5,
                    name: "بقلاوة مشكلة",
                    description: "تشكيلة من البقلاوة بالفستق واللوز والجوز",
                    price: 30,
                    time: "20 دقيقة",
                    image: "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=400"
                }
            ]
        }
    },
    {
        id: 3,
        name: "بيت أم سعد للمعجنات",
        location: "الدمام - حي الشاطئ",
        image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800",
        rating: 4.7,
        orders: 320,
        specialties: ["فطائر", "سمبوسة", "خبز"],
        description: "نقدم أشهى المعجنات والفطائر الطازجة يومياً",
        phone: "+966503456789",
        whatsapp: "966503456789",
        menu: {
            pastries: [
                {
                    id: 6,
                    name: "فطائر السبانخ",
                    description: "فطائر السبانخ الطازجة بالعجينة المحضرة يومياً",
                    price: 12,
                    time: "25 دقيقة",
                    image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400"
                },
                {
                    id: 7,
                    name: "سمبوسة لحم",
                    description: "سمبوسة محشوة باللحم المفروم والخضار",
                    price: 18,
                    time: "30 دقيقة",
                    image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400"
                }
            ]
        }
    },
    {
        id: 4,
        name: "مطبخ أم فهد للأطباق التراثية",
        location: "مكة المكرمة - العزيزية",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
        rating: 4.6,
        orders: 150,
        specialties: ["جريش", "عصيدة", "هريس"],
        description: "نحافظ على التراث السعودي من خلال الأطباق الأصيلة",
        phone: "+966504567890",
        whatsapp: "966504567890",
        menu: {
            traditional: [
                {
                    id: 8,
                    name: "جريش باللحم",
                    description: "جريش مطبوخ باللحم والخضار على الطريقة التقليدية",
                    price: 28,
                    time: "90 دقيقة",
                    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"
                }
            ]
        }
    },
    {
        id: 5,
        name: "قهوة أم خالد ومشروبات",
        location: "المدينة المنورة - قباء",
        image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800",
        rating: 4.8,
        orders: 200,
        specialties: ["قهوة عربية", "شاي كرك", "عصائر"],
        description: "نقدم أفضل أنواع القهوة والمشروبات الساخنة والباردة",
        phone: "+966505678901",
        whatsapp: "966505678901",
        menu: {
            drinks: [
                {
                    id: 9,
                    name: "قهوة عربية",
                    description: "قهوة عربية أصيلة بالهيل والزعفران",
                    price: 8,
                    time: "5 دقائق",
                    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400"
                },
                {
                    id: 10,
                    name: "شاي كرك",
                    description: "شاي كرك بالحليب والتوابل الهندية",
                    price: 6,
                    time: "8 دقائق",
                    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400"
                }
            ]
        }
    },
    {
        id: 6,
        name: "مطبخ أم عبدالرحمن المنزلي",
        location: "الرياض - حي الملز",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
        rating: 4.9,
        orders: 280,
        specialties: ["ملوخية", "فاصولياء", "بامية"],
        description: "أطباق منزلية بنكهة الأم وحب العائلة",
        phone: "+966506789012",
        whatsapp: "966506789012",
        menu: {
            main: [
                {
                    id: 11,
                    name: "ملوخية بالدجاج",
                    description: "ملوخية خضراء طازجة مع قطع الدجاج والأرز الأبيض",
                    price: 32,
                    time: "40 دقيقة",
                    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"
                }
            ]
        }
    }
];

// بيانات المدن والأحياء
const citiesData = {
    riyadh: ["النرجس", "الملز", "العليا", "الروضة", "الصحافة", "المروج"],
    jeddah: ["الصفا", "الروضة", "الزهراء", "البلد", "الحمراء", "الشاطئ"],
    dammam: ["الشاطئ", "الفيصلية", "الجلوية", "الضباب", "الروضة", "النور"],
    mecca: ["العزيزية", "الشوقية", "المسفلة", "الكعكية", "الرصيفة", "الحجون"],
    medina: ["قباء", "الحرة الشرقية", "الحرة الغربية", "العوالي", "الجرف", "المطار"]
};

// متغيرات عامة
let cart = [];
let currentFamily = null;

// تهيئة الموقع
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // إخفاء شاشة التحميل
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 2000);

    // تهيئة شريط التنقل
    initializeNavbar();
    
    // تهيئة البحث
    initializeSearch();
    
    // تهيئة الأسر المنتجة
    initializeFamilies();
    
    // تهيئة التصنيفات
    initializeCategories();
    
    // تهيئة السلة
    initializeCart();
    
    // تهيئة النوافذ المنبثقة
    initializeModals();
    
    // تهيئة التأثيرات
    initializeAnimations();
    
    // تهيئة النماذج
    initializeForms();
    
    // تهيئة الجسيمات
    initializeParticles();
    
    // تهيئة العدادات
    initializeCounters();
    
    // تهيئة زر العودة للأعلى
    initializeBackToTop();
}

// تهيئة شريط التنقل
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // تأثير التمرير
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // القائمة المحمولة
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // التنقل السلس
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // إغلاق القائمة المحمولة
            navMenu.classList.remove('active');
            
            // تحديث الرابط النشط
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// تهيئة البحث
function initializeSearch() {
    const searchTabs = document.querySelectorAll('.search-tab');
    const searchPanels = document.querySelectorAll('.search-panel');
    const citySelect = document.getElementById('city-select');
    const districtSelect = document.getElementById('district-select');
    const searchBtn = document.getElementById('search-btn');

    // تبديل التبويبات
    searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabType = tab.getAttribute('data-tab');
            
            searchTabs.forEach(t => t.classList.remove('active'));
            searchPanels.forEach(p => p.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`${tabType}-panel`).classList.add('active');
        });
    });

    // تحديث الأحياء عند تغيير المدينة
    citySelect.addEventListener('change', () => {
        const selectedCity = citySelect.value;
        districtSelect.innerHTML = '<option value="">اختر الحي</option>';
        
        if (selectedCity && citiesData[selectedCity]) {
            citiesData[selectedCity].forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = district;
                districtSelect.appendChild(option);
            });
        }
    });

    // تنفيذ البحث
    searchBtn.addEventListener('click', () => {
        performSearch();
    });
}

// تنفيذ البحث
function performSearch() {
    const activeTab = document.querySelector('.search-tab.active').getAttribute('data-tab');
    let searchResults = [];

    if (activeTab === 'location') {
        const city = document.getElementById('city-select').value;
        const district = document.getElementById('district-select').value;
        
        searchResults = familiesData.filter(family => {
            const locationMatch = !city || family.location.includes(getCityName(city));
            const districtMatch = !district || family.location.includes(district);
            return locationMatch && districtMatch;
        });
    } else {
        const category = document.getElementById('category-select').value;
        const dishSearch = document.getElementById('dish-search').value.toLowerCase();
        
        searchResults = familiesData.filter(family => {
            const categoryMatch = !category || family.specialties.some(specialty => 
                getCategoryItems(category).includes(specialty.toLowerCase())
            );
            const dishMatch = !dishSearch || family.specialties.some(specialty => 
                specialty.toLowerCase().includes(dishSearch)
            );
            return categoryMatch && dishMatch;
        });
    }

    displaySearchResults(searchResults);
    
    // التمرير إلى النتائج
    document.getElementById('families').scrollIntoView({
        behavior: 'smooth'
    });
}

// عرض نتائج البحث
function displaySearchResults(results) {
    const familiesGrid = document.getElementById('families-grid');
    
    if (results.length === 0) {
        familiesGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>لا توجد نتائج</h3>
                <p>لم نجد أسر منتجة تطابق معايير البحث</p>
            </div>
        `;
        return;
    }

    familiesGrid.innerHTML = results.map(family => createFamilyCard(family)).join('');
    addFamilyCardListeners();
}

// الحصول على اسم المدينة
function getCityName(cityCode) {
    const cityNames = {
        riyadh: 'الرياض',
        jeddah: 'جدة',
        dammam: 'الدمام',
        mecca: 'مكة',
        medina: 'المدينة'
    };
    return cityNames[cityCode] || '';
}

// الحصول على عناصر التصنيف
function getCategoryItems(category) {
    const categoryItems = {
        main: ['كبسة', 'مندي', 'مظبي', 'ملوخية', 'فاصولياء', 'بامية'],
        appetizers: ['سلطة', 'شوربة', 'مخللات'],
        desserts: ['كنافة', 'بقلاوة', 'معمول'],
        drinks: ['قهوة', 'شاي', 'عصائر'],
        pastries: ['فطائر', 'سمبوسة', 'خبز'],
        traditional: ['جريش', 'عصيدة', 'هريس']
    };
    return categoryItems[category] || [];
}

// تهيئة الأسر المنتجة
function initializeFamilies() {
    const familiesGrid = document.getElementById('families-grid');
    familiesGrid.innerHTML = familiesData.map(family => createFamilyCard(family)).join('');
    addFamilyCardListeners();
}

// إنشاء بطاقة الأسرة
function createFamilyCard(family) {
    return `
        <div class="family-card" data-family-id="${family.id}">
            <div class="family-image" style="background-image: url('${family.image}')">
                <div class="family-rating">
                    <i class="fas fa-star"></i>
                    <span>${family.rating}</span>
                </div>
            </div>
            <div class="family-info">
                <h3 class="family-name">${family.name}</h3>
                <div class="family-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${family.location}</span>
                </div>
                <div class="family-specialties">
                    ${family.specialties.map(specialty => 
                        `<span class="specialty-tag">${specialty}</span>`
                    ).join('')}
                </div>
                <div class="family-stats">
                    <span class="family-orders">${family.orders}+ طلب</span>
                    <button class="view-family-btn">عرض القائمة</button>
                </div>
            </div>
        </div>
    `;
}

// إضافة مستمعي الأحداث لبطاقات الأسر
function addFamilyCardListeners() {
    const familyCards = document.querySelectorAll('.family-card');
    familyCards.forEach(card => {
        card.addEventListener('click', () => {
            const familyId = parseInt(card.getAttribute('data-family-id'));
            showFamilyDetails(familyId);
        });
    });
}

// عرض تفاصيل الأسرة
function showFamilyDetails(familyId) {
    const family = familiesData.find(f => f.id === familyId);
    if (!family) return;

    // إخفاء الصفحة الرئيسية وإظهار صفحة الأسرة
    document.getElementById('main-content').style.display = 'none';
    
    // إنشاء صفحة الأسرة
    createFamilyPageContent(family);
    
    // إظهار صفحة الأسرة
    document.getElementById('family-page').style.display = 'block';
    
    // تحديث عنوان الصفحة
    document.title = `${family.name} - أسرتي`;
    
    // التمرير للأعلى
    window.scrollTo(0, 0);
}

// إنشاء محتوى صفحة الأسرة
function createFamilyPageContent(family) {
    currentFamily = family;
    const familyPageContainer = document.getElementById('family-page');
    
    familyPageContainer.innerHTML = `
        <div class="family-page-header">
            <button class="back-btn" onclick="goBackToHome()">
                <i class="fas fa-arrow-right"></i>
                العودة للرئيسية
            </button>
        </div>
        
        <div class="family-hero">
            <div class="family-hero-bg" style="background-image: url('${family.image}')"></div>
            <div class="family-hero-overlay">
                <div class="container">
                    <div class="family-hero-content">
                        <div class="family-info-main">
                            <h1 class="family-title">${family.name}</h1>
                            <div class="family-location">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${family.location}</span>
                            </div>
                            <p class="family-description">${family.description}</p>
                            <div class="family-stats-main">
                                <div class="stat-item">
                                    <div class="stat-icon">
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <div class="stat-info">
                                        <span class="stat-number">${family.rating}</span>
                                        <span class="stat-label">التقييم</span>
                                    </div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-icon">
                                        <i class="fas fa-shopping-bag"></i>
                                    </div>
                                    <div class="stat-info">
                                        <span class="stat-number">${family.orders}+</span>
                                        <span class="stat-label">طلب</span>
                                    </div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-icon">
                                        <i class="fas fa-clock"></i>
                                    </div>
                                    <div class="stat-info">
                                        <span class="stat-number">30-45</span>
                                        <span class="stat-label">دقيقة</span>
                                    </div>
                                </div>
                            </div>
                            <div class="family-contact-main">
                                <a href="tel:${family.phone}" class="contact-btn-main phone">
                                    <i class="fas fa-phone"></i>
                                    اتصال
                                </a>
                                <a href="https://wa.me/${family.whatsapp}" target="_blank" class="contact-btn-main whatsapp">
                                    <i class="fab fa-whatsapp"></i>
                                    واتساب
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="family-content">
            <div class="container">
                <div class="family-tabs">
                    <button class="family-tab active" data-tab="menu">القائمة</button>
                    <button class="family-tab" data-tab="reviews">التقييمات والتعليقات</button>
                    <button class="family-tab" data-tab="info">معلومات الأسرة</button>
                </div>
                
                <div class="family-tab-content">
                    <div class="tab-panel active" id="menu-panel">
                        ${createMenuSection(family)}
                    </div>
                    
                    <div class="tab-panel" id="reviews-panel">
                        ${createReviewsSection(family)}
                    </div>
                    
                    <div class="tab-panel" id="info-panel">
                        ${createInfoSection(family)}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // إضافة مستمعي الأحداث
    addFamilyPageListeners();
    initializeFamilyTabs();
}

// إنشاء قسم القائمة
function createMenuSection(family) {
    let menuHTML = '';
    
    Object.keys(family.menu).forEach(category => {
        const categoryName = getCategoryDisplayName(category);
        menuHTML += `
            <div class="menu-category">
                <h3 class="category-title">${categoryName}</h3>
                <div class="menu-items">
                    ${family.menu[category].map(item => createMenuItemCard(item, family)).join('')}
                </div>
            </div>
        `;
    });

    return menuHTML || '<p class="no-menu">لا توجد أطباق متاحة حالياً</p>';
}

// الحصول على اسم التصنيف للعرض
function getCategoryDisplayName(category) {
    const categoryNames = {
        main: 'الأطباق الرئيسية',
        appetizers: 'المقبلات',
        desserts: 'الحلويات',
        drinks: 'المشروبات',
        pastries: 'المعجنات',
        traditional: 'الأطباق التراثية'
    };
    return categoryNames[category] || category;
}

// إنشاء بطاقة عنصر القائمة
function createMenuItemCard(item, family) {
    return `
        <div class="menu-item-card">
            <div class="item-image" style="background-image: url('${item.image}')"></div>
            <div class="item-content">
                <h4 class="item-name">${item.name}</h4>
                <p class="item-description">${item.description}</p>
                <div class="item-details">
                    <div class="item-price">${item.price} ريال</div>
                    <span class="item-time">
                        <i class="fas fa-clock"></i>
                        ${item.time}
                    </span>
                </div>
                <button class="add-to-cart-btn" data-item-id="${item.id}" data-family-id="${family.id}">
                    <i class="fas fa-plus"></i>
                    إضافة للسلة
                </button>
            </div>
        </div>
    `;
}

// إنشاء قسم التقييمات
function createReviewsSection(family) {
    const reviews = getReviewsForFamily(family.id);
    const averageRating = calculateAverageRating(reviews);
    const ratingDistribution = calculateRatingDistribution(reviews);
    
    return `
        <div class="reviews-section">
            <div class="reviews-summary">
                <div class="rating-overview">
                    <div class="average-rating">
                        <span class="rating-number">${averageRating}</span>
                        <div class="rating-stars">
                            ${createStarRating(averageRating)}
                        </div>
                        <span class="rating-count">(${reviews.length} تقييم)</span>
                    </div>
                    <div class="rating-breakdown">
                        ${Object.entries(ratingDistribution).map(([stars, count]) => `
                            <div class="rating-bar">
                                <span class="stars-label">${stars} نجوم</span>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${(count / reviews.length) * 100}%"></div>
                                </div>
                                <span class="count-label">${count}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="add-review">
                    <button class="add-review-btn" onclick="showAddReviewForm()">
                        <i class="fas fa-plus"></i>
                        إضافة تقييم
                    </button>
                </div>
            </div>
            
            <div class="reviews-list">
                <h4>آراء العملاء</h4>
                ${reviews.map(review => createReviewCard(review)).join('')}
            </div>
            
            <div class="add-review-form" id="add-review-form" style="display: none;">
                <h4>إضافة تقييم جديد</h4>
                <form onsubmit="submitReview(event)">
                    <div class="form-group">
                        <label>التقييم</label>
                        <div class="star-rating-input">
                            ${[5,4,3,2,1].map(star => `
                                <input type="radio" name="rating" value="${star}" id="star${star}">
                                <label for="star${star}"><i class="fas fa-star"></i></label>
                            `).join('')}
                        </div>
                    </div>
                    <div class="form-group">
                        <label>الاسم</label>
                        <input type="text" name="name" required placeholder="اكتب اسمك">
                    </div>
                    <div class="form-group">
                        <label>التعليق</label>
                        <textarea name="comment" required placeholder="شاركنا رأيك في الأسرة والطعام"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="submit-review-btn">إرسال التقييم</button>
                        <button type="button" class="cancel-review-btn" onclick="hideAddReviewForm()">إلغاء</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

// إنشاء قسم معلومات الأسرة
function createInfoSection(family) {
    return `
        <div class="info-section">
            <div class="info-grid">
                <div class="info-card">
                    <div class="info-icon">
                        <i class="fas fa-utensils"></i>
                    </div>
                    <h4>التخصصات</h4>
                    <div class="specialties-list">
                        ${family.specialties.map(specialty => `
                            <span class="specialty-badge">${specialty}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="info-card">
                    <div class="info-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <h4>ساعات العمل</h4>
                    <div class="working-hours">
                        <div class="day-hours">
                            <span>السبت - الخميس</span>
                            <span>8:00 ص - 11:00 م</span>
                        </div>
                        <div class="day-hours">
                            <span>الجمعة</span>
                            <span>2:00 م - 11:00 م</span>
                        </div>
                    </div>
                </div>
                
                <div class="info-card">
                    <div class="info-icon">
                        <i class="fas fa-truck"></i>
                    </div>
                    <h4>التوصيل</h4>
                    <div class="delivery-info">
                        <p>رسوم التوصيل: 15 ريال</p>
                        <p>الحد الأدنى للطلب: 50 ريال</p>
                        <p>وقت التوصيل: 30-45 دقيقة</p>
                    </div>
                </div>
                
                <div class="info-card">
                    <div class="info-icon">
                        <i class="fas fa-certificate"></i>
                    </div>
                    <h4>الشهادات</h4>
                    <div class="certificates">
                        <span class="certificate-badge">
                            <i class="fas fa-check-circle"></i>
                            مرخصة من البلدية
                        </span>
                        <span class="certificate-badge">
                            <i class="fas fa-check-circle"></i>
                            شهادة سلامة غذائية
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// العودة للصفحة الرئيسية
function goBackToHome() {
    document.getElementById('family-page').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.title = 'أسرتي - منصة الأسر المنتجة';
    window.scrollTo(0, 0);
}

// تهيئة تبويبات صفحة الأسرة
function initializeFamilyTabs() {
    const tabs = document.querySelectorAll('.family-tab');
    const panels = document.querySelectorAll('.tab-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            
            // إزالة الفئة النشطة من جميع التبويبات
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // إضافة الفئة النشطة للتبويب المحدد
            tab.classList.add('active');
            document.getElementById(`${tabName}-panel`).classList.add('active');
        });
    });
}

// إضافة مستمعي الأحداث لصفحة الأسرة
function addFamilyPageListeners() {
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const itemId = parseInt(btn.getAttribute('data-item-id'));
            const familyId = parseInt(btn.getAttribute('data-family-id'));
            addToCart(itemId, familyId);
        });
    });
}

// تهيئة التصنيفات
function initializeCategories() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            filterFamiliesByCategory(category);
        });
    });
}

// فلترة الأسر حسب التصنيف
function filterFamiliesByCategory(category) {
    const filteredFamilies = familiesData.filter(family => {
        return family.menu[category] && family.menu[category].length > 0;
    });
    
    displaySearchResults(filteredFamilies);
    
    // التمرير إلى النتائج
    document.getElementById('families').scrollIntoView({
        behavior: 'smooth'
    });
}

// تهيئة السلة
function initializeCart() {
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.addEventListener('click', showCart);
    
    updateCartCount();
}

// إضافة عنصر للسلة
function addToCart(itemId, familyId) {
    const family = familiesData.find(f => f.id === familyId);
    if (!family) return;

    let item = null;
    Object.values(family.menu).forEach(category => {
        const foundItem = category.find(i => i.id === itemId);
        if (foundItem) {
            item = { ...foundItem, familyName: family.name, familyId: familyId };
        }
    });

    if (!item) return;

    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        item.quantity = 1;
        cart.push(item);
    }

    updateCartCount();
    showNotification('تم إضافة العنصر للسلة', 'success');
}

// تحديث عدد عناصر السلة
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// عرض السلة
function showCart() {
    const modal = document.getElementById('cart-modal');
    const cartContent = document.getElementById('cart-content');
    const cartFooter = document.getElementById('cart-footer');

    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>سلة التسوق فارغة</p>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartContent.innerHTML = cart.map(item => createCartItem(item)).join('');
        cartFooter.style.display = 'block';
        updateCartTotal();
        addCartListeners();
    }

    modal.classList.add('active');
}

// إنشاء عنصر السلة
function createCartItem(item) {
    return `
        <div class="cart-item" data-item-id="${item.id}">
            <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-family">${item.familyName}</p>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn decrease">-</button>
                <span class="cart-item-quantity">${item.quantity}</span>
                <button class="quantity-btn increase">+</button>
            </div>
            <div class="cart-item-price">${item.price * item.quantity} ريال</div>
            <button class="remove-item-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
}

// إضافة مستمعي الأحداث للسلة
function addCartListeners() {
    const decreaseBtns = document.querySelectorAll('.quantity-btn.decrease');
    const increaseBtns = document.querySelectorAll('.quantity-btn.increase');
    const removeBtns = document.querySelectorAll('.remove-item-btn');

    decreaseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const itemId = parseInt(btn.closest('.cart-item').getAttribute('data-item-id'));
            updateCartItemQuantity(itemId, -1);
        });
    });

    increaseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const itemId = parseInt(btn.closest('.cart-item').getAttribute('data-item-id'));
            updateCartItemQuantity(itemId, 1);
        });
    });

    removeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const itemId = parseInt(btn.closest('.cart-item').getAttribute('data-item-id'));
            removeFromCart(itemId);
        });
    });
}

// تحديث كمية عنصر في السلة
function updateCartItemQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(itemId);
        return;
    }

    updateCartDisplay();
}

// إزالة عنصر من السلة
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
    showNotification('تم حذف العنصر من السلة', 'warning');
}

// تحديث عرض السلة
function updateCartDisplay() {
    updateCartCount();
    showCart();
}

// تحديث إجمالي السلة
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = total;
}

// تهيئة النوافذ المنبثقة
function initializeModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    // إغلاق النوافذ
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').classList.remove('active');
        });
    });

    // إغلاق عند النقر خارج النافذة
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // تهيئة نافذة الدفع
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', showCheckout);
    }
}

// عرض صفحة الدفع
function showCheckout() {
    const cartModal = document.getElementById('cart-modal');
    const checkoutModal = document.getElementById('checkout-modal');
    
    cartModal.classList.remove('active');
    checkoutModal.classList.add('active');
    
    updateOrderSummary();
}

// تحديث ملخص الطلب
function updateOrderSummary() {
    const orderItems = document.getElementById('order-items');
    const subtotal = document.getElementById('subtotal');
    const finalTotal = document.getElementById('final-total');
    
    const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 15;
    const finalAmount = subtotalAmount + deliveryFee;
    
    orderItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <span>${item.name} × ${item.quantity}</span>
            <span>${item.price * item.quantity} ريال</span>
        </div>
    `).join('');
    
    subtotal.textContent = subtotalAmount;
    finalTotal.textContent = finalAmount;
}

// تهيئة النماذج
function initializeForms() {
    const contactForm = document.getElementById('contact-form');
    const checkoutForm = document.getElementById('checkout-form');

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutForm);
    }
}

// معالجة نموذج التواصل
function handleContactForm(e) {
    e.preventDefault();
    showNotification('تم إرسال رسالتك بنجاح. سنتواصل معك قريباً', 'success');
    e.target.reset();
}

// معالجة نموذج الدفع
function handleCheckoutForm(e) {
    e.preventDefault();
    
    // محاكاة معالجة الطلب
    showNotification('جاري معالجة طلبك...', 'info');
    
    setTimeout(() => {
        cart = [];
        updateCartCount();
        document.getElementById('checkout-modal').classList.remove('active');
        showNotification('تم تأكيد طلبك بنجاح! سيتم التواصل معك قريباً', 'success');
    }, 2000);
}

// تهيئة التأثيرات
function initializeAnimations() {
    // تأثيرات التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // مراقبة العناصر
    const animatedElements = document.querySelectorAll('.category-card, .family-card, .feature, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// تهيئة الجسيمات
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

// إنشاء جسيم
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 3 + 3;
    
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = x + '%';
    particle.style.top = y + '%';
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(particle);
}

// تهيئة العدادات
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const countUp = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    };

    // بدء العد عند ظهور العنصر
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => observer.observe(counter));
}

// تهيئة زر العودة للأعلى
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// عرض الإشعارات
function showNotification(message, type = 'success') {
    const notificationsContainer = document.getElementById('notifications');
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <p>${message}</p>
    `;
    
    notificationsContainer.appendChild(notification);
    
    // إزالة الإشعار بعد 4 ثوان
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// تأثيرات إضافية
document.addEventListener('click', function(e) {
    // تأثير Ripple للأزرار
    if (e.target.matches('button, .btn, .contact-btn, .search-btn')) {
        createRipple(e);
    }
});

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// إضافة CSS للتأثيرات
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button, .btn, .contact-btn, .search-btn {
        position: relative;
        overflow: hidden;
    }
    
    .no-results {
        text-align: center;
        padding: 4rem 2rem;
        color: var(--gray-color);
        grid-column: 1 / -1;
    }
    
    .no-results i {
        font-size: 4rem;
        margin-bottom: 1rem;
        opacity: 0.5;
    }
    
    .no-results h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }
`;
document.head.appendChild(style);
