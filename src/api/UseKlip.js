import axios from "axios";
import { NFTMARKET_CONTRACT_ADDRESS, NFTSIMPLE_ADDRESS } from "../constants";

const A2P_API_PREPARE_URL = "https://a2a-api.klipwallet.com/v2/a2a/prepare";
const APP_NAME = "NFT_MARKET";
export const buyNFT = (id, setQrvalue) => {
  axios
    .post(A2P_API_PREPARE_URL, {
      bapp: {
        name: APP_NAME,
      },
      type: "execute_contract",
      transaction: {
        to: NFTMARKET_CONTRACT_ADDRESS,
        abi: '{ "constant": false, "inputs": [ { "name": "tokenId", "type": "uint256" }, { "name": "NFT", "type": "address" } ], "name": "buyNFT", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }',
        value: "0",
        params: `[\"${id}\",\"${NFTSIMPLE_ADDRESS}\"]`,
      },
    })
    .then((response) => {
      const { request_key } = response.data;
      const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
      setQrvalue(qrcode);
      let timerId = setInterval(() => {
        axios
          .get(
            `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
          )
          .then((res) => {
            if (res.data.result) {
              console.log(`[Result] ${JSON.stringify(res.data.result)}`);
              if (res.data.result.status === "success") {
                clearInterval(timerId);
              }
            }
          });
      }, 1000);
    });
};

export const getAddress = (setQrvalue) => {
  axios
    .post(A2P_API_PREPARE_URL, {
      bapp: {
        name: APP_NAME,
      },
      type: "auth",
    })
    .then((response) => {
      const { request_key } = response.data;
      const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
      setQrvalue(qrcode);
      let timerId = setInterval(() => {
        axios
          .get(
            `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
          )
          .then((res) => {
            if (res.data.result) {
              console.log(`[Result] ${JSON.stringify(res.data.result)}`);
              clearInterval(timerId);
            }
          });
      }, 1000);
    });
};
