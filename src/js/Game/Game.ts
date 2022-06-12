import WeaponManager from "../../models/WeaponManager";
import Weapon from "../../models/Weapon";
import Player, { PlayerType } from "../Player/Player";
import PlayerUser from "../Player/PlayerUser";
import PlayerAI from "../Player/PlayerAI";

export default class Game {
	player1: Player;
	player2: Player;
	weaponManager: WeaponManager;
	// DOMNodes: {
	// 	player1Weapon: HTMLSelectElement;
	// 	player2Weapon: HTMLSelectElement;
	// 	player1Score: HTMLSpanElement;
	// 	player2Score: HTMLSpanElement;
	// 	player1Name: HTMLSpanElement;
	// 	player2Name: HTMLSpanElement;
	// 	player1Icon: HTMLSpanElement;
	// 	player2Icon: HTMLSpanElement;
	// 	player1SelectedWeapon: HTMLSpanElement;
	// 	player2SelectedWeapon: HTMLSpanElement;
	// 	player1SelectedWeaponIcon: HTMLSpanElement;
	// 	player2SelectedWeaponIcon: HTMLSpanElement;
	// };

	constructor() {
		this.weaponManager = new WeaponManager();

		const rock = new Weapon("Rock", "🗿", ["Scissors"]);
		const paper = new Weapon("Paper", "📄", ["Rock"]);
		const scissors = new Weapon("Scissors", "✂️", ["Paper"]);

		this.weaponManager.addWeapon(rock);
		this.weaponManager.addWeapon(paper);
		this.weaponManager.addWeapon(scissors);

		this.player1 = new PlayerUser("player--1", this.weaponManager);
		this.player2 = new PlayerAI("player--2", this.weaponManager);

		this.renderGame();
	}

	isBothPlayersAI(): boolean {
		return (
			this.player1.type === PlayerType.AI && this.player2.type === PlayerType.AI
		);
	}

	start() {
		this.player1.startChoosingWeapon();
		this.player2.startChoosingWeapon();
		this.renderGame();
	}

	renderGame() {
		this.player1.render();
		this.player2.render();
	}
}
