(function () {
  var KEY = 'trinh-site-unlocked';
  var PASSWORD = 'iluvchi';

  if (localStorage.getItem(KEY) === 'true') return;

  function rand(a, b) { return a + Math.random() * (b - a); }

  function buildGate() {
    if (localStorage.getItem(KEY) === 'true') return;

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

    // same config as the home page's falling-particles.js: diary-particle.gif,
    // 75 particles, 1.5vw (1.25vw at >=1920px), full opacity, pixelated.
    var container = overlay.querySelector('.site-gate-particles');
    var COUNT = 75;
    var SWAY = 15;
    function vwSize() {
      var v = window.innerWidth >= 1920 ? 1.25 : 1.5;
      return window.innerWidth * v / 100;
    }

    var particles = [];
    for (var i = 0; i < COUNT; i++) {
      var img = document.createElement('img');
      img.src = 'assets/diary-particle.gif';
      var size = vwSize();
      img.style.cssText = 'position:absolute;top:0;left:0;width:' + size + 'px;height:auto;opacity:1;image-rendering:pixelated;';
      container.appendChild(img);
      particles.push({
        el: img,
        size: size,
        x: rand(0, window.innerWidth),
        y: rand(-window.innerHeight, window.innerHeight),
        speed: rand(0.2, 0.5),
        swayAmp: rand(SWAY * 0.5, SWAY),
        swaySpeed: rand(0.0004, 0.001),
        swayOffset: rand(0, Math.PI * 2)
      });
    }

    window.addEventListener('resize', function () {
      var px = vwSize();
      for (var k = 0; k < particles.length; k++) {
        particles[k].size = px;
        particles[k].el.style.width = px + 'px';
      }
    });

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
        localStorage.setItem(KEY, 'true');
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
