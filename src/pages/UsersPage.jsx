import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import avatarImage from '../assets/image.png';
import {
  FiSearch,
  FiEdit,
  FiTrash2,
  FiFilter,
  FiRotateCw,
  FiChevronDown,
  FiEye,
  FiPlusCircle
} from 'react-icons/fi';
import '../styles/UsersPage.css';

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.users);
  
  // States for search & sorting
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");

  // Filter + Sort
  const filteredUsers = useMemo(() => {
    let data = users.filter(
      user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase())
    );

    if (sortOrder === "Newest") {
      data = [...data].sort(
        (a, b) => new Date(b.createdOn) - new Date(a.createdOn)
      );
    } else if (sortOrder === "Oldest") {
      data = [...data].sort(
        (a, b) => new Date(a.createdOn) - new Date(b.createdOn)
      );
    }

    return data;
  }, [users, search, sortOrder]);

  const columns = [
    {
      name: 'User Name',
      selector: row => (
        <div className="userimgname">
          <div className="userslist-img">
            <img src={row.avatar} alt={row.name} />
          </div>
           <div className="username-text">
            <span>{row.name}</span>
          </div>
        </div>
      ),
      sortable: true,
      grow: 2,
    },
    {
      name: 'Phone',
      selector: row => row.phone,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      grow: 2,
    },
    {
      name: 'Role',
      selector: row => row.role,
      sortable: true,
    },
    {
      name: 'Created On',
      selector: row => new Date(row.createdOn).toLocaleDateString(),
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => (
        <span className={`badge ${row.status.toLowerCase() === 'active' ? 'badge-linesuccess' : 'badge-linedanger'}`}>
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className="users-action-btns">
          <button
            className="users-btn-icon users-view"
            onClick={() => alert(`View user: ${row.name}`)}
          >
            <FiEye />
          </button>
          <button
            className="users-btn-icon users-edit"
            onClick={() => alert(`Edit user: ${row.name}`)}
          >
            <FiEdit />
          </button>
          <button
            className="users-btn-icon users-danger"
            onClick={() => alert(`Delete user: ${row.name}`)}
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="users-page">
      <h2 className="title">User List</h2>
      <p className="subtitle">Manage Your Users</p>

      <div className="actions">
        <button className="btn pdf">PDF</button>
        <button className="btn excel">EXCEL</button>
        <button className="btn print">Print</button>
        <button className="btn refresh">
          <FiRotateCw />
        </button>
        <button className="btn collapse">
          <FiChevronDown />
        </button>
        <Link to="/users/add" className="btn add">
          <FiPlusCircle className="me-2" /> Add New User
        </Link>
      </div>

      <div className="users-content">
        <div className="users-filters">
          <div className="users-search-box">
            <FiSearch className="users-search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="users-filter-actions">
            <button className="users-btn-filter">
              <FiFilter />
            </button>
            <select
              className="users-sort-dropdown"
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
          data={filteredUsers}
          pagination
          striped
          responsive
          highlightOnHover
          noDataComponent={
            <div className="no-data">No matching records found</div>
          }
        />
      </div>
    </div>
  );
};

export default UsersPage;