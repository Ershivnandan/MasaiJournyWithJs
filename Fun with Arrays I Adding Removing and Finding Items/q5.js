function countCalculation(school) {
  const {
    departments: {
      math: { teachers: mathTeachersCount, students: mathStudentsCount },
      history: {
        teachers: historyTeachersCount,
        students: historyStudentsCount,
      },
    },
  } = school;

  const ans = {
    mathTeachersCount,
    historyTeachersCount,
    mathStudentsCount,
    historyStudentsCount,
  };

  return ans;
}

function findTopStudent(school, course) {
  // I apply reduct to all students of school  and track 1 topper and 1 current student
  // then I will compare wether current student score > topper
  // if yes then I will return curr student
  // else topper is topper always

  return school.students.reduce((topper, curr) => {
    return curr.scores[course] > topper.scores[course] ? curr : topper;
  }, school.students[0]);

  // I took school.students[0] here to start from 0th index
}

function addNewDept(school, newDep) {
  return {
    ...school,
    departments: {
      ...school.departments,
      ...newDep,
    },
  };
}

function highestStudentCountDepartment(school) {
  const depArr = Object.entries(school.departments);

  const [key] = depArr.reduce((prev, curr) => {
    return curr[1].students > prev[1].students ? curr : prev;
  });

  return key;
}

function generateGreeting(name, language){

    switch (language) {
        case "French":
            return `Bonjour, ${name}!`;
            break;
        case "Spanish":
            return `¡Hola, ${name}!`;
            break;
        default:
            return `Hello, ${name}!`;
            break;
    }

}

const school = {
  name: "XYZ School",
  establishYear: 1990,
  departments: {
    math: { teachers: 5, students: 150 },
    science: { teachers: 4, students: 120 },
    history: { teachers: 3, students: 100 },
    english: { teachers: 4, students: 130 },
  },
  courses: ["math", "science", "history", "english"],
  students: [
    {
      name: "Alice",
      className: "Grade 5",
      scores: { math: 95, science: 88, history: 85, english: 92 },
    },
    {
      name: "Bob",
      className: "Grade 4",
      scores: { math: 80, science: 78, history: 92, english: 85 },
    },
    {
      name: "Charlie",
      className: "Grade 5",
      scores: { math: 88, science: 90, history: 78, english: 88 },
    },
    {
      name: "Diana",
      className: "Grade 4",
      scores: { math: 92, science: 85, history: 88, english: 90 },
    },
  ],
};

// console.log(countCalculation(school));
// console.log(findTopStudent(school, "math"));

var newDepartment = {
  art: { teachers: 2, students: 50 },
};
// console.log(addNewDept(school, newDepartment));

// console.log(highestStudentCountDepartment(school));

console.log(generateGreeting("Alice")); // Output: "Hello, Alice!"
console.log(generateGreeting("Bob", "Spanish")); // Output: "¡Hola, Bob!"
console.log(generateGreeting("Charlie", "French")); // Output: "Bonjour, Charlie!"


