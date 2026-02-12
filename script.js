const map = document.getElementById('map');
let scale = 1;

/* ===============================
   คลิกเพื่อซูม (เฉพาะเมื่อไม่ได้คลิก Marker)
================================ */
map.addEventListener('click', e => {
  // ตรวจสอบว่าคลิกที่พื้นหลังแผนที่ ไม่ได้คลิกโดน marker
  if (e.target.classList.contains('marker') || e.target.closest('.marker')) return;

  const rect = map.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const percentX = (x / rect.width) * 100;
  const percentY = (y / rect.height) * 100;

  console.log(`top:${percentY.toFixed(2)}% left:${percentX.toFixed(2)}%`);

  scale = Math.min(scale + 0.5, 4);
  map.style.transformOrigin = `${percentX}% ${percentY}%`;
  map.style.transform = `scale(${scale})`;
});

/* ===============================
   คลิกขวา → ซูมออก
================================ */
map.addEventListener('contextmenu', e => {
  e.preventDefault();
  scale = Math.max(scale - 0.5, 1);
  map.style.transform = `scale(${scale})`;
});

/* ข้อมูลจุด */
const points = [
  { top: '42.32%', left: '28.59%', name: 'ค่ายทหาร-แต่ไม่รู้จุดแน่ชัด', images: ['11111.jpg'] },
  { top: '70.54%', left: '65.82%', name: '403-เกิดตรงนี้แต่ไม่รู้จุดแน่ชัด', images: ['11111.jpg'] },
  { top: '60.98%', left: '58.11%', name: '723-เกิดตรงนี้แต่ไม่รู้จุดแน่ชัด', images: ['1111.jpg'] },
  { top: '75.72%', left: '32.79%', name: '611-เกิดตรงนี้แต่ไม่รู้จุดแน่ชัด', images: ['ๅๅๅๅ.jpg'] },
  { top: '15.15%', left: '45.07%', name: '3019', images: ['3019.jpg'] },
  { top: '31.94%', left: '48.66%', name: '2006', images: ['2006.jpg'] },
  { top: '16.52%', left: '57.25%', name: '3029', images: ['3029.jpg'] },
  { top: '62.83%', left: '51.28%', name: '596', images: ['596.jpg'] },
  { top: '20.83%', left: '40.49%', name: '3004-หลังบ้าน', images: ['3004.jpg'] },
  { top: '19.31%', left: '68.37%', name: 'mount gordo', images: ['mount gordo.jpg'] },
  { top: '22.78%', left: '49.78%', name: 'เขาโคเคนตรง-ufo', images: ['เขาโคเคน.jpg'] },
  { top: '88.81%', left: '42.26%', name: '40-บนเรือ', images: ['40.jpg'] },
  { top: '64.01%', left: '33.42%', name: '845', images: ['845.jpg'] },
  { top: '32.98%', left: '28.50%', name: '2001', images: ['2001.jpg'] },
  { top: '66.39%', left: '33.37%', name: '648', images: ['648-1.jpg', '648-2.jpg'] },
  { top: '36.50%', left: '36.40%', name: 'เขาค่ายทหาร', images: ['ๅ1.jpg'] },
  { top: '29.45%', left: '31.97%', name: 'ข้างเต่า', images: ['ๅ1.jpg'] },
  { top: '91.29%', left: '55.67%', name: '17', images: ['17-1.jpg', '17-2.jpg'] },
  { top: '57.09%', left: '20.29%', name: '901', images: ['901.jpg'] },
  { top: '44.69%', left: '43.43%', name: '912-ซ้ายมือของหน้าบ้าน', images: ['912.jpg'] },
  { top: '63.51%', left: '21.52%', name: '805', images: ['805.jpg'] },
  { top: '58.64%', left: '19.94%', name: '904', images: ['904.jpg'] },
  { top: '70.44%', left: '27.91%', name: '601', images: ['601.jpg'] },
  { top: '38.32%', left: '46.34%', name: '1007', images: ['1007.jpg'] },
  { top: '52.24%', left: '45.59%', name: '707', images: ['707-1.jpg'] },
  { top: '51.68%', left: '45.54%', name: '707', images: ['707.jpg'] },
  { top: '69.39%', left: '43.83%', name: '539', images: ['539.jpg'] },
  { top: '57.37%', left: '51.81%', name: '719', images: ['719.jpg'] },
  { top: '81.97%', left: '36.06%', name: '311', images: ['311.jpg'] },
  { top: '62.39%', left: '29.78%', name: '818เกิดบ่อย', images: ['818.jpg'] },
  { top: '57.82%', left: '47.31%', name: '717', images: ['717.jpg'] },
  { top: '68.10%', left: '41.10%', name: '505', images: ['505.jpg'] },
  { top: '68.65%', left: '52.01%', name: '405', images: ['405.jpg'] },
  { top: '92.73%', left: '55.21%', name: '18', images: ['18.jpg'] },
  { top: '49.75%', left: '43.68%', name: 'เขา NT', images: ['เขาNT-1.jpg'] },
  { top: '70.05%', left: '47.50%', name: '584', images: ['584-1.jpg'] },
  { top: '89.23%', left: '44.79%', name: '30', images: ['30.jpg'] }
];

/* สร้าง marker */
points.forEach(p => {
  const m = document.createElement('div');
  m.className = 'marker';
  m.style.top = p.top;
  m.style.left = p.left;

  m.innerHTML = `
  <span class="marker-label">${p.name}</span>
  <div class="popup">
    <img src="${p.images[0]}">
    <p>${p.name}</p>
  </div>
`;

  m.addEventListener('click', e => {
    e.stopPropagation(); // หยุดการซูมของแผนที่เมื่อคลิกจุด
    openGallery(p);
  });

  map.appendChild(m);
});

/* Gallery */
function openGallery(point) {
  let index = 0;
  const overlay = document.createElement('div');
  overlay.className = 'gallery-overlay';

  const box = document.createElement('div');
  box.className = 'gallery-box';
  box.onclick = (e) => e.stopPropagation(); // คลิกใน box แล้ว gallery ไม่ปิด

  const img = document.createElement('img');
  img.src = point.images[index];

  const left = document.createElement('div');
  left.innerHTML = '❮';
  left.className = 'nav-btn left';
  left.onclick = () => {
    index = (index - 1 + point.images.length) % point.images.length;
    img.src = point.images[index];
  };

  const right = document.createElement('div');
  right.innerHTML = '❯';
  right.className = 'nav-btn right';
  right.onclick = () => {
    index = (index + 1) % point.images.length;
    img.src = point.images[index];
  };

  box.appendChild(left);
  box.appendChild(img);
  box.appendChild(right);
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  overlay.onclick = () => overlay.remove();
}