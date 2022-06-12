import "core-js/stable";
import "regenerator-runtime/runtime";
import Game from "./Game/Game";
import "../css/index.scss";

document.addEventListener("DOMContentLoaded", function () {
	const game = new Game();
	game.start();
});

// import logger from "./logger";

// logger("it works well!");
