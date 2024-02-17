import * as assert from 'assert';
require('dotenv').config();
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { getSvelteFiles } from '../getSvelteFiles';
import { getRootContent } from '../rootContent';
import * as myExtension from '../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});

suite('Extension Suite', () => {
	// const root = '';
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

});

