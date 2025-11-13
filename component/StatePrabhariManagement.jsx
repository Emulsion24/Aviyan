"use client";
import {
  Search,
  Loader2,
  Trash2,
  UserPlus,
  X,
  MapPin,
  Users,
  Edit,
  Mail,
  Phone,
  Building,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";

// Helper function to show alerts
const showConfirmation = (message) => {
  return window.confirm(message);
};

export default function StatePrabhariManagement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // State Prabharis
  const [statePrabharis, setStatePrabharis] = useState([]);
  const [filteredPrabharis, setFilteredPrabharis] = useState([]);
  const [showPrabhariForm, setShowPrabhariForm] = useState(false);
  const [editingPrabhari, setEditingPrabhari] = useState(null);
  const [newPrabhari, setNewPrabhari] = useState({
    stateId: "", // Matches API field
    name: "",
    email: "",
    phone: "",
  });

  // State for dropdowns
  const [allStates, setAllStates] = useState([]);

  // Search
  const [searchState, setSearchState] = useState(""); // Used for the state-wise filter

  // Modal State
  const [selectedPrabhari, setSelectedPrabhari] = useState(null);
  const [modalDetails, setModalDetails] = useState([]);
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    fetchStatePrabharis();
    fetchAllStates();
  }, []);

  // Effect to filter prabharis (client-side for now, can be moved to API later)
  useEffect(() => {
    if (searchState === "") {
      setFilteredPrabharis(statePrabharis);
    } else {
      // Filter by stateName which is returned by the API
      setFilteredPrabharis(
        statePrabharis.filter((p) => p.stateName === searchState)
      );
    }
  }, [searchState, statePrabharis]);

  // --- Helper Functions ---
  const clearMessages = () => {
    setError("");
    setSuccessMsg("");
  };

  const showSuccess = (message) => {
    clearMessages();
    setSuccessMsg(message);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const showError = (message) => {
    clearMessages();
    setError(message);
  };

  // --- API Functions ---

  const fetchStatePrabharis = async () => {
    setLoading(true);
    clearMessages();
    try {
      // Fetching from the new paginated API
      const response = await fetch('/api/prabharis?level=STATE&page=1&limit=500'); 
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch state prabharis');
      }
      const data = await response.json();
      // ** FIX: Read from data.data **
      setStatePrabharis(data.data);
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllStates = async () => {
    try {
      const response = await fetch('/api/states');
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch states');
      }
      const data = await response.json();
      setAllStates(data);
    } catch (err) {
      showError(err.message);
    }
  };

  const handleAddPrabhari = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearMessages();

    try {
      const response = await fetch('/api/prabharis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newPrabhari.name,
          email: newPrabhari.email,
          phone: newPrabhari.phone,
          level: 'STATE',
          unitId: newPrabhari.stateId,
        }),
      });

      const newPrabhariData = await response.json();
      if (!response.ok) {
        throw new Error(newPrabhariData.error || 'Failed to add state prabhari');
      }

      // Add the returned data (which includes stateName) to the list
      setStatePrabharis([...statePrabharis, newPrabhariData]);
      showSuccess("State Prabhari added successfully! ✓");
      setNewPrabhari({ stateId: "", name: "", email: "", phone: "" });
      setShowPrabhariForm(false);
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePrabhari = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearMessages();

    try {
      const response = await fetch(`/api/prabharis/${editingPrabhari.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingPrabhari.name,
          email: editingPrabhari.email,
          phone: editingPrabhari.phone,
          stateId: editingPrabhari.stateId,
        }),
      });

      const updatedPrabhariData = await response.json();
      if (!response.ok) {
        throw new Error(updatedPrabhariData.error || 'Failed to update state prabhari');
      }
      
      // The API now returns the updated object with stateName already populated.
      const updatedPrabharis = statePrabharis.map((p) =>
        p.id === editingPrabhari.id ? updatedPrabhariData : p
      );
      setStatePrabharis(updatedPrabharis);
      showSuccess("State Prabhari updated successfully! ✓");
      setEditingPrabhari(null);
      setShowPrabhariForm(false);
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePrabhari = async (id) => {
    if (!showConfirmation("Are you sure you want to delete this state prabhari?")) return;

    setLoading(true);
    clearMessages();
    try {
      const response = await fetch(`/api/prabharis/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete state prabhari');
      }

      setStatePrabharis(statePrabharis.filter((p) => p.id !== id));
      showSuccess("State Prabhari deleted successfully");
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Gets states that do NOT already have a prabhari assigned
  const getAvailableStates = () => {
    // We filter based on stateId being present in the prabharis list
    const assignedStateIds = new Set(statePrabharis.map((p) => p.stateId));
    
    // If editing, allow the prabhari's current state to be in the list
    if (editingPrabhari) {
      assignedStateIds.delete(editingPrabhari.stateId);
    }
    
    // Filter all states that are NOT in the assigned list
    return allStates.filter((state) => !assignedStateIds.has(state.id));
  };

  const openEditForm = (prabhari) => {
    // Note: The incoming prabhari object already has stateId, so we use it directly.
    setEditingPrabhari(prabhari);
    setShowPrabhariForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAddForm = () => {
    setEditingPrabhari(null);
    setNewPrabhari({ stateId: "", name: "", email: "", phone: "" });
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
  
  // --- Modal Logic ---
  const openModal = async (prabhari) => {
    setSelectedPrabhari(prabhari);
    setIsModalLoading(true);
    setModalDetails([]);
    try {
      // API call to get all Sambhags and their Prabharis for this State
      const response = await fetch(`/api/sambhags/?stateId=${prabhari.stateId}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch sambhag details');
      }
      const data = await response.json();
      setModalDetails(data);
    } catch (err) {
      showError(err.message);
    } finally {
      setIsModalLoading(false);
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
                      name="stateId" // Correct name
                      value={formData.stateId}
                      onChange={handleFormChange}
                      required
                      className="w-full border-2 border-blue-200 focus:border-blue-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
                    >
                      <option value="">Select State</option>
                      {/* If editing, show their current state first */}
                      {editingPrabhari && (
                        <option value={editingPrabhari.stateId}>
                          {editingPrabhari.stateName}
                        </option>
                      )}
                      {/* Show all other available states */}
                      {availableStatesForDropdown.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.name}
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
                {allStates.map((state) => (
                  <option key={state.id} value={state.name}>
                    {state.name}
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
                      onClick={() => openModal(p)}
                      className={`border-t-2 border-gray-100 hover:bg-blue-100 transition-all cursor-pointer ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="p-5">
                        <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold text-sm">
                          <MapPin size={16} />
                          {p.stateName}
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
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent row click
                              openEditForm(p);
                            }}
                            className="text-blue-500 hover:text-white hover:bg-blue-500 p-3 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-110"
                            title="Edit state prabhari"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent row click
                              handleDeletePrabhari(p.id);
                            }}
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
      
      {/* --- Modal with Real Data --- */}
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
              <p className="text-lg text-blue-600 font-semibold">State Prabhari</p>
            </div>

            {/* Modal Content */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Mail size={20} className="text-blue-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
                  <p className="text-gray-800 font-medium">{selectedPrabhari.email || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Phone size={20} className="text-blue-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Phone</p>
                  <p className="text-gray-800 font-medium">{selectedPrabhari.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <MapPin size={20} className="text-blue-500 shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">State</p>
                  <p className="text-gray-800 font-medium">{selectedPrabhari.stateName}</p>
                </div>
              </div>

              {/* Sambhags & Sambhag Prabharis */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <Building size={20} className="text-blue-500 shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-3">
                    Sambhags in {selectedPrabhari.stateName}
                  </p>
                  {isModalLoading ? (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Loader2 size={16} className="animate-spin" />
                      <span>Loading sambhag details...</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {modalDetails.length > 0 ? (
                        modalDetails.map((sambhag) => (
                          <div key={sambhag.id} className="p-3 bg-white border-2 border-blue-100 rounded-lg">
                            <h4 className="font-bold text-gray-800">{sambhag.name}</h4>
                            {sambhag.prabhari ? (
                              <div className="mt-2 text-sm text-gray-600 space-y-1">
                                <p className="flex items-center gap-2">
                                  <User size={14} className="text-gray-500" />
                                  <strong>{sambhag.prabhari.name}</strong>
                                </p>
                                <p className="flex items-center gap-2">
                                  <Mail size={14} className="text-gray-500" />
                                  {sambhag.prabhari.email || "N/A"}
                                </p>
                                <p className="flex items-center gap-2">
                                  <Phone size={14} className="text-gray-500" />
                                  {sambhag.prabhari.phone}
                                </p>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500 mt-1">
                                No Sambhag Prabhari assigned.
                              </p>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600">No sambhags listed for this state.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};