const esbuild = require("esbuild");
const { minify } = require("html-minifier");
const fs = require("fs/promises");

/**
 * buildPlugin builds figma plugin core.
 * @param {boolean} watch
 */
const buildPlugin = async (watch = false) => {
  await esbuild.build({
    entryPoints: ["./src/plugin/run.ts"],
    bundle: true,
    minify: true,
    outfile: "./build/plugin.js",
    logLevel: "info",
    watch,
  });
};

/**
 * htmlOutput puts css and js bundles produced by esbuild into html single file.
 * @param {esbuild.BuildResult} buildResult
 */
const htmlOutput = async (buildResult) => {
  const jsBundle = buildResult.outputFiles.find((file) =>
    file.path.endsWith(".js")
  );

  const cssBundle = buildResult.outputFiles.find((file) =>
    file.path.endsWith(".css")
  );

  let html = (await fs.readFile("./src/ui/ui.html")).toString();
  const headClosing = html.indexOf("</head>");
  const bodyClosing = html.indexOf("</body>");

  html =
    html.slice(0, headClosing) +
    `<style>${cssBundle.text}</style>` +
    html.slice(headClosing, bodyClosing) +
    `<script>${jsBundle.text}</script>` +
    html.slice(bodyClosing);

  await fs.writeFile(
    "./build/ui.html",
    minify(html, {
      removeComments: true,
      collapseWhitespace: true,
    })
  );
};

/**
 * buildUi builds figma plugin ui.
 * @param {boolean} watch
 */
const buildUi = async (watch = false) => {
  const result = await esbuild.build({
    entryPoints: ["./src/ui/main.tsx"],
    jsx: "automatic",
    bundle: true,
    minify: true,
    write: false,
    outdir: "./build",
    logLevel: "info",
    watch,
  });

  await htmlOutput(result);
};

module.exports = {
  buildPlugin,
  buildUi,
};
