package net.javaGuides.ems_backend.service;

import net.javaGuides.ems_backend.dto.EmployeeDto;
import net.javaGuides.ems_backend.entity.Employee;

import java.util.List;

public interface EmployeeService {

    public EmployeeDto createEmployee(EmployeeDto employeeDto);
    public EmployeeDto getEmployeeById(Long employeeId);
    public List<EmployeeDto> getAllEmployees();
    public EmployeeDto updateEmployee(Long employeeId , EmployeeDto updatedEmployee);
    void deleteEmployee(Long employeeId);
 }
