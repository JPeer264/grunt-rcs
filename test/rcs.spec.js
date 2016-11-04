'use strict';

const expect = require('chai').expect;
const fs     = require('fs-extra');
const path   = require('path');

const testCwd = 'test/files/cache';
const results = 'test/files/results';

describe('grunt rcs', () => {
    after(() => {
        fs.removeSync(testCwd);
    });

    it('should compile all css files', done => {
        expect(fs.readFileSync(path.join(testCwd, 'style.css'), 'utf8')).to.equal(fs.readFileSync(path.join(results, 'style.css'), 'utf8'));
        expect(fs.readFileSync(path.join(testCwd, 'style2.css'), 'utf8')).to.equal(fs.readFileSync(path.join(results, 'style2.css'), 'utf8'));
        expect(fs.readFileSync(path.join(testCwd, 'subdirectory', 'style.css'), 'utf8')).to.equal(fs.readFileSync(path.join(results, 'subdirectory', 'style.css'), 'utf8'));

        done();
    });
});