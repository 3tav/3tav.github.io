const replace = require("replace-in-file");

// define fixes
function replaceFix() {
  const options = {
    files: ["publication/**/*.html", "publication/**/*.js", "publication/**/*.css", "publication/**/*.json"],
    from: [
      /http:\\\/\\\/sl_wordpress.dockerserver.3tav.local/g,
      /http:\/\/sl_wordpress.dockerserver.3tav.local/g,
    ],
    to: ["https:\\/\\/www.3tav.si", "https://www.3tav.si"],
  };

  try {
    const results = replace.sync(options);
    console.log("Results:", results.filter((e) => e.hasChanged).length);
    return;
  } catch (error) {
    return;
  }
}

// Run fixes
replaceFix();
