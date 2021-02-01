/* eslint-disable no-undef */
/* eslint-disable quotes */
module.exports = {
  roots: ["./src"],
  collectCoverageFrom: ["./src/**/*.ts", "!<rootDir>/src/main/**"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "@src/(.*)": "<rootDir>/src/$1",
    "@test/(.*)": "<rootDir>/test/$1",
    "@data/(.*)": "<rootDir>/src/data/$1",
    "@domain/(.*)": "<rootDir>/src/domain/$1",
    "@infra/(.*)": "<rootDir>/src/infra/$1",
    "@main/(.*)": "<rootDir>/src/main/$1",
    "@presentation/(.*)": "<rootDir>/src/presentation/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
  },
};
