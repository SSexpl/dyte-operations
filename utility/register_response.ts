import {Pool} from 'pg';
import { get_course } from './get_course_id';
import { respCourse } from './course_join';
import { get_student } from './get_student';
const pool = new Pool({
    connectionString: 'postgresql://postgres:1234@localhost:5432/db1'
  });
 //returns an array of object courses with addititonal details.
 interface Slot {  // we can define an interface for courses for objects to use.
    id: string;
    timings: object[];
  }
  
  
export const respReg = async (id:string)=>
{
    const query = {
        text: 'SELECT id,course_ids,slot_ids FROM registerations WHERE id = $1',
        values: [id],
      };
  const ans= await pool.query(query);
  const Name=await get_student(id);
  const name=Name.name;
   console.log(ans.rows[0]);
   const courseAll:object[]=[];
   for(const ids of ans.rows[0].course_ids)
   {
    let respob :object=await respCourse(ids);
      courseAll.push(respob);
   }
   const slot_all : Slot[] =[];
  for (const ids of ans.rows[0].slot_ids) {
    console.log(ids);
    console.log(typeof(ids));
    const query = {
      text: 'SELECT id, timings FROM slots WHERE id = $1',
      values: [ids]
    };
    const result = await pool.query(query);
    const slot= result.rows[0] as Slot;
    slot_all.push(slot);
    console.log(slot)
   }
    const response ={
        id:ans.rows[0].id,
        name:name,
        course:courseAll,
        slots:slot_all
    }
    console.log("responses");
    console.log(response);
    
    return response;
}
  // Loop through each faculty ID and fetch its details from the database
//   for (const id of fac_list) {
//     const query = {
//       text: 'SELECT id, name FROM faculties WHERE id = $1',
//       values: [id],
//     };
//     const result = await pool.query(query);
//     const faculty = result.rows[0] as Faculty;
//     faculty_all.push(faculty);
//   }
//   const slot_list=respc.slot_ids;
//   const slot_all : Slot[] =[];
//   for (const id of slot_list) {
//     const query = {
//       text: 'SELECT id, timings FROM slots WHERE id = $1',
//       values: [id]
//     };
//     const result = await pool.query(query);
//     const slot= result.rows[0] as Slot;
//     slot_all.push(slot);
//   }
//   const response={
//     id:uid,
//     name:name,
//     faculties:faculty_all,
//     course_type:respc.course_type,
//     allowed_slots:slot_all
//   }
//   console.log(response);