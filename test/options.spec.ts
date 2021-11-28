import { resolve } from 'path';
import { resolveOptions } from '../src/options';
import { normalizePath } from 'vite';
import test from 'ava';
//import { test } from 'uvu';
//import * as assert from 'uvu/assert';

test('resolve', async (t) => {
  const options = await resolveOptions({
    pagesDir: 'test/assets/pages',
  });
  t.deepEqual(options, {
    exclude: [],
    extensions: ['tsx', 'jsx', 'js', 'ts'],
    extensionsRE: /\.(tsx|jsx|js|ts)$/,
    pagesDir: 'test/assets/pages',
    root: normalizePath(resolve()),
    syncIndex: true,
    importMode: 'async',
  });
});

//test.run();
