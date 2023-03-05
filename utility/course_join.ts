import {Pool} from 'pg';
import { get_course } from './get_course_id';
const pool = new Pool({
    connectionString: 'postgresql://postgres:1234@localhost:5432/db1'
  });
 //returns an array of object courses with addititonal details.
 interface Faculty {
  id: string;
  name: string;
}
interface Slot {  // we can define an interface for courses for objects to use.
  id: string;
  timings: object[];
}
export const respCourse =async(id:string)=>
{
  const respc= await get_course(id);
  console.log(respc);
  const uid=respc.id;
  const name=respc.name;
  const fac_list=respc.faculty_ids;
  const faculty_all: Faculty[] = [];

  // Loop through each faculty ID and fetch its details from the database
  for (const id of fac_list) {
    const query = {
      text: 'SELECT id, name FROM faculties WHERE id = $1',
      values: [id],
    };
    const result = await pool.query(query);
    const faculty = result.rows[0] as Faculty;
    faculty_all.push(faculty);
  }
  const slot_list=respc.slot_ids;
  const slot_all : Slot[] =[];
  for (const id of slot_list) {
    const query = {
      text: 'SELECT id, timings FROM slots WHERE id = $1',
      values: [id]
    };
    const result = await pool.query(query);
    const slot= result.rows[0] as Slot;
    slot_all.push(slot);
  }
  const response={
    id:uid,
    name:name,
    faculties:faculty_all,
    course_type:respc.course_type,
    allowed_slots:slot_all
  }
  console.log(response);
  return response;
}
