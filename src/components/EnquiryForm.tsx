"use client"  ;

import React from "react"  ;

import "../components/EnquiryForm.css"  ;

import { SubmitHandler, useForm, Control } from "react-hook-form"  ;

import dynamic from "next/dynamic"  ;

type FormData = {
    guardianName : string  
    guardianRelation : string
    guardianEmail : string  
    guardianPhoneNumber : string
    guardianMobileNumber : string
}

interface DevToolProps {
    control: Control<FormData>  ;
}
  
const DevTool: React.ComponentType<DevToolProps> = dynamic(

    () => import("@hookform/devtools").then((module) => module.DevTool),

    { ssr: false },

);


export default function EnquiryForm() {

  const form = useForm<FormData>()  ;

  const { register , control , handleSubmit } = form  ;  

  const onSubmit = ( data : FormData ) => {
    console.log( 'form submitted' , data )  ;
  }

  return (

    <div>
            <h1> User Panel Enquiry Submission Form </h1>

      <div className="enqForm" >

        <form onSubmit={ handleSubmit( onSubmit ) } >

          <h2> Guardian Information Section </h2>

          <div className="enqFields" >
            <div>
              <label htmlFor="guardianName"> Guardian's Name </label>
              <input type="text" id="guardianName" { ...register( 'guardianName' ) } />
            </div>

            <div>
              <label htmlFor="guardianRelation" >
                {" "}
                Guardian's Relation with Student{" "}
              </label>
              <input
                type="text"
                id="guardianRelation"
                { ...register( 'guardianRelation' ) }
              />
            </div>

            <div>
              <label htmlFor="guardianEmail" > Guardian's Email </label>
              <input type="email" id="guardianEmail" { ...register( 'guardianEmail' ) } />
            </div>

            <div>
              <label htmlFor="guardianPhoneNumber">
                {" "}
                Guardian's Phone Number{" "}
              </label>
              <input
                type="number"
                id="guardianPhoneNumber"
                { ...register( 'guardianPhoneNumber' ) }
              />
            </div>

            <div>
              <label htmlFor="guardianMobileNumber">
                {" "}
                Guardian's Mobile Number{" "}
              </label>
              <input
                type="number"
                id="guardianMobileNumber"
                { ...register( 'guardianMobileNumber' ) }
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
