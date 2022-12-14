const main = async () => {
  console.log()
    const MyNFTFactory = await hre.ethers.getContractFactory('MyNFT');
    const MyNFT = await MyNFTFactory.deploy();
    await MyNFT.deployed();
    // const tx = await MyNFT.safeMint("0x1ce750e83B91D00b6cCe3ae6feBe71420feAa5FF", "Diver", "QmQMQwwyYue8kpvaHintYsDhphrjdm6rh5MwT7W6fkVBXW", 10, 7, 222, 189, 194);
    // console.log('tx', tx);
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