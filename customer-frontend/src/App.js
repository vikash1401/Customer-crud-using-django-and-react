import React, { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Customer CRUD</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { setShowForm(true); setCurrentCustomer(null); }}>Add Customer</Nav.Link>
            <Nav.Link onClick={() => setShowForm(false)}>Show Customer</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        {showForm ? (
          <CustomerForm currentCustomer={currentCustomer} setShowForm={setShowForm} />
        ) : (
          <CustomerList setShowForm={setShowForm} setCurrentCustomer={setCurrentCustomer} />
        )}
      </Container>
    </div>
  );
};

export default App;
