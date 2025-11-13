"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { 
    Search, MapPin, User, Phone, Mail, Award, Loader2, AlertCircle, 
    TrendingUp, Globe, Building, X, List, ChevronDown 
} from "lucide-react";

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
    SEARCH_TEHSIL_VILLAGE: "Search Name/Phone/Email",
    
    SEARCH_BUTTON: "Search",
    RESET_BUTTON: "Reset",
    SEARCHING: "Searching...",

    ERROR_SELECT_ZONE: "Please select Zone.",
    ERROR_SELECT_STATE: "Please select State.",
    ERROR_SELECT_SAMBHAG: "Please select Sambhag.",
    ERROR_SELECT_STATE_DISTRICT: "Please select both State and District.",
    ERROR_API_GENERAL: "Failed to fetch data. Please try again.",
    ERROR_API_MASTER: "Failed to load master data.",
    
    PRABHARI_FOUND_PLURAL: "Prabharis Found",
    PRABHARI_NOT_FOUND: "No Prabhari Found",
    RESULT_FOR_LEVEL: "Results for {level} level:",
    NAME_UNAVAILABLE: "Name unavailable",
    DEFAULT_REGION: "N/A",
    NO_PRABHARI_REGION: "No Prabhari information is currently available for this selection.",
    TRY_DIFFERENT_REGION: "Please adjust your filters and try again.",
    ALL_TEHSILS: "All Tehsils",
    
    // MODAL STRINGS
    VIEW_AREAS: "View Assigned Areas",
    LOADING_AREAS: "Loading assigned areas...",
    STATES_IN_ZONE: "States & State Prabharis in Zone",
    SAMBHAGS_IN_STATE: "Sambhags & Sambhag Prabharis in State",
    DISTRICTS_IN_SAMBHAG: "Districts & District Prabharis in Sambhag",
    TEHSILS_IN_DISTRICT: "Tehsils & Tehsil Prabharis in District",
    NO_CHILD_UNITS: "No lower-level units assigned or found.",
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
    SEARCH_TEHSIL_VILLAGE: "नाम/फोन/ईमेल खोजें",
    
    SEARCH_BUTTON: "खोजें",
    RESET_BUTTON: "रीसेट करें",
    SEARCHING: "खोज हो रही है...",
    
    ERROR_SELECT_ZONE: "कृपया ज़ोन चुनें।",
    ERROR_SELECT_STATE: "कृपया राज्य चुनें।",
    ERROR_SELECT_SAMBHAG: "कृपया संभाग चुनें।",
    ERROR_SELECT_STATE_DISTRICT: "कृपया राज्य और जिला दोनों चुनें।",
    ERROR_API_GENERAL: "डेटा प्राप्त करने में विफल। कृपया पुन: प्रयास करें।",
    ERROR_API_MASTER: "मास्टर डेटा लोड करने में विफल।",
    
    PRABHARI_FOUND_PLURAL: "प्रभारी मिले",
    PRABHARI_NOT_FOUND: "कोई प्रभारी नहीं मिला",
    RESULT_FOR_LEVEL: "{level} स्तर के लिए परिणाम:",
    NAME_UNAVAILABLE: "नाम अनुपलब्ध",
    DEFAULT_REGION: "N/A",
    NO_PRABHARI_REGION: "आपके चयनित स्तर के लिए कोई प्रभारी जानकारी उपलब्ध नहीं है।",
    TRY_DIFFERENT_REGION: "कृपया कोई भिन्न फ़िल्टर समायोजित करें और पुन: प्रयास करें।",
    ALL_TEHSILS: "सभी तहसीलें",

    // NEW MODAL STRINGS
    VIEW_AREAS: "सौंपे गए क्षेत्र देखें",
    LOADING_AREAS: "सौंपे गए क्षेत्र लोड हो रहे हैं...",
    STATES_IN_ZONE: "ज़ोन में राज्य और राज्य प्रभारी",
    SAMBHAGS_IN_STATE: "राज्य में संभाग और संभाग प्रभारी",
    DISTRICTS_IN_SAMBHAG: "संभाग में जिले और जिला प्रभारी",
    TEHSILS_IN_DISTRICT: "जिले में तहसील और तहसील प्रभारी",
    NO_CHILD_UNITS: "कोई निम्न-स्तरीय इकाई असाइन या मिली नहीं।",
  },
};

