import * as assert from 'assert';
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { getComponentStructure } from '../getComponentStructure';
import { getSvelteFiles } from '../getSvelteFiles';
import { getRootContent } from '../rootContent';
import { getRootName } from '../getRootName';
import * as myExtension from '../extension'; 
import path from 'path';
// import chai from 'chai';
// import { assert, expect } from 'chai';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});

suite('Extension Suite', () => {
	let rootPath = '' ;

	test('getSvelteFiles should return an array or string', () => {
		const result = getSvelteFiles(rootPath);
		if(rootPath === ''){
			assert.equal(typeof result, 'string');
		}else{
			assert.equal(Array.isArray(result), true);
		}
	});

	test('rootContent function should return a string', () => {
		const results = getRootContent(rootPath);
		assert.deepEqual(typeof results, 'string');
	});

	test('getRootName on test.svelte returns test', () => {
		const pathURI = path.resolve(__dirname);
		const name = getRootName(pathURI);
		assert.equal(name, 'test');
	});
});

//test that getComponentStructure returns an object
suite('getComponentStructure Suite', () => {
	let rootPath = '';	 
	let rootName = '';

	test('getComponentStructure should return an object', () => {
		const result = getComponentStructure(rootPath, rootName);
	});
});