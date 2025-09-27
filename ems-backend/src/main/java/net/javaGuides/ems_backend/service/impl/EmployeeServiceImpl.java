package net.javaGuides.ems_backend.service.impl;

import lombok.AllArgsConstructor;
import net.javaGuides.ems_backend.dto.EmployeeDto;
import net.javaGuides.ems_backend.entity.Employee;
import net.javaGuides.ems_backend.exception.ResourceNotFoundException;
import net.javaGuides.ems_backend.repository.EmployeeRepository;
import net.javaGuides.ems_backend.service.EmployeeService;
import org.springframework.stereotype.Service;
import net.javaGuides.ems_backend.mapper.EmployeeMapper;

import java.util.List;
import java.util.stream.Collectors;

@Service //tells spring to create bean for this class
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee= employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {

        Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(()-> new  ResourceNotFoundException("Employee with following id does not exist"+employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map((employee)-> EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());

    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {

        Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Employee with this id does not exist"+employeeId));

        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());

        Employee newEmployee = employeeRepository.save(employee);


        return EmployeeMapper.mapToEmployeeDto(newEmployee);

    }

    @Override
    public void deleteEmployee(Long employeeId) {

        Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Employee with this id does not exist"+employeeId));

        employeeRepository.deleteById(employeeId);
    }


}
