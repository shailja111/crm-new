import React, { useState } from 'react'

import { useLocation} from 'react-router-dom';
import './View.css'
import Profile from './Profile/Profile';



function View() {
 
  const { state } = useLocation();
  const leadDetails = state?.leadDetails;


  
  return (
    <div className='container-fluid'>
      <div className='row  ' >
        <div className='col-md-12 mt-3' >
          <div id="tab-viewrow">
            <h1 >{leadDetails.FullName}</h1>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-12'>
        <Profile leadDetails={leadDetails} />
        </div>
      </div>

      

      
    </div>
  )
}

export default View