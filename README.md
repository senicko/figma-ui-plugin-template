# Figma Design plugin template with UI & Browser APIs

This is a template for writing Figma Design plugins with UI & browser APIs. It uses typescript, react for ui and esbuild for bundling.

## Getting started

### Manifest.json

First you need to update the `manifest.json`. Idk if there is a simpler way than generating the basic plugin template in figma by going to `plugin > development > new plugin` and then creating `figma design plugin > with ui & browser APIs`. Then you have to save the folder figma generated somewhere and take everything from `manifest.json` inside it, excluding `main` and `ui` options, and put it inside of this repo's `manifest.json`.

Now you can remove the plugin created by figma (the folder you saved in the step above), and add a new plugin providing `manifest.json` from THIS repo. To remove invalid plugins go to `plugin > development > manage plugins in development`. To add go to `plugin > development > import plugin from manifest`.

### Running

Install dependencies

```
npm i
```

To just build your plugin run

```
npm run build
```

To start development mode (rebuild on change) run

```
npm run dev
```

Do not delete `src/plugin/run.ts`, `src/ui/main.tsx` and `src/ui/ui.html` files because they are needed during build step!

## Useful resources

Figma plugin API provides css variables for colors used in figma design. You can learn more about it in ["CSS Variables and Theming" section of docs](https://www.figma.com/plugin-docs/css-variables)

To keep your plugin clean you probably should stick to figma's design system that can be found [here](https://www.figma.com/file/Gj9iMcTbFbHrFq1ZWbDBuyc9/UI2%3A-Figma's-Design-System?node-id=0%3A11724).

There are other solutions like [figma-plugin-ds](https://github.com/thomas-lowry/figma-plugin-ds) that provide ready css styling for things like labels / inputs but you'll have to install it yourself if you decide to use it.
