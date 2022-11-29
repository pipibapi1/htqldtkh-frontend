import React from 'react';
import BKlogo from "../../assets/images/hcmut.png";

const Footer: React.FC = (props: any) => {
    return (
        <div className='w-full relative bottom-0'>
            <div className='bg-footer flex'>
                <div className='pl-[70px]'>
                    <div className='flex justify-center items-center'>
                        <img 
                            src={BKlogo} 
                            alt="BK logo"
                            className='h-20 w-20'
                        />
                    </div>
                    <div className='text-white font-bold flex justify-center items-center'>
                    ĐẠI HỌC BÁCH
                    </div>
                    <div className='text-white font-bold flex justify-center items-center'>
                    KHOA TPHCM
                    </div>
                </div>

                <div className='pl-[450px]'>
                    <div className='text-white font-bold flex justify-center items-center py-3'>
                        WEBSITE
                    </div>
                    <div>
                        <div className='text-white font-medium'>
                            HCMUT
                        </div>
                        <div className='text-white font-medium'>
                            MyBK
                        </div>
                        <div className='text-white font-medium'>
                            BKeL
                        </div>
                    </div>
                </div>

                <div className='pl-[550px]'>
                    <div className='text-white font-bold flex items-center py-3'>
                        CONTACT
                    </div>
                    <div>
                        <div className='text-white font-medium'>
                            268 Ly Thuong Kiet Street Ward 14, District 10, Ho Chi Minh City, Vietnam
                        </div>
                        <div className='text-white font-medium'>
                            (028) 38 651 670 - (028) 38 647 256 (Ext: 5258, 5234)
                        </div>
                        <div className='text-white font-medium'>
                            elearning@hcmut.edu.vn
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-[#002ECF] flex justify-center items-center'>
                <div className='text-white font-bold p-2'>
                    COPYRIGHT 2022-2023
                </div>
            </div>
        </div>
    );
}

export default Footer;