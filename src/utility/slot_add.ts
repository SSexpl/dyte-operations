import { Pool } from 'pg';

// Create a new connection pool using the connection string 
const pool = new Pool({
  connectionString: 'postgresql://postgres:1234@localhost:5432/db1'
});

// Define the table schema
interface Slot {  // we can define an interface for courses for objects to use.
  id: string;
  timings: object[];
}
//createTable();

// Define a function to create a new course in the database
export const slotAdd = async (slot :Slot) =>{
  const query_add = {
    text: 'INSERT INTO slots (id, timings) VALUES ($1, $2)',
    values: [slot.id, slot.timings],
  };

  await pool.query(query_add);
}

export const respSlot =async(id:string) =>
{
  const query_resp = {
    text: 'Select * from slots VALUES Where id= $1',
    values: [id]
  };

  const ans=await pool.query(query_resp);
  console.log("ans");
  console.log(ans.rows[0]);
  const resp=ans.rows[0];
  return (resp);
}
// Define the SQL statement to create the table


// Call the function to create a new course in the database
// const newSlot = {
//   id: 'A1',
//   timings: [
//     {
//       day: 'MON',
//       start: '2023-03-03T09:00:00Z',
//       end: '2023-03-03T10:30:00Z',
//     },
//     {
//       day: 'WED',
//       start: '2023-03-05T11:00:00Z',
//       end: '2023-03-05T12:30:00Z',
//     },
//   ],
// };
// slotAdd(newSlot);
