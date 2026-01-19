// 💰 Commission JavaScript - RyumataHz

document.addEventListener('DOMContentLoaded', function() {
  initPricingCards();
  initFloatingDecorations();
  initFAQ();
  initAnimations();
});

// Pricing Cards Hover Effect
function initPricingCards() {
  const cards = document.querySelectorAll('.pricing-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Floating Decorations Background
function initFloatingDecorations() {
  const container = document.querySelector('.commission-page');
  if (!container) return;
  
  const decorations = [
    { emoji: '🎨', size: 60, left: '5%', top: '20%', delay: 0 },
    { emoji: '✏️', size: 40, left: '85%', top: '15%', delay: 0.5 },
    { emoji: '✨', size: 50, left: '15%', top: '70%', delay: 1 },
    { emoji: '🌟', size: 35, left: '80%', top: '75%', delay: 1.5 },
    { emoji: '🎭', size: 45, left: '50%', top: '85%', delay: 2 },
    { emoji: '💫', size: 55, left: '90%', top: '40%', delay: 2.5 },
    { emoji: '🖌️', size: 38, left: '10%', top: '45%', delay: 3 },
  ];
  
  decorations.forEach((dec, index) => {
    const elem = document.createElement('div');
    elem.className = 'floating-artwork';
    elem.innerHTML = dec.emoji;
    elem.style.cssText = `
      font-size: ${dec.size}px;
      left: ${dec.left};
      top: ${dec.top};
      animation-delay: ${dec.delay}s;
      animation-duration: ${8 + Math.random() * 4}s;
    `;
    container.appendChild(elem);
  });
}

// FAQ Accordion
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (!question || !answer) return;
    
    question.addEventListener('click', function() {
      const isOpen = item.classList.contains('active');
      
      // Close all others
      faqItems.forEach(i => {
        i.classList.remove('active');
        if (i.querySelector('.faq-answer')) {
          i.querySelector('.faq-answer').style.maxHeight = '0';
        }
      });
      
      // Toggle current
      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// Scroll Animations
function initAnimations() {
  const animateElements = document.querySelectorAll('.pricing-card, .process-item, .note-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(el);
  });
}

// Pricing Card Select
function selectPricing(plan) {
  // Scroll to contact form or open modal
  const contactForm = document.querySelector('#commission-form');
  if (contactForm) {
    contactForm.scrollIntoView({ behavior: 'smooth' });
    
    // Pre-select the plan
    const planSelect = contactForm.querySelector('#commission-type');
    if (planSelect) {
      planSelect.value = plan;
    }
  }
  
  // Visual feedback
  showNotification(`已選擇 ${plan} 方案`, 'success');
}

// Notification System
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()">×</button>
  `;
  
  notification.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 16px 24px;
    background: ${type === 'success' ? 'linear-gradient(135deg, #20E3B2, #29C7AC)' : 'var(--bg-card)'};
    color: var(--text-primary);
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(139, 92, 246, 0.2);
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out forwards';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100px); opacity: 0; }
  }
`;
document.head.appendChild(style);
