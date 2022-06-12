// import Weapon from "../../models/Weapon";
import WeaponManager from "../../models/WeaponManager";
import Player, { PlayerType } from "./Player";

export default class PlayerUser extends Player {
	constructor(querySelector: string, weaponManager: WeaponManager) {
		super(querySelector, weaponManager);
		this.type = PlayerType.USER;
	}

	get name(): string {
		return "🐱 You";
	}

	renderSelectingWeapon() {
		const weaponList = this.weaponManager.weapons.map((w) => {
			return `<li class="player__weapon-item" data-weapon="${w.name}" title="${w.name}">${w.icon}</li>`;
		});
		this.elements.weapon.innerHTML = `
			<ul class="player__weapon-list">
				${weaponList.join("")}
			</ul>
		`;
	}
}
