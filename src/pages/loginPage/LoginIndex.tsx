import React from 'react';

import Footer from '../../components/footer';
import Header from '../../components/header';

import LoginPanel from './LoginPanel';

const LoginIndex: React.FC = () => {
    return (
        <div>
            <Header isLogin={false} isAccountServicePage={true}/>
            <LoginPanel />
            <Footer />
        </div>
    );
}

export default LoginIndex;