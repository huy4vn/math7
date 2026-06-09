const fs = require('fs');
const path = 'f:/Toan lop 7/math-revision-app/src/data/chapter2.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

// 1. Update summary
data.summary += '\n\n---\n\n## 5. Một số tính chất và lưu ý quan trọng\n\n' +
  '**a) So sánh hai căn bậc hai:**\n' +
  'Với hai số không âm $a$ và $b$, nếu $a < b$ thì $\\sqrt{a} < \\sqrt{b}$.\n' +
  '> Ví dụ: Để so sánh $2$ và $\\sqrt{5}$, ta đưa $2$ vào trong căn: $2 = \\sqrt{4}$. Vì $4 < 5$ nên $\\sqrt{4} < \\sqrt{5}$, suy ra $2 < \\sqrt{5}$.\n\n' +
  '**b) Căn bậc hai của một phân số:**\n' +
  'Căn bậc hai số học của một phân số (với tử và mẫu dương) bằng căn của tử chia cho căn của mẫu:\n' +
  '$$\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}$$\n\n' +
  '**c) Lưu ý khi làm tròn số (Trường hợp nhớ):**\n' +
  'Khi chữ số cần làm tròn là $9$ và ta phải cộng thêm $1$ (do chữ số phía sau $\\ge 5$), thì $9+1=10$, ta viết $0$ và **nhớ $1$** sang hàng tiếp theo bên trái.\n' +
  '> Ví dụ: Làm tròn $8.96$ đến phần mười $\\rightarrow$ Chữ số $6 \\ge 5$ nên cộng $1$ vào $9$ thành $10$, nhớ $1$ sang phần nguyên thành $9$. Kết quả là $9.0$.';

// 2. Update hints in essays to make them more child-friendly
const newHints = [
  'Con hãy tính từng căn bậc hai ra số cụ thể trước (ví dụ $\\sqrt{36} = 6$). Sau đó thực hiện phép tính cộng trừ từ trái sang phải nhé.',
  'Số $4$ chưa có căn đúng không? Con hãy đổi $4$ thành căn bậc hai của một số (gợi ý: $4^2 = 16$ nên $4 = \\sqrt{16}$). Sau đó áp dụng quy tắc: số nào lớn hơn thì căn của nó lớn hơn.',
  'Hàng phần trăm là chữ số thứ hai sau dấu phẩy (số $5$). Con hãy nhìn ngay sang chữ số bên phải nó (số $6$). Vì $6 \\ge 5$ nên con phải làm gì với số $5$ nào?',
  'Con hãy nhớ định nghĩa căn bậc hai số học nhé: vì $x$ lớn hơn $0$ và bình phương bằng $49$ nên $x$ chính là căn bậc hai số học của $49$.',
  'Con hãy áp dụng công thức tính chu vi hình tròn: $C = 2 \\times \\pi \\times R$. Con thay $R = 5$ và $\\pi \\approx 3.14159$ vào, nhân ra kết quả rồi tiến hành làm tròn đến hàng phần mười (chữ số thập phân thứ nhất) nhé.',
  'Số hữu tỉ thì phần thập phân sẽ hữu hạn (dừng lại) hoặc vô hạn tuần hoàn (lặp đi lặp lại một cụm). Con hãy quan sát giá trị thập phân của $\\sqrt{2}$ xem nó có đặc điểm gì? Từ đó suy ra nó thuộc loại số nào nhé.',
  'Công thức diện tích hình vuông là $S = a \\times a = a^2$. Vậy cạnh $a$ chính là căn bậc hai của diện tích $S$. Con tính $\\sqrt{50}$ rồi làm tròn đến chữ số thập phân thứ nhất nhé.',
  'Khi gặp căn của một phân số, con có thể tách ra thành căn của tử chia cho căn của mẫu: $\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}$. Con hãy thử áp dụng cho từng phân số rồi tính tiếp nhé!',
  'Bài toán yêu cầu con làm tròn số hai lần khác nhau. Lần 1: làm tròn đến hàng trăm (nhìn vào hàng chục). Lần 2: làm tròn đến hàng nghìn (nhìn vào hàng trăm). Sau đó con so sánh xem kết quả nào có sai số ít hơn so với số gốc nhé.',
  'Con có thể làm theo 2 bước. Bước 1: So sánh $\\sqrt{10}$ và $3$ bằng cách đưa $3$ về dạng căn. Bước 2: So sánh $\\pi$ (khoảng $3.14$) với $\\sqrt{10}$ (khoảng $3.16$). Từ đó xếp chúng theo thứ tự từ bé đến lớn nhé.'
];

data.essays.forEach((essay, index) => {
  if (newHints[index]) {
    essay.hint = newHints[index];
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Updated chapter2.json successfully!');
