
/**
 * Global variables for subterfuge working
 */
IFRAME_ID = "subterfuge";
KEYS_TO_TOGGLE_IFRAME = ["Space", "KeyQ"];
HIDED_TITLE = `"Autres" - Fish racing game`;
DECOY_TITLE = "wiki:gestionnaire_code [Wiki BMCA]";

let iframe = document.getElementById(IFRAME_ID);

WHERE_ACTIVE_LISTENER = [document.body]

/**
 * Display or not subterfuge IFrame (wiki BMCA)
 */
function toggleIFrame() {
    if (iframe.style.display !== "none") {
        iframe.style.display = "none";
        document.title = HIDED_TITLE;
    } else {
        iframe.style.display = "initial";
        document.title = DECOY_TITLE
    }
}

for (let ele of WHERE_ACTIVE_LISTENER) {
    ele.addEventListener('keypress', (event) => {
        if (KEYS_TO_TOGGLE_IFRAME.includes(event.code)) {
            toggleIFrame();
        }
    })
}

for (let exit of document.getElementsByClassName('exit-iframe')) {
    exit.addEventListener('click', () => {
        toggleIFrame();
    })
}

iframe.addEventListener('load', () => {
    GAME.gameContainer.setAttribute("hide", "false")
})
