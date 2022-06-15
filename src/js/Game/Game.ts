import WeaponManager from "../Weapon/WeaponManager";
import { WeaponData } from "../Weapon/Weapon";
import Player, { PlayerType } from "../Player/Player";
import PlayerAI from "../Player/PlayerAI";
import PlayerFactory from "../Player/PlayerFactory";

export default class Game {
	name: string;
	playerTypes: PlayerType[];
	player1: Player;
	player2: Player;
	playerFactory: PlayerFactory;
	weaponManager: WeaponManager;

	elements: {
		gameName: HTMLElement;
		resultPanel: HTMLElement;
		resultText: HTMLElement;
		nextButton: HTMLElement;
		resetButton: HTMLElement;
	};

	constructor(
		name: string,
		weaponList: WeaponData[],
		playerTypes: PlayerType[]
	) {
		this.name = name;

		// cache DOM nodes
		this.elements = {
			gameName: document.getElementById("game-name"),
			resultPanel: document.querySelector(".game__result"),
			resultText: document.querySelector(".game__result-text"),
			nextButton: document.getElementById("next"),
			resetButton: document.getElementById("reset"),
		};

		this.elements.gameName.innerHTML = this.name;

		// Next round button listener
		this.elements.nextButton.addEventListener(
			"click",
			this.startRound.bind(this)
		);

		// Reset button listener
		this.elements.resetButton.addEventListener("click", this.reset.bind(this));

		try {
			// Weapons
			this.weaponManager = new WeaponManager(weaponList);

			// Players
			this.playerTypes = playerTypes;
			this.playerFactory = new PlayerFactory();
			this.createPlayers();
			this.addPlayersListener();
		} catch (error) {
			this.setInformationText(error);
		}
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
		this.player1.reset();
		this.player2.reset();
		this.startRound();
	}

	startRound() {
		this.player1.showWeaponList();
		this.player2.showWeaponList();

		this.elements.resultPanel.classList.toggle("game__result--ready", false);
		this.setInformationText("Choose your weapon");

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
	}

	showResult(message: string) {
		this.elements.resultPanel.classList.toggle("game__result--ready", true);
		this.setInformationText(message);
	}

	addPlayersListener() {
		[this.player1, this.player2].forEach((player) => {
			player.DOMElement.addEventListener("weapon-selected", () => {
				if (this.player1.selectedWeapon && this.player2.selectedWeapon) {
					this.selectWinner();
				} else {
					[this.player1, this.player2].forEach((player) => {
						if (player instanceof PlayerAI && !player.selectedWeapon) {
							player.selectWeapon();
						}
					});
				}
			});
		});
	}

	areBothPlayersAI(): boolean {
		return (
			this.player1.type === PlayerType.AI && this.player2.type === PlayerType.AI
		);
	}

	setInformationText(message: string) {
		this.elements.resultText.innerHTML = message;
	}
}
