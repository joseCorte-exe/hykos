process.env.EXPO_ROUTER_APP_ROOT = '../../src/app';

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv'],
      require.resolve("expo-router/babel"),

      [
        'module-resolver',
        {
          alias: {
            // '@components': './src/components',
            '@components': './src/components',
            '@hooks': './src/hooks',
            '@contexts': './src/contexts',
            '@services': './src/services',
            '@shared': './src/shared',
            '@styles': './src/styles',
            '@templates': './src/templates',
            '@lib': './src/lib',
            '@store': './src/store'
          }
        }
      ]
    ],
  };
};
