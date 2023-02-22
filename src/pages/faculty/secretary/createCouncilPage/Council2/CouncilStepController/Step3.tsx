import { useStepperContext } from "./StepperContext";

export default function Step3() {
  const { userData, setUserData } = useStepperContext();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };
  return (
    <div className="flex flex-col ">
            <div className="w-full mx-2 flex-1">
        <div className = 'mb-4 pb-2 text-xl font-normal text-gray-900 text-center'>
              Bước 3: Thêm đề tài
        </div>

        <form className = "space-y-4" action = "#">
        <div className = 'flex flex-row '>
            <div className = ' w-1/2'>
            <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                Tên đề tài
            </label>
            <input type = 'email' name = 'email' id ='email'
            className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder = "name"
            required
            />
            </div>
            <div className = 'w-1/2 ml-2'>
            <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                Họ và tên chủ nhiệm
            </label>
            <input type = 'email' name = 'email' id ='email'
            className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder = "name"
            required
            />
            </div>
        </div>

        <div className = 'flex flex-row '>
            <div className = ' w-1/2'>
            <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                Họ và tên CBHD
            </label>
            <input type = 'email' name = 'email' id ='email'
            className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder = "name"
            required
            />
            </div>
            <div className = 'w-1/2 ml-2'>
            <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                Thời gian thực hiện
            </label>
            <input type = 'email' name = 'email' id ='email'
            className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder = "time"
            required
            />
            </div>
        </div>

        <div className = 'flex flex-row '>
            <div className = ' w-full'>
            <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                Sản phẩm
            </label>
            <input type = 'file' name = 'email' id ='email'
            className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder = "file"
            required
            />
            </div>
        </div>

        <div className = 'flex flex-row '>
            <div className = ' w-full'>
            <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                Ghi chú
            </label>
            <input type = 'note' name = 'email' id ='email'
            className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder = "note"
            required
            />
            </div>
        </div>
        </form>
      </div>
    </div>
  );
}
