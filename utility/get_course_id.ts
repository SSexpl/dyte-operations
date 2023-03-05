import { Pool } from 'pg';
const pool = new Pool({
    connectionString: 'postgresql://postgres:1234@localhost:5432/db1'
  });
export const get_course =async (id :string) =>
{

    const query=`Select * from  courses where id =$1`;
    const ans= await pool.query(query,[id]);//got the user by passed id.
    console.log(ans.rows[0]);
    console.log(typeof(ans.rows));
    return(ans.rows[0]);
}