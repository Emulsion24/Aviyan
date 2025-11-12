"use client";
import {
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
  Mail,
  Phone,
  Building,
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

// Mock data for State Prabharis (as this data was not in the original component)
const mockStatePrabharis = {
  Punjab: {
    name: "Gurpreet Singh",
    email: "gurpreet@example.com",
    phone: "1111111111",
  },
  Haryana: {
    name: "Deepak Kumar",
    email: "deepak@example.com",
    phone: "2222222222",
  },
  "Delhi (National Capital Territory)": {
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "3333333333",
  },
  Karnataka: {
    name: "Anand Reddy",
    email: "anand@example.com",
    phone: "4444444444",
  },
  Kerala: {
    name: "Maria George",
    email: "maria@example.com",
    phone: "5555555555",
  },
  "Tamil Nadu": {
    name: "Suresh Murugan",
    email: "suresh@example.com",
    phone: "6666666666",
  },
  "West Bengal": {
    name: "Bipasha Basu",
    email: "bipasha@example.com",
    phone: "7777777777",
  },
  Odisha: {
    name: "Chirag Mohanty",
    email: "chirag@example.com",
    phone: "8888888888",
  },
  Bihar: {
    name: "Lalita Yadav",
    email: "lalita@example.com",
    phone: "9999999999",
  },
};

const ZonePrabhariManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Zones State
  const [zones, setZones] = useState([]);
  const [showZoneForm, setShowZoneForm] = useState(false);
  const [editingZone, setEditingZone] = useState(null);
  const [newZone, setNewZone] = useState({
    name: "",
    states: [],
  });

  // Zone Prabharis State
  const [zonePrabharis, setZonePrabharis] = useState([]);
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

  useEffect(() => {
    fetchZones();
    fetchZonePrabharis();
  }, []);

  const fetchZones = async () => {
    setLoading(true);
    try {
      // Simulated API call - replace with your actual API
      const mockZones = [
        {
          id: 1,
          name: "North Zone",
          states: ["Punjab", "Haryana", "Delhi (National Capital Territory)"],
          createdAt: "2024-01-15",
        },
        {
          id: 2,
          name: "South Zone",
          states: ["Karnataka", "Kerala", "Tamil Nadu"],
          createdAt: "2024-01-20",
        },
        {
          id: 3,
          name: "East Zone",
          states: ["West Bengal", "Odisha", "Bihar"],
          createdAt: "2024-02-01",
        },
      ];
      setZones(mockZones);
    } catch (err) {
      setError("Failed to fetch zones");
    } finally {
      setLoading(false);
    }
  };

  const fetchZonePrabharis = async () => {
    setLoading(true);
    try {
      // Simulated API call - replace with your actual API
      const mockPrabharis = [
        {
          id: 1,
          name: "Rajesh Kumar",
          email: "rajesh@example.com",
          phone: "9876543210",
          zoneId: 1,
          zoneName: "North Zone",
        },
        {
          id: 2,
          name: "Sunita Sharma",
          email: "sunita@example.com",
          phone: "9876543211",
          zoneId: 2,
          zoneName: "South Zone",
        },
        {
          id: 3,
          name: "Amit Patel",
          email: "amit@example.com",
          phone: "9876543212",
          zoneId: 3,
          zoneName: "East Zone",
        },
      ];

      setZonePrabharis(mockPrabharis);
    } catch (err) {
      setError("Failed to fetch zone prabharis");
    } finally {
      setLoading(false);
    }
  };

  const handleAddZone = async (e) => {
    e.preventDefault();
    if (newZone.states.length === 0) {
      setError("Please select at least one state");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      // Simulated API call - replace with your actual API
      const newZoneData = {
        id: zones.length + 1,
        name: newZone.name,
        states: newZone.states,
        createdAt: new Date().toISOString().split("T")[0],
      };

      setZones([...zones, newZoneData]);
      setSuccessMsg("Zone created successfully! ✓");
      setNewZone({ name: "", states: [] });
      setShowZoneForm(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to create zone");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateZone = async (e) => {
    e.preventDefault();
    if (editingZone.states.length === 0) {
      setError("Please select at least one state");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const updatedZones = zones.map((z) =>
        z.id === editingZone.id ? editingZone : z
      );
      setZones(updatedZones);
      setSuccessMsg("Zone updated successfully! ✓");
      setEditingZone(null);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to update zone");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteZone = async (id) => {
    if (
      !confirm(
        "Are you sure you want to delete this zone? This will affect all zone prabharis."
      )
    )
      return;

    setLoading(true);
    try {
      setZones(zones.filter((z) => z.id !== id));
      setSuccessMsg("Zone deleted successfully");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to delete zone");
    } finally {
      setLoading(false);
    }
  };

  const handleAddZonePrabhari = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const zone = zones.find(
        (z) => z.id === parseInt(newZonePrabhari.zoneId)
      );
      const newPrabhariData = {
        id: zonePrabharis.length + 1,
        ...newZonePrabhari,
        zoneId: parseInt(newZonePrabhari.zoneId),
        zoneName: zone?.name || "",
      };

      setZonePrabharis([...zonePrabharis, newPrabhariData]);
      setSuccessMsg("Zone Prabhari added successfully! ✓");
      setNewZonePrabhari({ name: "", email: "", phone: "", zoneId: "" });
      setShowZonePrabhariForm(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to add zone prabhari");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateZonePrabhari = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const zone = zones.find(
        (z) => z.id === parseInt(editingZonePrabhari.zoneId)
      );
      const updatedPrabharis = zonePrabharis.map((p) =>
        p.id === editingZonePrabhari.id
          ? {
              ...editingZonePrabhari,
              zoneId: parseInt(editingZonePrabhari.zoneId),
              zoneName: zone?.name || "",
            }
          : p
      );
      setZonePrabharis(updatedPrabharis);
      setSuccessMsg("Zone Prabhari updated successfully! ✓");
      setEditingZonePrabhari(null);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to update zone prabhari");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteZonePrabhari = async (id) => {
    if (!confirm("Are you sure you want to delete this zone prabhari?")) return;

    setLoading(true);
    try {
      setZonePrabharis(zonePrabharis.filter((p) => p.id !== id));
      setSuccessMsg("Zone Prabhari deleted successfully");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to delete zone prabhari");
    } finally {
      setLoading(false);
    }
  };

  const toggleStateSelection = (state) => {
    if (editingZone) {
      const states = editingZone.states.includes(state)
        ? editingZone.states.filter((s) => s !== state)
        : [...editingZone.states, state];
      setEditingZone({ ...editingZone, states });
    } else {
      const states = newZone.states.includes(state)
        ? newZone.states.filter((s) => s !== state)
        : [...newZone.states, state];
      setNewZone({ ...newZone, states });
    }
  };

  // Get available states (not assigned to any other zone)
  const getAvailableStates = () => {
    const allStates = Object.keys(STATE_DISTRICTS);
    const assignedStates = new Set();

    // Collect all states that are already assigned to zones
    zones.forEach((zone) => {
      // If editing, exclude the current zone's states from the assigned list
      if (editingZone && zone.id === editingZone.id) {
        return;
      }
      zone.states.forEach((state) => assignedStates.add(state));
    });

    // Return only states that are not assigned
    return allStates.filter((state) => !assignedStates.has(state));
  };

  const findZoneForPrabhari = (prabhari) => {
    if (!prabhari) return null;
    return zones.find((z) => z.id === prabhari.zoneId);
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
              onClick={() => setShowZoneForm(!showZoneForm)}
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
                        ).map((state) => (
                          <span
                            key={state}
                            className="inline-flex items-center gap-2 bg-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold"
                          >
                            {state}
                            <button
                              type="button"
                              onClick={() => toggleStateSelection(state)}
                              className="hover:bg-orange-600 rounded-full p-0.5 transition-all"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-64 overflow-y-auto p-4 bg-white rounded-xl border-2 border-orange-200">
                    {getAvailableStates().length === 0 ? (
                      <div className="col-span-full text-center py-8 text-gray-500">
                        <p className="font-semibold">No states available</p>
                        <p className="text-sm mt-2">
                          All states have been assigned to zones
                        </p>
                      </div>
                    ) : (
                      getAvailableStates().map((state) => {
                        const isSelected = (
                          editingZone ? editingZone.states : newZone.states
                        ).includes(state);
                        return (
                          <label
                            key={state}
                            className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all border-2 ${
                              isSelected
                                ? "bg-orange-100 border-orange-500"
                                : "bg-gray-50 border-gray-200 hover:bg-orange-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleStateSelection(state)}
                              className="w-4 h-4 text-orange-600 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">
                              {state}
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
                      onClick={() => setEditingZone(zone)}
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
                    {zone.states.slice(0, 3).map((state) => (
                      <span
                        key={state}
                        className="text-xs bg-orange-200 text-orange-800 px-3 py-1 rounded-full font-semibold"
                      >
                        {state}
                      </span>
                    ))}
                    {zone.states.length > 3 && (
                      <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full font-semibold">
                        +{zone.states.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Created: {zone.createdAt}
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
              onClick={() => setShowZonePrabhariForm(!showZonePrabhariForm)}
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
                      Email *
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
                      required
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
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
                  >
                    {loading ? (
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
          {loading ? (
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
                      onClick={() => setSelectedPrabhari(p)}
                      className={`border-t-2 border-gray-100 hover:bg-orange-100 transition-all cursor-pointer ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="p-5 font-semibold text-gray-800">
                        {p.name}
                      </td>
                      <td className="p-5 text-gray-600">{p.email}</td>
                      <td className="p-5 text-gray-600">{p.phone}</td>
                      <td className="p-5">
                        <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-semibold text-sm">
                          <MapPin size={16} />
                          {p.zoneName}
                        </span>
                      </td>
                      <td className="p-5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent row click
                              setEditingZonePrabhari(p);
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
                    {selectedPrabhari.email}
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
                  <div className="space-y-3">
                    {findZoneForPrabhari(selectedPrabhari)?.states.length >
                    0 ? (
                      findZoneForPrabhari(selectedPrabhari).states.map(
                        (state) => {
                          const statePrabhari = mockStatePrabharis[state]; // Get the prabhari for this state
                          return (
                            <div
                              key={state}
                              className="p-3 bg-white border-2 border-orange-100 rounded-lg"
                            >
                              <h4 className="font-bold text-gray-800">
                                {state}
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
                                    {statePrabhari.email}
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
                </div>
              </div>
              {/* END OF MODIFIED SECTION */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZonePrabhariManagement;