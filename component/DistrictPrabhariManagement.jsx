"use client";
import {
  Loader2,
  Trash2,
  UserPlus,
  X,
  MapPin,
  Users,
  Edit,
  Mail,
  Phone,
  Map,
  Search,
  ChevronLeft,
  ChevronRight,
  User,
  FileText, // Added for PDF icon
  Download, // Added for Export button
} from "lucide-react";
import { useState, useEffect } from "react";
// --- Import PDF Libraries ---
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// --- Configuration ---
const ITEMS_PER_PAGE = 10;

// Helper: Safe confirmation
const showConfirmation = (message) => {
  return typeof window !== "undefined" && window.confirm(message);
};

export default function DistrictPrabhariManagement() {
  // --- Loading/Message States ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // --- District Prabharis State ---
  const [districtPrabharis, setDistrictPrabharis] = useState([]);
  const [showPrabhariForm, setShowPrabhariForm] = useState(false);
  const [editingPrabhari, setEditingPrabhari] = useState(null);
  
  // Form State
  const [newPrabhari, setNewPrabhari] = useState({
    stateId: "",
    districtId: "",
    name: "",
    email: "",
    phone: "",
  });

  // --- Filter, Search, and Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const [filterStateId, setFilterStateId] = useState("");
  const [filterDistrictId, setFilterDistrictId] = useState("");
  
  // Search States (Debounced)
  const [searchTerm, setSearchTerm] = useState(""); 
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // --- Form Dropdown States ---
  const [allStates, setAllStates] = useState([]);
  const [availableDistricts, setAvailableDistricts] = useState([]); // For Form
  const [filterDistricts, setFilterDistricts] = useState([]); // For Filter
  
  const [isDistrictLoading, setIsDistrictLoading] = useState(false);
  const [isFilterDistrictLoading, setIsFilterDistrictLoading] = useState(false);

  // --- Modal State ---
  const [selectedPrabhari, setSelectedPrabhari] = useState(null);
  const [modalDetails, setModalDetails] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  // --- NEW: Export State ---
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportStateId, setExportStateId] = useState("");
  const [exportDistrictId, setExportDistrictId] = useState("");
  const [exportDistricts, setExportDistricts] = useState([]);
  const [isExportDistrictLoading, setIsExportDistrictLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);


  // --- 1. Debounce Effect for Search ---
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      // If the term changed, reset to page 1
      if (searchTerm !== debouncedSearchTerm) {
        setCurrentPage(1);
      }
    }, 500); // Wait 500ms

    return () => clearTimeout(handler);
  }, [searchTerm, debouncedSearchTerm]);


  // --- 2. Initial Data Load ---
  useEffect(() => {
    fetchAllStates();
  }, []);

  // --- 3. Main Data Fetch (Depends on Debounced Search) ---
  useEffect(() => {
    // Only fetch if states are loaded (to ensure clean UI) or it's the first page load
    if (allStates.length > 0 || currentPage === 1) {
      fetchDistrictPrabharis(
        currentPage,
        filterStateId,
        filterDistrictId,
        debouncedSearchTerm
      );
    }
  }, [currentPage, filterStateId, filterDistrictId, debouncedSearchTerm, allStates.length]);


  // --- 4. Dropdown Effects (With AbortControllers) ---

  // Effect: Fetch districts for the FORM when state changes
  const formStateId = editingPrabhari ? editingPrabhari.stateId : newPrabhari.stateId;
  useEffect(() => {
    const controller = new AbortController(); // Create controller
    
    if (formStateId) {
      setIsDistrictLoading(true);
      fetchDistrictsForState(formStateId, controller.signal)
        .then((data) => setAvailableDistricts(data))
        .finally(() => setIsDistrictLoading(false));
    } else {
      setAvailableDistricts([]);
    }

    return () => controller.abort(); // Cleanup on unmount/change
  }, [formStateId]);

  // Effect: Fetch districts for the FILTER when state changes
  useEffect(() => {
    const controller = new AbortController();
    
    // Reset district filter when state filter changes
    setFilterDistrictId(""); 

    if (filterStateId) {
      setIsFilterDistrictLoading(true);
      fetchDistrictsForState(filterStateId, controller.signal)
        .then((data) => setFilterDistricts(data))
        .finally(() => setIsFilterDistrictLoading(false));
    } else {
      setFilterDistricts([]);
    }

    return () => controller.abort();
  }, [filterStateId]);

  // --- NEW: Effect: Fetch districts for the EXPORT when state changes ---
  useEffect(() => {
    const controller = new AbortController();
    
    setExportDistrictId(""); 

    if (exportStateId) {
      setIsExportDistrictLoading(true);
      fetchDistrictsForState(exportStateId, controller.signal)
        .then((data) => setExportDistricts(data))
        .finally(() => setIsExportDistrictLoading(false));
    } else {
      setExportDistricts([]);
    }

    return () => controller.abort();
  }, [exportStateId]);


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
      const response = await fetch("/api/states");
      if (!response.ok) throw new Error("Failed to fetch states");
      const data = await response.json();
      setAllStates(data);
    } catch (err) {
      showError(err.message);
    }
  };

  // Fixed: Accepts AbortSignal and explicitly returns data
  const fetchDistrictsForState = async (stateId, signal) => {
    try {
      const response = await fetch(`/api/districts?stateId=${stateId}`, { signal });
      if (!response.ok) throw new Error("Failed to fetch districts");
      const data = await response.json();
      return data || []; // Return data for state setting
    } catch (err) {
      if (err.name !== "AbortError") {
        showError(err.message);
      }
      return []; // Return empty array on error
    }
  };

  const fetchDistrictPrabharis = async (page, stateId, districtId, search) => {
    setLoading(true);
    clearMessages();

    let url = `/api/prabharis?level=DISTRICT&page=${page}&limit=${ITEMS_PER_PAGE}`;
    if (stateId) url += `&stateId=${stateId}`;
    if (districtId) url += `&districtId=${districtId}`;
    if (search) url += `&search=${search}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch district prabharis");
      }
      const data = await response.json();

      setDistrictPrabharis(data.data);
      setTotalItems(data.pagination.totalItems);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- NEW: Export Logic ---
  const handleExportPDF = async () => {
    if (!exportStateId && !showConfirmation("You have not selected a state. This will export ALL data. Continue?")) {
      return;
    }

    setIsExporting(true);
    try {
      // 1. Fetch ALL data (bypass pagination with high limit)
      let url = `/api/prabharis?level=DISTRICT&limit=10000`; 
      if (exportStateId) url += `&stateId=${exportStateId}`;
      if (exportDistrictId) url += `&districtId=${exportDistrictId}`;
      
      const response = await fetch(url);
      if (!response.ok) {
         const data = await response.json();
         throw new Error(data.error || "Failed to fetch data for export");
      }
      const result = await response.json();
      const data = result.data;

      if (!data || data.length === 0) throw new Error("No data found to export.");

      // 2. Initialize PDF
      const doc = new jsPDF();

      // 3. Header Info
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.text("District Prabhari Report", 14, 15);

      doc.setFontSize(10);
      doc.setTextColor(100);
      const dateStr = new Date().toLocaleDateString();
      const stateName = allStates.find(s => s.id === exportStateId)?.name || "All States";
      const districtName = exportDistricts.find(d => d.id === exportDistrictId)?.name || "All Districts";
      doc.text(`Generated: ${dateStr} | Region: ${stateName} - ${districtName}`, 14, 22);

      // 4. Generate Table
      const tableColumn = ["State", "District", "Name", "Phone", "Email"];
      const tableRows = data.map(item => [
        item.stateName,
        item.districtName,
        item.name,
        item.phone,
        item.email || "N/A"
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        theme: 'grid',
        headStyles: { fillColor: [128, 0, 128] }, // Purple Header
        styles: { fontSize: 9 },
      });

      // 5. Add Total at the End
      const finalY = doc.lastAutoTable.finalY; // Get Y position where table ended
      
      doc.setLineWidth(0.5);
      doc.setDrawColor(200, 200, 200);
      doc.line(14, finalY + 5, 196, finalY + 5); // Divider line

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0); // Black
      doc.text(`Total District Prabharis: ${data.length}`, 14, finalY + 12);

      // 6. Save File
      let filename = "district_prabharis.pdf";
      if (exportStateId) filename = `${stateName.replace(/\s+/g, '_')}_prabharis.pdf`;
      doc.save(filename);

      showSuccess("PDF exported successfully!");
      setShowExportModal(false);
    } catch (err) {
      showError(err.message);
    } finally {
      setIsExporting(false);
    }
  };

  // --- Handler Functions ---

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const currentData = editingPrabhari || newPrabhari;
    const setData = editingPrabhari ? setEditingPrabhari : setNewPrabhari;

    let updatedData = { ...currentData, [name]: value };

    // Reset district if state changes
    if (name === "stateId") {
      updatedData.districtId = ""; 
    }

    setData(updatedData);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === "filterStateId") {
      setFilterStateId(value);
      setCurrentPage(1); // Reset page
    } else if (name === "filterDistrictId") {
      setFilterDistrictId(value);
      setCurrentPage(1); // Reset page
    } else if (name === "searchTerm") {
      setSearchTerm(value);
      // Note: We do NOT reset page here; the Debounce Effect handles that
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleAddPrabhari = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearMessages();

    try {
      const response = await fetch("/api/prabharis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newPrabhari,
          level: "DISTRICT",
          unitId: newPrabhari.districtId,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to add prabhari");

      showSuccess("District Prabhari added successfully! ✓");
      closeForm();
      fetchDistrictPrabharis(currentPage, filterStateId, filterDistrictId, debouncedSearchTerm);
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
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editingPrabhari.name,
          email: editingPrabhari.email,
          phone: editingPrabhari.phone,
          districtId: editingPrabhari.districtId,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to update prabhari");

      showSuccess("District Prabhari updated successfully! ✓");
      closeForm();
      fetchDistrictPrabharis(currentPage, filterStateId, filterDistrictId, debouncedSearchTerm);
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
      const response = await fetch(`/api/prabharis/${id}`, { method: "DELETE" });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || "Failed to delete prabhari");

      showSuccess("District Prabhari deleted successfully");
      fetchDistrictPrabharis(currentPage, filterStateId, filterDistrictId, debouncedSearchTerm);
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openEditForm = (prabhari) => {
    // Safer lookup for state ID
    const state = allStates.find((s) => s.name === prabhari.stateName);
    
    setEditingPrabhari({
      ...prabhari,
      stateId: state ? state.id : "", // Safe fallback
    });
    setShowPrabhariForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- Modal Logic ---
  const openModal = async (prabhari) => {
    setSelectedPrabhari(prabhari);
    setIsModalLoading(true);
    setModalDetails(null);
    try {
      const response = await fetch(`/api/districts/${prabhari.districtId}/details`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch details");
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
  };

  const formData = editingPrabhari || newPrabhari;

  // --- Render Components ---

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const startRange = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endRange = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

    return (
      <div className="flex items-center justify-between mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div className="text-sm text-gray-700 font-medium">
          Showing <span className="font-bold">{startRange}</span> to{" "}
          <span className="font-bold">{endRange}</span> of{" "}
          <span className="font-bold">{totalItems}</span> results
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-purple-100 disabled:opacity-50 transition-all"
            title="Previous Page"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-gray-700 font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-purple-100 disabled:opacity-50 transition-all"
            title="Next Page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <MapPin className="text-purple-600" size={40} />
            District Prabhari Management
          </h1>
          <p className="text-gray-600">Manage prabharis for each district</p>
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
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Users className="text-purple-600" size={28} />
              Prabhari List
            </h2>
            
            <div className="flex gap-3">
                {/* NEW: Export Button */}
                <button
                    onClick={() => setShowExportModal(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-green-600 hover:bg-green-700 text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                    <Download size={20} />
                    Export PDF
                </button>

                <button
                onClick={showPrabhariForm ? closeForm : openAddForm}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold
                    transition-all shadow-lg hover:shadow-xl transform hover:scale-105
                    ${
                    showPrabhariForm
                        ? "bg-gray-600 hover:bg-gray-700 text-white"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    }`}
                >
                {showPrabhariForm ? <X size={20} /> : <UserPlus size={20} />}
                {showPrabhariForm ? "Cancel" : "Add District Prabhari"}
                </button>
            </div>
          </div>

          {/* Add/Edit Prabhari Form */}
          {showPrabhariForm && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl mb-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingPrabhari ? "Edit District Prabhari" : "Add New District Prabhari"}
              </h3>
              <form onSubmit={editingPrabhari ? handleUpdatePrabhari : handleAddPrabhari}>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State *
                    </label>
                    <select
                      name="stateId"
                      value={formData.stateId}
                      onChange={handleFormChange}
                      required
                      className="w-full border-2 border-purple-200 focus:border-purple-500 p-4 rounded-xl outline-none transition-all shadow-sm bg-white"
                    >
                      <option value="">Select State</option>
                      {allStates.map((state) => (
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
                      name="districtId"
                      value={formData.districtId}
                      onChange={handleFormChange}
                      required
                      disabled={!formStateId || isDistrictLoading}
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

          {/* --- Filtering and Search Controls --- */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Filter & Search</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {/* State Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Filter by State
                </label>
                <select
                  name="filterStateId"
                  value={filterStateId}
                  onChange={handleFilterChange}
                  className="w-full border-2 border-gray-200 focus:border-purple-500 p-3 rounded-xl outline-none transition-all bg-white"
                >
                  <option value="">All States</option>
                  {allStates.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* District Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Filter by District
                </label>
                <select
                  name="filterDistrictId"
                  value={filterDistrictId}
                  onChange={handleFilterChange}
                  disabled={!filterStateId || isFilterDistrictLoading}
                  className="w-full border-2 border-gray-200 focus:border-purple-500 p-3 rounded-xl outline-none transition-all bg-white disabled:bg-gray-100"
                >
                  <option value="">
                    {isFilterDistrictLoading ? "Loading..." : "All Districts"}
                  </option>
                  {filterDistricts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Box */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Search (Name, Email, Phone)
                </label>
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="searchTerm"
                    placeholder="Search prabharis..."
                    value={searchTerm}
                    onChange={handleFilterChange}
                    className="w-full border-2 border-gray-200 focus:border-purple-500 p-3 pl-12 rounded-xl outline-none transition-all bg-white"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() =>
                        handleFilterChange({ target: { name: "searchTerm", value: "" } })
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

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
                No District Prabharis found matching the criteria
              </p>
            </div>
          ) : (
            <>
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
                        <td className="p-5 font-semibold text-gray-800">{p.name}</td>
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
              {renderPagination()}
            </>
          )}
        </div>
      </div>

      {/* NEW: Export as PDF Modal */}
      {showExportModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
          onClick={() => setShowExportModal(false)}
        >
           <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 m-4 relative animate-slideDown"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowExportModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full p-2 transition-all"
            >
              <X size={24} />
            </button>

            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Export to PDF</h2>
              <p className="text-gray-600 text-sm">Select State and District to generate the PDF report.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select State
                </label>
                <select
                  value={exportStateId}
                  onChange={(e) => setExportStateId(e.target.value)}
                  className="w-full border-2 border-gray-200 focus:border-red-500 p-3 rounded-xl outline-none transition-all bg-white"
                >
                  <option value="">Select State</option>
                  {allStates.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select District
                </label>
                <select
                  value={exportDistrictId}
                  onChange={(e) => setExportDistrictId(e.target.value)}
                  disabled={!exportStateId || isExportDistrictLoading}
                  className="w-full border-2 border-gray-200 focus:border-red-500 p-3 rounded-xl outline-none transition-all bg-white disabled:bg-gray-100"
                >
                  <option value="">
                    {isExportDistrictLoading ? "Loading..." : "All Districts"}
                  </option>
                  {exportDistricts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Leave empty to export for the whole state.</p>
              </div>

              <button
                onClick={handleExportPDF}
                disabled={isExporting || !exportStateId}
                className="w-full flex items-center justify-center gap-2 mt-4 px-6 py-3 rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExporting ? <Loader2 size={20} className="animate-spin" /> : <FileText size={20} />}
                {isExporting ? "Generating PDF..." : "Download PDF Report"}
              </button>
            </div>

          </div>
        </div>
      )}

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
                  <p className="text-gray-800 font-medium">
                    {selectedPrabhari.email || "N/A"}
                  </p>
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
                          <div
                            key={tehsil.id}
                            className="p-3 bg-white border-2 border-purple-100 rounded-lg"
                          >
                            <h4 className="font-bold text-gray-800">{tehsil.name}</h4>

                            {tehsil.prabharis.length > 0 ? (
                              tehsil.prabharis.map((prabhari) => (
                                <div
                                  key={prabhari.id}
                                  className="mt-2 text-sm text-gray-600 space-y-1 border-t pt-2"
                                >
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
}