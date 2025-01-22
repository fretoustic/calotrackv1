import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div
      className="sign-up"
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
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "0 2rem",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ fontSize: "4rem", margin: "0" }}>CaloTrack</h1>
        <h2 style={{ fontSize: "2rem", margin: "0" }}>A simplistic calorie tracker.</h2>
      </div>
      <div style={{ textAlign: "center", width: "100%" }}>
        <div
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "1rem 2rem",
            borderRadius: "5px",
            cursor: "pointer",
            display: "inline-block",
          }}
          onClick={() => navigate("/signup2")}
        >
          Sign Up
        </div>
      </div>
    </div>
  );
};

export default SignUp;
