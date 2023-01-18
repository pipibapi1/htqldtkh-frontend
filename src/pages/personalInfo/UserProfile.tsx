import React, { useState, useEffect, createRef } from 'react';
import  Avatar  from 'react-avatar-edit'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import {Button} from 'primereact/button';
import Modal from './modal';
import {Cropper, ReactCropperElement} from "react-cropper";
import 'cropperjs/dist/cropper.css';
import ViewMode from './viewMode';
import EditMode from './editMode';

function onBeforeFileLoad(elem: any) {
    if (elem.target.files[0].size > 2000000) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }

  const file2Base64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString() || '');
      reader.onerror = (error) => reject(error);
    });
  };

const UserProfile: React.FC = () => {
    const [isAtViewMode, changeToEditMode] = useState<Boolean>(true);
    const [isAtEditMode, changeToViewMode] = useState<Boolean>(false);


   
    const [image, setImage] = useState(null);
    const [imagecrop, setImagecrop] = useState (true);
    const [src, setSrc] = useState(null);
    const [preview, setPreview] = useState(null);

    const [dialogs, setDialogs] = useState(false);

    const [modalOn, setModalOn] = useState(false);
    const [choice, setChoice] = useState(false)
  
    const clicked = () => {
      setModalOn(true)
    }

    const onClose = () => {
        setPreview(null);
    }

    const onCropPre = (view: any) => {
        setPreview(view);
    }

    // Test phương án khác
    // ref of the file input
  const fileRef = createRef<HTMLInputElement>();

  // the selected image
  const [uploaded, setUploaded] = useState(null as string | null);

  // the resulting cropped image
  const [cropped, setCropped] = useState(null as string | null);

  // the reference of cropper element
  const cropperRef = createRef<ReactCropperElement>();

  const onFileInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target?.files?.[0];
    if (file) {
      file2Base64(file).then((base64) => {
        setUploaded(base64);
      });
    }
  }

  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    setCropped(cropper.getCroppedCanvas().toDataURL())
  }

  
    return(
        <div className= 'px-12 py-6 grid grid-cols-3'>
            <div className = ' border border-black col-span-1'>
            <div className = 'profile_img text-center p-4'>
                <div className = 'flex flex-col  align-items-center justify-center '>
                <img 
                className = 'w-48 h-48 rounded-full ring-2 ring-gray-300 object-cover'
                // src="https://media.istockphoto.com/vectors/three-persons-icon-black-vector-vector-id1158561473?k=20&m=1158561473&s=612x612&w=0&h=pSRNS3mkeYMYcleK_Pzf89gnkVQuxtiSGMm4yll-UXg="
                src = {preview!}
                alt = "Preview"
                />
                <Avatar
                    // className = 'w-80 h-80'
                    width={400}
                    height={300}
                    src = {null!}
                    onCrop = {onCropPre}
                    onClose = {onClose} 
                    onBeforeFileLoad={onBeforeFileLoad}
                />



                <button className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                onClick={clicked}
                >
                    OPEN
                </button>
                {modalOn && < Modal setModalOn={setModalOn} setChoice={setChoice} />}


                {
          uploaded ?
            <div>
              <Cropper
                src={uploaded}
                style={{height: 400, width: 400}}
                autoCropArea={1}
                aspectRatio={1}
                viewMode={3}
                guides={false}
                ref={cropperRef}
              />
              <button onClick={onCrop}>Crop</button>
              {cropped && <img src={cropped} alt="Cropped!"/>}
            </div>
            :
            <>
              <input
                type="file"
                style={{display: 'none'}}
                ref={fileRef}
                onChange={onFileInputChange}
                accept="image/png,image/jpeg,image/gif"
              />
              <button
                onClick={() => fileRef.current?.click()}
                className = 'block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
              >Upload something!
              </button>
            </>}

  

               

                {/* <InputText 
                type = "file"
                accept='image/*'
                // style={{display: "none"}}
            //     onChange={ (e: any) =>{
            //         const file = e.target.files[0]
                    
            //         if (file && file.type.substring(0,5) === "image")
            //         {
            //             setImage(file);
            //         }
            //         else
            //         {
            //             setImage(null)
            //         }
            //     }
            // }
                /> */}

                {/* <img
                style= {{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    objectFit: "cover",
                }}
                src="https://media.istockphoto.com/vectors/three-persons-icon-black-vector-vector-id1158561473?k=20&m=1158561473&s=612x612&w=0&h=pSRNS3mkeYMYcleK_Pzf89gnkVQuxtiSGMm4yll-UXg="
                alt=""
                />
                <Button className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' 
                onClick= {()=> setDialogs(true)}
                type="button"> DIALOG </Button>
                <Dialog 
                    visible = {dialogs}
                    header = { () => (
                        <p className='text-2xl font-semibold textColor' >
                            Update Profile
                        </p>
                    )} 
                    onHide= {()=> setDialogs(false)} 
                    className = 'border border-black'
                     
                >
                    <div className = 'confirmation-content flex flex-col items-center'>
                        <div className='flex flex-col items-center mt-5 w-12'>
                            <div className='flex flex-col justify-around mt-4 w-12'>
                            <Avatar
                                // className = 'w-80 h-80'
                                width={400}
                                height={300}
                                src = {src!}
                                onCrop = {onCrop}
                                onClose = {onClose} 
                            />
               
                                <Button label = "Save" icon="pi pi-check" onClick= {()=> setDialogs(false)}/>
                            </div>

                        </div>
                    </div>
                </Dialog> */}
                </div>
            </div>
            </div>

            <div className = ' border border-black col-span-2'>
            <div className=''>
                    
                    {
                    (isAtViewMode)?
                    (<ViewMode 
                        onViewMode={changeToEditMode}
                        onEditMode={changeToViewMode}
                    />)
                    :(<EditMode
                        onEditMode={changeToViewMode}
                        onViewMode={changeToEditMode}
                    />) 
                    // || (isAtEditMode && !isAtViewMode)?
                    // (<EditMode 
                    //     onEditMode={changeToEditMode}
                    // />)
                    // :(<ViewMode
                    //     onViewMode={changeToViewMode}
                    // />)
                    }
                </div>
            
            </div>
           
        </div>

    )
}

export default UserProfile;