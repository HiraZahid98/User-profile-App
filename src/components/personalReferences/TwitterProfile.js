import React,{useState} from 'react'
import { Button , Form} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';

const TwitterProfile = (userData) => {
  const userName = userData.userData.userData.userData.userinfo.username;
  const profileLink= userData.twitterLink
 
  const [formInputs, setFormInputs] = useState({
    twitterProfile: "",
  });
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formInputs.twitterProfile) {
      toast.error("Twitter Profile URL is required");
      setLoading(false);
      return; 
    }
    const data = {
      Username:userName,
      Twitter:formInputs.twitterProfile
    };
    
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
  
        toast.success("success");
      } else {
        throw new Error(`Failed to submit device IDs: ${response.status}`);
      }
    } catch (error) {
      toast.error("An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
              <ToastContainer position="top-right"/>
              <Button className='mb-5' variant="dark" size="sm" onClick={() => {window.open(profileLink, '_blank');}}>My Twitter Profile</Button>    

        <Form>
        <Form.Group className="mb-3" controlId="twitterProfile">
          <Form.Label className='labelsStyle'>Twitter Profile</Form.Label>
          <Form.Control className='inputStyle' type="text" placeholder='Enter twitter profile url' onChange={handleOnChange}/>
        </Form.Group> 
            <Button variant="dark" className='' onClick={handleSubmit} size="lg">{loading? "updating": "Update Your Twitter Profile"}</Button>
        </Form>  
    </div>
  )
}

export default TwitterProfile
