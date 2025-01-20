import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";
import { Input, Text } from "@chakra-ui/react";

const SignUp2 = () => {
  const navigate = useNavigate();

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
        <Text textStyle="4xl">Let's get to know you!</Text>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Name
            </label>
            <Input
              type="text"
              placeholder="Enter your name"
              variant="outline"
            ></Input>
          </div>

          <div style={{ textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Email Id
            </label>
            <Input
              type="text"
              placeholder="Enter your email address"
              variant="outline"
            ></Input>
          </div>
        </div>
      </div>

      <Button
        backgroundColor="blue"
        variant="solid"
        onClick={() => navigate("/signup3")}
      >
        Next
      </Button>
    </div>
  );
};

export default SignUp2;
