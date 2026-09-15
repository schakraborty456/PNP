/**
 * PNP Industrial Solutions - Main JavaScript
 * Pure Vanilla JS, zero external frameworks
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle & Accordion Dropdowns
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  const dropdownNavItems = document.querySelectorAll('.nav-item.has-dropdown');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
      
      // Animate hamburger to X
      const bars = navToggle.querySelectorAll('.bar');
      if (isOpen) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });

    // Handle Dropdown Hover and Mobile Accordion Clicks
    dropdownNavItems.forEach(item => {
      // Desktop hover resilience
      item.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
          item.classList.add('dropdown-open');
        }
      });
      item.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
          item.classList.remove('dropdown-open');
        }
      });

      const trigger = item.querySelector('.nav-link');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            // Prevent instant jump if submenu exists, toggle accordion
            e.preventDefault();
            const wasOpen = item.classList.contains('is-open');
            // Close other accordions
            dropdownNavItems.forEach(other => other.classList.remove('is-open'));
            if (!wasOpen) {
              item.classList.add('is-open');
            }
          }
        });
      }
    });

    // Close menu when a destination link is clicked
    const closeMobileMenu = () => {
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      dropdownNavItems.forEach(item => item.classList.remove('is-open'));
      const bars = navToggle.querySelectorAll('.bar');
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    };

    // Submenu links close mobile menu
    dropdownItems.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Top links without dropdown close mobile menu
    navLinks.forEach(link => {
      const parent = link.closest('.has-dropdown');
      if (!parent) {
        link.addEventListener('click', closeMobileMenu);
      }
    });
  }

  // 2. Hero Slider Navigation
  const sliderDots = document.querySelectorAll('.slider-dot');
  let currentSlide = 1;
  const totalSlides = 3;

  const setSlide = (slideIndex) => {
    currentSlide = slideIndex;
    sliderDots.forEach(dot => {
      const dotSlide = parseInt(dot.getAttribute('data-slide'), 10);
      if (dotSlide === slideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

  sliderDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideNum = parseInt(dot.getAttribute('data-slide'), 10);
      setSlide(slideNum);
    });
  });

  // Auto advance hero slider gently every 6 seconds
  setInterval(() => {
    let nextSlide = currentSlide + 1;
    if (nextSlide > totalSlides) nextSlide = 1;
    setSlide(nextSlide);
  }, 6000);

  // 3. Media Carousel Controls
  const mediaCarousel = document.getElementById('mediaCarousel') || document.getElementById('mediaCardsRow');
  const mediaPrevBtn = document.getElementById('mediaPrevBtn');
  const mediaNextBtn = document.getElementById('mediaNextBtn');

  if (mediaCarousel && mediaPrevBtn && mediaNextBtn) {
    mediaNextBtn.addEventListener('click', () => {
      mediaCarousel.scrollBy({ left: 280, behavior: 'smooth' });
    });

    mediaPrevBtn.addEventListener('click', () => {
      mediaCarousel.scrollBy({ left: -280, behavior: 'smooth' });
    });
  }

  // 4. Video Modal Handling (YouTube Integrated)
  const videoModal = document.getElementById('videoModal');
  const closeVideoModal = document.getElementById('closeVideoModal');
  const playStoryBtn = document.getElementById('playStoryBtn');
  const playBuildingVideo = document.getElementById('playBuildingVideo');
  const videoModalTitle = document.getElementById('videoModalTitle');
  const videoIframe = document.getElementById('videoIframe');

  // Authentic Factory Tour Video (PNP Polymers Bhilad Plant)
  const PNP_YOUTUBE_EMBED = 'https://www.youtube-nocookie.com/embed/z4NXpOF_hn4?autoplay=1&rel=0';

  const openVideo = (title) => {
    if (videoModalTitle) videoModalTitle.textContent = title;
    if (videoIframe) {
      videoIframe.src = PNP_YOUTUBE_EMBED;
    }
    if (videoModal) {
      videoModal.classList.add('active');
      videoModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeVideo = () => {
    if (videoIframe) {
      videoIframe.src = '';
    }
    if (videoModal) {
      videoModal.classList.remove('active');
      videoModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (playStoryBtn) {
    playStoryBtn.addEventListener('click', () => {
      openVideo('NYTEX Nylon 6 Yarn Manufacturing | Factory Tour of PNP Polymers, Bhilad');
    });
  }

  if (playBuildingVideo) {
    playBuildingVideo.addEventListener('click', () => {
      openVideo('NYTEX Factory & Infrastructure Tour | Bhilad Plant');
    });
  }

  if (closeVideoModal) {
    closeVideoModal.addEventListener('click', closeVideo);
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeVideo();
      }
    });
  }

  // 5. Enquiry Modal Handling
  const enquiryModal = document.getElementById('enquiryModal');
  const openEnquireModal = document.getElementById('openEnquireModal');
  const openDealerLogin = document.getElementById('openDealerLogin');
  const openDownloadsLink = document.getElementById('openDownloadsLink');
  const closeEnquiryModal = document.getElementById('closeEnquiryModal');
  const getInTouchBtns = document.querySelectorAll('a[href="#enquire"]');
  const interestSelect = document.getElementById('interestCategory');

  const openEnquiry = (e, category = '') => {
    if (e && e.preventDefault) e.preventDefault();
    if (interestSelect && category) {
      interestSelect.value = category;
    }
    if (enquiryModal) {
      enquiryModal.classList.add('active');
      enquiryModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeEnquiry = () => {
    if (enquiryModal) {
      enquiryModal.classList.remove('active');
      enquiryModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  // Expose to window for inline onclick handlers across pages
  window.openEnquiry = openEnquiry;
  window.closeEnquiry = closeEnquiry;
  window.openVideo = openVideo;
  window.closeVideo = closeVideo;

  if (openEnquireModal) {
    openEnquireModal.addEventListener('click', (e) => openEnquiry(e));
  }

  if (openDealerLogin) {
    openDealerLogin.addEventListener('click', (e) => openEnquiry(e, 'dealer'));
  }

  getInTouchBtns.forEach(btn => {
    btn.addEventListener('click', (e) => openEnquiry(e));
  });

  if (closeEnquiryModal) {
    closeEnquiryModal.addEventListener('click', closeEnquiry);
  }

  // Close modals on clicking backdrop
  window.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideo();
    if (e.target === enquiryModal) closeEnquiry();
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideo();
      closeEnquiry();
    }
  });

  // 6. Navigation Active Indicator (Multi-Page & Scrollspy)
  const currentPath = window.location.pathname.toLowerCase();
  const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

  if (filename === 'index.html' || filename === '') {
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;

      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');
        const targetNav = document.querySelector(`.nav-links a[href='#${sectionId}']`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          if (targetNav) targetNav.classList.add('active');
        }
      });
    });
  } else {
    // Inner page active indicator
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = (link.getAttribute('href') || '').toLowerCase();
      if (href.startsWith(filename)) {
        link.classList.add('active');
      }
    });
  }

  // 7. Global Smooth Scroll & In-Page Navigation (Prevents Any Separate Page Navigation)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    // Never allow any link to open in a new tab or window
    if (link.getAttribute('target')) {
      link.removeAttribute('target');
    }

    const href = link.getAttribute('href') || '';

    // Mail and phone links work naturally
    if (href.startsWith('mailto:') || href.startsWith('tel:')) return;

    // Enquiry & modal triggers
    if (href === '#enquire' || href === '#dealer' || href === '#careers' || href === '#downloads') {
      e.preventDefault();
      const catMap = {
        '#dealer': 'dealer',
        '#downloads': 'downloads',
        '#careers': 'export'
      };
      openEnquiry(e, catMap[href] || '');
      return;
    }

    // Video modal trigger (YouTube links / media buttons)
    if (href.includes('youtube.com') || link.classList.contains('btn-youtube')) {
      e.preventDefault();
      openVideo();
      return;
    }

    // Top / Home navigation
    if (href === '#' || href === '#home') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Anchor navigation to internal sections
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetEl = document.querySelector(href);
      if (targetEl) {
        const headerOffset = 80;
        const elPos = targetEl.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elPos - headerOffset,
          behavior: 'smooth'
        });
      } else if (href === '#privacy' || href === '#terms' || href === '#sitemap') {
        openEnquiry(e, 'downloads');
      }
      return;
    }

    // Prevent any other relative or external page navigation
    e.preventDefault();
  });
});

