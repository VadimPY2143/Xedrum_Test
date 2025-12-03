import { useEffect, useState } from "react";
import { Form, Input, Button, Select, Card, message } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UserForm() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [groups, setGroups] = useState([]);

    async function loadGroups() {
        try {
            const res = await axios.get("http://localhost:8000/api/groups/");
            setGroups(res.data);
        } catch (error) {
            console.error("Error loading groups:", error);
            message.error("Failed to load groups");
        }
    }

    async function loadUser() {
        try {
            const res = await axios.get(`http://localhost:8000/api/users/${id}/`);
            form.setFieldsValue({
                username: res.data.username,
                group: res.data.group,
            });
        } catch (error) {
            console.error("Error loading user:", error);
            message.error("Failed to load user");
        }
    }

    useEffect(() => {
        loadGroups();
        if (id) loadUser();
    }, [id, form]);

    async function onFinish(values) {
        try {
            if (id) {
                await axios.put(`http://localhost:8000/api/users/${id}/`, values);
                message.success("User updated successfully");
            } else {
                await axios.post("http://localhost:8000/api/users/", values);
                message.success("User created successfully");
            }
            navigate("/");
        } catch (error) {
            console.error("Error saving user:", error);
            message.error("Failed to save user");
        }
    }

    return (
        <Card title={id ? "Edit User" : "Add User"} style={{ width: 400 }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ group: "user" }}
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: "Please enter username" }]}
                >
                    <Input placeholder="Enter username" />
                </Form.Item>

                <Form.Item
                    name="group"
                    label="Group"
                >
                    <Select placeholder="Select a group" allowClear>
                        {groups.map((group) => (
                            <Select.Option key={group.id} value={group.id}>
                                {group.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}
