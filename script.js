// Give every tile its own hand-drawn outline, new on each load.
// Each corner gets one long and one short radius, like a quick pen stroke;
// which way each corner leans is random (never all four the same way),
// and no two neighbours match.
(function () {
  function between(lo, hi) { return Math.round(lo + Math.random() * (hi - lo)); }

  var previous = '';
  document.querySelectorAll('.card').forEach(function (card) {
    var lean;
    do {
      lean = '';
      for (var i = 0; i < 4; i++) lean += Math.random() < 0.5 ? 'w' : 't';
    } while (lean === previous || lean === 'wwww' || lean === 'tttt');
    previous = lean;

    var across = [], down = [];
    for (var c = 0; c < 4; c++) {
      var long = between(120, 255) + 'px', short = between(10, 35) + 'px';
      across.push(lean[c] === 'w' ? long : short);
      down.push(lean[c] === 'w' ? short : long);
    }
    card.style.setProperty('--shape', across.join(' ') + ' / ' + down.join(' '));
  });
})();

// Two tiles across only while every title and description fits on one line.
// As soon as any of them would wrap, the grid drops to a single column.
(function () {
  var grid = document.querySelector('.grid');
  if (!grid) return;

  function wraps(el) {
    el.style.whiteSpace = 'nowrap';
    var over = el.scrollWidth > el.clientWidth;
    el.style.whiteSpace = '';
    return over;
  }

  function layout() {
    grid.classList.remove('one-column');
    var columns = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    if (columns < 2) return;
    var tooLong = [].some.call(grid.querySelectorAll('.card h2, .card .desc'), wraps);
    grid.classList.toggle('one-column', tooLong);
  }

  var timer;
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(layout, 100);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  layout();
})();
