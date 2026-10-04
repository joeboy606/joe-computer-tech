// Navigation Mobile Menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isActive = navLinks.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isActive);
    menuToggle.setAttribute('aria-label', isActive ? 'Close menu' : 'Open menu');
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
    });
  });
}

// Close mobile menu when scrolling
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (navLinks.classList.contains('active') && currentScroll > 80) {
    navLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  }
  
  // Header scroll effect with transition
  const header = document.querySelector('header');
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Smooth scroll hiding/showing based on direction
  if (currentScroll > lastScroll && currentScroll > 200) {
    header.classList.add('hiding');
  } else {
    header.classList.remove('hiding');
  }
  
  lastScroll = currentScroll;
});

// Reveal elements on scroll with enhanced observer
const revealElements = document.querySelectorAll('.project-card, .skill-category, .strength-item, .about-content p, .approach-content li, .section, .education-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.transitionDelay = entry.target.dataset.delay || '0s';
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -80px 0px'
});

if (revealElements.length > 0) {
  revealElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(60px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    el.style.transitionDelay = `${index * 0.1}s`;
    revealObserver.observe(el);
  });
}

// Sticky header shadow with gradient
const header = document.querySelector('header');
if (header) {
  header.style.backdropFilter = 'blur(20px)';
}

// Enhanced smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight + 8;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Parallax effect for hero background with reduced motion support
const heroBg = document.querySelector('.hero-bg');

if (heroBg) {
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollPosition = window.pageYOffset;
        const maxMove = 30;
        const blurAmount = Math.min(Math.abs(scrollPosition) * 0.015, 12);
        
        heroBg.style.transform = `translateY(${scrollPosition * 0.2}px) translateX(${scrollPosition * 0.05}px)`;
        heroBg.style.backgroundSize = `${100 + scrollPosition * 0.08}%`;
        heroBg.style.boxShadow = `0 40px 80px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(233, 69, 96, 0.1)`;
        ticking = false;
      });
    }
    ticking = true;
  });
}

// Staggered skill progress animations on scroll
const skillProgressBars = document.querySelectorAll('.skill-progress-bar');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBar = entry.target;
      const progressWidth = progressBar.style.width;
      progressBar.style.width = '0';
      
      setTimeout(() => {
        progressBar.style.width = progressWidth;
      }, 100);
    }
  });
}, {
  threshold: 0.3,
  rootMargin: '0px 0px -60px 0px'
});

skillProgressBars.forEach(bar => {
  const width = bar.style.width;
  skillObserver.observe(bar);
});

// Enhanced cursor trail with multiple modes
const cursorTrail = document.createElement('div');
cursorTrail.className = 'cursor-trail';
cursorTrail.style.cssText = `
  position: fixed;
  width: 30px;
  height: 30px;
  border: 2px solid var(--primary);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: opacity 0.2s ease, transform 0.1s ease;
  box-shadow: 0 0 20px rgba(233, 69, 96, 0.1);
`;
document.body.appendChild(cursorTrail);

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;
let isHovering = false;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  trailX += (mouseX - trailX) * 0.15;
  trailY += (mouseY - trailY) * 0.15;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top = trailY + 'px';
  
  if (isHovering) {
    cursorTrail.style.transform = 'translate(-50%, -50%) scale(1.5)';
    cursorTrail.style.width = '50px';
    cursorTrail.style.height = '50px';
    cursorTrail.style.borderWidth = '3px';
  } else {
    cursorTrail.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorTrail.style.width = '30px';
    cursorTrail.style.height = '30px';
    cursorTrail.style.borderWidth = '2px';
  }
  
  requestAnimationFrame(animateCursor);
}

animateCursor();

// Hover enlargement for skill cards and strength items with trail effects
const hoverableElements = document.querySelectorAll('.skill-category, .strength-item, .project-card');

hoverableElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    isHovering = true;
    cursorTrail.style.transition = 'transform 0.1s ease, width 0.1s ease, border-width 0.1s ease';
  });
  
  el.addEventListener('mouseleave', () => {
    isHovering = false;
    cursorTrail.style.transition = 'transform 0.2s ease, width 0.2s ease, border-width 0.2s ease';
  });
});

// Ripple effect for buttons
const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
    `;
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
}

// Floating effect for decorative elements
document.addEventListener('DOMContentLoaded', () => {
  const floatingElements = document.querySelectorAll('.hero-bg-pattern > div');
  
  floatingElements.forEach((el, index) => {
    const baseAnimation = index * 2;
    el.style.animation = `float 20s ease-in-out infinite ${baseAnimation}s`;
  });
});

// Skill category hover with gradient border
const skillCategories = document.querySelectorAll('.skill-category');

skillCategories.forEach(category => {
  category.addEventListener('mouseenter', () => {
    // Already handled via CSS variables
  });
});

// Reduce motion respect
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealObserver.disconnect();
  skillObserver.disconnect();
  skillProgressBars.forEach(bar => {
    bar.style.transition = 'width 0.5s ease';
    bar.style.width = bar.style.getAttribute('--progress-width');
  });
  cursorTrail.style.transition = 'opacity 0.01s ease';
  cursorTrail.style.width = '30px';
  cursorTrail.style.height = '30px';
}