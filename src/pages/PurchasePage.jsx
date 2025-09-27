import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { deletePurchase } from "../store/slices/purchasesSlice";
import {
  FiSearch,
  FiEdit,
  FiTrash2,
  FiFilter,
  FiRotateCw,
} from "react-icons/fi";
import "../styles/Purchase.css";

const PurchasePage = () => {
  const purchases = useSelector((state) => state.purchases?.list || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");

  const filteredPurchases = useMemo(() => {
    let data = purchases.filter(
      (p) =>
        p.purchaseCode.toLowerCase().includes(search.toLowerCase()) ||
        p.referenceNo.toLowerCase().includes(search.toLowerCase()) ||
        p.supplierName.toLowerCase().includes(search.toLowerCase()) ||
        p.createdBy.toLowerCase().includes(search.toLowerCase())
    );
    if (sortOrder === "Newest") {
      data = [...data].sort(
        (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
      );
    } else if (sortOrder === "Oldest") {
      data = [...data].sort(
        (a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate)
      );
    }
    return data;
  }, [purchases, search, sortOrder]);

  const [totalAmount, totalPaid] = useMemo(() => {
    const total = filteredPurchases.reduce(
      (sum, purchase) => sum + parseFloat(purchase.total || 0),
      0
    );
    const paid = filteredPurchases.reduce(
      (sum, purchase) => sum + parseFloat(purchase.paid || 0),
      0
    );
    return [total, paid];
  }, [filteredPurchases]);

  const columns = [
    {
      name: "Purchase Date",
      selector: (row) => row.purchaseDate,
      sortable: true,
      cell: (row) => new Date(row.purchaseDate).toLocaleDateString(),
    },
    {
      name: "Purchase Code",
      selector: (row) => row.purchaseCode,
      sortable: true,
    },
    {
      name: "Purchase Status",
      selector: (row) => row.purchaseStatus,
      sortable: true,
    },
    {
      name: "Reference No.",
      selector: (row) => row.referenceNo,
    },
    {
      name: "Supplier Name",
      selector: (row) => row.supplierName,
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
      selector: (row) => row.paid,
      sortable: true,
      cell: (row) => `$${parseFloat(row.paid).toFixed(2)}`,
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
        <div className="purchase-action-btns">
          <button
            className="purchase-btn-icon purchase-edit"
            onClick={() => alert(`Edit purchase: ${row.referenceNo}`)}
          >
            <FiEdit />
          </button>
          <button
            className="purchase-btn-icon purchase-danger"
            onClick={() => dispatch(deletePurchase(row.id))}
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="purchase-page">
      <div className="purchase-header">
        <div>
          <h4>Purchase List</h4>
          <p>Manage Your Purchases</p>
        </div>
        <div className="purchase-header-actions">
          <button className="purchase-btn-icon purchase-pdf">PDF</button>
          <button className="purchase-btn-icon purchase-excel">Excel</button>
          <button className="purchase-btn-print">Print</button>
          <button className="purchase-btn-icon purchase-refresh">
            <FiRotateCw />
          </button>
          <button
            className="purchase-btn-primary"
            onClick={() => navigate("/purchases/create")}
          >
            + Add New Purchase
          </button>
        </div>
      </div>

      <div className="purchase-card">
        <div className="purchase-card-body">
          <div className="purchase-filters">
            <div className="purchase-search-box">
              <FiSearch className="purchase-search-icon" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="purchase-filter-actions">
              <button className="purchase-btn-filter">
                <FiFilter />
              </button>
              <select
                className="purchase-sort-dropdown"
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
            data={filteredPurchases}
            pagination
            striped
            responsive
            selectableRows
            selectableRowsHighlight
          />

          <div className="purchase-total">
            <span>Total Amount:</span>
            <span className="purchase-total-amount">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
          <div className="purchase-total">
            <span>Total Paid Amount:</span>
            <span className="purchase-total-amount">
              ${totalPaid.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
