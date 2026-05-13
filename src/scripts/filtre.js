export function filtreCategory() {
  /* ── FILTRAGE DES PROJETS ──────────────────────────────────── */
  const boutonsFiltre = document.querySelectorAll('.filtre-bouton');
  const toutesLesCartes = document.querySelectorAll('.carte-projet');
  const messageVide = document.getElementById('message-vide');
  const enteteCompteur = document.querySelector('.entete-compteur');

  boutonsFiltre.forEach(bouton => {
    bouton.addEventListener('click', () => {

      /* Mettre à jour le bouton actif */
      boutonsFiltre.forEach(b => b.classList.remove('actif'));
      bouton.classList.add('actif');

      const categorieChoisie = bouton.dataset.categorie;
      let nombreVisible = 0;

      toutesLesCartes.forEach((carte, index) => {
        const categorieCarte = carte.dataset.categorie;
        const estVisible =
          categorieChoisie === 'tous' || categorieCarte === categorieChoisie;

        if (estVisible) {
          /* Retirer la grande carte lors du filtre (sauf "tous") */
          if (categorieChoisie !== 'tous') {
            carte.classList.remove('grande');
          } else if (index === 0) {
            carte.classList.add('grande');
          }

          carte.classList.remove('masquée');
          /* Décalage d'apparition progressif */
          setTimeout(() => {
            carte.style.transitionDelay = (nombreVisible * 0.07) + 's';
            carte.classList.add('visible');
          }, 20);
          nombreVisible++;
        } else {
          carte.style.transitionDelay = '0s';
          carte.classList.add('masquée');
          carte.classList.remove('visible');
        }
      });

      /* Mettre à jour le compteur */
      enteteCompteur.textContent =
        String(nombreVisible).padStart(2, '0');

      /* Afficher le message vide si besoin */
      messageVide.classList.toggle('visible', nombreVisible === 0);
    });
  });
}