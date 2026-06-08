const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Helper to draw right angle
function drawRightAngle(p, v1, v2, size = 15) {
  const p1 = { x: p.x + v1.x * size, y: p.y + v1.y * size };
  const p2 = { x: p.x + v1.x * size + v2.x * size, y: p.y + v1.y * size + v2.y * size };
  const p3 = { x: p.x + v2.x * size, y: p.y + v2.y * size };
  return `<polyline points="${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}" fill="none" stroke="black" stroke-width="1.5" />`;
}

// 1. Exam 1 Q4: Isosceles triangle ABC
const svg1 = `
<svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
  <polygon points="150,50 50,250 250,250" fill="none" stroke="black" stroke-width="2"/>
  <line x1="150" y1="50" x2="150" y2="250" stroke="black" stroke-width="2" stroke-dasharray="5,5"/>
  <text x="145" y="40" font-size="20" font-family="Arial">A</text>
  <text x="35" y="270" font-size="20" font-family="Arial">B</text>
  <text x="255" y="270" font-size="20" font-family="Arial">C</text>
  <text x="140" y="275" font-size="20" font-family="Arial">M</text>
  
  <!-- Right angle at M -->
  <polyline points="150,235 165,235 165,250" fill="none" stroke="black" stroke-width="1.5"/>
  
  <!-- Equality marks -->
  <line x1="95" y1="145" x2="105" y2="155" stroke="black" stroke-width="2"/>
  <line x1="195" y1="145" x2="205" y2="155" stroke="black" stroke-width="2"/>
  <line x1="100" y1="245" x2="100" y2="255" stroke="black" stroke-width="2"/>
  <line x1="200" y1="245" x2="200" y2="255" stroke="black" stroke-width="2"/>
  
  <!-- Points -->
  <circle cx="150" cy="50" r="3" fill="black"/>
  <circle cx="50" cy="250" r="3" fill="black"/>
  <circle cx="250" cy="250" r="3" fill="black"/>
  <circle cx="150" cy="250" r="3" fill="black"/>
</svg>
`;
fs.writeFileSync(path.join(outDir, 'exam_1_q4.svg'), svg1);

// 2. Exam 2 Q3: Right triangle ABC at A, bisector BD, DE perp BC
// AB=6, AC=8 => BC=10. Scale by 20 => AB=120, AC=160, BC=200
// A(50, 210), B(50, 90), C(210, 210)
// Bisector of B: angle B is atan(160/120) = 53.13 deg. Half angle = 26.565 deg.
// D is on AC. AD = AB * tan(B/2) = 120 * 0.5 = 60!
// So D is at (50 + 60, 210) = (110, 210).
// DE perp BC. E is on BC.
// B=(50, 90), C=(210, 210). Vector BC = (160, 120) => dir (4, 3).
// BE = BD * cos(B/2). BD = sqrt(120^2 + 60^2) = 134.16. BE = 120.
// Unit vector of BC is (4/5, 3/5). E = B + 120*(4/5, 3/5) = (50+96, 90+72) = (146, 162).
const svg2 = `
<svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,210 50,90 210,210" fill="none" stroke="black" stroke-width="2"/>
  <!-- Bisector BD -->
  <line x1="50" y1="90" x2="110" y2="210" stroke="black" stroke-width="2"/>
  <!-- DE perp BC -->
  <line x1="110" y1="210" x2="146" y2="162" stroke="black" stroke-width="2"/>
  
  <text x="35" y="225" font-size="20" font-family="Arial">A</text>
  <text x="35" y="85" font-size="20" font-family="Arial">B</text>
  <text x="215" y="225" font-size="20" font-family="Arial">C</text>
  <text x="110" y="235" font-size="20" font-family="Arial">D</text>
  <text x="155" y="160" font-size="20" font-family="Arial">E</text>
  
  <!-- Right angle at A -->
  <polyline points="50,195 65,195 65,210" fill="none" stroke="black" stroke-width="1.5"/>
  
  <!-- Right angle at E -->
  <!-- Vector ED = (-36, 48) => dir (-3, 4). Vector EB = (-96, -72) => dir (-4, -3) -->
  <polyline points="136.4,169.2 129.2,159.6 138.8,152.4" fill="none" stroke="black" stroke-width="1.5"/>
  
  <!-- Angle bisector marks -->
  <path d="M 50 115 A 25 25 0 0 0 62 114" fill="none" stroke="black" stroke-width="1.5"/>
  <path d="M 62 114 A 25 25 0 0 0 70 105" fill="none" stroke="black" stroke-width="1.5"/>
  
  <!-- Points -->
  <circle cx="50" cy="210" r="3" fill="black"/>
  <circle cx="50" cy="90" r="3" fill="black"/>
  <circle cx="210" cy="210" r="3" fill="black"/>
  <circle cx="110" cy="210" r="3" fill="black"/>
  <circle cx="146" cy="162" r="3" fill="black"/>
</svg>
`;
fs.writeFileSync(path.join(outDir, 'exam_2_q3.svg'), svg2);


