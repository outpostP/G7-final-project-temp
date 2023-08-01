import { Box, Flex, Spacer, Button, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Navbar() {
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <Flex align="center" justify="space-between" p={4} bg="blue.500" color="white">
      <Box>
        <strong>Website Name</strong>
      </Box>
      <Spacer /> 
      <Box>
        {/* <Link to="/login">
          <Button size={buttonSize} colorScheme="teal" variant="outline">
            Login
          </Button>
        </Link> */}
      </Box>
    </Flex>
  );
}

export default Navbar;
