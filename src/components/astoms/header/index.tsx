import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import DefaultButon from '../button/DefaultButton';
import { useHistory } from "react-router-dom";
import { IS_CONNECT } from 'data/constants';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { UseWallet } from 'lib/program/wallet-provider';
import { SolletWalletAdapter } from "lib/wallets/sollet";
import { SOLLET_ADAPTER_NETWORD } from 'lib/program/config'; 

type Props = {
  playerData: any,
  dataGiveFromHeader: (dataGiveFromHeader: any) => void,
}
type urlParams = {
  nameProject: string,
};
const Header: React.FC<Props> = ({playerData, dataGiveFromHeader}) => {
  const PROVIDER_URL = "https://www.sollet.io";
  const classes = useStyles();
  const history = useHistory();
  const {nameProject} = useParams<urlParams>();
  const [location, setLocation] = useState(typeof nameProject !== 'undefined' ? '/MILLIGO' : history.location.pathname);
  const [dataWalletSendLottery, setDataWalletSendLottery] = useState({
    data: {
      is_connect : false,
      lamportUnit: 0,
      adapter_type: '',
      publicKey: '',
      balanceUSDT: 0,
      balanceSOL: 0,
    }
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
  }, []);
  const [modalDisconnect, setModalDisconnect] = useState(false);

  useEffect(() => {
    dataGiveFromHeader(dataWalletSendLottery.data);
  }, [dataWalletSendLottery])

  const dataGiveWallet = (data: any) => {
    setDataWalletSendLottery({
        data: {
          ...dataWalletSendLottery.data,
          is_connect: data.is_connect, 
          publicKey: data.publicKey,
          adapter_type: data.adapter_type
        }
      }
    )
  }
  const sollet = new SolletWalletAdapter({ provider: PROVIDER_URL, network: SOLLET_ADAPTER_NETWORD});
  const handleClickConnect = () => {
    if (playerData.is_connect) {
      setModalDisconnect(true);
    } else {
      dataGiveFromHeader({
        data: {
          is_connect: true,
        }
      });
    }
  }
  const handleDisconnect = () => {
    setModalDisconnect(false);
    setDataWalletSendLottery({
      data: {
        is_connect: false,
        adapter_type: '',
        publicKey: '',
        lamportUnit: 0,
        balanceUSDT: 0,
        balanceSOL: 0,
      }
    })
    dataGiveFromHeader({
      data: {
        is_connect: false,
        adapter_type: '',
        publicKey: '',
        lamportUnit: 0,
        balanceUSDT: 0,
        balanceSOL: 0,
      },
    })
    window.sessionStorage.clear();
    sollet.disconnect() as Promise<void>;
  }
  

  return (
    <>
      {
        modalDisconnect && 
        <div className='fixed top-0 left-0 z-1000 h-full w-full'>
          <div className='absolute top-0 left-0 z-100 bg-gray-400 h-full w-full' onClick={() => setModalDisconnect(false)}></div>
          <div className='z-1000 w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 max-w-320 bg-gray-0 rounded-20 border border-solid border-blue-0'>
            <p className='text-20 font-bold text-blue-50 rounded-5 text-center bg-blue-0 max-w-200 py-1.5 cursor-pointer transition-all hover:opacity-70' onClick={handleDisconnect}>Disconnect</p>
            <p className='absolute top-1/2 right-0 transform -translate-y-1/2 p-4 cursor-pointer' onClick={() => setModalDisconnect(false)}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L6 4.58579L1.70711 0.292894C1.31658 -0.0976301 0.683417 -0.0976301 0.292893 0.292894C-0.0976311 0.683419 -0.0976311 1.31658 0.292893 1.70711L4.58579 6L0.292893 10.2929C-0.0976311 10.6834 -0.0976311 11.3166 0.292893 11.7071C0.683417 12.0976 1.31658 12.0976 1.70711 11.7071L6 7.41421L10.2929 11.7071C10.6834 12.0976 11.3166 12.0976 11.7071 11.7071C12.0976 11.3166 12.0976 10.6834 11.7071 10.2929L7.41421 6L11.7071 1.70711Z" fill="white"/>
              </svg>
            </p>
          </div>
        </div>
      }
      
      <header className={`${classes.root} ${offset ? 'active' : ''}`}>
        <div className={`${classes.container}`}>
          <a href="/" className={`${classes.headerLeft}`}><img src="/assets/common/logo.png" alt="Millionsy" /><span>Millionsy</span></a>
          <div className={`${classes.headerRight}`}>
            <ul>
              <li><a href="/lottery" className={location === '/lottery' ? 'active ': '' }>Lottery</a></li>
              <li><a href="/MILLIGO" className={location === '/MILLIGO' ? 'active ': ''}>MILLIGO</a></li>
              <li><a href="/" className={location === '/tickets' ? 'active ': ''}>NFT Tickets</a></li>
            </ul>
            <DefaultButon text="Connect Wallet" connect={playerData.is_connect} onClick={handleClickConnect}></DefaultButon>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header