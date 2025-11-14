import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Edit,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Loader2,
  X,
  MapPin,
  Building,
  User,
  Phone,
  Users, // Added for the toggle button
} from "lucide-react";

// A simple debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

// Helper function for confirmation dialog placeholder
const showConfirmation = (message) => {
  console.warn("Using placeholder for confirmation. Implement a custom modal UI.");
  return window.confirm(message); 
};

// Custom Toast
const Toast = ({ message, type, onClose }) => {
  if (!message) return null;
  const bgColor = type === "error" ? "bg-red-600" : "bg-green-600";
  return (
    <div className={`fixed top-5 right-5 p-4 rounded-xl text-white ${bgColor} shadow-2xl z-50 transition-transform duration-300 transform animate-slideIn`}>
      <span className="font-semibold">{message}</span>
      <button onClick={onClose} className="ml-4 font-bold p-1 hover:bg-white/20 rounded-full">
        <X size={16} />
      </button>
    </div>
  );
};

export default function TehsilPrabhariManagement() {
  const [prabharis, setPrabharis] = useState([]); // List of Tehsil Prabharis (People)
  const [tehsilsList, setTehsilsList] = useState([]); // List of Tehsil Records (Units)
  const [currentView, setCurrentView] = useState('PRABHARI'); // PRABHARI or TEHSIL
  
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(""); // Filter state
  const [districts, setDistricts] = useState([]); // Filter districts
  const [selectedDistrict, setSelectedDistrict] = useState(""); // Filter district

  const [isLoading, setIsLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  
  const [toast, setToast] = useState({ message: "", type: "" });

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal/Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState(null); // Either Prabhari or Tehsil object
  const [formMode, setFormMode] = useState('PRABHARI'); // PRABHARI or TEHSIL
  
  const [formData, setFormData] = useState({
    stateId: "",
    districtId: "",
    tehsilName: "",
    prabhariName: "", // Renamed from 'name'
    prabhariPhone: "", // Renamed from 'phone'
    prabhariEmail: "", // Renamed from 'email'
    prabhariId: null,
    tehsilId: null, // Used for tehsil editing
  });
  const [formDistricts, setFormDistricts] = useState([]);

  // --- Utility Functions ---

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: "", type: "" });
    }, 5000);
  };

  const resetForm = () => {
    setFormData({
      stateId: "",
      districtId: "",
      tehsilName: "",
      prabhariName: "",
      prabhariPhone: "",
      prabhariEmail: "",
      prabhariId: null,
      tehsilId: null,
    });
    setEditingEntity(null);
    setIsModalOpen(false);
  };

  // --- API Functions ---

  const fetchStates = useCallback(async () => {
    try {
      const response = await fetch("/api/states");
      if (!response.ok) throw new Error("Failed to fetch states");
      const data = await response.json();
      setStates(data);
    } catch (error) {
      showToast(error.message, "error");
    }
  }, []);

  const fetchDistrictsForState = useCallback(async (stateId, setDataCallback) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/districts?stateId=${stateId}`);
      if (!response.ok) throw new Error("Failed to fetch districts");
      const data = await response.json();
      setDataCallback(data);
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPrabharis = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        level: "TEHSIL",
        page: currentPage,
        limit: 10,
      });
      if (debouncedSearch) params.append("search", debouncedSearch);
      if (selectedDistrict) params.append("districtId", selectedDistrict);
      else if (selectedState) params.append("stateId", selectedState);

      const response = await fetch(`/api/prabharis?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch prabharis");
      const data = await response.json();

      setPrabharis(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  }, [selectedState, selectedDistrict, debouncedSearch, currentPage]);
  
  // NEW: Fetch Tehsils list (Geographical Units)
  const fetchTehsilList = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
      });
      if (debouncedSearch) params.append("search", debouncedSearch);
      if (selectedDistrict) params.append("districtId", selectedDistrict);
      else if (selectedState) params.append("stateId", selectedState);

      // Assumes API /api/tehsils exists and supports these filters
      const response = await fetch(`/api/tehsils?${params.toString()}`); 
      if (!response.ok) throw new Error("Failed to fetch tehsils");
      const data = await response.json();

      setTehsilsList(data.data || data); 
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  }, [selectedState, selectedDistrict, debouncedSearch, currentPage]);

  // Function to save/update Tehsil record itself
  const saveTehsilRecord = async (tehsilName, districtId, tehsilId = null) => {
    if (!tehsilName || !districtId) {
      throw new Error("District and Tehsil name are required.");
    }

    const method = tehsilId ? "PUT" : "POST";
    const url = tehsilId ? `/api/tehsils/${tehsilId}` : "/api/tehsils";

    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: tehsilName,
        districtId: districtId,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || `Failed to ${method === 'POST' ? 'create' : 'update'} tehsil`);
    return data.id; // Return the Tehsil ID
  };

  // --- Lifecycle Effects ---

  // Initial data fetch
  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  // Fetch data based on current view
  useEffect(() => {
    // Reset pagination when view changes
    setCurrentPage(1); 
    if (currentView === 'PRABHARI') {
      fetchPrabharis();
    } else {
      fetchTehsilList();
    }
  }, [currentView, selectedState, selectedDistrict, debouncedSearch, fetchPrabharis, fetchTehsilList]);

  // Re-fetch only when page changes
  useEffect(() => {
    if (currentView === 'PRABHARI') {
      fetchPrabharis();
    } else {
      fetchTehsilList();
    }
  }, [currentPage]);
  

  // Fetch districts for the main filter (top dropdowns)
  useEffect(() => {
    if (selectedState) {
      fetchDistrictsForState(selectedState, setDistricts);
    } else {
      setDistricts([]);
      setSelectedDistrict("");
    }
  }, [selectedState, fetchDistrictsForState]);

  // Fetch districts for the modal form
  useEffect(() => {
    if (formData.stateId) {
      fetchDistrictsForState(formData.stateId, setFormDistricts);
    } else {
      setFormDistricts([]);
      setFormData((prev) => ({ ...prev, districtId: "" }));
    }
  }, [formData.stateId, fetchDistrictsForState]);

  // --- Form/CRUD Handlers ---

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "stateId") {
      setFormData((prev) => ({ ...prev, [name]: value, districtId: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleOpenAdd = (mode) => {
    setFormMode(mode);
    setEditingEntity(null);
    setFormData({
      stateId: selectedState || "",
      districtId: selectedDistrict || "",
      tehsilName: "",
      prabhariName: "",
      prabhariPhone: "",
      prabhariEmail: "",
      prabhariId: null,
      tehsilId: null,
    });
    setIsModalOpen(true);
  };

  // 1. EDIT HANDLERS (TEHSIL/PRABHARI)
  const handleOpenEditPrabhari = (prabhari) => {
    setEditingEntity(prabhari);
    setFormMode('PRABHARI');
    
    setFormData({
      stateId: prabhari.stateId || "", 
      districtId: prabhari.districtId || "", 
      tehsilName: prabhari.tehsilName,
      prabhariName: prabhari.name,
      prabhariPhone: prabhari.phone,
      prabhariEmail: prabhari.email || "",
      prabhariId: prabhari.id,
      tehsilId: prabhari.tehsilId,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditTehsil = (tehsil) => {
    setEditingEntity(tehsil);
    setFormMode('TEHSIL');

    const prabhari = tehsil.prabharis?.[0]; 
    const district = districts.find(d => d.id === tehsil.districtId) || formDistricts.find(d => d.id === tehsil.districtId);
    // Find stateId. We assume the 'tehsil' object from API includes stateId or stateName
    const stateId = tehsil.stateId || district?.stateId || states.find(s => s.name === tehsil.stateName)?.id || '';

    setFormData({
      stateId: stateId,
      districtId: tehsil.districtId,
      tehsilName: tehsil.name,
      prabhariName: prabhari?.name || "",
      prabhariPhone: prabhari?.phone || "",
      prabhariEmail: prabhari?.email || "",
      prabhariId: prabhari?.id || null,
      tehsilId: tehsil.id,
    });
    setIsModalOpen(true);
  };
  
  // 2. SUBMIT HANDLER (Handles both modes)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormLoading(true);

    try {
      const { tehsilName, districtId, prabhariName, prabhariPhone, prabhariEmail, prabhariId, tehsilId } = formData;
      
      // 1. Save/Update Tehsil Record
      // We use the tehsilId from the *editingEntity* if we are editing a Tehsil
      const currentTehsilId = formMode === 'TEHSIL' ? editingEntity?.id : null;
      const savedTehsilId = await saveTehsilRecord(tehsilName, districtId, currentTehsilId);
      
      let prabhariMessage = "";

      // 2. Manage Prabhari Association (Only if formMode is 'PRABHARI' or if prabhari details were entered in 'TEHSIL' mode)
      if (formMode === 'PRABHARI' || (formMode === 'TEHSIL' && (prabhariName || prabhariPhone))) {
        
        const prabhariData = { 
            name: prabhariName, 
            phone: prabhariPhone, 
            email: prabhariEmail, 
            level: "TEHSIL", 
            unitId: savedTehsilId, 
            tehsilId: savedTehsilId 
        };
        const hasPrabhariData = prabhariName && prabhariPhone;
        
        // Use prabhariId from form (if editing) or from editingEntity (if editing a Prabhari)
        const existingPrabhariId = prabhariId || (formMode === 'PRABHARI' ? editingEntity?.id : null);
        
        if (hasPrabhariData) {
            const method = existingPrabhariId ? "PUT" : "POST";
            const url = existingPrabhariId ? `/api/prabharis/${existingPrabhariId}` : "/api/prabharis";

            const prabhariResponse = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(prabhariData),
            });
            if (!prabhariResponse.ok) throw new Error(`Failed to ${method === 'POST' ? 'create' : 'update'} prabhari.`);
            prabhariMessage = ` and Prabhari ${method === 'POST' ? 'added' : 'updated'}`;
        } else if (existingPrabhariId) {
             // Delete Prabhari if data was cleared
            await handleDeletePrabhariOnly(existingPrabhariId);
            prabhariMessage = ` and old Prabhari removed`;
        }
      }

      showToast(`Tehsil ${currentTehsilId ? "updated" : "created"}${prabhariMessage} successfully!`, "success");
      resetForm();
      // Refresh the currently active table
      if (currentView === 'PRABHARI') {
        fetchPrabharis();
      } else {
        fetchTehsilList();
      }
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsFormLoading(false);
    }
  };

  // 3. DELETE HANDLERS (PRABHARI/TEHSIL)
  const handleDeletePrabhari = async (id) => {
    if (!showConfirmation("Are you sure you want to delete this prabhari?")) return;

    try {
      const response = await fetch(`/api/prabharis/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      showToast("Prabhari deleted successfully", "success");
      fetchPrabharis();
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleDeleteTehsil = async (tehsilId) => {
    if (!showConfirmation("Are you sure you want to delete this Tehsil? This will unassign/delete its associated Prabhari.")) return;

    try {
      const response = await fetch(`/api/tehsils/${tehsilId}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      showToast("Tehsil deleted successfully", "success");
      fetchTehsilList(); // Refresh Tehsil list
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  // Utility function to delete just the Prabhari record (used internally by form submission)
  const handleDeletePrabhariOnly = async (prabhariId) => {
    if (!prabhariId) return;
    const response = await fetch(`/api/prabharis/${prabhariId}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete Prabhari during cleanup.");
  }
  
  // --- Rendering Components ---

  const getDistrictNameById = useCallback((districtId) => {
    const district = districts.find(d => d.id === districtId);
    return district ? district.name : (formDistricts.find(d => d.id === districtId)?.name || "Unknown");
  }, [districts, formDistricts]);
  
  const getFullStateName = useCallback((stateId, districtName) => {
      let state = states.find(s => s.id === stateId);
      if (state) return state.name;
      // Fallback: try to find state via district list
      let dist = districts.find(d => d.name === districtName);
      if(dist) return states.find(s => s.id === dist.stateId)?.name;
      return "N/A";
  }, [states, districts]);


  const renderPrabhariTable = () => (
    <div className="overflow-x-auto border-2 border-gray-300 rounded-xl shadow-lg bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-teal-50">
          <tr>
            <th className="p-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Name</th>
            <th className="p-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Phone</th>
            <th className="p-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Email</th>
            <th className="p-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Tehsil</th>
            <th className="p-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">District</th>
            <th className="p-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {prabharis.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-5 text-gray-500">
                No Tehsil Prabharis found matching criteria.
              </td>
            </tr>
          ) : (
            prabharis.map((prabhari) => (
              <tr key={prabhari.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-900">{prabhari.name}</td>
                <td className="p-4 whitespace-nowrap text-sm text-gray-700">{prabhari.phone}</td>
                <td className="p-4 whitespace-nowrap text-sm text-gray-700">{prabhari.email || "N/A"}</td>
                <td className="p-4 whitespace-nowrap text-sm text-teal-600 font-semibold flex items-center gap-2">
                  <Building size={16} />{prabhari.tehsilName}
                </td>
                <td className="p-4 whitespace-nowrap text-sm text-gray-600">{prabhari.districtName || getDistrictNameById(prabhari.districtId)}</td>
                <td className="p-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleOpenEditPrabhari(prabhari)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                    aria-label="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeletePrabhari(prabhari.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-full ml-2 transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  const renderTehsilListTable = () => (
    <div className="overflow-x-auto border-2 border-gray-300 rounded-xl shadow-lg bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-teal-50">
          <tr>
            <th className="p-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Tehsil Name</th>
            <th className="p-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">District</th>
            <th className="p-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">State</th>
            <th className="p-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Assigned Prabhari</th>
            <th className="p-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Prabhari Phone</th>
            <th className="p-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tehsilsList.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-5 text-gray-500">
                No Tehsils found matching criteria.
              </td>
            </tr>
          ) : (
            tehsilsList.map((tehsil) => {
              const prabhari = tehsil.prabharis?.[0]; // Assumes prabharis are nested
              const districtName = getDistrictNameById(tehsil.districtId);
              const stateName = getFullStateName(tehsil.stateId, districtName);

              return (
                <tr key={tehsil.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 whitespace-nowrap text-sm font-bold text-teal-700 flex items-center gap-2">
                    <Building size={16} />{tehsil.name}
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-600">{districtName}</td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-600">{stateName}</td>
                  <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-1">
                      <User size={14} className="text-gray-500"/> {prabhari?.name || "Unassigned"}
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-700">
                      {prabhari?.phone || "N/A"}
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleOpenEditTehsil(tehsil)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                      aria-label="Edit Tehsil"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteTehsil(tehsil.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full ml-2 transition-colors"
                      aria-label="Delete Tehsil"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10 font-sans">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "" })} />
      
      <div className="max-w-7xl mx-auto">
        
        {/* RESPONSIVE CHANGE 1: Header now stacks on medium screens and below */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
            <MapPin size={32} className="text-teal-600" />
            Tehsil Management
          </h1>
          {/* RESPONSIVE CHANGE 1.A: Button container stacks on small screens */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Toggle Button */}
            <button
                onClick={() => {
                  setCurrentView(currentView === 'PRABHARI' ? 'TEHSIL' : 'PRABHARI');
                  setSearchQuery(''); // Reset search on view toggle
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
            >
                {currentView === 'PRABHARI' ? (
                    <><Building size={20} />Show Tehsils List</>
                ) : (
                    <><Users size={20} />Show Prabhari List</>
                )}
            </button>
            {/* Add Button */}
            <button
                onClick={() => handleOpenAdd(currentView)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg shadow-md hover:from-teal-600 hover:to-cyan-600 transition"
            >
                <Plus size={20} />
                {currentView === 'PRABHARI' ? 'Add Prabhari' : 'Add New Tehsil'}
            </button>
          </div>
        </div>

        {/* Filters and Search (Already responsive) */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-200">
          <h2 className="text-lg font-bold mb-3 text-gray-700">Filter and Search</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict(""); // Reset district filter
                setCurrentPage(1); 
              }}
              className="p-3 border-2 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
            >
              <option value="">Filter by State (All)</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setCurrentPage(1); 
              }}
              disabled={!selectedState || isLoading}
              className="p-3 border-2 border-gray-300 rounded-lg disabled:bg-gray-100 focus:ring-teal-500 focus:border-teal-500 transition"
            >
              <option value="">Filter by District (All)</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            <div className="relative md:col-span-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={20} />
              </span>
              <input
                type="text"
                placeholder={`Search by ${currentView === 'PRABHARI' ? 'name, phone, or tehsil...' : 'Tehsil name...'}`}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-3 pl-10 border-2 border-gray-300 rounded-lg focus:border-teal-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Table Render (Already responsive via overflow) */}
        {isLoading && (currentView === 'PRABHARI' ? prabharis : tehsilsList).length === 0 ? (
          <div className="flex justify-center p-10 bg-white rounded-xl shadow-lg">
            <Loader2 className="animate-spin text-teal-600" size={48} />
          </div>
        ) : (
            currentView === 'PRABHARI' ? renderPrabhariTable() : renderTehsilListTable()
        )}

        {/* RESPONSIVE CHANGE 2: Pagination now stacks on small screens */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-5 p-4 bg-white rounded-xl shadow-lg border border-gray-200 gap-4 sm:gap-0">
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition-colors"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition-colors"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal (Already responsive) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 border-t-4 border-teal-500">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-bold text-gray-800">
                  {editingEntity ? "Edit" : "Add"} {formMode === 'TEHSIL' ? "Tehsil" : "Tehsil Prabhari"}
                </h3>
                <button type="button" onClick={resetForm} className="p-1 text-gray-400 hover:text-gray-700 rounded-full">
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                {/* Tehsil/Location Fields */}
                <h4 className="text-base font-bold text-teal-600 mb-2 border-b pb-1">Tehsil Location Details</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">State *</label>
                    <select
                      name="stateId"
                      value={formData.stateId}
                      onChange={handleFormChange}
                      required
                      disabled={isFormLoading}
                      className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-teal-500 transition disabled:bg-gray-100"
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">District *</label>
                    <select
                      name="districtId"
                      value={formData.districtId}
                      onChange={handleFormChange}
                      required
                      disabled={!formData.stateId || isLoading || isFormLoading}
                      className="w-full p-2 border-2 border-gray-300 rounded-lg disabled:bg-gray-100 focus:border-teal-500 transition"
                    >
                      <option value="">Select District</option>
                      {formDistricts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Tehsil Name *</label>
                  <input
                    name="tehsilName"
                    placeholder="Enter tehsil name"
                    value={formData.tehsilName}
                    onChange={handleFormChange}
                    required
                    disabled={isFormLoading}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 transition disabled:bg-gray-100"
                  />
                </div>
                
                <hr className="my-5 border-dashed"/>
                
                {/* Prabhari Fields (Always visible, but only required if in Prabhari mode) */}
                <h4 className="text-base font-bold text-teal-600 mb-2 border-b pb-1">Assigned Prabhari Details</h4>

                <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Prabhari Name {formMode === 'PRABHARI' && '*'}</label>
                <input
                    name="prabhariName"
                    placeholder="Full Name (optional for Tehsil)"
                    value={formData.prabhariName}
                    onChange={handleFormChange}
                    disabled={isFormLoading}
                    required={formMode === 'PRABHARI'} // Only required when adding a Prabhari
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 transition disabled:bg-gray-100"
                />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Phone Number {formMode === 'PRABHARI' && '*'}</label>
                    <input
                    name="prabhariPhone"
                    placeholder="Phone Number (optional for Tehsil)"
                    value={formData.prabhariPhone}
                    onChange={handleFormChange}
                    disabled={isFormLoading}
                    required={formMode === 'PRABHARI'} // Only required when adding a Prabhari
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 transition disabled:bg-gray-100"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Email (Optional)</label>
                    <input
                    name="prabhariEmail"
                    type="email"
                    placeholder="Email Address"
                    value={formData.prabhariEmail}
                    onChange={handleFormChange}
                    disabled={isFormLoading}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 transition disabled:bg-gray-100"
                    />
                </div>
                </div>
              </div>
              <div className="flex justify-end p-4 border-t gap-3 bg-gray-50 rounded-b-xl">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isFormLoading || !formData.districtId || !formData.tehsilName || (formMode === 'PRABHARI' && (!formData.prabhariName || !formData.prabhariPhone))}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 transition flex items-center gap-2"
                >
                  {isFormLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} /> Saving...
                    </>
                  ) : (
                    editingEntity ? "Update" : "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}