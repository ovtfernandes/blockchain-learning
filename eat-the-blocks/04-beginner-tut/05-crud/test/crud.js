const Crud = artifacts.require("Crud");

contract("Crud", function (/* accounts */) {
  let crud;

  before(async () => {
    crud = await Crud.deployed();
  });

  it("should create a new user", async function () {
    await crud.create('Frank');
    const user = await crud.read(1);
    assert(user[0].toNumber() === 1);
    assert(user[1] === 'Frank');
  });

  it("should update a user", async function () {
    await crud.update(1, 'Frankk');
    const user = await crud.read(1);
    assert(user[0].toNumber() === 1);
    assert(user[1] === 'Frankk');
  });

  it("should NOT update a non-existing user", async function () {
    try {
      await crud.update(2, 'Frankkk');
    }
    catch (e) {
      assert(e.message.includes('User does not exist!'));
      return ;
    }
    assert(false);
  });

  it("should destroy a user", async function () {
    await crud.destroy(1);
    try {
      await crud.read(1);
    }
    catch (e) {
      assert(e.message.includes('User does not exist!'));
      return ;
    }
    assert(false);
  });

  it("should NOT destroy a non-existing user", async function () {
    try {
      await crud.destroy(10);
    }
    catch (e) {
      assert(e.message.includes('User does not exist!'));
      return ;
    }
    assert(false);
  });
});
