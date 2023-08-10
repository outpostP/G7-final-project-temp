import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryAdd = () => {
  const [category, setCategory] = useState("");
  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/admin/cate",
        { category },{ 
        headers: {
          "Authorization": `Bearer ${token}`
        },
    });
      toast.success(response.data.message);
      setCategory("");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <FormControl className="form-control">
          <FormLabel>Category</FormLabel>
          <Input
            type="text"
            name="category"
            value={category}
            onChange={handleCategoryChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" mt={4}>
          Add Category
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CategoryAdd;
