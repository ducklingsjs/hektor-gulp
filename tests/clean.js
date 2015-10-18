var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

var fs = require('fs-extra');
var path = require('path');
var gulp = require('gulp');

var testPath = 'tests/clean';

describe('clean', function() {
  describe('valid input', function() {
    var H = require('../main')(gulp, {app: testPath}).load({
      clean: {
        paths: ['<%= paths.app %>/**', '!<%= paths.app %>']
      }
    });

    before(function() {
      fs.ensureDirSync(testPath);
      fs.ensureDirSync(path.join(testPath, 'test'));
      fs.writeFileSync(path.join(testPath, 'foo.txt'), 'Bar');
    });

    it('should clean up the folders', function() {
      return H.taskOpts.clean.fn()
        .then(function() {
          expect(fs.existsSync(testPath)).to.be.true;
          expect(fs.existsSync(path.join(testPath, 'test'))).to.be.false;
          expect(fs.existsSync(path.join(testPath, 'foo.txt'))).to.be.false;
        });
    });
  });

  describe('invalid input', function() {
    var H = require('../main')(gulp, {app: testPath}).load({
      clean: {
        paths: []
      }
    });

    it('should reject with error', function() {
      return expect(H.taskOpts.clean.fn()).to.be.rejectedWith('Path is empty');
    });
  });
});
