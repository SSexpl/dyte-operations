import {Pool} from 'pg';
const client = new Pool({
    connectionString: 'postgresql://postgres:1234@localhost:5432/db1'
  });

interface Faculty {  // we can define an interface for faculty for objects to use.
    id: string;
    name:string;
}

export const facultyAdd = async (faculty: Faculty) =>{//datatype for the function parameter is Faculty
    const query_add = {
      text: 'INSERT INTO faculties (id, name) VALUES ($1, $2)',
      values: [faculty.id, faculty.name],
    };
  
    await client.query(query_add);
  }

