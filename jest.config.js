/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/**/*.test.ts'],
	verbose: true,
	forceExit: true,
	setupFilesAfterEnv: ['./src/test/setup.ts'],
	testTimeout: 30000,
	// clearMocks: true
};
