import { useRouter } from 'next/navigation';

const GoBackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={
        () => {
            if (window.history.length > 1) {
              router.back();
            } else {
              router.back(); // Navigate to a fallback route, e.g., the home page
            }
          }
        }
      style={{
        padding: '10px 20px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Go Back
    </button>
  );
};

export default GoBackButton;
