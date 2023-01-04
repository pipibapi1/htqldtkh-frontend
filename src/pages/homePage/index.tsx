import React from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import MainHomePageContent from './HomePageContent';
import Announcement from './Announcement';



const Home: React.FC = (props: any) => {
    return (
        <div className=''>
            <Header isLogin={false} isAccountServicePage={false}/>
            <MainHomePageContent/>
            <Announcement/>
            <Footer/>
        </div>
    );
}

export default Home;