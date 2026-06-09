const fs = require('fs');
const path = 'f:/Toan lop 7/math-revision-app/src/data/chapter3.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

data.summary += '\n\n---\n\n## 4. Một số kiến thức bổ trợ thường gặp\n\n' +
  '**a) Đổi đơn vị đo thể tích:**\n' +
  '* $1 \\text{ lít} = 1 \\text{ dm}^3 = 1\\,000 \\text{ cm}^3$.\n' +
  '* $1 \\text{ m}^3 = 1\\,000 \\text{ dm}^3 = 1\\,000 \\text{ lít}$.\n\n' +
  '**b) Định lý Pitago (dùng trong tam giác vuông):**\n' +
  'Trong tam giác vuông, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông: $c^2 = a^2 + b^2 \\Rightarrow c = \\sqrt{a^2 + b^2}$.\n\n' +
  '**c) Diện tích các hình phẳng cơ bản (để tính diện tích đáy):**\n' +
  '* **Tam giác vuông:** $S = \\frac{1}{2} \\times \\text{tích hai cạnh góc vuông}$.\n' +
  '* **Hình thang:** $S = \\frac{1}{2} \\times (\\text{đáy lớn} + \\text{đáy bé}) \\times \\text{chiều cao}$.';

const newHints = [
  'Con chỉ cần thay đúng các số đo: chiều dài $a = 5$, chiều rộng $b = 4$, chiều cao $h = 3$ vào công thức $V = a \\cdot b \\cdot h$ và $S_{tp} = 2(ab + bh + ah)$ là ra ngay nhé!',
  'Con nhớ nhé, hộp này "không có nắp", tức là nó chỉ có 5 mặt thôi (mặt đáy và 4 mặt bên). Con tính diện tích của 5 mặt này rồi chia cho 200 (diện tích 1 tờ giấy) để xem cần mấy tờ.',
  'Trước tiên, con nhớ đổi $40$ lít thành $40\\,000 \\text{ cm}^3$ nhé. Chiều cao của nước sẽ bằng thể tích chia cho diện tích đáy ($h = \\frac{V}{S_{đáy}}$). Sau đó tính tương tự để xem $30$ cm cần bao nhiêu lít nước.',
  'Khối rubik là hình lập phương có 6 mặt bằng nhau. Con lấy tổng diện tích chia 6 để ra diện tích 1 mặt ($a^2$). Từ đó suy ra cạnh $a$, rồi dùng $a$ tính thể tích $V = a^3$.',
  'Đáy là tam giác vuông, con hãy dùng Định lý Pitago (trong phần lý thuyết) để tính cạnh huyền nhé. Sau đó dùng nó để tính chu vi đáy. Còn thể tích thì lấy diện tích đáy nhân với chiều cao hộp.',
  'Con tính diện tích toàn phần ($S_{tp}$) của căn phòng. Cứ mỗi $10 \\text{ m}^2$ thì tốn 1 lít sơn, vậy con lấy $S_{tp}$ chia cho 10. Chú ý số lẻ thì phải làm tròn lên nhé (vì mua dư thì mới đủ sơn).',
  'Hồ bơi "không có nắp" nên con chỉ cần tính diện tích mặt đáy cộng với diện tích 4 mặt xung quanh ($S_{xq}$). Sau đó, con lấy tổng diện tích này chia cho diện tích của 1 viên gạch ($0{,}5 \\times 0{,}5 \\text{ m}^2$).',
  'Hình hộp chữ nhật A và B có chung thể tích 120. Con lấy 120 chia cho $(a \\times b)$ của từng hình để tìm ra chiều cao $h$ tương ứng. Sau khi có đủ $a, b, h$, con hãy tính diện tích toàn phần của hai hình xem có gì bất ngờ không nhé!',
  'Nước đá tan ra thành nước, nên thể tích nước đá cũng chính là thể tích nước trong cốc ($V = a^3$). Cốc hình hộp chữ nhật có diện tích đáy là $4 \\times 4$. Chiều cao nước = Thể tích chia cho diện tích đáy.',
  'Hình lăng trụ có đáy là hình thang vuông. Con dùng công thức diện tích hình thang để tính $S_{đáy}$. Để tính chu vi đáy, con dùng định lý Pitago tìm nốt cạnh huyền của hình thang nhé. Cuối cùng tính $V = S_{đáy} \\times h$ và $S_{xq} = C_{đáy} \\times h$.'
];

data.essays.forEach((essay, index) => {
  if (newHints[index]) {
    essay.hint = newHints[index];
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Updated chapter3.json successfully!');
