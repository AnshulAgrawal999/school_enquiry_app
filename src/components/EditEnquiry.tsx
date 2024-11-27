import React, { useState, useEffect } from 'react';

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
  const [formData, setFormData] = useState<Enquiry>(
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
  

  useEffect(() => {


  console.log('enquiry:', enquiry);

  console.log('formData:', formData);

    if (enquiry) {
      setFormData({
        ...enquiry,
        guardianName: enquiry.guardianName || '',
        guardianEmail: enquiry.guardianEmail || '',
        guardianPhoneNumber: enquiry.guardianPhoneNumber || '',
        guardianMobileNumberOpt: enquiry.guardianMobileNumberOpt || '',
        studentName: enquiry.studentName || '',
        dateOfBirth: enquiry.dateOfBirth || '',
        currentSchool: enquiry.currentSchool || '',
        lastYearGrade: enquiry.lastYearGrade || 'not applicable',
        address: {
          street: enquiry.address?.street || '',
          city: enquiry.address?.city || '',
          state: enquiry.address?.state || '',
          pincode: enquiry.address?.pincode || '',
          country: enquiry.address?.country || 'India',
        },
        description: enquiry.description || '',
        enquirySource: enquiry.enquirySource || 'referral',
      });
    }
  }, [enquiry ]);
  
  
  

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
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validation: Ensure fields aren't empty unless optional
    if (!formData.guardianName || !formData.studentName) {
      alert("Please fill in all required fields.");
      return;
    }
  
    onSave(formData);
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
              Save
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


// Styles for modal and form

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'auto', // Allow scrolling if modal content overflows
};

const modalStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  width: '600px',
  maxHeight: '90vh', // Limit height to 90% of the viewport
  overflowY: 'auto', // Enable vertical scrolling within the modal
};


const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle: React.CSSProperties = {
  marginBottom: '10px',
  fontSize: '1rem',
  color: '#34495e',
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  fontSize: '1rem',
  border: '1px solid #ecf0f1',
  borderRadius: '4px',
  marginBottom: '15px',
};

const checkboxStyle: React.CSSProperties = {
  marginBottom: '15px',
};

const saveButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#2ecc71',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '10px',
};

const cancelButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#e74c3c',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};
