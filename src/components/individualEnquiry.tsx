'use client'  ;

import { useParams } from "next/navigation"  ;

import axios from "axios"  ;

import { styles } from '../app/adminpanel/enquirytable/[id]/id.css'  ;

import { useMutation, useQuery } from 'react-query';

import { useEffect, useState } from "react";

import GoBackButton from '@/components/GoBackButton'  ;

const { 
  containerStyle , 
  headerStyle , 
  cardStyle , 
  fieldGroupStyle , 
  sectionHeaderStyle , 
  fieldStyle , 
  loadingStyle , 
  errorStyle 
} = styles  ;


type Address = {

  street : string  ;

  city : string  ;

  state : string  ;

  pincode : string  ;

  country : string  ;
}

type Enquiry = {

  studentName : string  ;

  gender : string  ;

  currentClass : string  ; 

  dateOfBirth : string  ;

  currentSchool : string  ;
  
  lastYearGrade : string  ;

  guardianName : string  ;

  relation : string  ;

  guardianPhoneNumber : string  ;

  guardianMobileNumberOpt : string  ;

  guardianEmail : string  ;

  address : Address  ;

  enquirySource : string  ;

  wantHostel : boolean  ;

  wantTransport : boolean  ;

  description : string  ;

  createdAt : string  ;

  updatedAt : string  ;
}




const fetchEnquiry = async ( id: string ) => {

  const response = await axios.get( `http://localhost:4000/admin/${id}` )  ;

  return response.data.existingEnquiryForm  ;
};

