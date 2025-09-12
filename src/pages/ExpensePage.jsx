import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { deleteExpense } from "../store/slices/expensesSlice";
import {
  FiSearch,
  FiEdit,
  FiTrash2,
  FiFilter,
  FiRotateCw,
  FiChevronDown,
} from "react-icons/fi";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import "../styles/Expense.css";

const ExpensePage = () => {
  const expenses = useSelector((state) => state.expenses?.list || []);
  const dispatch = useDispatch();

  // States for search & sorting
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");

  // Filter + Sort
  const filteredExpenses = useMemo(() => {
    let data = expenses.filter(
      (e) =>
        e.category.toLowerCase().includes(search.toLowerCase()) ||
        e.referenceNo.toLowerCase().includes(search.toLowerCase()) ||
        e.expenseFor.toLowerCase().includes(search.toLowerCase()) ||
        e.note.toLowerCase().includes(search.toLowerCase()) ||
        e.createdBy.toLowerCase().includes(search.toLowerCase())
    );

    if (sortOrder === "Newest") {
      data = [...data].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    } else if (sortOrder === "Oldest") {
      data = [...data].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    }

    return data;
  }, [expenses, search, sortOrder]);

  // Calculate total amount
  const totalAmount = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
  }, [filteredExpenses]);

  // Columns for DataTable
  const columns = [
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      cell: (row) => new Date(row.date).toLocaleDateString(),
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Reference No.",
      selector: (row) => row.referenceNo,
    },
    {
      name: "Expense for",
      selector: (row) => row.expenseFor,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
      cell: (row) => `$${parseFloat(row.amount).toFixed(2)}`,
    },
    {
      name: "Account",
      selector: (row) => row.account,
    },
    {
      name: "Note",
      selector: (row) => row.note,
    },
    {
      name: "Created by",
      selector: (row) => row.createdBy,
    },
    {
      name: "Action",
      right: true,
      cell: (row) => (
        <div className="expense-action-btns">
          {/* Edit */}
          <button
            className="expense-btn-icon expense-edit"
            onClick={() => alert(`Edit expense: ${row.referenceNo}`)}
          >
            <FiEdit />
          </button>

          {/* Delete */}
          <button
            className="expense-btn-icon expense-danger"
            onClick={() => dispatch(deleteExpense(row.id))}
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="expense-page">
      {/* Page Header */}
      <div className="expense-header">
        <div>
          <h4>Expense List</h4>
          <p>Manage Your Expenses</p>
        </div>
        <div className="expense-header-actions">
          {/* PDF & Excel */}
          <button className="expense-btn-icon expense-pdf">
            <FaFilePdf />
          </button>
          <button className="expense-btn-icon expense-excel">
            <FaFileExcel />
          </button>

          {/* Refresh */}
          <button className="expense-btn-icon">
            <FiRotateCw />
          </button>

          {/* Dropdown */}
          <button className="expense-btn-icon">
            <FiChevronDown />
          </button>

          {/* Add Expense */}
          <button className="expense-btn-primary">+ Add New Expense</button>
        </div>
      </div>

      {/* Data Table */}
      <div className="expense-card">
        <div className="expense-card-body">
          {/* Search & Filter Controls */}
          <div className="expense-filters">
            {/* Search */}
            <div className="expense-search-box">
              <FiSearch className="expense-search-icon" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="expense-filter-actions">
              <button className="expense-btn-filter">
                <FiFilter />
              </button>
              <select
                className="expense-sort-dropdown"
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
            data={filteredExpenses}
            pagination
            striped
            responsive
            selectableRows
            selectableRowsHighlight
          />

          {/* Total Amount */}
          <div className="expense-total">
            <span>Total Amount:</span>
            <span className="expense-total-amount">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensePage;