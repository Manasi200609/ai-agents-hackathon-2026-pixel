import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      auth: {
        tagline: 'AI Healthcare for Rural India',
        login: 'Login / Signup',
        ashaLogin: 'ASHA Login',
        phone: 'Mobile Number',
        enterPhone: 'Enter Mobile Number',
        sendOTP: 'Send OTP',
        sending: 'Sending...',
        verifyOTP: 'Verify OTP',
        verifyingOTP: 'Verifying...',
        otpSent: 'OTP sent to +91',
        enterOTP: 'Enter OTP',
        continue: 'Continue',
        completeProfile: 'Complete Your Profile',
        termsAndPolicy: 'By continuing, you agree to Vaidya Terms & Privacy Policy'
      },
      onboarding: {
        language: 'Preferred Language',
        name: 'Full Name',
        name_placeholder: 'Enter your name',
        gender: 'Gender',
        state: 'State',
        selectState: 'Select State',
        district: 'District',
        enterDistrict: 'Enter District',
        village: 'Village',
        village_placeholder: 'Enter village',
        ashaId: 'ASHA Worker ID',
        enterAshaId: 'Enter ASHA ID',
        validation_error: 'Please fill all fields',
        save_error: 'Failed to save profile',
        continue_btn: 'Continue',
        saving: 'Saving...',
        genders: {
          male: 'Male',
          female: 'Female',
          other: 'Other',
          prefer_not: 'Prefer not to say'
        }
      },
      home: {
        goodMorning: 'Good Morning',
        goodAfternoon: 'Good Afternoon',
        goodEvening: 'Good Evening',
        greetingTitle: 'How are you feeling today?',
        greetingSub: 'Talk freely with Vaidya in any dialect',
        talkToVaidya: 'Talk to Vaidya',
        describeProblem: 'Describe your problem',
        quickSymptoms: 'Quick Symptoms',
        emergencySection: 'Emergency',
        disclaimer: 'Vaidya is not a replacement for a doctor. Please consult a doctor for serious issues.',
        fever: 'Fever',
        feverQuery: 'I have fever',
        headache: 'Headache',
        headacheQuery: 'I have headache',
        nausea: 'Nausea',
        nauseaQuery: 'I feel nauseous',
        cough: 'Cough',
        coughQuery: 'I have cough',
        bodyPain: 'Body Pain',
        bodyPainQuery: 'My body hurts',
        tiredness: 'Tiredness',
        tirednessQuery: 'I feel tired',
        ambulance: 'Ambulance',
        healthHelpline: 'Health Helpline'
      },
      profile: {
        title: 'My Profile',
        subtitle: 'Help Vaidya understand you better',
        name: 'Your Name',
        gender: 'Your Gender',
        state: 'Your State',
        dialect: 'Your Dialect',
        language: 'Preferred Language',
        about: 'About Vaidya',
        aboutText: 'Vaidya is an AI-powered healthcare assistant designed for rural India. It learns regional dialects using Adaptive Data technology.',
        version: 'Version 1.0 · Adaptive Data Powered',
        save: 'Save Profile',
        saved: '✓ Saved Successfully',
        logout: 'Logout'
      },
      nav: {
        home: 'Home',
        chat: 'Chat',
        asha: 'ASHA',
        history: 'History',
        profile: 'Profile'
      },
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success'
      },
      roles: {
        patient: 'Patient',
        ashaWorker: 'ASHA Worker'
      }
    }
  },

  mr: {
    translation: {
      auth: {
        tagline: 'तुमची आरोग्य साथी',
        login: 'लॉगिन / साइनअप',
        ashaLogin: 'ASHA लॉगिन',
        phone: 'मोबाईल नंबर',
        enterPhone: 'मोबाईल नंबर लिहा',
        sendOTP: 'OTP पाठवा',
        sending: 'पाठवत आहे...',
        verifyOTP: 'OTP पडताळा',
        verifyingOTP: 'पडताळत आहे...',
        otpSent: 'OTP पाठवले +91',
        enterOTP: 'OTP लिहा',
        continue: 'पुढे जा',
        completeProfile: 'तुमचे प्रोफाइल पूर्ण करा',
        termsAndPolicy: 'पुढे जाऊन, तुम वैद्या अटी आणि गोपनीयता धोरण मंजूर करता'
      },
      onboarding: {
        language: 'भाषा निवडा',
        name: 'पूर्ण नाव',
        name_placeholder: 'तुमचे नाव लिहा',
        gender: 'लिंग',
        state: 'राज्य',
        selectState: 'राज्य निवडा',
        district: 'जिल्हा',
        enterDistrict: 'जिल्हा लिहा',
        village: 'गाव',
        village_placeholder: 'गावाचे नाव लिहा',
        ashaId: 'ASHA कार्यकर्ता ID',
        enterAshaId: 'ASHA ID लिहा',
        validation_error: 'सर्व माहिती भरा',
        save_error: 'माहिती जतन झाली नाही',
        continue_btn: 'पुढे जा',
        saving: 'जतन होत आहे...',
        genders: {
          male: 'पुरुष',
          female: 'महिला',
          other: 'इतर',
          prefer_not: 'सांगू इच्छित नाही'
        }
      },
      home: {
        goodMorning: 'सुप्रभात',
        goodAfternoon: 'नमस्कार',
        goodEvening: 'शुभ संध्या',
        greetingTitle: 'आज तुम्हाला कसं वाटतंय?',
        greetingSub: 'वैद्याशी कोणत्याही बोलीत मोकळेपणाने बोला',
        talkToVaidya: 'वैद्याशी बोला',
        describeProblem: 'तुमची तक्रार सांगा',
        quickSymptoms: 'त्वरित लक्षणे',
        emergencySection: 'आणीबाणी',
        disclaimer: 'वैद्या हा डॉक्टरचा पर्याय नाही. गंभीर त्रासासाठी डॉक्टरांचा सल्ला घ्या.',
        fever: 'ताप',
        feverQuery: 'मला ताप आलाय',
        headache: 'डोकेदुखी',
        headacheQuery: 'माझं डोकं दुखतंय',
        nausea: 'मळमळ',
        nauseaQuery: 'मला मळमळ होत आहे',
        cough: 'खोकला',
        coughQuery: 'मला खोकला येतोय',
        bodyPain: 'अंगदुखी',
        bodyPainQuery: 'माझं अंग दुखतंय',
        tiredness: 'थकवा',
        tirednessQuery: 'मला खूप थकल्यासारखं वाटतंय',
        ambulance: 'रुग्णवाहिका',
        healthHelpline: 'आरोग्य हेल्पलाइन'
      },
      profile: {
        title: 'माझी माहिती',
        subtitle: 'वैद्याला तुम्हाला चांगल्याप्रकारे ओळखेल',
        name: 'तुमचे नाव',
        gender: 'तुमचे लिंग',
        state: 'तुमचे राज्य',
        dialect: 'तुमची बोली',
        language: 'भाषा',
        about: 'वैद्य्याबद्दल',
        aboutText: 'वैद्या हे एक AI-आधारित आरोग्य सहाय्यक आहे जे ग्रामीण भारतासाठी बनवले आहे. हे Adaptive Data तंत्रज्ञान वापरून तुमच्या बोलीतील शब्द शिकते.',
        version: 'Version 1.0 · Adaptive Data Powered',
        save: 'प्रोफाइल जतन करा',
        saved: '✓ यशस्वीरित्या जतन झाले',
        logout: 'लॉगआउट करा'
      },
      nav: {
        home: 'मुखपृष्ठ',
        chat: 'चॅट',
        asha: 'ASHA',
        history: 'इतिहास',
        profile: 'प्रोफाइल'
      },
      common: {
        loading: 'लोड होत आहे...',
        error: 'त्रुटी',
        success: 'यश'
      },
      roles: {
        patient: 'रोगी',
        ashaWorker: 'ASHA कार्यकर्ता'
      }
    }
  },

  hi: {
    translation: {
      auth: {
        tagline: 'वैद्य - ग्रामीण भारत के लिए AI स्वास्थ्य सहायक',
        login: 'लॉगिन / साइन अप करें',
        ashaLogin: 'ASHA लॉगिन',
        phone: 'मोबाइल नंबर',
        enterPhone: 'मोबाइल नंबर दर्ज करें',
        sendOTP: 'OTP भेजें',
        sending: 'भेज रहे हैं...',
        verifyOTP: 'OTP सत्यापित करें',
        verifyingOTP: 'सत्यापन किया जा रहा है...',
        otpSent: 'OTP भेजा गया +91',
        enterOTP: 'OTP दर्ज करें',
        continue: 'आगे बढ़ें',
        completeProfile: 'अपनी प्रोफाइल पूरी करें',
        termsAndPolicy: 'आगे बढ़कर, आप वैद्य की शर्तों और गोपनीयता नीति से सहमत हैं'
      },
      onboarding: {
        language: 'भाषा चुनें',
        name: 'पूरा नाम',
        name_placeholder: 'अपना नाम दर्ज करें',
        gender: 'लिंग',
        state: 'राज्य',
        selectState: 'राज्य चुनें',
        district: 'जिला',
        enterDistrict: 'जिला दर्ज करें',
        village: 'गांव',
        village_placeholder: 'गांव का नाम दर्ज करें',
        ashaId: 'ASHA कार्यकर्ता ID',
        enterAshaId: 'ASHA ID दर्ज करें',
        validation_error: 'कृपया सभी फील्ड भरें',
        save_error: 'प्रोफाइल सहेजने में विफल',
        continue_btn: 'आगे बढ़ें',
        saving: 'सहेज रहे हैं...',
        genders: {
          male: 'पुरुष',
          female: 'महिला',
          other: 'अन्य',
          prefer_not: 'नहीं कहना चाहते'
        }
      },
      home: {
        goodMorning: 'सुप्रभात',
        goodAfternoon: 'नमस्कार',
        goodEvening: 'शुभ संध्या',
        greetingTitle: 'आज आपको कैसा लग रहा है?',
        greetingSub: 'वैद्य से किसी भी बोली में खुलकर बात करें',
        talkToVaidya: 'वैद्य से बात करें',
        describeProblem: 'अपनी समस्या बताएं',
        quickSymptoms: 'त्वरित लक्षण',
        emergencySection: 'आपातकाल',
        disclaimer: 'वैद्य डॉक्टर का विकल्प नहीं है। गंभीर समस्या होने पर डॉक्टर से सलाह लें।',
        fever: 'बुखार',
        feverQuery: 'मुझे बुखार है',
        headache: 'सिरदर्द',
        headacheQuery: 'मेरा सिर दर्द कर रहा है',
        nausea: 'मतली',
        nauseaQuery: 'मुझे मतली हो रही है',
        cough: 'खांसी',
        coughQuery: 'मुझे खांसी आ रही है',
        bodyPain: 'शरीर दर्द',
        bodyPainQuery: 'मेरा शरीर दर्द कर रहा है',
        tiredness: 'थकान',
        tirednessQuery: 'मुझे बहुत थकान महसूस हो रही है',
        ambulance: 'एम्बुलेंस',
        healthHelpline: 'स्वास्थ्य हेल्पलाइन'
      },
      profile: {
        title: 'मेरी प्रोफाइल',
        subtitle: 'वैद्य को आपको बेहतर समझने में मदद करें',
        name: 'आपका नाम',
        gender: 'आपका लिंग',
        state: 'आपका राज्य',
        dialect: 'आपकी बोली',
        language: 'भाषा',
        about: 'वैद्य के बारे में',
        aboutText: 'वैद्य ग्रामीण भारत के लिए डिज़ाइन किया गया एक AI-संचालित स्वास्थ्य सहायक है। यह Adaptive Data तकनीक का उपयोग करके आपकी बोली सीखता है।',
        version: 'Version 1.0 · Adaptive Data Powered',
        save: 'प्रोफाइल सहेजें',
        saved: '✓ सफलतापूर्वक सहेजा गया',
        logout: 'लॉगआउट करें'
      },
      nav: {
        home: 'होम',
        chat: 'चैट',
        asha: 'ASHA',
        history: 'इतिहास',
        profile: 'प्रोफाइल'
      },
      common: {
        loading: 'लोड हो रहा है...',
        error: 'त्रुटि',
        success: 'सफलता'
      },
      roles: {
        patient: 'रोगी',
        ashaWorker: 'ASHA कार्यकर्ता'
      }
    }
  },

  bn: {
    translation: {
      auth: {
        tagline: 'গ্রামীণ ভারতের জন্য AI স্বাস্থ্যসেবা',
        login: 'লগইন / সাইন আপ করুন',
        ashaLogin: 'ASHA লগইন',
        phone: 'মোবাইল নম্বর',
        enterPhone: 'মোবাইল নম্বর প্রবেश করুন',
        sendOTP: 'OTP পাঠান',
        sending: 'পাঠাচ্ছি...',
        verifyOTP: 'OTP যাচাই করুন',
        verifyingOTP: 'যাচাই করা হচ্ছে...',
        otpSent: 'OTP পাঠানো হয়েছে +91',
        enterOTP: 'OTP প্রবেश করুন',
        continue: 'চালিয়ে যান',
        completeProfile: 'আপনার প্রোফাইল সম্পূর্ণ করুন',
        termsAndPolicy: 'চালিয়ে যাওয়ার মাধ্যমে, আপনি বৈদ্য শর্তাবলী এবং গোপনীয়তা নীতি সম্মত হন'
      },
      onboarding: {
        language: 'পছন্দের ভাষা',
        name: 'সম্পূর্ণ নাম',
        name_placeholder: 'আপনার নাম প্রবেश করুন',
        gender: 'লিঙ্গ',
        state: 'রাজ্য',
        selectState: 'রাজ্য নির্বাচন করুন',
        district: 'জেলা',
        enterDistrict: 'জেলা প্রবেश করুন',
        village: 'গ্রাম',
        village_placeholder: 'গ্রাম প্রবেश করুন',
        ashaId: 'ASHA কর্মচারী ID',
        enterAshaId: 'ASHA ID প্রবেশ করুন',
        validation_error: 'অনুগ্রহ করে সমস্ত ক্ষেত্র পূরণ করুন',
        save_error: 'প্রোফাইল সংরক্ষণ ব্যর্থ হয়েছে',
        continue_btn: 'চালিয়ে যান',
        saving: 'সংরক্ষণ করা হচ্ছে...',
        genders: {
          male: 'পুরুষ',
          female: 'মহিলা',
          other: 'অন্যান্য',
          prefer_not: 'বলতে পছন্দ করি না'
        }
      },
      home: {
        goodMorning: 'সুপ্রভাত',
        goodAfternoon: 'নমস্কার',
        goodEvening: 'শুভ সন্ধ্যা',
        greetingTitle: 'আজ আপনার কেমন লাগছে?',
        greetingSub: 'যেকোনো উপভাষায় বৈদ্যের সাথে খোলামেলা কথা বলুন',
        talkToVaidya: 'বৈদ্যের সাথে কথা বলুন',
        describeProblem: 'আপনার সমস্যা বলুন',
        quickSymptoms: 'দ্রুত লক্ষণ',
        emergencySection: 'জরুরি অবস্থা',
        disclaimer: 'বৈদ্য ডাক্তারদের বিকল্প নয়। গুরুতর সমস্যায় অবশ্যই ডাক্তারের পরামর্শ নিন।',
        fever: 'জ্বর',
        feverQuery: 'আমার জ্বর হয়েছে',
        headache: 'মাথাব্যথা',
        headacheQuery: 'আমার মাথা ব্যথা করছে',
        nausea: 'বমি বমি ভাব',
        nauseaQuery: 'আমার বমি বমি লাগছে',
        cough: 'কাশি',
        coughQuery: 'আমার কাশি হচ্ছে',
        bodyPain: 'শরীর ব্যথা',
        bodyPainQuery: 'আমার শরীর ব্যথা করছে',
        tiredness: 'ক্লান্তি',
        tirednessQuery: 'আমার খুব ক্লান্ত লাগছে',
        ambulance: 'অ্যাম্বুলেন্স',
        healthHelpline: 'স্বাস্থ্য হেল্পলাইন'
      },
      profile: {
        title: 'আমার প্রোফাইল',
        subtitle: 'বৈদ্যকে আপনাকে আরও ভালভাবে বুঝতে সাহায্য করুন',
        name: 'আপনার নাম',
        gender: 'আপনার লিঙ্গ',
        state: 'আপনার রাজ্য',
        dialect: 'আপনার উপভাষা',
        language: 'ভাষা',
        about: 'বৈদ্য সম্পর্কে',
        aboutText: 'বৈদ্য গ্রামীণ ভারতের জন্য ডিজাইন করা একটি AI-চালিত স্বাস্থ্য সহায়ক। এটি Adaptive Data প্রযুক্তি ব্যবহার করে আপনার উপভাষা শেখে।',
        version: 'Version 1.0 · Adaptive Data Powered',
        save: 'প্রোফাইল সংরক্ষণ করুন',
        saved: '✓ সফলভাবে সংরক্ষিত হয়েছে',
        logout: 'লগআউট করুন'
      },
      nav: {
        home: 'হোম',
        chat: 'চ্যাট',
        asha: 'ASHA',
        history: 'ইতিহাস',
        profile: 'প্রোফাইল'
      },
      common: {
        loading: 'লোড হচ্ছে...',
        error: 'ত্রুটি',
        success: 'সাফল্য'
      },
      roles: {
        patient: 'রোগী',
        ashaWorker: 'ASHA কর্মচারী'
      }
    }
  },

  ta: {
    translation: {
      auth: {
        tagline: 'கிராமப்புற இந்தியாவுக்கான AI சுகாதாரம்',
        login: 'உள்நுழைக / பதிவு செய்க',
        ashaLogin: 'ASHA உள்நுழைக',
        phone: 'மொபைல் எண்',
        enterPhone: 'மொபைல் எண் உள்ளிடவும்',
        sendOTP: 'OTP அனுப்பவும்',
        sending: 'அனுப்புகிறது...',
        verifyOTP: 'OTP சரிபார்க்கவும்',
        verifyingOTP: 'சரிபார்ப்பு செய்யப்படுகிறது...',
        otpSent: 'OTP அனுப்பப்பட்டது +91',
        enterOTP: 'OTP உள்ளிடவும்',
        continue: 'தொடரவும்',
        completeProfile: 'உங்கள் சுயவிவரத்தை முடிக்கவும்',
        termsAndPolicy: 'தொடர்ந்து, நீங்கள் வைத்தியர் விதிமுறைகள் மற்றும் தனியுரிமைக் கொள்கையை ஒப்புக்கொள்கிறீர்கள்'
      },
      onboarding: {
        language: 'விரும்பிய மொழி',
        name: 'முழு பெயர்',
        name_placeholder: 'உங்கள் பெயரை உள்ளிடவும்',
        gender: 'பாலினம்',
        state: 'மாநிலம்',
        selectState: 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்',
        district: 'மாவட்டம்',
        enterDistrict: 'மாவட்டத்தை உள்ளிடவும்',
        village: 'கிராமம்',
        village_placeholder: 'கிராமத்தை உள்ளிடவும்',
        ashaId: 'ASHA பணிக்காரர் ID',
        enterAshaId: 'ASHA ID உள்ளிடவும்',
        validation_error: 'அனைத்து புலங்களையும் நிரப்பவும்',
        save_error: 'சுயவிவரத்தைச் சேமிக்க முடியவில்லை',
        continue_btn: 'தொடரவும்',
        saving: 'சேமிக்கிறது...',
        genders: {
          male: 'ஆண்',
          female: 'பெண்',
          other: 'மற்றவை',
          prefer_not: 'சொல்ல விரும்பவில்லை'
        }
      },
      home: {
        goodMorning: 'காலை வணக்கம்',
        goodAfternoon: 'வணக்கம்',
        goodEvening: 'மாலை வணக்கம்',
        greetingTitle: 'இன்று உங்களுக்கு எப்படி உணரப்படுகிறது?',
        greetingSub: 'எந்த மொழியிலும் வைத்தியருடன் சுதந்திரமாக பேசுங்கள்',
        talkToVaidya: 'வைத்தியருடன் பேசுங்கள்',
        describeProblem: 'உங்கள் பிரச்சினையை சொல்லுங்கள்',
        quickSymptoms: 'விரைவு அறிகுறிகள்',
        emergencySection: 'அவசரநிலை',
        disclaimer: 'வைத்தியர் மருத்துவருக்கு மாற்றாக இல்லை. கடுமையான பிரச்சினைக்கு மருத்துவரை அணுகவும்.',
        fever: 'காய்ச்சல்',
        feverQuery: 'எனக்கு காய்ச்சல் உள்ளது',
        headache: 'தலைவலி',
        headacheQuery: 'எனக்கு தலை வலி உள்ளது',
        nausea: 'வாந்தி உணர்வு',
        nauseaQuery: 'எனக்கு வாந்தி போல் உள்ளது',
        cough: 'இருமல்',
        coughQuery: 'எனக்கு இருமல் வருகிறது',
        bodyPain: 'உடல் வலி',
        bodyPainQuery: 'என் உடல் வலிக்கிறது',
        tiredness: 'சோர்வு',
        tirednessQuery: 'எனக்கு மிகவும் சோர்வாக உள்ளது',
        ambulance: 'ஆம்புலன்ஸ்',
        healthHelpline: 'சுகாதார உதவி எண்'
      },
      profile: {
        title: 'என் சுயவிவரம்',
        subtitle: 'வைத்தியர் உங்களை நன்றாக புரிந்துகொள்ள உதவ',
        name: 'உங்கள் பெயர்',
        gender: 'உங்கள் பாலினம்',
        state: 'உங்கள் மாநிலம்',
        dialect: 'உங்கள் மொழி',
        language: 'மொழி',
        about: 'வைத்தியர் பற்றி',
        aboutText: 'வைத்தியர் கிராமப்புற இந்தியாவுக்கான ஒரு AI-இயக்கப்படும் சுகாதாரம் உதவியாளர்। இது Adaptive Data தொழில்நுட்பத்தைப் பயன்படுத்தி உங்கள் மொழியைக் கற்கிறது.',
        version: 'Version 1.0 · Adaptive Data Powered',
        save: 'சுயவிவரத்தைச் சேமிக்கவும்',
        saved: '✓ வெற்றிகரமாக சேமிக்கப்பட்டது',
        logout: 'வெளியேறவும்'
      },
      nav: {
        home: 'வீடு',
        chat: 'சேட்',
        asha: 'ASHA',
        history: 'வரலாறு',
        profile: 'சுயவிவரம்'
      },
      common: {
        loading: 'ஏற்றுகிறது...',
        error: 'பிழை',
        success: 'வெற்றி'
      },
      roles: {
        patient: 'நோயாளி',
        ashaWorker: 'ASHA பணிக்காரர்'
      }
    }
  },

  te: {
    translation: {
      auth: {
        tagline: 'గ్రామీణ భారతదేశానికి AI ఆరోగ్యసేవ',
        login: 'లాగిన్ / సైన్ అప్',
        ashaLogin: 'ASHA లాగిన్',
        phone: 'మొబైల్ నంబర్',
        enterPhone: 'మొబైల్ నంబర్ నమోదు చేయండి',
        sendOTP: 'OTP పంపండి',
        sending: 'పంపిస్తోంది...',
        verifyOTP: 'OTP ధృవీకరించండి',
        verifyingOTP: 'ధృవీకరిస్తోంది...',
        otpSent: 'OTP పంపాం +91',
        enterOTP: 'OTP నమోదు చేయండి',
        continue: 'కొనసాగించండి',
        completeProfile: 'మీ ప్రొఫైల్ పూర్తి చేయండి',
        termsAndPolicy: 'కొనసాగించడం ద్వారా, మీరు వైద్య నిబంధనలు మరియు గోప్యతా విధానకు సంమతి ఇస్తారు'
      },
      onboarding: {
        language: 'ఆధారపడిన భాష',
        name: 'పూర్ణ నామం',
        name_placeholder: 'మీ పేరు నమోదు చేయండి',
        gender: 'లింగం',
        state: 'రాష్ట్రం',
        selectState: 'రాష్ట్రం ఎంచుకోండి',
        district: 'జిల్లా',
        enterDistrict: 'జిల్లా నమోదు చేయండి',
        village: 'గ్రామం',
        village_placeholder: 'గ్రామం నమోదు చేయండి',
        ashaId: 'ASHA కార్మిక ID',
        enterAshaId: 'ASHA ID నమోదు చేయండి',
        validation_error: 'దయచేసి అన్ని ఫీల్డ్‌లను పూరించండి',
        save_error: 'ప్రొఫైల్ సేవ్ చేయడం విఫలమైంది',
        continue_btn: 'కొనసాగించండి',
        saving: 'సేవ్ చేస్తోంది...',
        genders: {
          male: 'పురుషుడు',
          female: 'స్త్రీ',
          other: 'ఇతర',
          prefer_not: 'చెప్పడానికి ఇష్టం లేదు'
        }
      },
      home: {
        goodMorning: 'శుభోదయం',
        goodAfternoon: 'నమస్కారం',
        goodEvening: 'శుభ సాయంత్రం',
        greetingTitle: 'ఈ రోజు మీకు ఎలా అనిపిస్తోంది?',
        greetingSub: 'ఏ భాషలోనైనా వైద్యుడితో స్వేచ్ఛగా మాట్లాడండి',
        talkToVaidya: 'వైద్యుడితో మాట్లాడండి',
        describeProblem: 'మీ సమస్య చెప్పండి',
        quickSymptoms: 'త్వరిత లక్షణాలు',
        emergencySection: 'అత్యవసర పరిస్థితి',
        disclaimer: 'వైద్యుడు డాక్టర్‌కు ప్రత్యామ్నాయం కాదు. తీవ్రమైన సమస్యల కోసం డాక్టర్‌ను సంప్రదించండి.',
        fever: 'జ్వరం',
        feverQuery: 'నాకు జ్వరం వచ్చింది',
        headache: 'తలనొప్పి',
        headacheQuery: 'నాకు తలనొప్పి ఉంది',
        nausea: 'వికారం',
        nauseaQuery: 'నాకు వికారం వస్తోంది',
        cough: 'దగ్గు',
        coughQuery: 'నాకు దగ్గు వస్తోంది',
        bodyPain: 'శరీర నొప్పి',
        bodyPainQuery: 'నా శరీరం నొప్పిగా ఉంది',
        tiredness: 'అలసట',
        tirednessQuery: 'నాకు చాలా అలసటగా ఉంది',
        ambulance: 'అంబులెన్స్',
        healthHelpline: 'ఆరోగ్య హెల్ప్‌లైన్'
      },
      profile: {
        title: 'నా ప్రొఫైల్',
        subtitle: 'వైద్యుడు మిమ్మల్ని బాగా అర్థం చేసుకోవడానికి సహాయ చేయండి',
        name: 'మీ పేరు',
        gender: 'మీ లింగం',
        state: 'మీ రాష్ట్రం',
        dialect: 'మీ బోლిక',
        language: 'భాష',
        about: 'వైద్య గురించి',
        aboutText: 'వైద్యుడు గ్రామీణ భారతదేశానికి ఆకృతీకరించిన AI-శక్తిచేసిన ఆరోగ్యసేవ సహాయకుడు. ఇది Adaptive Data సాంకేతికతను ఉపయోగించి మీ భాషను నేర్చుకుంటుంది.',
        version: 'Version 1.0 · Adaptive Data Powered',
        save: 'ప్రొఫైల్‌ను సేవ్ చేయండి',
        saved: '✓ విజయవంతంగా సేవ్ చేయబడింది',
        logout: 'లాగ్ అవుట్ చేయండి'
      },
      nav: {
        home: 'ఇల్లు',
        chat: 'చాట్',
        asha: 'ASHA',
        history: 'చరిత్ర',
        profile: 'ప్రొఫైల్'
      },
      common: {
        loading: 'లోడ్ చేస్తోంది...',
        error: 'లోపం',
        success: 'విజయం'
      },
      roles: {
        patient: 'రోగి',
        ashaWorker: 'ASHA కార్మిక'
      }
    }
  },

  kn: {
    translation: {
      auth: {
        tagline: 'ಗ್ರಾಮೀಣ ಭಾರತಕ್ಕಾಗಿ AI ಸ್ವಾಸ್ಥ್ಯ',
        login: 'ಲಾಗಿನ್ / ಸೈನ್ ಅಪ್',
        ashaLogin: 'ASHA ಲಾಗಿನ್',
        phone: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
        enterPhone: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ',
        sendOTP: 'OTP ಕಳುಹಿಸಿ',
        sending: 'ಕಳುಹಿಸುತ್ತಿದೆ...',
        verifyOTP: 'OTP ಗಾತ್ರತೆ ಪರೀಕ್ಷಿಸಿ',
        verifyingOTP: 'ಪರೀಕ್ಷಿಸುತ್ತಿದೆ...',
        otpSent: 'OTP ಕಳುಹಿಸಲಾಗಿದೆ +91',
        enterOTP: 'OTP ನಮೂದಿಸಿ',
        continue: 'ಮುಂದುವರಿಯಿರಿ',
        completeProfile: 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಪೂರ್ಣ ಮಾಡಿ',
        termsAndPolicy: 'ಮುಂದುವರಿಯುವ ಮೂಲಕ, ನೀವು ವೈದ್ಯ ನಿಯಮಗಳು ಮತ್ತು ಗೌಪ್ಯತೆ ನೀತಿಗೆ ಸಹಮತಿ ನೀಡುತ್ತೀರಿ'
      },
      onboarding: {
        language: 'ಆದ್ಯತೆಯ ಭಾಷೆ',
        name: 'ಪೂರ್ಣ ಹೆಸರು',
        name_placeholder: 'ನಿಮ್ಮ ಹೆಸರು ನಮೂದಿಸಿ',
        gender: 'ಲಿಂಗ',
        state: 'ರಾಜ್ಯ',
        selectState: 'ರಾಜ್ಯ ಆರಿಸಿ',
        district: 'ಜಿಲ್ಲೆ',
        enterDistrict: 'ಜಿಲ್ಲೆ ನಮೂದಿಸಿ',
        village: 'ಹಳ್ಳಿ',
        village_placeholder: 'ಹಳ್ಳಿ ನಮೂದಿಸಿ',
        ashaId: 'ASHA ಕಾರ್ಮಿಕ ID',
        enterAshaId: 'ASHA ID ನಮೂದಿಸಿ',
        validation_error: 'ದಯವಿಟ್ಟು ಎಲ್ಲ ಕ್ಷೇತ್ರ ತುಂಬಿಸಿ',
        save_error: 'ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸುವುದು ವಿಫಲವಾಗಿದೆ',
        continue_btn: 'ಮುಂದುವರಿಯಿರಿ',
        saving: 'ಉಳಿಸುತ್ತಿದೆ...',
        genders: {
          male: 'ಪುರುಷ',
          female: 'ಮಹಿಳೆ',
          other: 'ಇತರೆ',
          prefer_not: 'ಹೇಳಲು ಬಯಸುವುದಿಲ್ಲ'
        }
      },
      home: {
        goodMorning: 'ಶುಭೋದಯ',
        goodAfternoon: 'ನಮಸ್ಕಾರ',
        goodEvening: 'ಶುಭ ಸಂಜೆ',
        greetingTitle: 'ಇಂದು ನಿಮಗೆ ಹೇಗಿದೆ?',
        greetingSub: 'ಯಾವುದೇ ಭಾಷೆಯಲ್ಲಿ ವೈದ್ಯರೊಂದಿಗೆ ಮುಕ್ತವಾಗಿ ಮಾತನಾಡಿ',
        talkToVaidya: 'ವೈದ್ಯರೊಂದಿಗೆ ಮಾತನಾಡಿ',
        describeProblem: 'ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ತಿಳಿಸಿ',
        quickSymptoms: 'ತ್ವರಿತ ಲಕ್ಷಣಗಳು',
        emergencySection: 'ತುರ್ತು ಪರಿಸ್ಥಿತಿ',
        disclaimer: 'ವೈದ್ಯರು ಡಾಕ್ಟರ್‌ಗೆ ಪರ್ಯಾಯವಲ್ಲ. ಗಂಭೀರ ಸಮಸ್ಯೆಗೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
        fever: 'ಜ್ವರ',
        feverQuery: 'ನನಗೆ ಜ್ವರ ಬಂದಿದೆ',
        headache: 'ತಲೆನೋವು',
        headacheQuery: 'ನನಗೆ ತಲೆನೋವು ಇದೆ',
        nausea: 'ಓಕರಿ ಭಾವನೆ',
        nauseaQuery: 'ನನಗೆ ಓಕರಿ ಬರುತ್ತಿದೆ',
        cough: 'ಕೆಮ್ಮು',
        coughQuery: 'ನನಗೆ ಕೆಮ್ಮು ಬರುತ್ತಿದೆ',
        bodyPain: 'ದೇಹ ನೋವು',
        bodyPainQuery: 'ನನ್ನ ದೇಹ ನೋವುಂಟಾಗಿದೆ',
        tiredness: 'ದಣಿವು',
        tirednessQuery: 'ನನಗೆ ತುಂಬಾ ದಣಿವಾಗಿದೆ',
        ambulance: 'ಆಂಬುಲೆನ್ಸ್',
        healthHelpline: 'ಆರೋಗ್ಯ ಸಹಾಯವಾಣಿ'
      },
      profile: {
        title: 'ನನ್ನ ಪ್ರೊಫೈಲ್',
        subtitle: 'ವೈದ್ಯರು ನಿಮ್ಮನ್ನು ಚೆನ್ನಾಗಿ ಅರ್ಥ ಮಾಡಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡಿ',
        name: 'ನಿಮ್ಮ ಹೆಸರು',
        gender: 'ನಿಮ್ಮ ಲಿಂಗ',
        state: 'ನಿಮ್ಮ ರಾಜ್ಯ',
        dialect: 'ನಿಮ್ಮ ಬೋಲಿ',
        language: 'ಭಾಷೆ',
        about: 'ವೈದ್ಯ ಬಗ್ಗೆ',
        aboutText: 'ವೈದ್ಯರು ಗ್ರಾಮೀಣ ಭಾರತಕ್ಕಾಗಿ ಡಿಜೈನ್ ಮಾಡಿದ ಒಂದು AI-ಚಾಲಿತ ಸ್ವಾಸ್ಥ್ಯ ಸಹಾಯಕ. ಇದು Adaptive Data ತಂತ್ರಜ್ಞಾನವನ್ನು ಬಳಸಿ ನಿಮ್ಮ ಬೋಲಿ ಕಲಿತುಕೊಂಡಿದೆ.',
        version: 'Version 1.0 · Adaptive Data Powered',
        save: 'ಪ್ರೊಫೈಲ್ ಉಳಿಸಿ',
        saved: '✓ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ',
        logout: 'ಲಾಗ್ ಔಟ್ ಮಾಡಿ'
      },
      nav: {
        home: 'ಮನೆ',
        chat: 'ಚ್ಯಾಟ್',
        asha: 'ASHA',
        history: 'ಇತಿಹಾಸ',
        profile: 'ಪ್ರೊಫೈಲ್'
      },
      common: {
        loading: 'ಲೋಡ್ ಮಾಡುತ್ತಿದೆ...',
        error: 'ದೋಷ',
        success: 'ಯಶಸ್ಸು'
      },
      roles: {
        patient: 'ರೋಗಿ',
        ashaWorker: 'ASHA ಕಾರ್ಮಿಕ'
      }
    }
  },

  ml: {
    translation: {
      auth: {
        tagline: 'ഗ്രാമീണ ഇന്ത്യയ്ക്കുള്ള AI ആരോഗ്യം',
        login: 'ലോഗിൻ / സൈൻ അപ്പ്',
        ashaLogin: 'ASHA ലോഗിൻ',
        phone: 'മൊബൈൽ നമ്പർ',
        enterPhone: 'മൊബൈൽ നമ്പർ നൽകുക',
        sendOTP: 'OTP അയയ്‌ക്കുക',
        sending: 'അയയ്‌ക്കുകയാണ്...',
        verifyOTP: 'OTP സ്ഥിരീകരിക്കുക',
        verifyingOTP: 'സ്ഥിരീകരിക്കുന്നു...',
        otpSent: 'OTP അയച്ചിരിക്കുന്നു +91',
        enterOTP: 'OTP നൽകുക',
        continue: 'തുടരുക',
        completeProfile: 'നിങ്ങളുടെ പ്രൊഫൈൽ പൂർത്തിയാക്കുക',
        termsAndPolicy: 'തുടരുന്നതിലൂടെ, നിങ്ങൾ വൈദ്യ വ്യവസ്ഥകളും സ്വകാര്യതാ നയവും അംഗീകരിക്കുന്നു'
      },
      onboarding: {
        language: 'ആദ്യ ഭാഷ',
        name: 'പൂർണ നാമം',
        name_placeholder: 'നിങ്ങളുടെ പേരെ നൽകുക',
        gender: 'ജെൻഡർ',
        state: 'സംസ്ഥാനം',
        selectState: 'സംസ്ഥാനം തിരഞ്ഞെടുക്കുക',
        district: 'ജില്ല',
        enterDistrict: 'ജില്ല നൽകുക',
        village: 'ഗ്രാമം',
        village_placeholder: 'ഗ്രാമം നൽകുക',
        ashaId: 'ASHA പ്രവർത്തക ID',
        enterAshaId: 'ASHA ID നൽകുക',
        validation_error: 'കൃപയാ എല്ലാ ഫീൽഡ് പൂരിപ്പിക്കുക',
        save_error: 'പ്രൊഫൈൽ സേവ് ചെയ്യുന്നത് പരാജയപ്പെട്ടു',
        continue_btn: 'തുടരുക',
        saving: 'സേവ് ചെയ്യുന്നു...',
        genders: {
          male: 'പുരുഷൻ',
          female: 'സ്ത്രീ',
          other: 'മറ്റ്',
          prefer_not: 'പറയാൻ ഇഷ്ടപ്പെടുന്നില്ല'
        }
      },
      home: {
        goodMorning: 'സുപ്രഭാതം',
        goodAfternoon: 'നമസ്കാരം',
        goodEvening: 'ശുഭ സായാഹ്നം',
        greetingTitle: 'ഇന്ന് നിങ്ങള്‍ക്ക് എങ്ങനെ തോന്നുന്നു?',
        greetingSub: 'ഏത് ഭാഷയിലും വൈദ്യനുമായി സ്വതന്ത്രമായി സംസാരിക്കുക',
        talkToVaidya: 'വൈദ്യനോട് സംസാരിക്കുക',
        describeProblem: 'നിങ്ങളുടെ പ്രശ്നം പറയുക',
        quickSymptoms: 'വേഗത്തിലുള്ള ലക്ഷണങ്ങൾ',
        emergencySection: 'അടിയന്തരാവസ്ഥ',
        disclaimer: 'വൈദ്യൻ ഡോക്ടറുടെ പകരക്കാരൻ അല്ല. ഗുരുതര പ്രശ്നങ്ങൾക്ക് ഡോക്ടറെ സമീപിക്കുക.',
        fever: 'ജ്വരം',
        feverQuery: 'എനിക്ക് ജ്വരം ഉണ്ട്',
        headache: 'തലവേദന',
        headacheQuery: 'എനിക്ക് തലവേദനയുണ്ട്',
        nausea: 'മലര്‍ച്ച',
        nauseaQuery: 'എനിക്ക് മലര്‍ച്ചയുണ്ട്',
        cough: 'ചുമ',
        coughQuery: 'എനിക്ക് ചുമയുണ്ട്',
        bodyPain: 'ശരീരവേദന',
        bodyPainQuery: 'എന്റെ ശരീരം വേദനിക്കുന്നു',
        tiredness: 'ക്ഷീണം',
        tirednessQuery: 'എനിക്ക് വളരെ ക്ഷീണമുണ്ട്',
        ambulance: 'ആംബുലൻസ്',
        healthHelpline: 'ആരോഗ്യ ഹെൽപ്ലൈൻ'
      },
      profile: {
        title: 'എന്റെ പ്രൊഫൈൽ',
        subtitle: 'വൈദ്യൻ നിങ്ങളെ നന്നായി മനസ്സിലാക്കാൻ സഹായിക്കുക',
        name: 'നിങ്ങളുടെ പേരെ',
        gender: 'നിങ്ങളുടെ ജെൻഡർ',
        state: 'നിങ്ങളുടെ സംസ്ഥാനം',
        dialect: 'നിങ്ങളുടെ ബോലി',
        language: 'ഭാഷ',
        about: 'വൈദ്യ് വരെ',
        aboutText: 'വൈദ്യൻ ഗ്രാമീണ ഇന്ത്യയ്ക്കായി രൂപകൽപ്പന ചെയ്ത ഒരു AI-പ്രേരിത ആരോഗ്യ സഹായി. ഇത് Adaptive Data സാങ്കേതികത ഉപയോഗിച്ച് നിങ്ങളുടെ ബോലി പഠിക്കുന്നു.',
        version: 'Version 1.0 · Adaptive Data Powered',
        save: 'പ്രൊഫൈൽ സേവ് ചെയ്യുക',
        saved: '✓ വിജയകരമായി സേവ് ചെയ്യപ്പെട്ടു',
        logout: 'ലോഗ് ഔട്ട് ചെയ്യുക'
      },
      nav: {
        home: 'വീട്',
        chat: 'ചാറ്റ്',
        asha: 'ASHA',
        history: 'ചരിത്രം',
        profile: 'പ്രൊഫൈൽ'
      },
      common: {
        loading: 'ലോഡ് ചെയ്യുന്നു...',
        error: 'പിഴവ്',
        success: 'വിജയം'
      },
      roles: {
        patient: 'രോഗി',
        ashaWorker: 'ASHA പ്രവർത്തക'
      }
    }
  },

  gu: {
    translation: {
      auth: {
        tagline: 'ગ્રામીણ ભારત માટે AI આરોગ્य',
        login: 'લૉગઇન / સાઇન અપ',
        ashaLogin: 'ASHA લૉગઇન',
        phone: 'મોબાઈલ નંબર',
        enterPhone: 'મોબાઈલ નંબર દાખલ કરો',
        sendOTP: 'OTP મોકલો',
        sending: 'મોકલી રહ્યા છીએ...',
        verifyOTP: 'OTP સત્યાપિત કરો',
        verifyingOTP: 'સત્યાપન કરી રહ્યા છીએ...',
        otpSent: 'OTP મોકલવામાં આવ્યો +91',
        enterOTP: 'OTP દાખલ કરો',
        continue: 'આગળ વધો',
        completeProfile: 'તમારી પ્રોફાઈલ પૂર્ણ કરો',
        termsAndPolicy: 'આગળ વધીને, તમે વૈદ્ય શરતો અને ગોપનીયતા નીતિ સાથે સહમત છો'
      },
      onboarding: {
        language: 'પસંદનો ભાષા',
        name: 'સંપૂર્ણ નામ',
        name_placeholder: 'તમારું નામ દાખલ કરો',
        gender: 'જાતિ',
        state: 'રાજ્ય',
        selectState: 'રાજ્ય પસંદ કરો',
        district: 'જિલ્લો',
        enterDistrict: 'જિલ્લો દાખલ કરો',
        village: 'ગામ',
        village_placeholder: 'ગામ દાખલ કરો',
        ashaId: 'ASHA કર્મચારી ID',
        enterAshaId: 'ASHA ID દાખલ કરો',
        validation_error: 'કૃપયા બધી ક્ષેત્રો ભરો',
        save_error: 'પ્રોફાઈલ સાચવવું નિષ્ફળ',
        continue_btn: 'આગળ વધો',
        saving: 'સાચવી રહ્યા છીએ...',
        genders: {
          male: 'પુરુષ',
          female: 'સ્ત્રી',
          other: 'અન્ય',
          prefer_not: 'કહેવાની ઇચ્છા નથી'
        }
      },
      home: {
        goodMorning: 'સુપ્રભાત',
        goodAfternoon: 'નમસ્તે',
        goodEvening: 'શુભ સાંજ',
        greetingTitle: 'આજે તમને કેમ લાગે છે?',
        greetingSub: 'વૈદ્ય સાથે કોઈપણ બોલીમાં ખુલ્લેઆમ વાત કરો',
        talkToVaidya: 'વૈદ્ય સાથે વાત કરો',
        describeProblem: 'તમારી તકલીફ જણાવો',
        quickSymptoms: 'ઝડપી લક્ષણો',
        emergencySection: 'આપાતકાલીન સ્થિતિ',
        disclaimer: 'વૈદ્ય ડોક્ટરનો વિકલ્પ નથી. ગંભીર સમસ્યામાં ડોક્ટરની સલાહ લો.',
        fever: 'તાવ',
        feverQuery: 'મને તાવ આવ્યો છે',
        headache: 'માથાનો દુખાવો',
        headacheQuery: 'મારું માથું દુખે છે',
        nausea: 'ઉબકા',
        nauseaQuery: 'મને ઉબકા આવે છે',
        cough: 'ઉધરસ',
        coughQuery: 'મને ઉધરસ આવે છે',
        bodyPain: 'શરીર દુખાવો',
        bodyPainQuery: 'મારું શરીર દુખે છે',
        tiredness: 'થાક',
        tirednessQuery: 'મને ખૂબ થાક લાગે છે',
        ambulance: 'એમ્બ્યુલન્સ',
        healthHelpline: 'આરોગ્ય હેલ્પલાઇન'
      },
      profile: {
        title: 'મારી પ્રોફાઈલ',
        subtitle: 'વૈદ્યને તમને સારી રીતે સમજવામાં મદદ કરો',
        name: 'તમારું નામ',
        gender: 'તમારી જાતિ',
        state: 'તમારું રાજ્ય',
        dialect: 'તમારી બોલી',
        language: 'ભાષા',
        about: 'વૈદ્ય વિશે',
        aboutText: 'વૈદ્ય ગ્રામીણ ભારત માટે ડિઝાઇન કરેલ AI-શક્તિ ધરાવતું આરોગ્ય સહાયક છે. તે Adaptive Data ટેકનોલોજીનો ઉપયોગ કરીને તમારી બોલી શીખે છે.',
        version: 'Version 1.0 · Adaptive Data Powered',
        save: 'પ્રોફાઈલ સાચવો',
        saved: '✓ સફળતાપૂર્વક સાચવવામાં આવ્યું',
        logout: 'લૉગઆઉટ કરો'
      },
      nav: {
        home: 'ગૃહ',
        chat: 'ચેટ',
        asha: 'ASHA',
        history: 'ઇતિહાસ',
        profile: 'પ્રોફાઈલ'
      },
      common: {
        loading: 'લોડ કરી રહ્યા છીએ...',
        error: 'ભૂલ',
        success: 'સફળતા'
      },
      roles: {
        patient: 'દર્દી',
        ashaWorker: 'ASHA કર્મચારી'
      }
    }
  },

  pa: {
    translation: {
      auth: {
        tagline: 'ਗ੍ਰਾਮੀਣ ਭਾਰਤ ਲਈ AI ਸਿਹਤ',
        login: 'ਲਾਗਿਨ ਕਰੋ / ਸਾਈਨ ਅਪ ਕਰੋ',
        ashaLogin: 'ASHA ਲਾਗਿਨ',
        phone: 'ਮੋਬਾਈਲ ਨੰਬਰ',
        enterPhone: 'ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ',
        sendOTP: 'OTP ਭੇਜੋ',
        sending: 'ਭੇਜ ਰਹੇ ਹੋ...',
        verifyOTP: 'OTP ਦੀ ਤਸਦੀਕ ਕਰੋ',
        verifyingOTP: 'ਤਸਦੀਕ ਕੀ ਜਾ ਰਹੀ ਹੈ...',
        otpSent: 'OTP ਭੇਜਿਆ ਗਿਆ +91',
        enterOTP: 'OTP ਦਰਜ ਕਰੋ',
        continue: 'ਜਾਰੀ ਰੱਖੋ',
        completeProfile: 'ਆਪਣਾ ਪ੍ਰੋਫਾਈਲ ਪੂਰਾ ਕਰੋ',
        termsAndPolicy: 'ਜਾਰੀ ਰੱਖ ਕੇ, ਤੁਸੀਂ ਵੈਦ ਦੀਆਂ ਸ਼ਰਤਾਂ ਅਤੇ ਗੋਪਨੀਯਤਾ ਨੀਤੀ ਨਾਲ ਸਹਿਮਤ ਹੋ',
      },
      onboarding: {
        language: 'ਤਰਜੀਹੀ ਭਾਸ਼ਾ',
        name: 'ਪੂਰਾ ਨਾਮ',
        name_placeholder: 'ਆਪਣਾ ਨਾਮ ਦਰਜ ਕਰੋ',
        gender: 'ਲਿੰਗ',
        state: 'ਸਥਿਤੀ',
        selectState: 'ਸਥਿਤੀ ਚੁਣੋ',
        district: 'ਜ਼ਿਲ੍ਹਾ',
        enterDistrict: 'ਜ਼ਿਲ੍ਹਾ ਦਰਜ ਕਰੋ',
        village: 'ਪਿੰਡ',
        village_placeholder: 'ਪਿੰਡ ਦਰਜ ਕਰੋ',
        ashaId: 'ASHA ਕਰਮਚਾਰੀ ID',
        enterAshaId: 'ASHA ID ਦਰਜ ਕਰੋ',
        validation_error: 'ਕਿਰਪਾ ਕਰਕੇ ਸਾਰੇ ਖੇਤਰ ਭਰੋ',
        save_error: 'ਪ੍ਰੋਫਾਈਲ ਸੰਭਾਲਣਾ ਅਸਫਲ ਰਿਹਾ',
        continue_btn: 'ਜਾਰੀ ਰੱਖੋ',
        saving: 'ਸੰਭਾਲ ਰਹੇ ਹੋ...',
        genders: {
          male: 'ਮਰਦ',
          female: 'ਔਰਤ',
          other: 'ਹੋਰ',
          prefer_not: 'ਕਹਿਣਾ ਪਸੰਦ ਨਹੀਂ ਹੈ'
        }
      },
      home: {
        goodMorning: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ',
        goodAfternoon: 'ਨਮਸਕਾਰ',
        goodEvening: 'ਸ਼ੁभ ਸ਼ਾਮ',
        greetingTitle: 'ਅੱਜ ਤੁਹਾਨੂੰ ਕਿਵੇਂ ਮਹਿਸੂਸ ਹੋ ਰਿਹਾ ਹੈ?',
        greetingSub: 'ਕਿਸੇ ਵੀ ਬੋਲੀ ਵਿੱਚ ਵੈਦ ਨਾਲ ਖੁੱਲ੍ਹ ਕੇ ਗੱਲ ਕਰੋ',
        talkToVaidya: 'ਵੈਦ ਨਾਲ ਗੱਲ ਕਰੋ',
        describeProblem: 'ਆਪਣੀ ਸਮੱਸਿਆ ਦੱਸੋ',
        quickSymptoms: 'ਤੁਰੰਤ ਲੱਛਣ',
        emergencySection: 'ਐਮਰਜੈਂਸੀ',
        disclaimer: 'ਵੈਦ ਡਾਕਟਰ ਦਾ ਬਦਲ ਨਹੀਂ ਹੈ। ਗੰਭੀਰ ਸਮੱਸਿਆ ਲਈ ਡਾਕਟਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।',
        fever: 'ਬੁਖਾਰ',
        feverQuery: 'ਮੈਨੂੰ ਬੁਖਾਰ ਹੈ',
        headache: 'ਸਿਰਦਰਦ',
        headacheQuery: 'ਮੇਰਾ ਸਿਰ ਦਰਦ ਕਰ ਰਿਹਾ ਹੈ',
        nausea: 'ਉਲਟੀ ਜਿਹੀ ਮਹਿਸੂਸ',
        nauseaQuery: 'ਮੈਨੂੰ ਉਲਟੀ ਜਿਹੀ ਆ ਰਹੀ ਹੈ',
        cough: 'ਖੰਘ',
        coughQuery: 'ਮੈਨੂੰ ਖੰਘ ਆ ਰਹੀ ਹੈ',
        bodyPain: 'ਸਰੀਰ ਦਰਦ',
        bodyPainQuery: 'ਮੇਰਾ ਸਰੀਰ ਦਰਦ ਕਰ ਰਿਹਾ ਹੈ',
        tiredness: 'ਥਕਾਵਟ',
        tirednessQuery: 'ਮੈਨੂੰ ਬਹੁਤ ਥਕਾਵਟ ਮਹਿਸੂਸ ਹੋ ਰਹੀ ਹੈ',
        ambulance: 'ਐਂਬੂਲੈਂਸ',
        healthHelpline: 'ਸਿਹਤ ਹੈਲਪਲਾਈਨ'
      },
      profile: {
        title: 'ਮੇਰਾ ਪ੍ਰੋਫਾਈਲ',
        subtitle: 'ਵੈਦ ਨੂੰ ਤੁਹਾਨੂੰ ਬਿਹਤਰ ਜਾਣਨ ਵਿੱਚ ਸਹਾਇਤਾ ਕਰੋ',
        name: 'ਤੁਹਾਡਾ ਨਾਮ',
        gender: 'ਤੁਹਾਡਾ ਲਿੰਗ',
        state: 'ਤੁਹਾਡੀ ਸਥਿਤੀ',
        dialect: 'ਤੁਹਾਡੀ ਬੋਲੀ',
        language: 'ਭਾਸ਼ਾ',
        about: 'ਵੈਦ ਬਾਰੇ',
        aboutText: 'ਵੈਦ ਗ੍ਰਾਮੀਣ ਭਾਰਤ ਲਈ ਡਿਜ਼ਾਇਨ ਕੀਤਾ ਗਿਆ ਇੱਕ AI-ਸੰਚਾਲਿਤ ਸਿਹਤ ਸਹਾਇਕ ਹੈ। ਇਹ Adaptive Data ਤਕਨਾਲੋਜੀ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਤੁਹਾਡੀ ਬੋਲੀ ਸਿੱਖਦਾ ਹੈ।',
        version: 'Version 1.0 · Adaptive Data Powered',
        save: 'ਪ੍ਰੋਫਾਈਲ ਸੰਭਾਲੋ',
        saved: '✓ ਸਫਲਤਾਪੂਰਵਕ ਸੰਭਾਲਿਆ ਗਿਆ',
        logout: 'ਲਾਗਆਊਟ ਕਰੋ'
      },
      nav: {
        home: 'ਮੁੱਖ',
        chat: 'ਚੈਟ',
        asha: 'ASHA',
        history: 'ਇਤਿਹਾਸ',
        profile: 'ਪ੍ਰੋਫਾਈਲ'
      },
      common: {
        loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
        error: 'ਗਲਤੀ',
        success: 'ਸਫਲਤਾ'
      },
      roles: {
        patient: 'ਮਰੀਜ਼',
        ashaWorker: 'ASHA ਕਰਮਚਾਰੀ'
      }
    }
  },

  or: {
    translation: {
      auth: {
        tagline: 'ଗ୍ରାମୀଣ ଭାରତ ପାଇଁ AI ସ୍ୱାସ୍ଥ୍ୟ',
        login: 'ଲଗ୍‍ଇନ୍ / ସାଇନ୍ ଅପ୍',
        ashaLogin: 'ASHA ଲଗ୍‍ଇନ୍',
        phone: 'ମୋବାଇଲ୍ ନମ୍ବର୍',
        enterPhone: 'ମୋବାଇଲ୍ ନମ୍ବର୍ ଦାଖଲ କରନ୍ତୁ',
        sendOTP: 'OTP ଏହେଜ |',
        sending: 'ପଠାଇଛୁ...',
        verifyOTP: 'OTP ଯାଛାଇ କରନ୍ତୁ',
        verifyingOTP: 'ଯାଛାଇ କରାଯାଉଛି...',
        otpSent: 'OTP ପଠାଯାଇଅଛି +91',
        enterOTP: 'OTP ଦାଖଲ କରନ୍ତୁ',
        continue: 'ଆଗକୁ ବାଢନ୍ତୁ',
        completeProfile: 'ଆପଣଙ୍କ ପ୍ରୋଫାଇଲ୍ ସମ୍ପୂର୍ଣ୍ଣ କରନ୍ତୁ',
        termsAndPolicy: 'ଆଗକୁ ବାଢ୍ଚି, ଆପଣ ବୈଦ୍ୟ ସର୍ତ୍ତ ଏବଂ ଗୋପନୀୟତା ନୀତି ସହିତ ରାଜି ଅଛନ୍ତି'
      },
      onboarding: {
        language: 'ଅଗ୍ରାଧିକାର ଭାଷା',
        name: 'ସମ୍ପୂର୍ଣ୍ଣ ନାମ',
        name_placeholder: 'ଆପଣଙ୍କ ନାମ ଦାଖଲ କରନ୍ତୁ',
        gender: 'ଲିଙ୍ଗ',
        state: 'ରାଜ୍ୟ',
        selectState: 'ରାଜ୍ୟ ଚୟନ କରନ୍ତୁ',
        district: 'ଜିଲ୍ଲା',
        enterDistrict: 'ଜିଲ୍ଲା ଦାଖଲ କରନ୍ତୁ',
        village: 'ଗାଁ',
        village_placeholder: 'ଗାଁ ଦାଖଲ କରନ୍ତୁ',
        ashaId: 'ASHA କର୍ମୀ ID',
        enterAshaId: 'ASHA ID ଦାଖଲ କରନ୍ତୁ',
        validation_error: 'ଦୟାକରି ସକଳ କ୍ଷେତ୍ର ପୂରଣ କରନ୍ତୁ',
        save_error: 'ପ୍ରୋଫାଇଲ୍ ସଂରକ୍ଷଣ ବିଫଳ ହୋଇଛି',
        continue_btn: 'ଆଗକୁ ବାଢନ୍ତୁ',
        saving: 'ସଂରକ୍ଷଣ ହୋଉଛି...',
        genders: {
          male: 'ପୁରୁଷ',
          female: 'ମହିଳା',
          other: 'ଅନ୍ୟ',
          prefer_not: 'କହିବାକୁ ପସନ୍ଦ କରନ୍ତି ନାହି'
        }
      },
      home: {
        goodMorning: 'ଶୁଭ ସକାଳ',
        goodAfternoon: 'ନମସ୍କାର',
        goodEvening: 'ଶୁଭ ସନ୍ଧ୍ୟା',
        greetingTitle: 'ଆଜି ଆପଣଙ୍କୁ\nକେମିତି ଲାଗୁଛି?',
        greetingSub: 'ବୈଦ୍ୟଙ୍କ ସହ ଖୋଲାମେଳା ଭାବେ କଥାହୁଅନ୍ତୁ — କୌଣସି ଭାଷାରେ',
        talkToVaidya: 'ବୈଦ୍ୟଙ୍କ ସହ କଥାହୁଅନ୍ତୁ',
        describeProblem: 'ଆପଣଙ୍କ ସମସ୍ୟା କହନ୍ତୁ',
        quickSymptoms: 'ତୁରନ୍ତ ଲକ୍ଷଣ',
        emergencySection: 'ଜରୁରୀ ସ୍ଥିତି',
        disclaimer: '⚠️ ବୈଦ୍ୟ ଡାକ୍ତରଙ୍କ ପରିବର୍ତ୍ତେ ନୁହେଁ। ଗୁରୁତର ସମସ୍ୟା ପାଇଁ ସଦା ଡାକ୍ତରଙ୍କୁ ଦେଖନ୍ତୁ।',
        fever: 'ଜ୍ୱର',
        feverQuery: 'ମୋତେ ଜ୍ୱର ହେଇଛି',
        headache: 'ମୁଣ୍ଡବେଦନା',
        headacheQuery: 'ମୋ ମୁଣ୍ଡ ବେଦନା କରୁଛି',
        nausea: 'ବାନ୍ତିବୋଧ',
        nauseaQuery: 'ମୋତେ ବାନ୍ତିବୋଧ ହେଉଛି',
        cough: 'କାଶ',
        coughQuery: 'ମୋତେ କାଶ ହେଉଛି',
        bodyPain: 'ଶରୀର ବେଦନା',
        bodyPainQuery: 'ମୋ ଶରୀର ବେଦନା କରୁଛି',
        tiredness: 'କ୍ଲାନ୍ତି',
        tirednessQuery: 'ମୋତେ ବହୁତ କ୍ଲାନ୍ତ ଲାଗୁଛି',
        ambulance: 'ଆମ୍ବୁଲାନ୍ସ',
        healthHelpline: 'ସ୍ୱାସ୍ଥ୍ୟ ହେଲ୍ପଲାଇନ୍'
      },
      profile: {
        title: 'ମୋ ପ୍ରୋଫାଇଲ୍',
        subtitle: 'ବୈଦ୍ୟକୁ ଆପଣଙ୍କୁ ଭଲରେ ବୁଝିବାକୁ ସାହାଯ୍ୟ କରନ୍ତୁ',
        name: 'ଆପଣଙ୍କ ନାମ',
        gender: 'ଆପଣଙ୍କ ଲିଙ୍ଗ',
        state: 'ଆପଣଙ୍କ ରାଜ୍ୟ',
        dialect: 'ଆପଣଙ୍କ ବୋଲି',
        language: 'ଭାଷା',
        about: 'ବୈଦ୍ୟ ବିଷୟରେ',
        aboutText: 'ବୈଦ୍ୟ ଗ୍ରାମୀଣ ଭାରତ ପାଇଁ ପରିକଳ୍ପନା ଏକ AI-ଚାଳିତ ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକ ଅଛି। ଏହା Adaptive Data ଯୁକ୍ତି ବ୍ୟବହାର କରି ଆପଣଙ୍କ ବୋଲି ଶିଖିବ।',
        version: 'Version 1.0 · Adaptive Data Powered',
        save: 'ପ୍ରୋଫାଇଲ୍ ସଂରକ୍ଷଣ କରନ୍ତୁ',
        saved: '✓ ସଫଳତାରେ ସଂରକ୍ଷିତ',
        logout: 'ଲଗ୍‍ଆଉଟ୍ କରନ୍ତୁ'
      },
      nav: {
        home: 'ମୁଖ୍ୟ',
        chat: 'ଚାଟ',
        asha: 'ASHA',
        history: 'ଇତିହାସ',
        profile: 'ପ୍ରୋଫାଇଲ୍'
      },
      common: {
        loading: 'ଲୋଡ ଜାଇଛି...',
        error: 'ତ୍ରୁଟି',
        success: 'ସଫଳତା'
      },
      roles: {
        patient: 'ରୋଗୀ',
        ashaWorker: 'ASHA କର୍ମୀ'
      }
    }
  },

  as: {
    translation: {
      auth: {
        tagline: 'গ্রাম্য ভাৰতৰ বাবে AI স্বাস্থ্য',
        login: 'লগ ইন / পঞ্জীকৰণ কৰক',
        ashaLogin: 'ASHA লগ ইন',
        phone: 'মোবাইল নম্বর',
        enterPhone: 'মোবাইল নম্বর প্রবেश করুন',
        sendOTP: 'OTP পঠাওক',
        sending: 'পঠাওহি...',
        verifyOTP: 'OTP যাচাই কৰক',
        verifyingOTP: 'যাচাই কৰা হৈ আছে...',
        otpSent: 'OTP পঠোৱা হৈছে +91',
        enterOTP: 'OTP প্রবেश করুন',
        continue: 'চলি থাকক',
        completeProfile: 'আপোনাৰ প্রোফাইল সম্পূর্ণ করুন',
        termsAndPolicy: 'চলি থাকি, আপনি বৈদ্য শর্তাবলী আৰু গোপনীয়তা নীতি সহমত'
      },
      onboarding: {
        language: 'পছন্দৰ ভাষা',
        name: 'সম্পূর্ণ নাম',
        name_placeholder: 'আপোনাৰ নাম প্রবেশ করুন',
        gender: 'লিঙ্গ',
        state: 'ৰাজ্য',
        selectState: 'ৰাজ্য নির্বাচন করুন',
        district: 'জিলা',
        enterDistrict: 'জিলা প্রবেশ করুন',
        village: 'গ্রাম',
        village_placeholder: 'গ্রাম প্রবেশ করুন',
        ashaId: 'ASHA কর্মচারী ID',
        enterAshaId: 'ASHA ID প্রবেশ করুন',
        validation_error: 'অনুগ্রহ করে সব ক্ষেত্র পূরণ করুন',
        save_error: 'প্রোফাইল সংরক্ষণ ব্যর্থ হৈছে',
        continue_btn: 'চলি থাকক',
        saving: 'সংরক্ষণ কৰা হৈ আছে...',
        genders: {
          male: 'পুরুষ',
          female: 'মহিলা',
          other: 'অন্যান্য',
          prefer_not: 'কব নিবিচাৰে নাই'
        }
      },
      home: {
        goodMorning: 'সুপ্ৰভাত',
        goodAfternoon: 'নমস্কাৰ',
        goodEvening: 'শুভ সন্ধিয়া',
        greetingTitle: 'আজি আপোনাৰ\nকেনে লাগিছে?',
        greetingSub: 'বৈদ্যৰ সৈতে খোলাখুলিভাৱে কথা পাতক — যিকোনো ভাষাত',
        talkToVaidya: 'বৈদ্যৰ সৈতে কথা পাতক',
        describeProblem: 'আপোনাৰ সমস্যাটো কওক',
        quickSymptoms: 'দ্ৰুত লক্ষণ',
        emergencySection: 'জৰুৰী অৱস্থা',
        disclaimer: '⚠️ বৈদ্য ডাক্তৰৰ বিকল্প নহয়। গুৰুতৰ সমস্যাৰ বাবে সদায় ডাক্তৰৰ ওচৰলৈ যাওক।',
        fever: 'জ্বৰ',
        feverQuery: 'মোৰ জ্বৰ হৈছে',
        headache: 'মূৰৰ বিষ',
        headacheQuery: 'মোৰ মূৰ বিষাইছে',
        nausea: 'বমিভাৱ',
        nauseaQuery: 'মোৰ বমিভাৱ হৈছে',
        cough: 'কাহ',
        coughQuery: 'মোৰ কাহ হৈছে',
        bodyPain: 'শৰীৰৰ বিষ',
        bodyPainQuery: 'মোৰ শৰীৰ বিষাইছে',
        tiredness: 'ক্লান্তি',
        tirednessQuery: 'মই বহুত ক্লান্ত অনুভৱ কৰিছোঁ',
        ambulance: 'এম্বুলেন্স',
        healthHelpline: 'স্বাস্থ্য সহায়ক লাইন'
      },
      profile: {
        title: 'মোৰ প্রোফাইল',
        subtitle: 'বৈদ্যক আপোনাকে ভাল কৈ বুজিবৰ বাবে সহায়তা করুন',
        name: 'আপোনাৰ নাম',
        gender: 'আপোনাৰ লিঙ্গ',
        state: 'আপোনাৰ ৰাজ্য',
        dialect: 'আপোনাৰ বোলি',
        language: 'ভাষা',
        about: 'বৈদ্য সম্বন্ধে',
        aboutText: 'বৈদ্য গ্রাম্য ভাৰতৰ বাবে ডিজাইন কৰা এটি এআই-চালিত স্বাস্থ্য সহায়ক। এটি অভিযোজিত ডেটা প্রযুক্তি ব্যবহার করে আপোনাৰ বোলি শিখে।',
        version: 'Version 1.0 · Adaptive Data Powered',
        save: 'প্রোফাইল সংরক্ষণ করুন',
        saved: '✓ সফলভাবে সংরক্ষিত হৈছে',
        logout: 'লগ আউট করুন'
      },
      nav: {
        home: 'হোম',
        chat: 'চেট',
        asha: 'ASHA',
        history: 'ইতিহাস',
        profile: 'প্রোফাইল'
      },
      common: {
        loading: 'লোড হৈ আছে...',
        error: 'ত্রুটি',
        success: 'সাফল্য'
      },
      roles: {
        patient: 'ৰোগী',
        ashaWorker: 'ASHA কর্মচারী'
      }
    }
  },

  ks: {
    translation: {
      auth: {
        tagline: 'دیہاتی ہندوستان کے لیے AI صحت',
        login: 'لاگ ان / سائن اپ',
        ashaLogin: 'ASHA لاگ ان',
        phone: 'موبائل نمبر',
        enterPhone: 'موبائل نمبر درج کریں',
        sendOTP: 'OTP بھیجیں',
        sending: 'بھیج رہے ہیں...',
        verifyOTP: 'OTP کی تصدیق کریں',
        verifyingOTP: 'تصدیق کی جا رہی ہے...',
        otpSent: 'OTP بھیجا گیا +91',
        enterOTP: 'OTP درج کریں',
        continue: 'جاری رکھیں',
        completeProfile: 'اپنا پروفائل مکمل کریں',
        termsAndPolicy: 'جاری رکھ کر، آپ وید کی شرائط اور رازداری کی پالیسی سے متفق ہیں'
      },
      onboarding: {
        language: 'ترجیحی زبان',
        name: 'مکمل نام',
        name_placeholder: 'اپنا نام درج کریں',
        gender: 'صنف',
        state: 'ریاست',
        selectState: 'ریاست منتخب کریں',
        district: 'ضلع',
        enterDistrict: 'ضلع درج کریں',
        village: 'گاؤں',
        village_placeholder: 'گاؤں درج کریں',
        ashaId: 'ASHA کارکن ID',
        enterAshaId: 'ASHA ID درج کریں',
        validation_error: 'براہ کرم تمام فیلڈز بھریں',
        save_error: 'پروفائل محفوظ کرنا ناکام',
        continue_btn: 'جاری رکھیں',
        saving: 'محفوظ کیا جا رہا ہے...',
        genders: {
          male: 'مرد',
          female: 'عورت',
          other: 'دیگر',
          prefer_not: 'کہنا پسند نہیں'
        }
      },
      home: {
        goodMorning: 'صبح بخیر',
        goodAfternoon: 'السلام علیکم',
        goodEvening: 'شام بخیر',
        greetingTitle: 'آج آپ کو\nکیسا محسوس ہو رہا ہے؟',
        greetingSub: 'ویدیا سے کھل کر بات کریں — کسی بھی زبان میں',
        talkToVaidya: 'ویدیا سے بات کریں',
        describeProblem: 'اپنی تکلیف بتائیں',
        quickSymptoms: 'فوری علامات',
        emergencySection: 'ہنگامی صورتحال',
        disclaimer: '⚠️ ویدیا ڈاکٹر کا متبادل نہیں ہے۔ سنگین مسئلے کے لیے ہمیشہ ڈاکٹر سے رجوع کریں۔',
        fever: 'بخار',
        feverQuery: 'مجھے بخار ہے',
        headache: 'سر درد',
        headacheQuery: 'میرے سر میں درد ہے',
        nausea: 'متلی',
        nauseaQuery: 'مجھے متلی ہو رہی ہے',
        cough: 'کھانسی',
        coughQuery: 'مجھے کھانسی ہو رہی ہے',
        bodyPain: 'جسم درد',
        bodyPainQuery: 'میرے جسم میں درد ہو رہا ہے',
        tiredness: 'تھکن',
        tirednessQuery: 'مجھے بہت تھکاوٹ محسوس ہو رہی ہے',
        ambulance: 'ایمبولینس',
        healthHelpline: 'صحت ہیلپ لائن'
      },
      profile: {
        title: 'میرا پروفائل',
        subtitle: 'ویدیا کو آپ کو بہتر سمجھنے میں مدد کریں',
        name: 'آپ کا نام',
        gender: 'آپ کی صنف',
        state: 'آپ کی ریاست',
        dialect: 'آپ کی بولی',
        language: 'زبان',
        about: 'ویدیا کے بارے میں',
        aboutText: 'ویدیا دیہاتی ہندوستان کے لیے ڈیزائن کیا گیا ایک AI سے چلنے والا صحت کار ہے۔ یہ Adaptive Data ٹیکنالوجی کا استعمال کرتے ہوئے آپ کی بولی سیکھتا ہے۔',
        version: 'Version 1.0 · Adaptive Data Powered',
        save: 'پروفائل محفوظ کریں',
        saved: '✓ کامیابی سے محفوظ',
        logout: 'لاگ آؤٹ کریں'
      },
      nav: {
        home: 'ہوم',
        chat: 'چیٹ',
        asha: 'ASHA',
        history: 'تاریخ',
        profile: 'پروفائل'
      },
      common: {
        loading: 'لوڈ ہو رہا ہے...',
        error: 'خرابی',
        success: 'کامیابی'
      },
      roles: {
        patient: 'مریض',
        ashaWorker: 'ASHA کارکن'
      }
    }
  },

  ur: {
    translation: {
      auth: {
        tagline: 'دیہاتی ہندوستان کے لیے AI صحت',
        login: 'لاگ ان / سائن اپ',
        ashaLogin: 'ASHA لاگ ان',
        phone: 'موبائل نمبر',
        enterPhone: 'موبائل نمبر درج کریں',
        sendOTP: 'OTP بھیجیں',
        sending: 'بھیج رہے ہیں...',
        verifyOTP: 'OTP کی تصدیق کریں',
        verifyingOTP: 'تصدیق کی جا رہی ہے...',
        otpSent: 'OTP بھیجا گیا +91',
        enterOTP: 'OTP درج کریں',
        continue: 'جاری رکھیں',
        completeProfile: 'اپنا پروفائل مکمل کریں',
        termsAndPolicy: 'جاری رکھ کر، آپ ویدیا کی شرائط اور رازداری کی پالیسی سے متفق ہیں'
      },
      onboarding: {
        language: 'ترجیحی زبان',
        name: 'مکمل نام',
        name_placeholder: 'اپنا نام درج کریں',
        gender: 'صنف',
        state: 'ریاست',
        selectState: 'ریاست منتخب کریں',
        district: 'ضلع',
        enterDistrict: 'ضلع درج کریں',
        village: 'گاؤں',
        village_placeholder: 'گاؤں درج کریں',
        ashaId: 'ASHA کارکن ID',
        enterAshaId: 'ASHA ID درج کریں',
        validation_error: 'براہ کرم تمام فیلڈز بھریں',
        save_error: 'پروفائل محفوظ کرنا ناکام',
        continue_btn: 'جاری رکھیں',
        saving: 'محفوظ کیا جا رہا ہے...',
        genders: {
          male: 'مرد',
          female: 'عورت',
          other: 'دیگر',
          prefer_not: 'کہنا پسند نہیں'
        }
      },
      home: {
        goodMorning: 'صبح بخیر',
        goodAfternoon: 'السلام علیکم',
        goodEvening: 'شام بخیر',
        greetingTitle: 'آج آپ کو\nکیسا محسوس ہو رہا ہے؟',
        greetingSub: 'ویدیا سے کھل کر بات کریں — کسی بھی زبان میں',
        talkToVaidya: 'ویدیا سے بات کریں',
        describeProblem: 'اپنی تکلیف بتائیں',
        quickSymptoms: 'فوری علامات',
        emergencySection: 'ہنگامی صورتحال',
        disclaimer: '⚠️ ویدیا ڈاکٹر کا متبادل نہیں ہے۔ سنگین مسئلے کے لیے ہمیشہ ڈاکٹر سے رجوع کریں۔',
        fever: 'بخار',
        feverQuery: 'مجھے بخار ہے',
        headache: 'سر درد',
        headacheQuery: 'میرے سر میں درد ہے',
        nausea: 'متلی',
        nauseaQuery: 'مجھے متلی ہو رہی ہے',
        cough: 'کھانسی',
        coughQuery: 'مجھے کھانسی ہو رہی ہے',
        bodyPain: 'جسم درد',
        bodyPainQuery: 'میرے جسم میں درد ہو رہا ہے',
        tiredness: 'تھکن',
        tirednessQuery: 'مجھے بہت تھکاوٹ محسوس ہو رہی ہے',
        ambulance: 'ایمبولینس',
        healthHelpline: 'صحت ہیلپ لائن'
      },
      profile: {
        title: 'میرا پروفائل',
        subtitle: 'ویدیا کو آپ کو بہتر سمجھنے میں مدد کریں',
        name: 'آپ کا نام',
        gender: 'آپ کی صنف',
        state: 'آپ کی ریاست',
        dialect: 'آپ کی بولی',
        language: 'زبان',
        about: 'ویدیا کے بارے میں',
        aboutText: 'ویدیا دیہاتی ہندوستان کے لیے ڈیزائن کیا گیا ایک AI سے چلنے والا صحت کار ہے۔ یہ Adaptive Data ٹیکنالوجی کا استعمال کرتے ہوئے آپ کی بولی سیکھتا ہے۔',
        version: 'Version 1.0 · Adaptive Data Powered',
        save: 'پروفائل محفوظ کریں',
        saved: '✓ کامیابی سے محفوظ',
        logout: 'لاگ آؤٹ کریں'
      },
      nav: {
        home: 'ہوم',
        chat: 'چیٹ',
        asha: 'ASHA',
        history: 'تاریخ',
        profile: 'پروفائل'
      },
      common: {
        loading: 'لوڈ ہو رہا ہے...',
        error: 'خرابی',
        success: 'کامیابی'
      },
      roles: {
        patient: 'مریض',
        ashaWorker: 'ASHA کارکن'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'mr',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
