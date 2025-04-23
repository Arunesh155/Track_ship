import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employees/all");
        setEmployees(res.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    fetchEmployees();
  }, []);

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

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Employee ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Photo</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Age</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Phone Number</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Proof Type</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
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
                <td className="px-6 py-4 text-sm text-gray-900">{emp.proofType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEmployee;
