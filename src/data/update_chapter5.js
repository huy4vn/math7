const fs = require('fs');
const path = 'f:/Toan lop 7/math-revision-app/src/data/chapter5.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Cập nhật lại các hint cho thân thiện với học sinh lớp 7 (giọng "Con hãy...")
const newHints = [
  'Con hãy nhớ lại lý thuyết nhé: Dữ liệu nào là con số cụ thể, tính toán được thì gọi là "định lượng". Dữ liệu nào chỉ dùng để gọi tên, phân loại (chữ viết) thì gọi là "định tính".',
  'Con dùng công thức này nhé: Góc ở tâm = Tỉ lệ % nhân với $360^\\circ$. Con thay số $40\\%$ vào để tính thử xem.',
  'Con thử xét xem: Số lượng con người (học sinh nam) có thể là số âm ($-5$) được không? Và lớp có $40$ người mà riêng nữ đã $45$ người thì có hợp lý không?',
  'Con hãy so sánh nhiệt độ của ngày hôm sau so với ngày hôm trước. Nếu nhiệt độ tăng lên thì đường biểu diễn sẽ đi lên, nếu nhiệt độ giảm đi thì đường biểu diễn sẽ đi xuống.',
  'Trước tiên, con tính xem $54^\\circ$ chiếm bao nhiêu phần trăm của cả vòng tròn $360^\\circ$. Sau đó con lấy phần trăm đó nhân với tổng chi tiêu $20$ triệu là sẽ ra số tiền cho Giáo dục.',
  'Con hãy thử làm phép cộng: lấy tất cả các phần trăm cộng lại với nhau xem tổng có ra đúng $100\\%$ không nhé. Nếu vượt quá hoặc thiếu thì số liệu đó không hợp lý.',
  'Trong biểu đồ đoạn thẳng: Đường dốc lên nghĩa là số lượng đang tăng. Đường nằm ngang là số lượng không đổi. Đường dốc xuống là số lượng đang giảm. Con áp dụng vào từng khoảng thời gian nhé.',
  'Con nhớ lại bảng so sánh cuối phần lý thuyết nhé: Biểu đồ hình quạt tròn từ khóa là "Tỉ lệ phần trăm, cơ cấu". Còn biểu đồ đoạn thẳng từ khóa là "Xu hướng thay đổi, diễn biến theo thời gian".',
  'Bước 1: Con tính xem $10$ bạn chiếm bao nhiêu phần trăm so với cả lớp ($40$ bạn). Bước 2: Lấy số phần trăm đó nhân với $360^\\circ$ để ra được góc ở tâm của hình quạt.',
  'Con hãy nhặt ra các dữ liệu là con số cụ thể (để tính toán đo lường) bỏ vào nhóm định lượng. Các dữ liệu mang tính gọi tên, miêu tả (chữ viết) thì con bỏ vào nhóm định tính nhé.'
];

data.essays.forEach((essay, index) => {
  if (newHints[index]) {
    essay.hint = newHints[index];
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Updated chapter5.json successfully!');
