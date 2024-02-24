import * as vscode from 'vscode';
import { getComponentStructure } from '../getComponentStructure';
import { getSvelteFiles } from '../getSvelteFiles';
import { getRootContent } from '../rootContent';
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
    const results = getRootContent(rootPath, 'Test.svelte');
    assert.deepEqual(typeof results, 'string');
  });
});

suite('mock function tests on Test.svelte', () => {
  const pathURI = path.resolve(__dirname, '..', '..');
  const code = getRootContent(pathURI, 'Test.svelte')!;
  const structure = getComponentStructure(pathURI, 'Test.svelte', code);

  test('componentStructure of Test.svelte contains a name property with value of Test', () => {
    assert.equal(structure.name, 'Test.svelte');
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
  const code = getRootContent(rootPath, 'Test.svelte')!;
  const result = getComponentStructure(rootPath, 'Test.svelte', code);

  test('getComponentStructure should return an object', () => {
    assert.equal(typeof result, 'object');
    assert.ok(result.hasOwnProperty('name'));
    assert.ok(result.hasOwnProperty('children'));
    assert.ok(result.hasOwnProperty('props'));
  });

  test('parseFunc should return the name of the children', () => {
    assert.equal(result.children[0].name, 'Hello');
  });
});

suite('getSvelteFileNames Suite', () => {
  const rootPath = path.resolve(__dirname, '..', '..');
  let result = getSvelteFileNames(rootPath);
  let name = getSvelteFileNames(rootPath);

  test('getSvelteFileNames should return an array of strings', () => {
    assert.equal(Array.isArray(result), true);
  });

  test('getSvelteFileNames should return `Test.svelte`', () => {
    assert.ok(name.includes('Test.svelte'));
  });
});
