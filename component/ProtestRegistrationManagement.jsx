"use client";

import {
  Search,
  Filter,
  X,
  RefreshCw,
  Loader2,
  Download,
  FileText,
  Users,
  MapPin,
  Phone,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Eye,
  ShieldCheck,
  UserRound,
  MessageSquareWarning,
  UserMinus
} from "lucide-react";

import { useCallback, useEffect, useMemo, useState } from "react";

export default function ProtestRegistrationManagement() {
  /*
  |--------------------------------------------------------------------------
  | DATA
  |--------------------------------------------------------------------------
  */
  const [registrations, setRegistrations] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [tehsils, setTehsils] = useState([]);

  // Fetch Type: 'attending' or 'not_attending'
  const [fetchType, setFetchType] = useState("attending");

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | ERROR / SUCCESS
  |--------------------------------------------------------------------------
  */
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /*
  |--------------------------------------------------------------------------
  | SEARCH
  |--------------------------------------------------------------------------
  */
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  /*
  |--------------------------------------------------------------------------
  | FILTERS
  |--------------------------------------------------------------------------
  */
  const [filters, setFilters] = useState({
    stateId: "",
    districtId: "",
    tehsilId: "",
  });

  /*
  |--------------------------------------------------------------------------
  | PAGINATION
  |--------------------------------------------------------------------------
  */
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20); // 20 per page
  const [total, setTotal] = useState(0);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  /*
  |--------------------------------------------------------------------------
  | DETAIL MODAL
  |--------------------------------------------------------------------------
  */
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | HELPERS
  |--------------------------------------------------------------------------
  */
  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const showSuccess = (message) => {
    setError("");
    setSuccess(message);
    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  /*
  |--------------------------------------------------------------------------
  | FETCH STATES
  |--------------------------------------------------------------------------
  */
  const fetchStates = useCallback(async () => {
    try {
      const response = await fetch("/api/states", {
        credentials: "include",
        cache: "no-store",
      });

      if (!response.ok) throw new Error("Failed to fetch states");
      const data = await response.json();
      setStates(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("State fetch error:", err);
      setError(err.message || "Failed to load states");
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | FETCH DISTRICTS
  |--------------------------------------------------------------------------
  */
  const fetchDistricts = useCallback(async (stateId) => {
    if (!stateId) {
      setDistricts([]);
      return;
    }
    setLocationLoading(true);
    try {
      const response = await fetch(`/api/districts?stateId=${encodeURIComponent(stateId)}`, {
        credentials: "include",
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed to fetch districts");
      const data = await response.json();
      setDistricts(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("District fetch error:", err);
      setError(err.message || "Failed to load districts");
    } finally {
      setLocationLoading(false);
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | FETCH TEHSILS
  |--------------------------------------------------------------------------
  */
  const fetchTehsils = useCallback(async (districtId) => {
    if (!districtId) {
      setTehsils([]);
      return;
    }
    setLocationLoading(true);
    try {
      const response = await fetch(`/api/tehsils?districtId=${encodeURIComponent(districtId)}`, {
        credentials: "include",
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed to fetch tehsils");
      const data = await response.json();
      setTehsils(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Tehsil fetch error:", err);
      setError(err.message || "Failed to load tehsils");
    } finally {
      setLocationLoading(false);
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | FETCH REGISTRATIONS
  |--------------------------------------------------------------------------
  */
  const fetchRegistrations = useCallback(
    async (customPage = page, customSearch = search, customFilters = filters, currentType = fetchType) => {
      setLoading(true);
      clearMessages();

      try {
        const params = new URLSearchParams();
        params.set("page", String(customPage));
        params.set("limit", String(pageSize));
        params.set("type", currentType); // Passing the type here

        if (customSearch.trim()) params.set("search", customSearch.trim());
        if (customFilters.stateId) params.set("stateId", customFilters.stateId);
        
        // Districts and Tehsils only apply to 'attending' flow
        if (currentType === "attending") {
          if (customFilters.districtId) params.set("districtId", customFilters.districtId);
          if (customFilters.tehsilId) params.set("tehsilId", customFilters.tehsilId);
        }

        const response = await fetch(`/api/protest-registration?${params.toString()}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || data.message || "Failed to fetch registrations");

        setRegistrations(data.data || []);
        setTotal(data.total || 0);
        setFilteredTotal(data.filteredTotal || 0);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Registration fetch error:", err);
        setError(err.message || "Failed to load registrations");
      } finally {
        setLoading(false);
      }
    },
    [page, search, filters, pageSize, fetchType]
  );

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  useEffect(() => {
    fetchRegistrations();
  }, [page, search, filters, fetchType]);

  /*
  |--------------------------------------------------------------------------
  | ACTIONS
  |--------------------------------------------------------------------------
  */
  const handleStateChange = async (stateId) => {
    setFilters({ stateId, districtId: "", tehsilId: "" });
    setDistricts([]);
    setTehsils([]);
    setPage(1);
    if (stateId && fetchType === "attending") {
      await fetchDistricts(stateId);
    }
  };

  const handleDistrictChange = async (districtId) => {
    setFilters((prev) => ({ ...prev, districtId, tehsilId: "" }));
    setTehsils([]);
    setPage(1);
    if (districtId) await fetchTehsils(districtId);
  };

  const handleTehsilChange = (tehsilId) => {
    setFilters((prev) => ({ ...prev, tehsilId }));
    setPage(1);
  };

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") handleSearch();
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  const resetFilters = () => {
    setSearchInput("");
    setSearch("");
    setFilters({ stateId: "", districtId: "", tehsilId: "" });
    setDistricts([]);
    setTehsils([]);
    setPage(1);
  };

  const handleRefresh = () => fetchRegistrations();

  const getStateName = (id) => states.find((state) => state.id === id)?.name || "";
  const getDistrictName = (id) => districts.find((district) => district.id === id)?.name || "";
  const getTehsilName = (id) => tehsils.find((tehsil) => tehsil.id === id)?.name || "";

  const activeFilterCount = useMemo(() => {
    return Object.values(filters).filter(Boolean).length;
  }, [filters]);

  /*
  |--------------------------------------------------------------------------
  | CSV EXPORT (FIX FOR HINDI & REGIONAL LANGUAGES)
  |--------------------------------------------------------------------------
  */
  const exportCSV = async () => {
    setExporting(true);
    clearMessages();

    try {
      const params = new URLSearchParams();
      params.set("page", "1");
      params.set("limit", "100");
      params.set("type", fetchType);

      if (search.trim()) params.set("search", search.trim());
      if (filters.stateId) params.set("stateId", filters.stateId);
      if (fetchType === "attending") {
        if (filters.districtId) params.set("districtId", filters.districtId);
        if (filters.tehsilId) params.set("tehsilId", filters.tehsilId);
      }

      const firstResponse = await fetch(`/api/protest-registration?${params.toString()}`, {
        credentials: "include",
        cache: "no-store",
      });
      const firstData = await firstResponse.json();
      if (!firstResponse.ok) throw new Error(firstData.error || "Failed to fetch export data");

      let allData = firstData.data || [];
      const pages = firstData.totalPages || 1;

      for (let currentPage = 2; currentPage <= pages; currentPage++) {
        const pageParams = new URLSearchParams(params);
        pageParams.set("page", String(currentPage));
        const response = await fetch(`/api/protest-registration?${pageParams.toString()}`, {
          credentials: "include",
          cache: "no-store",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to fetch export data");
        allData = [...allData, ...(data.data || [])];
      }

      if (allData.length === 0) throw new Error("No registrations found for the selected filters.");

      const isAttending = fetchType === "attending";

      // CSV Headers
      const headers = isAttending
        ? ["ID", "Name", "Phone", "State", "District", "Tehsil", "Village", "Language", "Registered Date"]
        : ["ID", "Name", "Phone", "State", "Reason for Absence", "Language", "Registered Date"];

      const csvRows = [];
      csvRows.push(headers.join(","));

      // Helper to escape quotes and commas for CSV compatibility
      const escapeCell = (cellData) => {
        if (cellData === null || cellData === undefined) return `"-"`;
        const str = String(cellData).replace(/"/g, '""');
        return `"${str}"`;
      };

      // Populate Rows
      allData.forEach((item, index) => {
        const dateStr = item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN") : "-";

        if (isAttending) {
          csvRows.push([
            index + 1,
            escapeCell(item.name),
            escapeCell(item.phone),
            escapeCell(item.state?.name),
            escapeCell(item.district?.name),
            escapeCell(item.tehsil?.name),
            escapeCell(item.village),
            escapeCell(item.registration?.language),
            escapeCell(dateStr),
          ].join(","));
        } else {
          csvRows.push([
            index + 1,
            escapeCell(item.name),
            escapeCell(item.phone),
            escapeCell(item.state?.name),
            escapeCell(item.reason),
            escapeCell(item.language),
            escapeCell(dateStr),
          ].join(","));
        }
      });

      const csvContent = csvRows.join("\n");
      
      // The \uFEFF is a UTF-8 Byte Order Mark (BOM). 
      // This forces MS Excel and other tools to read Hindi, Bengali, Urdu correctly.
      const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Protest-${fetchType}-${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showSuccess(`CSV exported successfully (${allData.length} records).`);
    } catch (err) {
      console.error("CSV export error:", err);
      setError(err.message || "Failed to export CSV.");
    } finally {
      setExporting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */
  const isAttending = fetchType === "attending";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f9f1] via-[#fffdf5] to-[#eef8ed] p-3 sm:p-5 lg:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto">

        {/* ================================================================
            HEADER
        ================================================================ */}
        <div className="bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-green-800 via-green-700 to-emerald-700 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0 shadow-inner">
                  <ShieldCheck size={32} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                    Protest Dashboards
                  </h1>
                  <p className="text-green-100 mt-1 text-sm sm:text-base font-medium">
                    View, search and manage participant records
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm backdrop-blur-sm">
                  <span className="text-green-200 font-medium">Total Records</span>
                  <span className="font-black text-lg ml-2">{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================
            TYPE SWITCHER (ATTENDING VS NOT ATTENDING)
        ================================================================ */}
        <div className="flex items-center justify-center sm:justify-start mb-6">
          <div className="bg-white p-1.5 rounded-2xl inline-flex shadow-md border border-gray-200">
            <button
              onClick={() => { setFetchType("attending"); setPage(1); resetFilters(); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                fetchType === "attending"
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-500 hover:text-green-700 hover:bg-green-50"
              }`}
            >
              <Users size={18} />
              Attendees (Yes)
            </button>
            <button
              onClick={() => { setFetchType("not_attending"); setPage(1); resetFilters(); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                fetchType === "not_attending"
                  ? "bg-red-500 text-white shadow-md"
                  : "text-gray-500 hover:text-red-600 hover:bg-red-50"
              }`}
            >
              <UserMinus size={18} />
              Non-Attendees (No)
            </button>
          </div>
        </div>

        {/* MESSAGES */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-5 py-4 rounded-xl font-bold flex items-center gap-3 shadow-sm">
            <ShieldCheck size={20} />
            {success}
          </div>
        )}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-5 py-4 rounded-xl font-bold flex items-start gap-3 shadow-sm">
            <X size={20} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* ================================================================
            SEARCH + ACTION BAR
        ================================================================ */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-5 mb-6">
          <div className="flex flex-col xl:flex-row gap-4">
            
            {/* SEARCH */}
            <div className="relative flex-1">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  // Automatically clear search if they delete the text
                  if (e.target.value === "") {
                    setSearch("");
                    setPage(1);
                  }
                }}
                onKeyDown={handleSearchKeyDown}
                placeholder={isAttending ? "Search name, phone, village..." : "Search name, phone, reason..."}
                className="w-full h-14 pl-12 pr-12 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-50 outline-none transition-all font-semibold text-gray-800"
              />
              {/* CLEAR SEARCH BUTTON */}
              {searchInput && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                  title="Clear search"
                >
                  <X size={18} strokeWidth={3} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSearch}
                className="h-14 px-8 rounded-2xl bg-gray-900 hover:bg-black text-white font-bold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Search size={18} /> Search
              </button>

              <button
                onClick={() => setShowFilters((prev) => !prev)}
                className={`h-14 px-6 rounded-2xl border-2 font-bold flex items-center justify-center gap-2 transition-all ${
                  showFilters
                    ? "bg-green-50 border-green-500 text-green-800"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                <Filter size={18} /> Filters
                {activeFilterCount > 0 && (
                  <span className="w-6 h-6 rounded-full bg-green-600 text-white text-xs flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <button
                onClick={handleRefresh}
                disabled={loading}
                className="h-14 w-14 sm:w-auto sm:px-6 rounded-2xl border-2 border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <button
                onClick={exportCSV}
                disabled={exporting || filteredTotal === 0}
                className="h-14 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {exporting ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                <span className="hidden sm:inline">{exporting ? "Exporting..." : "Export CSV"}</span>
              </button>
            </div>
          </div>

          {/* ================================================================
              FILTERS
          ================================================================ */}
          {showFilters && (
            <div className="mt-5 pt-5 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* STATE (Applies to both) */}
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">State</label>
                  <select
                    value={filters.stateId}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full h-14 px-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 outline-none font-bold text-gray-700 cursor-pointer"
                  >
                    <option value="">All States</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>{state.name}</option>
                    ))}
                  </select>
                </div>

                {/* DISTRICT (Only for Attending) */}
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">District</label>
                  <select
                    value={filters.districtId}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    disabled={!isAttending || !filters.stateId || locationLoading}
                    className="w-full h-14 px-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 outline-none font-bold text-gray-700 disabled:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {!isAttending ? "N/A for Non-Attendees" : filters.stateId ? "All Districts" : "Select State First"}
                    </option>
                    {isAttending && districts.map((district) => (
                      <option key={district.id} value={district.id}>{district.name}</option>
                    ))}
                  </select>
                </div>

                {/* TEHSIL (Only for Attending) */}
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Tehsil</label>
                  <select
                    value={filters.tehsilId}
                    onChange={(e) => handleTehsilChange(e.target.value)}
                    disabled={!isAttending || !filters.districtId || locationLoading}
                    className="w-full h-14 px-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 outline-none font-bold text-gray-700 disabled:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {!isAttending ? "N/A for Non-Attendees" : filters.districtId ? "All Tehsils" : "Select District First"}
                    </option>
                    {isAttending && tehsils.map((tehsil) => (
                      <option key={tehsil.id} value={tehsil.id}>{tehsil.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ACTIVE FILTER SUMMARY */}
              <div className="flex flex-wrap items-center gap-3 mt-5">
                {filters.stateId && (
                  <span className="px-4 py-2 bg-green-50 text-green-800 border border-green-200 rounded-xl text-sm font-bold">
                    State: {getStateName(filters.stateId)}
                  </span>
                )}
                {isAttending && filters.districtId && (
                  <span className="px-4 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-sm font-bold">
                    District: {getDistrictName(filters.districtId)}
                  </span>
                )}
                {isAttending && filters.tehsilId && (
                  <span className="px-4 py-2 bg-lime-50 text-lime-800 border border-lime-200 rounded-xl text-sm font-bold">
                    Tehsil: {getTehsilName(filters.tehsilId)}
                  </span>
                )}
                {(activeFilterCount > 0 || search) && (
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl text-sm font-black flex items-center gap-2 transition-colors"
                  >
                    <X size={16} /> Clear all
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ================================================================
            DATA TABLE
        ================================================================ */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-50/50">
            <div>
              <h2 className="font-black text-gray-900 text-xl">
                {isAttending ? "Attending Records" : "Non-Attending Records"}
              </h2>
              <p className="text-sm font-semibold text-gray-500 mt-1">
                Showing {registrations.length} of {filteredTotal} filtered registrations
              </p>
            </div>
            {loading && (
              <div className="flex items-center gap-2 text-green-700 text-sm font-bold bg-green-50 px-4 py-2 rounded-full">
                <Loader2 size={16} className="animate-spin" /> Loading...
              </div>
            )}
          </div>

          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center mb-4">
                <Loader2 size={30} className="text-green-600 animate-spin" />
              </div>
              <p className="font-bold text-gray-500">Fetching records...</p>
            </div>
          ) : registrations.length === 0 ? (
            <div className="py-24 text-center px-5">
              <div className="w-20 h-20 rounded-[2rem] bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-5">
                <Users size={36} className="text-gray-400" />
              </div>
              <h3 className="font-black text-gray-800 text-xl">No records found</h3>
              <p className="text-gray-500 font-medium mt-2">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">#</th>
                      <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Participant</th>
                      <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Phone</th>
                      <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">State</th>
                      
                      {isAttending ? (
                        <>
                          <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">District</th>
                          <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Tehsil</th>
                        </>
                      ) : (
                        <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Reason</th>
                      )}
                      
                      <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Registered</th>
                      <th className="px-6 py-4 text-center text-xs font-black text-gray-400 uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((item, index) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors">
                        <td className="px-6 py-5 text-sm font-bold text-gray-400">
                          {(page - 1) * pageSize + index + 1}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isAttending ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                              <UserRound size={18} />
                            </div>
                            <div>
                              <p className="font-black text-gray-900">{item.name || "Anonymous"}</p>
                              <p className="text-xs font-bold text-gray-400 uppercase mt-0.5">ID: #{item.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          {item.phone ? (
                            <div className="flex items-center gap-2 font-bold text-gray-700">
                              <Phone size={14} className="text-gray-400" /> {item.phone}
                            </div>
                          ) : <span className="text-gray-400 italic font-medium">N/A</span>}
                        </td>
                        <td className="px-6 py-5 text-sm font-bold text-gray-700">
                          {item.state?.name || "-"}
                        </td>

                        {isAttending ? (
                          <>
                            <td className="px-6 py-5 text-sm font-bold text-gray-700">{item.district?.name || "-"}</td>
                            <td className="px-6 py-5 text-sm font-bold text-gray-700">{item.tehsil?.name || "-"}</td>
                          </>
                        ) : (
                          <td className="px-6 py-5 text-sm font-bold text-gray-700 max-w-xs truncate" title={item.reason}>
                            {item.reason || "-"}
                          </td>
                        )}

                        <td className="px-6 py-5 text-sm font-bold text-gray-500">
                          {formatDate(item.createdAt)}
                        </td>
                        <td className="px-6 py-5 text-center">
                          <button
                            onClick={() => setSelectedRegistration(item)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-black text-xs transition-colors"
                          >
                            <Eye size={16} /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE / TABLET CARDS */}
              <div className="lg:hidden divide-y divide-gray-100">
                {registrations.map((item, index) => (
                  <div key={item.id} className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-[1rem] flex items-center justify-center shrink-0 border-2 ${isAttending ? 'bg-green-50 border-green-200 text-green-600' : 'bg-red-50 border-red-200 text-red-600'}`}>
                          {isAttending ? <UserRound size={20} /> : <MessageSquareWarning size={20} />}
                        </div>
                        <div>
                          <h3 className="font-black text-gray-900 text-lg">{item.name || "Anonymous"}</h3>
                          {item.phone && (
                            <div className="flex items-center gap-1.5 text-sm font-bold text-gray-500 mt-1">
                              <Phone size={14} /> {item.phone}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 font-black bg-gray-100 px-2 py-1 rounded-lg">
                        #{((page - 1) * pageSize) + index + 1}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-5">
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <p className="text-[10px] uppercase font-black text-gray-400">State</p>
                        <p className="text-sm font-bold text-gray-800 mt-1 truncate">{item.state?.name || "-"}</p>
                      </div>
                      
                      {isAttending ? (
                        <>
                          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                            <p className="text-[10px] uppercase font-black text-gray-400">District</p>
                            <p className="text-sm font-bold text-gray-800 mt-1 truncate">{item.district?.name || "-"}</p>
                          </div>
                        </>
                      ) : (
                        <div className="bg-red-50/50 rounded-xl p-3 border border-red-100 col-span-2">
                          <p className="text-[10px] uppercase font-black text-red-400">Reason</p>
                          <p className="text-sm font-bold text-red-900 mt-1 line-clamp-2">{item.reason || "-"}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-50">
                      <div className="text-xs font-bold text-gray-400">
                        {formatDate(item.createdAt)}
                      </div>
                      <button
                        onClick={() => setSelectedRegistration(item)}
                        className="px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white text-sm font-black flex items-center gap-2"
                      >
                        <Eye size={16} /> View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ================================================================
              PAGINATION
          ================================================================ */}
          {totalPages > 1 && (
            <div className="px-6 py-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/30">
              <p className="text-sm font-bold text-gray-500">
                Page <span className="text-gray-900">{page}</span> of <span className="text-gray-900">{totalPages}</span>
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  className="w-12 h-12 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:bg-gray-100 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-gray-700"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="px-5 h-12 rounded-xl bg-white border-2 border-gray-200 text-gray-900 font-black flex items-center justify-center shadow-sm">
                  {page}
                </div>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                  className="w-12 h-12 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:bg-gray-100 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-gray-700"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================================================================
          DETAIL MODAL
      ================================================================ */}
      {selectedRegistration && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedRegistration(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className={`shrink-0 sticky top-0 z-10 px-6 py-5 text-white flex items-center justify-between gap-4 ${isAttending ? 'bg-gradient-to-r from-green-800 to-emerald-700' : 'bg-gradient-to-r from-red-800 to-rose-700'}`}>
              <div>
                <p className="text-white/70 text-xs font-black uppercase tracking-widest">
                  {isAttending ? "Attendee Details" : "Non-Attendee Details"}
                </p>
                <h2 className="text-2xl font-black mt-1 truncate pr-4">
                  {selectedRegistration.name || "Anonymous"}
                </h2>
              </div>
              <button
                onClick={() => setSelectedRegistration(null)}
                className="w-10 h-10 shrink-0 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailCard icon={<UserRound size={18} />} label="Name" value={selectedRegistration.name} />
                <DetailCard icon={<Phone size={18} />} label="Phone" value={selectedRegistration.phone} />
                <DetailCard icon={<MapPin size={18} />} label="State" value={selectedRegistration.state?.name} />
                
                {isAttending ? (
                  <>
                    <DetailCard icon={<MapPin size={18} />} label="District" value={selectedRegistration.district?.name} />
                    <DetailCard icon={<MapPin size={18} />} label="Tehsil" value={selectedRegistration.tehsil?.name} />
                    <DetailCard icon={<MapPin size={18} />} label="Village" value={selectedRegistration.village} />
                  </>
                ) : (
                  <div className="sm:col-span-2 p-5 rounded-2xl bg-red-50 border border-red-100">
                    <div className="flex items-center gap-2 text-red-800 mb-2">
                      <MessageSquareWarning size={18} />
                      <span className="text-xs font-black uppercase tracking-widest">Reason for Absence</span>
                    </div>
                    <p className="font-bold text-red-950 leading-relaxed whitespace-pre-wrap">
                      {selectedRegistration.reason || "-"}
                    </p>
                  </div>
                )}

                <DetailCard icon={<FileText size={18} />} label="Language" value={selectedRegistration.registration?.language || selectedRegistration.language} />
                <DetailCard icon={<CalendarDays size={18} />} label="Registered On" value={formatDate(selectedRegistration.createdAt)} />
              </div>

              {/* REGISTRATION ID */}
              <div className={`mt-6 p-5 rounded-2xl border ${isAttending ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                <p className={`text-xs font-black uppercase tracking-widest ${isAttending ? 'text-green-600' : 'text-gray-500'}`}>
                  System ID
                </p>
                <p className={`text-lg font-black mt-1 ${isAttending ? 'text-green-900' : 'text-gray-900'}`}>
                  #{selectedRegistration.registration?.id || selectedRegistration.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| DETAIL CARD
|--------------------------------------------------------------------------
*/
function DetailCard({ icon, label, value }) {
  return (
    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
      <div className="flex items-center gap-2 text-gray-500 mb-2">
        {icon}
        <span className="text-xs font-black uppercase tracking-widest">{label}</span>
      </div>
      <p className="font-black text-gray-900 break-words text-lg">
        {value || "-"}
      </p>
    </div>
  );
}