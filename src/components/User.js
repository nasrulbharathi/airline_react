import React from "react";
import { Route, Switch } from "react-router-dom";
import UserPrimaryHeader from "./common/UserPrimaryHeader";
import PageNotFound from "./PageNotFound";
import PassangerDetails from "./passangerdetails/PassangerDetails";
import CheckInOut from "./passangerdetails/CheckInOut";
import InFlight from "./InFlight/InFlight";
import InFlightManagePassangerForm from "./InFlightPassangerDetails/InFlightManagePassangerForm";

const UserPage = (...props) => {
  return (
    <div className="container-fluid">
      <UserPrimaryHeader />
      <Switch>
        <Route
          exact
          path={`${props[0].match.path}/passangerdetails`}
          component={PassangerDetails}
        />
        <Route
          exact
          path={`${props[0].match.path}/passangerdetails/:id`}
          component={CheckInOut}
        />
        <Route path={`${props[0].match.path}/inflight`} component={InFlight} />
        <Route
          path={`${props[0].match.path}/inflightForm/:id`}
          component={InFlightManagePassangerForm}
        />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default UserPage;
