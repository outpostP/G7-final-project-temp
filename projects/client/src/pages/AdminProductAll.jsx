import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Select, Input, Flex, Box } from '@chakra-ui/react';
import axios from 'axios';
import { FaLink } from 'react-icons/fa'

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const fetchCategories = async () => {
      const url = 'http://localhost:8000/admin/cate';
      const response = await axios.get(url);
      setCategories(response.data.data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        let url = `http://localhost:8000/admin/productA?&sort=${sortOrder}&productName=${searchQuery}&page=${currentPage}`;

        if (categoryId) {
          url += `&id_category=${categoryId}`;
        }

        const response = await axios.get(url);
        console.log('response', response)
        const { data, totalPages } = response.data;
        console.log('pages from api',totalPages)
        setProducts(data.products);
        setTotalPage(data.totalPages);
        console.log('pages from state', totalPage)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [categoryId, currentPage, searchQuery, sortOrder]);
  console.log(totalPage)
  const handleCategoryChange = (event) => {
    const selectedCategoryId = parseInt(event.target.value, 10);
    setCategoryId(selectedCategoryId === 0 ? null : selectedCategoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  return (
    <Flex direction="column" align="center" mt={4}>
  <Box mb={4}>
    <Input placeholder="Search" value={searchQuery} onChange={handleSearch} />
  </Box>
  <Flex mb={4}>
    <Select placeholder="All Categories" onChange={handleCategoryChange}>
      <option value={0}>All Categories</option>
      {categories.map((category) => (
        <option value={category.id} key={category.id}>
          {category.categoryName}
        </option>
      ))}
    </Select>
    <Button ml={2} onClick={toggleSortOrder}>
      Sort {sortOrder === 'desc' ? 'Descending' : 'Ascending'}
    </Button>
  </Flex>
  <Table variant="striped" colorScheme="teal">
    <Thead>
      <Tr>
        <Th>ID</Th>
        <Th>Name</Th>
        <Th>Price</Th>
        <Th>Category</Th>
        <Th>Image</Th>
        <Th>Status</Th>
      </Tr>
    </Thead>
    <Tbody>
  {products.map((product) => (
    <Tr key={product.id}>
      <Td>{product.id}</Td>
      <Td>{product.productName}</Td>
      <Td>{product.productPrice}</Td>
      <Td>{product.Category.categoryName}</Td>
      <Td>
        <Box width="100px" height="100px">
          <img
            src={`http://localhost:8000/${product.productImage}`}
            alt={product.productName}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
      </Td>
      <Td>{product.isActive ? 'Active' : 'Inactive'}</Td>
      <Td>
      <button
          onClick={() => { window.location.href = product.id.toString() }}
          style={{ fontSize: '12px', padding: '4px 8px', display: 'flex', alignItems: 'center' }}
        >
          <FaLink style={{ marginRight: '4px' }} />
        </button>
      </Td>
    </Tr>
  ))}
</Tbody>
  </Table>
  {totalPage > 1 && (
    <Flex mt={4} alignItems="center">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        colorScheme="teal"
        mr={2}
      >
        Previous
      </Button>
      {Array.from({ length: totalPage }, (_, index) => (
        <Button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          colorScheme={currentPage === index + 1 ? 'teal' : 'gray'}
          mr={2}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
        colorScheme="teal"
        ml={2}
      >
        Next
      </Button>
    </Flex>
  )}
</Flex>
  )
};

export default ProductTable;

