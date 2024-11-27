
const styles: { [ key : string ] : React.CSSProperties } = {

    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f9f9f9',
    },

    title: {
      fontSize: '2rem',
      marginBottom: '20px',
      color: '#333',
    },

    form: {
      width: '300px',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: 'white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },

    formGroup: {
      marginBottom: '15px',
    },

    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#555',
    },

    input: {
      width: '100%',
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },

    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#0070f3',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
    },

    error: {
      color: 'red',
      marginBottom: '15px',
      textAlign: 'center',
    },
    
}

export default styles  ;