'use client'; // This makes the component a client component

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router
import styles from '../styles/CreateAccount.module.css';

const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const router = useRouter(); // Now using next/navigation for routing

  // Function to validate password
  const validatePassword = (password) => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8;

    if (hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar && isValidLength) {
      setPasswordMessage('');
    } else {
      setPasswordMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.');
    }
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword); // Validate password on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (passwordMessage) return; // Prevent submission if password is invalid

    try {
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          userName: username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Sign-up error:", errorData);
        throw new Error(errorData.message || "Sign-up failed");
      }

      const data = await response.json();
      alert(data.message); // Alert success message

      // Redirect to login page after successful sign-up
      router.push("/signIn");

    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("Sign-up failed: " + error.message); // Show user-friendly error message
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.glassBox}>
        <div className={styles.logoContainer}>
          <Image src="/nexus-logo.png" alt="Nexus Logo" width={200} height={200} className={styles.logo} />
        </div>
        <h2 className={styles.title}>Create Account</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputBox} data-icon="👤">
            <input 
              type="text" 
              required 
              placeholder="First Name" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} 
            />
          </div>
          <div className={styles.inputBox} data-icon="👤">
            <input 
              type="text" 
              required 
              placeholder="Last Name" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)} 
            />
          </div>
          <div className={styles.inputBox} data-icon="✉️">
            <input 
              type="email" 
              required 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className={styles.inputBox} data-icon="🔑">
            <input 
              type="text" 
              required 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
          <div className={styles.inputBox} data-icon="🔒">
            <input 
              type="password" 
              required 
              placeholder="Password" 
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordMessage && (
              <small style={{ color: 'red', display: 'block' }}>{passwordMessage}</small>
            )}
          </div>
          <button type="submit" className={styles.submitButton}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;





// "use client"; // Ensures this is treated as a client component

// import { useState } from 'react';
// import Image from 'next/image';
// import styles from '../styles/CreateAccount.module.css';

// const CreateAccount = () => {
//   const [password, setPassword] = useState('');
//   const [passwordMessage, setPasswordMessage] = useState('');

//   // Function to validate password
//   const validatePassword = (password) => {
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasNumber = /\d/.test(password);
//     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
//     const isValidLength = password.length >= 8;

//     if (hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar && isValidLength) {
//       setPasswordMessage('');
//     } else {
//       setPasswordMessage(
//         'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.'
//       );
//     }
//   };

//   // Handle password input change
//   const handlePasswordChange = (e) => {
//     const newPassword = e.target.value;
//     setPassword(newPassword);
//     validatePassword(newPassword); // Validate password on change
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.background}></div>
//       <div className={styles.glassBox}>
//         <div className={styles.logoContainer}>
//           <Image src="/nexus-logo.png" alt="Nexus Logo" width={200} height={200} className={styles.logo} />
//         </div>
//         <h2 className={styles.title}>Create Account</h2>

//         <form className={styles.form}>
//           <div className={styles.inputBox} data-icon="👤">
//             <input type="text" required placeholder="First Name" />
//           </div>
//           <div className={styles.inputBox} data-icon="👤">
//             <input type="text" required placeholder="Last Name" />
//           </div>
//           <div className={styles.inputBox} data-icon="✉️">
//             <input type="email" required placeholder="Email" />
//           </div>
//           <div className={styles.inputBox} data-icon="🔑">
//             <input type="text" required placeholder="Username" />
//           </div>
//           <div className={styles.inputBox} data-icon="🔒">
//             <input
//               type="password"
//               required
//               placeholder="Password"
//               value={password}
//               onChange={handlePasswordChange}
//             />
//             {passwordMessage && (
//               <small style={{ color: 'red', display: 'block' }}>{passwordMessage}</small>
//             )}
//           </div>
//           <button type="submit" className={styles.submitButton}>
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateAccount;
