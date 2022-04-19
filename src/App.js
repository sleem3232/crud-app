import './App.css';
import {useState,useEffect} from 'react';
import axios from 'axios';

function App() {

  const [item,setItem]=useState(
    {
      title:"",
      description:"",
    });
    function handelChange(event){
      const {name,value}=event.target;
      setItem(prevInput=>{
        return(
          {
            ...prevInput,
            [name]:value,
          }
        )
      })
  
    }
    const [items,setItems]=useState([{
      title:"",
      description:"",
      _id:"",

    }]);
    useEffect(()=>{
      fetch("http://localhost:3001/items")
      .then(res=>{
        if(res.ok){
          return res.json();
        }
      }).then(jsonRes=>setItems(jsonRes))

      .catch(err=>console.log(err));
    },[]);
   
 function Additem(event){
   event.preventDefault();
   const newItem={
     title:item.title,
     description:item.description
   }
   axios.post("http://localhost:3001/newitem",newItem);
   console.log("newitem")
   alert('item added');

   setItem({
     title:"",
     description:"",
   });
 }
 function deletItem(id){
   axios.delete("http://localhost:3001/delete" +id);
   alert('item deleted');
   console.log(`delete item with id ${id}`)
 }
 const [qoust,setqutes]=useState('');
 const getqute=()=>{
   fetch("http://localhost:3001/items")
   .then(res=>res.json())
   .then(data=>{
     //let randomnum=Math.floor(Math.random()*data.length);
     setqutes(data[0]);
     console.log(data[0])
   })
 }
  return (
    <div className="App">
        {qoust.text}
      <div className="main">
        <input onChange={handelChange} name="title" value={item.title} placeholder="titel"></input>
        <input onChange={handelChange} name="description" value={item.description}  placeholder="description"></input>
        <button onClick={Additem}>Additem</button>
       
        <button onClick={getqute}>get items</button> 
               </div>
        {items.map(item=>{
          return(
            <div key={item._id} style={{background:'blue',width:'40%',margin:'auto auto'}}>
              <p>{item.title}</p>
              <p>{item.description}</p>
              <button onClick={()=>deletItem(item._id)}>DELETE</button>
              
              <button>Update</button>
             
            </div>
          )
        })}
    </div>
  );
}

export default App;
