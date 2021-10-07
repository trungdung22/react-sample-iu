import React, { useState } from 'react';
import useStyles from './styles';
import Title from 'components/astoms/title/DefaultTitle';
import DefaultButon from 'components/astoms/button/DefaultButton';
import { IS_CONNECT } from 'data/constants';
import Star from 'components/astoms/star';
import Header from 'components/astoms/header';
import Footer from 'components/astoms/footer';
import ModalContent from 'components/astoms/modalSection';
import { fetchPlayerAccount } from 'lib/utilities/utils';

const Home: React.FC = () => {
  const classes = useStyles();
  const [dataModal, setDataModal] = useState({
    data: {
      is_connect: IS_CONNECT,
      show: false,
      first: false,
      second: false,
      third: false,
      four: false,
      view_ticket: false,
      view_your: false,
      submit: false,
      flag_submit: false,
      your_ticket: [],
      next_round: {
        next_id: -1,
        your_ticket: []
      },
    }
  });
  const dataGiveFromModal = (getDataModalTolottery: any) => {
    setDataModal({
      data: getDataModalTolottery,
    })
  }

  const [playerData, setPlayerData] = useState({
    data: {
      is_connect : false,
      lamportUnit: 0,
      adapter_type: '',
      publicKey: '',
      balanceUSDT: 0,
      balanceSOL: 0,
    }
  });

  const dataGiveFromHeader = (getDataHeader: any) => {
    debugger
    setDataModal({
      data: {
        ...dataModal.data,
        show: true,
      }
    })
    if (getDataHeader.getDataHeader !== undefined && getDataHeader.publicKey !== '') {
      fetchPlayerAccount(getDataHeader.publicKey).then(item => {
        setPlayerData({
          data: {
            is_connect: getDataHeader.is_connect,
            adapter_type: getDataHeader.adapter_type,
            lamportUnit: item.lamportUnit,
            publicKey: getDataHeader.publicKey,
            balanceUSDT: item.balanceUSDT,
            balanceSOL: item.balanceSOL,
          }
        })
      });
    }
  }

  const dataGiveFromWallet = (getDataWallet: any) => {
    debugger
    if (getDataWallet.publicKey !== undefined && getDataWallet.publicKey !== '') {
      fetchPlayerAccount(getDataWallet.publicKey).then(item => {
        setPlayerData({
          data: {
            is_connect: getDataWallet.is_connect,
            adapter_type: getDataWallet.adapter_type,
            lamportUnit: item.lamportUnit,
            publicKey: getDataWallet.publicKey,
            balanceUSDT: item.balanceUSDT,
            balanceSOL: item.balanceSOL,
          }
        })
      });
      setDataModal({
        data: {
          ...dataModal.data,
          show: false,
        }
      })
    }
  }

  return (
    <>
      <Star></Star>
      <Header playerData={playerData.data} dataGiveFromHeader={dataGiveFromHeader}></Header>
      <div className={`${classes.root}`}>
        <div className={`${classes.container}`}>
          <ul className={`${classes.face}`}>
            <li><img src="assets/top/face01.png" alt="face01" /></li>
            <li><img src="assets/top/face02.png" alt="face02" /></li>
          </ul>
          <div className={`${classes.content}`}>
            <Title text={['We start', <br />, 'the next Lottery', <br />, 'generation']}></Title>
            <p className={`${classes.text}`}>The first crosschain Lottery ever<br className="sp-768" /> powered by Solana</p>
            <DefaultButon text={'Connect Wallet'} small="small" connect={playerData.data.is_connect} onClick={() => !playerData.data.is_connect ? setDataModal({ data: { ...dataModal.data, show: true } }) : ''}></DefaultButon>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <ModalContent dataModal={dataModal.data}
        dataGiveFromModal={dataGiveFromModal}
        playerData={playerData}
        dataGiveFromWallet={dataGiveFromWallet}>
      </ModalContent>
    </>
  )
}

export default Home