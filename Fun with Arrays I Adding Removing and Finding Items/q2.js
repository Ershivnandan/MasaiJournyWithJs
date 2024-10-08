function employeeInformation(employees) {
  const { name, department } = employees[1];

  return {
    secondEmployeeName: name,
    secondEmployeeDepartment: department,
  };
}

function averageSalary(employees) {
  let totalSalary = 0;
  let i = 0;

  for (emp of employees) {
    totalSalary += emp.salary;
    i++;
  }

  return totalSalary / i;
}

function thirdEmployeeInfo(employees) {
  const { name, age, salary } = employees[2];

  const bonus = salary * 0.1;

  return `Employee: ${name}, Age: ${age}, Salary: ${salary}, Bonus: ${bonus}`;
}

const employees = [
  { name: "John Doe", age: 30, department: "HR", salary: 50000 },
  { name: "Jane Smith", age: 28, department: "Finance", salary: 60000 },
  { name: "Alex Johnson", age: 35, department: "IT", salary: 70000 },
];

//console.log(employeeInformation(employees)); // Output: { secondEmployeeName: 'Jane Smith', secondEmployeeDepartment: 'Finance' }

console.log(averageSalary(employees)); // Output: 60000

console.log(thirdEmployeeInfo(employees)); // Output: "Employee: Alex Johnson, Age: 35, Salary: 70000, Bonus: 7000"
