import { useNavigate } from "react-router-dom";
import {useUserProfileStore} from "./store";

const SignUp2 = () => {
  const navigate = useNavigate();
  const { name, email, setName, setEmail } = useUserProfileStore();
  

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
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "0.5rem",
                width: "100%",
                boxSizing: "border-box",
              }}
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          <div style={{ textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Email Id
            </label>
            <input
              type="text"
              placeholder="Enter your email address"
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "0.5rem",
                width: "100%",
                boxSizing: "border-box",
              }}
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          cursor: "pointer",
          textAlign: "center",
        }}
        onClick={() => navigate("/signup3")}
      >
        Next
      </div>
    </div>
  );
};

export default SignUp2;
