"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Search, Loader2, Trash2, UserPlus, LogOut, RefreshCw, Eye, X, Filter, ChevronDown, BarChart3, Users, FileText, Edit, Award } from "lucide-react";

// State-District mapping (simplified - 2 states only)
const STATE_DISTRICTS = {
   "Andhra Pradesh": [
    "Anantapuramu",
    "Chittoor",
    "East Godavari",
    "Guntur",
    "Krishna",
    "Kurnool",
    "Nellore (SPSR Nellore)",
    "Prakasam",
    "Srikakulam",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
    "Alluri Sitharama Raju",
    "Anakapalli",
    "Annamayya",
    "Bapatla",
    "Eluru",
    "Kakinada",
    "Konaseema",
    "Nandyal",
    "NTR",
    "Palnadu",
    "Parvathipuram Manyam",
    "Sri Sathya Sai",
    "Tirupati"
  ],
  "Arunachal Pradesh": [
    "Anjaw",
    "Capital Complex ( Itanagar )",
    "Changlang",
    "Dibang Valley",
    "East Kameng",
    "East Siang",
    "Kamle",
    "Kra Daadi",
    "Kurung Kumey",
    "Lepa Rada",
    "Lohit",
    "Longding",
    "Lower Dibang Valley",
    "Lower Siang",
    "Lower Subansiri",
    "Namsai",
    "Pakke Kessang",
    "Papum Pare",
    "Shi Yomi",
    "Siang",
    "Tawang",
    "Tirap",
    "Upper Siang",
    "Upper Subansiri",
    "West Kameng",
    "West Siang"
  ],"Assam": [
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
    "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran", "Begusarai"
  ],
  "Chhattisgarh": [
    "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari",
    "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kanker", "Kawardha", "Korba", "Korea", 
    "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Rajnandgaon", "Rajnandgaon (rural)", "Raipur", 
    "Rajnandgaon", "Rajnandgaon (rural)", "Surajpur", "Sukma", "Surguja"
  ],
  "Goa": [
    "North Goa", "South Goa"
  ],
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
  ],"Kerala": [
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
    "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", 
    "Vidisha"
  ],
  "Maharashtra": [
    "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara",
    "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli",
    "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban",
    "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar",
    "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg",
    "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
  ], "Manipur": [
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
  ],"Nagaland": [
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
    "Patiala", "Rupnagar", "Sangrur", "Shaheed Bhagat Singh Nagar (Nawanshahr)",
    "Tarn Taran"
  ],"Rajasthan": [
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
  ],"Telangana": [
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
  ], "Uttar Pradesh": [
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
  ],"Andaman and Nicobar Islands": [
    "Nicobar", "North and Middle Andaman", "South Andaman"
  ],
  "Chandigarh": [
    "Chandigarh"
  ],
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
  "Ladakh": [
    "Kargil", "Leh"
  ],
  "Lakshadweep": [
    "Agatti", "Amini", "Andrott", "Bitra", "Chetlat", "Kadmat", "Kalpeni",
    "Kavaratti", "Kilthan", "Minicoy"
  ],
  "Puducherry": [
    "Karaikal", "Mahe", "Puducherry", "Yanam"
  ]
};

