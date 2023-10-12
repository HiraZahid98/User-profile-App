import React from 'react'
import {Form, Button} from 'react-bootstrap'
const BehaviouralProfile = () => {
  return (
    <div>
            <p className="myProfile text-white fw-bold text-center">11. Behavioural Profile</p>

      <Form>

                <Form.Group className="mb-3" controlId="benefits">
                    <Form.Label className='labelsStyle'>Benefits you are looking while buying any product or service</Form.Label>
                    <Form.Select aria-label="benefits" className='inputStyle'>
                        <option value="Convenience">Convenience</option>
                        <option value="longLasting">Long Lasting</option>
                        <option value="economy">Economy</option>
                        <option value="valueForMoney">Value For Money</option>
                        <option value="mobility">Mobility</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="buying">
                    <Form.Label className='labelsStyle'>Your role while buying any product or service</Form.Label>
                    <Form.Select aria-label="buying" className='inputStyle'>
                        <option value="initiator">Initiator</option>
                        <option value="influencer">Influencer</option>
                        <option value="decider">Decider</option>
                        <option value="gatekeeper">Gatekeeper</option>
                        <option value="buyer">Buyer</option>
                        <option value="user">User</option>

                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="brand">
                    <Form.Label className='labelsStyle'>Brand loyalty level you will consider while buying any product or service</Form.Label>
                    <Form.Select aria-label="brand" className='inputStyle'>
                        <option value="Convenience">1 (Low)</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5 (High)</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="others">
                    <Form.Label className='labelsStyle'>Others</Form.Label>
                    <Form.Control className='inputStyle' type="text" placeholder="other details" />
                </Form.Group>
                <Button variant="dark" className='w-100'>Update Behavioural Profile</Button>

                </Form>
                   </div>
  )
}

export default BehaviouralProfile