function combiningArrays(fruits, vegetables) {
  return fruits.concat(vegetables);
}

function cloningObjects(person) {
  ans = {
    ...person,
  };

  return ans;
}

function mergingObjects(student, course){
    ans = {
        ...student,
        ...course
    }

    return ans
}

function combiningNestedArrays(array1, array2){
    res = array1.concat(array2)

    return res
}

const fruits = ["apple", "banana", "orange"];
const vegetables = ["carrot", "broccoli", "spinach"];
// console.log(combiningArrays(fruits, vegetables));

const person = { name: "John", age: 30, address: "123 Main St" };
//console.log(cloningObjects(person)); // Output: { name: "John", age: 30, address: "123 Main St" }



const student = { name: "Alice", age: 20 };
const course = { courseName: "Math", teacher: "Mr. Smith" };
//console.log(mergingObjects(student, course)); // Output: { name: 'Alice', age: 20, courseName: 'Math', teacher: 'Mr. Smith' }


//Example Invocation:

const array1 = [
    [1, 2],
    [3, 4],
    [5, 6],
  ];
  const array2 = [
    [7, 8],
    [9, 10],
    [11, 12],
  ];
  console.log(combiningNestedArrays(array1, array2)); // Output: [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ], [ 9, 10 ], [ 11, 12 ] ]
  