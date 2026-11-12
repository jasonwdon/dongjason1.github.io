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
// In a single column (phones), a description that would still wrap shrinks
// a little to stay on one line, down to 75% of its size.
(function () {
  var grid = document.querySelector('.grid');
  if (!grid) return;

  function wraps(el) {
    el.style.whiteSpace = 'nowrap';
    var over = el.scrollWidth > el.clientWidth;
    el.style.whiteSpace = '';
    return over;
  }

  function shrinkToFit(p) {
    p.style.whiteSpace = 'nowrap';
    var size = parseFloat(getComputedStyle(p).fontSize), smallest = size * 0.75;
    while (p.scrollWidth > p.clientWidth && size > smallest) {
      size -= 0.5;
      p.style.fontSize = size + 'px';
    }
    if (p.scrollWidth > p.clientWidth) {
      p.style.fontSize = '';
      p.style.whiteSpace = '';
    }
  }

  function layout() {
    var descs = grid.querySelectorAll('.card .desc');
    [].forEach.call(descs, function (p) { p.style.fontSize = ''; p.style.whiteSpace = ''; });
    grid.classList.remove('one-column');

    var columns = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    if (columns > 1) {
      var tooLong = [].some.call(grid.querySelectorAll('.card h2, .card .desc'), wraps);
      if (!tooLong) return;
      grid.classList.add('one-column');
    }
    [].forEach.call(descs, shrinkToFit);
  }

  // Re-check on every frame while the window is resized, so the grid never
  // sits in the wrong layout and then snaps (a delayed check made it stutter).
  var pending = false;
  window.addEventListener('resize', function () {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () { pending = false; layout(); });
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  layout();
})();
