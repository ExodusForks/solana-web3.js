import {expect} from 'chai';

import {guardedShift, guardedSplice} from '../src/utils/guarded-array-utils';

describe('guardedShift', () => {
  it('delegates to Array#shift', () => {
    const arr = [1, 2, 3];
    expect(guardedShift(arr)).to.eq(1);
    expect(arr).to.eql([2, 3]);
  });
  it('throws when the array is zero-length', () => {
    const arr: number[] = [];
    expect(() => guardedShift(arr)).to.throw(
      'Reached end of buffer unexpectedly',
    );
  });
});

describe('guardedSplice', () => {
  it('delegates to Array#splice', () => {
    const arr = [1, 2, 3];
    expect(guardedSplice(arr, 0, 3, 100, 101, 102)).to.eql([1, 2, 3]);
    expect(arr).to.eql([100, 101, 102]);
  });
  it('allows zero-length splices', () => {
    const arr: number[] = [1, 2, 3];
    expect(guardedSplice(arr, 0, 0)).to.eql([]);
  });
  it('allows zero-length splices via the `deleteCount` argument being the explicit value `undefined`', () => {
    const arr: number[] = [1, 2, 3];
    expect(guardedSplice(arr, 0, undefined)).to.eql([]);
  });
  it('throws when the `start` would take you past the end of the array', () => {
    const arr: number[] = [1, 2, 3];
    expect(() => guardedSplice(arr, 3)).to.throw(
      'Reached end of buffer unexpectedly',
    );
  });
  it('throws when the `deleteCount` and `start` would take you past the end of the array', () => {
    const arr: number[] = [1, 2, 3];
    expect(() => guardedSplice(arr, 1, 3)).to.throw(
      'Reached end of buffer unexpectedly',
    );
  });
});
