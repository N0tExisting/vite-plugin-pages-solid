import { resolve } from 'path';
import test from 'ava';
//import { test } from 'uvu';
//import * as assert from 'uvu/assert';
import { normalizePath } from 'vite';
import { haveChildren, traverse } from '../src/crawler/crawler';
import { FileOutput } from '../src/types/page';

const testPagesDir = 'test/assets/pages';
const testDeepPagesDir = 'test/assets/deep-pages';

const currentPath = normalizePath(resolve());

test('Traverse test page dirs', async (t) => {
  const result = await traverse(testPagesDir, ['jsx', 'tsx', 'ts', 'js'], []);
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

  expectedResult.forEach((i) =>
    t.deepEqual(
      result.find((o) => o.path === i.path),
      i,
    ),
  );
});

test('Traverse test deep pages dir', async (t) => {
  const result = await traverse(testDeepPagesDir, ['jsx', 'tsx', 'ts', 'js'], []);
  const expectedResult = [
    {
      children: [
        {
          children: [
            {
              path: `${currentPath}/test/assets/deep-pages/foo/pages/index.tsx`,
            },
          ],
          path: `${currentPath}/test/assets/deep-pages/foo/pages`,
        },
      ],
      path: `${currentPath}/test/assets/deep-pages/foo`,
    },
    {
      children: [
        {
          children: [
            {
              path: `${currentPath}/test/assets/deep-pages/bar/pages/index.jsx`,
            },
          ],
          path: `${currentPath}/test/assets/deep-pages/bar/pages`,
        },
      ],
      path: `${currentPath}/test/assets/deep-pages/bar`,
    },
  ];

  expectedResult.forEach((i) =>
    t.deepEqual(
      result.find((o) => o.path === i.path),
      i,
    ),
  );
});

test('Have children - Should return true', (t) => {
  const files: FileOutput = {
    path: '/',
    children: [{ path: '/about' }],
  };
  const result = haveChildren(files);

  t.true(result);
});

test('Have children - Should return false', (t) => {
  const files: FileOutput = {
    path: '/',
  };
  const result = haveChildren(files);

  t.false(result);
});

//test.run();
