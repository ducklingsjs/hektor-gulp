var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var path = require('path');

var gulp = require('gulp');

var testPath = 'tests/codecheck';

describe('codecheck', function() {
  describe('valid code', function() {
    var H = require('../main')(gulp, {app: testPath}).load({
      codecheck: {
        src: {
          js: path.join(testPath, 'valid', '*.js'),
          scss: path.join(testPath, 'valid', '*.scss')
        },
        config: {
          js: path.join(testPath, '.jshintrc'),
          scss: path.join(testPath, '.scss-lint.yml')
        },
        fail: true
      }
    });

    it('should pass without errors', function() {
      expect(H.taskOpts.codecheck.fn).to.not.throw(Error);
    });
  });

  // TODO: Can't figure out how to detect when a lint error happens
  xdescribe('invalid code', function() {
    var H = require('../main')(gulp, {app: testPath}).load({
      codecheck: {
        src: {
          js: path.join(testPath, 'invalid', '*.js'),
          scss: path.join(testPath, 'invalid', '*.scss')
        },
        config: {
          js: path.join(testPath, '.jshintrc'),
          scss: path.join(testPath, '.scss-lint.yml')
        },
        fail: false
      }
    });

    it('should reject with error', function() {
      H.taskOpts.codecheck.fn().on('error', function() {
        console.log('Error');
      });
      // expect(H.taskOpts.codecheck.fn).to.throw(Error);
    });
  });
});
