import { Box, Text, Flex, IconButton, Center } from "@chakra-ui/react";
import { useUserProfileStore, useThemeStore } from "../store";
import { FaMoon, FaSun } from "react-icons/fa";

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
      backgroundColor={isDarkMode ? "#2D3748" : "#FFF2F2"}
      borderBottomLeftRadius="30px"
      borderBottomRightRadius="30px"
      width={"100%"}
      height={"70px"}
    >
      <Flex justifyContent="space-between" alignItems="center" padding={"15px"}>
        <Text 
          fontSize={"25px"}
          color={isDarkMode ? "white" : "black"}
        >
          {name ? `Welcome Back, ${name}!` : 'Welcome!'}
        </Text>
        <Flex gap={4} alignItems="center" justifyContent="center">
          <Text 
            fontSize={"18px"}
            color={isDarkMode ? "white" : "black"}
          >
            {calculateBMI() ? `Your current BMI: ${calculateBMI()}` : ''}
          </Text>
          <br></br>
          <IconButton 
            aria-label="Toggle dark mode"
            icon={isDarkMode ? <FaSun /> : <FaMoon />}
            onClick={toggleDarkMode}
            variant="ghost"
            color={isDarkMode ? "white" : "black"}
            size="lg"
            _hover={{
              bg: isDarkMode ? "whiteAlpha.200" : "blackAlpha.200",
              transform: "scale(1.1)",
            }}
            transition="all 0.2s ease-in-out"
            borderRadius="full"
            fontSize="30px"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
