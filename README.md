# School Enquiry App

This is an **Enquiry Management System** designed to streamline the process of handling prospective student enquiries for school admissions. It provides an intuitive user panel for parents or guardians to submit enquiries and a robust admin panel for admissions staff to manage and follow up on them efficiently.

## Features

### User Panel (Enquiry Submission Form)
- **Enquiry Submission:** Allows guardians to submit details about the prospective student, including contact information, address, and specific questions or areas of interest.
- **Key Fields:**
  - **Contact Details:** Guardian's name, phone number, mobile number, email, and optional social media handles.
  - **Student Information:** Student's name, grade applying for, date of birth, and current school.
  - **Address Information:** Street, city, state, zip code, and country.
  - **Enquiry Details:** Source of enquiry (e.g., referral, website) and a description field for additional notes.
- Displays if an enquiry is already registered with the same name and number.

### Admin Panel (Enquiry Management Dashboard)
- **Admin Login:** Secure login with username and password.
- **Dashboard View:** Summary of total enquiries with sorting options (e.g., by student name, grade, or status) and a "Create Enquiry" button for manual entries.
- **Enquiries Table:** Lists all enquiries with filter, search, and pagination options.
- **View Enquiry Profile:** Detailed view of each enquiry, including:
  - Full student and guardian information.
  - Enquiry timeline showing submission date, follow-ups, and status updates.
- **Add/Edit Enquiry:** Admins can update or add details to enquiries as needed.
- **Remarks and Comments:** Add notes with author, timestamp, and visibility settings (e.g., private or internal).

### Admin Dashboard
![Admin Dashboard](public/Images/Screenshot%20(719).png)
- Displays the total number of student enquiries (e.g., 120).

### Enquiries Table
![Enquiries Table](public/Images/Screenshot%20(718).png)
- Shows a table with filters, search, and pagination options for managing enquiries.

### Admin Login
![Admin Login](public/Images/Screenshot%20(723).png)
- Secure login page for admin access.

### Admin Remarks
![Address Edit](public/Images/Screenshot%20(722).png)
- Interface for adding admin remarks and deleting admin remarks.

### Enquiry Details
![Enquiry Details](public/Images/Screenshot%20(721).png)
- Detailed view of a specific enquiry, including student and guardian information.

### Full Enquiries Table
![Full Enquiries Table](public/Images/Screenshot%20(720).png)
- Expanded view of the enquiries table with multiple entries.

## Tech Stack
- **Frontend:** Next.js, Chakra UI, React Query  
- **Backend:** Nest.js (https://github.com/AnshulAgrawal999/school_enquiry_backend)
- **Database:** MongoDB  

## Prerequisites
Before setting up the project, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (local or cloud instance, e.g., MongoDB Atlas)
- Git

## Installation
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/AnshulAgrawal999/school_enquiry_app.git
   cd school_enquiry_app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env.local` file in the root directory and add the following:
   ```plaintext
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_secret_key
   ```
   - Replace `your_mongodb_connection_string` with your MongoDB URI.
   - Generate a secure `NEXTAUTH_SECRET` (e.g., using `openssl rand -base64 32`).

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Usage
- **User Panel:** Navigate to the enquiry submission form to submit a new enquiry without logging in.
- **Admin Panel:** Log in with admin credentials to access the dashboard and manage enquiries.

## Contact
For questions or feedback, feel free to reach out to [Anshul Agrawal](https://github.com/AnshulAgrawal999) or open an issue on this repository.

---

### Notes:
- **Environment Variables:** You might need to adjust the `.env.local` variables based on your app’s specific requirements (e.g., authentication setup with NextAuth or API keys).

