module.exports = {
  purge: [
    './src/**/*.tsx',
  ],
  theme: {
    extend: {},
  },
  variants: {
    display: ['group-hover']
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
}
