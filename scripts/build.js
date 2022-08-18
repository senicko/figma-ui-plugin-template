const esbuild = require("esbuild");
const fs = require("fs/promises");
const { name } = require("../manifest.json");
const { minify } = require("html-minifier");

const build = async () => {
  await fs.rm("./build", { recursive: true, force: true });

  await esbuild.build({
    entryPoints: ["./plugin/plugin.ts"],
    bundle: true,
    minify: true,
    outfile: "./build/plugin.js",
  });

  const result = await esbuild.build({
    entryPoints: ["./ui/main.tsx"],
    bundle: true,
    minify: true,
    write: false,
    outdir: "./build",
  });

  let html = (await fs.readFile("./ui/template.html")).toString();

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

build().catch((err) => {
  console.error("Build failed", err);
  process.exit(1);
});
