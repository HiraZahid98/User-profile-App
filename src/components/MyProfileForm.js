import React, {useState, useEffect} from 'react'
import { Container, Row, Col, Form, Button, FormSelect, FormGroup } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';

const MyProfileForm = (userData) => {
  const formdata = userData.userData.profileData;
    const [updating, setUpdating] = useState(false);
    const [apiResponse, setApiResponse] = useState({});
    const [updateApiResponse, setUpdateApiResponse] = useState({});
    const [responseMsg, setResponseMsg] = useState('');

    useEffect(() => {
      setApiResponse(formdata || {});
        }, [formdata]);
    const username=userData.userData.userData.userinfo.username
    const [formData, setFormData] = useState({
      username:username,
      first_name : formdata.Firstname || "",
      last_name: formdata.Lastname || "",
      email:formdata.Email || "",
      phone: formdata.Phone || "",
      ph_code : formdata.phonecode || "",
      image: '',
      address: formdata.address || "",
      zip_code: formdata.zip_code || "",
      location: formdata.user_location || "",
      city: formdata.user_city || "",
      country: formdata.user_country || "",
      native_langauage: formdata.native_language || "",
      nationality: formdata.nationality || "",
      language_preferences: formdata.language_preferences || "",
      vision: formdata.vision || "",
      otp:'',
      phone_otp:""
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
     
    const handleSubmitProfile = async () => {
      const requestData = {
        username:username,
        first_name : formData.first_name,
        last_name: formData.last_name,
        email:formData.email,
        phone: formData.phone,
        address: formData.address,
        zip_code:formData.zip_code,
        location: formData.country,
        city:formData.city,
        country: formData.country,
        native_language: formData.native_langauage,
        nationality:formData.nationality,
        language_preferences:formData.language_preferences,
        vision:formData.vision,
        image: formData.image,
        email_otp:parseInt(formData.otp),
        phonecode: formData.ph_code,
        phone_sms: parseInt(formData.phone_otp)
      };
      setUpdating(true);  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      };
      console.log(requestData)
  
      try {
        const response = await fetch('https://100014.pythonanywhere.com/api/profile_update/', requestOptions);
        const responseData = await response.json();
        console.log(responseData)
        setUpdateApiResponse(responseData)
        console.log(JSON.stringify(requestOptions))
        if (response.ok) {
          setUpdating(false);
          toast.success("success");
        } else {
          setUpdating(false);
          toast.error("An unknown error occurred");
          
        }
      } catch (error) {
        toast.error("Failure");
        setUpdating(false);
        console.log(error)
      }
    };
  

    const [isSendingOtp, setIsSendingOtp] = useState(false);

    const handleEmailOTP = async () => {
      try {
        setIsSendingOtp(true);

        const url = 'https://100014.pythonanywhere.com/api/emailotp/';
        const payload = {
          email: formData.email,
          username: username,
          usage: 'update_email',
        };
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        const data = await response.json();
        console.log(data)
        if (data.msg === 'success') {
          toast.success(data.info);
          // You can add additional logic or redirect the user as needed
        } else {
          toast.error(data.info);
        }
      } catch (error) {
        console.error('Error updating email:', error);
        toast.error(error);
        setResponseMsg('An error occurred while updating email');
      } finally {
        setIsSendingOtp(false);
      }
    };

    // phone otp 
    const [isSendingMobileOtp, setisSendingMobileOtp] = useState(false);

    const handlePhoneOTP = async () => {
      try {
        setisSendingMobileOtp(true);

        const url = 'https://100014.pythonanywhere.com/api/mobilesms/';
        const payload = {
          phonecode: formData.phone_Code,
          Phone:formData.phone
      };
      console.log(payload)
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        const data = await response.json();
        console.log(data)
        if (data.msg === 'success') {
          toast.success(data.info);
          // You can add additional logic or redirect the user as needed
        } else {
          toast.error(data.info);
        }
      } catch (error) {
        console.error('Error updating email:', error);
        toast.error(error);
      } finally {
        setisSendingMobileOtp(false);

      }
    };
  


    // country code 
    const [countries, setCountries] = useState([]);
  
    useEffect(() => {
      const fetchCountries = async () => {
        try {
          const response = await fetch('https://restcountries.com/v3.1/all');
          const data = await response.json();
          const countryData = data.map((country) => ({
            name: country.name.common,
            alpha2Code: country.cca2,
            phoneCode_country: country.ccn3,
          }));
          
          setCountries(countryData);
        } catch (error) {
          console.error('Error fetching countries:', error);
        }
      };
  
      fetchCountries();
    }, []);
  return (
    <div>
        <ToastContainer position="top-right"/>

      <Container fluid>
        {apiResponse?
            <Form>
        <Row>
            <Col sm={6}>
            <p className="myProfile text-white fw-bold text-center">01. My Profile</p>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label className='labelsStyle'>Your first name</Form.Label>
                    <Form.Control className='inputStyle' name="first_name" value={formData.first_name} onChange={handleInputChange} type="text" placeholder="Enter your first name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label className='labelsStyle'>Your last name</Form.Label>
                    <Form.Control className='inputStyle' name="last_name" value={formData.last_name} type="text" onChange={handleInputChange} placeholder="Enter your last name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phoneNumber">
                    <Form.Label className='labelsStyle'>Your phone number</Form.Label>
                    <Row>
                        <Col sm={2} md={2}>
                          <FormSelect className='countryInput' value={formData.ph_code} name="ph_code" onChange={handleInputChange}>              
                          {countries.map((country) => (
                            <option key={country.alpha2Code} value={country.phoneCode_country}>{country.phoneCode_country}</option>
                          ))}
                        </FormSelect>
                      
                        </Col>
                        <Col sm={10} md={10}>
                    <Form.Control className='inputStyle' name="phone" value={formData.phone} type="number" onChange={handleInputChange} placeholder="Enter your phone number" />
                </Col>
                </Row>
                </Form.Group>
                <Button onClick={handlePhoneOTP} variant="success" className='w-100'>{isSendingMobileOtp ? 'Sending OTP...' : 'OTP'}</Button>
              
                <Form.Group className="mb-3" controlId="phoneotp">
                    <Form.Label className='labelsStyle'>Enter OTP from Phone number</Form.Label>
                     <Form.Control className='inputStyle' name="phoneotp" value={formData.phoneotp} type="number" onChange={handleInputChange} placeholder="Enter OTP from phone number" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="yourEmial">
                    <Form.Label className='labelsStyle'>Your email</Form.Label>
                    <Form.Control className='inputStyle' name="email" value={formData.email} type="text" onChange={handleInputChange} placeholder="Enter your email" />
                </Form.Group>
                <Button onClick={handleEmailOTP} variant="success" className='w-100'>{isSendingOtp ? 'Sending OTP...' : 'OTP'}</Button>
                <Form.Group className="mb-3" controlId="otp">
                    <Form.Label className='labelsStyle'>Enter OTP from Email</Form.Label>
                    <Form.Control className='inputStyle' name="otp" value={formData.otp} type="number" onChange={handleInputChange} placeholder="Enter OTP from email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="yourAddress">
                    <Form.Label className='labelsStyle'>Your Address</Form.Label>
                    <Form.Control className='inputStyle'name="address" value={formData.address} as="textarea" onChange={handleInputChange} rows={3} placeholder="Enter your address" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="pin/zipcode">
                    <Form.Label className='labelsStyle'>Your PIN/ZIP code</Form.Label>
                    <Form.Control className='inputStyle' name="zip_code" value={formData.zip_code} type="text" onChange={handleInputChange} placeholder="Enter your PIN/ZIP Code" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="pin/zipcode">
                    <Form.Label className='labelsStyle'>Your City/Location</Form.Label>
                    <Form.Control className='inputStyle' name="city" type="text" value={formData.city} onChange={handleInputChange} placeholder="Enter your City Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="country">
                    <Form.Label className='labelsStyle'>Your City/Location</Form.Label>
                    <Form.Select aria-label="Country 1" name="country" value={formData.country} className='inputStyle' onChange={handleInputChange}>
                        <option value='country1'>Country 1</option>
                        <option value="country2">Country 2</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col sm={6}>
                <Form.Group className="mb-3" controlId="yourDesignation">
                    <Form.Label className='labelsStyle'>Your Designation</Form.Label>
                    <Form.Control className='inputStyle' name="designation" type="text" onChange={handleInputChange} placeholder="Enter your designation" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="yourTeamCode">
                    <Form.Label className='labelsStyle'>Your Team Code</Form.Label>
                    <Form.Control className='inputStyle' name="teamCode" onChange={handleInputChange} type="text" placeholder="Enter your team code" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="nativeLanguage">
                    <Form.Label className='labelsStyle'>Your Native Language</Form.Label>
                    <Form.Select aria-label="native_language" value={formData.native_langauage} name="native_langauage" className='inputStyle' onChange={handleInputChange}>
                        <option value="English">English</option>
                        <option value="chinese">Chinese</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="nationality">
                    <Form.Label className='labelsStyle'>Your Nationality</Form.Label>
                    <Form.Select aria-label="nationality" value={formData.nationality} name="nationality" className='inputStyle' onChange={handleInputChange}>
                        <option value="english">English</option>
                        <option value="chinese">Chinese</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="yourPhoto">
                    <Form.Label className='labelsStyle'>Your Photo</Form.Label>
                    <Form.Control name="photoDescription" onChange={handleInputChange} className='inputStyle' as="textarea" rows={3}/>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload new photo</Form.Label>
                    <Form.Control name="image" onChange={handleInputChange} className='inputStyle' type="file" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="yourVision">
                    <Form.Label className='labelsStyle'>Your Vision</Form.Label>
                    <Form.Control name="vision" onChange={handleInputChange} value={formData.vision} className='inputStyle' as="textarea" rows={3}/>
                </Form.Group>
                
                <Button onClick={handleSubmitProfile} variant="dark" className='w-100'>{updating? "Updating" : "Update"}</Button>

            </Col>
        </Row>
        </Form>:"Loading"}
      </Container>
    </div>
  )
}

export default MyProfileForm



