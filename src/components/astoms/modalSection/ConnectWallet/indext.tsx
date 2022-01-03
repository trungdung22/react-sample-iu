import React, { useState } from 'react';
import useStyles from './styles';
import { UseWallet } from '../../../../lib/program/wallet-provider';
import IconPhantom from 'components/astoms/icons/phantom';

type Props = {
  dataGiveWallet: (dataWallet: any) => any
}
declare global {
  interface Window {
    solana: any;
    sollet: any;
  }
}

interface StateProps {
  is_connect: string, 
  publicKey: string,
  adapter_type: string
}


const ConnectWallet: React.FC<Props> = ({ dataGiveWallet }) => {


  // const {is_connect, publicKey, adapter_type} = useSelector<InitialState, StateProps>((state: InitialState) => {
  //   return {
  //     is_connect: state.is_connect,
  //     publicKey: state.publicKey,
  //     adapter_type: state.adapter_type
  //   }
  // });
  
  // const dispatch = useDispatch();
  // const rootDispatcher = new RootDispatcher(dispatch);

  const classes = useStyles();
  // const [data, setData] = useState({
  //   // tickets: dataSendViewTicket.next_round.your_ticket,
  // })

  const connectPhantom = () => {
    UseWallet("phantom").then(response => {
      window.sessionStorage.setItem('show_connect', 'true');
      dataGiveWallet({ publicKey: response.publicKey.toBase58(), is_connect: true, adapter_type: "phantom" });
      window.sessionStorage.setItem('data_connect', 'true')
      window.sessionStorage.setItem('publicKey', response.publicKey.toBase58());
      window.sessionStorage.setItem('adapter_type', 'phantom');
      //rootDispatcher.updateConnectionStatus("true");
      //rootDispatcher.updateConnectionPublicKey(response.publicKey.toBase58());
      //rootDispatcher.updateConnectionAdapterType("phantom");
    }).catch(error => console.log(error));
  }

  // const connectCoin69 = () => {
  //   UseWallet("coin98").then(response => {
  //     console.log(response);
  //     dataGiveWallet({ publicKey: response.publicKey.toBase58(), is_connect: true, adapter_type: "phantom" });
  //   }).catch(error => console.log(error));
  // }

  const connectSollet = () => {
    UseWallet("sollet").then(wallet => {
      window.sessionStorage.setItem('show_connect', 'true');
      dataGiveWallet({ publicKey: wallet.publicKey.toBase58(), is_connect: true, adapter_type: "sollet" });
      window.sessionStorage.setItem('data_connect', 'true');
      window.sessionStorage.setItem('publicKey', wallet.publicKey.toBase58());
      window.sessionStorage.setItem('adapter_type', 'sollet');
      //rootDispatcher.updateConnectionStatus("true");
      //rootDispatcher.updateConnectionPublicKey(wallet.publicKey.toBase58());
      //rootDispatcher.updateConnectionAdapterType("sollet");
    }).catch(error => console.log(error));
  }
  

  return (
    <>
      <div className={`${classes.body}`}>
        <ul>
          {/* <li onClick={() => connectCoin69()}>
            <p>
              <span><img src="/assets/lottery/wallet_1.png" alt="Coin 98" /></span>
              Coin 98
            </p>
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.6838 7.82416C10.1983 8.30972 10.1983 9.09695 10.6838 9.5825L13.5347 12.4333L10.6838 15.2842C10.1983 15.7697 10.1983 16.5569 10.6838 17.0425C11.1694 17.5281 11.9566 17.5281 12.4422 17.0425L16.1722 13.3125C16.6577 12.827 16.6577 12.0397 16.1722 11.5542L12.4422 7.82416C11.9566 7.33861 11.1694 7.33861 10.6838 7.82416Z" fill="#F4E0FF" />
              <path fillRule="evenodd" clipRule="evenodd" d="M0 12.4333C0 5.56659 5.56659 0 12.4333 0C19.3001 0 24.8667 5.56659 24.8667 12.4333C24.8667 19.3001 19.3001 24.8667 12.4333 24.8667C5.56659 24.8667 0 19.3001 0 12.4333ZM12.4333 2.48667C6.93994 2.48667 2.48667 6.93994 2.48667 12.4333C2.48667 17.9267 6.93994 22.38 12.4333 22.38C17.9267 22.38 22.38 17.9267 22.38 12.4333C22.38 6.93994 17.9267 2.48667 12.4333 2.48667Z" fill="#F4E0FF" />
            </svg>
          </li> */}
          <li onClick={() => connectPhantom()}>
            <p>
              <span className='w-10 h-10 inline-block'>
                <IconPhantom></IconPhantom>
              </span>
              Phantom
            </p>
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.6838 7.82416C10.1983 8.30972 10.1983 9.09695 10.6838 9.5825L13.5347 12.4333L10.6838 15.2842C10.1983 15.7697 10.1983 16.5569 10.6838 17.0425C11.1694 17.5281 11.9566 17.5281 12.4422 17.0425L16.1722 13.3125C16.6577 12.827 16.6577 12.0397 16.1722 11.5542L12.4422 7.82416C11.9566 7.33861 11.1694 7.33861 10.6838 7.82416Z" fill="#F4E0FF" />
              <path fillRule="evenodd" clipRule="evenodd" d="M0 12.4333C0 5.56659 5.56659 0 12.4333 0C19.3001 0 24.8667 5.56659 24.8667 12.4333C24.8667 19.3001 19.3001 24.8667 12.4333 24.8667C5.56659 24.8667 0 19.3001 0 12.4333ZM12.4333 2.48667C6.93994 2.48667 2.48667 6.93994 2.48667 12.4333C2.48667 17.9267 6.93994 22.38 12.4333 22.38C17.9267 22.38 22.38 17.9267 22.38 12.4333C22.38 6.93994 17.9267 2.48667 12.4333 2.48667Z" fill="#F4E0FF" />
            </svg>
          </li>
          {/* <li>
            <p>
              <span><img src="/assets/lottery/wallet_3.png" alt="Trust" /></span>
              Trust
            </p>
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.6838 7.82416C10.1983 8.30972 10.1983 9.09695 10.6838 9.5825L13.5347 12.4333L10.6838 15.2842C10.1983 15.7697 10.1983 16.5569 10.6838 17.0425C11.1694 17.5281 11.9566 17.5281 12.4422 17.0425L16.1722 13.3125C16.6577 12.827 16.6577 12.0397 16.1722 11.5542L12.4422 7.82416C11.9566 7.33861 11.1694 7.33861 10.6838 7.82416Z" fill="#F4E0FF" />
              <path fillRule="evenodd" clipRule="evenodd" d="M0 12.4333C0 5.56659 5.56659 0 12.4333 0C19.3001 0 24.8667 5.56659 24.8667 12.4333C24.8667 19.3001 19.3001 24.8667 12.4333 24.8667C5.56659 24.8667 0 19.3001 0 12.4333ZM12.4333 2.48667C6.93994 2.48667 2.48667 6.93994 2.48667 12.4333C2.48667 17.9267 6.93994 22.38 12.4333 22.38C17.9267 22.38 22.38 17.9267 22.38 12.4333C22.38 6.93994 17.9267 2.48667 12.4333 2.48667Z" fill="#F4E0FF" />
            </svg>
          </li> */}
          <li onClick={() => connectSollet()}>
            <p>
              <span className='w-10 h-10'>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="10" fill="#0075FF"/>
                  <path d="M19.853 21.2839C17.6557 20.5146 16.0545 19.5719 15.0492 18.4559C14.0529 17.3291 13.5547 15.9422 13.5547 14.2952C13.5547 12.4316 14.1641 10.8931 15.3828 9.67952C16.6105 8.4552 18.2028 7.84302 20.1598 7.84302C21.4942 7.84302 22.6818 8.15725 23.7226 8.78566C24.7723 9.41407 25.5819 10.2809 26.1512 11.3861C26.7294 12.4912 27.0186 13.6993 27.0186 15.0103H24.4432C24.4432 13.5801 24.0696 12.4587 23.3223 11.6461C22.5751 10.8227 21.5209 10.4109 20.1598 10.4109C18.8967 10.4109 17.9092 10.7522 17.1976 11.4348C16.4948 12.1066 16.1434 13.0438 16.1434 14.2465C16.1434 15.2108 16.477 16.0289 17.1442 16.7006C17.8203 17.3616 18.9634 17.9683 20.5735 18.5209C22.1926 19.0735 23.4558 19.6856 24.3631 20.3574C25.2794 21.0184 25.9555 21.7931 26.3914 22.6815C26.8362 23.57 27.0586 24.6156 27.0586 25.8183C27.0586 27.7361 26.4448 29.2746 25.2171 30.434C23.9895 31.5825 22.3482 32.1567 20.2933 32.1567C18.959 32.1567 17.7135 31.8479 16.5571 31.2304C15.4006 30.6019 14.5066 29.746 13.875 28.6624C13.2523 27.5789 12.9409 26.3492 12.9409 24.9731H15.5162C15.5162 26.4034 15.9477 27.5356 16.8106 28.3699C17.6824 29.1934 18.8433 29.6051 20.2933 29.6051C21.6455 29.6051 22.6818 29.2692 23.4024 28.5974C24.1229 27.9257 24.4832 27.0101 24.4832 25.8508C24.4832 24.6914 24.1496 23.7976 23.4824 23.1691C22.8153 22.5299 21.6054 21.9014 19.853 21.2839Z" fill="white"/>
                </svg>
              </span>
              Sollet
            </p>
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.6838 7.82416C10.1983 8.30972 10.1983 9.09695 10.6838 9.5825L13.5347 12.4333L10.6838 15.2842C10.1983 15.7697 10.1983 16.5569 10.6838 17.0425C11.1694 17.5281 11.9566 17.5281 12.4422 17.0425L16.1722 13.3125C16.6577 12.827 16.6577 12.0397 16.1722 11.5542L12.4422 7.82416C11.9566 7.33861 11.1694 7.33861 10.6838 7.82416Z" fill="#F4E0FF" />
              <path fillRule="evenodd" clipRule="evenodd" d="M0 12.4333C0 5.56659 5.56659 0 12.4333 0C19.3001 0 24.8667 5.56659 24.8667 12.4333C24.8667 19.3001 19.3001 24.8667 12.4333 24.8667C5.56659 24.8667 0 19.3001 0 12.4333ZM12.4333 2.48667C6.93994 2.48667 2.48667 6.93994 2.48667 12.4333C2.48667 17.9267 6.93994 22.38 12.4333 22.38C17.9267 22.38 22.38 17.9267 22.38 12.4333C22.38 6.93994 17.9267 2.48667 12.4333 2.48667Z" fill="#F4E0FF" />
            </svg>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ConnectWallet;