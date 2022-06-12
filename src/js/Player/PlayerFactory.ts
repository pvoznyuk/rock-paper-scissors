import WeaponManager from "../Weapon/WeaponManager";
import Player, { PlayerType } from "./Player";
import PlayerAI from "./PlayerAI";
import PlayerUser from "./PlayerUser";

export default class PlayerFactory {
	player: Player;

	createPlayer(
		playerType: PlayerType,
		name: string,
		selector: string,
		weaponManager: WeaponManager
	) {
		switch (playerType) {
			case PlayerType.USER:
				this.player = new PlayerUser(name, selector, weaponManager);
				break;
			case PlayerType.AI:
				this.player = new PlayerAI(name, selector, weaponManager);
				break;
			default:
				throw new Error("Unknown player type");
		}

		return this.player;
	}
}
