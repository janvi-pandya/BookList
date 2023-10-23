import React, { useEffect, useState } from "react";
import axios from "axios";
import './bookForm.css';

const BookForm=(props)=>{
    const [reset,setReset]=useState(true);
    const [formData,setFormData]=useState({
        author:'',
        country:'',
        language:'',
        link:'',
        pages:'',
        title:'',
        year:'',
        id:-1
    });
    useEffect(()=>{
        if (props?.value)
            setFormData({...formData,
                title:props.value.title,
                country:props.value.country,
                year:props.value.year,
                language:props.value.language,
                link:props.value.link,
                pages:props.value.pages,
                author:props.value.author,
                id:props.value.id
            })
    },[props?.value])
    async function handleSubmit(event,value){
        event.preventDefault ();
        if(value==="Add"){
            const {data} = await axios.post("http://68.178.162.203:8080/application-test-v1.1/books",{
                "author":formData.author,
                "country":formData.country,
                "language":formData.language,
                "link":formData.link,
                "pages":formData.pages,
                "title":formData.title,
                "year":formData.year
            });
            
            console.log("Data",data)
        } else{
            const {data}=await axios.put(`http://68.178.162.203:8080/application-test-v1.1/books/${formData.id}`,{
                "author":formData.author,
                "country":formData.country,
                "language":formData.language,
                "link":formData.link,
                "pages":formData.pages,
                "title":formData.title,
                "year":formData.year
            });
            
            console.log(data)
        }
    }
    return(
        <form className="form-style">
            <input type="text" name="title" onChange={(e)=>setFormData({...formData,title:e.target.value})} value={formData.title} placeholder="Title"required/>
            <input type="text" name="author" onChange={(e)=>setFormData({...formData,author:e.target.value})} value={formData.author} placeholder="Author"required/>
            <input type="text" name="country" onChange={(e)=>setFormData({...formData,country:e.target.value})} value={formData.country} placeholder="Country"/>
            <input type="text" name="language" onChange={(e)=>setFormData({...formData,language:e.target.value})} value={formData.language} placeholder="Language"/>
            <input type="text" name="link" onChange={(e)=>setFormData({...formData,link:e.target.value})} value={formData.link} placeholder="Link"/>
            <input type="text" name="year" onChange={(e)=>setFormData({...formData,year:e.target.value})} value={formData.year} placeholder="Year"/>
            <input type="text" name="pages" onChange={(e)=>setFormData({...formData,pages:e.target.value})} placeholder="Pages"value={formData.pages}/>
            <button className="button" name={props.value?"Edit":"Add"} onClick={(event)=>handleSubmit(event,event.target.name)}>{props.value?"Edit":"Add"}</button>
            <button className="reset" name='reset' onClick={(event)=>setReset(!reset)}>Reset</button>
        </form>
    );
}
export default BookForm;