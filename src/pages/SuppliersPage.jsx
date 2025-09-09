import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { deleteSupplier } from "../store/slices/suppliersSlice";
import {
  FiSearch,
  FiEye,
  FiTrash2,
  FiFilter,
  FiRotateCw,
  FiChevronDown,
} from "react-icons/fi";
import { FaFilePdf, FaFileExcel } from "react-icons/fa"; // ✅ PDF & Excel icons
import "../styles/SuppliersPage.css";

const SuppliersPage = () => {
  const suppliers = useSelector((state) => state.suppliers?.list || []);
  const dispatch = useDispatch();

  // ✅ States for search & sorting
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");

  // ✅ Filter + Sort
  const filteredSuppliers = useMemo(() => {
    let data = suppliers.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.code.toLowerCase().includes(search.toLowerCase())
    );

    if (sortOrder === "Newest") {
      data = [...data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortOrder === "Oldest") {
      data = [...data].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }

    return data;
  }, [suppliers, search, sortOrder]);

  // ✅ Columns for DataTable
  const columns = [
    {
      name: "Supplier Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="sup-name-cell">
          <img
            src={row.image || "https://via.placeholder.com/40"}
            alt={row.name}
            className="sup-img"
          />
          <span>{row.name}</span>
        </div>
      ),
    },
    {
      name: "Code",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Country",
      selector: (row) => row.country,
    },
    {
      name: "Action",
      right: true,
      cell: (row) => (
        <div className="sup-action-btns">
          {/* View */}
          <button className="sup-btn-icon sup-info">
            <FiEye />
          </button>

          {/* Edit */}
          <button
            className="sup-btn-icon sup-edit"
            onClick={() => alert(`Edit supplier: ${row.name}`)}
          >
            ✏
          </button>

          {/* Delete */}
          <button
            className="sup-btn-icon sup-danger"
            onClick={() => dispatch(deleteSupplier(row.id))}
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="sup-page">
      {/* 🔹 Page Header */}
      <div className="sup-header">
        <div>
          <h4>Supplier List</h4>
          <p>Manage Your Supplier</p>
        </div>
        <div className="sup-header-actions">
          {/* PDF & Excel */}
          <button className="sup-btn-icon sup-pdf">
            <FaFilePdf />
          </button>
          <button className="sup-btn-icon sup-excel">
            <FaFileExcel />
          </button>

          {/* Refresh */}
          <button className="sup-btn-icon">
            <FiRotateCw />
          </button>

          {/* Dropdown */}
          <button className="sup-btn-icon">
            <FiChevronDown />
          </button>

          {/* Add Supplier */}
          <button className="sup-btn-primary">+ Add New Supplier</button>
        </div>
      </div>

      {/* Data Table */}
      <div className="sup-card">
        <div className="sup-card-body">
          {/* 🔍 Search & Filter Controls */}
          <div className="sup-filters">
            {/* Search */}
            <div className="sup-search-box">
              <FiSearch className="sup-search-icon" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="sup-filter-actions">
              <button className="sup-btn-filter">
                <FiFilter />
              </button>
              <select
                className="sup-sort-dropdown"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="Newest">Sort by Date (Newest)</option>
                <option value="Oldest">Sort by Date (Oldest)</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <DataTable
            columns={columns}
            data={filteredSuppliers}
            pagination
            striped
            responsive
            selectableRows // ✅ Adds checkboxes
            selectableRowsHighlight
          />
        </div>
      </div>
    </div>
  );
};

export default SuppliersPage;