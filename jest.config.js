module.exports = {
  preset: 'ts-jest',
  // the testing roots
  roots: ['<rootDir>/src'],
  // the pattern to find tests
  testMatch: ['**/?(*.)+(spec|test).+(ts)'],
  // ignore these directories from searching for tests
  moduleDirectories: ['node_modules', 'dist', 'webpack', 'scripts'],
}
