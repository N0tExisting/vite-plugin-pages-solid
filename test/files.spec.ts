import { resolve } from 'path';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { slash } from '../src/utils/convert';
import { getPageFiles, getPageDirs, fromSinglePage } from '../src/files';
import type { ResolvedOptions } from '../src/types/options';

const testPagesDir = 'test/assets/pages';
const testDeepPagesDir = 'test/assets/deep-pages';

const currentPath = resolve();

test('getPageFiles', async () => {
  const options: ResolvedOptions = {
    pagesDir: '.',
    extensions: ['jsx', 'tsx', 'ts', 'js'],
    exclude: ['.git', 'node_modules'],
    root: process.cwd(),
    extensionsRE: /\.(jsx|tsx|ts|js)/,
    syncIndex: true,
  };
  const files = await getPageFiles(testPagesDir, options);
  const expectedFiles = [
    {
      path: `${currentPath}/test/assets/pages/index.tsx`,
    },
    {
      path: `${currentPath}/test/assets/pages/components.tsx`,
    },
    {
      children: [
        {
          path: `${currentPath}/test/assets/pages/blog/index.jsx`,
        },
        {
          path: `${currentPath}/test/assets/pages/blog/[id].jsx`,
        },
        {
          children: [
            {
              path: `${currentPath}/test/assets/pages/blog/today/index.jsx`,
            },
          ],
          path: `${currentPath}/test/assets/pages/blog/today`,
        },
      ],
      path: `${currentPath}/test/assets/pages/blog`,
    },
    {
      children: [
        {
          path: `${currentPath}/test/assets/pages/about/index.js`,
        },
      ],
      path: `${currentPath}/test/assets/pages/about`,
    },
    {
      children: [
        {
          path: `${currentPath}/test/assets/pages/__test__/index.js`,
        },
      ],
      path: `${currentPath}/test/assets/pages/__test__`,
    },
    {
      path: `${currentPath}/test/assets/pages/[userId].tsx`,
    },
    {
      children: [
        {
          path: `${currentPath}/test/assets/pages/[sensor]/current.ts`,
        },
        {
          path: `${currentPath}/test/assets/pages/[sensor]/[...all].ts`,
        },
      ],
      path: `${currentPath}/test/assets/pages/[sensor]`,
    },
    {
      path: `${currentPath}/test/assets/pages/[...all].tsx`,
    },
  ];

  expectedFiles.forEach((i) =>
    assert.equal(
      files.find((o) => o.path === i.path),
      i,
    ),
  );
});

test('getPageDirs', async () => {
  const pageDirOptions = {
    dir: slash(testDeepPagesDir),
    baseRoute: '',
  };
  const options: ResolvedOptions = {
    pagesDir: '.',
    extensions: ['jsx', 'tsx', 'ts', 'js'],
    exclude: ['.git', 'node_modules'],
    root: process.cwd(),
    extensionsRE: /\.(jsx|tsx|ts|js)/,
    syncIndex: true,
  };
  const dirs = await getPageDirs(pageDirOptions, options.root, options.exclude);
  const expectedDirs = [
    {
      baseRoute: '',
      dir: 'foo',
    },
    {
      baseRoute: '',
      dir: 'bar',
    },
  ];

  expectedDirs.forEach((i) =>
    assert.equal(
      dirs.find((o) => o.dir === i.dir),
      i,
    ),
  );
});

test('fromSinglePage - return empty', () => {
  const options: ResolvedOptions = {
    pagesDir: '.',
    extensions: ['jsx', 'tsx', 'ts', 'js'],
    exclude: ['.git', 'node_modules'],
    root: process.cwd(),
    extensionsRE: /\.(jsx|tsx|ts|js)/,
    syncIndex: true,
  };

  const result = fromSinglePage('/foo/bar.vue', options);
  assert.equal(result, { path: '' });
});

test('fromSinglePage - return complete', () => {
  const options: ResolvedOptions = {
    pagesDir: '.',
    extensions: ['jsx', 'tsx', 'ts', 'js'],
    exclude: ['.git', 'node_modules'],
    root: process.cwd(),
    extensionsRE: /\.(jsx|tsx|ts|js)/,
    syncIndex: true,
  };

  const result = fromSinglePage('/foo/bar.jsx', options);
  assert.equal(result, { path: '/foo/bar.jsx' });
});

test.run();