import React, { createContext, useState } from "react";
import { config } from "../../Config/configure";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
export const CollegeContext = createContext();
export default function Context({ children }) {
  const { host } = config;
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [college, setCollege] = useState(null);
  const [state, setState] = useState(false);
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [singleEvent, setSingleEvent] = useState(null);
  const [competitions, setCompetitions] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [singleCompetition, setSingleCompetition] = useState(null);
  const [report, setReport] = useState(null);

  const getProfile = async () => {
    let token = JSON.parse(localStorage.getItem("collegeToken"));
    axios
      .get(`${host}/college/getProfile`, { headers: { "auth-token": token } })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          setCollege(res.data.college);
        } else {
          setCollege(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateProfile = async (data) => {
    let token = JSON.parse(localStorage.getItem("collegeToken"));
    axios
      .put(`${host}/college/updateProfile`, data, {
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
    if (
      localStorage.getItem("collegeToken") == null &&
      pathname !== "/college/register"
    ) {
      setCollege(null);
      navigate("/college");
    } else {
      getProfile();
    }
  }, [pathname]);

  const Register = async (data) => {
    // let token = JSON.parse(localStorage.getItem('collegeToken'))
    axios
      .post(`${host}/college/Register`, data)
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          navigate("/college/");
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Login = async (data) => {
    // let token = JSON.parse(localStorage.getItem('collegeToken'))
    axios
      .post(`${host}/college/Login`, data)
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          localStorage.setItem("collegeToken", JSON.stringify(res.data.token));
          navigate("/college/dashboard");
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const collegeLogout = () => {
    localStorage.removeItem("collegeToken");
    navigate("/college");
    toast.error("Logged out successfully!");
  };

  const getEvents = async () => {
    let token = JSON.parse(localStorage.getItem("collegeToken"));
    axios
      .get(`${host}/college/getEvents`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          setEvents(res.data.events);
        } else {
          // toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getBlogs = async () => {
    let token = JSON.parse(localStorage.getItem("collegeToken"));
    axios
      .get(`${host}/college/getBlogs`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          setBlogs(res.data.blogs);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getSingleEvent = async (id) => {
    let token = JSON.parse(localStorage.getItem("collegeToken"));
    axios
      .get(`${host}/college/getSingleEvent/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          setSingleEvent(res.data.event);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const createEvent = async (data) => {
    let token = JSON.parse(localStorage.getItem("collegeToken"));
    axios
      .post(`${host}/college/createEvent`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          getEvents();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const postBlog = async (data) => {
    let token = JSON.parse(localStorage.getItem("collegeToken"));
    axios
      .post(`${host}/college/postBlog`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          getBlogs();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateEvent = async (id, data) => {
    let token = JSON.parse(localStorage.getItem("collegeToken"));
    axios
      .put(`${host}/college/updateEvent/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          getEvents();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateBlog = async (id, data) => {
    let token = JSON.parse(localStorage.getItem("collegeToken"));
    axios
      .put(`${host}/college/updateBlog/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          getBlogs();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteBlog = async (id) => {
    let token = JSON.parse(localStorage.getItem("collegeToken"));
    axios
      .delete(`${host}/college/deleteBlog/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          getBlogs();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCompetitions = async (id) => {
    let token = JSON.parse(localStorage.getItem("collegeToken"));
    axios
      .get(`${host}/college/getCompetitions/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          setCompetitions(res.data.competitions);
        } else {
          // toast.error(res.data.message);
          setCompetitions(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getSingleCompetition = async (id) => {
    let token = JSON.parse(localStorage.getItem("collegeToken"));
    axios
      .get(`${host}/college/getSingleCompetition/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          setSingleCompetition(res.data.competition);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const createCompetition = async (data, event) => {
    let token = JSON.parse(localStorage.getItem("collegeToken"));
    axios
      .post(`${host}/college/createCompetition`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          getCompetitions(event);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateCompetition = async (id, data, event) => {
    let token = JSON.parse(localStorage.getItem("collegeToken"));
    axios
      .put(`${host}/college/updateCompetition/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          getCompetitions(event);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRegistrations = async () => {
    let token = JSON.parse(localStorage.getItem("collegeToken"));
    axios
      .get(`${host}/college/getRegistrations`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          setRegistrations(res.data.registrations);
        } else {
          toast.error(res.data.message);
          setRegistrations(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getReport = async () => {
    let token = JSON.parse(localStorage.getItem("collegeToken"));
    axios
      .get(`${host}/college/getReport`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          setReport({
            events: res.data.events,
            blogs: res.data.blogs,
            collegeRegistrations: res.data.collegeRegistrations,
            totalRevenue: res.data.totalRevenue,
            recentRegistrations: res.data.recentRegistrations,
            recentEvents: res.data.recentEvents,
          });
        } else {
          toast.error(res.data.message);
          setReport(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateRegistration = async (id, data) => {
    let token = JSON.parse(localStorage.getItem("collegeToken"));
    axios
      .put(`${host}/college/updateRegistration/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          getRegistrations();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <CollegeContext.Provider
      value={{
        host,
        pathname,
        navigate,
        getProfile,
        updateProfile,
        Register,
        Login,
        collegeLogout,
        college,
        getEvents,
        events,
        createEvent,
        updateEvent,
        getSingleEvent,
        singleEvent,
        createCompetition,
        updateCompetition,
        getCompetitions,
        getSingleCompetition,
        competitions,
        singleCompetition,
        getRegistrations,
        registrations,
        updateRegistration,
        postBlog,
        updateBlog,
        getBlogs,
        blogs,
        deleteBlog,
        getReport,
        report,
      }}
    >
      {children}
    </CollegeContext.Provider>
  );
}
