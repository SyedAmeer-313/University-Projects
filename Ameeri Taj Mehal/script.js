const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

const header = $('.site-header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40));

const menuToggle = $('.menu-toggle');
const nav = $('.nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});
$$('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
$$('.reveal').forEach(el => observer.observe(el));

const modal = $('#bookingModal');
const category = $('#category');
const openModal = (preset='') => {
  if (preset) category.value = preset;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => (category.value ? $('#bookingForm input') : $('#bookingForm input'))?.focus(), 150);
};
const closeModal = () => {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
};
$$('.open-booking').forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.category || '')));
$$('.close-modal').forEach(btn => btn.addEventListener('click', closeModal));
document.addEventListener('keydown', e => { if(e.key === 'Escape'){ closeModal(); closeLightbox(); } });

const form = $('#bookingForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  const msg =
`*Ameeri Taj Mahal — Booking Enquiry*

Name: ${data.get('name')}
Phone: ${data.get('phone')}
Event: ${data.get('category')}
Preferred date: ${data.get('date')}
Guests: ${data.get('guests') || 'Not specified'}
Time: ${data.get('time')}
Notes: ${data.get('notes') || 'None'}

Please let me know availability and the final negotiable price.`;
  const url = `https://wa.me/923110000284?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener');
  $('#toast').classList.add('show');
  setTimeout(() => $('#toast').classList.remove('show'), 3500);
});

const lightbox = $('#lightbox'), lightboxImage = $('#lightboxImage'), lightboxCaption = $('#lightboxCaption');
function openLightbox(src, caption, alt='Gallery image'){
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightboxCaption.textContent = caption;
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeLightbox(){
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
$$('.gallery-item').forEach(item => item.addEventListener('click', () =>
  openLightbox(item.dataset.image, item.dataset.caption, item.querySelector('img').alt)
));
$('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });

$$('.festival-card').forEach(card => card.addEventListener('click', () => openModal(card.dataset.category)));

const dateInput = document.querySelector('input[type="date"]');
if (dateInput) {
  const today = new Date();
  const local = new Date(today.getTime() - today.getTimezoneOffset()*60000).toISOString().slice(0,10);
  dateInput.min = local;
}
$('#year').textContent = new Date().getFullYear();
/* =========================================================
   AMEERI TAJ MAHAL — 3D EFFECTS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ---------- 3D HERO ---------- */

    const hero = document.querySelector(".hero");
    const heroImage = document.querySelector(".hero-image");
    const heroContent = document.querySelector(".hero-content");

    if (hero) {

        hero.addEventListener("mousemove", function (e) {

            const rect = hero.getBoundingClientRect();

            const mouseX =
                (e.clientX - rect.left) / rect.width - 0.5;

            const mouseY =
                (e.clientY - rect.top) / rect.height - 0.5;

            if (heroImage) {

                heroImage.style.transform =
                    `scale(1.08)
                     translate(${mouseX * -18}px,
                               ${mouseY * -12}px)`;
            }

            if (heroContent) {

                heroContent.style.transform =
                    `translate(${mouseX * 12}px,
                               ${mouseY * 8}px)`;
            }
        });

        hero.addEventListener("mouseleave", function () {

            if (heroImage) {
                heroImage.style.transform = "scale(1.08)";
            }

            if (heroContent) {
                heroContent.style.transform = "translate(0,0)";
            }
        });
    }


    /* ---------- 3D GALLERY ---------- */

    document
        .querySelectorAll(".gallery-item")
        .forEach(function (card) {

            card.addEventListener("mousemove", function (e) {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    (e.clientX - rect.left) /
                    rect.width - 0.5;

                const y =
                    (e.clientY - rect.top) /
                    rect.height - 0.5;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${y * -8}deg)
                     rotateY(${x * 8}deg)
                     scale(1.03)`;
            });

            card.addEventListener("mouseleave", function () {

                card.style.transform =
                    "perspective(900px) rotateX(0) rotateY(0) scale(1)";
            });
        });


    /* ---------- 3D PACKAGE CARDS ---------- */

    document
        .querySelectorAll(".package-card")
        .forEach(function (card) {

            card.addEventListener("mousemove", function (e) {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    (e.clientX - rect.left) /
                    rect.width - 0.5;

                const y =
                    (e.clientY - rect.top) /
                    rect.height - 0.5;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${y * -7}deg)
                     rotateY(${x * 7}deg)
                     translateY(-8px)`;
            });

            card.addEventListener("mouseleave", function () {

                card.style.transform =
                    "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
            });
        });


    /* ---------- 3D FESTIVAL CARDS ---------- */

    document
        .querySelectorAll(".festival-card")
        .forEach(function (card) {

            card.addEventListener("mousemove", function (e) {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    (e.clientX - rect.left) /
                    rect.width - 0.5;

                const y =
                    (e.clientY - rect.top) /
                    rect.height - 0.5;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${y * -6}deg)
                     rotateY(${x * 6}deg)
                     translateY(-6px)`;
            });

            card.addEventListener("mouseleave", function () {

                card.style.transform = "";
            });
        });


    /* ---------- GOLD PARTICLES ---------- */

    const particles =
        document.createElement("div");

    particles.className =
        "ameeri-particles";

    document.body.appendChild(particles);


    for (let i = 0; i < 35; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "ameeri-particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.animationDelay =
            Math.random() * -20 + "s";

        particle.style.animationDuration =
            Math.random() * 12 + 12 + "s";

        particles.appendChild(particle);
    }


    console.log(
        "AMEERI TAJ MAHAL 3D EFFECTS LOADED"
    );

});