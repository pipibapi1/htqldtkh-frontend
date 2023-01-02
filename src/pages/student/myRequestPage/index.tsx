import React from 'react';
import Footer from '../../../components/footer';
import Header from '../../../components/header';
import SideNav from '../../../components/sideNav';
import PathHead from '../../../components/pathHead';
import MyRequestList from './MyRequestList';


const MyRequestPage:React.FC = () => {
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={"student"}/>
                <div className=''>
                    <PathHead path={"YÊU CẦU PHÁT SINH"}/>
                    <MyRequestList />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MyRequestPage;