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
    title: "राज्य राजधानी विरोध प्रदर्शन",
    description: "यदि आप अपने राज्य की राजधानी में होने वाले विरोध प्रदर्शन में शामिल होना चाहते हैं, तो नीचे अपना विवरण दर्ज करें।",
    language: "भाषा",
    chooseLanguage: "भाषा चुनें",
    step1: "पुष्टि",
    step2: "विवरण",
    question: "क्या आप अपने राज्य की राजधानी में विरोध प्रदर्शन के लिए जाना चाहते हैं?",
    yes: "हाँ, मैं जाना चाहता हूँ",
    yesDescription: "राजधानी में होने वाले कार्यक्रम के लिए अपना पंजीकरण करें।",
    no: "नहीं, मैं नहीं जा सकता",
    noDescription: "मैं राज्य राजधानी के कार्यक्रम में शामिल नहीं हो पाऊँगा।",
    participantDetails: "प्रतिभागी का विवरण",
    participantDescription: "आपके साथ आने वाले प्रत्येक सदस्य का विवरण भरें।",
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
    successDescription: "आपका पंजीकरण सफलतापूर्वक जमा कर दिया गया है।",
    registeredMembers: "पंजीकृत सदस्य",
    thankYou: "धन्यवाद",
    noAttendance: "आपने चुना है कि आप राज्य राजधानी के विरोध प्रदर्शन में शामिल नहीं होंगे।",
    requiredName: "कृपया नाम दर्ज करें।",
    requiredPhone: "कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।",
    requiredState: "कृपया राज्य चुनें।",
    requiredDistrict: "कृपया जिला चुनें।",
    requiredTehsil: "कृपया तहसील / प्रखंड चुनें।",
    requiredVillage: "कृपया अपने गाँव का नाम दर्ज करें।",
    submitError: "पंजीकरण जमा नहीं हो पाया। कृपया दोबारा प्रयास करें।",
    noPrabhari: "इस क्षेत्र के लिए प्रभारी की जानकारी उपलब्ध नहीं है।",
    additionalMemberNote: "इस सदस्य के लिए केवल नाम और मोबाइल नंबर दर्ज करें। स्थान की जानकारी पहले सदस्य से ली जाएगी।",
    goHome: "होम पेज पर जाएँ",
  },
  en: {
    registration: "Registration",
    title: "State Capital Protest",
    description: "If you wish to attend the protest in your state capital, please provide your details below.",
    language: "Language",
    chooseLanguage: "Choose language",
    step1: "Confirm",
    step2: "Details",
    question: "Do you want to go to your state capital for the protest?",
    yes: "Yes, I want to go",
    yesDescription: "Register for the event taking place in your state capital.",
    no: "No, I cannot attend",
    noDescription: "I will not be able to attend the state capital event.",
    participantDetails: "Participant Details",
    participantDescription: "Enter the details of everyone who will be attending with you.",
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
    successDescription: "Your registration has been successfully submitted.",
    registeredMembers: "Registered Members",
    thankYou: "Thank You",
    noAttendance: "You have selected that you will not attend the state capital protest.",
    requiredName: "Please enter your name.",
    requiredPhone: "Please enter a valid 10-digit mobile number.",
    requiredState: "Please select a state.",
    requiredDistrict: "Please select a district.",
    requiredTehsil: "Please select a tehsil / block.",
    requiredVillage: "Please enter your village name.",
    submitError: "Registration could not be submitted. Please try again.",
    noPrabhari: "District in-charge information is not available.",
    additionalMemberNote: "For this member, enter only name and mobile number. Location will be taken from the first member.",
    goHome: "Go to Home",
  },
  bn: {
    registration: "নিবন্ধন",
    title: "রাজ্য রাজধানী প্রতিবাদ",
    description: "আপনি যদি আপনার রাজ্যের রাজধানীতে প্রতিবাদে যোগ দিতে চান, তাহলে নিচে আপনার তথ্য দিন।",
    language: "ভাষা",
    chooseLanguage: "ভাষা নির্বাচন করুন",
    step1: "নিশ্চিত করুন",
    step2: "বিবরণ",
    question: "আপনি কি প্রতিবাদের জন্য আপনার রাজ্যের রাজধানীতে যেতে চান?",
    yes: "হ্যাঁ, আমি যেতে চাই",
    yesDescription: "রাজধানীতে অনুষ্ঠিত কর্মসূচির জন্য নিবন্ধন করুন।",
    no: "না, আমি যেতে পারব না",
    noDescription: "আমি রাজ্যের রাজধানীর কর্মসূচিতে যেতে পারব না।",
    participantDetails: "অংশগ্রহণকারীর বিবরণ",
    participantDescription: "আপনার সঙ্গে আসা প্রত্যেক সদস্যের তথ্য দিন।",
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
    noAttendance: "আপনি রাজ্যের রাজধানীর প্রতিবাদে অংশ নেবেন না বলে নির্বাচন করেছেন।",
    requiredName: "অনুগ্রহ করে নাম লিখুন।",
    requiredPhone: "অনুগ্রহ করে সঠিক ১০ সংখ্যার মোবাইল নম্বর দিন।",
    requiredState: "অনুগ্রহ করে রাজ্য নির্বাচন করুন।",
    requiredDistrict: "অনুগ্রহ করে জেলা নির্বাচন করুন।",
    requiredTehsil: "অনুগ্রহ করে তহসিল / ব্লক নির্বাচন করুন।",
    requiredVillage: "অনুগ্রহ করে গ্রামের নাম লিখুন।",
    submitError: "নিবন্ধন জমা দেওয়া যায়নি। আবার চেষ্টা করুন।",
    noPrabhari: "জেলা প্রভারির তথ্য পাওয়া যায়নি।",
    additionalMemberNote: "এই সদস্যের জন্য শুধু নাম ও মোবাইল নম্বর দিন। অবস্থানের তথ্য প্রথম সদস্যের থেকে নেওয়া হবে।",
    goHome: "হোম পেজে যান",
  },
  ur: {
    registration: "رجسٹریشن",
    title: "ریاستی دارالحکومت احتجاج",
    description: "اگر آپ اپنے ریاستی دارالحکومت میں ہونے والے احتجاج میں شرکت کرنا چاہتے ہیں تو نیچے اپنی معلومات درج کریں۔",
    language: "زبان",
    chooseLanguage: "زبان منتخب کریں",
    step1: "تصدیق",
    step2: "تفصیلات",
    question: "کیا آپ احتجاج کے لیے اپنے ریاستی دارالحکومت جانا چاہتے ہیں؟",
    yes: "ہاں، میں جانا چاہتا ہوں",
    yesDescription: "دارالحکومت میں ہونے والے پروگرام کے لیے رجسٹر کریں۔",
    no: "نہیں، میں شرکت نہیں کر سکتا",
    noDescription: "میں ریاستی دارالحکومت کے پروگرام میں شرکت نہیں کر سکوں گا۔",
    participantDetails: "شرکت کنندہ کی تفصیلات",
    participantDescription: "اپنے ساتھ آنے والے ہر رکن کی تفصیلات درج کریں۔",
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
    successDescription: "آپ کی رجسٹریشن کامیابی سے جمع ہو گئی ہے۔",
    registeredMembers: "رجسٹرڈ اراکین",
    thankYou: "شکریہ",
    noAttendance: "آپ نے منتخب کیا ہے کہ آپ ریاستی دارالحکومت کے احتجاج میں شرکت نہیں کریں گے۔",
    requiredName: "براہ کرم نام درج کریں۔",
    requiredPhone: "براہ کرم درست 10 ہندسوں کا موبائل نمبر درج کریں۔",
    requiredState: "براہ کرم ریاست منتخب کریں۔",
    requiredDistrict: "براہ کرم ضلع منتخب کریں۔",
    requiredTehsil: "براہ کرم تحصیل / بلاک منتخب کریں۔",
    requiredVillage: "براہ کرم اپنے گاؤں کا نام درج کریں۔",
    submitError: "رجسٹریشن جمع نہیں ہو سکی۔ دوبارہ کوشش کریں۔",
    noPrabhari: "ضلعی انچارج کی معلومات دستیاب نہیں ہیں۔",
    additionalMemberNote: "اس رکن کے لیے صرف نام اور موبائل نمبر درج کریں۔ مقام کی معلومات پہلے رکن سے لی جائے گی۔",
    goHome: "ہوم پیج پر جائیں",
  },
};

