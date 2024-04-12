import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import { addProduct } from "../../../../Client/Requests/ProductRequests";
import AuthContext from "../../../../Contexts/AuthContext";
import { SIZE_CHOICES } from "./AddProductComponents";
import { useNavigate } from "react-router-dom";

const AddProductForm = styled.form`
  max-width: 450px;
  margin: 0 auto;

  margin-top: 50px;
  padding-top: 2rem;
  padding-bottom: 5rem;
  border-radius: 5px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;
const ClickForm = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center; /* Center items vertically */
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease-in-out;
  &:focus {
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease-in-out;
  &:focus {
    border-color: #007bff;
  }
`;
const Select = styled.select`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border-radius: 3px;
  border: 1px solid #ccc;
`;

const Option = styled.option`
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #0056b3;
  }
`;

const AddProductPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    vendor: user.id,
    subcategory: 0,
    description: "",
    price: "",
    quantity: "",
    image_url: "",
    size: "",
    is_featured: false,
    is_active: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await addProduct(formData);
      alert("Product added successfully!");
      navigate("/MyProducts");
      // Optionally, you can redirect the user to another page after successful submission
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <AddProductForm onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Title</Label>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Subcategory Id</Label>
        <Input
          type="number"
          name="subcategory"
          value={formData.subcategory}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Description</Label>
        <TextArea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Price</Label>
        <Input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Quantity</Label>
        <Input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Image URL</Label>
        <Input
          type="text"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Size</Label>
        <Select
          name="size"
          value={formData.size}
          onChange={handleChange}
          required
        >
          <Option value="">Select Size</Option>
          {SIZE_CHOICES.map(([value, label]) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      </FormGroup>
      <ClickForm>
        <Label>Featured</Label>
        <Input
          type="checkbox"
          name="is_featured"
          checked={formData.is_featured}
          onChange={() =>
            setFormData({ ...formData, is_featured: !formData.is_featured })
          }
        />
      </ClickForm>
      <ClickForm>
        <Label>Active</Label>
        <Input
          type="checkbox"
          name="is_active"
          checked={formData.is_active}
          onChange={() =>
            setFormData({ ...formData, is_active: !formData.is_active })
          }
        />
      </ClickForm>
      <Button type="submit">Add Product</Button>
    </AddProductForm>
  );
};

export default AddProductPage;
