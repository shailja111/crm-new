import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LeadForm.css";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { Accordion } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLeads } from "../../redux/leadsSlice";

const salutationOptions = {
  "Mr": 1,
  "Mrs": 2,
  "Miss": 3,
  "Dr.": 4,
  "Sir": 5,
  "Madam": 6
};

const statusOptions = {
  "Pending Quotation": 1,
  "Not Interested": 2,
  "Interested": 3,
  "Data": 4,
  "Meeting": 5,
  "Quotation Send": 6,
  "Quotation Win": 7,
  "Quotation Loss": 8,
  "No Answer": 9
};

const followUpOptions = {
  "Yes": true,
  "No": false
};


// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  salutation: Yup.string().required("Salutation is required"),
  leadName: Yup.string().required("Lead Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  // followUp: Yup.string().required("Follow-up decision is required"),
  // status: Yup.string().required("Status is required"),
  // website: Yup.string().url("Invalid URL"),
  mobile: Yup.string().min(10, "Mobile number must be at least 10 digits"),
  officeNumber: Yup.string().min(10, "Office phone number must be at least 10 digits"),
  // country: Yup.string().required("Country is required"),
  // state: Yup.string().required("State is required"),
  // city: Yup.string().required("City is required"),
  // postalCode: Yup.string().required("Postal Code is required"),
  address: Yup.string().required("Address is required")
});

