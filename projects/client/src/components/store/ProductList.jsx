import axios from 'axios';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { SimpleGrid, Button, Select, Input, Flex, Box } from '@chakra-ui/react';

const ProductList = ({ setCartItems, setRefreshCart }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchCategories = async () => {
      const url = 'http://localhost:8000/gen/cateall';
      const response = await axios.get(url, { 
        headers: {
          "Authorization": `Bearer ${token}`
        },
    });
      setCategories(response.data.data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost:8000/cashier/product?productName=${searchQuery}&page=${currentPage}`;

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

    fetchData();
  }, [categoryId, currentPage, searchQuery]);

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

  const handleCartUpdate = async () => {
    try {
      const response = await axios.get('http://localhost:8000/cashier/cart/item', { 
        headers: {
          "Authorization": `Bearer ${token}`
        },
    });
      const updatedCartItems = response.data;
      setCartItems(updatedCartItems);
      setRefreshCart(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Flex direction={{ base: 'column', md: 'row' }} align="center" mt={4}>
        <Box mb={4}>
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
        </Box>
        <Flex mb={4}>
          <Select
            placeholder="All Categories"
            onChange={handleCategoryChange}
          >
            <option value={0}>All Categories</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.categoryName}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 10 }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onUpdateCartItems={handleCartUpdate}
            setCartItems={setCartItems}
          />
        ))}
      </SimpleGrid>
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
    </>
  );
};

export default ProductList;
