import React, { useState } from 'react';
import useStyles from './styles';
import { useWallet } from '../../../../lib/program/wallet-provider';
type Props = {
  dataGiveWallet: (dataWallet: any) => any
}
declare global {
  interface Window {
    solana: any;
    sollet: any;
  }
}

async function connectPhantomWallet() {
  debugger
  await window.solana.connect();
  await window.solana.on("connect", (publicKey: any) => {
    console.log("connected!" + publicKey)
    return publicKey;
  });
}

const ConnectWallet: React.FC<Props> = ({ dataGiveWallet }) => {
  const classes = useStyles();
  const [data, setData] = useState({
    // tickets: dataSendViewTicket.next_round.your_ticket,
  })

  const connectPhantomWalletInternal = () => {
    debugger
    connectPhantomWallet().then(response => {
      console.log(response);
      dataGiveWallet({ publicKey: response, is_connect: true });
    })
  }

  const connectSollet = () => {
    
    useWallet().then(wallet => {
      debugger
      dataGiveWallet({ publicKey: wallet.publicKey.toBase58(), is_connect: true });
    })
  }

  return (
    <>
      <div className={`${classes.body}`}>
        <ul>
          {/* <li>
            <p>
              <span><img src="./assets/lottery/wallet_1.png" alt="Coin 98" /></span>
              Coin 98
            </p>
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.6838 7.82416C10.1983 8.30972 10.1983 9.09695 10.6838 9.5825L13.5347 12.4333L10.6838 15.2842C10.1983 15.7697 10.1983 16.5569 10.6838 17.0425C11.1694 17.5281 11.9566 17.5281 12.4422 17.0425L16.1722 13.3125C16.6577 12.827 16.6577 12.0397 16.1722 11.5542L12.4422 7.82416C11.9566 7.33861 11.1694 7.33861 10.6838 7.82416Z" fill="#F4E0FF"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M0 12.4333C0 5.56659 5.56659 0 12.4333 0C19.3001 0 24.8667 5.56659 24.8667 12.4333C24.8667 19.3001 19.3001 24.8667 12.4333 24.8667C5.56659 24.8667 0 19.3001 0 12.4333ZM12.4333 2.48667C6.93994 2.48667 2.48667 6.93994 2.48667 12.4333C2.48667 17.9267 6.93994 22.38 12.4333 22.38C17.9267 22.38 22.38 17.9267 22.38 12.4333C22.38 6.93994 17.9267 2.48667 12.4333 2.48667Z" fill="#F4E0FF"/>
            </svg>
          </li> */}
          <li>
            <div onClick={() => connectPhantomWalletInternal()}>
              <p>
                <span><img src="./assets/lottery/wallet_2.png" alt="Phantom" /></span>
                Phantom
              </p>
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.6838 7.82416C10.1983 8.30972 10.1983 9.09695 10.6838 9.5825L13.5347 12.4333L10.6838 15.2842C10.1983 15.7697 10.1983 16.5569 10.6838 17.0425C11.1694 17.5281 11.9566 17.5281 12.4422 17.0425L16.1722 13.3125C16.6577 12.827 16.6577 12.0397 16.1722 11.5542L12.4422 7.82416C11.9566 7.33861 11.1694 7.33861 10.6838 7.82416Z" fill="#F4E0FF" />
                <path fillRule="evenodd" clipRule="evenodd" d="M0 12.4333C0 5.56659 5.56659 0 12.4333 0C19.3001 0 24.8667 5.56659 24.8667 12.4333C24.8667 19.3001 19.3001 24.8667 12.4333 24.8667C5.56659 24.8667 0 19.3001 0 12.4333ZM12.4333 2.48667C6.93994 2.48667 2.48667 6.93994 2.48667 12.4333C2.48667 17.9267 6.93994 22.38 12.4333 22.38C17.9267 22.38 22.38 17.9267 22.38 12.4333C22.38 6.93994 17.9267 2.48667 12.4333 2.48667Z" fill="#F4E0FF" />
              </svg>
            </div>
          </li>
          {/* <li>
            <p>
              <span><img src="./assets/lottery/wallet_3.png" alt="Trust" /></span>
              Trust
            </p>
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.6838 7.82416C10.1983 8.30972 10.1983 9.09695 10.6838 9.5825L13.5347 12.4333L10.6838 15.2842C10.1983 15.7697 10.1983 16.5569 10.6838 17.0425C11.1694 17.5281 11.9566 17.5281 12.4422 17.0425L16.1722 13.3125C16.6577 12.827 16.6577 12.0397 16.1722 11.5542L12.4422 7.82416C11.9566 7.33861 11.1694 7.33861 10.6838 7.82416Z" fill="#F4E0FF"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M0 12.4333C0 5.56659 5.56659 0 12.4333 0C19.3001 0 24.8667 5.56659 24.8667 12.4333C24.8667 19.3001 19.3001 24.8667 12.4333 24.8667C5.56659 24.8667 0 19.3001 0 12.4333ZM12.4333 2.48667C6.93994 2.48667 2.48667 6.93994 2.48667 12.4333C2.48667 17.9267 6.93994 22.38 12.4333 22.38C17.9267 22.38 22.38 17.9267 22.38 12.4333C22.38 6.93994 17.9267 2.48667 12.4333 2.48667Z" fill="#F4E0FF"/>
            </svg>
          </li> */}
          <li>
            <div onClick={() => connectSollet()}>
              <p>
                <span><img src="./assets/lottery/wallet_4.png" alt="Sollet" /></span>
                Sollet
              </p>
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.6838 7.82416C10.1983 8.30972 10.1983 9.09695 10.6838 9.5825L13.5347 12.4333L10.6838 15.2842C10.1983 15.7697 10.1983 16.5569 10.6838 17.0425C11.1694 17.5281 11.9566 17.5281 12.4422 17.0425L16.1722 13.3125C16.6577 12.827 16.6577 12.0397 16.1722 11.5542L12.4422 7.82416C11.9566 7.33861 11.1694 7.33861 10.6838 7.82416Z" fill="#F4E0FF" />
                <path fillRule="evenodd" clipRule="evenodd" d="M0 12.4333C0 5.56659 5.56659 0 12.4333 0C19.3001 0 24.8667 5.56659 24.8667 12.4333C24.8667 19.3001 19.3001 24.8667 12.4333 24.8667C5.56659 24.8667 0 19.3001 0 12.4333ZM12.4333 2.48667C6.93994 2.48667 2.48667 6.93994 2.48667 12.4333C2.48667 17.9267 6.93994 22.38 12.4333 22.38C17.9267 22.38 22.38 17.9267 22.38 12.4333C22.38 6.93994 17.9267 2.48667 12.4333 2.48667Z" fill="#F4E0FF" />
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ConnectWallet