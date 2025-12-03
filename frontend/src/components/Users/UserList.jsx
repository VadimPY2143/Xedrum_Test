import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    async function loadUsers() {
        try {
            const res = await axios.get("http://localhost:8000/api/users/");
            setUsers(res.data);
        } catch (error) {
            console.error("Error loading users:", error);
        }
    }

    async function deleteUser(id) {
        try {
            await axios.delete(`http://localhost:8000/api/users/${id}/`);
            loadUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
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
