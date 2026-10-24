(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (!btn || !nav) return;

  function setOpen(open) {
    nav.classList.toggle('open', open);
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  btn.addEventListener('click', function () {
    setOpen(!nav.classList.contains('open'));
  });

  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });

  window.addEventListener('resize', function () {
    if (innerWidth > 800) setOpen(false);
  });
})();

/* 3D tilt toward the pointer */
(function () {
  var noHover = window.matchMedia('(hover: none)').matches;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (noHover || reduce) return;

  document.querySelectorAll('.card, .tile, .shot, .stage').forEach(function (el) {
    var max = el.classList.contains('stage') ? 14 : el.classList.contains('shot') ? 12 : 7;

    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width;
      var y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--ry', ((x - 0.5) * 2 * max).toFixed(2) + 'deg');
      el.style.setProperty('--rx', ((0.5 - y) * 2 * max).toFixed(2) + 'deg');
      el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
    });

    el.addEventListener('pointerleave', function () {
      ['--rx', '--ry', '--mx', '--my'].forEach(function (v) {
        el.style.removeProperty(v);
      });
    });
  });
})();
