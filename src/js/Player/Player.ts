import Weapon from "../../models/Weapon";
import WeaponManager from "../../models/WeaponManager";

export enum PlayerType {
	USER,
	AI,
}

export default abstract class Player {
	type: PlayerType;
	score: number;
	isSelectingWeapon: boolean;
	selectedWeapon: Weapon;
	weaponManager: WeaponManager;

	DOMElement: HTMLDivElement;
	elements: {
		weapon: HTMLDivElement;
		name: HTMLDivElement;
		score: HTMLDivElement;
	};

	constructor(querySelector: string, weaponManager: WeaponManager) {
		this.score = 0;
		this.isSelectingWeapon = false;
		this.selectedWeapon = null;
		this.weaponManager = weaponManager;
		this.DOMElement = document.querySelector(querySelector);
		this.elements.weapon = this.DOMElement.querySelector(".player__weapon");
		this.elements.name = this.DOMElement.querySelector(".player__name");
		this.elements.score = this.DOMElement.querySelector(".player__score");
		this.render();
	}

	startChoosingWeapon() {
		this.selectedWeapon = null;
		this.isSelectingWeapon = true;
		this.renderWeapon();
	}

	abstract get name(): string;

	render() {
		this.elements.name.innerHTML = this.name;
		this.elements.score.innerHTML = this.score.toString();
		this.renderWeapon();
	}

	abstract renderSelectingWeapon(): void;

	renderWeapon() {
		if (this.isSelectingWeapon) {
			this.renderSelectingWeapon();
			return;
		}
		if (this.selectedWeapon) {
			this.elements.weapon.innerHTML = this.selectedWeapon.icon;
			return;
		}
		this.elements.weapon.innerHTML = "";
	}
}
