'use client'  ;

import { useState } from 'react'  ;

import { useMutation } from 'react-query'  ;

import { useRouter } from 'next/navigation'  ;

import styles from './login.css'  ; 


const loginUser = async ( { username , password } : { username : string ; password : string } ) => 
    {
      const response = await fetch( 'http://localhost:4000/admin/login' , 
      {
        method: 'POST' ,
        headers: { 'Content-Type': 'application/json' } ,
        body: JSON.stringify({ username, password }) ,
      }
  );

  if ( !response.ok ) {

    const errorData = await response.json()  ;

    throw new Error( errorData.message || 'Login failed' )  ;
  }

  return response.json()  ;
};



const Login : React.FC = () => {

  const [ username , setUsername ] = useState( '' )  ;

  const [ password , setPassword ] = useState( '' )  ;

  const [ error , setError ] = useState( '' )  ;

  const router = useRouter()  ;

  const mutation = useMutation( loginUser , 
    {
      onSuccess : data => {

        localStorage.setItem( 'token' , data.token )  ;

        localStorage.setItem( 'adminName' , username )  ;

        router.push( '/adminpanel' )  ;
      },

      onError : ( error: any ) => {
        setError( error.message || 'An unexpected error occurred' )  ;
      },
  });

  const handleSubmit = async ( e : React.FormEvent ) => {

    e.preventDefault()  ;

    if ( !username || !password ) 
    {
      setError( 'Enter both username and password' )  ;

      return  ;
    }

    mutation.mutate( { username , password } )  ;

  }  ;

  return (

    <div style={ styles.container } >

      <h1 style={ styles.title }> Admin Login </h1>

      <form style={ styles.form } onSubmit={ handleSubmit } >

        { error && <p style={ styles.error } > { error } </p> }

        <div style={ styles.formGroup } >

          <label htmlFor="username" style={ styles.label } >
            Username
          </label>

          <input
            type="text"
            id="username"
            value={ username }
            onChange={ e => setUsername( e.target.value ) }
            style={ styles.input }
          />
        </div>

        <div style={ styles.formGroup } >

          <label htmlFor="password" style={ styles.label } >
            Password
          </label>

          <input
            type="password"
            id="password"
            value={ password }
            onChange={ e => setPassword( e.target.value ) }
            style={ styles.input }
          />

        </div>

        <button type="submit" style={styles.button} disabled={mutation.isLoading} >
          { mutation.isLoading ? 'Logging in...' : 'Login' }
        </button>

      </form>

    </div>

  );

}


export default Login  ;
