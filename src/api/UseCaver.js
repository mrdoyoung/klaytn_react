import Caver from 'caver-js';
import NFTMarketABI from '../abi/NFTMarketABI.json';
import { AUTHORIZATION_KEY, NFTMARKET_CONTRACT_ADDRESS, CHAIN_ID } from '../constants';
const option = {
  headers: [
    {
      name: "Authorization",
      value: AUTHORIZATION_KEY
    },
    {name: "x-chain-id", value: CHAIN_ID}
  ]
}

const caver =  new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
const NFTMARKETContract = new caver.contract(NFTMarketABI, NFTMARKET_CONTRACT_ADDRESS);

export const getTokenIdList = async () => {
  const _tokenList = await NFTMARKETContract.methods.getTokenIdList().call();
  console.log(_tokenList);
}

export const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
    console.log(`BALANCE: ${balance}`);
    return balance;
  })
}