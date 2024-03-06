import { ClassList } from "./Components/ClassList";
import "./App.css";
import { List } from "./Components/List";
import AddClass from "./Components/addclass";
import { WithNavbar } from "./Components/withnavbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signin } from "./Components/signin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <WithNavbar>
              <ClassList />
            </WithNavbar>
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/list"
          element={
            <WithNavbar>
              <List />
            </WithNavbar>
          }
        />
        <Route
          path="/addclass"
          element={
            <WithNavbar>
              <AddClass />
            </WithNavbar>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
