export function filtreCategory() {

    // appel des boites et filtres
    const filtreButtons = document.querySelectorAll(".filtres button");
    const boites = document.querySelectorAll(".boite-projet");

    filtreButtons.forEach(button => {
        button.addEventListener('click', () => {
            //Gère état actif/inactif
            filtreButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            //Récupère catégories et boites associées
            const selectionCategory = button.getAttribute('data-category');

            //Gère état visible/invisible
            boites.forEach(boite => {
                const boiteCategory = boite.getAttribute('data-category');

                if (selectionCategory === 'all' || boiteCategory === selectionCategory) {
                    boite.classList.remove('hidden'); //visible
                } else {
                    boite.classList.add('hidden');    //invisible
                }
            });
        });
    });
}