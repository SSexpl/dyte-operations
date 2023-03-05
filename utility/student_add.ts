import {Pool} from 'pg';
const client = new Pool({
    connectionString: 'postgresql://postgres:1234@localhost:5432/db1'
  });

interface Student {  // we can define an interface for faculty for objects to use.
    id: string;
    name:string;
}

export const studentAdd = async (student: Student) =>{//datatype for the function parameter is Faculty
    const query_add = {
      text: 'INSERT INTO students (id, name) VALUES ($1, $2)',
      values: [student.id, student.name],
    };
  
    await client.query(query_add);
  }
// const newStudent = {
//     id: '170',
//     name:"ggrre"

//   };


