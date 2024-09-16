import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./src/setup-jest.ts"],
  moduleDirectories: ["node_modules", "utils", "__dirname"],
};

export default config;
