import React from "react";
import { initApp } from "main";
import PageLayout from "PageLayout";
import { calc } from "main/nav";

initApp(<PageLayout nav={calc}></PageLayout>);