// --- New Component: Modal for Showing Child Units ---
const PrabhariDetailsModal = ({ prabhari, onClose, getT }) => {
    const [childUnits, setChildUnits] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const unitDetails = useMemo(() => {
        let titleKey = '';
        let endpoint = '';
        // Determine the ID of the unit the current prabhari is assigned to
        let unitId = prabhari.unitId || prabhari.zoneId || prabhari.stateId || prabhari.sambhagId || prabhari.districtId || prabhari.id; 
        
        let nextLevelKey = ''; 

        switch (prabhari.level) {
            case 'ZONE':
                titleKey = 'STATES_IN_ZONE';
                endpoint = `/api/states/prabharis?zoneId=${unitId}`; 
                nextLevelKey = 'STATE';
                break;
            case 'STATE':
                titleKey = 'SAMBHAGS_IN_STATE';
                // FIX 1: Using the confirmed GET API endpoint which returns Sambhags with nested prabhari object.
                endpoint = `/api/sambhags?stateId=${unitId}`; 
                nextLevelKey = 'SAMBHAG';
                break;
            case 'SAMBHAG':
                titleKey = 'DISTRICTS_IN_SAMBHAG';
                // Note: The /api/districts/prabharis POST endpoint requires districtIds array in the body.
                // We'll proceed with a standard GET assumption, but if it fails, we know it needs a POST/body fix later.
                endpoint = `/api/districts?sambhagId=${unitId}`;
                nextLevelKey = 'DISTRICT';
                break;
            case 'DISTRICT':
                titleKey = 'TEHSILS_IN_DISTRICT';
                // Assuming standard GET, or we rely on the backend to handle the query parameter correctly.
                endpoint = `/api/tehsils?districtId=${unitId}`;
                nextLevelKey = 'TEHSIL';
                break;
            default:
                return null; // Tehsil level has no lower units
        }
        return { title: getT(titleKey), endpoint, nextLevelKey };
    }, [prabhari, getT]);

    useEffect(() => {
        if (!unitDetails) return;
        
        const fetchChildUnits = async () => {
            setLoading(true);
            setError('');
            try {
                // Log endpoint for debugging 405/404 issues
                console.log(`[Modal Fetch] Attempting GET to: ${unitDetails.endpoint}`);

                const res = await fetch(window.location.origin + unitDetails.endpoint);
                
                if (!res.ok) {
                    let errorBody = await res.text();
                    try {
                        errorBody = JSON.parse(errorBody).error || errorBody;
                    } catch (e) {}
                    // Throw a detailed error to be caught by the front-end display
                    throw new Error(`[${res.status} ${res.statusText}] Failed to fetch assigned units. API response detail: ${errorBody.slice(0, 100)}...`);
                }
                
                let data = await res.json();
                
                // Assuming API returns {data: []} or just []
                const unitsArray = data.data || data; 
                setChildUnits(unitsArray || []);
            } catch (err) {
                console.error("Child unit fetch error:", err);
                setError(err.message || getT('ERROR_API_GENERAL'));
            } finally {
                setLoading(false);
            }
        };
        fetchChildUnits();
    }, [unitDetails, getT]);

    if (!unitDetails) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 m-4 relative animate-fade-in max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full p-2 transition-all"
                >
                    <X size={24} />
                </button>

                <div className="text-center mb-6 border-b pb-4">
                    <h3 className="text-2xl font-bold text-gray-800">{prabhari.name}</h3>
                    <p className="text-md text-purple-600 font-semibold mt-1">
                        {getT(`LEVEL_${prabhari.level}`)} for {prabhari.zoneName || prabhari.stateName || prabhari.sambhagName || prabhari.districtName || 'Area'}
                    </p>
                </div>

                <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                    <List className="w-5 h-5 text-blue-600" />
                    {unitDetails.title}
                </h4>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-10 text-gray-600">
                        <Loader2 className="w-8 h-8 animate-spin mb-3" />
                        <p>{getT('LOADING_AREAS')}</p>
                    </div>
                ) : error ? (
                    <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
                        <span className="font-semibold block mb-2">Error Loading Details:</span>
                        <p className="text-sm break-all">{error}</p>
                        <p className="text-xs mt-2 italic">Please check the console for API endpoint details.</p>
                    </div>
                ) : childUnits && childUnits.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto p-2 bg-gray-50 rounded-lg border">
                        {childUnits.map((unit) => {
                            // FIX 2: Handle both single object (unit.prabhari, common for State/Sambhag)
                            // and array (unit.prabharis, common for District/Tehsil)
                            const rawPrabhariData = unit.prabharis || unit.prabhari;
                            const unitPrabharis = Array.isArray(rawPrabhariData) 
                                ? rawPrabhariData 
                                : (rawPrabhariData ? [rawPrabhariData] : []);
                            const nextLevelKey = unitDetails.nextLevelKey; 

                            return (
                                <div 
                                    key={unit.id} 
                                    className="p-3 bg-white rounded-lg shadow-sm border border-gray-200"
                                >
                                    <h5 className="font-bold text-gray-800 flex items-center gap-2">
                                        <MapPin size={16} className="text-purple-500"/>
                                        {unit.name}
                                    </h5>
                                    
                                    {unitPrabharis.length > 0 ? (
                                        <div className="mt-2 text-sm text-gray-600 space-y-1 border-t pt-2">
                                            {unitPrabharis.map((p) => (
                                                <div key={p.id} className="space-y-0.5">
                                                    <p className="flex items-center gap-2">
                                                        <User size={14} className="text-gray-500" />
                                                        <strong>{p.name}</strong>
                                                        <span className="text-xs text-blue-500 ml-1">({getT(`LEVEL_${nextLevelKey}`)} Prabhari)</span>
                                                    </p>
                                                    <p className="flex items-center gap-2 text-xs ml-5">
                                                        <Phone size={12} className="text-gray-500" />
                                                        {p.phone}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500 mt-1">
                                            No {getT(`LEVEL_${nextLevelKey}`)} assigned.
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-center py-6 text-gray-500">{getT('NO_CHILD_UNITS')}</p>
                )}
                
            </div>
        </div>
    );
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
    { key: 'ZONE', label: getT('LEVEL_ZONE'), Icon: Globe },
    { key: 'STATE', label: getT('LEVEL_STATE'), Icon: TrendingUp },
    { key: 'SAMBHAG', label: getT('LEVEL_SAMBHAG'), Icon: Building },
    { key: 'DISTRICT', label: getT('LEVEL_DISTRICT'), Icon: MapPin },
    { key: 'TEHSIL', label: getT('LEVEL_TEHSIL'), Icon: MapPin },
  ], [getT]);

  // --- Master Data States ---
  const [masterDataLoading, setMasterDataLoading] = useState(true);
  const [zones, setZones] = useState([]);
  const [states, setStates] = useState([]);
  const [sambhags, setSambhags] = useState([]); 
  const [districtsForDistrictTab, setDistrictsForDistrictTab] = useState([]);
  const [districtsForTehsilTab, setDistrictsForTehsilTab] = useState([]);

  // --- Search States ---
  const [activeLevel, setActiveLevel] = useState('DISTRICT');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filteredPravari, setFilteredPravari] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  // --- Modal State ---
  const [selectedPrabhari, setSelectedPrabhari] = useState(null); // New state for modal

  // Filter States
  const [zoneId, setZoneId] = useState("");
  const [stateIdForHigherLevels, setStateIdForHigherLevels] = useState("");
  const [sambhagId, setSambhagId] = useState("");
  const [districtStateId, setDistrictStateId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [tehsilStateId, setTehsilStateId] = useState("");
  const [tehsilDistrictId, setTehsilDistrictId] = useState("");
  const [tehsilSearch, setTehsilSearch] = useState(""); 

  // --- Master Data Fetching ---
  useEffect(() => {
    const fetchMasterData = async () => {
      setMasterDataLoading(true);
      try {
        const [zonesRes, statesRes] = await Promise.all([
          fetch(window.location.origin + '/api/zones'),
          fetch(window.location.origin + '/api/states'),
        ]);

        const statesData = await statesRes.json(); 
        const zonesData = await zonesRes.json();
        const zonesArray = zonesData.data || zonesData; 

        setZones(zonesArray || []);
        setStates(statesData || []);

      } catch (e) {
        console.error('Failed to fetch initial master data:', e);
        setError(getT('ERROR_API_MASTER')); 
      } finally {
        setMasterDataLoading(false);
      }
    };
    fetchMasterData();
  }, [getT]);

  // Fetch Sambhags based on State selection
  useEffect(() => {
    if (stateIdForHigherLevels) {
      fetch(window.location.origin + `/api/sambhags?stateId=${stateIdForHigherLevels}`)
        .then(res => res.json())
        .then(data => {
            const sambhagsArray = data.data || data; 
            setSambhags(sambhagsArray || []);
        })
        .catch(e => console.error('Failed to fetch sambhags:', e));
    } else {
      setSambhags([]);
    }
  }, [stateIdForHigherLevels]);

  // Fetch Districts based on State selection for DISTRICT tab
  useEffect(() => {
    if (districtStateId) {
      fetch(window.location.origin + `/api/districts?stateId=${districtStateId}`)
        .then(res => res.json())
        .then(data => setDistrictsForDistrictTab(data || []))
        .catch(e => console.error('Failed to fetch districts for district tab:', e));
    } else {
      setDistrictsForDistrictTab([]);
    }
  }, [districtStateId]);
  
  // Fetch Districts based on State selection for TEHSIL tab
  useEffect(() => {
    if (tehsilStateId) {
      fetch(window.location.origin + `/api/districts?stateId=${tehsilStateId}`)
        .then(res => res.json())
        .then(data => setDistrictsForTehsilTab(data || []))
        .catch(e => console.error('Failed to fetch districts for tehsil tab:', e));
    } else {
      setDistrictsForTehsilTab([]);
    }
  }, [tehsilStateId]);


  // --- Helper Functions ---
  const getStates = useCallback(() => states, [states]);
  const getZoneNames = useCallback(() => zones, [zones]);
  const getDistrictsForDistrictTab = useCallback(() => districtsForDistrictTab, [districtsForDistrictTab]);
  const getDistrictsForTehsilTab = useCallback(() => districtsForTehsilTab, [districtsForTehsilTab]);
  const getSambhagsForState = useCallback(() => sambhags, [sambhags]);


  const handleReset = useCallback(() => {
    setZoneId("");
    setStateIdForHigherLevels("");
    setSambhagId("");
    setDistrictStateId("");
    setDistrictId("");
    setTehsilStateId("");
    setTehsilDistrictId("");
    setTehsilSearch("");
    setFilteredPravari([]);
    setShowResults(false);
    setError("");
    setLoading(false);
    setSelectedPrabhari(null); // Close modal
  }, []);

  // --- API Search Handler (Unified Fetch) ---
  const handleSearch = useCallback(async () => {
    setError("");
    setShowResults(false);
    setLoading(true);

    try {
      const level = activeLevel;
      const params = new URLSearchParams();
      params.append('level', level);
      
      let unitIdToAppend = ''; // To store the ID of the geographical unit (for modal use)
      
      // 1. Determine Filters based on activeLevel
      if (level === 'ZONE') {
          if (zoneId) {
            params.append('zoneId', zoneId);
            unitIdToAppend = zoneId;
          }
          if (!zoneId && !tehsilSearch.trim()) throw new Error(getT("ERROR_SELECT_ZONE"));
          if (tehsilSearch.trim()) params.append('search', tehsilSearch.trim());

      } else if (level === 'STATE') {
          if (!stateIdForHigherLevels) throw new Error(getT("ERROR_SELECT_STATE"));
          params.append('stateId', stateIdForHigherLevels);
          unitIdToAppend = stateIdForHigherLevels;
          if (tehsilSearch.trim()) params.append('search', tehsilSearch.trim());
          
      } else if (level === 'SAMBHAG') {
          if (!stateIdForHigherLevels || !sambhagId) throw new Error(getT("ERROR_SELECT_SAMBHAG"));
          params.append('stateId', stateIdForHigherLevels); 
          params.append('sambhagId', sambhagId);
          unitIdToAppend = sambhagId;
          if (tehsilSearch.trim()) params.append('search', tehsilSearch.trim());
          
      } else if (level === 'DISTRICT') {
          if (!districtStateId || !districtId) throw new Error(getT("ERROR_SELECT_STATE_DISTRICT"));
          params.append('stateId', districtStateId); 
          params.append('districtId', districtId);
          unitIdToAppend = districtId;
          if (tehsilSearch.trim()) params.append('search', tehsilSearch.trim());
          
      } else if (level === 'TEHSIL') {
          if (!tehsilStateId || !tehsilDistrictId) throw new Error(getT("ERROR_SELECT_STATE_DISTRICT"));
          params.append('stateId', tehsilStateId); 
          params.append('districtId', tehsilDistrictId);
          unitIdToAppend = tehsilDistrictId;
          if (tehsilSearch.trim()) {
              params.append('search', tehsilSearch.trim());
          }
      }

      params.append('page', '1');
      params.append('limit', '50');

      const apiEndpoint = window.location.origin + `/api/prabharis?${params.toString()}`;
      
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        let errorBody = await response.text();
        try {
            errorBody = JSON.parse(errorBody).error;
        } catch (e) {}
        throw new Error(errorBody || getT('ERROR_API_GENERAL'));
      }
      
      const data = await response.json();

      if (data && data.data) {
        // Enhance results with the current unit ID for the modal to use
        const results = data.data.map(p => ({
            ...p,
            unitId: unitIdToAppend || p.id, // Fallback to prabhari ID if no search unit ID
        }));
        setFilteredPravari(results || []);
        setShowResults(true);
      } else {
        throw new Error(data.error || getT('ERROR_API_GENERAL'));
      }

    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || getT('ERROR_API_GENERAL'));
      setFilteredPravari([]);
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  }, [activeLevel, zoneId, stateIdForHigherLevels, sambhagId, districtStateId, districtId, tehsilStateId, tehsilDistrictId, tehsilSearch, getT, zones, states, sambhags]);
  
  // --- Modal Handlers ---
  const openModal = (prabhari) => {
    // Only open the modal if the prabhari is at a level that *has* children
    if (prabhari.level !== 'TEHSIL') {
        setSelectedPrabhari(prabhari);
    }
  };

  const closeModal = () => {
    setSelectedPrabhari(null);
  };

  // --- Component Rendering ---
  const renderFilterControls = useMemo(() => {
    if (masterDataLoading) {
      return (
        <div className="flex justify-center items-center py-8 text-indigo-600">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span>Loading geographical data...</span>
        </div>
      );
    }
    
    switch (activeLevel) {
        case 'ZONE':
          return (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <Globe className="w-5 h-5 text-blue-600" />
                  {getT('SELECT_ZONE')}
                </label>
                <select
                  value={zoneId}
                  onChange={(e) => {
                      setZoneId(e.target.value);
                      setTehsilSearch("");
                  }}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">{getT('SELECT_ZONE')}</option>
                  {getZoneNames().map((zone) => (
                    <option key={zone.id} value={zone.id}>{zone.name}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Note: Searches by Zone, or use the global search below.
                </p>
              </div>
               {/* Global Search Input (Applicable to all levels) */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <Search className="w-5 h-5 text-blue-600" />
                  {getT('SEARCH_TEHSIL_VILLAGE')}
                </label>
                <input
                  type="text"
                  value={tehsilSearch}
                  onChange={(e) => setTehsilSearch(e.target.value)}
                  disabled={loading}
                  placeholder={getT('SEARCH_TEHSIL_VILLAGE')}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
                />
                <p className="text-xs text-gray-500">
                  (Searches Name, Phone, or Email across this level)
                </p>
              </div>
            </div>
          );

        case 'STATE':
          return (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  {getT('SELECT_STATE')}
                </label>
                <select
                  value={stateIdForHigherLevels}
                  onChange={(e) => {
                      setStateIdForHigherLevels(e.target.value);
                      setTehsilSearch("");
                  }}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300 text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">{getT('SELECT_STATE')}</option>
                  {getStates().map((state) => (
                    <option key={state.id} value={state.id}>{state.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <Search className="w-5 h-5 text-blue-600" />
                  {getT('SEARCH_TEHSIL_VILLAGE')}
                </label>
                <input
                  type="text"
                  value={tehsilSearch}
                  onChange={(e) => setTehsilSearch(e.target.value)}
                  disabled={loading}
                  placeholder={getT('SEARCH_TEHSIL_VILLAGE')}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
                />
                <p className="text-xs text-gray-500">
                  (Searches Name, Phone, or Email across this level)
                </p>
              </div>
            </div>
          );

        case 'SAMBHAG':
          return (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  {getT('SELECT_STATE')}
                </label>
                <select
                  value={stateIdForHigherLevels}
                  onChange={(e) => {
                    setStateIdForHigherLevels(e.target.value);
                    setSambhagId("");
                    setTehsilSearch("");
                  }}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300 text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">{getT('SELECT_STATE')}</option>
                  {getStates().map((state) => (
                    <option key={state.id} value={state.id}>{state.name}</option>
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
                  onChange={(e) => {
                      setSambhagId(e.target.value);
                      setTehsilSearch("");
                  }}
                  disabled={!stateIdForHigherLevels || loading}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
                >
                  <option value="">{getT('SELECT_SAMBHAG')}</option>
                  {getSambhagsForState().map((sambhag) => (
                    <option key={sambhag.id} value={sambhag.id}>{sambhag.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <Search className="w-5 h-5 text-blue-600" />
                  {getT('SEARCH_TEHSIL_VILLAGE')}
                </label>
                <input
                  type="text"
                  value={tehsilSearch}
                  onChange={(e) => setTehsilSearch(e.target.value)}
                  disabled={loading}
                  placeholder={getT('SEARCH_TEHSIL_VILLAGE')}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
                />
                <p className="text-xs text-gray-500">
                  (Searches Name, Phone, or Email across this level)
                </p>
              </div>
            </div>
          );

        case 'DISTRICT':
          return (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  {getT('SELECT_STATE')}
                </label>
                <select
                  value={districtStateId}
                  onChange={(e) => {
                    setDistrictStateId(e.target.value);
                    setDistrictId("");
                    setTehsilSearch("");
                  }}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300 text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">{getT('SELECT_STATE')}</option>
                  {getStates().map((state) => (
                    <option key={state.id} value={state.id}>{state.name}</option>
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
                  onChange={(e) => {
                      setDistrictId(e.target.value);
                      setTehsilSearch("");
                  }}
                  disabled={!districtStateId || loading}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
                >
                  <option value="">{getT('SELECT_DISTRICT')}</option>
                  {getDistrictsForDistrictTab().map((district) => (
                    <option key={district.id} value={district.id}>{district.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <Search className="w-5 h-5 text-blue-600" />
                  {getT('SEARCH_TEHSIL_VILLAGE')}
                </label>
                <input
                  type="text"
                  value={tehsilSearch}
                  onChange={(e) => setTehsilSearch(e.target.value)}
                  disabled={loading}
                  placeholder={getT('SEARCH_TEHSIL_VILLAGE')}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
                />
                <p className="text-xs text-gray-500">
                  (Searches Name, Phone, or Email across this level)
                </p>
              </div>
            </div>
          );

        case 'TEHSIL':
          return (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  {getT('SELECT_STATE')}
                </label>
                <select
                  value={tehsilStateId}
                  onChange={(e) => {
                    setTehsilStateId(e.target.value);
                    setTehsilDistrictId("");
                    setTehsilSearch("");
                  }}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300 text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">{getT('SELECT_STATE')}</option>
                  {getStates().map((state) => (
                    <option key={state.id} value={state.id}>{state.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  {getT('SELECT_DISTRICT')}
                </label>
                <select
                  value={tehsilDistrictId}
                  onChange={(e) => {
                    setTehsilDistrictId(e.target.value);
                    setTehsilSearch("");
                  }}
                  disabled={!tehsilStateId || loading}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
                >
                  <option value="">{getT('SELECT_DISTRICT')}</option>
                  {getDistrictsForTehsilTab().map((district) => (
                    <option key={district.id} value={district.id}>{district.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <Search className="w-5 h-5 text-blue-600" />
                  {getT('SEARCH_TEHSIL_VILLAGE')}
                </label>
                <input
                  type="text"
                  value={tehsilSearch}
                  onChange={(e) => setTehsilSearch(e.target.value)}
                  disabled={!tehsilDistrictId || loading}
                  placeholder={getT('SEARCH_TEHSIL_VILLAGE')}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
                />
                <p className="text-xs text-gray-500">
                  (Searches Name, Phone, or Email within this district)
                </p>
              </div>
            </div>
          );

        default:
          return null;
      }
  }, [activeLevel, loading, masterDataLoading, zoneId, stateIdForHigherLevels, sambhagId, districtStateId, districtId, tehsilStateId, tehsilDistrictId, tehsilSearch, getStates, getDistrictsForDistrictTab, getDistrictsForTehsilTab, getSambhagsForState, getZoneNames, getT]);


  // Determine if the Search button should be enabled
  const isSearchDisabled = useMemo(() => {
    const searchIsPresent = tehsilSearch.trim();

    if (masterDataLoading || loading) return true;

    switch (activeLevel) {
      case 'ZONE':
        return !zoneId && !searchIsPresent;
      case 'STATE':
        return !stateIdForHigherLevels && !searchIsPresent;
      case 'SAMBHAG':
        return (!stateIdForHigherLevels || !sambhagId) && !searchIsPresent;
      case 'DISTRICT':
        return !districtStateId || !districtId; 
      case 'TEHSIL':
        return !tehsilStateId || !tehsilDistrictId;
      default:
        return true;
    }
  }, [activeLevel, zoneId, stateIdForHigherLevels, sambhagId, districtStateId, districtId, tehsilStateId, tehsilDistrictId, tehsilSearch, masterDataLoading, loading]);

  // Helper to format the displayed region name based on the data structure
  const getPrabhariRegion = (p) => {
    switch (p.level) {
      case 'TEHSIL':
        return p.tehsilName;
      case 'DISTRICT':
        return p.districtName;
      case 'SAMBHAG':
        return p.sambhagName;
      case 'STATE':
        return p.stateName;
      case 'ZONE':
        return p.zoneName;
      default:
        return getT('DEFAULT_REGION');
    }
  };
  
  // Helper to format the displayed district name
  const getPrabhariDistrict = (p) => {
    if (p.level === 'TEHSIL') return p.districtName;
    return getT('DEFAULT_REGION');
  };
  
  // Helper to format the displayed state name
  const getPrabhariState = (p) => {
      return p.stateName || getT('DEFAULT_REGION');
  }


  return (
    <div
      id="pravari"
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
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedPrabhari ? '' : 'Click the card to view assigned areas.'}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPravari.map((pravari) => (
                    <div
                      key={pravari.id}
                      onClick={() => openModal(pravari)}
                      // Add cursor pointer only if the level has children
                      className={`group relative p-6 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-blue-100 hover:border-purple-300 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] ${
                        pravari.level !== 'TEHSIL' ? 'cursor-pointer' : ''
                      }`}
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
                                  {getT(`LEVEL_${pravari.level}`)}
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

                          {/* Location Display based on flattened fields */}
                          <div className="flex items-start gap-3 text-gray-700">
                            <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-semibold text-purple-700">
                                {getPrabhariRegion(pravari) || getT('DEFAULT_REGION')}
                              </p>
                              <p className="text-sm text-gray-600">
                                {getPrabhariDistrict(pravari) && `${getPrabhariDistrict(pravari)}, `}
                                {getPrabhariState(pravari)}
                              </p>
                            </div>
                          </div>
                          
                          {/* Indicator for clickable detail */}
                          {pravari.level !== 'TEHSIL' && (
                              <div className="pt-2 text-center border-t border-gray-100 mt-3">
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-500 group-hover:text-purple-700 transition-all">
                                    <List className="w-3 h-3" />
                                    {getT('VIEW_AREAS')}
                                </span>
                              </div>
                          )}
                        </div>
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
      
      {/* Modal Render */}
      {selectedPrabhari && (
          <PrabhariDetailsModal 
              prabhari={selectedPrabhari} 
              onClose={closeModal} 
              getT={getT} 
          />
      )}
    </div>
  );
};

export default PravariSearchUI;