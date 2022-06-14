import Weapon from "../src/js/Weapon/Weapon";
import WeaponManager from "../src/js/Weapon/WeaponManager";
import weapons from "./__mocks__/weapons";

describe("Weapon Manager", () => {
	describe("Valid weapon set", () => {
		const weaponManager: WeaponManager = new WeaponManager(weapons);

		it("should tell if a weapon in the list", () => {
			expect(weaponManager.hasWeapon("Rock")).toBe(true);
		});

		it("should return a weapon by name", () => {
			expect(weaponManager.getWeaponByName("Rock").name).toBe("Rock");
		});

		it("should return a random weapon", () => {
			expect(weaponManager.getRandomWeapon()).toBeInstanceOf(Weapon);
		});
	});

	describe("Invalid weapon set", () => {
		const weaponManager: WeaponManager = new WeaponManager(weapons);

		it("should not validate an empty list", () => {
			expect(weaponManager.isWeaponListValid([])).toBe(false);
		});

		it("should not validate a list of two elements", () => {
			expect(weaponManager.isWeaponListValid([weapons[0], weapons[1]])).toBe(
				false
			);
		});

		it("should not validate a list with duplicates", () => {
			expect(
				weaponManager.isWeaponListValid([
					{ name: "Rock", icon: "", beats: ["Scissors"] },
					{ name: "Rock", icon: "", beats: ["Scissors"] },
					{ name: "Paper", icon: "", beats: ["Rock"] },
					{ name: "Scissors", icon: "", beats: ["Rock"] },
				])
			).toBe(false);
		});

		it("should not validate a list if some weapon beats itself", () => {
			expect(
				weaponManager.isWeaponListValid([
					{ name: "Rock", icon: "", beats: ["Rock"] },
					{ name: "Paper", icon: "", beats: ["Rock"] },
					{ name: "Scissors", icon: "", beats: ["Paper"] },
				])
			).toBe(false);
		});

		it("should not validate a list if some weapon doesn't beat anything", () => {
			expect(
				weaponManager.isWeaponListValid([
					{ name: "Rock", icon: "", beats: [] },
					{ name: "Paper", icon: "", beats: ["Rock"] },
					{ name: "Scissors", icon: "", beats: ["Paper"] },
				])
			).toBe(false);
		});

		it("should not validate a list if some weapon beats invalid weapon", () => {
			expect(
				weaponManager.isWeaponListValid([
					{ name: "Rock", icon: "", beats: ["Helicopter"] },
					{ name: "Paper", icon: "", beats: ["Rock"] },
					{ name: "Scissors", icon: "", beats: ["Paper"] },
				])
			).toBe(false);
		});

		it("should not validate a list if some weapon can't be beaten", () => {
			expect(
				weaponManager.isWeaponListValid([
					{ name: "Rock", icon: "", beats: ["Scissors"] },
					{ name: "Paper", icon: "", beats: ["Beer"] },
					{ name: "Beer", icon: "", beats: ["Scissors"] },
					{ name: "Scissors", icon: "", beats: ["Paper"] },
				])
			).toBe(false);
		});

		it("should throw an error if trying to add an invalid weapon list", () => {
			expect(() => {
				weaponManager.addWeaponCollection([]);
			}).toThrowError("Weapon list is not valid");
		});
	});
});
