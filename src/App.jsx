import { useState } from "react";
import EmployeeAvatar from "./components/EmployeeAvatar";
import StatCard from "./components/StatCard";
import { useEmployees } from "./context/EmployeeContext";
import {
  Users,
  Search,
  BriefcaseBusiness,
  TrendingUp,
  LayoutDashboard,
  UserPlus,
  Bell,
  Sun,
  Moon,
} from "lucide-react";

import "./App.css";

function Dashboard()  {
   const {
  employees,
  setEmployees,
  darkMode,
  toggleTheme,
} = useEmployees();
  const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("Engineering");

  const filtered = employees.filter((employee) =>
    `${employee.name} ${employee.role} ${employee.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function addEmployee(event) {
    event.preventDefault();

    setEmployees([
      ...employees,
      {
        id: Date.now(),
        name: name.trim(),
        role: role.trim(),
        department,
      },
    ]);

    setName("");
    setRole("");
    setDepartment("Engineering");
    setShowForm(false);
  }

  function deleteEmployee(id) {
    setEmployees(employees.filter((employee) => employee.id !== id));
  }

  const stats = [
    { title: "Total Employees", value: employees.length, Icon: Users },
    {
      title: "Departments",
      value: new Set(employees.map((e) => e.department)).size,
      Icon: BriefcaseBusiness,
    },
    {
      title: "Team Growth",
      value: "+12%",
      Icon: TrendingUp,
    },
  ];

  return (
    <div className={`app-shell ${darkMode ? "dark" : ""}`}>
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon"><Users size={23} /></span>
          <span>People<span className="brand-light">Pulse</span></span>
        </div>

        <p className="menu-label">WORKSPACE</p>

        <nav className="side-nav">
          <a className="nav-item active" href="#dashboard">
            <LayoutDashboard size={19} /> Dashboard
          </a>
          <a className="nav-item" href="#employees">
            <Users size={19} /> Employees
          </a>
          <button className="nav-item" onClick={() => setShowForm(true)}>
            <UserPlus size={19} /> Add Employee
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <span>✦</span>
            <strong>People make progress.</strong>
            <p>Manage your team in one simple workspace.</p>
          </div>
          <div className="admin-profile">
            <div className="admin-avatar">R</div>
            <div><strong>Admin User</strong><small>Administrator</small></div>
          </div>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div className="breadcrumb">Workspace / <strong>Dashboard</strong></div>
          <div className="top-actions">
            <button className="icon-button" aria-label="Notifications">
              <Bell size={19} />
            </button>
            <button
              className="icon-button"
              aria-label="Toggle theme"
              onClick={toggleTheme}
            >
              {darkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <div className="top-avatar">R</div>
          </div>
        </header>

        <section className="page-content">
          <div className="welcome-row">
            <div>
              <p className="eyebrow">YOUR WORKSPACE</p>
              <h1>Good to see you, Admin <span>✦</span></h1>
              <p className="subtitle">
                Here's what's happening with your team today.
              </p>
            </div>
            <button className="primary-button" onClick={() => setShowForm(!showForm)}>
              <UserPlus size={18} /> Add Employee
            </button>
          </div>

          
            
<section className="stats-grid">
  {stats.map(({ title, value, Icon }) => (
    <StatCard
      key={title}
      title={title}
      value={value}
      Icon={Icon}
    />
  ))}
</section>

           
          {showForm && (
            <form className="employee-form" onSubmit={addEmployee}>
              <h2>Add a team member</h2>
              <p>Enter the new employee's details.</p>

              <div className="form-grid">
                <label>
                  Full name
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                  />
                </label>
                <label>
                  Job title
                  <input
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Software Developer"
                  />
                </label>
                <label>
                  Department
                  <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Human Resources</option>
                    <option>Marketing</option>
                    <option>Finance</option>
                  </select>
                </label>
              </div>

              <button className="primary-button" type="submit">
                Save Employee
              </button>
              <button className="cancel-button" type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </form>
          )}

          <section className="employee-section" id="employees">
            <div className="section-heading">
              <div>
                <h2>Team Members</h2>
                <p>Manage and keep track of your people.</p>
              </div>
              <span className="count-pill">{filtered.length} members</span>
            </div>

            <div className="table-toolbar">
              <div className="search-box">
                <Search size={18} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search employees..."
                />
              </div>
              <button className="secondary-button" onClick={() => setSearch("")}>
                Clear
              </button>
            </div>

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
                  {filtered.map((employee) => (
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
                      <td><span className="department-label">{employee.department}</span></td>
                      <td><span className="status"><span /> Active</span></td>
                      <td>
                        <button className="delete-button" onClick={() => deleteEmployee(employee.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <div className="empty-state">
                  <Users size={30} />
                  <h3>No employees found</h3>
                  <p>Try another search or add a team member.</p>
                </div>
              )}
            </div>
            <p className="table-footer">
              Showing {filtered.length} of {employees.length} employees
            </p>
          </section>

          <footer className="footer">
            © 2026 PeoplePulse <span>Made for better teamwork ✦</span>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;