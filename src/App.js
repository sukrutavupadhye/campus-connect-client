import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRoutes from "./Layouts/Admin/AdminRoutes";
import CollegeRoutes from "./Layouts/College/CollegeRoutes";
import StudentRoutes from "./Layouts/Student/StudentRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/admin/*" element={<AdminRoutes />} />
          <Route exact path="/college/*" element={<CollegeRoutes />} />
          <Route exact path="/*" element={<StudentRoutes />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
