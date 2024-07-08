const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { merge } = require('lodash');

// Define the GraphQL schema
const schema = buildSchema(`
  
 type allStatus {
  projectStatus: String,
  developerStatus : String,
  projectStartDate : String,
  plannedEndDate : String,
  productionStatus : String
 } 

 type project {
    projectName: String,
    type: String,
    status: [allStatus]
  }

  type employee {
    empId:Int,
    empName: String,
    empProfession: String,
    empProjects: [project],
    empSalary: Int,
    empExperience: Int,
    empTechnologies: [String]
  }

  type Query {
    employees: [employee],
    employee(empId: Int!): employee,
  }

  input projectAllStatus {
    projectStatus: String,
    developerStatus : String,
    projectStartDate : String,
    plannedEndDate : String,
    productionStatus : String
  }

  input projectInput {
    projectName: String,
    type: String,
    status: [projectAllStatus]
  } 

  input employeeInput {
    empId:Int,
    empName: String,
    empProfession: String,
    empProjects: [projectInput],
    empSalary: Int,
    empExperience: Int,
    empTechnologies: [String]
  }

  type Mutation {
    createEmployee(input: employeeInput): employee,
    updateEmployee(empId: Int!, input: employeeInput): employee,
    deleteEmployee(empId: Int!) : employee
  }

`);

let employees = [
  {
    empId: 12345,
    empName: 'Farnas',
    empProfession: 'Software Engineer',
    empProjects: [
      {
        projectName: "Project A", type: "National Project", status: [
          {
            projectStatus: "in Progress",
            developerStatus: "active",
            projectStartDate: "12/12/2023",
            plannedEndDate: "21/12/2024",
            productionStatus: "Live"
          }]
      },
      {
        projectName: "Project B", type: "International Project", status: [
          {
            projectStatus: "in Progress",
            developerStatus: "active",
            projectStartDate: "12/12/2023",
            plannedEndDate: "21/12/2024",
            productionStatus: "Live"
          }]
      }
    ],
    empSalary: 800000,
    empExperience: 5,
    empTechnologies: ['JavaScript', 'React', 'Node.js']
  },
  {
    empId: 12346,
    empName: 'sherif',
    empProfession: 'Frontend Developer',
    empProjects: [
      {
        projectName: "Project C", type: "International Project", status: [
          {
            projectStatus: "in Progress",
            developerStatus: "active",
            projectStartDate: "12/12/2023",
            plannedEndDate: "21/12/2024",
            productionStatus: "Live"
          }]
      },
      {
        projectName: "Project D", type: "National Project", status: [
          {
            projectStatus: "in Progress",
            developerStatus: "active",
            projectStartDate: "12/12/2023",
            plannedEndDate: "21/12/2024",
            productionStatus: "Live"
          }]
      }
    ],
    empSalary: 700000,
    empExperience: 4,
    empTechnologies: ['HTML', 'CSS', 'JavaScript', 'React']
  },
  {
    empId: 12347,
    empName: 'Faizal',
    empProfession: 'Backend Developer',
    empProjects: [
      {
        projectName: "Project E", type: "National Project", status: [
          {
            projectStatus: "in Progress",
            developerStatus: "active",
            projectStartDate: "12/12/2023",
            plannedEndDate: "21/12/2024",
            productionStatus: "Live"
          }]
      },
      {
        projectName: "Project F", type: "International Project", status: [
          {
            projectStatus: "in Progress",
            developerStatus: "active",
            projectStartDate: "12/12/2023",
            plannedEndDate: "21/12/2024",
            productionStatus: "Live"
          }]
      }
    ],
    empSalary: 900000,
    empExperience: 6,
    empTechnologies: ['Node.js', 'Express', 'MongoDB']
  },
  {
    empId: 12348,
    empName: 'Bob Brown',
    empProfession: 'Full Stack Developer',
    empProjects: [
      {
        projectName: "Project G",
        type: "National Project",
        status: [
          {
            projectStatus: "in Progress",
            developerStatus: "active",
            projectStartDate: "12 / 12 / 2023",
            plannedEndDate: "21 / 12 / 2024",
            productionStatus: "Live"
          }
        ]
      },
      {
        projectName: "Project H", type: "International Project",
        status: [
          {
            projectStatus: "in Progress",
            developerStatus: "active",
            projectStartDate: "12 / 12 / 2023",
            plannedEndDate: "21 / 12 / 2024",
            productionStatus: "Live"
          }]
      }
    ],
    empSalary: 1100000,
    empExperience: 7,
    empTechnologies: ['JavaScript', 'React', 'Node.js', 'GraphQL']
  },
  {
    empId: 12349,
    empName: 'Charlie Davis',
    empProfession: 'DevOps Engineer',
    empProjects: [
      {
        projectName: "Project I", type: "National Project",
        status: [
          {
            projectStatus: "in Progress",
            developerStatus: "active",
            projectStartDate: "12 / 12 / 2023",
            plannedEndDate: "21 / 12 / 2024",
            productionStatus: "Live"
          }]
      },
      {
        projectName: "Project J", type: "International Project",
        status: [
          {
            projectStatus: "in Progress",
            developerStatus: "active",
            projectStartDate: "12 / 12 / 2023",
            plannedEndDate: "",
            productionStatus: "Live"
          }]
      }
    ],
    empSalary: 1000000,
    empExperience: 5,
    empTechnologies: ['Docker', 'Kubernetes', 'AWS']
  },
  {
    empId: 12350,
    empName: 'Daniel Evans',
    empProfession: 'Software Architect',
    empProjects: [
      {
        projectName: "Project K", type: "National Project",
        status: [
          {
            projectStatus: "in Progress",
            developerStatus: "active",
            projectStartDate: "12 / 12 / 2023",
            plannedEndDate: "21 / 12 / 2024",
            productionStatus: "Live"
          }]
      },
      {
        projectName: "Project L", type: "International Project", status: [
          {
            projectStatus: "in Progress",
            developerStatus: "active",
            projectStartDate: "12 / 12 / 2023",
            plannedEndDate: " 21 / 12 / 2024",
            productionStatus: "Live"
          }]
      }
    ],
    empSalary: 1300000,
    empExperience: 10,
    empTechnologies: ['Java', 'Spring', 'Microservices']
  },

]

