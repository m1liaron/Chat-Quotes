import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { AppPath } from "./common/app/AppPath";
import { MainPage, RegisterPage, LoginPage } from "./pages/pages";
import { ProtectedRoute } from "./navigation/ProtectedRoute/ProtectedRoute";

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path={AppPath.Root} element={
          <ProtectedRoute>
            <MainPage/>
          </ProtectedRoute>
        } />
        <Route path={AppPath.Register} element={<RegisterPage/>} />
        <Route path={AppPath.Login} element={<LoginPage/>} />
      </Routes>
    </Router>
  )
}

export default App
