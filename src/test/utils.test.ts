import { expect } from 'chai'
import { describe, it } from 'mocha'
import { hexToRgb } from '../index'

describe('utils文件', function () {
  it('16进制转rgb', function () {
    const [r, g, b] = hexToRgb('#ffffff')
    expect(r).to.be.equal(255)
    expect(g).to.be.equal(255)
    expect(b).to.be.equal(255)
  })
})
