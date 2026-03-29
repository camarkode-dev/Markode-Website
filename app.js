document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // ✅ Safe DOM Selectors
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  // ✅ Constants
  const WHATSAPP_NUMBER = "201090886364";
  const LANG_KEY = "markode_lang";
  const DEFAULT_LANG = "ar";
  const CURRENCY_KEY = "markode_currency";
  const DEFAULT_CURRENCY = "SAR";

  let currentCurrency = (localStorage.getItem(CURRENCY_KEY) || DEFAULT_CURRENCY).toUpperCase();
  let baseBudgetSar = 100; // نحفظ الميزانية بالأساس (ريال) لضمان اتساق التحويل

  // Base amounts are in SAR; convert to the currently selected currency
  const rates = {
    SAR: 1,
    EGP: 8.23,       // 1 SAR ≈ 8.23 EGP
    USD: 1 / 3.75    // 1 USD ≈ 3.75 SAR
  };

  const symbols = {
    EGP: { ar: 'ج.م', en: 'EGP' },
    SAR: { ar: 'ر.س', en: 'SAR' },
    USD: { ar: '$', en: 'USD' }
  };

  const CURRENCY_MAP = {
    egp: 'EGP',
    sar: 'SAR',
    usd: 'USD'
  };

  const normalizeCurrency = (cur) => {
    if (!cur) return DEFAULT_CURRENCY;
    const lower = String(cur).trim().toLowerCase();
    return CURRENCY_MAP[lower] || (rates[String(cur).toUpperCase()] ? String(cur).toUpperCase() : DEFAULT_CURRENCY);
  };

  const waUrl = (text = "") =>
    `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`;

  const fmtCurrency = n => {
    const converted = n * rates[currentCurrency];
    const isAr = document.documentElement.lang === "ar";
    const locale = isAr ? "ar-EG" : "en-US";
    const formatted = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    }).format(converted);
    return `${formatted} ${symbols[currentCurrency][isAr ? 'ar' : 'en']}`;
  };

  const getCurrencySymbol = () => {
    const isAr = document.documentElement.lang === "ar";
    return symbols[currentCurrency][isAr ? 'ar' : 'en'];
  };

  const getPriceInCurrentCurrency = (priceInSAR) => {
    const converted = (priceInSAR * rates[currentCurrency]);
    const isAr = document.documentElement.lang === "ar";
    const locale = isAr ? "ar-EG" : "en-US";
    return new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    }).format(converted);
  };

  /* ================================================
      TRANSLATION DATA - كامل ومنظم ✅
  ================================================ */
  const translations = {
    ar: {
      dir: "rtl",
      lang: "ar",
      "nav-home": "الرئيسية",
      "nav-about": "من نحن",
      "nav-services": "خدماتنا",
      "nav-plans": "الباقات",
      "nav-privacy": "سياسة الخصوصية",
      "nav-contact": "تواصل معنا",
      "hero-welcome": "مرحباً بك في <span class=\"highlighted\">Markode</span>",
      "hero-intro": "وجهتك الذكية للتسويق الرقمي وتطوير البرمجيات، نبتكر الحلول وندعم نموك الرقمي، وندخل أفكارك إلى واقع.",
      "intro-title": "لمحة سريعة",
      "intro-desc": "نقدم تصميم واجهات وتجربة مستخدم متقدمة مع تنفيذ برمجي عملي وربط الحملات الإعلانية وقياس الأداء.",
      "intro-note": "أمثلة حقيقية لمشاريع نفذناها مع نتائج قابلة للقياس.",
      "intro-point-1": "🎯 نحن أكثر من مجرد استوديو رقمي — شركاء نجاح يحوّلون الأفكار إلى تجارب رقمية مبتكرة.",
      "intro-point-2": "💡 دمج التصميم العصري، التطوير البرمجري المتقن، واستراتيجيات التحويل الرقمي لحلول متكاملة.",
      "intro-point-3": "👨‍💻 فريق متخصص بخبرة واسعة في UI/UX، تطوير البرمجيات، وبناء أنظمة رقمية ذكية.",
      "intro-point-4": "📈 نتائج قابلة للقياس مع سجل حافل من المشاريع المحلية والإقليمية والعالمية.",
      "btn-brochure": "تحميل بروشور PDF",
      "btn-projects": "مشاهدة المشاريع",
      "tech-title": "خلاصة تقنيّة",
      "tech-desc": "نغطي تصميم الواجهات، التنفيذ البرمجي، ودمج الحملات الإعلانية مع تتبع الأداء بدقة.",
      "tech-point-1": "⚛️ <strong>React & Next.js</strong> — بناء واجهات ديناميكية وسريعة الأداء مع تجربة مستخدم سلسة.",
      "tech-point-2": "🎨 <strong>Figma</strong> — تصميم واجهات حديثة وتجربة مستخدم متكاملة قبل التنفيذ البرمجي.",
      "tech-point-3": "📈 <strong>التسويق الرقمي</strong> — Google Ads، TikTok Ads، Facebook & Snapchat لزيادة الوصول وتحقيق التحويل.",
      "tech-point-4": "🔍 <strong>SEO وتحليل الأداء</strong> — تحسين محركات البحث وقياس النتائج بدقة لزيادة التأثير الرقمي.",
      "header-title": "ماركود — محفظة الأعمال",
      "header-lead": "تصميم واجهات وتجربة مستخدم + برمجة واجهات وتكامل إعلاني — أمثلة عملياتية وأرقام أداء",
      "services-list": "<li>✦ بناء الهوية البصرية وتصميم الشعارات</li><li>✦ تصميم مواقع احترافية متجاوبة وسريعة</li><li>✦ تطوير تطبيقات مخصصة للأعمال</li><li>✦ إدارة الحملات التسويقية على المنصات الرقمية</li><li>✦ تحسين محركات البحث SEO وزيادة الظهور</li><li>✦ كتابة المحتوى التسويقي والتصميم الإبداعي</li>",
      "projects-title": "نماذج المشاريع",
      "project-title-1": "Ride Me – تطبيق  بيع سيارات",
      "project-desc-1": "تطبيق لعرض وبيع السيارات مع نظام قوائم، فلترة متقدمة، وحجز معاينة وربط ببوابات الدفع.",
      "project-title-2": "  ERP تطبيق ادارة الطلبات و المنتجات",
      "project-desc-2": "تطبيق لإدارة الطلبات و المنتجات مع نظام تتبع وتحليل الأداء.",
      "project-title-3": "متجر إلكتروني شامل",
      "project-desc-3": "متجر إلكتروني متكامل: سلة، دفع آمن، إدارة مخزون، وصفحات منتجات، ونظام شحن وطلبات.",
      "project-title-4": "تطبيق طلب وتوصيل مياه",
      "project-desc-4": "تطبيق لطلب مياه مع جدولة التوصيل، تتبّع السائقين، وعملية دفع مبسطة.",
      "project1-case-btn": "عرض الحالة",
      "project1-code-btn": "كود / تفاصيل",
      "project2-case-btn": "عرض الحالة",
      "project2-code-btn": "كود / تفاصيل",
      "project3-case-btn": "عرض الحالة",
      "project3-code-btn": "كود / تفاصيل",
      "project4-case-btn": "عرض الحالة",
      "project4-code-btn": "التقارير",
      "ad1-case-btn": "عرض الحالة",
      "ad1-report-btn": "التقارير",
      "ad2-case-btn": "عرض الحالة",
      "ad2-report-btn": "التقارير",
      "services-project2-case-btn": "عرض الحالة",
      "services-project2-code-btn": "كود / تفاصيل",
      "packages-title": "الباقات",
      "ads-title": "أمثلة إعلانات ونتائج",
      "qq-title": "تقدير سعر فوري",
      "qq-desc": "اختر نوع الخدمة والخيارات لتحصل على نطاق تقديري سريع.",
      "statYearsLabel": "سنوات خبرة",
      "statResponseLabel": "متوسط سرعة الرد",
      "statProjectsLabel": "مبادرات وحملات",
      "ticker-1": "💼 تصميم واجهات احترافية",
      "ticker-2": "🚀 تطوير ويب متقدم",
      "ticker-3": "📊 تسويق رقمي فعّال",
      "ticker-4": "📈 زيادة المبيعات والعائد",
      "ticker-5": "🎯 حملات إعلانية مستهدفة",
      "tag-react": "React",
      "tag-nextjs": "Next.js",
      "tag-figma": "Figma",
      "tag-google-ads": "إعلانات Google",
      "tag-tiktok-ads": "إعلانات TikTok",
      "tag-snapchat-ads": "إعلانات Snapchat",
      "tag-facebook-ads": "إعلانات Facebook",
      "tag-seo": "تحسين محركات البحث (SEO)",
      "tag-ui": "تصميم واجهات (UI)",
      "tag-ux": "تجربة المستخدم (UX)",
      "tag-case-study": "دراسة حالة",
      "tag-mobile": "تطبيق جوال",
      "tag-ux-2": "تجربة المستخدم (UX)",
      "tag-rental": "تأجير / عقارات",
      "tag-system": "نظام",
      "tag-dashboard": "لوحة تحكم",
      "tag-ads": "إعلانات",
      "tag-analytics": "تحليلات",
      "card-title-1": "باقة الناشئين",
      "card-desc-1": "تصميم هوية + موقع تعريفي + حملة انطلاقية.",
      "card-btn-1": "اطلب الآن",
      "card-title-2": "باقة الشركات",
      "card-desc-2": "حلول متكاملة للتسويق وتطوير المواقع للشركات.",
      "card-btn-2": "اطلب الآن",
      "card-title-3": "باقة التطوير",
      "card-desc-3": "خدمة تطوير تطبيق أو نظام مخصص حسب الطلب.",
      "card-btn-3": "تواصل معنا",
      "qq-service-label": "نوع الخدمة",
      "qq-op-identity": "هوية بصرية",
      "qq-op-website": "موقع ويب",
      "qq-op-app": "تطبيق جوال",
      "qq-op-marketing": "تسويق رقمي",
      "qq-op-ads": "حملات إعلانية",
      "qq-budget-label": "الميزانية المتوقعة",
      "qq-options-label": "خيارات إضافية",
      "qq-seo-label": "تحسين محركات البحث (SEO)",
      "qq-cms-label": "لوحة إدارة محتوى (CMS)",
      "qq-multi-label": "دعم لغتين",
      "qq-time-label": "الإطار الزمني",
      "qq-time-normal": "عادي",
      "qq-time-rush": "عاجل",
      "qq-range-title": "النطاق التقديري",
      "qq-copy": "نسخ التقدير",
      "qq-send-quote": "📩 أرسل عبر واتساب",
      "qq-note": "* تقدير مبدئي للإرشاد فقط — السعر النهائي بعد مكالمة تعريفية قصيرة.",
      "chat-title": "مستشار Markode",
      "chat-status": "جاهز للمساعدة",
      "chat-send-btn": "إرسال",
      "modal-title": "طلب الباقة",
      "modal-name": "الاسم",
      "modal-email": "البريد الإلكتروني",
      "modal-phone": "رقم الهاتف",
      "modal-details": "اكتب تفاصيل الطلب",
      "modal-submit": "إرسال الطلب",
      "about-title": "من نحن",
      "about-text": "نحن في <strong>Markode</strong> نبتكر حلول رقمية تجمع بين التصميم العصري والتقنيات الحديثة. نساعد الشركات والروّاد في بناء حضور رقمي احترافي. فريقنا متخصص في التصميم، البرمجة، والتسويق الرقمي بخبرة تتجاوز 5 سنوات في السوق العربي والعالمي. نؤمن بأن البساطة جوهر الإبداع ونهتم بأدق التفاصيل، ونسعى دائمًا لتحقيق نتائج قابلة للقياس بكل شفافية.",
      "footer-text": "جميع الحقوق محفوظة © 2025 Markode",
      "services-title": "خدماتنا",
      "services-desc": "نقدم حلولاً متكاملة تشمل التسويق الرقمي، تصميم وتطوير المواقع والتطبيقات، إدارة الحملات الإعلانية، وتحسين تجربة المستخدم.",
      "contact-title": "تواصل معنا",
      "intro-text": "نحن هنا للإجابة على استفساراتك ومساعدتك في تحقيق أهدافك الرقمية. ارسل رسالتك وسنعاود التواصل في أقرب وقت.",
      "placeholder-name": "اكتب اسمك الكامل",
      "placeholder-phone": "رقم الهاتف ( xxxxxxxx)",
      "placeholder-email": "البريد الإلكتروني",
      "placeholder-message": "اكتب رسالتك أو استفسارك هنا",
      "services-projects-title": "نماذج تطبيقية لخدماتنا",
      "plans-title": "عروض الباقات",
      "plans-desc": "اختار الباقة التي تناسب طموحك واحتياجات عملك، نقدم لك خيارات متنوعة تشمل تصميم الهوية، تطوير المواقع، وإدارة الحملات الإعلانية.",
      "card-title-4": "حملة إعلانية احترافية",
      "card-desc-4": "إعلانات Google & Facebook مع تتبع ROAS و CTR.",
      "contact-title": "تواصل معنا",
      "intro-text": "نحن هنا للإجابة على استفساراتك ومساعدتك في تحقيق أهدافك الرقمية.",
      "label-name": "الاسم:",
      "label-phone": "رقم الهاتف:",
      "label-email": "البريد الإلكتروني:",
      "label-message": "الرسالة:",
      "submit-btn": "إرسال",
      "order-success": "✅ تم إرسال الطلب بنجاح! سنتواصل معك قريبًا.",
      "privacy-title": "سياسة الخصوصية",
      "privacy-p1": "نحن في Markode نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. لا نقوم ببيع أو مشاركة بياناتك مع أي طرف ثالث. جميع البيانات التي نجمعها تُستخدم لتحسين خدماتنا فقط.",
      "privacy-collect-title": "جمع المعلومات",
      "privacy-collect": "نجمع معلوماتك عندما تقوم بالتسجيل أو التواصل معنا عبر الموقع.",
      "privacy-use-title": "الاستخدام",
      "privacy-use": "تُستخدم البيانات لتحسين تجربة المستخدم وخدمات الموقع.",
      "privacy-changes-title": "التعديلات على السياسة",
      "privacy-changes": "قد نقوم بتحديث سياسة الخصوصية من وقت لآخر، وسيتم الإعلان عن أي تغييرات هنا.",
    },
    en: {
      dir: "ltr",
      lang: "en",
      "nav-home": "Home",
      "nav-about": "About",
      "nav-services": "Services",
      "nav-plans": "Plans",
      "nav-privacy": "Privacy Policy",
      "nav-contact": "Contact",
      "hero-welcome": "Welcome to <span class=\"highlighted\">Markode</span>",
      "hero-intro": "Your smart destination for digital marketing and software development. We create solutions, support your growth, and turn ideas into reality.",
      "hero-cta-primary": "Get a Free Consultation",
      "hero-cta-secondary": "Get a Quick Estimate",
      "intro-title": "Quick Overview",
      "intro-desc": "We offer advanced UI/UX design with practical programming implementation and advertising campaign integration with performance measurement.",
      "intro-note": "Real examples of projects we've implemented with measurable results.",
      "intro-point-1": "🎯 We're more than a digital studio — success partners who turn ideas into thoughtful digital experiences.",
      "intro-point-2": "💡 Combining modern design, meticulous engineering, and conversion-focused digital strategies.",
      "intro-point-3": "👨‍💻 A specialized team experienced in UI/UX, software development, and building intelligent digital systems.",
      "intro-point-4": "📈 Measurable results with a proven track record across local, regional and global projects.",
      "btn-brochure": "Download PDF Brochure",
      "btn-projects": "View Projects",
      "tech-title": "Tech Summary",
      "tech-desc": "We cover UI design, programming implementation, and advertising campaign integration with precise performance tracking.",
      "tech-point-1": "⚛️ <strong>React & Next.js</strong> — Building dynamic, high-performance interfaces with smooth UX.",
      "tech-point-2": "🎨 <strong>Figma</strong> — Crafting modern UI and end-to-end UX flows before development.",
      "tech-point-3": "📈 <strong>Digital Marketing</strong> — Google Ads, TikTok, Facebook & Snapchat to boost reach and conversions.",
      "tech-point-4": "🔍 <strong>SEO & Analytics</strong> — Improving search visibility and measuring results for better impact.",
      "services-overview-title": "Solutions That Build Presence and Support Growth",
      "services-overview-desc": "We help businesses across the Arab world combine technology and marketing in one system, so the website, app, or platform becomes a digital asset that supports sales, saves effort, and builds trust.",
      "service-panel-title-1": "App Development",
      "service-panel-desc-1": "Practical apps that support user experience, requests, follow-up, and conversion.",
      "service-panel-link-1": "Learn about the service",
      "service-panel-title-2": "Website Development",
      "service-panel-desc-2": "Websites that reflect your brand value and present your services with speed and clarity.",
      "service-panel-link-2": "See details",
      "service-panel-title-3": "Systems & ERP",
      "service-panel-desc-3": "Systems and dashboards that improve efficiency and give you clearer operational visibility.",
      "service-panel-link-3": "Explore solutions",
      "service-panel-title-4": "Marketing, Ads & SEO",
      "service-panel-desc-4": "Digital growth strategies including SEO, ads, and social media management to increase reach and sales.",
      "service-panel-link-4": "Start growing",
      "why-us-title": "Why Markode",
      "why-us-desc": "Because we do not separate design, development, and marketing. We connect every stage to a clear business goal that supports growth and measurable results.",
      "why-card-title-1": "Real Market Understanding",
      "why-card-desc-1": "We write, design, and build pages with messaging tailored to audiences in Saudi Arabia, the UAE, Egypt, and the wider Arab world.",
      "why-card-title-2": "Integrated Solutions",
      "why-card-desc-2": "From interface to ad campaign to admin panel, everything works together in one consistent picture.",
      "why-card-title-3": "Structured Fast Execution",
      "why-card-desc-3": "We break the project into clear stages and move quickly without sacrificing quality.",
      "why-card-title-4": "Focused on Sales Growth",
      "why-card-desc-4": "Every page, CTA, and user journey is designed to move prospects closer to action and improve conversion.",
      "header-title": "Markode — Portfolio",
      "header-lead": "UI/UX design + front-end development and ad integration — operational examples & performance numbers",
      "services-list": "<li>✦ Visual identity & logo design</li><li>✦ Responsive, high-performance websites</li><li>✦ Custom business applications</li><li>✦ Digital campaign management</li><li>✦ SEO & organic visibility</li><li>✦ Marketing copy and creative design</li>",
      "projects-title": "Project Examples",
      "project-title-1": "Ride Me — Car Sales App",
      "project-desc-1": "Car listing and marketplace app with advanced filters, booking for viewings and payment integration.",
      "project-title-2": "ERP Order & Product Management App",
      "project-desc-2": "Application for managing orders and products with tracking and performance analysis.",
      "project-title-3": "Full E‑commerce Store",
      "project-desc-3": "Complete e‑commerce platform with cart, secure payments, inventory management and order/shipping workflows.",
      "project-title-4": "Water Delivery App",
      "project-desc-4": "On‑demand water ordering app with scheduling, driver tracking and delivery management.",
      "project1-case-btn": "View Case",
      "project1-code-btn": "Code / Details",
      "project2-case-btn": "View Case",
      "project2-code-btn": "Code / Details",
      "project3-case-btn": "View Case",
      "project3-code-btn": "Code / Details",
      "project4-case-btn": "View Case",
      "project4-code-btn": "Reports",
      "ad1-case-btn": "View Case",
      "ad1-report-btn": "Reports",
      "ad2-case-btn": "View Case",
      "ad2-report-btn": "Reports",
      "services-project2-case-btn": "View Case",
      "services-project2-code-btn": "Code / Details",
      "packages-title": "Packages",
      "process-title": "How We Work",
      "process-desc": "We begin by understanding your needs, then plan, execute, and measure results so every step is tied to a clear goal and smart decision.",
      "process-step-title-1": "Needs Analysis",
      "process-step-desc-1": "We study your business, audience, and competitors to identify fast, high-impact opportunities.",
      "process-step-title-2": "Strategy Building",
      "process-step-desc-2": "We define scope, messaging, and the pages or channels that deserve priority.",
      "process-step-title-3": "Execution & Launch",
      "process-step-desc-3": "We deliver the project professionally, then prepare launch, tracking, and the final user experience.",
      "process-step-title-4": "Continuous Optimization",
      "process-step-desc-4": "We review performance and suggest technical and marketing improvements that raise results over time.",
      "ads-title": "Ad Examples & Results",
      "qq-title": "Quick Price Estimate",
      "qq-desc": "Choose the service type and options to get a quick estimated range.",
      "statYearsLabel": "Years of Experience",
      "statResponseLabel": "Avg. Response Time",
      "statProjectsLabel": "Initiatives & Campaigns",
      "ticker-1": "💼 Professional UI Design",
      "ticker-2": "🚀 Advanced Web Development",
      "ticker-3": "📊 Effective Digital Marketing",
      "ticker-4": "📈 Increase Sales & ROI",
      "ticker-5": "🎯 Targeted Ad Campaigns",
      "tag-react": "React",
      "tag-nextjs": "Next.js",
      "tag-figma": "Figma",
      "tag-google-ads": "Google Ads",
      "tag-tiktok-ads": "TikTok Ads",
      "tag-snapchat-ads": "Snapchat Ads",
      "tag-facebook-ads": "Facebook Ads",
      "tag-seo": "SEO",
      "tag-ui": "UI",
      "tag-ux": "UX",
      "tag-case-study": "Case Study",
      "tag-mobile": "Mobile",
      "tag-ux-2": "UX",
      "tag-rental": "Rental",
      "tag-system": "System",
      "tag-dashboard": "Dashboard",
      "tag-ads": "Ads",
      "tag-analytics": "Analytics",
      "card-title-1": "Starter Plan",
      "card-desc-1": "Brand identity + Landing website + Launch campaign.",
      "card-btn-1": "Order Now",
      "card-title-2": "Business Plan",
      "card-desc-2": "Comprehensive solutions for marketing and web development.",
      "card-btn-2": "Order Now",
      "card-title-3": "Development Plan",
      "card-desc-3": "Custom application or system development on demand.",
      "card-btn-3": "Contact Us",
      "skip-link": "Skip to main content",
      "currency-label": "Currency",
      "faq-title": "Frequently Asked Questions",
      "faq-desc": "Short answers to help you choose the right solution and make faster decisions with confidence.",
      "faq-question-1": "Is Markode suitable for small and medium businesses?",
      "faq-answer-1": "Yes. We shape the solution around your current stage, whether you are just building your presence or scaling with a more advanced system and campaigns.",
      "faq-question-2": "Can development and marketing be combined in the same project?",
      "faq-answer-2": "Absolutely. This is one of the most effective models we deliver because connecting the website or app with marketing usually creates faster and stronger results.",
      "faq-question-3": "How long does it take to start a project?",
      "faq-answer-3": "Once we receive the essential details, we can define the recommended path, the estimated timeframe, and the first step clearly.",
      "cta-band-title": "Ready to turn your idea into measurable results?",
      "cta-band-desc": "Let us review your needs and recommend the best technical and marketing path for your business and target market.",
      "cta-band-primary": "Contact Us",
      "cta-band-secondary": "Request via WhatsApp",
      "qq-service-label": "Service Type",
      "qq-op-identity": "Visual Identity",
      "qq-op-website": "Website",
      "qq-op-app": "Mobile App",
      "qq-op-marketing": "Digital Marketing",
      "qq-op-ads": "Ad Campaigns",
      "qq-budget-label": "Expected Budget",
      "qq-options-label": "Additional Options",
      "qq-seo-label": "SEO Optimization",
      "qq-cms-label": "Content Management System",
      "qq-multi-label": "Multi-language Support",
      "qq-time-label": "Timeline",
      "qq-time-normal": "Normal",
      "qq-time-rush": "Rush",
      "qq-range-title": "Estimated Range",
      "qq-copy": "Copy Estimate",
      "qq-send-quote": "📩 Send via WhatsApp",
      "qq-note": "* Initial estimate for guidance only — final price after a brief discovery call.",
      "chat-title": "Markode Assistant",
      "chat-status": "Ready to help",
      "chat-send-btn": "Send",
      "modal-title": "Order Plan",
      "modal-name": "Your Name",
      "modal-email": "Email",
      "modal-phone": "Phone Number",
      "modal-details": "Order Details",
      "modal-submit": "Submit Order",
      "about-title": "About",
      "about-text": "At <strong>Markode</strong> we craft digital solutions that combine modern design and reliable engineering to help businesses and founders build a professional online presence. Our team specializes in design, development, and digital marketing with over 5 years of experience in the Arab and global markets. We believe simplicity is the essence of creativity and pay attention to the smallest details, always aiming for measurable results with full transparency.",
      "footer-text": "All rights reserved © 2025 Markode",
      "services-title": "Services",
      "services-desc": "We provide end-to-end solutions including digital marketing, website & app development, campaign management, and UX optimization.",
      "contact-title": "Contact Us",
      "intro-text": "We're here to answer your questions and help achieve your digital goals. Send your message and we'll get back shortly.",
      "placeholder-name": "Your full name",
      "placeholder-phone": "Phone number (e.g. xxxxxxx)",
      "placeholder-email": "Email address",
      "placeholder-message": "Write your message or inquiry here",
      "services-projects-title": "Service Samples",
      "plans-title": "Plans & Packages",
      "plans-desc": "Choose the package that fits your goals — identity, websites, apps, and ad management options available.",
      "card-title-4": "Professional Ad Campaign",
      "card-desc-4": "Google & Facebook ads with ROAS and CTR tracking.",
      "contact-title": "Contact Us",
      "intro-text": "We're here to answer your questions and help achieve your digital goals.",
      "label-name": "Name:",
      "label-phone": "Phone:",
      "label-email": "Email:",
      "label-message": "Message:",
      "submit-btn": "Send",
      "order-success-message": "✅ Order sent successfully! We'll contact you soon.",
      "order-success": "✅ Order sent successfully! We'll contact you soon.",
      "privacy-title": "Privacy Policy",
      "privacy-p1": "At Markode we respect your privacy and are committed to protecting your personal data. We do not sell or share your information with third parties. Any data we collect is used to improve our services only.",
      "privacy-collect-title": "Information Collection",
      "privacy-collect": "We collect your information when you register or contact us through the website.",
      "privacy-use-title": "Use",
      "privacy-use": "The data is used to improve the user experience and site services.",
      "privacy-changes-title": "Policy Changes",
      "privacy-changes": "We may update this privacy policy from time to time; any changes will be published here.",
    }
  };

  /* ================================================
      LANGUAGE MANAGEMENT ✅
  ================================================ */

  // Define setActiveCurrency early to avoid TDZ issues
  function setActiveCurrency(currency) {
    const egpBtn = $("#egp-btn");
    const sarBtn = $("#sar-btn");
    const usdBtn = $("#usd-btn");
    [egpBtn, sarBtn, usdBtn].forEach(btn => {
      if (btn) btn.classList.remove('active');
    });
    if (currency === 'EGP' && egpBtn) egpBtn.classList.add('active');
    else if (currency === 'SAR' && sarBtn) sarBtn.classList.add('active');
    else if (currency === 'USD' && usdBtn) usdBtn.classList.add('active');
  }

  function reloadChat() {
    if (!chatBody || !chatBox?.classList.contains("show")) return;
    startChat();
  }

  const defaultDomState = new Map();
  const defaultTickerTexts = [];

  function snapshotDefaultContent() {
    defaultDomState.clear();
    document.querySelectorAll("[id]").forEach(elem => {
      // Store only leaf nodes so restoring Arabic does not rebuild whole sections
      // and detach event listeners from buttons, modals, and interactive widgets.
      if (elem.querySelector("[id]")) return;

      const tag = (elem.tagName || "").toLowerCase();
      defaultDomState.set(elem.id, {
        html: elem.innerHTML,
        placeholder: elem.getAttribute("placeholder"),
        value: tag === "input" || tag === "textarea" ? elem.value : null
      });
    });

    $$(".ticker__item").forEach((item, index) => {
      defaultTickerTexts[index] = item.textContent;
    });
  }

  function restoreDefaultContent() {
    defaultDomState.forEach((state, id) => {
      const elem = document.getElementById(id);
      if (!elem) return;

      const tag = (elem.tagName || "").toLowerCase();
      if ((tag === "input" || tag === "textarea") && state.placeholder !== null) {
        elem.placeholder = state.placeholder;
        return;
      }

      elem.innerHTML = state.html;
    });

    $$(".ticker__item").forEach((item, index) => {
      if (defaultTickerTexts[index]) item.textContent = defaultTickerTexts[index];
    });
  }

  function switchLanguage(lang) {
    if (!translations[lang]) {
      console.error("❌ Language not found:", lang);
      return;
    }

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : translations[lang].dir;

    if (lang === "ar") {
      restoreDefaultContent();
    } else {
      // Update all text elements. Inputs/textarea will receive the translation as `placeholder`.
      Object.entries(translations[lang]).forEach(([key, value]) => {
      // Primary lookup: element with the translation key as ID
      let elem = $(`#${key}`);

      // Support placeholder keys that target inputs by name, e.g. "placeholder-name" -> #name
      if (!elem && key.startsWith('placeholder-')) {
        const targetId = key.replace(/^placeholder-/, '');
        elem = $(`#${targetId}`);
      }

      if (!elem) return;

      const tag = (elem.tagName || '').toLowerCase();

      // If the translation contains HTML (like list items) set innerHTML.
      if (typeof value === 'string' && value.indexOf('<') !== -1) {
        elem.innerHTML = value;
        return;
      }

      // For inputs and textareas use the translation as placeholder
      if (tag === 'input' || tag === 'textarea') {
        try {
          elem.placeholder = value;
        } catch (e) {
          // fallback to setting value for non-text inputs
          elem.value = value;
        }
        return;
      }

      // For certain keys we want to allow HTML content
      if (key.startsWith("hero-") || key.startsWith("intro-") || key.startsWith("tech-") || key.startsWith("btn-")) {
        elem.innerHTML = value;
        return;
      }

      // Default: set textContent
      elem.textContent = value;
    });

    // Update ticker items
    const tickerItems = $$(".ticker__item");
      tickerItems.forEach((item, index) => {
        const tickerKey = `ticker-${(index % 5) + 1}`;
        if (translations[lang][tickerKey]) {
          item.textContent = translations[lang][tickerKey];
        }
      });
    }

    // Update language buttons state
    $$('.language-switch button, .lang-switch button').forEach(btn => {
      const isArButton = btn.id === 'ar-btn';
      const shouldBeActive = (lang === 'ar' && isArButton) || (lang === 'en' && btn.id === 'en-btn');
      btn.classList.toggle('active', shouldBeActive);
    });

    // Update currency button labels per language (guard if not available)
    const currLabels = {
      egp: { ar: 'ج.م', en: 'EGP' },
      sar: { ar: 'ر.س', en: 'SAR' },
      usd: { ar: '$', en: 'USD' }
    };
    const egpBtnEl = $('#egp-btn');
    const sarBtnEl = $('#sar-btn');
    const usdBtnEl = $('#usd-btn');
    if (egpBtnEl) egpBtnEl.textContent = currLabels.egp[lang];
    if (sarBtnEl) sarBtnEl.textContent = currLabels.sar[lang];
    if (usdBtnEl) usdBtnEl.textContent = currLabels.usd[lang];

    // Keep active currency button in sync after language switch
    setActiveCurrency(currentCurrency);

    // Update chat title/status language-specific quick data
    const isAr = lang === 'ar';
    const chatTitleEl = $('#chat-title');
    if (chatTitleEl && translations[lang] && translations[lang]['chat-title']) {
      chatTitleEl.textContent = translations[lang]['chat-title'];
    }

    const chatStatusEl = $('#chat-status');
    if (chatStatusEl && translations[lang] && translations[lang]['chat-status']) {
      chatStatusEl.textContent = translations[lang]['chat-status'];
    }

    const chatFabEl = $('#chatFab');
    if (chatFabEl) {
      chatFabEl.setAttribute('aria-label', isAr ? 'محادثة' : 'Chat');
      chatFabEl.setAttribute('title', isAr ? 'محادثة' : 'Chat');
    }

    const chatBoxEl = $('#chatBox');
    if (chatBoxEl) chatBoxEl.setAttribute('aria-label', isAr ? 'محادثة' : 'Chat');

    const chatCloseEl = $('#chatClose');
    if (chatCloseEl) {
      chatCloseEl.setAttribute('aria-label', isAr ? 'إغلاق المحادثة' : 'Close chat');
      chatCloseEl.setAttribute('title', isAr ? 'إغلاق المحادثة' : 'Close chat');
    }

    const waFabEl = $('#waFab');
    if (waFabEl) {
      waFabEl.setAttribute('aria-label', isAr ? 'واتساب' : 'WhatsApp');
      waFabEl.setAttribute('title', isAr ? 'تواصل واتساب' : 'Contact on WhatsApp');
    }

    const chatInputEl = $('#chatInput');
    if (chatInputEl) {
      chatInputEl.placeholder = isAr ? 'اكتب رسالتك...' : 'Type your message...';
      chatInputEl.setAttribute('aria-label', isAr ? 'رسالة' : 'Message');
    }

    updateQuote();

    localStorage.setItem(LANG_KEY, lang);
    // If a modal is open, refresh its content to the new language
    try {
      if (projectModal?.classList.contains('show') && currentModal.type) {
        if (currentModal.type === 'case') {
          // If the currently open case was opened via PROJECTS_DATA (keys like 'p1'),
          // refresh using openProjectModal so the project content stays accurate.
          if (String(currentModal.key).startsWith('p')) {
            openProjectModal(currentModal.key);
          } else {
            window.openModal(currentModal.key);
          }
        } else if (currentModal.type === 'code') {
          window.openCodeModal(currentModal.key);
        }
      }
      if (orderModal?.classList.contains('show')) {
        // update order modal title/labels from translations
        const modalTitle = document.getElementById('modal-title');
        if (modalTitle && lang === 'ar' && defaultDomState.has('modal-title')) {
          modalTitle.innerHTML = defaultDomState.get('modal-title').html;
        } else if (modalTitle && translations[lang] && translations[lang]['modal-title']) {
          modalTitle.textContent = translations[lang]['modal-title'];
        }
      }
    } catch (err) {
      console.warn('Error refreshing modal for language change', err);
    }

    reloadChat();
  }

  /* ================================================
      NAVBAR INITIALIZATION ✅
  ================================================ */
  function initNavbar() {
    const navbar = $("nav.navbar");
    if (!navbar) {
      console.warn("⚠️ Navbar element not found");
      return;
    }

    const existingLinks = navbar.querySelectorAll("a[id]");
    if (existingLinks.length) {
      const hasPrivacySection = !!document.getElementById('privacy');
      const privacyLink = document.getElementById('nav-privacy');
      if (privacyLink && hasPrivacySection) privacyLink.href = '#privacy';
      return;
    }

    // Clear existing content
    navbar.innerHTML = '';

    // Add privacy link; if current page contains a #privacy section, link to the anchor
    const hasPrivacySection = !!document.getElementById('privacy');
    const privacyHref = hasPrivacySection ? '#privacy' : 'privacy.html';

    const navItems = [
      { id: "nav-home", href: "index.html" },
      { id: "nav-about", href: "about.html" },
      { id: "nav-services", href: "services.html" },
      { id: "nav-plans", href: "plans.html" },
      { id: "nav-privacy", href: privacyHref },
      { id: "nav-contact", href: "contact.html" }
    ];

    navItems.forEach(item => {
      const link = document.createElement("a");
      link.id = item.id;
      link.href = item.href;
      link.textContent = translations[DEFAULT_LANG][item.id];
      // mark active link based on current page or in-page privacy
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      if (item.href === currentPage || (item.href === '#privacy' && hasPrivacySection)) {
        link.classList.add('active');
      }
      navbar.appendChild(link);
    });
  }

  /* ================================================
      LANGUAGE BUTTONS INITIALIZATION ✅
  ================================================ */
  function initLanguageButtons() {
    const langSwitchContainer = $(".language-switch") || $(".lang-switch");
    
    if (!langSwitchContainer) {
      console.warn("⚠️ Language switch container not found");
      return;
    }

    let arBtn = document.getElementById("ar-btn");
    let enBtn = document.getElementById("en-btn");

    if (!arBtn) {
      arBtn = document.createElement("button");
      arBtn.id = "ar-btn";
      arBtn.textContent = "AR";
      arBtn.className = "active";
      langSwitchContainer.appendChild(arBtn);
    }

    if (!enBtn) {
      enBtn = document.createElement("button");
      enBtn.id = "en-btn";
      enBtn.textContent = "EN";
      langSwitchContainer.appendChild(enBtn);
    }

    arBtn.addEventListener("click", () => switchLanguage("ar"));
    enBtn.addEventListener("click", () => switchLanguage("en"));
  }

  
  snapshotDefaultContent();
  initLanguageButtons();
  initNavbar();
  // Cache modal elements early so switchLanguage can refresh open modals safely
  // Use `let` so we can create the modal dynamically on pages that don't include it (e.g., services.html)
  let projectModal = $("#modal");
  let projectBody = $("#modal-body");
  let projectCloseBtn = $("#modalCloseBtn");
  const orderModal = $("#orderModal");
  const orderModalCloseBtn = $("#orderModalCloseBtn");
  const orderSuccessMsg = $("#order-success-message");
  const savedLang = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
  // Track current open modal (declared early to avoid TDZ when switching language)
  let currentModal = { type: null, key: null };

  /* ================================================
      CHAT WIDGET - Sales Assistant ✅
  ================================================ */
  const chatFab = $("#chatFab");
  const chatBox = $("#chatBox");
  const chatBody = $("#chatBody");
  const chatForm = $("#chatForm");
  const chatInput = $("#chatInput");
  const chatClose = $("#chatClose");
  const chatOptions = $("#chatOptions");

  let selectedService = null;
  let chatStep = 0;
  let answers = {};

  const isAr = () => document.documentElement.lang === "ar";

  const initialPageLang = document.documentElement.lang || DEFAULT_LANG;
  if (savedLang && savedLang !== initialPageLang) {
    switchLanguage(savedLang);
  }



  const modalCases = {
    case1: `
      <div class="case-card">
        <h2>Ride Me — تطبيق بيع سيارات</h2>
        <img src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop" alt="تطبيق بيع سيارات" style="width:100%;margin:12px 0;border-radius:12px;">
        <p>تطبيق لعرض قوائم السيارات مع فلترة متقدمة، مقارنة بين الإصدارات، ونموذج حجز موعد لمعاينة السيارة أو شراءها عبر بوابة دفع آمنة.</p>
        <div class="case-meta"><strong>النتيجة:</strong> زيادة تفاعل المشترين وتبسيط رحلة الشراء من أول تصفح إلى إتمام الصفقة.</div>
        <ul class="case-features">
          <li>قوائم منتجات قابلة للتصفية والبحث</li>
          <li>نظام حجز ومواعيد لمعاينة السيارات</li>
          <li>تكامل مع بوابات دفع وتقارير مبيعات</li>
        </ul>
      </div>
    `,
    case2: `
      <div class="case-card">
        <h2>ERP تطبيق ادارة الطلبات و المنتجات</h2>
        <img src="https://top-quality-2a1a4.web.app" alt="ERP Application" style="width:100%;margin:12px 0;border-radius:12px;">
        <p>تطبيق لإدارة الطلبات و المنتجات مع نظام تتبع وتحليل الأداء.</p>
        <div class="case-meta"><strong>النتيجة:</strong> تحسين كفاءة العمليات وتقليل الأخطاء من خلال التتبع الدقيق للطلبات والمخزون.</div>
        <ul class="case-features">
          <li>نظام إدارة الطلبات والمنتجات</li>
          <li>نظام تتبع وتحليل الأداء</li>
          <li>لوحة تحكم متكاملة للإدارة</li>
        </ul>
      </div>
    `,
    case3: `
      <div class="case-card">
        <h2>متجر إلكتروني شامل</h2>
        <img src="125.jpg" alt="متجر إلكتروني شامل" style="width:100%;margin:12px 0;border-radius:12px;">
        <p>منصة تجارة إلكترونية متكاملة تضم كتالوج منتجات، سلة مشتريات، طرق شحن متعددة، وحسابات عملاء مع لوحة تحكم للبائعين.</p>
        <div class="case-meta"><strong>النتيجة:</strong> زيادة معدل التحويل وتقليل التخلي عن السلة عبر تحسين تجربة الدفع وتتبّع الطلبات.</div>
        <ul class="case-features">
          <li>سلة وتسوية دفع آمنة</li>
          <li>لوحة إدارة مخزون وطلبات</li>
          <li>التعامل مع خيارات الشحن والضرائب</li>
        </ul>
      </div>
    `,
    case4: `
      <div class="case-card">
        <h2>تطبيق طلب وتوصيل مياه</h2>
        <img src="https://images.unsplash.com/photo-1592928306160-3d8fa6f2b6b4?q=80&w=1200&auto=format&fit=crop" alt="تطبيق توصيل مياه" style="width:100%;margin:12px 0;border-radius:12px;">
        <p>تطبيق يتيح للمستخدمين طلب زجاجات مياه وأسطوانات، جدولة توصيلات، وتتبع حالة الطلب مباشرةً مع إدارة أساطيل التوصيل.</p>
        <div class="case-meta"><strong>النتيجة:</strong> تقليل زمن التوصيل وتحسين معدلات التسليم من خلال تتبع المسارات وإدارة السائقين.</div>
        <ul class="case-features">
          <li>نمودج طلب مرن وجدولة مواعيد</li>
          <li>تتبّع سائقي التوصيل والمسارات</li>
          <li>دفع عند التسليم أو عبر بوابات رقمية</li>
        </ul>
      </div>
    `
  };

