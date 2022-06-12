import { WeaponData } from "../config";

export default class Weapon {
	name: string;
	icon: string;
	beats: string[];

	constructor(weaponData: WeaponData) {
		this.name = weaponData.name;
		this.icon = weaponData.icon;
		this.beats = weaponData.beats;
	}

	render() {
		return `
			<div class="weapon">
				<div class="weapon__icon">${this.icon}</div>
				<div class="weapon__name">${this.name}</div>
			</div>
		`;
	}
}
