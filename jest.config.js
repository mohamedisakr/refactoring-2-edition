module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  reporters: [
    "default",
    [
      "jest-stare",
      {
        resultDir: "results/jest-stare",
        reportTitle: "jest-stare!",
        additionalResultsProcessors: ["jest-html-reporter"],
        coverageLink: "../../coverage/lcov-report/index.html",
        jestStareConfigJson: "jest-stare.json",
        jestGlobalConfigJson: "globalStuff.json"
      }
    ]
  ]
};
