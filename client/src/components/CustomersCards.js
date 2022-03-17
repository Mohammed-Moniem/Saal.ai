import React, { useState, useEffect } from "react";
import CustomerCard from "./CustomerCard";
import styled from "styled-components";
import { CustomerConsumer } from "../context/context";

const CustomersCards = () => {
  return (
    <CustomerConsumer>
      {(value) => {
        const { filteredCustomers } = value;
        return (
          <CardsWrapper>
            {filteredCustomers.length === 0 ? (
              <div className="col text-title text-center">
                {" "}
                Sorry no results were found!{" "}
              </div>
            ) : (
              <div className="flex-container">
                {filteredCustomers.map((customer) => (
                  <CustomerCard key={customer.id} customer={customer} />
                ))}
              </div>
            )}
          </CardsWrapper>
        );
      }}
    </CustomerConsumer>
  );
};

const CardsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  .flex-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    text-align: center;
    justify-content: center;
    font-size: 12px;
  }
  button {
    align-self: center;
  }
  @media (max-width: 800px) {
    .flex-container {
      flex-direction: column;
    }
  }
`;

export default CustomersCards;
