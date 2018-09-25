import React, { Component } from "react";
import { Consumer } from "../../context";
// No need for curly braces if we're importing as default
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  // Mark as async
  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    // Check for errors
    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      // return so it can stop state
      return;
    }

    if (email === "") {
      this.setState({ errors: { email: "Name is required" } });
      return;
    }

    if (phone === "") {
      this.setState({ errors: { phone: "Name is required" } });
      return;
    }

    const newContact = {
      //ES6 syntax. If key value pair has the same name then we can shorthand it like this.
      name,
      email,
      phone
    };

    // Assign await to a variable.
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );

    // Waits for await to finish then use dispatch.
    dispatch({
      type: "ADD_CONTACT",
      payload: res.data
    });

    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });

    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div>
              <div className="card mb-3">
                <div className="card-header">Add Contact</div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                    <TextInputGroup
                      label="Name"
                      name="name"
                      placeholder="Enter Name..."
                      value={name}
                      onChange={this.onChange}
                      error={errors.name}
                    >
                      {/*Pass in props*/}
                    </TextInputGroup>
                    <TextInputGroup
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Enter email..."
                      value={email}
                      onChange={this.onChange}
                      error={errors.email}
                    />
                    <TextInputGroup
                      label="Phone"
                      name="phone"
                      placeholder="Enter phone..."
                      value={phone}
                      onChange={this.onChange}
                      error={errors.phone}
                    />
                    <input
                      type="submit"
                      value="Add Contact"
                      className="btn btn-light btn-block"
                    />
                  </form>
                </div>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
