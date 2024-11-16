import React, { useEffect, useState } from 'react'
import './Profile.css'
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import FilesView from '../FilesView/FilesView';
import FollowUpView from '../FollowUpView/FollowUpView';
import Proposal from '../Proposal/Proposal';
import Notesview from '../Notes/Notesview';
import HistoryView from '../HistoryView/HistoryView';

function Profile({ leadDetails }) {

  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getFieldValue = (field) => field ? field : "------";

  if (!leadDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-9'>
          <div className='lead-data'>
            <div className='row'>
              <div className='col-md-12'> <h3 className='lead-d'>Lead Info</h3></div>
              <div className='col-md-6'>
                <div className='lead-details'>

                  <p className='f-14 text-lightest'>Lead Contact </p>
                  <p className='f-14 text-lightest'>Email</p>
                  <p className='f-14 text-lightest'>Company Name</p>
                  <p className='f-14 text-lightest'>Platform</p>
                  <p className='f-14 text-lightest'>Address</p>
                  <p className='f-14 text-lightest'>Lead Agent</p>

                </div>
              </div>
              <div className='col-md-6'>
              <p className='f-14 text-dark-grey'>{getFieldValue(leadDetails.FullName)}</p>
              <p className='f-14 text-dark-grey'>{getFieldValue(leadDetails.Email)}</p>
              <p className='f-14 text-dark-grey'>{getFieldValue(leadDetails.CampaignName)}</p>
              <p className='f-14 text-dark-grey'>{getFieldValue(leadDetails.Platform)}</p>
              <p className='f-14 text-dark-grey'>{getFieldValue(leadDetails.Address)}</p>
              <p className='f-14 text-dark-grey'>{getFieldValue(leadDetails.DealAgent)}</p>

              </div>
            </div>
          </div>

          
          <div className='mt-3'>
          <div className='tab-data lead-data'>
            <div className=''>
              <div className='col-md-12'>
                <Box sx={{ width: '100%' }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                  >
                    <Tab value="one" label="Files" />
                    <Tab value="two" label="Follow Up" />
                    <Tab value="three" label="Proposal" />
                    <Tab value="four" label="Notes" />
                    <Tab value="five" label="History" />
                  </Tabs>
                </Box>
              </div>
              
              <div className='col-md-12 mt-3'>
          {value === 'one' && (
            <Box>
              <div className='size-menu'>
              <FilesView/>
              </div>
            </Box>
          )
          }

          {value === 'two' &&(
              <Box>
              <FollowUpView/>
            </Box>
            )}

{value === 'three' &&(
              <Box>
               <Proposal/>
            </Box>
            )}

          {value === 'four' && (
            <Box>
            <Notesview/>
            </Box>
          )}

{value === 'five' && (
            <Box>
            <HistoryView/>
            </Box> 
          )}
        </div>

            </div>

          </div>

        </div>




        </div>
        <div className='col-md-3' >
          <div className='lead-info'>
            <div className='row'>
              <div className='col-md-12'><h3 className='lead-d'>Lead Details</h3></div>
              <div className='col-md-6'>
              <p className='f-14 text-lightest'>Lead Contact</p>
              <p className='f-14 text-lightest'>Email</p>
              <p className='f-14 text-lightest'>Phone Number</p>
              <p className='f-14 text-lightest'>City</p>
              </div>
              <div className='col-md-6'>
              <p className='f-14 text-dark-grey'>{getFieldValue(leadDetails.FullName)}</p>
              <p className='f-14 text-dark-grey'>{getFieldValue(leadDetails.Email)}</p>
              <p className='f-14 text-dark-grey'>{getFieldValue(leadDetails.PhoneNumber)}</p>
              <p className='f-14 text-dark-grey'>{getFieldValue(leadDetails.City)}</p>
              </div>
            </div>

          </div>
        </div>
       
      </div>
      <div className='row'></div>


    </div>
  );
}

export default Profile