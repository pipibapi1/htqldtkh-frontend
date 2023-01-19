import OldAnnouncement from './OldAnnouncement';
import { appRouters } from '../../shared/urlResources';
import {Link, useNavigate} from "react-router-dom";


  const Announcement = () => {
    return (
      <div className= 'grid grid-cols-3'>
        <main className = 'px-12 py-6 border-r col-span-2'>
          <Link to={`/${appRouters.LINK_TO_OLD_ANNOUNCEMENT_PAGE}`}>
          
            <div className = 'py-4 text-blue-600 font-semibold'>THÔNG BÁO MỚI NHẤT</div>
          </Link>
          <div className = 'border border-3 rounded-lg'>
          <div className = 'text-2xl text-center font-bold'>THÔNG BÁO</div>
          <div className = 'text-xl text-center text-blue-800'>
            Đăng ký đề tài NCKH và đổi mới sáng tạo cấp Sinh viên thuộc chương trình Chính quy, Kỹ sư tài năng và Chương trình đào tạo Quốc tế thực hiện trong năm 2022 - Đợt 2
          </div>

          <div className= 'px-4 py-4'>
          <p>
          Theo kế hoạch hoạt động KHCN hàng năm, việc đăng ký xét duyệt đề tài nghiên cứu khoa học (NCKH) cấp Sinh viên (SV) thuộc các chương trình Chính quy, Kỹ sư Tài năng (KSTN), và Đào tạo Quốc tế (OISP) (sau đây gọi chung là “đề tài nghiên cứu khoa học cấp sinh viên”) được chuyển về Khoa để đăng ký và xét duyệt.
          Nay, Khoa KH&KT Máy tính thông báo đến toàn thể Sinh viên việc đăng ký và thực hiện đề tài NCKH cấp Sinh viên đợt 1 năm 2022 như sau:
          </p>
          <p className = 'font-semibold'>1. Thông tin chung</p>
          <p>
          -        Thời gian thực hiện đề tài 06 tháng từ tháng 8/2022 – 02/2023, các trường hợp đặc biệt sẽ do Hiệu trưởng quyết định.
          </p>
          <p>
          -        Khoa chịu trách nhiệm lập các hội đồng tư vấn xét duyệt và nghiệm thu thanh lý, với các mốc thời gian như sau:
          </p>
          <p>
          +  <span className= 'font-semibold'>Trước 09/8/2022:</span> Sinh viên đăng ký hồ sơ đề tài NCKH gồm (02 bản thuyết minh và 02 bản dự toán theo mẫu) có đầy đủ chữ ký của nhóm SV và Người hướng dẫn Khoa học nộp về Vp Khoa_ Cô Kim Cương phụ trách (Thông tin liên hệ: email: kcuong@hcmut.edu.vn, số đt nội bộ: 7847)

          </p>
          <p>
          + <span className= 'font-semibold'>Trước 15/8/2022:</span> Khoa gửi kết quả xét duyệt và hồ sơ đăng ký đề tài có đầy đủ chữ ký của nhóm SV và Người hướng dẫn khoa học và đại diện Ban chủ nhiệm Khoa về Phòng KHCN&DA;

          </p>
          <p>
          +  <span className= 'font-semibold'>Đầu tháng 2/2023:</span> Sinh viên tiến hành báo cáo đề tài và tổng kết nghiệm thu đề tài, thanh lý hợp đồng. Đồng thời Khoa thực hiện các thủ tục nghiệm thu thanh lý trong tháng 02/2023 hoặc trường hợp gia hạn thời gian thực hiện đề tài (nếu có yêu cầu riêng).

          </p>
          <p>
          -        Dự kiến nhà trường sẽ thông báo đăng ký đề tài NCKH cấp sinh viên đợt 2 vào tháng 12/2022.
          </p>
          <p>
          -        Người hướng dẫn khoa học (NHDKH) cho từng loại đề tài phải đủ điều kiện giảng dạy SV chương trình tương ứng. 
          </p>
          <p>
          -       Biểu mẫu thuyết minh đề tài và dự toán có trên trang portal của trường tại: https://portal.hcmut.edu.vn/news/item/6001. Lưu ý, biểu mẫu năm 2022 đã thay đổi, đề nghị các Sinh viên không sử dụng biểu mẫu trước đây.
          </p>
          </div>
          </div>
        </main>
        <Link to={`/${appRouters.LINK_TO_OLD_ANNOUNCEMENT_PAGE}`}>
        <OldAnnouncement/>
        </Link>
      </div>
    );
  };
  
  export default Announcement;