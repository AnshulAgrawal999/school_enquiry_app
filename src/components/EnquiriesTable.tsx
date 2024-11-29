'use client'  ;

import React , { useEffect , useState } from 'react'  ;

import { useQuery , useMutation , useQueryClient } from 'react-query'  ;

import { EditModal } from './EditEnquiry'  ;

import {
  headerStyle,
  loadingStyle,
  errorStyle,
  tableStyle,
  buttonStyle,
  thStyle,
  tdStyle,
  trStyle,
  deleteButtonStyle,
  paginationStyle,
  pageIndicatorStyle,
  viewButtonStyle,
} from './EnquiriesTable.css';


type Enquiry = {

  _id : string  ;

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
  
  createdAt ?: string  ;
}

const fetchEnquiries = async ( page: number , itemsPerPage: number ) => {

  const response = await fetch( `http://localhost:4000/admin?page=${page}&limit=${itemsPerPage}` )  ;

  if ( !response.ok ) throw new Error( 'Failed to fetch enquiries' )  ;

  return response.json()  ; 
};

const deleteEnquiry = async ( id : string ) => {

  const response = await fetch( `http://localhost:4000/admin/${id}` , { method: 'DELETE' } )  ;

  if ( !response.ok ) throw new Error( 'Failed to delete enquiry' )  ;

};


