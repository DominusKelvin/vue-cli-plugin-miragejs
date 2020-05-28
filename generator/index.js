module.exports = (api, options) => {
  api.extendPackage({
    devDependencies: {
      miragejs: "^0.1.40",
    },
  });

  api.injectImports(api.entryFile, `import { makeServer } from "./server"`);

  api.render("./template", {
    hasVueRouter: options.hasVueRouter,
  });
  api.onCreateComplete(() => {
    let mirageLine = '\n\nif (process.env.NODE_ENV === "development") {';
    mirageLine += "\n\tmakeServer()";
    mirageLine += "\n}";

    const fs = require("fs");

    let contentMain = fs.readFileSync(api.entryFile, { encoding: "utf-8" });

    const lines = contentMain.split(/\r?\n/g).reverse();

    const lastImportIndex = lines.findIndex((line) => line.match(/^import/));

    lines[lastImportIndex] += mirageLine;

    // modify app
    contentMain = lines.reverse().join("\n");

    fs.writeFileSync(api.entryFile, contentMain, { encoding: "utf-8" });
  });

  api.exitLog("Mirage JS is ready!");

  api.exitLog(
    "Now, whenever your application makes a network request in development, Mirage will intercept that request and respond with the data from your server definition."
  );
  api.exitLog(
    "An example server definition has been made for you in src/server.js by the way!"
  );
};
