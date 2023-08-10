/* eslint-disable no-unused-vars */
import { Box, Text, Button, Table, Thead, Tbody, Tr, Th, Td, Tfoot, useBreakpointValue } from "@chakra-ui/react";
import axios from 'axios';
import { useLoaderData, useParams } from 'react-router-dom'
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const Checkout = () => {
  const { id } = useParams();
  const checkout = useLoaderData().data.Transaction_Products;
  // console.log(checkout)
  const total = useLoaderData().data;
  const toast = useToast();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const checkoutContainerWidth = useBreakpointValue({ base: "100%", sm: "80%", md: "60%", lg: "50%" });
  const checkoutContainerMargin = useBreakpointValue({ base: "0", sm: "auto", md: "auto", lg: "auto" });

  const handlePayment = async () => {
    try {
      const payment = await axios.post(`http://localhost:8000/cashier/checkout/${id}`,{ 
        headers: {
          "Authorization": `Bearer ${token}`
        },
    });
      console.log(payment);
      toast({
        title: "Payment Successful",
        description: payment.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/user"); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      width={checkoutContainerWidth}
      margin={checkoutContainerMargin}
    >
      <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={4}>
        Receipt
      </Text>
      <Table variant="striped" colorScheme="gray" size={useBreakpointValue({ base: "sm", md: "md" })}>
        <Thead>
          <Tr>
            <Th borderBottom="1px solid black">Product Name</Th>
            <Th borderBottom="1px solid black">Quantity</Th>
            <Th borderBottom="1px solid black">Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {checkout.map((item, index) => (
            <Tr key={index}>
              <Td>{item.Product.productName}</Td>
              <Td>{item.quantity}</Td>
              <Td>{parseInt(item.quantity) * parseInt(item.productPrice)}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan="2" borderTop="1px solid black">
              Total:
            </Td>
            <Td borderTop="1px solid black">{total.totalPrice}</Td>
          </Tr>
        </Tfoot>
      </Table>
      <Box mt={4}>
        <Button
          colorScheme="blue"
          size={useBreakpointValue({ base: "sm", md: "md" })}
          onClick={handlePayment}
        >
          Pay
        </Button>
        <Button
          colorScheme="red"
          size={useBreakpointValue({ base: "sm", md: "md" })}
          onClick={() => navigate("/user")}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default Checkout;

export const checkoutLoader = async ({params}) => {
  const {id} = params;
  
  const res = await fetch(`http://localhost:8000/admin/checkout/${id}`)

  return res.json();
}
