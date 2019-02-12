const fs = require("fs");
const path = require("path");

const config = JSON.parse(fs.readFileSync(path.resolve(path.join(__dirname, "../../../config/config.json")), "utf-8"));

function getModulePaths(moduleName) {
  const localPath = path.resolve(path.join(__dirname, "../../../modules", moduleName));
  if (fs.existsSync(localPath)) {
    return [`../../../../modules/${moduleName}`, localPath];
  }

  return [];
}

function createImport(moduleName) {
  const [modPath, localPath] = getModulePaths(moduleName);
  const packagePath = path.join(localPath, "package.json");

  if (!modPath || !fs.existsSync(packagePath)) return false;

  const package = JSON.parse(fs.readFileSync(packagePath, "utf-8"));

  if (!package.main) {
    return false;
  }

  return {
    name: moduleName,
    str: `import ${moduleName} from "${modPath}";`
  };
}

const cache = new Set();
const imports = config.modules.filter(mod => {
  const res = !cache.has(mod.name);
  cache.add(mod.name);
  return res;
}).map(mod => createImport(mod.name)).filter(i => i);

const docImports = imports.reduce((p, c) => `${p}${c.str}\n`, "");

const docExport = "export default {\n" + imports.reduce((p, c) => `${p}    ${c.name},\n`, "") + "};\n"

const folderPath = path.resolve(path.join(__dirname, "../src/generated"));
const filePath = path.resolve(path.join(__dirname, "../src/generated/modules.js"));

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}
fs.writeFileSync(filePath, `${docImports}\n${docExport}`);