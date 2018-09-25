import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

// We need a reducer. We will submit an action when we call it. action is an object and will have a type. type is what we are evaluating.
const reducer = (state, action) => {
  // reducer takes in state and action
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state, // Existing state
        // filter out contact that needs to be filtered out.
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
        // This is where we update the contacts state
        // payload is data that is sent along with action. Will have a type. In this case were sending id
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
        // payload is data that is sent along with action. Which in this case is the entire contact.
      };
    // Add update contact
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(
          contact =>
            contact.id === action.payload.id
              ? (contact = action.payload)
              : contact
        )
        // Update contacts by mapping over with a ternery operator. Finds a contact id that matches the payload id. Then it updates the entire contact.
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    dispatch: action => this.setState(state => reducer(state, action))
    // Need a way to call our action. use dispatch
  };

  // Mark as async
  async componentDidMount() {
    // Assign response to variable
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    // This is an aynchronous operation so we have to wait for it to finish. that's what await does. then it puts the result into the variable
    this.setState({ contacts: res.data });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
