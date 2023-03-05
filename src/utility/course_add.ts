import {Pool} from 'pg';
const client = new Pool({
    connectionString: 'postgresql://postgres:1234@localhost:5432/db1'
  });

interface Course {  // we can define an interface for faculty for objects to use.
    id: string;
    name:string;
    slot_ids:string[];
    faculty_ids:string[];
    course_type:string;
}

export const courseAdd = async (course: Course) =>{//datatype for the function parameter is Faculty
  const query_db=`(SELECT * from courses where id=$1)`;
    var ans = await client.query(query_db,[course.id]);
    console.log(ans.rows);
    if(ans.rowCount!=0)
    return false;
    const query_add = {
      text: 'INSERT INTO courses (id, name,slot_ids,faculty_ids,course_type) VALUES ($1, $2,$3,$4,$5)',
      values: [course.id, course.name,course.slot_ids,course.faculty_ids,course.course_type],
    };
  
   client.query(query_add).then(()=>console.log("success"))
   .catch((err)=>console.log(err));
  }
// const newCourse = {
//     "id": "123",
//     "name": "sf",
//     "slot_ids": [
//       "12","33"
//     ],
//     "faculty_ids": [
//       "2323","22332"
//     ],
//     "course_type": "THEORY"
// }

