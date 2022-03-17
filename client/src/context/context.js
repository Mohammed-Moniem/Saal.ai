import React, { Component } from "react";
import axios from "axios";
const baseUrl = process.env.BASE_URL ? process.env.BASE_URL : "/api/customers";
const ProductContext = React.createContext();
class CustomerProvider extends Component {
  state = {
    pictureModalOpen: false,
    showDetails: false,
    min: 1,
    max: 10,
    search: "",
    sortBy: "",
    direction: "",
    Limit: "",
    page: "",
    displayedDirection: "",
    customers: [],
    sortOptions: ["", "name", "id", "username", "email"],
    directions: ["", "ascending", "descending"],
    filteredCustomers: [],
    customer: {},
    value: "",
  };

  componentDidMount() {
    const fetch = async () => {
      let cachedState = await axios.get(`${baseUrl}/get-cached-state`);
      console.log({ cached: cachedState });
      if (
        cachedState.data &&
        JSON.stringify(this.state) !== JSON.stringify(cachedState.data)
      ) {
        this.setState(cachedState.data);
      } else {
        let customers = await axios.get(baseUrl);

        this.setCustomers(customers.data.data);
      }
    };
    fetch();
  }

  componentDidUpdate(prevProps, prevState) {
    const cache = async () => {
      if (JSON.stringify(this.state) !== JSON.stringify(prevState)) {
        await axios.post(`${baseUrl}/cache-state`, {
          state: JSON.stringify(this.state),
        });
      }
    };
    cache();
  }

  setCustomers = (customers) => {
    this.setState({
      ...this.state,
      filteredCustomers: customers,
      customers,
    });
  };

  setSingleCustomer = (id) => {
    let customer = this.state.customers.find((customer) => customer.id === id);
    this.setState({
      customer,
      showDetails: true,
      pictureModalOpen: true,
    });
  };

  handleQuery = async () => {
    const { limit, sortBy, direction, page } = this.state;
    const queryResult = await axios.get(
      `${baseUrl}?page=${page}&limit=${limit}&direction=${direction}&sortBy=${sortBy}`
    );
    this.setState({
      customers: queryResult.data.data,
      filteredCustomers: queryResult.data.data,
    });
  };

  handlePictureModal = () => {
    this.setState({
      pictureModalOpen: !this.state.pictureModalOpen,
      showDetails: false,
    });
  };

  handleChange = ({ target }) => {
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState(
      {
        [name]: value,
      },
      this.searchData
    );
  };

  handleDirectionChange = ({ target }) => {
    let direction = target.value === "ascending" ? "1" : "-1";
    this.setState({
      direction,
      displayedDirection: target.value,
    });
  };

  searchData = () => {
    const { search, customers } = this.state;
    let tempCustomers = [...customers];
    if (search.length > 0) {
      tempCustomers = customers.filter((customer) => {
        let tempSearch = search.toLowerCase();
        let tempUsername = customer.username
          .toLowerCase()
          .slice(0, search.length);
        if (tempSearch === tempUsername) {
          return customer;
        }
      });
    }
    this.setState({
      filteredCustomers: tempCustomers,
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          setSingleCustomer: this.setSingleCustomer,
          handlePictureModal: this.handlePictureModal,
          searchData: this.searchData,
          handleDetailsModal: this.handleDetailsModal,
          handleChange: this.handleChange,
          handleDirectionChange: this.handleDirectionChange,
          handleQuery: this.handleQuery,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const CustomerConsumer = ProductContext.Consumer;

export { CustomerProvider, CustomerConsumer };
