import React from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import PasswordPanel from './PasswordPanel';

const PasswordIndex: React.FC = (props: any) => {
    return (
        <div>
            <Header isLogin={false} isAccountServicePage={true}/>
            <PasswordPanel />
            <Footer />
        </div>
    );
}

export default PasswordIndex;