module.exports = function(gulp, H, options) {
  return  function(done) {
    H.loadDeps(['rev']);

    options.dest = options.dest || './';
    var manifest = '.manifest.json';

    gulp.src(options.src, { base: './' })
      .pipe(H.deps.rev())
      .pipe(gulp.dest(options.dest))
      .pipe(H.deps.rev.manifest(manifest))
      .pipe(gulp.dest(options.dest))
      .on('end', function(err, res) {
        var fs = require('fs');
        if (fs.existsSync(manifest)) {
          if (options.delete) {
            var man = JSON.parse(fs.readFileSync(manifest));
            Object.keys(man).forEach(function(original) {
              fs.unlinkSync(original);
            });
          }
          fs.unlinkSync(manifest);
        }
        done(err);
      });
  };
};
