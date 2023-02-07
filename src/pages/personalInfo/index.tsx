import React from 'react';
import Header from '../../components/header';
import UserProfile from './UserProfile';


const PersonalInfoPage: React.FC = (props: any) => {
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='px-5'>
                <div className=''>
                    <div className='text-lg font-bold mt-2'>
                        THÔNG TIN CÁ NHÂN
                    </div>
                    <UserProfile />
                </div>
            </div>
            
        </div>
    );
}

export default PersonalInfoPage;