(function () {
  var IMAGES = window.FALLING_PARTICLE_IMAGES || ['assets/falling-particle-transparent.png'];
  var COUNT = window.FALLING_PARTICLE_COUNT || 28;
  var MIN_SIZE = 20, MAX_SIZE = 46;
  if (window.FALLING_PARTICLE_SIZE) MIN_SIZE = MAX_SIZE = window.FALLING_PARTICLE_SIZE;
  // Optional vw-based sizing so particles scale with viewport like the nav icons.
  // SIZE_VW applies below 1920px; SIZE_VW_WIDE (if set) applies at >=1920px.
  var SIZE_VW = window.FALLING_PARTICLE_SIZE_VW;
  var SIZE_VW_WIDE = window.FALLING_PARTICLE_SIZE_VW_WIDE;
  function vwPx() {
    var v = (SIZE_VW_WIDE != null && window.innerWidth >= 1920) ? SIZE_VW_WIDE : SIZE_VW;
    return window.innerWidth * v / 100;
  }
  var PIXELATED = !!window.FALLING_PARTICLE_PIXELATED;
  var FIXED_OPACITY = window.FALLING_PARTICLE_OPACITY;
  var MIN_SPEED = 0.2, MAX_SPEED = 0.5;
  var SWAY = 15;

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  var container = document.createElement('div');
  container.id = 'falling-particles';
  container.style.cssText = 'position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:-1;';
  document.body.appendChild(container);

  function createParticle() {
    var img = document.createElement('img');
    img.src = IMAGES[Math.floor(Math.random() * IMAGES.length)];
    var size = (SIZE_VW != null) ? vwPx() : rand(MIN_SIZE, MAX_SIZE);
    var startOp = rand(0.35, 0.9);
    var op = (FIXED_OPACITY != null) ? FIXED_OPACITY : startOp.toFixed(2);
    img.style.cssText = 'position:absolute;top:0;left:0;width:' + size + 'px;height:auto;opacity:' + op + ';' + (PIXELATED ? 'image-rendering:pixelated;' : '');
    container.appendChild(img);
    return {
      el: img,
      size: size,
      x: rand(0, window.innerWidth),
      y: rand(-window.innerHeight, window.innerHeight),
      speed: rand(MIN_SPEED, MAX_SPEED),
      swayAmp: rand(SWAY * 0.5, SWAY),
      swaySpeed: rand(0.0004, 0.001),
      swayOffset: rand(0, Math.PI * 2),
      op: startOp,
      opTarget: rand(0.15, 0.95),
      opRate: rand(0.002, 0.012)
    };
  }

  var particles = [];
  for (var i = 0; i < COUNT; i++) particles.push(createParticle());

  if (SIZE_VW != null) {
    window.addEventListener('resize', function () {
      var px = vwPx();
      for (var k = 0; k < particles.length; k++) {
        particles[k].size = px;
        particles[k].el.style.width = px + 'px';
      }
    });
  }

  function tick(t) {
    for (var j = 0; j < particles.length; j++) {
      var p = particles[j];
      p.y += p.speed;
      var x = p.x + Math.sin(t * p.swaySpeed + p.swayOffset) * p.swayAmp;
      p.el.style.transform = 'translate(' + x + 'px, ' + p.y + 'px)';
      if (FIXED_OPACITY == null) {
        if (p.op < p.opTarget) {
          p.op = Math.min(p.op + p.opRate, p.opTarget);
        } else {
          p.op = Math.max(p.op - p.opRate, p.opTarget);
        }
        if (Math.abs(p.op - p.opTarget) < 0.001) {
          p.opTarget = rand(0.15, 0.95);
          p.opRate = rand(0.002, 0.012);
        }
        p.el.style.opacity = p.op.toFixed(3);
      }
      if (p.y > window.innerHeight + p.size) {
        p.y = -p.size;
        p.x = rand(0, window.innerWidth);
      }
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
