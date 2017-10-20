import test from 'ava';
import {transform} from 'babel-core';
import plugin from '../src/plugin';

test('transforms an Nearley import to an inline Nearley grammar', t => {
  const {code} = transform(
    `
    import foo from './fixtures/foo.ne'
    `,
    {
      filename: __filename,
      plugins: [
        plugin
      ]
    }
  );

  t.snapshot(code);
});

test('allows whitelisting files that should be inlined', t => {
  const {code} = transform(
    `
    import foo from './fixtures/foo.ne'
    import bar from './fixtures/bar.ne'
    `,
    {
      filename: __filename,
      plugins: [
        [
          plugin,
          {
            include: 'f*.ne'
          }
        ]
      ]
    }
  );

  t.snapshot(code);
});

test('throws an exception when an Nearley import cannot be found', t => {
  t.throws(() => transform(
    `
    import bar from './fixtures/bar.ne'
    `,
    {
      filename: __filename,
      plugins: [
        plugin
      ]
    }
  ));
});
