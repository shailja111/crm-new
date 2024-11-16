import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const fetchLeads = createAsyncThunk(
    'leads/fetchLeads',
    async (_, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem('authToken');
      const response = await axios.get('LeadsGenerate/FetchAndSaveData', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return response.data.leadsList; // Returns the response to be used in the fulfilled state
    }
  );

  //Lead Details Format
  // {
  //   "Id": 1,
  //   "CreatedTime": "2024-07-10T10:33:36",
  //   "AdId": "string",
  //   "AdName": "string",
  //   "AdsetId": "string",
  //   "AdsetName": "Leads campaign UAE Auto Garage – Copy",
  //   "CampaignId": "c:120201198982810475",
  //   "CampaignName": "string",
  //   "FormId": "f:298717446079282",
  //   "FormName": "Mass Auto Garage Lead Ad",
  //   "IsOrganic": false,
  //   "Platform": "fb",
  //   "FullName": "string",
  //   "PhoneNumber": "string",
  //   "Email": "string",
  //   "City": "Dubai",
  //   "IsQualified": false,
  //   "IsQuality": false,
  //   "IsConverted": false,
  //   "LeadsStatus": 1,
  //   "Country": "string",
  //   "State": "string",
  //   "PostalCode": "string",
  //   "Address": "string",
  //   "StatusCategory": 0,
  //   "Product": 0,
  //   "Salutation": 0,
  //   "LeadValue": null,
  //   "AllowFollowUp": false
  // }


const leadsSlice = createSlice({
    name: 'leads',
    initialState: {
      loading: false,
      leads: [],
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchLeads.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchLeads.fulfilled, (state, action) => {
          state.loading = false;
          state.leads = action.payload; // Assuming the API returns an object with leadsList
          state.error = null;
        })
        .addCase(fetchLeads.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default leadsSlice.reducer;