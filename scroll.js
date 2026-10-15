/**
 * Scroll & Animation Script
 * Handles Sticky Navbar, Active Navigation, Smooth Scroll, Scroll to Top, and Scroll Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.custom-navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const navLinks = document.querySelectorAll('.nav-link-custom');
  const sections = document.querySelectorAll('section[id]');

  // 1. Sticky Navbar & Scroll-to-Top Button Visibility
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Navbar style toggle
    if (navbar) {
      if (scrollPos > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll to Top Button toggle
    if (scrollTopBtn) {
      if (scrollPos > 350) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    // Active Navigation Highlighting (ScrollSpy)
    highlightActiveNav(scrollPos);
  });

  // 2. Active Nav Link Function
  function highlightActiveNav(scrollPos) {
    if (!sections.length || !navLinks.length) return;

    let currentSectionId = '';
    const offset = 120; // accounts for navbar height

    sections.forEach((section) => {
      const top = section.offsetTop - offset;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}` || href.endsWith(`#${currentSectionId}`)) {
          link.classList.add('active');
        }
      });
    }
  }

  // 3. Smooth Scroll to Top
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. Smooth Scrolling for Internal Hash Anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 5. Scroll Reveal Animation via IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal-fade-up');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach((el) => el.classList.add('active'));
  }
});

