import React, { useEffect, useState } from "react";
import {listEmployees, removeEmployee} from "../services/EmployeeService"
import { useNavigate , useParams } from "react-router-dom";

export default function ListEmployeeComponent() {

  const[employees , setEmployees] = useState([])

  useEffect(()=>{
    getAllEmployees()
  },[])

  function getAllEmployees()
  {
    listEmployees().then((response)=>{
      setEmployees(response.data)
    }).catch((err)=>{
      console.error(err)
    })
  }

  const navigator = useNavigate()
  const {id} = useParams()

  function addNewEmployee()
  {
    navigator("/add-employee")
  }

  function updateEmployee(id)
  {
    navigator(`/edit-employee/${id}`)
  }

  function deleteEmployee(id)
  {
    
    console.log(id)
    if(id)
    {
      removeEmployee(id).then((reponse)=>{
        getAllEmployees()
      })
      .catch(error=>{
        console.log(error)
      })
    }
  }

  function pageTitle()
  {
    if(id)
    {
        <h2>Update Employee</h2>
    }
    else
    {
      <h2>Add Employee</h2>
    }
  }

  return (
    <div className="p-12  bg-[#2f4f4f] h-full border rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-center text-white">List of Employees</h2>
        {
          pageTitle()
        }
        <button onClick={addNewEmployee}>Add Employee</button>
        
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
            {employees.map((employee, idx) => (
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

                <td><button onClick={()=>updateEmployee(employee.id)}>Update</button></td>
                <td><button onClick={()=>deleteEmployee(employee.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
