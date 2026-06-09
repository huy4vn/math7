const fs = require('fs');
const path = 'f:/Toan lop 7/math-revision-app/src/data/chapter1.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

// 1. Update summary
data.summary += '\n\n---\n\n### 9. Một số kiến thức nâng cao\n\n' +
  '**a) Giá trị tuyệt đối của một số hữu tỉ:**\n' +
  'Giá trị tuyệt đối của $x$, kí hiệu là $|x|$, là khoảng cách từ điểm $x$ tới điểm $0$ trên trục số. Do đó, $|x| \\ge 0$ với mọi $x$.\n' +
  '* Nếu $x \\ge 0$ thì $|x| = x$.\n' +
  '* Nếu $x < 0$ thì $|x| = -x$.\n\n' +
  '**b) Tính chất phân phối:**\n' +
  'Khi nhân một số với một tổng hoặc hiệu, ta có thể nhân số đó với từng số hạng rồi cộng hoặc trừ kết quả:\n' +
  '$a \\cdot (b + c) = a \\cdot b + a \\cdot c$ và $a \\cdot (b - c) = a \\cdot b - a \\cdot c$.\n\n' +
  '**c) Dãy tỉ số bằng nhau:**\n' +
  'Từ tỉ lệ thức $\\frac{a}{b} = \\frac{c}{d}$, ta có thể suy ra: $\\frac{a}{b} = \\frac{c}{d} = \\frac{a+c}{b+d} = \\frac{a-c}{b-d}$.\n\n' +
  '**d) Phương pháp tách phân số (Sai phân):**\n' +
  'Giúp tính nhanh tổng các phân số có quy luật:\n' +
  '$\\frac{k}{n \\cdot (n+k)} = \\frac{1}{n} - \\frac{1}{n+k}$.';

// 2. Update hints in essays
const newHints = [
  'Con hãy dùng tính chất phân phối $a \\cdot (b + c - d) = a \\cdot b + a \\cdot c - a \\cdot d$. Ở đây thừa số chung là $\\frac{5}{13}$, con hãy đặt nó ra ngoài nhé!',
  'Con coi cụm $(x - \\frac{1}{2})$ như là số trừ chưa biết. Lấy số bị trừ $\\frac{3}{4}$ trừ đi hiệu $\\frac{1}{4}$ để tìm cụm đó, sau đó tìm $x$ nhé.',
  'Trước tiên, con tính tổng số phần quãng đường đã đi được trong cả hai giờ. Cả quãng đường được xem là $1$, con lấy $1$ trừ đi tổng vừa tính sẽ ra phần đường còn lại.',
  'Con hãy tách các cơ số $9$ và $6$ ra thành các thừa số nguyên tố: $9 = 3^2$ và $6 = 2 \\cdot 3$. Sau đó áp dụng quy tắc lũy thừa để rút gọn tử và mẫu.',
  'Thay vì quy đồng trực tiếp rất lớn, con hãy thử so sánh cả hai phân số này với một phân số trung gian là $\\frac{-3}{5}$. Con quy đồng $\\frac{-3}{5}$ với mẫu là $35$ và $177$ để so sánh từng phân số với nó nhé.',
  'Con hãy đổi $1.5$ và $0.5$ thành phân số (ví dụ $1.5 = \\frac{3}{2}$). Sau đó, tính lũy thừa, rồi tính phép trừ trong ngoặc vuông trước, cuối cùng làm phép chia nhé.',
  'Con hãy đưa $2^n$ ra ngoài làm thừa số chung ở vế trái (áp dụng tính chất phân phối). Sau đó tính cụm còn lại trong ngoặc và giải tìm $2^n$.',
  'Con để ý mẫu số nhé: $3 \\times 5$ cách nhau 2 đơn vị, đúng bằng tử số. Hãy dùng công thức tách phân số: $\\frac{2}{3 \\cdot 5} = \\frac{1}{3} - \\frac{1}{5}$. Áp dụng tương tự cho các phân số còn lại và rút gọn.',
  'Con nhớ nhé: Giá trị tuyệt đối của một số luôn lớn hơn hoặc bằng $0$. Tổng của hai biểu thức lớn hơn hoặc bằng $0$ mà lại bằng $0$ thì điều gì sẽ xảy ra? Cả hai đều phải đồng thời bằng $0$!',
  'Con hãy ghép các số hạng liền kề nhau thành từng nhóm đôi một (ví dụ nhóm thứ nhất là $2+2^2$, nhóm hai là $2^3+2^4$...). Sau đó đặt nhân tử chung ở mỗi nhóm, con sẽ thấy xuất hiện một thừa số chia hết cho 3.'
];

data.essays.forEach((essay, index) => {
  if (newHints[index]) {
    essay.hint = newHints[index];
  }
});

data.quizzes.forEach(q => {
  if (q.question.includes('3^{x+1} - 3^x')) {
    q.explanation = 'Áp dụng tính chất phân phối để đặt $3^x$ ra làm nhân tử chung: $3^x \\cdot 3^1 - 3^x \\cdot 1 = 54 \\implies 3^x(3 - 1) = 54 \\implies 3^x \\cdot 2 = 54 \\implies 3^x = 27 = 3^3 \\implies x = 3$.';
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Updated chapter1.json successfully!');
