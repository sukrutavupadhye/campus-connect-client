import React, { createContext, useState } from "react";
import { config } from "../../Config/configure";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
export const AdminContext = createContext();

export default function Context({ children }) {
  const { host } = config;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [report, setReport] = useState(null);
  const [state, setState] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [students, setStudents] = useState([]);
  const getProfile = async () => {
    let token = JSON.parse(localStorage.getItem("adminToken"));
    axios
      .get(`${host}/admin/getProfile`, { headers: { "auth-token": token } })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          setAdmin(res.data.admin);
        } else {
          setAdmin(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateProfile = async (data) => {
    let token = JSON.parse(localStorage.getItem("adminToken"));
    axios
      .put(`${host}/admin/updateProfile`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          getProfile();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("adminToken") == null) {
      setAdmin(null);
      navigate("/admin");
    } else {
      getProfile();
    }
  }, [pathname]);

  const Register = async (data) => {
    // let token = JSON.parse(localStorage.getItem('adminToken'))
    axios
      .post(`${host}/admin/Register`, data)
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          navigate("/admin/");
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const adminLogin = async (data) => {
    // let token = JSON.parse(localStorage.getItem('adminToken'))
    axios
      .post(`${host}/admin/Login`, data)
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          localStorage.setItem("adminToken", JSON.stringify(res.data.token));
          navigate("/admin/dashboard");
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllColleges = async () => {
    let token = JSON.parse(localStorage.getItem("adminToken"));
    axios
      .get(`${host}/admin/getAllColleges`, { headers: { "auth-token": token } })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          setColleges(res.data.colleges);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllStudents = async () => {
    let token = JSON.parse(localStorage.getItem("adminToken"));
    axios
      .get(`${host}/admin/getAllStudents`, { headers: { "auth-token": token } })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          setStudents(res.data.students);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getReport = async () => {
    let token = JSON.parse(localStorage.getItem("adminToken"));
    axios
      .get(`${host}/admin/getReport`, { headers: { "auth-token": token } })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          setReport({
            students: res.data.students,
            totalStudent: res.data.totalStudent,
            colleges: res.data.colleges,
            totalColleges: res.data.totalColleges,
          });
        } else {
          setReport(null);
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCollegeStatus = async (id, data) => {
    let token = JSON.parse(localStorage.getItem("adminToken"));
    axios
      .put(`${host}/admin/updateCollegeStatus/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          toast.success(res.data.message);
          getAllColleges();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateStudentStatus = async (id, data) => {
    let token = JSON.parse(localStorage.getItem("adminToken"));
    axios
      .put(`${host}/admin/updateStudentStatus/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          toast.success(res.data.message);
          getAllStudents();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
    toast.error("Logged out successfully!");
  };
  return (
    <AdminContext.Provider
      value={{
        host,
        pathname,
        navigate,
        admin,
        adminLogout,
        adminLogin,
        getAllColleges,
        getAllStudents,
        updateCollegeStatus,
        updateStudentStatus,
        colleges,
        students,
        getReport,
        report,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
