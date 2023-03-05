import {Pool} from 'pg';
const pool= new Pool({
    connectionString: 'postgresql://postgres:1234@localhost:5432/db1'
  });
interface Registered
{
    id:string,
    course_ids:string[], // each object attributes course id and faculty id and slots array string
    slot_ids:string[]
}
interface obj{
   id:string,
    course_id:string,
    faculty_id:string,
    slot_ids:string[]
   
}


export const registeredAdd = async (reg:obj)  =>{//datatype for the function
     
    const query_db=`(SELECT * from registerations where id=$1)`;
    var ans = await pool.query(query_db,[reg.id]);
    console.log(ans.rows);
  

   if(ans.rowCount!=0)
    {
         //append
        //before appending check if its write or wrong.
        console.log(ans.rows[0]);
        const arr:string[]=ans.rows[0].course_ids;
        const arr2:string[]=ans.rows[0].slot_ids;
        const arr3:string[]=ans.rows[0].slot_ids;
        for (var slot of reg.slot_ids) {
           if(arr2.includes(slot))
              console.log("yes");
           arr3.push(slot);
          }
                                     
           arr.push(reg.course_id);
         const query_add=
             `UPDATE registerations SET course_ids = $1 WHERE id = $2`;
             const anst=await pool.query(query_add,[arr,reg.id]);
             const query_add2=
             `UPDATE registerations SET slot_ids  = $1 WHERE id = $2`;
             const anst2=await pool.query(query_add2,[arr3,reg.id]);
          
     }
     else
    {
     
      const course_ids=[reg.course_id];
      const query_add = {
      text: 'INSERT INTO registerations (id,course_ids,slot_ids) VALUES ($1, $2,$3)',
      values: [reg.id,course_ids,reg.slot_ids],
    };
    await pool.query(query_add).then(resp=>{
      console.log("done");
      return true})
    .catch(err=>{console.log(err);})
}
    
  }
const data=
  {   id:"170",
    course_id: "123",
   faculty_id: "strineqw",
   slot_ids: [ "12"]
 };
registeredAdd(data);