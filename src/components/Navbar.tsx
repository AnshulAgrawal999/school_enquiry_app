'use client'  ;

import { useEffect , useState } from 'react'  ;

import Link from 'next/link'  ;

import { useRouter } from 'next/navigation'  ;

import styles from './Navbar.css'  ;

const Navbar: React.FC = () => {

  const [ isLoggedIn , setIsLoggedIn ] = useState( false )  ;

  const router = useRouter()  ;

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

  const handleLogout = () => {

    localStorage.removeItem( 'token' )  ;

    localStorage.removeItem( 'adminName' )  ;

    setIsLoggedIn( false )  ;
  } 

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
          { localStorage.getItem( "adminName" ) }
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
