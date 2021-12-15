import React from "react";
import {
  Redirect,
  Route,
  HashRouter,
  Switch
} from 'react-router-dom';
import { CContainer, CFade } from '@coreui/react';
import routes from "../../routes"
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
const TheHome = () => {
  return (
    <div>
    <main className="c-main">
      <CContainer fluid>
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (                    
                    <CFade>
                      <route.component {...props} />
                    </CFade>              
                  )}/>
              )
            })}
            <Redirect from="/" to="/TheContent" />
          </Switch>
        </React.Suspense>
        </HashRouter>
      </CContainer>
    </main>
    </div>
  )
}

export default React.memo(TheHome)