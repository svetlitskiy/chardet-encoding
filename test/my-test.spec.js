const { executeCommand } = require('./helpers/common');
const path = require('path');

jest.setTimeout(60000);

const TEST_PROJECT_DIR = 'test/test-project';

test('test', async () => {
  await executeCommand('npm run clear', TEST_PROJECT_DIR);
  await executeCommand('npm i', TEST_PROJECT_DIR);
  const result = await executeCommand('npx grunt encoding', TEST_PROJECT_DIR);

  expect(result).toMatchSnapshot();

/*  await executeCommand('npm i', TEST_PROJECT_DIR);
  const testResults = await executeCommand('npm test', TEST_PROJECT_DIR);

  expect(testResults).toMatchSnapshot();*/
});

function kek () {
  return new Promise(resolve => setTimeout(resolve, 3000))
}