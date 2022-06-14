import "core-js/stable";
import "regenerator-runtime/runtime";
import Game from "./Game/Game";
import { PlayerType } from "./Player/Player";
import { rpsWeapons, rpslsWeapons, rpsbWeapons } from "./config";
import "../css/index.scss";

document.addEventListener("DOMContentLoaded", function () {
	const hash = window.location.search?.slice(1);
	let game;

	// Run a game with the given hash
	switch (hash) {
		// RPS Computer vs Computer
		case "ai":
			game = new Game("Rock ✕ Paper ✕ Scissors", rpsWeapons, [
				PlayerType.AI,
				PlayerType.AI,
			]);
			break;
		// RPSLS Human vs Computer
		case "spock":
			game = new Game(
				"Rock ✕ Paper ✕ Scissors ✕ Lizard ✕ Spock",
				rpslsWeapons,
				[PlayerType.USER, PlayerType.AI]
			);
			break;
		case "beer":
			game = new Game("Rock ✕ Paper ✕ Scissors ✕ Beer", rpsbWeapons, [
				PlayerType.AI,
				PlayerType.USER,
			]);
			break;
		// RPS Human vs Computer
		default:
			game = new Game("Rock ✕ Paper ✕ Scissors", rpsWeapons, [
				PlayerType.USER,
				PlayerType.AI,
			]);
	}

	game.startRound();
});
