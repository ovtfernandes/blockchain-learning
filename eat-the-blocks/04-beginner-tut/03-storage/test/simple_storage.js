const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", function (/* accounts */) {
  it("should set the value of data variable", async function () {
    const simpleStorage = await SimpleStorage.deployed();
    await simpleStorage.set('test data');
    const result = await simpleStorage.get();
    return assert(result === 'test data');
  });
});
