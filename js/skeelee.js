(function () {
    let typed = "";
    const target = "skeelee";
    const gifUrl = "https://c.tenor.com/zGQLL-kwwEoAAAAd/tenor.gif";

    document.addEventListener("keydown", function (e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key.length === 1) {
            typed += e.key.toLowerCase();
            typed = typed.slice(-target.length);

            if (typed === target) {
                showSkeelee();
                typed = "";
            }
        }
    });

    function showSkeelee() {
        if (document.getElementById("skeelee-overlay")) return;

        const overlay = document.createElement("div");
        overlay.id = "skeelee-overlay";
        Object.assign(overlay.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "black",
            zIndex: "999999",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: "0",
            transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: "all"
        });

        const img = document.createElement("img");
        img.src = gifUrl;
        Object.assign(img.style, {
            width: "100%",
            height: "100%",
            objectFit: "contain",
            userSelect: "none",
            webkitUserDrag: "none"
        });

        overlay.appendChild(img);
        document.body.appendChild(overlay);

        overlay.offsetHeight;
        overlay.style.opacity = "1";

        setTimeout(() => {
            overlay.style.opacity = "0";
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.remove();
                }
            }, 500);
        }, 5000);
    }
})();

