// import Weapon from "../../models/Weapon";
import WeaponManager from "../../models/WeaponManager";
import Player, { PlayerType } from "./Player";

export default class PlayerUser extends Player {
	constructor(querySelector: string, weaponManager: WeaponManager) {
		super(querySelector, weaponManager);
		this.type = PlayerType.AI;
	}

	get name(): string {
		return "🤖 AI";
	}

	renderSelectingWeapon() {
		this.elements.weapon.innerHTML = "Thinking...";
	}
}
