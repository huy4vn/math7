const fs = require('fs');
const path = 'f:/Toan lop 7/math-revision-app/src/data/chapter7.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Cập nhật summary
data.summary += '\n\n---\n\n## 4. Nghiệm của đa thức một biến\n\n' +
  '### Định nghĩa:\n' +
  'Nếu tại $x = a$, đa thức $P(x)$ có giá trị bằng $0$ (tức là $P(a) = 0$) thì ta nói $a$ (hoặc $x = a$) là một **nghiệm** của đa thức đó.\n\n' +
  '### Cách tìm nghiệm của đa thức:\n' +
  'Để tìm nghiệm của đa thức $P(x)$, ta đặt $P(x) = 0$ và giải bài toán tìm $x$.\n' +
  '* *Lưu ý:* Nếu đa thức là tích của nhiều biểu thức (ví dụ: $A(x) \\cdot B(x) = 0$), thì ta cho từng biểu thức bằng 0 để tìm nghiệm ($A(x) = 0$ hoặc $B(x) = 0$).\n\n' +
  '### Chứng minh đa thức không có nghiệm (vô nghiệm):\n' +
  'Để chứng minh một đa thức không có nghiệm thực, ta thường biến đổi đa thức đó về dạng luôn lớn hơn 0 hoặc luôn nhỏ hơn 0 với mọi $x$.\n' +
  '* **Kiến thức lõi:** Bình phương của một số luôn không âm: $x^2 \\ge 0$ và $(x - a)^2 \\ge 0$ với mọi $x$.\n' +
  '* *Ví dụ:* Chứng minh $x^2 + 5$ vô nghiệm. Ta có $x^2 \\ge 0 \\Rightarrow x^2 + 5 \\ge 5 > 0$ với mọi $x$. Vì đa thức luôn lớn hơn 0 nên không thể bằng 0, do đó vô nghiệm.';

// Cập nhật lại các hint cho thân thiện với học sinh lớp 7 (giọng "Con hãy...")
const newHints = [
  'Con hãy xếp các hạng tử giống nhau về số mũ lại gần nhau (ví dụ $x^4$ đi với $x^4$, $x^3$ đi với $x^3$), sau đó cộng trừ các hệ số đứng trước chúng nhé.',
  'Chỗ nào có chữ $x$, con thay bằng số tương ứng (nhớ đặt số âm trong ngoặc nhé). Ví dụ với $x=-1$, con viết là $2 \\cdot (-1)^3$. Sau đó tính toán cẩn thận.',
  'Con có thể đặt phép tính theo cột dọc cho dễ nhìn. Nhớ là các hạng tử có cùng số mũ (cùng bậc) thì phải đặt thẳng cột với nhau nhé.',
  'Tìm nghiệm tức là tìm $x$ để đa thức bằng $0$. Con cho $3x - 15 = 0$ rồi tìm $x$. Còn với câu b, khi hai cái nhân nhau bằng $0$, thì con cho từng cái bằng $0$ rồi giải nhé.',
  'Câu a: Con lấy $2x$ nhân lần lượt vào từng hạng tử bên trong ngoặc. Câu b: Con lấy từng hạng tử của $(x-3)$ nhân với $(2x+5)$, sau đó thu gọn lại.',
  'Vì đây là chia cho đơn thức ($2x$), con chỉ cần lấy từng số hạng của đa thức bị chia đem chia cho $2x$ là xong!',
  'Con coi $P(x)$ và $Q(x)$ như hai số hạng của một phép cộng. Muốn tìm số hạng chưa biết $Q(x)$, con lấy Tổng trừ đi số hạng đã biết $P(x)$ nhé. Nhớ đổi dấu khi phá ngoặc phép trừ!',
  'Con hãy tách số $5 = 4 + 1$. Ghép $x^2 - 4x + 4$ lại thành $(x-2)^2$. Một bình phương thì luôn $\\ge 0$. Cộng thêm 1 nữa thì kết quả sẽ thế nào?',
  'Con hãy thử tách $5x = 2x + 3x$. Sau đó ghép cặp và đặt nhân tử chung để biến $x^2 + 5x + 6$ thành một phép nhân. Nếu làm được vậy thì phép chia sẽ cực kỳ nhanh đấy!',
  'Câu "có nghiệm là $x = -2$" có nghĩa là khi con thay $x = -2$ vào đa thức thì kết quả sẽ bằng $0$. Con thay vào rồi giải bài toán tìm chữ $m$ nhé.'
];

data.essays.forEach((essay, index) => {
  if (newHints[index]) {
    essay.hint = newHints[index];
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Updated chapter7.json successfully!');
