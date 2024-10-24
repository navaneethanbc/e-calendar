module.exports = {
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest", // To handle ES6+ with Babel
  },
  moduleFileExtensions: ["js", "jsx"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
};
