import { Box, Button, Input, Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react";
import { useLoaderData, useParams } from 'react-router-dom'
import { useState } from "react";
import axios from 'axios';


const CategoryEdit = () => {
    const {id} = useParams();
    const cate = useLoaderData()

    // Set state to hold user's input
    const [userInput, setUserInput] = useState(cate.categoryName);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.patch(`http://localhost:8000/admin/cate/${id}`, {
                category: userInput
            });

            // Handle response         
            console.log(response.data);
            
            // Reset the form
            setUserInput('');

        } catch (error) {
            // Handle error
            console.error(error);
        }
    };
    
    // Update userInput state every time user types into the input field
    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };


    return (
        <Box as="form" onSubmit={handleSubmit}>
            <Table variant="striped" colorScheme="teal">
                <TableCaption>Category Details</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Category ID</Th>
                        <Th>Category Name</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr key={cate.id}>
                        <Td>{cate.id}</Td>
                        <Td>{cate.categoryName}</Td>
                    </Tr>
                </Tbody>
            </Table>

            <Input
                value={userInput}
                onChange={handleInputChange}
                placeholder="Enter new category name"
            />

            <Button type="submit">Update Category</Button>
        </Box>
    );
};

export default CategoryEdit;

export const currentCategoryLoader = async ({params}) => {
    const {id} = params;

    const res = await fetch(`http://localhost:8000/admin/cate/${id}`)

    return res.json();
}
