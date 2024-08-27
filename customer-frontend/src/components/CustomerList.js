import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';

const CustomerList = ({ setShowForm, setCurrentCustomer }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/customers/')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/customers/${id}/`)
      .then(() => setCustomers(customers.filter(customer => customer.id !== id)))
      .catch(error => console.error('Error deleting data:', error));
  };

  const handleUpdate = (customer) => {
    setCurrentCustomer(customer);
    setShowForm(true);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Location</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(customer => (
          <tr key={customer.id}>
            <td>{customer.name}</td>
            <td>{customer.age}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td>{customer.location}</td>
            <td>
              <Button variant="warning" onClick={() => handleUpdate(customer)}>Update</Button>
              <Button variant="danger" onClick={() => handleDelete(customer.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CustomerList;
