import { Pool } from 'pg';

const pool = new Pool({
    connectionString: 'postgresql://postgres:1234@localhost:5432/db1'
  });
export const check_stu_token = async (token:string)=>
{
    const query=`Select * from  students `;
    const ans= await pool.query(query);//got the user by passed id.
    console.log(ans.rows);
    var result:object;
    var anst:boolean;
    anst=false;
    for (const {id,name} of ans.rows)
    {
      if(token==id)
      {
          anst=true;
      }
      
      
    }
     if(anst)
     return true;
     else
     return false;
}