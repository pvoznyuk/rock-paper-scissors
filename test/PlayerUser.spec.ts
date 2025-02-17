import { PlayerType } from "../src/js/Player/Player";
import PlayerUser from "../src/js/Player/PlayerUser";
import WeaponManager from "../src/js/Weapon/WeaponManager";
import template from "./__mocks__/dom";
import weapons from "./__mocks__/weapons";

describe("Player (User)", () => {
	let player: PlayerUser;

	beforeEach(() => {
		document.body.innerHTML = template;
		player = new PlayerUser(
			"Player 1",
			".player--1",
			new WeaponManager(weapons)
		);
	});

	it("should return player's name", () => {
		expect(player.playerName).toBe(`🐱 Player 1 (you)`);
	});

	it("should return player's type", () => {
		expect(player.type).toBe(PlayerType.USER);
	});

	it("should get a score on win", () => {
		expect(player.score).toBe(0);
		player.win();
		expect(player.score).toBe(1);
	});

	it("should reset the score", () => {
		player.score = 1;
		expect(player.score).toBe(1);
		player.reset();
		expect(player.score).toBe(0);
	});

	it("should generate weapon list", () => {
		player.generateWeaponList();
		expect(player.weaponManager.weapons.length).toBe(3);
	});

	it("should select a weapon", () => {
		player.generateWeaponList();
		expect(player.selectedWeapon).toBeNull();
		player.selectWeapon();
		const element: HTMLElement = document.querySelector(
			".player--1 .player__weapon .player__weapon-item:first-child"
		) as HTMLElement;

		element.click();
		expect(player.selectedWeapon.name).toBe("Rock");
	});
});
