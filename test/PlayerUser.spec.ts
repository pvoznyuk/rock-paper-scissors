import { PlayerType } from "../src/js/Player/Player";
import PlayerUser from "../src/js/Player/PlayerUser";
import Weapon from "../src/js/Weapon/Weapon";
import WeaponManager from "../src/js/Weapon/WeaponManager";
import template from "./__mocks__/dom";

describe("Player (User)", () => {
	let player: PlayerUser;

	beforeEach(() => {
		document.body.innerHTML = template;
		player = new PlayerUser("Player 1", ".player--1", new WeaponManager());
		player.weaponManager.addWeapon(
			new Weapon({ name: "Gun", icon: "🔫", beats: ["Sword"] })
		);
	});

	it("should have a user player type", () => {
		expect(player.type).toBe(PlayerType.USER);
	});

	it("should got a score on win", () => {
		expect(player.score).toBe(0);
		player.win();
		expect(player.score).toBe(1);
	});

	it("should return a player's name", () => {
		expect(player.playerName).toBe(`🐱 Player 1 (you)`);
	});

	it("should render selecting weapon", () => {
		player.renderSelectingWeapon();
		expect(player.elements.weapon.querySelector("button").outerHTML).toBe(
			`<button aria-label="Gun" class="player__weapon-item" data-weapon="Gun" title="Gun">🔫</button>`
		);
	});

	it("should select a weapon", () => {
		player.renderSelectingWeapon();
		expect(player.selectedWeapon).toBeNull();
		player.selectWeapon();
		let element: HTMLElement = document.querySelector(
			".player--1 .player__weapon .player__weapon-item:first-child"
		) as HTMLElement;

		element.click();
		expect(player.selectedWeapon.name).toBe("Gun");
	});
});
