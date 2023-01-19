import MyTopicIcon from "../../assets/images/myTopicIcon.png";
import TopicRegisterIcon from "../../assets/images/topicRegisterIcon.png";
import RequestIcon from "../../assets/images/requestIcon.png";
import TemplateIcon from "../../assets/images/templateIcon.png";
import Statistics from "../../assets/images/statistics.png";
import RequestManagement from "../../assets/images/requestManagement.png";
import Account from "../../assets/images/account.png";
import Council from "../../assets/images/council.png";
import Folder from "../../assets/images/folder.png";
import Upload from "../../assets/images/upload.png";

import { appRouters } from "../urlResources";

export const studentSideBarOptions: {name: string, icon: any, link: string, children: {name: string, link: string}[]}[] = [
    {name: "ĐỀ TÀI CỦA TÔI", icon: MyTopicIcon, link: "/" + appRouters.LINK_TO_MY_TOPIC_PAGE, children:[]},
    {name: "ĐĂNG KÝ ĐỀ TÀI", icon: TopicRegisterIcon, link: "/" + appRouters.LINK_TO_REGISTER_TOPIC_PAGE, children: []},
    {name: "YÊU CẦU PHÁT SINH", icon: RequestIcon, link: "/" + appRouters.LINK_TO_MY_REQUEST_PAGE, children: []},
    {name: "XEM BIỂU MẪU", icon: TemplateIcon, link: "/" + appRouters.LINK_TO_VIEW_TEMPLATES_PAGE, children: []}
]

export const fvdSideBarOptions: {name: string, icon: any, link: string, children: {name: string, link: string}[]}[]  = [
    {name: "BÁO BIỂU THỐNG KÊ", icon: Statistics, link: "/" + appRouters.LINK_TO_FVD_TOPIC_STATISTIC,
        children: [
            {name: "Đề tài", link: "/" + appRouters.LINK_TO_FVD_TOPIC_STATISTIC},
            {name: "Phân bổ kinh phí", link: "/" + appRouters.LINK_TO_FVD_EXPENSE_STATISTIC}
            ]
    },
    {name: "QUẢN LÝ YÊU CẦU", icon: RequestManagement, link: "/" + appRouters.LINK_TO_REQUEST_MANAGEMENT, children: []},
]

export const fsSideBarOptions: {name: string, icon: any, link: string, children: {name: string, link: string}[]}[]  = [
    {name: "BÁO BIỂU THỐNG KÊ", icon: Statistics, link: "/fsExpenseStatistic", children:[]},
    {name: "QUẢN LÝ TÀI KHOẢN", icon: Account, link: "/fsExpenseStatistic", children:[]},
    {name: "QUẢN LÝ ĐỀ TÀI", icon: Folder, link: "/fsExpenseStatistic", children:[]},
    {name: "TẠO BIỂU MẪU", icon: TemplateIcon, link: "/fsExpenseStatistic", children:[]},
    {name: "TẠO HỘI ĐỒNG", icon: Council, link: "/fsExpenseStatistic", children:[]},
    {name: "UPLOAD THÔNG BÁO", icon: Upload, link: "/fsExpenseStatistic", children:[]},
]