// 3. Exam 3 Q3
// A(50, 250), B(50, 50), C(250, 250)
// M(150, 150)
// D(100, 100)
// H(110, 70), I(70, 190)
const svg3 = `
<svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,250 50,50 250,250" fill="none" stroke="black" stroke-width="2"/>
  <line x1="50" y1="50" x2="150" y2="150" stroke="black" stroke-width="2"/>
  <!-- AD extended to H -->
  <line x1="50" y1="250" x2="115" y2="55" stroke="black" stroke-width="1.5" stroke-dasharray="4,4"/>
  <!-- AD segment -->
  <line x1="50" y1="250" x2="110" y2="70" stroke="black" stroke-width="2"/>
  
  <!-- BH and CI -->
  <line x1="50" y1="50" x2="110" y2="70" stroke="black" stroke-width="2"/>
  <line x1="250" y1="250" x2="70" y2="190" stroke="black" stroke-width="2"/>
  
  <!-- Labels -->
  <text x="35" y="265" font-size="20" font-family="Arial">A</text>
  <text x="35" y="45" font-size="20" font-family="Arial">B</text>
  <text x="255" y="265" font-size="20" font-family="Arial">C</text>
  <text x="160" y="150" font-size="20" font-family="Arial">M</text>
  <text x="110" y="115" font-size="20" font-family="Arial">D</text>
  <text x="115" y="65" font-size="20" font-family="Arial">H</text>
  <text x="50" y="180" font-size="20" font-family="Arial">I</text>
  
  <!-- Right angle at A -->
  <polyline points="50,235 65,235 65,250" fill="none" stroke="black" stroke-width="1.5"/>
  
  <!-- Right angle at H (BH perp AD) -->
  <!-- AD dir = (1, -3), unit = (0.316, -0.948). HB = (-60, -20), unit = (-0.948, -0.316) -->
  <polyline points="106.84,79.48 97.36,76.32 100.52,66.84" fill="none" stroke="black" stroke-width="1.5"/>
  
  <!-- Right angle at I (CI perp AD) -->
  <!-- IC = (180, 60), unit = (0.948, 0.316). IA = (-20, 60), unit = (-0.316, 0.948) -->
  <polyline points="79.48,193.16 76.32,202.64 66.84,199.48" fill="none" stroke="black" stroke-width="1.5"/>
  
  <!-- Points -->
  <circle cx="50" cy="250" r="3" fill="black"/>
  <circle cx="50" cy="50" r="3" fill="black"/>
  <circle cx="250" cy="250" r="3" fill="black"/>
  <circle cx="150" cy="150" r="3" fill="black"/>
  <circle cx="100" cy="100" r="3" fill="black"/>
  <circle cx="110" cy="70" r="3" fill="black"/>
  <circle cx="70" cy="190" r="3" fill="black"/>
</svg>
`;
fs.writeFileSync(path.join(outDir, 'exam_3_q3.svg'), svg3);

console.log('SVGs generated successfully.');
