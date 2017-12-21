const { spawn, exec } = require('child_process');

module.exports = {
  executeCommand
};

async function executeCommand(cmd, cwd) {
  return new Promise(function(resolve, reject) {
    exec(cmd, {
      cwd: cwd,
    }, (error, stdout) => {
      resolve(stdout);/*
      if (error && error.code !== 0) {
        console.log(JSON.stringify(stdout));
        console.log(JSON.stringify(stderr));
      }*/
    });
  });
}
/*

async function executeCommand(cmd, cwd) {
  return new Promise(function(resolve, reject) {
    const child = spawn(cmd, [], {
      shell: true,
      stdio: 'inherit',
      cwd: cwd,
    });

    let stdout = '';

/!*    child.stdout.on('data', data => {
      stdout += data.toString();
    });*!/

    child.on('exit', (code, signal) => {
      var kek = child;
      if (code === 0) {
        resolve('kek');
      } else {
        reject(signal);
      }
    });
  });
}
*/
