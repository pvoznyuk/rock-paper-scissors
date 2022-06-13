import { PlayerType } from "../src/js/Player/Player";
import PlayerAI from "../src/js/Player/PlayerAI";
import PlayerUser from "../src/js/Player/PlayerUser";
import PlayerFactory from "../src/js/Player/PlayerFactory";
import WeaponManager from "../src/js/Weapon/WeaponManager";
import template from "./__mocks__/dom";

describe("PlayerFactory", () => {
	beforeEach(() => {
		document.body.innerHTML = template;
	});

	it("should create a user player", () => {
		const playerFactory = new PlayerFactory();
		playerFactory.createPlayer(
			PlayerType.USER,
			"Player 1",
			".player--1",
			new WeaponManager()
		);
		expect(playerFactory.player).toBeInstanceOf(PlayerUser);
	});

	it("should create an AI player", () => {
		const playerFactory = new PlayerFactory();
		playerFactory.createPlayer(
			PlayerType.AI,
			"Player 1",
			".player--1",
			new WeaponManager()
		);
		expect(playerFactory.player).toBeInstanceOf(PlayerAI);
	});
});
