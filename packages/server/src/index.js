import fs from "fs";
import path from "path";
import { json } from "body-parser";
import polka from "polka";
import serve from "serve-static";

import config from "../../../config/config.json";

const app = polka();

function getModulePath(moduleName) {
  const localPath = path.resolve(path.join(__dirname, "../../../modules", moduleName));
  if (fs.existsSync(localPath)) {
    return localPath;
  }

  const nodeModulesPath = path.resolve(path.join(__dirname, "../../../node_modules", moduleName));

  if (fs.existsSync(nodeModulesPath)) {
    return nodeModulesPath;
  }
}

const uniqueCache = new Set();
const modules = config.modules.filter(mod => {
  const exists = uniqueCache.has(mod.name);
  uniqueCache.add(mod.name);
  return !exists;
}).map(mod => {
  const modPath = getModulePath(mod.name);
  const packagePath = path.join(modPath, "package.json");
  
  if (!modPath || !fs.existsSync(packagePath)) return false;

  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf-8"));
  
  if (!packageJson.server) return false;

  const requirePath = path.join(modPath, packageJson.server);

  const imported = require(requirePath);

  const routes = typeof imported === "function" ? imported(mod.config || {}) : imported;

  return {
    name: mod.name,
    routes
  };
}).filter(mod => mod);

app.use(json());

app.use(serve(path.resolve(path.join(__dirname, "../../client/dist"))));

modules.forEach(mod => {
  mod.routes.forEach(route => {
    app[route.method](`${mod.name}/${route.path}`, route.route);
  });
});

app.listen(3000, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server running on localhost:3000`);
});