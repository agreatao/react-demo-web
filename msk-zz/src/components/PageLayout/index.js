import { Layout } from "antd";
import React from "react";
import Nav from "./Nav";
import "./index.less";
import LocaleButton from "Locale/LocaleButton";
import UserButton from "User/UserButton";

const { Header, Content, Footer } = Layout;

export default function PageLayout({ nav, children }) {
    return (
        <Layout>
            <Header className="page-header__wrapper">
                <div className="logo">ZZ Formula</div>
                <div className="actions">
                    <UserButton />
                    <LocaleButton />
                </div>
            </Header>
            <Layout>
                <Nav nav={nav} />
                <Layout>
                    <Content className="content__wrapper">{children}</Content>
                </Layout>
            </Layout>
            <Footer className="copyright__wrapper">
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
