export const modalOverlayStyle: React.CSSProperties = {
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
  
export const modalStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '600px',
    maxHeight: '90vh', // Limit height to 90% of the viewport
    overflowY: 'auto', // Enable vertical scrolling within the modal
  };
  
  
export const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };
  
export const labelStyle: React.CSSProperties = {
    marginBottom: '10px',
    fontSize: '1rem',
    color: '#34495e',
  };
  
export const inputStyle: React.CSSProperties = {
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ecf0f1',
    borderRadius: '4px',
    marginBottom: '15px',
  };
  
export const checkboxStyle: React.CSSProperties = {
    marginBottom: '15px',
  };
  
export const saveButtonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  };
  
export const cancelButtonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };
  