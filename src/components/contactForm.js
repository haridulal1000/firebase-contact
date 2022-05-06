import './contactForm.css'
import {useState} from 'react';
const url=process.env.REACT_APP_URL
function ContactForm(){
    const [sent,setSent]=useState(false);
    const [user,setUser]= useState({
        name:"",
        email:"",
        number:"",
        message:""
    });
    return(
        <div className="container">
            <h2>{!sent?"Contact Us":"Message Sent"}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Enter your name" className="form-item" value={user.name} onChange={handleChange}required/>
                <input type="email" name="email" placeholder="Enter your email" className="form-item" value={user.email} onChange={handleChange}required/>
                <input type="text" name="number" placeholder="Enter your number" className="form-item" value={user.number} onChange={handleChange}required/>
                <textarea name="message" placeholder="Enter your message" className="form-item" rows="8" value={user.message} onChange={handleChange}required/>
                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    );
    function handleChange(e){
        const name= e.target.name;
        const value=e.target.value;
        setUser({...user,[name]:value});
    }
    async function handleSubmit(e){
        e.preventDefault();
        const res=await fetch(
            url,
            {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        }
        );
        if(res.status==200){
            setSent(true);
            setUser({
                name:"",
                email:"",
                number:"",
                message:""
            });
        }else{
            alert('Not sent');
        }
    }
}
export default ContactForm;