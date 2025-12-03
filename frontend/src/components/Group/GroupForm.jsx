import { useEffect } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { groupsAPI } from "../../urls/routing";

export default function GroupForm() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    async function loadGroup() {
        try {
            const res = await groupsAPI.getById(id);
            form.setFieldsValue({
                name: res.data.name,
                description: res.data.description,
            });
        } catch (error) {
            console.error("Error loading group:", error);
            message.error("Failed to load group");
        }
    }

    useEffect(() => {
        if (id) loadGroup();
    }, [id, form]);

    async function onFinish(values) {
        try {
            if (id) {
                await groupsAPI.update(id, values);
                message.success("Group updated successfully");
            } else {
                await groupsAPI.create(values);
                message.success("Group created successfully");
            }
            navigate("/groups");
        } catch (error) {
            console.error("Error saving group:", error);
            message.error("Failed to save group");
        }
    }

    return (
        <Card title={id ? "Edit Group" : "Add Group"} style={{ width: 400 }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: "Please enter group name" }]}
                >
                    <Input placeholder="Enter group name" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: "Please enter description" }]}
                >
                    <Input.TextArea placeholder="Enter group description" rows={4} />
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
