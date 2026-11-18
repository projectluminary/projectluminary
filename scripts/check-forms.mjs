// Run with node scripts/check-forms.mjs. All service calls are mocked; no network.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const compile = source => ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React }
}).outputText;
const serviceModule = { exports: {} };
let fetchImpl;
let calls = 0;
vm.runInNewContext(compile(fs.readFileSync('src/lib/web3forms.ts', 'utf8')), {
  exports: serviceModule.exports, AbortSignal, Error,
  fetch: (...args) => { calls++; return fetchImpl(...args); }
});
const { submitWeb3Form } = serviceModule.exports;
for (const key of [undefined, '', '  ', 'your_web3forms_access_key_here']) {
  await assert.rejects(submitWeb3Form(key, {}), /not configured/);
}
assert.equal(calls, 0);
for (const [ok, body] of [[false, {success: true}], [true, {success: false}],
  [true, {success: 'true'}], [true, null], [true, {}]]) {
  fetchImpl = async () => ({ ok, json: async () => body });
  await assert.rejects(submitWeb3Form('mock-key', {}), /could not confirm/);
}
fetchImpl = async () => { throw new Error('offline'); };
await assert.rejects(submitWeb3Form('mock-key', {}), /Unable to confirm/);
fetchImpl = async () => ({ ok: true, json: async () => { throw new Error('invalid JSON'); } });
await assert.rejects(submitWeb3Form('mock-key', {}), /unexpected response/);
fetchImpl = async (_url, options) => {
  assert.equal(JSON.parse(options.body).access_key, 'mock-key');
  assert.equal(options.method, 'POST');
  assert.ok(options.signal);
  return { ok: true, json: async () => ({ success: true }) };
};
await submitWeb3Form(' mock-key ', { name: 'Test' });

// Exercise actual component handlers with a minimal hook/render harness.
for (const name of ['ContactForm', 'DonateForm']) {
  let state = [], cursor = 0, submit, serviceCalls = 0;
  const React = {
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
    useState(initial) {
      const index = cursor++;
      if (!(index in state)) state[index] = initial;
      return [state[index], value => { state[index] = typeof value === 'function' ? value(state[index]) : value; }];
    }
  };
  const module = { exports: {} };
  const source = fs.readFileSync(`src/components/${name}.tsx`, 'utf8')
    .replace('import.meta.env.VITE_WEB3FORMS_ACCESS_KEY', 'undefined');
  vm.runInNewContext(compile(source), {
    exports: module.exports,
    require: id => id === 'react' ? { ...React, default: React } : id === 'motion/react' ? { motion: { div: 'div' } } :
      id.includes('web3forms') ? { submitWeb3Form: (...args) => { serviceCalls++; return submit(...args); } } : {},
    Error
  });
  const render = () => { cursor = 0; return module.exports.default(); };
  const event = { preventDefault() {} };
  await render().props.onSubmit(event);
  assert.ok(Object.keys(state[1]).length > 0, `${name}: required validation`);
  assert.equal(serviceCalls, 0);
  const valid = name === 'ContactForm'
    ? { name: 'Test', email: 'test@example.com', subject: 'Other', message: 'Local mock test message.' }
    : { firstName: 'Test', lastName: 'User', email: 'test@example.com', phone: '123', address: 'Test', presetAmount: 50, customAmount: '' };
  state[0] = valid;
  submit = submitWeb3Form;
  await render().props.onSubmit(event);
  assert.match(state[4], /not configured/);
  assert.equal(state[0], valid);
  assert.equal(state[3], false);
  let release;
  submit = () => new Promise(resolve => { release = resolve; });
  const pending = render().props.onSubmit(event);
  assert.equal(state[2], true, `${name}: loading`);
  const before = serviceCalls;
  await render().props.onSubmit(event);
  assert.equal(serviceCalls, before, `${name}: blocks repeat submission`);
  release();
  await pending;
  assert.equal(state[2], false);
  assert.equal(state[3], true);
  assert.equal(state[0].email, '');
  assert.equal(render().props.role, 'status');
}
console.log('PASS: service outcomes and both form handlers (validation, configuration, retained input, loading, repeat-submit guard, confirmed success/reset). No live requests.');
