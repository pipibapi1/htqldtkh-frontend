import React from 'react';
import Header from '../../components/header';
import PathHead from '../../components/pathHead'; //Nhớ phải chỉnh lại riêng thanh tiêu đề (tại mình ko có thanh sidebar)
import UserProfile from './UserProfile';




const Home: React.FC = (props: any) => {
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className=''>
                <div className=''>
                    <PathHead path={"THÔNG TIN CÁ NHÂN"}/>
                    <UserProfile />
                </div>
            </div>
            
        </div>
    );
}

export default Home;