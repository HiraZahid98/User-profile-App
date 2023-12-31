import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';

const PersonalReferences5 = (userData) => {
  const userName = userData.userData.userData.userData.userinfo.username;
  const profileLink= userData.perRefLink5
 
  const [formInputs, setFormInputs] = useState({
    personalRefernce5: "",
  });
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formInputs.personalRefernce5) {
      toast.error("Personal Reference 5 URL is required");
      setLoading(false);
      return; 
    }
    const data = {
      Username:userName,
      personal_reference_5: formInputs.personalRefernce5,
     
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
        throw new Error(`Failed to submit Personal Refernece ID 5: ${response.status}`);
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
        <Button className='mb-5' variant="dark" size="sm" onClick={() => {window.open(profileLink, '_blank');}}>Personal Reference 5</Button>    

        <h3>Your Personal reference 5 (Name, email, phone, relationship, address) (the person will become member while accepting)</h3>
        <Form>
        <Form.Group className="mb-3" controlId="personalRefernce5">
          <Form.Label className='labelsStyle'>Personal Reference5 Profile</Form.Label>
          <Form.Control className='inputStyle' type="text" placeholder='Enter Personal Reference5' onChange={handleOnChange}/>
        </Form.Group> 
            <Button variant="dark" onClick={handleSubmit} className='' size="lg">{loading ? "Updating" :"Update Your Personal Reference 5"}</Button>
          </Form>
    </div>
  )
}

export default PersonalReferences5
