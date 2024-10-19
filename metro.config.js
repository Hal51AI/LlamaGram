// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push("glb");
//config.resolver.assetExts.push("fbx");
//config.resolver.assetExts.push("gltf");

module.exports = config;

// module.exports = {
//     resolver: {
//       sourceExts: ['js', 'json', 'ts', 'tsx', 'cjs'],
//       assetExts: ['glb', 'png', 'jpg'],
//     },
//   }