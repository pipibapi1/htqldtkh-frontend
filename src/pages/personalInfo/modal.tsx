import React, {useState} from 'react';
import  Avatar  from 'react-avatar-edit'

const Modal = ({ setModalOn, setChoice }: {setModalOn: any, setChoice: any}) => {
    const [preview, setPreview] = useState(null);
    const [src, setSrc] = useState(null);

    const handleOKClick = () => {
        setChoice(true)
        setModalOn(false)
    }
    const handleCancelClick = () => {
        setChoice(false)
        setModalOn(false)
    }
    const onClose = () => {
        setPreview(null);
    }

    const onCrop = (view: any) => {
        setPreview(view);
    }

    return (

        <div className="   bg-zinc-100 opacity-100 fixed inset-0 z-50   ">

            <div className="flex h-screen justify-center items-center ">

                <div className=" justify-center  bg-white py-12 px-24 border-4 border-sky-500 rounded-xl ">

                    <div className="flex  text-lg  text-zinc-600 text-center   mb-10" >Are you sure ?</div>
                    <Avatar
                    // className = 'w-80 h-80'
                    width={400}
                    height={300}
                    src = {src!}
                    onCrop = {onCrop}
                    onClose = {onClose} 
                    />
                    <div className="flex">
                        <button onClick={handleOKClick} className=" rounded px-4 py-2 text-white  bg-green-400 ">Yes</button>
                        <button onClick={handleCancelClick} className="rounded px-4 py-2 ml-4 text-white bg-blue-500 ">No</button>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Modal