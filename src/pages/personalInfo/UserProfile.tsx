import React, { useState} from 'react';
import PersonalPanel from './PersonalPanel';

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

    return(
        <div className= 'px-12 py-2'>
            <div className = ''>
                <div className=''> 
                    <PersonalPanel 
                        onViewMode={changeToEditMode}
                        onEditMode={changeToViewMode}
                    />
                </div>
            </div>
        </div>

    )
}

export default UserProfile;