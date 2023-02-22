// import { useStepperContext } from "./StepperContext";

export default function Step2() {
  // const { userData, setUserData } = useStepperContext();
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };
  return (
    <div className="flex flex-col ">
      <div className="w-full mx-2 flex-1">
        <div className = 'mb-4 pb-2 text-xl font-normal text-gray-900 text-center'>
              Bước 2: Thêm thành viên hội đồng
        </div>

        <form className = "space-y-4" action = "#">
        <div className = 'flex flex-row '>
            <div className = ' w-1/2'>
            <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                Tên thành viên
            </label>
            <input type = 'email' name = 'email' id ='email'
            className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder = "name"
            required
            />
            </div>
            <div className = 'w-1/2 ml-2'>
            <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                Giới tính
            </label>
            <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => {
                    }}
                    defaultValue={""}
                >
                <option value="">Nam</option>
                <option value="">Nữ</option>
            </select>
            </div>
        </div>

        <div className = 'flex flex-row '>
            <div className = ' w-1/2'>
            <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                Học hàm / Học vị
            </label>
            <input type = 'email' name = 'email' id ='email'
            className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder = "degree"
            required
            />
            </div>
            <div className = 'w-1/2 ml-2'>
            <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                Email
            </label>
            <input type = 'email' name = 'email' id ='email'
            className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder = "email"
            required
            />
            </div>
        </div>

        <div className = 'flex flex-row '>
            <div className = ' w-1/2'>
            <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                Đơn vị công tác
            </label>
            <input type = 'email' name = 'email' id ='email'
            className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder = "school"
            required
            />
            </div>
            <div className = 'w-1/2 ml-2'>
            <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                Vai trò
            </label>
            <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => {
                    }}
                    defaultValue={""}
                >
                <option value="">Chủ tịch</option>
                <option value="">Ủy viên</option>
                <option value="">Thư ký</option>
            </select>
            </div>
        </div>
        </form>
      </div>
    </div>
  );
}
