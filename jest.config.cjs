module.exports = {
    'setupFilesAfterEnv': ['<rootDir>/jest.setup.js'],
    'transform': {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.svelte$': ['svelte-jester'],
        '^.+\\.svg$': 'jest-transformer-svg'
    },
    'moduleNameMapper': {'^.+\\.(css|less|scss)$': 'babel-jest'},
    'modulePathIgnorePatterns': ['dist', 'build'],
    'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|ts?|svelte?)$',
    'moduleFileExtensions': ['js', 'ts', 'svelte'],
    'testEnvironment': 'jsdom',
    'transformIgnorePatterns': ['node_modules/',]
};