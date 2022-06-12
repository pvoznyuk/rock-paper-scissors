import "core-js/stable";
import "regenerator-runtime/runtime";
import Game from "./Game/Game";
import "../css/index.scss";
import { rpsWeapons, rpslsWeapons } from "./config";
import { PlayerType } from "./Player/Player";

document.addEventListener("DOMContentLoaded", function () {
	// console.log(window.location);
	const hash = window.location.search?.slice(1);
	let game;

	switch (hash) {
		case "ai":
			game = new Game("Rock ✕ Paper ✕ Scissors", rpsWeapons, [
				PlayerType.AI,
				PlayerType.AI,
			]);
			break;
		case "spock":
			game = new Game(
				"Rock ✕ Paper ✕ Scissors ✕ Lizard ✕ Spock",
				rpslsWeapons,
				[PlayerType.USER, PlayerType.AI]
			);
			break;
		case "ai-spock":
			game = new Game(
				"Rock ✕ Paper ✕ Scissors ✕ Lizard ✕ Spock",
				rpslsWeapons,
				[PlayerType.AI, PlayerType.AI]
			);
			break;
		default:
			game = new Game("Rock ✕ Paper ✕ Scissors", rpsWeapons, [
				PlayerType.USER,
				PlayerType.AI,
			]);
	}

	game.startRound();
});
