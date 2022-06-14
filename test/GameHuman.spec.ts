import Game from "../src/js/Game/Game";
import { PlayerType } from "../src/js/Player/Player";
import template from "./__mocks__/dom";
import weapons from "./__mocks__/weapons";

describe("Game (Human vs AI)", () => {
	document.body.innerHTML = template;
	const game = new Game("RPS", weapons, [PlayerType.USER, PlayerType.AI]);

	it("should have weapons", () => {
		expect(game.weaponManager.weapons.length).toBe(3);
	});

	it("should render gamme name", () => {
		expect(document.querySelector(".game__name").innerHTML).toBe("RPS");
	});

	it("should render the players", () => {
		expect(document.querySelector(".player--1 .player__name").innerHTML).toBe(
			"🐱 Player 1 (you)"
		);
		expect(document.querySelector(".player--2 .player__name").innerHTML).toBe(
			"🤖 Player 2 (AI)"
		);
	});

	it("should tell if both players are AI or not", () => {
		expect(game.areBothPlayersAI()).toBe(false);
	});

	it("should not select a winner if players have not selected their weapons", () => {
		expect(() => {
			game.selectWinner();
		}).toThrowError("No weapon selected");
	});

	it("should start a new round", () => {
		game.startRound();
		expect(document.querySelector(".game__result-text").innerHTML).toBe(
			"Choose your weapon"
		);
		expect(game.player1.selectedWeapon).toBeNull();
		expect(game.player2.selectedWeapon).toBeNull();
	});

	it("should show draw if plauyers selected the same weapons", () => {
		game.player1.selectedWeapon = game.weaponManager.weapons[0];
		game.player2.selectedWeapon = game.weaponManager.weapons[0];
		game.selectWinner();
		expect(game.player1.score).toBe(0);
		expect(game.player2.score).toBe(0);
		expect(document.querySelector(".game__result-text").innerHTML).toBe(
			"Draw!"
		);
	});

	it("should select player2 as a winner", () => {
		game.player1.selectedWeapon = game.weaponManager.weapons[0];
		game.player2.selectedWeapon = game.weaponManager.weapons[1];
		game.selectWinner();
		expect(game.player1.score).toBe(0);
		expect(game.player2.score).toBe(1);
		expect(document.querySelector(".game__result-text").innerHTML).toBe(
			"🤖 Player 2 (AI) Wins!"
		);
	});

	it("should select player1 as a winner", () => {
		game.startRound();
		game.player1.selectedWeapon = game.weaponManager.weapons[1];
		game.player2.selectedWeapon = game.weaponManager.weapons[0];
		game.selectWinner();
		expect(game.player1.score).toBe(1);
		expect(game.player2.score).toBe(1);
		expect(document.querySelector(".game__result-text").innerHTML).toBe(
			"🐱 Player 1 (you) Wins!"
		);
	});

	it("should reset the game", () => {
		game.reset();
		expect(game.player1.score).toBe(0);
		expect(game.player2.score).toBe(0);
		expect(document.querySelector(".game__result-text").innerHTML).toBe(
			"Choose your weapon"
		);
	});

	it("should show an error on invalid weapon list", () => {
		new Game("RPS", [], [PlayerType.USER, PlayerType.AI]);
		expect(document.querySelector(".game__result-text").innerHTML).toBe(
			"Error: Weapon list is not valid"
		);
	});
});
