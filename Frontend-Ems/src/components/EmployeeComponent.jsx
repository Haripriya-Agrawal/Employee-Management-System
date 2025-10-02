import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { redirect, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'




const EmployeeComponent = () => {

    const[firstName , setFirstName] = useState('')
    const[lastName , setLastName] = useState('')
    const[email , setEmail] = useState('')
    const {id} = useParams();

    const navigator = useNavigate();
    

    function redirectToListPage()
    {
        navigator('/employees')
    }

    function handleFirstName(e)
    {
        setFirstName(e.target.value)
    }

    function handleLastName(e)
    {
        setLastName(e.target.value)
    }

    function handleEmail(e)
    {
        setEmail(e.target.value)
    }

    function pageTitle()
    {
      if(id)
      { return <h2>Update Employee</h2>}
      else
      {
       return  <h2>Add Employee</h2>
      }
    }
    function saveorUpdateEmployee(e)
    {
        e.preventDefault();
        
        const employee={firstName,lastName,email}
        console.log(employee)
       if(id)
       {
        updateEmployee(id,employee).then((response)=>{
          console.log(response.data)
          navigator('/employees')
        }).catch(error=>{console.error(error)})
       }
       else
       {
        createEmployee(employee).then((response)=>{console.log(response.data)})
       }
        
        
    }

    useEffect(()=>{
  if(id)
  {
    getEmployee(id).then((response)=>{
      setFirstName(response.data.firstName)
      setLastName(response.data.lastName)
      setEmail(response.data.email)
    }).catch(error=>{console.log(error)})
  }
  
},[id])
  return (
    <div>
         {
          pageTitle()
         }
      
      <div >
       
        <form className='flex flex-col gap-6 border p-12 rounded-2xl'>
        <label > 
            <span className='mr-6'>First Name</span>
            <input className="pl-3 border "type="text" name='firstName' placeholder='First Name 'value={firstName} onChange={handleFirstName}/>
        </label>
         <label > 
            <span className='mr-6'>Last Name</span>
            <input className="pl-3 border "type="text" placeholder='Last Name' name='lastName' value={lastName} onChange={handleLastName}/>
        </label>
         <label > 
            <span className='mr-8'>Email Id</span>
            <input className="pl-3 border "type="email" placeholder='Email' name='email' value={email} onChange={handleEmail} />
        </label>

        <button onClick={saveorUpdateEmployee}>Save Employee</button>
        </form>
        
      </div>
      <button onClick={redirectToListPage} className='mt-6'>Go to List</button>
    </div>
  )
}

export default EmployeeComponent
