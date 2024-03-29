module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    extend: {},
  },
  variants: {
    display: ['group-hover'],
    margin: ['first'],
    opacity: ['disabled'],
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
}
