import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Flex, Heading } from '@chakra-ui/react';
import axios from 'axios';
import { FaLink } from 'react-icons/fa';
import { IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCategories = async () => {
    try {
      const url = `http://localhost:8000/admin/cate?page=${currentPage}`;
      const response = await axios.get(url);
      const { data } = response.data;
      setTotalPages(data.totalPages);
      setCategories(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/admin/cate/${id}`);
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleAdd = () => {
    window.location.href = `http://localhost:3000/admin/category/add`;
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          colorScheme={currentPage === i ? 'teal' : 'gray'}
          mr={2}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <Flex direction="column" align="center" maxWidth="900px" margin="0 auto">
      <Heading as="h1" size="xl" mb={4}>
        Category
      </Heading>
      <Button ml="auto" mr={4} colorScheme="teal" onClick={handleAdd}>
        Add
      </Button>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map((category) => (
            <Tr key={category.id}>
              <Td>{category.id}</Td>
              <Td>{category.categoryName}</Td>
              <Td>
                <Flex alignItems="center">
                  <IconButton
                    icon={<FaLink />}
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => {
                      window.location.href = `http://localhost:3000/admin/category/${category.id}`;
                    }}
                    mr={2}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    variant="outline"
                    onClick={() => handleDelete(category.id)}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {totalPages > 1 && (
        <Flex mt={4} alignItems="center">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            colorScheme="teal"
            mr={2}
          >
            Previous
          </Button>
          {renderPaginationButtons()}
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            colorScheme="teal"
            ml={2}
          >
            Next
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default CategoryTable;
