export const LOCALE_COOKIE_NAME = "locale";
export const LOCALE_STORAGE_KEY = "find-any-image-locale";
export const locales = ["en", "ar"] as const;
export const defaultLocale: Locale = "en";

export type Locale = (typeof locales)[number];
export type Direction = "ltr" | "rtl";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "ar";
}

export function getDirection(locale: Locale): Direction {
  return locale === "ar" ? "rtl" : "ltr";
}

export function getIntlLocale(locale: Locale) {
  return locale === "ar" ? "ar" : "en-US";
}

export function formatNumber(locale: Locale, value: number) {
  return new Intl.NumberFormat(getIntlLocale(locale)).format(value);
}

export function formatDate(
  locale: Locale,
  value: Date | string,
  options?: Intl.DateTimeFormatOptions,
) {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat(getIntlLocale(locale), options).format(date);
}

export function formatTime(
  locale: Locale,
  value: Date | string,
  options?: Intl.DateTimeFormatOptions,
) {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat(getIntlLocale(locale), {
    hour: "2-digit",
    minute: "2-digit",
    ...options,
  }).format(date);
}

const translations = {
  en: {
    metadata: {
      title: "Find Any Image - Find and save high-quality images",
      description: "Search millions of royalty-free images for your projects with Find Any Image.",
    },
    common: {
      brand: "Find Any Image",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      allRightsReserved: (year: number) => `© ${year} Find Any Image. All rights reserved.`,
      language: "Language",
      english: "English",
      arabic: "Arabic",
    },
    navbar: {
      favorites: "Favorites",
      account: "Account",
      logout: "Logout",
      login: "Login",
      register: "Register",
    },
    searchInput: {
      placeholder: "Search for images...",
      submit: "Search",
    },
    home: {
      heroLead: "The world's most powerful",
      heroAccent: "Find Any Image",
      heroDescription:
        "Search millions of high-quality images from the best sources across the web. Save your favorites and access them anywhere.",
      fastSearchTitle: "Fast Search",
      fastSearchDescription:
        "Get high-quality results in milliseconds. We use top-tier APIs to ensure you find exactly what you need.",
      saveFavoritesTitle: "Save Favorites",
      saveFavoritesDescription:
        "Found an image you love? Save it to your account and access it later. We only store the metadata.",
      safeContentTitle: "Safe Content",
      safeContentDescription:
        "All search results are filtered for safety. We ensure that your search experience is always secure.",
      ctaTitle: "Start searching today",
      ctaDescription: "Join thousands of users who find the best images for their projects every day.",
    },
    searchPage: {
      resultsFor: (query: string) => `Results for "${query}"`,
      foundImages: (count: string) => `Found ${count} images from Pixabay`,
      translatedForPixabay: (query: string) => `Translated to English for Pixabay: ${query}`,
      pageStatus: (page: string, total: string) => `Page ${page} of ${total}`,
      previousPage: "Previous",
      nextPage: "Next",
      loading: "Loading search...",
    },
    imageGrid: {
      empty: "No images found. Try a different search term.",
    },
    imageModal: {
      loginRequired: "Please login to save favorites",
      source: "Source",
      visitPage: "Visit Page",
      originalImage: "Original Image",
      removeFromFavorites: "Remove from Favorites",
      saveToFavorites: "Save to Favorites",
    },
    favoritesPage: {
      loading: "Loading your favorites...",
      title: "Your Favorites",
      empty: "You haven't saved any images yet.",
      startSearching: "Start Searching",
    },
    loginPage: {
      title: "Welcome Back",
      invalidCredentials: "Invalid email or password",
      unknownError: "Something went wrong. Please try again.",
      email: "Email",
      password: "Password",
      loading: "Logging in...",
      submit: "Login",
      noAccount: "Don't have an account?",
      registerHere: "Register here",
    },
    registerPage: {
      title: "Create an Account",
      registrationFailed: "Registration failed",
      unknownError: "Something went wrong. Please try again.",
      fullName: "Full Name",
      email: "Email",
      password: "Password",
      loading: "Creating account...",
      submit: "Register",
      haveAccount: "Already have an account?",
      loginHere: "Login here",
    },
    accountPage: {
      loading: "Loading account details...",
      myFavorites: "My Favorites",
      logout: "Logout",
      searchHistory: "Search History",
      emptyHistory: "You haven't searched for anything yet.",
      searchAgain: "Search again",
    },
    privacyPage: {
      title: "Privacy Policy",
      lastUpdated: "Last updated",
      intro: "At Find Any Image, we respect your privacy. This policy explains how we handle your data.",
      sectionOneTitle: "1. Data Collection",
      sectionOneBody:
        "We only store your account information (name, email, and hashed password) and your saved favorites/search history. We do NOT store any image files locally.",
      sectionTwoTitle: "2. External APIs",
      sectionTwoBody: "Image data is fetched from Pixabay. When you search, your query is sent to Pixabay to retrieve results.",
      sectionThreeTitle: "3. Cookies",
      sectionThreeBody:
        "We use cookies to maintain your login session. No tracking cookies are used by us directly, though third-party services like Google Ads may use them.",
    },
    termsPage: {
      title: "Terms of Service",
      lastUpdated: "Last updated",
      sectionOneTitle: "1. Usage",
      sectionOneBody:
        "Find Any Image provides a tool to search and save image metadata. You are responsible for any use of the images you find. Always check the original source for licensing and usage rights.",
      sectionTwoTitle: "2. Content",
      sectionTwoBody:
        "We do not host the images shown in our search results. All images are the property of their respective owners and are provided via Pixabay's API.",
      sectionThreeTitle: "3. Accounts",
      sectionThreeBody:
        "You are responsible for keeping your password secure. We are not liable for any loss resulting from unauthorized access to your account.",
    },
  },
  ar: {
    metadata: {
      title: "ابحث عن أي صورة - ابحث واحفظ صورًا عالية الجودة",
      description: "ابحث في ملايين الصور المجانية لمشاريعك باستخدام موقع ابحث عن أي صورة.",
    },
    common: {
      brand: "ابحث عن أي صورة",
      privacyPolicy: "سياسة الخصوصية",
      termsOfService: "شروط الخدمة",
      allRightsReserved: (year: number) => `© ${year} ابحث عن أي صورة. جميع الحقوق محفوظة.`,
      language: "اللغة",
      english: "English",
      arabic: "العربية",
    },
    navbar: {
      favorites: "المفضلة",
      account: "الحساب",
      logout: "تسجيل الخروج",
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
    },
    searchInput: {
      placeholder: "ابحث عن الصور...",
      submit: "بحث",
    },
    home: {
      heroLead: "أقوى طريقة في العالم لكي",
      heroAccent: "تجد أي صورة",
      heroDescription:
        "ابحث في ملايين الصور عالية الجودة من أفضل المصادر على الويب. احفظ مفضلتك وارجع إليها في أي وقت.",
      fastSearchTitle: "بحث سريع",
      fastSearchDescription:
        "احصل على نتائج عالية الجودة خلال لحظات. نستخدم أفضل الواجهات البرمجية لتصل إلى الصورة التي تريدها بسرعة.",
      saveFavoritesTitle: "احفظ المفضلة",
      saveFavoritesDescription:
        "وجدت صورة أعجبتك؟ احفظها في حسابك وارجع إليها لاحقًا. نحن نحفظ البيانات الوصفية فقط.",
      safeContentTitle: "محتوى آمن",
      safeContentDescription:
        "يتم تصفية جميع نتائج البحث للحفاظ على الأمان. نحرص على أن تبقى تجربة البحث آمنة دائمًا.",
      ctaTitle: "ابدأ البحث اليوم",
      ctaDescription: "انضم إلى آلاف المستخدمين الذين يجدون أفضل الصور لمشاريعهم كل يوم.",
    },
    searchPage: {
      resultsFor: (query: string) => `نتائج البحث عن "${query}"`,
      foundImages: (count: string) => `تم العثور على ${count} صورة من Pixabay`,
      translatedForPixabay: (query: string) => `تمت الترجمة إلى الإنجليزية للبحث في Pixabay: ${query}`,
      pageStatus: (page: string, total: string) => `الصفحة ${page} من ${total}`,
      previousPage: "السابق",
      nextPage: "التالي",
      loading: "جارٍ تحميل نتائج البحث...",
    },
    imageGrid: {
      empty: "لم يتم العثور على صور. جرّب كلمة بحث مختلفة.",
    },
    imageModal: {
      loginRequired: "يرجى تسجيل الدخول لحفظ الصور في المفضلة",
      source: "المصدر",
      visitPage: "زيارة الصفحة",
      originalImage: "الصورة الأصلية",
      removeFromFavorites: "إزالة من المفضلة",
      saveToFavorites: "حفظ في المفضلة",
    },
    favoritesPage: {
      loading: "جارٍ تحميل صورك المفضلة...",
      title: "صورك المفضلة",
      empty: "لم تقم بحفظ أي صور بعد.",
      startSearching: "ابدأ البحث",
    },
    loginPage: {
      title: "مرحبًا بعودتك",
      invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      unknownError: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      loading: "جارٍ تسجيل الدخول...",
      submit: "تسجيل الدخول",
      noAccount: "ليس لديك حساب؟",
      registerHere: "أنشئ حسابًا هنا",
    },
    registerPage: {
      title: "إنشاء حساب",
      registrationFailed: "فشل إنشاء الحساب",
      unknownError: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      loading: "جارٍ إنشاء الحساب...",
      submit: "إنشاء حساب",
      haveAccount: "لديك حساب بالفعل؟",
      loginHere: "سجّل الدخول هنا",
    },
    accountPage: {
      loading: "جارٍ تحميل تفاصيل الحساب...",
      myFavorites: "المفضلة",
      logout: "تسجيل الخروج",
      searchHistory: "سجل البحث",
      emptyHistory: "لم تبحث عن أي شيء بعد.",
      searchAgain: "ابحث مرة أخرى",
    },
    privacyPage: {
      title: "سياسة الخصوصية",
      lastUpdated: "آخر تحديث",
      intro: "في موقع ابحث عن أي صورة، نحن نحترم خصوصيتك. تشرح هذه السياسة كيفية التعامل مع بياناتك.",
      sectionOneTitle: "1. جمع البيانات",
      sectionOneBody:
        "نحن نخزن فقط معلومات حسابك (الاسم والبريد الإلكتروني وكلمة المرور المشفرة) بالإضافة إلى المفضلة وسجل البحث. نحن لا نخزن ملفات الصور محليًا.",
      sectionTwoTitle: "2. الواجهات البرمجية الخارجية",
      sectionTwoBody: "يتم جلب بيانات الصور من Pixabay. عند البحث، يتم إرسال عبارة البحث إلى Pixabay لاسترجاع النتائج.",
      sectionThreeTitle: "3. ملفات تعريف الارتباط",
      sectionThreeBody:
        "نستخدم ملفات تعريف الارتباط للحفاظ على جلسة تسجيل الدخول الخاصة بك. نحن لا نستخدم ملفات تتبع مباشرة، لكن قد تستخدم خدمات خارجية مثل Google Ads هذه الملفات.",
    },
    termsPage: {
      title: "شروط الخدمة",
      lastUpdated: "آخر تحديث",
      sectionOneTitle: "1. الاستخدام",
      sectionOneBody:
        "يوفر موقع ابحث عن أي صورة أداة للبحث عن البيانات الوصفية للصور وحفظها. أنت مسؤول عن أي استخدام للصور التي تجدها. تأكد دائمًا من مراجعة المصدر الأصلي لمعرفة الترخيص وحقوق الاستخدام.",
      sectionTwoTitle: "2. المحتوى",
      sectionTwoBody:
        "نحن لا نستضيف الصور المعروضة في نتائج البحث. جميع الصور ملك لأصحابها ويتم توفيرها عبر واجهة Pixabay البرمجية.",
      sectionThreeTitle: "3. الحسابات",
      sectionThreeBody:
        "أنت مسؤول عن الحفاظ على أمان كلمة المرور الخاصة بك. نحن غير مسؤولين عن أي خسارة تنتج عن وصول غير مصرح به إلى حسابك.",
    },
  },
};

export type Translations = (typeof translations)["en"];

export function getTranslations(locale: Locale): Translations {
  return translations[locale];
}
