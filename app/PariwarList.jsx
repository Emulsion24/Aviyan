"use client";
import React, { useState, useCallback, useMemo } from "react";
import { Search, MapPin, User, Phone, Mail, Award, Home, Loader2, AlertCircle, TrendingUp, Users, Globe, Building } from "lucide-react";

// --- Translation Data ---
const translations = {
  en: {
    TITLE: "Prabhari Directory",
    SUBTITLE: "Find Go Seva Prabhari information in your region",
    SEARCH_TITLE: "Search Prabhari",
    
    LEVEL_ZONE: "Zone Prabhari",
    LEVEL_STATE: "State Prabhari",
    LEVEL_SAMBHAG: "Sambhag Prabhari",
    LEVEL_DISTRICT: "District Prabhari",
    LEVEL_TEHSIL: "Tehsil Prabhari",
    
    SELECT_ZONE: "Select Zone",
    SELECT_STATE: "Select State",
    SELECT_SAMBHAG: "Select Sambhag",
    SELECT_DISTRICT: "Select District",
    SEARCH_TEHSIL_VILLAGE: "Search Tehsil/Village",
    
    SEARCH_BUTTON: "Search",
    RESET_BUTTON: "Reset",
    SEARCHING: "Searching...",

    ERROR_SELECT_ZONE: "Please select Zone.",
    ERROR_SELECT_STATE: "Please select State.",
    ERROR_SELECT_SAMBHAG: "Please select Sambhag.",
    ERROR_SELECT_STATE_DISTRICT: "Please select both State and District.",
    ERROR_API_FETCH_DISTRICT: "Failed to fetch District Prabhari data.",
    ERROR_API_FETCH_TEHSIL: "Failed to fetch Tehsil Prabhari data.",
    ERROR_API_GENERAL: "Failed to fetch data. Please try again.",
    
    PRABHARI_FOUND_PLURAL: "Prabhari Found",
    PRABHARI_NOT_FOUND: "No Prabhari Found",
    RESULT_FOR_LEVEL: "Results for {level} level:",
    DEFAULT_ROLE: "Prabhari",
    NAME_UNAVAILABLE: "Name unavailable",
    DEFAULT_REGION: "N/A",
    NO_PRABHARI_REGION: "No Prabhari information is currently available for this region.",
    TRY_DIFFERENT_REGION: "Please select a different level or region.",
    ALL_TEHSILS: "All Tehsils",
  },
  hi: {
    TITLE: "प्रभारी दर्शिका",
    SUBTITLE: "आपके क्षेत्र में गो सेवा प्रभारी की जानकारी प्राप्त करें",
    SEARCH_TITLE: "प्रभारी खोजें",
    
    LEVEL_ZONE: "ज़ोन प्रभारी",
    LEVEL_STATE: "राज्य प्रभारी",
    LEVEL_SAMBHAG: "संभाग प्रभारी",
    LEVEL_DISTRICT: "जिला प्रभारी",
    LEVEL_TEHSIL: "तहसील प्रभारी",

    SELECT_ZONE: "ज़ोन चुनें",
    SELECT_STATE: "राज्य चुनें",
    SELECT_SAMBHAG: "संभाग चुनें",
    SELECT_DISTRICT: "जिला चुनें",
    SEARCH_TEHSIL_VILLAGE: "तहसील/गाँव खोजें",
    
    SEARCH_BUTTON: "खोजें",
    RESET_BUTTON: "रीसेट करें",
    SEARCHING: "खोज हो रही है...",
    
    ERROR_SELECT_ZONE: "कृपया ज़ोन चुनें।",
    ERROR_SELECT_STATE: "कृपया राज्य चुनें।",
    ERROR_SELECT_SAMBHAG: "कृपया संभाग चुनें।",
    ERROR_SELECT_STATE_DISTRICT: "कृपया राज्य और जिला दोनों चुनें।",
    ERROR_API_FETCH_DISTRICT: "जिला प्रभारी डेटा प्राप्त करने में विफल।",
    ERROR_API_FETCH_TEHSIL: "तहसील प्रभारी डेटा प्राप्त करने में विफल।",
    ERROR_API_GENERAL: "डेटा प्राप्त करने में विफल। कृपया पुन: प्रयास करें।",
    
    PRABHARI_FOUND_PLURAL: "प्रभारी मिले",
    PRABHARI_NOT_FOUND: "कोई प्रभारी नहीं मिला",
    RESULT_FOR_LEVEL: "{level} स्तर के लिए परिणाम:",
    DEFAULT_ROLE: "प्रभारी",
    NAME_UNAVAILABLE: "नाम अनुपलब्ध",
    DEFAULT_REGION: "N/A",
    NO_PRABHARI_REGION: "आपके चयनित स्तर के लिए कोई प्रभारी जानकारी उपलब्ध नहीं है।",
    TRY_DIFFERENT_REGION: "कृपया कोई भिन्न स्तर या क्षेत्र चुनें।",
    ALL_TEHSILS: "सभी तहसीलें",
  },
};

