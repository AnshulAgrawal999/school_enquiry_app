'use client'  ;

import { useEffect , useState } from 'react'  ;

import Link from 'next/link'  ;

import { useRouter } from 'next/navigation'  ;

import styles from './Navbar.css'  ;

import { useQuery } from 'react-query'  ;

import axios from 'axios';



const validateToken = async () => {

  const token = localStorage.getItem( 'token' )  ;

  if ( !token ) {
    throw new Error( 'No token found' )  ;
  }

  const response = await fetch( 'http://localhost:4000/admin/validate-token' , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token , 
    },
  });

  console.log( response )  ;

  if ( !response.ok ) {
    throw new Error( 'Invalid or expired token' )  ;
  }

  const data = await response.json()  ;

  return data; 

} 



const Navbar: React.FC = () => {

  const router = useRouter()  ;

  // React Query hook to validate the JWT token
  const { data, isLoading, isError } = useQuery('validateToken', validateToken, {

    enabled: typeof window !== 'undefined' && !!localStorage.getItem('token'), // Only run query if token exists

    onError: () => {
      router.push('/adminpanel/login'); // Redirect if the token is invalid or expired
    },
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect( () => {
    
    const token = localStorage.getItem( 'token' )  ;

    if( token )
    { 
      setIsLoggedIn( true )  ;
    }
    else
    { 
      router.push( '/adminpanel/login' )  ;
    }

  } , [ isLoggedIn , router ] )  ;


  const handleLogin = () => 
  {
    router.push( '/adminpanel/login' )  ;
  } 

  
const handleLogout = async () => {
  try {

    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found in localStorage');
    }

    // Send POST request to the backend
    const response = await axios.post(
      'http://localhost:4000/admin/logout',
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.status === 200) {
      console.log(response.data.message);

      // Clear local storage and redirect
      localStorage.removeItem('token');

      localStorage.removeItem('adminName');

      setIsLoggedIn(false);

      router.push('/adminpanel/login');

    } else {

      console.error('Logout failed', response.data)  ;

    }
  } catch (error : any ) {

    console.error('Error during logout:', error.message)  ;

    alert('Failed to log out.')  ;
  }
};

  return (

    <nav style={ styles.navbar } >

      <div style={ styles.navContainer } >

        <Link href="/adminpanel" style={ styles.logo } >
          Admin Panel
        </Link>

      </div>

      <div style={ styles.navContainer } >

          <Link href="/adminpanel/dashboard" >

          <button style={ styles.button } >
            dashboard
          </button>

          </Link>

          <Link href="/adminpanel/enquirytable" >

          <button style={ styles.button } >
            Enquiry Table
          </button>

          </Link>

      </div>


      <div style={ styles.navContainer } >  

        <div style={ styles.menu } >
         
          { isLoading ? 'Loading...' : isError ? 'Error validating token' : data?.adminName }

        </div>

        <div style={ styles.menu } >

          { isLoggedIn ? 
            (
              <button style={ styles.button } onClick={ handleLogout } >
                Logout
              </button>
            ) : 
            (
              <button style={ styles.button } onClick={ handleLogin } >
                Login
              </button>
            )
          }

        </div>

      </div>

    </nav>

  )  ;
  
}  


export default Navbar  ;
