const esbuild = require("esbuild");
const fs = require("fs");

fs.rm("./build", { recursive: true, force: true }, (err) => {
  if (err) {
    console.error("failed to clear build directory", err);
    process.exit(1);
  }

  // build plugin
  esbuild
    .build({
      entryPoints: ["./plugin/plugin.ts"],
      bundle: true,
      minify: true,
      outfile: "./build/plugin.js",
    })
    .catch(() => process.exit(1));

  // TODO: Bundle ui.js and it's css file into single ui.html file

  // build ui
  esbuild
    .build({
      entryPoints: ["./ui/main.tsx"],
      bundle: true,
      minify: true,
      write: false,
      outfile: "./build/ui.js",
    })
    .catch(() => process.exit(1))
    .then((result) => {
      console.log(result.outputFiles);
    });
});
