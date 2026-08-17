"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Globe2,
  Loader2,
  MapPin,
  Phone,
  Plus,
  Trash2,
  User,
  Users,
  X,
} from "lucide-react";

/* =========================================================
   LANGUAGES
========================================================= */

const LANGUAGES = [
  { code: "hi", native: "हिन्दी", english: "Hindi" },
  { code: "en", native: "English", english: "English" },
  { code: "bn", native: "বাংলা", english: "Bengali" },
  { code: "mr", native: "मराठी", english: "Marathi" },
  { code: "te", native: "తెలుగు", english: "Telugu" },
  { code: "ta", native: "தமிழ்", english: "Tamil" },
  { code: "gu", native: "ગુજરાતી", english: "Gujarati" },
  { code: "kn", native: "ಕನ್ನಡ", english: "Kannada" },
  { code: "ml", native: "മലയാളം", english: "Malayalam" },
  { code: "or", native: "ଓଡ଼ିଆ", english: "Odia" },
  { code: "pa", native: "ਪੰਜਾਬੀ", english: "Punjabi" },
  { code: "as", native: "অসমীয়া", english: "Assamese" },
  { code: "ur", native: "اردو", english: "Urdu" },
];

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  hi: {
    registration: "पंजीकरण",
    title: "राज्य राजधानी विरोध प्रदर्शन",
    description:
      "यदि आप अपने राज्य की राजधानी में होने वाले विरोध प्रदर्शन में शामिल होना चाहते हैं, तो नीचे अपना विवरण दर्ज करें।",

    language: "भाषा",
    chooseLanguage: "भाषा चुनें",

    step1: "पुष्टि",
    step2: "विवरण",

    question:
      "क्या आप अपने राज्य की राजधानी में विरोध प्रदर्शन के लिए जाना चाहते हैं?",

    yes: "हाँ, मैं जाना चाहता हूँ",
    yesDescription:
      "राजधानी में होने वाले कार्यक्रम के लिए अपना पंजीकरण करें।",

    no: "नहीं, मैं नहीं जा सकता",
    noDescription:
      "मैं राज्य राजधानी के कार्यक्रम में शामिल नहीं हो पाऊँगा।",

    participantDetails: "प्रतिभागी का विवरण",
    participantDescription:
      "आपके साथ आने वाले प्रत्येक सदस्य का विवरण भरें।",

    member: "सदस्य",
    fullName: "पूरा नाम",
    mobileNumber: "मोबाइल नंबर",
    state: "राज्य",
    district: "जिला",
    tehsil: "तहसील / प्रखंड",

    enterName: "अपना पूरा नाम दर्ज करें",
    enterPhone: "10 अंकों का मोबाइल नंबर",

    selectState: "राज्य चुनें",
    selectDistrict: "जिला चुनें",
    selectTehsil: "तहसील / प्रखंड चुनें",

    selectStateFirst: "पहले राज्य चुनें",
    selectDistrictFirst: "पहले जिला चुनें",

    loadingStates: "राज्य लोड हो रहे हैं...",
    loadingDistricts: "जिले लोड हो रहे हैं...",
    loadingDetails: "तहसील की जानकारी लोड हो रही है...",
    loadingPrabhari: "प्रभारी की जानकारी लोड हो रही है...",

    addMember: "एक और सदस्य जोड़ें",
    removeMember: "सदस्य हटाएँ",

    districtPrabhari: "जिला प्रभारी",
    tehsilPrabhari: "तहसील प्रभारी",

    contact: "संपर्क करें",

    submit: "पंजीकरण जमा करें",
    submitting: "जमा किया जा रहा है...",

    back: "वापस",
    changeAnswer: "उत्तर बदलें",

    success: "पंजीकरण सफल हुआ",
    successDescription:
      "आपका पंजीकरण सफलतापूर्वक जमा कर दिया गया है।",

    registeredMembers: "पंजीकृत सदस्य",

    thankYou: "धन्यवाद",
    noAttendance:
      "आपने चुना है कि आप राज्य राजधानी के विरोध प्रदर्शन में शामिल नहीं होंगे।",

    requiredName: "कृपया नाम दर्ज करें।",
    requiredPhone:
      "कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।",
    requiredState: "कृपया राज्य चुनें।",
    requiredDistrict: "कृपया जिला चुनें।",
    requiredTehsil: "कृपया तहसील / प्रखंड चुनें।",

    submitError:
      "पंजीकरण जमा नहीं हो पाया। कृपया दोबारा प्रयास करें।",

    noPrabhari:
      "इस क्षेत्र के लिए प्रभारी की जानकारी उपलब्ध नहीं है।",
  },

  en: {
    registration: "Registration",
    title: "State Capital Protest",
    description:
      "If you wish to attend the protest in your state capital, please provide your details below.",

    language: "Language",
    chooseLanguage: "Choose language",

    step1: "Confirm",
    step2: "Details",

    question:
      "Do you want to go to your state capital for the protest?",

    yes: "Yes, I want to go",
    yesDescription:
      "Register for the event taking place in your state capital.",

    no: "No, I cannot attend",
    noDescription:
      "I will not be able to attend the state capital event.",

    participantDetails: "Participant Details",
    participantDescription:
      "Enter the details of everyone who will be attending with you.",

    member: "Member",
    fullName: "Full Name",
    mobileNumber: "Mobile Number",
    state: "State",
    district: "District",
    tehsil: "Tehsil / Block",

    enterName: "Enter your full name",
    enterPhone: "10-digit mobile number",

    selectState: "Select State",
    selectDistrict: "Select District",
    selectTehsil: "Select Tehsil / Block",

    selectStateFirst: "Select State First",
    selectDistrictFirst: "Select District First",

    loadingStates: "Loading states...",
    loadingDistricts: "Loading districts...",
    loadingDetails: "Loading tehsils...",
    loadingPrabhari: "Loading Prabhari...",

    addMember: "Add Another Member",
    removeMember: "Remove Member",

    districtPrabhari: "District Prabhari",
    tehsilPrabhari: "Tehsil Prabhari",

    contact: "Contact",

    submit: "Submit Registration",
    submitting: "Submitting...",

    back: "Back",
    changeAnswer: "Change Answer",

    success: "Registration Successful",
    successDescription:
      "Your registration has been successfully submitted.",

    registeredMembers: "Registered Members",

    thankYou: "Thank You",
    noAttendance:
      "You have selected that you will not attend the state capital protest.",

    requiredName: "Please enter your name.",
    requiredPhone:
      "Please enter a valid 10-digit mobile number.",
    requiredState: "Please select a state.",
    requiredDistrict: "Please select a district.",
    requiredTehsil:
      "Please select a tehsil / block.",

    submitError:
      "Registration could not be submitted. Please try again.",

    noPrabhari:
      "Prabhari information is not available for this area.",
  },

  bn: {
    registration: "নিবন্ধন",
    title: "রাজ্য রাজধানী প্রতিবাদ",
    description:
      "আপনি যদি আপনার রাজ্যের রাজধানীতে প্রতিবাদে যোগ দিতে চান, তাহলে নিচে আপনার তথ্য দিন।",

    language: "ভাষা",
    chooseLanguage: "ভাষা নির্বাচন করুন",

    step1: "নিশ্চিত করুন",
    step2: "বিবরণ",

    question:
      "আপনি কি প্রতিবাদের জন্য আপনার রাজ্যের রাজধানীতে যেতে চান?",

    yes: "হ্যাঁ, আমি যেতে চাই",
    yesDescription:
      "রাজধানীতে অনুষ্ঠিত কর্মসূচির জন্য নিবন্ধন করুন।",

    no: "না, আমি যেতে পারব না",
    noDescription:
      "আমি রাজ্যের রাজধানীর কর্মসূচিতে যেতে পারব না।",

    participantDetails: "অংশগ্রহণকারীর বিবরণ",
    participantDescription:
      "আপনার সঙ্গে আসা প্রত্যেক সদস্যের তথ্য দিন।",

    member: "সদস্য",
    fullName: "পুরো নাম",
    mobileNumber: "মোবাইল নম্বর",
    state: "রাজ্য",
    district: "জেলা",
    tehsil: "তহসিল / ব্লক",

    enterName: "আপনার পুরো নাম লিখুন",
    enterPhone: "১০ সংখ্যার মোবাইল নম্বর",

    selectState: "রাজ্য নির্বাচন করুন",
    selectDistrict: "জেলা নির্বাচন করুন",
    selectTehsil: "তহসিল / ব্লক নির্বাচন করুন",

    selectStateFirst: "প্রথমে রাজ্য নির্বাচন করুন",
    selectDistrictFirst: "প্রথমে জেলা নির্বাচন করুন",

    loadingStates: "রাজ্য লোড হচ্ছে...",
    loadingDistricts: "জেলা লোড হচ্ছে...",
    loadingDetails: "তহসিল লোড হচ্ছে...",
    loadingPrabhari: "প্রভারি লোড হচ্ছে...",

    addMember: "আরও সদস্য যোগ করুন",
    removeMember: "সদস্য সরান",

    districtPrabhari: "জেলা প্রভারি",
    tehsilPrabhari: "তহসিল প্রভারি",

    contact: "যোগাযোগ",

    submit: "নিবন্ধন জমা দিন",
    submitting: "জমা হচ্ছে...",

    back: "পিছনে",
    changeAnswer: "উত্তর পরিবর্তন করুন",

    success: "নিবন্ধন সফল",
    successDescription:
      "আপনার নিবন্ধন সফলভাবে জমা হয়েছে।",

    registeredMembers: "নিবন্ধিত সদস্য",

    thankYou: "ধন্যবাদ",
    noAttendance:
      "আপনি রাজ্যের রাজধানীর প্রতিবাদে অংশ নেবেন না বলে নির্বাচন করেছেন।",

    requiredName: "অনুগ্রহ করে নাম লিখুন।",
    requiredPhone:
      "অনুগ্রহ করে সঠিক ১০ সংখ্যার মোবাইল নম্বর দিন।",
    requiredState: "অনুগ্রহ করে রাজ্য নির্বাচন করুন।",
    requiredDistrict: "অনুগ্রহ করে জেলা নির্বাচন করুন।",
    requiredTehsil:
      "অনুগ্রহ করে তহসিল / ব্লক নির্বাচন করুন।",

    submitError:
      "নিবন্ধন জমা দেওয়া যায়নি। আবার চেষ্টা করুন।",

    noPrabhari:
      "এই এলাকার প্রভারির তথ্য পাওয়া যায়নি।",
  },

  mr: {
    registration: "नोंदणी",
    title: "राज्य राजधानी आंदोलन",
    description:
      "आपल्या राज्याच्या राजधानीत होणाऱ्या आंदोलनात सहभागी होऊ इच्छित असल्यास खाली आपली माहिती द्या.",

    language: "भाषा",
    chooseLanguage: "भाषा निवडा",

    step1: "पुष्टी",
    step2: "माहिती",

    question:
      "आपण आंदोलनासाठी आपल्या राज्याच्या राजधानीत जाऊ इच्छिता का?",

    yes: "होय, मला जायचे आहे",
    yesDescription:
      "राजधानीतील कार्यक्रमासाठी आपली नोंदणी करा.",

    no: "नाही, मी उपस्थित राहू शकत नाही",
    noDescription:
      "मी राज्याच्या राजधानीतील कार्यक्रमाला उपस्थित राहू शकणार नाही.",

    participantDetails: "सहभागीची माहिती",
    participantDescription:
      "आपल्यासोबत येणाऱ्या प्रत्येक सदस्याची माहिती भरा.",

    member: "सदस्य",
    fullName: "पूर्ण नाव",
    mobileNumber: "मोबाईल नंबर",
    state: "राज्य",
    district: "जिल्हा",
    tehsil: "तहसील / तालुका",

    enterName: "आपले पूर्ण नाव लिहा",
    enterPhone: "१० अंकी मोबाईल नंबर",

    selectState: "राज्य निवडा",
    selectDistrict: "जिल्हा निवडा",
    selectTehsil: "तहसील / तालुका निवडा",

    selectStateFirst: "प्रथम राज्य निवडा",
    selectDistrictFirst: "प्रथम जिल्हा निवडा",

    loadingStates: "राज्य लोड होत आहेत...",
    loadingDistricts: "जिल्हे लोड होत आहेत...",
    loadingDetails: "तहसील लोड होत आहेत...",
    loadingPrabhari: "प्रभारी लोड होत आहेत...",

    addMember: "आणखी सदस्य जोडा",
    removeMember: "सदस्य काढा",

    districtPrabhari: "जिल्हा प्रभारी",
    tehsilPrabhari: "तहसील प्रभारी",

    contact: "संपर्क",

    submit: "नोंदणी जमा करा",
    submitting: "जमा होत आहे...",

    back: "मागे",
    changeAnswer: "उत्तर बदला",

    success: "नोंदणी यशस्वी",
    successDescription:
      "आपली नोंदणी यशस्वीरित्या जमा झाली आहे.",

    registeredMembers: "नोंदणीकृत सदस्य",

    thankYou: "धन्यवाद",
    noAttendance:
      "आपण राज्याच्या राजधानीतील आंदोलनात सहभागी होणार नाही असे निवडले आहे.",

    requiredName: "कृपया नाव लिहा.",
    requiredPhone:
      "कृपया योग्य १० अंकी मोबाईल नंबर द्या.",
    requiredState: "कृपया राज्य निवडा.",
    requiredDistrict: "कृपया जिल्हा निवडा.",
    requiredTehsil:
      "कृपया तहसील / तालुका निवडा.",

    submitError:
      "नोंदणी जमा करता आली नाही. पुन्हा प्रयत्न करा.",

    noPrabhari:
      "या भागासाठी प्रभारीची माहिती उपलब्ध नाही.",
  },

  te: {
    registration: "నమోదు",
    title: "రాష్ట్ర రాజధాని నిరసన",
    description:
      "మీ రాష్ట్ర రాజధానిలో జరిగే నిరసనలో పాల్గొనాలనుకుంటే క్రింద మీ వివరాలను నమోదు చేయండి.",

    language: "భాష",
    chooseLanguage: "భాషను ఎంచుకోండి",

    step1: "నిర్ధారణ",
    step2: "వివరాలు",

    question:
      "నిరసన కోసం మీ రాష్ట్ర రాజధానికి వెళ్లాలనుకుంటున్నారా?",

    yes: "అవును, నేను వెళ్లాలనుకుంటున్నాను",
    yesDescription:
      "రాజధానిలో జరిగే కార్యక్రమం కోసం నమోదు చేసుకోండి.",

    no: "లేదు, నేను హాజరు కాలేను",
    noDescription:
      "నేను రాష్ట్ర రాజధాని కార్యక్రమానికి హాజరు కాలేను.",

    participantDetails: "పాల్గొనేవారి వివరాలు",
    participantDescription:
      "మీతో వచ్చే ప్రతి సభ్యుడి వివరాలను నమోదు చేయండి.",

    member: "సభ్యుడు",
    fullName: "పూర్తి పేరు",
    mobileNumber: "మొబైల్ నంబర్",
    state: "రాష్ట్రం",
    district: "జిల్లా",
    tehsil: "తహసీల్ / బ్లాక్",

    enterName: "మీ పూర్తి పేరు నమోదు చేయండి",
    enterPhone: "10 అంకెల మొబైల్ నంబర్",

    selectState: "రాష్ట్రాన్ని ఎంచుకోండి",
    selectDistrict: "జిల్లాను ఎంచుకోండి",
    selectTehsil: "తహసీల్ / బ్లాక్ ఎంచుకోండి",

    selectStateFirst: "ముందుగా రాష్ట్రాన్ని ఎంచుకోండి",
    selectDistrictFirst: "ముందుగా జిల్లాను ఎంచుకోండి",

    loadingStates: "రాష్ట్రాలు లోడ్ అవుతున్నాయి...",
    loadingDistricts: "జిల్లాలు లోడ్ అవుతున్నాయి...",
    loadingDetails: "తహసీల్లు లోడ్ అవుతున్నాయి...",
    loadingPrabhari: "ప్రభారి లోడ్ అవుతున్నారు...",

    addMember: "మరొక సభ్యుడిని జోడించండి",
    removeMember: "సభ్యుడిని తొలగించండి",

    districtPrabhari: "జిల్లా ప్రభారి",
    tehsilPrabhari: "తహసీల్ ప్రభారి",

    contact: "సంప్రదించండి",

    submit: "నమోదు సమర్పించండి",
    submitting: "సమర్పిస్తోంది...",

    back: "వెనుకకు",
    changeAnswer: "సమాధానం మార్చండి",

    success: "నమోదు విజయవంతమైంది",
    successDescription:
      "మీ నమోదు విజయవంతంగా సమర్పించబడింది.",

    registeredMembers: "నమోదైన సభ్యులు",

    thankYou: "ధన్యవాదాలు",
    noAttendance:
      "మీరు రాష్ట్ర రాజధాని నిరసనకు హాజరు కాలేరని ఎంచుకున్నారు.",

    requiredName: "దయచేసి పేరు నమోదు చేయండి.",
    requiredPhone:
      "దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి.",
    requiredState: "దయచేసి రాష్ట్రాన్ని ఎంచుకోండి.",
    requiredDistrict: "దయచేసి జిల్లాను ఎంచుకోండి.",
    requiredTehsil:
      "దయచేసి తహసీల్ / బ్లాక్ ఎంచుకోండి.",

    submitError:
      "నమోదు సమర్పించబడలేదు. మళ్లీ ప్రయత్నించండి.",

    noPrabhari:
      "ఈ ప్రాంతానికి ప్రభారి సమాచారం అందుబాటులో లేదు.",
  },

  ta: {
    registration: "பதிவு",
    title: "மாநில தலைநகர் போராட்டம்",
    description:
      "உங்கள் மாநில தலைநகரில் நடைபெறும் போராட்டத்தில் கலந்து கொள்ள விரும்பினால் கீழே உங்கள் விவரங்களை வழங்கவும்.",

    language: "மொழி",
    chooseLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",

    step1: "உறுதி",
    step2: "விவரங்கள்",

    question:
      "போராட்டத்திற்காக உங்கள் மாநில தலைநகருக்குச் செல்ல விரும்புகிறீர்களா?",

    yes: "ஆம், நான் செல்ல விரும்புகிறேன்",
    yesDescription:
      "தலைநகரில் நடைபெறும் நிகழ்வுக்குப் பதிவு செய்யுங்கள்.",

    no: "இல்லை, என்னால் கலந்து கொள்ள முடியாது",
    noDescription:
      "நான் மாநில தலைநகர் நிகழ்வில் கலந்து கொள்ள முடியாது.",

    participantDetails: "பங்கேற்பாளர் விவரங்கள்",
    participantDescription:
      "உங்களுடன் வருபவர்களின் விவரங்களை உள்ளிடவும்.",

    member: "உறுப்பினர்",
    fullName: "முழு பெயர்",
    mobileNumber: "மொபைல் எண்",
    state: "மாநிலம்",
    district: "மாவட்டம்",
    tehsil: "தாலுகா / வட்டம்",

    enterName: "முழு பெயரை உள்ளிடவும்",
    enterPhone: "10 இலக்க மொபைல் எண்",

    selectState: "மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
    selectDistrict: "மாவட்டத்தைத் தேர்ந்தெடுக்கவும்",
    selectTehsil: "தாலுகா / வட்டத்தைத் தேர்ந்தெடுக்கவும்",

    selectStateFirst: "முதலில் மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
    selectDistrictFirst: "முதலில் மாவட்டத்தைத் தேர்ந்தெடுக்கவும்",

    loadingStates: "மாநிலங்கள் ஏற்றப்படுகின்றன...",
    loadingDistricts: "மாவட்டங்கள் ஏற்றப்படுகின்றன...",
    loadingDetails: "தாலுகாக்கள் ஏற்றப்படுகின்றன...",
    loadingPrabhari: "பொறுப்பாளர் ஏற்றப்படுகிறார்...",

    addMember: "மற்றொரு உறுப்பினரைச் சேர்க்கவும்",
    removeMember: "உறுப்பினரை நீக்கவும்",

    districtPrabhari: "மாவட்ட பொறுப்பாளர்",
    tehsilPrabhari: "தாலுகா பொறுப்பாளர்",

    contact: "தொடர்பு",

    submit: "பதிவைச் சமர்ப்பிக்கவும்",
    submitting: "சமர்ப்பிக்கப்படுகிறது...",

    back: "பின்செல்",
    changeAnswer: "பதிலை மாற்றவும்",

    success: "பதிவு வெற்றிகரமாக முடிந்தது",
    successDescription:
      "உங்கள் பதிவு வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது.",

    registeredMembers: "பதிவு செய்யப்பட்ட உறுப்பினர்கள்",

    thankYou: "நன்றி",
    noAttendance:
      "நீங்கள் மாநில தலைநகர் போராட்டத்தில் கலந்து கொள்ள மாட்டீர்கள் என்று தேர்வு செய்துள்ளீர்கள்.",

    requiredName: "தயவுசெய்து பெயரை உள்ளிடவும்.",
    requiredPhone:
      "சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.",
    requiredState: "தயவுசெய்து மாநிலத்தைத் தேர்ந்தெடுக்கவும்.",
    requiredDistrict: "தயவுசெய்து மாவட்டத்தைத் தேர்ந்தெடுக்கவும்.",
    requiredTehsil:
      "தயவுசெய்து தாலுகா / வட்டத்தைத் தேர்ந்தெடுக்கவும்.",

    submitError:
      "பதிவைச் சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",

    noPrabhari:
      "இந்த பகுதிக்கான பொறுப்பாளர் தகவல் கிடைக்கவில்லை.",
  },

  gu: {
    registration: "નોંધણી",
    title: "રાજ્ય રાજધાની વિરોધ પ્રદર્શન",
    description:
      "જો તમે તમારા રાજ્યની રાજધાનીમાં યોજાનારા વિરોધ પ્રદર્શનમાં ભાગ લેવા માંગતા હો, તો નીચે તમારી વિગતો આપો.",

    language: "ભાષા",
    chooseLanguage: "ભાષા પસંદ કરો",

    step1: "પુષ્ટિ",
    step2: "વિગતો",

    question:
      "શું તમે વિરોધ પ્રદર્શન માટે તમારા રાજ્યની રાજધાનીમાં જવા માંગો છો?",

    yes: "હા, હું જવા માંગું છું",
    yesDescription:
      "રાજધાનીમાં યોજાનારા કાર્યક્રમ માટે નોંધણી કરો.",

    no: "ના, હું હાજર રહી શકતો નથી",
    noDescription:
      "હું રાજ્યની રાજધાનીના કાર્યક્રમમાં હાજર રહી શકીશ નહીં.",

    participantDetails: "ભાગ લેનારની વિગતો",
    participantDescription:
      "તમારી સાથે આવનાર દરેક સભ્યની વિગતો દાખલ કરો.",

    member: "સભ્ય",
    fullName: "પૂરું નામ",
    mobileNumber: "મોબાઇલ નંબર",
    state: "રાજ્ય",
    district: "જિલ્લો",
    tehsil: "તાલુકો / બ્લોક",

    enterName: "તમારું પૂરું નામ દાખલ કરો",
    enterPhone: "10 અંકનો મોબાઇલ નંબર",

    selectState: "રાજ્ય પસંદ કરો",
    selectDistrict: "જિલ્લો પસંદ કરો",
    selectTehsil: "તાલુકો / બ્લોક પસંદ કરો",

    selectStateFirst: "પહેલા રાજ્ય પસંદ કરો",
    selectDistrictFirst: "પહેલા જિલ્લો પસંદ કરો",

    loadingStates: "રાજ્યો લોડ થઈ રહ્યા છે...",
    loadingDistricts: "જિલ્લાઓ લોડ થઈ રહ્યા છે...",
    loadingDetails: "તાલુકાઓ લોડ થઈ રહ્યા છે...",
    loadingPrabhari: "પ્રભારી લોડ થઈ રહ્યા છે...",

    addMember: "બીજો સભ્ય ઉમેરો",
    removeMember: "સભ્ય દૂર કરો",

    districtPrabhari: "જિલ્લા પ્રભારી",
    tehsilPrabhari: "તાલુકા પ્રભારી",

    contact: "સંપર્ક",

    submit: "નોંધણી સબમિટ કરો",
    submitting: "સબમિટ થઈ રહ્યું છે...",

    back: "પાછા",
    changeAnswer: "જવાબ બદલો",

    success: "નોંધણી સફળ",
    successDescription:
      "તમારી નોંધણી સફળતાપૂર્વક સબમિટ થઈ છે.",

    registeredMembers: "નોંધાયેલા સભ્યો",

    thankYou: "આભાર",
    noAttendance:
      "તમે પસંદ કર્યું છે કે તમે રાજ્યની રાજધાનીના વિરોધ પ્રદર્શનમાં હાજર નહીં રહો.",

    requiredName: "કૃપા કરીને નામ દાખલ કરો.",
    requiredPhone:
      "કૃપા કરીને સાચો 10 અંકનો મોબાઇલ નંબર દાખલ કરો.",
    requiredState: "કૃપા કરીને રાજ્ય પસંદ કરો.",
    requiredDistrict: "કૃપા કરીને જિલ્લો પસંદ કરો.",
    requiredTehsil:
      "કૃપા કરીને તાલુકો / બ્લોક પસંદ કરો.",

    submitError:
      "નોંધણી સબમિટ થઈ શકી નથી. ફરી પ્રયાસ કરો.",

    noPrabhari:
      "આ વિસ્તાર માટે પ્રભારીની માહિતી ઉપલબ્ધ નથી.",
  },

  kn: {
    registration: "ನೋಂದಣಿ",
    title: "ರಾಜ್ಯ ರಾಜಧಾನಿ ಪ್ರತಿಭಟನೆ",
    description:
      "ನಿಮ್ಮ ರಾಜ್ಯದ ರಾಜಧಾನಿಯಲ್ಲಿ ನಡೆಯುವ ಪ್ರತಿಭಟನೆಯಲ್ಲಿ ಭಾಗವಹಿಸಲು ಬಯಸಿದರೆ ಕೆಳಗೆ ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನೀಡಿ.",

    language: "ಭಾಷೆ",
    chooseLanguage: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ",

    step1: "ದೃಢೀಕರಣ",
    step2: "ವಿವರಗಳು",

    question:
      "ಪ್ರತಿಭಟನೆಗಾಗಿ ನಿಮ್ಮ ರಾಜ್ಯದ ರಾಜಧಾನಿಗೆ ಹೋಗಲು ಬಯಸುವಿರಾ?",

    yes: "ಹೌದು, ನಾನು ಹೋಗಲು ಬಯಸುತ್ತೇನೆ",
    yesDescription:
      "ರಾಜಧಾನಿಯಲ್ಲಿ ನಡೆಯುವ ಕಾರ್ಯಕ್ರಮಕ್ಕೆ ನೋಂದಾಯಿಸಿ.",

    no: "ಇಲ್ಲ, ನಾನು ಭಾಗವಹಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ",
    noDescription:
      "ನಾನು ರಾಜ್ಯ ರಾಜಧಾನಿ ಕಾರ್ಯಕ್ರಮದಲ್ಲಿ ಭಾಗವಹಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.",

    participantDetails: "ಭಾಗವಹಿಸುವವರ ವಿವರಗಳು",
    participantDescription:
      "ನಿಮ್ಮೊಂದಿಗೆ ಬರುವ ಪ್ರತಿಯೊಬ್ಬ ಸದಸ್ಯರ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ.",

    member: "ಸದಸ್ಯ",
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    mobileNumber: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    state: "ರಾಜ್ಯ",
    district: "ಜಿಲ್ಲೆ",
    tehsil: "ತಾಲೂಕು / ಬ್ಲಾಕ್",

    enterName: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    enterPhone: "10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",

    selectState: "ರಾಜ್ಯ ಆಯ್ಕೆಮಾಡಿ",
    selectDistrict: "ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ",
    selectTehsil: "ತಾಲೂಕು / ಬ್ಲಾಕ್ ಆಯ್ಕೆಮಾಡಿ",

    selectStateFirst: "ಮೊದಲು ರಾಜ್ಯ ಆಯ್ಕೆಮಾಡಿ",
    selectDistrictFirst: "ಮೊದಲು ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ",

    loadingStates: "ರಾಜ್ಯಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    loadingDistricts: "ಜಿಲ್ಲೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    loadingDetails: "ತಾಲೂಕುಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    loadingPrabhari: "ಪ್ರಭಾರಿಯನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",

    addMember: "ಮತ್ತೊಬ್ಬ ಸದಸ್ಯರನ್ನು ಸೇರಿಸಿ",
    removeMember: "ಸದಸ್ಯರನ್ನು ತೆಗೆದುಹಾಕಿ",

    districtPrabhari: "ಜಿಲ್ಲಾ ಪ್ರಭಾರಿ",
    tehsilPrabhari: "ತಾಲೂಕು ಪ್ರಭಾರಿ",

    contact: "ಸಂಪರ್ಕ",

    submit: "ನೋಂದಣಿ ಸಲ್ಲಿಸಿ",
    submitting: "ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...",

    back: "ಹಿಂದೆ",
    changeAnswer: "ಉತ್ತರ ಬದಲಿಸಿ",

    success: "ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ",
    successDescription:
      "ನಿಮ್ಮ ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ.",

    registeredMembers: "ನೋಂದಾಯಿತ ಸದಸ್ಯರು",

    thankYou: "ಧನ್ಯವಾದಗಳು",
    noAttendance:
      "ನೀವು ರಾಜ್ಯ ರಾಜಧಾನಿ ಪ್ರತಿಭಟನೆಯಲ್ಲಿ ಭಾಗವಹಿಸುವುದಿಲ್ಲ ಎಂದು ಆಯ್ಕೆ ಮಾಡಿದ್ದೀರಿ.",

    requiredName: "ದಯವಿಟ್ಟು ಹೆಸರು ನಮೂದಿಸಿ.",
    requiredPhone:
      "ದಯವಿಟ್ಟು ಸರಿಯಾದ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
    requiredState: "ದಯವಿಟ್ಟು ರಾಜ್ಯ ಆಯ್ಕೆಮಾಡಿ.",
    requiredDistrict: "ದಯವಿಟ್ಟು ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ.",
    requiredTehsil:
      "ದಯವಿಟ್ಟು ತಾಲೂಕು / ಬ್ಲಾಕ್ ಆಯ್ಕೆಮಾಡಿ.",

    submitError:
      "ನೋಂದಣಿ ಸಲ್ಲಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",

    noPrabhari:
      "ಈ ಪ್ರದೇಶಕ್ಕೆ ಪ್ರಭಾರಿ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ.",
  },

  ml: {
    registration: "രജിസ്ട്രേഷൻ",
    title: "സംസ്ഥാന തലസ്ഥാന പ്രതിഷേധം",
    description:
      "നിങ്ങളുടെ സംസ്ഥാന തലസ്ഥാനത്ത് നടക്കുന്ന പ്രതിഷേധത്തിൽ പങ്കെടുക്കാൻ ആഗ്രഹിക്കുന്നുവെങ്കിൽ താഴെ വിവരങ്ങൾ നൽകുക.",

    language: "ഭാഷ",
    chooseLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക",

    step1: "സ്ഥിരീകരണം",
    step2: "വിവരങ്ങൾ",

    question:
      "പ്രതിഷേധത്തിനായി നിങ്ങളുടെ സംസ്ഥാന തലസ്ഥാനത്തേക്ക് പോകാൻ ആഗ്രഹിക്കുന്നുണ്ടോ?",

    yes: "അതെ, എനിക്ക് പോകണം",
    yesDescription:
      "തലസ്ഥാനത്ത് നടക്കുന്ന പരിപാടിക്കായി രജിസ്റ്റർ ചെയ്യുക.",

    no: "ഇല്ല, എനിക്ക് പങ്കെടുക്കാൻ കഴിയില്ല",
    noDescription:
      "എനിക്ക് സംസ്ഥാന തലസ്ഥാന പരിപാടിയിൽ പങ്കെടുക്കാൻ കഴിയില്ല.",

    participantDetails: "പങ്കെടുക്കുന്നയാളുടെ വിവരങ്ങൾ",
    participantDescription:
      "നിങ്ങളോടൊപ്പം വരുന്ന ഓരോ അംഗത്തിന്റെയും വിവരങ്ങൾ നൽകുക.",

    member: "അംഗം",
    fullName: "പൂർണ്ണ പേര്",
    mobileNumber: "മൊബൈൽ നമ്പർ",
    state: "സംസ്ഥാനം",
    district: "ജില്ല",
    tehsil: "താലൂക്ക് / ബ്ലോക്ക്",

    enterName: "നിങ്ങളുടെ പൂർണ്ണ പേര് നൽകുക",
    enterPhone: "10 അക്ക മൊബൈൽ നമ്പർ",

    selectState: "സംസ്ഥാനം തിരഞ്ഞെടുക്കുക",
    selectDistrict: "ജില്ല തിരഞ്ഞെടുക്കുക",
    selectTehsil: "താലൂക്ക് / ബ്ലോക്ക് തിരഞ്ഞെടുക്കുക",

    selectStateFirst: "ആദ്യം സംസ്ഥാനം തിരഞ്ഞെടുക്കുക",
    selectDistrictFirst: "ആദ്യം ജില്ല തിരഞ്ഞെടുക്കുക",

    loadingStates: "സംസ്ഥാനങ്ങൾ ലോഡ് ചെയ്യുന്നു...",
    loadingDistricts: "ജില്ലകൾ ലോഡ് ചെയ്യുന്നു...",
    loadingDetails: "താലൂക്കുകൾ ലോഡ് ചെയ്യുന്നു...",
    loadingPrabhari: "പ്രഭാരി ലോഡ് ചെയ്യുന്നു...",

    addMember: "മറ്റൊരു അംഗത്തെ ചേർക്കുക",
    removeMember: "അംഗത്തെ നീക്കം ചെയ്യുക",

    districtPrabhari: "ജില്ലാ പ്രഭാരി",
    tehsilPrabhari: "താലൂക്ക് പ്രഭാരി",

    contact: "ബന്ധപ്പെടുക",

    submit: "രജിസ്ട്രേഷൻ സമർപ്പിക്കുക",
    submitting: "സമർപ്പിക്കുന്നു...",

    back: "പിന്നിലേക്ക്",
    changeAnswer: "ഉത്തരം മാറ്റുക",

    success: "രജിസ്ട്രേഷൻ വിജയകരമായി",
    successDescription:
      "നിങ്ങളുടെ രജിസ്ട്രേഷൻ വിജയകരമായി സമർപ്പിച്ചു.",

    registeredMembers: "രജിസ്റ്റർ ചെയ്ത അംഗങ്ങൾ",

    thankYou: "നന്ദി",
    noAttendance:
      "സംസ്ഥാന തലസ്ഥാന പ്രതിഷേധത്തിൽ പങ്കെടുക്കില്ലെന്ന് നിങ്ങൾ തിരഞ്ഞെടുത്തു.",

    requiredName: "ദയവായി പേര് നൽകുക.",
    requiredPhone:
      "ദയവായി ശരിയായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക.",
    requiredState: "ദയവായി സംസ്ഥാനം തിരഞ്ഞെടുക്കുക.",
    requiredDistrict: "ദയവായി ജില്ല തിരഞ്ഞെടുക്കുക.",
    requiredTehsil:
      "ദയവായി താലൂക്ക് / ബ്ലോക്ക് തിരഞ്ഞെടുക്കുക.",

    submitError:
      "രജിസ്ട്രേഷൻ സമർപ്പിക്കാൻ കഴിഞ്ഞില്ല. വീണ്ടും ശ്രമിക്കുക.",

    noPrabhari:
      "ഈ പ്രദേശത്തെ പ്രഭാരിയുടെ വിവരങ്ങൾ ലഭ്യമല്ല.",
  },

  or: {
    registration: "ପଞ୍ଜୀକରଣ",
    title: "ରାଜ୍ୟ ରାଜଧାନୀ ପ୍ରତିବାଦ",
    description:
      "ଆପଣ ନିଜ ରାଜ୍ୟର ରାଜଧାନୀରେ ହେବାକୁ ଥିବା ପ୍ରତିବାଦରେ ଯୋଗଦେବାକୁ ଚାହୁଁଥିଲେ ନିମ୍ନରେ ନିଜ ବିବରଣୀ ଦିଅନ୍ତୁ।",

    language: "ଭାଷା",
    chooseLanguage: "ଭାଷା ବାଛନ୍ତୁ",

    step1: "ନିଶ୍ଚିତକରଣ",
    step2: "ବିବରଣୀ",

    question:
      "ଆପଣ ପ୍ରତିବାଦ ପାଇଁ ନିଜ ରାଜ୍ୟର ରାଜଧାନୀକୁ ଯିବାକୁ ଚାହୁଁଛନ୍ତି କି?",

    yes: "ହଁ, ମୁଁ ଯିବାକୁ ଚାହୁଁଛି",
    yesDescription:
      "ରାଜଧାନୀରେ ହେବାକୁ ଥିବା କାର୍ଯ୍ୟକ୍ରମ ପାଇଁ ପଞ୍ଜୀକରଣ କରନ୍ତୁ।",

    no: "ନା, ମୁଁ ଯୋଗଦେଇ ପାରିବି ନାହିଁ",
    noDescription:
      "ମୁଁ ରାଜ୍ୟ ରାଜଧାନୀ କାର୍ଯ୍ୟକ୍ରମରେ ଯୋଗଦେଇ ପାରିବି ନାହିଁ।",

    participantDetails: "ଅଂଶଗ୍ରହଣକାରୀଙ୍କ ବିବରଣୀ",
    participantDescription:
      "ଆପଣଙ୍କ ସହିତ ଆସୁଥିବା ପ୍ରତ୍ୟେକ ସଦସ୍ୟଙ୍କ ବିବରଣୀ ଦିଅନ୍ତୁ।",

    member: "ସଦସ୍ୟ",
    fullName: "ପୂର୍ଣ୍ଣ ନାମ",
    mobileNumber: "ମୋବାଇଲ୍ ନମ୍ବର",
    state: "ରାଜ୍ୟ",
    district: "ଜିଲ୍ଲା",
    tehsil: "ତହସିଲ୍ / ବ୍ଲକ୍",

    enterName: "ଆପଣଙ୍କ ପୂର୍ଣ୍ଣ ନାମ ଦିଅନ୍ତୁ",
    enterPhone: "୧୦ ଅଙ୍କର ମୋବାଇଲ୍ ନମ୍ବର",

    selectState: "ରାଜ୍ୟ ବାଛନ୍ତୁ",
    selectDistrict: "ଜିଲ୍ଲା ବାଛନ୍ତୁ",
    selectTehsil: "ତହସିଲ୍ / ବ୍ଲକ୍ ବାଛନ୍ତୁ",

    selectStateFirst: "ପ୍ରଥମେ ରାଜ୍ୟ ବାଛନ୍ତୁ",
    selectDistrictFirst: "ପ୍ରଥମେ ଜିଲ୍ଲା ବାଛନ୍ତୁ",

    loadingStates: "ରାଜ୍ୟ ଲୋଡ୍ ହେଉଛି...",
    loadingDistricts: "ଜିଲ୍ଲା ଲୋଡ୍ ହେଉଛି...",
    loadingDetails: "ତହସିଲ୍ ଲୋଡ୍ ହେଉଛି...",
    loadingPrabhari: "ପ୍ରଭାରୀ ଲୋଡ୍ ହେଉଛନ୍ତି...",

    addMember: "ଆଉ ଜଣେ ସଦସ୍ୟ ଯୋଡନ୍ତୁ",
    removeMember: "ସଦସ୍ୟ ହଟାନ୍ତୁ",

    districtPrabhari: "ଜିଲ୍ଲା ପ୍ରଭାରୀ",
    tehsilPrabhari: "ତହସିଲ୍ ପ୍ରଭାରୀ",

    contact: "ଯୋଗାଯୋଗ",

    submit: "ପଞ୍ଜୀକରଣ ଦାଖଲ କରନ୍ତୁ",
    submitting: "ଦାଖଲ ହେଉଛି...",

    back: "ପଛକୁ",
    changeAnswer: "ଉତ୍ତର ବଦଳାନ୍ତୁ",

    success: "ପଞ୍ଜୀକରଣ ସଫଳ",
    successDescription:
      "ଆପଣଙ୍କ ପଞ୍ଜୀକରଣ ସଫଳତାର ସହିତ ଦାଖଲ ହୋଇଛି।",

    registeredMembers: "ପଞ୍ଜୀକୃତ ସଦସ୍ୟ",

    thankYou: "ଧନ୍ୟବାଦ",
    noAttendance:
      "ଆପଣ ରାଜ୍ୟ ରାଜଧାନୀ ପ୍ରତିବାଦରେ ଯୋଗଦେବେ ନାହିଁ ବୋଲି ବାଛିଛନ୍ତି।",

    requiredName: "ଦୟାକରି ନାମ ଦିଅନ୍ତୁ।",
    requiredPhone:
      "ଦୟାକରି ସଠିକ୍ ୧୦ ଅଙ୍କର ମୋବାଇଲ୍ ନମ୍ବର ଦିଅନ୍ତୁ।",
    requiredState: "ଦୟାକରି ରାଜ୍ୟ ବାଛନ୍ତୁ।",
    requiredDistrict: "ଦୟାକରି ଜିଲ୍ଲା ବାଛନ୍ତୁ।",
    requiredTehsil:
      "ଦୟାକରି ତହସିଲ୍ / ବ୍ଲକ୍ ବାଛନ୍ତୁ।",

    submitError:
      "ପଞ୍ଜୀକରଣ ଦାଖଲ ହୋଇପାରିଲା ନାହିଁ। ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।",

    noPrabhari:
      "ଏହି ଅଞ୍ଚଳ ପାଇଁ ପ୍ରଭାରୀଙ୍କ ସୂଚନା ଉପଲବ୍ଧ ନାହିଁ।",
  },

  pa: {
    registration: "ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
    title: "ਰਾਜ ਦੀ ਰਾਜਧਾਨੀ ਵਿਰੋਧ ਪ੍ਰਦਰਸ਼ਨ",
    description:
      "ਜੇ ਤੁਸੀਂ ਆਪਣੇ ਰਾਜ ਦੀ ਰਾਜਧਾਨੀ ਵਿੱਚ ਹੋਣ ਵਾਲੇ ਵਿਰੋਧ ਪ੍ਰਦਰਸ਼ਨ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਣਾ ਚਾਹੁੰਦੇ ਹੋ ਤਾਂ ਹੇਠਾਂ ਆਪਣੀ ਜਾਣਕਾਰੀ ਦਿਓ।",

    language: "ਭਾਸ਼ਾ",
    chooseLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ",

    step1: "ਪੁਸ਼ਟੀ",
    step2: "ਵੇਰਵੇ",

    question:
      "ਕੀ ਤੁਸੀਂ ਵਿਰੋਧ ਪ੍ਰਦਰਸ਼ਨ ਲਈ ਆਪਣੇ ਰਾਜ ਦੀ ਰਾਜਧਾਨੀ ਜਾਣਾ ਚਾਹੁੰਦੇ ਹੋ?",

    yes: "ਹਾਂ, ਮੈਂ ਜਾਣਾ ਚਾਹੁੰਦਾ ਹਾਂ",
    yesDescription:
      "ਰਾਜਧਾਨੀ ਵਿੱਚ ਹੋਣ ਵਾਲੇ ਪ੍ਰੋਗਰਾਮ ਲਈ ਰਜਿਸਟਰ ਕਰੋ।",

    no: "ਨਹੀਂ, ਮੈਂ ਸ਼ਾਮਲ ਨਹੀਂ ਹੋ ਸਕਦਾ",
    noDescription:
      "ਮੈਂ ਰਾਜ ਦੀ ਰਾਜਧਾਨੀ ਦੇ ਪ੍ਰੋਗਰਾਮ ਵਿੱਚ ਸ਼ਾਮਲ ਨਹੀਂ ਹੋ ਸਕਾਂਗਾ।",

    participantDetails: "ਭਾਗੀਦਾਰ ਦੇ ਵੇਰਵੇ",
    participantDescription:
      "ਤੁਹਾਡੇ ਨਾਲ ਆਉਣ ਵਾਲੇ ਹਰ ਮੈਂਬਰ ਦੇ ਵੇਰਵੇ ਭਰੋ।",

    member: "ਮੈਂਬਰ",
    fullName: "ਪੂਰਾ ਨਾਮ",
    mobileNumber: "ਮੋਬਾਈਲ ਨੰਬਰ",
    state: "ਰਾਜ",
    district: "ਜ਼ਿਲ੍ਹਾ",
    tehsil: "ਤਹਿਸੀਲ / ਬਲਾਕ",

    enterName: "ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ",
    enterPhone: "10 ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ",

    selectState: "ਰਾਜ ਚੁਣੋ",
    selectDistrict: "ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ",
    selectTehsil: "ਤਹਿਸੀਲ / ਬਲਾਕ ਚੁਣੋ",

    selectStateFirst: "ਪਹਿਲਾਂ ਰਾਜ ਚੁਣੋ",
    selectDistrictFirst: "ਪਹਿਲਾਂ ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ",

    loadingStates: "ਰਾਜ ਲੋਡ ਹੋ ਰਹੇ ਹਨ...",
    loadingDistricts: "ਜ਼ਿਲ੍ਹੇ ਲੋਡ ਹੋ ਰਹੇ ਹਨ...",
    loadingDetails: "ਤਹਿਸੀਲਾਂ ਲੋਡ ਹੋ ਰਹੀਆਂ ਹਨ...",
    loadingPrabhari: "ਪ੍ਰਭਾਰੀ ਲੋਡ ਹੋ ਰਹੇ ਹਨ...",

    addMember: "ਇੱਕ ਹੋਰ ਮੈਂਬਰ ਸ਼ਾਮਲ ਕਰੋ",
    removeMember: "ਮੈਂਬਰ ਹਟਾਓ",

    districtPrabhari: "ਜ਼ਿਲ੍ਹਾ ਪ੍ਰਭਾਰੀ",
    tehsilPrabhari: "ਤਹਿਸੀਲ ਪ੍ਰਭਾਰੀ",

    contact: "ਸੰਪਰਕ",

    submit: "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਜਮ੍ਹਾਂ ਕਰੋ",
    submitting: "ਜਮ੍ਹਾਂ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",

    back: "ਵਾਪਸ",
    changeAnswer: "ਜਵਾਬ ਬਦਲੋ",

    success: "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸਫਲ",
    successDescription:
      "ਤੁਹਾਡੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸਫਲਤਾਪੂਰਵਕ ਜਮ੍ਹਾਂ ਹੋ ਗਈ ਹੈ।",

    registeredMembers: "ਰਜਿਸਟਰ ਕੀਤੇ ਮੈਂਬਰ",

    thankYou: "ਧੰਨਵਾਦ",
    noAttendance:
      "ਤੁਸੀਂ ਚੁਣਿਆ ਹੈ ਕਿ ਤੁਸੀਂ ਰਾਜ ਦੀ ਰਾਜਧਾਨੀ ਦੇ ਵਿਰੋਧ ਪ੍ਰਦਰਸ਼ਨ ਵਿੱਚ ਸ਼ਾਮਲ ਨਹੀਂ ਹੋਵੋਗੇ।",

    requiredName: "ਕਿਰਪਾ ਕਰਕੇ ਨਾਮ ਦਰਜ ਕਰੋ।",
    requiredPhone:
      "ਕਿਰਪਾ ਕਰਕੇ ਸਹੀ 10 ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ।",
    requiredState: "ਕਿਰਪਾ ਕਰਕੇ ਰਾਜ ਚੁਣੋ।",
    requiredDistrict: "ਕਿਰਪਾ ਕਰਕੇ ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ।",
    requiredTehsil:
      "ਕਿਰਪਾ ਕਰਕੇ ਤਹਿਸੀਲ / ਬਲਾਕ ਚੁਣੋ।",

    submitError:
      "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਜਮ੍ਹਾਂ ਨਹੀਂ ਹੋ ਸਕੀ। ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",

    noPrabhari:
      "ਇਸ ਖੇਤਰ ਲਈ ਪ੍ਰਭਾਰੀ ਦੀ ਜਾਣਕਾਰੀ ਉਪਲਬਧ ਨਹੀਂ ਹੈ।",
  },

  as: {
    registration: "পঞ্জীয়ন",
    title: "ৰাজ্যৰ ৰাজধানী প্ৰতিবাদ",
    description:
      "আপুনি যদি আপোনাৰ ৰাজ্যৰ ৰাজধানীত অনুষ্ঠিত হ'বলগীয়া প্ৰতিবাদত অংশগ্ৰহণ কৰিব বিচাৰে, তেন্তে তলত আপোনাৰ তথ্য দিয়ক।",

    language: "ভাষা",
    chooseLanguage: "ভাষা বাছনি কৰক",

    step1: "নিশ্চিতকৰণ",
    step2: "বিৱৰণ",

    question:
      "আপুনি প্ৰতিবাদৰ বাবে আপোনাৰ ৰাজ্যৰ ৰাজধানীলৈ যাব বিচাৰে নেকি?",

    yes: "হয়, মই যাব বিচাৰো",
    yesDescription:
      "ৰাজধানীত অনুষ্ঠিত হ'বলগীয়া কাৰ্যসূচীৰ বাবে পঞ্জীয়ন কৰক।",

    no: "নহয়, মই অংশগ্ৰহণ কৰিব নোৱাৰো",
    noDescription:
      "মই ৰাজ্যৰ ৰাজধানীৰ কাৰ্যসূচীত অংশগ্ৰহণ কৰিব নোৱাৰিম।",

    participantDetails: "অংশগ্ৰহণকাৰীৰ বিৱৰণ",
    participantDescription:
      "আপোনাৰ সৈতে অহা প্ৰতিজন সদস্যৰ বিৱৰণ দিয়ক।",

    member: "সদস্য",
    fullName: "সম্পূৰ্ণ নাম",
    mobileNumber: "মোবাইল নম্বৰ",
    state: "ৰাজ্য",
    district: "জিলা",
    tehsil: "তহচিল / ব্লক",

    enterName: "আপোনাৰ সম্পূৰ্ণ নাম দিয়ক",
    enterPhone: "১০ অংকৰ মোবাইল নম্বৰ",

    selectState: "ৰাজ্য বাছনি কৰক",
    selectDistrict: "জিলা বাছনি কৰক",
    selectTehsil: "তহচিল / ব্লক বাছনি কৰক",

    selectStateFirst: "প্ৰথমে ৰাজ্য বাছনি কৰক",
    selectDistrictFirst: "প্ৰথমে জিলা বাছনি কৰক",

    loadingStates: "ৰাজ্য লোড হৈ আছে...",
    loadingDistricts: "জিলা লোড হৈ আছে...",
    loadingDetails: "তহচিল লোড হৈ আছে...",
    loadingPrabhari: "প্ৰভাৰী লোড হৈ আছে...",

    addMember: "আন এজন সদস্য যোগ কৰক",
    removeMember: "সদস্য আঁতৰাওক",

    districtPrabhari: "জিলা প্ৰভাৰী",
    tehsilPrabhari: "তহচিল প্ৰভাৰী",

    contact: "যোগাযোগ",

    submit: "পঞ্জীয়ন দাখিল কৰক",
    submitting: "দাখিল হৈ আছে...",

    back: "পিছলৈ",
    changeAnswer: "উত্তৰ সলনি কৰক",

    success: "পঞ্জীয়ন সফল",
    successDescription:
      "আপোনাৰ পঞ্জীয়ন সফলভাৱে দাখিল কৰা হৈছে।",

    registeredMembers: "পঞ্জীয়ন কৰা সদস্য",

    thankYou: "ধন্যবাদ",
    noAttendance:
      "আপুনি ৰাজ্যৰ ৰাজধানীৰ প্ৰতিবাদত অংশগ্ৰহণ নকৰাৰ সিদ্ধান্ত লৈছে।",

    requiredName: "অনুগ্ৰহ কৰি নাম দিয়ক।",
    requiredPhone:
      "অনুগ্ৰহ কৰি সঠিক ১০ অংকৰ মোবাইল নম্বৰ দিয়ক।",
    requiredState: "অনুগ্ৰহ কৰি ৰাজ্য বাছনি কৰক।",
    requiredDistrict: "অনুগ্ৰহ কৰি জিলা বাছনি কৰক।",
    requiredTehsil:
      "অনুগ্ৰহ কৰি তহচিল / ব্লক বাছনি কৰক।",

    submitError:
      "পঞ্জীয়ন দাখিল কৰিব পৰা নগ'ল। পুনৰ চেষ্টা কৰক।",

    noPrabhari:
      "এই অঞ্চলৰ বাবে প্ৰভাৰীৰ তথ্য উপলব্ধ নহয়।",
  },

  ur: {
    registration: "رجسٹریشن",
    title: "ریاستی دارالحکومت احتجاج",
    description:
      "اگر آپ اپنے ریاستی دارالحکومت میں ہونے والے احتجاج میں شرکت کرنا چاہتے ہیں تو نیچے اپنی معلومات درج کریں۔",

    language: "زبان",
    chooseLanguage: "زبان منتخب کریں",

    step1: "تصدیق",
    step2: "تفصیلات",

    question:
      "کیا آپ احتجاج کے لیے اپنے ریاستی دارالحکومت جانا چاہتے ہیں؟",

    yes: "ہاں، میں جانا چاہتا ہوں",
    yesDescription:
      "دارالحکومت میں ہونے والے پروگرام کے لیے رجسٹر کریں۔",

    no: "نہیں، میں شرکت نہیں کر سکتا",
    noDescription:
      "میں ریاستی دارالحکومت کے پروگرام میں شرکت نہیں کر سکوں گا۔",

    participantDetails: "شرکت کنندہ کی تفصیلات",
    participantDescription:
      "اپنے ساتھ آنے والے ہر رکن کی تفصیلات درج کریں۔",

    member: "رکن",
    fullName: "پورا نام",
    mobileNumber: "موبائل نمبر",
    state: "ریاست",
    district: "ضلع",
    tehsil: "تحصیل / بلاک",

    enterName: "اپنا پورا نام درج کریں",
    enterPhone: "10 ہندسوں کا موبائل نمبر",

    selectState: "ریاست منتخب کریں",
    selectDistrict: "ضلع منتخب کریں",
    selectTehsil: "تحصیل / بلاک منتخب کریں",

    selectStateFirst: "پہلے ریاست منتخب کریں",
    selectDistrictFirst: "پہلے ضلع منتخب کریں",

    loadingStates: "ریاستیں لوڈ ہو رہی ہیں...",
    loadingDistricts: "اضلاع لوڈ ہو رہے ہیں...",
    loadingDetails: "تحصیلیں لوڈ ہو رہی ہیں...",
    loadingPrabhari: "انچارج لوڈ ہو رہا ہے...",

    addMember: "ایک اور رکن شامل کریں",
    removeMember: "رکن ہٹائیں",

    districtPrabhari: "ضلعی انچارج",
    tehsilPrabhari: "تحصیل انچارج",

    contact: "رابطہ",

    submit: "رجسٹریشن جمع کریں",
    submitting: "جمع ہو رہی ہے...",

    back: "واپس",
    changeAnswer: "جواب تبدیل کریں",

    success: "رجسٹریشن کامیاب",
    successDescription:
      "آپ کی رجسٹریشن کامیابی سے جمع ہو گئی ہے۔",

    registeredMembers: "رجسٹرڈ اراکین",

    thankYou: "شکریہ",
    noAttendance:
      "آپ نے منتخب کیا ہے کہ آپ ریاستی دارالحکومت کے احتجاج میں شرکت نہیں کریں گے۔",

    requiredName: "براہ کرم نام درج کریں۔",
    requiredPhone:
      "براہ کرم درست 10 ہندسوں کا موبائل نمبر درج کریں۔",
    requiredState: "براہ کرم ریاست منتخب کریں۔",
    requiredDistrict: "براہ کرم ضلع منتخب کریں۔",
    requiredTehsil:
      "براہ کرم تحصیل / بلاک منتخب کریں۔",

    submitError:
      "رجسٹریشن جمع نہیں ہو سکی۔ دوبارہ کوشش کریں۔",

    noPrabhari:
      "اس علاقے کے لیے انچارج کی معلومات دستیاب نہیں ہیں۔",
  },
};