/* =========================================================
   CREATE MEMBER
========================================================= */
function createMember() {
  return {
    id: typeof crypto !== "undefined" ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
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
  const response = await fetch(url, { method: "GET", cache: "no-store" });
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Invalid response from ${url}`);
  }
  if (!response.ok) {
    throw new Error(data?.error || data?.message || `Request failed: ${response.status}`);
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
   CUSTOM DROPDOWN COMPONENT (RTL Supported & Abstract Saffron)
========================================================= */
function CustomDropdown({ label, value, options = [], onChange, disabled, loading, placeholder, icon }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOpt = options.find((o) => String(o.value) === String(value));

  return (
    <div className="relative group pt-3" ref={ref}>
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
            disabled ? "text-amber-900/50" : "text-orange-900 group-focus-within:text-black"
          }`}
        >
          {icon}
        </span>
        
        <span
          className={`w-full py-4 ps-12 pe-10 text-sm font-black outline-none block truncate ${
            !selectedOpt ? "text-amber-900/70" : "text-black"
          }`}
        >
          {selectedOpt ? selectedOpt.label : placeholder}
        </span>

        {loading ? (
          <Loader2 size={18} className="pointer-events-none absolute end-4 animate-spin text-black" />
        ) : (
          <ChevronDown
            size={18}
            className={`pointer-events-none absolute end-4 transition-transform duration-300 ${
              disabled ? "text-amber-900/50" : "text-orange-900 group-hover:text-black"
            } ${isOpen ? "rotate-180 text-black" : ""}`}
          />
        )}
      </button>

      {/* Options Menu */}
      {isOpen && !disabled && !loading && (
        <div className="absolute start-0 end-0 top-full mt-2 z-50 rounded-[1.5rem_0.5rem_1.5rem_0.5rem] border-2 border-orange-400 bg-amber-50 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
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
  const [members, setMembers] = useState([createMember()]);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingDistricts, setLoadingDistricts] = useState({});
  const [loadingDetails, setLoadingDetails] = useState({});
  const [loadingPrabhari, setLoadingPrabhari] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [attendance, setAttendance] = useState(null);
  const [error, setError] = useState("");

  const t = TRANSLATIONS[language] && Object.keys(TRANSLATIONS[language]).length > 0 ? TRANSLATIONS[language] : TRANSLATIONS.hi;
  const isRTL = language === "ur";

  // LOAD CACHED LANGUAGE
  useEffect(() => {
    try {
      const saved = localStorage.getItem("protest-language");
      if (saved && TRANSLATIONS[saved] && Object.keys(TRANSLATIONS[saved]).length > 5) {
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

  // LOAD STATES
  useEffect(() => {
    let cancelled = false;
    const loadStates = async () => {
      try {
        setLoadingStates(true);
        const result = await getJson("/api/states");
        const data = normalizeArray(result);
        if (!cancelled) setStates(data);
      } catch (err) {
        console.error("Failed to load states:", err);
        if (!cancelled) {
          setStates([]);
          setError(err.message || t.submitError);
        }
      } finally {
        if (!cancelled) setLoadingStates(false);
      }
    };
    loadStates();
    return () => { cancelled = true; };
  }, [t.submitError]);

  const updateMember = (memberId, changes) => {
    setMembers((current) => current.map((member) => (member.id === memberId ? { ...member, ...changes } : member)));
  };

  const handleStateChange = async (memberId, stateId) => {
    const state = states.find((item) => String(item.id) === String(stateId));
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

    setLoadingDistricts((current) => ({ ...current, [memberId]: true }));
    try {
      const result = await getJson(`/api/districts?stateId=${encodeURIComponent(stateId)}`);
      updateMember(memberId, { districts: normalizeArray(result) });
    } catch (err) {
      console.error("District API error:", err);
      updateMember(memberId, { districts: [] });
      setError(err.message || t.submitError);
    } finally {
      setLoadingDistricts((current) => ({ ...current, [memberId]: false }));
    }
  };

  const loadDistrictPrabhari = async (memberId, stateId, districtId) => {
    if (!stateId || !districtId) return;
    setLoadingPrabhari((current) => ({ ...current, [`district-${memberId}`]: true }));
    try {
      const params = new URLSearchParams();
      params.set("level", "DISTRICT");
      params.set("stateId", stateId);
      params.set("districtId", districtId);
      params.set("page", "1");
      params.set("limit", "50");
      const result = await getJson(`/api/prabharis?${params.toString()}`);
      updateMember(memberId, { districtPrabharis: normalizeArray(result) });
    } catch (err) {
      console.error("District Prabhari API error:", err);
      updateMember(memberId, { districtPrabharis: [] });
    } finally {
      setLoadingPrabhari((current) => ({ ...current, [`district-${memberId}`]: false }));
    }
  };

  const loadTehsils = async (memberId, districtId) => {
    if (!districtId) return;
    setLoadingDetails((current) => ({ ...current, [memberId]: true }));
    try {
      const result = await getJson(`/api/tehsils?districtId=${encodeURIComponent(districtId)}`);
      updateMember(memberId, { tehsils: normalizeArray(result) });
    } catch (err) {
      console.error("Tehsil API error:", err);
      updateMember(memberId, { tehsils: [] });
      setError(err.message || t.submitError);
    } finally {
      setLoadingDetails((current) => ({ ...current, [memberId]: false }));
    }
  };

  const handleDistrictChange = async (memberId, districtId) => {
    const member = members.find((item) => item.id === memberId);
    const district = member?.districts?.find((item) => String(item.id) === String(districtId));

    updateMember(memberId, {
      districtId: district?.id || "",
      districtName: district?.name || "",
      tehsilId: "",
      tehsilName: "",
      tehsils: [],
      districtPrabharis: [],
    });

    if (!districtId) return;

    // Load tehsils list and District Prabhari concurrently
    await Promise.all([
      loadTehsils(memberId, districtId),
      loadDistrictPrabhari(memberId, member?.stateId, districtId),
    ]);
  };

  const handleTehsilChange = (memberId, tehsilId) => {
    const member = members.find((item) => item.id === memberId);
    const tehsil = member?.tehsils?.find((item) => String(item.id) === String(tehsilId));

    updateMember(memberId, {
      tehsilId: tehsil?.id || "",
      tehsilName: tehsil?.name || "",
    });
  };

  const addMember = () => setMembers((current) => [...current, createMember()]);

  const removeMember = (memberId) => {
    setMembers((current) => current.filter((member) => member.id !== memberId));
  };

  const validateMembers = () => {
    // Only primary member needs full location validation
    const primary = members[0];
    if (!primary?.name.trim()) return t.requiredName;
    if (!/^\d{10}$/.test(primary.phone)) return t.requiredPhone;
    if (!primary.stateId) return t.requiredState;
    if (!primary.districtId) return t.requiredDistrict;
    if (!primary.tehsilId) return t.requiredTehsil;
    if (!primary.village.trim()) return t.requiredVillage;

    // Subsequent members only need name and phone
    for (let i = 1; i < members.length; i++) {
      const member = members[i];
      if (!member.name.trim()) return t.requiredName;
      if (!/^\d{10}$/.test(member.phone)) return t.requiredPhone;
    }
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const validationError = validateMembers();
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
        members: members.map((member) => ({
          name: member.name.trim(),
          phone: member.phone,
          // Map everyone's location to the primary member's location
          stateId: primary.stateId,
          districtId: primary.districtId,
          tehsilId: primary.tehsilId,
          village: primary.village.trim(),
        })),
      };

      const response = await fetch("/api/protest-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || data?.message || t.submitError);
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Registration submit error:", err);
      setError(err.message || t.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <main dir={isRTL ? "rtl" : "ltr"} className="relative min-h-screen bg-amber-50/50 px-4 py-6 sm:py-8 font-sans overflow-hidden">
          <GlobalStyles />
          <BackgroundDecoration />
          <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center animate-in fade-in zoom-in duration-500">
            <div className="w-full rounded-[3rem_1rem_3rem_1rem] border-2 border-orange-200/50 bg-amber-100/40 p-8 text-center shadow-lg backdrop-blur-xl sm:p-14">
              <div className="animate-pop-in mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem_1rem_2rem_1rem] bg-gradient-to-br from-orange-400 to-amber-500 text-black shadow-inner border-4 border-orange-200">
                <CheckCircle2 size={48} strokeWidth={2.5} />
              </div>
              <h1 className="mt-8 text-3xl font-black text-orange-950 sm:text-4xl tracking-tight">
                {t.thankYou}
              </h1>
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-amber-900 font-bold sm:text-lg">
                {t.noAttendance}
              </p>
              <button
                type="button"
                onClick={() => (window.location.href = "/")}
                className="group mt-10 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-[1rem_2rem_1rem_2rem] bg-orange-500 px-8 font-black text-black shadow-md transition-all duration-300 hover:bg-orange-600 hover:shadow-lg active:scale-[0.98]"
              >
                <Home size={20} className="transition-transform group-hover:-translate-y-0.5 text-black" />
                {t.goHome}
              </button>
            </div>
          </div>
        </main>
      );
    }

    // Attendance is true, show registered members and location derived from primary
    const primary = members[0];

    return (
      <main dir={isRTL ? "rtl" : "ltr"} className="relative min-h-screen bg-amber-50/50 px-4 py-6 sm:py-8 font-sans overflow-hidden">
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
                  <CheckCircle2 size={44} strokeWidth={2.5} className="sm:hidden" />
                  <CheckCircle2 size={48} strokeWidth={2.5} className="hidden sm:block" />
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
                  <Users className="text-black" size={24} />
                  {t.registeredMembers}
                </h2>
                <div className="space-y-4">
                  {members.map((member, index) => (
                    <div
                      key={member.id}
                      style={{ animationDelay: `${index * 90}ms`, animationFillMode: "backwards" }}
                      className="group animate-in fade-in slide-in-from-bottom-2 duration-500 rounded-[1rem_2rem_1rem_2rem] border-2 border-orange-200/80 bg-amber-100 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-orange-400 hover:shadow-md"
                    >
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem_0.5rem_1rem_0.5rem] bg-gradient-to-br from-orange-300 to-amber-400 text-black ring-2 ring-orange-200 transition-all group-hover:scale-110">
                          <User size={20} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-lg font-black text-orange-950 break-words">
                            {member.name}
                          </p>
                          <p className="mt-1 text-sm font-black text-orange-800">
                            {member.phone}
                          </p>
                          <div className="mt-4 flex items-start gap-2 rounded-[1rem_2rem_1rem_2rem] bg-amber-200/50 p-3.5 text-sm font-bold text-orange-950 border-2 border-orange-200/50">
                            <MapPin size={16} className="mt-0.5 shrink-0 text-orange-950" />
                            <p className="leading-snug break-words">
                              {/* Always display the primary member's location for all registered members */}
                              {[primary.stateName, primary.districtName, primary.tehsilName, primary.village]
                                .filter(Boolean)
                                .join(" • ")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => (window.location.href = "/")}
                className="group mt-10 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-[2rem_1rem_2rem_1rem] bg-gradient-to-r from-orange-500 to-amber-500 px-8 font-black text-black shadow-md transition-all duration-300 hover:from-orange-600 hover:to-amber-600 hover:shadow-lg active:scale-[0.98]"
              >
                <Home size={20} className="transition-transform group-hover:-translate-y-0.5 text-black" />
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
  const languageOptions = LANGUAGES.map(l => ({ value: l.code, label: `${l.native} — ${l.english}` }));

  return (
    <main dir={isRTL ? "rtl" : "ltr"} className="relative min-h-screen bg-amber-50 pb-24 sm:pb-20 font-sans overflow-hidden">
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
        <header className="mb-6 rounded-[3rem_1rem_3rem_1rem] border-2 border-orange-200/80 bg-amber-100/70 shadow-lg backdrop-blur-xl animate-in slide-in-from-bottom-4 duration-700 delay-200 sm:mb-8">
          <div className="rounded-t-[3rem_1rem_3rem_1rem] overflow-hidden">
            <div className="animate-shimmer-bar h-2 w-full bg-gradient-to-r from-orange-400 via-amber-200 via-red-500 to-orange-600" />
          </div>
          
          <div className="p-6 sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[2rem_0.5rem_2rem_0.5rem] bg-gradient-to-br from-orange-500 to-amber-600 text-black shadow-md border-2 border-orange-300 transition-transform duration-300 hover:rotate-6">
                  <Users size={26} strokeWidth={2.5} />
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
              <div className="w-full sm:max-w-[200px] shrink-0 mt-2 sm:mt-0">
                <CustomDropdown
                  label={t.language}
                  value={language}
                  options={languageOptions}
                  onChange={changeLanguage}
                  icon={<Globe2 size={16} />}
                />
              </div>
            </div>
          </div>
        </header>

        {/* PROGRESS */}
        <div className="mb-6 flex items-center gap-4 rounded-[2rem_1rem_2rem_1rem] border-2 border-orange-200/80 bg-amber-100/60 px-5 py-4 shadow-sm backdrop-blur-md sm:mb-8 sm:px-8 sm:py-5 animate-in fade-in duration-700 delay-300">
          <Step number={1} label={t.step1} active={step === 1} completed={step > 1} />
          <div className="h-2 flex-1 rounded-full bg-orange-200/80 overflow-hidden shadow-inner border border-orange-300/50">
            <div
              className={`h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-700 ease-out ${
                step > 1 ? "w-full" : "w-0"
              }`}
            />
          </div>
          <Step number={2} label={t.step2} active={step === 2} completed={false} />
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 flex items-start gap-4 rounded-[1.5rem_0.5rem_1.5rem_0.5rem] border-2 border-red-400 bg-red-100/90 p-4 text-sm font-black text-black shadow-sm backdrop-blur-sm animate-in slide-in-from-top-2 duration-300 sm:p-5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[0.5rem_1rem_0.5rem_1rem] bg-red-500 text-black border-2 border-red-700">
              <X size={16} strokeWidth={3} />
            </div>
            <span className="flex-1 pt-0.5 leading-relaxed">{error}</span>
            <button
              type="button"
              onClick={() => setError("")}
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
                <button
                  type="button"
                  onClick={chooseYes}
                  className="group relative overflow-hidden rounded-[2rem_1rem_3rem_1rem] border-4 border-orange-300/50 bg-amber-50/60 p-6 text-start shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:bg-amber-100 hover:shadow-md active:scale-[0.98] sm:p-8"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-[1rem_2rem_1rem_2rem] bg-gradient-to-br from-orange-400 to-amber-500 text-black shadow-sm border-2 border-orange-300">
                        <Check size={28} strokeWidth={3} />
                      </div>
                      <ArrowRight size={24} className="text-orange-800 opacity-50 transition-all group-hover:translate-x-2 group-hover:opacity-100 group-hover:text-black rtl:rotate-180 rtl:group-hover:-translate-x-2" />
                    </div>
                    <h3 className="mt-6 text-xl font-black text-orange-950 group-hover:text-black transition-colors">
                      {t.yes}
                    </h3>
                    <p className="mt-2 text-sm font-bold leading-relaxed text-amber-900">
                      {t.yesDescription}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={chooseNo}
                  className="group relative overflow-hidden rounded-[1rem_3rem_1rem_2rem] border-4 border-amber-300/50 bg-amber-50/60 p-6 text-start shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-400 hover:bg-amber-100 hover:shadow-md active:scale-[0.98] sm:p-8"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-[2rem_1rem_2rem_1rem] bg-amber-800 text-black shadow-sm border-2 border-amber-950">
                        <X size={28} strokeWidth={3} />
                      </div>
                      <ArrowRight size={24} className="text-amber-800 opacity-50 transition-all group-hover:translate-x-2 group-hover:opacity-100 group-hover:text-black rtl:rotate-180 rtl:group-hover:-translate-x-2" />
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
        {step === 2 && attendance === false && (
          <section className="rounded-[2rem_4rem_1rem_3rem] border-2 border-orange-200/80 bg-amber-100/70 shadow-lg backdrop-blur-xl animate-in slide-in-from-bottom-8 duration-500">
            <div className="p-6 sm:p-12 text-center">
               <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[2rem_1rem_2rem_1rem] bg-amber-200 text-black shadow-sm border-2 border-orange-300">
                 <Check size={31} strokeWidth={3} />
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
                 <ArrowLeft size={18} className="text-black rtl:rotate-180" />
                 {t.changeAnswer}
               </button>
            </div>
          </section>
        )}

        {/* ===================================================
            STEP 2 (YES)
        =================================================== */}
        {step === 2 && attendance === true && (
          <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-right-8 duration-500">
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
                  {members.map((member, index) => {
                    const stateOptions = states.map(s => ({ value: s.id, label: s.name }));
                    const districtOptions = member.districts.map(d => ({ value: d.id, label: d.name }));
                    const tehsilOptions = member.tehsils.map(t => ({ value: t.id, label: t.name }));

                    return (
                      <section
                        key={member.id}
                        style={{ animationDelay: `${index * 80}ms`, animationFillMode: "backwards" }}
                        className="animate-in fade-in slide-in-from-bottom-3 duration-500 relative rounded-[2rem_1rem_3rem_1rem] border-2 border-orange-300 bg-amber-50/80 p-5 sm:p-8 shadow-sm transition-all hover:shadow-md  backdrop-blur-sm"
                      >
                        {/* MEMBER HEADER */}
                        <div className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[1rem_0.5rem_1rem_0.5rem] bg-orange-400 shadow-sm font-black text-black text-lg border-2 border-orange-500">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="text-lg font-black text-orange-950">
                                {t.member} {index + 1}
                              </h3>
                              {index > 0 && (
                                <p className="text-xs font-black text-orange-800 mt-1 sm:text-sm">
                                  {t.additionalMemberNote}
                                </p>
                              )}
                            </div>
                          </div>

                          {members.length > 1 && index > 0 && (
                            <button
                              type="button"
                              onClick={() => removeMember(member.id)}
                              className="group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem_0.5rem_1rem_0.5rem] bg-red-200 border-2 border-red-300 text-black transition-all hover:bg-red-500 hover:border-red-600 hover:shadow-md active:scale-90"
                              title={t.removeMember}
                            >
                              <Trash2 size={18} className="transition-transform group-hover:scale-110 text-black" />
                            </button>
                          )}
                        </div>

                        {/* NAME + PHONE */}
                        <div className="relative z-10 grid gap-6 sm:grid-cols-2 mt-2">
                          <Field label={t.fullName} icon={<User size={18} />}>
                            <input
                              type="text"
                              value={member.name}
                              onChange={(event) => updateMember(member.id, { name: event.target.value })}
                              placeholder={t.enterName}
                              autoComplete="name"
                            />
                          </Field>

                          <Field label={t.mobileNumber} icon={<Phone size={18} />}>
                            <input
                              type="tel"
                              inputMode="numeric"
                              maxLength={10}
                              value={member.phone}
                              onChange={(event) => updateMember(member.id, { phone: event.target.value.replace(/\D/g, "").slice(0, 10) })}
                              placeholder={t.enterPhone}
                              autoComplete="tel"
                            />
                          </Field>
                        </div>

                        {/* =================================================
                            ONLY FIRST MEMBER GETS LOCATION
                        ================================================= */}
                        {index === 0 && (
                          <div className="relative z-10">
                            <div className="mt-10 mb-6 flex items-center gap-3">
                               <div className="h-1 flex-1 bg-orange-300/50 rounded-full"></div>
                               <h4 className="text-xs font-black uppercase tracking-widest text-orange-900 flex items-center gap-2 px-2">
                                 <MapPin size={14} className="text-orange-900" /> Location Details
                               </h4>
                               <div className="h-1 flex-1 bg-orange-300/50 rounded-full"></div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-3 pt-2">
                              <CustomDropdown
                                label={t.state}
                                value={member.stateId}
                                disabled={loadingStates}
                                loading={loadingStates}
                                placeholder={loadingStates ? t.loadingStates : t.selectState}
                                options={stateOptions}
                                onChange={(value) => handleStateChange(member.id, value)}
                                icon={<MapPin size={18} />}
                              />

                              <CustomDropdown
                                label={t.district}
                                value={member.districtId}
                                disabled={!member.stateId || loadingDistricts[member.id]}
                                loading={loadingDistricts[member.id]}
                                placeholder={
                                  !member.stateId ? t.selectStateFirst : loadingDistricts[member.id] ? t.loadingDistricts : t.selectDistrict
                                }
                                options={districtOptions}
                                onChange={(value) => handleDistrictChange(member.id, value)}
                                icon={<MapPin size={18} />}
                              />

                              <CustomDropdown
                                label={t.tehsil}
                                value={member.tehsilId}
                                disabled={!member.districtId || loadingDetails[member.id]}
                                loading={loadingDetails[member.id]}
                                placeholder={
                                  !member.districtId ? t.selectDistrictFirst : loadingDetails[member.id] ? t.loadingDetails : t.selectTehsil
                                }
                                options={tehsilOptions}
                                onChange={(value) => handleTehsilChange(member.id, value)}
                                icon={<MapPin size={18} />}
                              />
                            </div>

                            {/* VILLAGE */}
                            <div className="mt-6">
                              <Field label={t.village} icon={<MapPin size={18} />}>
                                <input
                                  type="text"
                                  value={member.village}
                                  onChange={(event) => updateMember(member.id, { village: event.target.value })}
                                  placeholder={t.enterVillage}
                                  autoComplete="address-level3"
                                />
                              </Field>
                            </div>

                            {/* DISTRICT PRABHARI ONLY */}
                            {member.districtId && (
                              <PrabhariSection
                                title={t.districtPrabhari}
                                loading={loadingPrabhari[`district-${member.id}`]}
                                people={member.districtPrabharis}
                                t={t}
                              />
                            )}
                          </div>
                        )}
                      </section>
                    );
                  })}
                </div>

                {/* ADD MEMBER */}
                <button
                  type="button"
                  onClick={addMember}
                  className="group mt-8 flex min-h-16 w-full items-center justify-center gap-3 rounded-[3rem_1rem_3rem_1rem] border-4 border-dashed border-orange-300 bg-amber-200/50 px-6 text-base font-black text-black transition-all duration-300 hover:border-orange-500 hover:bg-orange-300 hover:shadow-md active:scale-[0.98] sm:text-lg"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-[1rem_0.5rem_1rem_0.5rem] bg-orange-400 text-black shadow-sm transition-transform border-2 border-orange-500 group-hover:scale-110 group-hover:bg-orange-600">
                     <Plus size={18} strokeWidth={3} className="text-black" />
                  </div>
                  {t.addMember}
                </button>
              </div>
            </section>

            {/* ACTIONS */}
            <div
              className="sticky bottom-4 z-20 rounded-[2rem_1rem_2rem_1rem] border-2 border-orange-300/80 bg-amber-100/95 p-3.5 shadow-xl backdrop-blur-xl sm:static sm:bg-transparent sm:shadow-none sm:border-0 sm:p-0 sm:mt-8"
              style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
            >
              <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between sm:items-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setAttendance(null);
                    setError("");
                  }}
                  disabled={isSubmitting}
                  className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-[1rem_2rem_1rem_2rem] bg-amber-200 px-8 font-black text-black shadow-sm border-2 border-orange-300 transition-all hover:bg-orange-300 hover:border-orange-400 hover:shadow-md active:scale-[0.98] disabled:opacity-50"
                >
                  <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1 text-black rtl:rotate-180 rtl:group-hover:translate-x-1" />
                  {t.back}
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative inline-flex min-h-14 items-center justify-center gap-3 overflow-hidden rounded-[2rem_1rem_2rem_1rem] bg-gradient-to-r from-orange-500 to-amber-500 px-10 font-black text-black shadow-md border-2 border-orange-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:min-w-[280px]"
                >
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] rtl:[transform:skew(12deg)_translateX(150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)] rtl:group-hover:[transform:skew(12deg)_translateX(-150%)]">
                    <div className="relative h-full w-12 bg-amber-100/30" />
                  </div>

                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin text-black" />
                      <span className="text-lg text-black">{t.submitting}</span>
                    </>
                  ) : (
                    <>
                      <Check size={20} strokeWidth={3} className="transition-transform group-hover:scale-110 text-black" />
                      <span className="text-lg text-black">{t.submit}</span>
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
        0% { background-position: -150% 0; }
        100% { background-position: 250% 0; }
      }
      @keyframes popIn {
        0% { transform: scale(0.55); opacity: 0; }
        65% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(1); }
      }
      @keyframes driftDots {
        0% { background-position: 0 0; }
        100% { background-position: 60px 60px; }
      }
      .animate-shimmer-bar { background-size: 200% 100%; animation: shimmerBar 2.5s linear infinite; }
      .animate-pop-in { animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
      .animate-drift-dots { animation: driftDots 20s linear infinite; }
      
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(253, 230, 138, 0.5);
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #f97316;
        border-radius: 4px;
      }

      @media (prefers-reduced-motion: reduce) {
        .animate-shimmer-bar, .animate-pop-in, .animate-drift-dots {
          animation: none !important;
        }
      }
    `}</style>
  );
}

/* =========================================================
   BACKGROUND DECORATION (Subdued Saffron / Abstract Theme)
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
          backgroundImage: "radial-gradient(rgba(234,88,12,0.15) 2px, transparent 2px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#fffbeb_100%)]" />

      <svg className="absolute inset-0 h-full w-full opacity-[0.04] mix-blend-multiply">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}

/* =========================================================
   STEP COMPONENT
========================================================= */
function Step({ number, label, active, completed }) {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <div
        className={`relative flex h-10 w-10 items-center justify-center rounded-[1rem_0.5rem_1rem_0.5rem] text-sm font-black shadow-sm transition-all duration-500 border-2 ${
          active || completed
            ? "bg-orange-500 text-black border-orange-600 scale-105"
            : "bg-amber-100 text-amber-900 border-orange-300"
        }`}
      >
        {completed ? <Check size={18} strokeWidth={3} className="animate-in zoom-in text-black" /> : number}
      </div>
      <span
        className={`text-sm font-black transition-colors duration-300 ${
          active ? "text-orange-950" : completed ? "text-orange-900" : "text-amber-900"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/* =========================================================
   INTERACTIVE FIELD (Abstract Floating Design)
========================================================= */
function Field({ label, icon, children }) {
  return (
    <div className="relative group pt-3">
      <div className="absolute -top-1 start-4 z-20 bg-orange-200 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-black transition-colors group-focus-within:bg-orange-500 rounded-[1rem_0.5rem_1rem_0.5rem] shadow-sm border-2 border-orange-400">
        {label}
      </div>
      <div className="relative flex items-center rounded-[1.5rem_0.5rem_1.5rem_0.5rem] border-2 border-orange-300 bg-amber-100/90 transition-all duration-300 group-focus-within:border-orange-500 group-focus-within:bg-amber-200 hover:border-orange-400">
        <span className="pointer-events-none absolute start-4 text-orange-900 transition-colors group-focus-within:text-black">
          {icon}
        </span>
        {React.cloneElement(children, {
          className: "w-full bg-transparent py-4 ps-12 pe-4 text-sm font-black text-black outline-none placeholder:text-amber-900/60",
        })}
      </div>
    </div>
  );
}

/* =========================================================
   PRABHARI SECTION
========================================================= */
function PrabhariSection({ title, loading, people = [], t }) {
  return (
    <div className="mt-8 overflow-hidden rounded-[2rem_1rem_3rem_1rem] border-2 border-orange-300 bg-gradient-to-br from-amber-100 to-orange-100 shadow-sm animate-in fade-in slide-in-from-top-4">
      <div className="flex items-center gap-4 border-b-2 border-orange-300/60 px-5 py-4 bg-orange-200/50 backdrop-blur-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-[1rem_0.5rem_1rem_0.5rem] bg-orange-400 text-black shadow-sm border-2 border-orange-500">
          <User size={18} strokeWidth={3} className="text-black" />
        </div>
        <h4 className="font-black tracking-tight text-orange-950 text-lg">
          {title}
        </h4>
      </div>
      <div className="p-5 sm:p-6">
        {loading ? (
          <div className="flex items-center gap-3 text-sm font-black text-black bg-amber-200 p-4 rounded-[1rem_2rem_1rem_2rem] shadow-sm border-2 border-orange-300">
            <Loader2 size={18} className="animate-spin text-black" />
            {t.loadingPrabhari}
          </div>
        ) : people.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {people.map((person, personIndex) => (
              <PrabhariCard key={person.id} person={person} index={personIndex} />
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-3 text-sm font-black text-amber-900 bg-amber-100 p-4 rounded-[2rem_1rem_2rem_1rem] shadow-sm border-2 border-orange-200">
            <User size={18} className="text-amber-800" />
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
function PrabhariCard({ person, index = 0 }) {
  return (
    <div
      style={{ animationDelay: `${index * 90}ms`, animationFillMode: "backwards" }}
      className="group animate-in fade-in slide-in-from-bottom-2 duration-500 rounded-[1.5rem_0.5rem_1.5rem_0.5rem] border-2 border-orange-300 bg-amber-50 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-orange-500 hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem_0.5rem_1rem_0.5rem] bg-orange-200 text-black border-2 border-orange-300 transition-all group-hover:bg-orange-400 group-hover:scale-110">
          <User size={20} className="text-black" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-black text-orange-950 text-lg leading-tight break-words">
            {person.name || "—"}
          </p>
          {person.phone && (
            <a
              href={`tel:${person.phone}`}
              className="mt-2.5 inline-flex items-center gap-2 rounded-[0.5rem_1rem_0.5rem_1rem] bg-amber-200 px-3 py-1.5 text-sm font-black text-black transition-colors hover:bg-orange-400 active:scale-95 border-2 border-orange-300"
            >
              <Phone size={14} className="text-black" />
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