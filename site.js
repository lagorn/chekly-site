// Chekly — живость без библиотек: появление блоков при прокрутке,
// плотная шапка после начала прокрутки.

(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Шапка
  const top = document.querySelector('.top');
  const onScroll = () => top && top.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Появление при прокрутке
  const items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: .15 });
    items.forEach((el, n) => { el.style.transitionDelay = (n % 4) * 80 + 'ms'; io.observe(el); });
  }
})();
