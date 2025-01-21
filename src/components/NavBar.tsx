import { Box, Text } from "@chakra-ui/react";

interface Props {
  name: string;
}

const NavBar = ({ name }: Props) => {
  return (
    <Box
      backgroundColor="#FFF2F2"
      borderBottomLeftRadius="30px"
      borderBottomRightRadius="30px"
      width={"100%"}
      height={"70px"}
    >
      <Text margin={0} padding={"15px"} fontSize={"32px"}>
        Welcome Back ,{name}!
      </Text>
    </Box>
  );
};

export default NavBar;
