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

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] =
    useState(false);

  const [exporting, setExporting] =
    useState(false);

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

  const [searchInput, setSearchInput] =
    useState("");

  const [search, setSearch] =
    useState("");

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

  const [pageSize] =
    useState(50);

  const [total, setTotal] =
    useState(0);

  const [filteredTotal, setFilteredTotal] =
    useState(0);

  const [totalPages, setTotalPages] =
    useState(1);

  /*
  |--------------------------------------------------------------------------
  | DETAIL MODAL
  |--------------------------------------------------------------------------
  */

  const [selectedRegistration, setSelectedRegistration] =
    useState(null);

  /*
  |--------------------------------------------------------------------------
  | FILTER PANEL
  |--------------------------------------------------------------------------
  */

  const [showFilters, setShowFilters] =
    useState(false);

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

  const fetchStates = useCallback(
    async () => {
      try {
        const response =
          await fetch(
            "/api/states",
            {
              credentials:
                "include",
              cache: "no-store",
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch states"
          );
        }

        const data =
          await response.json();

        /*
         * Supports:
         *
         * [...]
         *
         * OR
         *
         * { data: [...] }
         */

        setStates(
          Array.isArray(data)
            ? data
            : data.data || []
        );
      } catch (err) {
        console.error(
          "State fetch error:",
          err
        );

        setError(
          err.message ||
            "Failed to load states"
        );
      }
    },
    []
  );

  /*
  |--------------------------------------------------------------------------
  | FETCH DISTRICTS
  |--------------------------------------------------------------------------
  */

  const fetchDistricts =
    useCallback(
      async (stateId) => {
        if (!stateId) {
          setDistricts([]);
          return;
        }

        setLocationLoading(true);

        try {
          const response =
            await fetch(
              `/api/districts?stateId=${encodeURIComponent(
                stateId
              )}`,
              {
                credentials:
                  "include",
                cache: "no-store",
              }
            );

          if (!response.ok) {
            throw new Error(
              "Failed to fetch districts"
            );
          }

          const data =
            await response.json();

          setDistricts(
            Array.isArray(data)
              ? data
              : data.data || []
          );
        } catch (err) {
          console.error(
            "District fetch error:",
            err
          );

          setError(
            err.message ||
              "Failed to load districts"
          );
        } finally {
          setLocationLoading(false);
        }
      },
      []
    );

  /*
  |--------------------------------------------------------------------------
  | FETCH TEHSILS
  |--------------------------------------------------------------------------
  */

  const fetchTehsils =
    useCallback(
      async (districtId) => {
        if (!districtId) {
          setTehsils([]);
          return;
        }

        setLocationLoading(true);

        try {
          const response =
            await fetch(
              `/api/tehsils?districtId=${encodeURIComponent(
                districtId
              )}`,
              {
                credentials:
                  "include",
                cache: "no-store",
              }
            );

          if (!response.ok) {
            throw new Error(
              "Failed to fetch tehsils"
            );
          }

          const data =
            await response.json();

          setTehsils(
            Array.isArray(data)
              ? data
              : data.data || []
          );
        } catch (err) {
          console.error(
            "Tehsil fetch error:",
            err
          );

          setError(
            err.message ||
              "Failed to load tehsils"
          );
        } finally {
          setLocationLoading(false);
        }
      },
      []
    );

  /*
  |--------------------------------------------------------------------------
  | FETCH REGISTRATIONS
  |--------------------------------------------------------------------------
  */

  const fetchRegistrations =
    useCallback(
      async (
        customPage = page,
        customSearch = search,
        customFilters = filters
      ) => {
        setLoading(true);
        clearMessages();

        try {
          const params =
            new URLSearchParams();

          params.set(
            "page",
            String(customPage)
          );

          params.set(
            "limit",
            String(pageSize)
          );

          if (
            customSearch.trim()
          ) {
            params.set(
              "search",
              customSearch.trim()
            );
          }

          if (
            customFilters.stateId
          ) {
            params.set(
              "stateId",
              customFilters.stateId
            );
          }

          if (
            customFilters.districtId
          ) {
            params.set(
              "districtId",
              customFilters.districtId
            );
          }

          if (
            customFilters.tehsilId
          ) {
            params.set(
              "tehsilId",
              customFilters.tehsilId
            );
          }

          const response =
            await fetch(
              `/api/protest-registration?${params.toString()}`,
              {
                method: "GET",
                credentials:
                  "include",
                cache: "no-store",
              }
            );

          const data =
            await response.json();

          if (!response.ok) {
            throw new Error(
              data.error ||
                data.message ||
                "Failed to fetch registrations"
            );
          }

          setRegistrations(
            data.data || []
          );

          setTotal(
            data.total || 0
          );

          setFilteredTotal(
            data.filteredTotal || 0
          );

          setTotalPages(
            data.totalPages || 1
          );
        } catch (err) {
          console.error(
            "Registration fetch error:",
            err
          );

          setError(
            err.message ||
              "Failed to load registrations"
          );
        } finally {
          setLoading(false);
        }
      },
      [
        page,
        search,
        filters,
        pageSize,
      ]
    );

  /*
  |--------------------------------------------------------------------------
  | INITIAL LOAD
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  /*
  |--------------------------------------------------------------------------
  | LOAD REGISTRATIONS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchRegistrations();
  }, [page, search, filters]);

  /*
  |--------------------------------------------------------------------------
  | STATE CHANGE
  |--------------------------------------------------------------------------
  */

  const handleStateChange = async (
    stateId
  ) => {
    setFilters({
      stateId,
      districtId: "",
      tehsilId: "",
    });

    setDistricts([]);
    setTehsils([]);

    setPage(1);

    if (stateId) {
      await fetchDistricts(
        stateId
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | DISTRICT CHANGE
  |--------------------------------------------------------------------------
  */

  const handleDistrictChange =
    async (districtId) => {
      setFilters((prev) => ({
        ...prev,
        districtId,
        tehsilId: "",
      }));

      setTehsils([]);

      setPage(1);<Image src="/logo.jpg" alt="गौ सम्मान लोगो" width={56} height={56} className="rounded-full object-cover" priority />

      if (districtId) {
        await fetchTehsils(
          districtId
        );
      }
    };

  /*
  |--------------------------------------------------------------------------
  | TEHSIL CHANGE
  |--------------------------------------------------------------------------
  */

  const handleTehsilChange = (
    tehsilId
  ) => {
    setFilters((prev) => ({
      ...prev,
      tehsilId,
    }));

    setPage(1);
  };

  /*
  |--------------------------------------------------------------------------
  | SEARCH
  |--------------------------------------------------------------------------
  */

  const handleSearch = () => {
    setPage(1);
    setSearch(
      searchInput.trim()
    );
  };

  /*
  |--------------------------------------------------------------------------
  | SEARCH ENTER
  |--------------------------------------------------------------------------
  */

  const handleSearchKeyDown = (
    event
  ) => {
    if (
      event.key === "Enter"
    ) {
      handleSearch();
    }
  };

  /*
  |--------------------------------------------------------------------------
  | RESET
  |--------------------------------------------------------------------------
  */

  const resetFilters = () => {
    setSearchInput("");
    setSearch("");

    setFilters({
      stateId: "",
      districtId: "",
      tehsilId: "",
    });

    setDistricts([]);
    setTehsils([]);

    setPage(1);
  };

  /*
  |--------------------------------------------------------------------------
  | REFRESH
  |--------------------------------------------------------------------------
  */

  const handleRefresh = () => {
    fetchRegistrations();
  };

  /*
  |--------------------------------------------------------------------------
  | GET LOCATION NAME
  |--------------------------------------------------------------------------
  */

  const getStateName = (id) => {
    return (
      states.find(
        (state) =>
          state.id === id
      )?.name || ""
    );
  };

  const getDistrictName = (
    id
  ) => {
    return (
      districts.find(
        (district) =>
          district.id === id
      )?.name || ""
    );
  };

  const getTehsilName = (
    id
  ) => {
    return (
      tehsils.find(
        (tehsil) =>
          tehsil.id === id
      )?.name || ""
    );
  };

  /*
  |--------------------------------------------------------------------------
  | FILTER SUMMARY
  |--------------------------------------------------------------------------
  */

  const activeFilterCount =
    useMemo(() => {
      return Object.values(
        filters
      ).filter(Boolean).length;
    }, [filters]);

  /*
  |--------------------------------------------------------------------------
  | PDF EXPORT
  |--------------------------------------------------------------------------
  */

  const exportPDF = async () => {
    setExporting(true);
    clearMessages();

    try {
      /*
      |--------------------------------------------------------------------------
      | Fetch ALL filtered records
      |--------------------------------------------------------------------------
      |
      | Current screen only has 50 records.
      | For PDF we fetch all filtered records.
      |
      |--------------------------------------------------------------------------
      */

      const params =
        new URLSearchParams();

      params.set(
        "page",
        "1"
      );

      /*
       * Maximum API page size is 100.
       * We fetch all pages.
       */

      params.set(
        "limit",
        "100"
      );

      if (search.trim()) {
        params.set(
          "search",
          search.trim()
        );
      }

      if (filters.stateId) {
        params.set(
          "stateId",
          filters.stateId
        );
      }

      if (filters.districtId) {
        params.set(
          "districtId",
          filters.districtId
        );
      }

      if (filters.tehsilId) {
        params.set(
          "tehsilId",
          filters.tehsilId
        );
      }

      const firstResponse =
        await fetch(
          `/api/protest-registration?${params.toString()}`,
          {
            credentials:
              "include",
            cache: "no-store",
          }
        );

      const firstData =
        await firstResponse.json();

      if (!firstResponse.ok) {
        throw new Error(
          firstData.error ||
            "Failed to fetch export data"
        );
      }

      let allData =
        firstData.data || [];

      const pages =
        firstData.totalPages || 1;

      /*
      |--------------------------------------------------------------------------
      | Fetch remaining pages
      |--------------------------------------------------------------------------
      */

      for (
        let currentPage = 2;
        currentPage <= pages;
        currentPage++
      ) {
        const pageParams =
          new URLSearchParams(
            params
          );

        pageParams.set(
          "page",
          String(currentPage)
        );

        const response =
          await fetch(
            `/api/protest-registration?${pageParams.toString()}`,
            {
              credentials:
                "include",
              cache: "no-store",
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Failed to fetch export data"
          );
        }

        allData = [
          ...allData,
          ...(data.data || []),
        ];
      }

      if (
        allData.length === 0
      ) {
        throw new Error(
          "No registrations found for the selected filters."
        );
      }

      /*
      |--------------------------------------------------------------------------
      | IMPORT JSPDF
      |--------------------------------------------------------------------------
      */

      const jsPDF =
        (
          await import(
            "jspdf"
          )
        ).default;

      const autoTable =
        (
          await import(
            "jspdf-autotable"
          )
        ).default;

      /*
      |--------------------------------------------------------------------------
      | CREATE PDF
      |--------------------------------------------------------------------------
      */

      const doc =
        new jsPDF({
          orientation:
            "landscape",
          unit: "mm",
          format: "a4",
        });

      /*
      |--------------------------------------------------------------------------
      | HEADER
      |--------------------------------------------------------------------------
      */

      doc.setFontSize(
        18
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.text(
        "Cow Protection Protest Registration",
        148,
        15,
        {
          align: "center",
        }
      );

      doc.setFontSize(
        10
      );

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.text(
        `Generated: ${new Date().toLocaleString(
          "en-IN"
        )}`,
        148,
        22,
        {
          align: "center",
        }
      );

      /*
      |--------------------------------------------------------------------------
      | FILTER INFORMATION
      |--------------------------------------------------------------------------
      */

      let filterText =
        "Filters: ";

      const filterParts =
        [];

      if (
        filters.stateId
      ) {
        filterParts.push(
          `State: ${getStateName(
            filters.stateId
          )}`
        );
      }

      if (
        filters.districtId
      ) {
        filterParts.push(
          `District: ${getDistrictName(
            filters.districtId
          )}`
        );
      }

      if (
        filters.tehsilId
      ) {
        filterParts.push(
          `Tehsil: ${getTehsilName(
            filters.tehsilId
          )}`
        );
      }

      if (search) {
        filterParts.push(
          `Search: ${search}`
        );
      }

      if (
        filterParts.length === 0
      ) {
        filterText +=
          "All registrations";
      } else {
        filterText +=
          filterParts.join(
            " | "
          );
      }

      doc.setFontSize(
        9
      );

      doc.text(
        filterText,
        14,
        30
      );

      /*
      |--------------------------------------------------------------------------
      | TABLE DATA
      |--------------------------------------------------------------------------
      */

      const rows =
        allData.map(
          (item, index) => [
            index + 1,

            item.name || "-",

            item.phone || "-",

            item.state?.name ||
              "-",

            item.district
              ?.name || "-",

            item.tehsil
              ?.name || "-",

            item.registration
              ?.language || "-",

            item.registration
              ?.wantsToAttendCapital
              ? "Yes"
              : "No",

            item.createdAt
              ? new Date(
                  item.createdAt
                ).toLocaleDateString(
                  "en-IN"
                )
              : "-",
          ]
        );

      /*
      |--------------------------------------------------------------------------
      | TABLE
      |--------------------------------------------------------------------------
      */

      autoTable(
        doc,
        {
          startY: 36,

          head: [
            [
              "#",
              "Name",
              "Phone",
              "State",
              "District",
              "Tehsil",
              "Language",
              "Capital Protest",
              "Registered",
            ],
          ],

          body: rows,

          theme:
            "grid",

          styles: {
            fontSize: 7,
            cellPadding: 2,
            valign: "middle",
          },

          headStyles: {
            fontStyle:
              "bold",
          },

          columnStyles: {
            0: {
              cellWidth: 8,
            },

            1: {
              cellWidth: 35,
            },

            2: {
              cellWidth: 25,
            },

            3: {
              cellWidth: 35,
            },

            4: {
              cellWidth: 30,
            },

            5: {
              cellWidth: 30,
            },

            6: {
              cellWidth: 18,
            },

            7: {
              cellWidth: 25,
            },

            8: {
              cellWidth: 25,
            },
          },

          didDrawPage:
            (data) => {
              doc.setFontSize(
                8
              );

              doc.text(
                `Total registrations: ${allData.length}`,
                14,
                doc.internal
                  .pageSize
                  .height - 8
              );

              doc.text(
                `Page ${data.pageNumber}`,
                285,
                doc.internal
                  .pageSize
                  .height - 8,
                {
                  align:
                    "right",
                }
              );
            },
        }
      );

      /*
      |--------------------------------------------------------------------------
      | SAVE
      |--------------------------------------------------------------------------
      */

      const date =
        new Date()
          .toISOString()
          .split("T")[0];

      doc.save(
        `protest-registrations-${date}.pdf`
      );

      showSuccess(
        `PDF exported successfully (${allData.length} registrations).`
      );
    } catch (err) {
      console.error(
        "PDF export error:",
        err
      );

      setError(
        err.message ||
          "Failed to export PDF."
      );
    } finally {
      setExporting(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | FORMAT DATE
  |--------------------------------------------------------------------------
  */

  const formatDate = (
    date
  ) => {
    if (!date) {
      return "-";
    }

    return new Date(
      date
    ).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f9f1] via-[#fffdf5] to-[#eef8ed] p-3 sm:p-5 lg:p-8">

      <div className="max-w-[1600px] mx-auto">

        {/* ================================================================
            HEADER
        ================================================================ */}

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-green-100 overflow-hidden mb-5">

          <div className="bg-gradient-to-r from-green-800 via-green-700 to-emerald-700 p-5 sm:p-7">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

              <div className="flex items-start gap-4">

                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">

                  <ShieldCheck
                    size={28}
                    className="text-white"
                  />

                </div>

                <div>

                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">

                    Protest Registrations

                  </h1>

                  <p className="text-green-100 mt-1 text-sm sm:text-base">

                    View, search and manage registered participants

                  </p>

                </div>

              </div>

              <div className="flex flex-wrap gap-2">

                <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm">

                  <span className="text-green-200">
                    Total
                  </span>

                  <span className="font-bold ml-2">
                    {total.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

                <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm">

                  <span className="text-green-200">
                    Filtered
                  </span>

                  <span className="font-bold ml-2">
                    {filteredTotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================================================================
            MESSAGES
        ================================================================ */}

        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl font-semibold flex items-center gap-2">

            <ShieldCheck
              size={18}
            />

            {success}

          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl font-semibold flex items-start gap-3">

            <X
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>
              {error}
            </span>

          </div>
        )}


        {/* ================================================================
            SEARCH + ACTION BAR
        ================================================================ */}

        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-4 mb-5">

          <div className="flex flex-col xl:flex-row gap-3">

            {/* SEARCH */}

            <div className="relative flex-1">

              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={
                  searchInput
                }
                onChange={(e) =>
                  setSearchInput(
                    e.target.value
                  )
                }
                onKeyDown={
                  handleSearchKeyDown
                }
                placeholder="Search by participant name or mobile number..."
                className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-gray-200 focus:border-green-600 focus:ring-4 focus:ring-green-100 outline-none transition-all text-gray-800"
              />

            </div>

            {/* SEARCH BUTTON */}

            <button
              onClick={
                handleSearch
              }
              className="h-12 px-6 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold flex items-center justify-center gap-2 transition-all"
            >

              <Search
                size={18}
              />

              Search

            </button>

            {/* FILTER */}

            <button
              onClick={() =>
                setShowFilters(
                  (prev) =>
                    !prev
                )
              }
              className={`h-12 px-5 rounded-xl border-2 font-bold flex items-center justify-center gap-2 transition-all ${
                showFilters
                  ? "bg-green-50 border-green-600 text-green-800"
                  : "bg-white border-gray-200 text-gray-700 hover:border-green-400"
              }`}
            >

              <Filter
                size={18}
              />

              Filters

              {activeFilterCount >
                0 && (
                <span className="w-6 h-6 rounded-full bg-green-700 text-white text-xs flex items-center justify-center">
                  {
                    activeFilterCount
                  }
                </span>
              )}

            </button>

            {/* REFRESH */}

            <button
              onClick={
                handleRefresh
              }
              disabled={loading}
              className="h-12 px-5 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            >

              <RefreshCw
                size={18}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />

              <span className="hidden sm:inline">
                Refresh
              </span>

            </button>

            {/* PDF */}

            <button
              onClick={
                exportPDF
              }
              disabled={
                exporting ||
                filteredTotal === 0
              }
              className="h-12 px-5 rounded-xl bg-gradient-to-r from-emerald-700 to-green-700 hover:from-emerald-800 hover:to-green-800 text-white font-bold flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >

              {exporting ? (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <Download
                  size={18}
                />
              )}

              <span>
                {exporting
                  ? "Exporting..."
                  : "Export PDF"}
              </span>

            </button>

          </div>


          {/* ================================================================
              FILTERS
          ================================================================ */}

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                {/* STATE */}

                <div>

                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">

                    State

                  </label>

                  <select
                    value={
                      filters.stateId
                    }
                    onChange={(e) =>
                      handleStateChange(
                        e.target
                          .value
                      )
                    }
                    className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100 outline-none font-medium text-gray-700"
                  >

                    <option value="">
                      All States
                    </option>

                    {states.map(
                      (state) => (
                        <option
                          key={
                            state.id
                          }
                          value={
                            state.id
                          }
                        >
                          {
                            state.name
                          }
                        </option>
                      )
                    )}

                  </select>

                </div>


                {/* DISTRICT */}

                <div>

                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">

                    District

                  </label>

                  <select
                    value={
                      filters.districtId
                    }
                    onChange={(e) =>
                      handleDistrictChange(
                        e.target
                          .value
                      )
                    }
                    disabled={
                      !filters.stateId ||
                      locationLoading
                    }
                    className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100 outline-none font-medium text-gray-700 disabled:bg-gray-100 disabled:text-gray-400"
                  >

                    <option value="">
                      {filters.stateId
                        ? "All Districts"
                        : "Select State First"}
                    </option>

                    {districts.map(
                      (district) => (
                        <option
                          key={
                            district.id
                          }
                          value={
                            district.id
                          }
                        >
                          {
                            district.name
                          }
                        </option>
                      )
                    )}

                  </select>

                </div>


                {/* TEHSIL */}

                <div>

                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">

                    Tehsil

                  </label>

                  <select
                    value={
                      filters.tehsilId
                    }
                    onChange={(e) =>
                      handleTehsilChange(
                        e.target
                          .value
                      )
                    }
                    disabled={
                      !filters.districtId ||
                      locationLoading
                    }
                    className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100 outline-none font-medium text-gray-700 disabled:bg-gray-100 disabled:text-gray-400"
                  >

                    <option value="">
                      {filters.districtId
                        ? "All Tehsils"
                        : "Select District First"}
                    </option>

                    {tehsils.map(
                      (tehsil) => (
                        <option
                          key={
                            tehsil.id
                          }
                          value={
                            tehsil.id
                          }
                        >
                          {
                            tehsil.name
                          }
                        </option>
                      )
                    )}

                  </select>

                </div>

              </div>


              {/* ACTIVE FILTER SUMMARY */}

              <div className="flex flex-wrap items-center gap-2 mt-4">

                {filters.stateId && (
                  <span className="px-3 py-1.5 bg-green-50 text-green-800 border border-green-200 rounded-lg text-xs font-semibold">

                    State:{" "}
                    {
                      getStateName(
                        filters.stateId
                      )
                    }

                  </span>
                )}

                {filters.districtId && (
                  <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold">

                    District:{" "}
                    {
                      getDistrictName(
                        filters.districtId
                      )
                    }

                  </span>
                )}

                {filters.tehsilId && (
                  <span className="px-3 py-1.5 bg-lime-50 text-lime-800 border border-lime-200 rounded-lg text-xs font-semibold">

                    Tehsil:{" "}
                    {
                      getTehsilName(
                        filters.tehsilId
                      )
                    }

                  </span>
                )}

                {(activeFilterCount >
                  0 ||
                  search) && (
                  <button
                    onClick={
                      resetFilters
                    }
                    className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-xs font-bold flex items-center gap-1"
                  >

                    <X
                      size={14}
                    />

                    Clear all

                  </button>
                )}

              </div>

            </div>
          )}

        </div>


        {/* ================================================================
            STATS
        ================================================================ */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">

          <div className="bg-white rounded-2xl border border-green-100 shadow-md p-4">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">

                <Users
                  size={20}
                  className="text-green-700"
                />

              </div>

              <div>

                <p className="text-xs text-gray-500 font-semibold">
                  Total
                </p>

                <p className="text-xl font-black text-gray-800">
                  {total.toLocaleString(
                    "en-IN"
                  )}
                </p>

              </div>

            </div>

          </div>


          <div className="bg-white rounded-2xl border border-green-100 shadow-md p-4">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">

                <Filter
                  size={20}
                  className="text-emerald-700"
                />

              </div>

              <div>

                <p className="text-xs text-gray-500 font-semibold">
                  Filtered
                </p>

                <p className="text-xl font-black text-gray-800">
                  {filteredTotal.toLocaleString(
                    "en-IN"
                  )}
                </p>

              </div>

            </div>

          </div>


          <div className="bg-white rounded-2xl border border-green-100 shadow-md p-4">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-lime-100 flex items-center justify-center">

                <MapPin
                  size={20}
                  className="text-lime-700"
                />

              </div>

              <div>

                <p className="text-xs text-gray-500 font-semibold">
                  Current Page
                </p>

                <p className="text-xl font-black text-gray-800">
                  {
                    registrations.length
                  }
                </p>

              </div>

            </div>

          </div>


          <div className="bg-white rounded-2xl border border-green-100 shadow-md p-4">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">

                <FileText
                  size={20}
                  className="text-yellow-700"
                />

              </div>

              <div>

                <p className="text-xs text-gray-500 font-semibold">
                  Page
                </p>

                <p className="text-xl font-black text-gray-800">
                  {page} /{" "}
                  {totalPages}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ================================================================
            DATA TABLE
        ================================================================ */}

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-green-100 overflow-hidden">

          <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            <div>

              <h2 className="font-black text-gray-800 text-lg">

                Registered Participants

              </h2>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">

                Showing{" "}
                {
                  registrations.length
                }{" "}
                of{" "}
                {
                  filteredTotal
                }{" "}
                filtered registrations

              </p>

            </div>

            {loading && (
              <div className="flex items-center gap-2 text-green-700 text-sm font-semibold">

                <Loader2
                  size={17}
                  className="animate-spin"
                />

                Loading...

              </div>
            )}

          </div>


          {loading ? (

            <div className="py-20 flex flex-col items-center justify-center">

              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-4">

                <Loader2
                  size={28}
                  className="text-green-700 animate-spin"
                />

              </div>

              <p className="font-semibold text-gray-600">
                Loading registrations...
              </p>

            </div>

          ) : registrations.length ===
            0 ? (

            <div className="py-20 text-center px-5">

              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">

                <Users
                  size={30}
                  className="text-gray-400"
                />

              </div>

              <h3 className="font-bold text-gray-700 text-lg">
                No registrations found
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                Try changing your search or filters.
              </p>

            </div>

          ) : (

            <>
              {/* DESKTOP TABLE */}

              <div className="hidden lg:block overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="bg-green-50 border-b border-green-100">

                      <th className="px-5 py-4 text-left text-xs font-black text-green-900 uppercase tracking-wide">
                        #
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-black text-green-900 uppercase tracking-wide">
                        Participant
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-black text-green-900 uppercase tracking-wide">
                        Phone
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-black text-green-900 uppercase tracking-wide">
                        State
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-black text-green-900 uppercase tracking-wide">
                        District
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-black text-green-900 uppercase tracking-wide">
                        Tehsil
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-black text-green-900 uppercase tracking-wide">
                        Registered
                      </th>

                      <th className="px-5 py-4 text-center text-xs font-black text-green-900 uppercase tracking-wide">
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {registrations.map(
                      (
                        item,
                        index
                      ) => (

                        <tr
                          key={
                            item.id
                          }
                          className="border-b border-gray-100 hover:bg-green-50/50 transition-colors"
                        >

                          <td className="px-5 py-4 text-sm font-bold text-gray-500">

                            {(
                              page -
                              1
                            ) *
                              pageSize +
                              index +
                              1}

                          </td>

                          <td className="px-5 py-4">

                            <div className="flex items-center gap-3">

                              <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">

                                <UserRound
                                  size={
                                    17
                                  }
                                  className="text-green-700"
                                />

                              </div>

                              <div>

                                <p className="font-bold text-gray-800">
                                  {
                                    item.name
                                  }
                                </p>

                                <p className="text-xs text-gray-400">
                                  #
                                  {
                                    item.id
                                  }
                                </p>

                              </div>

                            </div>

                          </td>

                          <td className="px-5 py-4">

                            <div className="flex items-center gap-2 text-gray-700 text-sm">

                              <Phone
                                size={
                                  15
                                }
                                className="text-green-600"
                              />

                              {
                                item.phone
                              }

                            </div>

                          </td>

                          <td className="px-5 py-4 text-sm text-gray-700 font-medium">

                            {
                              item
                                .state
                                ?.name ||
                              "-"
                            }

                          </td>

                          <td className="px-5 py-4 text-sm text-gray-700 font-medium">

                            {
                              item
                                .district
                                ?.name ||
                              "-"
                            }

                          </td>

                          <td className="px-5 py-4 text-sm text-gray-700 font-medium">

                            {
                              item
                                .tehsil
                                ?.name ||
                              "-"
                            }

                          </td>

                          <td className="px-5 py-4 text-sm text-gray-500">

                            {
                              formatDate(
                                item.createdAt
                              )
                            }

                          </td>

                          <td className="px-5 py-4 text-center">

                            <button
                              onClick={() =>
                                setSelectedRegistration(
                                  item
                                )
                              }
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-800 font-bold text-sm"
                            >

                              <Eye
                                size={
                                  16
                                }
                              />

                              View

                            </button>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>


              {/* MOBILE / TABLET CARDS */}

              <div className="lg:hidden divide-y divide-gray-100">

                {registrations.map(
                  (
                    item,
                    index
                  ) => (

                    <div
                      key={
                        item.id
                      }
                      className="p-4 sm:p-5"
                    >

                      <div className="flex items-start justify-between gap-3">

                        <div className="flex items-start gap-3">

                          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">

                            <UserRound
                              size={
                                18
                              }
                              className="text-green-700"
                            />

                          </div>

                          <div>

                            <h3 className="font-black text-gray-800">

                              {
                                item.name
                              }

                            </h3>

                            <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">

                              <Phone
                                size={
                                  14
                                }
                              />

                              {
                                item.phone
                              }

                            </div>

                          </div>

                        </div>

                        <span className="text-xs text-gray-400 font-bold">

                          #
                          {(
                            page -
                            1
                          ) *
                            pageSize +
                            index +
                            1}

                        </span>

                      </div>


                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">

                        <div className="bg-gray-50 rounded-xl p-3">

                          <p className="text-[10px] uppercase font-bold text-gray-400">
                            State
                          </p>

                          <p className="text-sm font-semibold text-gray-700 mt-1">
                            {
                              item
                                .state
                                ?.name ||
                              "-"
                            }
                          </p>

                        </div>

                        <div className="bg-gray-50 rounded-xl p-3">

                          <p className="text-[10px] uppercase font-bold text-gray-400">
                            District
                          </p>

                          <p className="text-sm font-semibold text-gray-700 mt-1">
                            {
                              item
                                .district
                                ?.name ||
                              "-"
                            }
                          </p>

                        </div>

                        <div className="bg-gray-50 rounded-xl p-3">

                          <p className="text-[10px] uppercase font-bold text-gray-400">
                            Tehsil
                          </p>

                          <p className="text-sm font-semibold text-gray-700 mt-1">
                            {
                              item
                                .tehsil
                                ?.name ||
                              "-"
                            }
                          </p>

                        </div>

                      </div>


                      <div className="flex items-center justify-between mt-4">

                        <div className="text-xs text-gray-400">

                          {
                            formatDate(
                              item.createdAt
                            )
                          }

                        </div>

                        <button
                          onClick={() =>
                            setSelectedRegistration(
                              item
                            )
                          }
                          className="px-4 py-2 rounded-xl bg-green-700 text-white text-sm font-bold flex items-center gap-2"
                        >

                          <Eye
                            size={
                              15
                            }
                          />

                          View

                        </button>

                      </div>

                    </div>

                  )
                )}

              </div>

            </>

          )}


          {/* ================================================================
              PAGINATION
          ================================================================ */}

          {totalPages >
            1 && (
            <div className="px-4 sm:px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">

              <p className="text-sm text-gray-500">

                Page{" "}
                <span className="font-bold text-gray-800">
                  {page}
                </span>{" "}
                of{" "}
                <span className="font-bold text-gray-800">
                  {totalPages}
                </span>

              </p>

              <div className="flex items-center gap-2">

                <button
                  disabled={
                    page <=
                    1
                  }
                  onClick={() =>
                    setPage(
                      (prev) =>
                        Math.max(
                          1,
                          prev -
                            1
                        )
                    )
                  }
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-green-50 hover:border-green-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >

                  <ChevronLeft
                    size={
                      18
                    }
                  />

                </button>

                <div className="px-4 h-10 rounded-xl bg-green-50 text-green-800 font-bold flex items-center justify-center">

                  {page}

                </div>

                <button
                  disabled={
                    page >=
                    totalPages
                  }
                  onClick={() =>
                    setPage(
                      (prev) =>
                        Math.min(
                          totalPages,
                          prev +
                            1
                        )
                    )
                  }
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-green-50 hover:border-green-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >

                  <ChevronRight
                    size={
                      18
                    }
                  />

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
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
          onClick={() =>
            setSelectedRegistration(
              null
            )
          }
        >

          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 bg-gradient-to-r from-green-800 to-emerald-700 px-5 sm:px-6 py-5 text-white">

              <div className="flex items-center justify-between gap-3">

                <div>

                  <p className="text-green-200 text-xs font-bold uppercase tracking-wider">
                    Registration Details
                  </p>

                  <h2 className="text-xl sm:text-2xl font-black mt-1">
                    {
                      selectedRegistration.name
                    }
                  </h2>

                </div>

                <button
                  onClick={() =>
                    setSelectedRegistration(
                      null
                    )
                  }
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center"
                >

                  <X
                    size={
                      20
                    }
                  />

                </button>

              </div>

            </div>


            {/* MODAL BODY */}

            <div className="p-5 sm:p-6">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {/* NAME */}

                <DetailCard
                  icon={
                    <UserRound
                      size={
                        18
                      }
                    />
                  }
                  label="Name"
                  value={
                    selectedRegistration.name
                  }
                />

                {/* PHONE */}

                <DetailCard
                  icon={
                    <Phone
                      size={
                        18
                      }
                    />
                  }
                  label="Phone"
                  value={
                    selectedRegistration.phone
                  }
                />

                {/* STATE */}

                <DetailCard
                  icon={
                    <MapPin
                      size={
                        18
                      }
                    />
                  }
                  label="State"
                  value={
                    selectedRegistration
                      .state
                      ?.name ||
                    "-"
                  }
                />

                {/* DISTRICT */}

                <DetailCard
                  icon={
                    <MapPin
                      size={
                        18
                      }
                    />
                  }
                  label="District"
                  value={
                    selectedRegistration
                      .district
                      ?.name ||
                    "-"
                  }
                />

                {/* TEHSIL */}

                <DetailCard
                  icon={
                    <MapPin
                      size={
                        18
                      }
                    />
                  }
                  label="Tehsil"
                  value={
                    selectedRegistration
                      .tehsil
                      ?.name ||
                    "-"
                  }
                />

                {/* LANGUAGE */}

                <DetailCard
                  icon={
                    <FileText
                      size={
                        18
                      }
                    />
                  }
                  label="Language"
                  value={
                    selectedRegistration
                      .registration
                      ?.language ||
                    "-"
                  }
                />

                {/* CAPITAL */}

                <DetailCard
                  icon={
                    <ShieldCheck
                      size={
                        18
                      }
                    />
                  }
                  label="Capital Protest"
                  value={
                    selectedRegistration
                      .registration
                      ?.wantsToAttendCapital
                      ? "Confirmed"
                      : "Not confirmed"
                  }
                />

                {/* CREATED */}

                <DetailCard
                  icon={
                    <CalendarDays
                      size={
                        18
                      }
                    />
                  }
                  label="Registered On"
                  value={formatDate(
                    selectedRegistration
                      .registration
                      ?.createdAt ||
                      selectedRegistration.createdAt
                  )}
                />

              </div>


              {/* REGISTRATION ID */}

              <div className="mt-4 p-4 rounded-2xl bg-green-50 border border-green-100">

                <p className="text-xs font-bold uppercase text-green-600">
                  Registration ID
                </p>

                <p className="font-black text-green-900 mt-1">
                  #
                  {
                    selectedRegistration
                      .registration
                      ?.id
                  }
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

function DetailCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">

      <div className="flex items-center gap-2 text-green-700 mb-2">

        {icon}

        <span className="text-xs font-bold uppercase tracking-wide">
          {label}
        </span>

      </div>

      <p className="font-bold text-gray-800 break-words">
        {value || "-"}
      </p>

    </div>
  );
}