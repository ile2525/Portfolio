export function carrousel() {
  /* ── CARROUSEL ────────────────────────────────────────────── */
  const diapos = document.querySelectorAll('.diapo');
  const conteneurPoints = document.getElementById('carrousel-points');
  const legendeCompteur = document.getElementById('legende-compteur');
  const boutonPrecedent = document.getElementById('bouton-precedent');
  const boutonSuivant = document.getElementById('bouton-suivant');

  let indexActuel = 0;
  let minuterieAuto;
  const totalDiapos = diapos.length;

  /* Créer les points */
  diapos.forEach((_, i) => {
    const point = document.createElement('div');
    point.classList.add('point');
    if (i === 0) point.classList.add('actif');
    point.addEventListener('click', () => allerVers(i));
    conteneurPoints.appendChild(point);
  });

  const tousLesPoints = document.querySelectorAll('.point');

  function allerVers(nouvelIndex) {
    diapos[indexActuel].classList.remove('active');
    tousLesPoints[indexActuel].classList.remove('actif');

    indexActuel = (nouvelIndex + totalDiapos) % totalDiapos;

    diapos[indexActuel].classList.add('active');
    tousLesPoints[indexActuel].classList.add('actif');
    legendeCompteur.textContent =
      String(indexActuel + 1).padStart(2, '0') + ' / ' +
      String(totalDiapos).padStart(2, '0');
  }

  function diapoSuivante() { allerVers(indexActuel + 1); }
  function diapoPrec() { allerVers(indexActuel - 1); }

  boutonSuivant.addEventListener('click', () => {
    diapoSuivante(); reinitialiserMinuterie();
  });
  boutonPrecedent.addEventListener('click', () => {
    diapoPrec(); reinitialiserMinuterie();
  });

  /* Défilement automatique toutes les 4 secondes */
  function demarrerMinuterie() {
    minuterieAuto = setInterval(diapoSuivante, 4000);
  }
  function reinitialiserMinuterie() {
    clearInterval(minuterieAuto);
    demarrerMinuterie();
  }

  demarrerMinuterie();

  /* Pause au survol */
  document.getElementById('carrousel').addEventListener('mouseenter', () => {
    clearInterval(minuterieAuto);
  });
  document.getElementById('carrousel').addEventListener('mouseleave', () => {
    demarrerMinuterie();
  });

  /* Navigation clavier */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { diapoPrec(); reinitialiserMinuterie(); }
    if (e.key === 'ArrowRight') { diapoSuivante(); reinitialiserMinuterie(); }
  });
}