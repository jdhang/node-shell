var fs = require('fs')
var request = require('request')

module.exports = {
  pwd: function(args, done) {
    done(process.env.PWD);
  },

  date: function(args, done) {
    done((new Date()).toString());
  },

  ls: function(args, done) {
    var output = '';
    fs.readdir('.',function(err,files) {
      if(err) throw err;
      files.forEach(function(file) {
        output += file.toString() + '\n'
      })
      done(output)
    })
  },

  cat: function(args, done) {
    var files = args.slice(1);
    var output = ''

    files.forEach(function (file) {
      fs.readFile(file, function (err, data) {
        if (err) throw err;
        output += data.toString()
      });
      output += '\n'
    });

    setTimeout(function () {
      done(output)
    }, 5);
  },

  head: function(args, done) {
    var files = args.slice(1);
    var output = ''

    files.forEach(function (file) {
      fs.readFile(file, function (err, data) {
        if (err) throw err
        output += '==> ' + file + ' <==\n'
        output += data.toString().split('\n').filter(function (line, index) {
          return index < 5
        }).join('\n')
        output += '\n'
      })
    })

    setTimeout(function () {
      done(output)
    }, 5)
  },

  tail: function(args, done) {
    var files = args.slice(1)
    var output = ''

    files.forEach(function (file) {
      fs.readFile(file, function (err, data) {
        if (err) throw err
        output += '==> ' + file + ' <==\n'
        output += data.toString().split('\n').filter(function (line, index) {
          return index >= data.toString().split('\n').length - 5;
        }).join('\n')
        output += '\n'
      })
    })
    setTimeout(function () {
      done(output)
    }, 5)
  },

  curl: function(args, done) {
    var url = 'http://' + args[1]

    request(url, function (err, response, body) {
      if (err) throw err
      if (response.statusCode === 200) {
        done(body)
      }
    }) 
  }
}