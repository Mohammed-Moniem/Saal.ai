import React from "react";
import styled from "styled-components";
import { CustomerConsumer } from "../context/context";

const CustomerCard = ({ customer }) => {
  return (
    <CustomerConsumer>
      {(value) => {
        const { handlePictureModal, setSingleCustomer } = value;
        return (
          <CardWrapper>
            <div className="card">
              <button onClick={handlePictureModal}>
                <img
                  src="https://images.pexels.com/photos/9803842/pexels-photo-9803842.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt="Avatar"
                  style={{ width: "50%" }}
                />
              </button>
              <div className="container">
                <h4>
                  <b>ID: {customer.id}</b>
                </h4>
                <h4>
                  <b>Name: {customer.name}</b>
                </h4>
                <p>Username: {customer.username}</p>
                <p> {customer.email}</p>
              </div>
              <a
                style={{ cursor: "pointer" }}
                onClick={() => setSingleCustomer(customer.id)}
              >
                More details...
              </a>
            </div>
          </CardWrapper>
        );
      }}
    </CustomerConsumer>
  );
};

const CardWrapper = styled.div`
  .card {
    flex: 1 0 21%;
    margin: 15px;
    width: 250px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    padding: 30px;
  }

  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .container {
    padding: 2px 16px;
  }

  @media (max-width: 800px) {
    .card {
      width: 400px;
    }
  }

  @media (max-width: 500px) {
    .card {
      width: 100%;
      margin: 10px 0;
    }
  }

  button {
    all: unset;
    cursor: pointer;
  }
`;

export default CustomerCard;
