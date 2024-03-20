document.addEventListener('DOMContentLoaded', function () {
  const pointer = document.querySelector('.pointer');
  const dust = document.querySelector('.dust');

  gsap.set(pointer, { xPercent: -50, yPercent: -50 });
  gsap.set(dust, { xPercent: -50, yPercent: -50, scale: 0, autoAlpha: 0 });

  document.addEventListener('mousemove', function (e) {
    gsap.to(pointer, { duration: 0.3, x: e.clientX, y: e.clientY });

    gsap.to(dust, {
      duration: 0.6,
      x: e.clientX,
      y: e.clientY,
      scale: 1,
      autoAlpha: 1,
      ease: 'power4.out'
    });
  });

  document.addEventListener('mouseleave', function () {
    gsap.to(dust, { duration: 0.6, scale: 0, autoAlpha: 0 });
  });
});
