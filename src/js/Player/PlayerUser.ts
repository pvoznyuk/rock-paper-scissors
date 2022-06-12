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

		this.selectWeapon();
	}

	selectWeapon() {
		this.elements.weapon.addEventListener("click", (e) => {
			const target = e.target as HTMLElement;

			if (target.classList.contains("player__weapon-item")) {
				this.selectedWeapon = this.weaponManager.getWeaponByName(
					target.dataset.weapon
				);
				this.renderWeapon();
				this.dispatchEvent("weapon-selected");
			}
		});
	}

	get playerName(): string {
		return `🐱 ${this.name} (you)`;
	}

	renderSelectingWeapon() {
		this.elements.weapon.innerHTML = `
			<nav class="player__weapon-list">
				${this.weaponManager.weapons
					.map(
						(w) =>
							`<button class="player__weapon-item" data-weapon="${w.name}" title="${w.name}">${w.icon}</button>`
					)
					.join("")}
			</nav>
		`;
	}
}
