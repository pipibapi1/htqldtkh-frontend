import React from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';

const Home: React.FC = (props: any) => {
    return (
        <div className=''>
            <Header isLogin={false} isAccountServicePage={false}/>
            <Footer/>
        </div>
    );
}

export default Home;