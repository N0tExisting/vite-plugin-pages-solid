/**
 * TODO: Fix Types
 * @type {import('ava').Config}
 */
module.exports = ({ projectDir }) => {
  return {
    files: ['test/**/*.spec.(js|jsx|ts|tsx)'],
    failFast: Boolean(process.env.FAIL_FAST),
    timeout: 10000,
    cache: true,
    environmentVariables: {
      dir: projectDir,
    },
    //failWithoutAssertions: false,
    verbose: true,
    require: [
      //'esm',
      'ts-node/register',
    ],
    extensions: ['js', 'jsx', 'ts', 'tsx'],
    nodeArguments: ['--trace-deprecation', '--napi-modules'],
  };
};
