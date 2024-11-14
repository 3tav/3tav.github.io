import { replaceInFileSync } from "replace-in-file";

function replaceFix() {
  const options = {
    files: [
      "publication/**/*.html",
      // "publication/**/*.js",
      // "publication/**/*.css",
      // "publication/**/*.json",
    ],
    from: [/.*<link\ rel="alternate".*/g],
    to: [""],
  };

  try {
    const results = replaceInFileSync(options);
    console.log("Results:", results.filter((e) => e.hasChanged).length);
    return;
  } catch (error) {
    return;
  }
}

replaceFix();
