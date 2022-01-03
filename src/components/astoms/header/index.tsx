import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import DefaultButon from '../button/DefaultButton';
import { useHistory } from "react-router-dom";
import { PROVIDER_URL, useWindowSize } from 'data/constants';
import { useParams } from 'react-router';
import { SolletWalletAdapter } from "lib/wallets/sollet";
import { SOLLET_ADAPTER_NETWORD } from 'lib/program/config';
import IconPhantom from '../icons/phantom';
import IconCoin98 from '../icons/coin98';
import IconMetamark from '../icons/metamark';
import { UseWallet } from 'lib/program/wallet-provider';

type Props = {
  playerData: any,
  dataGiveFromHeader: (dataGiveFromHeader: any) => void,
}
type urlParams = {
  nameProject: string,
};
const Header: React.FC<Props> = ({playerData, dataGiveFromHeader}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [menuConnectedCollapsed, setMenuConnectedCollapsed] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const size = useWindowSize();
  const {nameProject} = useParams<urlParams>();
  const [location, setLocation] = useState(typeof nameProject !== 'undefined' ? '/milligo' : history.location.pathname.toLowerCase());
  const [dataWalletSendLottery, setDataWalletSendLottery] = useState({
    data: {
      is_connect : false,
      lamportUnit: 0,
      adapter_type: '',
      publicKey: '',
      balanceUSDT: 0,
      balanceSOL: 0,
    },
    disconnect: false,
  });
  const [offset, setOffset] = useState(false);
  let curScroll = 0;
  useEffect(() => {
    window.onscroll = () => {
      if(window.pageYOffset > 0) {
        window.pageYOffset - curScroll > 0 ? setOffset(true) : setOffset(false); 
        curScroll = window.pageYOffset;
      } else {
        setOffset(false)
      }
    }
    // setPropsShowMenu(dataShowMenu);
  }, []);

  useEffect(() => {
    dataGiveFromHeader(dataWalletSendLottery);
  }, [dataWalletSendLottery])
  const sollet = new SolletWalletAdapter({ provider: PROVIDER_URL, network: SOLLET_ADAPTER_NETWORD});
  const handleClickConnect = () => {
    setMenuConnectedCollapsed(!menuConnectedCollapsed);
    // if (!playerData.is_connect) {
    //   dataGiveFromHeader({
    //     data: {
    //       is_connect: true,
    //     }
    //   });
    // }
    
  }
  const handleDisconnect = () => {
    if (playerData.is_connect) {
      setMenuConnectedCollapsed(false);
      setDataWalletSendLottery({
        data: {
          is_connect: false,
          adapter_type: '',
          publicKey: '',
          lamportUnit: 0,
          balanceUSDT: 0,
          balanceSOL: 0,
        },
        disconnect: true,
      })
      window.sessionStorage.clear();
      sollet.disconnect() as Promise<void>;
    }
  }

  const connectPhantom = () => {
    if (!playerData.is_connect) {
      UseWallet("phantom").then(response => {
        window.sessionStorage.setItem('show_connect', 'true');
        setDataWalletSendLottery({ 
          data: {
            ...dataWalletSendLottery.data,
            publicKey: response.publicKey.toBase58(),
            is_connect: true,
            adapter_type: "phantom"
          },
          disconnect: false,
        });
        window.sessionStorage.setItem('data_connect', 'true')
        window.sessionStorage.setItem('publicKey', response.publicKey.toBase58());
        window.sessionStorage.setItem('adapter_type', 'phantom');
        setMenuConnectedCollapsed(false);
      }).catch(error => console.log(error));
    }
  }

  // // const connectCoin69 = () => {
  // //   UseWallet("coin98").then(response => {
  // //     console.log(response);
  // //     dataGiveWallet({ publicKey: response.publicKey.toBase58(), is_connect: true, adapter_type: "phantom" });
  // //   }).catch(error => console.log(error));
  // // }

  const connectSollet = () => {
    if (!playerData.is_connect) {
      UseWallet("sollet").then(wallet => {
        window.sessionStorage.setItem('show_connect', 'true');
        setDataWalletSendLottery({ 
          data: {
            ...dataWalletSendLottery.data,
            publicKey: wallet.publicKey.toBase58(),
            is_connect: true,
            adapter_type: "sollet"
          },
          disconnect: false,
        });
        window.sessionStorage.setItem('data_connect', 'true');
        window.sessionStorage.setItem('publicKey', wallet.publicKey.toBase58());
        window.sessionStorage.setItem('adapter_type', 'sollet');
        setMenuConnectedCollapsed(false);
      }).catch(error => console.log(error));
    }
  }
  
  return (
    <>
      <div className={`fixed w-full h-full bg-blue-0 z-100 opacity-0 ${menuConnectedCollapsed ? 'block' : 'hidden'}`}
        onClick={() => setMenuConnectedCollapsed(false)}
      ></div>
      <header className={`${classes.root} ${offset && (size.width < 769) ? 'active' : ''}`}>
        <div className={`${classes.container}`}>
          <a href="/" className={`${classes.headerLeft}`}><img src="/assets/common/logo.png" alt="Millionsy" /><span>Millionsy</span></a>
          <div className={`${classes.headerRight} relative`}>
            <ul className={`listRouter`}>
              <li><a href="/lottery" className={location === '/lottery' ? 'active ': '' }>Lottery</a></li>
              <li><a href="/milligo" className={location === '/milligo' ? 'active ': ''}>MILLIGO</a></li>
              <li className='onTooltip relative'
                onMouseLeave={() => {
                  if(size.width > 768) {
                    setShowTooltip(false)
                  }
                }}
                onMouseEnter={() => {
                  if(size.width > 768) {
                    setShowTooltip(true);
                  }
                }}
              >
              <a href="/nft-ticket" className={location === '/nft-ticket' ? 'active ': ''} 
                onClick={(e) => e.preventDefault()}
              >
                NFT Ticket
              </a>
                { showTooltip && <p className='absolute top-full left-1/2 transform -translate-x-1/2 translate-y-2 z-100 border border-solid border-pink-A819FA bg-gray-151515 rounded-5 text-center text-14 md:text-16 pb-0.5 w-36 text-pink-A819FA'>Coming real soon...</p> }
              </li>
            </ul>
            <div className='py-2 md:py-4'>
              <p className={
                `md:w-155 text-10 md:text-16 font-bold flex justify-center items-center gap-2 text-center rounded-3 md:rounded-5 p-2 md:p-3 transition-all cursor-pointer hover:opacity-70
                ${ playerData.is_connect
                  ? 'text-white bg-pink-150' 
                  : window.sessionStorage.getItem('show_connect') === 'true' && !playerData.is_connect ? 'text-gray-A9A9A9 bg-gray-F9F9F9': 'text-blue-50 bg-blue-0'}`
                }
                onClick={handleClickConnect}
              >
                { 
                  playerData.is_connect ? 'Connected' : window.sessionStorage.getItem('show_connect') === 'true' && !playerData.is_connect ? 'Connecting' : 'Connect' 
                }
                {
                  window.sessionStorage.getItem('show_connect') === 'true' && !playerData.is_connect
                  ? 
                  <span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 10.5V13.625" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 2.375V5.5" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5.5 8H2.375" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13.625 8H10.5" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6.23115 6.23127L4.0249 4.02502" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11.975 11.975L9.7688 9.7688" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6.23115 9.7688L4.0249 11.975" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11.975 4.02502L9.7688 6.23127" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  :
                  <span>
                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.51245 6.625L7.0812 9.19375C7.1983 9.31016 7.35671 9.3755 7.52183 9.3755C7.68694 9.3755 7.84535 9.31016 7.96245 9.19375L10.4625 6.69375" stroke={`${playerData.is_connect ? '#F4E0FF' : '#0B7880'}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel"/>
                    </svg>
                  </span>
                }
                
              </p>
              <div className={`transform translate-y-0.5 absolute right-0 top-full w-186 md:w-240 rounded-5 box-shadow-0440 transition-all bg-gray-2f2f2f overflow-hidden ${menuConnectedCollapsed ? 'visible opacity-100 pointer-events-auto' : ' invisible opacity-0 pointer-events-none'}`}>
                <p className='text-12 md:text-14 font-medium bg-gray-151515 py-1.5 md:py-2.5 px-3 md:px-4'>
                  Solana
                  <span className='inline-block pb-0.5 ml-2'>
                    <svg width="6" height="3" viewBox="0 0 6 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.0083 0.583252L2.7208 2.29575C2.79887 2.37336 2.90447 2.41692 3.01455 2.41692C3.12463 2.41692 3.23023 2.37336 3.3083 2.29575L4.97497 0.629085" stroke="#F9F9F9" strokeLinecap="round" strokeLinejoin="bevel"/>
                    </svg>
                  </span>
                </p>
                <ul className='py-1'>
                  <li className={`py-1 px-5 md:px-8 text-12 md:text-14 flex gap-2 items-center cursor-pointer transition-all ${playerData.is_connect ? 'cursor-not-allowed hover:bg-pink-8C24BF' : 'hover:bg-blue-0B7880'}`}
                    onClick={connectSollet}
                  >
                    <span className='w-4 h-4 inline-block mr-1 md:mr-3'>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="16" height="16" rx="4" fill="#0075FF"/>
                        <path d="M7.9406 8.51379C7.0617 8.20607 6.4212 7.82901 6.0191 7.38259C5.62058 6.93187 5.42131 6.37711 5.42131 5.71834C5.42131 4.9729 5.66505 4.35748 6.15255 3.87205C6.6436 3.38233 7.28053 3.13745 8.06335 3.13745C8.5971 3.13745 9.07214 3.26314 9.48847 3.51451C9.90834 3.76587 10.2322 4.1126 10.4599 4.55467C10.6912 4.99674 10.8068 5.47997 10.8068 6.00438H9.77669C9.77669 5.43229 9.62724 4.98373 9.32834 4.65868C9.02944 4.32931 8.60779 4.16461 8.06335 4.16461C7.55808 4.16461 7.1631 4.30114 6.87845 4.57416C6.59733 4.84288 6.45678 5.21777 6.45678 5.69884C6.45678 6.08458 6.59021 6.41179 6.8571 6.68048C7.12752 6.94487 7.58477 7.18758 8.22882 7.4086C8.87644 7.62965 9.38172 7.8745 9.74467 8.14322C10.1112 8.40759 10.3816 8.71747 10.556 9.07285C10.7339 9.42825 10.8228 9.84648 10.8228 10.3276C10.8228 11.0947 10.5773 11.7101 10.0863 12.1738C9.59522 12.6332 8.9387 12.8629 8.11674 12.8629C7.58299 12.8629 7.08482 12.7394 6.62225 12.4924C6.15965 12.241 5.80205 11.8986 5.54941 11.4652C5.30033 11.0318 5.17578 10.5399 5.17578 9.9895H6.20591C6.20591 10.5616 6.3785 11.0145 6.72365 11.3482C7.07237 11.6776 7.53673 11.8423 8.11674 11.8423C8.6576 11.8423 9.07214 11.7079 9.36037 11.4392C9.64859 11.1705 9.7927 10.8043 9.7927 10.3406C9.7927 9.87681 9.65927 9.51927 9.39239 9.2679C9.12552 9.01219 8.64159 8.7608 7.9406 8.51379Z" fill="white"/>
                      </svg>
                    </span>
                    Sollet
                  </li>
                  <li className={`py-1 px-5 md:px-8 text-12 md:text-14 flex gap-2 items-center cursor-pointer transition-all ${playerData.is_connect ? 'cursor-not-allowed hover:bg-pink-8C24BF' : 'hover:bg-blue-0B7880'}`}
                    onClick={connectPhantom}
                  >
                    <span className='w-4 h-4 inline-block mr-1 md:mr-3'>
                      <IconPhantom></IconPhantom>
                    </span>
                    Phantom
                  </li>
                  <li className='py-1 px-5 md:px-8 text-12 md:text-14 flex gap-2 items-center cursor-not-allowed text-gray-787878'>
                    <span className='w-4 h-4 inline-block mr-1 md:mr-3'>
                      <IconCoin98></IconCoin98>
                    </span>
                    Coin98
                  </li>
                </ul>
                <p className='text-12 md:text-14 font-medium bg-gray-151515 py-1.5 md:py-2.5 px-3 md:px-4'>
                  Binance Smart Chain
                  <span className='inline-block pb-0.5 ml-2'>
                    <svg width="6" height="3" viewBox="0 0 6 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.0083 0.583252L2.7208 2.29575C2.79887 2.37336 2.90447 2.41692 3.01455 2.41692C3.12463 2.41692 3.23023 2.37336 3.3083 2.29575L4.97497 0.629085" stroke="#F9F9F9" strokeLinecap="round" strokeLinejoin="bevel"/>
                    </svg>
                  </span>
                </p>
                <ul className='py-1'>
                  <li className='py-1 px-5 md:px-8 text-12 md:text-14 flex gap-2 items-center cursor-not-allowed text-gray-787878'>
                    <span className='w-4 h-4 inline-block mr-1 md:mr-3'>
                      <IconMetamark></IconMetamark>
                    </span>
                    Metamask
                  </li>
                  <li className='py-1 px-5 md:px-8 text-12 md:text-14 flex gap-2 items-center cursor-not-allowed text-gray-787878'>
                    <span className='w-4 h-4 inline-block mr-1 md:mr-3'>
                      <IconCoin98></IconCoin98>
                    </span>
                    Coin98
                  </li>
                </ul>
                <p className={`flex gap-2 justify-end items-center text-12 text-gray-ffffff-50 cursor-pointer bg-gray-151515 py-1.5 md:py-2 px-3 md:px-4 ${playerData.is_connect ? '' : 'cursor-not-allowed'}`} onClick={handleDisconnect}>
                  Disconnect
                  <span className='inline-block opacity-50'>
                    <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M1.05749 5.04462C1.0326 3.05401 2.62613 1.42012 4.61674 1.39523C6.31983 1.37394 7.7618 2.5373 8.15841 4.12044L9.18252 4.12044C8.76786 1.97487 6.86636 0.367025 4.60424 0.39531C2.06139 0.427106 0.0257753 2.51427 0.0575708 5.05712C0.0893663 7.59997 2.17653 9.63558 4.71938 9.60379C6.78697 9.57794 8.51921 8.19322 9.07741 6.30956L8.02096 6.30956C7.50274 7.63706 6.21944 8.58495 4.70688 8.60387C2.71627 8.62876 1.08238 7.03523 1.05749 5.04462Z" fill="white"/>
                      <path d="M4.89648 4.73608C4.62034 4.73608 4.39648 4.95994 4.39648 5.23608C4.39648 5.51223 4.62034 5.73608 4.89648 5.73608L4.89648 4.73608ZM14.25 5.58964C14.4453 5.39438 14.4453 5.07779 14.25 4.88253L11.0681 1.70055C10.8728 1.50529 10.5562 1.50529 10.361 1.70055C10.1657 1.89581 10.1657 2.2124 10.361 2.40766L13.1894 5.23608L10.361 8.06451C10.1657 8.25977 10.1657 8.57636 10.361 8.77162C10.5562 8.96688 10.8728 8.96688 11.0681 8.77162L14.25 5.58964ZM4.89648 5.73608L13.8965 5.73608L13.8965 4.73608L4.89648 4.73608L4.89648 5.73608Z" fill="white"/>
                    </svg>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header