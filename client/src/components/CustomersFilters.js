import React from "react";
import styled from "styled-components";
import { CustomerConsumer } from "../context/context";

function CustomersFilters() {
  return (
    <CustomerConsumer>
      {(value) => {
        const {
          search,
          limit,
          sortBy,
          direction,
          page,
          sortOptions,
          directions,
          displayedDirection,
          handleChange,
          handleDirectionChange,
          handleQuery,
        } = value;
        return (
          <div className="row my-5">
            <div className="col-10 mx-auto">
              <FilterWrapper>
                <div className="filter-item-container">
                  <label htmlFor="search">search customers</label>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    onChange={handleChange}
                    value={search}
                    onKeyPress={(e) => {
                      if (!/[A-Za-z]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className="filter-item"
                  />
                </div>
                <div className="filter-item-container">
                  <label htmlFor="sortBy">Sort by</label>
                  <select
                    name="sortBy"
                    id="sortBy"
                    onChange={handleChange}
                    value={sortBy}
                    className="filter-item"
                  >
                    {sortOptions.map((sortBy, index) => {
                      return (
                        <option key={index} value={sortBy}>
                          {sortBy}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="filter-item-container">
                  <label htmlFor="direction">Direction</label>
                  <select
                    name="direction"
                    id="direction"
                    onChange={handleDirectionChange}
                    value={displayedDirection}
                    className="filter-item"
                  >
                    {directions.map((direction, index) => {
                      return (
                        <option key={index} value={direction}>
                          {direction}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="filter-item-container">
                  <label htmlFor="page">page number</label>
                  <input
                    type="number"
                    name="page"
                    id="page"
                    min="1"
                    onChange={handleChange}
                    value={page}
                    className="filter-item"
                  />
                </div>
                <div className="filter-item-container">
                  <label htmlFor="limit">Customers per page</label>
                  <input
                    type="number"
                    name="limit"
                    id="limit"
                    min="1"
                    onChange={handleChange}
                    value={limit}
                    className="filter-item"
                  />
                </div>

                <div className="filter-item-container">
                  <button
                    name="submit"
                    id="submit"
                    className="filter-submit"
                    onClick={handleQuery}
                  >
                    Apply filters
                  </button>
                </div>
              </FilterWrapper>
            </div>
          </div>
        );
      }}
    </CustomerConsumer>
  );
}

const FilterWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  label {
    font-weight: bold;
    text-transform: capitalize;
  }
  .filter-item,
  .filter-submit,
  .filter-limit {
    display: block;
    width: 100%;
    background: transparent;
    border-radius: 0.5rem;
    border: 2px solid #5f5e5e;
  }

  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .filter-item-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 75%;
    }

    .filter-item-container > button {
      padding: 5px;
      margin-top: 10px;
    }
  }

  @media (max-width: 500px) {
    flex-direction: column;

    .filter-item-container {
      width: calc(100% - 20px);
    }
  }
`;

export default CustomersFilters;
