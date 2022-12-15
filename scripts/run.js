const main = async () => {
  console.log()
    const MyNFTFactory = await hre.ethers.getContractFactory('MyNFT');
    const MyNFT = await MyNFTFactory.deploy();
    await MyNFT.deployed();
    console.log("Contract deployed to:", MyNFT.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();