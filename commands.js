var fs = require('fs');

module.exports = {
  pwd: function(args) {
    process.stdout.write(process.env.PWD);
    process.stdout.write('\nprompt > ');
  },

  date: function(args) {
    process.stdout.write((new Date()).toString());
    process.stdout.write('\nprompt > ');
  },

  ls: function(args) {
    fs.readdir('.',function(err,files) {
      if(err) throw err;
      files.forEach(function(file) {
        process.stdout.write(file.toString() + '\n');
      })
      process.stdout.write('\nprompt > ');
    })
  },

  cat: function(args) {
    var files = args.slice(1);

    files.forEach(function (file) {
      fs.readFile(file, function (err, data) {
        if (err) throw err;
        process.stdout.write(data.toString());
      });
    });

    setTimeout(function () {
      process.stdout.write('\nprompt > ');
    }, 10);

  },

  head: function(args) {
    var files = args.slice(1);

    files.forEach(function (file) {
      fs.readFile(file, function (err, data) {

      })
    }) 
    process.stdout.write(fs.readFileSync(args[1]).toString().split('\n').filter(function (line, index) {
      return index < 5
    }).join('\n'));
    process.stdout.write('\nprompt > ');
  },

  tail: function(args) {
    var linesArray = fs.readFileSync(args[1]).toString().split('\n');
    process.stdout.write(linesArray.filter(function (line, index) {
      return index >= linesArray.length - 5;
    }).join('\n'));
    process.stdout.write('\nprompt > ');
  }
}


