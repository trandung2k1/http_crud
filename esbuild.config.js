//! Basic
require("esbuild").buildSync({
  entryPoints: ["src/index.js"],
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: "node",
  //target: ["chrome58", "firefox57", "safari11", "edge16"],
  outdir: "dist",
});
