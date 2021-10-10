const { expect } = require("chai");
const { ethers } = require("hardhat");
const { deployMockContract } = require("ethereum-waffle");

const ERC20 = require('../artifacts/contracts/Stablecoin.sol/Stablecoin.json');


//  Functions
////////////////////////////////////////

// 'EPOCH_DURATION_COEFFICIENT_BP()': [Function (anonymous)],
// 'FEE_BP()': [Function (anonymous)],
// 'FEE_TO_MATCH_INITIATOR_BP()': [Function (anonymous)],
// 'FEE_TO_PROTOCOL_OWNER_BP()': [Function (anonymous)],
// 'MAX_LOAN_DURATION_IN_DAYS()': [Function (anonymous)],
// 'MAX_RISK_LEVEL()': [Function (anonymous)],
// 'MIN_DEPOSIT_AMOUNT()': [Function (anonymous)],
// 'MIN_LOAN_AMOUNT()': [Function (anonymous)],
// 'MIN_LOAN_DURATION_IN_DAYS()': [Function (anonymous)],
// 'MIN_LOCKUP_PERIOD_IN_DAYS()': [Function (anonymous)],
// 'MIN_RISK_LEVEL()': [Function (anonymous)],
// 'RISK_COEFFICIENT_BP()': [Function (anonymous)],
// 'RISK_FREE_RATE_BP()': [Function (anonymous)],
// 'ULOAN_EPOCH_IN_DAYS()': [Function (anonymous)],
// --- 'depositCapital(uint256,uint8,uint8,uint16)': [Function (anonymous)],
// 'getInterestEstimateInBasisPoint(uint256,uint8,uint16)': [Function (anonymous)],
// 'getLoansMatchingFees()': [Function (anonymous)],
// 'getProtocolOwnerFees()': [Function (anonymous)],
// 'getReturnEstimateInBasisPoint(uint256,uint8,uint8,uint16)': [Function (anonymous)],
// 'loans(uint256)': [Function (anonymous)],
// 'matchLoanWithCapital(uint256[],uint256[],uint256)': [Function (anonymous)],
// 'owner()': [Function (anonymous)],
// 'payLoan(uint256)': [Function (anonymous)],
// 'recoupCapital(uint256)': [Function (anonymous)],
// 'renounceOwnership()': [Function (anonymous)],
// 'requestLoan(uint256,uint16)': [Function (anonymous)],
// 'stablecoin()': [Function (anonymous)],
// 'transferOwnership(address)': [Function (anonymous)],
// 'withdrawLoanFunds(uint256)': [Function (anonymous)],



const ULOAN_STATES = {
    Requested: 0,
    Funded: 1,
    Withdrawn: 2,
    PayedBack: 3,
    Closed: 4,
};

describe("ULoan", () => {
    let UloanContract;
    let uloan;
    let Stablecoin;
    let mockUSD;
    let owner;
    let bob;
    let alice;
    let charles;

    before(async () => {
        [owner, bobTheLender, aliceTheLender, charlesTheBorrower] = await ethers.getSigners();
        UloanContract = await ethers.getContractFactory("ULoan");
        Stablecoin = await ethers.getContractFactory("Stablecoin");
    });

    beforeEach(async () => {
        mockUSD = await Stablecoin.deploy("Mock USD", "mUSD");
        await mockUSD.deployed();
        uloan = await UloanContract.deploy(mockUSD.address);
        await uloan.deployed();
    });

    describe("Correctly initialize the contract when being deployed", () => {
        it("ERC20 token should be correctly set when contract is live", async () => {
            expect(await uloan.stablecoin()).to.equal(mockUSD.address);
        });
    });

    describe("Lender Interactions",  () => {

        beforeEach(async () => {   
            await mockUSD.connect(owner).transfer(bobTheLender.address, ethers.utils.parseEther('5000').toString());
            let balance = await mockUSD.balanceOf(bobTheLender.address);
            console.log(balance.toString())
        });

        it("Should allow lender to deposit to uloan", async () => {
            console.log("hello")
            let balance = await mockUSD.balanceOf(bobTheLender.address);
            console.log(balance.toString())
    
            let bobInterestRate = await uloan.connect(bobTheLender).depositCapital(ethers.utils.parseEther('4000').toString(),20,60,28);
           
            console.log(bobInterestRate)
        });
    })
    
});


// Compiling 6 files with 0.8.4
// Compilation finished successfully
// Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// Stablecoin deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// ULoan deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512