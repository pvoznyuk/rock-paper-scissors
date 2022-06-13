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
		if (playerType === PlayerType.USER) {
			this.player = new PlayerUser(name, selector, weaponManager);
		} else {
			this.player = new PlayerAI(name, selector, weaponManager);
		}

		return this.player;
	}
}
