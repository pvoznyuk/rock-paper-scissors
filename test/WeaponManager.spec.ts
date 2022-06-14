import Weapon from "../src/js/Weapon/Weapon";
import WeaponManager from "../src/js/Weapon/WeaponManager";

describe("Weapon Manager", () => {
	const weaponManager: WeaponManager = new WeaponManager();

	it("should add a weapon", () => {
		expect(weaponManager.weapons.length).toBe(0);
		weaponManager.addWeapon(
			new Weapon({ name: "Gun", icon: "🔫", beats: ["Sword"] })
		);
		expect(weaponManager.weapons.length).toBe(1);
	});

	it("should tell if a weapon in the list", () => {
		expect(weaponManager.hasWeapon("Gun")).toBe(true);
	});

	it("should return a weapon by name", () => {
		expect(weaponManager.getWeaponByName("Gun")).toBeInstanceOf(Weapon);
	});

	it("should return a random weapon", () => {
		expect(weaponManager.getRandomWeapon()).toBeInstanceOf(Weapon);
	});

	it("should not add a weapon if it is already in the list", () => {
		expect(() =>
			weaponManager.addWeapon(
				new Weapon({ name: "Gun", icon: "🔫", beats: ["Sword"] })
			)
		).toThrowError("Weapon Gun is already in the list");
		expect(weaponManager.weapons.length).toBe(1);
	});

	it("should not add a weapon if it cannot beat anything", () => {
		expect(() =>
			weaponManager.addWeapon(
				new Weapon({ name: "Sword", icon: "🗡", beats: [] })
			)
		).toThrowError("Weapon Sword can not beat anything");
		expect(weaponManager.weapons.length).toBe(1);
	});

	it("should not add a weapon if it beats itself", () => {
		expect(() =>
			weaponManager.addWeapon(
				new Weapon({ name: "Sword", icon: "🗡", beats: ["Sword"] })
			)
		).toThrowError("Weapon Sword can not beat itself");
		expect(weaponManager.weapons.length).toBe(1);
	});

	it("should not add weapons if they can beat each other", () => {
		expect(() =>
			weaponManager.addWeapon(
				new Weapon({ name: "Sword", icon: "🗡", beats: ["Gun"] })
			)
		).toThrowError("Weapons can not beat each other");
		expect(weaponManager.weapons.length).toBe(1);
	});
});
