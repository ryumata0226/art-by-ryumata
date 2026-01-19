// 🎨 Portfolio JavaScript - RyumataHz

document.addEventListener('DOMContentLoaded', function() {
  initPortfolioFilter();
  initLightbox();
  initAnimations();
});

// Portfolio Data
const portfolioItems = [
  { id: 1, category: 'character', title: '火焰精靈', type: '角色設計', image: 'images/works/work1.jpg', tags: ['原創', '奇幻'] },
  { id: 2, category: 'illustration', title: '星空下的約定', type: '插畫', image: 'images/works/work2.jpg', tags: ['場景', '夜景'] },
  { id: 3, category: 'character', title: '機械少女', type: '角色設計', image: 'images/works/work3.jpg', tags: ['原創', '科幻'] },
  { id: 4, category: 'illustration', title: '春日漫步', type: '插畫', image: 'images/works/work4.jpg', tags: ['場景', '自然'] },
  { id: 5, category: 'commission', title: '委託作品 A', type: '委託', image: 'images/works/work5.jpg', tags: ['委託', '角色'] },
  { id: 6, category: 'character', title: '精靈王子', type: '角色設計', image: 'images/works/work6.jpg', tags: ['原創', '奇幻'] },
  { id: 7, category: 'illustration', title: '雨中城市', type: '插畫', image: 'images/works/work7.jpg', tags: ['場景', '都市'] },
  { id: 8, category: 'commission', title: '委託作品 B', type: '委託', image: 'images/works/work8.jpg', tags: ['委託', '插畫'] },
  { id: 9, category: 'character', title: '水系法師', type: '角色設計', image: 'images/works/work9.jpg', tags: ['原創', '奇幻'] },
];

let currentFilter = 'all';
let currentLightboxIndex = 0;

// Filter Functionality
function initPortfolioFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const portfolioGrid = document.querySelector('.portfolio-grid');
  
  if (!filterTabs.length || !portfolioGrid) return;
  
  filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const filter = this.dataset.filter;
      
      // Update active state
      filterTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      currentFilter = filter;
      renderPortfolio(filter);
    });
  });
  
  // Initial render
  renderPortfolio('all');
}

function renderPortfolio(filter) {
  const portfolioGrid = document.querySelector('.portfolio-grid');
  if (!portfolioGrid) return;
  
  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);
  
  portfolioGrid.innerHTML = filteredItems.map((item, index) => `
    <div class="portfolio-item" data-category="${item.category}" onclick="openLightbox(${index}, '${filter}')">
      <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x533/1a1a25/8b5cf6?text=${encodeURIComponent(item.title)}'">
      <div class="portfolio-overlay">
        <h3>${item.title}</h3>
        <p>${item.type}</p>
        <div class="portfolio-tags">
          ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
  
  // Animate items
  setTimeout(() => {
    const items = portfolioGrid.querySelectorAll('.portfolio-item');
    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('show');
      }, index * 100);
    });
  }, 100);
}

// Lightbox Functionality
function initLightbox() {
  const lightbox = document.querySelector('.lightbox');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  
  if (!lightbox) return;
  
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => navigateLightbox(-1));
  nextBtn.addEventListener('click', () => navigateLightbox(1));
  
  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

function openLightbox(index, filter) {
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-content');
  const lightboxTitle = document.querySelector('.lightbox-title');
  
  const filteredItems = filter === 'all' ? portfolioItems : portfolioItems.filter(item => item.category === filter);
  currentLightboxIndex = index;
  
  const item = filteredItems[index];
  
  lightboxImg.src = item.image;
  lightboxImg.alt = item.title;
  lightboxTitle.textContent = item.title;
  
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.querySelector('.lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  const filteredItems = currentFilter === 'all' ? portfolioItems : portfolioItems.filter(item => item.category === currentFilter);
  
  currentLightboxIndex += direction;
  
  if (currentLightboxIndex < 0) {
    currentLightboxIndex = filteredItems.length - 1;
  } else if (currentLightboxIndex >= filteredItems.length) {
    currentLightboxIndex = 0;
  }
  
  const item = filteredItems[currentLightboxIndex];
  const lightboxImg = document.querySelector('.lightbox-content');
  
  lightboxImg.style.opacity = '0';
  
  setTimeout(() => {
    lightboxImg.src = item.image;
    lightboxImg.alt = item.title;
    lightboxImg.style.opacity = '1';
  }, 200);
}

// Scroll Animations
function initAnimations() {
  const items = document.querySelectorAll('.portfolio-item, .filter-tab');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.1 });
  
  items.forEach(item => {
    item.style.animationPlayState = 'paused';
    observer.observe(item);
  });
}
