import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import DefaultButon from '../button/DefaultButton';
import { useHistory } from "react-router-dom";
import { isConnect } from 'data/db';
import { Link } from 'react-router-dom';

type Props = {
  playerData: any,
  dataGiveFromHeader: (dataGiveFromHeader: any) => void,
}
const Header: React.FC<Props> = ({playerData, dataGiveFromHeader}) => {
  const classes = useStyles();
  const history = useHistory();
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
    debugger
    setDataWalletSendLottery({
        data: {
          is_connect: data.is_connect, 
          publicKey: data.publicKey,
          adapter_type: data.adapter_type
        }
      }
    )
  }

  return (
    <header className={`${classes.root} ${offset ? 'active' : ''}`}>
      <div className={`${classes.container}`}>
        <Link to="/" className={`${classes.headerLeft}`}><img src="assets/common/logo.png" alt="Millionsy" /><span>Millionsy</span></Link>
        <div className={`${classes.headerRight}`}>
          <ul>
            <li><Link to="/lottery" className={history.location.pathname === '/lottery' ? 'active ': '' }>Lottery</Link></li>
            <li><Link to="/">Millipad</Link></li>
            <li><Link to="/">NFT Tickets</Link></li>
          </ul>
          <DefaultButon text="Connect Wallet" connect={playerData.is_connect} onClick={() => !isConnect ? dataGiveFromHeader(true) : ''}></DefaultButon>
        </div>
      </div>
    </header>
  )
}

export default Header