import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import UserList from "./UserList";
import UserForm from "./UserForm";
import GroupList from "./GroupList";
import GroupForm from "./GroupForm";

const { Header, Content } = Layout;

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Header style={{ color: "white", fontSize: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Test Task</span>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={["users"]}
                        style={{ flex: 1, justifyContent: "flex-end" }}
                    >
                        <Menu.Item key="users">
                            <Link to="/">Users</Link>
                        </Menu.Item>
                        <Menu.Item key="groups">
                            <Link to="/groups">Groups</Link>
                        </Menu.Item>
                    </Menu>
                </Header>

                <Content style={{ padding: "20px" }}>
                    <Routes>
                        <Route path="/" element={<UserList />} />
                        <Route path="/add" element={<UserForm />} />
                        <Route path="/edit/:id" element={<UserForm />} />
                        <Route path="/groups" element={<GroupList />} />
                        <Route path="/groups/add" element={<GroupForm />} />
                        <Route path="/groups/edit/:id" element={<GroupForm />} />
                    </Routes>
                </Content>
            </Layout>
        </BrowserRouter>
    );
}
