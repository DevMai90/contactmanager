import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import axios from "axios";
import { Link } from "react-router-dom";

class Contacts extends Component {
  state = {
    showContactInfo: false
  };

  // When using arrow function. Put async in front of the arguments
  onDeleteClick = async (id, dispatch) => {
    // Don't need to assign it to a variable because we're not getting anything back. It'll be an empty object since we're deleting it
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      // Wait until it's done. Then call dispatch to delete.
      dispatch({ type: "DELETE_CONTACT", payload: id });
      // Makes request first. Then handles dispatch
    } catch (e) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
    // We are sending this payload to the reducer.
  };
  render() {
    const { id, name, email, phone } = this.props.contact;
    // Use destructing to pull out the state.
    // Pull showContactInfo value from this.state
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{" "}
                <i
                  className="fas fa-sort-down"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    this.setState({
                      showContactInfo: !this.state.showContactInfo
                    })
                  }
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                  // onDeleteClick was not in Consumer or state. So we have to bind this and add arguments
                />
                <Link to={`/contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "black",
                      marginRight: "1rem"
                    }}
                  />
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contacts.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contacts;
