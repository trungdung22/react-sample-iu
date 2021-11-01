import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import Title from 'components/astoms/title/DefaultTitle';
import DefaultButon from 'components/astoms/button/DefaultButton';
import { IS_CONNECT } from 'data/constants';
import Star from 'components/astoms/star';
import Header from 'components/astoms/header';
import Footer from 'components/astoms/footer';
import ModalContent from 'components/astoms/modalSection';
import { fetchPlayerAccount } from 'lib/utilities/utils';
import { SolletWalletAdapter } from "lib/wallets/sollet";
import { SOLLET_ADAPTER_NETWORD } from 'lib/program/config'; 

const Home: React.FC = () => {
  const PROVIDER_URL = "https://www.sollet.io";
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
  const classes = useStyles();
  const [dataModal, setDataModal] = useState({
    data: {
      is_connect: playerData.data.is_connect,
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

  useEffect(() => {
    if (window.sessionStorage.getItem("data_connect") === "true") {
      setDataModal({
        data: {
          ...dataModal.data,
          is_connect: true,
        }
      }) 
  
      fetchPlayerAccount(window.sessionStorage.getItem("publicKey")).then(item => setPlayerData({
        data: {
          adapter_type: window.sessionStorage.getItem("adapter_type"),
          is_connect: true,
          lamportUnit: item.lamportUnit,
          publicKey: window.sessionStorage.getItem("publicKey"),
          balanceUSDT: item.balanceUSDT,
          balanceSOL: item.balanceSOL,
        }
      }));
    }
  }, [])

  const dataGiveFromModal = (getDataModalTolottery: any) => {
    setDataModal({
      data: getDataModalTolottery,
    })
  }

  const dataGiveFromHeader = (getDataHeader: any) => {
    setDataModal({
      data: {
        ...dataModal.data,
        show: getDataHeader !== undefined && getDataHeader.is_connect !== false ? true : false,
      }
    })
    if (getDataHeader !== undefined && getDataHeader.publicKey !== '') {
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

  const sollet = new SolletWalletAdapter({ provider: PROVIDER_URL, network: SOLLET_ADAPTER_NETWORD});
  // const handleClickConnect = () => {
  //   if (playerData.data.is_connect) {
  //     window.sessionStorage.clear();
  //     sollet.disconnect() as Promise<void>;
  //     setDataModal({
  //       data: {
  //         is_connect: false,
  //         show: false,
  //         first: false,
  //         second: false,
  //         third: false,
  //         four: false,
  //         view_ticket: false,
  //         view_your: false,
  //         submit: false,
  //         flag_submit: false,
  //         your_ticket: [],
  //         next_round: {
  //           next_id: -1,
  //           your_ticket: []
  //         },
  //       }
  //     })
  //   } else {
  //     setDataModal({ data: { ...dataModal.data, show: true }})
  //   }
  // }
  const [modalDisconnect, setModalDisconnect] = useState(false);
  const handleClickConnect = () => {
    if (playerData.data.is_connect) {
      setModalDisconnect(true);
    } else {
      setDataModal({ data: { ...dataModal.data, show: true }})
    }
  }
  const handleDisconnect = () => {
    setModalDisconnect(false);
    window.sessionStorage.clear();
    sollet.disconnect() as Promise<void>;
    setDataModal({
      data: {
        is_connect: false,
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
    })
    setPlayerData({
      data: {
        is_connect: false,
        adapter_type: '',
        publicKey: '',
        lamportUnit: 0,
        balanceUSDT: 0,
        balanceSOL: 0,
      }
    })
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
                <path fillRule="evenodd" clip-rule="evenodd" d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L6 4.58579L1.70711 0.292894C1.31658 -0.0976301 0.683417 -0.0976301 0.292893 0.292894C-0.0976311 0.683419 -0.0976311 1.31658 0.292893 1.70711L4.58579 6L0.292893 10.2929C-0.0976311 10.6834 -0.0976311 11.3166 0.292893 11.7071C0.683417 12.0976 1.31658 12.0976 1.70711 11.7071L6 7.41421L10.2929 11.7071C10.6834 12.0976 11.3166 12.0976 11.7071 11.7071C12.0976 11.3166 12.0976 10.6834 11.7071 10.2929L7.41421 6L11.7071 1.70711Z" fill="white"/>
              </svg>
            </p>
          </div>
        </div>
      }
      <Star></Star>
      <Header playerData={playerData.data} dataGiveFromHeader={dataGiveFromHeader}></Header>
      <div className={`${classes.root}`}>
        <div className={`${classes.container}`}>
          <ul className={`${classes.face}`}>
            <li><img src="/assets/top/face01.png" alt="face01" /></li>
            <li><img src="/assets/top/face02.png" alt="face02" /></li>
          </ul>
          <div className={`${classes.content}`}>
            <Title text={['We start', <br />, 'the next Lottery', <br />, 'generation']}></Title>
            <p className={`${classes.text}`}>The first crosschain Lottery ever<br className="sp-768" /> powered by Solana</p>
            <DefaultButon text={'Connect Wallet'} small="small" connect={playerData.data.is_connect} onClick={handleClickConnect}></DefaultButon>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <ModalContent dataModal={dataModal.data}
        dataGiveFromModal={dataGiveFromModal}
        playerData={playerData.data}
        dataGiveFromWallet={dataGiveFromWallet}>
      </ModalContent>
    </>
  )
}

export default Home