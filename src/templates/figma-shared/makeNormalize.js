export function makeNormalize(defaultConfig) {
  return function normalize(input) {
    const out = {};
    for (const key of Object.keys(defaultConfig)) {
      out[key] = input[key] !== undefined ? input[key] : defaultConfig[key];
    }
    return out;
  };
}
