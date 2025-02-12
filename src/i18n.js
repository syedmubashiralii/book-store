import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Welcome to Book Store
// Your one stop destination for all your books needs !
// Let's Start
// Login Account
// Welcome back  
// E-mail
// Login
// Register
// Don't have an account?
// Craete Account
// Hope you enjoy the app
// Full Name
// Confirm Password
// Already have an account?
// Please enter both email and password.'
// User does not exist anymore.
// Failed to login. Please try again.
// User not found
// Wrong password
// Invalid email
// Too many requests
// Network request failed
// Internal server error
// Invalid email or password
// Home
// Profile
// Chat
// التصنيفات:
// ١**-** كتب باللغة العربية :
// ◦ كتب مدرسية
// ◦ كتب أطفال
// ◦ كتب دينية
// ◦ كتب علمية
// ◦ كتب أدبية
// ◦ كتب اجتماعية
// ◦ كتب فلسفة
// ◦ كتب تاريخية
// ◦ قصص وروايات
// ◦ كتب مال واقتصاد
// ◦ كتب طبية
// ◦ كتب ادارة اعمال
// ◦ كتب تطوير الذات
// ◦ كتب فن وتصميم
// please enter email
// please enter password


// ٢- كتب باللغة الانجليزية:
const resources = {
    en: {
        translation: {
            welcome: "Welcome to Book Store",
            oneStop: "Your one stop destination for all your books needs !",
            letsStart: "Let's Start",
            login: "Login Account",
            welcomeBack: "Welcome back",
            email: "E-mail",
            password: "Password",
            login: "Login",
            register: "Register",
            dontHaveAccount: "Don't have an account?",
            createAccount: "Create Account",
            hopeYouEnjoy: "Hope you enjoy the app",
            fullName: "Full Name",
            confirmPassword: "Confirm Password",
            alreadyHaveAccount: "Already have an account?",
            pleaseEnterBoth: "Please enter both email and password.",
            userDoesNotExist: "User does not exist anymore.",
            failedToLogin: "Failed to login. Please try again.",
            userNotFound: "User not found",
            wrongPassword: "Wrong password",
            invalidEmail: "Invalid email",
            tooManyRequests: "Too many requests",
            networkRequestFailed: "Network request failed",
            internalServerError: "Internal server error",
            invalidCredential: "Invalid email or password",
            emailAlreadyInUse: "The email address is already in use by another account.",
            weakPassword: "Choose a stronger password.",
            failedToRegister: "Failed to register. Please try again.",
            pleaseFillAllFields: "Please fill all fields",
            passwordsDoNotMatch: "Passwords do not match",
            home: "Home",
            profile: "Profile",
            chat: "Chat",
            language: "Language",
            categories: "Categories",
            arabicBooks: "Arabic Books",
            englishBooks: "English Books",
            schoolBooks: "School Books",
            childrenBooks: "Children Books",
            religiousBooks: "Religious Books",
            scientificBooks: "Scientific Books",
            literaryBooks: "Literary Books",
            socialBooks: "Social Books",
            philosophicalBooks: "Philosophical Books",
            historicalBooks: "Historical Books",
            storiesAndNovels: "Stories and Novels",
            moneyAndEconomyBooks: "Money and Economy Books",
            medicalBooks: "Medical Books",
            businessManagementBooks: "Business Management Books",
            selfDevelopmentBooks: "Self Development Books",
            artAndDesignBooks: "Art and Design Books",
            search: "Search",
            all: "All",
            apply: "Apply",
            thebestChoice: "Best Choice",
            hi: "Hi",
            findYourBook: "Find your book",
            filter: "Filter",
            removeFilter: "Remove Filter",
            reset: "Reset",
            addImage: "Add Image",
            chooseImage: "Choose Image",
            enterBookName: "Enter Book Name",
            description: "Description",
            save: "Save",
            bookName: "Book Name",
            enterEmail: "Please enter a valid email",
            enterPassword: "Please enter a valid password",
            enterFullName: "Please enter your full name",
            enterConfirmPassword: "Please enter a valid confirm password",
            passwordsDoNotMatch: "Passwords do not match",
            failedToUploadProduct: "Failed to upload product. Please try again.",
            noImageSelected: "No image selected",
            noImageUri: "No image uri",
            failedToUploadImage: "Failed to upload image",
            chooseLanguage: "Choose Language",
            chooseCategory: "Choose Category",
            enterDescription: "Enter Description",
            failedToUploadProduct: "Failed to upload product. Please try again.",
            noProducts: "No books found",
            productDetails: "Book details",
            category: "Category",
            chatWithOwner: "Chat with owner",
            logout: "Logout",
            send: "Send",
            typeMessage: "Type a message",
            chat: "Chat",
            chatWith: "Chat with",
            noChats: "No chats",
            addProduct: "Add Book",
            removeProduct: "Remove the Book",
            startChatting: "Start Chatting",
            noMessagesYet: "No messages yet",
            allChats: "All Chats",
            justNow: "Just Now",
            minutesAgo: "minutes ago",
            hoursAgo: "hours ago",
            daysAgo: "days ago",
            "time": {
                "justNow": "Just Now",
                "minute_one": "minute",
                "minute_other": "minutes",
                "hour_one": "hour",
                "hour_other": "hours",
                "day_one": "day",
                "day_other": "days",
                "today": "Today",
                "yesterday": "Yesterday",
                "daysAgo": "{{count}} days ago",
                "at": "at",
            },
            "allMyProducts": "All My Books",
            appName: 'My Book',
            slogan: 'Share a book, give a life',
            gotNewMessage: "You got a new message",
            loginAsGuest: "Login as Guest",
            maxBookPerMonth: "You have reached the maximum number of books you can add per month",
            errorMaxBooksTitle: "Maximum Books Reached",
            understood: "Understood",
            error: "Error",
            donationConfirmation: "Did you donate this book?",
            confirmation: "Confirmation",
            no: "No",
            yes: "Yes",
            cancel: "Cancel",
            continuousCharityThanks: "Thank you for your continuous charity",
            iaccepton: "I accept on",
            termsAndConditions: "Terms and Conditions",
            //  Your terms and conditions content goes here...
            consent: "I consent to the processing of my personal data in accordance with the",
            close: "Close",
            pleaseacceptterms: "Please accept terms and conditions",
        },

    },
    ar: {
        translation: {
            welcome: "مرحبا بك في كتابي لك",
            oneStop: "وجهتك الواحدة لجميع احتياجاتك من الكتب!",
            letsStart: "لنبدأ",
            login: "تسجيل الدخول",
            welcomeBack: "مرحبا بعودتك",
            email: "البريد الإلكتروني",
            password: "كلمه السر",
            login: "تسجيل الدخول",
            register: "تسجيل",
            dontHaveAccount: "ليس لديك حساب؟",
            createAccount: "إنشاء حساب",
            hopeYouEnjoy: "آمل أن تستمتع بالتطبيق",
            fullName: "الاسم الكامل",
            confirmPassword: "تأكيد كلمة المرور",
            alreadyHaveAccount: "هل لديك حساب؟",
            pleaseEnterBoth: "الرجاء إدخال كل من البريد الإلكتروني وكلمة المرور.",
            userDoesNotExist: "المستخدم لم يعد موجودًا.",
            failedToLogin: "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.",
            userNotFound: "المستخدم غير موجود",
            wrongPassword: "كلمة السر خاطئة",
            invalidEmail: "البريد الإلكتروني غير صالح",
            tooManyRequests: "طلبات كثيرة",
            networkRequestFailed: "فشل طلب الشبكة",
            internalServerError: "خطأ داخلي في الخادم",
            invalidCredential: "البريد الإلكتروني أو كلمة المرور غير صالحة",
            emailAlreadyInUse: "عنوان البريد الإلكتروني مستخدم بالفعل من قبل حساب آخر.",
            weakPassword: "اختر كلمة مرور أقوى.",
            failedToRegister: "فشل التسجيل. يرجى المحاولة مرة أخرى.",
            pleaseFillAllFields: "الرجاء ملء جميع الحقول",
            passwordsDoNotMatch: "كلمات المرور غير متطابقة",
            home: "الرئيسية",
            profile: "الملف الشخصي",
            chat: "الدردشة",
            language: "اللغة",
            categories: "التصنيفات",
            arabicBooks: "كتب باللغة العربية",
            englishBooks: "كتب باللغة الانجليزية",
            schoolBooks: "كتب مدرسية",
            childrenBooks: "كتب أطفال",
            religiousBooks: "كتب دينية",
            scientificBooks: "كتب علمية",
            literaryBooks: "كتب أدبية",
            socialBooks: "كتب اجتماعية",
            philosophicalBooks: "كتب فلسفة",
            historicalBooks: "كتب تاريخية",
            storiesAndNovels: "قصص وروايات",
            moneyAndEconomyBooks: "كتب مال واقتصاد",
            medicalBooks: "كتب طبية",
            businessManagementBooks: "كتب ادارة اعمال",
            selfDevelopmentBooks: "كتب تطوير الذات",
            artAndDesignBooks: "كتب فن وتصميم",
            search: "بحث",
            all: "الكل",
            apply: "تطبيق",
            thebestChoice: "الاختيار الأفضل",
            hi: "مرحبا",
            findYourBook: "ابحث عن كتابك",
            filter: "تصفية",
            removeFilter: "إزالة التصفية",
            reset: "إعادة تعيين",
            addImage: "إضافة صورة",
            chooseImage: "اختر صورة",
            enterBookName: "أدخل اسم الكتاب",
            description: "الوصف",
            save: "حفظ",
            bookName: "اسم الكتاب",
            enterEmail: "الرجاء إدخال بريد إلكتروني صالح",
            enterPassword: "الرجاء إدخال كلمة مرور صالحة",
            enterFullName: "الرجاء إدخال اسمك الكامل",
            enterConfirmPassword: "الرجاء إدخال كلمة مرور تأكيد صالحة",
            passwordsDoNotMatch: "كلمات المرور غير متطابقة",
            failedToUploadProduct: "فشل تحميل المنتج. يرجى المحاولة مرة أخرى.",
            noImageSelected: "لم يتم اختيار صورة",
            noImageUri: "لا يوجد رابط صورة",
            failedToUploadImage: "فشل تحميل الصورة",
            chooseLanguage: "اختر اللغة",
            chooseCategory: "اختر الفئة",
            enterDescription: "أدخل الوصف",
            failedToUploadProduct: "فشل تحميل المنتج. يرجى المحاولة مرة أخرى.",
            noProducts: "لم يتم العثور على كتب",
            productDetails: "تفاصيل الكتاب",
            category: "التصنيف",
            chatWithOwner: "الدردشة مع المالك",
            logout: "تسجيل الخروج",
            send: "إرسال",
            typeMessage: "اكتب رسالة",
            chat: "الدردشة",
            chatWith: "الدردشة مع",
            noChats: "لا توجد دردشات",
            addProduct: "إضافة كتاب ",
            removeProduct: "إزالة الكتاب",
            startChatting: "ابدأ الدردشة",
            noMessagesYet: "لا توجد رسائل بعد",
            allChats: "جميع الدردشات",
            justNow: "الآن",
            minutesAgo: "دقائق مضت",
            hoursAgo: "ساعات مضت",
            daysAgo: "أيام مضت",
            "time": {
                "justNow": "الآن",
                "minute_one": "دقيقة",
                "minute_other": "دقائق",
                "hour_one": "ساعة",
                "hour_other": "ساعات",
                "day_one": "يوم",
                "day_other": "أيام",
                "today": "اليوم",
                "yesterday": "أمس",
                "daysAgo": "منذ {days} أيام",
                "at": "في"
            },
            "allMyProducts": "جميع كتبي",
            appName: 'كتابي لك',
            slogan: 'شارك كتاباً، امنح حياة',
            gotNewMessage: "لديك رسالة جديدة",
            loginAsGuest: "تسجيل الدخول كضيف",
            maxBookPerMonth: "لقد وصلت إلى الحد الأقصى لعدد الكتب التي يمكنك إضافتها في الشهر",
            errorMaxBooksTitle: "تم الوصول إلى الحد الأقصى للكتب",
            understood: "فهمت",
            error: "خطأ",
            donationConfirmation: "هل قمت بتبرع بهذا الكتاب؟",
            confirmation: "تأكيد",
            no: "لا",
            yes: "نعم",
            cancel: "إلغاء",
            continuousCharityThanks: "جزاك الله خيرا في مساهمتك بالصدقة الجارية",
            iaccept: "أوافق على",
            termsAndConditions: "الشروط والأحكام",
            //  Your terms and conditions content goes here...
            consent: "أوافق على معالجة بياناتي الشخصية وفقًا لـ",
            close: "إغلاق",
            // [
            //     'الشروط والأحكام لمقدمي الكتب (المتبرعين)',
            //     '1. قبول الشروط من خلال إنشاء حساب على تطبيق [كتابي **لك]**، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق، لا يمكنك استخدام التطبيق.',
            //     '2. الامتثال للقوانين أنت، بصفتك متبرعًا، تتحمل المسؤولية الكاملة عن ضمان أن جميع الكتب التي تقوم بإدراجها تتوافق مع قوانين حقوق النشر وحقوق الملكية الفكرية والقوانين الأخرى ذات الصلة.',
            //     '3. الملكية والحقوق أنت تقر بأن:',
            //     '• لديك حقوق الملكية للكتب التي تتبرع بها، أو',
            //     '• لديك الأذونات اللازمة من أصحاب حقوق النشر لتوزيع هذه الكتب.',
            //     '4. المحتوى المحظور يُحظر عليك تحميل أو التبرع بالكتب التي:',
            //     '• تحتوي على مواد منسوخة أو مسروقة.',
            //     '• تروج لخطاب الكرا هية أو العنف أو الأنشطة غير القانونية أو تنتهك أي قوانين.'
            // ]
            termsAndConditionsText:
                "١. قبول الشروط\n" +
                "من خلال إنشاء حساب على تطبيق [كتابي **لك]**، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق، لا يمكنك استخدام التطبيق.\n" +
                "٢. الامتثال للقوانين\n" +
                "أنت، بصفتك متبرعًا، تتحمل المسؤولية الكاملة عن ضمان أن جميع الكتب التي تقوم بإدراجها تتوافق مع قوانين حقوق النشر وحقوق الملكية الفكرية والقوانين الأخرى ذات الصلة.\n" +
                "٣. الملكية والحقوق\n" +
                "أنت تقر بأن:\n" +
                "• لديك حقوق الملكية للكتب التي تتبرع بها، أو\n" +
                "• لديك الأذونات اللازمة من أصحاب حقوق النشر لتوزيع هذه الكتب.\n" +
                "٤. المحتوى المحظور\n" +
                "يُحظر عليك تحميل أو التبرع بالكتب التي:\n" +
                "• تحتوي على مواد منسوخة أو مسروقة.\n" +
                "• تروج لخطاب الكراهية أو العنف أو الأنشطة غير القانونية أو تنتهك أي قوانين."
            , pleaseacceptterms: "الرجاء قبول الشروط والأحكام"
        },

    },

};

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources,
        lng: 'ar', // Set default language to Arabic
        fallbackLng: 'ar',
        interpolation: {
            escapeValue: false, // React already safes from XSS
        },
    });

export default i18n;
