import WeaponManager from "../Weapon/WeaponManager";
import Weapon from "../Weapon/Weapon";
import Player, { PlayerType } from "../Player/Player";
import PlayerUser from "../Player/PlayerUser";
import PlayerAI from "../Player/PlayerAI";
import { WeaponData } from "../config";
import PlayerFactory from "../Player/PlayerFactory";

export default class Game {
	name: string;
	playerTypes: PlayerType[];
	player1: Player;
	player2: Player;
	playerFactory: PlayerFactory;
	weaponManager: WeaponManager;

	resultPanel: HTMLDivElement;

	constructor(
		name: string,
		weaponList: WeaponData[],
		playerTypes: PlayerType[]
	) {
		this.name = name;
		document.getElementById("h1").innerHTML = this.name;

		// Weapons
		this.weaponManager = new WeaponManager();
		weaponList.forEach((weaponData) => {
			this.weaponManager.addWeapon(new Weapon(weaponData));
		});

		// Players
		this.playerTypes = playerTypes;
		this.playerFactory = new PlayerFactory();
		this.createPlayers();
		this.addPlayersListener();

		// Result panel and Next round event
		this.resultPanel = document.querySelector(".game__result");
		this.resultPanel
			.querySelector("#next")
			.addEventListener("click", this.startRound.bind(this));

		// Reset event
		document
			.querySelector("#reset")
			.addEventListener("click", this.reset.bind(this));

		this.renderGame();
	}

	createPlayers() {
		this.player1 = this.playerFactory.createPlayer(
			this.playerTypes[0],
			"Player 1",
			".player--1",
			this.weaponManager
		);
		this.player2 = this.playerFactory.createPlayer(
			this.playerTypes[1],
			"Player 2",
			".player--2",
			this.weaponManager
		);
	}

	reset() {
		this.createPlayers();
		this.startRound();
	}

	startRound() {
		this.player1.startChoosingWeapon();
		this.player2.startChoosingWeapon();
		this.resultPanel.classList.toggle("game__result--ready", false);
		this.resultPanel.querySelector(".game__result-text").innerHTML =
			"Choose your weapon";
		this.renderGame();

		if (this.areBothPlayersAI()) {
			this.player1.selectWeapon();
		}
	}

	selectWinner() {
		const player1Weapon = this.player1.selectedWeapon;
		const player2Weapon = this.player2.selectedWeapon;

		if (!player1Weapon || !player2Weapon) {
			throw new Error("No weapon selected");
		}

		if (player1Weapon.beats.includes(player2Weapon.name)) {
			this.player1.win();
			this.showResult(`${this.player1.playerName} Wins!`);
		} else if (player2Weapon.beats.includes(player1Weapon.name)) {
			this.player2.win();
			this.showResult(`${this.player2.playerName} Wins!`);
		} else {
			this.showResult(`Draw!`);
		}

		this.renderGame();
	}

	showResult(message: string) {
		this.resultPanel.classList.toggle("game__result--ready", true);
		this.resultPanel.querySelector(".game__result-text").innerHTML = message;
	}

	addPlayersListener() {
		this.player1.DOMElement.addEventListener("weapon-selected", () => {
			this.player2.selectWeapon();
		});
		this.player2.DOMElement.addEventListener("weapon-selected", () => {
			this.selectWinner();
		});
	}

	areBothPlayersAI(): boolean {
		return (
			this.player1.type === PlayerType.AI && this.player2.type === PlayerType.AI
		);
	}

	renderGame() {
		this.player1.render();
		this.player2.render();
	}
}
