import React from "react";
import { Route, Redirect } from "react-router-dom";
import SessionStorageService from "../services/Storage";
export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const token = SessionStorageService.getToken();

  if (isPrivate && !token) {
    return <Redirect to="/" />;
  }

  if (!isPrivate && token) {
    const role = SessionStorageService.getItem("role");
    if (role === "employee") {
      return <Redirect to="/portal" path="/portal" />;
    } else {
      if (role === "admin") {
        return <Redirect to="/admin" path="/admin" />;
      } else {
        return <Redirect to="/app" path="/app" />;
      }
    }
  }

  return <Route {...rest} component={Component} />;
}
