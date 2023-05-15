import { useState } from "react";
import React from "react";
import classnames from "classnames";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import AdminDashboardUsers from "./AdminDashboardUsers";
import { Container } from "react-bootstrap";
import AdminDashboardSubjects from "./AdminDashboardSubjects";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <Container className="py-5">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Users
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Subjects
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <AdminDashboardUsers></AdminDashboardUsers>
        </TabPane>
        <TabPane tabId="2">
          <AdminDashboardSubjects></AdminDashboardSubjects>
        </TabPane>
      </TabContent>
    </Container>
  );
};
export default AdminDashboard;
