
const styles: { [ key: string ] : React.CSSProperties } = {

    navbar: {
      backgroundColor: '#333',
      padding: '10px 20px',
      color: 'white',
      display : "flex"  ,
      justifyContent : 'space-between'
    },

    navContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '0 auto',
      gap: '15px',
    },

    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white',
      textDecoration: 'none',
    },

    menu: {
      display: 'flex',
      gap: '15px',
    },

    button: {
      backgroundColor: '#555',
      border: 'none',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
    },

  }

  export default styles  ;