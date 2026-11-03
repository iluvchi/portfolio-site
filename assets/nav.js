document.querySelector('nav').innerHTML = `
  <a class="nav-logo" href="/">trinh.info</a>
  <a class="nav-group" href="about.html" style="right:1.67vw; top:1.67vw; left:auto;">
    <img src="assets/headshot.jpg" alt="">
    <span class="nav-group-text">about</span>
  </a>
  <a class="nav-group" id="projects-link" href="projects.html" style="left:1.67vw; top:9.9vh;">
    <img src="assets/flowerbutton.gif" alt="" style="image-rendering:pixelated;">
    <span class="nav-group-text">projects</span>
  </a>
  <div class="subnav" id="projects-subnav">
    <a href="illustration.html">Illustration</a>
    <a href="sculpture.html"   style="text-align:right;">Sculpture</a>
    <a href="textiles.html"    style="margin-left:4vw;">Textiles</a>
    <a href="baking.html">Baking</a>
    <a href="projects.html#collaborations" style="margin-left:4.8vw;">Collaborations</a>
    <div class="subnav-row">
      <a href="projects.html#editions">Editions</a>
      <a class="subnav-more" href="projects.html">+more</a>
    </div>
  </div>
  <a class="nav-group" href="blog.html" style="left:8vw; top:21vh;">
    <img src="assets/write.gif" alt="">
    <span class="nav-group-text">blog</span>
  </a>
  <a class="nav-group" href="https://www.instagram.com/tri_inh/" target="_blank" style="right:1.67vw; top:54vh; left:auto;">
    <span class="nav-group-text">instagram<span class="nav-arrow">[↗]</span></span>
  </a>
  <a class="nav-group" href="https://www.trinh.studio/" target="_blank" style="right:1.67vw; top:34.7vh; left:auto;">
    <span class="nav-group-text">gift shop<span class="nav-arrow">[↗]</span></span>
  </a>
  <a class="nav-link" href="my-photos.html" style="left:1.67vw; top:42vh;">my photos</a>
  <a class="nav-link" href="chipedia.html" style="left:1.67vw; top:46.5vh;">chipedia</a>
  <a class="nav-group" href="video-diary.html" style="right:1.67vw; top:30vh; left:auto;">
    <img src="assets/video-diary-icon.gif" alt="">
    <span class="nav-group-text">video diary</span>
  </a>
  <a class="nav-group" id="email-copy" href="#" style="left:4.4vw; top:67vh;">
    <img src="assets/mail.gif" alt="" style="image-rendering:pixelated;">
    <span class="nav-group-text">
      <span class="label-default">email me?</span>
      <span class="label-hover">copy to clipboard</span>
      <span class="label-copied">copied!</span>
    </span>
  </a>
  <span class="nav-credit" style="left:1.67vw; top:auto; bottom:1.67vw;">© milkytrinh<img src="assets/notes-a.gif" alt="" style="image-rendering:pixelated;"></span>
`;

const emailCopy = document.getElementById('email-copy');
if (emailCopy) {
  emailCopy.addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('info@trinh.studio');
    emailCopy.classList.add('copied');
    clearTimeout(emailCopy._copiedTimer);
    emailCopy._copiedTimer = setTimeout(() => emailCopy.classList.remove('copied'), 1500);
  });
}

document.querySelectorAll('.nav-group').forEach(g => {
  g.style.minWidth = g.offsetWidth + 'px';
  g.style.maxWidth = g.offsetWidth + 'px';
  if (g.style.right) g.style.justifyContent = 'flex-end';
});

const logo = document.querySelector('.nav-logo');
logo.innerHTML = logo.textContent.split('').map(l => `<span>${l}</span>`).join('');

const projectsLink = document.getElementById('projects-link');
const subnav = document.getElementById('projects-subnav');

let hideTimer;

function openSubnav() {
  clearTimeout(hideTimer);
  subnav.classList.add('open');
  projectsLink.classList.add('active');
}

function scheduleClose() {
  hideTimer = setTimeout(() => {
    subnav.classList.remove('open');
    projectsLink.classList.remove('active');
  }, 100);
}

projectsLink.addEventListener('mouseenter', openSubnav);
projectsLink.addEventListener('mouseleave', scheduleClose);
subnav.addEventListener('mouseenter', openSubnav);
subnav.addEventListener('mouseleave', scheduleClose);

// preload the subnav background so it's cached before the first hover
new Image().src = 'assets/subnav-bg.jpg';

// image-save deterrents: block right-click menu and drag-to-save on images
(function () {
  var style = document.createElement('style');
  style.textContent =
    'img{-webkit-user-drag:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;}';
  document.head.appendChild(style);

  document.addEventListener('contextmenu', function (e) {
    if (e.target && e.target.tagName === 'IMG') e.preventDefault();
  });
  document.addEventListener('dragstart', function (e) {
    if (e.target && e.target.tagName === 'IMG') e.preventDefault();
  });
})();

var sparkleScript = document.createElement('script');
sparkleScript.src = 'assets/sparkle.js';
document.body.appendChild(sparkleScript);
