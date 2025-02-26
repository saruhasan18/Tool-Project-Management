// HomePage.js
import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Card,
  Button,
  Typography,
  Tag,
  message,
} from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Layout from "./../components/Layout/Layout";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editable, setEditable] = useState(null);

  const navigate = useNavigate();

  // Load projects from local storage on component mount
  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(storedProjects);
  }, []);

  // Save projects to local storage when projects state changes
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleSubmit = (values) => {
    const newProject = {
      ...values,
      id: editable ? editable.id : Date.now(),
      deadline: values.deadline.format("YYYY-MM-DD"),
    };

    if (editable) {
      const updatedProjects = projects.map((item) =>
        item.id === editable.id ? newProject : item
      );
      setProjects(updatedProjects);
      message.success("Project Updated Successfully");
    } else {
      setProjects([...projects, newProject]);
      message.success("Project Added Successfully");
    }

    setShowModal(false);
    setEditable(null);
  };

  return (
    <Layout>
      <div className="header">
        <Title level={2} className="title">
          Project Management
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="add-button"
          onClick={() => setShowModal(true)}
        >
          Add Project
        </Button>

        {/* New Button to Navigate to Analytics Page */}
        <Button
          type="default"
          className="analytics-button"
          onClick={() => navigate("/analytics", { state: { projects } })}
        >
          View Analytics
        </Button>
      </div>
      <div className="card-container">
        {projects.map((project) => (
          <Card
            key={project.id}
            hoverable
            className="project-card"
            title={
              <div className="card-header">
                <Title level={4}>{project.name}</Title>
                <EditOutlined
                  className="edit-icon"
                  onClick={() => {
                    setEditable({
                      ...project,
                      deadline: moment(project.deadline, "YYYY-MM-DD"),
                    });
                    setShowModal(true);
                  }}
                />
              </div>
            }
          >
            <Paragraph>{project.description}</Paragraph>
            <Tag color="blue">{project.status}</Tag>
            <Tag color="red">Priority: {project.priority}</Tag>
            <Tag color="green">Deadline: {project.deadline}</Tag>
          </Card>
        ))}
      </div>
      <Modal
        title={editable ? "Edit Project" : "Add Project"}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setEditable(null);
        }}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
          <Form.Item
            label="Project Name"
            name="name"
            rules={[{ required: true, message: "Please enter project name" }]}
          >
            <Input placeholder="Enter project name" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} placeholder="Enter project description" />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select placeholder="Select status">
              <Option value="Not Started">Not Started</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Priority"
            name="priority"
            rules={[{ required: true, message: "Please select priority" }]}
          >
            <Select placeholder="Select priority">
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Deadline"
            name="deadline"
            rules={[{ required: true, message: "Please select deadline" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <div className="modal-buttons">
            <Button onClick={() => setShowModal(false)} className="cancel-button">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="save-button">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
