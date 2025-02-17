import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	testEnvironment: "jsdom",
	verbose: true,
	transform: {
		"^.+\\.ts$": "ts-jest",
	},
};
export default config;
