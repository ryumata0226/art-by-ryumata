// 🦄 Main JavaScript - RyumataHz Portfolio

document.addEventListener('DOMContentLoaded', function() {
  initPageTransition();
  initScrollAnimations();
  initNavbarScroll();
  initSmoothScroll();
  initLikeCoinButton();
});

// Page Transition
function initPageTransition() {
  const body = document.body;
  body.classList.add('page-transition');
  
  // Trigger animation
  setTimeout(() => {
    body.classList.add('active');
  }, 100);
}

// Scroll Animations (Fade In)
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (fadeElements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  fadeElements.forEach(el => observer.observe(el));
}

// Navbar Scroll Effect
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.background = 'rgba(10, 10, 15, 0.95)';
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'rgba(10, 10, 15, 0.85)';
      navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// LikeCoin Button Integration
function initLikeCoinButton() {
  const likeBtn = document.querySelector('.likecoin-button');
  if (!likeBtn) return;
  
  likeBtn.addEventListener('click', function() {
    // Replace with your actual LikeCoin ID
    const likeCoinId = 'your-likecoin-id';
    
    if (window.LikeCoin) {
      window.LikeCoin.like();
    } else {
      // Fallback: Open LikeCoin page
      window.open(`https://like.co/${likeCoinId}`, '_blank');
    }
  });
}

// Utility: Debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Utility: Throttle
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
