import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import StyledHeading from "./materialUİElements/headingMUİ";
import Header from "./components/header";
import Login from "./components/auth/login";
import SignUp from "./components/auth/signUp";
import Dashboard from "./components/dashboard";
import MaiBackdrop from "./components/backdrop";
import ProtectedRoute from "./components/auth/protectedRoute";
import "./App.css";

function App() {
  const [isDashboard, setisDashboard] = useState(false);
  /* console.count(); */
  useEffect(() => {
    const enforceMinSize = () => {
      console.log("resize")
      const minWidth = 1436;
      const minHeight = 566 ;

      if (window.innerWidth < minWidth) {
        window.resizeTo(minWidth, window.innerHeight);
      }

      if (window.innerHeight < minHeight) {
        window.resizeTo(window.innerWidth, minHeight);
      }
    };

    window.addEventListener('resize', enforceMinSize);

    // Clean up the event listener on component unmount
  });
  function LocationHandler() {
    const location = useLocation();
    useEffect(() => {
      console.log("LOC", location.pathname);
      setisDashboard(location.pathname === "/dashboard");
    }, [location]);
  
    return null; // This component only handles location changes, so it renders nothing
  }
  return (
    <div className="main_App">
      <Router>
       <LocationHandler/>
        {!isDashboard && (
          <Header Link={Link}  />
        )}
        <Routes>
          <Route path="/" element={<Login StyledHeading={StyledHeading} />} />
          <Route
            path="/signup"
            element={<SignUp StyledHeading={StyledHeading} />}
          />
          <Route path="/dashboard" element={ 
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>} />
        </Routes>
        <MaiBackdrop/>
      </Router>
      {!isDashboard && (
        <footer className="footer">
          <div className="container">
            <p>© 2024 SickCord. All rights reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
