import { Layout } from "antd";
import React from "react";
import Nav from "./Nav";
import "./Page.less";

const { Header, Content, Footer, Sider } = Layout;

export default function Page({ active, nav, component: Component }) {
    return (
        <Layout className="page">
            <Header className="page-header">
                <div>ZZ Formula</div>
            </Header>
            <Content className="page-content">
                <Layout className="page-content-layout">
                    <Nav nav={nav} active={active} />
                    <Layout>
                        <Content className="page-content-main">
                            <Component />
                        </Content>
                    </Layout>
                </Layout>
            </Content>
            <Footer className="page-footer">
                <a
                    className="copyright"
                    target="_blank"
                    href="https://beian.miit.gov.cn/?spm=a21bo.2017.1997523009.42.5af911d9dARMWo#/Integrated/recordQuery"
                >
                    浙ICP备 18028241号-3
                </a>
                <a
                    className="copyright police"
                    target="_blank"
                    href="http://www.beian.gov.cn/portal/registerSystemInfo?spm=a21bo.2017.1997523009.45.5af911d9dARMWo&recordcode=33010302003623"
                >
                    浙公网安备 33010302003623号
                </a>
            </Footer>
        </Layout>
    );
}
