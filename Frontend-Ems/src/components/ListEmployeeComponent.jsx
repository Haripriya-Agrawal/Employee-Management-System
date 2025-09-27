import React from "react";

export default function ListEmployeeComponent() {
  const dummyData = [
    { id: 1, firstName: "Haripriya", lastName: "Agrawal", email: "haripriya@gmail.com" },
    { id: 2, firstName: "Shreya", lastName: "Agrawal", email: "shreyaa@gmail.com" },
    { id: 3, firstName: "Naveen", lastName: "Agrawal", email: "naveen@gmail.com" },
  ];

  return (
    <div className="p-12  bg-[#2f4f4f] h-full border rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-center text-white">List of Employees</h2>
        
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-slate-100">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-gradient-to-r from-slate-50 to-white">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Employee Id</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">First Name</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Last Name</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Email</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-slate-100">
            {dummyData.map((employee, idx) => (
              <tr
                key={employee.id}
                className={`${idx % 2 === 0 ? "bg-slate-50" : "bg-white"} hover:bg-slate-100 transition-colors`}
              >
                <td className="px-4 py-3 text-sm text-slate-700">{employee.id}</td>

                <td className="px-4 py-3 text-sm flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium text-slate-700">
                    {employee.firstName[0].toUpperCase()}{employee.lastName[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">{employee.firstName}</div>
                    <div className="text-xs text-slate-500">{employee.email}</div>
                  </div>
                </td>

                <td className="px-4 py-3 text-sm text-slate-700">{employee.lastName}</td>

                <td className="px-4 py-3 text-sm text-slate-600">{employee.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
