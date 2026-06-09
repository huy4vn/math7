const fs = require('fs');
const path = 'f:/Toan lop 7/math-revision-app/src/data/chapter8.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Cập nhật summary
data.summary += '\n\n---\n\n## 6. Một số định lý quan trọng khác\n\n' +
  '**a) Quan hệ giữa cạnh và góc đối diện trong tam giác:**\n' +
  '* Trong một tam giác, góc đối diện với cạnh lớn hơn là góc lớn hơn.\n' +
  '* Ngược lại, cạnh đối diện với góc lớn hơn là cạnh lớn hơn.\n\n' +
  '**b) Bất đẳng thức tam giác:**\n' +
  '* Trong một tam giác, độ dài của một cạnh bất kỳ luôn **nhỏ hơn tổng** và **lớn hơn hiệu** độ dài của hai cạnh còn lại.\n' +
  '* *Hệ quả (Dấu hiệu nhận biết ba cạnh tam giác):* Để kiểm tra 3 đoạn thẳng có tạo thành tam giác không, ta chỉ cần kiểm tra xem **tổng hai cạnh nhỏ nhất có lớn hơn cạnh dài nhất** hay không.\n\n' +
  '**c) Định lý Pythagore (trong tam giác vuông):**\n' +
  '* Bình phương cạnh huyền (cạnh dài nhất) bằng tổng bình phương của hai cạnh góc vuông.\n' +
  '* Nếu tam giác vuông tại $A$, ta có: $BC^2 = AB^2 + AC^2$.';

// Cập nhật lại các hint cho thân thiện với học sinh lớp 7 (giọng "Con hãy...")
const newHints = [
  'Bước 1: Con dùng tổng 3 góc trong tam giác ($180^\\circ$) để tính góc C. Bước 2: Con xếp 3 góc từ bé đến lớn. Góc nào lớn nhất thì cạnh đối diện với nó sẽ dài nhất nhé.',
  'Con hãy xét hai tam giác cần chứng minh. Đề cho tam giác cân nên có 2 cạnh bằng nhau. $M$ là trung điểm thì chia $BC$ làm 2 đoạn bằng nhau. Con dùng trường hợp Cạnh-Cạnh-Cạnh nhé!',
  'Từ hai tam giác bằng nhau ở câu trước, con sẽ suy ra được các cặp góc tương ứng bằng nhau. Nhớ là hai góc ở $M$ kề bù nhau (tổng $180^\\circ$) mà lại bằng nhau thì mỗi góc bằng bao nhiêu độ?',
  'Con hãy xét hai tam giác vuông $ABD$ và $EBD$. Chúng có chung cạnh huyền $BD$ và góc nhọn ở $B$ bằng nhau (do có phân giác). Con dùng trường hợp Cạnh huyền - Góc nhọn nhé.',
  'Con hãy nhớ Bất đẳng thức tam giác: "Tổng hai cạnh bất kỳ phải lớn hơn cạnh còn lại". Mẹo nhanh là con cứ lấy 2 cạnh ngắn nhất cộng lại xem có lớn hơn cạnh dài nhất không nhé.',
  'Trọng tâm $G$ chia đường trung tuyến làm 3 phần. Khoảng cách từ đỉnh đến $G$ chiếm 2 phần ($AG = \\frac{2}{3}AM$), đoạn từ $G$ đến đáy chiếm 1 phần. Con thay số vào tính nhé.',
  'Con hãy nối $M$ với $A$ và $B$. Sau đó gọi $H$ là trung điểm của $AB$. Xét hai tam giác vuông $MHA$ và $MHB$ để chứng minh chúng bằng nhau theo trường hợp 2 cạnh góc vuông.',
  'Con thấy $H$ là điểm cắt nhau của hai đường cao $BD$ và $CE$, vậy $H$ được gọi là Trực tâm. Mà trong tam giác, đường đi qua trực tâm và đỉnh thứ 3 sẽ đóng vai trò là đường gì?',
  'Tam giác vuông đã cho biết hai cạnh góc vuông rồi. Con hãy áp dụng định lý Pythagore: Cạnh huyền bình phương bằng tổng bình phương hai cạnh góc vuông nhé.',
  'Con hãy thử nhớ lại: Trong tam giác cân, đường kẻ từ đỉnh xuống đáy sẽ đóng cả 4 vai trò (trung tuyến, đường cao, trung trực, phân giác). Vậy giao điểm của chúng sẽ nằm ở đâu?'
];

data.essays.forEach((essay, index) => {
  if (newHints[index]) {
    essay.hint = newHints[index];
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Updated chapter8.json successfully!');
