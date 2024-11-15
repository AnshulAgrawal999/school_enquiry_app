"use client"  ;

import React from "react"  ;

import "../components/EnquiryForm.css"  ;

import { useForm, Control } from "react-hook-form"  ;

import dynamic from "next/dynamic"  ;

type EnquiryFormData = {
    guardianName : string  ;
    relation : string  ;
    guardianEmail : string  ;
    guardianPhoneNumber : string  ;
    guardianMobileNumberOpt : string  ;
    studentName: string  ;
    dateOfBirth: Date  ;
    class: string  ;
    currentSchool: string  ;
    address: {
      street: string  ;
      city: string  ;
      state: string  ;
      pinCode: string  ;
      country: string  ;
    }  ;
    enquirySource: string  ;
    description: string  ;
    wantHostel: boolean  ;
}

interface DevToolProps {
    control: Control<EnquiryFormData>  ;
}
  
const DevTool: React.ComponentType<DevToolProps> = dynamic(

    () => import( "@hookform/devtools" ).then( ( module ) => module.DevTool ) ,

    { ssr: false } ,

);


export default function EnquiryForm() {

  const form = useForm<EnquiryFormData>(
    {
      defaultValues : {
        guardianName : ""  ,
        relation : ""  ,
        guardianEmail : ""  ,
        guardianPhoneNumber : ""  ,
        guardianMobileNumberOpt : ""  ,
        studentName: ""  ,
        class: "1st"  ,
        currentSchool: ""  ,
        address: {
          street: ""  ,
          city: ""  ,
          state: ""  ,
          pinCode: ""  ,
          country: "India"  ,
        }  ,
        enquirySource: ""  ,
        description: ""  ,
        wantHostel: false  
      }
    }
  )  ;

  const { register , control , handleSubmit , formState , reset } = form  ;  

  const { errors , isSubmitting } = formState  ;

  const onSubmit = ( data : EnquiryFormData ) => {

    console.log( 'form submitted' , data )  ;

    reset()  ;
  }

  const handleResetForm = ( ) => {
    reset()  ;  
  }

  return (

    <div>
            <h1> User Panel Enquiry Submission Form </h1>

      <div className="enqForm" >

        <form onSubmit={ handleSubmit( onSubmit ) } noValidate >

          <h2> Guardian Information Section </h2>

          <div className="enqFields" >

            <div>
              <label htmlFor="guardianName"> Guardian Name </label>
              <input type="text" id="guardianName" { ...register( 'guardianName' , { required : { 
                  value : true ,
                  message : 'Guardian Name is required'
                }  } )  } />

              <p> { errors.guardianName?.message } </p>
            </div>

            <div>
              <label htmlFor="relation" >
                {" "}
                Relation with Student{" "}
              </label>
              <input
                type="text"
                id="relation"
                { ...register( 'relation' , { required :  { 
                  value : true ,
                  message : 'Relation is required'
                }  } ) }
              />

              <p> { errors.relation?.message } </p>
            </div>

            <div>
              <label htmlFor="guardianEmail" > Guardian Email </label>
              <input type="email" id="guardianEmail" { ...register( 'guardianEmail' , { 
                required: { 
                  value : true ,
                  message : 'Guardian email is required'
                },
                pattern : { 
                  value : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i ,
                  message : "Please Enter a valid email"
                }
               } ) } />

               <p> { errors.guardianEmail?.message } </p>
            </div>

            <div>
              <label htmlFor="guardianPhoneNumber">
                {" "}
                Guardian Phone Number{" "}
              </label>
              <input
                type="number"
                id="guardianPhoneNumber"
                maxLength={10}
                { ...register( 'guardianPhoneNumber', { required : { 
                  value : true ,
                  message : 'Guardian Phone is required'
                } ,
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid phone number",
                  }, } ) }
              />

              <p> { errors.guardianPhoneNumber?.message } </p>
            </div>

            <div>
              <label htmlFor="guardianMobileNumberOpt">
                {" "}
                Guardian Mobile Number (Optional) {" "}
              </label>
              <input
                type="number"
                id="guardianMobileNumberOpt"
                maxLength={10}
                { ...register( 'guardianMobileNumberOpt' , {
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid mobile number",
                  },
                } ) }
              />

              <p> { errors.guardianMobileNumberOpt?.message } </p>
            </div>

          </div>
          
          <h2> Student Information Section </h2>
          
          <div className="enqFields" >
            
            <div>

              <label htmlFor="dateOfBirth"> Date Of Birth </label>
              <input type="date" id="dateOfBirth" { ...register( 'dateOfBirth' , { 
                  valueAsDate : true ,
                  required : { 
                  value : true ,
                  message : 'Date Of Birth is required'
                }  } )  } />

              <p> { errors.dateOfBirth?.message } </p>
            
            </div>
          </div>
                <button type="submit"> submit form </button>
                
                <button type="submit" onClick={handleResetForm} > reset form </button>

        </form>
        
        <DevTool control={control} />

      </div>

    </div>

  )  ;
}
