import Weapon from "../Weapon/Weapon";
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
	}

	get playerName(): string {
		return `🤖 ${this.name} (AI)`;
	}

	selectWeapon(selectWeapon?: Weapon) {
		this.selectedWeapon = selectWeapon || this.weaponManager.getRandomWeapon();
		this.showSelectedWeapon();
		this.dispatchEvent("weapon-selected");
	}

	generateWeaponList() {
		this.elements.weaponList.innerHTML = "Calculating...";
	}
}
