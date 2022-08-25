module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb',
    'plugin:prettier/recommended',    
    'standard-with-typescript'
  ],    
  ignorePatterns: ['Tile.svelte', 'Mosaic.svelte', 'GridTiles.svelte', 'BlankTile.svelte', 'App(bak).svelte', 'GridControl.svelte'],
  plugins: [
    'svelte3'
  ],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
  }
}
