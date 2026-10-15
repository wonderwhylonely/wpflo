/**
 * Personal Portfolio Main Script
 * Handles Preloader, Mobile Drawer, Typing Animation, and Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    function hidePreloader() {
      preloader.classList.add('fade-out');
      setTimeout(() => { preloader.style.display = 'none'; }, 400);
    }
    window.addEventListener('load', () => setTimeout(hidePreloader, 200));
    setTimeout(hidePreloader, 600);
  }

  // 2. Mobile Drawer Navigation
  const mobileToggleBtn = document.getElementById('mobileMenuToggle');
  const navMenuCollapse = document.getElementById('navMenuCollapse');
  const navBackdrop = document.getElementById('navBackdrop');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const mobileNavLinks = document.querySelectorAll('.nav-menu-collapse .nav-link-personal');

  function openMobileMenu() {
    if (navMenuCollapse) navMenuCollapse.classList.add('show');
    if (navBackdrop) navBackdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (navMenuCollapse) navMenuCollapse.classList.remove('show');
    if (navBackdrop) navBackdrop.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openMobileMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);
  if (navBackdrop) navBackdrop.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  // 3. Typing Effect for Subtitle (Personal Template Style)
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
     const roles = [
      'unemployed'
      
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function type() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 40;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingDelay = 1800; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 300;
      }

      setTimeout(type, typingDelay);
    }

    type();
  }

  // 4. Contact Form Simulated Submission
  const contactForm = document.getElementById('portfolioContactForm');
  const toastNotification = document.getElementById('toastNotification');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังส่ง...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        showToast('ขอบคุณสำหรับข้อความ! ได้รับข้อมูลติดต่อเรียบร้อยแล้ว');
      }, 1000);
    });
  }

  function showToast(message) {
    if (toastNotification) {
      const msgEl = toastNotification.querySelector('.toast-message');
      if (msgEl) msgEl.textContent = message;
      toastNotification.classList.add('show');
      setTimeout(() => {
        toastNotification.classList.remove('show');
      }, 4000);
    }
  }
});
