import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  Table,
  Container,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import AppNav from "./AppNav";

class Expenses extends Component {
  emptyItem = {
    id: "103",
    expensedate: new Date(),
    description: "",
    location: "",
    category: [1, "Travel"],
  };

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      isLoading: true,
      Expenses: [],
      Categories: [],
      item: this.emptyItem,
    };

    this.handleSubmit = this.handleSubmit.bind();
    this.handleChange = this.handleChange.bind();
    this.handleDateChange = this.handleDateChange.bind();
  }

  async handleSubmit(event) {
    const item = this.state.item;

    await fetch(`/api/expenses`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    event.preventDefault();
    this.props.history.push("/expenses");
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
    console.log(item);
  }

  handleDateChange(date) {
    let item = { ...this.state.item };
    item.expensedate = date;
    this.setState({ item });
  }

  async remove(id) {
    await fetch(`/api/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedExpenses = [...this.state.Expenses].filter((i) => i.id !== id);
      this.setState({ Expenses: updatedExpenses });
    });
  }

  async componentDidMount() {
    const response = await fetch("/api/categories");
    const body = await response.json();
    this.setState({ Categories: body, isLoading: false });

    const responseExp = await fetch("/api/expenses");
    const bodyExp = await responseExp.json();
    this.setState({ Expenses: bodyExp, isLoading: false });
  }

  render() {
    const title = <h3>Add Expense</h3>;
    const { Categories } = this.state;
    const { Expenses, isLoading } = this.state;

    if (isLoading) return <div>Loading......</div>;

    let optionList = Categories.map((category) => (
      <option id={category.id}>{category.name}</option>
    ));

    let rows = Expenses.map((expense) => (
      <tr key={expense.id}>
        <td>{expense.description}</td>
        <td>{expense.location}</td>
        <td>
          <Moment date={expense.expensedate} format="DD/MM/YYYY" />
        </td>
        <td>{expense.category.name}</td>
        <td>
          <Button
            size="sm"
            color="danger"
            onClick={() => this.remove(expense.id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));

    return (
      <div>
        <AppNav></AppNav>
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                onChange={this.handleChange}
                autoComplete="name"
              ></Input>
            </FormGroup>

            <FormGroup>
              <Label for="category">Category</Label>
              <select>{optionList}</select>
              <Input
                type="text"
                name="category"
                id="category"
                onChange={this.handleChange}
              ></Input>
            </FormGroup>

            <FormGroup>
              <Label for="city">Date</Label>
              <DatePicker
                selected={this.state.item.expensedate}
                onChange={this.handleDateChange}
              />
            </FormGroup>

            <div className="row">
              <FormGroup className="col-md-4 mb-3">
                <Label for="location">Location</Label>
                <Input type="text" name="location" id="location"></Input>
              </FormGroup>
            </div>

            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>{" "}
        <Container>
          <h3>Expense List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="30%">Description</th>
                <th width="10%">Location</th>
                <th> Date</th>
                <th> Category</th>
                <th width="10%">Action</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Expenses;
