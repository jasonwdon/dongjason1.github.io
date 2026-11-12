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
