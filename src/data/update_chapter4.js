const fs = require('fs');
const path = 'f:/Toan lop 7/math-revision-app/src/data/chapter4.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

data.summary += '\n\n---\n\n## 5. Một số tính chất mở rộng cần nhớ\n\n' +
  '**a) Quan hệ giữa tính vuông góc và tính song song:**\n' +
  '* Nếu hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì chúng song song với nhau ($a \\perp c$ và $b \\perp c \\Rightarrow a \\parallel b$).\n' +
  '* Nếu một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó cũng vuông góc với đường thẳng kia ($a \\parallel b$ và $c \\perp a \\Rightarrow c \\perp b$).\n\n' +
  '**b) Tính chất bắc cầu của hai đường thẳng song song:**\n' +
  '* Hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì chúng song song với nhau ($a \\parallel c$ và $b \\parallel c \\Rightarrow a \\parallel b$).\n\n' +
  '**c) Tính chất đặc biệt của tia phân giác:**\n' +
  '* Hai tia phân giác của hai góc kề bù thì **vuông góc** với nhau (tạo thành góc $90^\\circ$).\n' +
  '* Hai tia phân giác của hai góc đối đỉnh là **hai tia đối nhau** (cùng nằm trên một đường thẳng).';

const newHints = [
  'Con nhớ nhé: Tổng số đo của hai góc kề bù là $180^\\circ$. Con lấy $180^\\circ$ trừ đi góc đã biết là ra góc còn lại. Còn hai góc đối đỉnh thì luôn bằng nhau.',
  'Hai đường thẳng cắt nhau tạo thành 4 góc. Con hãy vẽ hình ra nhé! Góc thứ nhất là $50^\\circ$, góc đối đỉnh với nó cũng sẽ là $50^\\circ$. Hai góc còn lại sẽ kề bù với góc $50^\\circ$, con tính lấy $180^\\circ - 50^\\circ$ nhé.',
  'Con hãy tính từng phần nhỏ một: Tia phân giác chia góc thành hai nửa bằng nhau. Đầu tiên con tính $\\widehat{BOC}$ là một nửa của $80^\\circ$. Sau đó con tính góc kề bù với $80^\\circ$ là bao nhiêu, rồi lại lấy một nửa của góc đó. Cuối cùng cộng hai nửa lại với nhau.',
  'Con cứ nhớ quy tắc này: Khi có hai đường thẳng song song, tất cả các góc nhọn đều bằng nhau, và tất cả các góc tù đều bằng nhau. Một góc nhọn cộng một góc tù luôn bằng $180^\\circ$. Hãy vẽ hình ra và điền số đo nhé.',
  'Con hãy làm từ từ: gọi góc $\\widehat{AOB}$ là $a$ và $\\widehat{BOC}$ là $b$. Tổng $a + b = 180^\\circ$. Tia phân giác chia đôi mỗi góc thành $\\frac{a}{2}$ và $\\frac{b}{2}$. Góc $\\widehat{DOE}$ là tổng của $\\frac{a}{2}$ và $\\frac{b}{2}$, con hãy đặt thừa số chung ra ngoài nhé!',
  'Con hãy kiểm tra hai góc đã cho ở vị trí gì của nhau? (Trong cùng phía). Nếu là góc trong cùng phía, con cộng thử xem có bằng $180^\\circ$ không. Nếu bằng thì là song song. Sau đó con tìm góc đồng vị nhé.',
  'Tổng các góc xoay quanh một điểm là $360^\\circ$. Con lấy $360^\\circ$ trừ đi hai góc đã biết để tìm $\\widehat{COA}$ nhé. Sau đó, tia phân giác chia đôi mỗi góc, con lấy nửa của hai góc đầu tiên cộng lại để ra $\\widehat{DOE}$.',
  'Con hãy xem ở phần lý thuyết: "Hai đường thẳng phân biệt cùng vuông góc với đường thẳng thứ ba thì chúng như thế nào với nhau?". Hãy dùng dấu hiệu nhận biết (góc đồng vị) để giải thích tại sao nhé.',
  'Đường thẳng song song có tính chất "bắc cầu": Nếu $a$ song song $b$, $b$ song song $c$ thì góc tạo bởi đường cắt với $a, b, c$ đều bằng nhau hết con nhé. Hãy dựa vào tính chất góc đồng vị để giải thích.',
  'Con vẽ hình ra nhé: Tia phân giác $Om$ chia góc $\\widehat{xOy}$ làm hai nửa bằng nhau. Góc đối đỉnh $\\widehat{x\'Oy\'}$ cũng bằng $\\widehat{xOy}$. Tia đối của $Om$ cũng sẽ chia góc đối đỉnh làm hai nửa y hệt như vậy.',
  'Để hai đường thẳng song song thì hai góc đồng vị phải **bằng nhau**. Con hãy cho biểu thức của hai góc bằng nhau ($3x + 10^\\circ = 5x - 20^\\circ$) rồi giải tìm $x$. Sau khi có $x$, con thay số vào để tính góc.',
  'Ba điểm thẳng hàng khi chúng tạo thành một góc bẹt (bằng $180^\\circ$). Con hãy cộng hai góc kề nhau lại xem tổng của chúng có đúng bằng $180^\\circ$ không nhé.'
];

data.essays.forEach((essay, index) => {
  if (newHints[index]) {
    essay.hint = newHints[index];
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Updated chapter4.json successfully!');
