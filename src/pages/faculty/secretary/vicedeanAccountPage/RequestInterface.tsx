import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';

import { AppDispatch } from '../../../../store';

import { Toast } from '../../../../shared/toastNotify/Toast';

import { getAllStaffsAction } from '../../../../actions/staffAction';
import { getFvdListAction } from '../../../../actions/fvdAction';
import { addAFvdAction } from '../../../../actions/fvdAction';

import PaginationTag from './PaginationTag';
import LeftTag from './LeftTag';
import RightTag from './RightTag';
import OtherMemberRow from './OtherMemberRow';

import EyeOpen from "../../../../assets/images/eyeOpen.png";
import EyeClose from "../../../../assets/images/eyeClose.png";

const RECORD_PER_PAGE = 5;
interface Staff {
    _id: string,
    name: string,
    gender: string,
    phoneNumber: string,
    email: string,
    staffId: string,
    birthDate: string
}

interface Vicedean {
    _id: string,
    name: string,
    gender: string,
    phoneNumber: string,
    email: string,
    staffId: string,
    birthDate: string,
    username: string,
    password: string,
    rawPassword: string,
    accountCreationDate: string;
}

const RequestInterface = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [staffs, setStaffs] = useState<Staff[]>([]);
    const [vicedeanList, setVicedeanList] = useState<Vicedean[]>([]);
    const [staffIndex, setStaffIndex] = useState<number>(-1);
    const [totalPage, setTotalPage] = useState<number>(1);

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const prevPage = () => {
        if (currentPage <= 1) return;
        setCurrentPage(currentPage - 1);
        onChangePage(currentPage - 1)
    };
    const nextPage = () => {
        if (currentPage >= totalPage) return;
        setCurrentPage(currentPage + 1);
        onChangePage(currentPage + 1)
    };

    const onChangePage = (page: number) => {
        let queryData: any = {
            page: page,
            limit: RECORD_PER_PAGE
        }


        dispatch(getFvdListAction(queryData))
            .then((data) => {
                setVicedeanList(data?.viceDeans)
            })
            .catch((error) => {
            })
    }

    const addNewFvd = (e: any) => {
        e.preventDefault();
        if (username === "") {
            Toast.fire({
                icon: 'warning',
                title: 'Bạn không được để trống tên đăng nhập'
            })
        }
        else if (password === "") {
            Toast.fire({
                icon: 'warning',
                title: 'Bạn không được để  trống mật khẩu'
            })
        }
        else if (staffIndex === -1) {
            Toast.fire({
                icon: 'warning',
                title: 'Vui lòng chọn cán bộ khoa'
            })
        }
        else {
            const info = {
                viceDean: {
                    username: username,
                    password: password,
                    rawPassword: password,
                    name: staffs[staffIndex].name,
                    gender: staffs[staffIndex].gender,
                    phoneNumber: staffs[staffIndex].phoneNumber,
                    email: staffs[staffIndex].email,
                    staffId: staffs[staffIndex].staffId,
                    birthDate: staffs[staffIndex].birthDate
                }
            }

            Swal.fire({
                icon: 'question',
                title: 'Bạn có chắc muốn thêm tài khoản cán bộ quản lý mới?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Yes',
            }).then((result) => {

                if (result.isConfirmed) {
                    dispatch(addAFvdAction(info))
                        .then((data) => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Thêm thành công',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: 'OK',
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            })
                        }
                        )
                        .catch((error) => {
                            if (error.response) {
                                // The request was made and the server responded with a status code
                                // that falls out of the range of 2xx
                                if (error.response.status === 400) {
                                    if (error.response.data.err === "Username existed") {
                                        Toast.fire({
                                            icon: 'error',
                                            title: 'Tên đăng nhập đã tồn tại'
                                        })
                                    }
                                    else if (error.response.data.err === "Email existed") {
                                        Toast.fire({
                                            icon: 'error',
                                            title: 'Cán bộ Khoa được chọn đã có tài khoản cán bộ quản lý'
                                        })
                                    }
                                    else {
                                        Toast.fire({
                                            icon: 'error',
                                            title: 'Bad request'
                                        })
                                    }

                                }
                            } else if (error.request) {
                                // The request was made but no response was received
                                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                                // http.ClientRequest in node.js
                                Toast.fire({
                                    icon: 'error',
                                    title: error.request
                                })
                            } else {
                                // Something happened in setting up the request that triggered an Error
                                Toast.fire({
                                    icon: 'error',
                                    title: error.message
                                })
                            }
                        })
                }

                if (result.isDenied) {
                }
            })
        }
    }

    useEffect(() => {
        dispatch(getAllStaffsAction())
            .then((data) => {
                setStaffs(data?.staffs)
            })
            .catch((error) => {
            })

        let queryData = {
            page: currentPage,
            limit: RECORD_PER_PAGE
        }

        dispatch(getFvdListAction(queryData))
            .then((data) => {
                setVicedeanList(data?.viceDeans)
                if (data?.metadata.totalPage > 0) {
                    setTotalPage(totalPage)
                }
            })
            .catch((error) => {
            })
    }, []);

    return (
        <div className='p-5 min-h-[630px] overflow-hidden'>
            <div className='flex justify-between mb-2'>
                <div className='flex flex-col'>
                    <div className='mb-5'>
                        <div className='font-bold'>
                            Tên đăng nhập:
                        </div>
                        <input
                            type="text"
                            name="name"
                            className="border border-black border-1 rounded-md w-[800px] h-10 p-2"
                            onChange={(e) => {
                                e.preventDefault();
                                setUsername(e.target.value)
                            }}
                        />
                    </div>

                    <div className='mb-5'>
                        <div className='font-bold'>
                            Mật khẩu:
                        </div>
                        <div className='grid justify-items-end items-center'>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="name"
                                className="border border-black border-1 rounded-md w-[800px] h-10 p-2"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setPassword(e.target.value)
                                }}
                            />
                            <div className='absolute mr-2'>
                                <button onClick={toggleShowPassword}>
                                    {showPassword ?
                                        (<img src={EyeOpen} alt="eyeIcon" className='h-4 w-5' />) :
                                        (<img src={EyeClose} alt="eyeIcon" className='h-4 w-5' />)
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <div>
                        <div className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                            onClick={addNewFvd}
                        >
                            Thêm tài khoản
                        </div>
                    </div>

                </div>
            </div>

            <div className='mb-5'>
                <div className='font-bold mb-2'>
                    Cán bộ Khoa:
                </div>
                <div className='px-2 mb-1'>
                    <div className="">
                        <select
                            className="bg-white h-[40px] w-96 border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                            onChange={(e) => {
                                e.preventDefault();
                                setStaffIndex(parseInt(e.target.value))
                            }}
                            defaultValue={-1}
                        >
                            <option value={-1} disabled>Chọn cán bộ Khoa</option>
                            {staffs.map((staff, index) => {
                                return <option value={index}>{`MSCB: ${staff.staffId} - ${staff.name}`}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>

            <div className=''>
                <div className='font-bold mb-2'>
                    Danh sách tài khoản cán bộ quản lý:
                </div>
                <div className='w-full'>
                    <div className='flex flex-col'>
                        <div className=''>
                            <div className='inline-block w-full pr-5'>
                                <div className=''>
                                    <table className='w-full table-fixed border-separate border-spacing-y-1 border-2'>
                                        <thead className='bg-[#1577D2] border-b'>
                                            <tr>
                                                <th
                                                    scope='col'
                                                    className='w-[5%] text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                                >
                                                    STT
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                                >
                                                    Họ và tên
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                                >
                                                    MSCB
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                                >
                                                    Tên Đăng Nhập
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='w-[10%] text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                                >
                                                    Ngày tạo
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='w-[8%] text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                                >

                                                </th>
                                                <th
                                                    scope='col'
                                                    className='w-[5%] text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                                >

                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className=''>
                                            {vicedeanList.map((vicedean, index) => {
                                                return <OtherMemberRow
                                                    index={index + 1}
                                                    currentPage={currentPage}
                                                    vicedean={vicedean}
                                                />
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid justify-items-end px-5'>
                    <ul className='inline-flex items-center -space-x-px'>
                        <LeftTag onClick={prevPage} />
                        {Array.from(Array(totalPage).keys()).map((index) => (
                            <PaginationTag
                                key={index}
                                numPage={index + 1}
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                                onChangePage={onChangePage}
                            />
                        ))}
                        <RightTag onClick={nextPage} />
                    </ul>
                </div>
            </div>


        </div>
    )
}

export default RequestInterface;