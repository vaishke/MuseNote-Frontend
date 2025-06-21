import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './RegisterPage.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const isValid = /^[^\s@]+@gmail\.com$/.test(email);
    setEmailError(isValid ? '' : 'Please enter a valid Gmail address (e.g., yourname@gmail.com).');
    return isValid;
  };

  const handleSendOtp = async () => {
    if (!username || !email || !password) {
      toast.error('Please fill in all fields.', { position: 'top-center' });
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Invalid Gmail address.', { position: 'top-center' });
      return;
    }

    try {
      await axios.post(`http://localhost:8085/sendOtp?email=${email}`);
      toast.success('OTP sent to your Gmail!', { position: 'top-center' });
      setStep(2);
    } catch (err) {
      console.error('OTP Send Error:', err);
      const message = err.response?.data || 'Failed to send OTP. Please try again.';
      toast.error(message, { position: 'top-center' });
    }
  };

  const handleVerifyOtpAndRegister = async () => {
    if (!otp) {
      toast.error('Please enter the OTP.', { position: 'top-center' });
      return;
    }

    try {
      const verifyRes = await axios.post('http://localhost:8085/verifyOtp', {
        email,
        otp
      });

      if (verifyRes.data === true || verifyRes.data === 'OTP verified') {
        const newUser = {
          userName: username,
          mail: email,
          password: password
        };
        try {
          await axios.post('http://localhost:8085/addUser', newUser);
          toast.success(`🎉 Welcome ${username}! Registration successful.`, {
            position: 'top-center',
            autoClose: 2000
          });
          setTimeout(() => {
            navigate('/');
          }, 2500);
        } catch (err) {
          if (err.response && err.response.status === 409) {
            toast.error('Username already exists. Please choose another.', { position: 'top-center' });
          } else {
            toast.error('Registration failed. Please try again.', { position: 'top-center' });
          }
        }
        /*
        await axios.post('http://localhost:8085/addUser', newUser);

        toast.success(`🎉 Welcome ${username}! Registration successful. Check your Gmail.`, {
          position: 'top-center',
          autoClose: 2000
        });*/

        setTimeout(() => {
          navigate('/');
        }, 2500);
      } else {
        toast.error('Invalid OTP.', { position: 'top-center' });
      }
    } catch (err) {
      console.error('Registration Error:', err);
      toast.error('OTP verification or registration failed.', { position: 'top-center' });
    }
  };

  return (
    <div className="register-page">
      <ToastContainer />
      <div className="logosection-reg">
        <img src={logo} alt="Logo" className="logoimage-reg" />
      </div>
      <div className="register-form-container">
        <div className="register-box">
          <h2>Register</h2>

          {step === 1 ? (
            <>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="register-input"
              />
              <input
                type="email"
                placeholder="Email ID (only Gmail)"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                className="register-input"
              />
              {emailError && <p className="error-text">{emailError}</p>}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="register-input"
              />
              <button
                onClick={handleSendOtp}
                className="register-button"
                disabled={!username || !email || !password}
              >
                Send OTP
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="register-input"
              />
              <button
                onClick={handleVerifyOtpAndRegister}
                className="register-button"
              >
                Verify & Register
              </button>
            </>
          )}

          <p className="register-link-text">
            Already have an account?{' '}
            <span
              className="register-link-span"
              onClick={() => navigate('/')}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
