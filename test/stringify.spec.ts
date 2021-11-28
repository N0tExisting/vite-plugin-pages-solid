import type { PreRoute } from '../src/types/route';
import { stringifyRoutes } from '../src/stringify';
import test from 'ava';
//import { test } from 'uvu';
//import * as assert from 'uvu/assert';

test('Sync', (t) => {
  const route: PreRoute[] = [
    { name: 'index', path: '/home/foo/bar/index.tsx' },
    {
      name: 'about',
      path: '/home/foo/bar/about',
      children: [
        { name: 'index', path: '/home/foo/bar/about/index.tsx' },
        { name: 'contact', path: '/home/foo/bar/about/contact.tsx' },
      ],
    },
  ];
  const result = stringifyRoutes(route, 'sync');

  t.snapshot(result.imp);

  t.snapshot(result.out);
});

test('Async', (t) => {
  const route: PreRoute[] = [
    { name: 'index', path: '/home/foo/bar/index.tsx' },
    {
      name: 'about',
      path: '/home/foo/bar/about',
      children: [
        { name: 'index', path: '/home/foo/bar/about/index.tsx' },
        { name: 'contact', path: '/home/foo/bar/about/contact.tsx' },
      ],
    },
  ];
  const result = stringifyRoutes(route, 'async');

  t.deepEqual(result.imp, []);

  t.snapshot(result.out);
});

//test.run();