/* =========================================================
   CREATE MEMBER
========================================================= */

function createMember() {
  return {
    id:
      typeof crypto !== "undefined"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`,

    name: "",
    phone: "",

    stateId: "",
    stateName: "",

    districtId: "",
    districtName: "",

    tehsilId: "",
    tehsilName: "",

    districts: [],
    tehsils: [],

    districtPrabharis: [],
    selectedTehsilPrabharis: [],
  };
}

/* =========================================================
   SAFE API JSON
========================================================= */

async function getJson(url) {
  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  const text = await response.text();

  let data;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Invalid response from ${url}`);
  }

  if (!response.ok) {
    throw new Error(
      data?.error ||
        data?.message ||
        `Request failed: ${response.status}`
    );
  }

  return data;
}

/* =========================================================
   NORMALIZE API RESPONSE
========================================================= */

function normalizeArray(result) {
  if (Array.isArray(result)) {
    return result;
  }

  if (Array.isArray(result?.data)) {
    return result.data;
  }

  if (Array.isArray(result?.data?.data)) {
    return result.data.data;
  }

  return [];
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function Page() {
  const [language, setLanguage] = useState("hi");
  const [step, setStep] = useState(1);

  const [states, setStates] = useState([]);
  const [members, setMembers] = useState([createMember()]);

  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingDistricts, setLoadingDistricts] = useState({});
  const [loadingDetails, setLoadingDetails] = useState({});
  const [loadingPrabhari, setLoadingPrabhari] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [attendance, setAttendance] = useState(null);
  const [error, setError] = useState("");

  const t =
    TRANSLATIONS[language] &&
    Object.keys(TRANSLATIONS[language]).length > 0
      ? TRANSLATIONS[language]
      : TRANSLATIONS.hi;

  const isRTL = language === "ur";

  /* =======================================================
     SAVE LANGUAGE
  ======================================================= */

  useEffect(() => {
    try {
      const saved = localStorage.getItem("protest-language");

      if (
        saved &&
        TRANSLATIONS[saved] &&
        Object.keys(TRANSLATIONS[saved]).length > 5
      ) {
        setLanguage(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const changeLanguage = (value) => {
    setLanguage(value);

    try {
      localStorage.setItem("protest-language", value);
    } catch {
      // ignore
    }
  };

  /* =======================================================
     LOAD STATES
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const loadStates = async () => {
      try {
        setLoadingStates(true);

        const result = await getJson("/api/states");
        const data = normalizeArray(result);

        if (!cancelled) {
          setStates(data);
        }
      } catch (err) {
        console.error("Failed to load states:", err);

        if (!cancelled) {
          setStates([]);
          setError(err.message || t.submitError);
        }
      } finally {
        if (!cancelled) {
          setLoadingStates(false);
        }
      }
    };

    loadStates();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     UPDATE MEMBER
  ======================================================= */

  const updateMember = (memberId, changes) => {
    setMembers((current) =>
      current.map((member) =>
        member.id === memberId
          ? {
              ...member,
              ...changes,
            }
          : member
      )
    );
  };

  /* =======================================================
     STATE CHANGE
  ======================================================= */

  const handleStateChange = async (memberId, stateId) => {
    const state = states.find(
      (item) => String(item.id) === String(stateId)
    );

    updateMember(memberId, {
      stateId: state?.id || "",
      stateName: state?.name || "",

      districtId: "",
      districtName: "",

      tehsilId: "",
      tehsilName: "",

      districts: [],
      tehsils: [],

      districtPrabharis: [],
      selectedTehsilPrabharis: [],
    });

    if (!stateId) {
      return;
    }

    setLoadingDistricts((current) => ({
      ...current,
      [memberId]: true,
    }));

    try {
      const result = await getJson(
        `/api/districts?stateId=${encodeURIComponent(stateId)}`
      );

      const districts = normalizeArray(result);

      updateMember(memberId, {
        districts,
      });
    } catch (err) {
      console.error("District API error:", err);

      updateMember(memberId, {
        districts: [],
      });

      setError(err.message || t.submitError);
    } finally {
      setLoadingDistricts((current) => ({
        ...current,
        [memberId]: false,
      }));
    }
  };

  /* =======================================================
     LOAD DISTRICT PRABHARI
  ======================================================= */

  const loadDistrictPrabhari = async (
    memberId,
    stateId,
    districtId
  ) => {
    if (!stateId || !districtId) {
      return;
    }

    setLoadingPrabhari((current) => ({
      ...current,
      [`district-${memberId}`]: true,
    }));

    try {
      const params = new URLSearchParams();

      params.set("level", "DISTRICT");
      params.set("stateId", stateId);
      params.set("districtId", districtId);
      params.set("page", "1");
      params.set("limit", "50");

      const result = await getJson(
        `/api/prabharis?${params.toString()}`
      );

      const data = normalizeArray(result);

      updateMember(memberId, {
        districtPrabharis: data,
      });
    } catch (err) {
      console.error("District Prabhari API error:", err);

      updateMember(memberId, {
        districtPrabharis: [],
      });
    } finally {
      setLoadingPrabhari((current) => ({
        ...current,
        [`district-${memberId}`]: false,
      }));
    }
  };

  /* =======================================================
     LOAD TEHSILS
  ======================================================= */

  const loadTehsils = async (memberId, districtId) => {
    if (!districtId) {
      return;
    }

    setLoadingDetails((current) => ({
      ...current,
      [memberId]: true,
    }));

    try {
      const result = await getJson(
        `/api/tehsils?districtId=${encodeURIComponent(
          districtId
        )}`
      );

      const tehsils = normalizeArray(result);

      updateMember(memberId, {
        tehsils,
      });
    } catch (err) {
      console.error("Tehsil API error:", err);

      updateMember(memberId, {
        tehsils: [],
      });

      setError(err.message || t.submitError);
    } finally {
      setLoadingDetails((current) => ({
        ...current,
        [memberId]: false,
      }));
    }
  };

  /* =======================================================
     LOAD TEHSIL PRABHARI
  ======================================================= */

  const loadTehsilPrabhari = async (
    memberId,
    stateId,
    districtId,
    tehsilId
  ) => {
    if (!stateId || !districtId || !tehsilId) {
      return;
    }

    setLoadingPrabhari((current) => ({
      ...current,
      [`tehsil-${memberId}`]: true,
    }));

    try {
      const params = new URLSearchParams();

      params.set("level", "TEHSIL");
      params.set("stateId", stateId);
      params.set("districtId", districtId);
      params.set("tehsilId", tehsilId);
      params.set("page", "1");
      params.set("limit", "50");

      const result = await getJson(
        `/api/prabharis?${params.toString()}`
      );

      const data = normalizeArray(result);

      updateMember(memberId, {
        selectedTehsilPrabharis: data,
      });
    } catch (err) {
      console.error("Tehsil Prabhari API error:", err);

      updateMember(memberId, {
        selectedTehsilPrabharis: [],
      });
    } finally {
      setLoadingPrabhari((current) => ({
        ...current,
        [`tehsil-${memberId}`]: false,
      }));
    }
  };

  /* =======================================================
     DISTRICT CHANGE
  ======================================================= */

  const handleDistrictChange = async (
    memberId,
    districtId
  ) => {
    const member = members.find(
      (item) => item.id === memberId
    );

    const district = member?.districts?.find(
      (item) =>
        String(item.id) === String(districtId)
    );

    updateMember(memberId, {
      districtId: district?.id || "",
      districtName: district?.name || "",

      tehsilId: "",
      tehsilName: "",

      tehsils: [],
      selectedTehsilPrabharis: [],
      districtPrabharis: [],
    });

    if (!districtId) {
      return;
    }

    await Promise.all([
      loadTehsils(memberId, districtId),
      loadDistrictPrabhari(
        memberId,
        member?.stateId,
        districtId
      ),
    ]);
  };

  /* =======================================================
     TEHSIL CHANGE
  ======================================================= */

  const handleTehsilChange = async (
    memberId,
    tehsilId
  ) => {
    const member = members.find(
      (item) => item.id === memberId
    );

    const tehsil = member?.tehsils?.find(
      (item) =>
        String(item.id) === String(tehsilId)
    );

    updateMember(memberId, {
      tehsilId: tehsil?.id || "",
      tehsilName: tehsil?.name || "",
      selectedTehsilPrabharis: [],
    });

    if (!tehsilId) {
      return;
    }

    await loadTehsilPrabhari(
      memberId,
      member?.stateId,
      member?.districtId,
      tehsilId
    );
  };

  /* =======================================================
     ADD MEMBER
  ======================================================= */

  const addMember = () => {
    setMembers((current) => [
      ...current,
      createMember(),
    ]);
  };

  /* =======================================================
     REMOVE MEMBER
  ======================================================= */

  const removeMember = (memberId) => {
    setMembers((current) =>
      current.filter(
        (member) => member.id !== memberId
      )
    );
  };

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateMembers = () => {
    for (const member of members) {
      if (!member.name.trim()) {
        return t.requiredName;
      }

      if (!/^\d{10}$/.test(member.phone)) {
        return t.requiredPhone;
      }

      if (!member.stateId) {
        return t.requiredState;
      }

      if (!member.districtId) {
        return t.requiredDistrict;
      }

      if (!member.tehsilId) {
        return t.requiredTehsil;
      }
    }

    return "";
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const validationError =
      validateMembers();

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        language,

        wantsToAttendCapital: true,

        members: members.map((member) => ({
          name: member.name.trim(),
          phone: member.phone,
          stateId: member.stateId,
          districtId: member.districtId,
          tehsilId: member.tehsilId,
        })),
      };

      const response = await fetch(
        "/api/protest-registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            data?.message ||
            t.submitError
        );
      }

      setSubmitted(true);
    } catch (err) {
      console.error(
        "Registration submit error:",
        err
      );

      setError(
        err.message ||
          t.submitError
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =======================================================
     ATTENDANCE
  ======================================================= */

  const chooseNo = () => {
    setAttendance(false);
    setStep(2);
  };

  const chooseYes = () => {
    setAttendance(true);
    setStep(2);
  };

  /* =======================================================
     SUCCESS SCREEN
  ======================================================= */

  if (submitted) {
    return (
      <main
        dir={isRTL ? "rtl" : "ltr"}
        className="min-h-screen bg-[#fffaf0] px-3 py-8 sm:px-5 sm:py-12"
      >
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-[2rem] border border-green-100 bg-white shadow-[0_20px_60px_rgba(22,101,52,0.12)]">

            <div className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 px-6 py-10 text-center text-white sm:px-10">

              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/15 ring-8 ring-white/10 backdrop-blur">
                <CheckCircle2 size={46} />
              </div>

              <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-200">
                {t.registration}
              </p>

              <h1 className="text-3xl font-black sm:text-4xl">
                {t.success}
              </h1>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-green-50 sm:text-base">
                {t.successDescription}
              </p>
            </div>

            <div className="p-5 sm:p-8">

              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <Users size={20} />
                </div>

                <h2 className="text-lg font-extrabold text-stone-900">
                  {t.registeredMembers}
                </h2>
              </div>

              <div className="space-y-3">
                {members.map(
                  (member, index) => (
                    <div
                      key={member.id}
                      className="rounded-2xl border border-stone-200 bg-[#fffdf8] p-4"
                    >
                      <div className="flex items-start gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 font-black text-green-800">
                          {index + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-stone-900">
                            {member.name}
                          </p>

                          <p className="mt-1 text-sm font-medium text-green-700">
                            {member.phone}
                          </p>

                          <p className="mt-2 break-words text-sm text-stone-500">
                            {[
                              member.stateName,
                              member.districtName,
                              member.tehsilName,
                            ]
                              .filter(Boolean)
                              .join(" • ")}
                          </p>
                        </div>

                      </div>
                    </div>
                  )
                )}
              </div>

            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     MAIN UI
  ======================================================= */

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(220,252,231,0.8),_transparent_35%),linear-gradient(180deg,#fffdf8_0%,#f7f8f2_55%,#fffaf0_100%)] px-3 py-4 sm:px-5 sm:py-8"
    >
      <div className="mx-auto max-w-5xl">

        {/* =================================================
            TOP BAR
        ================================================= */}

        <div className="mb-5 flex items-center justify-between gap-3 sm:mb-7">

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-800 sm:text-sm">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100 text-green-700">
              <Globe2 size={18} />
            </div>

            <span className="hidden sm:inline">
              {t.language}
            </span>

          </div>

          <div className="relative min-w-0">

            <select
              value={language}
              onChange={(event) =>
                changeLanguage(
                  event.target.value
                )
              }
              aria-label={
                t.chooseLanguage
              }
              className="h-11 max-w-[170px] appearance-none rounded-xl border border-green-200 bg-white px-3 pr-9 text-sm font-bold text-stone-800 shadow-sm outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100 sm:max-w-none sm:px-4 sm:pr-10"
            >
              {LANGUAGES.map(
                (lang) => (
                  <option
                    key={lang.code}
                    value={lang.code}
                  >
                    {lang.native} —{" "}
                    {lang.english}
                  </option>
                )
              )}
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-green-700"
            />

          </div>

        </div>

        {/* =================================================
            HERO
        ================================================= */}

        <section className="relative mb-7 overflow-hidden rounded-[2rem] border border-green-100 bg-white shadow-[0_18px_55px_rgba(22,101,52,0.10)] sm:mb-8">

          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-amber-100/60 blur-3xl" />

          <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-green-100/70 blur-3xl" />

          <div className="relative px-5 py-8 text-center sm:px-10 sm:py-10">

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-800 text-white shadow-lg shadow-green-900/15 ring-4 ring-green-100 sm:h-20 sm:w-20">
              <span className="text-3xl sm:text-4xl">
                🐄
              </span>
            </div>

            <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-700 sm:text-sm">
              {t.registration}
            </p>

            <h1 className="mx-auto mt-2 max-w-3xl text-3xl font-black leading-tight tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
              {t.title}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base sm:leading-7">
              {t.description}
            </p>

          </div>

          <div className="h-1.5 bg-gradient-to-r from-green-800 via-amber-500 to-green-700" />

        </section>

        {/* =================================================
            PROGRESS
        ================================================= */}

        <div className="mb-7 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:mb-8 sm:p-5">

          <div className="mx-auto flex max-w-md items-center">

            <div className="flex min-w-0 items-center gap-2">

              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                  step >= 1
                    ? "bg-green-700 text-white shadow-md shadow-green-700/20"
                    : "bg-stone-200 text-stone-500"
                }`}
              >
                {step > 1 ? (
                  <Check size={18} />
                ) : (
                  "1"
                )}
              </div>

              <span
                className={`hidden text-sm font-bold sm:block ${
                  step >= 1
                    ? "text-green-800"
                    : "text-stone-400"
                }`}
              >
                {t.step1}
              </span>

            </div>

            <div
              className={`mx-3 h-1 flex-1 rounded-full sm:mx-4 ${
                step >= 2
                  ? "bg-green-600"
                  : "bg-stone-200"
              }`}
            />

            <div className="flex min-w-0 items-center gap-2">

              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                  step >= 2
                    ? "bg-green-700 text-white shadow-md shadow-green-700/20"
                    : "bg-stone-200 text-stone-500"
                }`}
              >
                2
              </div>

              <span
                className={`hidden text-sm font-bold sm:block ${
                  step >= 2
                    ? "text-green-800"
                    : "text-stone-400"
                }`}
              >
                {t.step2}
              </span>

            </div>

          </div>

        </div>

        {/* =================================================
            STEP 1
        ================================================= */}

        {step === 1 && (
          <section className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_18px_55px_rgba(28,25,23,0.08)]">

            <div className="p-5 sm:p-8 md:p-10">

              <div className="mx-auto max-w-2xl text-center">

                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                  <MapPin size={27} />
                </div>

                <h2 className="text-2xl font-black leading-tight text-stone-900 sm:text-3xl">
                  {t.question}
                </h2>

                <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-amber-500" />

              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">

                {/* YES */}

                <button
                  type="button"
                  onClick={chooseYes}
                  className="group relative rounded-2xl border-2 border-green-100 bg-green-50/60 p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-green-500 hover:bg-green-50 hover:shadow-lg active:scale-[0.99] sm:p-6"
                >

                  <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-700 text-white shadow-md">
                      <Check size={24} />
                    </div>

                    <div className="min-w-0 flex-1">

                      <h3 className="text-lg font-black text-stone-900">
                        {t.yes}
                      </h3>

                      <p className="mt-1 text-sm leading-5 text-stone-600">
                        {t.yesDescription}
                      </p>

                    </div>

                    <ArrowRight
                      size={20}
                      className="mt-1 shrink-0 text-green-400 transition group-hover:translate-x-1 group-hover:text-green-700"
                    />

                  </div>

                </button>

                {/* NO */}

                <button
                  type="button"
                  onClick={chooseNo}
                  className="group relative rounded-2xl border-2 border-stone-200 bg-stone-50 p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-400 hover:bg-white hover:shadow-lg active:scale-[0.99] sm:p-6"
                >

                  <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-stone-200 text-stone-600">
                      <X size={24} />
                    </div>

                    <div className="min-w-0 flex-1">

                      <h3 className="text-lg font-black text-stone-900">
                        {t.no}
                      </h3>

                      <p className="mt-1 text-sm leading-5 text-stone-600">
                        {t.noDescription}
                      </p>

                    </div>

                    <ArrowRight
                      size={20}
                      className="mt-1 shrink-0 text-stone-300 transition group-hover:translate-x-1 group-hover:text-stone-600"
                    />

                  </div>

                </button>

              </div>

            </div>

          </section>
        )}

        {/* =================================================
            STEP 2 - NO
        ================================================= */}

        {step === 2 &&
          attendance === false && (
            <section className="rounded-[2rem] border border-stone-200 bg-white p-6 text-center shadow-[0_18px_55px_rgba(28,25,23,0.08)] sm:p-10 md:p-12">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-600">
                <Check size={31} />
              </div>

              <h2 className="mt-5 text-2xl font-black text-stone-900">
                {t.thankYou}
              </h2>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-stone-600 sm:text-base">
                {t.noAttendance}
              </p>

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setAttendance(null);
                }}
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-stone-100 px-5 font-bold text-stone-700 transition hover:bg-stone-200 active:scale-[0.98]"
              >
                <ArrowLeft size={18} />
                {t.changeAnswer}
              </button>

            </section>
          )}

        {/* =================================================
            STEP 2 - YES
        ================================================= */}

        {step === 2 &&
          attendance === true && (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 sm:space-y-6"
            >

              {/* PARTICIPANT HEADER */}

              <section className="overflow-hidden rounded-[2rem] border border-green-100 bg-white shadow-[0_18px_55px_rgba(22,101,52,0.09)]">

                <div className="border-b border-green-100 bg-green-50/70 px-5 py-6 sm:px-7 sm:py-7">

                  <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-700 text-white shadow-md">
                      <Users size={24} />
                    </div>

                    <div className="min-w-0">

                      <h2 className="text-2xl font-black text-stone-900">
                        {t.participantDetails}
                      </h2>

                      <p className="mt-1 text-sm leading-6 text-stone-600">
                        {t.participantDescription}
                      </p>

                    </div>

                  </div>

                </div>

              </section>

              {/* ERROR */}

              {error && (
                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-red-800 shadow-sm">

                  <X
                    size={20}
                    className="mt-0.5 shrink-0"
                  />

                  <p className="text-sm font-semibold leading-5">
                    {error}
                  </p>

                </div>
              )}

              {/* MEMBERS */}

              {members.map(
                (member, index) => (
                  <section
                    key={member.id}
                    className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_16px_45px_rgba(28,25,23,0.07)]"
                  >

                    {/* MEMBER HEADER */}

                    <div className="flex items-center justify-between gap-3 border-b border-stone-200 bg-[#fffaf0] px-4 py-4 sm:px-6">

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-700 text-sm font-black text-white">
                          {index + 1}
                        </div>

                        <div className="min-w-0">

                          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                            {t.member}
                          </p>

                          <h3 className="truncate text-base font-black text-stone-900">
                            {t.member} {index + 1}
                          </h3>

                        </div>

                      </div>

                      {members.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeMember(
                              member.id
                            )
                          }
                          aria-label={
                            t.removeMember
                          }
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100 sm:h-auto sm:w-auto sm:gap-2 sm:px-3 sm:py-2 sm:text-sm sm:font-bold"
                        >
                          <Trash2 size={17} />

                          <span className="hidden sm:inline">
                            {t.removeMember}
                          </span>
                        </button>
                      )}

                    </div>

                    <div className="p-4 sm:p-6">

                      {/* BASIC DETAILS */}

                      <div className="grid gap-4 md:grid-cols-2">

                        <Field
                          label={t.fullName}
                          icon={<User size={18} />}
                        >
                          <input
                            type="text"
                            value={member.name}
                            onChange={(event) =>
                              updateMember(
                                member.id,
                                {
                                  name:
                                    event.target
                                      .value,
                                }
                              )
                            }
                            placeholder={
                              t.enterName
                            }
                            className={inputClass}
                          />
                        </Field>

                        <Field
                          label={
                            t.mobileNumber
                          }
                          icon={<Phone size={18} />}
                        >
                          <input
                            type="tel"
                            inputMode="numeric"
                            autoComplete="tel"
                            maxLength={10}
                            value={member.phone}
                            onChange={(event) =>
                              updateMember(
                                member.id,
                                {
                                  phone:
                                    event.target.value.replace(
                                      /\D/g,
                                      ""
                                    ),
                                }
                              )
                            }
                            placeholder={
                              t.enterPhone
                            }
                            className={inputClass}
                          />
                        </Field>

                      </div>

                      {/* LOCATION */}

                      <div className="mt-5 grid gap-4 md:grid-cols-3">

                        <LocationSelect
                          label={t.state}
                          value={
                            member.stateId
                          }
                          disabled={
                            loadingStates
                          }
                          loading={
                            loadingStates
                          }
                          placeholder={
                            loadingStates
                              ? t.loadingStates
                              : t.selectState
                          }
                          options={states}
                          onChange={(value) =>
                            handleStateChange(
                              member.id,
                              value
                            )
                          }
                        />

                        <LocationSelect
                          label={
                            t.district
                          }
                          value={
                            member.districtId
                          }
                          disabled={
                            !member.stateId ||
                            loadingDistricts[
                              member.id
                            ]
                          }
                          loading={
                            loadingDistricts[
                              member.id
                            ]
                          }
                          placeholder={
                            !member.stateId
                              ? t.selectStateFirst
                              : loadingDistricts[
                                  member.id
                                ]
                              ? t.loadingDistricts
                              : t.selectDistrict
                          }
                          options={
                            member.districts
                          }
                          onChange={(value) =>
                            handleDistrictChange(
                              member.id,
                              value
                            )
                          }
                        />

                        <LocationSelect
                          label={t.tehsil}
                          value={
                            member.tehsilId
                          }
                          disabled={
                            !member.districtId ||
                            loadingDetails[
                              member.id
                            ]
                          }
                          loading={
                            loadingDetails[
                              member.id
                            ]
                          }
                          placeholder={
                            !member.districtId
                              ? t.selectDistrictFirst
                              : loadingDetails[
                                  member.id
                                ]
                              ? t.loadingDetails
                              : t.selectTehsil
                          }
                          options={
                            member.tehsils
                          }
                          onChange={(value) =>
                            handleTehsilChange(
                              member.id,
                              value
                            )
                          }
                        />

                      </div>

                      {/* DISTRICT PRABHARI */}

                      {member.districtId && (
                        <PrabhariSection
                          title={
                            t.districtPrabhari
                          }
                          tone="green"
                          loading={
                            loadingPrabhari[
                              `district-${member.id}`
                            ]
                          }
                          people={
                            member.districtPrabharis
                          }
                          t={t}
                        />
                      )}

                      {/* TEHSIL PRABHARI */}

                      {member.tehsilId && (
                        <PrabhariSection
                          title={
                            t.tehsilPrabhari
                          }
                          tone="amber"
                          loading={
                            loadingPrabhari[
                              `tehsil-${member.id}`
                            ]
                          }
                          people={
                            member.selectedTehsilPrabharis
                          }
                          t={t}
                        />
                      )}

                    </div>

                  </section>
                )
              )}

              {/* ADD MEMBER */}

              <button
                type="button"
                onClick={addMember}
                className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-green-300 bg-green-50/60 px-5 font-black text-green-800 transition hover:border-green-500 hover:bg-green-50 active:scale-[0.99]"
              >
                <Plus size={20} />
                {t.addMember}
              </button>

              {/* ACTIONS */}

              <div className="sticky bottom-2 z-20 rounded-2xl border border-stone-200 bg-white/95 p-3 shadow-[0_12px_40px_rgba(28,25,23,0.15)] backdrop-blur sm:static sm:p-4">

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">

                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setAttendance(null);
                    }}
                    disabled={isSubmitting}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-stone-100 px-5 font-bold text-stone-700 transition hover:bg-stone-200 disabled:opacity-50"
                  >
                    <ArrowLeft size={18} />
                    {t.back}
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-700 px-6 font-black text-white shadow-lg shadow-green-900/20 transition hover:bg-green-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[230px]"
                  >

                    {isSubmitting ? (
                      <>
                        <Loader2
                          size={19}
                          className="animate-spin"
                        />

                        {t.submitting}
                      </>
                    ) : (
                      <>
                        <Check size={19} />
                        {t.submit}
                      </>
                    )}

                  </button>

                </div>

              </div>

            </form>
          )}

      </div>
    </main>
  );
}

