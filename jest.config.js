module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/config/',
    '__data__',
    'errors.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  extensionsToTreatAsEsm: ['.ts'],
  setupFilesAfterEnv: ['./jest/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/config/', '/build/', '__data__'],
  verbose: true,
};
