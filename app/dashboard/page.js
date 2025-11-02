"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, Trash2, UserPlus, Download, LogOut, RefreshCw, Eye, X } from "lucide-react";
import { useRouter } from "next/navigation";
export default function DashboardPage() {
  const [tab, setTab] = useState("users");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // USERS
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [userPage, setUserPage] = useState(1);
  const [userTotal, setUserTotal] = useState(1);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  // SUBMISSIONS
  const [submissions, setSubmissions] = useState([]);
  const [subPage, setSubPage] = useState(1);
  const [subTotal, setSubTotal] = useState(1);
  const [subSearch, setSubSearch] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const router = useRouter();
  // Check authentication from cookies
   useEffect(() => {
  const verifyAuth = async () => {
    const res = await fetch("/api/auth/verify", { credentials: "include" });
    const data = await res.json();
    if (!data.authenticated) router.replace("/login");
  };
  verifyAuth();
}, [router]);

  // Fetch users with debounce
  useEffect(() => {
    if (tab === "users") {
      const timer = setTimeout(() => {
        fetchUsers();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [tab, userSearch, userPage]);

  // Fetch submissions
  useEffect(() => {
    if (tab === "submissions") {
      fetchSubmissions();
    }
  }, [tab, subPage]);

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
      const res = await fetch(`/api/dashboard?page=${subPage}`, {
        credentials: 'include'
      });
      
      if (!res.ok) throw new Error('Failed to fetch submissions');
      
      const data = await res.json();
      setSubmissions(data.data || []);
      setSubTotal(data.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

        setSuccessMsg("Logout Sucessfully");
        setTimeout(() => setSuccessMsg(""), 3000);
        router.replace("/login");
      } else {
        setError("Failed to Logout");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }

  };

  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const val = row[header]?.toString() || '';
          return `"${val.replace(/"/g, '""')}"`;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredSubmissions = submissions.filter(s => 
    s.name?.toLowerCase().includes(subSearch.toLowerCase()) ||
    s.email?.toLowerCase().includes(subSearch.toLowerCase()) ||
    s.state?.toLowerCase().includes(subSearch.toLowerCase()) ||
    s.district?.toLowerCase().includes(subSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3">
                <span className="text-4xl">🐄</span>
                <span>एडमिन डैशबोर्ड</span>
              </h1>
              <p className="text-gray-600 mt-2">गौ सम्मान आह्वान अभियान प्रबंधन</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mt-6 flex-wrap">
            <button
              onClick={() => setTab("users")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                tab === "users"
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <UserPlus size={18} />
              Users ({users.length})
            </button>
            <button
              onClick={() => setTab("submissions")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                tab === "submissions"
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              📝 Submissions ({submissions.length})
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-4 flex items-center justify-between">
            <span>❌ {error}</span>
            <button onClick={() => setError("")} className="text-red-700 hover:text-red-900">
              <X size={18} />
            </button>
          </div>
        )}
        
        {successMsg && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-4 flex items-center justify-between">
            <span>✓ {successMsg}</span>
            <button onClick={() => setSuccessMsg("")} className="text-green-700 hover:text-green-900">
              <X size={18} />
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* USERS TAB */}
          {tab === "users" && (
            <>
              {/* Add User Form */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl mb-6 border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <UserPlus size={24} className="text-yellow-600" />
                  Add New User
                </h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="border-2 border-gray-300 focus:border-yellow-500 p-3 rounded-lg outline-none transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="border-2 border-gray-300 focus:border-yellow-500 p-3 rounded-lg outline-none transition-all"
                  />
                  <input
                    type="password"
                    placeholder="Password (min 6 chars)"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="border-2 border-gray-300 focus:border-yellow-500 p-3 rounded-lg outline-none transition-all"
                  />
                  <button
                    onClick={handleAddUser}
                    disabled={loading || !newUser.name || !newUser.email || !newUser.password || newUser.password.length < 6}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-lg py-3 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <UserPlus size={18} />}
                    Add User
                  </button>
                </div>
              </div>

              {/* Search & Actions */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2 border-2 border-gray-200 focus-within:border-yellow-500 transition-all">
                  <Search size={20} className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="bg-transparent outline-none w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={fetchUsers}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all shadow-md"
                  >
                    <RefreshCw size={18} />
                    Refresh
                  </button>
                  <button
                    onClick={() => exportToCSV(users, 'users')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all shadow-md"
                  >
                    <Download size={18} />
                    Export
                  </button>
                </div>
              </div>

              {/* User Table */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="animate-spin text-yellow-600 mb-4" size={48} />
                  <p className="text-gray-600">Loading users...</p>
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No users found</p>
                </div>
              ) : (
                <div className="overflow-x-auto border-2 border-gray-200 rounded-xl">
                  <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-yellow-100 to-orange-100 text-gray-700">
                      <tr>
                        <th className="p-4 text-left font-semibold">Name</th>
                        <th className="p-4 text-left font-semibold">Email</th>
                        <th className="p-4 text-left font-semibold">Created</th>
                        <th className="p-4 text-center font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} className="border-t border-gray-200 hover:bg-yellow-50 transition-colors">
                          <td className="p-4 font-medium">{u.name}</td>
                          <td className="p-4 text-gray-600">{u.email}</td>
                          <td className="p-4 text-gray-600">
                            {new Date(u.createdAt).toLocaleDateString('en-IN')}
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all"
                              title="Delete user"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  disabled={userPage === 1}
                  onClick={() => setUserPage((p) => p - 1)}
                  className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:shadow-lg"
                >
                  ← Previous
                </button>
                <span className="text-gray-700 font-semibold">
                  Page {userPage} of {userTotal}
                </span>
                <button
                  disabled={userPage === userTotal}
                  onClick={() => setUserPage((p) => p + 1)}
                  className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:shadow-lg"
                >
                  Next →
                </button>
              </div>
            </>
          )}

          {/* SUBMISSIONS TAB */}
          {tab === "submissions" && (
            <>
              {/* Search & Actions */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2 border-2 border-gray-200 focus-within:border-yellow-500 transition-all">
                  <Search size={20} className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search submissions..."
                    value={subSearch}
                    onChange={(e) => setSubSearch(e.target.value)}
                    className="bg-transparent outline-none w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={fetchSubmissions}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all shadow-md"
                  >
                    <RefreshCw size={18} />
                    Refresh
                  </button>
                  <button
                    onClick={() => exportToCSV(filteredSubmissions, 'submissions')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all shadow-md"
                  >
                    <Download size={18} />
                    Export
                  </button>
                </div>
              </div>

              {/* Submissions Table */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="animate-spin text-yellow-600 mb-4" size={48} />
                  <p className="text-gray-600">Loading submissions...</p>
                </div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No submissions found</p>
                </div>
              ) : (
                <div className="overflow-x-auto border-2 border-gray-200 rounded-xl">
                  <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-yellow-100 to-orange-100 text-gray-700">
                      <tr>
                        <th className="p-4 text-left font-semibold">Name</th>
                        <th className="p-4 text-left font-semibold">State</th>
                        <th className="p-4 text-left font-semibold">District</th>
                        <th className="p-4 text-left font-semibold">Village</th>
                        <th className="p-4 text-left font-semibold">Email</th>
                        <th className="p-4 text-left font-semibold">Alt Phone</th>
                        <th className="p-4 text-center font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSubmissions.map((s) => (
                        <tr key={s.id} className="border-t border-gray-200 hover:bg-yellow-50 transition-colors">
                          <td className="p-4 font-medium">{s.name}</td>
                          <td className="p-4 text-gray-600">{s.state}</td>
                          <td className="p-4 text-gray-600">{s.district}</td>
                          <td className="p-4 text-gray-600">{s.village}</td>
                          <td className="p-4 text-gray-600">{s.email}</td>
                          <td className="p-4 text-gray-600">{s.altphone}</td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => setSelectedSubmission(s)}
                              className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-all"
                              title="View details"
                            >
                              <Eye size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  disabled={subPage === 1}
                  onClick={() => setSubPage((p) => p - 1)}
                  className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:shadow-lg"
                >
                  ← Previous
                </button>
                <span className="text-gray-700 font-semibold">
                  Page {subPage} of {subTotal}
                </span>
                <button
                  disabled={subPage === subTotal}
                  onClick={() => setSubPage((p) => p + 1)}
                  className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:shadow-lg"
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>

        {/* Submission Detail Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedSubmission(null)}>
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Submission Details</h3>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                {Object.entries(selectedSubmission).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-200 pb-3">
                    <span className="font-semibold text-gray-700 capitalize">{key.replace(/_/g, ' ')}:</span>
                    <p className="text-gray-600 mt-1">{value || 'N/A'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}