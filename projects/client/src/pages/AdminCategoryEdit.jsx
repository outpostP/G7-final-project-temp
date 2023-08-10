import { Box, Button, Input, Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react";
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const token = localStorage.getItem("token");

const CategoryEdit = () => {
    const { id } = useParams();
    const cate = useLoaderData();
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState(cate.categoryName);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.patch(`http://localhost:8000/admin/cate/${id}`, {
                category: userInput
            },{ 
                headers: {
                  "Authorization": `Bearer ${token}`
                },
            });
            console.log(response.data);
            toast.success(response.data.message);
            setUserInput('');
            navigate('/admin/category');

        } catch (error) {
            console.error(error);
            toast.error('Failed to update category.');
        }
    };

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
            <ToastContainer />
        </Box>
    );
};

export default CategoryEdit;

export const currentCategoryLoader = async ({params}) => {
    const {id} = params;

    const res = await fetch(`http://localhost:8000/admin/cate/${id}`,{ 
        headers: {
          "Authorization": `Bearer ${token}`
        },
    })

    return res.json();
}
