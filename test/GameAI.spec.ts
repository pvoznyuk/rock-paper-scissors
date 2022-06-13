import Game from "../src/js/Game/Game";
import { PlayerType } from "../src/js/Player/Player";
import template from "./__mocks__/dom";
import weapons from "./__mocks__/weapons";

describe("Game (AI vs AI)", () => {
	document.body.innerHTML = template;
	const aiGame = new Game("RPS", weapons, [PlayerType.AI, PlayerType.AI]);

	it("should tell if both players are AI", () => {
		expect(aiGame.areBothPlayersAI()).toBe(true);
	});

	it("should start a new round", () => {
		aiGame.startRound();
		expect(aiGame.player1.selectedWeapon).toBeTruthy();
		expect(aiGame.player2.selectedWeapon).toBeTruthy();
	});
});
