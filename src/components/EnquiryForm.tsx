"use client"  ;

import React from "react"  ;

import "../components/EnquiryForm.css"  ;

import { useForm, Control } from "react-hook-form"  ;

import dynamic from "next/dynamic"  ;

import { useMutation } from "react-query"  ;

type EnquiryFormData = {
    guardianName : string  ;
    relation : string  ;
    guardianEmail : string  ;
    guardianPhoneNumber : string  ;
    guardianMobileNumberOpt : string  ;
    studentName: string  ;
    class: string  ;
    dateOfBirth: Date  ;
    currentSchool: string  ;
    address: {
      street: string  ;
      city: string  ;
      state: string  ;
      pincode: string  ;
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
          pincode: ""  ,
          country: "India"  ,
        }  ,
        enquirySource: ""  ,
        description: ""  ,
        wantHostel: false  
      }
    }
  )  ;

  const { register , control , handleSubmit , formState , reset } = form  ;  

  const { errors } = formState  ;

  const onSubmit = ( data : EnquiryFormData ) => {

    alert( 'form submitted' )  ;

    console.log(  data )  ;   
  }

  const handleResetForm = ( ) => {
    reset( )  ;  
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

              <p> { errors.guardianName?.message  } </p>
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

              <p> { errors.relation?.message  } </p>
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

               <p> { errors.guardianEmail?.message  } </p>
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

              <p> { errors.guardianPhoneNumber?.message  } </p>
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

              <p> { errors.guardianMobileNumberOpt?.message  } </p>
            </div>

          </div>
          
          <h2> Student Information Section </h2>
          
          <div className="enqFields" >
            
            <div>

              <label htmlFor="studentName"> Student Name </label>
              <input type="text" id="studentName" { ...register( 'studentName' , { 
                  required : { 
                  value : true ,
                  message : 'Student Name is required'
                }  } )  } />

              <p> { errors.studentName?.message  } </p>

            </div>

            <div>

              <label htmlFor="class"> Class </label>
              <input type="text" id="class" { ...register( 'class' , { 
                  required : { 
                  value : true ,
                  message : 'Class is required'
                }  } )  } />

              <p> { errors.class?.message  } </p>

            </div>

            <div>

              <label htmlFor="dateOfBirth"> Date Of Birth </label>
              <input type="date" id="dateOfBirth" { ...register( 'dateOfBirth' , { 
                  valueAsDate : true ,
                  required : { 
                  value : true ,
                  message : 'Date Of Birth is required'
                }  } )  } />

              <p> { errors.dateOfBirth?.message  } </p>
            
            </div>

            <div>
              
              <label htmlFor="currentSchool"> Current School </label>
              <input type="text" id="currentSchool" { ...register( 'currentSchool' , { 
                  required : { 
                  value : true ,
                  message : 'Current School is required'
                }  } )  } />

              <p> { errors.currentSchool?.message  } </p>

            </div>

          </div>

          <h2> Address </h2>

          <div className="enqFields" >
                 <div>

              <label htmlFor="street"> Street </label>
              <input type="text" id="street" { ...register( 'address.street' , { 
                  required : { 
                  value : true ,
                  message : 'Street is required'
                }  } )  } />

              <p> { errors.address?.street?.message  } </p>

            </div>

            <div>

              <label htmlFor="city"> City </label>
              <input type="text" id="street" { ...register( 'address.city' , { 
                  required : { 
                  value : true ,
                  message : 'City is required'
                }  } )  } />

              <p> { errors.address?.city?.message  } </p>

            </div>

            <div>
            
              <label htmlFor="state"> State </label>
              <input type="text" id="state" { ...register( 'address.state' , { 
                  required : { 
                  value : true ,
                  message : 'State is required'
                }  } )  } />

              <p> { errors.address?.state?.message  } </p>

            </div>

            <div>

              <label htmlFor="pincode"> Pincode </label>
              <input type="text" id="pincode" { ...register( 'address.pincode' , { 
                  required : { 
                  value : true ,
                  message : 'Pincode is required'
                }  } )  } />

              <p> { errors.address?.pincode?.message  } </p>

            </div>

            <div>
            
              <label htmlFor="country"> Country </label>
              <input type="text" id="country" { ...register( 'address.country' , { 
                  required : { 
                  value : true ,
                  message : 'Country is required'
                }  } )  } />

              <p> { errors.address?.country?.message  } </p>

            </div>
          </div>

          <h2> Enquiry </h2>

          <div className="enqFields" >

            <div>

              <label htmlFor="enquirySource"> Enquiry Source </label>

              <input type="text" id="enquirySource" { ...register( 'enquirySource' )  } />

            </div>

            <div>

              <label htmlFor="description"> Description </label>
        
              <input type="text" id="description" { ...register( 'description' , { required : { 
                  value : true ,
                  message : 'Description is required'
                }  } )  } />

              <p> { errors.description?.message  } </p>
            </div>

          </div>
          
          <label htmlFor="wantHostel"> Want Hostel </label>
          <input type="checkbox" id="wantHostel" { ...register( 'wantHostel' )  } />

            <div>
                
                <button type="submit"> submit form </button>

                <button type="button" onClick={ handleResetForm } > reset form </button>
            </div>
                
        </form>
        
        <DevTool control={control} />

      </div>

    </div>

  )  ;
}
