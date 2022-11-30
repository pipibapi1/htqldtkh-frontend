import React from 'react';

interface Props{
    path: string
}

const PathHead: React.FC<Props> = (props: any) => {
    const {path} = props
    return(
        <div className='w-[85vw] h-10 border-t-2 border-b-2 border-[#EEEEEE] flex items-center px-5 py-5'>
            <div className='font-semibold'>
                {path}
            </div>
        </div>
    )
}

export default PathHead;