import React from 'react';

interface Props {
    onSetNumOfInstructor: (num: number) => void;
    onSetNumOfOtherMember: (num: number) => void;
    onSetNextStep: (e: Boolean) => void;
}

const RegisterStep1:React.FC<Props> = (props: Props) => {
    
    const {onSetNumOfInstructor, onSetNumOfOtherMember, onSetNextStep} = props;

    return(
        <div className='p-5'>
            <div>
                <div className='flex mb-5'>
                    <div className='font-bold mr-5'>
                        Đợt:
                    </div>
                    <div>
                        06/2022
                    </div>
                </div>

                <div className='mb-3'>
                    <div className='font-bold mb-2'>
                        Số lượng thành viên: 
                    </div>
                    <div className="">
                        <select
                            className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                onChange={value => {
                                    if(value){
                                        onSetNumOfOtherMember(Number(value.target.value) - 1)
                                    }
                                }}
                                defaultValue={0}
                            >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </select>
                    </div>
                </div>

                <div className='mb-5'>
                    <div className='font-bold mb-2'>
                        Số lượng GVHD: 
                    </div>
                    <div className="">
                        <select
                            className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                onChange={value => {
                                    if(value){
                                        onSetNumOfInstructor(Number(value.target.value))
                                    }
                                }}
                                defaultValue={1}
                            >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='flex ml-40 '>
                <div>
                    <div onClick={() => onSetNextStep(false)} className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer">
                    Tiếp theo
                    </div>
                </div>
                <div>
                    <div className="w-40 bg-[#E1000E] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#B20610] hover:cursor-pointer">
                    Hủy
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterStep1;