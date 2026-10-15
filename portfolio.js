/**
 * Portfolio Data and Interactive Filter/Modal Script
 */
const portfolioProjects = [
  {
    id: 1,
    category: 'graphic',
    categoryName: 'Graphic Design',
    title: 'ANYONE CAN GO TO SPACE',
    desc: 'งานออกแบบอัตลักษณ์องค์กรและคู่มือแบรนด์ สไตล์มินิมอลผสานความล้ำสมัย พร้อมชุดไอคอนและโมเดลจำลอง',
    fullDesc: 'โปสเตอร์ภาพยนตร์ในรายวิชาที่การออกแบบสื่อสิ่งพิมพ์',
    tools: ['Photoshop', 'Canva'],
    image: 'assets/images/grap.jpg',
    date: 'มกราคม 2026'
  },
  {
    id: 2,
    category: 'photo',
    categoryName: 'Photography',
    title: 'Photography For advertising',
    desc: 'ชุดภาพถ่ายภาพเพื่อโฆษณา',
    fullDesc: 'การจัดองค์ประกอบภาพถ่าย โดยใช้เทคนิค Color Grading เพื่อดึงมิติความลึกของแสงและเงาให้คมชัดสมจริง',
    tools: ['Photoshop', 'Canva'],
    image: 'assets/images/photograp.jpg',
    // ใส่รูปภาพหลายๆ รูปใน array นี้ (สามารถเพิ่มชื่อรูปภาพคั่นด้วยจุลภาคได้เรื่อยๆ)
    images: [
      'assets/images/photograp.jpg',
      'assets/images/photo1.jpg',
      'assets/images/photo2.jpg'
    ],
    date: 'ธันวาคม 2025'
  },
  {
    id: 3,
    category: 'video',
    categoryName: 'Video Editing',
    title: 'Cinematic Video Editing',
    desc: 'การตัดต่อหนังสั้น พร้อมเทคนิค Sound Design',
    fullDesc: 'ผลงานการตัดต่อที่เน้น SPX เพื่อให้ภาพเคลื่อนไหวกลมกลืนกับดนตรีอย่างสมบูรณ์แบบ เสริมด้วย Sound FX ที่สร้างมิติบรรยากาศ และการทำเกรดสีในมาตรฐาน DaVinci Wide Gamut เพื่อคุณภาพระดับภาพยนตร์',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    image: 'assets/images/ve.png',
    date: 'พฤศจิกายน 2025'
  },
  
];

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.portfolio-item-wrapper');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const itemCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === itemCategory) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  const projectModalElement = document.getElementById('projectDetailModal');
  if (projectModalElement) {
    const modalImage = document.getElementById('modalProjectImg');
    const modalVideo = document.getElementById('modalProjectVideo');
    const modalGallery = document.getElementById('modalGalleryThumbnails');
    const modalCategory = document.getElementById('modalProjectCategory');
    const modalTitle = document.getElementById('modalProjectTitle');
    const modalDesc = document.getElementById('modalProjectDesc');
    const modalTools = document.getElementById('modalProjectTools');
    const modalDate = document.getElementById('modalProjectDate');

    document.querySelectorAll('.open-project-modal').forEach((btn) => {
      btn.addEventListener('click', function () {
        const projectId = parseInt(this.getAttribute('data-project-id'));
        const project = portfolioProjects.find((p) => p.id === projectId);

        if (project) {
          const mediaUrl = project.video || project.image || '';
          const isVideo = mediaUrl.match(/\.(mp4|webm|ogg|mov)$/i);

          if (isVideo) {
            if (modalImage) modalImage.classList.add('d-none');
            if (modalVideo) {
              modalVideo.classList.remove('d-none');
              modalVideo.src = mediaUrl;
              modalVideo.load();
            }
          } else {
            if (modalVideo) {
              modalVideo.pause();
              modalVideo.src = '';
              modalVideo.classList.add('d-none');
            }
            if (modalImage) {
              modalImage.classList.remove('d-none');
              modalImage.src = mediaUrl;
            }
          }

          // จัดการแสดงภาพหลายภาพ (Gallery Thumbnails)
          if (modalGallery) {
            modalGallery.innerHTML = '';
            const imgList = (project.images && project.images.length > 1) ? project.images : [];

            if (!isVideo && imgList.length > 1) {
              modalGallery.classList.remove('d-none');
              imgList.forEach((imgSrc, index) => {
                const thumb = document.createElement('img');
                thumb.src = imgSrc;
                thumb.alt = `Thumbnail ${index + 1}`;
                thumb.className = `rounded border ${index === 0 ? 'border-danger' : 'border-secondary border-opacity-50'}`;
                thumb.style.cssText = 'width: 75px; height: 55px; object-fit: cover; cursor: pointer; transition: all 0.2s ease;' + (index === 0 ? 'opacity: 1; transform: scale(1.05);' : 'opacity: 0.6;');

                thumb.addEventListener('click', function () {
                  if (modalImage) modalImage.src = imgSrc;
                  modalGallery.querySelectorAll('img').forEach(t => {
                    t.className = 'rounded border border-secondary border-opacity-50';
                    t.style.opacity = '0.6';
                    t.style.transform = 'scale(1)';
                  });
                  this.className = 'rounded border border-danger shadow';
                  this.style.opacity = '1';
                  this.style.transform = 'scale(1.05)';
                });

                modalGallery.appendChild(thumb);
              });
            } else {
              modalGallery.classList.add('d-none');
            }
          }

          if (modalCategory) modalCategory.textContent = project.categoryName;
          if (modalTitle) modalTitle.textContent = project.title;
          if (modalDesc) modalDesc.textContent = project.fullDesc || project.desc;
          if (modalDate) modalDate.textContent = project.date;

          if (modalTools) {
            modalTools.innerHTML = '';
            project.tools.forEach((tool) => {
              const badge = document.createElement('span');
              badge.className = 'badge bg-dark border border-secondary text-light px-3 py-2 me-2 mb-2';
              badge.textContent = tool;
              modalTools.appendChild(badge);
            });
          }
        }
      });
    });

    projectModalElement.addEventListener('hidden.bs.modal', function () {
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
        modalVideo.src = '';
      }
    });
  }
});
