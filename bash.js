// Import File System Module
var fs = require('fs');
var commands = require('./commands');

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmdString = data.toString().trim()
  var cmdList = cmdString.split(/\s*\|\s*/g)
  var args = cmdList[0].split(' '); // remove the newline
  var done = function (output) {
    process.stdout.write(output)
    process.stdout.write('\nprompt > ')
  }

  if (args[0] === 'pwd') commands.pwd(args, done);
  if (args[0] === 'date') commands.date(args, done);
  if (args[0] === 'cat') commands.cat(args, done);
  if (args[0] === 'head') commands.head(args, done);
  if (args[0] === 'tail') commands.tail(args, done);
  if (args[0] === 'ls') commands.ls(args, done);
  if (args[0] === 'curl') commands.curl(args, done);

})