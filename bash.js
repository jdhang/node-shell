// Import File System Module
var fs = require('fs');
var commands = require('./commands');

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var args = data.toString().trim().split(' '); // remove the newline

  if (args[0] === 'pwd') commands.pwd(args);
  if (args[0] === 'date') commands.date(args);
  if (args[0] === 'cat') commands.cat(args);
  if (args[0] === 'head') commands.head(args);
  if (args[0] === 'tail') commands.tail(args);
  if (args[0] === 'ls') commands.ls(args);
  if (args[0] === 'curl') commands.curl(args);

})