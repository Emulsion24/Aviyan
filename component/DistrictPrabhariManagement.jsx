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

// New Mock Data: Tehsils within Districts
const DISTRICT_TEHSILS = {
  Ambala: ["Ambala Cantt.", "Barara", "Mullana", "Saha"],
  Gurugram: ["Gurugram", "Manesar", "Pataudi", "Sohna"],
  Mysuru: ["Hunsur", "Krishnarajanagara", "Mysuru", "Nanjangud"],
  "Bengaluru Urban": ["Anekal", "Bengaluru East", "Bengaluru North", "Bengaluru South"],
  Agra: ["Agra", "Bah", "Etmadpur", "Kheragarh"],
  Aligarh: ["Aligarh", "Atrauli", "Gabhana", "Khair"],
  Amritsar: ["Ajnala", "Amritsar-I", "Amritsar-II", "Baba Bakala"],
  Faridkot: ["Faridkot", "Jaitu", "Kotkapura"],
};

// New Mock Data: Tehsil Prabharis
const mockTehsilPrabharis = {
  "Ambala Cantt.": { name: "Ravi Verma", phone: "111-222-333", email: "ravi@t.com" },
  Barara: { name: "Sunita Jain", phone: "222-333-444", email: "sunita@t.com" },
  Gurugram: { name: "Anil Kapoor", phone: "333-444-555", email: "anil@t.com" },
  Manesar: { name: "Pooja Hegde", phone: "444-555-666", email: "pooja@t.com" },
  Mysuru: { name: "Kiran Kumar", phone: "555-666-777", email: "" },
  "Bengaluru East": { name: "Deepa S.", phone: "666-777-888", email: "deepa@t.com" },
  Agra: { name: "Mohit Singh", phone: "777-888-999", email: "mohit@t.com" },
  Khair: { name: "Zoya Ali", phone: "888-999-000", email: "zoya@t.com" },
  Faridkot: { name: "Balwinder Singh", phone: "999-000-111", email: "balwinder@t.com" },
};

// Main Mock Data: District Prabharis
const MOCK_DISTRICT_PRABHARIS = [
  { id: 1, state: "Haryana", district: "Ambala", name: "Ramesh Kumar", email: "ramesh@d.com", phone: "1234567890" },
  { id: 2, state: "Haryana", district: "Gurugram", name: "Sita Sharma", email: "", phone: "0987654321" },
  { id: 3, state: "Karnataka", district: "Mysuru", name: "Ganesh Patil", email: "ganesh@d.com", phone: "1122334455" },
  { id: 4, state: "Uttar Pradesh", district: "Agra", name: "Aisha Khan", email: "aisha@d.com", phone: "2233445566" },
  { id: 5, state: "Punjab", district: "Faridkot", name: "Jaspreet Kaur", email: "", phone: "3344556677" },
];


const DistrictPrabhariManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // District Prabharis State
  const [districtPrabharis, setDistrictPrabharis] = useState([]);
  const [showPrabhariForm, setShowPrabhariForm] = useState(false);
  const [editingPrabhari, setEditingPrabhari] = useState(null);
  const [newPrabhari, setNewPrabhari] = useState({
    state: "",
    district: "",
    name: "",
    email: "",
    phone: "",
  });

  // State for form dropdowns
  const [selectedState, setSelectedState] = useState("");
  const [availableDistricts, setAvailableDistricts] = useState([]);
  
  // Modal State
  const [selectedPrabhari, setSelectedPrabhari] = useState(null);
  
  useEffect(() => {
    fetchDistrictPrabharis();
  }, []);

  // Effect to update available districts when selectedState changes
  useEffect(() => {
    if (selectedState === "") {
      setAvailableDistricts([]);
      return;
    }
    
    // Get all districts for the selected state
    const allDistrictsInState = STATE_DISTRICTS[selectedState] || [];
    
    // Get districts that are already assigned
    const assignedDistricts = new Set(
      districtPrabharis
        .filter(p => p.state === selectedState)
        .map(p => p.district)
    );
    
    // If editing, allow the prabhari's current district to be in the list
    if (editingPrabhari && editingPrabhari.state === selectedState) {
      assignedDistricts.delete(editingPrabhari.district);
    }
    
    // Filter out assigned districts
    setAvailableDistricts(allDistrictsInState.filter(d => !assignedDistricts.has(d)));

  }, [selectedState, districtPrabharis, editingPrabhari]);


  const fetchDistrictPrabharis = () => {
    setLoading(true);
    try {
      // Simulate API call
      setDistrictPrabharis(MOCK_DISTRICT_PRABHARIS);
    } catch (err) {
      setError("Failed to fetch district prabharis");
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
    if (name === "state") {
      setSelectedState(value);
      updatedData.district = ""; // Reset district
    }

    setData(updatedData);
  };
  
  const handleAddPrabhari = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      // Simulate API call
      const newPrabhariData = {
        id: Date.now(),
        ...newPrabhari,
      };

      setDistrictPrabharis([...districtPrabharis, newPrabhariData]);
      setSuccessMsg("District Prabhari added successfully! ✓");
      closeForm();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to add district prabhari");
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
      const updatedPrabharis = districtPrabharis.map((p) =>
        p.id === editingPrabhari.id ? editingPrabhari : p
      );
      setDistrictPrabharis(updatedPrabharis);
      setSuccessMsg("District Prabhari updated successfully! ✓");
      closeForm();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to update district prabhari");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePrabhari = (id) => {
    if (!confirm("Are you sure you want to delete this district prabhari?")) return;

    setLoading(true);
    try {
      // Simulate API call
      setDistrictPrabharis(districtPrabharis.filter((p) => p.id !== id));
      setSuccessMsg("District Prabhari deleted successfully");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to delete district prabhari");
    } finally {
      setLoading(false);
    }
  };
  
  const openEditForm = (prabhari) => {
    setEditingPrabhari(prabhari);
    setSelectedState(prabhari.state); // Set selected state to populate district dropdown
    setShowPrabhariForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const closeForm = () => {
    setEditingPrabhari(null);
    setShowPrabhariForm(false);
    setSelectedState("");
    setNewPrabhari({ state: "", district: "", name: "", email: "", phone: "" });
    setError("");
  };

  const openAddForm = () => {
    setEditingPrabhari(null);
    setSelectedState("");
    setNewPrabhari({ state: "", district: "", name: "", email: "", phone: "" });
    setShowPrabhariForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
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
                      name="state"
                      value={formData.state}
                      onChange={handleFormChange}
                      required
                      className="w-full border-2 border-purple-200 focus:border-purple-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
                    >
                      <option value="">Select State</option>
                      {Object.keys(STATE_DISTRICTS).map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      District *
                    </label>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleFormChange}
                      required
                      disabled={!selectedState} // Disabled until a state is selected
                      className="w-full border-2 border-purple-200 focus:border-purple-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white disabled:bg-gray-100"
                    >
                      <option value="">Select District</option>
                      {/* If editing, show their current district first */}
                      {editingPrabhari && editingPrabhari.state === selectedState && (
                        <option value={editingPrabhari.district}>
                          {editingPrabhari.district}
                        </option>
                      )}
                      {availableDistricts.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                     {selectedState && availableDistricts.length === 0 && (!editingPrabhari || editingPrabhari.state !== selectedState) && (
                      <p className="text-xs text-red-600 mt-1">All districts in this state are already assigned.</p>
                    )}
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
                    disabled={loading || (availableDistricts.length === 0 && !editingPrabhari)}
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
                      onClick={() => setSelectedPrabhari(p)}
                      className={`border-t-2 border-gray-100 hover:bg-purple-50 transition-all cursor-pointer ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="p-5 font-semibold text-gray-800">{p.state}</td>
                      <td className="p-5">
                        <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold text-sm">
                          <MapPin size={16} />
                          {p.district}
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
                  <p className="text-gray-800 font-medium">{selectedPrabhari.district}</p>
                  <p className="text-gray-600 text-sm">{selectedPrabhari.state}</p>
                </div>
              </div>

              {/* Tehsils & Tehsil Prabharis */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <Map size={20} className="text-purple-500 shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-3">
                    Tehsils & Tehsil Prabharis
                  </p>
                  <div className="space-y-3">
                    {(DISTRICT_TEHSILS[selectedPrabhari.district] || []).length > 0 ? (
                      DISTRICT_TEHSILS[selectedPrabhari.district].map((tehsil) => {
                        const tehsilPrabhari = mockTehsilPrabharis[tehsil];
                        return (
                          <div key={tehsil} className="p-3 bg-white border-2 border-purple-100 rounded-lg">
                            <h4 className="font-bold text-gray-800">{tehsil}</h4>
                            {tehsilPrabhari ? (
                              <div className="mt-2 text-sm text-gray-600 space-y-1">
                                <p className="flex items-center gap-2">
                                  <User size={14} className="text-gray-500" />
                                  <strong>{tehsilPrabhari.name}</strong>
                                </p>
                                <p className="flex items-center gap-2">
                                  <Mail size={14} className="text-gray-500" />
                                  {tehsilPrabhari.email || "N/A"}
                                </p>
                                <p className="flex items-center gap-2">
                                  <Phone size={14} className="text-gray-500" />
                                  {tehsilPrabhari.phone}
                                </p>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500 mt-1">
                                No Tehsil Prabhari assigned.
                              </p>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-gray-600">No tehsils listed for this district.</p>
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

export default DistrictPrabhariManagement;