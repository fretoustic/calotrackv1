import { useNavigate } from "react-router-dom";
import {useUserProfileStore} from "./store";
import { useState } from "react";

const SignUp2 = () => {
  const navigate = useNavigate();
  const { name, email, setName, setEmail } = useUserProfileStore();
  const [errors, setErrors] = useState({ name: false, email: false });
  const validateAndNavigate = () => {
    const newErrors = {
      name: !name || name.trim() === '',
      email: !email || !email.includes('@') || email.trim() === ''
    };
    
    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email) {
      navigate("/signup3");
    }
  };

  return (
    <div
      className="sign-up2"
      style={{
        backgroundImage: 'url("src/assets/backdrop.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: '"Itim", serif',
        fontWeight: 400,
        fontStyle: "normal",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <div style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Let's get to know you!
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ textAlign: "left" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          style={{
            padding: "0.5rem",
            border: `1px solid ${errors.name ? 'red' : '#ccc'}`,
            borderRadius: "4px",
            width: "100%",
          }}
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <div style={{ color: 'red', fontSize: '0.8rem' }}>Name is required</div>
        )}
      </div>

      <div style={{ textAlign: "left" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          style={{
            padding: "0.5rem",
            border: `1px solid ${errors.email ? 'red' : '#ccc'}`,
            borderRadius: "4px",
            width: "100%",
          }}
          value={email || ''}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <div style={{ color: 'red', fontSize: '0.8rem' }}>Valid email is required</div>
        )}
      </div>

      <button
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          opacity: (!name || !email) ? 0.5 : 1
        }}
        onClick={validateAndNavigate}
      >
        Next
      </button>
    </div>
      </div>
    </div>
  );
};

export default SignUp2;
