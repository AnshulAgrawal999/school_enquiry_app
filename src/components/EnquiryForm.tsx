"use client"  ;

import React from "react"  ;

import "../components/EnquiryForm.css"  ;

import { useForm, Control } from "react-hook-form"  ;

import dynamic from "next/dynamic"  ;

import axios  from "axios"  ;

type EnquiryFormData = {

  guardianName : string  ;

  relation : string  ;

  guardianEmail : string  ;

  guardianPhoneNumber : string  ;

  guardianMobileNumberOpt : string  ;

  studentName : string  ;

  gender: string  ;

  currentClass : string  ;

  dateOfBirth : string  ;

  currentSchool : string  ;

  lastYearGrade : string  ;

  address : {

    street : string  ;

    city : string  ;

    state : string  ;

    pincode : string  ;

    country : string  ;

  }  ;

  enquirySource: string  ;

  description : string  ;

  wantHostel : boolean  ;

  wantTransport : boolean  ;
}

interface DevToolProps {

    control: Control<EnquiryFormData>  ;
    
}
  
const DevTool: React.ComponentType<DevToolProps> = dynamic(

    () => import( "@hookform/devtools" ).then( ( module ) => module.DevTool ) ,

    { ssr: false } 

);

const grade = [
  "not applicable" ,
  "A+",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "Fail"
]  ;

const currentClass = [
  "Pre-School",
  "Pre-Nursery",
  "Nursery",
  "LKG",
  "KG",
  "First Class",
  "Second Class",
  "Third Class",
  "Fourth Class",
  "Fifth Class",
  "Sixth Class",
  "Seventh Class",
  "Eighth Class",
  "Nineth Class",
  "Tenth Class"
]


const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
]  ;

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia (Czech Republic)",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini (fmr. Swaziland)",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Holy See",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea (North)",
  "Korea (South)",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine State",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];




