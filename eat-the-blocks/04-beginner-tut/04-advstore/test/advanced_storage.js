const AdvancedStorage = artifacts.require("AdvancedStorage");

contract("AdvancedStorage", function (/* accounts */) {
  let advancedStorage;

  before(async () => {
    advancedStorage = await AdvancedStorage.deployed();
  });

  it("should add an element to ids array", async function () {
    await advancedStorage.add(10);
    const result = await advancedStorage.ids(0);
    return assert(result.toNumber() === 10);
  });

  it("should get an element of the ids array", async function () {
    await advancedStorage.add(20);
    const result = await advancedStorage.get(1);
    return assert(result.toNumber() === 20);
  });

  it("should get the ids array", async function () {
    const rawIds = await advancedStorage.getAll();
    const ids = rawIds.map(id => id.toNumber());
    return assert.deepEqual(ids, [10,20]);
  });

  it("should get the length of the ids array", async function () {
    const result = await advancedStorage.length();
    return assert(result.toNumber() === 2);
  });
});
