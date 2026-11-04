(function () {
  var KEY = 'trinh-site-unlocked';
  var PASSWORD = 'iluvchi';
  var DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

  function isUnlocked() {
    var unlockedAt = Number(localStorage.getItem(KEY));
    return unlockedAt && (Date.now() - unlockedAt) < DURATION_MS;
  }

  if (isUnlocked()) return;

  function rand(a, b) { return a + Math.random() * (b - a); }

  function buildGate() {
    if (isUnlocked()) return;

    var overlay = document.createElement('div');
    overlay.id = 'site-gate';
    overlay.innerHTML =
      '<div class="site-gate-particles"></div>' +
      '<div class="site-gate-card">' +
        '<p class="site-gate-label">trinh.info</p>' +
        '<div class="site-gate-bottom">' +
          '<form class="site-gate-form">' +
            '<input type="password" class="site-gate-input" autocomplete="off" placeholder="Password">' +
            '<button type="submit" class="site-gate-submit">Enter</button>' +
          '</form>' +
          '<p class="site-gate-error">Wrong password, try again</p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    document.documentElement.style.visibility = '';

    var input = overlay.querySelector('.site-gate-input');
    input.focus();

    // diary-particle.gif, fixed 22px (= 1.5vw at the site's 1440px laptop
    // reference — see feedback_px_to_vw memory) instead of scaling with vw, so
    // particle size stays stable as the window resizes instead of drifting.
    // Fewer particles on small screens (less GPU headroom, smaller canvas).
    var container = overlay.querySelector('.site-gate-particles');
    var COUNT = window.innerWidth <= 768 ? 25 : 75;
    var SWAY = 15;
    var SIZE = 22;

    var particles = [];
    for (var i = 0; i < COUNT; i++) {
      var img = document.createElement('img');
      img.src = 'assets/diary-particle.gif';
      img.style.cssText = 'position:absolute;top:0;left:0;width:' + SIZE + 'px;height:auto;opacity:1;image-rendering:pixelated;';
      container.appendChild(img);
      particles.push({
        el: img,
        size: SIZE,
        x: rand(0, window.innerWidth),
        y: rand(-window.innerHeight, window.innerHeight),
        speed: rand(0.2, 0.5),
        swayAmp: rand(SWAY * 0.5, SWAY),
        swaySpeed: rand(0.0004, 0.001),
        swayOffset: rand(0, Math.PI * 2)
      });
    }

    function tick(t) {
      if (!document.getElementById('site-gate')) return;
      for (var j = 0; j < particles.length; j++) {
        var p = particles[j];
        p.y += p.speed;
        var x = p.x + Math.sin(t * p.swaySpeed + p.swayOffset) * p.swayAmp;
        p.el.style.transform = 'translate(' + x + 'px,' + p.y + 'px)';
        if (p.y > window.innerHeight + p.size) {
          p.y = -p.size;
          p.x = rand(0, window.innerWidth);
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    var form = overlay.querySelector('.site-gate-form');
    var error = overlay.querySelector('.site-gate-error');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (input.value === PASSWORD) {
        localStorage.setItem(KEY, String(Date.now()));
        overlay.remove();
      } else {
        error.classList.add('show');
        input.value = '';
        input.focus();
      }
    });
  }

  document.documentElement.style.visibility = 'hidden';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildGate);
  } else {
    buildGate();
  }
})();
