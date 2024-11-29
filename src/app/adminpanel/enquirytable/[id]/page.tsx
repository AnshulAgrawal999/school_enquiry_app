'use client'  ;

import { useParams } from "next/navigation"  ;

import axios from "axios"  ;

import { styles } from './id.css'  ;

import { useQuery } from 'react-query';

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


  if ( isLoading ) {

    return <p style={ loadingStyle } > Loading enquiry details... </p>  ;

  }

  if ( isError ) {

    return (

      <div style={errorStyle} >
        <p> Error: { error.message } </p>
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

    <div style={ containerStyle } >
       
      <h1 style={ headerStyle } > Enquiry Details </h1>

      <div style={ cardStyle } >

        <div style={ fieldGroupStyle } >

          <h2 style={ sectionHeaderStyle }> Student Information </h2>

          <p style={ fieldStyle } >

            <strong>Name:</strong> {enquiry.studentName}

          </p>

          <p style={fieldStyle}>

            <strong>Gender:</strong> {enquiry.gender}

          </p>

          <p style={fieldStyle}>

            <strong>Class:</strong> {enquiry.currentClass}

          </p>

          <p style={fieldStyle}>

            <strong>Date of Birth:</strong> {enquiry.dateOfBirth}

          </p>

          <p style={fieldStyle}>

            <strong> Current School: </strong> {enquiry.currentSchool}

          </p>

          <p style={fieldStyle}>

            <strong> Last Year Grade: </strong> {enquiry.lastYearGrade}

          </p>

        </div>

        <div style={fieldGroupStyle}>

          <h2 style={sectionHeaderStyle}>Guardian Information</h2>

          <p style={fieldStyle}>
            
            <strong>Name:</strong> {enquiry.guardianName}

          </p>

          <p style={fieldStyle}>
            
            <strong> Relation: </strong> { enquiry.relation }
            
          </p>


          <p style={fieldStyle}>
            <strong>Email:</strong> {enquiry.guardianEmail}
          </p>
          <p style={fieldStyle}>
            <strong>Phone:</strong> {enquiry.guardianPhoneNumber}
          </p>

          {
            enquiry.guardianMobileNumberOpt && (
              <p style={fieldStyle}>
              <strong>Alternate Mobile:</strong> { enquiry.guardianMobileNumberOpt }
              </p>  )
          }

        </div>
        <div style={fieldGroupStyle}>
          <h2 style={sectionHeaderStyle}>Additional Information</h2>
          <p style={fieldStyle}>
            <strong>Enquiry Source:</strong> {enquiry.enquirySource}
          </p>
          <p style={fieldStyle}>
            <strong>Hostel Required:</strong> {enquiry.wantHostel ? "Yes" : "No"}
          </p>
          <p style={fieldStyle}>
            <strong>Transport Required:</strong> {enquiry.wantTransport ? "Yes" : "No"}
          </p>

          <p style={fieldStyle}>
            <strong>Description:</strong> {enquiry.description }
          </p>

          <p style={fieldStyle}>
            <strong> Created At: </strong>  { enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleString() : 'Not Available' }
          </p>

          <p style={fieldStyle}>
            <strong> Updated At: </strong>  { enquiry.updatedAt ? new Date(enquiry.updatedAt).toLocaleString() : 'Not Available' }
          </p>

        </div>
        <div style={fieldGroupStyle}>
          <h2 style={sectionHeaderStyle}>Address</h2>
          {enquiry.address ? (
            <>
              <p style={fieldStyle}>
                <strong>Street:</strong> {enquiry.address.street}
              </p>
              <p style={fieldStyle}>
                <strong>City:</strong> {enquiry.address.city}
              </p>
              <p style={fieldStyle}>
                <strong>State:</strong> {enquiry.address.state}
              </p>
              <p style={fieldStyle}>
                <strong>Pincode:</strong> {enquiry.address.pincode}
              </p>
              <p style={fieldStyle}>
                <strong>Country:</strong> {enquiry.address.country}
              </p>
            </>
          ) : (
            <p style={fieldStyle}>No Address Provided</p>
          )}
        </div>
      </div>
    </div>
  );
}
