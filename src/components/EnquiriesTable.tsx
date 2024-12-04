'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import StudentFilter from '@/components/StudentFilter';

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
} from './EnquiriesTable.css';

type Enquiry = {
  _id: string;
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
  createdAt?: string;
};


const EnquiriesTable: React.FC<{ initialFilters?: Record<string, any> }> = ({
  initialFilters = {},
}) => {

  const router = useRouter();

  const searchParams = useSearchParams();


  // Initialize filters from URL or defaults
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(searchParams.toString());
    return {
      limit: parseInt(params.get('limit') || '10', 10),
      page: parseInt(params.get('page') || '1', 10),
      state: params.get('state') || '',
      enquirySource: params.get('enquirySource') || '',
      wantHostel: params.get('wantHostel') ,
      searchedName: params.get('searchedName') || '',
      sort: params.get('sort') || '',
      nameSort: params.get('nameSort') || '',
      ...initialFilters,
    };
  });

  const [pagination, setPagination] = useState({
    currentPage: filters.page || 1,
    totalPages: 1,
  });

  const fetchEnquiries = async (filters: Record<string, any>) => {

    // const response = await axios.get('http://localhost:4000/admin', {
    //   params: { page: 1, limit: 10 }, // getting all 120 entries
    // });

    console.log(filters)  ;

    const response = await axios.get('http://localhost:4000/admin', {
      params: filters,  // getting only 58 entries
    });

    setPagination({
      currentPage: response.data.pagination.currentPage || 1,
      totalPages: response.data.pagination.totalPages || 1,
    });

    return response.data;
  };

  const { data, error, isLoading } = useQuery(
    ['enquiries', filters],
    () => fetchEnquiries(filters),
    { keepPreviousData: true }
  );

  const enquiries = data?.enquiryFormsData || [];

  const handleFilterUpdate = (updatedFilters: Record<string, any>) => {
    const newFilters = { ...filters, ...updatedFilters, page: 1 };
    setFilters(newFilters);

    // Update URL query parameters
    const query = new URLSearchParams(newFilters as any).toString();
    router.replace(`?${query}`);
  };

  const handlePageChange = (newPage: number) => {
    const newFilters = { ...filters, page: newPage };
    setFilters(newFilters);

    // Update URL with new page
    const query = new URLSearchParams(newFilters as any).toString();
    router.replace(`?${query}`);
  };

  return (
    <div>
      <h1 style={headerStyle}>Enquiries Table</h1>
      <StudentFilter onFilter={handleFilterUpdate} />

      {isLoading ? (
        <p style={loadingStyle}>Loading...</p>
      ) : error ? (
        <p style={errorStyle}>{(error as Error).message}</p>
      ) : (
        <>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>#</th>
                <th style={thStyle}>Student Name</th>
                <th style={thStyle}>Gender</th>
                <th style={thStyle}>Class</th>
                <th style={thStyle}>Date of Birth</th>
                <th style={thStyle}>Guardian Name</th>
                <th style={thStyle}>Relation</th>
                <th style={thStyle}>Guardian Phone</th>
                <th style={thStyle}>Guardian Email</th>
                <th style={thStyle}>Enquiry Source</th>
                <th style={thStyle}>Hostel Required</th>
                <th style={thStyle}>Transport Required</th>
                <th style={thStyle}>Address</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Created At</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            
            <tbody>
              {enquiries.map((enquiry: Enquiry, index: number) => (
                <tr
                  key={enquiry._id}
                  style={trStyle}
                  onClick={() => (window.location.href = `/adminpanel/enquirytable/${enquiry._id}`)}
                >
                  <td style={tdStyle}>{(filters.page - 1) * filters.limit + index + 1}</td>
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
                    {enquiry.address
                      ? `${enquiry.address.street}, ${enquiry.address.city}, ${enquiry.address.state}, ${enquiry.address.pincode}, ${enquiry.address.country}`
                      : 'Not Available'}
                  </td>
                  <td style={tdStyle}>{enquiry.description}</td>
                  <td style={tdStyle}>
                    {enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleString() : 'Not Available'}
                  </td>
                  <td style={tdStyle}>
                    {/* Actions */}
                  </td>
                </tr>
              ))}
            </tbody>



          </table>

          <div style={paginationStyle}>
            <button
              style={{ ...buttonStyle, marginRight: '10px' }}
              onClick={() => handlePageChange(Math.max(filters.page - 1, 1))}
              disabled={filters.page === 1}
            >
              Previous
            </button>
            <span style={pageIndicatorStyle}>
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              style={{ ...buttonStyle, marginLeft: '10px' }}
              onClick={() => handlePageChange(Math.min(filters.page + 1, pagination.totalPages))}
              disabled={filters.page === pagination.totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EnquiriesTable;
