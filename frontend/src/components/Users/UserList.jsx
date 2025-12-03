import { useEffect, useState } from "react";
import { Table, Button, Space, message } from "antd";
import { useNavigate } from "react-router-dom";
import { usersAPI } from "../../urls/routing";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    async function loadUsers() {
        try {
            const res = await usersAPI.getAll();
            setUsers(res.data);
        } catch (error) {
            console.error("Error loading users:", error);
            message.error("Failed to load users");
        }
    }

    async function deleteUser(id) {
        try {
            await usersAPI.delete(id);
            message.success("User deleted successfully");
            loadUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
            message.error("Failed to delete user");
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    const columns = [
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Created",
            dataIndex: "created_at",
            key: "created_at",
            render: (value) => new Date(value).toLocaleString(),
        },
        {
            title: "Group",
            dataIndex: "group",
            key: "group",
            render: (value) => value || "No group",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => navigate(`/edit/${record.id}`)}>
                        Edit
                    </Button>
                    <Button danger onClick={() => deleteUser(record.id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Table
                dataSource={users}
                columns={columns}
                rowKey="id"
                pagination={false}
            />

            <br />

            <Button type="primary" onClick={() => navigate("/add")}>
                Add User
            </Button>
        </div>
    );
}
