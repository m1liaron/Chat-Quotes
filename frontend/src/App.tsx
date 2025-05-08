import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { AppPath } from "./common/app/AppPath";
import { MainPage, RegisterPage, LoginPage } from "./pages/pages";
import { ProtectedRoute } from "./navigation/ProtectedRoute/ProtectedRoute";
import { PublicRoute } from "./navigation/PublicRoute";

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path={AppPath.Root} element={
          <ProtectedRoute>
            <MainPage/>
          </ProtectedRoute>
        } />
        <Route path={AppPath.Register} element={
          <PublicRoute>
            <RegisterPage/>
          </PublicRoute>
        } />
        <Route path={AppPath.Login} element={
          <PublicRoute>
            <LoginPage/>
          </PublicRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
