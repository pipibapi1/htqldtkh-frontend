import React from 'react';
import BKlogo from "../../assets/images/hcmut.png";

const Footer: React.FC = (props: any) => {
    return (
        <div className='w-full relative bottom-0'>
            <div className='bg-footer flex justify-center py-1'>
                <div className='flex px-10'>
                <div className='pl-[0px]'>
                    <div className='flex justify-center items-center'>
                        <img 
                            src={BKlogo} 
                            alt="BK logo"
                            className='h-20 w-20'
                        />
                    </div>
                    <div className='text-white font-bold flex justify-center items-center text-sm'>
                    ĐẠI HỌC BÁCH KHOA TP.HCM
                    </div>
                </div>

                <div className='pl-[350px]'>
                    <div className='text-white font-bold flex justify-center items-center py-3'>
                        WEBSITE
                    </div>
                    <div>
                        <div className='text-white font-medium text-xs'>
                            HCMUT
                        </div>
                        <div className='text-white font-medium text-xs'>
                            MyBK
                        </div>
                        <div className='text-white font-medium text-xs'>
                            BKeL
                        </div>
                    </div>
                </div>

                <div className='pl-[350px]'>
                    <div className='text-white font-bold flex items-center py-3'>
                        CONTACT
                    </div>
                    <div>
                        <div className='text-white font-medium text-xs'>
                            268 Ly Thuong Kiet Street Ward 14, District 10, Ho Chi Minh City, Vietnam
                        </div>
                        <div className='text-white font-medium text-xs'>
                            (028) 38 651 670 - (028) 38 647 256 (Ext: 5258, 5234)
                        </div>
                        <div className='text-white font-medium text-xs'>
                            elearning@hcmut.edu.vn
                        </div>
                    </div>
                </div>
                </div>

            </div>

            <div className='bg-[#002ECF] flex justify-center items-center'>
                <div className='text-white font-bold p-1 text-sm'>
                    COPYRIGHT 2022-2023
                </div>
            </div>
        </div>
    );
}

export default Footer;