export default function EnquiryForm() {

  const form = useForm<EnquiryFormData>(
    {
        defaultValues : {

          guardianName : ""  ,

          relation : "father"  ,
        
          guardianEmail : ""  ,
        
          guardianPhoneNumber : ""  ,
        
          guardianMobileNumberOpt : ""  ,
        
          studentName : ""  ,
        
          gender: "male"  ,
        
          currentClass : "Pre-School"  ,
        
          dateOfBirth : ""  ,
        
          currentSchool : ""  ,
        
          lastYearGrade : "not applicable"  ,
        
          address : {
        
            street : ""  ,
        
            city : ""  ,
        
            state : ""  ,
        
            pincode : ""  ,
        
            country : "India"  ,
        
          }  ,
        
          enquirySource: "referral"  ,
        
          description : ""  ,
        
          wantHostel : true  ,
        
          wantTransport : true
        
      }
    }
  )  ;

  const { register , control , handleSubmit , formState , reset } = form  ;  

  const { errors } = formState  ;

  const instance = axios.create(
    {
      baseURL: 'http://localhost:4000'  ,
      headers: { 'X-Custom-Header' : 'foobar' }
    }
  )  ;

  
  const handleResetForm = ( ) => {
    reset()  ;  
  }

  const onSubmit = ( data : EnquiryFormData ) => {

      // console.log(  data )  ;  

      instance.post( '/student' , data ).then( response => {

          console.log( 'Response:' , response )  ;

          alert( 'Enquiry form submitted successfully' )  ;

          reset()  ;
        }
        
      ).catch( err => {
      

          if ( err.response && err.response.status === 409 )  
          {
            console.log( 'Conflict Error:' , err )  ;

            alert( 'An enquiry with this gardian phone number already exists!' )  ;
          } 
          else 
          {
            console.log( 'Error:' , err )  ;

            alert( "Failed to submit enquiry form" )  ;
          } 

        }
      )  ;

  }



  return (

    <div className="userPanel">

            <h1> User Panel Enquiry Submission Form </h1>

      <div className="enqForm" >

        <form onSubmit={ handleSubmit( onSubmit ) } noValidate >

          <h2> Guardian Information Section </h2>

          <div className="enqFields" >

            <div>
              <label htmlFor="guardianName"> *Guardian Name </label>
              <input type="text" id="guardianName" { ...register( 'guardianName' , { required : { 
                  value : true ,
                  message : 'Guardian Name is required'
                }  } )  } />

              <p> { errors.guardianName?.message  } </p>
            </div>

            <div>
              <label htmlFor="relation">
                {" "}
                *Relation with Student{" "}
              </label>
              <select
                id="relation"
                { ...register('relation', {
                  required: { 
                    value: true, 
                    message: 'Relation is required' 
                  } 
                })}
              >
                <option value="father"> Father </option>
                <option value="mother"> Mother </option>
                <option value="family"> Family Relation </option>
                <option value="other"> Other </option>
              </select>

              <p> { errors.relation?.message } </p>
            </div>


            <div>
              <label htmlFor="guardianEmail" > *Guardian Email </label>
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
                *Guardian Phone Number{" "}
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

              <label htmlFor="studentName"> *Student Name </label>
              <input type="text" id="studentName" { ...register( 'studentName' , { 
                  required : { 
                  value : true ,
                  message : 'Student Name is required'
                }  } )  } />

              <p> { errors.studentName?.message  } </p>

            </div>

            <div>

              <label htmlFor="gender"> *Gender </label>
              <select
                id="gender"
                { ...register('gender', {
                  required: { 
                    value: true, 
                    message: 'Gender is required' 
                  }
                })}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <p> { errors.gender?.message } </p>

            </div>

            <div>

              <label htmlFor="currentClass"> *Current Class </label>
              <select
                id="currentClass"
                { ...register('currentClass', {
                  required: { 
                    value: true, 
                    message: 'Current class is required' 
                  }
                })}
              >

                {
                  currentClass.map( el => <option value={el} key={el} > {el} </option> )
                }

              </select>

              <p> { errors.currentClass?.message } </p>

            </div>


            <div>

              <label htmlFor="dateOfBirth"> *Date Of Birth </label>
              <input type="date" id="dateOfBirth" { ...register( 'dateOfBirth' , { 
                  required : { 
                  value : true ,
                  message : 'Date Of Birth is required'
                }  } )  } />

              <p> { errors.dateOfBirth?.message  } </p>
            
            </div>

            <div>
              
              <label htmlFor="currentSchool"> Current School </label>
              <input type="text" id="currentSchool" { ...register( 'currentSchool' )  } />

              <p> { errors.currentSchool?.message  } </p>

            </div>

            <div>

              <label htmlFor="lastYearGrade"> *Last Year Grade </label>
              <select
                id="lastYearGrade"
                { ...register('lastYearGrade', {
                  required: { 
                    value: true, 
                    message: 'Last Year Grade is required' 
                  }
                })}
              >

                { grade.map( el => <option value={el} key={el} > { el } </option> ) }
            
              </select>

              <p> { errors.lastYearGrade?.message } </p>
            </div>


          </div>

          <h2> Address </h2>

          <div className="enqFields" >
              
            <div>

              <label htmlFor="street"> *Street </label>
              <input type="text" id="street" { ...register( 'address.street' , { 
                  required : { 
                  value : true ,
                  message : 'Street is required'
                }  } )  } />

              <p> { errors.address?.street?.message  } </p>

            </div>

            <div>

              <label htmlFor="city"> *City </label>
              <input type="text" id="street" { ...register( 'address.city' , { 
                  required : { 
                  value : true ,
                  message : 'City is required'
                }  } )  } />

              <p> { errors.address?.city?.message  } </p>

            </div>

            <div>
              <label htmlFor="state"> *State </label>
              <select 
                id="state" 
                {...register('address.state', { 
                  required: { 
                    value: true,
                    message: 'State is required'
                  } 
                })}
              >


                <option value="">Select a state</option>

                { states.map( el => <option value={el} key={el} > {el} </option> ) }
                
              </select>
              
              <p> { errors.address?.state?.message } </p>
            </div>


            <div>

              <label htmlFor="pincode"> *Pincode </label>
              <input type="text" id="pincode" { ...register( 'address.pincode' , { 
                  required : { 
                  value : true ,
                  message : 'Pincode is required'
                }  } )  } />

              <p> { errors.address?.pincode?.message  } </p>

            </div>

            <div>
              <label htmlFor="country"> *Country </label>
              <select 
                id="country" 
                {...register('address.country', { 
                  required: { 
                    value: true,
                    message: 'Country is required'
                  } 
                })}
              >

                { countries.map( el => <option value={el} key={el} > {el} </option> ) }
                
              </select>
              
              <p> { errors.address?.country?.message } </p>
            </div>

            
          </div>

          <h2> Enquiry </h2>

          <div className="enqFields" >

            <div>

              <label htmlFor="enquirySource"> *Enquiry Source </label>
              <select
                id="enquirySource"
                { ...register('enquirySource', {
                  required: { 
                    value: true, 
                    message: 'Enquiry Source is required' 
                  }
                })}
              >
                <option value="referral">Referral</option>
                <option value="youTube">YouTube</option>
                <option value="instagram">Instagram</option>
                <option value="school_fair">School Fair</option>
                <option value="others">Others</option>
              </select>

              <p> { errors.enquirySource?.message } </p>

            </div>

            <div>

              <label htmlFor="description"> Description </label>
        
              <input id="description" { ...register( 'description' )  } />

              <p> { errors.description?.message  } </p>
            </div>
        

              <div className="checkboxItem">

                <label htmlFor="wantHostel">
                  Want Hostel <input type="checkbox" id="wantHostel" {...register('wantHostel')} /> 
                </label>

              </div>

              <div className="checkboxItem">
                
                <label htmlFor="wantTransport">
                  Want Transport <input type="checkbox" id="wantTransport" {...register('wantTransport')} />
                </label>


            </div>

          </div>

            <div className="buttonsDiv" >

                <button type="button" onClick={ handleResetForm } > reset form </button>
                
                <button type="submit"> submit form </button>
                
            </div>
                
        </form>
        
        <DevTool control={control} />

      </div>

    </div>

  )  ;
}
