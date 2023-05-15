import { Route, Routes } from "react-router-dom";
import "./App.css";
import RequireAuth from "./components/containers/RequireAuth.js";
import Dashboard from "./pages/dashboard";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/login";
import MyDashboard from "./pages/myDashboard";
import NoPage from "./pages/noPage";
import Subject from "./pages/subject";
import Unauthorized from "./pages/unauthorized";
//import AddUser from "./components/containers/AddUser";
import Event from "./pages/Event";
import Submitted from "./pages/Submitted";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ChangePassword } from "./pages/ChangePassword";
import About from "./pages/about";

import AddSubject from './components/containers/AddSubject'
import FileUpload from "./pages/FileUpload";
import Homework from "./pages/Homework";



const ROLES = {
  STUDENT: "STUDENT",
  ADMIN: "ADMIN",
  PROFESSOR: "PROFESSOR",
};

export default function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="changePassword/*" element={<ChangePassword />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="about" element={<About />} />

        {/* we want to protect these routes */}

        <Route element={<RequireAuth allowedRoles={[ROLES.STUDENT]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.STUDENT]} />}>
          <Route path="/homework/:eventId/:fileId" element={<Homework />} />
        </Route>

        <Route /*element={<RequireAuth allowedRoles={[ROLES.STUDENT]} />}*/>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route /*element={<RequireAuth allowedRoles={[]} />}*/>
          <Route path="/mydashboard" element={<MyDashboard />} />
        </Route>

        <Route
          element={<RequireAuth allowedRoles={[ROLES.STUDENT, ROLES.ADMIN, ROLES.PROFESSOR]} />}
        >
          <Route /*element={<RequireAuth allowedRoles={[ROLES.ROLE_STUDENT,ROLES.ROLE_ADMIN]} />}*/
          >
            <Route path="/subject/:id" element={<Subject />} />
          </Route>

          <Route>
            <Route path="/createEvent" element={<Event />} />
          </Route>

          <Route>
            <Route path="submitted" element={<Submitted />} />
          </Route>

          <Route>
            <Route path="/fileUpload" element={<FileUpload />} />
          </Route>
 


          {/*<Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
  </Route>*/}

        <Route path="*" element={<NoPage />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="/addSubject" element={<AddSubject />} />
        </Route>
      </Route>
    </Routes>
    </>
  );
}
