import { Button } from "../components/ui/button"
import { Input, Text } from "@chakra-ui/react"

const SignUp3 = () => {
  return (
    <div 
      className="sign-up3"
      style={{
        backgroundImage: 'url("src/assets/backdrop.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Itim", serif',
        fontWeight: 400,
        fontStyle: "normal"
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem', width: '100%', maxWidth: '400px' }}>
        <Text textStyle="4xl">Some more details for us to help you!</Text>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Weight (kg)</label>
            <Input type="text"
              placeholder="Enter your weight" variant="outline"></Input>
          </div>
          
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Height (cm)</label>
            <Input type="text"
              placeholder="Enter your height" variant="outline"></Input>
          </div>
        </div>
      </div>
      
      <Button colorPalette="blue" variant="solid">
        All SET!
      </Button>
    </div>
  )
}

export default SignUp3