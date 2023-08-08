/* eslint-disable react/jsx-no-duplicate-props */
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, FormControl, Select, FormLabel, Input, Button, Switch } from "@chakra-ui/react";
import { useLoaderData, useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const { id } = useParams();
  const product = useLoaderData(currentProductLoader, { params: { id } });
  const [formData, setFormData] = useState({});
  const fileInputRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const url = 'http://localhost:8000/admin/cate';
      const response = await axios.get(url);
      setCategories(response.data.data.category);
      console.log(response)
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategoryId = parseInt(event.target.value, 10);
    setCategoryId(selectedCategoryId === 0 ? null : selectedCategoryId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    if (formData.productName) {
      formDataToSend.append("productname", formData.productName);
    }
    if (formData.productPrice) {
      formDataToSend.append("productprice", formData.productPrice);
    }
    if (formData.productDescription) {
      formDataToSend.append("productdes", formData.productDescription);
    }
    if (formData.categoryId) {
      formDataToSend.append("category", formData.categoryId);
    }
    if (fileInputRef.current.files[0]) {
      formDataToSend.append("productImage", fileInputRef.current.files[0]);
    }

    // Append the _method parameter to simulate PATCH request
    // formDataToSend.append("_method", "PATCH");

    try {
      const response = await axios.patch(`http://localhost:8000/admin/product/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle response
      console.log(response.data);

      // Reset the form
      setFormData({});
      fileInputRef.current.value = null;
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Edit Product</TableCaption>
        <Thead>
          <Tr>
            <Th>Product Name</Th>
            <Th>Product Price</Th>
            <Th>Category</Th>
            <Th>Status</Th>
            <Th>Image</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{product.productName}</Td>
            <Td>${product.productPrice}</Td>
            <Td>{product.Category.categoryName}</Td>
            <Td>{product.isActive ? 'Yes' : 'No'}</Td>
            <Td>
              <Box width="100px" height="100px">
                <img src={`http://localhost:8000/${product.productImage}`} alt={product.productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            </Td>
          </Tr>
        </Tbody>
      </Table>

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <FormControl>
          <FormLabel>Product Name</FormLabel>
          <Input type="text" name="productName" value={formData.productName || ''} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Product Price</FormLabel>
          <Input type="text" name="productPrice" value={formData.productPrice || ''} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Product Description</FormLabel>
          <Input type="text" name="productDescription" value={formData.productDescription || ''} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Product Status</FormLabel>
          <Switch
    name="isActive"
    isChecked={formData.isActive || product.isActive}
    onChange={() => setFormData(prevFormData => ({ ...prevFormData, isActive: !prevFormData.isActive }))}
  />
            </FormControl>
        <Select placeholder="All Categories" name="categoryId" value={formData.categoryId || ''} onChange={handleChange}>
  {categories.map((category) => (
    <option value={category.id} key={category.id}>
      {category.categoryName}
    </option>
  ))}
</Select>
        <FormControl>
          <FormLabel>Image</FormLabel>
          <Input type="file" name="productImage" ref={fileInputRef} />
        </FormControl>
        <Button type="submit" colorScheme="teal" mt={4}>Submit</Button>
      </form>
    </div>
  );
};

export default ProductList;

export const currentProductLoader = async ({ params }) => {
  const { id } = params;

  const res = await fetch(`http://localhost:8000/admin/product/${id}`);

  return res.json();
};
