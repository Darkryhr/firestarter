require("zone.js/dist/zone-node");
require("reflect-metadata");

const { join } = require("path");

const { enableProdMode } = require("@angular/core");

// import module map for lazy loading
const {
  provideModuleMap,
} = require("@nguniversal/module-map-ngfactory-loader");

const { renderModuleFactory } = require("@angular/platform-server");

// leave this as require(), imported via webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP,
} = require(`./dist/server/main`);

const fs = require("fs-extra");

// Must manually define routes to prerender
const ROUTES = [
  "/",
  "/customers",
  "/customers/ipUzpIfUd7lC4NEfLfAK",
  "/kanban",
  "/login",
];

// START prerender script
(async function () {
  enableProdMode();
  // get the app index
  const views = "dist/browser";
  const index = await fs.readFile(join(views, "index.html"), "utf8");

  //loop over each routes
  for (let route of ROUTES) {
    const pageDir = join(views, route);
    await fs.ensureDir(pageDir);

    //render with universal
    const html = await renderModuleFactory(AppServerModuleNgFactory, {
      document: index,
      url: route,
      extraProviders: [provideModuleMap(LAZY_MODULE_MAP)],
    });

    fs.writeFile(join(pageDir, "index.html"));
  }

  process.exit();
  console.log("prerendering complete");
})();
