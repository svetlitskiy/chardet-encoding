const { executeCommand, normalizeResults } = require('./helpers/common');

jest.setTimeout(60000);

const TEST_PROJECT_DIR = 'test/test-project';

test('test utf8 target', async () => {
  expect.assertions(1);

  await executeCommand('npm run clear', TEST_PROJECT_DIR);
  await executeCommand('npm i', TEST_PROJECT_DIR);

  const result = await executeCommand('npx grunt encoding:utf8', TEST_PROJECT_DIR);

  expect(normalizeResults(result)).toMatchSnapshot();
});

test('test win1251 target', async () => {
  expect.assertions(1);

  await executeCommand('npm run clear', TEST_PROJECT_DIR);
  await executeCommand('npm i', TEST_PROJECT_DIR);
  const result = await executeCommand('npx grunt encoding:win1251', TEST_PROJECT_DIR);

  expect(normalizeResults(result)).toMatchSnapshot();
});