const Election = artifacts.require("Election");

contract("Election", function (accounts) {
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

  it("should allow a voter to cast a vote", async () => {
    const candidateId = 1;
    await election.vote(candidateId, { from: accounts[0] });
    const voted = await election.voters(accounts[0]);
    assert(voted);
    const candidate = await election.candidates(candidateId);
    assert.equal(candidate[2], 1);
  });

  it("should throw an exception for invalid candidates", async () => {
    try {
      await election.vote(99, { from: accounts[1] });
    }
    catch (e) {
      assert(e.message.indexOf('revert') > 0);
      const candidate1 = await election.candidates(1);
      const candidate2 = await election.candidates(2);
      assert.equal(candidate1[2], 1);
      assert.equal(candidate2[2], 0);
      return;
    }
    assert(false);
  });

  it("should throw an exception for double voting", async () => {
    const candidateId = 2;
    await election.vote(candidateId, { from: accounts[1] });
    const candidate = await election.candidates(candidateId);
    assert.equal(candidate[2], 1);
    try {
      await election.vote(candidateId, { from: accounts[1] });
    }
    catch (e) {
      assert(e.message.indexOf('revert') > 0);
      const candidate = await election.candidates(candidateId);
      assert.equal(candidate[2], 1);
      return;
    }
    assert(false);
  });
});
