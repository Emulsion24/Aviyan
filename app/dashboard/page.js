"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, Trash2, UserPlus, LogOut, RefreshCw, Eye, X, Filter, ChevronDown, BarChart3, Users, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [tab, setTab] = useState("users");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // USERS
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [userSearchInput, setUserSearchInput] = useState("");
  const [userPage, setUserPage] = useState(1);
  const [userTotal, setUserTotal] = useState(1);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  // SUBMISSIONS
  const [submissions, setSubmissions] = useState([]);
  const [subPage, setSubPage] = useState(1);
  const [subTotal, setSubTotal] = useState(1);
  const [subSearch, setSubSearch] = useState("");
  const [subSearchInput, setSubSearchInput] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  
  // Advanced Filters
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    state: "",
    district: "",
    village: "",
    pincode: ""
  });
  const [activeFilters, setActiveFilters] = useState({
    state: "",
    district: "",
    village: "",
    pincode: ""
  });

  // Stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSubmissions: 0,
    filteredSubmissions: 0
  });

  // Filter Options
  const [filterOptions, setFilterOptions] = useState({
    states: [],
    districts: [],
    villages: []
  });

  const router = useRouter();

  // Check authentication
  useEffect(() => {
    const verifyAuth = async () => {
      const res = await fetch("/api/auth/verify", { credentials: "include" });
      const data = await res.json();
      if (!data.authenticated) router.replace("/login");
    };
    verifyAuth();
  }, [router]);

  // Fetch users when tab changes or page changes
  useEffect(() => {
    if (tab === "users") {
      fetchUsers();
    }
  }, [tab, userPage, userSearch]);

  // Fetch submissions when tab or page changes
  useEffect(() => {
    if (tab === "submissions") {
      fetchSubmissions();
    }
  }, [tab, subPage, subSearch, activeFilters]);

  // Fetch filter options when submissions tab is opened
  useEffect(() => {
    if (tab === "submissions") {
      fetchFilterOptions();
    }
  }, [tab]);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/users?search=${userSearch}&page=${userPage}`, {
        credentials: 'include'
      });
      
      if (!res.ok) throw new Error('Failed to fetch users');
      
      const data = await res.json();
      setUsers(data.data || []);
      setUserTotal(data.totalPages || 1);
      setStats(prev => ({ ...prev, totalUsers: data.total || 0 }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: subPage.toString(),
        search: subSearch,
        ...(activeFilters.state && { state: activeFilters.state }),
        ...(activeFilters.district && { district: activeFilters.district }),
        ...(activeFilters.village && { village: activeFilters.village }),
        ...(activeFilters.pincode && { pincode: activeFilters.pincode })
      });

      const res = await fetch(`/api/dashboard?${params.toString()}`, {
        credentials: 'include'
      });
      
      if (!res.ok) throw new Error('Failed to fetch submissions');
      
      const data = await res.json();
      setSubmissions(data.data || []);
      setSubTotal(data.totalPages || 1);
      setStats(prev => ({ 
        ...prev, 
        totalSubmissions: data.total || 0,
        filteredSubmissions: data.filteredTotal || 0
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const res = await fetch('/api/dashboard/filters', {
        credentials: 'include'
      });
      
      if (res.ok) {
        const data = await res.json();
   
        setFilterOptions({
          states: data.states || [],
          districts: data.districts || [],
          villages: data.villages || []
        });
      }
    } catch (err) {
      console.error('Failed to fetch filter options:', err);
    }
  };

  const handleUserSearch = () => {
    setUserSearch(userSearchInput);
    setUserPage(1);
  };

  const handleSubmissionSearch = () => {
    setSubSearch(subSearchInput);
    setSubPage(1);
  };

  const handleApplyFilters = () => {
    setActiveFilters({ ...filters });
    setSubPage(1);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(newUser),
      });

      const result = await res.json();
      
      if (result.success) {
        setSuccessMsg("User added successfully! ✓");
        setNewUser({ name: "", email: "", password: "" });
        setUserPage(1);
        fetchUsers();
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        setError(result.error || "Failed to add user");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${id}`, { 
        method: "DELETE",
        credentials: 'include'
      });
      
      if (res.ok) {
        setUsers(users.filter((u) => u.id !== id));
        setSuccessMsg("User deleted successfully");
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        setError("Failed to delete user");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async() => {
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/logout`, { 
        method: "POST",
        credentials: 'include'
      });
      
      if (res.ok) {
        setSuccessMsg("Logout Successfully");
        setTimeout(() => {
          router.replace("/login");
        }, 1000);
      } else {
        setError("Failed to Logout");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      state: "",
      district: "",
      village: "",
      pincode: ""
    });
    setActiveFilters({
      state: "",
      district: "",
      village: "",
      pincode: ""
    });
    setSubSearchInput("");
    setSubSearch("");
    setSubPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6 border border-orange-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-orange-400 to-yellow-500 p-4 rounded-2xl shadow-lg">
                <span className="text-5xl">🐄</span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  एडमिन डैशबोर्ड
                </h1>
                <p className="text-gray-600 mt-1 font-medium">गौ सम्मान आह्वान अभियान प्रबंधन</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl border-2 border-blue-200 shadow-md">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-3 rounded-xl">
                  <Users size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-blue-600 font-semibold text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl border-2 border-green-200 shadow-md">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 p-3 rounded-xl">
                  <FileText size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-sm">Total Submissions</p>
                  <p className="text-2xl font-bold text-green-900">{stats.totalSubmissions.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl border-2 border-purple-200 shadow-md">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500 p-3 rounded-xl">
                  <BarChart3 size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-purple-600 font-semibold text-sm">Filtered Results</p>
                  <p className="text-2xl font-bold text-purple-900">{stats.filteredSubmissions.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-3 mt-6 flex-wrap">
            <button
              onClick={() => setTab("users")}
              className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 shadow-lg ${
                tab === "users"
                  ? "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white shadow-orange-300 scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
              }`}
            >
              <UserPlus size={20} />
              <span>Users</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                tab === "users" ? "bg-white text-orange-600" : "bg-gray-200 text-gray-700"
              }`}>
                {stats.totalUsers.toLocaleString()}
              </span>
            </button>
            <button
              onClick={() => setTab("submissions")}
              className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 shadow-lg ${
                tab === "submissions"
                  ? "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white shadow-orange-300 scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
              }`}
            >
              <FileText size={20} />
              <span>Submissions</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                tab === "submissions" ? "bg-white text-orange-600" : "bg-gray-200 text-gray-700"
              }`}>
                {stats.totalSubmissions.toLocaleString()}
              </span>
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-5 rounded-2xl mb-4 flex items-center justify-between shadow-lg animate-slideIn">
            <div className="flex items-center gap-3">
              <span className="text-2xl">❌</span>
              <span className="font-semibold">{error}</span>
            </div>
            <button onClick={() => setError("")} className="text-red-700 hover:text-red-900 p-2 hover:bg-red-100 rounded-lg transition-all">
              <X size={20} />
            </button>
          </div>
        )}
        
        {successMsg && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-5 rounded-2xl mb-4 flex items-center justify-between shadow-lg animate-slideIn">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <span className="font-semibold">{successMsg}</span>
            </div>
            <button onClick={() => setSuccessMsg("")} className="text-green-700 hover:text-green-900 p-2 hover:bg-green-100 rounded-lg transition-all">
              <X size={20} />
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 border border-orange-100">
          {/* USERS TAB */}
          {tab === "users" && (
            <>
              {/* Add User Form */}
              <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-amber-50 p-6 rounded-2xl mb-6 border-2 border-orange-200 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-3">
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-3 rounded-xl shadow-md">
                    <UserPlus size={24} className="text-white" />
                  </div>
                  Add New User
                </h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="border-2 border-orange-200 focus:border-orange-500 p-4 rounded-xl outline-none transition-all shadow-sm hover:shadow-md bg-white"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="border-2 border-orange-200 focus:border-orange-500 p-4 rounded-xl outline-none transition-all shadow-sm hover:shadow-md bg-white"
                  />
                  <input
                    type="password"
                    placeholder="Password (min 6 chars)"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="border-2 border-orange-200 focus:border-orange-500 p-4 rounded-xl outline-none transition-all shadow-sm hover:shadow-md bg-white"
                  />
                  <button
                    onClick={handleAddUser}
                    disabled={loading || !newUser.name || !newUser.email || !newUser.password || newUser.password.length < 6}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold rounded-xl py-4 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? <Loader2 size={20} className="animate-spin" /> : <UserPlus size={20} />}
                    Add User
                  </button>
                </div>
              </div>

              {/* Search & Actions */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-3 border-2 border-gray-200 focus-within:border-orange-500 transition-all shadow-sm">
                    <Search size={22} className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      value={userSearchInput}
                      onChange={(e) => setUserSearchInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleUserSearch()}
                      className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
                    />
                  </div>
                  <button
                    onClick={handleUserSearch}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all shadow-md hover:shadow-lg font-semibold transform hover:scale-105 disabled:opacity-50"
                  >
                    <Search size={18} />
                    Search
                  </button>
                </div>
                <button
                  onClick={fetchUsers}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all shadow-md hover:shadow-lg font-semibold transform hover:scale-105 disabled:opacity-50"
                >
                  <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                  Refresh
                </button>
              </div>

              {/* User Table */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="animate-spin text-orange-600 mb-4" size={56} />
                  <p className="text-gray-600 font-semibold text-lg">Loading users...</p>
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                  <p className="text-gray-500 text-xl font-semibold">No users found</p>
                </div>
              ) : (
                <div className="overflow-x-auto border-2 border-gray-200 rounded-2xl shadow-lg">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-yellow-100 via-orange-100 to-amber-100">
                      <tr>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Name</th>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Email</th>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Created</th>
                        <th className="p-5 text-center font-bold text-gray-800 text-sm uppercase tracking-wide">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u, idx) => (
                        <tr key={u.id} className={`border-t-2 border-gray-100 hover:bg-orange-50 transition-all ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                          <td className="p-5 font-semibold text-gray-800">{u.name}</td>
                          <td className="p-5 text-gray-600">{u.email}</td>
                          <td className="p-5 text-gray-600 font-medium">
                            {new Date(u.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="p-5 text-center">
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="text-red-500 hover:text-white hover:bg-red-500 p-3 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-110"
                              title="Delete user"
                            >
                              <Trash2 size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                <button
                  disabled={userPage === 1 || loading}
                  onClick={() => setUserPage((p) => p - 1)}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all hover:shadow-xl transform hover:scale-105 disabled:transform-none shadow-lg w-full sm:w-auto"
                >
                  ← Previous
                </button>
                <span className="text-gray-800 font-bold text-lg px-6 py-3 bg-gray-100 rounded-xl shadow-inner">
                  Page {userPage} of {userTotal}
                </span>
                <button
                  disabled={userPage === userTotal || loading}
                  onClick={() => setUserPage((p) => p + 1)}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all hover:shadow-xl transform hover:scale-105 disabled:transform-none shadow-lg w-full sm:w-auto"
                >
                  Next →
                </button>
              </div>
            </>
          )}

          {/* SUBMISSIONS TAB */}
          {tab === "submissions" && (
            <>
              {/* Search & Filter Section */}
              <div className="space-y-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-3 border-2 border-gray-200 focus-within:border-orange-500 transition-all shadow-sm">
                      <Search size={22} className="text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={subSearchInput}
                        onChange={(e) => setSubSearchInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmissionSearch()}
                        className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
                      />
                    </div>
                    <button
                      onClick={handleSubmissionSearch}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all shadow-md hover:shadow-lg font-semibold transform hover:scale-105 disabled:opacity-50"
                    >
                      <Search size={18} />
                      Search
                    </button>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg font-semibold transform hover:scale-105 ${
                        showFilters 
                          ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white' 
                          : 'bg-white text-gray-700 border-2 border-gray-300'
                      }`}
                    >
                      <Filter size={18} />
                      Filters
                      <ChevronDown size={18} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </button>
                    <button
                      onClick={fetchSubmissions}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all shadow-md hover:shadow-lg font-semibold transform hover:scale-105 disabled:opacity-50"
                    >
                      <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                      Refresh
                    </button>
                  </div>
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-2xl border-2 border-orange-200 shadow-lg animate-slideDown">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Filter size={20} className="text-orange-600" />
                        Advanced Filters
                      </h4>
                      <button
                        onClick={clearFilters}
                        className="text-sm font-semibold text-orange-600 hover:text-orange-800 px-4 py-2 bg-white rounded-lg hover:bg-orange-100 transition-all shadow-sm"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                        <select
                          value={filters.state}
                          onChange={(e) => handleFilterChange('state', e.target.value)}
                          className="w-full p-3 border-2 border-orange-200 rounded-xl outline-none focus:border-orange-500 transition-all bg-white shadow-sm"
                        >
                          <option value="">All States</option>
                          {filterOptions.states.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">District</label>
                        <select
                          value={filters.district}
                          onChange={(e) => handleFilterChange('district', e.target.value)}
                          className="w-full p-3 border-2 border-orange-200 rounded-xl outline-none focus:border-orange-500 transition-all bg-white shadow-sm"
                        >
                          <option value="">All Districts</option>
                          {filterOptions.districts.map(district => (
                            <option key={district} value={district}>{district}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Village</label>
                        <select
                          value={filters.village}
                          onChange={(e) => handleFilterChange('village', e.target.value)}
                          className="w-full p-3 border-2 border-orange-200 rounded-xl outline-none focus:border-orange-500 transition-all bg-white shadow-sm"
                        >
                          <option value="">All Villages</option>
                          {filterOptions.villages.map(village => (
                            <option key={village} value={village}>{village}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
                        <input
                          type="text"
                          placeholder="Enter pincode"
                          value={filters.pincode}
                          onChange={(e) => handleFilterChange('pincode', e.target.value)}
                          className="w-full p-3 border-2 border-orange-200 rounded-xl outline-none focus:border-orange-500 transition-all bg-white shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={handleApplyFilters}
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
                      >
                        <Filter size={18} />
                        Apply Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Submissions Table */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="animate-spin text-orange-600 mb-4" size={56} />
                  <p className="text-gray-600 font-semibold text-lg">Loading submissions...</p>
                </div>
              ) : submissions.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                  <p className="text-gray-500 text-xl font-semibold">No submissions found</p>
                  {(subSearch || Object.values(activeFilters).some(f => f)) && (
                    <button
                      onClick={clearFilters}
                      className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto border-2 border-gray-200 rounded-2xl shadow-lg">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-yellow-100 via-orange-100 to-amber-100">
                      <tr>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Name</th>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">State</th>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">District</th>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Village</th>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Pincode</th>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Email</th>
                        <th className="p-5 text-left font-bold text-gray-800 text-sm uppercase tracking-wide">Phone</th>
                        <th className="p-5 text-center font-bold text-gray-800 text-sm uppercase tracking-wide">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((s, idx) => (
                        <tr key={s.id} className={`border-t-2 border-gray-100 hover:bg-orange-50 transition-all ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                          <td className="p-5 font-semibold text-gray-800">{s.name}</td>
                          <td className="p-5 text-gray-600">{s.state}</td>
                          <td className="p-5 text-gray-600">{s.district}</td>
                          <td className="p-5 text-gray-600">{s.village}</td>
                          <td className="p-5 text-gray-600 font-medium">{s.pincode || 'N/A'}</td>
                          <td className="p-5 text-gray-600">{s.email}</td>
                          <td className="p-5 text-gray-600">{s.phone}</td>
                          <td className="p-5 text-center">
                            <button
                              onClick={() => setSelectedSubmission(s)}
                              className="text-blue-500 hover:text-white hover:bg-blue-500 p-3 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-110"
                              title="View details"
                            >
                              <Eye size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                <button
                  disabled={subPage === 1 || loading}
                  onClick={() => setSubPage((p) => p - 1)}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all hover:shadow-xl transform hover:scale-105 disabled:transform-none shadow-lg w-full sm:w-auto"
                >
                  ← Previous
                </button>
                <span className="text-gray-800 font-bold text-lg px-6 py-3 bg-gray-100 rounded-xl shadow-inner">
                  Page {subPage} of {subTotal}
                </span>
                <button
                  disabled={subPage === subTotal || loading}
                  onClick={() => setSubPage((p) => p + 1)}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all hover:shadow-xl transform hover:scale-105 disabled:transform-none shadow-lg w-full sm:w-auto"
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>

        {/* Submission Detail Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-fadeIn" onClick={() => setSelectedSubmission(null)}>
            <div className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-orange-200 animate-scaleIn" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-200">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent flex items-center gap-3">
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-3 rounded-xl">
                    <Eye size={24} className="text-white" />
                  </div>
                  Submission Details
                </h3>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-gray-500 hover:text-white hover:bg-red-500 p-3 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-110"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(selectedSubmission).map(([key, value]) => {
                  if (key === 'id') return null;
                  return (
                    <div key={key} className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                      <span className="font-bold text-gray-700 capitalize text-sm block mb-2 text-orange-600">
                        {key.replace(/_/g, ' ')}:
                      </span>
                      <p className="text-gray-800 font-medium break-words">
                        {key === 'createdAt' 
                          ? new Date(value).toLocaleString('en-IN', { 
                              day: '2-digit', 
                              month: 'short', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : value || 'N/A'
                        }
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}