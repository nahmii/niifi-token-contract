'use strict';

const { ethers } = require('hardhat');

const { BigNumber } = ethers;
const { expect } = require('chai');

describe('NiiFiToken', () => {
  let GovernanceToken;
  let nonOwner;

  before(async () => {
    GovernanceToken = await ethers.getContractFactory('GovernanceToken');
    ([, nonOwner] = await ethers.getSigners());
  });

  let token;

  beforeEach(async () => {
    token = await GovernanceToken.deploy(
      'NiiFiToken',
      'NIIFI',
      BigNumber.from('10000000000000000'),
    );
    await token.deployed();
  });

  describe('#cap()', () => {
    it('should return the cap', async () => {
      expect(await token.cap()).to.equal(BigNumber.from('10000000000000000'));
    });
  });

  describe('#decimals()', () => {
    it('should return the number of decimals', async () => {
      expect(await token.decimals()).to.equal(BigNumber.from(15));
    });
  });

  describe('#name()', () => {
    it('should return the name', async () => {
      expect(await token.name()).to.equal('NiiFiToken');
    });
  });

  describe('#setName()', () => {
    describe('when called by owner', () => {
      it('should set the name', async () => {
        await expect(token.setName('NewName'))
          .to.emit(token, 'NameSet')
          .withArgs('NiiFiToken', 'NewName');
        expect(await token.name()).to.equal('NewName');
      });
    });

    describe('when called by non-owner', () => {
      it('should revert', async () => {
        await expect(token.connect(nonOwner).setName('NewName'))
          .to.be.revertedWith('Ownable: caller is not the owner');
      });
    });
  });

  describe('#symbol()', () => {
    it('should return the symbol', async () => {
      expect(await token.symbol()).to.equal('NIIFI');
    });
  });

  describe('#setSymbol()', () => {
    describe('when called by owner', () => {
      it('should set the symbol', async () => {
        await expect(token.setSymbol('NEWFI'))
          .to.emit(token, 'SymbolSet')
          .withArgs('NIIFI', 'NEWFI');
        expect(await token.symbol()).to.equal('NEWFI');
      });
    });

    describe('when called by non-owner', () => {
      it('should revert', async () => {
        await expect(token.connect(nonOwner).setSymbol('NEWFI'))
          .to.be.revertedWith('Ownable: caller is not the owner');
      });
    });
  });

  describe('#mint()', () => {
    describe('when called by owner', () => {
      it('should mint', async () => {
        await token.mint(nonOwner.address, BigNumber.from('10000000000000000'));
        expect(await token.balanceOf(nonOwner.address))
          .to
          .equal(BigNumber.from('10000000000000000'));
      });
    });

    describe('when called by non-owner', () => {
      it('should revert', async () => {
        await expect(token.connect(nonOwner).mint(nonOwner.address,
          BigNumber.from('10000000000000000')))
          .to.be.revertedWith('Ownable: caller is not the owner');
      });
    });

    describe('when minting more than cap', () => {
      it('should revert', async () => {
        await expect(token.mint(nonOwner.address, BigNumber.from('100000000000000000')))
          .to.be.revertedWith('ERC20Capped: cap exceeded');
      });
    });
  });
});
