module.exports = {
  sections: [
    {
      name: "UI Components",
      content: "src/components/Readme.md",
      components: "src/components/**/*.tsx",
      exampleMode: "expand", // 'hide' | 'collapse' | 'expand'
      usageMode: "expand", // 'hide' | 'collapse' | 'expand'
    },
    {
      name: "Pages",
      content: "src/pages/Readme.md",
      components: "src/pages/**/*.tsx",
      exampleMode: "expand", // 'hide' | 'collapse' | 'expand'
      usageMode: "expand", // 'hide' | 'collapse' | 'expand'
    },
  ],
  propsParser: require("react-docgen-typescript").withCustomConfig("./tsconfig.json")
    .parse,
};
