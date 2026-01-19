// 📧 Contact JavaScript - RyumataHz

document.addEventListener('DOMContentLoaded', function() {
  initContactForm();
  initSocialHover();
  initAnimations();
});

// Contact Form Handler
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    
    // Validate form
    if (!validateForm(form)) {
      showNotification('請填寫所有必填欄位', 'error');
      return;
    }
    
    // Show loading state
    submitBtn.textContent = '發送中...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Simulate form submission (replace with actual API call)
    try {
      await simulateSubmit(form);
      
      // Show success message
      showSuccessMessage();
      
      // Reset form
      form.reset();
      
    } catch (error) {
      showNotification('發送失敗，請稍後再試', 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    }
  });
  
  // Real-time validation
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
    
    input.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        validateField(this);
      }
    });
  });
}

// Form Validation
function validateForm(form) {
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });
  
  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  
  // Remove previous error
  field.classList.remove('error');
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) existingError.remove();
  
  if (field.required && !value) {
    isValid = false;
  }
  
  if (field.type === 'email' && value && !isValidEmail(value)) {
    isValid = false;
  }
  
  if (!isValid) {
    field.classList.add('error');
    field.style.borderColor = '#ef4444';
    
    const errorMsg = document.createElement('span');
    errorMsg.className = 'field-error';
    errorMsg.textContent = getErrorMessage(field);
    errorMsg.style.cssText = 'color: #ef4444; font-size: 0.85rem; margin-top: 5px; display: block;';
    field.parentNode.appendChild(errorMsg);
  } else {
    field.style.borderColor = 'rgba(139, 92, 246, 0.2)';
  }
  
  return isValid;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getErrorMessage(field) {
  const messages = {
    name: '請輸入您的姓名',
    email: '請輸入有效的電子郵件地址',
    subject: '請輸入主題',
    message: '請輸入訊息內容',
    commissionType: '請選擇委託類型'
  };
  
  return messages[field.name] || '此欄位為必填';
}

// Simulate form submission
function simulateSubmit(form) {
  return new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });
}

// Show success message
function showSuccessMessage() {
  const formContainer = document.querySelector('.contact-form-container');
  const form = document.getElementById('contact-form');
  const successDiv = document.querySelector('.form-success');
  
  if (form && successDiv) {
    form.style.display = 'none';
    successDiv.classList.add('show');
    
    // Reset after 5 seconds
    setTimeout(() => {
      form.style.display = 'block';
      successDiv.classList.remove('show');
    }, 5000);
  }
  
  showNotification('訊息發送成功！', 'success');
}

// Social Links Hover Effect
function initSocialHover() {
  const socialBtns = document.querySelectorAll('.social-btn');
  
  socialBtns.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(8px)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0)';
    });
  });
}

// Scroll Animations
function initAnimations() {
  const animateElements = document.querySelectorAll('.contact-method, .social-btn, .likecoin-section, .form-group');
  
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

// LikeCoin Button Handler
function initLikeCoinButton() {
  const likeBtn = document.querySelector('.likecoin-button');
  if (!likeBtn) return;
  
  likeBtn.addEventListener('click', function() {
    // Replace with your LikeCoin username
    const username = 'ryumatahz';
    
    window.open(`https://like.co/${username}`, '_blank');
  });
}

// Copy to clipboard helper
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('已複製到剪貼簿！', 'success');
  }).catch(() => {
    showNotification('複製失敗', 'error');
  });
}
