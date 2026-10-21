import { useState } from "react";
import { Search, Users, Trash2, Pencil, X } from "lucide-react";
import { useEmployees } from "../context/EmployeeContext";
import EmployeeAvatar from "../components/EmployeeAvatar";

function Employees() {
  const { employees, setEmployees, loading, error } = useEmployees();

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("Engineering");

 const filteredEmployees = employees.filter((employee) => {
  const matchesSearch =
    `${employee.name} ${employee.role} ${employee.department}`
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesDepartment =
    departmentFilter === "All" ||
    employee.department === departmentFilter;

  return matchesSearch && matchesDepartment;
});

  function resetForm() {
    setName("");
    setRole("");
    setDepartment("Engineering");
    setEditingId(null);
    setShowForm(false);
  }

  function startEdit(employee) {
    setEditingId(employee.id);
    setName(employee.name);
    setRole(employee.role);
    setDepartment(employee.department);
    setShowForm(true);
  }

  function deleteEmployee(id) {
    setEmployees((current) =>
      current.filter((employee) => employee.id !== id)
    );

    if (editingId === id) {
      resetForm();
    }
  }

  function saveEmployee(event) {
    event.preventDefault();

    if (!name.trim() || !role.trim() || !department.trim()) {
      return;
    }

    if (editingId !== null) {
      setEmployees((current) =>
        current.map((employee) =>
          employee.id === editingId
            ? {
                ...employee,
                name: name.trim(),
                role: role.trim(),
                department,
              }
            : employee
        )
      );
    } else {
      const newEmployee = {
        id: Date.now(),
        name: name.trim(),
        role: role.trim(),
        department,
      };

      setEmployees((current) => [...current, newEmployee]);
    }

    resetForm();
  }

  return (
    <div className="page-content">
      <div className="welcome-row">
        <div>
          <p className="eyebrow">PEOPLE MANAGEMENT</p>
          <h1>
            Employees <span>✦</span>
          </h1>
          <p className="subtitle">
            View and manage everyone in your team.
          </p>
        </div>

        <span className="count-pill">
          {employees.length} members
        </span>
      </div>

      <div className="employee-actions">
        <button
          type="button"
          className="add-employee-button"
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setEditingId(null);
              setName("");
              setRole("");
              setDepartment("Engineering");
              setShowForm(true);
            }
          }}
        >
          {showForm ? "Cancel" : "+ Add Employee"}
        </button>
      </div>

      {showForm && (
        <form className="add-employee-form" onSubmit={saveEmployee}>
          <h3>
            {editingId !== null ? "Edit Employee" : "Add New Employee"}
          </h3>

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Employee name"
            aria-label="Employee name"
            required
          />

          <input
            value={role}
            onChange={(event) => setRole(event.target.value)}
            placeholder="Job title"
            aria-label="Job title"
            required
          />

          <select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            aria-label="Department"
            required
          >
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </select>

          <button type="submit" className="add-employee-button">
            {editingId !== null ? "Update Employee" : "Save Employee"}
          </button>
        </form>
      )}

      <section className="employee-section">
        <div className="section-heading">
          <div>
            <h2>All Team Members</h2>
            <p>Your employee directory in one place.</p>
          </div>
        </div>

        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search employees..."
              aria-label="Search employees"
            />
          </div>

<select
  className="department-filter"
  value={departmentFilter}
  onChange={(event) => setDepartmentFilter(event.target.value)}
  aria-label="Filter by department"
>
  <option value="All">All Departments</option>
  <option value="Engineering">Engineering</option>
  <option value="Design">Design</option>
  <option value="Human Resources">Human Resources</option>
  <option value="Marketing">Marketing</option>
  <option value="Finance">Finance</option>
</select>

          <button
            type="button"
            className="secondary-button"
            onClick={() => setSearch("")}
          >
            Clear
          </button>
        </div>

        {loading && (
          <p className="loading-message">Loading employees...</p>
        )}

        {error && <p className="error-message">{error}</p>}

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>EMPLOYEE</th>
                <th>DEPARTMENT</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="employee-person">
                      <EmployeeAvatar name={employee.name} />
                      <div>
                        <strong>{employee.name}</strong>
                        <small>{employee.role}</small>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="department-label">
                      {employee.department}
                    </span>
                  </td>

                  <td>
                    <span className="status">
                      <span /> Active
                    </span>
                  </td>

                  <td>
                    <div className="employee-row-actions">
                      <button
                        type="button"
                        className="edit-button"
                        onClick={() => startEdit(employee)}
                        aria-label={`Edit ${employee.name}`}
                      >
                        <Pencil size={15} /> Edit
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => deleteEmployee(employee.id)}
                        aria-label={`Delete ${employee.name}`}
                      >
                        <Trash2 size={15} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!loading && filteredEmployees.length === 0 && (
            <div className="empty-state">
              <Users size={30} />
              <h3>No employees found</h3>
              <p>Try searching with another name or department.</p>
            </div>
          )}
        </div>

        <p className="table-footer">
          Showing {filteredEmployees.length} of {employees.length} employees
        </p>
      </section>
    </div>
  );
}

export default Employees;
