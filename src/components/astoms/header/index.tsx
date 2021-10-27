import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import DefaultButon from '../button/DefaultButton';
import { useHistory } from "react-router-dom";
import { IS_CONNECT } from 'data/constants';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { UseWallet } from 'lib/program/wallet-provider';
import { SolletWalletAdapter } from "lib/wallets/sollet";

type Props = {
  playerData: any,
  dataGiveFromHeader: (dataGiveFromHeader: any) => void,
}
type urlParams = {
  nameProject: string,
};
const Header: React.FC<Props> = ({playerData, dataGiveFromHeader}) => {
  const classes = useStyles();
  const history = useHistory();
  const {nameProject} = useParams<urlParams>();
  const [location, setLocation] = useState(typeof nameProject !== 'undefined' ? '/millipad' : history.location.pathname);
  const [dataWalletSendLottery, setDataWalletSendLottery] = useState({
    data: {
      publicKey: '',
      is_connect: false,
      adapter_type: '',
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

  useEffect(() => {
    dataGiveFromHeader(dataWalletSendLottery.data);
  }, [dataWalletSendLottery])

  const dataGiveWallet = (data: any) => {
    setDataWalletSendLottery({
        data: {
          is_connect: data.is_connect, 
          publicKey: data.publicKey,
          adapter_type: data.adapter_type
        }
      }
    )
  }
  
  if (playerData.is_connect) {
    window.sessionStorage.setItem('data_connect', 'true')
  }
  

  return (
    <header className={`${classes.root} ${offset ? 'active' : ''}`}>
      <div className={`${classes.container}`}>
        <a href="/" className={`${classes.headerLeft}`}><img src="/assets/common/logo.png" alt="Millionsy" /><span>Millionsy</span></a>
        <div className={`${classes.headerRight}`}>
          <ul>
            <li><a href="/lottery" className={location === '/lottery' ? 'active ': '' }>Lottery</a></li>
            <li><a href="/" className={location === '/millipad' ? 'active ': ''}>Millipad</a></li>
            <li><a href="/" className={location === '/tickets' ? 'active ': ''}>NFT Tickets</a></li>
          </ul>
          <DefaultButon text="Connect Wallet" connect={Boolean(window.sessionStorage.getItem('data_connect'))} onClick={() => !Boolean(window.sessionStorage.getItem('data_connect')) ? dataGiveFromHeader(true) : ''}></DefaultButon>
        </div>
      </div>
    </header>
  )
}

export default Header