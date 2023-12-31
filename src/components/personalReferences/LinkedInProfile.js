import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Iframe from 'react-iframe'

const LinkedInProfile = (userData) => {
  const linkedinLink_value= userData.linkedinLink
  console.log(linkedinLink_value)
  const userName = userData.userData.userData.userData.userinfo.username;
 
  const [formInputs, setFormInputs] = useState({
    linkedInProfile: "",
  });
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
    console.log(formInputs.link)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
      // Validate the input field
      if (!formInputs.linkedInProfile) {
        toast.error("LinkedIn profile URL is required");
        setLoading(false);
        return; 
      }
    const data = {
      Username:userName,
      Linkedin:formInputs.linkedInProfile
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
        throw new Error(`Failed to submit device IDs: ${response.status}`);
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
        
      
        <Iframe url="https://www.linkedin.com/"
          width="100%"
          height="100%"
        />
        <Button className='mb-5' variant="dark" size="sm" onClick={() => {window.open(linkedinLink_value, '_blank');}}>My LinkedIn Profile</Button>    
          <Form>
        <Form.Group className="mb-3" controlId="linkedInProfile">
          <Form.Label className='labelsStyle'>Linked In Profile</Form.Label>
          <Form.Control className='inputStyle' type="text" placeholder='Enter linked in profile url' onChange={handleOnChange}/>
        </Form.Group> 
            <Button onClick={handleSubmit} variant="dark" className='' size="lg" >{loading ? "Updating..." : "Update Your Linkedin Profile"}</Button>
        </Form>
    </div>
  )
}

export default LinkedInProfile
