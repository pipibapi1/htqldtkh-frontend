import React from 'react';
import Footer from '../../../components/footer';
import Header from '../../../components/header';
import SideNav from '../../../components/sideNav';

const MyTopicPage:React.FC = () => {
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={"student"}/>
                <div className='flex flex-col'>
                    
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MyTopicPage;