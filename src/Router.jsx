import React, { useEffect, useState } from "react";
import { Row, Spin } from "antd";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// Pages
import { IndexPage } from "./Pages/Index.page";
import { DashboardPage } from "./Pages/Dashboard.page";
import { MembersPage } from "./Pages/Members.page";
import { FormManagerPage } from "./Pages/FormManager.page";
import { LinuxForm } from "./Pages/forms/LinuxForm";

import { axios } from "../src/core/axios";

const routes = [
  {
    path: "/",
    exact: true,
    Component: IndexPage,
    requireUnauth: true,
    fallback: "/admin",
  },
  {
    path: "/admin",
    exact: true,
    Component: DashboardPage,
    requireAuth: true,
  },
  {
    path: "/members",
    exact: true,
    Component: MembersPage,
    requireAuth: true,
  },
  {
    path: "/form_manager",
    exact: true,
    Component: FormManagerPage,
    requireAuth: true,
  },
  {
    path: "/register/linux",
    exact: true,
    Component: LinuxForm,
    requireAuth: false,
  },
];

const renderRoute = (
  { Component, path, exact, requireAuth, requireUnauth, isAuth, fallback },
  key
) => {
  // console.log(path, requireAuth, requireUnauth, isAuth);
  let ChildComponent = Component;
  if (requireUnauth && isAuth)
    ChildComponent = () => <Redirect key={key} to={fallback || "/admin"} />;
  if (requireAuth && !isAuth)
    ChildComponent = () => <Redirect key={key} to={fallback || "/"} />;

  return (
    <Route path={path} exact={exact} key={key}>
      <ChildComponent />
    </Route>
  );
};

export const RouteManager = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const fn = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/auth/check", {});
        setIsAuth(data.success);
      } catch (error) {
        setIsAuth(false);
        console.error(error);
      }
      // setTimeout(() => {
      setLoading(false);
      // }, 150);
    };
    fn();
  }, [location]);

  // if (loading)
  //   return (
  //     <Row className="indexPage_body" justify="center" align="middle">
  //       <Spin />
  //     </Row>
  //   );

  return (
    // <TransitionGroup>
    //   <CSSTransition key={location.key} timeout={300} classNames="page">
    <Switch>
      {routes.map((r, i) => renderRoute({ ...r, isAuth, loading }, i))}
    </Switch>
    //   </CSSTransition>
    // </TransitionGroup>
  );
};
