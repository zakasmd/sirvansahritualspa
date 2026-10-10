/**
 * ŞİRVANŞAH RİTUAL MASSAGE BAKU
 * Clean & Fast Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Mobile Menu Toggle ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
      }
    });
  }

  // --- 2. Sticky Header & Active Link Tracking ---
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let currentSection = '';
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });


  // --- 4. Lightbox Gallery ---
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxBackdrop = document.querySelector('.lightbox-backdrop');

  const galleryData = [];
  galleryItems.forEach(item => {
    const img = item.querySelector('.gallery-img');
    const title = item.querySelector('.gallery-title')?.innerText || '';
    galleryData.push({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt') || title,
      title: title
    });
  });

  let currentGalleryIndex = 0;

  function showLightbox(index) {
    if (index < 0) index = galleryData.length - 1;
    if (index >= galleryData.length) index = 0;
    currentGalleryIndex = index;

    lightboxImg.src = galleryData[currentGalleryIndex].src;
    lightboxImg.alt = galleryData[currentGalleryIndex].alt;
    lightboxCaption.innerText = galleryData[currentGalleryIndex].title;
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      showLightbox(index);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => showLightbox(currentGalleryIndex - 1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => showLightbox(currentGalleryIndex + 1));

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showLightbox(currentGalleryIndex - 1);
    if (e.key === 'ArrowRight') showLightbox(currentGalleryIndex + 1);
  });

});
