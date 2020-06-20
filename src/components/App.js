import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import AdminPage from "./Admin";
import UserPage from "./User";

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/user" component={UserPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
