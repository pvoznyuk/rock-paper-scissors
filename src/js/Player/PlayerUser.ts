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
		this.type = PlayerType.USER;
	}

	get playerName(): string {
		return `🐱 ${this.name} (you)`;
	}

	selectWeapon(weapon?: Weapon) {
		this.selectedWeapon = weapon || null;
		if (this.selectedWeapon) {
			this.showSelectedWeapon();
		}
	}

	generateWeaponList() {
		this.weaponManager.weapons.forEach((weapon) => {
			const weaponElement = document.createElement("button");
			weaponElement.classList.add("player__weapon-item");
			weaponElement.innerHTML = weapon.render();
			weaponElement.dataset.weapon = weapon.name;
			weaponElement.ariaLabel = weapon.name;

			this.elements.weaponList.appendChild(weaponElement);

			weaponElement.addEventListener("click", () => {
				this.selectWeapon(this.weaponManager.getWeaponByName(weapon.name));
				this.dispatchEvent("weapon-selected");
			});
		});
	}
}
