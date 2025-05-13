import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employees/all");
        setEmployees(res.data);
        setFilteredEmployees(res.data); // Initialize filtered employees
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    fetchEmployees();
  }, []);

  const handleDesignationChange = (event) => {
    const designation = event.target.value;
    setSelectedDesignation(designation);

    if (designation === "All") {
      setFilteredEmployees(employees);
    } else {
      setFilteredEmployees(employees.filter(emp => emp.designation === designation));
    }
  };

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded shadow"
      >
        ←
      </button>
      
      <h2 className="text-2xl font-bold mb-6 text-center">All Employees</h2>

      {/* Dropdown for Designation Filter */}
      <div className="mb-4 flex justify-center">
        <select
          value={selectedDesignation}
          onChange={handleDesignationChange}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="All">All</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
          <option value="Driver">Driver</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Employee ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Photo</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Age</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Phone Number</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Salary</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp, index) => (
              <tr key={emp._id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4 text-sm text-gray-900">{`EID${(index + 1).toString().padStart(3, '0')}`}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{emp.name}</td>
                <td className="px-6 py-4">
                  <img
                    src={`http://localhost:5000/${emp.employeePhoto}`} // Use employee photo field
                    alt="Employee"
                    className="w-16 h-16 object-cover rounded-full border"
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{emp.age}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{emp.mobileNo}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{emp.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEmployee;