const PROJECTS_DATA = {
  p1: {
    title: "Ride Me — تطبيق بيع سيارات",
    desc: "تطبيق احترافي لبيع السيارات مع فلترة، دفع، حجز معاينة، وتدفق تجربة مستخدم متكامل.",
    img: "123.jpg",
    link: "https://www.behance.net/gallery/233201723/Ride-me/modules/1338471047"
  },
  p2: {
    title: "ERP تطبيق ادارة الطلبات و المنتجات",
    desc: "تطبيق لإدارة الطلبات و المنتجات مع نظام تتبع وتحليل الأداء.",
    img: "top-quality.png",
    link: "https://top-quality-2a1a4.web.app"
  },
  p3: {
    title: "متجر إلكتروني شامل",
    desc: "متجر إلكتروني كامل بنظام شحن ومخزون وعمليات دفع متكاملة.",
    img: "125.jpg",
    link: "https://www.behance.net/gallery/227235501/Headphone-HN"
  },
  p4: {
    title: "تطبيق طلب وتوصيل مياه",
    desc: "تطبيق متكامل لطلب المياه وتتبع الطلبات وإدارة السائقين.",
    img: "126.jpg",
    link: "https://www.behance.net/gallery/229058143/Tanni-Dabba"
  }
};

function openProjectModal(id) {
  console.log('Opening project modal for', id);
  const data = PROJECTS_DATA[id];
  if (!data) {
    console.warn('Project data not found for', id);
    return;
  }


  if (!projectModal || !projectBody) {
      const modal = document.createElement('div');
      modal.id = 'modal';
      modal.className = 'modal';

      const modalContent = document.createElement('div');
      modalContent.className = 'modal-content';
      modalContent.setAttribute('tabindex', '-1');
      modalContent.setAttribute('role', 'dialog');

      const closeSpan = document.createElement('button');
      closeSpan.type = 'button';
      closeSpan.className = 'close';
      closeSpan.id = 'modalCloseBtn';
      closeSpan.setAttribute('aria-label', 'إغلاق');
      closeSpan.textContent = '×';

      const bodyDiv = document.createElement('div');
      bodyDiv.id = 'modal-body';

      modalContent.appendChild(closeSpan);
      modalContent.appendChild(bodyDiv);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);

      // Reassign cached references
      projectModal = document.getElementById('modal');
      projectBody = document.getElementById('modal-body');
      projectCloseBtn = document.getElementById('modalCloseBtn');

      // Attach close handlers for the dynamically created modal
      projectCloseBtn?.addEventListener('click', closeModal);
      window.addEventListener('mousedown', e => {
        if (e.target === projectModal) closeModal();
      });
      window.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
      });
    }

  const lang = document.documentElement.lang || DEFAULT_LANG;
  const viewLabel = (lang === 'ar' ? 'مشاهدة المشروع' : 'View Project');


  
  const num = String(id).replace(/^p/, '');
  const titleKey = `project-title-${num}`;
  const descKey = `project-desc-${num}`;
  const titleEl = document.getElementById(titleKey);
  const descEl = document.getElementById(descKey);
  const titleText = lang === 'ar'
    ? (titleEl?.textContent?.trim() || data.title)
    : ((translations[lang] && translations[lang][titleKey]) ? translations[lang][titleKey] : data.title);
  const descText = lang === 'ar'
    ? (descEl?.textContent?.trim() || data.desc)
    : ((translations[lang] && translations[lang][descKey]) ? translations[lang][descKey] : data.desc);

  const imgHtml = data.img ? `<img src="${data.img}" alt="${escapeHtml(titleText)}" style="width:100%;margin:12px 0;border-radius:12px;" />` : '';
  const linkHtml = data.link && data.link !== '#' ? `<a class="btn" href="${data.link}" target="_blank" rel="noopener noreferrer">${viewLabel}</a>` : '';

  if (projectBody) {
    projectBody.innerHTML = `
      <div class="case-card">
        ${imgHtml}
        <h2 id="modal-case-title">${escapeHtml(titleText)}</h2>
        <p id="modal-case-desc">${escapeHtml(descText)}</p>
        <div style="margin-top:14px">${linkHtml}</div>
      </div>
    `;
    projectModal?.classList.add('show');
    console.log('Added show class to modal');
    document.body.style.overflow = 'hidden';
    projectModal?.querySelector('.modal-content')?.focus?.();
    currentModal = { type: 'case', key: id };
  } else {
    console.warn('Modal body not found to show project');
  }
}

