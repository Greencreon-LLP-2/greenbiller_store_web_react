// pages/SalesPage.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import { deleteSale } from "../store/slices/salesSlice";
import {
  FiSearch,
  FiEdit,
  FiTrash2,
  FiFilter,
  FiRotateCw,
  FiChevronDown,
} from "react-icons/fi";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import "../styles/SalesPage.css";

const SalesPage = () => {
  const navigate = useNavigate();
  const sales = useSelector((state) => state.sales?.list || []);
  const dispatch = useDispatch();

  // States for search & sorting
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");

  // Filter + Sort
  const filteredSales = useMemo(() => {
    let data = sales.filter(
      (s) =>
        s.saleCode.toLowerCase().includes(search.toLowerCase()) ||
        s.reference.toLowerCase().includes(search.toLowerCase()) ||
        s.customerName.toLowerCase().includes(search.toLowerCase()) ||
        s.createdBy.toLowerCase().includes(search.toLowerCase())
    );

    if (sortOrder === "Newest") {
      data = [...data].sort(
        (a, b) => new Date(b.saleDate) - new Date(a.saleDate)
      );
    } else if (sortOrder === "Oldest") {
      data = [...data].sort(
        (a, b) => new Date(a.saleDate) - new Date(b.saleDate)
      );
    }

    return data;
  }, [sales, search, sortOrder]);

  // Calculate total amount and total paid amount
  const [totalAmount, totalPaid] = useMemo(() => {
    const total = filteredSales.reduce(
      (sum, sale) => sum + parseFloat(sale.total || 0),
      0
    );
    const paid = filteredSales.reduce(
      (sum, sale) => sum + parseFloat(sale.paidPayment || 0),
      0
    );
    return [total, paid];
  }, [filteredSales]);

  // Columns for DataTable
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      width: "60px",
    },
    {
      name: "Sale Date",
      selector: (row) => row.saleDate,
      sortable: true,
      cell: (row) => new Date(row.saleDate).toLocaleDateString(),
    },
    {
      name: "Sale Code",
      selector: (row) => row.saleCode,
      sortable: true,
    },
    {
      name: "Reference",
      selector: (row) => row.reference,
    },
    {
      name: "Customer Name",
      selector: (row) => row.customerName,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => row.total,
      sortable: true,
      cell: (row) => `$${parseFloat(row.total).toFixed(2)}`,
    },
    {
      name: "Paid Payment",
      selector: (row) => row.paidPayment,
      sortable: true,
      cell: (row) => `$${parseFloat(row.paidPayment).toFixed(2)}`,
    },
    {
      name: "Payment Status",
      selector: (row) => row.paymentStatus,
      sortable: true,
    },
    {
      name: "Created by",
      selector: (row) => row.createdBy,
    },
    {
      name: "Action",
      right: true,
      cell: (row) => (
        <div className="sales-action-btns">
          <button
            className="sales-btn-icon sales-edit"
            onClick={() => alert(`Edit sale: ${row.reference}`)}
          >
            <FiEdit />
          </button>
          <button
            className="sales-btn-icon sales-danger"
            onClick={() => dispatch(deleteSale(row.id))}
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="sales-page">
      <h2 className="title">Sales</h2>
      <p className="subtitle">Manage your sales</p>

      {/* ✅ Actions OUTSIDE sales-content */}
      <div className="actions">
        <button className="btn pdf">
          <FaFilePdf />
        </button>
        <button className="btn excel">
          <FaFileExcel />
        </button>
        <button className="btn print">Print</button>
        <button className="btn refresh">
          <FiRotateCw />
        </button>
        <button className="btn collapse">
          <FiChevronDown />
        </button>
        <button className="btn add" onClick={() => navigate("/sales/add")}>
          + Add New Sales
        </button>
      </div>

      {/* White card content */}
      <div className="sales-content">
        <div className="sales-filters">
          <div className="sales-search-box">
            <FiSearch className="sales-search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="sales-filter-actions">
            <button className="sales-btn-filter">
              <FiFilter />
            </button>
            <select
              className="sales-sort-dropdown"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="Newest">Sort by Date (Newest)</option>
              <option value="Oldest">Sort by Date (Oldest)</option>
            </select>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredSales}
          pagination
          striped
          responsive
          selectableRows
          selectableRowsHighlight
          noDataComponent={
            <div className="no-data">No matching records found</div>
          }
        />

        <div className="sales-totals">
          <div className="sales-total">
            <span>Total Amount:</span>
            <span className="sales-total-amount">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
          <div className="sales-total">
            <span>Total Paid Amount:</span>
            <span className="sales-total-amount">
              ${totalPaid.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;