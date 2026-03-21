export function dessinSym() {
    
    const canvas = document.getElementById("dessin-sym");
    const ctx = canvas.getContext("2d");


    function ajusterResolution() {
    let cx, cy;
    let ratio = window.devicePixelRatio || 1;

    let largeurCSS = canvas.clientWidth;
    let hauteurCSS = canvas.clientHeight;

    canvas.width = largeurCSS * ratio;
    canvas.height = hauteurCSS * ratio;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    cx = largeurCSS / 2;
    cy = hauteurCSS / 2;
}

    ajusterResolution();
    window.addEventListener("resize", ajusterResolution);

    const w = canvas.width;
    const h = canvas.height;
    const cx = canvas.clientWidth / 2;;
    const cy = canvas.clientHeight / 2;

    const symmetry = 10;
    let drawing = false;
    let last = null;

    // pour le "glow"
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 5;

    // composition additive de couleurs
    ctx.globalCompositeOperation = "lighter";

    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    // voile noir pour faire une traînée
    function fadeCanvas() {
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(0, 0, 0, 0.008)"; // plus proche de 1 = traînée courte
        ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        ctx.restore();
    }

    // changement couleur par le temps
    let hue = 180;
    function updateHue() {
        hue = (hue + 0.5) % 360;
        ctx.strokeStyle = `hsla(${hue}, 100%, 60%, 0.7)`;
    }

    canvas.addEventListener("mousedown", (e) => {
        drawing = true;
        last = getMousePos(e);
    });

    canvas.addEventListener("mouseup", () => {
        drawing = false;
        last = null;
    });

    canvas.addEventListener("mouseleave", () => {
        drawing = false;
        last = null;
    });

    canvas.addEventListener("mousemove", (e) => {
        if (!drawing) return;

        const pos = getMousePos(e);

        const lx = last.x - cx;
        const ly = last.y - cy;
        const x = pos.x - cx;
        const y = pos.y - cy;

        fadeCanvas();      // traînée
        updateHue();       // couleur

        ctx.save();
        ctx.translate(cx, cy);

        const angleStep = (2 * Math.PI) / symmetry;

        for (let i = 0; i < symmetry; i++) {
            ctx.rotate(angleStep);

            ctx.beginPath();
            ctx.moveTo(lx, ly);
            ctx.lineTo(x, y);
            ctx.stroke();

            // miroir vertical
            ctx.save();
            ctx.scale(1, -1);
            ctx.beginPath();
            ctx.moveTo(lx, ly);
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.restore();
        }

        ctx.restore();

        last = pos;
    });

    // boucle d'anim pour continuer le fade même sans bouger la souris
    function loop() {
        fadeCanvas();
        requestAnimationFrame(loop);
    }
    loop();

    // touche C = clear
    window.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "c") {
            ctx.globalCompositeOperation = "source-over";
            ctx.clearRect(0, 0, w, h);
            ctx.globalCompositeOperation = "lighter";
        }
    });
}