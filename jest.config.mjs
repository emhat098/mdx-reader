const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], // Matches test files ending with .spec.ts or .test.ts
};

export default config;