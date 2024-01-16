import { FormControl, Select, FormLabel, Input, Button } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductAdd = () => {
  const [formData, setFormData] = useState({});
  const fileInputRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("http://localhost:8000/admin/cate",{ 
        headers: {
          "Authorization": `Bearer ${token}`
        },
    });
    console.log(response)
      setCategories(response.data.data.category);
      console.log('res',response.data.data);
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
    if (categoryId) {
      formDataToSend.append("category", categoryId);
    }
    if (fileInputRef.current.files[0]) {
      formDataToSend.append("productImage", fileInputRef.current.files[0]);
    }

    try {
      console.log('formdata', formDataToSend)
      const response = await axios.post(
        "http://localhost:8000/admin/product",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          },
        }
      );

      // Handle response
      console.log('res',response);
      toast.success(response.data.message);

      // Reset the form
      setFormData({});
      fileInputRef.current.value = null;
    } catch (error) {
      // Handle error
      console.error('err',error);
      toast.error("An error occurred");
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
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <FormControl className="form-control">
          <FormLabel>Product Name</FormLabel>
          <Input
            type="text"
            name="productName"
            value={formData.productName || ""}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl className="form-control">
          <FormLabel>Product Price</FormLabel>
          <Input
            type="text"
            name="productPrice"
            value={formData.productPrice || ""}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl className="form-control">
          <FormLabel>Product Description</FormLabel>
          <Input
            type="text"
            name="productDescription"
            value={formData.productDescription || ""}
            onChange={handleChange}
          />
        </FormControl>
        <Select
          placeholder="All Categories"
          onChange={handleCategoryChange}
          name="categoryId"
          value={categoryId || ""}
        >
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.categoryName}
            </option>
          ))}
        </Select>
        <FormControl className="form-control">
          <FormLabel>Image</FormLabel>
          <Input type="file" name="productImage" ref={fileInputRef} />
        </FormControl>
        <Button type="submit" colorScheme="teal" mt={4}>
          Submit
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ProductAdd;
