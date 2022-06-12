export default class Weapon {
	name: string;
	icon: string;
	beats: string[];

	constructor(name: string, icon: string, beats: string[]) {
		this.name = name;
		this.icon = icon;
		this.beats = beats;
	}
}
