import Weapon from "./Weapon";

export default class WeaponManager {
	weapons: Weapon[];

	constructor() {
		this.weapons = [];
	}

	hasWeapon(weaponName: string): boolean {
		return this.weapons.some((w) => w.name === weaponName);
	}

	getWeaponByName(weaponName: string): Weapon {
		return this.weapons.find((w) => w.name === weaponName);
	}

	getRandomWeapon(): Weapon {
		return this.weapons[Math.floor(Math.random() * this.weapons.length)];
	}

	addWeapon(weapon: Weapon) {
		// check if this weapon already exist
		if (this.hasWeapon(weapon.name)) {
			throw new Error(`Weapon ${weapon.name} is already in the list`);
		}

		// check if this weapon beats something
		if (weapon.beats.length === 0) {
			throw new Error(`Weapon ${weapon.name} can not beat anything`);
		}

		weapon.beats.forEach((anotherName) => {
			if (weapon.name === anotherName) {
				throw new Error(`Weapon ${weapon.name} can not beat itself`);
			}

			const existingWeapon = this.getWeaponByName(anotherName);

			if (
				existingWeapon &&
				weapon.beats.includes(anotherName) &&
				existingWeapon.beats.includes(weapon.name)
			) {
				throw new Error(`Weapons can not beat each other`);
			}
		});

		this.weapons.push(weapon);
	}
}
