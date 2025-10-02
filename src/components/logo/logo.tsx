import { Box, Image } from "@chakra-ui/react";

const Logo = (light: true | false) => {
  return (
    <Box fontSize={30}>
      <Image src={"/images/logo.png"} alt={"logo"} w={"200px"} h={""}/>
    </Box>
  );
};

export default Logo;
