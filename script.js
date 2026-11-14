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

// Two tiles across only when every title and description fits on one line.
// The widest line is measured once (again when the font arrives) and handed
// to CSS as --tile-min; CSS then drops all tiles to one column together, with
// nothing running while the window is dragged.
// On a narrow screen, a title or description that still would wrap shrinks a little,
// down to 75% of its size.
(function () {
  var grid = document.querySelector('.grid');
  if (!grid) return;
  var tileMin = 0, shrunk = false;

  function measure() {
    var widest = 0;
    [].forEach.call(grid.querySelectorAll('.card h2, .card .desc'), function (el) {
      el.style.fontSize = '';
      el.style.width = 'max-content'; // the line's own width, not the tile's
      widest = Math.max(widest, el.offsetWidth + 1); // +1 for rounding
      el.style.width = '';
    });
    var card = grid.querySelector('.card');
    if (!card) return;
    var cs = getComputedStyle(card);
    tileMin = Math.ceil(widest + parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight) +
                        parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth));
    grid.style.setProperty('--tile-min', tileMin + 'px');
    shrunk = true; // force a fresh fit
    fit();
  }

  function shrinkToFit(p) {
    p.style.whiteSpace = 'nowrap';
    var size = parseFloat(getComputedStyle(p).fontSize), smallest = size * 0.75;
    while (p.scrollWidth > p.clientWidth && size > smallest) { size -= 0.5; p.style.fontSize = size + 'px'; }
    if (p.scrollWidth > p.clientWidth) { p.style.fontSize = ''; p.style.whiteSpace = ''; }
    else if (p.style.fontSize) shrunk = true;
    else p.style.whiteSpace = '';
  }

  // Only does work when the grid is narrower than the widest line (phones),
  // or to undo an earlier shrink. Wider windows return at once.
  function fit() {
    var narrow = grid.clientWidth < tileMin;
    if (!narrow && !shrunk) return;
    var descs = grid.querySelectorAll('.card h2, .card .desc');
    [].forEach.call(descs, function (p) { p.style.fontSize = ''; p.style.whiteSpace = ''; });
    shrunk = false;
    if (narrow) [].forEach.call(descs, shrinkToFit);
  }

  var pending = false;
  window.addEventListener('resize', function () {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () { pending = false; fit(); });
  });
  measure();

  // Once Gaegu has arrived, measure with it and show the page.
  function reveal() {
    measure();
    requestAnimationFrame(function () { document.documentElement.classList.remove('loading'); });
  }
  if (document.fonts && document.fonts.load) {
    Promise.all([document.fonts.load('400 22px Gaegu'), document.fonts.load('700 22px Gaegu')])
      .then(reveal, reveal);
  } else {
    reveal();
  }
})();
