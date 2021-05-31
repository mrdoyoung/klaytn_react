import React, { createRef, useState } from "react";
import logo from "./logo.svg";
import QRCode from "qrcode.react";
import { getTokenIdList , getBalance} from "./api/UseCaver";
import * as KlipAPI from "./api/UseKlip";
import "./App.css";

const DEFAULT_QR_CODE = "DEFAULT";
function App() {
  const [balance, setBalance] = useState("0");
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [tokeList, settokeList] = useState("");
  
  const divTokenListRef = createRef();

  const onChange = (value) => { 
    // 콜백 함수 정의 
  }
  const onClickGetTokenIdList = () => {
    getTokenIdList(settokeList);
  };
  const onClickBuyNFT = () => {
    KlipAPI.buyNFT(100, setQrvalue);
  };
  return (
    <div className="App">
      <header className="App-header">
      <div>{tokeList}</div>
        <button
          onClick={() => {
            onClickGetTokenIdList();
          }}
        >
          token id 목록 가져오기
        </button>
        <button
          onClick={() => {
            onClickBuyNFT();
          }}
        >
          NTF 구매하기
        </button>
        <br />
        <br />
        <br />
        <QRCode value={qrvalue} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
