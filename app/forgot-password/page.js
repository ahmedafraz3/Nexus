"use client"; // Add this directive at the top of the file

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/ForgetPassword.module.css";
import { FaEnvelope } from "react-icons/fa"; // Importing the mail icon from react-icons
import Link from "next/link"; // Importing Link for navigation
import axios from 'axios'; // To make HTTP requests to your backend
import Image from 'next/image'

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpFilled, setOtpFilled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false); // To check if OTP is sent
  const [otpVerified, setOtpVerified] = useState(false); // To track OTP verification status
  const [newPassword, setNewPassword] = useState(""); // For new password
  const router = useRouter();

  const handleEmailSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/forgot-password", { email });
      if (response.status === 200) {
        setOtpSent(true);
        setErrorMessage("");
      }
    } catch (error) {
      // Error handling if email submission fails
      setErrorMessage(error.response?.data?.message || "Something went wrong!");
    }
  };

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    const inputValue = e.target.value;

    // Handle entering numbers
    if (/^[0-9]$/.test(inputValue)) {
      newOtp[index] = inputValue;
      setOtp(newOtp);

      // Move focus to the next input if the current one is filled
      if (index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        nextInput.focus();
      }
    }

    // Handle backspace
    if (e.key === "Backspace") {
      if (newOtp[index] === "") {
        // If current input is empty, move focus to the previous input
        if (index > 0) {
          const prevInput = document.getElementById(`otp-input-${index - 1}`);
          newOtp[index - 1] = "";
          setOtp(newOtp);
          prevInput.focus();
        }
      } else {
        // Clear current input and stay on it
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }

    // Check if all inputs are filled
    setOtpFilled(newOtp.every((digit) => digit !== ""));
  };

  const handleOtpVerify = async () => {
    const otpInput = otp.join("");
    try {
      const response = await axios.post("http://localhost:5000/auth/verify-otp", { email, otp: otpInput });
      if (response.status === 200) {
        setOtpVerified(true);
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Invalid or expired OTP");
    }
  };

  const handlePasswordReset = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/reset-password", { email, newPassword });
      if (response.status === 200) {
        setErrorMessage("Password reset successfully!");
        router.push("/signIn");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.glassBox}>
      <Image
          src="/nexus-logo.png"
          alt="Nexus Logo"
          width={200}
          height={200}
          className={styles.logo}
        />
        <div className={styles.header}>
          <h2 className={styles.title}>Forgot Password</h2>
        </div>

        {/* Email input field with icon */}
        <div className={styles.inputBox}>
          <div className={styles.inputWrapper}>
            <FaEnvelope className={styles.inputIcon} />
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Send OTP button */}
        <button className={styles.otpButton} onClick={handleEmailSubmit}>
          Send OTP
        </button>

        {otpSent && (
          <>
            <div className={styles.otpBox}>
              <div className={styles.otpInputBox}>
                <div className={styles.otpInputs}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`}
                      type="text"
                      placeholder="-"
                      maxLength="1"
                      className={styles.otpInput}
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleOtpChange(e, index)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <button className={styles.submitButton} disabled={!otpFilled} onClick={handleOtpVerify}>
              Verify OTP
            </button>
          </>
        )}

        {otpVerified && (
          <div className={styles.inputBox}>
            <input
              type="password"
              placeholder="Enter new password"
              className={styles.input}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className={styles.submitButton} onClick={handlePasswordReset}>
              Reset Password
            </button>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

        {/* Back to Login Button */}
        <Link href="/signIn" className={styles.goBackButton}>
          &#8592; Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
