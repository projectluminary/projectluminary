// Small test-only loader, using the already installed TypeScript compiler.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';
const require = createRequire(import.meta.url);
const cache = new Map();
export function loadTypeScript(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  cache.set(file, exports);
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const execute = new Function('exports', 'require', code);
  execute(exports, name => {
    if (!name.startsWith('.')) return require(name);
    const base = path.resolve(path.dirname(file), name);
    const resolved = [base + '.ts', base + '.tsx'].find(fs.existsSync);
    if (!resolved) throw new Error(`Cannot resolve ${name} from ${file}`);
    return loadTypeScript(resolved);
  });
  return exports;
}
