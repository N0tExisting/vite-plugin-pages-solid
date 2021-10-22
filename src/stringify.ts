import type { FileOutput } from './types/page';
import type { PreRoute } from './types/route';
import { haveChildren } from './crawler/crawler';
import { sortRoute } from './utils/route';
import { pathToName } from './utils/convert';

interface StringifyOutput {
  imp: string[];
  out: string;
}

/**
 * Creates a stringified Solid App Router route definition.
 * @param {PreRoute[]} preparedRoutes
 * @returns {StringifyOutput}
 */
export function stringifyRoutes(preparedRoutes: PreRoute[]): StringifyOutput {
  const imports: string[] = [];
  let stringRoutes = '[';

  for (const route of preparedRoutes) {
    const { out, imp } = compileRouteItem(route);
    stringRoutes += out;
    imports.push(...imp);
  }

  stringRoutes += ']';

  return {
    out: stringRoutes,
    imp: imports,
  };
}

/**
 * Separate function from the stringifyRoute because I'll need it to run
 * recursively.
 * @param {PreRoute} route A single PreRoute object
 * @returns {String} To be used by stringifyRoute function
 */
function compileRouteItem(route: PreRoute): StringifyOutput {
  let out = '{ ';
  const imp: string[] = [];

  if (haveChildren(route as FileOutput)) {
    const children = route.children?.sort(sortRoute).map((o) => compileRouteItem(o)) as StringifyOutput[];
    const nestedRoutes: string[] = [...children.map((o) => o.out)];
    out += `path: "${route.name}", children: [${nestedRoutes.join(',')}]`;
    const imps = children?.map((o) => o.imp).flat() as string[];
    imp.push(...imps);
  } else {
    const importName = pathToName(route.path as string);
    const importStr = `import ${importName} from "${route.path}"`;
    if (!imp.includes(importStr)) {
      imp.push(importStr);
    }
    out += `path: "${route.name}", component: ${importName}`;
  }

  out += '},\n';

  return { out, imp };
}
