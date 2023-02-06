import React, {useState} from 'react';
import EyeOpen from "../../../../assets/images/eyeOpen.png";
import EyeClose from "../../../../assets/images/eyeClose.png"
import {Link} from "react-router-dom";


const UploadInterface: React.FC = (props: any) => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    
    return (
        <div className=''>
            <div className='p-5 min-h-[630px] overflow-hidden'>
            <div className='flex justify-between mb-2'>
                <div className='flex flex-col'>
                    <div className='mb-5'>
                        <div className='font-bold'>
                            Tiêu đề: 
                        </div>
                        <input
                        type="text"
                        name="name"
                        className="border border-black border-1 rounded-md w-[800px] h-10 p-2"
                        />
                    </div> 

                    <div className='mb-5'>
                    <div className='font-bold'>
                        Mô tả: 
                    </div>
                        <input
                        type="text"
                        name="name"
                        className="border border-black border-1 rounded-md w-[800px] h-[300px] p-2"
                        />
                    </div> 
                </div>
                <div className=''>
                    <div>
                        <Link to={'/'} className="">
                            <div className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer">
                            Upload
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to={'/'} className="">
                            <div className="w-40 bg-[#E1000E] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#B20610] hover:cursor-pointer">
                            Hủy
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='mb-5'>
                <div className='font-bold mb-2'>
                        File đính kèm:
                </div>
                <input
                        type="file"
                        name="name"
                        className="border border-black border-1 rounded-md w-[800px] h-10 p-1 "
                />
                
            </div>
            </div>
        </div>
    )
}

export default UploadInterface;