const updateEnquiry = async (id: string, data: Enquiry) => {
  const response = await axios.patch(`http://localhost:4000/admin/${id}`, data
    , {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};


export default function EnquiryDetailPage() {

  const params = useParams()  ;

  const { id } = params  ;

  const {
    data: enquiry,

    isLoading,

    isError,
    
    error,

  } = useQuery <Enquiry , Error > (

    [ 'enquiry' , id ] ,

    () => fetchEnquiry( id as string ) ,

    {
      enabled: !!id , // Only run query if 'id' is present
    }
  )  ;

  const [editData, setEditData] = useState<Enquiry | null>(null);

  // New: Added mutation for saving changes to the enquiry
  const { mutate: saveChanges, isLoading: isSaving } = useMutation(
    (newData: Enquiry) => updateEnquiry(id as string, newData),
    {
      onSuccess: () => {
        alert('Enquiry updated successfully!');
      },
      onError: () => {
        alert('Failed to update enquiry.');
      }
    }
  );

  
  // New: Set initial editData when enquiry is fetched
  useEffect(() => {
    if (enquiry) {
      setEditData(enquiry);
    }
  }, [enquiry]);


  // New: Handle changes in form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editData) {
      setEditData({
        ...editData,
        [e.target.name]: e.target.value,
      });
    }
  };


  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
  
    setEditData((prevData) => {
      if (!prevData) return null; // Ensure prevData isn't null
      return {
        ...prevData,
        [name]: checked, // Update only the targeted field
      };
    });
  };
  
  

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    if (editData) {
      setEditData({
        ...editData,
        address: {
          ...editData.address,
          [name]: value, // Directly use 'name' as the key for the address field
        },
      });
    }
  };
  

  // New: Handle save button click to submit changes
  const handleSave = () => {
    if (editData) {
      saveChanges(editData);
    }
  };


  if ( isLoading ) {

    return <p style={ loadingStyle } > Loading enquiry details... </p>  ;

  }

  if ( isError ) {

    return (

      <div style={errorStyle} >
        <p> Error: { error?.message } </p>
      </div>

    )  ;

  }

  if ( !enquiry ) {

    return (

      <div style={errorStyle} >
        <p> Enquiry not found </p>
      </div>

    )  ;

  }

  return (
    <div style={containerStyle}>

      <GoBackButton />

      <h1 style={headerStyle}>
        Enquiry Details
        <button
          onClick={handleSave}
          style={{ marginLeft: '20px', padding: '10px', cursor: 'pointer' }}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </h1>
  
      <div style={cardStyle}> 
        {/* Student Information */}
        <div style={fieldGroupStyle}>
          <h2 style={sectionHeaderStyle}>Student Information</h2>

          <p style={fieldStyle}><strong>Name:</strong></p>
          {editData ? (
            <input
              type="text"
              name="studentName"
              value={editData.studentName}
              onChange={handleChange}
              style={{ padding: '5px', width: '100%' }}
            />
          ) : (
            <p>{enquiry.studentName}</p>
          )}

          {/* Gender */}
          <p style={fieldStyle}><strong>Gender:</strong></p>
          {editData ? (
            <input
              type="text"
              name="gender"
              value={editData.gender}
              onChange={handleChange}
              style={{ padding: '5px', width: '100%' }}
            />
          ) : (
            <p>{enquiry.gender}</p>
          )}

          {/* Class */}
          <p style={fieldStyle}><strong>Class:</strong></p>
          {editData ? (
            <input
              type="text"
              name="currentClass"
              value={editData.currentClass}
              onChange={handleChange}
              style={{ padding: '5px', width: '100%' }}
            />
          ) : (
            <p>{enquiry.currentClass}</p>
          )}

          {/* Date of Birth */}
          <p style={fieldStyle}><strong>Date of Birth:</strong></p>
          {editData ? (
            <input
              type="date"
              name="dateOfBirth"
              value={editData.dateOfBirth}
              onChange={handleChange}
              style={{ padding: '5px', width: '100%' }}
            />
          ) : (
            <p>{enquiry.dateOfBirth}</p>
          )}

          {/* Current School */}
          <p style={fieldStyle}><strong>Current School:</strong></p>
          {editData ? (
            <input
              type="text"
              name="currentSchool"
              value={editData.currentSchool}
              onChange={handleChange}
              style={{ padding: '5px', width: '100%' }}
            />
          ) : (
            <p>{enquiry.currentSchool}</p>
          )}

          {/* Last Year Grade */}
          <p style={fieldStyle}><strong>Last Year Grade:</strong></p>
          {editData ? (
            <input
              type="text"
              name="lastYearGrade"
              value={editData.lastYearGrade}
              onChange={handleChange}
              style={{ padding: '5px', width: '100%' }}
            />
          ) : (
            <p>{enquiry.lastYearGrade}</p>
          )}
        </div>

        {/* Guardian Information */}
        <div style={fieldGroupStyle}>
          <h2 style={sectionHeaderStyle}>Guardian Information</h2>

          <p style={fieldStyle}><strong>Guardian Name:</strong></p>
          {editData ? (
            <input
              type="text"
              name="guardianName"
              value={editData.guardianName}
              onChange={handleChange}
              style={{ padding: '5px', width: '100%' }}
            />
          ) : (
            <p>{enquiry.guardianName}</p>
          )}

          <p style={fieldStyle}><strong>Relation:</strong></p>
          {editData ? (
            <input
              type="text"
              name="relation"
              value={editData.relation}
              onChange={handleChange}
              style={{ padding: '5px', width: '100%' }}
            />
          ) : (
            <p>{enquiry.relation}</p>
          )}

          <p style={fieldStyle}><strong>Email:</strong></p>
          {editData ? (
            <input
              type="email"
              name="guardianEmail"
              value={editData.guardianEmail}
              onChange={handleChange}
              style={{ padding: '5px', width: '100%' }}
            />
          ) : (
            <p>{enquiry.guardianEmail}</p>
          )}

          <p style={fieldStyle}><strong>Phone:</strong></p>
          {editData ? (
            <input
              type="tel"
              name="guardianPhoneNumber"
              value={editData.guardianPhoneNumber}
              onChange={handleChange}
              style={{ padding: '5px', width: '100%' }}
            />
          ) : (
            <p>{enquiry.guardianPhoneNumber}</p>
          )}

          {editData && enquiry.guardianMobileNumberOpt && (
            <>
              <p style={fieldStyle}><strong>Alternate Mobile:</strong></p>
              <input
                type="tel"
                name="guardianMobileNumberOpt"
                value={editData.guardianMobileNumberOpt}
                onChange={handleChange}
                style={{ padding: '5px', width: '100%' }}
              />
            </>
          )}

          {!editData && enquiry.guardianMobileNumberOpt && (
            <p style={fieldStyle}><strong>Alternate Mobile:</strong> {enquiry.guardianMobileNumberOpt}</p>
          )}
        </div>

        {/* Additional Information */}
        <div style={fieldGroupStyle}>
          <h2 style={sectionHeaderStyle}>Additional Information</h2>

          <p style={fieldStyle}><strong>Enquiry Source:</strong></p>
          {editData ? (
            <input
              type="text"
              name="enquirySource"
              value={editData.enquirySource}
              onChange={handleChange}
              style={{ padding: '5px', width: '100%' }}
            />
          ) : (
            <p>{enquiry.enquirySource}</p>
          )}

          <p style={fieldStyle}><strong>Hostel Required:</strong></p>
          {editData ? (
            <input
              type="checkbox"
              name="wantHostel"
              checked={editData.wantHostel}
              onChange={handleCheckBox}
              style={{ marginTop: '5px' }}
            />
          ) : (
            <p>{enquiry.wantHostel ? "Yes" : "No"}</p>
          )}

          <p style={fieldStyle}><strong>Transport Required:</strong></p>
          {editData ? (
            <input
              type="checkbox"
              name="wantTransport"
              checked={editData.wantTransport}
              onChange={handleCheckBox}
              style={{ marginTop: '5px' }}
            />
          ) : (
            <p>{enquiry.wantTransport ? "Yes" : "No"}</p>
          )}

          <p style={fieldStyle}><strong>Description:</strong></p>
          {editData ? (
            <textarea
              name="description"
              value={editData.description}
              onChange={handleChange}
              style={{ padding: '5px', width: '100%', height: '100px' }}
            />
          ) : (
            <p>{enquiry.description}</p>
          )}

          <p style={fieldStyle}><strong>Created At:</strong></p>
          <p>{enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleString() : 'Not Available' }</p>

          <p style={fieldStyle}><strong>Updated At:</strong></p>
          <p>{enquiry.updatedAt ? new Date(enquiry.updatedAt).toLocaleString() : 'Not Available' }</p>
        </div>


        {/* Address */}
        <div style={fieldGroupStyle}>
          <h2 style={sectionHeaderStyle}>Address</h2>

          <p style={fieldStyle}><strong> Street: </strong></p>
          {editData ? (
            <input
              type="text"
              name="street"
              value={editData.address.street}
              onChange={handleAddressChange}
              style={{ padding: '5px', width: '100%' }}
            />
            ) : (
              <p>{enquiry.address.street}</p>
            )
          }

          <p style={fieldStyle}><strong> City: </strong></p>
          {editData ? (
            <input
              type="text"
              name="city"
              value={editData.address.city}
              onChange={handleAddressChange}
              style={{ padding: '5px', width: '100%' }}
            />
            ) : (
              <p>{enquiry.address.city}</p>
            )
          }

          <p style={fieldStyle}> <strong> State: </strong></p>
          {editData ? (
            <input
              type="text"
              name="state"
              value={editData.address.state}
              onChange={handleAddressChange}
              style={{ padding: '5px', width: '100%' }}
            />
            ) : (
              <p>{enquiry.address.state}</p>
            )
          }

          <p style={fieldStyle}><strong> Pincode: </strong></p>
          {editData ? (
            <input
              type="text"
              name="pincode"
              value={editData.address.pincode}
              onChange={handleAddressChange}
              style={{ padding: '5px', width: '100%' }}
            />
            ) : (
              <p>{enquiry.address.pincode}</p>
            )
          }

          <p style={fieldStyle}><strong> Country: </strong></p>
          {editData ? (
            <input
              type="text"
              name="country"
              value={editData.address.country}
              onChange={handleAddressChange}
              style={{ padding: '5px', width: '100%' }}
            />
            ) : (
              <p>{enquiry.address.country}</p>
            )
          }

        </div>

        <button
          onClick={handleSave}
          style={{ padding: '10px', cursor: 'pointer' , margin : 'auto' }}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>

      </div>
    </div>
  );
  
}
