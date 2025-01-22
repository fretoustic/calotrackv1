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
      height={"90px"}
      boxShadow="0 2px 10px rgba(0,0,0,0.1)"
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
            transition="color 0.2s ease"
          >
            {name ? `Welcome Back, ${name}!` : 'Welcome!'}
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
            transition="color 0.2s ease"
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
            {calculateBMI() ? `Your current BMI: ${calculateBMI()}` : ''}
          </Text>
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
