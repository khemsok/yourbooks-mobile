import React from "react";

// Context
import { useAuth } from "../auth/context";

// Navigations
import AppNavigator from "./AppNavigator";
import AuthAppNavigator from "./AuthAppNavigator";

export default function Navigator() {
  const { user } = useAuth();

  return user ? <AppNavigator /> : <AuthAppNavigator />;
}
