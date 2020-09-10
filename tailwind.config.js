module.exports = {
  purge: [
    './src/**/*.tsx',
  ],
  theme: {
    extend: {},
  },
  variants: {
    display: ['group-hover'],
    margin: ['first']
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
}
