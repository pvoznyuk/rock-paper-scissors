export type WeaponData = {
	name: string;
	icon: string;
	beats: string[];
};

export const rpsWeapons = [
	{
		name: "Rock",
		icon: "✊",
		beats: ["Scissors"],
	},
	{
		name: "Paper",
		icon: "✋",
		beats: ["Rock"],
	},
	{
		name: "Scissors",
		icon: "✌️",
		beats: ["Paper"],
	},
];

export const rpslsWeapons = [
	{
		name: "Rock",
		icon: "✊",
		beats: ["Scissors", "Lizard"],
	},
	{
		name: "Paper",
		icon: "✋",
		beats: ["Rock", "Spock"],
	},
	{
		name: "Scissors",
		icon: "✌️",
		beats: ["Paper", "Lizard"],
	},
	{
		name: "Lizard",
		icon: "🦎",
		beats: ["Paper", "Spock"],
	},
	{
		name: "Spock",
		icon: "🖖",
		beats: ["Rock", "Scissors"],
	},
];

export const rpsbWeapons = [
	{
		name: "Rock",
		icon: "✊",
		beats: ["Scissors"],
	},
	{
		name: "Paper",
		icon: "✋",
		beats: ["Rock", "Beer"],
	},
	{
		name: "Scissors",
		icon: "✌️",
		beats: ["Paper"],
	},
	{
		name: "Beer",
		icon: "🍺",
		beats: ["Rock", "Scissors"],
	},
];