const EnquiriesTable : React.FC = () => {

  const [ currentPage , setCurrentPage ] = useState( 1 )  ;

  const [ itemsPerPage ] = useState( 8 )  ;

  const [ selectedEnquiry , setSelectedEnquiry ] = useState< Enquiry | null > ( null )  ;

  const [ isModalOpen , setIsModalOpen ] = useState( false )  ;

  const [ inputValue , setInputValue ] = useState( "1" ) ; // Track the input value separately 

  const queryClient = useQueryClient();

  const { data , error , isLoading } = useQuery(

    [ 'enquiries' , currentPage , itemsPerPage ] ,

    () => fetchEnquiries( currentPage , itemsPerPage ) ,

    { keepPreviousData: true }
  )  ;

  const mutation = useMutation(deleteEnquiry, {
    onSuccess: () => queryClient.invalidateQueries('enquiries'),
  });
  
  const handleDelete = async (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      mutation.mutate(id);
    }
  };

  const handleEdit = (event: React.MouseEvent, enquiry: Enquiry) => {
    event.stopPropagation();
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedEnquiry: Enquiry) => {
    try {
      await fetch(`http://localhost:4000/admin/${updatedEnquiry._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEnquiry),
      });
      setIsModalOpen(false);
      queryClient.invalidateQueries('enquiries');
    } catch (error) {
      console.error('Error saving enquiry:', error);
    }
  };

  const enquiries = data?.enquiryFormsData || [];
  const totalCount = data?.pagination.total || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);


  
  const handleRowHover = ( event : React.MouseEvent<HTMLTableRowElement> ) => 
  {
    event.currentTarget.style.backgroundColor = '#f2f2f2'  ;  // Change background color on hover
  }
    
  const handleRowLeave = ( event : React.MouseEvent<HTMLTableRowElement> ) => 
  {
    event.currentTarget.style.backgroundColor = ''  ;  // Reset background color
  }

  useEffect(() => {
    setInputValue(String(currentPage));
  }, [currentPage]);
  
  

  return (

    <div >

      <h1 style={ headerStyle }> Enquiries Table </h1>

      { 
        isLoading ? ( <p style={ loadingStyle } > Loading... </p> ) : error ? ( <p style={ errorStyle } > { (error as Error).message } </p> ) : 
        (
        <>
          <table style={ tableStyle } >

            <thead>

              <tr>
                <th style={ thStyle } > # </th>
                <th style={ thStyle }> Student Name </th>
                <th style={ thStyle }> Gender </th>
                <th style={ thStyle }> Class </th>
                <th style={ thStyle }> Date of Birth </th>

                <th style={ thStyle }> Guardian Name </th>
                <th style={ thStyle }> Relation </th>
                <th style={ thStyle }> Guardian Phone </th>
                <th style={ thStyle }> Guardian Email </th>

                <th style={ thStyle }> Enquiry Source </th>
                <th style={ thStyle }> Hostel Required </th>
                <th style={ thStyle }> Transport Required </th>
                <th style={ thStyle }> Address </th>
                <th style={ thStyle }> Description </th>
                <th style={ thStyle }> Created At </th>
                <th style={ thStyle }> Actions </th>
              </tr>

            </thead>

            <tbody>

            { enquiries.map( (enquiry: Enquiry, index: number) => (
                
                <tr
                  key={ enquiry._id }
                  style={trStyle}
                  onMouseEnter={handleRowHover}
                  onMouseLeave={handleRowLeave}
                  onClick={() => (window.location.href = `/adminpanel/enquirytable/${enquiry._id}`)} >

                  <td style={tdStyle}> {(currentPage - 1) * itemsPerPage + index + 1} </td>
                  <td style={tdStyle}>{enquiry.studentName}</td>
                  <td style={tdStyle}>{enquiry.gender}</td>
                  <td style={tdStyle}>{enquiry.currentClass}</td>
                  <td style={tdStyle}>{enquiry.dateOfBirth}</td>

                  <td style={tdStyle}>{enquiry.guardianName}</td>
                  <td style={tdStyle}>{enquiry.relation}</td>
                  <td style={tdStyle}>{enquiry.guardianPhoneNumber}</td>
                  <td style={tdStyle}>{enquiry.guardianEmail}</td>

                  <td style={tdStyle}>{enquiry.enquirySource}</td>
                  <td style={tdStyle}>{enquiry.wantHostel ? 'Yes' : 'No'}</td>
                  <td style={tdStyle}>{enquiry.wantTransport ? 'Yes' : 'No'}</td>

                  <td style={tdStyle}>

                    { enquiry.address
                      ? `${enquiry.address.street}, ${enquiry.address.city}, ${enquiry.address.state}, ${enquiry.address.pincode}, ${enquiry.address.country}`
                      : 'Not Available'
                    }

                  </td>

                  <td style={tdStyle}>{ enquiry.description }</td>

                  <td style={tdStyle}>{ enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleString() : 'Not Available' }</td>

                  <td style={tdStyle}>
                    
                  <button
                    style={deleteButtonStyle}
                    onClick={(e) => handleDelete(e, enquiry._id)} >
                    Delete
                  </button>

                    
                  <button style={buttonStyle} onClick={(e) => handleEdit(e,enquiry)} > 
                      Edit
                  </button>

                  <button style={viewButtonStyle} > 
                      View More
                  </button>

                  </td>
 
                </tr>

                )
              )
            }

            </tbody>

          </table>

          <EditModal
            isOpen={isModalOpen}
            enquiry={selectedEnquiry} 
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
          />


          <div style={paginationStyle}>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} // Go to the previous page
              disabled={currentPage === 1} // Disable if on the first page
              style={buttonStyle}
            >
              Previous
            </button>
            <span style={pageIndicatorStyle}>
              Page {currentPage} of {totalPages}
            </span>
            <input
              type="number"
              style={{ ...pageIndicatorStyle, width: "50px", textAlign: "center" }}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} // Allow unrestricted typing
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const validPage = Math.max(1, Math.min(Number(inputValue) || 1, totalPages));
                  setCurrentPage(validPage); // Update current page
                }
              }}
              onBlur={() => {
                // Validate and sync input on losing focus
                const validPage = Math.max(1, Math.min(Number(inputValue) || 1, totalPages));
                setCurrentPage(validPage);
              }}
              min={1}
              max={totalPages}
            />
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} // Go to the next page
              disabled={currentPage === totalPages} // Disable if on the last page
              style={buttonStyle}
            >
              Next
            </button>
          </div>

        </>
        )
        
      }

    </div>

  )  ;
}



export default EnquiriesTable  ;