function closeProjectModal() {
  if (projectModal) projectModal.classList.remove('show');
  if (projectBody) projectBody.innerHTML = '';
  document.body.style.overflow = '';
  currentModal = { type: null, key: null };
}


window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;

  function bindActionButtons() {
    console.log('Binding action buttons...');
    const bindAction = (id, handler) => {
      const el = document.getElementById(id);
      if (!el) {
        console.warn(`Button ${id} not found`);
        return;
      }
      if (el.dataset.bound === 'true') return;
      el.removeAttribute('onclick');
      el.addEventListener('click', (event) => {
        console.log(`Button ${id} clicked`);
        event.preventDefault();
        handler(event);
      });
      el.dataset.bound = 'true';
    };

  const projectMap = {
    'project1-case-btn': 'p1',
    'project2-case-btn': 'p2',
    'project3-case-btn': 'p3',
    'project4-case-btn': 'p4'
  };

  Object.entries(projectMap).forEach(([id, projectKey]) => {
    bindAction(id, () => openProjectModal(projectKey));
  });

  bindAction('card-btn-1', () => openOrderModal(document.getElementById('card-title-1')?.textContent?.trim() || 'باقة الناشئين'));
  bindAction('card-btn-2', () => openOrderModal(document.getElementById('card-title-2')?.textContent?.trim() || 'باقة الشركات'));
  bindAction('card-btn-3', () => { window.location.href = 'contact.html'; });
  bindAction('chatFab', () => {
    openChatWidget();
  });

  document.addEventListener('click', event => {
    const target = event.target.closest('button, a');
    if (!target) return;

    if (target.classList.contains('currency-btn')) {
      event.preventDefault();
      const currency = getCurrencyFromElement(target);
      if (currency) setCurrency(currency);
    }
  });
}

