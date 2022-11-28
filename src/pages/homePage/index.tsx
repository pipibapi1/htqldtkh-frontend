import React from 'react';
import Header from '../../components/header';

const Home: React.FC = (props: any) => {
    return (
        <Header isLogin={false} isAccountServicePage={false}/>
    );
}

export default Home;