"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Globe2,
  Home,
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
    title: "17 दिसंबर-चलो राज्य की राजधानी",
    description:
      "गौ सम्मान आह्वान अभियान – तृतीय चरण 31 करोड़ हस्ताक्षर -  17 दिसंबर गौ सम्मान आह्वान अभियान के तृतीय चरण में 31 करोड़ हस्ताक्षरों के साथ 17 दिसंबर को भारत के सभी राज्यों की राजधानियों में प्रार्थना पत्र प्रस्तुत किया जाएगा।आपकी उपस्थिति दर्ज करवा कर इस राष्ट्रव्यापी अभियान का हिस्सा बनें।",
    language: "भाषा",
    chooseLanguage: "भाषा चुनें",
    step1: "पुष्टि",
    step2: "विवरण",
    question:
      "क्या आप अपने राज्य की राजधानी में विरोध प्रदर्शन के लिए जाना चाहते हैं?",
    yes: "हाँ, मैं जाना चाहता हूँ",
    yesDescription:
      "क्या आप अपने राज्य की राजधानी में 17 दिसंबर को प्रार्थना पत्र देने के लिए शामिल होना चाहते है",
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
    village: "गाँव",
    enterVillage: "अपने गाँव का नाम दर्ज करें",
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
    requiredVillage: "कृपया अपने गाँव का नाम दर्ज करें।",
    submitError:
      "पंजीकरण जमा नहीं हो पाया। कृपया दोबारा प्रयास करें।",
    noPrabhari:
      "इस क्षेत्र के लिए प्रभारी की जानकारी उपलब्ध नहीं है।",
    additionalMemberNote:
      "इस सदस्य के लिए केवल नाम और मोबाइल नंबर दर्ज करें। स्थान की जानकारी पहले सदस्य से ली जाएगी।",
    goHome: "होम पेज पर जाएँ",
  },

  en: {
    registration: "Registration",
    title: "17 December – Let’s Go to the State Capital",
    description:
      "Gau Samman Aahvan Abhiyan – Third Phase: 31 Crore Signatures. On 17 December, as part of the third phase of the Gau Samman Aahvan Abhiyan, a petition will be submitted in the capitals of all states of India with 31 crore signatures. Register your presence and become a part of this nationwide campaign.",
    language: "Language",
    chooseLanguage: "Choose language",
    step1: "Confirm",
    step2: "Details",
    question:
      "Do you want to go to your state capital for the protest?",
    yes: "Yes, I want to go",
    yesDescription:
      "Do you want to join in submitting the petition in your state capital on 17 December?",
    no: "No, I cannot go",
    noDescription:
      "I will not be able to attend the state capital program.",
    participantDetails: "Participant Details",
    participantDescription:
      "Enter the details of everyone who will be attending with you.",
    member: "Member",
    fullName: "Full Name",
    mobileNumber: "Mobile Number",
    state: "State",
    district: "District",
    tehsil: "Tehsil / Block",
    village: "Village",
    enterVillage: "Enter village name",
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
    requiredTehsil: "Please select a tehsil / block.",
    requiredVillage: "Please enter your village name.",
    submitError:
      "Registration could not be submitted. Please try again.",
    noPrabhari:
      "District in-charge information is not available.",
    additionalMemberNote:
      "For this member, enter only name and mobile number. Location will be taken from the first member.",
    goHome: "Go to Home",
  },

  bn: {
    registration: "নিবন্ধন",
    title: "১৭ ডিসেম্বর – চলুন রাজ্যের রাজধানীতে যাই",
    description:
      "গৌ সম্মান আহ্বান অভিযান – তৃতীয় পর্যায়: ৩১ কোটি স্বাক্ষর। ১৭ ডিসেম্বর, গৌ সম্মান আহ্বান অভিযানের তৃতীয় পর্যায়ে ৩১ কোটি স্বাক্ষরসহ ভারতের সমস্ত রাজ্যের রাজধানীতে আবেদনপত্র জমা দেওয়া হবে। আপনার উপস্থিতি নথিভুক্ত করে এই দেশব্যাপী অভিযানের অংশ হন।",
    language: "ভাষা",
    chooseLanguage: "ভাষা নির্বাচন করুন",
    step1: "নিশ্চিত করুন",
    step2: "বিবরণ",
    question:
      "আপনি কি প্রতিবাদের জন্য আপনার রাজ্যের রাজধানীতে যেতে চান?",
    yes: "হ্যাঁ, আমি যেতে চাই",
    yesDescription:
      "আপনি কি ১৭ ডিসেম্বর আপনার রাজ্যের রাজধানীতে আবেদনপত্র জমা দেওয়ার কর্মসূচিতে যোগ দিতে চান?",
    no: "না, আমি যেতে পারব না",
    noDescription:
      "আমি রাজ্যের রাজধানীর কর্মসূচিতে যোগ দিতে পারব না।",
    participantDetails: "অংশগ্রহণকারীর বিবরণ",
    participantDescription:
      "আপনার সঙ্গে আসা প্রত্যেক সদস্যের তথ্য দিন।",
    member: "সদস্য",
    fullName: "পুরো নাম",
    mobileNumber: "মোবাইল নম্বর",
    state: "রাজ্য",
    district: "জেলা",
    tehsil: "তহসিল / ব্লক",
    village: "গ্রাম",
    enterVillage: "গ্রামের নাম লিখুন",
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
    contact: "যোগাযোগ",
    submit: "নিবন্ধন জমা দিন",
    submitting: "জমা হচ্ছে...",
    back: "পিছনে",
    changeAnswer: "উত্তর পরিবর্তন করুন",
    success: "নিবন্ধন সফল",
    successDescription: "আপনার নিবন্ধন সফলভাবে জমা হয়েছে।",
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
    requiredVillage: "অনুগ্রহ করে গ্রামের নাম লিখুন।",
    submitError:
      "নিবন্ধন জমা দেওয়া যায়নি। আবার চেষ্টা করুন।",
    noPrabhari: "জেলা প্রভারির তথ্য পাওয়া যায়নি।",
    additionalMemberNote:
      "এই সদস্যের জন্য শুধু নাম ও মোবাইল নম্বর দিন। অবস্থানের তথ্য প্রথম সদস্যের থেকে নেওয়া হবে।",
    goHome: "হোম পেজে যান",
  },

  mr: {
    registration: "नोंदणी",
    title: "१७ डिसेंबर – चला राज्याच्या राजधानीत",
    description:
      "गौ सन्मान आह्वान अभियान – तिसरा टप्पा: ३१ कोटी स्वाक्षऱ्या. १७ डिसेंबर रोजी गौ सन्मान आह्वान अभियानाच्या तिसऱ्या टप्प्यात ३१ कोटी स्वाक्षऱ्यांसह भारतातील सर्व राज्यांच्या राजधानीत निवेदन सादर केले जाईल. आपली उपस्थिती नोंदवून या राष्ट्रव्यापी अभियानाचा भाग बना.",
    language: "भाषा",
    chooseLanguage: "भाषा निवडा",
    step1: "पुष्टी",
    step2: "तपशील",
    question:
      "तुम्हाला तुमच्या राज्याच्या राजधानीत आंदोलनासाठी जायचे आहे का?",
    yes: "होय, मला जायचे आहे",
    yesDescription:
      "तुम्हाला १७ डिसेंबर रोजी तुमच्या राज्याच्या राजधानीत निवेदन सादर करण्यासाठी सहभागी व्हायचे आहे का?",
    no: "नाही, मला जाता येणार नाही",
    noDescription:
      "मी राज्याच्या राजधानीतील कार्यक्रमाला उपस्थित राहू शकणार नाही.",
    participantDetails: "सहभागीचा तपशील",
    participantDescription:
      "तुमच्यासोबत येणाऱ्या प्रत्येक सदस्याचा तपशील भरा.",
    member: "सदस्य",
    fullName: "पूर्ण नाव",
    mobileNumber: "मोबाईल नंबर",
    state: "राज्य",
    district: "जिल्हा",
    tehsil: "तहसील / ब्लॉक",
    village: "गाव",
    enterVillage: "तुमच्या गावाचे नाव लिहा",
    enterName: "तुमचे पूर्ण नाव लिहा",
    enterPhone: "१० अंकी मोबाईल नंबर",
    selectState: "राज्य निवडा",
    selectDistrict: "जिल्हा निवडा",
    selectTehsil: "तहसील / ब्लॉक निवडा",
    selectStateFirst: "प्रथम राज्य निवडा",
    selectDistrictFirst: "प्रथम जिल्हा निवडा",
    loadingStates: "राज्य लोड होत आहेत...",
    loadingDistricts: "जिल्हे लोड होत आहेत...",
    loadingDetails: "तहसील लोड होत आहेत...",
    loadingPrabhari: "प्रभारीची माहिती लोड होत आहे...",
    addMember: "आणखी सदस्य जोडा",
    removeMember: "सदस्य हटवा",
    districtPrabhari: "जिल्हा प्रभारी",
    contact: "संपर्क",
    submit: "नोंदणी जमा करा",
    submitting: "जमा होत आहे...",
    back: "मागे",
    changeAnswer: "उत्तर बदला",
    success: "नोंदणी यशस्वी",
    successDescription:
      "तुमची नोंदणी यशस्वीरित्या जमा झाली आहे.",
    registeredMembers: "नोंदणीकृत सदस्य",
    thankYou: "धन्यवाद",
    noAttendance:
      "तुम्ही राज्याच्या राजधानीतील आंदोलनात सहभागी होणार नसल्याचे निवडले आहे.",
    requiredName: "कृपया नाव लिहा.",
    requiredPhone:
      "कृपया योग्य १० अंकी मोबाईल नंबर लिहा.",
    requiredState: "कृपया राज्य निवडा.",
    requiredDistrict: "कृपया जिल्हा निवडा.",
    requiredTehsil: "कृपया तहसील / ब्लॉक निवडा.",
    requiredVillage: "कृपया गावाचे नाव लिहा.",
    submitError:
      "नोंदणी जमा करता आली नाही. कृपया पुन्हा प्रयत्न करा.",
    noPrabhari:
      "या क्षेत्रासाठी प्रभारीची माहिती उपलब्ध नाही.",
    additionalMemberNote:
      "या सदस्यासाठी फक्त नाव आणि मोबाईल नंबर भरा. स्थानाची माहिती पहिल्या सदस्याकडून घेतली जाईल.",
    goHome: "होम पेजवर जा",
  },

  te: {
    registration: "నమోదు",
    title: "డిసెంబర్ 17 – రాష్ట్ర రాజధానికి వెళ్దాం",
    description:
      "గో సమ్మాన్ ఆహ్వాన్ అభియాన్ – మూడవ దశ: 31 కోట్ల సంతకాలు. డిసెంబర్ 17న గో సమ్మాన్ ఆహ్వాన్ అభియాన్ మూడవ దశలో 31 కోట్ల సంతకాలతో భారతదేశంలోని అన్ని రాష్ట్రాల రాజధానుల్లో వినతిపత్రం సమర్పించబడుతుంది. మీ హాజరును నమోదు చేసుకుని ఈ దేశవ్యాప్త కార్యక్రమంలో భాగస్వాములు అవ్వండి.",
    language: "భాష",
    chooseLanguage: "భాషను ఎంచుకోండి",
    step1: "నిర్ధారించండి",
    step2: "వివరాలు",
    question:
      "మీ రాష్ట్ర రాజధానికి నిరసన కోసం వెళ్లాలనుకుంటున్నారా?",
    yes: "అవును, నేను వెళ్లాలనుకుంటున్నాను",
    yesDescription:
      "డిసెంబర్ 17న మీ రాష్ట్ర రాజధానిలో వినతిపత్రం సమర్పించే కార్యక్రమంలో పాల్గొనాలనుకుంటున్నారా?",
    no: "లేదు, నేను వెళ్లలేను",
    noDescription:
      "నేను రాష్ట్ర రాజధాని కార్యక్రమానికి హాజరు కాలేను.",
    participantDetails: "పాల్గొనేవారి వివరాలు",
    participantDescription:
      "మీతో వచ్చే ప్రతి సభ్యుని వివరాలను నమోదు చేయండి.",
    member: "సభ్యుడు",
    fullName: "పూర్తి పేరు",
    mobileNumber: "మొబైల్ నంబర్",
    state: "రాష్ట్రం",
    district: "జిల్లా",
    tehsil: "తహసీల్ / బ్లాక్",
    village: "గ్రామం",
    enterVillage: "మీ గ్రామం పేరు నమోదు చేయండి",
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
    loadingPrabhari: "ప్రభారి సమాచారం లోడ్ అవుతోంది...",
    addMember: "మరో సభ్యుడిని జోడించండి",
    removeMember: "సభ్యుడిని తొలగించండి",
    districtPrabhari: "జిల్లా ప్రభారి",
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
      "మీరు రాష్ట్ర రాజధాని నిరసన కార్యక్రమంలో పాల్గొనరాదని ఎంచుకున్నారు.",
    requiredName: "దయచేసి పేరు నమోదు చేయండి.",
    requiredPhone:
      "దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి.",
    requiredState: "దయచేసి రాష్ట్రాన్ని ఎంచుకోండి.",
    requiredDistrict: "దయచేసి జిల్లాను ఎంచుకోండి.",
    requiredTehsil:
      "దయచేసి తహసీల్ / బ్లాక్ ఎంచుకోండి.",
    requiredVillage: "దయచేసి మీ గ్రామం పేరు నమోదు చేయండి.",
    submitError:
      "నమోదును సమర్పించలేకపోయాము. దయచేసి మళ్లీ ప్రయత్నించండి.",
    noPrabhari:
      "ఈ ప్రాంతానికి ప్రభారి సమాచారం అందుబాటులో లేదు.",
    additionalMemberNote:
      "ఈ సభ్యునికి పేరు మరియు మొబైల్ నంబర్ మాత్రమే నమోదు చేయండి. స్థాన వివరాలు మొదటి సభ్యుని నుండి తీసుకోబడతాయి.",
    goHome: "హోమ్ పేజీకి వెళ్లండి",
  },

  ta: {
    registration: "பதிவு",
    title: "டிசம்பர் 17 – மாநிலத் தலைநகருக்கு செல்வோம்",
    description:
      "கௌ சம்மான் ஆஹ்வான் அபியான் – மூன்றாம் கட்டம்: 31 கோடி கையெழுத்துகள். டிசம்பர் 17 அன்று கௌ சம்மான் ஆஹ்வான் அபியான் மூன்றாம் கட்டத்தின் கீழ், 31 கோடி கையெழுத்துகளுடன் இந்தியாவின் அனைத்து மாநில தலைநகரங்களிலும் மனு சமர்ப்பிக்கப்படும். உங்கள் வருகையை பதிவு செய்து இந்த நாடு தழுவிய இயக்கத்தின் ஒரு பகுதியாகுங்கள்.",
    language: "மொழி",
    chooseLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
    step1: "உறுதிப்படுத்தவும்",
    step2: "விவரங்கள்",
    question:
      "உங்கள் மாநிலத் தலைநகருக்கு போராட்டத்திற்காக செல்ல விரும்புகிறீர்களா?",
    yes: "ஆம், நான் செல்ல விரும்புகிறேன்",
    yesDescription:
      "டிசம்பர் 17 அன்று உங்கள் மாநிலத் தலைநகரில் மனு சமர்ப்பிக்கும் நிகழ்வில் பங்கேற்க விரும்புகிறீர்களா?",
    no: "இல்லை, என்னால் செல்ல முடியாது",
    noDescription:
      "நான் மாநிலத் தலைநகர் நிகழ்வில் பங்கேற்க முடியாது.",
    participantDetails: "பங்கேற்பாளர் விவரங்கள்",
    participantDescription:
      "உங்களுடன் வருபவர்களின் விவரங்களை உள்ளிடவும்.",
    member: "உறுப்பினர்",
    fullName: "முழு பெயர்",
    mobileNumber: "மொபைல் எண்",
    state: "மாநிலம்",
    district: "மாவட்டம்",
    tehsil: "தாலுகா / தொகுதி",
    village: "கிராமம்",
    enterVillage: "உங்கள் கிராமத்தின் பெயரை உள்ளிடவும்",
    enterName: "உங்கள் முழு பெயரை உள்ளிடவும்",
    enterPhone: "10 இலக்க மொபைல் எண்",
    selectState: "மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
    selectDistrict: "மாவட்டத்தைத் தேர்ந்தெடுக்கவும்",
    selectTehsil: "தாலுகா / தொகுதியைத் தேர்ந்தெடுக்கவும்",
    selectStateFirst: "முதலில் மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
    selectDistrictFirst: "முதலில் மாவட்டத்தைத் தேர்ந்தெடுக்கவும்",
    loadingStates: "மாநிலங்கள் ஏற்றப்படுகின்றன...",
    loadingDistricts: "மாவட்டங்கள் ஏற்றப்படுகின்றன...",
    loadingDetails: "தாலுகாக்கள் ஏற்றப்படுகின்றன...",
    loadingPrabhari: "பொறுப்பாளர் தகவல் ஏற்றப்படுகிறது...",
    addMember: "மற்றொரு உறுப்பினரைச் சேர்க்கவும்",
    removeMember: "உறுப்பினரை அகற்றவும்",
    districtPrabhari: "மாவட்ட பொறுப்பாளர்",
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
      "மாநிலத் தலைநகர் போராட்டத்தில் பங்கேற்க மாட்டேன் என்று நீங்கள் தேர்ந்தெடுத்துள்ளீர்கள்.",
    requiredName: "தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்.",
    requiredPhone:
      "தயவுசெய்து சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.",
    requiredState: "தயவுசெய்து மாநிலத்தைத் தேர்ந்தெடுக்கவும்.",
    requiredDistrict: "தயவுசெய்து மாவட்டத்தைத் தேர்ந்தெடுக்கவும்.",
    requiredTehsil:
      "தயவுசெய்து தாலுகா / தொகுதியைத் தேர்ந்தெடுக்கவும்.",
    requiredVillage:
      "தயவுசெய்து உங்கள் கிராமத்தின் பெயரை உள்ளிடவும்.",
    submitError:
      "பதிவைச் சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
    noPrabhari:
      "இந்தப் பகுதிக்கான பொறுப்பாளர் தகவல் கிடைக்கவில்லை.",
    additionalMemberNote:
      "இந்த உறுப்பினருக்கு பெயர் மற்றும் மொபைல் எண் மட்டும் உள்ளிடவும். இருப்பிடத் தகவல் முதல் உறுப்பினரிடமிருந்து பெறப்படும்.",
    goHome: "முகப்புப் பக்கத்திற்குச் செல்லவும்",
  },

  gu: {
    registration: "નોંધણી",
    title: "17 ડિસેમ્બર – ચાલો રાજ્યની રાજધાનીમાં",
    description:
      "ગૌ સન્માન આહ્વાન અભિયાન – ત્રીજો તબક્કો: 31 કરોડ હસ્તાક્ષર. 17 ડિસેમ્બરે ગૌ સન્માન આહ્વાન અભિયાનના ત્રીજા તબક્કામાં 31 કરોડ હસ્તાક્ષરો સાથે ભારતના તમામ રાજ્યોની રાજધાનીઓમાં અરજીપત્ર રજૂ કરવામાં આવશે. તમારી હાજરી નોંધાવીને આ રાષ્ટ્રવ્યાપી અભિયાનનો ભાગ બનો.",
    language: "ભાષા",
    chooseLanguage: "ભાષા પસંદ કરો",
    step1: "પુષ્ટિ",
    step2: "વિગતો",
    question:
      "શું તમે વિરોધ પ્રદર્શન માટે તમારા રાજ્યની રાજધાનીમાં જવા માંગો છો?",
    yes: "હા, હું જવા માંગું છું",
    yesDescription:
      "શું તમે 17 ડિસેમ્બરે તમારા રાજ્યની રાજધાનીમાં અરજીપત્ર રજૂ કરવાની કામગીરીમાં જોડાવા માંગો છો?",
    no: "ના, હું જઈ શકતો નથી",
    noDescription:
      "હું રાજ્યની રાજધાનીના કાર્યક્રમમાં હાજર રહી શકીશ નહીં.",
    participantDetails: "સહભાગીની વિગતો",
    participantDescription:
      "તમારી સાથે આવનાર દરેક સભ્યની વિગતો દાખલ કરો.",
    member: "સભ્ય",
    fullName: "પૂરું નામ",
    mobileNumber: "મોબાઇલ નંબર",
    state: "રાજ્ય",
    district: "જિલ્લો",
    tehsil: "તહેસીલ / બ્લોક",
    village: "ગામ",
    enterVillage: "તમારા ગામનું નામ દાખલ કરો",
    enterName: "તમારું પૂરું નામ દાખલ કરો",
    enterPhone: "10 અંકનો મોબાઇલ નંબર",
    selectState: "રાજ્ય પસંદ કરો",
    selectDistrict: "જિલ્લો પસંદ કરો",
    selectTehsil: "તહેસીલ / બ્લોક પસંદ કરો",
    selectStateFirst: "પહેલા રાજ્ય પસંદ કરો",
    selectDistrictFirst: "પહેલા જિલ્લો પસંદ કરો",
    loadingStates: "રાજ્યો લોડ થઈ રહ્યા છે...",
    loadingDistricts: "જિલ્લાઓ લોડ થઈ રહ્યા છે...",
    loadingDetails: "તહેસીલ લોડ થઈ રહી છે...",
    loadingPrabhari: "પ્રભારીની માહિતી લોડ થઈ રહી છે...",
    addMember: "બીજો સભ્ય ઉમેરો",
    removeMember: "સભ્ય દૂર કરો",
    districtPrabhari: "જિલ્લા પ્રભારી",
    contact: "સંપર્ક",
    submit: "નોંધણી સબમિટ કરો",
    submitting: "સબમિટ થઈ રહ્યું છે...",
    back: "પાછા",
    changeAnswer: "જવાબ બદલો",
    success: "નોંધણી સફળ",
    successDescription:
      "તમારી નોંધણી સફળતાપૂર્વક સબમિટ કરવામાં આવી છે.",
    registeredMembers: "નોંધાયેલા સભ્યો",
    thankYou: "આભાર",
    noAttendance:
      "તમે પસંદ કર્યું છે કે તમે રાજ્યની રાજધાનીના વિરોધ પ્રદર્શનમાં ભાગ નહીં લો.",
    requiredName: "કૃપા કરીને નામ દાખલ કરો.",
    requiredPhone:
      "કૃપા કરીને યોગ્ય 10 અંકનો મોબાઇલ નંબર દાખલ કરો.",
    requiredState: "કૃપા કરીને રાજ્ય પસંદ કરો.",
    requiredDistrict: "કૃપા કરીને જિલ્લો પસંદ કરો.",
    requiredTehsil:
      "કૃપા કરીને તહેસીલ / બ્લોક પસંદ કરો.",
    requiredVillage: "કૃપા કરીને તમારા ગામનું નામ દાખલ કરો.",
    submitError:
      "નોંધણી સબમિટ થઈ શકી નથી. કૃપા કરીને ફરી પ્રયાસ કરો.",
    noPrabhari:
      "આ વિસ્તાર માટે પ્રભારીની માહિતી ઉપલબ્ધ નથી.",
    additionalMemberNote:
      "આ સભ્ય માટે માત્ર નામ અને મોબાઇલ નંબર દાખલ કરો. સ્થાનની માહિતી પ્રથમ સભ્ય પાસેથી લેવામાં આવશે.",
    goHome: "હોમ પેજ પર જાઓ",
  },

  kn: {
    registration: "ನೋಂದಣಿ",
    title: "ಡಿಸೆಂಬರ್ 17 – ರಾಜ್ಯದ ರಾಜಧಾನಿಗೆ ಹೋಗೋಣ",
    description:
      "ಗೌ ಸಮ್ಮಾನ್ ಆಹ್ವಾನ್ ಅಭಿಯಾನ – ಮೂರನೇ ಹಂತ: 31 ಕೋಟಿ ಸಹಿಗಳು. ಡಿಸೆಂಬರ್ 17ರಂದು ಗೌ ಸಮ್ಮಾನ್ ಆಹ್ವಾನ್ ಅಭಿಯಾನದ ಮೂರನೇ ಹಂತದಲ್ಲಿ 31 ಕೋಟಿ ಸಹಿಗಳೊಂದಿಗೆ ಭಾರತದ ಎಲ್ಲಾ ರಾಜ್ಯಗಳ ರಾಜಧಾನಿಗಳಲ್ಲಿ ಮನವಿ ಪತ್ರವನ್ನು ಸಲ್ಲಿಸಲಾಗುತ್ತದೆ. ನಿಮ್ಮ ಹಾಜರಾತಿಯನ್ನು ನೋಂದಾಯಿಸಿ ಈ ರಾಷ್ಟ್ರವ್ಯಾಪಿ ಅಭಿಯಾನದ ಭಾಗವಾಗಿರಿ.",
    language: "ಭಾಷೆ",
    chooseLanguage: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    step1: "ದೃಢೀಕರಿಸಿ",
    step2: "ವಿವರಗಳು",
    question:
      "ನಿಮ್ಮ ರಾಜ್ಯದ ರಾಜಧಾನಿಗೆ ಪ್ರತಿಭಟನೆಗಾಗಿ ಹೋಗಲು ಬಯಸುತ್ತೀರಾ?",
    yes: "ಹೌದು, ನಾನು ಹೋಗಲು ಬಯಸುತ್ತೇನೆ",
    yesDescription:
      "ಡಿಸೆಂಬರ್ 17ರಂದು ನಿಮ್ಮ ರಾಜ್ಯದ ರಾಜಧಾನಿಯಲ್ಲಿ ಮನವಿ ಪತ್ರ ಸಲ್ಲಿಸುವ ಕಾರ್ಯಕ್ರಮದಲ್ಲಿ ಭಾಗವಹಿಸಲು ಬಯಸುತ್ತೀರಾ?",
    no: "ಇಲ್ಲ, ನಾನು ಹೋಗಲು ಸಾಧ್ಯವಿಲ್ಲ",
    noDescription:
      "ನಾನು ರಾಜ್ಯದ ರಾಜಧಾನಿಯ ಕಾರ್ಯಕ್ರಮದಲ್ಲಿ ಭಾಗವಹಿಸಲು ಸಾಧ್ಯವಾಗುವುದಿಲ್ಲ.",
    participantDetails: "ಭಾಗವಹಿಸುವವರ ವಿವರಗಳು",
    participantDescription:
      "ನಿಮ್ಮೊಂದಿಗೆ ಬರುವ ಪ್ರತಿಯೊಬ್ಬ ಸದಸ್ಯರ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ.",
    member: "ಸದಸ್ಯ",
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    mobileNumber: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    state: "ರಾಜ್ಯ",
    district: "ಜಿಲ್ಲೆ",
    tehsil: "ತಹಸಿಲ್ / ಬ್ಲಾಕ್",
    village: "ಗ್ರಾಮ",
    enterVillage: "ನಿಮ್ಮ ಗ್ರಾಮದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    enterName: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    enterPhone: "10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    selectState: "ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    selectDistrict: "ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    selectTehsil: "ತಹಸಿಲ್ / ಬ್ಲಾಕ್ ಆಯ್ಕೆಮಾಡಿ",
    selectStateFirst: "ಮೊದಲು ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    selectDistrictFirst: "ಮೊದಲು ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    loadingStates: "ರಾಜ್ಯಗಳು ಲೋಡ್ ಆಗುತ್ತಿವೆ...",
    loadingDistricts: "ಜಿಲ್ಲೆಗಳು ಲೋಡ್ ಆಗುತ್ತಿವೆ...",
    loadingDetails: "ತಹಸಿಲ್‌ಗಳು ಲೋಡ್ ಆಗುತ್ತಿವೆ...",
    loadingPrabhari: "ಪ್ರಭಾರಿ ಮಾಹಿತಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    addMember: "ಮತ್ತೊಬ್ಬ ಸದಸ್ಯರನ್ನು ಸೇರಿಸಿ",
    removeMember: "ಸದಸ್ಯರನ್ನು ತೆಗೆದುಹಾಕಿ",
    districtPrabhari: "ಜಿಲ್ಲಾ ಪ್ರಭಾರಿ",
    contact: "ಸಂಪರ್ಕಿಸಿ",
    submit: "ನೋಂದಣಿ ಸಲ್ಲಿಸಿ",
    submitting: "ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...",
    back: "ಹಿಂದೆ",
    changeAnswer: "ಉತ್ತರ ಬದಲಿಸಿ",
    success: "ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ",
    successDescription:
      "ನಿಮ್ಮ ನೋಂದಣಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ.",
    registeredMembers: "ನೋಂದಾಯಿತ ಸದಸ್ಯರು",
    thankYou: "ಧನ್ಯವಾದಗಳು",
    noAttendance:
      "ನೀವು ರಾಜ್ಯದ ರಾಜಧಾನಿಯ ಪ್ರತಿಭಟನೆಯಲ್ಲಿ ಭಾಗವಹಿಸುವುದಿಲ್ಲ ಎಂದು ಆಯ್ಕೆ ಮಾಡಿದ್ದೀರಿ.",
    requiredName: "ದಯವಿಟ್ಟು ಹೆಸರು ನಮೂದಿಸಿ.",
    requiredPhone:
      "ದಯವಿಟ್ಟು ಸರಿಯಾದ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
    requiredState: "ದಯವಿಟ್ಟು ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    requiredDistrict: "ದಯವಿಟ್ಟು ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    requiredTehsil:
      "ದಯವಿಟ್ಟು ತಹಸಿಲ್ / ಬ್ಲಾಕ್ ಆಯ್ಕೆಮಾಡಿ.",
    requiredVillage: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಗ್ರಾಮದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.",
    submitError:
      "ನೋಂದಣಿಯನ್ನು ಸಲ್ಲಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    noPrabhari:
      "ಈ ಪ್ರದೇಶಕ್ಕೆ ಪ್ರಭಾರಿ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ.",
    additionalMemberNote:
      "ಈ ಸದಸ್ಯರಿಗೆ ಹೆಸರು ಮತ್ತು ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಮಾತ್ರ ನಮೂದಿಸಿ. ಸ್ಥಳದ ಮಾಹಿತಿಯನ್ನು ಮೊದಲ ಸದಸ್ಯರಿಂದ ಪಡೆಯಲಾಗುತ್ತದೆ.",
    goHome: "ಮುಖಪುಟಕ್ಕೆ ಹೋಗಿ",
  },

  ml: {
    registration: "രജിസ്ട്രേഷൻ",
    title: "ഡിസംബർ 17 – സംസ്ഥാന തലസ്ഥാനത്തേക്ക് പോകാം",
    description:
      "ഗൗ സമ്മാൻ ആഹ്വാൻ അഭിയാൻ – മൂന്നാം ഘട്ടം: 31 കോടി ഒപ്പുകൾ. ഡിസംബർ 17ന് ഗൗ സമ്മാൻ ആഹ്വാൻ അഭിയാന്റെ മൂന്നാം ഘട്ടത്തിൽ 31 കോടി ഒപ്പുകളോടെ ഇന്ത്യയിലെ എല്ലാ സംസ്ഥാന തലസ്ഥാനങ്ങളിലും നിവേദനം സമർപ്പിക്കും. നിങ്ങളുടെ സാന്നിധ്യം രേഖപ്പെടുത്തി ഈ രാജ്യവ്യാപക പ്രചാരണത്തിന്റെ ഭാഗമാകൂ.",
    language: "ഭാഷ",
    chooseLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക",
    step1: "സ്ഥിരീകരിക്കുക",
    step2: "വിശദാംശങ്ങൾ",
    question:
      "നിങ്ങളുടെ സംസ്ഥാന തലസ്ഥാനത്തേക്ക് പ്രതിഷേധത്തിനായി പോകാൻ ആഗ്രഹിക്കുന്നുണ്ടോ?",
    yes: "അതെ, എനിക്ക് പോകണം",
    yesDescription:
      "ഡിസംബർ 17ന് നിങ്ങളുടെ സംസ്ഥാന തലസ്ഥാനത്ത് നിവേദനം സമർപ്പിക്കുന്ന പരിപാടിയിൽ പങ്കെടുക്കാൻ ആഗ്രഹിക്കുന്നുണ്ടോ?",
    no: "ഇല്ല, എനിക്ക് പോകാൻ കഴിയില്ല",
    noDescription:
      "എനിക്ക് സംസ്ഥാന തലസ്ഥാനത്തെ പരിപാടിയിൽ പങ്കെടുക്കാൻ കഴിയില്ല.",
    participantDetails: "പങ്കെടുക്കുന്നയാളുടെ വിശദാംശങ്ങൾ",
    participantDescription:
      "നിങ്ങളോടൊപ്പം വരുന്ന ഓരോ അംഗത്തിന്റെയും വിശദാംശങ്ങൾ നൽകുക.",
    member: "അംഗം",
    fullName: "പൂർണ്ണ പേര്",
    mobileNumber: "മൊബൈൽ നമ്പർ",
    state: "സംസ്ഥാനം",
    district: "ജില്ല",
    tehsil: "തഹസിൽ / ബ്ലോക്ക്",
    village: "ഗ്രാമം",
    enterVillage: "നിങ്ങളുടെ ഗ്രാമത്തിന്റെ പേര് നൽകുക",
    enterName: "നിങ്ങളുടെ പൂർണ്ണ പേര് നൽകുക",
    enterPhone: "10 അക്ക മൊബൈൽ നമ്പർ",
    selectState: "സംസ്ഥാനം തിരഞ്ഞെടുക്കുക",
    selectDistrict: "ജില്ല തിരഞ്ഞെടുക്കുക",
    selectTehsil: "തഹസിൽ / ബ്ലോക്ക് തിരഞ്ഞെടുക്കുക",
    selectStateFirst: "ആദ്യം സംസ്ഥാനം തിരഞ്ഞെടുക്കുക",
    selectDistrictFirst: "ആദ്യം ജില്ല തിരഞ്ഞെടുക്കുക",
    loadingStates: "സംസ്ഥാനങ്ങൾ ലോഡ് ചെയ്യുന്നു...",
    loadingDistricts: "ജില്ലകൾ ലോഡ് ചെയ്യുന്നു...",
    loadingDetails: "തഹസിലുകൾ ലോഡ് ചെയ്യുന്നു...",
    loadingPrabhari: "പ്രഭാരി വിവരങ്ങൾ ലോഡ് ചെയ്യുന്നു...",
    addMember: "മറ്റൊരു അംഗത്തെ ചേർക്കുക",
    removeMember: "അംഗത്തെ നീക്കം ചെയ്യുക",
    districtPrabhari: "ജില്ലാ പ്രഭാരി",
    contact: "ബന്ധപ്പെടുക",
    submit: "രജിസ്ട്രേഷൻ സമർപ്പിക്കുക",
    submitting: "സമർപ്പിക്കുന്നു...",
    back: "തിരികെ",
    changeAnswer: "ഉത്തരം മാറ്റുക",
    success: "രജിസ്ട്രേഷൻ വിജയകരം",
    successDescription:
      "നിങ്ങളുടെ രജിസ്ട്രേഷൻ വിജയകരമായി സമർപ്പിച്ചു.",
    registeredMembers: "രജിസ്റ്റർ ചെയ്ത അംഗങ്ങൾ",
    thankYou: "നന്ദി",
    noAttendance:
      "സംസ്ഥാന തലസ്ഥാനത്തെ പ്രതിഷേധത്തിൽ പങ്കെടുക്കില്ലെന്ന് നിങ്ങൾ തിരഞ്ഞെടുത്തു.",
    requiredName: "ദയവായി പേര് നൽകുക.",
    requiredPhone:
      "ദയവായി സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക.",
    requiredState: "ദയവായി സംസ്ഥാനം തിരഞ്ഞെടുക്കുക.",
    requiredDistrict: "ദയവായി ജില്ല തിരഞ്ഞെടുക്കുക.",
    requiredTehsil:
      "ദയവായി തഹസിൽ / ബ്ലോക്ക് തിരഞ്ഞെടുക്കുക.",
    requiredVillage:
      "ദയവായി നിങ്ങളുടെ ഗ്രാമത്തിന്റെ പേര് നൽകുക.",
    submitError:
      "രജിസ്ട്രേഷൻ സമർപ്പിക്കാൻ കഴിഞ്ഞില്ല. വീണ്ടും ശ്രമിക്കുക.",
    noPrabhari:
      "ഈ പ്രദേശത്തിനുള്ള പ്രഭാരി വിവരങ്ങൾ ലഭ്യമല്ല.",
    additionalMemberNote:
      "ഈ അംഗത്തിന് പേര്, മൊബൈൽ നമ്പർ എന്നിവ മാത്രം നൽകുക. സ്ഥലവിവരം ആദ്യ അംഗത്തിൽ നിന്ന് എടുക്കും.",
    goHome: "ഹോം പേജിലേക്ക് പോകുക",
  },

  or: {
    registration: "ପଞ୍ଜୀକରଣ",
    title: "୧୭ ଡିସେମ୍ବର – ଚାଲନ୍ତୁ ରାଜ୍ୟ ରାଜଧାନୀକୁ",
    description:
      "ଗୋ ସମ୍ମାନ ଆହ୍ୱାନ ଅଭିଯାନ – ତୃତୀୟ ପର୍ଯ୍ୟାୟ: ୩୧ କୋଟି ସ୍ୱାକ୍ଷର। ୧୭ ଡିସେମ୍ବରରେ ଗୋ ସମ୍ମାନ ଆହ୍ୱାନ ଅଭିଯାନର ତୃତୀୟ ପର୍ଯ୍ୟାୟରେ ୩୧ କୋଟି ସ୍ୱାକ୍ଷର ସହିତ ଭାରତର ସମସ୍ତ ରାଜ୍ୟର ରାଜଧାନୀରେ ଆବେଦନପତ୍ର ଦାଖଲ କରାଯିବ। ଆପଣଙ୍କ ଉପସ୍ଥିତି ପଞ୍ଜିକରଣ କରି ଏହି ଦେଶବ୍ୟାପୀ ଅଭିଯାନର ଅଂଶ ହୁଅନ୍ତୁ।",
    language: "ଭାଷା",
    chooseLanguage: "ଭାଷା ବାଛନ୍ତୁ",
    step1: "ନିଶ୍ଚିତ କରନ୍ତୁ",
    step2: "ବିବରଣୀ",
    question:
      "ଆପଣ ଆପଣଙ୍କ ରାଜ୍ୟର ରାଜଧାନୀକୁ ବିରୋଧ ପାଇଁ ଯିବାକୁ ଚାହୁଁଛନ୍ତି କି?",
    yes: "ହଁ, ମୁଁ ଯିବାକୁ ଚାହୁଁଛି",
    yesDescription:
      "୧୭ ଡିସେମ୍ବରରେ ଆପଣଙ୍କ ରାଜ୍ୟର ରାଜଧାନୀରେ ଆବେଦନପତ୍ର ଦାଖଲ କରିବା କାର୍ଯ୍ୟକ୍ରମରେ ଯୋଗ ଦେବାକୁ ଚାହୁଁଛନ୍ତି କି?",
    no: "ନା, ମୁଁ ଯାଇପାରିବି ନାହିଁ",
    noDescription:
      "ମୁଁ ରାଜ୍ୟ ରାଜଧାନୀର କାର୍ଯ୍ୟକ୍ରମରେ ଯୋଗ ଦେଇପାରିବି ନାହିଁ।",
    participantDetails: "ଅଂଶଗ୍ରହଣକାରୀଙ୍କ ବିବରଣୀ",
    participantDescription:
      "ଆପଣଙ୍କ ସହିତ ଆସୁଥିବା ପ୍ରତ୍ୟେକ ସଦସ୍ୟଙ୍କ ବିବରଣୀ ଦିଅନ୍ତୁ।",
    member: "ସଦସ୍ୟ",
    fullName: "ପୂର୍ଣ୍ଣ ନାମ",
    mobileNumber: "ମୋବାଇଲ ନମ୍ବର",
    state: "ରାଜ୍ୟ",
    district: "ଜିଲ୍ଲା",
    tehsil: "ତହସିଲ / ବ୍ଲକ",
    village: "ଗାଁ",
    enterVillage: "ଆପଣଙ୍କ ଗାଁର ନାମ ଦିଅନ୍ତୁ",
    enterName: "ଆପଣଙ୍କ ପୂର୍ଣ୍ଣ ନାମ ଦିଅନ୍ତୁ",
    enterPhone: "୧୦ ଅଙ୍କର ମୋବାଇଲ ନମ୍ବର",
    selectState: "ରାଜ୍ୟ ବାଛନ୍ତୁ",
    selectDistrict: "ଜିଲ୍ଲା ବାଛନ୍ତୁ",
    selectTehsil: "ତହସିଲ / ବ୍ଲକ ବାଛନ୍ତୁ",
    selectStateFirst: "ପ୍ରଥମେ ରାଜ୍ୟ ବାଛନ୍ତୁ",
    selectDistrictFirst: "ପ୍ରଥମେ ଜିଲ୍ଲା ବାଛନ୍ତୁ",
    loadingStates: "ରାଜ୍ୟଗୁଡ଼ିକ ଲୋଡ୍ ହେଉଛି...",
    loadingDistricts: "ଜିଲ୍ଲାଗୁଡ଼ିକ ଲୋଡ୍ ହେଉଛି...",
    loadingDetails: "ତହସିଲଗୁଡ଼ିକ ଲୋଡ୍ ହେଉଛି...",
    loadingPrabhari: "ପ୍ରଭାରୀଙ୍କ ସୂଚନା ଲୋଡ୍ ହେଉଛି...",
    addMember: "ଆଉ ଜଣେ ସଦସ୍ୟ ଯୋଡନ୍ତୁ",
    removeMember: "ସଦସ୍ୟଙ୍କୁ ହଟାନ୍ତୁ",
    districtPrabhari: "ଜିଲ୍ଲା ପ୍ରଭାରୀ",
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
      "ଆପଣ ରାଜ୍ୟ ରାଜଧାନୀର ବିରୋଧ ପ୍ରଦର୍ଶନରେ ଯୋଗ ଦେବେ ନାହିଁ ବୋଲି ବାଛିଛନ୍ତି।",
    requiredName: "ଦୟାକରି ନାମ ଦିଅନ୍ତୁ।",
    requiredPhone:
      "ଦୟାକରି ସଠିକ୍ ୧୦ ଅଙ୍କର ମୋବାଇଲ ନମ୍ବର ଦିଅନ୍ତୁ।",
    requiredState: "ଦୟାକରି ରାଜ୍ୟ ବାଛନ୍ତୁ।",
    requiredDistrict: "ଦୟାକରି ଜିଲ୍ଲା ବାଛନ୍ତୁ।",
    requiredTehsil:
      "ଦୟାକରି ତହସିଲ / ବ୍ଲକ ବାଛନ୍ତୁ।",
    requiredVillage: "ଦୟାକରି ଆପଣଙ୍କ ଗାଁର ନାମ ଦିଅନ୍ତୁ।",
    submitError:
      "ପଞ୍ଜୀକରଣ ଦାଖଲ ହୋଇପାରିଲା ନାହିଁ। ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।",
    noPrabhari:
      "ଏହି ଅଞ୍ଚଳ ପାଇଁ ପ୍ରଭାରୀଙ୍କ ସୂଚନା ଉପଲବ୍ଧ ନାହିଁ।",
    additionalMemberNote:
      "ଏହି ସଦସ୍ୟଙ୍କ ପାଇଁ କେବଳ ନାମ ଏବଂ ମୋବାଇଲ ନମ୍ବର ଦିଅନ୍ତୁ। ସ୍ଥାନର ସୂଚନା ପ୍ରଥମ ସଦସ୍ୟଙ୍କଠାରୁ ନିଆଯିବ।",
    goHome: "ହୋମ ପେଜକୁ ଯାଆନ୍ତୁ",
  },

  pa: {
    registration: "ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
    title: "17 ਦਸੰਬਰ – ਆਓ ਰਾਜ ਦੀ ਰਾਜਧਾਨੀ ਚੱਲੀਏ",
    description:
      "ਗੌ ਸਨਮਾਨ ਆਹਵਾਨ ਅਭਿਆਨ – ਤੀਜਾ ਪੜਾਅ: 31 ਕਰੋੜ ਦਸਤਖ਼ਤ। 17 ਦਸੰਬਰ ਨੂੰ ਗੌ ਸਨਮਾਨ ਆਹਵਾਨ ਅਭਿਆਨ ਦੇ ਤੀਜੇ ਪੜਾਅ ਵਿੱਚ 31 ਕਰੋੜ ਦਸਤਖ਼ਤਾਂ ਦੇ ਨਾਲ ਭਾਰਤ ਦੇ ਸਾਰੇ ਰਾਜਾਂ ਦੀਆਂ ਰਾਜਧਾਨੀਆਂ ਵਿੱਚ ਅਰਜ਼ੀ ਪੇਸ਼ ਕੀਤੀ ਜਾਵੇਗੀ। ਆਪਣੀ ਹਾਜ਼ਰੀ ਦਰਜ ਕਰਵਾ ਕੇ ਇਸ ਦੇਸ਼ਵਿਆਪੀ ਅਭਿਆਨ ਦਾ ਹਿੱਸਾ ਬਣੋ।",
    language: "ਭਾਸ਼ਾ",
    chooseLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ",
    step1: "ਪੁਸ਼ਟੀ",
    step2: "ਵੇਰਵੇ",
    question:
      "ਕੀ ਤੁਸੀਂ ਆਪਣੇ ਰਾਜ ਦੀ ਰਾਜਧਾਨੀ ਵਿੱਚ ਵਿਰੋਧ ਪ੍ਰਦਰਸ਼ਨ ਲਈ ਜਾਣਾ ਚਾਹੁੰਦੇ ਹੋ?",
    yes: "ਹਾਂ, ਮੈਂ ਜਾਣਾ ਚਾਹੁੰਦਾ ਹਾਂ",
    yesDescription:
      "ਕੀ ਤੁਸੀਂ 17 ਦਸੰਬਰ ਨੂੰ ਆਪਣੇ ਰਾਜ ਦੀ ਰਾਜਧਾਨੀ ਵਿੱਚ ਅਰਜ਼ੀ ਪੇਸ਼ ਕਰਨ ਲਈ ਸ਼ਾਮਲ ਹੋਣਾ ਚਾਹੁੰਦੇ ਹੋ?",
    no: "ਨਹੀਂ, ਮੈਂ ਨਹੀਂ ਜਾ ਸਕਦਾ",
    noDescription:
      "ਮੈਂ ਰਾਜ ਦੀ ਰਾਜਧਾਨੀ ਦੇ ਕਾਰਜਕ੍ਰਮ ਵਿੱਚ ਸ਼ਾਮਲ ਨਹੀਂ ਹੋ ਸਕਾਂਗਾ।",
    participantDetails: "ਭਾਗੀਦਾਰ ਦੇ ਵੇਰਵੇ",
    participantDescription:
      "ਤੁਹਾਡੇ ਨਾਲ ਆਉਣ ਵਾਲੇ ਹਰ ਮੈਂਬਰ ਦੇ ਵੇਰਵੇ ਦਰਜ ਕਰੋ।",
    member: "ਮੈਂਬਰ",
    fullName: "ਪੂਰਾ ਨਾਮ",
    mobileNumber: "ਮੋਬਾਈਲ ਨੰਬਰ",
    state: "ਰਾਜ",
    district: "ਜ਼ਿਲ੍ਹਾ",
    tehsil: "ਤਹਿਸੀਲ / ਬਲਾਕ",
    village: "ਪਿੰਡ",
    enterVillage: "ਆਪਣੇ ਪਿੰਡ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ",
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
    loadingPrabhari: "ਪ੍ਰਭਾਰੀ ਦੀ ਜਾਣਕਾਰੀ ਲੋਡ ਹੋ ਰਹੀ ਹੈ...",
    addMember: "ਇੱਕ ਹੋਰ ਮੈਂਬਰ ਸ਼ਾਮਲ ਕਰੋ",
    removeMember: "ਮੈਂਬਰ ਹਟਾਓ",
    districtPrabhari: "ਜ਼ਿਲ੍ਹਾ ਪ੍ਰਭਾਰੀ",
    contact: "ਸੰਪਰਕ",
    submit: "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਜਮ੍ਹਾਂ ਕਰੋ",
    submitting: "ਜਮ੍ਹਾਂ ਹੋ ਰਿਹਾ ਹੈ...",
    back: "ਵਾਪਸ",
    changeAnswer: "ਜਵਾਬ ਬਦਲੋ",
    success: "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸਫਲ",
    successDescription:
      "ਤੁਹਾਡੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸਫਲਤਾਪੂਰਵਕ ਜਮ੍ਹਾਂ ਹੋ ਗਈ ਹੈ।",
    registeredMembers: "ਰਜਿਸਟਰਡ ਮੈਂਬਰ",
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
    requiredVillage: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਪਿੰਡ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ।",
    submitError:
      "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਜਮ੍ਹਾਂ ਨਹੀਂ ਹੋ ਸਕੀ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    noPrabhari:
      "ਇਸ ਖੇਤਰ ਲਈ ਪ੍ਰਭਾਰੀ ਦੀ ਜਾਣਕਾਰੀ ਉਪਲਬਧ ਨਹੀਂ ਹੈ।",
    additionalMemberNote:
      "ਇਸ ਮੈਂਬਰ ਲਈ ਸਿਰਫ਼ ਨਾਮ ਅਤੇ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ। ਸਥਾਨ ਦੀ ਜਾਣਕਾਰੀ ਪਹਿਲੇ ਮੈਂਬਰ ਤੋਂ ਲਈ ਜਾਵੇਗੀ।",
    goHome: "ਹੋਮ ਪੇਜ 'ਤੇ ਜਾਓ",
  },

  as: {
    registration: "পঞ্জীয়ন",
    title: "১৭ ডিচেম্বৰ – আহক ৰাজ্যৰ ৰাজধানীলৈ",
    description:
      "গৌ সন্মান আহ্বান অভিযান – তৃতীয় পৰ্যায়: ৩১ কোটি স্বাক্ষৰ। ১৭ ডিচেম্বৰত গৌ সন্মান আহ্বান অভিযানৰ তৃতীয় পৰ্যায়ত ৩১ কোটি স্বাক্ষৰৰ সৈতে ভাৰতৰ সকলো ৰাজ্যৰ ৰাজধানীত আবেদন পত্ৰ দাখিল কৰা হ'ব। আপোনাৰ উপস্থিতি পঞ্জীয়ন কৰি এই ৰাষ্ট্ৰব্যাপী অভিযানৰ অংশ হওক।",
    language: "ভাষা",
    chooseLanguage: "ভাষা বাছক",
    step1: "নিশ্চিত কৰক",
    step2: "বিৱৰণ",
    question:
      "আপুনি আপোনাৰ ৰাজ্যৰ ৰাজধানীলৈ প্ৰতিবাদৰ বাবে যাব বিচাৰে নেকি?",
    yes: "হয়, মই যাব বিচাৰোঁ",
    yesDescription:
      "আপুনি ১৭ ডিচেম্বৰত আপোনাৰ ৰাজ্যৰ ৰাজধানীত আবেদন পত্ৰ দাখিলৰ কাৰ্যসূচীত অংশগ্ৰহণ কৰিব বিচাৰে নেকি?",
    no: "নহয়, মই যাব নোৱাৰোঁ",
    noDescription:
      "মই ৰাজ্যৰ ৰাজধানীৰ কাৰ্যসূচীত অংশগ্ৰহণ কৰিব নোৱাৰিম।",
    participantDetails: "অংশগ্ৰহণকাৰীৰ বিৱৰণ",
    participantDescription:
      "আপোনাৰ সৈতে অহা প্ৰতিজন সদস্যৰ বিৱৰণ দিয়ক।",
    member: "সদস্য",
    fullName: "সম্পূৰ্ণ নাম",
    mobileNumber: "ম'বাইল নম্বৰ",
    state: "ৰাজ্য",
    district: "জিলা",
    tehsil: "তহচিল / ব্লক",
    village: "গাঁও",
    enterVillage: "আপোনাৰ গাঁৱৰ নাম দিয়ক",
    enterName: "আপোনাৰ সম্পূৰ্ণ নাম দিয়ক",
    enterPhone: "১০ সংখ্যাৰ ম'বাইল নম্বৰ",
    selectState: "ৰাজ্য বাছক",
    selectDistrict: "জিলা বাছক",
    selectTehsil: "তহচিল / ব্লক বাছক",
    selectStateFirst: "প্ৰথমে ৰাজ্য বাছক",
    selectDistrictFirst: "প্ৰথমে জিলা বাছক",
    loadingStates: "ৰাজ্যসমূহ লোড হৈ আছে...",
    loadingDistricts: "জিলাসমূহ লোড হৈ আছে...",
    loadingDetails: "তহচিলসমূহ লোড হৈ আছে...",
    loadingPrabhari: "প্ৰভাৰীৰ তথ্য লোড হৈ আছে...",
    addMember: "আন এজন সদস্য যোগ কৰক",
    removeMember: "সদস্য আঁতৰাওক",
    districtPrabhari: "জিলা প্ৰভাৰী",
    contact: "যোগাযোগ",
    submit: "পঞ্জীয়ন দাখিল কৰক",
    submitting: "দাখিল হৈ আছে...",
    back: "পিছলৈ",
    changeAnswer: "উত্তৰ সলনি কৰক",
    success: "পঞ্জীয়ন সফল",
    successDescription:
      "আপোনাৰ পঞ্জীয়ন সফলতাৰে দাখিল কৰা হৈছে।",
    registeredMembers: "পঞ্জীয়ন কৰা সদস্য",
    thankYou: "ধন্যবাদ",
    noAttendance:
      "আপুনি ৰাজ্যৰ ৰাজধানীৰ প্ৰতিবাদত অংশগ্ৰহণ নকৰাৰ সিদ্ধান্ত লৈছে।",
    requiredName: "অনুগ্ৰহ কৰি নাম দিয়ক।",
    requiredPhone:
      "অনুগ্ৰহ কৰি সঠিক ১০ সংখ্যাৰ ম'বাইল নম্বৰ দিয়ক।",
    requiredState: "অনুগ্ৰহ কৰি ৰাজ্য বাছক।",
    requiredDistrict: "অনুগ্ৰহ কৰি জিলা বাছক।",
    requiredTehsil:
      "অনুগ্ৰহ কৰি তহচিল / ব্লক বাছক।",
    requiredVillage:
      "অনুগ্ৰহ কৰি আপোনাৰ গাঁৱৰ নাম দিয়ক।",
    submitError:
      "পঞ্জীয়ন দাখিল কৰিব পৰা নগ'ল। পুনৰ চেষ্টা কৰক।",
    noPrabhari:
      "এই অঞ্চলৰ বাবে প্ৰভাৰীৰ তথ্য উপলব্ধ নহয়।",
    additionalMemberNote:
      "এই সদস্যৰ বাবে কেৱল নাম আৰু ম'বাইল নম্বৰ দিয়ক। স্থানৰ তথ্য প্ৰথম সদস্যৰ পৰা লোৱা হ'ব।",
    goHome: "হোম পেজলৈ যাওক",
  },

  ur: {
    registration: "رجسٹریشن",
    title: "17 دسمبر – چلیں ریاستی دارالحکومت",
    description:
      "گئو سمان آہوان ابھیان – تیسرا مرحلہ: 31 کروڑ دستخط۔ 17 دسمبر کو گئو سمان آہوان ابھیان کے تیسرے مرحلے میں 31 کروڑ دستخطوں کے ساتھ بھارت کی تمام ریاستوں کے دارالحکومتوں میں عرضداشت پیش کی جائے گی۔ اپنی موجودگی درج کروا کر اس ملک گیر مہم کا حصہ بنیں۔",
    language: "زبان",
    chooseLanguage: "زبان منتخب کریں",
    step1: "تصدیق",
    step2: "تفصیلات",
    question:
      "کیا آپ اپنے ریاستی دارالحکومت میں احتجاج کے لیے جانا چاہتے ہیں؟",
    yes: "ہاں، میں جانا چاہتا ہوں",
    yesDescription:
      "کیا آپ 17 دسمبر کو اپنے ریاستی دارالحکومت میں عرضداشت پیش کرنے کے لیے شامل ہونا چاہتے ہیں؟",
    no: "نہیں، میں نہیں جا سکتا",
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
    village: "گاؤں",
    enterVillage: "اپنے گاؤں کا نام درج کریں",
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
    requiredVillage:
      "براہ کرم اپنے گاؤں کا نام درج کریں۔",
    submitError:
      "رجسٹریشن جمع نہیں ہو سکی۔ دوبارہ کوشش کریں۔",
    noPrabhari:
      "ضلعی انچارج کی معلومات دستیاب نہیں ہیں۔",
    additionalMemberNote:
      "اس رکن کے لیے صرف نام اور موبائل نمبر درج کریں۔ مقام کی معلومات پہلے رکن سے لی جائے گی۔",
    goHome: "ہوم پیج پر جائیں",
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
    village: "",
    districts: [],
    tehsils: [],
    districtPrabharis: [],
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
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.data)) return result.data;
  if (Array.isArray(result?.data?.data)) return result.data.data;
  return [];
}

