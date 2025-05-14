
// // "use client"; // Add this directive at the top of the file

// // import React, { useState, useEffect } from 'react';
// // import Image from 'next/image';
// // import styles from '../styles/Login.module.css';
// // import Link from 'next/link';
// // import '@fortawesome/fontawesome-free/css/all.min.css';



// // const Login = () => {
// //   // Ensure client-specific code doesn't run on the server
// //   const [isMounted, setIsMounted] = useState(false);
  
// //   useEffect(() => {
// //     setIsMounted(true);
// //   }, []);

// //   if (!isMounted) return null; // Render nothing on the server

// //   return (
// //     <div className={styles.container}>
// //       <div className={styles.background}></div>
// //       <div className={styles.glassBox}>
// //         <Image src="/nexus-logo.png" alt="Nexus Logo" width={200} height={200} className={styles.logo} />
// //         <h2 className={styles.title}>Login</h2>

// //         <form className={styles.form}>
// //           <div className={styles.inputBox}>
// //             <i className="fas fa-envelope"></i> {/* Email Icon */}
// //             <input type="email" required placeholder="Email or Username" />
// //           </div>
// //           <div className={styles.inputBox}>
// //             <i className="fas fa-lock"></i> {/* Password Icon */}
// //             <input type="password" required placeholder="Password" />
// //           </div>

// //           <button type="submit" className={styles.submitButton}>Sign In</button>
// //         </form>

// //         <div className={styles.options}>
// //           <Link href="/forgot-password" className={styles.forgotPassword}>
// //             Forgot Password?
// //           </Link>
// //           <span className={styles.or}>OR</span>
// //           <button className={styles.googleButton}>
// //             <i className="fab fa-google"></i> Sign in with Google
// //           </button>

// //           <Link href="/CreateAccount" className={styles.createAccount}>
// //             Create Account?
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;

// "use client"; // Add this directive at the top of the file

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import styles from "../styles/Login.module.css";
// import Link from "next/link";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Login = () => {
//   const [isMounted, setIsMounted] = useState(false);
//   const [emailOrUsername, setEmailOrUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const router = useRouter(); // For redirecting after successful login

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (!isMounted) return null; // Render nothing on the server

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setSuccessMessage("");

//     try {
//       const response = await fetch("http://localhost:5000/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ emailOrUsername, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Login failed");
//       }

//       const data = await response.json();
//       setSuccessMessage(data.message);

//       // Save token and user data in local storage
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.userData));

//       // Redirect to the main page
//       router.push("/");
//     } catch (error) {
//       setErrorMessage(error.message);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.background}></div>
//       <div className={styles.glassBox}>
//         <Image
//           src="/nexus-logo.png"
//           alt="Nexus Logo"
//           width={200}
//           height={200}
//           className={styles.logo}
//         />
//         <h2 className={styles.title}>Login</h2>

//         <form className={styles.form} onSubmit={handleSubmit}>
//           <div className={styles.inputBox}>
//             <i className="fas fa-envelope"></i>
//             <input
//               type="text"
//               required
//               placeholder="Email or Username"
//               value={emailOrUsername}
//               onChange={(e) => setEmailOrUsername(e.target.value)}
//             />
//           </div>
//           <div className={styles.inputBox}>
//             <i className="fas fa-lock"></i>
//             <input
//               type="password"
//               required
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <button type="submit" className={styles.submitButton}>
//             Sign In
//           </button>
//         </form>

//         {errorMessage && <p className={styles.error}>{errorMessage}</p>}
//         {successMessage && <p className={styles.success}>{successMessage}</p>}

//         <div className={styles.options}>
//         <Link href="/signIn/forgot-password" className={styles.forgotPassword}>
//   Forgot Password?
// </Link>

//           <span className={styles.or}>OR</span>
//           <button className={styles.googleButton}>
//             <i className="fab fa-google"></i> Sign in with Google
//           </button>

//           <Link href="/signup" className={styles.createAccount}>
//             Create Account?
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

"use client"; // Add this directive at the top of the file

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../styles/Login.module.css";
import Link from "next/link"; // Ensure you use Link for routing
import "@fortawesome/fontawesome-free/css/all.min.css";

const Login = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter(); // For redirecting after successful login

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Render nothing on the server

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      setSuccessMessage(data.message);

      // Save token and user data in local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.userData));

      // Redirect to the main page
      router.push("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.glassBox}>
        <Image
          src="/nexus-logo.png"
          alt="Nexus Logo"
          width={200}
          height={200}
          className={styles.logo}
        />
        <h2 className={styles.title}>Login</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputBox}>
            <i className="fas fa-envelope"></i>
            <input
              type="text"
              required
              placeholder="Email or Username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />
          </div>
          <div className={styles.inputBox}>
            <i className="fas fa-lock"></i>
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Sign In
          </button>
        </form>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}

        <div className={styles.options}>
        <Link href="/forgot-password" className={styles.forgotPassword}>
  Forgot Password?
</Link>



          <span className={styles.or}>OR</span>
          <button className={styles.googleButton}>
            <i className="fab fa-google"></i> Sign in with Google
          </button>

          <Link href="/signup" className={styles.createAccount}>
            Create Account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
