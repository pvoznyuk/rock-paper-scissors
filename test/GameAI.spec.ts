import Game from "../src/js/Game/Game";
import { PlayerType } from "../src/js/Player/Player";
import template from "./__mocks__/dom";
import weapons from "./__mocks__/weapons";

describe("Game (AI vs AI)", () => {
	document.body.innerHTML = template;
	const game = new Game("RPS", weapons, [PlayerType.AI, PlayerType.AI]);

	it("should tell if both players are AI", () => {
		expect(game.areBothPlayersAI()).toBe(true);
	});

	it("should start a new round", () => {
		game.startRound();
		expect(game.player1.selectedWeapon).toBeTruthy();
		expect(game.player2.selectedWeapon).toBeTruthy();
	});
});
