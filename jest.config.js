// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
};

module.exports = config;

// Or async function
module.exports = async () => {
  return {
    verbose: true,
    preset: "jest-puppeteer",
    rootDir: "./",
    testEnvironment: "node",
    "transform": {
      "^.+\\.jsx?$": "babel-jest",
      "^.+\\.tsx?$": "babel-jest"
    },
    moduleFileExtensions: ["js", "mjs"],
    transformIgnorePatterns: ["/node_modules/(?!(mui-tel-input)/)"]    
  };
};
