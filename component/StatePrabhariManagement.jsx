"use client";
import {
  Search,
  Loader2,
  Trash2,
  UserPlus,
  RefreshCw,
  Eye,
  X,
  MapPin,
  Users,
  Edit,
  Award,
  Plus,
  User,
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
  Manipur: ["Bishupur", "Chandel", "Churachandpur", "Imphal East"],
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

// Initial mock data for State Prabharis
const MOCK_STATE_PRABHARIS = [
  {
    id: 1,
    state: "Punjab",
    name: "Gurpreet Singh",
    email: "gurpreet@example.com",
    phone: "1111111111",
  },
  {
    id: 2,
    state: "Haryana",
    name: "Deepak Kumar",
    email: "deepak@example.com",
    phone: "2222222222",
  },
  {
    id: 3,
    state: "Karnataka",
    name: "Anand Reddy",
    email: "", // Optional email
    phone: "4444444444",
  },
];

const StatePrabhariManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // State Prabharis
  const [statePrabharis, setStatePrabharis] = useState([]);
  const [filteredPrabharis, setFilteredPrabharis] = useState([]);
  const [showPrabhariForm, setShowPrabhariForm] = useState(false);
  const [editingPrabhari, setEditingPrabhari] = useState(null);
  const [newPrabhari, setNewPrabhari] = useState({
    state: "",
    name: "",
    email: "",
    phone: "",
  });

  // Search
  const [searchState, setSearchState] = useState(""); // Used for the state-wise filter

  useEffect(() => {
    fetchStatePrabharis();
  }, []);

  // Effect to filter prabharis whenever the main list or searchState changes
  useEffect(() => {
    if (searchState === "") {
      setFilteredPrabharis(statePrabharis);
    } else {
      setFilteredPrabharis(
        statePrabharis.filter((p) => p.state === searchState)
      );
    }
  }, [searchState, statePrabharis]);

  const fetchStatePrabharis = () => {
    setLoading(true);
    try {
      // Simulate API call
      setStatePrabharis(MOCK_STATE_PRABHARIS);
    } catch (err) {
      setError("Failed to fetch state prabharis");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPrabhari = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      // Simulate API call
      const newPrabhariData = {
        id: Date.now(), // Use timestamp for a unique mock ID
        ...newPrabhari,
      };

      setStatePrabharis([...statePrabharis, newPrabhariData]);
      setSuccessMsg("State Prabhari added successfully! ✓");
      setNewPrabhari({ state: "", name: "", email: "", phone: "" });
      setShowPrabhariForm(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to add state prabhari");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePrabhari = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      // Simulate API call
      const updatedPrabharis = statePrabharis.map((p) =>
        p.id === editingPrabhari.id ? editingPrabhari : p
      );
      setStatePrabharis(updatedPrabharis);
      setSuccessMsg("State Prabhari updated successfully! ✓");
      setEditingPrabhari(null);
      setShowPrabhariForm(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to update state prabhari");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePrabhari = (id) => {
    if (!confirm("Are you sure you want to delete this state prabhari?")) return;

    setLoading(true);
    try {
      // Simulate API call
      setStatePrabharis(statePrabharis.filter((p) => p.id !== id));
      setSuccessMsg("State Prabhari deleted successfully");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to delete state prabhari");
    } finally {
      setLoading(false);
    }
  };

  // Gets states that do NOT already have a prabhari assigned
  const getAvailableStates = () => {
    const allStates = Object.keys(STATE_DISTRICTS);
    const assignedStates = new Set(statePrabharis.map((p) => p.state));
    
    // If editing, allow the prabhari's current state to be in the list
    if (editingPrabhari) {
      assignedStates.delete(editingPrabhari.state);
    }
    
    return allStates.filter((state) => !assignedStates.has(state));
  };

  const openEditForm = (prabhari) => {
    setEditingPrabhari(prabhari);
    setShowPrabhariForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAddForm = () => {
    setEditingPrabhari(null);
    setNewPrabhari({ state: "", name: "", email: "", phone: "" });
    setShowPrabhariForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const closeForm = () => {
    setEditingPrabhari(null);
    setShowPrabhariForm(false);
    setError(""); // Clear errors when closing form
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (editingPrabhari) {
      setEditingPrabhari({ ...editingPrabhari, [name]: value });
    } else {
      setNewPrabhari({ ...newPrabhari, [name]: value });
    }
  };
  
  const formData = editingPrabhari || newPrabhari;
  const availableStatesForDropdown = getAvailableStates();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <Users className="text-blue-600" size={40} />
            State Prabhari Management
          </h1>
          <p className="text-gray-600">
            Manage prabharis responsible for each state
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

        {/* State Prabharis Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <User className="text-blue-600" size={28} />
              Prabhari List
            </h2>
            <button
              onClick={showPrabhariForm ? closeForm : openAddForm}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold
                transition-all shadow-lg hover:shadow-xl transform hover:scale-105
                ${showPrabhariForm 
                  ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'
                }`}
            >
              {showPrabhariForm ? <X size={20} /> : <UserPlus size={20} />}
              {showPrabhariForm ? "Cancel" : "Add State Prabhari"}
            </button>
          </div>

          {/* Add/Edit Prabhari Form */}
          {showPrabhariForm && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl mb-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingPrabhari
                  ? "Edit State Prabhari"
                  : "Add New State Prabhari"}
              </h3>
              <form
                onSubmit={
                  editingPrabhari
                    ? handleUpdatePrabhari
                    : handleAddPrabhari
                }
              >
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State *
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleFormChange}
                      required
                      className="w-full border-2 border-blue-200 focus:border-blue-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
                    >
                      <option value="">Select State</option>
                      {/* If editing, show their current state first */}
                      {editingPrabhari && (
                        <option value={editingPrabhari.state}>
                          {editingPrabhari.state}
                        </option>
                      )}
                      {/* Show all other available states */}
                      {availableStatesForDropdown.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full border-2 border-blue-200 focus:border-blue-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full border-2 border-blue-200 focus:border-blue-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                      className="w-full border-2 border-blue-200 focus:border-blue-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
                    />
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : editingPrabhari ? (
                      <Edit size={20} />
                    ) : (
                      <UserPlus size={20} />
                    )}
                    {editingPrabhari ? "Update Prabhari" : "Add Prabhari"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Search Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-3 border-2 border-gray-200 focus-within:border-blue-500 transition-all">
              <Search size={22} className="text-gray-400" />
              <select
                value={searchState}
                onChange={(e) => setSearchState(e.target.value)}
                className="bg-transparent outline-none w-full text-gray-700"
              >
                <option value="">Search by State (All States)</option>
                {Object.keys(STATE_DISTRICTS).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* State Prabharis Table */}
          {loading && statePrabharis.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-blue-600 mb-4" size={56} />
              <p className="text-gray-600 font-semibold text-lg">
                Loading State Prabharis...
              </p>
            </div>
          ) : filteredPrabharis.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <Users className="mx-auto mb-4 text-gray-400" size={64} />
              <p className="text-gray-500 text-xl font-semibold">
                No State Prabharis found
              </p>
              {searchState && (
                <button
                  onClick={() => setSearchState("")}
                  className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto border-2 border-gray-200 rounded-2xl shadow-lg">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100">
                  <tr>
                    <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">
                      State
                    </th>
                    <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">
                      Name
                    </th>
                    <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">
                      Email
                    </th>
                    <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">
                      Phone
                    </th>
                    <th className="p-5 text-center font-bold text-gray-800 text-sm uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrabharis.map((p, idx) => (
                    <tr
                      key={p.id}
                      className={`border-t-2 border-gray-100 hover:bg-blue-50 transition-all ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="p-5">
                        <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold text-sm">
                          <MapPin size={16} />
                          {p.state}
                        </span>
                      </td>
                      <td className="p-5 font-semibold text-gray-800">
                        {p.name}
                      </td>
                      <td className="p-5 text-gray-600">
                        {p.email || <span className="text-gray-400">N/A</span>}
                      </td>
                      <td className="p-5 text-gray-600">{p.phone}</td>
                      <td className="p-5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEditForm(p)}
                            className="text-blue-500 hover:text-white hover:bg-blue-500 p-3 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-110"
                            title="Edit state prabhari"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={() => handleDeletePrabhari(p.id)}
                            className="text-red-500 hover:text-white hover:bg-red-500 p-3 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-110"
                            title="Delete state prabhari"
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
    </div>
  );
};

export default StatePrabhariManagement;