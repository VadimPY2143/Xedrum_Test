import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Space, message } from "antd";
import { useNavigate } from "react-router-dom";

export default function GroupList() {
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();

    async function loadGroups() {
        try {
            const res = await axios.get("http://localhost:8000/api/groups/");
            setGroups(res.data);
        } catch (error) {
            console.error("Error loading groups:", error);
            message.error("Failed to load groups");
        }
    }

    async function deleteGroup(id) {
        try {
            await axios.delete(`http://localhost:8000/api/groups/${id}/`);
            message.success("Group deleted successfully");
            loadGroups();
        } catch (error) {
            if (error.response?.status === 403) {
                message.error(error.response.data.error || "Cannot delete this group");
            } else {
                console.error("Error deleting group:", error);
                message.error("Failed to delete group");
            }
        }
    }

    useEffect(() => {
        loadGroups();
    }, []);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => navigate(`/groups/edit/${record.id}`)}>
                        Edit
                    </Button>
                    <Button
                        danger
                        onClick={() => {
                            if (window.confirm("Are you sure you want to delete this group?")) {
                                deleteGroup(record.id);
                            }
                        }}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Table
                dataSource={groups}
                columns={columns}
                rowKey="id"
                pagination={false}
            />

            <br />

            <Button type="primary" onClick={() => navigate("/groups/add")}>
                Add Group
            </Button>
        </div>
    );
}
