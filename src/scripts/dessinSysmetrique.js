export function dessinSym() {

    const canvas = document.getElementById("dessin-sym");
    if (!canvas) {
        // Pas de canvas sur cette page (ex : projets.html, apropos.html), on ne fait rien
        return;
    }

    const ctx = canvas.getContext("2d");

    let centreX, centreY;
    let enTrainDeDessiner = false;
    let dernierPoint = null;

    const symetrie = window.innerWidth < 768 ? 6 : 10;
    let teinte = 180;

    //Adaptation résolution
    function ajusterResolution() {

        const ratio = window.devicePixelRatio || 1;

        const largeurCSS = canvas.clientWidth;
        const hauteurCSS = canvas.clientHeight;

        canvas.width = largeurCSS * ratio;
        canvas.height = hauteurCSS * ratio;

        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

        // centre en coordonnées CSS
        centreX = largeurCSS / 2;
        centreY = hauteurCSS / 2;
    }

    ajusterResolution();
    window.addEventListener("resize", ajusterResolution);

    // style du trait
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalCompositeOperation = "lighter";
    ctx.lineWidth = 1 + Math.random() * 3;

    //obtenir position du pointeur
    function obtenirPosition(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    function effetTrainée() {
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(0, 0, 0, 0.01)";
        ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        ctx.restore();
    }

    function mettreAJourCouleur() {
        teinte = (teinte + 0.5) % 360;
        ctx.strokeStyle = `hsla(${teinte}, 100%, 60%, 1)`;
    }

    // Fonction pour dessiner une ligne symétrique
    function dessinerLigneSymetrique(x1, y1, x2, y2) {
        effetTrainée();
        mettreAJourCouleur();

        ctx.save();
        ctx.translate(centreX, centreY);

        const angle = (2 * Math.PI) / symetrie;

        for (let i = 0; i < symetrie; i++) {
            ctx.rotate(angle);

            // trait principal
            ctx.beginPath();
            ctx.moveTo(x1 - centreX, y1 - centreY);
            ctx.lineTo(x2 - centreX, y2 - centreY);
            ctx.stroke();

            // miroir
            ctx.save();
            ctx.scale(1, -1);
            ctx.beginPath();
            ctx.moveTo(x1 - centreX, y1 - centreY);
            ctx.lineTo(x2 - centreX, y2 - centreY);
            ctx.stroke();
            ctx.restore();
        }

        ctx.restore();
    }

    // Animation d'intro 
    function jouerAnimationIntro() {
        let angle = 0;
        let radius = 150;
        const maxRadius = Math.min(centreX, centreY) * 0.8;
        const step = 0.05; //vitesse de  rotation
        let lastX = centreX;
        let lastY = centreY;

        function animer() {
            if (radius >= maxRadius) {

                // Efface après une seconde
                setTimeout(() => {
                    ctx.globalCompositeOperation = "source-over";
                    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
                    ctx.globalCompositeOperation = "lighter";
                }, 1000); 
                return;
            }

            // Angle au rayon aléatoire
            angle += step + (Math.random() - 0.5) * 0.1; // Fluidité
            radius += step * 5 + Math.random() * 10; // Espacement

            const x = centreX + Math.cos(angle) * radius;
            const y = centreY + Math.sin(angle) * radius;

            dessinerLigneSymetrique(lastX, lastY, x, y);

            lastX = x;
            lastY = y;

            setTimeout(animer, 50); 
        }

        animer();
    }

    // Lancer l'animation d'intro
    jouerAnimationIntro();

    // Les évènements
    canvas.addEventListener("pointerdown", (e) => {
        enTrainDeDessiner = true;
        dernierPoint = obtenirPosition(e);

        canvas.setPointerCapture(e.pointerId);
    });

    canvas.addEventListener("pointerup", (e) => {
        enTrainDeDessiner = false;
        dernierPoint = null;

        canvas.releasePointerCapture(e.pointerId);
    });

    canvas.addEventListener("pointerleave", () => {
        enTrainDeDessiner = false;
        dernierPoint = null;
    });

    canvas.addEventListener("pointermove", (e) => {
        if (!enTrainDeDessiner) return;

        const position = obtenirPosition(e);

        dessinerLigneSymetrique(dernierPoint.x, dernierPoint.y, position.x, position.y);

        dernierPoint = position;
    });

    // boucle animation (trainée continue)
    function boucle() {
        effetTrainée();
        requestAnimationFrame(boucle);
    }
    boucle();

    // touche C pour clear
    window.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "c") {
            ctx.globalCompositeOperation = "source-over";
            ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
            ctx.globalCompositeOperation = "lighter";
        }
    });
}