function LeadForm({ leadData, isEditing }) {


  console.log("LeadData in LeadForm ", leadData)
  const [isExpanded, setIsExpanded] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const dispatch = useDispatch();
 
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };



  useEffect(() => {
    // Set initial values once leadData is available
    if (isEditing && leadData) {
      setInitialValues({
        salutation: Object.keys(salutationOptions).find(key => salutationOptions[key] === leadData?.Salutation) || "",
        leadName: leadData?.FullName || "",
        email: leadData?.Email || "",
        leadValue: leadData?.LeadValue || "",
        followUp: leadData?.AllowFollowUp ? "Yes" : "No",
        status: Object.keys(statusOptions).find(key => statusOptions[key] === leadData?.LeadsStatus) || "",
        companyName: leadData?.CampaignName || "",
        mobile: leadData?.PhoneNumber || "",
        country: leadData?.Country || "",
        state: leadData?.State || "",
        city: leadData?.City || "",
        postalCode: leadData?.PostalCode || "",
        address: leadData?.Address || ""
      });
    } else {
      setInitialValues({
        salutation: "",
        leadName: "",
        email: "",
        leadValue: "",
        followUp: "No",
        status: "",
        companyName: "",
        mobile: "",
        country: "",
        state: "",
        city: "",
        postalCode: "",
        address: ""
      });
    }
  }, [leadData,isEditing]);
 


  const notify = (message) => toast(message);

  return initialValues ? (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        
       

        const mappedData = {
          Id: leadData ? leadData.Id : 0,  // Setting to 0 for a new lead
          AdId: "",
          AdsetId: "",
          AdName: values.leadName,
          Email: values.email,
          CampaignName: values.companyName,
          PhoneNumber: values.mobile,
          StatusCategory: statusOptions[values.status],
          Product: 0,
          Country: values.country,
          State: values.state,
          PostalCode: values.postalCode,
          Address: values.address,
          Salutation: salutationOptions[values.salutation],
          FullName: values.leadName,
          LeadValue: values.leadValue,
          AllowFollowUp: followUpOptions[values.followUp],
        };

        try {
          const response = await axios.post('Leads/SaveDataToDb', mappedData);

          // Check if the status code is 200 (success)
          if (response.status === 200) {
           
            resetForm(); 
            dispatch(fetchLeads());  
            notify("Lead saved successfully!"); 
           
          } else {
            
            notify("Failed to save the Lead!"); 
          }
        } catch (error) {
          console.error("Error saving lead data:", error);
          notify("An error occurred while saving the Lead.");
        }

      }}

    >
      {({ submitForm, setFieldValue }) => (
        <div className="lead-form-container">
          <h3 className="form-heading" id="lead-form-title">
            Add Lead Info
          </h3>
          <div className="lead-form">
            <div className="section-header">
              <h4>Lead Details</h4>
              <hr />
            </div>
            <Form className="lead-form-body row" >
              <div className="form-group col-md-4">
                <label htmlFor="salutation">Salutation</label>
                <Field as="select" name="salutation" className="form-control" id="salutation">
                  <option value="">----</option>
                  {Object.keys(salutationOptions).map((salutation) => (
                    <option key={salutation} value={salutation}>
                      {salutation}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="salutation" component="div" className="text-danger" />
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="leadName">Lead Name</label>
                <Field
                  type="text"
                  name="leadName"
                  className="form-control"
                  id="lead-name"
                  placeholder="e.g. John Doe"
                />
                <ErrorMessage name="leadName" component="div" className="text-danger" />
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  id="inputEmail4"
                />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="leadValue">Lead Value</label>
                <Field
                  type="text"
                  name="leadValue"
                  className="form-control"
                  id="lead-value"
                  placeholder="e.g. $5000"
                />
                <ErrorMessage name="leadValue" component="div" className="text-danger" />
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="followUp">Allow Follow Up</label>
                <Field as="select" name="followUp" className="form-control" id="follow-up">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Field>
                <ErrorMessage name="followUp" component="div" className="text-danger" />
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="status">Status</label>
                <Field as="select" name="status" className="form-control" id="status">
                  <option value="">----</option>
                  {Object.keys(statusOptions).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="status" component="div" className="text-danger" />
              </div>

              {/* <div className="form-group col-md-4">
                <label htmlFor="product">Product</label>
                <Field as="select" name="product" className="form-control" id="product">
                  <option value="">----</option>
                  <option value="Pending Quotation">Pending Quotation</option>
                  <option value="Not Interested">Not Interested</option>
                  <option value="Interested">Interested</option>
                  <option value="Data">Data</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Quotation Send">Quotation Send</option>
                  <option value="Quotation Win">Quotation Win</option>
                  <option value="Quotation Loss">Quotation Loss</option>
                  <option value="No Answer">No Answer</option>
                </Field>
                <ErrorMessage name="product" component="div" className="text-danger" />
              </div> */}
            </Form>
          </div>

          {/* Company Section */}

          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header id="company-toggle" onClick={handleToggle}>{isExpanded ? <FaAngleDown /> : <FaAngleUp />}  <h2 className="comp">Company Details</h2></Accordion.Header>
              <Accordion.Body>
                <Form className="lead-form-company" >
                  <div className="lead-form-body row">
                    <div className="form-group col-md-3">
                      <label htmlFor="companyName"> Company Name </label>
                      <Field
                        type="text"
                        name="companyName"
                        className="form-control"
                        id="company-name"
                        placeholder="e.g. Acme Corporation"
                      />
                      <ErrorMessage
                        name="companyName"
                        component="div"
                        className="text-danger"
                      />

                    </div>

                    {/* <div className="form-group col-md-3">
                    <label htmlFor="website">Website</label>
                    <Field
                      type="text"
                      name="website"
                      className="form-control"
                      id="basic-url"
                      placeholder="e.g. https://www.acme.com"
                    />
                    <ErrorMessage
                      name="website"
                      component="div"
                      className="text-danger"
                    />
                  </div> */}

                    <div className="form-group col-md-3">
                      <label htmlFor="mobile">Mobile</label>
                      <Field
                        type="text"
                        name="mobile"
                        className="form-control"
                        id="mobile"
                        placeholder="e.g. 1234567890"
                      />
                      <ErrorMessage
                        name="mobile"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    {/* <div className="form-group col-md-3">
                    <label htmlFor="officeNumber">Office Phone Number</label>
                    <Field
                      type="text"
                      name="officeNumber"
                      className="form-control"
                      id="office-number"
                      placeholder="e.g. 1234567890"
                    />
                    <ErrorMessage
                      name="officeNumber"
                      component="div"
                      className="text-danger"
                    />
                  </div> */}

                    <div className="form-group col-md-3">
                      <label htmlFor="country">Country</label>
                      <Field as="select" name="country" className="form-control">
                        <option value="">Choose...</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="India">India</option>
                      </Field>
                      <ErrorMessage name="country" component="div" className="text-danger" />
                    </div>

                    <div className="form-group col-md-3">
                      <label htmlFor="state">State</label>
                      <Field as="select" name="state" className="form-control">
                        <option value="">Choose...</option>

                        {/* United States */}
                        <option value="California">California</option>
                        <option value="New York">New York</option>

                        {/* Canada */}
                        <option value="Ontario">Ontario</option>
                        <option value="British Columbia">British Columbia</option>

                        {/* India */}
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Karnataka">Karnataka</option>
                      </Field>
                      <ErrorMessage name="state" component="div" className="text-danger" />
                    </div>

                    <div className="form-group col-md-3">
                      <label htmlFor="city">City</label>
                      <Field as="select" name="city" className="form-control">
                        <option value="">Choose...</option>

                        {/* California Cities */}
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="San Francisco">San Francisco</option>

                        {/* New York Cities */}
                        <option value="New York City">New York City</option>
                        <option value="Buffalo">Buffalo</option>

                        {/* Ontario Cities */}
                        <option value="Toronto">Toronto</option>
                        <option value="Ottawa">Ottawa</option>

                        {/* British Columbia Cities */}
                        <option value="Vancouver">Vancouver</option>
                        <option value="Victoria">Victoria</option>

                        {/* Maharashtra Cities */}
                        <option value="Mumbai">Mumbai</option>
                        <option value="Pune">Pune</option>

                        {/* Karnataka Cities */}
                        <option value="Bangalore">Bangalore</option>
                        <option value="Mysore">Mysore</option>
                      </Field>
                      <ErrorMessage name="city" component="div" className="text-danger" />
                    </div>

                    <div className="form-group col-md-3">
                      <label htmlFor="postalCode">Postal Code</label>
                      <Field
                        type="text"
                        name="postalCode"
                        className="form-control"
                        id="inputZip"
                      />
                      <ErrorMessage
                        name="postalCode"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <label htmlFor="address">Address</label>
                      <Field
                        as="textarea"
                        name="address"
                        className="form-control"
                        id="address"
                        rows="3"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <div className="form-group">

          </div>


          <div className="lead-form-buttons">
            <div className="btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                className="btn btn-secondary mr-3"
                onClick={async () => {
                  await setFieldValue("saveAndAddMore", true);
                  submitForm();
                }}
              >
                Save
              </button>
              
              <button
                type="button"
                className="btn btn-secondary mr-3"
                onClick={async () => {
                  await setFieldValue("saveAndAddMore", true);
                  submitForm();
                }}
              >
                Save & Add More
              </button>
              <button type="button" className="btn btn-secondary mr-3">
                Cancel
              </button>
            </div>
            <ToastContainer />
          </div>
        </div>
      )}
    </Formik>
  ): (
    <div>Loading...</div> // show loading indicator until leadData is ready
  );
}

export default LeadForm;
