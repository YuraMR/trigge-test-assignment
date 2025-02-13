module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["./jest.setup.js"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js", // ✅ Mock CSS files
  },
  testMatch: ["<rootDir>/src/**/*.test.js"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/**/*.test.js",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
};
