import express, { Request, Response } from 'express';
import { courseAdd } from '../utility/course_add';
import { slotAdd } from '../utility/slot_add';
import { facultyAdd } from '../utility/faculty_add';
import { studentAdd } from '../utility/student_add';
import { respCourse } from '../utility/course_join';
import { respSlot } from '../utility/slot_add';
import { get_student } from '../utility/get_student';
import { get_faculty } from '../utility/get_faculty';
import {json,urlencoded} from 'body-parser';
import { check_fac_token } from '../utility/check_factoken';
import { check_stu_token } from '../utility/check_student_token';
const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

const adminRouter= express.Router();

// Define your endpoints here

adminRouter.post('/faculty',async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ") as string[]
  const bt = token[1].toString();
  const ch:boolean= await check_fac_token(bt);
    if(!ch)
    {
        return res.status(403).json({ error: 'Unauthorized Access' });
    }
     const {id,name}=await req.body;
    console.log(id);
    
    const rep= await facultyAdd({id,name});
   const resp= await get_faculty(id);
  {
      const resp_full={
            success:true,
            data:resp
          }
          res.status(200);
          res.send(resp_full);
    }
   
    
    
});

adminRouter.post('/student', async(req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ") as string[]
  const bt = token[1].toString();
  const ch:boolean= await check_fac_token(bt);
    if(!ch)
    {
        return res.status(403).json({ error: 'Unauthorized Access' });
    }
    const {id,name}=await req.body;
    console.log({id,name});
    const rep= await studentAdd({id,name});
        const resp= await get_student(id);
        const resp_full={
          success:true,
          data:resp
        }
        res.status(200);
        res.send(resp_full);
      
      
});
adminRouter.post('/course', async(req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ") as string[]
  const bt = token[1].toString();
  const ch:boolean= await check_fac_token(bt);
    if(!ch)
    {
        return res.status(403).json({ error: 'Unauthorized Access' });
    }
    const bdy=await req.body;
    console.log(bdy);
    const rep =await courseAdd(bdy);
    const resp=await respCourse(bdy.id);
    if(resp)
    {
        const resp_full={
            success:true,
            data:resp
          }
          res.status(200);
          res.send(resp_full);
    }
    else
    {
        res.status(403);
        res.send("fail");
    }


    
});
adminRouter.post('/slot', async(req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ") as string[]
  const bt = token[1].toString();
  const ch:boolean= await check_fac_token(bt);
    if(!ch)
    {
        return res.status(403).json({ error: 'Unauthorized Access' });
    }
    const bdy=await req.body;
    console.log(bdy);
  const rep=  await slotAdd(bdy);
  const resp= await respSlot(bdy.id);
        const resp_full={
            success:true,
            data:resp
          }
          res.status(200);
          res.send(resp_full);
        
  
    
});
export default adminRouter;
