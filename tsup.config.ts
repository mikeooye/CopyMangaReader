import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: 'iife',
  outExtension: () => ({ js: '.js' }),
  loader: { '.css': 'text' },
  banner: {
    js: `// ==UserScript==
  // @name        CopyManga Reader
  // @description 拷贝漫画阅读器
  // @namespace   http://tampermonkey.net/
  // @match       *://*.copymanga.com/comic/*/chapter/*
  // @match       *://*.copymanga.org/comic/*/chapter/*
  // @match       *://*.copymanga.site/comic/*/chapter/*
  // @match       *://*.copymanga.tv/comic/*/chapter/*
  // @match       *://*.mangacopy.com/comic/*/chapter/*
  // @match       *://*.2025copy.com/comic/*/chapter/*
  // @match       *://*.2026copy.com/comic/*/chapter/*
  // @version     0.1
  // @grant       none
  // ==/UserScript==`,
  },
});
