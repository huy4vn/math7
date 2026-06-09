const fs = require('fs');
const path = 'f:/Toan lop 7/math-revision-app/src/data/chapter6.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Cập nhật summary
data.summary += '\n\n---\n\n## 5. Một số kỹ năng nâng cao\n\n' +
  '**Kỹ thuật nối hai dãy tỉ số:**\n' +
  'Khi đề bài cho hai dãy tỉ số riêng biệt như $\\frac{x}{2} = \\frac{y}{3}$ và $\\frac{y}{4} = \\frac{z}{5}$, ta cần "nối" chúng lại thành một dãy duy nhất $\\frac{x}{a} = \\frac{y}{b} = \\frac{z}{c}$.\n' +
  '* **Cách làm:** Tìm Bội chung nhỏ nhất (BCNN) của hai mẫu số của chữ cái chung (ở đây là chữ $y$, có mẫu là $3$ và $4$. BCNN của $3$ và $4$ là $12$).\n' +
  '* Biến đổi dãy 1 (nhân mẫu với 4): $\\frac{x}{2 \\times 4} = \\frac{y}{3 \\times 4} \\Rightarrow \\frac{x}{8} = \\frac{y}{12}$.\n' +
  '* Biến đổi dãy 2 (nhân mẫu với 3): $\\frac{y}{4 \\times 3} = \\frac{z}{5 \\times 3} \\Rightarrow \\frac{y}{12} = \\frac{z}{15}$.\n' +
  '* Nối lại ta được: $\\frac{x}{8} = \\frac{y}{12} = \\frac{z}{15}$. Giờ thì con có thể áp dụng tính chất dãy tỉ số bằng nhau rồi!';

// Cập nhật lại các hint cho thân thiện với học sinh lớp 7 (giọng "Con hãy...")
const newHints = [
  'Con hãy áp dụng tính chất dãy tỉ số bằng nhau: lấy tử cộng tử, mẫu cộng mẫu $\\frac{x+y}{4+7}$. Sau đó thay $x+y=55$ vào để tìm ra phân số chung nhé.',
  'Câu "tỉ lệ với $2, 3, 5$" nghĩa là $\\frac{a}{2} = \\frac{b}{3} = \\frac{c}{5}$. Con lập dãy tỉ số bằng nhau và dùng phép cộng ở tử số giống bài 1 nhé.',
  'Ở đây đề cho hiệu $x - y$, nên thay vì cộng, con hãy dùng phép trừ: lấy tử trừ tử, mẫu trừ mẫu $\\frac{x-y}{5-2}$ nhé.',
  'Câu 1: Tỉ lệ thuận thì con làm phép chia để tìm hệ số ($k = \\frac{y}{x}$). Câu 2: Công thức là $y = k \\times x$. Câu 3: Con thay số vào công thức vừa lập để tính $y$.',
  'Câu 1: Tỉ lệ nghịch thì con làm phép nhân để tìm hệ số ($a = x \\times y$). Câu 2: Công thức là $y = \\frac{a}{x}$. Câu 3: Thay $x = 6$ vào tính thử nhé.',
  'Con gọi số cây của 3 lớp là $a, b, c$. Đề cho tỉ lệ $3, 4, 5$ tức là $\\frac{a}{3} = \\frac{b}{4} = \\frac{c}{5}$, và tổng $a + b + c = 120$. Con dùng dãy tỉ số bằng nhau để giải tiếp nhé.',
  'Bài này cũng y hệt bài trồng cây luôn! Con gọi số tiền của 3 người là $x, y, z$. Ta sẽ có $\\frac{x}{2} = \\frac{y}{3} = \\frac{z}{4}$ và tổng $x+y+z = 180$.',
  'Số người làm và số ngày hoàn thành là hai đại lượng tỉ lệ nghịch (càng ít thợ thì xây càng lâu). Con hãy tính tích: Số thợ ban đầu $\\times$ Số ngày ban đầu, rồi chia cho số thợ lúc sau nhé.',
  'Nhiều nước biển hơn thì sẽ chứa nhiều muối hơn, nên đây là đại lượng tỉ lệ thuận. Con hãy lấy số gam muối ban đầu chia cho số lít để xem 1 lít có bao nhiêu gam muối, rồi nhân với 12 lít nhé.',
  'Con thấy chữ $y$ bị lặp lại ở hai phân số không? Một bên $y$ chia 3, một bên $y$ chia 4. Con hãy quy đồng mẫu số của $y$ thành 12 (BCNN của 3 và 4) để nối chúng lại thành $\\frac{x}{8} = \\frac{y}{12} = \\frac{z}{15}$ nhé.'
];

data.essays.forEach((essay, index) => {
  if (newHints[index]) {
    essay.hint = newHints[index];
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Updated chapter6.json successfully!');
