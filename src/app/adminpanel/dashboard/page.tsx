'use client'

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

export default function AdminPanel() {
  const [studentCount, setStudentCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the number of students from the backend
    const fetchStudentCount = async () => {
      try {
        const response = await fetch('http://localhost:4000/admin/studentcount' )  ; // Adjust the endpoint based on your setup
        if (!response.ok) {
          throw new Error('Failed to fetch student count');
        }
        const data = await response.json();
        setStudentCount(data.studentCount);
      } catch (err) {
        // Use TypeScript-safe handling for `err`
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchStudentCount();
  }, []);

  return (
    <>
      <Navbar />
      
      <div style={styles.container}>
        <h1 style={styles.heading}>Admin Dashboard</h1>
        {error ? (
          <p style={styles.error}>Error: {error}</p>
        ) : studentCount !== null ? (
          <div style={styles.box}>
            <p style={styles.boxText}>Number of Student Enquiries:</p>
            <h2 style={styles.studentCount}>{studentCount}</h2>
          </div>
        ) : (
          <p style={styles.loading}>Loading...</p>
        )}
      </div>

    </>
  );
}

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    textAlign: 'center', // Fix: TypeScript expects a specific type for `textAlign`
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f9',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  box: {
    display: 'inline-block',
    padding: '20px 30px',
    backgroundColor: '#ffffff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  boxText: {
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '10px',
    color: '#555',
  },
  studentCount: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#007BFF',
  },
  error: {
    color: '#FF4D4F',
    fontSize: '1rem',
  },
  loading: {
    color: '#888',
    fontSize: '1rem',
  },
};
