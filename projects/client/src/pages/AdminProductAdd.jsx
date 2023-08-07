/* eslint-disable react/jsx-no-duplicate-props */
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, FormControl,Select, FormLabel, Input, Button } from "@chakra-ui/react";
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const ProductAdd = () => {

  const [formData, setFormData] = useState({});
  const fileInputRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const url = 'http://localhost:8000/admin/cate';
      const response = await axios.get(url);
      setCategories(response.data.data);
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
      formDataToSend.append("file", fileInputRef.current.files[0]);
    }

    

    try {
      const response = await axios.post('http://localhost:8000/admin/product', formDataToSend, {
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
        <Select placeholder="All Categories" onChange={handleCategoryChange} name="categoryId" value={formData.categoryId || ''} onChange={handleChange}>
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

export default ProductAdd;
