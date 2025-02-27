const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    resolver: {
      assetExts, // mantém as extensões padrão de assets
      sourceExts: [...sourceExts, 'mjs'], // adiciona a extensão .mjs
    },
  };
})();