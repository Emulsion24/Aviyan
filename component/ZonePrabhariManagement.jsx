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
} from "lucide-react";
import { useState, useEffect } from "react";

// Helper function to show alerts
const showConfirmation = (message) => {
  return window.confirm(message);
};

export default function ZonePrabhariManagement() {
  const [loading, setLoading] = useState(false);
  const [prabhariLoading, setPrabhariLoading] = useState(false); // Separate loading for prabharis
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Zones State
  const [zones, setZones] = useState([]); // Real data for zones
  const [allStates, setAllStates] = useState([]); // Real data for all states
  const [showZoneForm, setShowZoneForm] = useState(false);
  const [editingZone, setEditingZone] = useState(null);
  const [newZone, setNewZone] = useState({
    name: "",
    states: [], // This will hold state IDs
  });

  // Zone Prabharis State
  const [zonePrabharis, setZonePrabharis] = useState([]); // Real data for prabharis
  const [showZonePrabhariForm, setShowZonePrabhariForm] = useState(false);
  const [editingZonePrabhari, setEditingZonePrabhari] = useState(null);
  const [newZonePrabhari, setNewZonePrabhari] = useState({
    name: "",
    email: "",
    phone: "",
    zoneId: "",
  });

  // Modal State
  const [selectedPrabhari, setSelectedPrabhari] = useState(null);
  const [modalStatePrabharis, setModalStatePrabharis] = useState([]);
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    // Load all initial data
    fetchZones();
    fetchZonePrabharis();
    fetchAllStates();
  }, []);

  // --- Helper Functions for UI State ---
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

  // --- API: Fetching Data ---

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

  const fetchZones = async () => {
    setLoading(true);
    clearMessages();
    try {
      const response = await fetch('/api/zones');
      if (!response.ok) {
         const data = await response.json();
         throw new Error(data.error || 'Failed to fetch zones');
      }
      const data = await response.json();
      // Map API data to frontend state
      const mappedZones = data.map((zone) => ({
        ...zone,
        // The frontend expects a list of state IDs in `states`
        states: zone.states.map((state) => state.id),
      }));
      setZones(mappedZones);
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchZonePrabharis = async () => {
    setPrabhariLoading(true); // Use separate loading state
    clearMessages();
    try {
      // Fetch from the new paginated API
      const response = await fetch('/api/prabharis?level=ZONE&page=1&limit=500'); // Fetch all for now
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch zone prabharis');
      }
      const data = await response.json();
      
      // ** THIS IS THE FIX **
      // The API now returns { data: [...], pagination: {...} }
      setZonePrabharis(data.data);

    } catch (err) {
      showError(err.message);
    } finally {
      setPrabhariLoading(false); // Use separate loading state
    }
  };

  // --- API: Zone Management ---

  const handleAddZone = async (e) => {
    e.preventDefault();
    if (newZone.states.length === 0) {
      showError("Please select at least one state");
      return;
    }
    setLoading(true);
    clearMessages();

    try {
      // 1. Create the zone
      const zoneResponse = await fetch('/api/zones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newZone.name }),
      });
      const newZoneData = await zoneResponse.json();
      if (!zoneResponse.ok) throw new Error(newZoneData.error || 'Failed to create zone');

      // 2. Assign states to the new zone
      const assignResponse = await fetch(`/api/zones/${newZoneData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stateIds: newZone.states }),
      });
      const updatedZoneData = await assignResponse.json();
      if (!assignResponse.ok) throw new Error(updatedZoneData.error || 'Failed to assign states');

      // 3. Update UI
      // We manually add the 'states' array of IDs back, as the PUT response doesn't nest it
      setZones([...zones, { ...updatedZoneData, states: newZone.states }]);
      showSuccess("Zone created successfully! ✓");
      setNewZone({ name: "", states: [] });
      setShowZoneForm(false);
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateZone = async (e) => {
    e.preventDefault();
    if (editingZone.states.length === 0) {
      showError("Please select at least one state");
      return;
    }
    setLoading(true);
    clearMessages();

    try {
      const response = await fetch(`/api/zones/${editingZone.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingZone.name,
          stateIds: editingZone.states, // Pass the array of state IDs
        }),
      });
      const updatedZone = await response.json();
      if (!response.ok) throw new Error(updatedZone.error || 'Failed to update zone');
      
      // Manually add the state IDs back for UI consistency
      const updatedZoneWithStates = { ...updatedZone, states: editingZone.states };

      const updatedZones = zones.map((z) =>
        z.id === editingZone.id ? updatedZoneWithStates : z
      );
      setZones(updatedZones);
      showSuccess("Zone updated successfully! ✓");
      setEditingZone(null);
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteZone = async (id) => {
    if (
      !showConfirmation(
        "Are you sure you want to delete this zone? This will affect all zone prabharis."
      )
    ) return;

    setLoading(true);
    clearMessages();
    try {
      const response = await fetch(`/api/zones/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to delete zone');

      setZones(zones.filter((z) => z.id !== id));
      // Also remove any prabharis assigned to this zone from the list
      setZonePrabharis(zonePrabharis.filter((p) => p.zoneId !== id));
      showSuccess("Zone deleted successfully");
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- API: Zone Prabhari Management ---

  const handleAddZonePrabhari = async (e) => {
    e.preventDefault();
    setPrabhariLoading(true);
    clearMessages();

    try {
      const response = await fetch('/api/prabharis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newZonePrabhari,
          level: 'ZONE',
          unitId: newZonePrabhari.zoneId,
        }),
      });
      
      const newPrabhariData = await response.json();
      if (!response.ok) throw new Error(newPrabhariData.error || 'Failed to add prabhari');

      // The POST API returns the full object with 'zoneName'
      setZonePrabharis([...zonePrabharis, newPrabhariData]);
      showSuccess("Zone Prabhari added successfully! ✓");
      setNewZonePrabhari({ name: "", email: "", phone: "", zoneId: "" });
      setShowZonePrabhariForm(false);
    } catch (err) {
      showError(err.message);
    } finally {
      setPrabhariLoading(false);
    }
  };

  const handleUpdateZonePrabhari = async (e) => {
    e.preventDefault();
    setPrabhariLoading(true);
    clearMessages();

    try {
       const response = await fetch(`/api/prabharis/${editingZonePrabhari.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ // Send only the data that can be updated
          name: editingZonePrabhari.name,
          email: editingZonePrabhari.email,
          phone: editingZonePrabhari.phone,
          zoneId: editingZonePrabhari.zoneId,
        }),
      });

      const updatedPrabhariData = await response.json();
      if (!response.ok) throw new Error(updatedPrabhariData.error || 'Failed to update prabhari');

      // The PUT API returns the full object with 'zoneName'
      const updatedPrabharis = zonePrabharis.map((p) =>
        p.id === editingZonePrabhari.id ? updatedPrabhariData : p
      );
      setZonePrabharis(updatedPrabharis);
      showSuccess("Zone Prabhari updated successfully! ✓");
      setEditingZonePrabhari(null);
    } catch (err) {
      showError(err.message);
    } finally {
      setPrabhariLoading(false);
    }
  };

  const handleDeleteZonePrabhari = async (id) => {
    if (!showConfirmation("Are you sure you want to delete this zone prabhari?")) return;

    setPrabhariLoading(true);
    clearMessages();
    try {
      const response = await fetch(`/api/prabharis/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to delete prabhari');

      setZonePrabharis(zonePrabharis.filter((p) => p.id !== id));
      showSuccess("Zone Prabhari deleted successfully");
    } catch (err) {
      showError(err.message);
    } finally {
      setPrabhariLoading(false);
    }
  };

  // --- Form Helpers ---

  const toggleStateSelection = (stateId) => {
    if (editingZone) {
      const states = editingZone.states.includes(stateId)
        ? editingZone.states.filter((id) => id !== stateId)
        : [...editingZone.states, stateId];
      setEditingZone({ ...editingZone, states });
    } else {
      const states = newZone.states.includes(stateId)
        ? newZone.states.filter((id) => id !== stateId)
        : [...newZone.states, stateId];
      setNewZone({ ...newZone, states });
    }
  };

  // Get available states (not assigned to any other zone)
  const getAvailableStates = () => {
    const assignedStates = new Set();

    zones.forEach((zone) => {
      // If editing, exclude the current zone's states
      if (editingZone && zone.id === editingZone.id) {
        return;
      }
      zone.states.forEach((stateId) => assignedStates.add(stateId));
    });

    return allStates.filter((state) => !assignedStates.has(state.id));
  };

  // --- Modal Logic ---

  const openModal = async (prabhari) => {
    setSelectedPrabhari(prabhari);
    setIsModalLoading(true);
    setModalStatePrabharis([]); // Clear old data
    
    try {
      // Call the new API to get states and their prabharis for this zone
      const response = await fetch(`/api/states/prabharis?zoneId=${prabhari.zoneId}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch modal details');
      }
      const data = await response.json();
      setModalStatePrabharis(data);
    } catch (err) {
      showError(`Modal error: ${err.message}`);
    } finally {
      setIsModalLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <MapPin className="text-orange-600" size={40} />
            Zone Prabhari Management
          </h1>
          <p className="text-gray-600">
            Manage zones and zone prabharis across different states
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

        {/* Zones Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-orange-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <MapPin className="text-orange-600" size={28} />
              Zones
            </h2>
            <button
              onClick={() => {
                setShowZoneForm(!showZoneForm);
                setEditingZone(null); // Close edit form if open
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold hover:from-orange-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus size={20} />
              {showZoneForm ? "Cancel" : "Create Zone"}
            </button>
          </div>

          {/* Zone Form */}
          {(showZoneForm || editingZone) && (
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-2xl mb-6 border-2 border-orange-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingZone ? "Edit Zone" : "Create New Zone"}
              </h3>
              <form onSubmit={editingZone ? handleUpdateZone : handleAddZone}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Zone Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter zone name (e.g., North Zone)"
                    value={editingZone ? editingZone.name : newZone.name}
                    onChange={(e) =>
                      editingZone
                        ? setEditingZone({ ...editingZone, name: e.target.value })
                        : setNewZone({ ...newZone, name: e.target.value })
                    }
                    required
                    className="w-full border-2 border-orange-200 focus:border-orange-500 p-4 rounded-xl outline-none transition-all shadow-sm hover:shadow-md bg-white"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Select States * (Selected:{" "}
                    {editingZone
                      ? editingZone.states.length
                      : newZone.states.length}
                    )
                  </label>

                  {/* Selected States Display */}
                  {(
                    (editingZone ? editingZone.states : newZone.states).length >
                    0
                  ) && (
                    <div className="mb-4 p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Selected States:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(editingZone
                          ? editingZone.states
                          : newZone.states
                        ).map((stateId) => {
                          const state = allStates.find(s => s.id === stateId);
                          return (
                          <span
                            key={stateId}
                            className="inline-flex items-center gap-2 bg-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold"
                          >
                            {state?.name || '...'}
                            <button
                              type="button"
                              onClick={() => toggleStateSelection(stateId)}
                              className="hover:bg-orange-600 rounded-full p-0.5 transition-all"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        )})}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-64 overflow-y-auto p-4 bg-white rounded-xl border-2 border-orange-200">
                    {getAvailableStates().length === 0 && (!editingZone || editingZone.states.length === 0) ? (
                      <div className="col-span-full text-center py-8 text-gray-500">
                        <p className="font-semibold">No states available</p>
                        <p className="text-sm mt-2">
                          All states have been assigned to zones
                        </p>
                      </div>
                    ) : (
                      allStates.map((state) => {
                        const isAssignedToOther = getAvailableStates().find(s => s.id === state.id) === undefined;
                        const isSelected = (
                          editingZone ? editingZone.states : newZone.states
                        ).includes(state.id);
                        
                        // Show if: 1. It's selected OR 2. It's not assigned to another zone
                        if (!isSelected && isAssignedToOther) {
                          return null;
                        }

                        return (
                          <label
                            key={state.id}
                            className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all border-2 ${
                              isSelected
                                ? "bg-orange-100 border-orange-500"
                                : "bg-gray-50 border-gray-200 hover:bg-orange-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleStateSelection(state.id)}
                              className="w-4 h-4 text-orange-600 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">
                              {state.name}
                            </span>
                          </label>
                        );
                      })
                    )}
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  {editingZone && (
                    <button
                      type="button"
                      onClick={() => setEditingZone(null)}
                      className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition-all shadow-md"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : editingZone ? (
                      <Edit size={20} />
                    ) : (
                      <Plus size={20} />
                    )}
                    {editingZone ? "Update Zone" : "Create Zone"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Zones List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {zones.map((zone) => (
              <div
                key={zone.id}
                className="bg-gradient-to-br from-orange-50 to-yellow-50 p-5 rounded-xl border-2 border-orange-200 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-800">
                    {zone.name}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingZone(zone);
                        setShowZoneForm(false); // Close create form
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="text-blue-500 hover:bg-blue-500 hover:text-white p-2 rounded-lg transition-all"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteZone(zone.id)}
                      className="text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-sm font-semibold text-gray-600 mb-2">
                    States ({zone.states.length}):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {zone.states.slice(0, 3).map((stateId) => {
                      const state = allStates.find(s => s.id === stateId);
                      return (
                      <span
                        key={stateId}
                        className="text-xs bg-orange-200 text-orange-800 px-3 py-1 rounded-full font-semibold"
                      >
                        {state?.name || '...'}
                      </span>
                    )})}
                    {zone.states.length > 3 && (
                      <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full font-semibold">
                        +{zone.states.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  ID: {zone.id}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Zone Prabharis Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Users className="text-orange-600" size={28} />
              Zone Prabharis
            </h2>
            <button
              onClick={() => {
                setShowZonePrabhariForm(!showZonePrabhariForm);
                setEditingZonePrabhari(null); // Close edit form if open
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold hover:from-orange-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <UserPlus size={20} />
              {showZonePrabhariForm ? "Cancel" : "Add Zone Prabhari"}
            </button>
          </div>

          {/* Zone Prabhari Form */}
          {(showZonePrabhariForm || editingZonePrabhari) && (
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-2xl mb-6 border-2 border-orange-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingZonePrabhari
                  ? "Edit Zone Prabhari"
                  : "Add New Zone Prabhari"}
              </h3>
              <form
                onSubmit={
                  editingZonePrabhari
                    ? handleUpdateZonePrabhari
                    : handleAddZonePrabhari
                }
              >
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Zone *
                    </label>
                    <select
                      value={
                        editingZonePrabhari
                          ? editingZonePrabhari.zoneId
                          : newZonePrabhari.zoneId
                      }
                      onChange={(e) =>
                        editingZonePrabhari
                          ? setEditingZonePrabhari({
                              ...editingZonePrabhari,
                              zoneId: e.target.value,
                            })
                          : setNewZonePrabhari({
                              ...newZonePrabhari,
                              zoneId: e.target.value,
                            })
                      }
                      required
                      className="w-full border-2 border-orange-200 focus:border-orange-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
                    >
                      <option value="">Select Zone</option>
                      {zones.map((zone) => (
                        <option key={zone.id} value={zone.id}>
                          {zone.name}
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
                      placeholder="Full Name"
                      value={
                        editingZonePrabhari
                          ? editingZonePrabhari.name
                          : newZonePrabhari.name
                      }
                      onChange={(e) =>
                        editingZonePrabhari
                          ? setEditingZonePrabhari({
                              ...editingZonePrabhari,
                              name: e.target.value,
                            })
                          : setNewZonePrabhari({
                              ...newZonePrabhari,
                              name: e.target.value,
                            })
                      }
                      required
                      className="w-full border-2 border-orange-200 focus:border-orange-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
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
                      placeholder="Email Address"
                      value={
                        editingZonePrabhari
                          ? editingZonePrabhari.email
                          : newZonePrabhari.email
                      }
                      onChange={(e) =>
                        editingZonePrabhari
                          ? setEditingZonePrabhari({
                              ...editingZonePrabhari,
                              email: e.target.value,
                            })
                          : setNewZonePrabhari({
                              ...newZonePrabhari,
                              email: e.target.value,
                            })
                      }
                      className="w-full border-2 border-orange-200 focus:border-orange-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={
                        editingZonePrabhari
                          ? editingZonePrabhari.phone
                          : newZonePrabhari.phone
                      }
                      onChange={(e) =>
                        editingZonePrabhari
                          ? setEditingZonePrabhari({
                              ...editingZonePrabhari,
                              phone: e.target.value,
                            })
                          : setNewZonePrabhari({
                              ...newZonePrabhari,
                              phone: e.target.value,
                            })
                      }
                      required
                      className="w-full border-2 border-orange-200 focus:border-orange-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
                    />
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  {editingZonePrabhari && (
                    <button
                      type="button"
                      onClick={() => setEditingZonePrabhari(null)}
                      className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition-all shadow-md"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={prabhariLoading}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
                  >
                    {prabhariLoading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : editingZonePrabhari ? (
                      <Edit size={20} />
                    ) : (
                      <UserPlus size={20} />
                    )}
                    {editingZonePrabhari ? "Update" : "Add"} Zone Prabhari
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Zone Prabharis Table */}
          {prabhariLoading && zonePrabharis.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-orange-600 mb-4" size={56} />
              <p className="text-gray-600 font-semibold text-lg">
                Loading Zone Prabharis...
              </p>
            </div>
          ) : zonePrabharis.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <Users className="mx-auto mb-4 text-gray-400" size={64} />
              <p className="text-gray-500 text-xl font-semibold">
                No Zone Prabharis found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border-2 border-gray-200 rounded-2xl shadow-lg">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-yellow-100 via-orange-100 to-amber-100">
                  <tr>
                    <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">
                      Name
                    </th>
                    <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">
                      Email
                    </th>
                    <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">
                      Phone
                    </th>
                    <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">
                      Zone
                    </th>
                    <th className="p-5 text-center font-bold text-gray-800 text-sm uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {zonePrabharis.map((p, idx) => (
                    <tr
                      key={p.id}
                      onClick={() => openModal(p)}
                      className={`border-t-2 border-gray-100 hover:bg-orange-100 transition-all cursor-pointer ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="p-5 font-semibold text-gray-800">
                        {p.name}
                      </td>
                      <td className="p-5 text-gray-600">{p.email || 'N/A'}</td>
                      <td className="p-5 text-gray-600">{p.phone}</td>
                      <td className="p-5">
                        <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-semibold text-sm">
                          <MapPin size={16} />
                          {p.zoneName || '...'}
                        </span>
                      </td>
                      <td className="p-5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent row click
                              setEditingZonePrabhari(p);
                              setShowZonePrabhariForm(true); // Show form
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="text-blue-500 hover:text-white hover:bg-blue-500 p-3 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-110"
                            title="Edit zone prabhari"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent row click
                              handleDeleteZonePrabhari(p.id);
                            }}
                            className="text-red-500 hover:text-white hover:bg-red-500 p-3 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-110"
                            title="Delete zone prabhari"
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
            onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPrabhari(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full p-2 transition-all"
            >
              <X size={24} />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                {selectedPrabhari.name}
              </h2>
              <p className="text-lg text-orange-600 font-semibold">
                Zone Prabhari
              </p>
            </div>

            {/* Modal Content */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Mail size={20} className="text-orange-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    Email
                  </p>
                  <p className="text-gray-800 font-medium">
                    {selectedPrabhari.email || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Phone size={20} className="text-orange-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    Phone
                  </p>
                  <p className="text-gray-800 font-medium">
                    {selectedPrabhari.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <Building size={20} className="text-orange-500 shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    Zone
                  </p>
                  <p className="text-gray-800 font-medium">
                    {selectedPrabhari.zoneName}
                  </p>
                </div>
              </div>

              {/* MODIFIED SECTION: States & State Prabharis */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <MapPin size={20} className="text-orange-500 shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-3">
                    States & State Prabharis in Zone
                  </p>
                  {isModalLoading ? (
                     <div className="flex items-center gap-2 text-gray-600">
                      <Loader2 size={16} className="animate-spin" />
                      <span>Loading state prabharis...</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {modalStatePrabharis.length > 0 ? (
                        modalStatePrabharis.map((state) => {
                            const statePrabhari = state.prabhari; // Get prabhari from API
                            return (
                              <div
                                key={state.id}
                                className="p-3 bg-white border-2 border-orange-100 rounded-lg"
                              >
                                <h4 className="font-bold text-gray-800">
                                  {state.name}
                                </h4>
                                {statePrabhari ? (
                                  <div className="mt-2 text-sm text-gray-600 space-y-1">
                                    <p className="flex items-center gap-2">
                                      <Users
                                        size={14}
                                        className="text-gray-500"
                                      />
                                      <strong>{statePrabhari.name}</strong>
                                    </p>
                                    <p className="flex items-center gap-2">
                                      <Mail
                                        size={14}
                                        className="text-gray-500"
                                      />
                                      {statePrabhari.email || 'N/A'}
                                    </p>
                                    <p className="flex items-center gap-2">
                                      <Phone
                                        size={14}
                                        className="text-gray-500"
                                      />
                                      {statePrabhari.phone}
                                    </p>
                                  </div>
                                ) : (
                                  <p className="text-sm text-gray-500 mt-1">
                                    No State Prabhari assigned.
                                  </p>
                                )}
                              </div>
                            );
                          }
                        )
                      ) : (
                        <p className="text-gray-600">
                          No states assigned to this zone.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* END OF MODIFIED SECTION */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}