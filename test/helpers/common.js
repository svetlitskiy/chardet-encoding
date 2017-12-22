const { exec } = require('child_process');

module.exports = {
  executeCommand,
  normalizeResults
};

async function executeCommand(cmd, cwd) {
  return new Promise(resolve => {
    exec(cmd, {
      cwd: cwd,
    }, (error, stdout) => {
      resolve(stdout);
    });
  });
}

/**
 * grunt provides output with operation system specific paths inside. to get tests working without binding to any OS should remove that paths.
 *
 * @param results
 * @returns {string}
 */
function normalizeResults (results) {
  // we need to remove operating system specific paths from the output
  const [_, ...payloadWithoutOSSpecificPaths] = results.split('\n');

  return payloadWithoutOSSpecificPaths.join('\n');
}