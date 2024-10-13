function highestPaid(emp){
    let heighestPaid = emp[0]

    for(const employee of emp){
        const { salary } = employee
        if(salary > heighestPaid.salary){
            heighestPaid = employee
        }
    }

    return heighestPaid
}


function destructuringToSwap(emp){
    
    var ans = emp.reduce((acc, curr, index, arr)=> {
        if(index == 0){
            acc.push(arr[arr.length -1]);
        }
        else if (index === arr.length -1){
            acc.push(arr[0])
        }
        else{
            acc.push(curr)
        }
        return acc
    }, [])

    return ans
}


const employees = [
  { name: "John Doe", age: 30, department: "HR", salary: 50000 },
  { name: "Jane Smith", age: 28, department: "Finance", salary: 60000 },
  { name: "Alex Johnson", age: 35, department: "IT", salary: 70000 },
];

console.log(highestPaid(employees)); // Output: { name: 'Alex Johnson', age: 35, department: 'IT', salary: 70000 }


// console.log(destructuringToSwap(employees));
