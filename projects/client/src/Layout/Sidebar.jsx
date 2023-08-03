import { Box, Button, Icon, VStack } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Box w="200px" h="100vh" bg="gray.800" color="white">
      <VStack p="10" spacing="10" align="start">
        <Button leftIcon={<Icon as={FaUser} />} colorScheme="teal" variant="solid">
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Sidebar;