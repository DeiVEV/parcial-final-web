/** @type {import('prettier').Config} */
export default {
  // prettier options
  bracketSpacing: true,
  jsxSingleQuote: true,
  printWidth: 150,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',

  // plugins
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],

  // sort-imports
  importOrder: ['<THIRD_PARTY_MODULES>', '^@.+$', '^@.+/.*$', '^[./]'],
  importOrderSeparation: true,
  importOrderCaseInsensitive: true,
  importOrderSortSpecifiers: true,

  // tailwindcss
  tailwindAttributes: ['theme'],
  tailwindFunctions: ['twMerge', 'createTheme'],
  tailwindConfig: './tailwind.config.js',
};
