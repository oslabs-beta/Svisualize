// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { getComponentStructure } from '../getComponentStructure';
import { getSvelteFiles } from '../getSvelteFiles';
import { getRootContent } from '../rootContent';
import { getRootName } from '../getRootName';
import { getSvelteFileNames } from '../getSvelteFileNames';
import path from 'path';
import * as assert from 'assert';

suite('Extension Suite', () => {
  const rootPath = path.resolve(__dirname, '..', '..');

  test('getSvelteFiles should return an array or string', () => {
    const result = getSvelteFiles(rootPath);
    if (rootPath === '') {
      assert.equal(typeof result, 'string');
    } else {
      assert.equal(Array.isArray(result), true);
    }
  });

  test('rootContent function should return a string', () => {
    const results = getRootContent(rootPath);
    assert.deepEqual(typeof results, 'string');
  });
});

suite('mock function tests on Test.svelte', () => {
  const pathURI = path.resolve(__dirname, '..', '..');
  const structure = getComponentStructure(pathURI, 'Test');

  test('getRootName of Test.svelte returns Test', () => {
    const name = getRootName(pathURI);
    assert.equal(name, 'Test');
  });

  test('componentStructure of Test.svelte contains a name property with value of Test', () => {
    assert.equal(structure.name, 'Test');
  });

  test('componentStructure of Test.svelte contains a child array with a length of 1', () => {
    assert.equal(Array.isArray(structure.children), true);
    assert.strictEqual(structure.children.length, 1);
  });

  test('componentStructure of Test.svelte contains a props array with a length of 0', () => {
    assert.strictEqual(structure.props?.length, 0);
  });
});

//test that getComponentStructure returns an object
suite('getComponentStructure Suite', () => {
	let rootPath = path.resolve(__dirname, '..', '..');
	let name = getRootName(rootPath);
  const structure = getComponentStructure(rootPath, 'Test');
  
	test('getComponentStructure should return an object', () => {
	  const result = getComponentStructure(rootPath, name);
	  assert.equal(typeof result, 'object');
	  assert.ok(result.hasOwnProperty('name'));
	  assert.ok(result.hasOwnProperty('children'));
	  assert.ok(result.hasOwnProperty('props'));
	});

  // test('parseFunc should return the name of the children', () => {
  //   assert.equal(structure.children[0], 'Hello');
  // });

  });

suite('getSvelteFileNames Suite', () => {
  const rootPath = path.resolve(__dirname, '..', '..');
  let result = getSvelteFileNames(rootPath)
  let name = getSvelteFileNames(rootPath);

	test('getSvelteFileNames should return an array of strings', () => {
    assert.equal(Array.isArray(result), true);
  });

  test('getSvelteFileNames should return `Test.svelte`', () => {
    assert.ok(name.includes('Test.svelte'));
  });
});