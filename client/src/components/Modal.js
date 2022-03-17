import React from "react";
import { CustomerConsumer } from "../context/context";
import styled from "styled-components";

const Modal = () => {
  return (
    <CustomerConsumer>
      {(value) => {
        const {
          pictureModalOpen,
          handlePictureModal,
          showDetails,
          customer,
        } = value;
        return (
          <>
            {pictureModalOpen ? (
              <ModalWrapper>
                <button
                  onClick={handlePictureModal}
                  class="modal-overlay"
                  id="modal-overlay"
                ></button>

                <div class="modal" id="modal">
                  <img
                    src="https://images.pexels.com/photos/9803842/pexels-photo-9803842.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    alt="Avatar"
                    style={{ width: "50%" }}
                  />
                  {showDetails ? (
                    <div className="container">
                      <p> phone: {customer.phone}</p>
                      <p> city: {customer.address.city}</p>
                      <p>website: {customer.website}</p>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </ModalWrapper>
            ) : null}
          </>
        );
      }}
    </CustomerConsumer>
  );
};

const ModalWrapper = styled.div`
  .modal {
    display: block;
    width: 600px;
    box-sizing: border-box;
    max-width: 100%;
    height: 600px;
    max-height: 100%;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 100;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    box-shadow: 0 0 60px 10px rgba(0, 0, 0, 0.9);
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 50;

    background: rgba(0, 0, 0, 0.6);
  }
  .modal-guts {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 20px 50px 20px 20px;
  }
`;

export default Modal;
