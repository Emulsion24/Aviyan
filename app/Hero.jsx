"use client";
import { FaWhatsapp, FaEnvelope,FaYoutube,FaApple ,FaFacebook, FaInstagram, FaTwitter, FaSpotify } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, LogIn, UserPlus, Phone, Mail, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

const HeroWithNav = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    altPhone: "",
    state: "",
    district: "",
    village: "",
    meetingInfo: ""
  });
  const [availableDistricts, setAvailableDistricts] = useState([]);

  const stateDistrictData = {
    "Andhra Pradesh": [
      "Anantapuramu", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", 
      "Nellore (SPSR Nellore)", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", 
      "West Godavari", "Alluri Sitharama Raju", "Anakapalli", "Annamayya", "Bapatla", 
      "Eluru", "Kakinada", "Konaseema", "Nandyal", "NTR", "Palnadu", "Parvathipuram Manyam", 
      "Sri Sathya Sai", "Tirupati"
    ],
    "Arunachal Pradesh": [
      "Anjaw", "Capital Complex ( Itanagar )", "Changlang", "Dibang Valley", "East Kameng", 
      "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", 
      "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", 
      "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", 
      "West Kameng", "West Siang"
    ],
    "Assam": [
      "Bajali", "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang",
      "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi",
      "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", 
      "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar",
      "Tinsukia", "Udalguri", "West Karbi Anglong"
    ],
    "Bihar": [
      "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar",
      "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar",
      "Khagaria", "Kishanganj", "Lakhisarai", "Madhubani", "Munger", "Muzaffarpur", "Nawada", "Nalanda",
      "Narcanda", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Sheikhpura", "Sheohar",
      "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"
    ],
    "Chhattisgarh": [
      "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari",
      "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kanker", "Kawardha", "Korba", "Korea", 
      "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Rajnandgaon", "Raipur", "Surajpur", "Sukma", "Surguja"
    ],
    "Goa": ["North Goa", "South Goa"],
    "Gujarat": [
      "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad",
      "Chhota Udepur", "Dahod", "Dang", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda",
      "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar",
      "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"
    ],
    "Haryana": [
      "Ambala", "Charkhi Dadri", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal",
      "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari",
      "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"
    ],
    "Himachal Pradesh": [
      "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahul & Spiti", "Mandi",
      "Shimla", "Sirmaur", "Solan", "Una"
    ],
    "Jharkhand": [
      "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih",
      "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga",
      "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela-Kharsawan", "Simdega", "West Singhbhum"
    ],
    "Karnataka": [
      "Bengaluru Urban", "Bengaluru Rural", "Mysuru", "Hubli-Dharwad", "Mangaluru", "Belagavi", "Kalaburagi",
      "Davanagere", "Ballari", "Vijayapura", "Raichur", "Shivamogga", "Tumakuru", "Bidar", "Hospet",
      "Gadag-Betageri", "Robertsonpet", "Hassan", "Bhadravati", "Chitradurga", "Udupi", "Kolar", "Mandya",
      "Chikkamagaluru", "Gangavati", "Bagalkot", "Ranebennuru", "Yadgir", "Haveri", "Bellary", "Koppal",
      "Chamarajanagar", "Chickballapur", "Kodagu", "Ramanagara", "Uttara Kannada", "Dakshina Kannada"
    ],
    "Kerala": [
      "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam",
      "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta",
      "Thiruvananthapuram", "Thrissur", "Wayanad"
    ],
    "Madhya Pradesh": [
      "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", 
      "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara",
      "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", 
      "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", 
      "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", 
      "Neemuch", "Niwari", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", 
      "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", 
      "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"
    ],
    "Maharashtra": [
      "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara",
      "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli",
      "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban",
      "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar",
      "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg",
      "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
    ],
    "Manipur": [
      "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West",
      "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl",
      "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"
    ],
    "Meghalaya": [
      "East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills",
      "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills",
      "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"
    ],
    "Mizoram": [
      "Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai",
      "Lunglei", "Mamit", "Saiha", "Saitual", "Serchhip"
    ],
    "Nagaland": [
      "Chümoukedima", "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung",
      "Mon", "Niuland", "Noklak", "Peren", "Phek", "Tseminyu", "Tuensang", "Wokha", "Zünheboto"
    ],
    "Odisha": [
      "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack",
      "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur",
      "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha",
      "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada",
      "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"
    ],
    "Punjab": [
      "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka",
      "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana",
      "Malerkotla", "Mansa", "Moga", "Mohali (SAS Nagar)", "Muktsar", "Pathankot",
      "Patiala", "Rupnagar", "Sangrur", "Shaheed Bhagat Singh Nagar (Nawanshahr)", "Tarn Taran"
    ],
    "Rajasthan": [
      "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara",
      "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur",
      "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu",
      "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand",
      "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"
    ],
    "Sikkim": [
      "Gangtok", "Mangan (North Sikkim)", "Namchi (South Sikkim)", "Gyalshing (West Sikkim)", "Pakyong", "Soreng"
    ],
    "Tamil Nadu": [
      "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri",
      "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur",
      "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal",
      "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem",
      "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli",
      "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai",
      "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
    ],
    "Telangana": [
      "Adilabad", "Bhadradri Kothagudem", "Hanamkonda", "Hyderabad", "Jagtial",
      "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy",
      "Karimnagar", "Khammam", "Komaram Bheem Asifabad", "Mahabubabad",
      "Mahabubnagar", "Mancherial", "Medak", "Medchal–Malkajgiri", "Mulugu",
      "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad",
      "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet",
      "Suryapet", "Vikarabad", "Wanaparthy", "Warangal", "Yadadri Bhuvanagiri"
    ],
    "Tripura": [
      "Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura",
      "Unakoti", "West Tripura"
    ],
    "Uttarakhand": [
      "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar",
      "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal",
      "Udham Singh Nagar", "Uttarkashi"
    ],
    "Uttar Pradesh": [
      "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha (J.P. Nagar)",
      "Auraiya", "Ayodhya (Faizabad)", "Azamgarh", "Baghpat", "Bahraich", "Ballia",
      "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor",
      "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah",
      "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad",
      "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur (Panchsheel Nagar)",
      "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat",
      "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri (Lakhimpur Kheri)", "Kushinagar",
      "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura",
      "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit",
      "Pratapgarh", "Prayagraj (Allahabad)", "Rae Bareli", "Rampur", "Saharanpur",
      "Sambhal (Bhim Nagar)", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti",
      "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
    ],
    "West Bengal": [
      "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur",
      "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong",
      "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas",
      "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur",
      "Purulia", "South 24 Parganas", "Uttar Dinajpur"
    ],
    "Andaman and Nicobar Islands": [
      "Nicobar", "North and Middle Andaman", "South Andaman"
    ],
    "Chandigarh": ["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": [
      "Dadra and Nagar Haveli", "Daman", "Diu"
    ],
    "Delhi (National Capital Territory)": [
      "Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi",
      "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"
    ],
    "Jammu and Kashmir": [
      "Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu",
      "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri",
      "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"
    ],
    "Ladakh": ["Kargil", "Leh"],
    "Lakshadweep": [
      "Agatti", "Amini", "Andrott", "Bitra", "Chetlat", "Kadmat", "Kalpeni",
      "Kavaratti", "Kilthan", "Minicoy"
    ],
    "Puducherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"]
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById("registration-form")?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const goToLogin = () => {
    router.push("/login");
    setIsMobileMenuOpen(false);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
    setIsMobileMenuOpen(false);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "state") {
      setAvailableDistricts(stateDistrictData[value] || []);
      setFormData(prev => ({
        ...prev,
        state: value,
        district: ""
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.state || !formData.district || !formData.village) {
      alert("कृपया सभी आवश्यक फ़ील्ड भरें / Please fill all required fields");
      return;
    }
    
    if (formData.phone.length !== 10) {
      alert("कृपया 10 अंकों का फ़ोन नंबर दर्ज करें / Please enter a 10-digit phone number");
      return;
    }

    if (formData.altPhone && formData.altPhone.length !== 10) {
      alert("कृपया वैकल्पिक फ़ोन नंबर 10 अंकों का दर्ज करें / Please enter a 10-digit alternate phone number");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message || "पंजीकरण सफल! Registration successful!");
        
        setFormData({
          name: "",
          phone: "",
          email: "",
          altPhone: "",
          state: "",
          district: "",
          village: "",
          meetingInfo: ""
        });
        setAvailableDistricts([]);
        closePopup();
      } else {
        alert(data.error || "पंजीकरण में त्रुटि / Registration error occurred");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("पंजीकरण में त्रुटि / Registration error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isPopupOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
              disabled={isSubmitting}
            >
              <X size={24} className="text-gray-600" />
            </button>

            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-6 rounded-t-2xl">
              <h2 className="text-3xl font-bold text-white text-center">बैठक करवाने हेतु पंजीकरण</h2>
              <p className="text-white/90 text-center mt-2">अपने क्षेत्र मे अभियान की बैठक करवाने हेतु ये फॉर्म भरे :</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  नाम / Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors disabled:bg-gray-100"
                  placeholder="अपना नाम दर्ज करें"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  फ़ोन नंबर / Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength="10"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors disabled:bg-gray-100"
                  placeholder="10 अंकों का नंबर"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">ईमेल / Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors disabled:bg-gray-100"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">वैकल्पिक फ़ोन / Alternate Phone</label>
                <input
                  type="tel"
                  name="altPhone"
                  value={formData.altPhone}
                  onChange={handleInputChange}
                  maxLength="10"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors disabled:bg-gray-100"
                  placeholder="वैकल्पिक नंबर"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  राज्य / State <span className="text-red-500">*</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors bg-white disabled:bg-gray-100"
                >
                  <option value="">राज्य चुनें / Select State</option>
                  {Object.keys(stateDistrictData).map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  जिला / District <span className="text-red-500">*</span>
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  disabled={isSubmitting || !formData.state}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors bg-white disabled:bg-gray-100"
                >
                  <option value="">
                    {formData.state ? "जिला चुनें / Select District" : "पहले राज्य चुनें / Select State First"}
                  </option>
                  {availableDistricts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  गाँव / तहसील / Village / Tehsil <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors disabled:bg-gray-100"
                  placeholder="गाँव या तहसील दर्ज करें"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">बैठक की जानकारी / Meeting Information</label>
                <textarea
                  name="meetingInfo"
                  value={formData.meetingInfo}
                  onChange={handleInputChange}
                  rows="3"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors resize-none disabled:bg-gray-100"
                  placeholder="बैठक से संबंधित कोई विशेष जानकारी..."
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold text-lg rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? "सबमिट हो रहा है... / Submitting..." : "पंजीकरण सबमिट करें / Submit Registration"}
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b-2 border-orange-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 p-1 shadow-xl group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                <Image src="/logo.jpg" alt="गौ सम्मान लोगो" width={56} height={56} className="rounded-full object-cover" priority />
              </div>
              <div className="flex items-center justify-center leading-none min-h-[60px]">
                <Image src="/gau.png" alt="गौ सम्मान टेक्स्ट लोगो" width={160} height={60} priority className="object-contain w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px] h-auto" />
                <Image src="/samman.png" alt="आह्वान अभियान टेक्स्ट लोगो" width={160} height={60} priority className="object-contain w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px] h-auto -mt-[6px]" />
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button onClick={scrollToForm} className="px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:shadow-lg hover:scale-105">
                <UserPlus className="inline-block mr-2" size={18} />पंजीकरण करें
              </button>
              <button onClick={goToLogin} className="px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 border-2 border-orange-500 text-orange-600 hover:bg-orange-50">
                <LogIn className="inline-block mr-2" size={18} />लॉगिन
              </button>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 rounded-lg transition-colors text-gray-800 hover:bg-gray-100">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-orange-100 shadow-lg">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <button onClick={scrollToForm} className="w-full px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:shadow-lg transition-all">
                <UserPlus className="inline-block mr-2" size={18} />पंजीकरण करें
              </button>
              <button onClick={goToLogin} className="w-full px-6 py-3 rounded-lg font-semibold border-2 border-orange-500 text-orange-600 hover:bg-orange-50 transition-all">
                <LogIn className="inline-block mr-2" size={18} />लॉगिन
              </button>
            </div>
          </div>
        )}
      </nav>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-100">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-orange-300/40 to-transparent">
            <div className="flex justify-around items-start">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col items-center animate-swing" style={{ animationDelay: `${i * 0.2}s` }}>
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 my-0.5 shadow-md"></div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="absolute top-1/4 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-1/3 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative z-10 px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 animate-fadeIn">
              <span className="text-lg md:text-xl font-bold text-red-600 px-4 py-2">।। जय नंदी बाबा ।।</span>
              <span className="text-lg md:text-xl font-bold text-red-600 px-4 py-2">।। श्री करनला ।।</span>
              <span className="text-lg md:text-xl font-bold text-red-600 px-4 py-2">।। जय गोमाता ।।</span>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-orange-200 p-8 md:p-12 animate-slideUp">
              <div className="flex flex-wrap justify-center items-center mb-10 gap-8">
                {["। सेवा ।", "। सुरक्षा ।", "। सम्मान ।"].map((text, i) => (
                  <span key={i} className="relative text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-400 drop-shadow-[0_0_10px_rgba(255,193,7,0.4)]">
                    {text}
                    <span className="absolute inset-x-0 -bottom-1 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60"></span>
                  </span>
                ))}
              </div>

              <div className="text-center space-y-6 mb-8">
                <div className="flex justify-center mb-6">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-orange-300 shadow-2xl animate-pulse-slow">
                    <Image src="/logo.jpg" alt="गौ सम्मान लोगो" width={256} height={256} className="object-cover" priority />
                  </div>
                </div>

                <div className="relative flex flex-col items-center justify-center leading-none mx-auto">
                  <Image src="/gau.png" alt="गौ सम्मान टेक्स्ट लोगो" width={600} height={400} className="object-contain h-auto w-[250px] sm:w-[320px] md:w-[400px] lg:w-[480px] xl:w-[550px] mt-2" priority />
                  <Image src="/samman.png" alt="आह्वान अभियान टेक्स्ट लोगो" width={600} height={400} className="object-contain h-auto w-[250px] sm:w-[320px] md:w-[400px] lg:w-[480px] xl:w-[550px] -translate-y-[8px]" priority />
                </div>
              </div>
  
              <div className="flex flex-wrap justify-center gap-4 pt-6">
                <button onClick={scrollToForm} className="group px-10 py-5 text-xl font-bold rounded-2xl bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-600 text-white shadow-2xl hover:shadow-orange-300 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                  <span className="flex items-center gap-3"><UserPlus size={24} />अभियान में शामिल हों</span>
                </button>
                
                <button onClick={openPopup} className="group px-10 py-5 text-xl font-bold rounded-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 text-white shadow-2xl hover:shadow-green-300 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                  <span className="flex items-center gap-3"><MapPin size={24} />बैठक करवाने हेतु </span>
                </button>
              </div>

              </div>
<div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] aspect-square mt-4 sm:mt-6 mx-auto mb-4 sm:mb-6">
              {/* Center circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-18 sm:h-18 md:w-22 md:h-22 lg:w-24 lg:h-24 bg-gradient-to-br from-orange-50 to-white rounded-full shadow-xl flex items-center justify-center z-10 border-2 border-orange-200">
                <div className="text-center px-2">
                  <p className="text-orange-700 font-bold text-[11px] sm:text-xs md:text-sm">Connect</p>
                  <p className="text-orange-500 text-[9px] sm:text-[10px] md:text-xs font-medium">With Us</p>
                </div>
              </div>

              {/* WhatsApp - Position 1 (0° - Top) */}
              <a
                href="https://wa.me/918239711008"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-13 sm:h-13 md:w-15 md:h-15 lg:w-16 lg:h-16 bg-green-50 hover:bg-green-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-green-200"
                style={{ transform: 'translate(calc(-50% + 0px), calc(-50% + -110px))', transformOrigin: 'center' }}
              >
                <FaWhatsapp className="text-green-600 text-xl sm:text-2xl md:text-2xl lg:text-3xl group-hover:scale-125 transition-transform duration-300" />
              </a>

              {/* YouTube - Position 2 (45°) */}
              <a
                href="https://www.youtube.com/@dhenutv"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-13 sm:h-13 md:w-15 md:h-15 lg:w-16 lg:h-16 bg-red-50 hover:bg-red-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-red-200"
                style={{ transform: 'translate(calc(-50% + 78px), calc(-50% + -78px))', transformOrigin: 'center' }}
              >
                <FaYoutube className="text-red-600 text-xl sm:text-2xl md:text-2xl lg:text-3xl group-hover:scale-125 transition-transform duration-300" />
              </a>

              {/* Email - Position 3 (90° - Right) */}
              <a
                href="mailto:GSAabhiyan2027@gmail.com"
                className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-13 sm:h-13 md:w-15 md:h-15 lg:w-16 lg:h-16 bg-orange-50 hover:bg-orange-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-orange-200"
                style={{ transform: 'translate(calc(-50% + 110px), calc(-50% + 0px))', transformOrigin: 'center' }}
              >
                <FaEnvelope className="text-orange-600 text-xl sm:text-2xl md:text-2xl lg:text-3xl group-hover:scale-125 transition-transform duration-300" />
              </a>

              {/* Facebook - Position 4 (135°) */}
              <a
                href="https://www.facebook.com/people/%E0%A4%97%E0%A5%8C-%E0%A4%B8%E0%A4%AE%E0%A5%8D%E0%A4%AE%E0%A4%BE%E0%A4%A8-%E0%A4%86%E0%A4%B9%E0%A5%8D%E0%A4%B5%E0%A4%BE%E0%A4%A8-%E0%A4%85%E0%A4%AD%E0%A4%BF%E0%A4%AF%E0%A4%BE%E0%A4%A8/pfbid0tctmKc4T96rbmjdFGmDc2U77YfHheskkXdMJvsSwsuHGnNkvJdE9pszznsNx9sQVl/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-13 sm:h-13 md:w-15 md:h-15 lg:w-16 lg:h-16 bg-blue-50 hover:bg-blue-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-blue-200"
                style={{ transform: 'translate(calc(-50% + 78px), calc(-50% + 78px))', transformOrigin: 'center' }}
              >
                <FaFacebook className="text-blue-700 text-xl sm:text-2xl md:text-2xl lg:text-3xl group-hover:scale-125 transition-transform duration-300" />
              </a>

              {/* Instagram - Position 5 (180° - Bottom) */}
              <a
                href="https://www.instagram.com/gausmmaanaahvaan/#"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-13 sm:h-13 md:w-15 md:h-15 lg:w-16 lg:h-16 bg-pink-50 hover:bg-pink-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-pink-200"
                style={{ transform: 'translate(calc(-50% + 0px), calc(-50% + 110px))', transformOrigin: 'center' }}
              >
                <FaInstagram className="text-pink-700 text-xl sm:text-2xl md:text-2xl lg:text-3xl group-hover:scale-125 transition-transform duration-300" />
              </a>

              {/* Twitter - Position 6 (225°) */}
              <a
                href="https://twitter.com"
                className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-13 sm:h-13 md:w-15 md:h-15 lg:w-16 lg:h-16 bg-sky-50 hover:bg-sky-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-sky-200"
                style={{ transform: 'translate(calc(-50% + -78px), calc(-50% + 78px))', transformOrigin: 'center' }}
              >
                <FaTwitter className="text-sky-600 text-xl sm:text-2xl md:text-2xl lg:text-3xl group-hover:scale-125 transition-transform duration-300" />
              </a>

              {/* Spotify - Position 7 (270° - Left) */}
              <a
                href="https://open.spotify.com"
                className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-13 sm:h-13 md:w-15 md:h-15 lg:w-16 lg:h-16 bg-emerald-50 hover:bg-emerald-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-emerald-200"
                style={{ transform: 'translate(calc(-50% + -110px), calc(-50% + 0px))', transformOrigin: 'center' }}
              >
                <FaSpotify className="text-emerald-600 text-xl sm:text-2xl md:text-2xl lg:text-3xl group-hover:scale-125 transition-transform duration-300" />
              </a>

              {/* Apple Music - Position 8 (315°) */}
              <a
                href="mailto:gausamman@gmail.com"
                className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-13 sm:h-13 md:w-15 md:h-15 lg:w-16 lg:h-16 bg-gray-50 hover:bg-gray-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-gray-200"
                style={{ transform: 'translate(calc(-50% + -78px), calc(-50% + -78px))', transformOrigin: 'center' }}
              >
                <FaApple className="text-gray-800 text-xl sm:text-2xl md:text-2xl lg:text-3xl group-hover:scale-125 transition-transform duration-300" />
              </a>
         
       </div>
            <div className="mt-8 mb-8 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur-sm rounded-full shadow-lg border-2 border-orange-200">
                <p className="text-sm md:text-base font-semibold text-gray-700">मातर: सर्वभूतानाम्,गाव: सर्वसुखप्रदा:।</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end opacity-80">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="text-4xl md:text-6xl" style={{ transform: i >= 3 ? "scale(1) scaleX(-1)" : "scale(1)" }}>
              <Image src="/3.png" alt="Decorative Flower" width={100} height={100} />
            </div>
          ))}
        </div>
      </section>
      <style jsx>{`
              @media (min-width: 640px) {
                .relative.aspect-square a:nth-of-type(1) {
                  transform: translate(calc(-50% + 0px), calc(-50% + -120px)) !important;
                }
                .relative.aspect-square a:nth-of-type(2) {
                  transform: translate(calc(-50% + 85px), calc(-50% + -85px)) !important;
                }
                .relative.aspect-square a:nth-of-type(3) {
                  transform: translate(calc(-50% + 120px), calc(-50% + 0px)) !important;
                }
                .relative.aspect-square a:nth-of-type(4) {
                  transform: translate(calc(-50% + 85px), calc(-50% + 85px)) !important;
                }
                .relative.aspect-square a:nth-of-type(5) {
                  transform: translate(calc(-50% + 0px), calc(-50% + 120px)) !important;
                }
                .relative.aspect-square a:nth-of-type(6) {
                  transform: translate(calc(-50% + -85px), calc(-50% + 85px)) !important;
                }
                .relative.aspect-square a:nth-of-type(7) {
                  transform: translate(calc(-50% + -120px), calc(-50% + 0px)) !important;
                }
                .relative.aspect-square a:nth-of-type(8) {
                  transform: translate(calc(-50% + -85px), calc(-50% + -85px)) !important;
                }
              }
              
              @media (min-width: 768px) {
                .relative.aspect-square a:nth-of-type(1) {
                  transform: translate(calc(-50% + 0px), calc(-50% + -130px)) !important;
                }
                .relative.aspect-square a:nth-of-type(2) {
                  transform: translate(calc(-50% + 92px), calc(-50% + -92px)) !important;
                }
                .relative.aspect-square a:nth-of-type(3) {
                  transform: translate(calc(-50% + 130px), calc(-50% + 0px)) !important;
                }
                .relative.aspect-square a:nth-of-type(4) {
                  transform: translate(calc(-50% + 92px), calc(-50% + 92px)) !important;
                }
                .relative.aspect-square a:nth-of-type(5) {
                  transform: translate(calc(-50% + 0px), calc(-50% + 130px)) !important;
                }
                .relative.aspect-square a:nth-of-type(6) {
                  transform: translate(calc(-50% + -92px), calc(-50% + 92px)) !important;
                }
                .relative.aspect-square a:nth-of-type(7) {
                  transform: translate(calc(-50% + -130px), calc(-50% + 0px)) !important;
                }
                .relative.aspect-square a:nth-of-type(8) {
                  transform: translate(calc(-50% + -92px), calc(-50% + -92px)) !important;
                }
              }
              
              @media (min-width: 1024px) {
                .relative.aspect-square a:nth-of-type(1) {
                  transform: translate(calc(-50% + 0px), calc(-50% + -145px)) !important;
                }
                .relative.aspect-square a:nth-of-type(2) {
                  transform: translate(calc(-50% + 103px), calc(-50% + -103px)) !important;
                }
                .relative.aspect-square a:nth-of-type(3) {
                  transform: translate(calc(-50% + 145px), calc(-50% + 0px)) !important;
                }
                .relative.aspect-square a:nth-of-type(4) {
                  transform: translate(calc(-50% + 103px), calc(-50% + 103px)) !important;
                }
                .relative.aspect-square a:nth-of-type(5) {
                  transform: translate(calc(-50% + 0px), calc(-50% + 145px)) !important;
                }
                .relative.aspect-square a:nth-of-type(6) {
                  transform: translate(calc(-50% + -103px), calc(-50% + 103px)) !important;
                }
                .relative.aspect-square a:nth-of-type(7) {
                  transform: translate(calc(-50% + -145px), calc(-50% + 0px)) !important;
                }
                .relative.aspect-square a:nth-of-type(8) {
                  transform: translate(calc(-50% + -103px), calc(-50% + -103px)) !important;
                }
              }
            `}</style>

      <section className="relative py-12 md:py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-rose-400 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

              <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 rounded-2xl overflow-hidden shadow-xl border-4 border-yellow-500 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-yellow-300 opacity-60"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-yellow-300 opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-yellow-300 opacity-60"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-yellow-300 opacity-60"></div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

                  <div className="relative bg-gradient-to-br from-orange-700 via-amber-400 to-yellow-700 rounded-2xl overflow-hidden shadow-xl border-4 border-yellow-400 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-yellow-300 opacity-60"></div>
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-yellow-300 opacity-60"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-yellow-300 opacity-60"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-yellow-300 opacity-60"></div>

                    <div className="relative px-8 py-10 md:px-12 md:py-12 text-center space-y-8">
                      <div className="inline-flex items-center gap-3 px-8 py-3 bg-white backdrop-blur-sm rounded-full border-2 border-yellow-300 shadow-lg">
                        <span className="text-xl md:text-2xl font-bold text-red-600">✦</span>
                        <span className="text-2xl md:text-4xl font-bold bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 text-transparent">अभियान कार्यकारिणी</span>
                        <span className="text-xl md:text-2xl font-bold text-red-600">✦</span>
                      </div>

                      <div className="space-y-6 text-yellow-100 font-semibold">
                        <p className="text-2xl md:text-3xl font-extrabold text-yellow-200">
                          प्रधान संरक्षक  
                        </p>
                        <p><span className="text-lg md:text-2xl text-red-700">गौमाता</span> <span className="text-lg md:text-2xl text-red-700">(आद्यशक्ति मां सुरभि)</span></p>
                     <div className="w-28 h-1.5 mx-auto mt-4 bg-gradient-to-r from-blue-500 via-blue-300 to-blue-900 rounded-full shadow-md"></div>
                        <p className="text-2xl md:text-3xl font-extrabold text-yellow-200 pt-4">
                          अध्यक्ष  
                        </p>
                        <p><span className="text-lg md:text-2xl text-red-700">नंदी बाबा</span> <span className="text-lg md:text-2xl text-red-700">(नीलमणि वृषभदेव)</span></p>
                       
                        <div className="w-28 h-1.5 mx-auto mt-4 bg-gradient-to-r from-blue-500 via-blue-300 to-blue-900 rounded-full shadow-md"></div>
                        <p className="text-2xl md:text-3xl font-extrabold text-yellow-200 pt-4">आशीर्वाद</p>
                        <p className="text-lg md:text-2xl font-extrabold text-red-700 leading-relaxed">भारतीय परम्परा के समस्त आराध्य देवी देवता</p>
                        
                        <div className="w-28 h-1.5 mx-auto mt-4 bg-gradient-to-r from-blue-500 via-blue-300 to-blue-900 rounded-full shadow-md"></div>
                        <p className="text-2xl md:text-3xl font-extrabold text-yellow-200 pt-4">सहयोग</p>
                        
                        <p className="text-lg md:text-2xl font-extrabold text-red-700 leading-relaxed max-w-3xl mx-auto">
                          भारतीय परम्परा के सभी आचार्य, मूर्धन्य संत, महापुरुष, सभी गो संत, गो भक्त, गोरक्षक, गो सेवक, गो पालक, गो पुत्र, गो वत्स, एवं गो प्रेमी जन
                        </p>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400"></div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes swing {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(10px); }
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes grow {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.6); }
        }

        .animate-fadeIn { animation: fadeIn 1s ease-out; }
        .animate-slideUp { animation: slideUp 0.8s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-swing { animation: swing 3s ease-in-out infinite; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-grow { animation: grow 0.6s ease-out forwards; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }

        .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }

        .animation-delay-1000 { animation-delay: 0.5s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </>
  );
};

export default HeroWithNav;