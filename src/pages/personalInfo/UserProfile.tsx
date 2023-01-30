import React, { useState} from 'react';
import PersonalPanel from './PersonalPanel';


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