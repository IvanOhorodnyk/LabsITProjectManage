import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        ignores: ["dist/**", "coverage/**", "node_modules/**", "e2e/**"]
    },
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                console: "readonly",
                document: "readonly",
                localStorage: "readonly",
                jest: "readonly",
                describe: "readonly",
                test: "readonly",
                expect: "readonly",
                beforeEach: "readonly",
                __dirname: "readonly",
                require: "readonly",
                module: "readonly",
                fetch: "readonly",
                MutationObserver: "readonly"
            }
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error"
        }
    }
];