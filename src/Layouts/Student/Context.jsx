import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { config } from "../../Config/configure";
import { toast } from "react-toastify";
import axios from "axios";

export const StudentContext = createContext();
export default function Context({ children }) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { host } = config;
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeNavOption, setActiveNavOption] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [singleBlogData, setSingleBlogData] = useState(null);
  const [competitions, setCompetitions] = useState([]);
  const [singleEvent, setSingleEvent] = useState(null);
  const [singleCompetition, setSingleCompetition] = useState(null);
  const [list, setList] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const getProfile = async () => {
    let token = JSON.parse(localStorage.getItem("studentToken"));
    axios
      .get(`${host}/student/getProfile`, { headers: { "auth-token": token } })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          setStudent(res.data.student);
        } else {
          setStudent(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateProfile = async (data) => {
    let token = JSON.parse(localStorage.getItem("studentToken"));
    axios
      .put(`${host}/student/updateProfile`, data, {
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
    setActiveNavOption(pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
    // if (pathname == `/registration-form` && student == null) {
    //   toast.warning("Login to explore more!");
    //   setTimeout(() => {
    //     navigate("/login");
    //   }, 1000);
    // }
    if (localStorage.getItem("studentToken") == null) {
      setStudent(null);
    } else {
      getProfile();
      getStudentList();
      getStudentRegistrations();
    }
  }, [pathname]);
  const studentRegister = async (data) => {
    // let token = JSON.parse(localStorage.getItem('studentToken'))
    axios
      .post(`${host}/student/Register`, data)
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          navigate("/login");
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const studentLogin = async (data) => {
    // let token = JSON.parse(localStorage.getItem('studentToken'))
    axios
      .post(`${host}/student/Login`, data)
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          localStorage.setItem("studentToken", JSON.stringify(res.data.token));
          navigate("/");
          toast.success(res.data.message);
          getProfile();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const studentLogout = () => {
    localStorage.removeItem("studentToken");
    setStudent(null);
    toast.error("Logged out successfully!");
    navigate("/login");
  };
  const viewEvents = async () => {
    axios
      .get(`${host}/student/viewEvents`)
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          setEvents(res.data.events);
        } else {
          setEvents([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const viewColleges = async () => {
    axios
      .get(`${host}/student/viewColleges`)
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          setColleges(res.data.colleges);
        } else {
          setColleges([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const viewAllBlogs = async () => {
    axios
      .get(`${host}/student/viewAllBlogs`)
      .then((res) => {
        if (res.data.success) {
          setBlogs(res.data.blogs);
        } else {
          setBlogs([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const singleBlog = async (id) => {
    let token = JSON.parse(localStorage.getItem("studentToken"));
    axios
      .get(`${host}/student/singleBlog/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setSingleBlogData(res.data.singleBlog);
          setOtherBlogs(res.data.otherBlogs);
        } else {
          toast.warning(res.data.message);
          setSingleBlogData(null);
          setOtherBlogs([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const viewSingleEventDetails = async (id) => {
    let token = JSON.parse(localStorage.getItem("studentToken"));
    axios
      .get(`${host}/student/viewSingleEventDetails/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setSingleEvent(res.data.event);
          setCompetitions(res.data.competitions);
          setList(res.data.list);
        } else {
          setEvents([]);
          toast.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const viewSingleCompetitionDetails = async (id) => {
    let token = JSON.parse(localStorage.getItem("studentToken"));
    axios
      .get(`${host}/student/viewSingleCompetitionDetails/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setSingleCompetition(res.data.competition);
        } else {
          setEvents([]);
          toast.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStudentList = async () => {
    let token = JSON.parse(localStorage.getItem("studentToken"));
    axios
      .get(`${host}/student/getStudentList`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setList(res.data.list);
        } else {
          setList([]);
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addIntoList = async (id, eventId) => {
    let token = JSON.parse(localStorage.getItem("studentToken"));
    axios
      .post(
        `${host}/student/addIntoList/${id}`,
        {},
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        if (res.data.success) {
          viewSingleEventDetails(eventId);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const registerForEvent = async (data) => {
    let token = JSON.parse(localStorage.getItem("studentToken"));
    axios
      .post(`${host}/student/registerForEvent`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          getStudentList();
          navigate("/bookings");
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromList = async (id, eventId) => {
    let token = JSON.parse(localStorage.getItem("studentToken"));
    axios
      .delete(
        `${host}/student/removeFromList/${id}`,
        // {},
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        if (res.data.success) {
          if (eventId) {
            viewSingleEventDetails(eventId);
          } else {
            getStudentList();
          }
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStudentRegistrations = async () => {
    let token = JSON.parse(localStorage.getItem("studentToken"));
    axios
      .get(`${host}/student/getStudentRegistrations`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setRegisteredEvents(res.data.registrations);
        } else {
          setRegisteredEvents([]);
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateRegistration = async (id, data) => {
    let token = JSON.parse(localStorage.getItem("studentToken"));
    axios
      .put(`${host}/student/updateRegistration/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          getStudentRegistrations();
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
    <StudentContext.Provider
      value={{
        host,
        pathname,
        navigate,
        activeNavOption,
        student,
        studentLogin,
        studentLogout,
        studentRegister,
        viewEvents,
        viewColleges,
        colleges,
        events,
        viewSingleEventDetails,
        list,
        singleEvent,
        competitions,
        addIntoList,
        removeFromList,
        getStudentList,
        viewSingleCompetitionDetails,
        singleCompetition,
        registerForEvent,
        getStudentRegistrations,
        registeredEvents,
        updateRegistration,
        viewAllBlogs,
        singleBlog,
        blogs,
        singleBlogData,
        otherBlogs,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}
