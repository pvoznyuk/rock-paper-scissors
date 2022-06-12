import WeaponManager from "../Weapon/WeaponManager";
import Player, { PlayerType } from "./Player";

export default class PlayerUser extends Player {
	constructor(
		name: string,
		querySelector: string,
		weaponManager: WeaponManager
	) {
		super(name, querySelector, weaponManager);
		this.type = PlayerType.AI;

		this.selectWeapon();
	}

	selectWeapon() {
		this.selectedWeapon = this.weaponManager.getRandomWeapon();
		this.renderWeapon();
		this.dispatchEvent("weapon-selected");
	}

	get playerName(): string {
		return `🤖 ${this.name} (AI)`;
	}

	renderSelectingWeapon() {
		this.elements.weapon.innerHTML = "Calculating...";
	}
}
