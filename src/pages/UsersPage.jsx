// pages/UsersPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import '../styles/UserList.css';

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.users);

  const columns = [
    {
      name: 'User Name',
      selector: row => (
        <div className="userimgname">
          <a href="javascript:void(0);" className="userslist-img bg-img">
            <img src={row.avatar} alt="user" />
          </a>
          <div>
            <a href="javascript:void(0);">{row.name}</a>
          </div>
        </div>
      ),
      sortable: true,
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
    },
    {
      name: 'Role',
      selector: row => row.role,
      sortable: true,
    },
    {
      name: 'Created On',
      selector: row => row.createdOn,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => (
        <span className={`badge ${row.status === 'Active' ? 'badge-linesuccess' : 'badge-linedanger'}`}>
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className="edit-delete-action">
          <a className="me-2 p-2 mb-0" href="javascript:void(0);">
            <i data-feather="eye" className="action-eye"></i>
          </a>
          <a className="me-2 p-2 mb-0" data-bs-toggle="modal" data-bs-target="#edit-units">
            <i data-feather="edit" className="feather-edit"></i>
          </a>
          <a className="me-2 confirm-text p-2 mb-0" href="javascript:void(0);">
            <i data-feather="trash-2" className="feather-trash-2"></i>
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>User List</h4>
              <h6>Manage Your Users</h6>
            </div>
          </div>
          <ul className="table-top-head">
            {/* <li>
              <a data-bs-toggle="tooltip" data-bs-placement="top" title="Pdf">
                <img src="assets/img/icons/pdf.svg" alt="img" />
              </a>
            </li>
            <li>
              <a data-bs-toggle="tooltip" data-bs-placement="top" title="Excel">
                <img src="assets/img/icons/excel.svg" alt="img" />
              </a>
            </li>
            <li>
              <a data-bs-toggle="tooltip" data-bs-placement="top" title="Print">
                <i data-feather="printer" className="feather-rotate-ccw"></i>
              </a>
            </li>
            <li>
              <a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh">
                <i data-feather="rotate-ccw" className="feather-rotate-ccw"></i>
              </a>
            </li>
            <li>
              <a data-bs-toggle="tooltip" data-bs-placement="top" title="Collapse" id="collapse-header">
                <i data-feather="chevron-up" className="feather-chevron-up"></i>
              </a>
            </li> */}
          </ul>
          <div className="page-btn">
            <Link to="/users/add" className="btn btn-added">
              <i data-feather="plus-circle" className="me-2"></i>Add New User
            </Link>
          </div>
        </div>

        <div className="card table-list-card">
          <div className="card-body">
            <DataTable
              columns={columns}
              data={users}
              pagination
              highlightOnHover
              striped
              responsive
              className="table-responsive"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;