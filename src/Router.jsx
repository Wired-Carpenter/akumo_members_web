import React from "react";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Pages
import { IndexPage } from "./Pages/Index.page";
import { DashboardPage } from "./Pages/Dashboard.page";
import { MembersPage } from "./Pages/Members.page";
import { FormManagerPage } from "./Pages/FormManager.page";

const routes = [
  {
    path: "/",
    exact: true,
    Component: IndexPage,
  },
  {
    path: "/admin",
    exact: true,
    Component: DashboardPage,
  },
  {
    path: "/members",
    exact: true,
    Component: MembersPage,
  },
  {
    path: "/form_manager",
    exact: true,
    Component: FormManagerPage,
  },
];

const renderRoute = ({ Component, path, exact }, key) => (
  <Route path={path} exact={exact} key={key}>
    <Component />
  </Route>
);

export const RouteManager = () => (
  <BrowserRouter>
    <Switch>{routes.map((r, i) => renderRoute(r, i))}</Switch>
  </BrowserRouter>
);
