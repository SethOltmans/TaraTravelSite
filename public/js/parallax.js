(function () {
  'use strict';

  var sections = document.querySelectorAll('.bg-parallax:not([data-bg="hero"])');
  if (!sections.length) return;

  // Read each section's original CSS background-position-y so we can
  // offset relative to it rather than overwriting it.
  var basePositions = [];
  for (var i = 0; i < sections.length; i++) {
    var raw = getComputedStyle(sections[i]).backgroundPositionY;
    basePositions.push(raw); // e.g. "50%", "40%", "0px"
  }

  // --- Scroll-based parallax ---
  var SCROLL_SPEED = 0.25; // subtle: 0 = none, 1 = full scroll speed
  var MAX_OFFSET = 80;     // clamp so images don't drift off-frame

  function onScroll() {
    var scrollY = window.pageYOffset;
    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      var rect = section.getBoundingClientRect();
      var sectionTop = rect.top + scrollY;
      var offset = (scrollY - sectionTop) * SCROLL_SPEED;

      // Clamp the offset
      offset = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, offset));

      section.style.backgroundPositionY =
        'calc(' + basePositions[i] + ' + ' + offset + 'px)';
    }
  }

  // --- Mouse-based parallax ---
  var MOUSE_RANGE = 15;
  var mouseX = 0.5;
  var currentX = 0.5;
  var animating = false;

  function onMouseMove(e) {
    mouseX = e.clientX / window.innerWidth;
    if (!animating) {
      animating = true;
      requestAnimationFrame(animateMouse);
    }
  }

  function animateMouse() {
    currentX += (mouseX - currentX) * 0.08;
    var offsetX = (currentX - 0.5) * MOUSE_RANGE * 2;

    for (var i = 0; i < sections.length; i++) {
      sections[i].style.backgroundPositionX = 'calc(50% + ' + offsetX + 'px)';
    }

    if (Math.abs(mouseX - currentX) > 0.001) {
      requestAnimationFrame(animateMouse);
    } else {
      animating = false;
    }
  }

  // --- Disable mouse parallax on mobile / touch ---
  var isMobile = window.matchMedia('(max-width: 767px)').matches
    || 'ontouchstart' in window;

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!isMobile) {
    document.addEventListener('mousemove', onMouseMove, { passive: true });
  }
})();
