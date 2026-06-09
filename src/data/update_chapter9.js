const fs = require('fs');
const path = 'f:/Toan lop 7/math-revision-app/src/data/chapter9.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Cập nhật summary
data.summary += '\n\n---\n\n## 4. Ôn tập một số khái niệm thường gặp\n\n' +
  'Trong các bài toán xác suất rút thẻ hoặc gieo xúc xắc, đề bài thường nhắc đến các loại số sau:\n' +
  '* **Số chẵn:** Các số có tận cùng là $0, 2, 4, 6, 8$.\n' +
  '* **Số lẻ:** Các số có tận cùng là $1, 3, 5, 7, 9$.\n' +
  '* **Số nguyên tố:** Là số tự nhiên lớn hơn 1, chỉ có hai ước là 1 và chính nó (Ví dụ: $2, 3, 5, 7, 11...$).\n' +
  '* **Hợp số:** Là số tự nhiên lớn hơn 1, có nhiều hơn hai ước (Ví dụ: $4, 6, 8, 9, 10...$).\n' +
  '* *Lưu ý:* Số 0 và số 1 không phải là số nguyên tố cũng không phải là hợp số.';

// Cập nhật lại các hint cho thân thiện với học sinh lớp 7 (giọng "Con hãy...")
const newHints = [
  'Con hãy tính tổng xem trong hộp có tất cả bao nhiêu viên bi nhé. Xác suất bốc được bi đỏ sẽ bằng số bi đỏ chia cho tổng số bi trong hộp.',
  'Con hãy nhớ lại: Xúc xắc chỉ có số chấm từ 1 đến 6. Dựa vào đó con xét xem từng trường hợp có bao giờ xảy ra không (không thể), lúc nào cũng xảy ra (chắc chắn), hay hên xui (ngẫu nhiên)?',
  'Con hãy tưởng tượng con cầm xúc xắc 1 (có 6 mặt) và xúc xắc 2 (có 6 mặt). Con ghép số chấm của xúc xắc 1 với số chấm của xúc xắc 2 thành từng cặp nhé. Tổng cộng sẽ có $6 \\times 6$ kết quả.',
  'Dựa vào $36$ cặp ở bài trước, con hãy nhặt ra các cặp nào mà cộng 2 số lại ra đúng số $7$ (ví dụ mặt 1 và mặt 6). Sau đó lấy số cặp tìm được chia cho $36$ nhé.',
  'Số bạn học giỏi Toán chính là số kết quả thuận lợi đấy con. Con lấy số đó chia cho tổng số học sinh của cả lớp là ra ngay xác suất.',
  'Số chia hết cho cả 2 và 3 thì chắc chắn phải chia hết cho 6. Con hãy đếm xem từ 1 đến 15 có bao nhiêu số chia hết cho 6 nhé.',
  'Con hãy liệt kê ra giấy: lần 1 có thể Sấp (S) hoặc Ngửa (N), lần 2 cũng vậy, lần 3 cũng vậy. (Gợi ý: SSS, SSN...). Tổng sẽ có 8 kết quả. Xem có bao nhiêu trường hợp cả 3 chữ đều là S?',
  'Loại kẹo nào có số lượng nhiều nhất thì em bé dễ bốc trúng nhất. Con tìm xem đó là kẹo gì, rồi lấy số lượng đó chia cho tổng số kẹo trong túi nhé.',
  'Con xem phần lý thuyết cuối bài nhé: Số nguyên tố trên mặt xúc xắc (từ 1 đến 6) gồm những số nào? Đếm xem có mấy số rồi chia cho 6.',
  'Vòng quay có 8 ô. Con đếm xem từ 1 đến 8 có những số nào nhỏ hơn 4 (nhớ là không tính số 4 nhé). Số kết quả thuận lợi đó đem chia cho 8 là xong.'
];

data.essays.forEach((essay, index) => {
  if (newHints[index]) {
    essay.hint = newHints[index];
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Updated chapter9.json successfully!');
