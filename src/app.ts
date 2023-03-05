import express from 'express';
import cors from 'cors';
import {json,urlencoded} from 'body-parser';
import { Router } from 'express';
import { registeredAdd } from './utility/registered_courses';
import { respReg } from './utility/register_response';
import { get_faculty } from './utility/get_faculty';
import { get_course } from './utility/get_course_id';
import { check_stu_token } from './utility/check_student_token';
const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
// Use CORS middleware
import adminRouter from './routes/admin';
app.use(cors());
app.use('/admin', adminRouter);

// Use body-parser middleware


// Add your routes and endpoints here
// ...

// Start the server

const PORT: number = 3000; // Choose any port number you want
app.get('/faculty/:id',async(req,res)=>
{
    const token = req.headers.authorization?.split(" ") as string[]
    const bt = token[1].toString();
    const ch:boolean= await check_stu_token(bt);
      if(!ch)
      {
          return res.status(403).json({ error: 'Unauthorized Access' });
      }
  const id=req.params.id;
  const resp= await get_faculty(id);
  if(resp){
  const resp_full={
    success:true,
    data:resp
  }
  res.status(200);
  res.send(resp_full);
}
else{
    res.status(500);
    res.send("fail");
}
});
app.get('/course/:id',async(req,res)=>
{
    const token = req.headers.authorization?.split(" ") as string[]
    const bt = token[1].toString();
    const ch:boolean= await check_stu_token(bt);
      if(!ch)
      {
          return res.status(403).json({ error: 'Unauthorized Access' });
      }
  const id=req.params.id;
  const resp= await get_course(id); 
  if(resp){
    const resp_full={
    success:true,
    data:resp
  }
    res.status(200);
    res.send(resp_full);
  }
  else{
      res.status(500);
      res.send("fail");
  }
});
app.post('/register', async(req,res)=>
{
    const token = req.headers.authorization?.split(" ") as string[]
    const bt = token[1].toString();
    const ch:boolean= await check_stu_token(bt);
      if(!ch)
      {
          return res.status(403).json({ error: 'Unauthorized Access' });
      }
      const resp=await respReg(bt);
      if(resp){
        const resp_full={
            success:true,
            data:resp
        };
        res.status(200);
        res.send(resp);
      }
      else{
          res.status(500);
          res.send("fail");
      }
      
      

});
app.get('/timetable',async(req,res)=>
{
    const token = req.headers.authorization?.split(" ") as string[]
    const bt = token[1].toString();
    const ch:boolean= await check_stu_token(bt);
      if(!ch)
      {
          return res.status(403).json({ error: 'Unauthorized Access' });
      }
    const id="170";
    const resp= await respReg(id);
    if(resp){
        const resp_full={
            success:true,
            data:resp
        };
        res.status(200);
        res.send(resp);
      }
      else{
          res.status(500);
          res.send("fail");
      }

});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});

