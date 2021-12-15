import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import TheLayout from "./pages/TheLayout";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
const Signin = React.lazy(() => import("./pages/Signin"));
function App() {
  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            exact
            path="/"
            component={Signin}
          />
          <Route
            path="/"
            component={TheLayout}
          />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
}
export default App;