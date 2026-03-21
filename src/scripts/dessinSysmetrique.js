export function dessinSym() {

    const canvas = document.getElementById("dessin-sym");
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

        const lx = dernierPoint.x - centreX;
        const ly = dernierPoint.y - centreY;
        const x = position.x - centreX;
        const y = position.y - centreY;

        effetTrainée();
        mettreAJourCouleur();

        ctx.save();
        ctx.translate(centreX, centreY);

        const angle = (2 * Math.PI) / symetrie;

        for (let i = 0; i < symetrie; i++) {

            ctx.rotate(angle);

            // trait principal
            ctx.beginPath();
            ctx.moveTo(lx, ly);
            ctx.lineTo(x, y);
            ctx.stroke();

            // miroir
            ctx.save();
            ctx.scale(1, -1);
            ctx.beginPath();
            ctx.moveTo(lx, ly);
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.restore();
        }

        ctx.restore();

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