import { useMemo, useState } from "react";

export default function useTableData(data, { initialItemsPerPage = 5 } = {}) {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    first_name: "",
    last_name: "",
    email: "",
    department: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const filteredData = useMemo(() => {
    return data
      .filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          value ? String(item[key] ?? "").toLowerCase().includes(value.toLowerCase()) : true
        )
      )
      .filter((item) =>
        searchTerm
          ? Object.values(item).some((val) =>
              String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
          : true
      );
  }, [data, filters, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortField] ?? "";
      const bVal = b[sortField] ?? "";
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortField, sortOrder]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => Math.ceil(sortedData.length / itemsPerPage), [
    sortedData.length,
    itemsPerPage,
  ]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const handleItemsPerPageChange = (n) => {
    setItemsPerPage(n);
    setCurrentPage(1);
  };
  const handleFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return {
    paginatedData,
    totalPages,
    currentPage,
    itemsPerPage,
    sortField,
    sortOrder,
    searchTerm,
    filters,
    handleSort,
    handleSearch,
    handlePrev,
    handleNext,
    handleItemsPerPageChange,
    handleFilters,
  };
}
