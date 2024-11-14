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
    dateOfBirth: string  ;
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

  const form = useForm<EnquiryFormData>()  ;

  const { register , control , handleSubmit , formState: { errors }, reset } = form  ;  

  const onSubmit = ( data : EnquiryFormData ) => {
    console.log( 'form submitted' , data )  ;
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
              <input type="text" id="guardianName" { ...register( 'guardianName' , { required : 'Guardian Name is required'  } )  } />
            </div>

            <div>
              <label htmlFor="relation" >
                {" "}
                Relation with Student{" "}
              </label>
              <input
                type="text"
                id="relation"
                { ...register( 'relation' , { required : 'Relation is required'  } ) }
              />
            </div>

            <div>
              <label htmlFor="guardianEmail" > Guardian Email </label>
              <input type="email" id="guardianEmail" { ...register( 'guardianEmail' , { 
                required: "Guardian email is required",
                pattern : { 
                  value : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i ,
                  message : "Please Enter a valid email"
                }
               } ) } />
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
                { ...register( 'guardianPhoneNumber', { required : 'Guardian Phone is required' ,
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Please enter a valid phone number",
                  }, } ) }
              />
            </div>

            <div>
              <label htmlFor="guardianMobileNumberOpt">
                {" "}
                Guardian Mobile Number{" "}
              </label>
              <input
                type="number"
                id="guardianMobileNumberOpt"
                maxLength={10}
                { ...register( 'guardianMobileNumberOpt' , {
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Please enter a valid mobile number",
                  },
                } ) }
              />
            </div>
          </div>
                
                <button> submit form </button>

        </form>
        
        <DevTool control={control} />

      </div>

    </div>

  )  ;
}
