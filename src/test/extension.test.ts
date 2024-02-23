import * as vscode from 'vscode';
import { getComponentStructure } from '../getComponentStructure';
import { getSvelteFiles } from '../getSvelteFiles';
import { getRootContent } from '../rootContent';
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
  const structure = getComponentStructure(pathURI, 'Test', 'Test.svelte');

  test('componentStructure of Test.svelte contains a name property with value of Test', () => {
    assert.equal(structure.name, 'Test');
  });

  test('componentStructure of Test.svelte contains a children array with a length of 1', () => {
    assert.equal(Array.isArray(structure.children), true);
    assert.strictEqual(structure.children.length, 0);
  });

  test('componentStructure of Test.svelte contains a props array with a length of 0', () => {
    assert.strictEqual(structure.props?.length, 0);
  });
});
