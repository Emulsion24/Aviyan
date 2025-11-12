"use client";
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
  Map,
  Search, // Added Search icon
} from "lucide-react";
import { useState, useEffect } from "react";

const STATE_DISTRICTS = {
  "Andhra Pradesh": ["Anantapuramu", "Chittoor", "East Godavari", "Guntur"],
  "Arunachal Pradesh": ["Anjaw", "Capital Complex ( Itanagar )", "Changlang"],
  Assam: ["Bajali", "Baksa", "Barpeta", "Biswanath"],
  Bihar: ["Araria", "Arwal", "Aurangabad", "Banka"],
  Chhattisgarh: ["Balod", "Baloda Bazar", "Balrampur", "Bastar"],
  Goa: ["North Goa", "South Goa"],
  Gujarat: ["Ahmedabad", "Amreli", "Anand", "Aravalli"],
  Haryana: ["Ambala", "Charkhi Dadri", "Fatehabad", "Gurugram"],
  "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamipur", "Kangra"],
  Jharkhand: ["Bokaro", "Chatra", "Deoghar", "Dhanbad"],
  Karnataka: ["Bengaluru Urban", "Bengaluru Rural", "Mysuru", "Hubli-Dharwad"],
  Kerala: ["Alappuzha", "Ernakulam", "Idukki", "Kannur"],
  "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar"],
  Maharashtra: ["Ahmednagar", "Akola", "Amravati", "Aurangabad"],
  Manipur: ["Bishnupur", "Chandel", "Churachandpur", "Imphal East"],
  Meghalaya: ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills"],
  Mizoram: ["Aizawl", "Champhai", "Hnahthial", "Khawzawl"],
  Nagaland: ["Chümoukedima", "Dimapur", "Kiphire", "Kohima"],
  Odisha: ["Angul", "Balangir", "Balasore", "Bargarh"],
  Punjab: ["Amritsar", "Barnala", "Bathinda", "Faridkot"],
  Rajasthan: ["Ajmer", "Alwar", "Banswara", "Baran"],
  Sikkim: ["Gangtok", "Mangan (North Sikkim)", "Namchi (South Sikkim)"],
  "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore"],
  Telangana: ["Adilabad", "Bhadradri Kothagudem", "Hanamkonda", "Hyderabad"],
  Tripura: ["Dhalai", "Gomati", "Khowai", "North Tripura"],
  Uttarakhand: ["Almora", "Bageshwar", "Chamoli", "Champawat"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi"],
  "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar"],
  "Delhi (National Capital Territory)": [
    "Central Delhi",
    "East Delhi",
    "New Delhi",
  ],
  "Jammu and Kashmir": ["Anantnag", "Bandipora", "Baramulla", "Budgam"],
};

// Mock data for District Prabharis for the popup
const mockDistrictPrabharis = {
  Ambala: { name: "Vijay Kumar", phone: "111222333", email: "vijay@b.com" },
  Gurugram: { name: "Reena Singh", phone: "222333444", email: "reena@b.com" },
  Mysuru: { name: "Santosh Patil", phone: "333444555", email: "santosh@b.com" },
  "Bengaluru Urban": { name: "Priya Rao", phone: "444555666", email: "priya@b.com" },
  Agra: { name: "Alok Sharma", phone: "555666777", email: "alok@b.com" },
  Aligarh: { name: "Meera Gupta", phone: "666777888", email: "meera@b.com" },
};

const SambhagManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Sambhags State
  const [sambhags, setSambhags] = useState([]);
  const [showSambhagForm, setShowSambhagForm] = useState(false);
  const [editingSambhag, setEditingSambhag] = useState(null);
  const [newSambhag, setNewSambhag] = useState({
    name: "",
    state: "",
    districts: [],
  });

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
  
  // Search & Filter State
  const [searchInput, setSearchInput] = useState("");
  const [filteredPrabharis, setFilteredPrabharis] = useState([]);

  // Modal State
  const [selectedPrabhari, setSelectedPrabhari] = useState(null);

  useEffect(() => {
    fetchSambhags();
    fetchSambhagPrabharis();
  }, []);

  // Effect to filter prabharis based on search input
  useEffect(() => {
    const lowercasedInput = searchInput.toLowerCase();
    
    if (lowercasedInput === "") {
      setFilteredPrabharis(sambhagPrabharis); // No search, show all
    } else {
      const filtered = sambhagPrabharis.filter(
        (p) =>
          p.name.toLowerCase().includes(lowercasedInput) ||
          p.sambhagName.toLowerCase().includes(lowercasedInput)
      );
      setFilteredPrabharis(filtered);
    }
  }, [searchInput, sambhagPrabharis]);

  const fetchSambhags = async () => {
    setLoading(true);
    try {
      // Simulated API call
      const mockSambhags = [
        {
          id: 1,
          name: "Haryana West",
          state: "Haryana",
          districts: ["Ambala", "Gurugram"],
          createdAt: "2024-03-01",
        },
        {
          id: 2,
          name: "Karnataka South",
          state: "Karnataka",
          districts: ["Mysuru", "Bengaluru Urban"],
          createdAt: "2024-03-05",
        },
        {
          id: 3,
          name: "UP West",
          state: "Uttar Pradesh",
          districts: ["Agra", "Aligarh"],
          createdAt: "2024-03-10",
        }
      ];
      setSambhags(mockSambhags);
    } catch (err) {
      setError("Failed to fetch sambhags");
    } finally {
      setLoading(false);
    }
  };

  const fetchSambhagPrabharis = async () => {
    setLoading(true);
    try {
      // Simulated API call
      const mockPrabharis = [
        {
          id: 101,
          name: "Arun Mehra",
          email: "arun@example.com",
          phone: "9876543210",
          sambhagId: 1,
          sambhagName: "Haryana West",
        },
        {
          id: 102,
          name: "Bina Das",
          email: "",
          phone: "9876543211",
          sambhagId: 2,
          sambhagName: "Karnataka South",
        },
        {
          id: 103,
          name: "Chandan Lal",
          email: "chandan@example.com",
          phone: "9876543212",
          sambhagId: 3,
          sambhagName: "UP West",
        }
      ];
      setSambhagPrabharis(mockPrabharis);
      setFilteredPrabharis(mockPrabharis); // Initialize filtered list
    } catch (err) {
      setError("Failed to fetch sambhag prabharis");
    } finally {
      setLoading(false);
    }
  };

  // --- Sambhag CRUD ---

  const handleSambhagFormChange = (e) => {
    const { name, value } = e.target;
    const currentData = editingSambhag || newSambhag;
    const setData = editingSambhag ? setEditingSambhag : setNewSambhag;

    if (name === "state") {
      // If state changes, reset districts
      setData({ ...currentData, state: value, districts: [] });
    } else {
      setData({ ...currentData, [name]: value });
    }
  };

  const toggleDistrictSelection = (district) => {
    const currentData = editingSambhag || newSambhag;
    const setData = editingSambhag ? setEditingSambhag : setNewSambhag;
    
    const districts = currentData.districts.includes(district)
      ? currentData.districts.filter((d) => d !== district)
      : [...currentData.districts, district];
    
    setData({ ...currentData, districts });
  };
  
  // Get available districts (for the selected state) that aren't in another sambhag
  const getAvailableDistricts = () => {
    const state = (editingSambhag || newSambhag).state;
    if (!state) return [];

    const allDistrictsInState = STATE_DISTRICTS[state] || [];
    
    // Find all districts in this state that are already assigned to OTHER sambhags
    const assignedDistricts = new Set(
      sambhags
        .filter(s => s.state === state && s.id !== (editingSambhag?.id || null))
        .flatMap(s => s.districts)
    );

    return allDistrictsInState.filter(d => !assignedDistricts.has(d));
  };


  const handleAddSambhag = async (e) => {
    e.preventDefault();
    if (newSambhag.districts.length === 0) {
      setError("Please select at least one district");
      return;
    }
    setLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      const newSambhagData = {
        id: Date.now(),
        ...newSambhag,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setSambhags([...sambhags, newSambhagData]);
      setSuccessMsg("Sambhag created successfully! ✓");
      setNewSambhag({ name: "", state: "", districts: [] });
      setShowSambhagForm(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to create sambhag");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSambhag = async (e) => {
    e.preventDefault();
    if (editingSambhag.districts.length === 0) {
      setError("Please select at least one district");
      return;
    }
    setLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      const updatedSambhags = sambhags.map((s) =>
        s.id === editingSambhag.id ? editingSambhag : s
      );
      setSambhags(updatedSambhags);
      setSuccessMsg("Sambhag updated successfully! ✓");
      setEditingSambhag(null);
      setShowSambhagForm(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to update sambhag");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSambhag = async (id) => {
    if (!confirm("Are you sure you want to delete this sambhag?")) return;
    setLoading(true);
    try {
      setSambhags(sambhags.filter((s) => s.id !== id));
      setSuccessMsg("Sambhag deleted successfully");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to delete sambhag");
    } finally {
      setLoading(false);
    }
  };
  
  const closeSambhagForm = () => {
    setEditingSambhag(null);
    setShowSambhagForm(false);
    setError("");
    setNewSambhag({ name: "", state: "", districts: [] });
  };
  
  // --- Sambhag Prabhari CRUD ---
  
  const handleAddPrabhari = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      const sambhag = sambhags.find(s => s.id === parseInt(newPrabhari.sambhagId));
      const newPrabhariData = {
        id: Date.now(),
        ...newPrabhari,
        sambhagId: parseInt(newPrabhari.sambhagId),
        sambhagName: sambhag?.name || "",
      };
      setSambhagPrabharis([...sambhagPrabharis, newPrabhariData]);
      setSuccessMsg("Sambhag Prabhari added successfully! ✓");
      setNewPrabhari({ name: "", email: "", phone: "", sambhagId: "" });
      setShowPrabhariForm(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to add sambhag prabhari");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePrabhari = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      const sambhag = sambhags.find(s => s.id === parseInt(editingPrabhari.sambhagId));
      const updatedPrabharis = sambhagPrabharis.map(p =>
        p.id === editingPrabhari.id
          ? { ...editingPrabhari, sambhagId: parseInt(editingPrabhari.sambhagId), sambhagName: sambhag?.name || "" }
          : p
      );
      setSambhagPrabharis(updatedPrabharis);
      setSuccessMsg("Sambhag Prabhari updated successfully! ✓");
      setEditingPrabhari(null);
      setShowPrabhariForm(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to update sambhag prabhari");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePrabhari = async (id) => {
    if (!confirm("Are you sure you want to delete this sambhag prabhari?")) return;
    setLoading(true);
    try {
      setSambhagPrabharis(sambhagPrabharis.filter(p => p.id !== id));
      setSuccessMsg("Sambhag Prabhari deleted successfully");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to delete sambhag prabhari");
    } finally {
      setLoading(false);
    }
  };

  const closePrabhariForm = () => {
    setEditingPrabhari(null);
    setShowPrabhariForm(false);
    setError("");
  };
  
  const findSambhagForPrabhari = (prabhari) => {
    if (!prabhari) return null;
    return sambhags.find(s => s.id === prabhari.sambhagId);
  };
  
  const formData = editingSambhag || newSambhag;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <Building className="text-teal-600" size={40} />
            Sambhag Management
          </h1>
          <p className="text-gray-600">
            Manage sambhags and prabharis for state districts
          </p>
        </div>

        {/* Success/Error Messages */}
        {successMsg && (
          <div className="mb-6 p-4 bg-green-100 border-2 border-green-500 text-green-800 rounded-xl font-semibold animate-slideDown">
            {successMsg}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-2 border-red-500 text-red-800 rounded-xl font-semibold animate-slideDown">
            {error}
          </div>
        )}

        {/* Sambhags Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-teal-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Building className="text-teal-600" size={28} />
              Sambhags
            </h2>
            <button
              onClick={() => {
                editingSambhag ? closeSambhagForm() : setShowSambhagForm(true)
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-xl font-bold hover:from-teal-600 hover:to-green-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus size={20} />
              {showSambhagForm ? "Cancel" : "Create Sambhag"}
            </button>
          </div>

          {/* Sambhag Form */}
          {(showSambhagForm || editingSambhag) && (
            <div className="bg-gradient-to-r from-teal-50 to-green-50 p-6 rounded-2xl mb-6 border-2 border-teal-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingSambhag ? "Edit Sambhag" : "Create New Sambhag"}
              </h3>
              <form onSubmit={editingSambhag ? handleUpdateSambhag : handleAddSambhag}>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sambhag Name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter sambhag name"
                      value={(editingSambhag || newSambhag).name}
                      onChange={handleSambhagFormChange}
                      required
                      className="w-full border-2 border-teal-200 focus:border-teal-500 p-4 rounded-xl outline-none transition-all shadow-sm hover:shadow-md bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                    <select
                      name="state"
                      value={(editingSambhag || newSambhag).state}
                      onChange={handleSambhagFormChange}
                      required
                      className="w-full border-2 border-teal-200 focus:border-teal-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
                    >
                      <option value="">Select State</option>
                      {Object.keys(STATE_DISTRICTS).map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Select Districts * (Selected: {(editingSambhag || newSambhag).districts.length})
                  </label>
                  
                  {/* Selected Districts Display */}
                  {((editingSambhag || newSambhag).districts.length > 0) && (
                    <div className="mb-4 p-4 bg-teal-50 rounded-xl border-2 border-teal-200">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Selected Districts:</p>
                      <div className="flex flex-wrap gap-2">
                        {(editingSambhag || newSambhag).districts.map(district => (
                          <span
                            key={district}
                            className="inline-flex items-center gap-2 bg-teal-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold"
                          >
                            {district}
                            <button
                              type="button"
                              onClick={() => toggleDistrictSelection(district)}
                              className="hover:bg-teal-600 rounded-full p-0.5 transition-all"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-64 overflow-y-auto p-4 bg-white rounded-xl border-2 border-teal-200">
                    {getAvailableDistricts().length === 0 ? (
                      <div className="col-span-full text-center py-8 text-gray-500">
                        <p className="font-semibold">
                          {!(editingSambhag || newSambhag).state 
                            ? "Please select a state first" 
                            : "No available districts for this state"}
                        </p>
                      </div>
                    ) : (
                      getAvailableDistricts().map(district => {
                        const isSelected = (editingSambhag || newSambhag).districts.includes(district);
                        return (
                          <label
                            key={district}
                            className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all border-2 ${
                              isSelected
                                ? 'bg-teal-100 border-teal-500'
                                : 'bg-gray-50 border-gray-200 hover:bg-teal-50'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleDistrictSelection(district)}
                              className="w-4 h-4 text-teal-600 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">{district}</span>
                          </label>
                        );
                      })
                    )}
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  {editingSambhag && (
                    <button
                      type="button"
                      onClick={closeSambhagForm}
                      className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition-all shadow-md"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold rounded-xl hover:from-teal-600 hover:to-green-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
                  >
                    {loading ? <Loader2 size={20} className="animate-spin" /> : editingSambhag ? <Edit size={20} /> : <Plus size={20} />}
                    {editingSambhag ? "Update Sambhag" : "Create Sambhag"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Sambhags List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sambhags.map(sambhag => (
              <div key={sambhag.id} className="bg-gradient-to-br from-teal-50 to-cyan-50 p-5 rounded-xl border-2 border-teal-200 shadow-md hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{sambhag.name}</h3>
                    <p className="text-sm font-semibold text-teal-700">{sambhag.state}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingSambhag(sambhag);
                        setShowSambhagForm(true);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-blue-500 hover:bg-blue-500 hover:text-white p-2 rounded-lg transition-all"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteSambhag(sambhag.id)}
                      className="text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-sm font-semibold text-gray-600 mb-2">Districts ({sambhag.districts.length}):</p>
                  <div className="flex flex-wrap gap-2">
                    {sambhag.districts.slice(0, 3).map(district => (
                      <span key={district} className="text-xs bg-teal-200 text-teal-800 px-3 py-1 rounded-full font-semibold">
                        {district}
                      </span>
                    ))}
                    {sambhag.districts.length > 3 && (
                      <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full font-semibold">
                        +{sambhag.districts.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500">Created: {sambhag.createdAt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sambhag Prabharis Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-teal-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Users className="text-teal-600" size={28} />
              Sambhag Prabharis
            </h2>
            <button
              onClick={() => {
                editingPrabhari ? closePrabhariForm() : setShowPrabhariForm(true)
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-xl font-bold hover:from-teal-600 hover:to-green-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {showPrabhariForm ? <X size={20} /> : <UserPlus size={20} />}
              {showPrabhariForm ? "Cancel" : "Add Sambhag Prabhari"}
            </button>
          </div>

          {/* Sambhag Prabhari Form */}
          {(showPrabhariForm || editingPrabhari) && (
            <div className="bg-gradient-to-r from-teal-50 to-green-50 p-6 rounded-2xl mb-6 border-2 border-teal-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingPrabhari ? "Edit Sambhag Prabhari" : "Add New Sambhag Prabhari"}
              </h3>
              <form onSubmit={editingPrabhari ? handleUpdatePrabhari : handleAddPrabhari}>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sambhag *</label>
                    <select
                      value={editingPrabhari ? editingPrabhari.sambhagId : newPrabhari.sambhagId}
                      onChange={(e) => editingPrabhari 
                        ? setEditingPrabhari({ ...editingPrabhari, sambhagId: e.target.value })
                        : setNewPrabhari({ ...newPrabhari, sambhagId: e.target.value })}
                      required
                      className="w-full border-2 border-teal-200 focus:border-teal-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
                    >
                      <option value="">Select Sambhag</option>
                      {sambhags.map(sambhag => (
                        <option key={sambhag.id} value={sambhag.id}>{sambhag.name} ({sambhag.state})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={editingPrabhari ? editingPrabhari.name : newPrabhari.name}
                      onChange={(e) => editingPrabhari 
                        ? setEditingPrabhari({ ...editingPrabhari, name: e.target.value })
                        : setNewPrabhari({ ...newPrabhari, name: e.target.value })}
                      required
                      className="w-full border-2 border-teal-200 focus:border-teal-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={editingPrabhari ? editingPrabhari.email : newPrabhari.email}
                      onChange={(e) => editingPrabhari 
                        ? setEditingPrabhari({ ...editingPrabhari, email: e.target.value })
                        : setNewPrabhari({ ...newPrabhari, email: e.target.value })}
                      className="w-full border-2 border-teal-200 focus:border-teal-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={editingPrabhari ? editingPrabhari.phone : newPrabhari.phone}
                      onChange={(e) => editingPrabhari 
                        ? setEditingPrabhari({ ...editingPrabhari, phone: e.target.value })
                        : setNewPrabhari({ ...newPrabhari, phone: e.target.value })}
                      required
                      className="w-full border-2 border-teal-200 focus:border-teal-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
                    />
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  {editingPrabhari && (
                    <button
                      type="button"
                      onClick={closePrabhariForm}
                      className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition-all shadow-md"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold rounded-xl hover:from-teal-600 hover:to-green-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
                  >
                    {loading ? <Loader2 size={20} className="animate-spin" /> : editingPrabhari ? <Edit size={20} /> : <UserPlus size={20} />}
                    {editingPrabhari ? "Update Prabhari" : "Add Prabhari"}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* --- NEW: Search Bar --- */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-3 border-2 border-gray-200 focus-within:border-teal-500 transition-all">
              <Search size={22} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search by Prabhari name or Sambhag name..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="bg-transparent outline-none w-full text-gray-700"
              />
            </div>
          </div>
          {/* --- END: Search Bar --- */}


          {/* Sambhag Prabharis Table */}
          {loading && sambhagPrabharis.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-teal-600 mb-4" size={56} />
              <p className="text-gray-600 font-semibold text-lg">Loading Sambhag Prabharis...</p>
            </div>
          ) : sambhagPrabharis.length === 0 ? (
             <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <Users className="mx-auto mb-4 text-gray-400" size={64} />
              <p className="text-gray-500 text-xl font-semibold">No Sambhag Prabharis found</p>
              <p className="text-gray-400 mt-2">Get started by adding a prabhari.</p>
            </div>
          ) : filteredPrabharis.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <Users className="mx-auto mb-4 text-gray-400" size={64} />
              <p className="text-gray-500 text-xl font-semibold">No Prabharis Found</p>
              <p className="text-gray-400 mt-2">Your search for {searchInput} returned no results.</p>
               <button
                  onClick={() => setSearchInput("")}
                  className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-all"
                >
                  Clear Search
                </button>
            </div>
          ) : (
            <div className="overflow-x-auto border-2 border-gray-200 rounded-2xl shadow-lg">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-100 via-teal-100 to-cyan-100">
                  <tr>
                    <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Name</th>
                    <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Email</th>
                    <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Phone</th>
                    <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Sambhag</th>
                    <th className="p-5 text-center font-bold text-gray-800 text-sm uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* CHANGED: Map over filteredPrabharis */}
                  {filteredPrabharis.map((p, idx) => (
                    <tr 
                      key={p.id} 
                      onClick={() => setSelectedPrabhari(p)}
                      className={`border-t-2 border-gray-100 hover:bg-teal-50 transition-all cursor-pointer ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <td className="p-5 font-semibold text-gray-800">{p.name}</td>
                      <td className="p-5 text-gray-600">{p.email || <span className="text-gray-400">N/A</span>}</td>
                      <td className="p-5 text-gray-600">{p.phone}</td>
                      <td className="p-5">
                        <span className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full font-semibold text-sm">
                          <Building size={16} />
                          {p.sambhagName}
                        </span>
                      </td>
                      <td className="p-5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingPrabhari(p);
                              setShowPrabhariForm(true);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="text-blue-500 hover:text-white hover:bg-blue-500 p-3 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-110"
                            title="Edit sambhag prabhari"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePrabhari(p.id);
                            }}
                            className="text-red-500 hover:text-white hover:bg-red-500 p-3 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-110"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
          onClick={() => setSelectedPrabhari(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 m-4 relative animate-slideDown max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPrabhari(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full p-2 transition-all"
            >
              <X size={24} />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">{selectedPrabhari.name}</h2>
              <p className="text-lg text-teal-600 font-semibold">Sambhag Prabhari</p>
            </div>

            {/* Modal Content */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Mail size={20} className="text-teal-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
                  <p className="text-gray-800 font-medium">{selectedPrabhari.email || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Phone size={20} className="text-teal-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Phone</p>
                  <p className="text-gray-800 font-medium">{selectedPrabhari.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <Building size={20} className="text-teal-500 shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Sambhag</p>
                  <p className="text-gray-800 font-medium">{selectedPrabhari.sambhagName}</p>
                  <p className="text-gray-600 text-sm">
                    {findSambhagForPrabhari(selectedPrabhari)?.state}
                  </p>
                </div>
              </div>

              {/* Districts & District Prabharis */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <MapPin size={20} className="text-teal-500 shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-3">
                    Districts & District Prabharis
                  </p>
                  <div className="space-y-3">
                    {findSambhagForPrabhari(selectedPrabhari)?.districts.length > 0 ? (
                      findSambhagForPrabhari(selectedPrabhari).districts.map((district) => {
                        const districtPrabhari = mockDistrictPrabharis[district];
                        return (
                          <div key={district} className="p-3 bg-white border-2 border-teal-100 rounded-lg">
                            <h4 className="font-bold text-gray-800">{district}</h4>
                            {districtPrabhari ? (
                              <div className="mt-2 text-sm text-gray-600 space-y-1">
                                <p className="flex items-center gap-2">
                                  <User size={14} className="text-gray-500" />
                                  <strong>{districtPrabhari.name}</strong>
                                </p>
                                <p className="flex items-center gap-2">
                                  <Mail size={14} className="text-gray-500" />
                                  {districtPrabhari.email || "N/A"}
                                </p>
                                <p className="flex items-center gap-2">
                                  <Phone size={14} className="text-gray-500" />
                                  {districtPrabhari.phone}
                                </p>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500 mt-1">
                                No District Prabhari assigned.
                              </p>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-gray-600">No districts assigned to this sambhag.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SambhagManagement;