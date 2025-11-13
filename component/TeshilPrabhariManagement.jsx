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
} from "lucide-react";

// A simple debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

// Helper function to show alerts
const showConfirmation = (message) => {
  return window.confirm(message);
};

// Custom Toast
const Toast = ({ message, type, onClose }) => {
  if (!message) return null;
  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";
  return (
    <div className={`fixed top-5 right-5 p-4 rounded-lg text-white ${bgColor} shadow-lg z-50`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 font-bold">X</button>
    </div>
  );
};

export default function TehsilPrabhariManagement() {
  const [prabharis, setPrabharis] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState({ message: "", type: "" });

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrabhari, setEditingPrabhari] = useState(null);
  const [formData, setFormData] = useState({
    stateId: "",
    districtId: "",
    tehsilName: "",
    name: "",
    phone: "",
    email: "",
  });
  const [formDistricts, setFormDistricts] = useState([]);

  // Initial data fetch
  useEffect(() => {
    fetchStates();
  }, []);

  // Fetch prabharis when filters or page change
  useEffect(() => {
    fetchPrabharis();
  }, [selectedState, selectedDistrict, debouncedSearch, currentPage]);

  // Fetch districts for the main filter
  useEffect(() => {
    if (selectedState) {
      fetchDistrictsForState(selectedState, setDistricts);
    } else {
      setDistricts([]);
      setSelectedDistrict("");
    }
  }, [selectedState]);

  // Fetch districts for the modal form
  useEffect(() => {
    if (formData.stateId) {
      fetchDistrictsForState(formData.stateId, setFormDistricts);
    } else {
      setFormDistricts([]);
      setFormData((prev) => ({ ...prev, districtId: "" }));
    }
  }, [formData.stateId]);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: "", type: "" });
    }, 5000);
  };

  const fetchStates = async () => {
    try {
      const response = await fetch("/api/states");
      if (!response.ok) throw new Error("Failed to fetch states");
      const data = await response.json();
      setStates(data);
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const fetchDistrictsForState = async (stateId, setDataCallback) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/districts?stateId=${stateId}`);
      if (!response.ok) throw new Error("Failed to fetch districts");
      const data = await response.json();
      setDataCallback(data);
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPrabharis = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        level: "TEHSIL",
        page: currentPage,
        limit: 10,
      });
      if (debouncedSearch) params.append("search", debouncedSearch);
      if (selectedDistrict) params.append("districtId", selectedDistrict);
      else if (selectedState) params.append("stateId", selectedState);

      const response = await fetch(`/api/prabharis?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch prabharis");
      const data = await response.json();

      setPrabharis(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      stateId: "",
      districtId: "",
      tehsilName: "",
      name: "",
      phone: "",
      email: "",
    });
    setEditingPrabhari(null);
    setIsModalOpen(false);
  };

  const handleOpenAdd = () => {
    setEditingPrabhari(null);
    setFormData({
      stateId: "",
      districtId: "",
      tehsilName: "",
      name: "",
      phone: "",
      email: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prabhari) => {
    setEditingPrabhari(prabhari);
    // Note: We need to pre-fill stateId and districtId.
    // This requires a fetch or passing more data in the prabhari object.
    // For now, we only pre-fill what we have.
    setFormData({
      stateId: "", // You will need to fetch/set this
      districtId: "", // You will need to fetch/set this
      tehsilName: prabhari.tehsilName,
      name: prabhari.name,
      phone: prabhari.phone,
      email: prabhari.email || "",
    });
    setIsModalOpen(true);
  };

  // Function to find or create Tehsil and return its ID
  const getTehsilId = async () => {
    if (!formData.tehsilName || !formData.districtId) {
      throw new Error("District and Tehsil name are required.");
    }

    const response = await fetch("/api/tehsils", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.tehsilName,
        districtId: formData.districtId,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to create/find tehsil");
    return data.id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormLoading(true);

    try {
      const tehsilId = await getTehsilId();

      const prabhariData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        level: "TEHSIL",
        unitId: tehsilId,
      };

      let response;
      if (editingPrabhari) {
        // Update existing prabhari
        prabhariData.tehsilId = tehsilId; // Send tehsilId for PUT
        response = await fetch(`/api/prabharis/${editingPrabhari.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(prabhariData),
        });
      } else {
        // Create new prabhari
        response = await fetch("/api/prabharis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(prabhariData),
        });
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      showToast(`Prabhari ${editingPrabhari ? "updated" : "added"} successfully!`, "success");
      resetForm();
      fetchPrabharis(); // Refresh table
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!showConfirmation("Are you sure you want to delete this prabhari?")) return;

    try {
      const response = await fetch(`/api/prabharis/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      showToast("Prabhari deleted successfully", "success");
      fetchPrabharis(); // Refresh table
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  return (
    <div className="p-5 font-sans">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "" })} />
      
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Tehsil Prabhari Management</h1>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition"
        >
          <Plus size={20} />
          Add Prabhari
        </button>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <select
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setCurrentPage(1); // Reset page
          }}
          className="p-2 border rounded-lg"
        >
          <option value="">Filter by State</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
        <select
          value={selectedDistrict}
          onChange={(e) => {
            setSelectedDistrict(e.target.value);
            setCurrentPage(1); // Reset page
          }}
          disabled={!selectedState || isLoading}
          className="p-2 border rounded-lg"
        >
          <option value="">Filter by District</option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </span>
          <input
            type="text"
            placeholder="Search by name, phone, or tehsil..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset page
            }}
            className="w-full p-2 pl-10 border rounded-lg"
          />
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center p-10">
          <Loader2 className="animate-spin" size={48} />
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left font-semibold">Name</th>
                <th className="p-3 text-left font-semibold">Phone</th>
                <th className="p-3 text-left font-semibold">Email</th>
                <th className="p-3 text-left font-semibold">Tehsil</th>
                <th className="p-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prabharis.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-5 text-gray-500">
                    No prabharis found.
                  </td>
                </tr>
              ) : (
                prabharis.map((prabhari) => (
                  <tr key={prabhari.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{prabhari.name}</td>
                    <td className="p-3">{prabhari.phone}</td>
                    <td className="p-3">{prabhari.email || "N/A"}</td>
                    <td className="p-3">{prabhari.tehsilName}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleOpenEdit(prabhari)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                        aria-label="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(prabhari.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-full ml-2"
                        aria-label="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-5">
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-semibold">
                  {editingPrabhari ? "Edit" : "Add"} Tehsil Prabhari
                </h3>
                <button type="button" onClick={resetForm} className="p-1">
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">State *</label>
                  <select
                    name="stateId"
                    value={formData.stateId}
                    onChange={handleFormChange}
                    required
                    className="w-full p-2 border rounded-lg"
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
                  <label className="block text-sm font-medium mb-1">District *</label>
                  <select
                    name="districtId"
                    value={formData.districtId}
                    onChange={handleFormChange}
                    required
                    disabled={!formData.stateId}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select District</option>
                    {formDistricts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tehsil Name *</label>
                  <input
                    name="tehsilName"
                    placeholder="Enter tehsil name"
                    value={formData.tehsilName}
                    onChange={handleFormChange}
                    required
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Prabhari Name *</label>
                  <input
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number *</label>
                  <input
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email (Optional)</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
              <div className="flex justify-end p-4 border-t gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isFormLoading}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
                >
                  {isFormLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    editingPrabhari ? "Update" : "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}