export function defilement() {
    /* ── NAVIGATION AU DÉFILEMENT ─────────────────────────── */
    const barreNav = document.getElementById('barre-navigation');

    const auDefilement = () => {
        barreNav.classList.toggle('défilée', window.scrollY > 50);
    };
    window.addEventListener('scroll', auDefilement, { passive: true });

    /* ── APPARITION AU DÉFILEMENT ─────────────────────────── */
    const observateurApparition = new IntersectionObserver(entrees => {
        entrees.forEach(entree => {
            if (entree.isIntersecting) {
                entree.target.classList.add('visible');
                observateurApparition.unobserve(entree.target);
            }
        });
    }, { threshold: 0.1 });

    /* ── Accueil  ─────────────────────────── */
    document.querySelectorAll('.vedette-entete')
        .forEach(element => observateurApparition.observe(element));

    /* ── Projet cartes  ─────────────────────────── */
    document.querySelectorAll('.carte-projet')
        .forEach(carte => observateurApparition.observe(carte));


    /* ── Projet individuel  ─────────────────────────── */
    const observateurApparitionProjet = new IntersectionObserver(entrees => {
      entrees.forEach(entree => {
        if (entree.isIntersecting) {
          entree.target.classList.add('visible');
          observateurApparition.unobserve(entree.target);
        }
      });
    }, { threshold: 0.08 });
 
    document.querySelectorAll('[data-section]')
      .forEach(el => observateurApparitionProjet.observe(el));
}