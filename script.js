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

// Keep each tile's description on one line: if it would wrap, shrink its
// text a little until it fits. Below 75% of the normal size it is allowed
// to wrap instead, so it stays readable on very narrow screens.
(function () {
  function fit() {
    document.querySelectorAll('.card .desc').forEach(function (p) {
      p.style.fontSize = '';
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
    });
  }

  var timer;
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(fit, 100);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  fit();
})();
