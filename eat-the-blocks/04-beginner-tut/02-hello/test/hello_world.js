const HelloWorld = artifacts.require("HelloWorld");

contract("HelloWorld", function (/* accounts */) {
  it("should return Hello World", async function () {
    const helloWorld = await HelloWorld.deployed();
    const result = await helloWorld.hello();
    return assert(result === 'Hello World!');
  });
});
