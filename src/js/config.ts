export type WeaponData = {
	name: string;
	icon: string;
	beats: string[];
};

// Classic Rock/Paper/Scissors game
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

// Extended rules: with Lizard and Spock
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

// Extended rules: with Beer (beats Scissors and Rock but can be beaten by Paper)
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
