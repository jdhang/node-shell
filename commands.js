var fs = require('fs')
var request = require('request')

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
    }, 5);

  },

  head: function(args) {
    var files = args.slice(1);

    files.forEach(function (file) {
      fs.readFile(file, function (err, data) {
        if (err) throw err
        process.stdout.write('==> ' + file + ' <==\n') 
        process.stdout.write(data.toString().split('\n').filter(function (line, index) {
          return index < 5
        }).join('\n'))
        process.stdout.write('\n')
      })
    })
    setTimeout(function () {
      process.stdout.write('\nprompt > ');
    }, 5)
  },

  tail: function(args) {
    var files = args.slice(1)

    files.forEach(function (file) {
      fs.readFile(file, function (err, data) {
        if (err) throw err
        process.stdout.write('==> ' + file + ' <==\n') 
        process.stdout.write(data.toString().split('\n').filter(function (line, index) {
          return index >= data.toString().split('\n').length - 5;
        }).join('\n'))
        process.stdout.write('\n')
      })
    })
    setTimeout(function () {
      process.stdout.write('\nprompt > ');
    }, 5)
  },

  curl: function(args) {
    var url = 'http://' + args[1]

    request(url, function (err, response, body) {
      if (err) throw err
      if (response.statusCode === 200) {
        process.stdout.write(body)
        process.stdout.write('\nprompt > ');
      }
    }) 
  }
}