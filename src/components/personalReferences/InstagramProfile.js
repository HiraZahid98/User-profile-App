import React from 'react'
import { Button } from 'react-bootstrap'
const InstagramProfile = () => {
  return (
    <div>
        <iframe
            title="Embedded Webpage"
            src="https://www.instagram.com/dowell_npslive/" 
            width="100%"
            height="500px"
            allowFullScreen
          ></iframe>
          <div className='text-center'>
            <Button variant="dark" className='' size="lg">Update Your Instagram Profile</Button>
          </div>
    </div>
  )
}

export default InstagramProfile
