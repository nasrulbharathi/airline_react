import React from "react";
import TextInput from "../common/TextInput";
import * as userApi from "../../api/userApi";
import PropTypes from "prop-types";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      errorMessage: "",
      isError: false,
    };
  }

  loginChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  submitLogin = (e) => {
    e.preventDefault();
    userApi
      .getUserByUsername(this.state.userName)
      .then((userDetails) => {
        if (userDetails.length > 0) {
          if (userDetails[0].password == this.state.password) {
            if (userDetails[0].role == "Admin") {
              this.props.history.push("/admin/passangers");
            } else {
              this.props.history.push("/user/passangerdetails");
            }
          } else {
            this.setState({ isError: true, errorMessage: "Invalid Password" });
          }
        } else {
          this.setState({ isError: true, errorMessage: "Invalid UserName" });
        }
      })
      .catch(() => {
        this.setState({ isError: true, errorMessage: "Server Error" });
      });
  };

  render() {
    return (
      <form onSubmit={this.submitLogin}>
        <h2>Login</h2>
        <TextInput
          name="userName"
          label="User Name"
          value={this.state.userName}
          onChange={this.loginChangeHandler}
          error={""}
        />

        <TextInput
          name="password"
          label="Password"
          type="password"
          value={this.state.password}
          onChange={this.loginChangeHandler}
          error={""}
        />

        <button className="btn btn-primary" type="submit">
          Login
        </button>

        {this.state.isError && (
          <div style={{ color: "red" }}>{this.state.errorMessage}</div>
        )}
      </form>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default LoginPage;
