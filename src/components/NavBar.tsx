import { Box, Flex, Text, Center } from "@chakra-ui/react";
import { useUserProfileStore, useThemeStore } from "../store";

const NavBar = () => {
  const { name, weightKg, heightCm } = useUserProfileStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  const calculateBMI = () => {
    if (!weightKg || !heightCm) return null;
    const heightM = heightCm / 100;
    return (weightKg / (heightM * heightM)).toFixed(1);
  };

  return (
    <Box
      backgroundColor={isDarkMode ? "rgba(45, 55, 72, 0.95)" : "#fefafa"}
      borderBottomLeftRadius="30px"
      borderBottomRightRadius="30px"
      width={"100%"}
      height={"90px"}
      boxShadow={
        isDarkMode ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.1)"
      }
      backdropFilter="blur(10px)"
      position="sticky"
      top="0"
      zIndex="1000"
      transition="all 0.3s ease"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        padding={"15px"}
        height="100%"
      >
        <Flex gap={4} alignItems="center" flex="1">
          <Text
            fontSize={"25px"}
            color={isDarkMode ? "white" : "black"}
            fontWeight="medium"
            transition="color 0.3s ease"
            _hover={{ transform: "translateX(5px)" }}
            display="inline-block"
          >
            {name ? `Welcome Back, ${name}!` : "Welcome!"}
          </Text>
        </Flex>
        <Center flex="1">
          <Text
            fontSize={"35px"}
            fontWeight="bold"
            fontFamily='"Itim", serif'
            fontStyle="normal"
            color={isDarkMode ? "white" : "black"}
            letterSpacing="wide"
            transition="all 0.3s ease"
            _hover={{ transform: "scale(1.05)" }}
            cursor="default"
          >
            CaloTrack
          </Text>
        </Center>
        <Flex gap={4} alignItems="center" justifyContent="flex-end" flex="1">
          <Text
            fontSize={"18px"}
            color={isDarkMode ? "white" : "black"}
            fontWeight="medium"
            transition="color 0.2s ease"
          >
            {calculateBMI() ? `Your current BMI: ${calculateBMI()}` : ""}
          </Text>
          <label className="theme-switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <span className="slider">
              <span className="icon">🌙</span>
              <span className="icon">☀️</span>
            </span>
          </label>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
