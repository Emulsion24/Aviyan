import {
  Loader2,
  Trash2,
  UserPlus,
  X,
  MapPin,
  Users,
  Edit,
  Plus,
  Mail,
  Phone,
  Building,
  User,
  Search,
  Map,
} from "lucide-react";
import { useState, useEffect, useMemo, useCallback } from "react";

// Helper function for confirmation dialog
const showConfirmation = (message) => {
  // Using window.confirm as per component's original design
  return window.confirm(message);
};

// The component is exported directly as a default function
export default function App() {
  const [loading, setLoading] = useState(false);
  const [prabhariLoading, setPrabhariLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Sambhags State
  const [allSambhags, setAllSambhags] = useState([]);
  const [sambhagsInState, setSambhagsInState] = useState([]);
  const [showSambhagForm, setShowSambhagForm] = useState(false);
  const [editingSambhag, setEditingSambhag] = useState(null);
  const [newSambhag, setNewSambhag] = useState({
    name: "",
    stateId: "",
    districtIds: [],
  });
  const [selectedStateId, setSelectedStateId] = useState(""); // State selected in the top dropdown

  // Sambhag Prabharis State
  const [sambhagPrabharis, setSambhagPrabharis] = useState([]);
  const [showPrabhariForm, setShowPrabhariForm] = useState(false);
  const [editingPrabhari, setEditingPrabhari] = useState(null);
  const [newPrabhari, setNewPrabhari] = useState({
    name: "",
    email: "",
    phone: "",
    sambhagId: "",
  });
  // NEW: State for the prabhari form's state selection
  const [prabhariFormStateId, setPrabhariFormStateId] = useState("");

  // Data for forms
  const [allStates, setAllStates] = useState([]);
  const [allDistrictsInState, setAllDistrictsInState] = useState([]);

  // Search & Filter State
  const [searchInput, setSearchInput] = useState("");
  // NEW: State for the prabhari list's state filter
  const [prabhariListStateFilter, setPrabhariListStateFilter] = useState("");

  // Modal State
  const [selectedPrabhari, setSelectedPrabhari] = useState(null);
  const [modalDetails, setModalDetails] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  // --- Helper Functions ---
  const clearMessages = useCallback(() => {
    setError("");
    setSuccessMsg("");
  }, []);

  const showSuccess = useCallback((message) => {
    clearMessages();
    setSuccessMsg(message);
    setTimeout(() => setSuccessMsg(""), 3000);
  }, [clearMessages]);

  const showError = useCallback((message) => {
    clearMessages();
    setError(message);
  }, [clearMessages]);

  // --- API Functions ---

  const fetchAllStates = useCallback(async () => {
    try {
      const response = await fetch('/api/states');
      if (!response.ok) throw new Error('Failed to fetch states');
      const data = await response.json();
      setAllStates(data);
    } catch (err) {
      showError(err.message);
    }
  }, [showError]);

  const fetchAllDistrictsForState = useCallback(async (stateId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/districts?stateId=${stateId}`);
      if (!response.ok) throw new Error('Failed to fetch districts');
      const data = await response.json();
      setAllDistrictsInState(data);
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const fetchSambhagsForState = useCallback(async (stateId) => {
    if (!stateId) {
      setSambhagsInState([]);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/sambhags?stateId=${stateId}`);
      if (!response.ok) throw new Error('Failed to fetch sambhags');
      const data = await response.json();
      setSambhagsInState(data);
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const fetchAllSambhags = useCallback(async () => {
    try {
      const response = await fetch('/api/sambhags');
      if (!response.ok) throw new Error('Failed to fetch all sambhags');
      const data = await response.json();
      setAllSambhags(data); // This now includes stateId
    } catch (err) {
      showError(err.message);
    }
  }, [showError]);

  const fetchSambhagPrabharis = useCallback(async () => {
    setPrabhariLoading(true);
    try {
      const response = await fetch('/api/prabharis?level=SAMBHAG&page=1&limit=500');
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch sambhag prabharis');
      }
      const data = await response.json();
      
      // Assuming API returns { data: [...], ... }
      setSambhagPrabharis(data.data || data);
    } catch (err) {
      showError(err.message);
    } finally {
      setPrabhariLoading(false);
    }
  }, [showError]);

  // --- Initial Data Fetch ---
  useEffect(() => {
    fetchAllStates();
    fetchSambhagPrabharis();
    fetchAllSambhags();
  }, [fetchAllStates, fetchSambhagPrabharis, fetchAllSambhags]);

  // --- Sambhag Form State Logic ---
  const sambhagFormData = editingSambhag || newSambhag;
  const formStateId = editingSambhag ? editingSambhag.stateId : newSambhag.stateId;
  const selectedStateForForm = useMemo(() => 
    allStates.find(s => s.id === formStateId)
  , [allStates, formStateId]);

  // Effect to fetch districts when state changes in the Sambhag form
  useEffect(() => {
    if (formStateId) {
      fetchAllDistrictsForState(formStateId);
    } else {
      setAllDistrictsInState([]);
    }
  }, [formStateId, fetchAllDistrictsForState]);

  // --- NEW: Filtered Sambhags for Prabhari Form ---
  const sambhagsForPrabhariForm = useMemo(() => {
    if (!prabhariFormStateId) {
      return []; // No state selected, so no sambhags to show
    }
    return allSambhags.filter(s => s.stateId === prabhariFormStateId);
  }, [prabhariFormStateId, allSambhags]);


  // --- MODIFIED: Filtered Prabharis (List) ---
  const filteredPrabharis = useMemo(() => {
    const lowercasedInput = searchInput.toLowerCase();
    
    // 1. Filter by State
    const stateFiltered = () => {
      if (prabhariListStateFilter === "") {
        return sambhagPrabharis; // No state filter applied
      }
      
      // Create a Set of sambhag IDs that are in the selected state
      const sambhagIdsInState = new Set(
        allSambhags
          .filter(s => s.stateId === prabhariListStateFilter)
          .map(s => s.id)
      );
      
      // Filter prabharis whose unitId (sambhagId) is in the Set
      return sambhagPrabharis.filter(p => 
        sambhagIdsInState.has(p.unitId) || sambhagIdsInState.has(p.sambhagId)
      );
    };

    const byState = stateFiltered();

    // 2. Filter by Search Input
    if (lowercasedInput === "") {
      return byState; // Only state filter applied
    } else {
      return byState.filter( // Filter the *already state-filtered* list
        (p) =>
          p.name.toLowerCase().includes(lowercasedInput) ||
          (p.sambhagName && p.sambhagName.toLowerCase().includes(lowercasedInput))
      );
    }
  }, [searchInput, sambhagPrabharis, prabhariListStateFilter, allSambhags]); // Added dependencies

  // --- Sambhag CRUD Handlers ---

  const handleSambhagFormChange = (e) => {
    const { name, value } = e.target;
    const currentData = editingSambhag || newSambhag;
    const setData = editingSambhag ? setEditingSambhag : setNewSambhag;

    if (name === "stateId") {
      // Clear districts when state changes
      setData({ ...currentData, stateId: value, districtIds: [] });
    } else {
      setData({ ...currentData, [name]: value });
    }
  };

  const toggleDistrictSelection = (districtId) => {
    const currentData = editingSambhag || newSambhag;
    const setData = editingSambhag ? setEditingSambhag : setNewSambhag;

    const districtIds = currentData.districtIds.includes(districtId)
      ? currentData.districtIds.filter((id) => id !== districtId)
      : [...currentData.districtIds, districtId];

    setData({ ...currentData, districtIds });
  };

  const getAvailableDistricts = useCallback(() => {
    if (!formStateId) return [];

    // Find all district IDs in this state already assigned to OTHER sambhags
    const assignedDistrictIds = new Set(
      allSambhags
        .filter(s => s.stateId === formStateId && s.id !== (editingSambhag?.id || null))
        .flatMap(s => s.districts.map(d => d.id || d)) 
    );
    
    // Return districts from the selected state that are not already assigned
    return allDistrictsInState.filter(d => !assignedDistrictIds.has(d.id));
  }, [formStateId, allSambhags, editingSambhag, allDistrictsInState]);

  const closeSambhagForm = () => {
    setEditingSambhag(null);
    setShowSambhagForm(false);
    setError("");
    // Preserve the stateId from the top dropdown, if one was selected
    setNewSambhag(prev => ({ 
      name: "", 
      stateId: selectedStateId || prev.stateId, // Use the one from dropdown if available, else preserve previous
      districtIds: [] 
    }));
  };

  const handleAddSambhag = async (e) => {
    e.preventDefault();
    if (newSambhag.districtIds.length === 0) {
      showError("Please select at least one district");
      return;
    }
    setLoading(true);
    clearMessages();
    try {
      const response = await fetch('/api/sambhags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSambhag),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create sambhag");

      showSuccess("Sambhag created successfully! ✓");
      fetchSambhagsForState(newSambhag.stateId);
      fetchAllSambhags();
      closeSambhagForm();
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSambhag = async (e) => {
    e.preventDefault();
    if (editingSambhag.districtIds.length === 0) {
      showError("Please select at least one district");
      return;
    }
    setLoading(true);
    clearMessages();
    try {
      const response = await fetch(`/api/sambhags/${editingSambhag.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingSambhag.name,
          districtIds: editingSambhag.districtIds,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to update sambhag");
      
      showSuccess("Sambhag updated successfully! ✓");
      fetchSambhagsForState(editingSambhag.stateId);
      fetchAllSambhags();
      closeSambhagForm();
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSambhag = async (id, stateId) => {
    if (!showConfirmation("Are you sure you want to delete this sambhag? This action cannot be undone.")) return;
    setLoading(true);
    clearMessages();
    try {
      const response = await fetch(`/api/sambhags/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to delete sambhag");

      showSuccess("Sambhag deleted successfully");
      fetchSambhagsForState(stateId);
      fetchAllSambhags();
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Sambhag Prabhari CRUD Handlers ---

  const prabhariFormData = editingPrabhari || newPrabhari;

  const handlePrabhariFormChange = (e) => {
    const { name, value } = e.target;
    const currentData = editingPrabhari || newPrabhari;
    const setData = editingPrabhari ? setEditingPrabhari : setNewPrabhari;
    setData({ ...currentData, [name]: value });
  }

  // MODIFIED: closePrabhariForm
  const closePrabhariForm = () => {
    setEditingPrabhari(null);
    setShowPrabhariForm(false);
    setNewPrabhari({ name: "", email: "", phone: "", sambhagId: "" });
    setError("");
    setPrabhariFormStateId(""); // Reset the state filter for the form
  };

  const handleAddPrabhari = async (e) => {
    e.preventDefault();
    setPrabhariLoading(true);
    clearMessages();
    try {
      const response = await fetch('/api/prabharis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newPrabhari.name,
          email: newPrabhari.email,
          phone: newPrabhari.phone,
          level: 'SAMBHAG',
          unitId: newPrabhari.sambhagId,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create prabhari");

      fetchSambhagPrabharis(); 
      showSuccess("Sambhag Prabhari added successfully! ✓");
      closePrabhariForm();
    } catch (err) {
      showError(err.message);
    } finally {
      setPrabhariLoading(false);
    }
  };

  const handleUpdatePrabhari = async (e) => {
    e.preventDefault();
    setPrabhariLoading(true);
    clearMessages();
    try {
      const response = await fetch(`/api/prabharis/${editingPrabhari.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingPrabhari.name,
          email: editingPrabhari.email,
          phone: editingPrabhari.phone,
          unitId: editingPrabhari.sambhagId, 
          level: 'SAMBHAG'
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to update prabhari");

      fetchSambhagPrabharis(); 
      showSuccess("Sambhag Prabhari updated successfully! ✓");
      closePrabhariForm();
    } catch (err) {
      showError(err.message);
    } finally {
      setPrabhariLoading(false);
    }
  };

  const handleDeletePrabhari = async (id) => {
    if (!showConfirmation("Are you sure you want to delete this sambhag prabhari?")) return;
    setPrabhariLoading(true);
    clearMessages();
    try {
      const response = await fetch(`/api/prabharis/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to delete prabhari");
      
      setSambhagPrabharis(sambhagPrabharis.filter(p => p.id !== id));
      showSuccess("Sambhag Prabhari deleted successfully");
    } catch (err) {
      showError(err.message);
    } finally {
      setPrabhariLoading(false);
    }
  };


  // --- Modal Logic ---
  const openModal = async (prabhari) => {
    setSelectedPrabhari(prabhari);
    setIsModalLoading(true);
    setModalDetails(null);
    
    const sambhag = allSambhags.find(s => s.id === (prabhari.sambhagId || prabhari.unitId));
    
    if (!sambhag) {
      // Try to find from state if allSambhags is stale (less likely)
      const stateSambhag = sambhagsInState.find(s => s.id === (prabhari.sambhagId || prabhari.unitId));
      if (!stateSambhag) {
         showError("Could not find sambhag details. Data might be syncing.");
         setIsModalLoading(false);
         return;
      }
      
      // Use stateSambhag if found
      const state = allStates.find(s => s.id === stateSambhag.stateId);
      const districtIds = stateSambhag.districts.map(d => d.id);
      
      try {
        const response = await fetch('/api/districts/prabharis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ districtIds }),
        });
        const districtDetails = await response.json();
        if (!response.ok) throw new Error(districtDetails.error || 'Failed to fetch district prabharis');
        setModalDetails({
          sambhagName: stateSambhag.name,
          stateName: state?.name || '',
          districts: districtDetails, 
        });
      } catch(err) {
        showError(err.message);
      } finally {
        setIsModalLoading(false);
      }
      return;
    }

    const state = allStates.find(s => s.id === sambhag.stateId);
    const districtIds = sambhag.districts.map(d => d.id);
    
    try {
      const response = await fetch('/api/districts/prabharis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ districtIds }),
      });
      const districtDetails = await response.json();
      if (!response.ok) throw new Error(districtDetails.error || 'Failed to fetch district prabharis');

      setModalDetails({
        sambhagName: sambhag.name,
        stateName: state?.name || '',
        districts: districtDetails, 
      });

    } catch (err) {
      showError(err.message);
    } finally {
      setIsModalLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 p-6 font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <Building className="text-teal-600" size={40} />
            Sambhag Management
          </h1>
          <p className="text-gray-600">
            Manage organizational sambhags and assign their respective prabharis.
          </p>
        </div>

        {/* Success/Error Messages */}
        {successMsg && (
          <div className="mb-6 p-4 bg-green-100 border-2 border-green-500 text-green-800 rounded-xl font-semibold animate-slideDown shadow-lg">
            {successMsg}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-2 border-red-500 text-red-800 rounded-xl font-semibold animate-slideDown shadow-lg">
            {error}
          </div>
        )}

        {/* Sambhags Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-4 border-teal-300/50">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Map size={28} className="text-teal-600" />
              Sambhags (Zonal Groups)
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {/* State Filter Dropdown */}
              <select
                onChange={(e) => {
                  const stateId = e.target.value;
                  setSelectedStateId(stateId);
                  fetchSambhagsForState(stateId);
                  // Set this as the default for the "Create" form
                  setNewSambhag(prev => ({ ...prev, stateId: stateId, districtIds: [] }));
                  // Ensure form is closed when state changes unless actively editing
                  if(!editingSambhag) setShowSambhagForm(false);
                }}
                value={selectedStateId}
                className="w-full md:w-64 border-2 border-teal-400 focus:border-teal-600 p-3 rounded-xl outline-none transition-all shadow-md bg-white text-gray-700 font-medium"
              >
                <option value="">Select a State to view Sambhags</option>
                {allStates.map(state => (
                  <option key={state.id} value={state.id}>{state.name}</option>
                ))}
              </select>
              
              {/* Create/Cancel Button */}
              <button
                onClick={() => {
                  if (editingSambhag || showSambhagForm) {
                    closeSambhagForm();
                  } else {
                    if (!selectedStateId && allStates.length > 0) {
                      showError("Please select a state before creating a new Sambhag.");
                      return;
                    }
                    setShowSambhagForm(true);
                  }
                }}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  (showSambhagForm || editingSambhag) 
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gradient-to-r from-teal-500 to-green-500 text-white hover:from-teal-600 hover:to-green-600'
                }`}
              >
                {(showSambhagForm || editingSambhag) ? <X size={20} /> : <Plus size={20} />}
                {(showSambhagForm || editingSambhag) ? "Cancel" : "Create Sambhag"}
              </button>
            </div>
          </div>

          {/* Sambhag Form */}
          {(showSambhagForm || editingSambhag) && (
            <div className="bg-gradient-to-r from-teal-50 to-green-50 p-6 rounded-2xl mb-6 border-2 border-teal-400 shadow-inner">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                {editingSambhag ? <Edit size={24} className="text-blue-500"/> : <Plus size={24} className="text-teal-500"/>}
                {editingSambhag ? "Edit Sambhag" : "Create New Sambhag"}
              </h3>
              <form onSubmit={editingSambhag ? handleUpdateSambhag : handleAddSambhag}>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* Sambhag Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sambhag Name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter sambhag name (e.g., North Zone)"
                      value={sambhagFormData.name}
                      onChange={handleSambhagFormChange}
                      required
                      className="w-full border-2 border-teal-200 focus:border-teal-500 p-4 rounded-xl outline-none transition-all shadow-sm hover:shadow-md bg-white"
                    />
                  </div>
                  {/* State (Read-only/Disabled if editing) */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                    <input
                      type="text"
                      value={selectedStateForForm?.name || 'Select a state from the dropdown above'}
                      disabled
                      className="w-full border-2 border-teal-200 p-4 rounded-xl outline-none shadow-sm bg-gray-100 text-gray-600 font-medium"
                    />
                     <input type="hidden" name="stateId" value={sambhagFormData.stateId} />
                  </div>
                </div>
                
                {/* District Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Select Districts * ({sambhagFormData.districtIds.length} Selected)
                  </label>
                  
                  {/* Districts Container */}
                  <div className="max-h-64 overflow-y-auto p-4 bg-white rounded-xl border-2 border-teal-200 shadow-inner">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {getAvailableDistricts().length === 0 ? (
                        <div className="col-span-full text-center py-4 text-gray-500">
                          {sambhagFormData.stateId && loading ? (
                            <div className="flex items-center justify-center gap-2">
                              <Loader2 size={18} className="animate-spin" />
                              <span>Loading available districts...</span>
                            </div>
                          ) : sambhagFormData.stateId ? (
                            "No available districts for this state (they might all be assigned)."
                          ) : (
                            "Please select a state first."
                          )}
                        </div>
                      ) : (
                        getAvailableDistricts().map(district => {
                          const isSelected = sambhagFormData.districtIds.includes(district.id);
                          return (
                            <label
                              key={district.id}
                              className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all border-2 ${
                                isSelected
                                  ? 'bg-teal-100 border-teal-500 ring-2 ring-teal-300'
                                  : 'bg-gray-50 border-gray-200 hover:bg-teal-50'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleDistrictSelection(district.id)}
                                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                              />
                              <span className="text-sm font-medium text-gray-700">{district.name}</span>
                            </label>
                          );
                        })
                      )}
                      {/* Show already selected districts that might not be 'available' if editing */}
                      {editingSambhag && allDistrictsInState
                        .filter(d => editingSambhag.districtIds.includes(d.id) && !getAvailableDistricts().some(ad => ad.id === d.id))
                        .map(district => (
                          <label
                            key={district.id}
                            className="flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all border-2 bg-teal-100 border-teal-500 ring-2 ring-teal-300"
                          >
                            <input
                              type="checkbox"
                              checked={true}
                              onChange={() => toggleDistrictSelection(district.id)}
                              className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                            />
                            <span className="text-sm font-medium text-gray-700">{district.name}</span>
                          </label>
                        ))
                      }
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <button
                    type="submit"
                    disabled={loading || !sambhagFormData.stateId || sambhagFormData.districtIds.length === 0}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold rounded-xl hover:from-teal-600 hover:to-green-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 size={20} className="animate-spin" /> : editingSambhag ? <Edit size={20} /> : <Plus size={20} />}
                    {editingSambhag ? "Update Sambhag" : "Create Sambhag"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Sambhags List */}
          {!selectedStateId && (
            <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <Map size={48} className="mx-auto mb-4 text-teal-400" />
              <p className="font-semibold text-lg">Please select a state above to view its assigned Sambhags.</p>
            </div>
          )}
          {selectedStateId && (loading && sambhagsInState.length === 0) ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-teal-600 mb-4" size={56} />
              <p className="text-gray-600 font-semibold text-lg">Loading Sambhags...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sambhagsInState.map(sambhag => {
                const districtNames = sambhag.districts
                  .map(d => allDistrictsInState.find(ad => ad.id === d.id)?.name || d.name) // Use allDistrictsInState for names
                  .filter(Boolean);
                
                return (
                  <div key={sambhag.id} className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-2xl border-2 border-teal-300 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <MapPin size={20} className="text-teal-600" />
                        {sambhag.name}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingSambhag({
                              ...sambhag,
                              districtIds: sambhag.districts.map(d => d.id) // Ensure we pass IDs for the form
                            });
                            setShowSambhagForm(true);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="text-blue-500 hover:bg-blue-500 hover:text-white p-2 rounded-lg transition-all shadow-md"
                          title="Edit Sambhag"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteSambhag(sambhag.id, sambhag.stateId)}
                          className="text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-lg transition-all shadow-md"
                          title="Delete Sambhag"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <p className="font-semibold text-gray-700 mb-2">Districts ({districtNames.length}):</p>
                      <div className="flex flex-wrap gap-2">
                        {districtNames.slice(0, 4).map(districtName => (
                          <span key={districtName} className="text-xs bg-teal-200 text-teal-900 px-3 py-1 rounded-full font-semibold shadow-inner">
                            {districtName}
                          </span>
                        ))}
                        {districtNames.length > 4 && (
                          <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full font-semibold">
                            +{districtNames.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-4 border-t pt-2">Created: {new Date(sambhag.createdAt).toLocaleDateString()}</p>
                  </div>
                )
              })}
              {selectedStateId && sambhagsInState.length === 0 && !loading && (
                <div className="md:col-span-full text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                  <Building className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="text-gray-500 text-xl font-semibold">No Sambhags Found</p>
                  <p className="text-gray-400 mt-2">Use the Create Sambhag button to get started.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sambhag Prabharis Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border-4 border-teal-300/50">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Users className="text-teal-600" size={28} />
              Sambhag Prabharis
            </h2>
            {/* --- BUTTON ONCLICK FIX --- */}
            <button
              onClick={() => {
                // MODIFIED: This now correctly closes the form
                (showPrabhariForm || editingPrabhari) ? closePrabhariForm() : setShowPrabhariForm(true)
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  (showPrabhariForm || editingPrabhari) 
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gradient-to-r from-teal-500 to-green-500 text-white hover:from-teal-600 hover:to-green-600'
              }`}
            >
              {(showPrabhariForm || editingPrabhari) ? <X size={20} /> : <UserPlus size={20} />}
              {(showPrabhariForm || editingPrabhari) ? "Cancel" : "Add Sambhag Prabhari"}
            </button>
          </div>

          {/* --- MODIFIED: Sambhag Prabhari Form --- */}
          {(showPrabhariForm || editingPrabhari) && (
            <div className="bg-gradient-to-r from-teal-50 to-green-50 p-6 rounded-2xl mb-6 border-2 border-teal-400 shadow-inner">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                {editingPrabhari ? <Edit size={24} className="text-blue-500"/> : <UserPlus size={24} className="text-teal-500"/>}
                {editingPrabhari ? "Edit Sambhag Prabhari" : "Add New Sambhag Prabhari"}
              </h3>
              <form onSubmit={editingPrabhari ? handleUpdatePrabhari : handleAddPrabhari}>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* NEW: State Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select State *</label>
                    <select
                      name="stateId"
                      value={prabhariFormStateId}
                      onChange={(e) => {
                        const newStateId = e.target.value;
                        setPrabhariFormStateId(newStateId);
                        // Reset sambhag selection when state changes
                        const setData = editingPrabhari ? setEditingPrabhari : setNewPrabhari;
                        setData(prev => ({ ...prev, sambhagId: "" }));
                      }}
                      required
                      className="w-full border-2 border-teal-200 focus:border-teal-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white text-gray-700"
                    >
                      <option value="">Select State</option>
                      {allStates.map(state => (
                        <option key={state.id} value={state.id}>{state.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* MODIFIED: Sambhag Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Assign Sambhag *</label>
                    <select
                      name="sambhagId"
                      value={prabhariFormData.sambhagId}
                      onChange={handlePrabhariFormChange}
                      required
                      disabled={!prabhariFormStateId} // Disable if no state is selected
                      className="w-full border-2 border-teal-200 focus:border-teal-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white text-gray-700 disabled:bg-gray-100"
                    >
                      <option value="">Select Sambhag</option>
                      {/* Use the new filtered list */}
                      {sambhagsForPrabhariForm.map(sambhag => (
                        <option key={sambhag.id} value={sambhag.id}>
                          {sambhag.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={prabhariFormData.name}
                      onChange={handlePrabhariFormChange}
                      required
                      className="w-full border-2 border-teal-200 focus:border-teal-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
                    />
                  </div>
                   {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={prabhariFormData.phone}
                      onChange={handlePrabhariFormChange}
                      required
                      className="w-full border-2 border-teal-200 focus:border-teal-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={prabhariFormData.email}
                      onChange={handlePrabhariFormChange}
                      className="w-full border-2 border-teal-200 focus:border-teal-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 justify-end pt-4">
                  <button
                    type="submit"
                    disabled={prabhariLoading || !prabhariFormData.sambhagId}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold rounded-xl hover:from-teal-600 hover:to-green-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {prabhariLoading ? <Loader2 size={20} className="animate-spin" /> : editingPrabhari ? <Edit size={20} /> : <UserPlus size={20} />}
                    {editingPrabhari ? "Update Prabhari" : "Add Prabhari"}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* --- MODIFIED: Prabhari Search & Filter --- */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <select
              value={prabhariListStateFilter}
              onChange={(e) => setPrabhariListStateFilter(e.target.value)}
              className="md:w-64 border-2 border-gray-300 focus:border-teal-500 p-3 rounded-xl outline-none transition-all shadow-md bg-white text-gray-700 font-medium"
            >
              <option value="">Filter by State (All)</option>
              {allStates.map(state => (
                <option key={state.id} value={state.id}>{state.name}</option>
              ))}
            </select>
            <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-3 border-2 border-gray-200 focus-within:border-teal-500 transition-all shadow-inner">
              <Search size={22} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search by Prabhari name or Sambhag name..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="bg-transparent outline-none w-full text-gray-700 font-medium"
              />
            </div>
            
            {/* NEW: State Filter Dropdown */}
      
          </div>

          {/* Sambhag Prabharis Table */}
          {prabhariLoading && sambhagPrabharis.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-teal-600 mb-4" size={56} />
              <p className="text-gray-600 font-semibold text-lg">Loading Sambhag Prabharis...</p>
            </div>
          ) : sambhagPrabharis.length === 0 ? (
             <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <Users className="mx-auto mb-4 text-gray-400" size={64} />
              <p className="text-gray-500 text-xl font-semibold">No Sambhag Prabharis found</p>
              <p className="text-gray-400 mt-2">Get started by adding a prabhari.</p>
            </div>
          ) : filteredPrabharis.length === 0 ? ( // Use the new filteredPrabharis
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <Search className="mx-auto mb-4 text-gray-400" size={64} />
              <p className="text-gray-500 text-xl font-semibold">No Prabharis Found</p>
              <p className="text-gray-400 mt-2">
                Your search or filter combination returned no results.
              </p>
               <button
                  onClick={() => {
                    setSearchInput("");
                    setPrabhariListStateFilter("");
                  }}
                  className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-all shadow-md"
                >
                  Clear Filters
                </button>
            </div>
          ) : (
            <div className="overflow-x-auto border-2 border-gray-300 rounded-2xl shadow-lg">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-100 via-teal-100 to-cyan-100">
                  <tr>
                    <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Name</th>
                    <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide hidden sm:table-cell">Email</th>
                    <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Phone</th>
                    <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide hidden lg:table-cell">Sambhag</th>
                    <th className="p-5 text-center font-bold text-gray-800 text-sm uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Use the new filteredPrabharis */}
                  {filteredPrabharis.map((p, idx) => (
                    <tr 
                      key={p.id} 
                      onClick={() => openModal(p)}
                      className={`border-t-2 border-gray-100 hover:bg-teal-50 transition-all duration-150 cursor-pointer ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <td className="p-5 font-semibold text-gray-800 flex items-center gap-2">
                        <User size={18} className="text-teal-500 hidden sm:inline" />
                        {p.name}
                      </td>
                      <td className="p-5 text-gray-600 hidden sm:table-cell">{p.email || <span className="text-gray-400 italic">N/A</span>}</td>
                      <td className="p-5 text-gray-600">{p.phone}</td>
                      <td className="p-5 hidden lg:table-cell">
                        <span className="inline-flex items-center gap-2 bg-teal-100 text-teal-900 px-4 py-2 rounded-full font-semibold text-sm shadow-inner">
                          <Building size={16} />
                          {p.sambhagName} ({p.stateName})
                        </span>
                      </td>
                      <td className="p-5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {/* MODIFIED: Edit button onClick */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              
                              // Find the sambhag to get its stateId
                              const sambhag = allSambhags.find(s => s.id === (p.unitId || p.sambhagId));
                              const stateId = sambhag ? sambhag.stateId : "";
                              
                              // Set the state for the form
                              setPrabhariFormStateId(stateId); 
                              
                              // Prepare data for editing
                              setEditingPrabhari({
                                ...p, 
                                sambhagId: p.unitId || p.sambhagId // Ensure unitId or sambhagId is used
                              });
                              setShowPrabhariForm(true);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="text-blue-500 hover:text-white hover:bg-blue-500 p-3 rounded-xl transition-all shadow-md transform hover:scale-110"
                            title="Edit sambhag prabhari"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePrabhari(p.id);
                            }}
                            className="text-red-500 hover:text-white hover:bg-red-500 p-3 rounded-xl transition-all shadow-md transform hover:scale-110"
                            title="Delete sambhag prabhari"
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
        </div>
      </div>

      {/* Prabhari Details Modal */}
      {selectedPrabhari && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
          onClick={() => setSelectedPrabhari(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative animate-slideDown max-h-[90vh] overflow-y-auto transform scale-95 md:scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPrabhari(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full p-2 transition-all"
            >
              <X size={24} />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6 border-b pb-4">
              <h2 className="text-3xl font-extrabold text-gray-900">{selectedPrabhari.name}</h2>
              <p className="text-lg text-teal-600 font-semibold flex items-center justify-center mt-1">
                <User size={20} className="mr-2" /> Sambhag Prabhari
              </p>
            </div>

            {/* Modal Content */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-xl border border-teal-200">
                  <Mail size={20} className="text-teal-600 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
                    <p className="text-gray-800 font-medium break-all">{selectedPrabhari.email || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-xl border border-teal-200">
                  <Phone size={20} className="text-teal-600 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">Phone</p>
                    <p className="text-gray-800 font-medium">{selectedPrabhari.phone}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-teal-50 rounded-xl border border-teal-200">
                <Building size={20} className="text-teal-600 shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Assigned Sambhag</p>
                  <p className="text-gray-800 font-bold">{modalDetails?.sambhagName || selectedPrabhari.sambhagName}</p>
                  <p className="text-gray-600 text-sm">
                    State: {modalDetails?.stateName || selectedPrabhari.stateName}
                  </p>
                </div>
              </div>

              {/* Districts & District Prabharis */}
              <div className="p-4 bg-white rounded-xl border-2 border-teal-300 shadow-inner">
                <h3 className="text-base font-bold text-gray-700 uppercase mb-3 border-b pb-2 flex items-center gap-2">
                  <MapPin size={18} className="text-teal-600" />
                  Associated Districts & Prabharis
                </h3>
                {isModalLoading ? (
                  <div className="flex items-center justify-center py-4 text-gray-600">
                    <Loader2 size={24} className="animate-spin mr-2" />
                    <span>Loading district details...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {modalDetails?.districts?.length > 0 ? (
                      modalDetails.districts.map((district) => (
                        <div key={district.id} className="p-4 bg-gray-50 border border-teal-100 rounded-lg">
                          <h4 className="font-bold text-teal-800 flex items-center gap-2 mb-2">
                            <MapPin size={16} />{district.name}
                          </h4>
                          
                          {district.prabharis && district.prabharis.length > 0 ? (
                            district.prabharis.map(prabhari => (
                              <div key={prabhari.id} className="mt-2 text-sm text-gray-700 space-y-1 p-3 border-t border-teal-200 bg-white rounded-md shadow-sm">
                                <p className="flex items-center gap-2 font-bold text-gray-900">
                                  <User size={14} className="text-blue-500" />
                                  {prabhari.name} (District Prabhari)
                                </p>
                                <p className="flex items-center gap-2">
                                  <Mail size={14} className="text-gray-500" />
                                  {prabhari.email || "N/A"}
                                </p>
                                <p className="flex items-center gap-2">
                                  <Phone size={14} className="text-gray-500" />
                                  {prabhari.phone}
                                </p>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500 mt-1 italic">
                              No District Prabhari assigned for this district.
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600 py-3 text-center">This sambhag currently has no assigned districts.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};