import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import Title from 'components/astoms/title/DefaultTitle';
import Star from 'components/astoms/star';
import Header from 'components/astoms/header';
import Footer from 'components/astoms/footer';
import ModalContent from 'components/astoms/modalSection';
import { fetchPlayerAccount } from 'lib/utilities/utils';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const history = useHistory();
  history.push('/lottery');

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
    if (getDataHeader.disconnect) {
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
    if (getDataHeader !== undefined && getDataHeader.data.publicKey !== '' && getDataHeader.data.publicKey !== undefined) {
      fetchPlayerAccount(getDataHeader.data.publicKey).then(item => {
        setPlayerData({
          data: {
            is_connect: getDataHeader.data.is_connect,
            adapter_type: getDataHeader.data.adapter_type,
            lamportUnit: item.lamportUnit,
            publicKey: getDataHeader.data.publicKey,
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

  // const sollet = new SolletWalletAdapter({ provider: PROVIDER_URL, network: SOLLET_ADAPTER_NETWORD});
  // const [modalDisconnect, setModalDisconnect] = useState(false);
  // const handleClickConnect = () => {
  //   if (playerData.data.is_connect) {
  //     setModalDisconnect(true);
  //   } else {
  //     setDataModal({ data: { ...dataModal.data, show: true }})
  //   }
  // }
  // const handleDisconnect = () => {
  //   setModalDisconnect(false);
  //   window.sessionStorage.clear();
  //   sollet.disconnect() as Promise<void>;
  //   setDataModal({
  //     data: {
  //       is_connect: false,
  //       show: false,
  //       first: false,
  //       second: false,
  //       third: false,
  //       four: false,
  //       view_ticket: false,
  //       view_your: false,
  //       submit: false,
  //       flag_submit: false,
  //       your_ticket: [],
  //       next_round: {
  //         next_id: -1,
  //         your_ticket: []
  //       },
  //     }
  //   })
  //   setPlayerData({
  //     data: {
  //       is_connect: false,
  //       adapter_type: '',
  //       publicKey: '',
  //       lamportUnit: 0,
  //       balanceUSDT: 0,
  //       balanceSOL: 0,
  //     }
  //   })
  // }

  // if (playerData.data.is_connect) {
  //   window.sessionStorage.setItem('show_connect', 'false');
  // }

  return (
    <>
      {/* { 
        window.sessionStorage.getItem('show_connect') === 'true' && !playerData.data.is_connect &&
        <div className='fixed top-0 left-0 z-1000 bg-gray-400 h-full w-full'>
          <p className='w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2.5 text-16 font-bold text-gray-750 rounded-5 text-center bg-white max-w-320'>
            Connecting
            <span className='inline-block ml-3'>
              <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.93287 13.779C3.63991 14.0737 3.16493 14.0737 2.87197 13.779L0.219719 11.1116C-0.0732398 10.8169 -0.0732398 10.3392 0.219719 10.0446L2.87197 7.3771C3.16493 7.08246 3.63991 7.08246 3.93287 7.3771C4.22583 7.67174 4.22583 8.14945 3.93287 8.44409L2.56205 9.82277H12.3763C12.7906 9.82277 13.1265 9.48498 13.1265 9.0683V8.50882C13.1265 8.09214 13.4624 7.75435 13.8767 7.75435C14.291 7.75435 14.6268 8.09214 14.6268 8.50882V9.0683C14.6268 10.3183 13.6192 11.3317 12.3763 11.3317H2.56042L3.93287 12.712C4.22583 13.0067 4.22583 13.4844 3.93287 13.779Z" fill="#999999"/>
                <path d="M11.0671 6.6229C11.3601 6.91754 11.8351 6.91754 12.128 6.6229L14.7803 3.95543C15.0732 3.66079 15.0732 3.18309 14.7803 2.88845L12.128 0.22098C11.8351 -0.0736599 11.3601 -0.0736599 11.0671 0.22098C10.7742 0.515621 10.7742 0.993327 11.0671 1.28797L12.4415 2.67025H2.62413C1.38121 2.67025 0.373619 3.68361 0.373619 4.93366V5.49093C0.373619 5.90761 0.709481 6.2454 1.12379 6.2454C1.5381 6.2454 1.87396 5.90761 1.87396 5.49093V4.93366C1.87396 4.51698 2.20982 4.17919 2.62413 4.17919H12.436L11.0671 5.55591C10.7742 5.85055 10.7742 6.32826 11.0671 6.6229Z" fill="#999999"/>
              </svg>
            </span>
          </p>
        </div>
      } */}
      <Star></Star>
      <Header playerData={playerData.data} dataGiveFromHeader={dataGiveFromHeader}></Header>
      <div className={`${classes.root}`}>
        <div className={`${classes.container}`}>
          <ul className={`${classes.face}`}>
            <li><img src="/assets/top/face01.png" alt="face01" /></li>
            <li><img src="/assets/top/face02.png" alt="face02" /></li>
          </ul>
          <div className={`${classes.content}`}>
            <Title text={['We start', <br />, 'the next', <br />, 'generation!']}></Title>
            <p className={`${classes.text}`}>The first Lottery platform and Game Launchpad on Solana</p>
            <p className={`w-140 text-13 md:text-14 font-bold text-center rounded-5 p-2 md:px-3 transition-all cursor-pointer hover:opacity-70 ${playerData.data.is_connect ? 'text-white bg-pink-150' : 'text-blue-50 bg-blue-0'}`}>{playerData.data.is_connect ? 'Connected' : 'Connect Wallet'}</p>
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