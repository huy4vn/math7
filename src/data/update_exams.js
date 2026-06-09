const fs = require('fs');
const path = 'f:/Toan lop 7/math-revision-app/src/data/exams.json';
let exams = JSON.parse(fs.readFileSync(path, 'utf8'));

const hints = [
  // Exam 1
  [
    'Con ôn lại cách quy đồng mẫu số để cộng phân số nhé. Và nhớ giá trị tuyệt đối luôn ra số dương (ví dụ $\\left|-10\\right| = 10$).',
    'Câu a: Con chuyển $-\\frac{1}{2}$ sang vế phải và đổi dấu thành $+\\frac{1}{2}$. Câu b: Áp dụng nhân chéo, ta có $x \\cdot x = 12 \\cdot 3$.',
    'Con gọi số học sinh 3 lớp là $x, y, z$. Đề nói tỉ lệ với $8, 9, 10$ tức là $\\frac{x}{8} = \\frac{y}{9} = \\frac{z}{10}$. Áp dụng dãy tỉ số bằng nhau nhé.',
    'Câu a: Con dùng trường hợp Cạnh-Cạnh-Cạnh vì $\\triangle ABC$ cân và $M$ là trung điểm. Câu b: Hai góc ở $M$ kề bù (tổng $180^\\circ$) mà lại bằng nhau thì mỗi góc là $90^\\circ$.'
  ],
  // Exam 2
  [
    'Con hãy phá ngoặc ra cẩn thận, đặc biệt phép trừ thì phải đổi dấu toàn bộ đa thức phía sau. Sau đó ghép các hạng tử cùng bậc lại.',
    'Tỉ lệ nghịch nghĩa là $3x = 4y = 6z$. Con hãy chia cả 3 vế cho 12 (BCNN của 3, 4, 6) để biến nó thành dãy tỉ số bằng nhau $\\frac{x}{4} = \\frac{y}{3} = ...$ nhé.',
    'Câu a: Con dùng định lý Pythagore. Câu b: Dùng trường hợp Cạnh huyền - Góc nhọn. Câu c: Từ câu b con suy ra $BA=BE$ và $DA=DE$, nghĩa là $B$ và $D$ cùng nằm trên đường trung trực của $AE$.',
    'Câu a: Đa thức có nghiệm khi nó bằng 0. Câu b: Con nhớ lại $x^2 \\ge 0$, vậy $x^2 + 5$ sẽ luôn lớn hơn 0 nên không thể bằng 0 (vô nghiệm).'
  ],
  // Exam 3
  [
    'Câu a: Con đánh giá $x^4 \\ge 0$ và $x^2 \\ge 0$, nên cộng lại cộng thêm 2 sẽ luôn dương. Câu b: Con đặt $\\frac{a}{b} = \\frac{c}{d} = k$, suy ra $a=kb, c=kd$ rồi thay vào biểu thức.',
    'Con thay $x=0$ vào sẽ tìm ngay được $c$. Sau đó thay $x=1$ và $x=-1$ vào để ra hai biểu thức, từ đó tìm $a$ và $b$ bằng tổng và hiệu.',
    'Câu a: Chứng minh $\\triangle ABH = \\triangle CAI$. Câu b: Kết hợp kết quả câu a, chứng minh $\\triangle AHM = \\triangle CIM$ theo C-G-C. Câu c: Từ câu b ta có 2 cạnh bằng nhau, con tìm cách chứng minh góc giữa chúng bằng $90^\\circ$.'
  ]
];

exams.forEach((exam, i) => {
  exam.essays.forEach((essay, j) => {
    essay.hint = hints[i][j];
  });
});

fs.writeFileSync(path, JSON.stringify(exams, null, 2), 'utf8');
console.log('Updated exams.json successfully!');
