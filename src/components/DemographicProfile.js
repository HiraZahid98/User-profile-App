import React,{useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';

const DemographicProfile = (userData) => {
  const demographics = userData._demographic;
console.log(demographics)
console.log(demographics.occupation)
    const [formInputs, setFormInputs] = useState({
        income: demographics.income_class || "",
        dateOfBirth: demographics.date_of_birth || "",
        gender: demographics.gender || "",
        parentStatus: demographics.parental_status || "",
        education: demographics.education || "",
        occupation: demographics.occupation || "",
        familySize: demographics.family_size || "",
        others: demographics.others_demographic || "",
      });
      const [loading, setLoading] = useState(false);
      const userName = userData.userData.userData.userinfo.username;
      const handleOnChange = (e) => {
        setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
      
        const data = {
          Username: userName,
          income: formInputs.income,
          dateOfBirth: formInputs.dateOfBirth,
          gender: formInputs.gender,
          parent: formInputs.parentStatus,
          education:formInputs.education,
          occupation:formInputs.occupation,
          familySize:formInputs.familySize,
          others:formInputs.others
        };
      
        try {
          const response = await fetch("https://100097.pythonanywhere.com/Demographic_form", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
      console.log(data)
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

        <p className="myProfile text-white fw-bold text-center">09. Demographic Profile</p>
        <Form.Group className="mb-3" controlId="income">
            <Form.Label className='labelsStyle'>Your income class in the society</Form.Label>
            <Form.Select aria-label="income" className='inputStyle' onChange={handleOnChange} value={formInputs.income}>
                <option>Top 10%</option>
                <option value="Top 11-20%">Top 11-20%</option>
                <option value="Top 21-30%">Top 20-30%</option>
                <option value="Top 30-40%">Top 30-40%</option>
                <option value="Top 40-50%">Top 40-50%</option>
                <option value="Below 50%">Below 50%</option>
            </Form.Select>
            </Form.Group>
                <Form.Group className="mb-3" controlId="dateOfBirth">
                    <Form.Label className='labelsStyle'>Your Date of Birth</Form.Label>
                    <Form.Control className='inputStyle' type="date" onChange={handleOnChange} placeholder="Enter your Date Birth" value={formInputs.dateOfBirth}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="gender">
                    <Form.Label className='labelsStyle'>Gender</Form.Label>
                    <Form.Select aria-label="gender" className='inputStyle' onChange={handleOnChange} value={formInputs.gender}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="parent">
                    <Form.Label className='labelsStyle'>Parental Status</Form.Label>
                    <Form.Select aria-label="parentStatus" className='inputStyle' onChange={handleOnChange} value={formInputs.parentStatus}>
                        <option value="parent">Parent</option>
                        <option value="not a parent">Not a parent</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="education">
                    <Form.Label className='labelsStyle'>Your Education</Form.Label>
                    <Form.Control className='inputStyle' type="text" value={formInputs.education} onChange={handleOnChange} placeholder="Enter your education"  name='education'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="occupation">
                    <Form.Label className='labelsStyle'>Your Occupation</Form.Label>
                    <Form.Control className='inputStyle' type="text" onChange={handleOnChange} placeholder="Enter your occupation" value={formInputs.occupation} name="occupation"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="familySize">
                    <Form.Label className='labelsStyle'>Your Family Size</Form.Label>
                    <Form.Control className='inputStyle' type="text" onChange={handleOnChange} placeholder="Enter number of members in your family" value={formInputs.familySize} name="familySize"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="others">
                    <Form.Label className='labelsStyle'>Others</Form.Label>
                    <Form.Control className='inputStyle' type="text" placeholder="other details" onChange={handleOnChange} value={formInputs.others}/>
                </Form.Group>
            <Button variant="dark" onClick={handleSubmit} className='w-100' size="lg">{loading ? "Updating..." :"Update Demographic Profile"}</Button>

    </div>
  )
}

export default DemographicProfile
