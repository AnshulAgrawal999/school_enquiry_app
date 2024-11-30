import React, { useState, useEffect } from 'react'  ;

import { useMutation, useQueryClient } from 'react-query'  ;

import {
  modalOverlayStyle,
  modalStyle,
  formStyle,
  labelStyle,
  inputStyle,
  checkboxStyle,
  saveButtonStyle,
  cancelButtonStyle
} from './EditEnquiry.css'  ; 


type Enquiry = {
  _id : string  ;
  guardianName: string;
  relation: string;
  guardianEmail: string;
  guardianPhoneNumber: string;
  guardianMobileNumberOpt: string;
  studentName: string;
  gender: string;
  currentClass: string;
  dateOfBirth: string;
  currentSchool: string;
  lastYearGrade: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  enquirySource: string;
  description: string;
  wantHostel: boolean;
  wantTransport: boolean;
};

export const EditModal: React.FC<{
  isOpen: boolean;
  enquiry: Enquiry | null;
  onClose: () => void;
  onSave: (updatedEnquiry: Enquiry) => Promise<void>; // Accepts async functions
}> = ({ isOpen, enquiry, onClose, onSave }) => { 

  const queryClient = useQueryClient()  ;

  const [ formData , setFormData ] = useState<Enquiry>(
    enquiry ?? {
      _id: '',
      guardianName: '',
      relation: 'father',
      guardianEmail: '',
      guardianPhoneNumber: '',
      guardianMobileNumberOpt: '',
      studentName: '',
      gender: 'male',
      currentClass: 'Pre-School',
      dateOfBirth: '',
      currentSchool: '',
      lastYearGrade: 'not applicable',
      address: {
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
      },
      enquirySource: 'referral',
      description: '',
      wantHostel: false,
      wantTransport: false,
    }
  );
  

  useEffect( () => {

    if ( enquiry ) {
      setFormData( enquiry )  ;
    }
  }, [ enquiry ] )  ;
  
  

  const updateEnquiryMutation = useMutation(

    async ( updatedEnquiry : Enquiry ) => {


      const response = await fetch( `http://localhost:4000/admin/${updatedEnquiry._id}` , 
        {
          method: 'PATCH' ,
          headers: { 'Content-Type' : 'application/json' } ,
          body: JSON.stringify( updatedEnquiry ) ,
        }
      )  ;

      if ( !response.ok ) {

        const errorData = await response.json()  ;

        console.error( "Error response:" , errorData )  ;

        throw new Error( errorData.message || 'Failed to update enquiry' )  ;
      }
  
      return response.json()  ;

    } ,

    {
      onSuccess : () => {

        // Invalidate and refetch data

        queryClient.invalidateQueries( 'enquiries' )  ;

        onClose()  ; // Close modal on success

      },

      onError : ( error: any ) => {

        console.error( 'Update failed:' , error.message )  ;

        alert( error.message || 'Failed to update enquiry' )  ;

      },
    }
  )  ;


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {

    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData( (prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault()  ;

  
    // Validation: Ensure fields aren't empty unless optional
    if (!formData.guardianName || !formData.studentName) {
      alert("Please fill in all required fields.");
      return;
    }
  
    updateEnquiryMutation.mutate( formData )  ;
  };
  

  if (!isOpen) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <h2>Edit Enquiry</h2>
        <form onSubmit={handleSubmit} style={formStyle}>

          {/* Guardian Info */}
          <label style={labelStyle}>Guardian Name</label>
          <input
            type="text"
            name="guardianName"
            value={formData.guardianName || '' }
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={labelStyle}>Relation</label>
          <select
            name="relation"
            value={formData.relation}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="father">Father</option>
            <option value="mother">Mother</option>
            <option value="guardian">Guardian</option>
          </select>
          <label style={labelStyle}>Guardian Email</label>
          <input
            type="email"
            name="guardianEmail"
            value={formData.guardianEmail}
            onChange={handleChange}
            style={inputStyle}
          />
          <label style={labelStyle}>Guardian Phone Number</label>
          <input
            type="text"
            name="guardianPhoneNumber"
            value={formData.guardianPhoneNumber}
            onChange={handleChange}
            style={inputStyle}
          />
          <label style={labelStyle}>Guardian Mobile (Optional)</label>
          <input
            type="text"
            name="guardianMobileNumberOpt"
            value={formData.guardianMobileNumberOpt}
            onChange={handleChange}
            style={inputStyle}
          />
          {/* Student Info */}
          <label style={labelStyle}>Student Name</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            style={inputStyle}
          />
          <label style={labelStyle}>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          <label style={labelStyle}>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            style={inputStyle}
          />
          <label style={labelStyle}>Current Class</label>
          <select
            name="currentClass"
            value={formData.currentClass}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="Pre-School">Pre-School</option>
            <option value="Pre-Nursery">Pre-Nursery</option>
            {/* Add other classes as required */}
          </select>
          {/* Address Fields */}
          <label style={labelStyle}>Address</label>
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.address.street}
            onChange={handleAddressChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.address.city}
            onChange={handleAddressChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.address.state}
            onChange={handleAddressChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.address.pincode}
            onChange={handleAddressChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.address.country}
            onChange={handleAddressChange}
            style={inputStyle}
          />
          {/* Enquiry Details */}
          <label style={labelStyle}>Enquiry Source</label>
          <select
            name="enquirySource"
            value={formData.enquirySource}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="referral">Referral</option>
            <option value="youtube">YouTube</option>
            <option value="instagram">Instagram</option>
            <option value="school_fair">School Fair</option>
            <option value="others">Others</option>
          </select>
          <label style={labelStyle}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={inputStyle}
          />
          <label style={labelStyle}>Hostel Required</label>
          <input
            type="checkbox"
            name="wantHostel"
            checked={formData.wantHostel}
            onChange={handleChange}
            style={checkboxStyle}
          />
          <label style={labelStyle}>Transport Required</label>
          <input
            type="checkbox"
            name="wantTransport"
            checked={formData.wantTransport}
            onChange={handleChange}
            style={checkboxStyle}
          />
          {/* Buttons */}
          <div>
            <button type="submit" style={saveButtonStyle}>
            {updateEnquiryMutation.isLoading ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={onClose} style={cancelButtonStyle}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


