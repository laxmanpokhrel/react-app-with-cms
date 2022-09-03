import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import { DashboardOutlined } from '@ant-design/icons';
import { FcFaq } from "react-icons/fc"
import { MdPermMedia } from "react-icons/md"
import AdminRoutes from "../../routes/cmsRoutes/CmsRoutes"
import PresentWorkingPanel from "../../components/PresentWorkingPanel"
import firstLetterCaps from '../../utils/firstLetterCaps';

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, icon, children) {
    return {
        key: uuidv4(),
        icon,
        children,
        label,
    };
}
const items = [
    getItem(<Link to="/admin">Dashboard</Link>, <Link to="/admin"><DashboardOutlined /></Link>),
    getItem("FAQ", <FcFaq />, [
        getItem(<Link to="/admin/addFaq">{firstLetterCaps("Add Faq")}</Link>),
        getItem(<Link to="/admin/viewFaq">{firstLetterCaps("View FAQ")}</Link>),
        getItem(<Link to="/admin/faqCategoryPanel">{firstLetterCaps("FAQ Category")}</Link>),
    ]),
    getItem(<Link to="/admin/media">{firstLetterCaps("Media")}</Link>, <Link to="/admin/media"><MdPermMedia /></Link>),

];

const CmsPanel = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div
                    className="logo"
                    style={{
                        color: "white"
                    }}
                >
                    <img
                        src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7a3ec529632909.55fc107b84b8c.png"
                        alt="rendom Image"
                        style={{
                            objectFit: "contain",
                            height: "6rem",
                            width: "6rem"
                        }}
                    />
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                        width: "100%",
                        // border: "1px solid red",
                        flexDirection: "flex-end",
                        alignItems: "flex-end"
                    }}
                >
                    <h3>React CMS</h3>
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <PresentWorkingPanel />
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            minHeight: "80vh",
                        }}
                    >
                        <AdminRoutes />
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    ©2022 Created by Laxman Pokhrel
                </Footer>
            </Layout>
        </Layout>
    );
}
export default CmsPanel