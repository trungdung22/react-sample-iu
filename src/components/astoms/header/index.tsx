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
import IconSlope from '../icons/slope';

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

  const connectSlope = () => {
    if (!playerData.is_connect) {
      UseWallet("slope").then(response => {
        window.sessionStorage.setItem('show_connect', 'true');
        setDataWalletSendLottery({ 
          data: {
            ...dataWalletSendLottery.data,
            publicKey: response.publicKey.toBase58(),
            is_connect: true,
            adapter_type: "slope"
          },
          disconnect: false,
        });
        window.sessionStorage.setItem('data_connect', 'true')
        window.sessionStorage.setItem('publicKey', response.publicKey.toBase58());
        window.sessionStorage.setItem('adapter_type', 'slope');
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
      <header className={`bg-gray-box px-3/100 border-b border-solid border-gray-boxline-50 ${classes.root} ${offset && (size.width < 769) ? 'active' : ''}`}>
        <div className={`flex items-center justify-between w-full transition-all max-w-1680 mx-auto`}>
          <a href="/" className={`${classes.headerLeft} text-gray-primary`}><img src="/assets/common/logo.png" alt="Millionsy" className='rounded-3' /><span className='inline-block ml-1.5'>Millionsy</span></a>
          <div className={`${classes.headerRight} relative`}>
            <ul className={`listRouter mr-24`}>
              <li className='mr-8'><a href="/lottery" className={location === '/lottery' ? 'active text-blue-primary': 'hover:bg-gray-lightbox text-gray-primary' }>Lottery</a></li>
              <li className='mr-8'><a href="/milligo" className={location === '/milligo' ? 'active text-blue-primary': 'hover:bg-gray-lightbox text-gray-primary'}>MILLIGO</a></li>
              <li><a href="/nft-ticket" className={location === '/nft-ticket' ? 'active text-blue-primary': 'hover:bg-gray-lightbox text-gray-primary'}>NFT Ticket</a></li>
            </ul>
            <div className='py-1 md:py-2'>
              <p className={`font-semibold flex justify-center items-center text-center rounded-2 md:rounded-3 px-2 h-32px md:h-34px md:px-2.5 transition-all cursor-pointer hover:opacity-70 ${ playerData.is_connect ? 'text-white bg-pink-primary' : window.sessionStorage.getItem('show_connect') === 'true' && !playerData.is_connect ? 'text-gray-boxline bg-gray-primary': 'text-gray-box bg-blue-primary'}`}
                onClick={handleClickConnect}
              >
                <span className='inline-block mr-1'>
                  { 
                    playerData.is_connect ? 'Connected' : window.sessionStorage.getItem('show_connect') === 'true' && !playerData.is_connect ? 'Connecting' : 'Connect' 
                  }
                </span>
                {
                  window.sessionStorage.getItem('show_connect') === 'true' && !playerData.is_connect
                  ? 
                  <span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 8V10.5" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 1.5V4" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 6H1.5" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10.5 6H8" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4.58482 4.58507L2.81982 2.82007" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9.18004 9.18004L7.41504 7.41504" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4.58482 7.41504L2.81982 9.18004" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9.18004 2.82007L7.41504 4.58507" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  :
                  <span>
                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.51245 6.625L7.0812 9.19375C7.1983 9.31016 7.35671 9.3755 7.52183 9.3755C7.68694 9.3755 7.84535 9.31016 7.96245 9.19375L10.4625 6.69375" stroke={`${playerData.is_connect ? '#ffffff' : '#1A2222'}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel"/>
                    </svg>
                  </span>
                }
              </p>
              <div className={`border border-solid border-gray-boxline-50 transform absolute right-0 top-full w-240 rounded-5 box-shadow-0440 transition-all bg-gray-box overflow-hidden ${menuConnectedCollapsed ? 'visible opacity-100 pointer-events-auto' : ' invisible opacity-0 pointer-events-none'}`}>
                <p className='text-body-pc font-medium py-1.5 px-4'>
                  Solana
                  <span className='inline-block pb-0.5 ml-2'>
                    <svg width="6" height="3" viewBox="0 0 6 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.0083 0.583252L2.7208 2.29575C2.79887 2.37336 2.90447 2.41692 3.01455 2.41692C3.12463 2.41692 3.23023 2.37336 3.3083 2.29575L4.97497 0.629085" stroke="#F9F9F9" strokeLinecap="round" strokeLinejoin="bevel"/>
                    </svg>
                  </span>
                </p>
                <ul className='bg-gray-lightbox'>
                  <li className={`py-1 px-8 text-body-pc flex items-center transition-all relative ${playerData.is_connect ? window.sessionStorage.getItem('adapter_type') === 'sollet' ? '' : 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-boxline'}`}
                    onClick={connectSollet}
                  >
                    <span className='w-4 h-4 inline-block mr-3'>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="16" height="16" rx="2" fill="#0075FF"/>
                        <path d="M7.94084 8.51379C7.06194 8.20607 6.42144 7.82901 6.01935 7.38259C5.62082 6.93187 5.42155 6.37711 5.42155 5.71834C5.42155 4.9729 5.6653 4.35748 6.15279 3.87205C6.64384 3.38233 7.28077 3.13745 8.0636 3.13745C8.59734 3.13745 9.07239 3.26314 9.48871 3.51451C9.90859 3.76587 10.2324 4.1126 10.4601 4.55467C10.6914 4.99674 10.8071 5.47997 10.8071 6.00438H9.77694C9.77694 5.43229 9.62749 4.98373 9.32859 4.65868C9.02969 4.32931 8.60804 4.16461 8.0636 4.16461C7.55832 4.16461 7.16335 4.30114 6.87869 4.57416C6.59757 4.84288 6.45702 5.21777 6.45702 5.69884C6.45702 6.08458 6.59045 6.41179 6.85734 6.68048C7.12777 6.94487 7.58502 7.18758 8.22907 7.4086C8.87669 7.62965 9.38196 7.8745 9.74491 8.14322C10.1114 8.40759 10.3819 8.71747 10.5562 9.07285C10.7341 9.42825 10.8231 9.84648 10.8231 10.3276C10.8231 11.0947 10.5776 11.7101 10.0865 12.1738C9.59546 12.6332 8.93894 12.8629 8.11699 12.8629C7.58324 12.8629 7.08507 12.7394 6.62249 12.4924C6.1599 12.241 5.8023 11.8986 5.54965 11.4652C5.30057 11.0318 5.17603 10.5399 5.17603 9.9895H6.20615C6.20615 10.5616 6.37874 11.0145 6.7239 11.3482C7.07262 11.6776 7.53697 11.8423 8.11699 11.8423C8.65784 11.8423 9.07239 11.7079 9.36061 11.4392C9.64884 11.1705 9.79294 10.8043 9.79294 10.3406C9.79294 9.87681 9.65951 9.51927 9.39264 9.2679C9.12576 9.01219 8.64184 8.7608 7.94084 8.51379Z" fill="white"/>
                      </svg>
                    </span>
                    Sollet
                    {
                      playerData.is_connect && window.sessionStorage.getItem('adapter_type') === 'sollet' &&
                      <span className='absolute top-3 right-3'>
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 4.57L3.295 6.865L9.16 1" stroke="#00FFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    }
                  </li>
                  <li className={`py-1 px-8 text-body-pc flex items-center transition-all relative ${playerData.is_connect ? window.sessionStorage.getItem('adapter_type') === 'phantom' ? '' : 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-boxline'}`}
                    onClick={connectPhantom}
                  >
                    <span className='w-4 h-4 inline-block mr-3'>
                      <IconPhantom></IconPhantom>
                    </span>
                    Phantom
                    {
                      playerData.is_connect && window.sessionStorage.getItem('adapter_type') === 'phantom' &&
                      <span className='absolute top-3 right-3'>
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 4.57L3.295 6.865L9.16 1" stroke="#00FFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    }
                  </li>
                  <li className='py-1 px-8 text-body-pc flex items-center cursor-not-allowed opacity-50'>
                    <span className='w-4 h-4 inline-block mr-3'>
                      <IconCoin98></IconCoin98>
                    </span>
                    Coin98
                  </li>
                  <li className={`py-1 px-8 text-body-pc flex items-center transition-all relative ${playerData.is_connect ? window.sessionStorage.getItem('adapter_type') === 'slope' ? '' : 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-boxline'}`}
                    onClick={connectSlope}
                  >
                    <span className='w-4 h-4 inline-block mr-3'>
                      <IconSlope></IconSlope>
                    </span>
                    Slope
                    {
                      playerData.is_connect && window.sessionStorage.getItem('adapter_type') === 'slope' &&
                      <span className='absolute top-3 right-3'>
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 4.57L3.295 6.865L9.16 1" stroke="#00FFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    }
                  </li>
                </ul>
                <p className='text-body-pc font-medium py-1.5 px-4'>
                  Binance Smart Chain
                  <span className='inline-block pb-0.5 ml-2'>
                    <svg width="6" height="3" viewBox="0 0 6 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.0083 0.583252L2.7208 2.29575C2.79887 2.37336 2.90447 2.41692 3.01455 2.41692C3.12463 2.41692 3.23023 2.37336 3.3083 2.29575L4.97497 0.629085" stroke="#F9F9F9" strokeLinecap="round" strokeLinejoin="bevel"/>
                    </svg>
                  </span>
                </p>
                <ul className='bg-gray-lightbox'>
                  <li className='py-1 px-8 text-body-pc flex items-center cursor-not-allowed opacity-50'>
                    <span className='w-4 h-4 inline-block mr-3'>
                      <IconMetamark></IconMetamark>
                    </span>
                    Metamask
                  </li>
                  <li className='py-1 px-8 text-body-pc flex items-center cursor-not-allowed opacity-50'>
                    <span className='w-4 h-4 inline-block mr-3'>
                      <IconCoin98></IconCoin98>
                    </span>
                    Coin98
                  </li>
                </ul>
                <p className={`flex justify-end items-center text-body-pc cursor-pointer py-1.5 px-2 ${playerData.is_connect ? 'transition-all text-gray-primary hover:opacity-70' : 'cursor-not-allowed opacity-50'}`} onClick={handleDisconnect}>
                  Disconnect
                  <span className={`inline-block ml-2 ${playerData.is_connect ? '' : 'opacity-50'}`}>
                    <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M1.05749 5.04462C1.0326 3.05401 2.62613 1.42012 4.61674 1.39523C6.31983 1.37394 7.7618 2.5373 8.15841 4.12044L9.18252 4.12044C8.76786 1.97487 6.86636 0.367025 4.60424 0.39531C2.06139 0.427106 0.0257753 2.51427 0.0575708 5.05712C0.0893663 7.59997 2.17653 9.63558 4.71938 9.60379C6.78697 9.57794 8.51921 8.19322 9.07741 6.30956L8.02096 6.30956C7.50274 7.63706 6.21944 8.58495 4.70688 8.60387C2.71627 8.62876 1.08238 7.03523 1.05749 5.04462Z" fill='#ffffff'/>
                      <path d="M4.89648 4.73608C4.62034 4.73608 4.39648 4.95994 4.39648 5.23608C4.39648 5.51223 4.62034 5.73608 4.89648 5.73608L4.89648 4.73608ZM14.25 5.58964C14.4453 5.39438 14.4453 5.07779 14.25 4.88253L11.0681 1.70055C10.8728 1.50529 10.5562 1.50529 10.361 1.70055C10.1657 1.89581 10.1657 2.2124 10.361 2.40766L13.1894 5.23608L10.361 8.06451C10.1657 8.25977 10.1657 8.57636 10.361 8.77162C10.5562 8.96688 10.8728 8.96688 11.0681 8.77162L14.25 5.58964ZM4.89648 5.73608L13.8965 5.73608L13.8965 4.73608L4.89648 4.73608L4.89648 5.73608Z" fill='#ffffff'/>
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