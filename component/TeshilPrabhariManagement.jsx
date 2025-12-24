"use client";
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
  RefreshCw,
  MoreVertical,
  Download,
  FileText,
  Globe 
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// --- Custom Hooks & Helpers ---

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const Toast = ({ message, type, onClose }) => {
  if (!message) return null;
  const bgColor = type === "error" ? "bg-red-600" : "bg-green-600";
  return (
    <div className={`fixed top-5 right-5 p-4 rounded-xl text-white ${bgColor} shadow-2xl z-50 animate-fade-in-down flex items-center gap-3`}>
      <span className="font-semibold">{message}</span>
      <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
        <X size={16} />
      </button>
    </div>
  );
};

export default function TehsilPrabhariManagement() {
  // --- State Management ---
  
  const [prabharis, setPrabharis] = useState([]);
  const [tehsilsList, setTehsilsList] = useState([]);
  
  const [currentView, setCurrentView] = useState('PRABHARI'); // 'PRABHARI' | 'TEHSIL'
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]); 
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [isLoading, setIsLoading] = useState(false); 
  const [isFormLoading, setIsFormLoading] = useState(false); 
  const [isFormDistrictsLoading, setIsFormDistrictsLoading] = useState(false); 
  const [toast, setToast] = useState({ message: "", type: "" });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState(null);
  const [formMode, setFormMode] = useState('PRABHARI'); 
  const [formDistricts, setFormDistricts] = useState([]); 
  
  const [formData, setFormData] = useState({
    stateId: "",
    districtId: "",
    tehsilName: "",
    prabhariName: "",
    prabhariPhone: "",
    prabhariEmail: "",
    prabhariId: null,
    tehsilId: null,
  });

  // --- Export State ---
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportStateId, setExportStateId] = useState("");
  const [exportDistrictId, setExportDistrictId] = useState("");
  const [exportDistricts, setExportDistricts] = useState([]);
  const [isExportLoading, setIsExportLoading] = useState(false);
  const [isExportDistrictsLoading, setIsExportDistrictsLoading] = useState(false);

  // --- API Helpers ---

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 5000);
  };

  const fetchStates = useCallback(async () => {
    try {
      const res = await fetch("/api/states");
      if (!res.ok) throw new Error("Failed to load states");
      setStates(await res.json());
    } catch (err) { showToast(err.message, "error"); }
  }, []);

  const fetchDistrictsForState = useCallback(async (stateId) => {
    try {
      const res = await fetch(`/api/districts?stateId=${stateId}`);
      if (!res.ok) throw new Error("Failed to load districts");
      return await res.json();
    } catch (err) { 
      showToast(err.message, "error"); 
      return []; 
    }
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const endpoint = currentView === 'PRABHARI' ? '/api/prabharis' : '/api/tehsils';
      const params = new URLSearchParams({ 
        page: currentPage, 
        limit: 10,
        level: "TEHSIL" 
      });
      
      if (debouncedSearch) params.append("search", debouncedSearch);
      
      // Filter Logic
      if (selectedDistrict) {
        params.append("districtId", selectedDistrict);
      } else if (selectedState) {
        params.append("stateId", selectedState);
      }

      const res = await fetch(`${endpoint}?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();

      if (currentView === 'PRABHARI') {
        setPrabharis(data.data || []);
      } else {
        setTehsilsList(data.data || []);
      }
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setIsLoading(false);
    }
  }, [currentView, currentPage, debouncedSearch, selectedState, selectedDistrict]);

  // --- Effects ---
  useEffect(() => { fetchStates(); }, [fetchStates]);
  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    if (selectedState) {
      fetchDistrictsForState(selectedState).then(setDistricts);
    } else {
      setDistricts([]);
      setSelectedDistrict("");
    }
  }, [selectedState, fetchDistrictsForState]);

  useEffect(() => {
    if (formData.stateId) {
      setIsFormDistrictsLoading(true);
      fetchDistrictsForState(formData.stateId)
        .then(setFormDistricts)
        .finally(() => setIsFormDistrictsLoading(false));
    } else {
      setFormDistricts([]);
    }
  }, [formData.stateId, fetchDistrictsForState]);

  // --- Export District Effect ---
  useEffect(() => {
    if (exportStateId) {
      setIsExportDistrictsLoading(true);
      fetchDistrictsForState(exportStateId)
        .then(setExportDistricts)
        .finally(() => setIsExportDistrictsLoading(false));
    } else {
      setExportDistricts([]);
      setExportDistrictId("");
    }
  }, [exportStateId, fetchDistrictsForState]);


  // --- Form Handlers ---
  const resetForm = () => {
    setFormData({
      stateId: "", districtId: "", tehsilName: "",
      prabhariName: "", prabhariPhone: "", prabhariEmail: "",
      prabhariId: null, tehsilId: null,
    });
    setEditingEntity(null);
    setIsModalOpen(false);
  };

  const handleOpenAdd = () => {
    setFormMode(currentView);
    setFormData(prev => ({ ...prev, stateId: selectedState || "", districtId: selectedDistrict || "" }));
    setEditingEntity(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (entity, type) => {
    setEditingEntity(entity);
    setFormMode(type);
    setIsModalOpen(true);

    if (type === 'PRABHARI') {
      setFormData({
        stateId: entity.stateId || "",
        districtId: entity.districtId || "",
        tehsilName: entity.tehsilName,
        prabhariName: entity.name,
        prabhariPhone: entity.phone,
        prabhariEmail: entity.email || "",
        prabhariId: entity.id,
        tehsilId: entity.tehsilId, 
      });
    } else {
      const prabhari = entity.prabharis?.[0];
      const derivedStateId = entity.stateId || districts.find(d => d.id === entity.districtId)?.stateId || "";
      setFormData({
        stateId: derivedStateId,
        districtId: entity.districtId,
        tehsilName: entity.name,
        prabhariName: prabhari?.name || "",
        prabhariPhone: prabhari?.phone || "",
        prabhariEmail: prabhari?.email || "",
        prabhariId: prabhari?.id || null,
        tehsilId: entity.id,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormLoading(true);

    try {
      const tehsilMethod = formData.tehsilId ? "PUT" : "POST";
      const tehsilUrl = formData.tehsilId ? `/api/tehsils/${formData.tehsilId}` : "/api/tehsils";
      
      const tehsilRes = await fetch(tehsilUrl, {
        method: tehsilMethod,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.tehsilName, districtId: formData.districtId }),
      });
      
      const tehsilData = await tehsilRes.json();
      if (!tehsilRes.ok) throw new Error(tehsilData.error || "Failed to save Tehsil");
      const savedTehsilId = tehsilData.id || formData.tehsilId; 

      const hasPrabhariData = formData.prabhariName && formData.prabhariPhone;
      
      if (hasPrabhariData) {
        const prabhariMethod = formData.prabhariId ? "PUT" : "POST";
        const prabhariUrl = formData.prabhariId ? `/api/prabharis/${formData.prabhariId}` : "/api/prabharis";
        
        const prabhariRes = await fetch(prabhariUrl, {
          method: prabhariMethod,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.prabhariName,
            phone: formData.prabhariPhone,
            email: formData.prabhariEmail,
            level: "TEHSIL",
            unitId: savedTehsilId, 
            tehsilId: savedTehsilId 
          }),
        });
        if (!prabhariRes.ok) throw new Error("Failed to save Prabhari details");
      } else if (formData.prabhariId && !hasPrabhariData) {
        await fetch(`/api/prabharis/${formData.prabhariId}`, { method: "DELETE" });
      }

      showToast("Saved successfully!", "success");
      resetForm();
      fetchData(); 
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type === 'PRABHARI' ? 'Prabhari' : 'Tehsil'}?`)) return;
    try {
      const endpoint = type === 'PRABHARI' ? `/api/prabharis/${id}` : `/api/tehsils/${id}`;
      const res = await fetch(endpoint, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("Deleted successfully", "success");
      fetchData();
    } catch (err) { showToast(err.message, "error"); }
  };

  // --- EXPORT LOGIC 1: Filtered Export ---
  const handleExportPDF = async () => {
    if (!exportStateId && !window.confirm("You have not selected a state. This will export ALL data. Continue?")) {
      return;
    }

    setIsExportLoading(true);
    try {
      // Logic: If current view is Prabhari, export prabharis (205). If view is Tehsil, export Tehsils (140)
      const endpoint = currentView === 'PRABHARI' ? '/api/prabharis' : '/api/tehsils';
      const params = new URLSearchParams({ 
        limit: 10000, 
        page: 1, 
        level: "TEHSIL" 
      });

      if (exportDistrictId) {
        params.append("districtId", exportDistrictId);
      } else if (exportStateId) {
        params.append("stateId", exportStateId);
      }

      const res = await fetch(`${endpoint}?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch export data");
      const result = await res.json();
      const data = result.data || [];

      if (data.length === 0) throw new Error("No data found for the selected region.");

      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.setTextColor(40);
      const title = currentView === 'PRABHARI' ? "Tehsil Prabhari Report" : "Tehsil Unit Report";
      doc.text(title, 14, 15);

      doc.setFontSize(10);
      doc.setTextColor(100);
      const dateStr = new Date().toLocaleDateString();
      const stateName = states.find(s => s.id === exportStateId)?.name || "All States";
      const districtName = exportDistricts.find(d => d.id === exportDistrictId)?.name || "All Districts";
      doc.text(`Generated: ${dateStr} | Region: ${stateName} - ${districtName}`, 14, 22);

      let tableColumn = [];
      let tableRows = [];

      if (currentView === 'PRABHARI') {
        tableColumn = ["District", "Tehsil", "Prabhari Name", "Phone", "Email"];
        tableRows = data.map(item => [
          item.districtName || "",
          item.tehsilName || "",
          item.name,
          item.phone,
          item.email || "N/A"
        ]);
      } else {
        tableColumn = ["District", "Tehsil", "Assigned Prabhari", "Phone"];
        tableRows = data.map(item => {
          const prabhari = item.prabharis?.[0];
          const distName = item.district?.name || districts.find(d => d.id === item.districtId)?.name || "";
          return [
            distName,
            item.name,
            prabhari?.name || "Unassigned",
            prabhari?.phone || "N/A"
          ];
        });
      }

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        theme: 'grid',
        headStyles: { fillColor: [13, 148, 136] }, // Teal Color
        styles: { fontSize: 9 },
      });

      const finalY = doc.lastAutoTable.finalY;
      doc.setLineWidth(0.5);
      doc.setDrawColor(200, 200, 200);
      doc.line(14, finalY + 5, 196, finalY + 5);

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`Total Records: ${data.length}`, 14, finalY + 12);

      doc.save(`tehsil_${currentView.toLowerCase()}_report.pdf`);
      showToast("PDF exported successfully!", "success");
      setShowExportModal(false);

    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setIsExportLoading(false);
    }
  };

  // --- EXPORT LOGIC 2: Master Export (Updated to fix Count Issue) ---
  const handleExportMasterList = async () => {
    if (!window.confirm("This will export a comprehensive Master List of all Tehsil Prabharis. This may take a moment. Continue?")) {
        return;
    }

    setIsExportLoading(true);
    try {
        // CHANGED: Fetch 'prabharis' instead of 'tehsils' to ensure we get all 205 records (People), not just the 140 Units.
        const res = await fetch('/api/prabharis?limit=10000&level=TEHSIL');
        if (!res.ok) throw new Error("Failed to fetch master list data");
        
        const result = await res.json();
        const data = result.data || [];

        if (data.length === 0) throw new Error("No data found.");

        // Sort: State -> District -> Tehsil -> Name
        data.sort((a, b) => {
            const stateA = a.stateName || "";
            const stateB = b.stateName || "";
            if (stateA !== stateB) return stateA.localeCompare(stateB);

            const distA = a.districtName || "";
            const distB = b.districtName || "";
            if (distA !== distB) return distA.localeCompare(distB);

            const tehsilA = a.tehsilName || "";
            const tehsilB = b.tehsilName || "";
            if (tehsilA !== tehsilB) return tehsilA.localeCompare(tehsilB);
            
            return a.name.localeCompare(b.name);
        });

        // Generate PDF
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Master Tehsil Prabhari List", 14, 15);
        
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Generated: ${new Date().toLocaleDateString()} | Total Prabharis: ${data.length}`, 14, 22);

        const tableRows = data.map(item => {
            return [
                item.stateName || "N/A",
                item.districtName || "N/A",
                item.tehsilName || "N/A",
                item.name, 
                item.phone,
                item.email || ""
            ];
        });

        autoTable(doc, {
            head: [["State", "District", "Tehsil", "Prabhari Name", "Phone", "Email"]],
            body: tableRows,
            startY: 30,
            theme: 'grid',
            headStyles: { fillColor: [55, 65, 81] }, // Dark Gray
            styles: { fontSize: 8, cellPadding: 3 },
            columnStyles: {
                0: { cellWidth: 25 }, // State
                1: { cellWidth: 25 }, // District
                2: { cellWidth: 30 }, // Tehsil
                3: { cellWidth: 35 }, // Name
                4: { cellWidth: 25 }, // Phone
                5: { cellWidth: 'auto' } // Email
            }
        });

        doc.save("master_tehsil_prabhari_list.pdf");
        showToast("Master list exported!", "success");
        setShowExportModal(false);

    } catch (err) {
        showToast(err.message, "error");
    } finally {
        setIsExportLoading(false);
    }
  };


  // --- Render Helpers ---

  // Helper to get consistent data object regardless of View Mode
  const getRowData = (item) => {
    const isPrabhariView = currentView === 'PRABHARI';
    const districtName = item.districtName || item.district?.name || districts.find(d => d.id === item.districtId)?.name || "Unknown District";
    
    return {
      id: item.id,
      mainName: item.name, // Either Prabhari Name or Tehsil Name
      subName: isPrabhariView ? item.tehsilName : (item.prabharis?.[0]?.name || "Unassigned"),
      subLabel: isPrabhariView ? "Tehsil" : "Prabhari",
      district: districtName,
      phone: isPrabhariView ? item.phone : (item.prabharis?.[0]?.phone || "N/A"),
      email: isPrabhariView ? item.email : (item.prabharis?.[0]?.email),
    };
  };

  const renderContent = () => {
    const data = currentView === 'PRABHARI' ? prabharis : tehsilsList;
    
    if (isLoading) return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
        <Loader2 className="animate-spin text-teal-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Loading records...</p>
      </div>
    );

    if (data.length === 0) return (
      <div className="p-12 text-center bg-white rounded-2xl border border-gray-200 text-gray-500">
        No records found. Try adjusting your filters.
      </div>
    );

    return (
      <div className="bg-transparent md:bg-white md:rounded-2xl md:shadow-sm md:border md:border-gray-200 overflow-hidden">
        {/* --- DESKTOP TABLE VIEW (Hidden on Mobile) --- */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {currentView === 'PRABHARI' ? 'Prabhari Name' : 'Tehsil Name'}
                </th>
                <th className="p-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Location</th>
                <th className="p-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="p-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((item) => {
                const row = getRowData(item);
                return (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-gray-900 text-base">{row.mainName}</div>
                      <div className="text-xs text-teal-600 font-medium mt-1 flex items-center gap-1">
                        {currentView === 'PRABHARI' ? <Building size={12}/> : <User size={12}/>}
                        {row.subLabel}: {row.subName}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-700 font-medium flex items-center gap-1">
                        <MapPin size={14} className="text-gray-400"/> {row.district}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <Phone size={14} className="text-gray-400"/>
                        {row.phone}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      {/* ALWAYS VISIBLE ACTIONS */}
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenEdit(item, currentView)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" title="Edit">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(item.id, currentView)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* --- MOBILE CARD VIEW (Visible only on Mobile) --- */}
        <div className="md:hidden flex flex-col gap-4">
          {data.map((item) => {
            const row = getRowData(item);
            return (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                {/* Card Header: Main Name + Actions */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{row.mainName}</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mt-1">
                      {currentView === 'PRABHARI' ? <User size={10}/> : <Building size={10}/>}
                      {currentView === 'PRABHARI' ? 'Prabhari' : 'Tehsil Unit'}
                    </span>
                  </div>
                  {/* Always Visible Actions on Mobile */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleOpenEdit(item, currentView)} 
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg active:scale-95 transition-transform"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id, currentView)} 
                      className="p-2 bg-red-50 text-red-600 rounded-lg active:scale-95 transition-transform"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Card Body: Details */}
                <div className="space-y-2 border-t border-gray-100 pt-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 flex items-center gap-1"><Building size={14}/> {row.subLabel}</span>
                    <span className="font-medium text-gray-800">{row.subName}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 flex items-center gap-1"><MapPin size={14}/> District</span>
                    <span className="font-medium text-gray-800">{row.district}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 flex items-center gap-1"><Phone size={14}/> Contact</span>
                    <span className="font-medium text-gray-800">{row.phone}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "" })} />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <MapPin className="text-teal-600" size={32} />
              Tehsil Management
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-1">Manage Tehsil administrative units & Prabharies</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* EXPORT BUTTON */}
            <button
                onClick={() => setShowExportModal(true)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-all border text-sm md:text-base bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
            >
                <Download size={18} />
                Export PDF
            </button>

            <button
              onClick={() => {
                const newView = currentView === 'PRABHARI' ? 'TEHSIL' : 'PRABHARI';
                setCurrentView(newView);
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-all border text-sm md:text-base
                ${currentView === 'PRABHARI' 
                  ? 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50' 
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'}`}
            >
              <RefreshCw size={18} />
              Switch to {currentView === 'PRABHARI' ? 'Tehsils' : 'Prabharis'}
            </button>
            
            <button
              onClick={handleOpenAdd}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl shadow-lg hover:shadow-xl hover:translate-y-[-1px] transition-all font-semibold text-sm md:text-base"
            >
              <Plus size={20} />
              Add New
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <select
                value={selectedState}
                onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(""); setCurrentPage(1); }}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-sm"
              >
                <option value="">All States</option>
                {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="md:col-span-3">
              <select
                value={selectedDistrict}
                onChange={(e) => { setSelectedDistrict(e.target.value); setCurrentPage(1); }}
                disabled={!selectedState}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all disabled:opacity-50 text-sm"
              >
                <option value="">All Districts</option>
                {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div className="md:col-span-6 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder={currentView === 'PRABHARI' ? "Search Name, Phone..." : "Search Tehsil..."}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {/* Content Render */}
        {renderContent()}
        
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <span className="text-sm text-gray-600 font-medium mb-4 sm:mb-0 text-center sm:text-left">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-all text-sm font-medium"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-all text-sm font-medium"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

       {/* Export PDF Modal */}
       {showExportModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setShowExportModal(false)}
        >
           <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 m-4 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowExportModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full p-2 transition-all"
            >
              <X size={24} />
            </button>

            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Export Data</h2>
              <p className="text-gray-600 text-sm">Choose what data you would like to export.</p>
            </div>

            {/* Section 1: Filtered Export */}
            <div className="space-y-4 pb-6 border-b border-gray-200">
              <h3 className="font-bold text-teal-700 text-sm uppercase tracking-wide">1. Filtered Report</h3>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select State (Filter)
                </label>
                <select
                  value={exportStateId}
                  onChange={(e) => setExportStateId(e.target.value)}
                  className="w-full border border-gray-200 focus:border-red-500 p-3 rounded-xl outline-none transition-all bg-white"
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select District (Filter)
                </label>
                <select
                  value={exportDistrictId}
                  onChange={(e) => setExportDistrictId(e.target.value)}
                  disabled={!exportStateId || isExportDistrictsLoading}
                  className="w-full border border-gray-200 focus:border-red-500 p-3 rounded-xl outline-none transition-all bg-white disabled:bg-gray-100"
                >
                  <option value="">
                    {isExportDistrictsLoading ? "Loading..." : "All Districts"}
                  </option>
                  {exportDistricts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleExportPDF}
                disabled={isExportLoading}
                className="w-full flex items-center justify-center gap-2 mt-4 px-6 py-3 rounded-xl font-bold bg-teal-600 hover:bg-teal-700 text-white transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExportLoading ? <Loader2 size={20} className="animate-spin" /> : <FileText size={20} />}
                {isExportLoading ? "Processing..." : "Download Filtered Report"}
              </button>
            </div>

            {/* Section 2: Master Export */}
            <div className="pt-4 space-y-4">
                <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide">2. Master Data List</h3>
                <p className="text-xs text-gray-500">
                    Export a comprehensive list of all Tehsil Prabharis (People), sorted by State and District.
                </p>
                <button
                    onClick={handleExportMasterList}
                    disabled={isExportLoading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold bg-gray-800 hover:bg-black text-white transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isExportLoading ? <Loader2 size={20} className="animate-spin" /> : <Globe size={20} />}
                    {isExportLoading ? "Processing..." : "Export Full Master List"}
                </button>
            </div>

          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {editingEntity ? "Edit" : "Add"} {formMode === 'TEHSIL' ? "Tehsil" : "Prabhari"}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {formMode === 'PRABHARI' ? 'Assign a person to a Tehsil' : 'Create a geographical Tehsil unit'}
                </p>
              </div>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 bg-white hover:bg-gray-200 p-2 rounded-full transition-all shadow-sm">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Form content */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-teal-700 uppercase tracking-wider">
                  <MapPin size={14}/> Location Details
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">State *</label>
                    <select
                      name="stateId"
                      value={formData.stateId}
                      onChange={(e) => setFormData({ ...formData, stateId: e.target.value, districtId: "" })}
                      required
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-teal-500 outline-none text-sm transition-all"
                    >
                      <option value="">Select</option>
                      {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">District *</label>
                    <select
                      name="districtId"
                      value={formData.districtId}
                      onChange={(e) => setFormData({ ...formData, districtId: e.target.value })}
                      required
                      disabled={!formData.stateId || isFormDistrictsLoading}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-teal-500 outline-none text-sm transition-all disabled:opacity-50"
                    >
                      <option value="">{isFormDistrictsLoading ? "Loading..." : "Select"}</option>
                      {formDistricts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Tehsil Name *</label>
                  <input
                    name="tehsilName"
                    value={formData.tehsilName}
                    onChange={(e) => setFormData({...formData, tehsilName: e.target.value})}
                    required
                    placeholder="Enter Tehsil Name"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-teal-500 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              <hr className="border-gray-100" />

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-indigo-700 uppercase tracking-wider">
                  <User size={14}/> Prabhari Details
                  {formMode === 'TEHSIL' && <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full normal-case font-normal ml-auto">Optional</span>}
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Full Name {formMode === 'PRABHARI' && '*'}</label>
                  <input
                    name="prabhariName"
                    value={formData.prabhariName}
                    onChange={(e) => setFormData({...formData, prabhariName: e.target.value})}
                    required={formMode === 'PRABHARI'}
                    placeholder="Enter Prabhari Name"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-indigo-500 outline-none text-sm transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Phone {formMode === 'PRABHARI' && '*'}</label>
                    <input
                      name="prabhariPhone"
                      value={formData.prabhariPhone}
                      onChange={(e) => setFormData({...formData, prabhariPhone: e.target.value})}
                      required={formMode === 'PRABHARI'}
                      placeholder="Phone Number"
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-indigo-500 outline-none text-sm transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Email</label>
                    <input
                      name="prabhariEmail"
                      type="email"
                      value={formData.prabhariEmail}
                      onChange={(e) => setFormData({...formData, prabhariEmail: e.target.value})}
                      placeholder="Optional"
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-indigo-500 outline-none text-sm transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-semibold text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isFormLoading || !formData.districtId || !formData.tehsilName}
                  className="flex-1 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-semibold text-sm shadow-md shadow-teal-200 disabled:opacity-50 disabled:shadow-none transition-all flex justify-center items-center gap-2"
                >
                  {isFormLoading ? <Loader2 className="animate-spin" size={18}/> : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}