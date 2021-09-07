import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Create_user from "./pages/Create_user";
import Applyleave from "./pages/Leaves/Applyleave";
import TheLayout from "./pages/TheLayout";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
const Signin = React.lazy(() => import("./pages/Signin"));
  function App(){
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/"component = {Signin}/>
            <Route exact path="/Applyleave" component={Applyleave} />
            <Route exact path="/createuser" component={Create_user} />
          </Switch>
          <Route
              path="/Dashboard"
              component = {TheLayout}
            />
        </React.Suspense>
     </HashRouter> 
    );
  }
export default App;