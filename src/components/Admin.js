import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import Passanger from "./passanger/PassangerComponent";
import AncillaryMaintanence from "./ancillarymaintanence/AncillaryMaintanenceComponent";
import ManagePassanger from "./passanger/ManagePassanger";
import ManageAncillary from "./ancillarymaintanence/ManageAncillary";
import ManageFlight from "./flight/ManageFlight";

const AdminPage = (...props) => {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route
          exact
          path={`${props[0].match.path}/passangers`}
          component={Passanger}
        />
        <Route
          path={`${props[0].match.path}/passanger/:id`}
          component={ManagePassanger}
        />
        <Route
          path={`${props[0].match.path}/passanger`}
          component={ManagePassanger}
        />
        <Route
          path={`${props[0].match.path}/ancillarymaintanence`}
          component={AncillaryMaintanence}
        />
        <Route
          path={`${props[0].match.path}/ancillaryItem/:id`}
          component={ManageAncillary}
        />
        <Route
          path={`${props[0].match.path}/ancillaryItem`}
          component={ManageAncillary}
        />
        <Route
          path={`${props[0].match.path}/manageFlight/:id`}
          component={ManageFlight}
        />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default AdminPage;
