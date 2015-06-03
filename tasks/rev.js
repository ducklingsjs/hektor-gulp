module.exports = function(gulp, H, options) {
  return gulp.task(options.taskName, function(done) {
    H.loadDeps(['rev']);

    options.dest = options.dest || './';
    var manifest = '.manifest.json';

    gulp.src(options.src, { base: './' })
      .pipe(H.deps.rev())
      .pipe(gulp.dest(options.dest))
      .pipe(H.deps.rev.manifest(manifest))
      .pipe(gulp.dest(options.dest))
      .on('end', function(err, res) {
        if (options.delete) {
          var fs = require('fs');
          var man = JSON.parse(fs.readFileSync(manifest));
          Object.keys(man).forEach(function(original) {
            fs.unlinkSync(original);
          });
        }
        fs.unlinkSync(manifest);
        done(err);
      });
  });
};
