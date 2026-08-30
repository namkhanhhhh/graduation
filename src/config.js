import sampleImage from './assets/sample.jpg';

export const invitationConfig = {
  // Ảnh ở trang bên trái khi mở thiệp (thay link ảnh của bạn vào đây)
  // Bạn có thể dùng ảnh dọc (portrait) để khung hình đẹp nhất
  leftPageImage: sampleImage,

  // Thông tin buổi lễ
  title: "Trân trọng kính mời đến dự",
  senderName: "Lễ Tốt Nghiệp", // Đổi vai trò để tên thiệp tinh tế hơn, tên người gửi có thể để ở phần dưới hoặc tách riêng. Nhưng giữ nguyên cấu trúc cũ cho dễ:

  // Tên người gửi (Nổi bật)
  personName: "Nguyễn Nam Khánh",

  // Lời nhắn ngắn gọn, tinh tế
  openingMessage: "Sự hiện diện của bạn trong cột mốc quan trọng này là niềm vinh hạnh và động lực lớn đối với mình.",

  dateAndTime: "10:00 AM - 12:00 PM Thứ Tư, Ngày 16/09/2026",
  locationName: "Trung tâm Hội nghị Quốc gia, Đại lộ Thăng Long, phường Từ Liêm, Hà Nội",

  // Thông tin liên hệ phản hồi (RSVP)
  contactInfo: {
    phone: "0978262446",
    facebookLink: "https://www.facebook.com/NamKhanhNgx/"
  },

  // Lời kết cảm ơn
  closingMessage: "Rất mong được đón tiếp bạn. Xin chân thành cảm ơn!",

  // Link Google Maps chỉ đường
  googleMapsLink: "https://maps.app.goo.gl/hmoAypXa2K4N8u6v5",
};
