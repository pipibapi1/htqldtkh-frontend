import React from 'react';
import Header from '../../../components/header';
import SideNav from '../../../components/sideNav';
import PathHead from '../../../components/pathHead';
import MyTopicList from './MyTopicList';
import { useLocation } from 'react-router-dom';
import { RoleType } from '../../../shared/types/role';

const MyTopicPage:React.FC = () => {
    const location = useLocation();
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.Student} pathName={location.pathname}/>
                <div className=''>
                    <PathHead path={"ĐỀ TÀI CỦA TÔI"}/>
                    <MyTopicList />
                </div>
            </div>
        </div>
    )
}

export default MyTopicPage;