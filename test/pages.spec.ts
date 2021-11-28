import type { ResolvedOptions } from '../src/types/options';
import type { FileOutput } from '../src/types/page';
import { addPage, removePage, resolvePages } from '../src/pages';
import { resolve } from 'path';
import { normalizePath } from 'vite';
import test from 'ava';
//import { test } from 'uvu';
//import * as assert from 'uvu/assert';

const currentPath = normalizePath(resolve());

test('resolvePages', async (t) => {
  const options: ResolvedOptions = {
    pagesDir: 'test/assets/pages',
    extensions: ['jsx', 'tsx', 'ts', 'js'],
    exclude: ['.git', 'node_modules'],
    importMode: 'async',
    root: process.cwd(),
    extensionsRE: /\.(jsx|tsx|ts|js)/,
    syncIndex: true,
  };

  const result = await resolvePages(options);
  const expectedResult = [
    {
      path: `${currentPath}/test/assets/pages/index.tsx`,
    },
    {
      path: `${currentPath}/test/assets/pages/components.tsx`,
    },
    {
      path: `${currentPath}/test/assets/pages/blog`,
      children: [
        {
          path: `${currentPath}/test/assets/pages/blog/index.jsx`,
        },
        {
          path: `${currentPath}/test/assets/pages/blog/today`,
          children: [
            {
              path: `${currentPath}/test/assets/pages/blog/today/index.jsx`,
            },
          ],
        },
        {
          path: `${currentPath}/test/assets/pages/blog/[id].jsx`,
        },
      ],
    },
    {
      path: `${currentPath}/test/assets/pages/about`,
      children: [
        {
          path: `${currentPath}/test/assets/pages/about/index.js`,
        },
      ],
    },
    {
      path: `${currentPath}/test/assets/pages/__test__`,
      children: [
        {
          path: `${currentPath}/test/assets/pages/__test__/index.js`,
        },
      ],
    },
    {
      path: `${currentPath}/test/assets/pages/[userId].tsx`,
    },
    {
      path: `${currentPath}/test/assets/pages/[sensor]`,
      children: [
        {
          path: `${currentPath}/test/assets/pages/[sensor]/current.ts`,
        },
        {
          path: `${currentPath}/test/assets/pages/[sensor]/[...all].ts`,
        },
      ],
    },
    {
      path: `${currentPath}/test/assets/pages/[...all].tsx`,
    },
  ];

  t.plan(expectedResult.length);

  expectedResult.forEach((i) =>
    t.deepEqual(
      result.find((o) => o.path === i.path),
      i,
    ),
  );
});

test('addPage', (t) => {
  const pages: FileOutput[] = [{ path: '/foo' }, { path: '/bar' }];
  addPage(pages, { path: '/baz' });
  t.deepEqual(pages, [{ path: '/foo' }, { path: '/bar' }, { path: '/baz' }]);
});

test('removePage', (t) => {
  const pages: FileOutput[] = [{ path: '/foo' }, { path: '/bar' }];
  removePage(pages, { path: '/foo' });
  t.deepEqual(pages, [{ path: '/bar' }]);
});

//test.run();
