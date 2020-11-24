const Meme = artifacts.require('Meme');

contract('Meme', function (accounts) {
  let meme;

  before(async () => {
    meme = await Meme.deployed();
  });

  it('should deploy sucessfully', function () {
    const { address } = meme;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, '');
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it('should update the memePath', async function () {
    await meme.set('abc123');
    const memePath = await meme.get();
    assert.equal(memePath, 'abc123');
  });
});
