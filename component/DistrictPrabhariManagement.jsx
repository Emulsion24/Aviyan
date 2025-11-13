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
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";

// Helper function to show alerts
const showConfirmation = (message) => {
  return window.confirm(message);
};

export default function DistrictPrabhariManagement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // District Prabharis State
  const [districtPrabharis, setDistrictPrabharis] = useState([]);
  const [showPrabhariForm, setShowPrabhariForm] = useState(false);
  const [editingPrabhari, setEditingPrabhari] = useState(null);
  const [newPrabhari, setNewPrabhari] = useState({
    stateId: "", // Changed from 'state'
    districtId: "", // Changed from 'district'
    name: "",
    email: "",
    phone: "",
  });

  // State for form dropdowns
  const [allStates, setAllStates] = useState([]); // Will hold states from API
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [isDistrictLoading, setIsDistrictLoading] = useState(false);
  
  // Modal State
  const [selectedPrabhari, setSelectedPrabhari] = useState(null);
  const [modalDetails, setModalDetails] = useState(null); // Will hold tehsil data
  const [isModalLoading, setIsModalLoading] = useState(false);
  
  useEffect(() => {
    fetchDistrictPrabharis();
    fetchAllStates(); // Fetch all states on load
  }, []);

  // Effect to update available districts when stateId changes
  const formStateId = editingPrabhari ? editingPrabhari.stateId : newPrabhari.stateId;
  useEffect(() => {
    if (formStateId) {
      fetchDistrictsForState(formStateId);
    } else {
      setAvailableDistricts([]);
    }
  }, [formStateId]); // Correct dependency

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

  const fetchAllStates = async () => {
    try {
      const response = await fetch('/api/states');
      if (!response.ok) throw new Error('Failed to fetch states');
      const data = await response.json();
      setAllStates(data);
    } catch (err) {
      showError(err.message);
    }
  };

  const fetchDistrictsForState = async (stateId) => {
    setIsDistrictLoading(true);
    try {
      const response = await fetch(`/api/districts?stateId=${stateId}`);
      if (!response.ok) throw new Error('Failed to fetch districts');
      const data = await response.json();
      setAvailableDistricts(data);
    } catch (err) {
      showError(err.message);
    } finally {
      setIsDistrictLoading(false);
    }
  };

  const fetchDistrictPrabharis = async () => {
    setLoading(true);
    clearMessages();
    try {
      // Fetching from the new paginated API
      const response = await fetch('/api/prabharis?level=DISTRICT&page=1&limit=500'); // Fetch all for now
      if (!response.ok) {
         const data = await response.json();
         throw new Error(data.error || 'Failed to fetch district prabharis');
      }
      const data = await response.json();
      // ** THIS IS THE FIX **
      // The API now returns { data: [...], pagination: {...} }
      setDistrictPrabharis(data.data); 
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    
    const currentData = editingPrabhari || newPrabhari;
    const setData = editingPrabhari ? setEditingPrabhari : setNewPrabhari;
    
    let updatedData = { ...currentData, [name]: value };

    // If state is changed, reset district
    if (name === "stateId") {
      updatedData.districtId = ""; // Reset district
    }

    setData(updatedData);
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
          ...newPrabhari,
          level: 'DISTRICT',
          unitId: newPrabhari.districtId, // Pass districtId as unitId
        }),
      });

      const newPrabhariData = await response.json();
      if (!response.ok) {
        throw new Error(newPrabhariData.error || 'Failed to add prabhari');
      }

      // Add new prabhari to the list (works because POST returns the flattened data)
      setDistrictPrabharis([...districtPrabharis, newPrabhariData]);
      showSuccess("District Prabhari added successfully! ✓");
      closeForm();
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
          districtId: editingPrabhari.districtId, // Send the districtId
        }),
      });

      const updatedPrabhariData = await response.json();
      if (!response.ok) {
        throw new Error(updatedPrabhariData.error || 'Failed to update prabhari');
      }

      // Replace the old prabhari with the new data from the API
      const updatedPrabharis = districtPrabharis.map((p) =>
        p.id === editingPrabhari.id ? updatedPrabhariData : p
      );
      setDistrictPrabharis(updatedPrabharis);
      showSuccess("District Prabhari updated successfully! ✓");
      closeForm();
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePrabhari = async (id) => {
    if (!showConfirmation("Are you sure you want to delete this district prabhari?")) return;

    setLoading(true);
    clearMessages();
    try {
      const response = await fetch(`/api/prabharis/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete prabhari');
      }

      setDistrictPrabharis(districtPrabharis.filter((p) => p.id !== id));
      showSuccess("District Prabhari deleted successfully");
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const openEditForm = (prabhari) => {
    // Find the stateId from the stateName
    const state = allStates.find(s => s.name === prabhari.stateName);
    
    setEditingPrabhari({
      ...prabhari,
      stateId: state ? state.id : "", // Set the stateId for the form
    });
    setShowPrabhariForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const closeForm = () => {
    setEditingPrabhari(null);
    setShowPrabhariForm(false);
    setNewPrabhari({ stateId: "", districtId: "", name: "", email: "", phone: "" });
    setError("");
  };

  const openAddForm = () => {
    setEditingPrabhari(null);
    setNewPrabhari({ stateId: "", districtId: "", name: "", email: "", phone: "" });
    setShowPrabhariForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const openModal = async (prabhari) => {
    setSelectedPrabhari(prabhari);
    setIsModalLoading(true);
    setModalDetails(null); // Clear previous details
    try {
      const response = await fetch(`/api/districts/${prabhari.districtId}/details`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch details');
      }
      const data = await response.json();
      setModalDetails(data);
    } catch (err) {
      showError(`Modal Error: ${err.message}`);
    } finally {
      setIsModalLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedPrabhari(null);
    setModalDetails(null);
  }
  
  const formData = editingPrabhari || newPrabhari;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <MapPin className="text-purple-600" size={40} />
            District Prabhari Management
          </h1>
          <p className="text-gray-600">
            Manage prabharis for each district
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

        {/* District Prabharis Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Users className="text-purple-600" size={28} />
              Prabhari List
            </h2>
            <button
              onClick={showPrabhariForm ? closeForm : openAddForm}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold
                transition-all shadow-lg hover:shadow-xl transform hover:scale-105
                ${showPrabhariForm 
                  ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                }`}
            >
              {showPrabhariForm ? <X size={20} /> : <UserPlus size={20} />}
              {showPrabhariForm ? "Cancel" : "Add District Prabhari"}
            </button>
          </div>

          {/* Add/Edit Prabhari Form */}
          {showPrabhariForm && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl mb-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingPrabhari
                  ? "Edit District Prabhari"
                  : "Add New District Prabhari"}
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
                      name="stateId" // Changed
                      value={formData.stateId} // Changed
                      onChange={handleFormChange}
                      required
                      className="w-full border-2 border-purple-200 focus:border-purple-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
                    >
                      <option value="">Select State</option>
                      {allStates.map((state) => ( // Changed
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      District *
                    </label>
                    <select
                      name="districtId" // Changed
                      value={formData.districtId} // Changed
                      onChange={handleFormChange}
                      required
                      disabled={!formStateId || isDistrictLoading} // Changed
                      className="w-full border-2 border-purple-200 focus:border-purple-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white disabled:bg-gray-100"
                    >
                      <option value="">
                        {isDistrictLoading ? "Loading districts..." : "Select District"}
                      </option>
                      {availableDistricts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                     {/* Removed the "All districts assigned" logic, as multiple prabharis per district is allowed */}
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
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
                      className="w-full border-2 border-purple-200 focus:border-purple-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
                    />
                  </div>
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
                      className="w-full border-2 border-purple-200 focus:border-purple-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
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
                      className="w-full border-2 border-purple-200 focus:border-purple-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
                    />
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <button
                    type="submit"
                    disabled={loading || isDistrictLoading}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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

          {/* District Prabharis Table */}
          {loading && districtPrabharis.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-purple-600 mb-4" size={56} />
              <p className="text-gray-600 font-semibold text-lg">
                Loading District Prabharis...
              </p>
            </div>
          ) : districtPrabharis.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <Users className="mx-auto mb-4 text-gray-400" size={64} />
              <p className="text-gray-500 text-xl font-semibold">
                No District Prabharis found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border-2 border-gray-200 rounded-2xl shadow-lg">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-100 via-pink-100 to-red-100">
                  <tr>
                    <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">
                      State
                    </th>
                    <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">
                      District
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
                  {districtPrabharis.map((p, idx) => (
                    <tr
                      key={p.id}
                      onClick={() => openModal(p)}
                      className={`border-t-2 border-gray-100 hover:bg-purple-50 transition-all cursor-pointer ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="p-5 font-semibold text-gray-800">{p.stateName}</td>
                      <td className="p-5">
                        <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold text-sm">
                          <MapPin size={16} />
                          {p.districtName}
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
                                e.stopPropagation();
                                openEditForm(p);
                            }}
                            className="text-blue-500 hover:text-white hover:bg-blue-500 p-3 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-110"
                            title="Edit district prabhari"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeletePrabhari(p.id);
                            }}
                            className="text-red-500 hover:text-white hover:bg-red-500 p-3 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-110"
                            title="Delete district prabhari"
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
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 m-4 relative animate-slideDown max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full p-2 transition-all"
            >
              <X size={24} />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">{selectedPrabhari.name}</h2>
              <p className="text-lg text-purple-600 font-semibold">District Prabhari</p>
            </div>

            {/* Modal Content */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Mail size={20} className="text-purple-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
                  <p className="text-gray-800 font-medium">{selectedPrabhari.email || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Phone size={20} className="text-purple-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Phone</p>
                  <p className="text-gray-800 font-medium">{selectedPrabhari.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <MapPin size={20} className="text-purple-500 shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Location</p>
                  <p className="text-gray-800 font-medium">{selectedPrabhari.districtName}</p>
                  <p className="text-gray-600 text-sm">{selectedPrabhari.stateName}</p>
                </div>
              </div>

              {/* Tehsils & Tehsil Prabharis */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <Map size={20} className="text-purple-500 shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-3">
                    Tehsils & Tehsil Prabharis
                  </p>
                  {isModalLoading ? (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Loader2 size={16} className="animate-spin" />
                      <span>Loading tehsil data...</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {modalDetails && modalDetails.tehsils.length > 0 ? (
                        modalDetails.tehsils.map((tehsil) => (
                          <div key={tehsil.id} className="p-3 bg-white border-2 border-purple-100 rounded-lg">
                            <h4 className="font-bold text-gray-800">{tehsil.name}</h4>
                            
                            {tehsil.prabharis.length > 0 ? (
                              tehsil.prabharis.map(prabhari => (
                                <div key={prabhari.id} className="mt-2 text-sm text-gray-600 space-y-1 border-t pt-2">
                                  <p className="flex items-center gap-2">
                                    <User size={14} className="text-gray-500" />
                                    <strong>{prabhari.name}</strong>
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
                              <p className="text-sm text-gray-500 mt-1">
                                No Tehsil Prabhari assigned.
                              </p>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600">No tehsils listed for this district.</p>
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