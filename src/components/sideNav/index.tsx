import React from 'react';
import { Link } from "react-router-dom";

import { RoleType } from '../../shared/types/role';
import {studentSideBarOptions, fvdSideBarOptions, fsSideBarOptions} from "../../shared/sideNavOption";

interface ItemProps{
    keyz: number;
    name: string;
    icon: any;
    link: string;
    children: {name: string, link: string}[];
    active: boolean;
    activeChild: number;
}

const SideNavItem:React.FC<ItemProps> = (props: ItemProps) => {
    return(
        <div className='px-0 py-0'>
            <div 
                className={props?.active?
                 'bg-[#0D619A] hover:cursor-pointer'
                :'bg-transparent hover:bg-[#1273B6] hover:cursor-pointer active:bg-[#0D619A]'
                }>
                <Link
                to={props?.link}
                key={props?.keyz}
                >
                    <div className='flex items-center pl-5 py-4'>
                        <img src={props?.icon} alt="requestIcon" className='h-6 w-6'></img>
                        <div className='text-white text-sm font-[700] pl-4'>
                            {props?.name}
                        </div>
                    </div>
                </Link>
            </div>
            {(props?.children?.length > 0) && (
                <div className={props?.active?
                    'bg-white'
                   :'hidden'}
                >
                    {props?.children?.map((child, i) => (
                        <div className='border'
                        key={i}
                        >
                            <Link
                            to={child?.link}
                            key={i}
                            >      
                                <div className='flex items-center pl-20 py-2'>
                                    <div className={(props?.activeChild === i) ?'text-[#030391] underline underline-offset-2 text-sm font-bold' : 'text-black text-sm font-bold'}>
                                        {child?.name}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
        
    )
}

interface Props {
    role: RoleType;
    pathName: string;
}

const SideNav:React.FC<Props> = (props: Props) => {

    const {role, pathName} = props;

    let activeItem:number = 0;
    let activeChildItem:number = 0;

    if(role === RoleType.Student){
        activeItem = studentSideBarOptions.findIndex(
            (item) => (item.link === pathName || item.children.some((child) => child.link === pathName))
        );
        const currentItem = studentSideBarOptions[activeItem];
        if(currentItem.children.length > 0){
            activeChildItem = currentItem.children.findIndex(
                (child) => (child.link === pathName)
            )
        }
    }
    else if(role === RoleType.FVD){
        activeItem = fvdSideBarOptions.findIndex(
            (item) => (item.link === pathName || item.children.some((child) => child.link === pathName))
        )
        const currentItem = fvdSideBarOptions[activeItem];
        if(currentItem.children.length > 0){
            activeChildItem = currentItem.children.findIndex(
                (child) => (child.link === pathName)
            )
        }
    }
    else{
        activeItem = fsSideBarOptions.findIndex(
            (item) => (item.link === pathName || item.children.some((child) => child.link === pathName))
        )
        const currentItem = fsSideBarOptions[activeItem];
        if(currentItem.children.length > 0){
            activeChildItem = currentItem.children.findIndex(
                (child) => (child.link === pathName)
            )
        }
    }

    return (
        <div>
            {/* student siderbar */}
            {(role === RoleType.Student) && (<div className='bg-[#1488D8] w-[15vw] min-h-[calc(100vh-112px)] h-[100%] flex flex-col'>
                {studentSideBarOptions?.map((option, i) => (
                    <SideNavItem
                    key={i}
                        keyz={i}
                        name={option?.name}
                        icon={option?.icon}
                        link={option?.link}
                        children={option.children}
                        active={i === activeItem}
                        activeChild={activeChildItem}
                    />
                ))}
            </div>)}
            {/* FVD sidebar */}
            {(role === RoleType.FVD) && (<div className='bg-[#1488D8] w-[15vw] min-h-[calc(100vh-112px)] h-[100%] flex flex-col'>
                {fvdSideBarOptions?.map((option, i) => (
                    <SideNavItem
                        key={i}
                        keyz={i}
                        name={option?.name}
                        icon={option?.icon}
                        link={option?.link}
                        children={option.children}
                        active={i === activeItem}
                        activeChild={activeChildItem}
                    />
                ))}
            </div>)}
            {/* FS sidebar */}
            {(role === RoleType.FS) && (<div className='bg-[#1488D8] w-[15vw] min-h-[calc(100vh-112px)] h-[100%] flex flex-col'>
                {fsSideBarOptions?.map((option, i) => (
                    <SideNavItem
                        key={i}
                        keyz={i}
                        name={option?.name}
                        icon={option?.icon}
                        link={option?.link}
                        children={option.children}
                        active={i === activeItem}
                        activeChild={activeChildItem}
                    />
                ))}
            </div>)}
        </div>
    )
}

export default SideNav;