/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  icon,
  children,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-extrabold text-stone-700">
        {label}
      </label>

      <div className="relative">

        <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-green-700">
          {icon}
        </span>

        {React.cloneElement(
          children,
          {
            className: `${inputClass} pl-11`,
          }
        )}

      </div>

    </div>
  );
}

/* =========================================================
   LOCATION SELECT
========================================================= */

function LocationSelect({
  label,
  value,
  disabled,
  loading,
  placeholder,
  options = [],
  onChange,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-extrabold text-stone-700">
        {label}
      </label>

      <div className="relative">

        <MapPin
          size={17}
          className={`pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 ${
            disabled
              ? "text-stone-400"
              : "text-green-700"
          }`}
        />

        <select
          value={value}
          disabled={disabled}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          className={`${selectClass} pl-11 pr-11`}
        >

          <option value="">
            {placeholder}
          </option>

          {options.map(
            (item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>
            )
          )}

        </select>

        {loading ? (
          <Loader2
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-green-700"
          />
        ) : (
          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400"
          />
        )}

      </div>

    </div>
  );
}

/* =========================================================
   PRABHARI SECTION
========================================================= */

function PrabhariSection({
  title,
  tone,
  loading,
  people = [],
  t,
}) {
  const green = tone === "green";

  return (
    <div
      className={`mt-5 overflow-hidden rounded-2xl border ${
        green
          ? "border-green-200 bg-green-50/60"
          : "border-amber-200 bg-amber-50/60"
      }`}
    >

      <div
        className={`flex items-center gap-2 border-b px-4 py-3 ${
          green
            ? "border-green-200"
            : "border-amber-200"
        }`}
      >

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            green
              ? "bg-green-700 text-white"
              : "bg-amber-500 text-white"
          }`}
        >
          <MapPin size={16} />
        </div>

        <h4
          className={`font-black ${
            green
              ? "text-green-900"
              : "text-amber-900"
          }`}
        >
          {title}
        </h4>

      </div>

      <div className="p-4">

        {loading ? (
          <div
            className={`flex items-center gap-2 text-sm font-semibold ${
              green
                ? "text-green-700"
                : "text-amber-700"
            }`}
          >

            <Loader2
              size={17}
              className="animate-spin"
            />

            {t.loadingPrabhari}

          </div>
        ) : people.length > 0 ? (

          <div className="grid gap-3 md:grid-cols-2">

            {people.map(
              (person) => (
                <PrabhariCard
                  key={person.id}
                  person={person}
                  t={t}
                />
              )
            )}

          </div>

        ) : (

          <p
            className={`text-sm ${
              green
                ? "text-green-800"
                : "text-amber-800"
            }`}
          >
            {t.noPrabhari}
          </p>

        )}

      </div>

    </div>
  );
}

/* =========================================================
   PRABHARI CARD
========================================================= */

function PrabhariCard({
  person,
  t,
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start gap-3">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800 ring-4 ring-green-50">
          <User size={19} />
        </div>

        <div className="min-w-0 flex-1">

          <p className="font-black text-stone-900">
            {person.name || "—"}
          </p>

          {person.phone && (
            <a
              href={`tel:${person.phone}`}
              className="mt-2 flex min-h-9 items-center gap-2 rounded-lg text-sm font-bold text-green-700 hover:text-green-900"
            >
              <Phone size={14} />
              <span>
                {person.phone}
              </span>
            </a>
          )}

          {person.email && (
            <a
              href={`mailto:${person.email}`}
              className="mt-1 block break-all text-xs text-stone-500 hover:text-green-700"
            >
              {person.email}
            </a>
          )}

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   SHARED UI CLASSES
========================================================= */

const inputClass =
  "w-full rounded-xl border-2 border-stone-200 bg-white py-3.5 pr-4 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-green-600 focus:ring-4 focus:ring-green-100 disabled:bg-stone-100 disabled:text-stone-400 sm:text-sm";

const selectClass =
  "h-14 w-full appearance-none rounded-xl border-2 border-stone-200 bg-white text-base font-semibold text-stone-800 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400 sm:text-sm";