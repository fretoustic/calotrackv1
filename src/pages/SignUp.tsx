import { useNavigate } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { Button } from "../components/button";

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
        <Text textStyle="7xl">CaloTrack</Text>
        <Text textStyle="3xl">A simplistic calorie tracker.</Text>
      </div>
      <div style={{ textAlign: "center", width: "100%" }}>
        <Button
          backgroundColor="blue"
          size="lg"
          onClick={() => navigate("/signup2")}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
