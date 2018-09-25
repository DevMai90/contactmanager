import React, { Component } from "react";
import { Consumer } from "../../context";
// No need for curly braces if we're importing as default
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    // Use destructuring to take id from props.
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    // This gets us the single user. Will return us an object with the contact info
    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

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

    // Destructure id
    const { id } = this.props.match.params;

    // Updated contact object. This is the object that we want to send to the server and the id as well.
    const updContact = {
      name,
      email,
      phone
    };

    // Make put request to update. Takes second parameter which is the updated info. When we use json.placeholder. It sends back the user with the updated data and id.
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );

    // Dispatch our action and payload which is the res.data.
    dispatch({ type: "UPDATE_CONTACT", payload: res.data });

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
                <div className="card-header">Edit Contact</div>
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
                      value="Update Contact"
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

export default EditContact;
