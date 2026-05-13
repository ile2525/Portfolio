export function curseur() {
    /* ── CURSEUR PERSONNALISÉ ──────────────────────────────── */
    const pointCurseur = document.getElementById('curseur-point');
    const anneauCurseur = document.getElementById('curseur-anneau');

    let sourisX = 0, sourisY = 0;
    let anneauX = 0, anneauY = 0;

    document.addEventListener('mousemove', evenement => {
        sourisX = evenement.clientX;
        sourisY = evenement.clientY;
    });

    (function boucleAnimation() {
        anneauX += (sourisX - anneauX) * 0.11;
        anneauY += (sourisY - anneauY) * 0.11;

        pointCurseur.style.left = sourisX + 'px';
        pointCurseur.style.top = sourisY + 'px';
        anneauCurseur.style.left = anneauX + 'px';
        anneauCurseur.style.top = anneauY + 'px';

        requestAnimationFrame(boucleAnimation);
    })();
}