// Helper function to simulate API call for Zone/State/Sambhag, as specific API endpoints are missing
const mockFetchPravari = async (level, idOrName) => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network latency

  // Mock data for higher-level pravari (assuming they are central figures)
  const mockPravari = {
    Zone: { name: "Shri Rajesh Patel", role: "National Zone Prabhari", phone: "9876543210", email: "rajesh.p@example.com", region: idOrName, experience: "10+ Years of Field Experience" },
    State: { name: "Smt. Neha Shah", role: "State Prabhari", phone: "9988776655", email: "neha.s@example.com", region: idOrName, experience: "8 Years Leading State Operations" },
    Sambhag: { name: "Shri Vijay Sharma", role: "Sambhag Prabhari", phone: "9000111222", email: "vijay.s@example.com", region: idOrName, experience: "5 Years of Sambhag Management" },
  };
  
  const pravari = mockPravari[level];

  if (pravari && idOrName) {
    return { success: true, data: [
      { id: 1, ...pravari, role: `${idOrName} ${pravari.role}` }
    ] };
  } else {
    return { success: true, data: [] };
  }
};

const PravariSearchUI = () => {
  // --- Language State ---
  const [language, setLanguage] = useState('hi');
  const getT = useCallback((key, replacements = {}) => {
    let text = translations[language][key] || translations['en'][key] || key;
    for (const [k, v] of Object.entries(replacements)) {
      text = text.replace(`{${k}}`, v);
    }
    return text;
  }, [language]);

  const pravariLevels = useMemo(() => [
    { key: 'Zone', label: getT('LEVEL_ZONE'), Icon: Globe },
    { key: 'State', label: getT('LEVEL_STATE'), Icon: TrendingUp },
    { key: 'Sambhag', label: getT('LEVEL_SAMBHAG'), Icon: Building },
    { key: 'District', label: getT('LEVEL_DISTRICT'), Icon: MapPin },
    { key: 'Tehsil', label: getT('LEVEL_TEHSIL'), Icon: Home },
  ], [getT]);

  // --- Data & Constants ---
  const statesDistrictsData = {
    "Gujarat": {
      districts: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Jamnagar"],
      zones: ["West Zone", "South Zone"],
      sambhags: ["Ahmedabad Sambhag", "Surat Sambhag", "Rajkot Sambhag"],
      tehsils: {
        "Ahmedabad": ["Viramgam", "Dhandhuka", "Sanand"],
        "Surat": ["Bardoli", "Kamrej", "Olpad"],
        "Rajkot": ["Gondal", "Jetpur", "Wankaner"],
      }
    },
    "Maharashtra": {
      districts: ["Mumbai", "Pune", "Nagpur", "Nashik"],
      zones: ["Central Zone", "North Zone"],
      sambhags: ["Pune Sambhag", "Mumbai Sambhag"],
      tehsils: {
        "Mumbai": ["Andheri", "Bandra", "Colaba"],
        "Pune": ["Haveli", "Junnar", "Maval"],
        "Nagpur": ["Umred", "Katol", "Hingna"],
      }
    },
  };

  const zonesData = ["National Zone", "East Zone", "West Zone", "North Zone", "South Zone", "Central Zone"];

  // --- Search States ---
  const [activeLevel, setActiveLevel] = useState('District');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filteredPravari, setFilteredPravari] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Filter States for each level
  const [zoneId, setZoneId] = useState("");
  const [stateId, setStateId] = useState("");
  const [sambhagId, setSambhagId] = useState("");

  const [districtState, setDistrictState] = useState("");
  const [districtId, setDistrictId] = useState("");

  const [tehsilState, setTehsilState] = useState("");
  const [tehsilDistrict, setTehsilDistrict] = useState("");
  const [tehsilSearch, setTehsilSearch] = useState("");


  // --- Helper Functions ---
  const getStates = useCallback(() => Object.keys(statesDistrictsData), []);
  
  const getDistricts = useCallback((state) => 
    statesDistrictsData[state]?.districts || []
  , [statesDistrictsData]);

  const getSambhags = useCallback((state) => 
    statesDistrictsData[state]?.sambhags || []
  , [statesDistrictsData]);

  const getTehsils = useCallback((state, district) => 
    statesDistrictsData[state]?.tehsils[district] || []
  , [statesDistrictsData]);

  const handleReset = useCallback(() => {
    setZoneId("");
    setStateId("");
    setSambhagId("");
    setDistrictState("");
    setDistrictId("");
    setTehsilState("");
    setTehsilDistrict("");
    setTehsilSearch("");
    setFilteredPravari([]);
    setShowResults(false);
    setError("");
    setLoading(false);
  }, []);

  // --- API Search Handler ---
  const handleSearch = useCallback(async () => {
    setError("");
    setShowResults(false);
    setLoading(true);

    try {
      let pravariResponse = { success: true, data: [] };
      let apiEndpoint = '/api/pravari';
      let params = new URLSearchParams();

      // 1. Determine Search Strategy based on activeLevel
      if (activeLevel === 'Zone') {
        if (!zoneId) throw new Error(getT("ERROR_SELECT_ZONE"));
        pravariResponse = await mockFetchPravari('Zone', zoneId);

      } else if (activeLevel === 'State') {
        if (!stateId) throw new Error(getT("ERROR_SELECT_STATE"));
        pravariResponse = await mockFetchPravari('State', stateId);

      } else if (activeLevel === 'Sambhag') {
        if (!sambhagId) throw new Error(getT("ERROR_SELECT_SAMBHAG"));
        pravariResponse = await mockFetchPravari('Sambhag', sambhagId);

      } else if (activeLevel === 'District') {
        if (!districtState || !districtId) throw new Error(getT("ERROR_SELECT_STATE_DISTRICT"));
        
        params.append('state', districtState);
        params.append('district', districtId);
        params.append('level', 'DISTRICT');
        
        apiEndpoint = `${apiEndpoint}?${params.toString()}`;
        
        const response = await fetch(apiEndpoint);
        if (!response.ok) throw new Error(getT('ERROR_API_FETCH_DISTRICT'));
        
        const data = await response.json();
        pravariResponse = { success: true, data: data.data || [] };
        
      } else if (activeLevel === 'Tehsil') {
        if (!tehsilState || !tehsilDistrict) throw new Error(getT("ERROR_SELECT_STATE_DISTRICT"));
        
        params.append('state', tehsilState);
        params.append('district', tehsilDistrict);
        
        if (tehsilSearch.trim()) {
            params.append('search', tehsilSearch.trim());
        } else {
            params.append('level', 'TEHSIL');
        }
        
        apiEndpoint = `${apiEndpoint}?${params.toString()}`;

        const response = await fetch(apiEndpoint);
        if (!response.ok) throw new Error(getT('ERROR_API_FETCH_TEHSIL'));
        
        const data = await response.json();
        pravariResponse = { success: true, data: data.data || [] };
      }

      // 2. Process Results
      if (pravariResponse.success) {
        setFilteredPravari(pravariResponse.data || []);
        setShowResults(true);
      } else {
        throw new Error(pravariResponse.error || getT('ERROR_API_GENERAL'));
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || getT('ERROR_API_GENERAL'));
      setFilteredPravari([]);
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  }, [activeLevel, zoneId, stateId, sambhagId, districtState, districtId, tehsilState, tehsilDistrict, tehsilSearch, getT]);


  // --- Component Rendering ---
  const renderFilterControls = useMemo(() => {
    switch (activeLevel) {
      case 'Zone':
        return (
          <div className="grid md:grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-semibold">
                <Globe className="w-5 h-5 text-blue-600" />
                {getT('SELECT_ZONE')}
              </label>
              <select
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">{getT('SELECT_ZONE')}</option>
                {zonesData.map((zone) => (
                  <option key={zone} value={zone}>{zone}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 'State':
        return (
          <div className="grid md:grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-semibold">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                {getT('SELECT_STATE')}
              </label>
              <select
                value={stateId}
                onChange={(e) => setStateId(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300 text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">{getT('SELECT_STATE')}</option>
                {getStates().map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 'Sambhag':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-semibold">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                {getT('SELECT_STATE')}
              </label>
              <select
                value={stateId}
                onChange={(e) => {
                  setStateId(e.target.value);
                  setSambhagId("");
                }}
                disabled={loading}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300 text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">{getT('SELECT_STATE')}</option>
                {getStates().map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-semibold">
                <Building className="w-5 h-5 text-purple-600" />
                {getT('SELECT_SAMBHAG')}
              </label>
              <select
                value={sambhagId}
                onChange={(e) => setSambhagId(e.target.value)}
                disabled={!stateId || loading}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
              >
                <option value="">{getT('SELECT_SAMBHAG')}</option>
                {getSambhags(stateId).map((sambhag) => (
                  <option key={sambhag} value={sambhag}>{sambhag}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 'District':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-semibold">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                {getT('SELECT_STATE')}
              </label>
              <select
                value={districtState}
                onChange={(e) => {
                  setDistrictState(e.target.value);
                  setDistrictId("");
                }}
                disabled={loading}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300 text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">{getT('SELECT_STATE')}</option>
                {getStates().map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-semibold">
                <MapPin className="w-5 h-5 text-purple-600" />
                {getT('SELECT_DISTRICT')}
              </label>
              <select
                value={districtId}
                onChange={(e) => setDistrictId(e.target.value)}
                disabled={!districtState || loading}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
              >
                <option value="">{getT('SELECT_DISTRICT')}</option>
                {getDistricts(districtState).map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 'Tehsil':
        return (
          <div className="grid md:grid-cols-3 gap-6">
            {/* State */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-semibold">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                {getT('SELECT_STATE')}
              </label>
              <select
                value={tehsilState}
                onChange={(e) => {
                  setTehsilState(e.target.value);
                  setTehsilDistrict("");
                  setTehsilSearch("");
                }}
                disabled={loading}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300 text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">{getT('SELECT_STATE')}</option>
                {getStates().map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            {/* District */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-semibold">
                <MapPin className="w-5 h-5 text-purple-600" />
                {getT('SELECT_DISTRICT')}
              </label>
              <select
                value={tehsilDistrict}
                onChange={(e) => {
                  setTehsilDistrict(e.target.value);
                  setTehsilSearch("");
                }}
                disabled={!tehsilState || loading}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
              >
                <option value="">{getT('SELECT_DISTRICT')}</option>
                {getDistricts(tehsilState).map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            {/* Tehsil/Village Search */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-semibold">
                <Home className="w-5 h-5 text-blue-600" />
                {getT('SEARCH_TEHSIL_VILLAGE')}
              </label>
              <input
                type="text"
                value={tehsilSearch}
                onChange={(e) => setTehsilSearch(e.target.value)}
                disabled={!tehsilDistrict || loading}
                placeholder={getT('SEARCH_TEHSIL_VILLAGE')}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  }, [activeLevel, loading, zoneId, stateId, sambhagId, districtState, districtId, tehsilState, tehsilDistrict, tehsilSearch, getStates, getDistricts, getSambhags, getT]);


  // Determine if the Search button should be enabled
  const isSearchDisabled = useMemo(() => {
    switch (activeLevel) {
      case 'Zone':
        return !zoneId;
      case 'State':
        return !stateId;
      case 'Sambhag':
        return !stateId || !sambhagId;
      case 'District':
        return !districtState || !districtId;
      case 'Tehsil':
        return !tehsilState || !tehsilDistrict;
      default:
        return true;
    }
  }, [activeLevel, zoneId, stateId, sambhagId, districtState, districtId, tehsilState, tehsilDistrict]);


  return (
    <div
      id="pravari-search-ui"
      className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-inter min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        {/* Language Toggle */}
        <div className="text-right mb-4">
          <button
            onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-full shadow-md hover:bg-gray-300 transition-all text-sm"
          >
            {language === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
          </button>
        </div>

        {/* Header */}
        <div className="text-center space-y-4 mb-10">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg">
            <span className="text-white font-bold text-sm tracking-wide">
              {getT('SEARCH_TITLE')}
            </span>
          </div>
          <h2 className="text-4xl pt-1 pb-1 md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {getT('TITLE')}
          </h2>
          <div className="w-32 h-1.5 mx-auto bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full shadow-md"></div>
          <p className="text-xl text-gray-700 font-medium max-w-3xl mx-auto">
            {getT('SUBTITLE')}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-5xl mx-auto mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center gap-3 shadow-md">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Search Form Container */}
        <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-blue-100">
          
          {/* Tabs/Level Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 border-b-2 border-gray-100 pb-4">
            {pravariLevels.map(level => (
              <button
                key={level.key}
                onClick={() => {
                  setActiveLevel(level.key);
                  handleReset();
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md ${
                  activeLevel === level.key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <level.Icon className="w-5 h-5" />
                {level.label}
              </button>
            ))}
          </div>
          
          {/* Filter Controls for Active Level */}
          <div className="mb-6">{renderFilterControls}</div>

          {/* Buttons */}
          <div className="flex gap-4 justify-center pt-4 border-t border-gray-100">
            <button
              onClick={handleSearch}
              disabled={loading || isSearchDisabled}
              className="group relative px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {getT('SEARCHING')}
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    {getT('SEARCH_BUTTON')}
                  </>
                )}
              </span>
            </button>

            <button
              onClick={handleReset}
              disabled={loading}
              className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {getT('RESET_BUTTON')}
            </button>
          </div>
        </div>

        {/* Results */}
        {showResults && !loading && (
          <div id="pravari-results" className="max-w-7xl mx-auto pt-12 pb-12">
            {filteredPravari.length > 0 ? (
              <>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {filteredPravari.length} {getT('PRABHARI_FOUND_PLURAL')}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {getT('RESULT_FOR_LEVEL', { level: getT(`LEVEL_${activeLevel}`) })}
                    <span className="font-semibold text-purple-600">
                      {activeLevel === 'Zone' && zoneId}
                      {activeLevel === 'State' && stateId}
                      {activeLevel === 'Sambhag' && sambhagId}
                      {activeLevel === 'District' && `${districtId}, ${districtState}`}
                      {activeLevel === 'Tehsil' && `${tehsilDistrict} (${tehsilSearch || getT('ALL_TEHSILS')})`}
                    </span>
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPravari.map((pravari) => (
                    <div
                      key={pravari.id}
                      className="group relative p-6 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-blue-100 hover:border-purple-300 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full">
                              <User className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-gray-800">
                                {pravari.name || getT('NAME_UNAVAILABLE')}
                              </h4>
                              <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-1">
                                <p className="text-white text-sm font-semibold">
                                  {pravari.role || getT('DEFAULT_ROLE')}
                                </p>
                              </div>
                            </div>
                          </div>
                          <Award className="w-8 h-8 text-yellow-500" />
                        </div>

                        <div className="space-y-3 border-t pt-4">
                          <div className="flex items-center gap-3 text-gray-700">
                            <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="font-medium">{pravari.phone || getT('DEFAULT_REGION')}</span>
                          </div>

                          <div className="flex items-center gap-3 text-gray-700">
                            <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span className="text-sm break-all">
                              {pravari.email || getT('DEFAULT_REGION')}
                            </span>
                          </div>

                          <div className="flex items-start gap-3 text-gray-700">
                            <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-semibold text-purple-700">
                                {pravari.region || pravari.village || getT('DEFAULT_REGION')}
                              </p>
                              <p className="text-sm text-gray-600">
                                {pravari.district || getT('DEFAULT_REGION')}, {pravari.state || getT('DEFAULT_REGION')}
                              </p>
                            </div>
                          </div>
                        </div>

                        {pravari.experience && (
                          <div className="pt-2">
                            <div className="inline-block px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 border border-orange-200 rounded-lg">
                              <p className="text-orange-700 font-semibold text-sm">
                                ✨ {pravari.experience}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center p-12 bg-white/90 rounded-2xl border-2 border-gray-200 shadow-lg">
                <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {getT('PRABHARI_NOT_FOUND')}
                </h3>
                <p className="text-gray-600">
                  {getT('NO_PRABHARI_REGION')}
                </p>
                <p className="text-gray-500 mt-2 text-sm">
                  {getT('TRY_DIFFERENT_REGION')}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PravariSearchUI;