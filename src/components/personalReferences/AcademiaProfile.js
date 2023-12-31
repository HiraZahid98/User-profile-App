import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';

const AcademiaProfile =  (userData)=> {
  
  const userName = userData.userData.userData.userData.userinfo.username;
  const profileLink= userData.academiaLink
  const [formInputs, setFormInputs] = useState({
    academiaProfile: "",
  });
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
   // Validate the input field
   if (!formInputs.academiaProfile) {
    toast.error("Academia profile URL is required");
    setLoading(false);
    return; 
  }
    const data = {
      Username:userName,
      academia_profile: formInputs.academiaProfile,
     
    };
  console.log(data)
    try {
      const response = await fetch("https://100097.pythonanywhere.com/Reference_form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
  
        toast.success("success");
      } else {
        throw new Error(`Failed to submit Academia IDs: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
        <ToastContainer position="top-right"/>

        <Button className='mb-5' variant="dark" size="sm" onClick={() => {window.open(profileLink, '_blank');}}>My Academia Profile</Button>    
       
             <Form>
        <Form.Group className="mb-3" controlId="academiaProfile">
          <Form.Label className='labelsStyle'>Academia Profile</Form.Label>
          <Form.Control className='inputStyle' onChange={handleOnChange} type="text" placeholder='Enter Academia profile url'/>
        </Form.Group> 
            <Button variant="dark" onClick={handleSubmit} size="lg">{loading? "Updating" : "Update Your Academia Profile"}</Button>
         </Form>
    </div>
  )
}

export default AcademiaProfile
