import Weapon from "../Weapon/Weapon";
import WeaponManager from "../Weapon/WeaponManager";

export enum PlayerType {
	USER,
	AI,
}

export default abstract class Player {
	name: string;
	type: PlayerType;
	score: number;
	selectedWeapon: Weapon;
	weaponManager: WeaponManager;

	DOMElement: HTMLDivElement;
	elements: {
		weapon: HTMLDivElement;
		name: HTMLDivElement;
		score: HTMLDivElement;
	};

	constructor(
		name: string,
		querySelector: string,
		weaponManager: WeaponManager
	) {
		this.name = name;
		this.score = 0;
		this.selectedWeapon = null;
		this.weaponManager = weaponManager;
		this.DOMElement = document.querySelector(querySelector);

		this.elements = {
			weapon: this.DOMElement.querySelector("div.player__weapon"),
			name: this.DOMElement.querySelector("h2.player__name"),
			score: this.DOMElement.querySelector("p.player__score span"),
		};

		this.render();
	}

	abstract get playerName(): string;

	abstract selectWeapon(): void;

	abstract renderSelectingWeapon(): void;

	startChoosingWeapon() {
		this.selectedWeapon = null;
		this.renderWeapon();
	}

	render() {
		this.elements.name.innerHTML = this.playerName;
		this.elements.score.innerHTML = this.score.toString();
		this.renderWeapon();
	}

	renderWeapon() {
		if (this.selectedWeapon) {
			this.elements.weapon.innerHTML = this.selectedWeapon.render();
			return;
		}
		this.renderSelectingWeapon();
	}

	win() {
		this.score = this.score + 1;
	}

	dispatchEvent(eventName: string) {
		this.DOMElement.dispatchEvent(new CustomEvent(eventName));
	}
}
