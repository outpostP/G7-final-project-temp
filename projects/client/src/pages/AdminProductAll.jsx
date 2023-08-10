import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Select, Input, Flex, Box } from '@chakra-ui/react';
import axios from 'axios';
import { FaLink, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortField, setSortField] = useState('productName');
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const fetchCategories = async () => {
    const response = await axios.get('http://localhost:8000/gen/cateall');
    setCategories(response.data.data);
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);


  
  const fetchProduct = async () => {
    try{
      const response = await axios.get('http://localhost:8000/admin/productA', { 
        headers: {
          "Authorization": `Bearer ${token}`
        },
    });
      const { data } = response.data;
      setProducts(data.products);
    }
    catch (err) {
      console.log(err);
    }
  }
  
  useEffect(() => {
    fetchProduct()
  },[])

  const handleSortFieldChange = (newSortField) => {
    setSortField(newSortField);
    fetchData();
  };

  const fetchData = async () => {
    try {
      let url = `http://localhost:8000/admin/productA?field=${sortField}&sort=${sortOrder}&productName=${searchQuery}&page=${currentPage}`;

      if (categoryId) {
        url += `&id_category=${categoryId}`;
      }

      const response = await axios.get(url,{ 
        headers: {
          "Authorization": `Bearer ${token}`
        },
    });
      const { data } = response.data;
      setProducts(data.products);
      setTotalPage(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(products);
  }, [categoryId, currentPage, searchQuery, sortOrder, sortField]);

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
    <>
       <Flex direction="row" align="center" mt={4}>
        <Box mr={4}>
          <Input placeholder="Search" value={searchQuery} onChange={handleSearch} />
        </Box>
        <Box mr={4}>
          <Select placeholder="All Categories" onChange={handleCategoryChange}>
            <option value={0}>All Categories</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.categoryName}
              </option>
            ))}
          </Select>
        </Box>
        <Button onClick={toggleSortOrder}>
          {sortOrder === 'desc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
        </Button>
        <Button onClick={() => handleSortFieldChange('productName')}>Sort by Name</Button>
        <Button onClick={() => handleSortFieldChange('productPrice')}>Sort by Price</Button>
        <Flex ml="auto" alignItems="center">
          <Button
            onClick={() => {
             navigate('/add') ;
            }}
            colorScheme="teal"
          >
            Add
          </Button>
        </Flex>
      </Flex>

      <Box overflowX="auto" mt={4}>
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
                <Td> {product.Category && product.Category.isActive
          ? product.Category.categoryName
          : 'none'}</Td>
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
                    onClick={() => {
                      window.location.href = `http://localhost:3000/admin/products/${product.id}`;
                    }}
                    style={{ fontSize: '12px', padding: '4px 8px', display: 'flex', alignItems: 'center' }}
                  >
                    <FaLink style={{ marginRight: '4px' }} />
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {totalPage > 1 && (
        <Flex mt={4} justifyContent="center">
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
              colorScheme={currentPage === index ? "teal"
              : "gray"}
              variant={currentPage === index + 1 ? "solid" : "outline"}
              mx={1}
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
    </>
  );
};

export default ProductTable;
