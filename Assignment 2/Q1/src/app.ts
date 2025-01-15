
import express, { Request, Response } from 'express';
import { handleFilterdata, Items,insertdata } from './logic';
import {connection} from './postgres/postgres';
connection();
const app=express();
app.use(express.json())

app.post('/data',(req,res)=>{
    const data:Items[]=req.body.items;
    const result=handleFilterdata(data)
    result.forEach(orderid => {
        insertdata(orderid);
      });
    res.status(200).json({
        status:"success",
        data:{
            result:result
        }
    })
})
app.listen(8005,()=>console.log('server started'))