const root = {
  employees: () => employees,
  employee: ({ empId }) => employees.find(x => x.empId === empId),

  createEmployee: ({ input }) => {
    const newEmployee = { ...input };
    employees.push(newEmployee)
    return newEmployee;
  },

  updateEmployee: ({ empId, input }) => {
    const index = employees.findIndex(emp => emp.empId === empId);
    if (index === -1) throw new Error(`Employee with ID ${empId} not found`);
    employees[index] = merge(employees[index], input);
    return employees[index];
  },
  

  deleteEmployee: ({ empId }) => {
    const index = employees.findIndex(emp => emp.empId === empId);
    console.log(`Attempting to delete employee with ID: ${empId}`);
    if (index === -1) {
      console.log(`Employee with ID ${empId} not found`);
      throw new Error(`Employee with ID ${empId} not found`);
    }
    const deletedEmployee = employees[index];
    employees = employees.filter(emp => emp.empId !== empId);
    console.log(`Deleted employee: ${JSON.stringify(deletedEmployee)}`);
    return deletedEmployee;
  }
}




// Define the resolvers
// the below is using for one data asigning, if you uncomment below, comment the existing root. 

// const root = {
//     empId: ()=> 12345,
//     empName: () => 'sivaraman',
//     empProfession: ()=> 'Senior Software Engineer',
//     empProjects:()=> [
//         {projectName: "Maersk CPD", type: "International Project"},
//         {projectName: "TVS E-Auction India", type: "National Project"},
//         {projectName: "Tata Aig Insurance", type: "National Project"},
//         {projectName: "Kotak QMS-KGI", type: "National Project"},
//         {projectName: "ABNIC Insurance PVT Ltd", type: "International Project"},
//         {projectName: "AWNIC Insurance Pvt Ltd", type: "International Project"},
//         {projectName: "Senzio ", type: "International Project"}
//     ],
//     empSalary:()=> 1200000,
//     empExperience:()=> 8,
//     empTechnologies:()=> ['HTML5','Css3','ES6','Angular','Typescript','Nodejs','express','MySQL']

// };

// Create an Express application
const app = express();

// Set up the /graphql endpoint with express-graphql
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL for testing queries
}));

// Define a default route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Start the server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000/graphql');
});







