import antfu from '@antfu/eslint-config'

export default antfu([
  {
    ignores: [
      'node_modules',
    ],
  },
  {
    files: ['apps/web/**/*.astro'],
    astro: true,
  },
  {
    javascript: true,
    jsonc: false,
    jsx: true,
    markdown: true,
    react: true,
    solid: false,
    stylistic: true,
    svelte: false,
    test: false,
    toml: false,
    typescript: true,
    unocss: false,
    vue: false,
    yaml: true,
  },
])