export default function DashboardPage() {
  const [tab, setTab] = useState("users");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // USERS
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [userSearchInput, setUserSearchInput] = useState("");
  const [userPage, setUserPage] = useState(1);
  const [userTotal, setUserTotal] = useState(1);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  // SUBMISSIONS
  const [submissions, setSubmissions] = useState([]);
  const [subPage, setSubPage] = useState(1);
  const [subTotal, setSubTotal] = useState(1);
  const [subSearch, setSubSearch] = useState("");
  const [subSearchInput, setSubSearchInput] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  
  // PRAVARI
  const [pravaris, setPravaris] = useState([]);
  const [pravariPage, setPravariPage] = useState(1);
  const [pravariTotal, setPravariTotal] = useState(1);
  const [pravariSearch, setPravariSearch] = useState("");
  const [pravariSearchInput, setPravariSearchInput] = useState("");
  const [selectedPravari, setSelectedPravari] = useState(null);
  const [editingPravari, setEditingPravari] = useState(null);
  const [showPravariFilters, setShowPravariFilters] = useState(false);
  const [pravariFilters, setPravariFilters] = useState({
    state: "",
    district: ""
  });
  const [activePravariFilters, setActivePravariFilters] = useState({
    state: "",
    district: ""
  });
  const [newPravari, setNewPravari] = useState({
    name: "",
    phone: "",
    role: "",
    village: "",
    address: "",
    email: "",
    state: "",
    district: "",
    experience: ""
  });
  
  // Advanced Filters
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    state: "",
    district: ""
  });
  const [activeFilters, setActiveFilters] = useState({
    state: "",
    district: ""
  });

  // Available districts based on selected state
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [pravariAvailableDistricts, setPravariAvailableDistricts] = useState([]);

  // Stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSubmissions: 0,
    filteredSubmissions: 0,
    totalPravaris: 0,
    filteredPravaris: 0
  });

  // Check authentication
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch("/api/auth/verify", { credentials: "include" });
        const data = await res.json();
        if (!data.authenticated) {
          window.location.replace("/login");
        }
      } catch (err) {
        console.error("Auth verification failed:", err);
      }
    };
    verifyAuth();
  }, []);

  // Update available districts when state filter changes
  useEffect(() => {
    if (filters.state) {
      setAvailableDistricts(STATE_DISTRICTS[filters.state] || []);
      if (!STATE_DISTRICTS[filters.state]?.includes(filters.district)) {
        setFilters(prev => ({ ...prev, district: "" }));
      }
    } else {
      setAvailableDistricts([]);
      setFilters(prev => ({ ...prev, district: "" }));
    }
  }, [filters.state]);

  // Update available districts for Pravari filters
  useEffect(() => {
    if (pravariFilters.state) {
      setPravariAvailableDistricts(STATE_DISTRICTS[pravariFilters.state] || []);
      if (!STATE_DISTRICTS[pravariFilters.state]?.includes(pravariFilters.district)) {
        setPravariFilters(prev => ({ ...prev, district: "" }));
      }
    } else {
      setPravariAvailableDistricts([]);
      setPravariFilters(prev => ({ ...prev, district: "" }));
    }
  }, [pravariFilters.state]);

  // Update available districts for new Pravari
  useEffect(() => {
    if (newPravari.state) {
      const districts = STATE_DISTRICTS[newPravari.state] || [];
      if (!districts.includes(newPravari.district)) {
        setNewPravari(prev => ({ ...prev, district: "" }));
      }
    }
  }, [newPravari.state]);

  // Update available districts for editing Pravari
  useEffect(() => {
    if (editingPravari?.state) {
      const districts = STATE_DISTRICTS[editingPravari.state] || [];
      if (!districts.includes(editingPravari.district)) {
        setEditingPravari(prev => ({ ...prev, district: "" }));
      }
    }
  }, [editingPravari?.state]);

  // Fetch users when tab changes or page changes
  useEffect(() => {
    if (tab === "users") {
      fetchUsers();
    }
  }, [tab, userPage, userSearch]);

  // Fetch submissions when tab or page changes
  useEffect(() => {
    if (tab === "submissions") {
      fetchSubmissions();
    }
  }, [tab, subPage, subSearch, activeFilters]);

  // Fetch pravaris when tab or page changes
  useEffect(() => {
    if (tab === "pravari") {
      fetchPravaris();
    }
  }, [tab, pravariPage, pravariSearch, activePravariFilters]);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/users?search=${userSearch}&page=${userPage}`, {
        credentials: 'include'
      });
      
      if (!res.ok) throw new Error('Failed to fetch users');
      
      const data = await res.json();
      setUsers(data.data || []);
      setUserTotal(data.totalPages || 1);
      setStats(prev => ({ ...prev, totalUsers: data.total || 0 }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: subPage.toString(),
        search: subSearch,
        ...(activeFilters.state && { state: activeFilters.state }),
        ...(activeFilters.district && { district: activeFilters.district })
      });

      const res = await fetch(`/api/dashboard?${params.toString()}`, {
        credentials: 'include'
      });
      
      if (!res.ok) throw new Error('Failed to fetch submissions');
      
      const data = await res.json();
      setSubmissions(data.data || []);
      setSubTotal(data.totalPages || 1);
      setStats(prev => ({ 
        ...prev, 
        totalSubmissions: data.total || 0,
        filteredSubmissions: data.filteredTotal || 0
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPravaris = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: pravariPage.toString(),
        search: pravariSearch,
        ...(activePravariFilters.state && { state: activePravariFilters.state }),
        ...(activePravariFilters.district && { district: activePravariFilters.district })
      });

      const res = await fetch(`/api/pravari?${params.toString()}`, {
        credentials: 'include'
      });
      
      if (!res.ok) throw new Error('Failed to fetch pravaris');
      
      const data = await res.json();
      setPravaris(data.data || []);
      setPravariTotal(data.totalPages || 1);
      setStats(prev => ({ 
        ...prev, 
        totalPravaris: data.total || 0,
        filteredPravaris: data.filteredTotal || 0
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSearch = () => {
    setUserSearch(userSearchInput);
    setUserPage(1);
  };

  const handleSubmissionSearch = () => {
    setSubSearch(subSearchInput);
    setSubPage(1);
  };

  const handlePravariSearch = () => {
    setPravariSearch(pravariSearchInput);
    setPravariPage(1);
  };

  const handleApplyFilters = () => {
    setActiveFilters({ ...filters });
    setSubPage(1);
  };

  const handleApplyPravariFilters = () => {
    setActivePravariFilters({ ...pravariFilters });
    setPravariPage(1);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(newUser),
      });

      const result = await res.json();
      
      if (result.success) {
        setSuccessMsg("User added successfully! ✓");
        setNewUser({ name: "", email: "", password: "" });
        setUserPage(1);
        fetchUsers();
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        setError(result.error || "Failed to add user");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPravari = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/pravari", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(newPravari),
      });

      const result = await res.json();
      
      if (result.success) {
        setSuccessMsg("Pravari added successfully! ✓");
        setNewPravari({
          name: "",
          phone: "",
          role: "",
          village: "",
          address: "",
          email: "",
          state: "",
          district: "",
          experience: ""
        });
        setPravariPage(1);
        fetchPravaris();
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        setError(result.error || "Failed to add pravari");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePravari = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await fetch(`/api/pravari/${editingPravari.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(editingPravari),
      });

      const result = await res.json();
      
      if (result.success) {
        setSuccessMsg("Pravari updated successfully! ✓");
        setEditingPravari(null);
        fetchPravaris();
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        setError(result.error || "Failed to update pravari");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${id}`, { 
        method: "DELETE",
        credentials: 'include'
      });
      
      if (res.ok) {
        setUsers(users.filter((u) => u.id !== id));
        setSuccessMsg("User deleted successfully");
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        setError("Failed to delete user");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubmission = async (id) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/dashboard/${id}`, { 
        method: "DELETE",
        credentials: 'include'
      });
      
      if (res.ok) {
        setSubmissions(submissions.filter((s) => s.id !== id));
        setSuccessMsg("Submission deleted successfully");
        setTimeout(() => setSuccessMsg(""), 3000);
        fetchSubmissions();
      } else {
        setError("Failed to delete submission");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePravari = async (id) => {
    if (!confirm("Are you sure you want to delete this pravari?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/pravari/${id}`, { 
        method: "DELETE",
        credentials: 'include'
      });
      
      if (res.ok) {
        setPravaris(pravaris.filter((p) => p.id !== id));
        setSuccessMsg("Pravari deleted successfully");
        setTimeout(() => setSuccessMsg(""), 3000);
        fetchPravaris();
      } else {
        setError("Failed to delete pravari");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async() => {
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/logout`, { 
        method: "POST",
        credentials: 'include'
      });
      
      if (res.ok) {
        setSuccessMsg("Logout Successfully");
        setTimeout(() => {
          window.location.replace("/login");
        }, 1000);
      } else {
        setError("Failed to Logout");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      state: "",
      district: ""
    });
    setActiveFilters({
      state: "",
      district: ""
    });
    setSubSearchInput("");
    setSubSearch("");
    setSubPage(1);
  };

  const clearPravariFilters = () => {
    setPravariFilters({
      state: "",
      district: ""
    });
    setActivePravariFilters({
      state: "",
      district: ""
    });
    setPravariSearchInput("");
    setPravariSearch("");
    setPravariPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handlePravariFilterChange = (key, value) => {
    setPravariFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6 border border-orange-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Image 
                src="/logo.jpg"
                alt="Aviyan Logo"
                width={80}  
                height={80} 
                className="rounded-full object-cover shadow-xl"
                priority   
              />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  एडमिन डैशबोर्ड
                </h1>
                <p className="text-gray-600 mt-1 font-medium">गौ सम्मान आह्वान अभियान प्रबंधन</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl border-2 border-blue-200 shadow-md">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-3 rounded-xl">
                  <Users size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-blue-600 font-semibold text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl border-2 border-green-200 shadow-md">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 p-3 rounded-xl">
                  <FileText size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-sm">Total Submissions</p>
                  <p className="text-2xl font-bold text-green-900">{stats.totalSubmissions.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl border-2 border-purple-200 shadow-md">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500 p-3 rounded-xl">
                  <BarChart3 size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-purple-600 font-semibold text-sm">Filtered Results</p>
                  <p className="text-2xl font-bold text-purple-900">{stats.filteredSubmissions.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-2xl border-2 border-orange-200 shadow-md">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500 p-3 rounded-xl">
                  <Award size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-orange-600 font-semibold text-sm">Total Pravaris</p>
                  <p className="text-2xl font-bold text-orange-900">{stats.totalPravaris.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-3 mt-6 flex-wrap">
            <button
              onClick={() => setTab("users")}
              className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 shadow-lg ${
                tab === "users"
                  ? "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white shadow-orange-300 scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
              }`}
            >
              <UserPlus size={20} />
              <span>Users</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                tab === "users" ? "bg-white text-orange-600" : "bg-gray-200 text-gray-700"
              }`}>
                {stats.totalUsers.toLocaleString()}
              </span>
            </button>
            <button
              onClick={() => setTab("submissions")}
              className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 shadow-lg ${
                tab === "submissions"
                  ? "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white shadow-orange-300 scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
              }`}
            >
              <FileText size={20} />
              <span>Submissions</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                tab === "submissions" ? "bg-white text-orange-600" : "bg-gray-200 text-gray-700"
              }`}>
                {stats.totalSubmissions.toLocaleString()}
              </span>
            </button>
            <button
              onClick={() => setTab("pravari")}
              className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 shadow-lg ${
                tab === "pravari"
                  ? "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white shadow-orange-300 scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
              }`}
            >
              <Award size={20} />
              <span>Pravari</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                tab === "pravari" ? "bg-white text-orange-600" : "bg-gray-200 text-gray-700"
              }`}>
                {stats.totalPravaris.toLocaleString()}
              </span>
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-5 rounded-2xl mb-4 flex items-center justify-between shadow-lg animate-slideIn">
            <div className="flex items-center gap-3">
              <span className="text-2xl">❌</span>
              <span className="font-semibold">{error}</span>
            </div>
            <button onClick={() => setError("")} className="text-red-700 hover:text-red-900 p-2 hover:bg-red-100 rounded-lg transition-all">
              <X size={20} />
            </button>
          </div>
        )}
        
        {successMsg && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-5 rounded-2xl mb-4 flex items-center justify-between shadow-lg animate-slideIn">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <span className="font-semibold">{successMsg}</span>
            </div>
            <button onClick={() => setSuccessMsg("")} className="text-green-700 hover:text-green-900 p-2 hover:bg-green-100 rounded-lg transition-all">
              <X size={20} />
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 border border-orange-100">
          {/* USERS TAB */}
          {tab === "users" && (
            <>
              {/* Add User Form */}
              <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-amber-50 p-6 rounded-2xl mb-6 border-2 border-orange-200 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-3">
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-3 rounded-xl shadow-md">
                    <UserPlus size={24} className="text-white" />
                  </div>
                  Add New User
                </h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="border-2 border-orange-200 focus:border-orange-500 p-4 rounded-xl outline-none transition-all shadow-sm hover:shadow-md bg-white"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="border-2 border-orange-200 focus:border-orange-500 p-4 rounded-xl outline-none transition-all shadow-sm hover:shadow-md bg-white"
                  />
                  <input
                    type="password"
                    placeholder="Password (min 6 chars)"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="border-2 border-orange-200 focus:border-orange-500 p-4 rounded-xl outline-none transition-all shadow-sm hover:shadow-md bg-white"
                  />
                  <button
                    onClick={handleAddUser}
                    disabled={loading || !newUser.name || !newUser.email || !newUser.password || newUser.password.length < 6}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold rounded-xl py-4 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? <Loader2 size={20} className="animate-spin" /> : <UserPlus size={20} />}
                    Add User
                  </button>
                </div>
              </div>

              {/* Search & Actions */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-3 border-2 border-gray-200 focus-within:border-orange-500 transition-all shadow-sm">
                    <Search size={22} className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      value={userSearchInput}
                      onChange={(e) => setUserSearchInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleUserSearch()}
                      className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
                    />
                  </div>
                  <button
                    onClick={handleUserSearch}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all shadow-md hover:shadow-lg font-semibold transform hover:scale-105 disabled:opacity-50"
                  >
                    <Search size={18} />
                    Search
                  </button>
                </div>
                <button
                  onClick={fetchUsers}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all shadow-md hover:shadow-lg font-semibold transform hover:scale-105 disabled:opacity-50"
                >
                  <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                  Refresh
                </button>
              </div>

              {/* User Table */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="animate-spin text-orange-600 mb-4" size={56} />
                  <p className="text-gray-600 font-semibold text-lg">Loading users...</p>
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                  <p className="text-gray-500 text-xl font-semibold">No users found</p>
                </div>
              ) : (
                <div className="overflow-x-auto border-2 border-gray-200 rounded-2xl shadow-lg">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-yellow-100 via-orange-100 to-amber-100">
                      <tr>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Name</th>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Email</th>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Created</th>
                        <th className="p-5 text-center font-bold text-gray-800 text-sm uppercase tracking-wide">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u, idx) => (
                        <tr key={u.id} className={`border-t-2 border-gray-100 hover:bg-orange-50 transition-all ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                          <td className="p-5 font-semibold text-gray-800">{u.name}</td>
                          <td className="p-5 text-gray-600">{u.email}</td>
                          <td className="p-5 text-gray-600 font-medium">
                            {new Date(u.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="p-5 text-center">
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="text-red-500 hover:text-white hover:bg-red-500 p-3 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-110"
                              title="Delete user"
                            >
                              <Trash2 size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                <button
                  disabled={userPage === 1 || loading}
                  onClick={() => setUserPage((p) => p - 1)}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all hover:shadow-xl transform hover:scale-105 disabled:transform-none shadow-lg w-full sm:w-auto"
                >
                  ← Previous
                </button>
                <span className="text-gray-800 font-bold text-lg px-6 py-3 bg-gray-100 rounded-xl shadow-inner">
                  Page {userPage} of {userTotal}
                </span>
                <button
                  disabled={userPage === userTotal || loading}
                  onClick={() => setUserPage((p) => p + 1)}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all hover:shadow-xl transform hover:scale-105 disabled:transform-none shadow-lg w-full sm:w-auto"
                >
                  Next →
                </button>
              </div>
            </>
          )}

          {/* SUBMISSIONS TAB */}
          {tab === "submissions" && (
            <>
              {/* Search & Filter Section */}
              <div className="space-y-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-3 border-2 border-gray-200 focus-within:border-orange-500 transition-all shadow-sm">
                      <Search size={22} className="text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search by name, email, state, district, or village..."
                        value={subSearchInput}
                        onChange={(e) => setSubSearchInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmissionSearch()}
                        className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
                      />
                    </div>
                    <button
                      onClick={handleSubmissionSearch}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all shadow-md hover:shadow-lg font-semibold transform hover:scale-105 disabled:opacity-50"
                    >
                      <Search size={18} />
                      Search
                    </button>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg font-semibold transform hover:scale-105 ${
                        showFilters 
                          ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white' 
                          : 'bg-white text-gray-700 border-2 border-gray-300'
                      }`}
                    >
                      <Filter size={18} />
                      Filters
                      <ChevronDown size={18} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </button>
                    <button
                      onClick={fetchSubmissions}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all shadow-md hover:shadow-lg font-semibold transform hover:scale-105 disabled:opacity-50"
                    >
                      <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                      Refresh
                    </button>
                  </div>
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-2xl border-2 border-orange-200 shadow-lg animate-slideDown">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Filter size={20} className="text-orange-600" />
                        Advanced Filters
                      </h4>
                      <button
                        onClick={clearFilters}
                        className="text-sm font-semibold text-orange-600 hover:text-orange-800 px-4 py-2 bg-white rounded-lg hover:bg-orange-100 transition-all shadow-sm"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                        <select
                          value={filters.state}
                          onChange={(e) => handleFilterChange('state', e.target.value)}
                          className="w-full p-3 border-2 border-orange-200 rounded-xl outline-none focus:border-orange-500 transition-all bg-white shadow-sm"
                        >
                          <option value="">All States</option>
                          {Object.keys(STATE_DISTRICTS).map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">District</label>
                        <select
                          value={filters.district}
                          onChange={(e) => handleFilterChange('district', e.target.value)}
                          disabled={!filters.state}
                          className="w-full p-3 border-2 border-orange-200 rounded-xl outline-none focus:border-orange-500 transition-all bg-white shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                          <option value="">All Districts</option>
                          {availableDistricts.map(district => (
                            <option key={district} value={district}>{district}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={handleApplyFilters}
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
                      >
                        <Filter size={18} />
                        Apply Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Submissions Table */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="animate-spin text-orange-600 mb-4" size={56} />
                  <p className="text-gray-600 font-semibold text-lg">Loading submissions...</p>
                </div>
              ) : submissions.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                  <p className="text-gray-500 text-xl font-semibold">No submissions found</p>
                  {(subSearch || Object.values(activeFilters).some(f => f)) && (
                    <button
                      onClick={clearFilters}
                      className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto border-2 border-gray-200 rounded-2xl shadow-lg">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-yellow-100 via-orange-100 to-amber-100">
                      <tr>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Name</th>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">State</th>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">District</th>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Village/Tehsil</th>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Email</th>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Phone</th>
                        <th className="p-5 text-center font-bold text-gray-800 text-sm uppercase tracking-wide">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((s, idx) => (
                        <tr key={s.id} className={`border-t-2 border-gray-100 hover:bg-orange-50 transition-all ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                          <td className="p-5 font-semibold text-gray-800">{s.name}</td>
                          <td className="p-5 text-gray-600">{s.state}</td>
                          <td className="p-5 text-gray-600">{s.district}</td>
                          <td className="p-5 text-gray-600">{s.village}</td>
                          <td className="p-5 text-gray-600">{s.email}</td>
                          <td className="p-5 text-gray-600">{s.phone}</td>
                          <td className="p-5 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => setSelectedSubmission(s)}
                                className="text-blue-500 hover:text-white hover:bg-blue-500 p-3 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-110"
                                title="View details"
                              >
                                <Eye size={20} />
                              </button>
                              <button
                                onClick={() => handleDeleteSubmission(s.id)}
                                className="text-red-500 hover:text-white hover:bg-red-500 p-3 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-110"
                                title="Delete submission"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                <button
                  disabled={subPage === 1 || loading}
                  onClick={() => setSubPage((p) => p - 1)}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all hover:shadow-xl transform hover:scale-105 disabled:transform-none shadow-lg w-full sm:w-auto"
                >
                  ← Previous
                </button>
                <span className="text-gray-800 font-bold text-lg px-6 py-3 bg-gray-100 rounded-xl shadow-inner">
                  Page {subPage} of {subTotal}
                </span>
                <button
                  disabled={subPage === subTotal || loading}
                  onClick={() => setSubPage((p) => p + 1)}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all hover:shadow-xl transform hover:scale-105 disabled:transform-none shadow-lg w-full sm:w-auto"
                >
                  Next →
                </button>
              </div>
            </>
          )}

          {/* PRAVARI TAB */}
          {tab === "pravari" && (
            <>
              {/* Add/Edit Pravari Form */}
              <div className="bg-gradient-to-r from-orange-50 via-yellow-50 to-amber-50 p-6 rounded-2xl mb-6 border-2 border-orange-200 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-3">
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-3 rounded-xl shadow-md">
                    <Award size={24} className="text-white" />
                  </div>
                  {editingPravari ? "Edit Pravari" : "Add New Pravari"}
                </h3>
                <form onSubmit={editingPravari ? handleUpdatePravari : handleAddPravari}>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={editingPravari ? editingPravari.name : newPravari.name}
                      onChange={(e) => editingPravari 
                        ? setEditingPravari({ ...editingPravari, name: e.target.value })
                        : setNewPravari({ ...newPravari, name: e.target.value })}
                      required
                      className="border-2 border-orange-200 focus:border-orange-500 p-4 rounded-xl outline-none transition-all shadow-sm hover:shadow-md bg-white"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={editingPravari ? editingPravari.phone : newPravari.phone}
                      onChange={(e) => editingPravari 
                        ? setEditingPravari({ ...editingPravari, phone: e.target.value })
                        : setNewPravari({ ...newPravari, phone: e.target.value })}
                      required
                      className="border-2 border-orange-200 focus:border-orange-500 p-4 rounded-xl outline-none transition-all shadow-sm hover:shadow-md bg-white"
                    />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={editingPravari ? editingPravari.email : newPravari.email}
                      onChange={(e) => editingPravari 
                        ? setEditingPravari({ ...editingPravari, email: e.target.value })
                        : setNewPravari({ ...newPravari, email: e.target.value })}
                      required
                      className="border-2 border-orange-200 focus:border-orange-500 p-4 rounded-xl outline-none transition-all shadow-sm hover:shadow-md bg-white"
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <select
                      value={editingPravari ? editingPravari.state : newPravari.state}
                      onChange={(e) => editingPravari 
                        ? setEditingPravari({ ...editingPravari, state: e.target.value })
                        : setNewPravari({ ...newPravari, state: e.target.value })}
                      required
                      className="border-2 border-orange-200 focus:border-orange-500 p-4 rounded-xl outline-none transition-all shadow-sm hover:shadow-md bg-white"
                    >
                      <option value="">Select State *</option>
                      {Object.keys(STATE_DISTRICTS).map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    <select
                      value={editingPravari ? editingPravari.district : newPravari.district}
                      onChange={(e) => editingPravari 
                        ? setEditingPravari({ ...editingPravari, district: e.target.value })
                        : setNewPravari({ ...newPravari, district: e.target.value })}
                      required
                      disabled={editingPravari ? !editingPravari.state : !newPravari.state}
                      className="border-2 border-orange-200 focus:border-orange-500 p-4 rounded-xl outline-none transition-all shadow-sm hover:shadow-md bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select District *</option>
                      {(editingPravari 
                        ? STATE_DISTRICTS[editingPravari.state] 
                        : STATE_DISTRICTS[newPravari.state] || []
                      ).map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Village/Tehsil *"
                      value={editingPravari ? editingPravari.village : newPravari.village}
                      onChange={(e) => editingPravari 
                        ? setEditingPravari({ ...editingPravari, village: e.target.value })
                        : setNewPravari({ ...newPravari, village: e.target.value })}
                      required
                      className="border-2 border-orange-200 focus:border-orange-500 p-4 rounded-xl outline-none transition-all shadow-sm hover:shadow-md bg-white"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Role/Position *"
                      value={editingPravari ? editingPravari.role : newPravari.role}
                      onChange={(e) => editingPravari 
                        ? setEditingPravari({ ...editingPravari, role: e.target.value })
                        : setNewPravari({ ...newPravari, role: e.target.value })}
                      required
                      className="border-2 border-orange-200 focus:border-orange-500 p-4 rounded-xl outline-none transition-all shadow-sm hover:shadow-md bg-white"
                    />
                    <textarea
                      placeholder="Address *"
                      value={editingPravari ? editingPravari.address : newPravari.address}
                      onChange={(e) => editingPravari 
                        ? setEditingPravari({ ...editingPravari, address: e.target.value })
                        : setNewPravari({ ...newPravari, address: e.target.value })}
                      required
                      rows={1}
                      className="border-2 border-orange-200 focus:border-orange-500 p-4 rounded-xl outline-none transition-all shadow-sm hover:shadow-md bg-white resize-none"
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      placeholder="Experience (Optional)"
                      value={editingPravari ? editingPravari.experience || "" : newPravari.experience}
                      onChange={(e) => editingPravari 
                        ? setEditingPravari({ ...editingPravari, experience: e.target.value })
                        : setNewPravari({ ...newPravari, experience: e.target.value })}
                      rows={3}
                      className="w-full border-2 border-orange-200 focus:border-orange-500 p-4 rounded-xl outline-none transition-all shadow-sm hover:shadow-md bg-white resize-none"
                    />
                  </div>
                  <div className="flex gap-3 justify-end">
                    {editingPravari && (
                      <button
                        type="button"
                        onClick={() => setEditingPravari(null)}
                        className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold rounded-xl px-8 py-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {loading ? <Loader2 size={20} className="animate-spin" /> : editingPravari ? <Edit size={20} /> : <Award size={20} />}
                      {editingPravari ? "Update Pravari" : "Add Pravari"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Search & Filter Section */}
              <div className="space-y-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-3 border-2 border-gray-200 focus-within:border-orange-500 transition-all shadow-sm">
                      <Search size={22} className="text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search by name, email, phone, state, district, or village..."
                        value={pravariSearchInput}
                        onChange={(e) => setPravariSearchInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handlePravariSearch()}
                        className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
                      />
                    </div>
                    <button
                      onClick={handlePravariSearch}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all shadow-md hover:shadow-lg font-semibold transform hover:scale-105 disabled:opacity-50"
                    >
                      <Search size={18} />
                      Search
                    </button>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => setShowPravariFilters(!showPravariFilters)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg font-semibold transform hover:scale-105 ${
                        showPravariFilters 
                          ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white' 
                          : 'bg-white text-gray-700 border-2 border-gray-300'
                      }`}
                    >
                      <Filter size={18} />
                      Filters
                      <ChevronDown size={18} className={`transition-transform ${showPravariFilters ? 'rotate-180' : ''}`} />
                    </button>
                    <button
                      onClick={fetchPravaris}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all shadow-md hover:shadow-lg font-semibold transform hover:scale-105 disabled:opacity-50"
                    >
                      <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                      Refresh
                    </button>
                  </div>
                </div>

                {/* Advanced Filters */}
                {showPravariFilters && (
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-2xl border-2 border-orange-200 shadow-lg animate-slideDown">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Filter size={20} className="text-orange-600" />
                        Advanced Filters
                      </h4>
                      <button
                        onClick={clearPravariFilters}
                        className="text-sm font-semibold text-orange-600 hover:text-orange-800 px-4 py-2 bg-white rounded-lg hover:bg-orange-100 transition-all shadow-sm"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                        <select
                          value={pravariFilters.state}
                          onChange={(e) => handlePravariFilterChange('state', e.target.value)}
                          className="w-full p-3 border-2 border-orange-200 rounded-xl outline-none focus:border-orange-500 transition-all bg-white shadow-sm"
                        >
                          <option value="">All States</option>
                          {Object.keys(STATE_DISTRICTS).map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">District</label>
                        <select
                          value={pravariFilters.district}
                          onChange={(e) => handlePravariFilterChange('district', e.target.value)}
                          disabled={!pravariFilters.state}
                          className="w-full p-3 border-2 border-orange-200 rounded-xl outline-none focus:border-orange-500 transition-all bg-white shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                          <option value="">All Districts</option>
                          {pravariAvailableDistricts.map(district => (
                            <option key={district} value={district}>{district}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={handleApplyPravariFilters}
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
                      >
                        <Filter size={18} />
                        Apply Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Pravari Table */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="animate-spin text-orange-600 mb-4" size={56} />
                  <p className="text-gray-600 font-semibold text-lg">Loading pravaris...</p>
                </div>
              ) : pravaris.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                  <p className="text-gray-500 text-xl font-semibold">No pravaris found</p>
                  {(pravariSearch || Object.values(activePravariFilters).some(f => f)) && (
                    <button
                      onClick={clearPravariFilters}
                      className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto border-2 border-gray-200 rounded-2xl shadow-lg">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-yellow-100 via-orange-100 to-amber-100">
                      <tr>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Name</th>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Role</th>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Phone</th>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Email</th>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">State</th>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">District</th>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Village</th>
                        <th className="p-5 text-center font-bold text-gray-800 text-sm uppercase tracking-wide">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pravaris.map((p, idx) => (
                        <tr key={p.id} className={`border-t-2 border-gray-100 hover:bg-orange-50 transition-all ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                          <td className="p-5 font-semibold text-gray-800">{p.name}</td>
                          <td className="p-5 text-gray-600">{p.role}</td>
                          <td className="p-5 text-gray-600">{p.phone}</td>
                          <td className="p-5 text-gray-600">{p.email}</td>
                          <td className="p-5 text-gray-600">{p.state}</td>
                          <td className="p-5 text-gray-600">{p.district}</td>
                          <td className="p-5 text-gray-600">{p.village}</td>
                          <td className="p-5 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => setSelectedPravari(p)}
                                className="text-blue-500 hover:text-white hover:bg-blue-500 p-3 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-110"
                                title="View details"
                              >
                                <Eye size={20} />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingPravari(p);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="text-green-500 hover:text-white hover:bg-green-500 p-3 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-110"
                                title="Edit pravari"
                              >
                                <Edit size={20} />
                              </button>
                              <button
                                onClick={() => handleDeletePravari(p.id)}
                                className="text-red-500 hover:text-white hover:bg-red-500 p-3 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-110"
                                title="Delete pravari"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                <button
                  disabled={pravariPage === 1 || loading}
                  onClick={() => setPravariPage((p) => p - 1)}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all hover:shadow-xl transform hover:scale-105 disabled:transform-none shadow-lg w-full sm:w-auto"
                >
                  ← Previous
                </button>
                <span className="text-gray-800 font-bold text-lg px-6 py-3 bg-gray-100 rounded-xl shadow-inner">
                  Page {pravariPage} of {pravariTotal}
                </span>
                <button
                  disabled={pravariPage === pravariTotal || loading}
                  onClick={() => setPravariPage((p) => p + 1)}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all hover:shadow-xl transform hover:scale-105 disabled:transform-none shadow-lg w-full sm:w-auto"
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>

        {/* Submission Detail Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-fadeIn" onClick={() => setSelectedSubmission(null)}>
            <div className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-orange-200 animate-scaleIn" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-200">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent flex items-center gap-3">
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-3 rounded-xl">
                    <Eye size={24} className="text-white" />
                  </div>
                  Submission Details
                </h3>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-gray-500 hover:text-white hover:bg-red-500 p-3 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-110"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(selectedSubmission).map(([key, value]) => {
                  if (key === 'id') return null;
                  return (
                    <div key={key} className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                      <span className="font-bold text-gray-700 capitalize text-sm block mb-2 text-orange-600">
                        {key.replace(/_/g, ' ')}:
                      </span>
                      <p className="text-gray-800 font-medium break-words">
                        {key === 'createdAt' 
                          ? new Date(value).toLocaleString('en-IN', { 
                              day: '2-digit', 
                              month: 'short', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : value || 'N/A'
                        }
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this submission?")) {
                      handleDeleteSubmission(selectedSubmission.id);
                      setSelectedSubmission(null);
                    }
                  }}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pravari Detail Modal */}
        {selectedPravari && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-fadeIn" onClick={() => setSelectedPravari(null)}>
            <div className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-orange-200 animate-scaleIn" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-200">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent flex items-center gap-3">
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-3 rounded-xl">
                    <Award size={24} className="text-white" />
                  </div>
                  Pravari Details
                </h3>
                <button
                  onClick={() => setSelectedPravari(null)}
                  className="text-gray-500 hover:text-white hover:bg-red-500 p-3 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-110"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(selectedPravari).map(([key, value]) => {
                  if (key === 'id') return null;
                  return (
                    <div key={key} className={`bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all ${key === 'address' || key === 'experience' ? 'md:col-span-2' : ''}`}>
                      <span className="font-bold text-gray-700 capitalize text-sm block mb-2 text-orange-600">
                        {key.replace(/_/g, ' ')}:
                      </span>
                      <p className="text-gray-800 font-medium break-words">
                        {key === 'createdAt' || key === 'updatedAt'
                          ? new Date(value).toLocaleString('en-IN', { 
                              day: '2-digit', 
                              month: 'short', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : value || 'N/A'
                        }
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setEditingPravari(selectedPravari);
                    setSelectedPravari(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
                >
                  <Edit size={18} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this pravari?")) {
                      handleDeletePravari(selectedPravari.id);
                      setSelectedPravari(null);
                    }
                  }}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedPravari(null)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}