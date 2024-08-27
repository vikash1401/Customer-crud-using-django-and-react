import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const CustomerForm = ({ currentCustomer, setShowForm }) => {
  const [customer, setCustomer] = useState({ name: '', age: '', email: '', phone: '', location: '' });

  useEffect(() => {
    if (currentCustomer) {
      setCustomer(currentCustomer);
    }
  }, [currentCustomer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (customer.id) {
      axios.put(`http://localhost:8000/api/customers/${customer.id}/`, customer)
        .then(() => setShowForm(false))
        .catch(error => console.error('Error updating data:', error));
    } else {
      axios.post('http://localhost:8000/api/customers/', customer)
        .then(() => setShowForm(false))
        .catch(error => console.error('Error adding data:', error));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={customer.name} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="formAge">
        <Form.Label>Age</Form.Label>
        <Form.Control type="number" name="age" value={customer.age} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" value={customer.email} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" name="phone" value={customer.phone} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="formLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control type="text" name="location" value={customer.location} onChange={handleChange} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        {customer.id ? 'Update' : 'Add'}
      </Button>
      <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
    </Form>
  );
};

export default CustomerForm;
