import test from 'ava';
//import { test } from 'uvu';
//import * as t from 'uvu/t';
import { pathToName, toArray } from '../src/utils/convert';
import { isDynamicRoute, isMultiRoute } from '../src/utils/validate';

test('Dynamic routes', (t) => {
  t.true(isDynamicRoute('[id]'));
  t.false(isDynamicRoute('me'));
});

test('Multi routes', (t) => {
  t.true(isMultiRoute('[...all]'));
  t.false(isMultiRoute('[id]'));
});

test('Path to name', (t) => {
  t.is(pathToName('user-[route]-current'), 'user_$route$_current');
});

test('toArray', (t) => {
  t.deepEqual(toArray('foo'), ['foo']);
  t.deepEqual(toArray(['foo', 'bar']), ['foo', 'bar']);
});

//test.run();
