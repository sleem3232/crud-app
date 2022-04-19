const express =require("express");
const app=express();
const cors=require("cors");
const mongoose=require("mongoose");

const port=3001;



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))

mongoose.connect("mongodb+srv://salim:salim@cluster0.idfuq.mongodb.net/newitemsDB?retryWrites=true&w=majority")
const itemSchema={
    title:String,
    description:String
}
const Item=mongoose.model("Item",itemSchema);



app.get("/items",(req,res)=>{
    Item.aggregate([{
        $match:{}
        
    }, { $sample: { size: 1 } }])
    .then((items)=>res.json(items))
    .catch((err)=>res.status(400).json("erro:"+ err));
});




   
app.post("/newitem",(req,res)=>{
    const newItem=new Item(
        {
            title:req.body.title,
            description:req.body.description,
        }
    );
    newItem.save()
    .then(item=>console.log(item))
    .catch(err=>res.status(400).json('Erro'+err))

})
app.delete("http://localhost:3001/delete",(req,res)=>{
    const id=req.params.id;
    console.log("id");
    Item.findOneAndDelete(id,(req,res,err)=>{
        if(!err){
            console.log("itemdletet")
        }else{
            console.log(err)
        }
    })
})

app.listen(port,function(){
    console.log("exprees port running");
});