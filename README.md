# Figma Design plugin template with UI & Browser APIs

This is a template for writing Figma Design plugins with UI & browser APIs. It uses typescript, react for ui and esbuild for bundling.

## Getting started

Clone this repo and run

```
npm i
```

Write your plugin code inside `src/plugin`. Build your plugin interface with react in `src/ui`.

Do not delete `src/plugin/run.ts`, `src/ui/main.tsx` and `src/ui/ui.html` files because they are needed during build step!

## Useful resources

Figma plugin API provides css variables for colors used in figma design. You can learn more about it in ["CSS Variables and Theming" section of docs](https://www.figma.com/plugin-docs/css-variables)

To keep your plugin clean you probably should stick to figma's design system that can be found [here](https://www.figma.com/file/Gj9iMcTbFbHrFq1ZWbDBuyc9/UI2%3A-Figma's-Design-System?node-id=0%3A11724).

There are other solutions like [figma-plugin-ds](https://github.com/thomas-lowry/figma-plugin-ds) that provide ready css styling for things like labels / inputs but you'll have to install it yourself if you decide to use it.
