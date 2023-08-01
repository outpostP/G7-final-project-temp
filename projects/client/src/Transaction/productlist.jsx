import React, { useState } from 'react';
import { Box, Input, Select, List, ListItem, Text, Button, Stack } from '@chakra-ui/react';

const ProductList = ({ products, onAddToCart }) => {
  const [filterName, setFilterName] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  const handleFilterCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(filterName.toLowerCase()) &&
      (filterCategory === '' || product.category === filterCategory)
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <Box>
      <Box mb={4}>
        <Input placeholder="Filter by name" value={filterName} onChange={handleFilterNameChange} />
      </Box>
      <Box mb={4}>
        <Select placeholder="Filter by category" value={filterCategory} onChange={handleFilterCategoryChange}>
          <option value="">All</option>
          {/* Replace with actual category options */}
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          {/* Add more options as needed */}
        </Select>
      </Box>
      <List>
        {currentProducts.map((product) => (
          <ListItem key={product.product_id} mb={2}>
            <Box p={2} borderWidth="1px" borderRadius="md" cursor="pointer" onClick={() => onAddToCart(product)}>
              <Text>{product.name}</Text>
              <Text>{product.price}</Text>
              <Text>{product.category}</Text>
            </Box>
          </ListItem>
        ))}
      </List>
      <Stack direction="row" justify="center" mt={4}>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Text>{currentPage} / {totalPages}</Text>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductList;
