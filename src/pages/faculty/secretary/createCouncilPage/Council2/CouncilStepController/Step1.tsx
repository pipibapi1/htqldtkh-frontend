// import { useStepperContext } from "./StepperContext";

export default function Step1() {
  // const { userData, setUserData } = useStepperContext();
//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData , [name]: value });
//   };

  return (
    <div className="flex flex-col ">
      <div className="mx-2 w-full flex-1">
          <div className = 'mb-4 pb-2 text-xl font-normal text-gray-900 text-center'>
              Bước 1: Thêm thông tin chung
          </div>
          <form className = "space-y-4" action = "#">
              <div className = 'flex flex-row '>
                  <div className = 'mx-6 w-full'>
                  <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                      Đợt
                  </label>
                  <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          onChange={(e) => {
                          }}
                          defaultValue={"dfdasf"}
                      >
                      <option value="">06/2022</option>
                      <option value="">06/2021</option>
                      <option value="">06/2020</option>
                      <option value="">06/2019</option>
                  </select>
                  </div>
              </div>

              <div className = 'flex flex-row '>
                  <div className = 'mx-6 w-full '>
                  <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                      Tên hội đồng:
                  </label>
                  <input type = 'email' name = 'email' id ='email'
                  className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder = "name"
                  required
                  />
                  </div>
              </div>

              <div className = 'flex flex-row '>
                  <div className = 'mx-6 w-full'>
                  <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                      Thời gian diễn ra
                  </label>
                  <input type = 'email' name = 'email' id ='email'
                  className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder = "time"
                  required
                  />
                  </div>
              </div>

              <div className = 'flex flex-row '>
                  <div className = 'mx-6 w-full'>
                  <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                  Địa điểm
                  </label>
                  <input type = 'email' name = 'email' id ='email'
                  className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder = "place"
                  required
                  />
                  </div>
              </div>
            </form>
        </div>
    </div>
  );
}
