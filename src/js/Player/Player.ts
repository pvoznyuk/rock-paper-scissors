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
		weaponList: HTMLElement;
		selectedWeapon: HTMLDivElement;
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

		// Cache DOM nodes
		this.elements = {
			weapon: this.DOMElement.querySelector("div.player__weapon"),
			name: this.DOMElement.querySelector("h2.player__name"),
			score: this.DOMElement.querySelector("p.player__score span"),
			weaponList: this.DOMElement.querySelector(
				".player__weapon .player__weapon-list"
			),
			selectedWeapon: this.DOMElement.querySelector(
				".player__weapon .player__selected-weapon"
			),
		};

		this.renderName();
		this.renderScore();
		this.generateWeaponList();
		this.showWeaponList();
	}

	abstract get playerName(): string;

	abstract selectWeapon(selectWeapon?: Weapon): void;

	abstract generateWeaponList(): void;

	renderName() {
		this.elements.name.innerHTML = this.playerName;
	}

	renderScore() {
		this.elements.score.innerHTML = this.score.toString();
	}

	showWeaponList() {
		this.elements.weapon.dataset.state = "selecting";
		this.selectedWeapon = null;
	}

	showSelectedWeapon() {
		this.elements.weapon.dataset.state = "selected";
		this.elements.selectedWeapon.innerHTML = this.selectedWeapon.render();
	}

	reset() {
		this.score = 0;
		this.renderScore();
	}

	win() {
		this.score = this.score + 1;
		this.renderScore();
	}

	dispatchEvent(eventName: string) {
		this.DOMElement.dispatchEvent(new CustomEvent(eventName));
	}
}
