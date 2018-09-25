import React, { Component } from "react";
// Whenever we work with forms, each input will be a piece of state. This means the state will be updated every time we type something.

class AddContact extends Component {
  // Why are we using brackets? It's to updated object property before the object property name (name, email, phone )is known. Allows us to have multile React inputs with different name attributes. allows us to use one onChange handler. It allows our function to get passed around before we know who is going to use it.
  // This is bracket notation to assign keys
  constructor(props) {
    super(props);

    this.nameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
  }
  onSubmit = e => {
    e.preventDefault();
    const contact = {
      name: this.nameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value
    };
    console.log(contact);
  };

  static defaultProps = {
    name: "Fred Smith",
    email: "fred@yahoo.com",
    phone: "777-777-777"
  };

  render() {
    const { name, email, phone } = this.props;
    return (
      <div>
        <div className="card mb-3">
          <div className="card-header">Add Contact</div>
          <div className="card-body">
            {/*In bootstrap, we wrap labels and inputs in a class called form-group
            form-control gives it some styling
            name attribute specifies the name of an input element. We will use this name to reference the input element later
            htmlFor refers to the content of the associated input element
            - We want the input value to be equal to state. The value and state will simultaneously be updated when we type with an event listener!*/}
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control form-control-lg"
                  placeholder="Enter Name..."
                  defaultValue={name}
                  ref={this.nameInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="Enter Email..."
                  defaultValue={email}
                  ref={this.emailInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control form-control-lg"
                  placeholder="Enter Phone..."
                  defaultValue={phone}
                  ref={this.phoneInput}
                />
              </div>
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
  }
}

export default AddContact;
