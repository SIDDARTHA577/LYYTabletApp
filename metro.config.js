const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, {
  input: './global.css',
  // NativeWind builds `cliCommand` as `node <absolute path to tailwindcss cli.js>`
  // and then does a naive `.split(" ")` on it before spawning — since this
  // project's path contains a space ("LYY Fields"), that split corrupts the
  // command. Using `node node_modules/tailwindcss/lib/cli.js` (relative path) avoids spaces and npx hangs.
  cliCommand: 'node node_modules/tailwindcss/lib/cli.js',
});