/* =========================================================
   CUSTOM DROPDOWN COMPONENT
   RTL Supported & Abstract Saffron
========================================================= */

function CustomDropdown({
  label,
  value,
  options = [],
  onChange,
  disabled,
  loading,
  placeholder,
  icon,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const selectedOpt = options.find(
    (o) => String(o.value) === String(value)
  );

  return (
    <div
      className="relative z-[100] group pt-3"
      ref={ref}
    >
      {/* Floating Label */}
      <div
        className={`absolute -top-1 start-4 z-20 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest transition-colors rounded-[1rem_0.5rem_1rem_0.5rem] shadow-sm border-2 ${
          disabled
            ? "bg-amber-200/50 text-amber-900/50 border-amber-300/50"
            : "bg-orange-200 text-black border-orange-400 group-focus-within:bg-orange-500"
        }`}
      >
        {label}
      </div>

      {/* Select Button */}
      <button
        type="button"
        disabled={disabled || loading}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex w-full items-center text-start rounded-[1.5rem_0.5rem_1.5rem_0.5rem] border-2 transition-all duration-300 ${
          disabled
            ? "border-amber-200 bg-amber-100/50 opacity-70 cursor-not-allowed"
            : "border-orange-300 bg-amber-100/90 hover:border-orange-400 focus:border-orange-500 focus:bg-amber-200"
        }`}
      >
        <span
          className={`pointer-events-none absolute start-4 transition-colors ${
            disabled
              ? "text-amber-900/50"
              : "text-orange-900 group-focus-within:text-black"
          }`}
        >
          {icon}
        </span>

        <span
          className={`w-full py-4 ps-12 pe-10 text-sm font-black outline-none block truncate ${
            !selectedOpt
              ? "text-amber-900/70"
              : "text-black"
          }`}
        >
          {selectedOpt
            ? selectedOpt.label
            : placeholder}
        </span>

        {loading ? (
          <Loader2
            size={18}
            className="pointer-events-none absolute end-4 animate-spin text-black"
          />
        ) : (
          <ChevronDown
            size={18}
            className={`pointer-events-none absolute end-4 transition-transform duration-300 ${
              disabled
                ? "text-amber-900/50"
                : "text-orange-900 group-hover:text-black"
            } ${isOpen ? "rotate-180 text-black" : ""}`}
          />
        )}
      </button>

      {/* Options Menu */}
      {isOpen && !disabled && !loading && (
        <div className="absolute start-0 end-0 top-full mt-2 z-[200] rounded-[1.5rem_0.5rem_1.5rem_0.5rem] border-2 border-orange-400 bg-amber-50 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {options.length === 0 ? (
              <div className="px-4 py-4 text-sm font-bold text-amber-900/70 text-center">
                {placeholder}
              </div>
            ) : (
              options.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 text-sm font-black cursor-pointer transition-colors border-b border-orange-200/50 last:border-0 text-start ${
                    String(opt.value) === String(value)
                      ? "bg-orange-300 text-black"
                      : "text-orange-950 hover:bg-orange-200 hover:text-black"
                  }`}
                >
                  {opt.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function Page() {
  const [language, setLanguage] = useState("hi");
  const [step, setStep] = useState(1);
  const [states, setStates] = useState([]);
  const [members, setMembers] = useState([
    createMember(),
  ]);
  const [loadingStates, setLoadingStates] =
    useState(true);
  const [loadingDistricts, setLoadingDistricts] =
    useState({});
  const [loadingDetails, setLoadingDetails] =
    useState({});
  const [loadingPrabhari, setLoadingPrabhari] =
    useState({});
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [submitted, setSubmitted] =
    useState(false);
  const [attendance, setAttendance] =
    useState(null);
  const [error, setError] = useState("");

  const t =
    TRANSLATIONS[language] || TRANSLATIONS.hi;

  const isRTL = language === "ur";

  /* =======================================================
     LOAD CACHED LANGUAGE
  ======================================================= */

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem("protest-language");

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
      localStorage.setItem(
        "protest-language",
        value
      );
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

        const result =
          await getJson("/api/states");

        const data = normalizeArray(result);

        if (!cancelled) {
          setStates(data);
        }
      } catch (err) {
        console.error(
          "Failed to load states:",
          err
        );

        if (!cancelled) {
          setStates([]);
          setError(
            err.message || t.submitError
          );
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
  }, [t.submitError]);

  /* =======================================================
     MEMBER UPDATE
  ======================================================= */

  const updateMember = (
    memberId,
    changes
  ) => {
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

  const handleStateChange = async (
    memberId,
    stateId
  ) => {
    const state = states.find(
      (item) =>
        String(item.id) ===
        String(stateId)
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
    });

    if (!stateId) return;

    setLoadingDistricts((current) => ({
      ...current,
      [memberId]: true,
    }));

    try {
      const result = await getJson(
        `/api/districts?stateId=${encodeURIComponent(
          stateId
        )}`
      );

      updateMember(memberId, {
        districts: normalizeArray(result),
      });
    } catch (err) {
      console.error(
        "District API error:",
        err
      );

      updateMember(memberId, {
        districts: [],
      });

      setError(
        err.message || t.submitError
      );
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
    if (!stateId || !districtId) return;

    setLoadingPrabhari((current) => ({
      ...current,
      [`district-${memberId}`]: true,
    }));

    try {
      const params =
        new URLSearchParams();

      params.set("level", "DISTRICT");
      params.set("stateId", stateId);
      params.set(
        "districtId",
        districtId
      );
      params.set("page", "1");
      params.set("limit", "50");

      const result = await getJson(
        `/api/prabharis?${params.toString()}`
      );

      updateMember(memberId, {
        districtPrabharis:
          normalizeArray(result),
      });
    } catch (err) {
      console.error(
        "District Prabhari API error:",
        err
      );

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

  const loadTehsils = async (
    memberId,
    districtId
  ) => {
    if (!districtId) return;

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

      updateMember(memberId, {
        tehsils: normalizeArray(result),
      });
    } catch (err) {
      console.error(
        "Tehsil API error:",
        err
      );

      updateMember(memberId, {
        tehsils: [],
      });

      setError(
        err.message || t.submitError
      );
    } finally {
      setLoadingDetails((current) => ({
        ...current,
        [memberId]: false,
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
      (item) =>
        item.id === memberId
    );

    const district =
      member?.districts?.find(
        (item) =>
          String(item.id) ===
          String(districtId)
      );

    updateMember(memberId, {
      districtId:
        district?.id || "",
      districtName:
        district?.name || "",
      tehsilId: "",
      tehsilName: "",
      tehsils: [],
      districtPrabharis: [],
    });

    if (!districtId) return;

    await Promise.all([
      loadTehsils(
        memberId,
        districtId
      ),
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

  const handleTehsilChange = (
    memberId,
    tehsilId
  ) => {
    const member = members.find(
      (item) =>
        item.id === memberId
    );

    const tehsil =
      member?.tehsils?.find(
        (item) =>
          String(item.id) ===
          String(tehsilId)
      );

    updateMember(memberId, {
      tehsilId:
        tehsil?.id || "",
      tehsilName:
        tehsil?.name || "",
    });
  };

  /* =======================================================
     ADD MEMBER
  ======================================================= */

  const addMember = () =>
    setMembers((current) => [
      ...current,
      createMember(),
    ]);

  /* =======================================================
     REMOVE MEMBER
  ======================================================= */

  const removeMember = (
    memberId
  ) => {
    setMembers((current) =>
      current.filter(
        (member) =>
          member.id !== memberId
      )
    );
  };

  /* =======================================================
     VALIDATE MEMBERS
  ======================================================= */

  const validateMembers = () => {
    const primary = members[0];

    if (!primary?.name.trim())
      return t.requiredName;

    if (
      !/^\d{10}$/.test(
        primary.phone
      )
    )
      return t.requiredPhone;

    if (!primary.stateId)
      return t.requiredState;

    if (!primary.districtId)
      return t.requiredDistrict;

    if (!primary.tehsilId)
      return t.requiredTehsil;

    if (!primary.village.trim())
      return t.requiredVillage;

    for (
      let i = 1;
      i < members.length;
      i++
    ) {
      const member = members[i];

      if (!member.name.trim())
        return t.requiredName;

      if (
        !/^\d{10}$/.test(
          member.phone
        )
      )
        return t.requiredPhone;
    }

    return "";
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (
    event
  ) => {
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
      const primary = members[0];

      const payload = {
        language,
        wantsToAttendCapital: true,
        members: members.map(
          (member) => ({
            name:
              member.name.trim(),
            phone: member.phone,

            stateId:
              primary.stateId,
            districtId:
              primary.districtId,
            tehsilId:
              primary.tehsilId,
            village:
              primary.village.trim(),
          })
        ),
      };

      const response =
        await fetch(
          "/api/protest-registration",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              payload
            ),
          }
        );

      const data =
        await response.json();

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
    if (attendance === false) {
      return (
        <main
          dir={
            isRTL
              ? "rtl"
              : "ltr"
          }
          className="relative min-h-screen bg-amber-50/50 px-4 py-6 sm:py-8 font-sans overflow-hidden"
        >
          <GlobalStyles />
          <BackgroundDecoration />

          <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center animate-in fade-in zoom-in duration-500">
            <div className="w-full rounded-[3rem_1rem_3rem_1rem] border-2 border-orange-200/50 bg-amber-100/40 p-8 text-center shadow-lg backdrop-blur-xl sm:p-14">
              <div className="animate-pop-in mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem_1rem_2rem_1rem] bg-gradient-to-br from-orange-400 to-amber-500 text-black shadow-inner border-4 border-orange-200">
                <CheckCircle2
                  size={48}
                  strokeWidth={2.5}
                />
              </div>

              <h1 className="mt-8 text-3xl font-black text-orange-950 sm:text-4xl tracking-tight">
                {t.thankYou}
              </h1>

              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-amber-900 font-bold sm:text-lg">
                {t.noAttendance}
              </p>

              <button
                type="button"
                onClick={() =>
                  (window.location.href =
                    "/")
                }
                className="group mt-10 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-[1rem_2rem_1rem_2rem] bg-orange-500 px-8 font-black text-black shadow-md transition-all duration-300 hover:bg-orange-600 hover:shadow-lg active:scale-[0.98]"
              >
                <Home
                  size={20}
                  className="transition-transform group-hover:-translate-y-0.5 text-black"
                />
                {t.goHome}
              </button>
            </div>
          </div>
        </main>
      );
    }

    const primary = members[0];

    return (
      <main
        dir={
          isRTL
            ? "rtl"
            : "ltr"
        }
        className="relative min-h-screen bg-amber-50/50 px-4 py-6 sm:py-8 font-sans overflow-hidden"
      >
        <GlobalStyles />
        <BackgroundDecoration />

        <div className="relative z-10 mx-auto max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="rounded-[2rem_4rem_1rem_3rem] border-2 border-orange-200/60 bg-amber-100/60 shadow-lg backdrop-blur-xl">
            <div className="rounded-t-[2rem_4rem_1rem_3rem] overflow-hidden">
              <div className="animate-shimmer-bar h-2 w-full bg-gradient-to-r from-orange-500 via-amber-200 via-red-500 to-orange-700" />
            </div>

            <div className="p-6 sm:p-12">
              <div className="text-center">
                <div className="animate-pop-in mx-auto flex h-20 w-20 items-center justify-center rounded-[3rem_1rem_3rem_1rem] bg-gradient-to-br from-orange-500 to-amber-600 text-black shadow-md sm:h-24 sm:w-24">
                  <CheckCircle2
                    size={44}
                    strokeWidth={2.5}
                    className="sm:hidden"
                  />
                  <CheckCircle2
                    size={48}
                    strokeWidth={2.5}
                    className="hidden sm:block"
                  />
                </div>

                <h1 className="mt-8 text-3xl font-black text-orange-950 sm:text-4xl tracking-tight">
                  {t.success}
                </h1>

                <p className="mt-3 text-base text-amber-900 font-bold sm:text-lg">
                  {t.successDescription}
                </p>
              </div>

              <div className="mt-12 rounded-[2rem_1rem_2rem_1rem] bg-orange-200/40 p-6 shadow-inner ring-2 ring-orange-300/30 sm:p-8 backdrop-blur-md">
                <h2 className="mb-6 flex items-center gap-3 text-xl font-black text-orange-950">
                  <Users
                    className="text-black"
                    size={24}
                  />
                  {t.registeredMembers}
                </h2>

                <div className="space-y-4">
                  {members.map(
                    (
                      member,
                      index
                    ) => (
                      <div
                        key={
                          member.id
                        }
                        style={{
                          animationDelay: `${index * 90}ms`,
                          animationFillMode:
                            "backwards",
                        }}
                        className="group animate-in fade-in slide-in-from-bottom-2 duration-500 rounded-[1rem_2rem_1rem_2rem] border-2 border-orange-200/80 bg-amber-100 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-orange-400 hover:shadow-md"
                      >
                        <div className="flex gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem_0.5rem_1rem_0.5rem] bg-gradient-to-br from-orange-300 to-amber-400 text-black ring-2 ring-orange-200 transition-all group-hover:scale-110">
                            <User size={20} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-lg font-black text-orange-950 break-words">
                              {
                                member.name
                              }
                            </p>

                            <p className="mt-1 text-sm font-black text-orange-800">
                              {
                                member.phone
                              }
                            </p>

                            <div className="mt-4 flex items-start gap-2 rounded-[1rem_2rem_1rem_2rem] bg-amber-200/50 p-3.5 text-sm font-bold text-orange-950 border-2 border-orange-200/50">
                              <MapPin
                                size={16}
                                className="mt-0.5 shrink-0 text-orange-950"
                              />

                              <p className="leading-snug break-words">
                                {[
                                  primary.stateName,
                                  primary.districtName,
                                  primary.tehsilName,
                                  primary.village,
                                ]
                                  .filter(
                                    Boolean
                                  )
                                  .join(
                                    " • "
                                  )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  (window.location.href =
                    "/")
                }
                className="group mt-10 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-[2rem_1rem_2rem_1rem] bg-gradient-to-r from-orange-500 to-amber-500 px-8 font-black text-black shadow-md transition-all duration-300 hover:from-orange-600 hover:to-amber-600 hover:shadow-lg active:scale-[0.98]"
              >
                <Home
                  size={20}
                  className="transition-transform group-hover:-translate-y-0.5 text-black"
                />

                {t.goHome}
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     MAIN UI
  ======================================================= */

  const languageOptions =
    LANGUAGES.map((l) => ({
      value: l.code,
      label: `${l.native} — ${l.english}`,
    }));

  return (
    <main
      dir={
        isRTL
          ? "rtl"
          : "ltr"
      }
      className="relative min-h-screen bg-amber-50 pb-24 sm:pb-20 font-sans overflow-hidden"
    >
      <GlobalStyles />
      <BackgroundDecoration />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 py-6 sm:px-8 sm:py-12 animate-in fade-in duration-700">

        {/* LOGO AREA */}
        <div className="mb-8 flex justify-center animate-in slide-in-from-top-4 duration-700 delay-100 sm:mb-10">
          <div className="relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
            <div className="absolute inset-0 rounded-[3rem_1rem_4rem_2rem] border-2 border-orange-300/40 bg-amber-100/30 backdrop-blur-md shadow-lg" />

            <Image
              src="/logo.jpg"
              alt="Logo"
              width={72}
              height={72}
              className="relative h-14 w-14 rounded-[1.5rem_0.5rem_1.5rem_0.5rem] object-cover shadow-sm border-2 border-orange-300 transition-transform duration-500 hover:scale-105 sm:h-16 sm:w-16"
              priority
            />
          </div>
        </div>

        {/* HEADER */}
        <header className="relative z-50 mb-6 rounded-[3rem_1rem_3rem_1rem] border-2 border-orange-200/80 bg-amber-100/70 shadow-lg backdrop-blur-xl animate-in slide-in-from-bottom-4 duration-700 delay-200 sm:mb-8">
          <div className="rounded-t-[3rem_1rem_3rem_1rem] overflow-hidden">
            <div className="animate-shimmer-bar h-2 w-full bg-gradient-to-r from-orange-400 via-amber-200 via-red-500 to-orange-600" />
          </div>

          <div className="p-6 sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[2rem_0.5rem_2rem_0.5rem] bg-gradient-to-br from-orange-500 to-amber-600 text-black shadow-md border-2 border-orange-300 transition-transform duration-300 hover:rotate-6">
                  <Users
                    size={26}
                    strokeWidth={2.5}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black uppercase tracking-widest text-orange-900 sm:text-sm">
                    {t.registration}
                  </p>

                  <h1 className="mt-1.5 text-2xl font-black tracking-tight text-orange-950 sm:text-4xl">
                    {t.title}
                  </h1>

                  <p className="mt-2.5 text-sm font-bold leading-relaxed text-amber-950 max-w-xl sm:text-base">
                    {t.description}
                  </p>
                </div>
              </div>

              {/* LANGUAGE */}
              <div className="relative z-[100] w-full sm:max-w-[200px] shrink-0 mt-2 sm:mt-0">
                <CustomDropdown
                  label={t.language}
                  value={language}
                  options={languageOptions}
                  onChange={changeLanguage}
                  icon={
                    <Globe2 size={16} />
                  }
                />
              </div>
            </div>
          </div>
        </header>

        {/* PROGRESS */}
        <div className="mb-6 flex items-center gap-4 rounded-[2rem_1rem_2rem_1rem] border-2 border-orange-200/80 bg-amber-100/60 px-5 py-4 shadow-sm backdrop-blur-md sm:mb-8 sm:px-8 sm:py-5 animate-in fade-in duration-700 delay-300">
          <Step
            number={1}
            label={t.step1}
            active={step === 1}
            completed={step > 1}
          />

          <div className="h-2 flex-1 rounded-full bg-orange-200/80 overflow-hidden shadow-inner border border-orange-300/50">
            <div
              className={`h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-700 ease-out ${
                step > 1
                  ? "w-full"
                  : "w-0"
              }`}
            />
          </div>

          <Step
            number={2}
            label={t.step2}
            active={step === 2}
            completed={false}
          />
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 flex items-start gap-4 rounded-[1.5rem_0.5rem_1.5rem_0.5rem] border-2 border-red-400 bg-red-100/90 p-4 text-sm font-black text-black shadow-sm backdrop-blur-sm animate-in slide-in-from-top-2 duration-300 sm:p-5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[0.5rem_1rem_0.5rem_1rem] bg-red-500 text-black border-2 border-red-700">
              <X
                size={16}
                strokeWidth={3}
              />
            </div>

            <span className="flex-1 pt-0.5 leading-relaxed">
              {error}
            </span>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
              className="mt-0.5 p-1 text-red-900 hover:text-black transition-colors rounded-lg hover:bg-red-300"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* ===================================================
            STEP 1
        =================================================== */}

        {step === 1 && (
          <section className="rounded-[2rem_4rem_1rem_3rem] border-2 border-orange-200/80 bg-amber-100/70 shadow-lg backdrop-blur-xl animate-in slide-in-from-bottom-8 duration-500">
            <div className="rounded-t-[2rem_4rem_1rem_3rem] overflow-hidden">
              <div className="animate-shimmer-bar h-2 w-full bg-gradient-to-r from-orange-400 via-amber-200 via-red-500 to-orange-600" />
            </div>

            <div className="p-6 sm:p-12">
              <h2 className="text-2xl font-black text-orange-950 sm:text-3xl text-center mb-8 tracking-tight">
                {t.question}
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">

                {/* YES */}
                <button
                  type="button"
                  onClick={chooseYes}
                  className="group relative overflow-hidden rounded-[2rem_1rem_3rem_1rem] border-4 border-orange-300/50 bg-amber-50/60 p-6 text-start shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:bg-amber-100 hover:shadow-md active:scale-[0.98] sm:p-8"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-[1rem_2rem_1rem_2rem] bg-gradient-to-br from-orange-400 to-amber-500 text-black shadow-sm border-2 border-orange-300">
                        <Check
                          size={28}
                          strokeWidth={3}
                        />
                      </div>

                      <ArrowRight
                        size={24}
                        className="text-orange-800 opacity-50 transition-all group-hover:translate-x-2 group-hover:opacity-100 group-hover:text-black rtl:rotate-180 rtl:group-hover:-translate-x-2"
                      />
                    </div>

                    <h3 className="mt-6 text-xl font-black text-orange-950 group-hover:text-black transition-colors">
                      {t.yes}
                    </h3>

                    <p className="mt-2 text-sm font-bold leading-relaxed text-amber-900">
                      {t.yesDescription}
                    </p>
                  </div>
                </button>

                {/* NO */}
                <button
                  type="button"
                  onClick={chooseNo}
                  className="group relative overflow-hidden rounded-[1rem_3rem_1rem_2rem] border-4 border-amber-300/50 bg-amber-50/60 p-6 text-start shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-400 hover:bg-amber-100 hover:shadow-md active:scale-[0.98] sm:p-8"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-[2rem_1rem_2rem_1rem] bg-amber-800 text-black shadow-sm border-2 border-amber-950">
                        <X
                          size={28}
                          strokeWidth={3}
                        />
                      </div>

                      <ArrowRight
                        size={24}
                        className="text-amber-800 opacity-50 transition-all group-hover:translate-x-2 group-hover:opacity-100 group-hover:text-black rtl:rotate-180 rtl:group-hover:-translate-x-2"
                      />
                    </div>

                    <h3 className="mt-6 text-xl font-black text-orange-950">
                      {t.no}
                    </h3>

                    <p className="mt-2 text-sm font-bold leading-relaxed text-amber-900">
                      {t.noDescription}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ===================================================
            STEP 2 (NO)
        =================================================== */}

        {step === 2 &&
          attendance === false && (
            <section className="rounded-[2rem_4rem_1rem_3rem] border-2 border-orange-200/80 bg-amber-100/70 shadow-lg backdrop-blur-xl animate-in slide-in-from-bottom-8 duration-500">
              <div className="p-6 sm:p-12 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[2rem_1rem_2rem_1rem] bg-amber-200 text-black shadow-sm border-2 border-orange-300">
                  <Check
                    size={31}
                    strokeWidth={3}
                  />
                </div>

                <h2 className="mt-6 text-2xl font-black text-orange-950 sm:text-3xl">
                  {t.thankYou}
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-sm font-bold leading-relaxed text-amber-900 sm:text-base">
                  {t.noAttendance}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setAttendance(null);
                  }}
                  className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-[1rem_2rem_1rem_2rem] bg-orange-400 px-6 font-black text-black shadow-md border-2 border-orange-500 transition-all hover:bg-orange-500 hover:shadow-lg active:scale-[0.98]"
                >
                  <ArrowLeft
                    size={18}
                    className="text-black rtl:rotate-180"
                  />

                  {t.changeAnswer}
                </button>
              </div>
            </section>
          )}

        {/* ===================================================
            STEP 2 (YES)
        =================================================== */}

        {step === 2 &&
          attendance === true && (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 animate-in slide-in-from-right-8 duration-500"
            >
              <section className="rounded-[2rem_4rem_1rem_3rem] border-2 border-orange-200/80 bg-amber-100/70 shadow-lg backdrop-blur-xl pb-6">
                <div className="rounded-t-[2rem_4rem_1rem_3rem] overflow-hidden">
                  <div className="animate-shimmer-bar h-2 w-full bg-gradient-to-r from-orange-400 via-amber-200 via-red-500 to-orange-600" />
                </div>

                <div className="p-6 sm:p-10 pb-0">
                  <div className="mb-8 border-b-4 border-orange-300/60 pb-6 border-dashed">
                    <h2 className="text-2xl font-black text-orange-950 sm:text-3xl tracking-tight">
                      {t.participantDetails}
                    </h2>

                    <p className="mt-2 text-sm font-bold leading-relaxed text-amber-900 sm:text-base">
                      {t.participantDescription}
                    </p>
                  </div>

                  <div className="space-y-8">
                    {members.map(
                      (
                        member,
                        index
                      ) => {
                        const stateOptions =
                          states.map(
                            (s) => ({
                              value:
                                s.id,
                              label:
                                s.name,
                            })
                          );

                        const districtOptions =
                          member.districts.map(
                            (d) => ({
                              value:
                                d.id,
                              label:
                                d.name,
                            })
                          );

                        const tehsilOptions =
                          member.tehsils.map(
                            (t) => ({
                              value:
                                t.id,
                              label:
                                t.name,
                            })
                          );

                        return (
                          <section
                            key={
                              member.id
                            }
                            style={{
                              animationDelay: `${index * 80}ms`,
                              animationFillMode:
                                "backwards",
                            }}
                            className="animate-in fade-in slide-in-from-bottom-3 duration-500 relative rounded-[2rem_1rem_3rem_1rem] border-2 border-orange-300 bg-amber-50/80 p-5 sm:p-8 shadow-sm transition-all hover:shadow-md backdrop-blur-sm"
                          >

                            {/* MEMBER HEADER */}
                            <div className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-[1rem_0.5rem_1rem_0.5rem] bg-orange-400 shadow-sm font-black text-black text-lg border-2 border-orange-500">
                                  {index +
                                    1}
                                </div>

                                <div>
                                  <h3 className="text-lg font-black text-orange-950">
                                    {t.member}{" "}
                                    {index +
                                      1}
                                  </h3>

                                  {index >
                                    0 && (
                                    <p className="text-xs font-black text-orange-800 mt-1 sm:text-sm">
                                      {
                                        t.additionalMemberNote
                                      }
                                    </p>
                                  )}
                                </div>
                              </div>

                              {members.length >
                                1 &&
                                index >
                                  0 && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeMember(
                                        member.id
                                      )
                                    }
                                    className="group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem_0.5rem_1rem_0.5rem] bg-red-200 border-2 border-red-300 text-black transition-all hover:bg-red-500 hover:border-red-600 hover:shadow-md active:scale-90"
                                    title={
                                      t.removeMember
                                    }
                                  >
                                    <Trash2
                                      size={
                                        18
                                      }
                                      className="transition-transform group-hover:scale-110 text-black"
                                    />
                                  </button>
                                )}
                            </div>

                            {/* NAME + PHONE */}
                            <div className="relative z-10 grid gap-6 sm:grid-cols-2 mt-2">
                              <Field
                                label={
                                  t.fullName
                                }
                                icon={
                                  <User
                                    size={
                                      18
                                    }
                                  />
                                }
                              >
                                <input
                                  type="text"
                                  value={
                                    member.name
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    updateMember(
                                      member.id,
                                      {
                                        name: event
                                          .target
                                          .value,
                                      }
                                    )
                                  }
                                  placeholder={
                                    t.enterName
                                  }
                                  autoComplete="name"
                                />
                              </Field>

                              <Field
                                label={
                                  t.mobileNumber
                                }
                                icon={
                                  <Phone
                                    size={
                                      18
                                    }
                                  />
                                }
                              >
                                <input
                                  type="tel"
                                  inputMode="numeric"
                                  maxLength={
                                    10
                                  }
                                  value={
                                    member.phone
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    updateMember(
                                      member.id,
                                      {
                                        phone:
                                          event.target.value
                                            .replace(
                                              /\D/g,
                                              ""
                                            )
                                            .slice(
                                              0,
                                              10
                                            ),
                                      }
                                    )
                                  }
                                  placeholder={
                                    t.enterPhone
                                  }
                                  autoComplete="tel"
                                />
                              </Field>
                            </div>

                            {/* ONLY FIRST MEMBER GETS LOCATION */}
                            {index ===
                              0 && (
                              <div className="relative z-10">

                                <div className="mt-10 mb-6 flex items-center gap-3">
                                  <div className="h-1 flex-1 bg-orange-300/50 rounded-full" />

                                  <h4 className="text-xs font-black uppercase tracking-widest text-orange-900 flex items-center gap-2 px-2">
                                    <MapPin
                                      size={
                                        14
                                      }
                                      className="text-orange-900"
                                    />

                                    Location
                                    Details
                                  </h4>

                                  <div className="h-1 flex-1 bg-orange-300/50 rounded-full" />
                                </div>

                                <div className="grid gap-6 md:grid-cols-3 pt-2">

                                  {/* STATE */}
                                  <CustomDropdown
                                    label={
                                      t.state
                                    }
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
                                    options={
                                      stateOptions
                                    }
                                    onChange={(
                                      value
                                    ) =>
                                      handleStateChange(
                                        member.id,
                                        value
                                      )
                                    }
                                    icon={
                                      <MapPin
                                        size={
                                          18
                                        }
                                      />
                                    }
                                  />

                                  {/* DISTRICT */}
                                  <CustomDropdown
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
                                      districtOptions
                                    }
                                    onChange={(
                                      value
                                    ) =>
                                      handleDistrictChange(
                                        member.id,
                                        value
                                      )
                                    }
                                    icon={
                                      <MapPin
                                        size={
                                          18
                                        }
                                      />
                                    }
                                  />

                                  {/* TEHSIL */}
                                  <CustomDropdown
                                    label={
                                      t.tehsil
                                    }
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
                                      tehsilOptions
                                    }
                                    onChange={(
                                      value
                                    ) =>
                                      handleTehsilChange(
                                        member.id,
                                        value
                                      )
                                    }
                                    icon={
                                      <MapPin
                                        size={
                                          18
                                        }
                                      />
                                    }
                                  />
                                </div>

                                {/* VILLAGE */}
                                <div className="mt-6">
                                  <Field
                                    label={
                                      t.village
                                    }
                                    icon={
                                      <MapPin
                                        size={
                                          18
                                        }
                                      />
                                    }
                                  >
                                    <input
                                      type="text"
                                      value={
                                        member.village
                                      }
                                      onChange={(
                                        event
                                      ) =>
                                        updateMember(
                                          member.id,
                                          {
                                            village:
                                              event
                                                .target
                                                .value,
                                          }
                                        )
                                      }
                                      placeholder={
                                        t.enterVillage
                                      }
                                      autoComplete="address-level3"
                                    />
                                  </Field>
                                </div>

                                {/* DISTRICT PRABHARI */}
                                {member.districtId && (
                                  <PrabhariSection
                                    title={
                                      t.districtPrabhari
                                    }
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
                              </div>
                            )}
                          </section>
                        );
                      }
                    )}
                  </div>

                  {/* ADD MEMBER */}
                  <button
                    type="button"
                    onClick={
                      addMember
                    }
                    className="group mt-8 flex min-h-16 w-full items-center justify-center gap-3 rounded-[3rem_1rem_3rem_1rem] border-4 border-dashed border-orange-300 bg-amber-200/50 px-6 text-base font-black text-black transition-all duration-300 hover:border-orange-500 hover:bg-orange-300 hover:shadow-md active:scale-[0.98] sm:text-lg"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-[1rem_0.5rem_1rem_0.5rem] bg-orange-400 text-black shadow-sm transition-transform border-2 border-orange-500 group-hover:scale-110 group-hover:bg-orange-600">
                      <Plus
                        size={18}
                        strokeWidth={3}
                        className="text-black"
                      />
                    </div>

                    {t.addMember}
                  </button>
                </div>
              </section>

              {/* ACTIONS */}
              <div
                className="sticky bottom-4 z-20 rounded-[2rem_1rem_2rem_1rem] border-2 border-orange-300/80 bg-amber-100/95 p-3.5 shadow-xl backdrop-blur-xl sm:static sm:bg-transparent sm:shadow-none sm:border-0 sm:p-0 sm:mt-8"
                style={{
                  paddingBottom:
                    "max(1rem, env(safe-area-inset-bottom))",
                }}
              >
                <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between sm:items-center">

                  {/* BACK */}
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setAttendance(
                        null
                      );
                      setError("");
                    }}
                    disabled={
                      isSubmitting
                    }
                    className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-[1rem_2rem_1rem_2rem] bg-amber-200 px-8 font-black text-black shadow-sm border-2 border-orange-300 transition-all hover:bg-orange-300 hover:border-orange-400 hover:shadow-md active:scale-[0.98] disabled:opacity-50"
                  >
                    <ArrowLeft
                      size={18}
                      className="transition-transform group-hover:-translate-x-1 text-black rtl:rotate-180 rtl:group-hover:translate-x-1"
                    />

                    {t.back}
                  </button>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={
                      isSubmitting
                    }
                    className="group relative inline-flex min-h-14 items-center justify-center gap-3 overflow-hidden rounded-[2rem_1rem_2rem_1rem] bg-gradient-to-r from-orange-500 to-amber-500 px-10 font-black text-black shadow-md border-2 border-orange-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:min-w-[280px]"
                  >
                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] rtl:[transform:skew(12deg)_translateX(150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)] rtl:group-hover:[transform:skew(12deg)_translateX(-150%)]">
                      <div className="relative h-full w-12 bg-amber-100/30" />
                    </div>

                    {isSubmitting ? (
                      <>
                        <Loader2
                          size={20}
                          className="animate-spin text-black"
                        />

                        <span className="text-lg text-black">
                          {
                            t.submitting
                          }
                        </span>
                      </>
                    ) : (
                      <>
                        <Check
                          size={20}
                          strokeWidth={3}
                          className="transition-transform group-hover:scale-110 text-black"
                        />

                        <span className="text-lg text-black">
                          {t.submit}
                        </span>
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
   GLOBAL KEYFRAMES & CUSTOM SCROLLBAR
========================================================= */

function GlobalStyles() {
  return (
    <style jsx global>{`
      @keyframes shimmerBar {
        0% {
          background-position: -150% 0;
        }

        100% {
          background-position: 250% 0;
        }
      }

      @keyframes popIn {
        0% {
          transform: scale(0.55);
          opacity: 0;
        }

        65% {
          transform: scale(1.1);
          opacity: 1;
        }

        100% {
          transform: scale(1);
        }
      }

      @keyframes driftDots {
        0% {
          background-position: 0 0;
        }

        100% {
          background-position: 60px 60px;
        }
      }

      .animate-shimmer-bar {
        background-size: 200% 100%;
        animation: shimmerBar 2.5s linear infinite;
      }

      .animate-pop-in {
        animation: popIn
          0.6s
          cubic-bezier(
            0.34,
            1.56,
            0.64,
            1
          )
          both;
      }

      .animate-drift-dots {
        animation: driftDots
          20s linear infinite;
      }

      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }

      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(
          253,
          230,
          138,
          0.5
        );
      }

      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #f97316;
        border-radius: 4px;
      }

      @media (prefers-reduced-motion: reduce) {
        .animate-shimmer-bar,
        .animate-pop-in,
        .animate-drift-dots {
          animation: none !important;
        }
      }
    `}</style>
  );
}

/* =========================================================
   BACKGROUND DECORATION
========================================================= */

function BackgroundDecoration() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-amber-50">
      <div className="absolute -left-[10%] -top-[10%] h-[60%] w-[50%] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-orange-400/10 blur-[60px]" />

      <div className="absolute -right-[20%] -top-[10%] h-[50%] w-[50%] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-red-400/5 blur-[80px]" />

      <div className="absolute left-[20%] top-[30%] h-[50%] w-[45%] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] bg-amber-400/10 blur-[90px]" />

      <div className="absolute -bottom-[15%] left-[0%] h-[50%] w-[60%] rounded-[70%_30%_50%_50%/30%_30%_70%_70%] bg-orange-500/10 blur-[80px]" />

      <div
        className="animate-drift-dots absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(234,88,12,0.15) 2px, transparent 2px)",
          backgroundSize:
            "30px 30px",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#fffbeb_100%)]" />

      <svg className="absolute inset-0 h-full w-full opacity-[0.04] mix-blend-multiply">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>

        <rect
          width="100%"
          height="100%"
          filter="url(#grain)"
        />
      </svg>
    </div>
  );
}

/* =========================================================
   STEP COMPONENT
========================================================= */

function Step({
  number,
  label,
  active,
  completed,
}) {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <div
        className={`relative flex h-10 w-10 items-center justify-center rounded-[1rem_0.5rem_1rem_0.5rem] text-sm font-black shadow-sm transition-all duration-500 border-2 ${
          active || completed
            ? "bg-orange-500 text-black border-orange-600 scale-105"
            : "bg-amber-100 text-amber-900 border-orange-300"
        }`}
      >
        {completed ? (
          <Check
            size={18}
            strokeWidth={3}
            className="animate-in zoom-in text-black"
          />
        ) : (
          number
        )}
      </div>

      <span
        className={`text-sm font-black transition-colors duration-300 ${
          active
            ? "text-orange-950"
            : completed
            ? "text-orange-900"
            : "text-amber-900"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/* =========================================================
   INTERACTIVE FIELD
========================================================= */

function Field({
  label,
  icon,
  children,
}) {
  return (
    <div className="relative group pt-3">
      <div className="absolute -top-1 start-4 z-20 bg-orange-200 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-black transition-colors group-focus-within:bg-orange-500 rounded-[1rem_0.5rem_1rem_0.5rem] shadow-sm border-2 border-orange-400">
        {label}
      </div>

      <div className="relative flex items-center rounded-[1.5rem_0.5rem_1.5rem_0.5rem] border-2 border-orange-300 bg-amber-100/90 transition-all duration-300 group-focus-within:border-orange-500 group-focus-within:bg-amber-200 hover:border-orange-400">
        <span className="pointer-events-none absolute start-4 text-orange-900 transition-colors group-focus-within:text-black">
          {icon}
        </span>

        {React.cloneElement(
          children,
          {
            className:
              "w-full bg-transparent py-4 ps-12 pe-4 text-sm font-black text-black outline-none placeholder:text-amber-900/60",
          }
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
  loading,
  people = [],
  t,
}) {
  return (
    <div className="mt-8 overflow-hidden rounded-[2rem_1rem_3rem_1rem] border-2 border-orange-300 bg-gradient-to-br from-amber-100 to-orange-100 shadow-sm animate-in fade-in slide-in-from-top-4">
      <div className="flex items-center gap-4 border-b-2 border-orange-300/60 px-5 py-4 bg-orange-200/50 backdrop-blur-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-[1rem_0.5rem_1rem_0.5rem] bg-orange-400 text-black shadow-sm border-2 border-orange-500">
          <User
            size={18}
            strokeWidth={3}
            className="text-black"
          />
        </div>

        <h4 className="font-black tracking-tight text-orange-950 text-lg">
          {title}
        </h4>
      </div>

      <div className="p-5 sm:p-6">
        {loading ? (
          <div className="flex items-center gap-3 text-sm font-black text-black bg-amber-200 p-4 rounded-[1rem_2rem_1rem_2rem] shadow-sm border-2 border-orange-300">
            <Loader2
              size={18}
              className="animate-spin text-black"
            />

            {t.loadingPrabhari}
          </div>
        ) : people.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {people.map(
              (
                person,
                personIndex
              ) => (
                <PrabhariCard
                  key={person.id}
                  person={person}
                  index={
                    personIndex
                  }
                />
              )
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3 text-sm font-black text-amber-900 bg-amber-100 p-4 rounded-[2rem_1rem_2rem_1rem] shadow-sm border-2 border-orange-200">
            <User
              size={18}
              className="text-amber-800"
            />

            {t.noPrabhari}
          </div>
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
  index = 0,
}) {
  return (
    <div
      style={{
        animationDelay: `${index * 90}ms`,
        animationFillMode:
          "backwards",
      }}
      className="group animate-in fade-in slide-in-from-bottom-2 duration-500 rounded-[1.5rem_0.5rem_1.5rem_0.5rem] border-2 border-orange-300 bg-amber-50 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-orange-500 hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem_0.5rem_1rem_0.5rem] bg-orange-200 text-black border-2 border-orange-300 transition-all group-hover:bg-orange-400 group-hover:scale-110">
          <User
            size={20}
            className="text-black"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-black text-orange-950 text-lg leading-tight break-words">
            {person.name ||
              "—"}
          </p>

          {person.phone && (
            <a
              href={`tel:${person.phone}`}
              className="mt-2.5 inline-flex items-center gap-2 rounded-[0.5rem_1rem_0.5rem_1rem] bg-amber-200 px-3 py-1.5 text-sm font-black text-black transition-colors hover:bg-orange-400 active:scale-95 border-2 border-orange-300"
            >
              <Phone
                size={14}
                className="text-black"
              />

              {person.phone}
            </a>
          )}

          {person.email && (
            <a
              href={`mailto:${person.email}`}
              className="mt-2 block truncate text-sm font-bold text-amber-900 hover:text-black transition-colors"
            >
              {person.email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}