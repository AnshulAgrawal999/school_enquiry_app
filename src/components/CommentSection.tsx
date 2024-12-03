import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Comment {
  _id: string;
  username: string;
  comment: string;
  student: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminCommentSectionProps {
  studentId: string;
}

const CommentSection: React.FC<AdminCommentSectionProps> = ({ studentId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [username] = useState('admin'); // hardcoded as admin, can be dynamic if needed

  // Fetch existing remarks when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/admin/remarklist/${studentId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching remarks:', error);
      }
    };

    fetchComments();
  }, [studentId]);

  // Handle new comment submission
  const handleAddComment = async () => {
    if (!newComment) {
      alert('Please enter a comment!');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:4000/admin/addremark/${studentId}`, {
        username,
        comment: newComment,
      });
      // Append the new comment to the list
      setComments([response.data, ...comments]);
      setNewComment(''); // Clear the input after submission
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Admin Remarks</h2>

      {/* New Comment Form */}
      <div style={styles.commentForm}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Enter a new remark"
          rows={4}
          cols={50}
          style={styles.textarea}
        />
        <button onClick={handleAddComment} style={styles.submitButton}>Add Remark</button>
      </div>

      {/* Display existing comments */}
      <div style={styles.commentsSection}>
        <h3 style={styles.subHeader}>Previous Remarks:</h3>
        {comments.length > 0 ? (
          <ul style={styles.commentsList}>
            {comments.map((comment) => (
              <li key={comment._id} style={styles.commentItem}>
                <strong style={styles.commentUsername}>{comment.username}</strong> (on{' '}
                {new Date(comment.createdAt).toLocaleString()}):
                <p style={styles.commentText}>{comment.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.noComments}>No remarks yet.</p>
        )}
      </div>
    </div>
  );
};


const styles = {
    container: {
      width: '80%',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
      fontSize: '24px',
      color: '#333',
      marginBottom: '20px',
    },
    commentForm: {
      display: 'flex' as 'flex',
      flexDirection: 'column' as 'column',  // Correct type
      gap: '10px',
      marginBottom: '20px',
    },
    textarea: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      resize: 'vertical' as 'vertical',  // Correct type
      minHeight: '100px',
      fontFamily: 'Arial, sans-serif',
    },
    submitButton: {
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      fontSize: '16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    commentsSection: {
      marginTop: '20px',
    },
    subHeader: {
      fontSize: '20px',
      color: '#333',
      marginBottom: '10px',
    },
    commentsList: {
      listStyleType: 'none',
      paddingLeft: '0',
    },
    commentItem: {
      backgroundColor: '#fff',
      padding: '15px',
      borderRadius: '6px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      marginBottom: '10px',
    },
    commentUsername: {
      fontWeight: 'bold',
      color: '#007BFF',
    },
    commentText: {
      fontSize: '16px',
      color: '#555',
    },
    noComments: {
      color: '#888',
      fontStyle: 'italic',
    },
  };
  


export default CommentSection;
