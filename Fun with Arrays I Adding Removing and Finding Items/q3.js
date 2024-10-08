function employeesInDepartment(emp, dep) {
  ans = [];

  emp
    .filter((emp) => emp.department.includes(dep))
    .forEach((item) => {
      ans.push(item.name);
    });

  return ans;
}

function totalSalaryBydepartment(emp, dep) {
  ans = [];

  return emp
    .filter((emp) => emp.department.includes(dep))
    .reduce((total, item) => total + item.salary, 0);
}

function employeeSummary(emp){
    ans = []

    emp.forEach(item => {
        res = `Employee ${item.name} works in ${item.department} department and earns $${item.salary} annually.`

        ans.push(res)
    })

    return ans
}

const employees = [
  { name: "John Doe", age: 30, department: "HR", salary: 50000 },
  { name: "Jane Smith", age: 28, department: "Finance", salary: 60000 },
  { name: "Alex Johnson", age: 35, department: "IT", salary: 70000 },
  { name: "Maria Lopez", age: 29, department: "Finance", salary: 65000 },
];

//console.log(employeesInDepartment(employees, "Finance")); // Output: ['Jane Smith', 'Maria Lopez']
//console.log(totalSalaryBydepartment(employees, "Finance")); // Output: ['Jane Smith', 'Maria Lopez']
console.log(employeeSummary(employees))



  

  
  