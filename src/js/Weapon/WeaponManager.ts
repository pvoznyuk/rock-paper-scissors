import Weapon, { WeaponData } from "./Weapon";

export default class WeaponManager {
	weapons: Weapon[] = [];

	constructor(weaponList: WeaponData[]) {
		this.addWeaponCollection(weaponList);
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

	isWeaponListValid(weaponList: WeaponData[]): boolean {
		const weaponNames = new Set(weaponList.map((w) => w.name));

		// check if we have at least three weapons
		if (weaponNames.size < 3) {
			return false;
		}

		// check if all weapons are unique
		if (weaponNames.size !== weaponList.length) {
			return false;
		}

		// check if all weapons beat existing weapons
		// but not themselves
		const beatsAreValid = weaponList.reduce((valid, weapon) => {
			return (
				valid &&
				weapon.beats.length > 0 &&
				weapon.beats.every(
					(beat) => weaponNames.has(beat) && beat !== weapon.name
				)
			);
		}, true);

		if (!beatsAreValid) {
			return false;
		}

		// check if every weapon can be beaten
		const canBeBeaten = new Set();

		weaponList.forEach((weapon) => {
			weapon.beats.forEach((beat) => {
				canBeBeaten.add(beat);
			});
		});

		if (canBeBeaten.size !== weaponNames.size) {
			return false;
		}

		return true;
	}

	addWeaponCollection(weaponList: WeaponData[]) {
		if (!this.isWeaponListValid(weaponList)) {
			throw new Error("Weapon list is not valid");
		}

		this.weapons = weaponList.map((w) => new Weapon(w));
	}
}
