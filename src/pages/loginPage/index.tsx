import React from 'react';

import Footer from '../../components/footer';
import Header from '../../components/header';

import ChooseRolePanel from './ChooseRolePanel';

const Login: React.FC = () => {
    return (
        <div>
            <Header isLogin={false} isAccountServicePage={true}/>
            <ChooseRolePanel />
            <Footer />
        </div>
    );
}

export default Login;