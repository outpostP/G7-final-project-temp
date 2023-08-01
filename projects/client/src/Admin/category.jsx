// frontend/src/components/CategoryList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  useEffect(() => {
    // Fetch categories from the backend
    axios.get('/api/categories').then((response) => {
      setCategories(response.data);
    });
  }, []);

  const handleAddCategory = () => {
    // Send a request to create a new category
    axios.post('/api/categories', newCategory).then((response) => {
      setCategories([...categories, response.data]);
      setNewCategory({ name: '', description: '' });
    });
  };

  const handleEditCategory = (id, editedCategory) => {
    // Send a request to update an existing category
    axios.put(`/api/categories/${id}`, editedCategory).then((response) => {
      const updatedCategories = categories.map((category) =>
        category.id === response.data.id ? response.data : category
      );
      setCategories(updatedCategories);
    });
  };

  const handleDeleteCategory = (id) => {
    // Send a request to delete a category
    axios.delete(`/api/categories/${id}`).then(() => {
      const filteredCategories = categories.filter((category) => category.id !== id);
      setCategories(filteredCategories);
    });
  };

  return (
    <div>
      {/* Render the list of categories */}
      {categories.map((category) => (
        <div key={category.id}>
          <span>{category.name}</span>
          <span>{category.description}</span>
          <button onClick={() => handleEditCategory(category.id, { name: 'New Name', description: 'New Description' })}>
            Edit
          </button>
          <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
        </div>
      ))}

      {/* Form to add a new category */}
      <div>
        <input
          type="text"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          placeholder="Name"
        />
        <input
          type="text"
          value={newCategory.description}
          onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
          placeholder="Description"
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>
    </div>
  );
};

export default CategoryList;
