import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Use ts-jest preset to handle TypeScript files
  testEnvironment: 'node', // Set the test environment to Node.js
  transform: {
    '^.+\\.ts$': 'ts-jest', // Transform TypeScript files using ts-jest
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'], // File extensions Jest will process
  testMatch: ['**/__tests__/**/*.test.ts'], // Match test files with .test.ts extension
  coverageDirectory: 'coverage', // Directory to output coverage reports
  collectCoverage: true, // Enable coverage collection
  verbose: true, // Show detailed test results
  setupFiles: ['dotenv/config'], // Load environment variables from .env
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json', // Use a specific tsconfig for Jest
    },
  },
};

export default config;
