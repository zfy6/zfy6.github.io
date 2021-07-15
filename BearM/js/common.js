window.onload = function () {
    setFontSize();
    window.onresize = function () {
        setFontSize();
    }
}

function setFontSize() {
    let width = window.screen.width;
    let font = width / 750 * 100;
    document.documentElement.style.fontSize = font + 'px';
}