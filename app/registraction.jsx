"use client";
import toast from "react-hot-toast";

import { useState, useEffect } from "react";
import { CheckCircle2, Loader2, User, Mail, Phone, MapPin, Home, Building2, Map } from "lucide-react";
import Image from "next/image";

// State-District mapping for India
const STATE_DISTRICTS = {
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

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    altphone: "",
    description: "",
    state: "",
    district: "",
    village: "",
    pincode: "",
  });

  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Update available districts when state changes
  useEffect(() => {
    if (formData.state) {
      setAvailableDistricts(STATE_DISTRICTS[formData.state] || []);
      // Reset district if it doesn't belong to new state
      if (!STATE_DISTRICTS[formData.state]?.includes(formData.district)) {
        setFormData(prev => ({ ...prev, district: "" }));
      }
    } else {
      setAvailableDistricts([]);
      setFormData(prev => ({ ...prev, district: "" }));
    }
  }, [formData.state, formData.district]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Validation for required fields
    if (!formData.name.trim()) {
      setError("कृपया अपना पूरा नाम दर्ज करें");
      setLoading(false);
      return;
    }

    if (!formData.phone.trim() || !/^[0-9]{10}$/.test(formData.phone)) {
      setError("कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें");
      setLoading(false);
      return;
    }

    if (formData.altphone && !/^[0-9]{10}$/.test(formData.altphone)) {
      setError("वैकल्पिक मोबाइल नंबर 10 अंकों का होना चाहिए");
      setLoading(false);
      return;
    }

    if (!formData.state.trim()) {
      setError("कृपया राज्य चुनें");
      setLoading(false);
      return;
    }

    if (!formData.district.trim()) {
      setError("कृपया जिला चुनें");
      setLoading(false);
      return;
    }

    if (!formData.village.trim()) {
      setError("कृपया गांव/शहर का नाम दर्ज करें");
      setLoading(false);
      return;
    }

    

    // Optional email validation
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("कृपया एक वैध ईमेल दर्ज करें");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        setSuccess(true);
        toast.success("पंजीकरण सफल हुआ!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          altphone: "",
          description: "",
          state: "",
          district: "",
          village: "",
          pincode: "",
        });
        
        // Scroll to top to show success message
     setTimeout(() => {
    const messageElement = document.getElementById('message');
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 100);
        
        // Hide success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(result.message || "पंजीकरण में समस्या हुई। कृपया पुनः प्रयास करें।");
        toast.error(result.message || "पंजीकरण में समस्या हुई। कृपया पुनः प्रयास करें।");
        setTimeout(() => {
    const errorElement = document.getElementById('error');
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 100);
      }
    } catch (err) {
      console.error(err);
      setError("सबमिट करने में समस्या हुई। कृपया पुनः प्रयास करें।");
      toast.error("सबमिट करने में समस्या हुई। कृपया पुनः प्रयास करें।");
      setTimeout(() => {
    const errorElement = document.getElementById('error');
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 100);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="registration-form"
      className="relative py-24 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-100 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <Image
              src="/logo.jpg"
              alt="गौ सम्मान लोगो"
              width={100}
              height={100}
              className="rounded-full object-cover shadow-xl"
              priority
            />
          </div>
          
          <div className="flex items-center justify-center gap-6 md:gap-8 mb-4">
            {/* Left ornament */}
            <Image
              src="/3.png"
              alt="left decoration"
              width={64}
              height={64}
              className="w-12 md:w-16 opacity-95 animate-bounce drop-shadow-[0_4px_8px_rgba(255,166,0,0.4)]"
            />

            {/* Main Heading */}
            <div className="flex-shrink-0">
              <h2
                className="text-4xl md:text-5xl font-extrabold leading-tight
                  bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-500 bg-clip-text text-transparent
                  tracking-wide drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)]"
              >
                अभियान में शामिल हों
              </h2>
            </div>

            {/* Right ornament */}
            <Image
              src="/2.png"
              alt="right decoration"
              width={64}
              height={64}
              className="w-12 md:w-16 opacity-95 animate-bounce drop-shadow-[0_4px_8px_rgba(255,166,0,0.4)]"
              style={{ animationDelay: '1s' }}
            />
          </div>
          
          <div className="w-28 h-1.5 mx-auto bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 rounded-full shadow-md mb-4"></div>
          
          <p className="text-gray-600 text-lg font-medium">गौ सम्मान आह्वान अभियान के लिए पंजीकरण करें</p>
        </div>

        {/* Success Message */}
        {success && (
          <div id= "message" className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 text-green-800 p-6 rounded-2xl flex items-center gap-4 shadow-xl">
            <CheckCircle2 size={32} className="text-green-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-xl mb-1">✅ पंजीकरण सफल हुआ!</h3>
              <p className="text-green-700">आपका पंजीकरण सफलतापूर्वक पूर्ण हो गया है। धन्यवाद!</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div id="error" className="mb-8 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-500 text-red-800 p-6 rounded-2xl flex items-center gap-4 shadow-xl">
            <span className="text-3xl flex-shrink-0">❌</span>
            <div>
              <h3 className="font-bold text-xl mb-1">त्रुटि!</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white/90 backdrop-blur-xl border-2 border-orange-100 shadow-2xl rounded-3xl p-8 md:p-12">
          <div className="space-y-8">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3 pb-3 border-b-2 border-orange-200">
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-2 rounded-lg shadow-md">
                  <User size={24} className="text-white" />
                </div>
                व्यक्तिगत जानकारी
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="relative group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <User size={16} className="text-orange-500" />
                    पूरा नाम <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="अपना पूरा नाम दर्ज करें"
                  />
                </div>

                {/* Email */}
                <div className="relative group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    ईमेल
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="example@email.com (वैकल्पिक)"
                  />
                </div>

                {/* Phone */}
                <div className="relative group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone size={16} className="text-orange-500" />
                    मोबाइल नंबर <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    maxLength={10}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="10 अंकों का मोबाइल नंबर"
                  />
                </div>

                {/* Alternative Phone */}
                <div className="relative group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    वैकल्पिक मोबाइल नंबर
                  </label>
                  <input
                    type="tel"
                    name="altphone"
                    value={formData.altphone}
                    onChange={handleChange}
                    disabled={loading}
                    maxLength={10}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="वैकल्पिक नंबर (यदि हो)"
                  />
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3 pb-3 border-b-2 border-orange-200">
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-2 rounded-lg shadow-md">
                  <MapPin size={24} className="text-white" />
                </div>
                पता जानकारी
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* State */}
                <div className="relative group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Map size={16} className="text-orange-500" />
                    राज्य <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer"
                  >
                    <option value="">राज्य चुनें</option>
                    {Object.keys(STATE_DISTRICTS).map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 top-8">
                    <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>

                {/* District */}
                <div className="relative group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Building2 size={16} className="text-orange-500" />
                    जिला <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    disabled={loading || !formData.state}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer"
                  >
                    <option value="">जिला चुनें</option>
                    {availableDistricts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 top-8">
                    <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                  {!formData.state && (
                    <p className="text-xs text-gray-500 mt-1">पहले राज्य चुनें</p>
                  )}
                </div>

                {/* Village */}
                <div className="relative group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Home size={16} className="text-orange-500" />
                    गांव / शहर/तहसील <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="village"
                    value={formData.village}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="गांव,शहर  या  तहसील का नाम"
                  />
                </div>

                {/* Pincode */}
                <div className="relative group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin size={16} className="text-orange-500" />
                    पिन कोड 
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
            
                    disabled={loading}
                    maxLength={6}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="6 अंकों का पिन कोड"
                  />
                </div>
              </div>

              {/* Full Address (Description) */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Home size={16} className="text-gray-400" />
                  आप किस प्रकार की सेवाएं देना चाहते है ( किसी एक जिले की व्यवस्था , या किसी एक तहसील की व्यवस्था या पत्रक छपवाकर उनका वितरण करेंगे )
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  disabled={loading}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all shadow-sm resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="आप किस प्रकार की सेवाएं देना चाहते है ( किसी एक जिले की व्यवस्था , या किसी एक तहसील की व्यवस्था या पत्रक छपवाकर उनका वितरण करेंगे )"
                />
              </div>
            </div>

            {/* Required Fields Note */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-orange-800 flex items-center gap-2">
                <span className="text-lg">ℹ️</span>
                <span><span className="font-bold">नोट:</span> <span className="text-red-500">*</span> चिह्नित फील्ड अनिवार्य हैं</span>
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !formData.name || !formData.phone || !formData.state || !formData.district || !formData.village }
                className="group relative px-12 py-5 text-xl font-bold rounded-2xl text-white shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-600 hover:from-yellow-600 hover:via-orange-600 hover:to-amber-700 hover:shadow-orange-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      भेजा जा रहा है...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={24} />
                      सबमिट करें
                    </>
                  )}
                </span>
                {!loading && (
                  <span className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-gray-600">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
            <span className="text-lg">🔒</span>
            <p className="text-sm font-medium">
              आपकी जानकारी सुरक्षित है और केवल अभियान के उद्देश्य से उपयोग की जाएगी
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}