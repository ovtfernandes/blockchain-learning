const Election = artifacts.require("Election");

contract("Election", function (/* accounts */) {
  let election;

  before(async () => {
    election = await Election.deployed();
  });
  
  it("should initialize with two candidates", async () => {
    const result = await election.candidatesCount();
    return assert.equal(result, 2);
  });

  it("should initialize candidates with correct values", async () => {
    const candidate1 = await election.candidates(1);
    const candidate2 = await election.candidates(2);

    assert.equal(candidate1[0], 1) // id
    assert.equal(candidate1[1], 'Candidate 1') // name
    assert.equal(candidate1[2], 0) // voteCount
    assert.equal(candidate2[0], 2) // id
    assert.equal(candidate2[1], 'Candidate 2') // name
    assert.equal(candidate2[2], 0) // voteCount
  });
});
