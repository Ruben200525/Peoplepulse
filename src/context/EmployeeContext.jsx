
import { createContext, useContext, useEffect, useState } from "react";

const EmployeeContext = createContext();

const initialEmployees = [
  { id: 1, name: "Aarav Sharma", role: "Frontend Developer", department: "Engineering" },
  { id: 2, name: "Priya Patel", role: "UI/UX Designer", department: "Design" },
  { id: 3, name: "Rahul Verma", role: "Backend Developer", department: "Engineering" },
  { id: 4, name: "Ananya Singh", role: "HR Manager", department: "Human Resources" },
  { id: 5, name: "Ishaan Gupta", role: "Marketing Executive", department: "Marketing" },
];

function getSavedEmployees() {
  try {
    const saved = localStorage.getItem("peoplepulse-employees");
    return saved === null ? initialEmployees : JSON.parse(saved);
  } catch {
    return initialEmployees;
  }
}

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState(getSavedEmployees);
  const [darkMode, setDarkMode] = useState(false);
const toggleTheme = () => setDarkMode((previous) => !previous);

  useEffect(() => {
    localStorage.setItem("peoplepulse-employees", JSON.stringify(employees));
  }, [employees]);

  return (
   <EmployeeContext.Provider
  value={{
    employees,
    setEmployees,
    darkMode,
    setDarkMode,
    toggleTheme,
  }}
>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  return useContext(EmployeeContext);
}
