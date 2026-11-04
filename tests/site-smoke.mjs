import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script} from 'node:vm';
const source=readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('recovered Statistics Story source is a complete standalone HTML page',()=>{
  assert.match(source,/^<!doctype html>/i);
  assert.match(source,/<title>9MA0 Statistics Story<\/title>/);
  assert.match(source,/<main\b[^>]*id="main"/);
  assert.match(source,/<section\b[^>]*id="view"/);
  assert.match(source,/window\.StatsLab\.render\(\)/);
  assert.match(source,/hash===['"]#lab['"]/);
  assert.match(source,/Act 7/);
  assert.equal(source.includes('netlify.toml'),false);
  assert.doesNotMatch(source,/<script\b[^>]*\bsrc=/i,'Scripts must be self-contained');
  assert.doesNotMatch(source,/<link\b[^>]*rel=["']stylesheet["']/i,'Styles must be self-contained');
});

test('all embedded JavaScript parses in Node',()=>{
  const scripts=[...source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
  assert.equal(scripts.length,7,'Source should have seven inline scripts');
  scripts.forEach((match,i)=>assert.doesNotThrow(()=>new Script(match[1],{filename:'inline-script-'+(i+1)+'.js'})));
});

test('GitHub Pages custom-domain marker matches the desired hostname',()=>{
  assert.equal(readFileSync(new URL('../CNAME',import.meta.url),'utf8').trim(),
    'statistics.mrwalkermaths.com');
});
