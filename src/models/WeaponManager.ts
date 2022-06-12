import Weapon from "./Weapon";

export default class WeaponManager {
	weapons: Weapon[];

	constructor() {
		this.weapons = [];
	}

	hasWeapon(weaponName: string): boolean {
		return this.weapons.some((w) => w.name === weaponName);
	}

	getWeapon(weaponName: string): Weapon {
		return this.weapons.find((w) => w.name === weaponName);
	}

	addWeapon(weapon: Weapon, beatenBy?: string[]) {
		// check if this weapon already exist
		if (this.hasWeapon(weapon.name)) {
			throw new Error(`Weapon ${weapon.name} already exist`);
		}

		// check if this weapon beats something
		if (weapon.beats.length === 0) {
			throw new Error(`Weapon ${weapon.name} can not beat anything`);
		}

		// what this wepaon can be beaten by
		beatenBy?.forEach((existingWeaponName) => {
			if (weapon.name === existingWeaponName) {
				throw new Error(`Weapon ${weapon.name} can not beat itself`);
			}
			if (!this.hasWeapon(existingWeaponName)) {
				throw new Error(
					`Weapon ${weapon.name} can not beat ${existingWeaponName} cause it is not exist`
				);
			}
			this.getWeapon(existingWeaponName).beats.push(weapon.name);
		});

		this.weapons.push(weapon);
	}

	removeWeapon(weapon: Weapon) {
		this.weapons = this.weapons
			.filter((w) => w.name !== weapon.name)
			.map((w) => {
				w.beats = w.beats.filter((b) => b !== weapon.name);
				return w;
			});
	}
}
