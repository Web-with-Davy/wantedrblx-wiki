(function () {
    let typed = "";
    const target = "skeelee";
    const redirectUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

    document.addEventListener("keydown", function (e) {
        if (e.key.length === 1) {
            typed += e.key.toLowerCase();
            typed = typed.slice(-target.length);

            if (typed === target) {
                window.location.href = redirectUrl;
            }
        }
    });
})();
