import React from "react";
import CustomersFilters from "../components/CustomersFilters";
import CustomersCards from "./../components/CustomersCards";
import styled from "styled-components";
import Modal from "../components/Modal";

const CustomersPage = () => {
  return (
    <CustomersPageWrapper>
      <CustomersFilters />
      <CustomersCards />
      <Modal />
    </CustomersPageWrapper>
  );
};

const CustomersPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default CustomersPage;
