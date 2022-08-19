const esbuild = require("esbuild");
const fs = require("fs/promises");
const { name } = require("../manifest.json");
const { minify } = require("html-minifier");

const buildPlugin = async () => {
  await esbuild.build({
    entryPoints: ["./src/plugin/run.ts"],
    bundle: true,
    minify: true,
    outfile: "./build/plugin.js",
  });
};

const buildUi = async () => {
  const result = await esbuild.build({
    entryPoints: ["./src/ui/main.tsx"],
    jsx: "automatic",
    bundle: true,
    minify: true,
    write: false,
    outdir: "./build",
  });

  let html = (await fs.readFile("./src/ui/ui.html")).toString();

  html = html.replaceAll("__name__", name);

  const headClosing = html.indexOf("</head>");
  const bodyClosing = html.indexOf("</body>");

  const js = result.outputFiles.find((file) => file.path.endsWith(".js"));
  const css = result.outputFiles.find((file) => file.path.endsWith(".css"));

  html =
    html.slice(0, headClosing) +
    `<style>${css.text}</style>` +
    html.slice(headClosing, bodyClosing) +
    `<script>${js.text}</script>` +
    html.slice(bodyClosing);

  await fs.writeFile(
    "./build/ui.html",
    minify(html, {
      removeComments: true,
      collapseWhitespace: true,
    })
  );
};

const build = async () => {
  await fs.rm("./build", { recursive: true, force: true });
  await Promise.all([buildPlugin(), buildUi()]);
};

build().catch((err) => {
  console.error("Build failed", err);
  process.exit(1);
});
