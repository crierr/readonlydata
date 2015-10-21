
var a = {
	1: 1,
	a: 'a',
	b: {
		c: 'c',
		d: 2
	}
};

var fs = require('fs');
var assert = require('assert');
var readonlydata = require('../index');

var JSON_FILE = 'test.json';
var JSON_FILE_HASH = '29554fc6d1411659c9fcf84aa2d6113047973a1b'

before(function () {
	fs.writeFileSync(JSON_FILE, JSON.stringify(a));
	try {
		fs.unlinkSync([JSON_FILE, JSON_FILE_HASH].join('.'));
	} catch (e) {}
});

describe('nested obejct', function () {
	it('simple', function () {
		var aa = readonlydata.createFrom(a);
		assert(aa[1] === 1);
		assert(aa.a === 'a');
		assert.deepEqual(aa.b, {c: 'c', d: 2});
		assert.deepEqual(Object.keys(aa), [1, 'a', 'b']);
	});
});

describe('cache', function () {
	it('test require', function () {
		var json = readonlydata.require('test.json');
		assert.deepEqual(json, a);
	});
	it('cache should exist', function () {
		assert(fs.existsSync([JSON_FILE, JSON_FILE_HASH].join('.')));
	});
	it('require again', function () {
		var cached = readonlydata.require('test.json');
		assert(cached.fromcache);
		assert.deepEqual(cached, a);
	});
});

