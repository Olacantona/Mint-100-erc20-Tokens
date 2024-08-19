const { ethers, network } = require('hardhat');
const { encryptDataField } = require('@swisstronik/utils');
const deployedAddress = require('../utils/deployed-address');

const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpclink = network.config.url;

  const [encryptedData] = await encryptDataField(rpclink, data);

  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = '0xCfB1fcE324b76d1BDE3426950c459A2E01A5B573';

  const [signer] = await ethers.getSigners();

  const contractFactory = await ethers.getContractFactory('MyERC20Token');
  const contract = contractFactory.attach(contractAddress);

  const functionName = 'transfer';
  const receiptAddress = '0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1'; // don't modify
  const amount = 1 * 10 ** 18;
  const functionArgs = [receiptAddress, `${amount}`];
  const setMessageTx = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData(functionName, functionArgs),
    0
  );
  await setMessageTx.wait();

  console.log('Transaction Receipt: ', setMessageTx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

