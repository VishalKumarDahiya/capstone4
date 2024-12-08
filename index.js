import ejs from "ejs";
import express from "express";
import axios from "axios";

const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
const port=3000;
const apiKey="openuv-d4egrm4f8fd3p-io";
const headers ={
    "x-access-token":apiKey
};
const URL ="https://api.openuv.io";


app.get("/", (req,res)=>{
    res.render("index.ejs",{inputData:{}});
});


app.post("/",async (req,res)=>{
    const config={
        "headers":headers,
        "params":req.body
    };
    console.log(config);

    try {
        const response=await axios.get(URL+"/api/v1/uv", config );
        const result=response.data;

        console.log({data:result});
        res.render("index.ejs",{data:result, inputData:req.body});

        
    } catch (error) {
        console.log(error.data);
        
    }
});




app.listen(port,(req,res)=>{console.log(`app is listening at port: ${port}`)});