import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";

export default defineConfig([
    // Files to ignore
    {
        ignores: [
            "**/node_modules/**",
            "**/achiever-api/generated/**",
            "**/achiever-api/dist/**",
            "**/playwright-report/**",
            "**/test-results/**",
            "**/.git/**",
            "**/package-lock.json"             // Auto-generated, don't lint
        ]
    },

    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: { 
            globals: {
                ...globals.browser, 
                ...globals.node,
                bootstrap: "readonly"  // Bootstrap loaded via CDN
            } 
        },
        rules: {
            "indent": ["error", 4]
        }
    },

    tseslint.configs.recommended,

    // Allow require() in backend Node.js files (must come after tseslint config)
    {
        files: ["achiever-api/**/*.js"],
        rules: {
            "@typescript-eslint/no-require-imports": "off",
            "@typescript-eslint/no-unused-vars": ["error", { 
                "argsIgnorePattern": "^_",  // Ignore vars starting with _
                "caughtErrors": "none"       // Don't error on unused catch variables
            }],
            "indent": ["error", 4]
        }
    },

    {
        files: ["**/*.json"],
        plugins: { json },
        language: "json/json",
        extends: ["json/recommended"]
    },
]);