const modalTranslations = {
    ar: {
      case1: modalCases.case1,
      case2: modalCases.case2,
      case3: modalCases.case3,
      case4: modalCases.case4
    },
    en: {
      case1: `
        <div class="case-card">
          <h2>Ride Me — Car Sales App</h2>
          <img src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop" alt="Car sales app" style="width:100%;margin:12px 0;border-radius:12px;">
          <p>Marketplace app for car listings with advanced filters, booking viewings, and secure payment flow.</p>
          <div class="case-meta"><strong>Outcome:</strong> Improved buyer engagement and streamlined purchase journey.</div>
          <ul class="case-features"><li>Filterable listings</li><li>Booking & viewing flow</li><li>Payment gateway integration</li></ul>
        </div>
      `,
      case2: `
        <div class="case-card">
          <h2>ERP Order & Product Management App</h2>
          <img src="https://top-quality-2a1a4.web.app" alt="ERP Application" style="width:100%;margin:12px 0;border-radius:12px;">
          <p>Application for managing orders and products with tracking and performance analysis.</p>
          <div class="case-meta"><strong>Outcome:</strong> Improved operational efficiency and reduced errors through precise tracking.</div>
          <ul class="case-features"><li>Order & product management</li><li>Tracking & performance analysis</li><li>Comprehensive dashboard</li></ul>
        </div>
      `,
      case3: `
        <div class="case-card">
          <h2>Full E‑commerce Store</h2>
          <img src="https://images.unsplash.com/photo-1515165562835-c24b9d8a0ee6?q=80&w=1200&auto=format&fit=crop" alt="E‑commerce platform" style="width:100%;margin:12px 0;border-radius:12px;">
          <p>Complete e‑commerce solution including product catalog, cart, secure checkout, inventory and order management.</p>
          <div class="case-meta"><strong>Outcome:</strong> Increased conversions and reduced cart abandonment.</div>
          <ul class="case-features"><li>Secure checkout</li><li>Inventory & order dashboard</li><li>Shipping options</li></ul>
        </div>
      `,
      case4: `
        <div class="case-card">
          <h2>Water Delivery App</h2>
          <img src="https://images.unsplash.com/photo-1592928306160-3d8fa6f2b6b4?q=80&w=1200&auto=format&fit=crop" alt="Water delivery app" style="width:100%;margin:12px 0;border-radius:12px;">
          <p>On‑demand ordering with scheduling, driver assignment and delivery tracking for water supply businesses.</p>
          <div class="case-meta"><strong>Outcome:</strong> Faster deliveries and better logistics management.</div>
          <ul class="case-features"><li>Flexible ordering & scheduling</li><li>Driver tracking</li><li>Payment on delivery or online</li></ul>
        </div>
      `
    }
  };



  

  window.openModal = function (type) {

    if (String(type).startsWith('code')) {
      return window.openCodeModal(type);
    }

    if (String(type).startsWith('case')) {
      const num = type.replace(/^case/, '');
      const projectKey = `p${num}`;
      if (PROJECTS_DATA && PROJECTS_DATA[projectKey]) {
        return openProjectModal(projectKey);
      }
    }


    const perPage = document.getElementById(type);
    if (perPage && perPage.classList.contains('modal')) {
      perPage.classList.add('show');
      document.body.style.overflow = 'hidden';
      currentModal = { type: 'case', key: type };
      return;
    }

    if (!projectModal || !projectBody) return;
    const lang = document.documentElement.lang || DEFAULT_LANG;
    const content = (modalTranslations[lang] && modalTranslations[lang][type]) || modalCases[type] || modalCases.case1;
    projectBody.innerHTML = content;
    projectModal.classList.add("show");
    document.body.style.overflow = "hidden";
    projectModal.querySelector('.modal-content')?.focus?.();
    currentModal = { type: 'case', key: type };
  };

  window.openOrderModal = function (planName) {
    if (!orderModal) return;

    const planInput = document.getElementById('plan-name');
    if (planInput) planInput.value = planName || '';

    const lang = document.documentElement.lang || DEFAULT_LANG;
    const modalTitle = document.getElementById('modal-title');
    if (modalTitle && lang === 'ar' && defaultDomState.has('modal-title')) {
      modalTitle.innerHTML = defaultDomState.get('modal-title').html;
    } else if (modalTitle && translations[lang] && translations[lang]['modal-title']) {
      modalTitle.textContent = translations[lang]['modal-title'];
    }
    if (orderSuccessMsg) orderSuccessMsg.style.display = "none";
    orderModal.classList.add("show");
    document.body.style.overflow = "hidden";
    orderModal.querySelector('.modal-content')?.focus?.();
  };

  function closeModal() {
    [projectModal, orderModal].forEach(m => {
      if (m) m.classList.remove("show");
    });
    if (projectBody) projectBody.innerHTML = "";
    if (orderSuccessMsg) orderSuccessMsg.style.display = "none";
    document.body.style.overflow = "";
  }
  window.closeModal = closeModal;

  projectCloseBtn?.addEventListener("click", closeModal);
  orderModalCloseBtn?.addEventListener("click", closeModal);
  window.addEventListener("mousedown", e => {
    if (e.target === projectModal || e.target === orderModal) closeModal();
  });
  window.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  /* ================================================
      FORM SUBMISSION ✅
  ================================================ */
  window.showOrderSuccessMessage = function (event) {
    event.preventDefault();
    const form = event.target;
    const lang = document.documentElement.lang || DEFAULT_LANG;
    const submitBtn = form.querySelector('button[type="submit"]');
    const isContactForm = form.classList.contains('contact-box');
    const successTarget = document.getElementById('order-success-message');

    const nameField = form.querySelector('[name="name"]');
    const emailField = form.querySelector('[name="email"]');
    const phoneField = form.querySelector('[name="phone"]');
    const subjectField = form.querySelector('[name="_subject"]');
    const replyToField = form.querySelector('[name="_replyto"]');
    const pageField = form.querySelector('[name="source_page"]');
    if (pageField) pageField.value = window.location.pathname.split('/').pop() || 'contact.html';
    if (replyToField) replyToField.value = emailField?.value?.trim() || '';
    if (subjectField && isContactForm) {
      const sender = nameField?.value?.trim() || 'Website Visitor';
      const phone = phoneField?.value?.trim();
      subjectField.value = phone
        ? `New contact request from ${sender} - ${phone}`
        : `New contact request from ${sender}`;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = lang === 'ar' ? 'جاري الإرسال...' : 'Sending...';
    }

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(async response => {
        let payload = null;
        try {
          payload = await response.json();
        } catch (err) {
          payload = null;
        }

        if (response.ok) {
          form.reset();
          if (successTarget) {
            successTarget.textContent = lang === 'ar'
              ? (isContactForm
                ? "✅ تم إرسال رسالتك بنجاح. سنتواصل معك قريبًا."
                : "✅ تم إرسال الطلب بنجاح! سنتواصل معك قريبًا.")
              : (isContactForm
                ? "✅ Your message was sent successfully. We'll get back to you soon."
                : translations[lang]["order-success"]);
            successTarget.style.display = "block";
          }
          if (orderModal && orderModal.classList.contains("show")) {
            setTimeout(closeModal, 2500);
          }
        } else {
          const message = payload?.errors?.map(item => item.message).join(" / ");
          alert(message || (lang === 'ar' ? "❌ حدث خطأ أثناء إرسال الطلب." : "❌ There was a problem sending the form."));
        }
      })
      .catch(err => {
        console.error("Form submission error:", err);
        alert(lang === 'ar' ? "⚠️ تعذر الاتصال بالخادم." : "⚠️ Could not connect to the server.");
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = lang === 'ar'
            ? (isContactForm ? 'إرسال الرسالة' : 'إرسال الطلب')
            : (isContactForm ? 'Send Message' : 'Submit Order');
        }
      });
  };


  window.showSuccessMessage = window.showOrderSuccessMessage;


  const codeSnippets = {
    code1: `<!-- مثال: صفحة رئيسية لتطبيق توصيل طعام -->
<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>تطبيق توصيل - الصفحة الرئيسية</title>
    <style>body{font-family:Arial,Helvetica,sans-serif}</style>
  </head>
  <body>
    <header>
      <h1>مطعم X - توصيل سريع</h1>
      <nav>القائمة · العروض · تتبع الطلب</nav>
    </header>
    <main>
      <section class="hero">
        <h2>أطباق مميزة اليوم</h2>
        <div class="cards">/* قائمة الأصناف هنا */</div>
      </section>
      <section class="order-tracking">
        <p>حالة الطلب: <strong>جارٍ التحضير</strong></p>
      </section>
    </main>
  </body>
</html>`,
    code2: `// مثال: React - بطاقة منتج بسيطة
import React from 'react';
export default function ProductCard({ item }) {
  return (
    <article className="product-card">
      <img src={item.img} alt={item.title} />
      <h3>{item.title}</h3>
      <p className="price">{item.price}</p>
      <button>Add to cart</button>
    </article>
  );
}
`,
    code3: `<!-- تقرير حملة إعلانية — مثال جاهز للطباعة -->
<section class="report">
  <h2>تقرير الحملة</h2>
  <table>
    <tr><th>مقياس</th><th>القيمة</th></tr>
    <tr><td>الانطباعات</td><td>120,000</td></tr>
    <tr><td>النقرات</td><td>3,450</td></tr>
    <tr><td>CTR</td><td>2.88%</td></tr>
    <tr><td>التحويلات</td><td>210</td></tr>
    <tr><td>تكلفة لكل تحويل</td><td>45 ج.م</td></tr>
  </table>
</section>`,
    code4: `// تتبع بسيط للأحداث
function trackEvent(name, data) {
  fetch('/api/track', { method: 'POST', body: JSON.stringify({ name, data }), headers: { 'Content-Type': 'application/json' } });
}
`
  };

  // Make codeSnippets language-aware (provide en/ar if needed)
  const codeSnippetsByLang = {
    ar: {
      code1: codeSnippets.code1,
      code2: codeSnippets.code2,
      code3: codeSnippets.code3,
      code4: codeSnippets.code4
    },
    en: {
      code1: codeSnippets.code1,
      code2: codeSnippets.code2,
      code3: codeSnippets.code3,
      code4: codeSnippets.code4
    }
  };

  // Open a modal showing code (with copy button)
  window.openCodeModal = function (key) {
    if (!projectModal || !projectBody) return;
    const lang = document.documentElement.lang || DEFAULT_LANG;
    const code = (codeSnippetsByLang[lang] && codeSnippetsByLang[lang][key]) || codeSnippetsByLang[lang].code1;
    const title = (lang === 'ar') ? 'عرض الكود' : 'Code Preview';
    projectBody.innerHTML = `
      <div class="modal-code">
        <div class="modal-code-head">
          <strong>${title}</strong>
          <button class="copy-code-btn" type="button">نسخ الكود</button>
        </div>
        <pre><code>${escapeHtml(code)}</code></pre>
      </div>`;
    projectModal.classList.add("show");
    document.body.style.overflow = "hidden";
    projectModal.querySelector('.modal-content')?.focus?.();
    currentModal = { type: 'code', key };
  };

  // Open a campaign report modal (uses modalCases or a minimal template)
  window.openCampaignReport = function (key) {
    if (!projectModal || !projectBody) return;
    const lang = document.documentElement.lang || DEFAULT_LANG;
    if (modalTranslations[lang] && modalTranslations[lang][key]) {
      projectBody.innerHTML = modalTranslations[lang][key];
    } else if (modalCases[key]) {
      projectBody.innerHTML = modalCases[key];
    } else {
      projectBody.innerHTML = codeSnippetsByLang[lang].code3;
    }
    projectModal.classList.add("show");
    document.body.style.overflow = "hidden";
    projectModal.querySelector('.modal-content')?.focus?.();
  };

  // Copy button handler (delegate)
  document.addEventListener('click', (e) => {
    if (!e.target.matches('.copy-code-btn')) return;
    const pre = e.target.closest('.modal-code')?.querySelector('pre');
    if (!pre) return;
    const text = pre.innerText || pre.textContent;
    navigator.clipboard.writeText(text).then(() => {
      const original = e.target.textContent;
      e.target.textContent = '✓ تم النسخ';
      setTimeout(() => e.target.textContent = original, 1500);
    }).catch(err => {
      console.error('Copy failed', err);
      alert('تعذر النسخ');
    });
  });

  // Helper to escape HTML inside code blocks
  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
  }

  /* ================================================
      WHATSAPP FAB ✅
  ================================================ */
  const waFab = $("#waFab");

  // Build a WhatsApp message from quick-quote and contact inputs
  function buildQuoteMessage() {
    const isAr = document.documentElement.lang === 'ar';
    const svcEl = $("#qq-service");
    const svcText = svcEl ? svcEl.options[svcEl.selectedIndex].text : '';
    const budget = $("#qq-budget-out")?.textContent || ($("#qq-budget")?.value || '');
    const timeEl = $("#qq-time");
    const timeText = timeEl ? timeEl.options[timeEl.selectedIndex].text : '';
    const opts = [];
    if ($("#qq-seo")?.checked) opts.push($("#qq-seo-label")?.textContent || 'SEO');
    if ($("#qq-cms")?.checked) opts.push($("#qq-cms-label")?.textContent || 'CMS');
    if ($("#qq-multi")?.checked) opts.push($("#qq-multi-label")?.textContent || 'Multi');

    // Try to capture contact fields if present
    const name = $("#name")?.value || $("#modal-name")?.value || '';
    const phone = $("#phone")?.value || $("#modal-phone")?.value || '';
    const email = $("#email")?.value || $("#modal-email")?.value || '';

    if (isAr) {
      const lines = [
        'مرحباً، أود الحصول على تقدير سريع',
        `• الخدمة: ${svcText}`,
        `• الميزانية: ${budget}`,
        `• الخيارات: ${opts.length ? opts.join(', ') : 'لا توجد'}`,
        `• الإطار الزمني: ${timeText}`
      ];
      if (name) lines.push(`• الاسم: ${name}`);
      if (phone) lines.push(`• الهاتف: ${phone}`);
      if (email) lines.push(`• البريد: ${email}`);
      return lines.join('\n');
    } else {
      const lines = [
        'Hello, I would like a quick estimate',
        `• Service: ${svcText}`,
        `• Budget: ${budget}`,
        `• Options: ${opts.length ? opts.join(', ') : 'None'}`,
        `• Timeline: ${timeText}`
      ];
      if (name) lines.push(`• Name: ${name}`);
      if (phone) lines.push(`• Phone: ${phone}`);
      if (email) lines.push(`• Email: ${email}`);
      return lines.join('\n');
    }
  }

  function openWhatsAppWithQuote(e) {
    const msg = buildQuoteMessage();
    const url = waUrl(msg);
    const qqSend = $("#qq-send-quote");
    const waFabLink = $("#waFab");
    if (qqSend) qqSend.href = url;
    if (waFabLink) waFabLink.href = url;
    if (e?.currentTarget?.tagName === 'A') {
      e.currentTarget.href = url;
    }
  }

  // Attach to FAB and the inline send link
  const qqSend = $("#qq-send-quote");
  if (waFab) {
    waFab.href = waUrl();
    waFab.addEventListener('click', openWhatsAppWithQuote);
    waFab.setAttribute('aria-label', 'WhatsApp');
  }
  if (qqSend) {
    qqSend.addEventListener('click', openWhatsAppWithQuote);
    // set a default crawlable href for bots; it is updated on click with the live message
    qqSend.href = waUrl();
  }

  const qqBudget = $("#qq-budget");
  const qqOut = $("#qq-budget-out");
  const qqLow = $("#qq-low");
  const qqHigh = $("#qq-high");
  const qqSvc = $("#qq-service");
  const egpBtn = $("#egp-btn");
  const sarBtn = $("#sar-btn");
  const usdBtn = $("#usd-btn");

  // قيم الأساس (ريال)
  const BASE_MIN_SAR = 100;
  const BASE_MAX_SAR = 200000;
  const BASE_STEP_SAR = 100;

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  function setBudgetScaleForCurrency(currency) {
    if (!qqBudget || !rates[currency]) return;
    qqBudget.min = Math.round(BASE_MIN_SAR * rates[currency]);
    qqBudget.max = Math.round(BASE_MAX_SAR * rates[currency]);
    qqBudget.step = Math.max(1, Math.round(BASE_STEP_SAR * rates[currency]));
  }

  function syncBudgetInputFromBase() {
    if (!qqBudget || !rates[currentCurrency]) return;
    setBudgetScaleForCurrency(currentCurrency);
    const displayVal = Math.round(baseBudgetSar * rates[currentCurrency]);
    const min = Number(qqBudget.min) || 0;
    const max = Number(qqBudget.max) || displayVal;
    qqBudget.value = clamp(displayVal, min, max);
  }

  const refreshCurrencyUI = () => {
    setActiveCurrency(currentCurrency);
    setBudgetScaleForCurrency(currentCurrency);
    syncBudgetInputFromBase();
    updateQuote();
    refreshChatOptions(); // تحديث الخيارات بالعملة الجديدة
  };

  refreshCurrencyUI();

  const setCurrency = (currency) => {
    const next = normalizeCurrency(currency);
    if (!rates[next]) {
      console.warn('Currency not supported:', currency);
      return;
    }
    currentCurrency = next;
    localStorage.setItem(CURRENCY_KEY, currentCurrency);
    refreshCurrencyUI();
  };

  const getCurrencyFromElement = (el) => {
    if (!el || !el.id) return null;
    return normalizeCurrency(el.id.replace('-btn', ''));
  };

  [egpBtn, sarBtn, usdBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        const currency = getCurrencyFromElement(btn);
        if (currency) setCurrency(currency);
      });
    }
  });

  const currencySwitch = document.querySelector('.currency-switch');
  if (currencySwitch) {
    currencySwitch.addEventListener('click', (e) => {
      const btn = e.target.closest('.currency-btn');
      if (!btn) return;
      const currency = getCurrencyFromElement(btn);
      if (currency) setCurrency(currency);
    });
  }

  function baseRange(service) {
    const ranges = {
      identity: [3000, 15000],
      website: [7000, 45000],
      app: [20000, 200000],
      marketing: [4000, 80000],
      ads: [5000, 50000]
    };
    return ranges[service] || [5000, 20000];
  }

  function applyOptions([low, high]) {
    let multiplier = 1;
    if ($("#qq-seo")?.checked) multiplier += 0.12;
    if ($("#qq-cms")?.checked) multiplier += 0.18;
    if ($("#qq-multi")?.checked) multiplier += 0.15;
    if ($("#qq-time")?.value === "rush") multiplier += 0.2;
    return [Math.round(low * multiplier), Math.round(high * multiplier)];
  }

  function clampBudget([low, high], budget) {
    if (budget < low) return [Math.round(budget * 0.8), Math.round(budget * 1.1)];
    if (budget > high) return [Math.round(high * 0.9), Math.round(budget * 1.05)];
    return [low, high];
  }

  function updateQuote() {
    const qqBudgetEl = $("#qq-budget");
    const qqOutEl = $("#qq-budget-out");
    const qqLowEl = $("#qq-low");
    const qqHighEl = $("#qq-high");
    const qqSvcEl = $("#qq-service");

    if (!qqBudgetEl || !qqOutEl || !qqLowEl || !qqHighEl || !qqSvcEl) return;

    const budgetSar = baseBudgetSar || BASE_MIN_SAR;
    qqOutEl.textContent = fmtCurrency(budgetSar);

    let range = baseRange(qqSvcEl.value);
    range = applyOptions(range);
    range = clampBudget(range, budgetSar);

    qqLowEl.textContent = fmtCurrency(range[0]);
    qqHighEl.textContent = fmtCurrency(range[1]);
  }

  ["input", "change"].forEach(eventType => {
    qqBudget?.addEventListener(eventType, () => {
      if (!rates[currentCurrency]) return;
      const valCurr = Number(qqBudget.value) || 0;
      baseBudgetSar = valCurr / rates[currentCurrency]; // خزّنها بالأساس (SAR)
      // حدّث بعد تخزين القيمة
      updateQuote();
    });
    qqSvc?.addEventListener(eventType, updateQuote);
    ["qq-seo", "qq-cms", "qq-multi", "qq-time"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener(eventType, updateQuote);
    });
  });

  if (qqBudget) {
    baseBudgetSar = BASE_MIN_SAR;
    syncBudgetInputFromBase();
    updateQuote();
  }

  $("#qq-copy")?.addEventListener("click", () => {
    if (!qqLow || !qqHigh) return;
    const text = `${qqLow.textContent} - ${qqHigh.textContent}`;
    navigator.clipboard.writeText(text).then(() => {
      const btn = $("#qq-copy");
      const original = btn.textContent;
      btn.textContent = "✓ تم النسخ";
      setTimeout(() => btn.textContent = original, 1500);
    });
  });

  function botMsg(text) {
    const div = document.createElement("div");
    div.className = "bubble bot";
    div.textContent = text;
    chatBody?.appendChild(div);
    if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
  }

  function userMsg(text) {
    const div = document.createElement("div");
    div.className = "bubble me";
    div.textContent = text;
    chatBody?.appendChild(div);
    if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
  }

  function showOptions(options) {
    if (!chatOptions) return;
    chatOptions.innerHTML = '';
    if (!options || !options.length) {
      hideOptions();
      return;
    }
    options.forEach(opt => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = opt;
      btn.addEventListener("click", () => handleOptionClick(opt));
      chatOptions.appendChild(btn);
    });
    chatOptions.style.display = "flex";
    chatOptions.hidden = false;
    chatOptions.removeAttribute('hidden');
  }

  function hideOptions() {
    if (chatOptions) {
      chatOptions.style.display = "none";
      chatOptions.hidden = true;
    }
  }

  function closeChatWidget() {
    if (!chatBox) return;
    chatBox.classList.remove("show");
    hideOptions();
  }

  function openChatWidget() {
    if (!chatBox) return;
    chatBox.classList.add("show");
    startChat();
    if (chatBody && !chatBody.childElementCount) {
      startChat();
    }
    if (chatOptions && !chatOptions.childElementCount) {
      showOptions(getChatOptions(0));
    }
  }

  function getChatOptions(step, service) {
    if (step === 0) {
      return isAr()
        ? ["برمجة", "تسويق", "إعلانات", "إدارة الحسابات"]
        : ["Programming", "Marketing", "Ads", "Account Management"];
    }

    if (step === 1) {
      if (service === "برمجة" || service === "Programming") {
        return isAr() ? ["موقع", "تطبيق", "متجر", "نظام خاص"] : ["Website", "App", "Store", "Custom System"];
      }
      if (service === "تسويق" || service === "Marketing") {
        return isAr() ? ["متجر إلكتروني", "خدمات", "منتجات", "شركة"] : ["E-commerce", "Services", "Products", "Company"];
      }
      if (service === "إعلانات" || service === "Ads") {
        return isAr() ? ["جوجل", "ميتا", "تيك توك", "سناب"] : ["Google", "Meta", "TikTok", "Snapchat"];
      }
      if (service === "إدارة الحسابات" || service === "Account Management") {
        return isAr() ? ["1-3 حسابات", "4-10 حسابات", "أكثر من 10 حسابات"] : ["1-3 accounts", "4-10 accounts", "More than 10 accounts"];
      }
    }

    if (step === 2) {
      if (service === "برمجة" || service === "Programming") {
        return isAr() ? ["موقع تجاري", "تطبيق عملي", "نظام إدارة", "حل مخصص"] : ["Business Website", "Practical App", "Management System", "Custom Solution"];
      }
      if (service === "تسويق" || service === "Marketing" || service === "إدارة الحسابات" || service === "Account Management") {
        return isAr() ? ["نعم", "لا"] : ["Yes", "No"];
      }
      if (service === "إعلانات" || service === "Ads") {
        return isAr()
          ? [`أقل من ${getPriceInCurrentCurrency(1000)} ${getCurrencySymbol()}`, `${getPriceInCurrentCurrency(1000)}-${getPriceInCurrentCurrency(5000)} ${getCurrencySymbol()}`, `أكثر من ${getPriceInCurrentCurrency(5000)} ${getCurrencySymbol()}`]
          : [`Less than ${getPriceInCurrentCurrency(1000)} ${getCurrencySymbol()}`, `${getPriceInCurrentCurrency(1000)}-${getPriceInCurrentCurrency(5000)} ${getCurrencySymbol()}`, `More than ${getPriceInCurrentCurrency(5000)} ${getCurrencySymbol()}`];
      }
    }

    if (step === 3) {
      if (service === "برمجة" || service === "Programming") {
        return isAr() ? ["جاهز", "فكرة"] : ["Ready", "Idea"];
      }
      if (service === "إدارة الحسابات" || service === "Account Management") {
        return isAr() ? ["نعم", "لا"] : ["Yes", "No"];
      }
    }

    if (step === 4 && (service === "برمجة" || service === "Programming")) {
      return isAr()
        ? [`أقل من ${getPriceInCurrentCurrency(2500)} ${getCurrencySymbol()}`, `${getPriceInCurrentCurrency(2500)}-${getPriceInCurrentCurrency(8000)} ${getCurrencySymbol()}`, `أكثر من ${getPriceInCurrentCurrency(8000)} ${getCurrencySymbol()}`]
        : [`Less than ${getPriceInCurrentCurrency(2500)} ${getCurrencySymbol()}`, `${getPriceInCurrentCurrency(2500)}-${getPriceInCurrentCurrency(8000)} ${getCurrencySymbol()}`, `More than ${getPriceInCurrentCurrency(8000)} ${getCurrencySymbol()}`];
    }

    return [];
  }

  function startChat() {
    if (!chatBody) return;
    chatBody.innerHTML = '';
    if (chatOptions) chatOptions.innerHTML = '';
    chatStep = 0;
    selectedService = null;
    answers = {};
    if (chatInput) chatInput.value = "";
    botMsg(isAr() ? "أهلاً بك! 👋 أنا مساعد Markode وسأساعدك في الوصول إلى الخدمة المناسبة بسرعة." : "Welcome! 👋 I'm the Markode assistant and I'll help you find the right service quickly.");
    botMsg(isAr() ? "اختر نوع الخدمة التي تحتاجها 👇" : "Choose the service you need 👇");
    showOptions(getChatOptions(0));

    // Fallback: if anything clears the intro state, rebuild it immediately.
    if (!chatBody.childElementCount) {
      chatBody.innerHTML = `
        <div class="bubble bot">${isAr() ? "أهلاً بك! 👋 أنا مساعد Markode وسأساعدك في الوصول إلى الخدمة المناسبة بسرعة." : "Welcome! 👋 I'm the Markode assistant and I'll help you find the right service quickly."}</div>
        <div class="bubble bot">${isAr() ? "اختر نوع الخدمة التي تحتاجها 👇" : "Choose the service you need 👇"}</div>
      `;
    }
    if (chatOptions && !chatOptions.childElementCount) {
      showOptions(getChatOptions(0));
    }
  }

  function refreshChatOptions() {
    if (!selectedService || chatStep === 0) return;
    const options = getChatOptions(chatStep, selectedService);
    if (options.length) showOptions(options);
  }

  function handleOptionClick(option) {
    userMsg(option);
    hideOptions();
    processResponse(option);
  }

  function processResponse(response) {

    if (chatStep === 0) {
      // Service selection
      selectedService = response;
      if (selectedService === "برمجة" || selectedService === "Programming") {
        botMsg(isAr() ? "ممتاز! ما نوع الحل البرمجي الذي تحتاجه؟" : "Great! What type of software solution do you need?");
        showOptions(getChatOptions(1, selectedService));
        chatStep++;
      } else if (selectedService === "تسويق" || selectedService === "Marketing") {
        botMsg(isAr() ? "رائع! ما نوع نشاطك التجاري؟" : "Awesome! What's your business type?");
        showOptions(getChatOptions(1, selectedService));
        chatStep++;
      } else if (selectedService === "إعلانات" || selectedService === "Ads") {
        botMsg(isAr() ? "ممتاز! ما المنصة الإعلانية المستهدفة؟" : "Excellent! Which ad platform are you targeting?");
        showOptions(getChatOptions(1, selectedService));
        chatStep++;
      } else if (selectedService === "إدارة الحسابات" || selectedService === "Account Management") {
        botMsg(isAr() ? "ممتاز! كم عدد الحسابات التي تريد إدارتها؟" : "Great! How many accounts do you want us to manage?");
        showOptions(getChatOptions(1, selectedService));
        chatStep++;
      }
    } else if (chatStep === 1) {
      if (selectedService === "برمجة" || selectedService === "Programming") {
        // Sub-service for programming
        answers.subService = response;
        botMsg(isAr() ? "ما الهدف من المشروع؟" : "What's the project goal?");
        showOptions(getChatOptions(2, selectedService));
        chatStep++;
      } else if (selectedService === "تسويق" || selectedService === "Marketing") {
        answers.businessType = response;
        botMsg(isAr() ? "هل لديك موقع أو حسابات سوشيال ميديا جاهزة؟" : "Do you already have a website or active social media accounts?");
        showOptions(getChatOptions(2, selectedService));
        chatStep++;
      } else if (selectedService === "إعلانات" || selectedService === "Ads") {
        answers.platform = response;
        botMsg(isAr() ? "ما نطاق الميزانية الإعلانية الشهرية؟" : "What's your approximate monthly ad budget?");
        showOptions(getChatOptions(2, selectedService));
        chatStep++;
      } else if (selectedService === "إدارة الحسابات" || selectedService === "Account Management") {
        answers.accountCount = response;
        botMsg(isAr() ? "هل تحتاجون إلى تصميم محتوى شهري؟" : "Do you need monthly content design?");
        showOptions(getChatOptions(2, selectedService));
        chatStep++;
      }
    } else if (chatStep === 2) {
      if (selectedService === "برمجة" || selectedService === "Programming") {
        answers.goal = response;
        botMsg(isAr() ? "هل المشروع جاهز للبدء أم لا يزال فكرة؟" : "Is the project ready to start or still an idea?");
        showOptions(getChatOptions(3, selectedService));
        chatStep++;
      } else if (selectedService === "تسويق" || selectedService === "Marketing") {
        answers.hasSocial = response;
        const summary = buildSummary();
        window.open(waUrl(summary), "_blank", "noopener,noreferrer");
        botMsg(isAr() ? "✅ تم تجهيز ملخص الطلب وإرساله إلى واتساب. سنكمل معك هناك مباشرة." : "✅ Your request summary has been sent to WhatsApp. We'll continue with you there.");
        setTimeout(() => {
          chatStep = 0;
          selectedService = null;
          answers = {};
        }, 3000);
      } else if (selectedService === "إعلانات" || selectedService === "Ads") {
        answers.budget = response;
        botMsg(isAr() ? `إدارة الحملات تبدأ من ${getPriceInCurrentCurrency(1000)} ${getCurrencySymbol()} شهرياً مع تحسين النتائج وتقليل تكلفة الاكتساب.` : `Campaign management starts at ${getPriceInCurrentCurrency(1000)} ${getCurrencySymbol()} per month with ongoing optimization to improve results and lower acquisition cost.`);
        const summary = buildSummary();
        window.open(waUrl(summary), "_blank", "noopener,noreferrer");
        botMsg(isAr() ? "✅ تم تجهيز ملخص الحملة وإرساله إلى واتساب. سنكمل التفاصيل معك هناك." : "✅ Your campaign brief has been sent to WhatsApp. We'll continue the details there.");
        setTimeout(() => {
          chatStep = 0;
          selectedService = null;
          answers = {};
        }, 3000);
      } else if (selectedService === "إدارة الحسابات" || selectedService === "Account Management") {
        answers.contentDesign = response;
        botMsg(isAr() ? "هل تحتاجون أيضاً إلى الرد على العملاء والمتابعين؟" : "Do you also need customer reply management?");
        showOptions(getChatOptions(3, selectedService));
        chatStep++;
      }
    } else if (chatStep === 3) {
      if (selectedService === "برمجة" || selectedService === "Programming") {
        answers.status = response;
        botMsg(isAr() ? "ما ميزانيتك التقريبية؟" : "What's your approximate budget?");
        showOptions(isAr() ? [`أقل من 2500 ${getCurrencySymbol()}`, `2500-8000 ${getCurrencySymbol()}`, `أكثر من 8000 ${getCurrencySymbol()}`] : [`Less than ${getPriceInCurrentCurrency(2500)} ${getCurrencySymbol()}`, `${getPriceInCurrentCurrency(2500)}-${getPriceInCurrentCurrency(8000)} ${getCurrencySymbol()}`, `More than ${getPriceInCurrentCurrency(8000)} ${getCurrencySymbol()}`]);
        chatStep++;
      } else if (selectedService === "إدارة الحسابات" || selectedService === "Account Management") {
        answers.customerReply = response;
        botMsg(isAr() ? `باقات إدارة الحسابات تبدأ من ${getPriceInCurrentCurrency(1200)} ${getCurrencySymbol()} شهرياً حسب عدد الحسابات ونطاق العمل.` : `Account management packages start at ${getPriceInCurrentCurrency(1200)} ${getCurrencySymbol()} per month based on account count and scope.`);
        const summary = buildSummary();
        window.open(waUrl(summary), "_blank", "noopener,noreferrer");
        botMsg(isAr() ? "✅ تم إرسال تفاصيل الطلب إلى واتساب. سنكمل معك الخطوة التالية هناك." : "✅ Your request details have been sent to WhatsApp. We'll continue with you there.");
        setTimeout(() => {
          chatStep = 0;
          selectedService = null;
          answers = {};
        }, 3000);
      }
    } else if (chatStep === 4) {
      if (selectedService === "برمجة" || selectedService === "Programming") {
        answers.budget = response;
        let offer = "";
        if (answers.subService === "موقع" || answers.subService === "Website") {
          offer = isAr() ? `المواقع الاحترافية تبدأ من ${getPriceInCurrentCurrency(2500)} ${getCurrencySymbol()}.` : `Professional websites start at ${getPriceInCurrentCurrency(2500)} ${getCurrencySymbol()}.`;
        } else if (answers.subService === "تطبيق" || answers.subService === "App") {
          offer = isAr() ? `التطبيقات تبدأ من ${getPriceInCurrentCurrency(8000)} ${getCurrencySymbol()}.` : `Applications start at ${getPriceInCurrentCurrency(8000)} ${getCurrencySymbol()}.`;
        } else if (answers.subService === "متجر" || answers.subService === "Store") {
          offer = isAr() ? `المتاجر الإلكترونية تبدأ من ${getPriceInCurrentCurrency(3500)} ${getCurrencySymbol()}.` : `E-commerce stores start at ${getPriceInCurrentCurrency(3500)} ${getCurrencySymbol()}.`;
        } else {
          offer = isAr() ? `الأنظمة المخصصة تبدأ من ${getPriceInCurrentCurrency(5000)} ${getCurrencySymbol()}.` : `Custom systems start at ${getPriceInCurrentCurrency(5000)} ${getCurrencySymbol()}.`;
        }
        botMsg(offer);
        const summary = buildSummary();
        window.open(waUrl(summary), "_blank", "noopener,noreferrer");
        botMsg(isAr() ? "✅ تم إرسال ملخص المشروع إلى واتساب. سنكمل التفاصيل معك هناك." : "✅ Your project summary has been sent to WhatsApp. We'll continue the details there.");
        setTimeout(() => {
          chatStep = 0;
          selectedService = null;
          answers = {};
        }, 3000);
      }
    }
  }

  function buildSummary() {
    const isAr = document.documentElement.lang === "ar";
    let summary = isAr ? "📋 طلب استشارة من محادثة الموقع:\n" : "📋 Website consultation request:\n";
    summary += isAr ? `• الخدمة: ${selectedService}\n` : `• Service: ${selectedService}\n`;

    // Map keys to readable labels
    const keyLabels = {
      subService: isAr ? "نوع الخدمة الفرعية" : "Sub-service",
      businessType: isAr ? "نوع النشاط التجاري" : "Business Type",
      platform: isAr ? "المنصة المستهدفة" : "Target Platform",
      accountCount: isAr ? "عدد الحسابات" : "Number of Accounts",
      goal: isAr ? "هدف المشروع" : "Project Goal",
      status: isAr ? "حالة المشروع" : "Project Status",
      budget: isAr ? "الميزانية" : "Budget",
      hasSocial: isAr ? "لديك موقع أو حسابات" : "Has Website/Social",
      contentDesign: isAr ? "تصميم المحتوى" : "Content Design",
      customerReply: isAr ? "الرد على العملاء" : "Customer Replies"
    };

    Object.entries(answers).forEach(([key, val]) => {
      const label = keyLabels[key] || key;
      summary += `• ${label}: ${val}\n`;
    });
    return summary;
  }

  chatFab?.addEventListener("click", (event) => {
    event.preventDefault();
    openChatWidget();
  });

  chatClose?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    closeChatWidget();
  });

  document.body.addEventListener('click', (event) => {
    const closeBtn = event.target.closest('#chatClose');
    if (closeBtn) {
      event.preventDefault();
      closeChatWidget();
    }
  });

  window.closeChatWidget = closeChatWidget;

  chatForm?.addEventListener("submit", e => {
    e.preventDefault();
    const inputValue = (chatInput?.value || "").trim();
    if (!inputValue) return;
    userMsg(inputValue);
    if (chatInput) chatInput.value = "";
    processResponse(inputValue);
  });

  bindActionButtons();
  console.log("✅ Markode App Loaded Successfully");
});
