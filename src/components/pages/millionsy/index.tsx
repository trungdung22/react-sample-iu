import Footer from 'components/astoms/footer';
import Header from 'components/astoms/header';
import ModalContent from 'components/astoms/modalSection';
import React, { useEffect, useState } from 'react';
import { fetchPlayerAccount, getGameBoardInfo, registerMilipadPlayer, updateJoinWhiteListUser, updateMiliPadPlayer, updateMillipadsUsername, updateMissionPlayer } from 'lib/utilities/utils';
import { SolletWalletAdapter } from 'lib/wallets/sollet';
import { SOLLET_ADAPTER_NETWORD } from 'lib/program/config'; 
import { HOST_NAME, PROVIDER_URL, useWindowSize } from 'data/constants';
import { getMillipads } from 'lib/utilities/utils';
import { buyMilliPad } from 'lib/program/lottery-commands';
import CountUp from 'react-countup';
import { Route, useHistory, useParams } from 'react-router-dom';

type urlParams = {
  nameProject: string,
};
const Millionsy: React.FC = () => {
  const [isFinishMission, setIsFinishMission] = useState(false);
  const [isNextStepTwitter, setIsNextStepTwitter] = useState(false);
  const [isHadread, setIsHadread] = useState(false);
  const [isShowNotification, setIsShowNotification] = useState(false);
  const size = useWindowSize();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isActiveSelect, setIsActiveSelect] = useState(false);
  const [isJoinWhiteList, setIsJoinWhiteList] = useState(false);
  const [valueOption, setValueOption] = useState('');
  const [isFinishSaleRound, setIsFinishSaleRound] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState('telegram');
  const [showModalTicket, setShowModalTicket] = useState(false);
  const sollet = new SolletWalletAdapter({ provider: PROVIDER_URL, network: SOLLET_ADAPTER_NETWORD});
  const [modalDisconnect, setModalDisconnect] = useState(false);
  const [countDown, setCountDown] = useState(Number);
  const [windowOnLoad, setWindowOnLoad] = useState(false);
  const [dataPlayerMilli, setDataPlayerMilli] = useState(null);
  const [getDataMillipads, setGetDataMillipads] = useState(null);
  const [gameBoards, setGameBoards] = useState(null);
  const [getFlowers, setGetFlowers] = useState(0);
  const {nameProject} = useParams<urlParams>();
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [getUserName, setGetUserName] = useState('');
  
  
  const [flagSlots, setFlagSlots] = useState({
    twitter: {
      waggle: 0,
      millionsy: 0,
      retweet: 0,
    },
    telegram: {
      waggle: 0,
      millionsy: 0,
      retweet: 0,
    }
  })
  const [flagOnclick, setFlagOnclick] = useState({
    twitter: {
      waggle: true,
      millionsy: false,
      retweet: false,
    },
    telegram: {
      waggle: true,
      millionsy: false,
      retweet: false,
    }
  })
  const [playerData, setPlayerData] = useState({
    data: {
      is_connect: false,
      adapter_type: '',
      publicKey: '',
      lamportUnit: 0,
      balanceUSDT: 0,
      balanceSOL: 0,
    }
  });
  const [timeCountDown, setTimeCountDown] = useState({
    days: '0',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

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
      history_round: {
        id: -1, 
        your_ticket: []
      },
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
      fetchPlayerAccount(
        getDataHeader.data.publicKey,
        getDataHeader.data.adapter_type
      ).then(item => {
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
        history_round: {
          id: -1, 
          your_ticket: []
        },
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

  const dataGiveFromWallet = (getDataWallet: any) => {
    if (getDataWallet.publicKey !== undefined && getDataWallet.publicKey !== '') {
      fetchPlayerAccount(
        getDataWallet.publicKey,
        getDataWallet.adapter_type
      ).then(item => {
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

  useEffect(() => {
    if (window.sessionStorage.getItem("data_connect") === "true") {
      setDataModal({
        data: {
          ...dataModal.data,
          is_connect: true,
        }
      }) 
  
      fetchPlayerAccount(
        window.sessionStorage.getItem("publicKey"),
        window.sessionStorage.getItem("adapter_type"),
      ).then(item => setPlayerData({
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
    getGameBoardInfo().then(data => setGameBoards(data));
    getMillipads().then(data => {
      let hasProject = false;
      data.results.map((e) => {
        if (e.code === nameProject) {
          setGetDataMillipads(e)
          hasProject = true;
        }
      })
      if(!hasProject) {
        setGetDataMillipads(-1)
      }
    });
    setWindowOnLoad(true);
  }, [])
  useEffect(() => {
    if (getDataMillipads !== null) {
      setCountDown(new Date(getDataMillipads.end_time).getTime());
      if (getDataMillipads.status !== 'deploy' && getDataMillipads.status !== 'whileList') {
        setGetFlowers(14400);
      } else if (getDataMillipads.status === 'whileList'){
        const now = new Date().getTime();
        const distance = new Date(getDataMillipads.end_time).getTime() - now;
        setGetFlowers(parseInt(((3*24*60*60*1000 - distance) / 18000).toFixed(0)));
      }
    }
    if (getDataMillipads === -1) {
      history.push('/404');
    }
  }, [getDataMillipads])
  useEffect(() => {
    if (getDataMillipads !== null && getDataMillipads.status === 'whileList'){
      setTimeout(() => {
        setGetFlowers(getFlowers + Math.floor(Math.random() * 2) + 2)
      }, 18000);
    }
  }, [getFlowers])
  useEffect(() => {
    if(playerData.data.is_connect) {
      fetch(`${HOST_NAME}/api/milli-pads/${nameProject}/player/${playerData.data.publicKey}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        if(response.status === 200) {
          response.json().then(data => {
            setDataPlayerMilli(data)
          })
        } else {
          registerMilipadPlayer(playerData.data.publicKey, [], getDataMillipads !== null ? getDataMillipads.code : '');
        }
      })
    }
  }, [playerData])
  useEffect(() => {
    if(dataPlayerMilli !== null) {
      const session = dataPlayerMilli.sessions.join('');
      setFlagSlots({
        twitter: {
          waggle: session.indexOf('twitterMission1') > -1 ? 1 : 0,
          millionsy: session.indexOf('twitterMission2') > -1 ? 1 : 0,
          retweet: session.indexOf('twitterMission3') > -1 ? 1 : 0,
        },
        telegram: {
          waggle: session.indexOf('telegramMission1') > -1 ? 1 : 0,
          millionsy: session.indexOf('telegramMission2') > -1 ? 1 : 0,
          retweet: session.indexOf('telegramMission3') > -1 ? 1 : 0,
        }
      })
      setIsFinishSaleRound(typeof dataPlayerMilli.sale_amount !== 'undefined' && dataPlayerMilli.sale_amount > 0 ? true : false);
    }
  }, [dataPlayerMilli])
  useEffect(() => {
    if (windowOnLoad) {
      const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;
      const timer = setInterval(function() {    
        const now = new Date().getTime();
        const distance = countDown - now;
        if (distance < 0) {
          clearInterval(timer);
        }
        if (distance > 0) {
          setTimeCountDown({
            days: Math.floor(distance / (day)).toString(),
            hours: Math.floor((distance % (day)) / (hour)) < 10 ? '0' + Math.floor((distance % (day)) / (hour)) : Math.floor((distance % (day)) / (hour)).toString(),
            minutes: Math.floor((distance % (hour)) / (minute)) < 10 ? '0' + Math.floor((distance % (hour)) / (minute)) : Math.floor((distance % (hour)) / (minute)).toString(),
            seconds: Math.floor((distance % (minute)) / second) < 10 ? '0' + Math.floor((distance % (minute)) / second) : Math.floor((distance % (minute)) / second).toString(),
          })
        }
      }, 0);
    }
  }, [countDown])

  useEffect(() => {
    if(showModalTicket || isShowNotification) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [showModalTicket, isShowNotification])
  

  const handleUpdateMillionsy = (category) => {
    if (isFinishMission && userName !== '') {
      if (category === 'telegram') {
        updateMissionPlayer(playerData.data.publicKey, ['telegramMission1', 'telegramMission2', 'telegramMission3'], getDataMillipads !== null ? getDataMillipads.code : '')
      } 
      if (category === 'twitter') {
        updateMissionPlayer(playerData.data.publicKey, ['twitterMission1', 'twitterMission2', 'twitterMission3'], getDataMillipads !== null ? getDataMillipads.code : '')
      }
      updateMillipadsUsername(playerData.data.publicKey, getDataMillipads !== null ? getDataMillipads.code : '', userName).then(res => handleCloseModalFinish());
    }
  }

  const handleCloseModal = () => {
    setShowModalTicket(false);
    setUserName('');
    setFlagOnclick({
      twitter: {
        waggle: true,
        millionsy: false,
        retweet: false,
      },
      telegram: {
        waggle: true,
        millionsy: false,
        retweet: false,
      }
    })
    setIsFinishMission(false);
    setFlagSlots({
      twitter: {
        waggle: 0,
        millionsy: 0,
        retweet: 0,
      },
      telegram: {
        waggle: 0,
        millionsy: 0,
        retweet: 0,
      }
    })
  }

  const handleCloseModalFinish = () => {
    setShowModalTicket(false);
    setUserName('');
    setFlagOnclick({
      twitter: {
        waggle: true,
        millionsy: false,
        retweet: false,
      },
      telegram: {
        waggle: true,
        millionsy: false,
        retweet: false,
      }
    })
    setIsFinishMission(false);
  }

  return (
    <>
      <Header playerData={playerData.data} dataGiveFromHeader={dataGiveFromHeader}></Header>
      <section className='px-3/100 mb-5 md:mb-8'>
        <div className='max-w-900 mx-auto relative mt-6 md:mt-8'>
          <p className='absolute top-2 xl:top-0 left-2 xl:-left-20 w-5 md:w-8 xl:w-50 transition-all hover:opacity-70'>
            <a href="/milligo">
              <svg className='w-full h-full' width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="50" height="50" rx="25" fill="#1A2222"/>
                <path d="M35.0879 25H15.4629" stroke="#F9F9F9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel"/>
                <path d="M20.4131 19.025L15.2756 24.1625C15.0428 24.3967 14.9121 24.7135 14.9121 25.0437C14.9121 25.3739 15.0428 25.6908 15.2756 25.925L20.2756 30.925" stroke="#F9F9F9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel"/>
              </svg>
            </a>
          </p>
          <div className='flex'>
            <div className='flex-shrink-0 mr-3 md:mr-6 xl:mr-8'>
              <p className='w-36 md:w-auto rounded-3 md:rounded-10 p-0.5 bg-gray-box'><img src="/assets/millipad/under_millionsy.png" alt="" className='rounded-3 md:rounded-10 max-w-full'/></p>
            </div>
            <div className='md:pt-4'>
              <h3 className='text-h1-sp md:text-h1-pc text-blue-primary uppercase font-bungee mb-2.5 md:mb-4 leading-8 md:leading-normal'>{nameProject}</h3>
              <p>MILLIONSY is the first Solana- based cross-chain platform, which has 3 main products: The Lottery platform; the NFT ticket and the IGO platform for new games - NFT projects called MILLIGO.</p>
              {/* <p className='text-bodybox-sp md:text-button-pc text-gray-151515 rounded-3 md:rounded-5 bg-white px-4 py-0.5 font-bold inline-block'>Solana</p> */}
            </div>
          </div>
        </div>
      </section>
      <section className='px-3/100 mb-5 md:mb-8'>
        <div className='max-w-900 mx-auto'>
          <div className='p-3/100 md:p-0 flex flex-col md:flex-row bg-gray-box rounded-10'>
            <div className='md:w-240 flex-shrink-0'>
              <p className='flex items-center justify-between md:block leading-6 text-blue-primary md:pl-6 tablet992:pl-8 tablet992:pr-12 md:py-2'>
                Followers
                <span className='text-h2-sp block font-bungee'>
                  {
                    getFlowers !== 0 ? <CountUp delay={1.5} duration={1.5} separator="," start={0} end={getFlowers} /> : 0
                  }
                </span>
              </p>
              <p className='h-px bg-gray-boxline opacity-50 md:hidden mt-2 mb-3'></p>
              <ul className='flex justify-between md:block md:px-6 tablet992:px-12 md:py-7'>
                <li className='md:mb-4'><a href="https://www.millionsy.io/" target='_blank' className='flex items-center text-blue-secondary hover:opacity-70'><span className='inline-block mr-3 md:mr-4'><img src="/assets/millipad/icon_website.svg" alt="icon_website" /></span>Website</a></li>
                <li className='md:mb-4'><a href="https://t.me/millionsyio" target='_blank' className='flex items-center text-blue-secondary hover:opacity-70'><span className='inline-block mr-3 md:mr-4'><img src="/assets/millipad/icon_telegram.svg" alt="icon_telegram" /></span>Telegram</a></li>
                <li><a href="https://twitter.com/millionsyio" target='_blank' className='flex items-center text-blue-secondary hover:opacity-70'><span className='inline-block mr-3 md:mr-4'><img src="/assets/millipad/icon_twitter.svg" alt="icon_twitter" /></span>Twitter</a></li>
              </ul>
              <p className='h-px bg-gray-boxline opacity-50 md:hidden mt-3 mb-2'></p>
              <p className='flex items-center justify-between md:block leading-5 md:px-6 tablet992:pl-8 tablet992:pr-6 md:pt-2 md:pb-8'>
                <span className=''>Total raise:</span>
                <span className='text-h2-sp md:text-h2-pc flex justify-between items-center font-bungee text-gray-primary'>
                  <span>{ getFlowers !== 0 ? <CountUp delay={1.5} duration={1.5} separator="," start={0} end={480000} /> : 0} USDT</span>
                  <span className='inline-block ml-2 w-3.5 md:w-18px relative bottom-px md:static'>
                    <svg className='w-full'width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.85904 0.172075C2.9669 0.0619469 3.11184 0 3.26352 0H17.3022C17.5584 0 17.6865 0.316617 17.5044 0.499017L14.7304 3.32793C14.6225 3.43805 14.4776 3.5 14.3259 3.5H0.290618C0.0344495 3.5 -0.0936345 3.18338 0.0883797 3.00098L2.85904 0.172075Z" fill="url(#paint0_linear_1310_2317)"/>
                      <path d="M14.7275 5.67207C14.6196 5.56195 14.4747 5.5 14.323 5.5H0.287688C0.0315198 5.5 -0.0965642 5.81662 0.08545 5.99902L2.85948 8.82793C2.96734 8.93805 3.11228 9 3.26396 9H17.3026C17.5588 9 17.6869 8.68338 17.5049 8.50098L14.7275 5.67207Z" fill="url(#paint1_linear_1310_2317)"/>
                      <path d="M2.85904 11.1721C2.9669 11.0619 3.11184 11 3.26352 11H17.3022C17.5584 11 17.6865 11.3166 17.5044 11.499L14.7304 14.3279C14.6226 14.4381 14.4776 14.5 14.3259 14.5H0.290618C0.0344495 14.5 -0.0936345 14.1834 0.0883797 14.001L2.85904 11.1721Z" fill="url(#paint2_linear_1310_2317)"/>
                      <defs>
                        <linearGradient id="paint0_linear_1310_2317" x1="11.7139" y1="-3.95477" x2="1.67739" y2="14.8733" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#00FFA3"/>
                          <stop offset="1" stop-color="#DC1FFF"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_1310_2317" x1="13.8214" y1="-2.58149" x2="3.78491" y2="16.2466" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#00FFA3"/>
                          <stop offset="1" stop-color="#DC1FFF"/>
                        </linearGradient>
                        <linearGradient id="paint2_linear_1310_2317" x1="15.9618" y1="-1.26263" x2="5.92533" y2="17.5654" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#00FFA3"/>
                          <stop offset="1" stop-color="#DC1FFF"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </span>
              </p>
            </div>
            <div className='flex flex-col-reverse md:block w-full mt-1 md:mt-0'>
              {/* <span className='relative bottom-1.5'>Will start in</span> */}
              {
                playerData.data.is_connect && dataPlayerMilli !== null && !dataPlayerMilli.is_winner && getDataMillipads !== null && getDataMillipads.status === 'distribution'
                ? <h4 className='font-bungee text-blue-primary text-h2-sp md:text-h2-pc md:pr-6 md:pt-3.5 md:pb-6 text-right mt-2 md:mt-0'>0 days : 00h : 00m : 00s</h4>
                : <h4 className='font-bungee text-blue-primary text-h2-sp md:text-h2-pc md:pr-6 md:pt-3.5 md:pb-6 text-right mt-2 md:mt-0'>{timeCountDown.days} days : {timeCountDown.hours}h : {timeCountDown.minutes}m : {timeCountDown.seconds}s</h4>
              }
              <div className='md:pr-6'>
                <ul className='bg-gray-lightbox rounded-5 md:rounded-10 overflow-hidden'>
                  <li className={`px-3/100 md:px-9 py-2 md:py-3.5 text-bodybox-sp md:text-button-pc ${getDataMillipads !== null && getDataMillipads.status === 'whileList' ? 'bg-pink-primary-30' : ''}`}><span className='font-bold text-gray-primary'>Whitelist:</span> Register for the sale round and do tasks to claim slots.</li>
                  <li className={`px-3/100 md:px-9 py-2 md:py-3.5 text-bodybox-sp md:text-button-pc ${getDataMillipads !== null && getDataMillipads.status === 'lottery' ? 'bg-pink-primary-30' : ''}`}><span className='font-bold text-gray-primary'>Bingo:</span> Choosing randomly the winners among participants.</li>
                  
                  {
                    playerData.data.is_connect ?
                      dataPlayerMilli === null ?
                      <>
                        <li className={`px-3/100 md:px-9 py-2 md:py-3.5 text-bodybox-sp md:text-button-pc`}><span className='font-bold text-gray-primary'>Sale round:</span> Only winners can participate in this round.</li>
                        <li className={`px-3/100 md:px-9 py-2 md:py-3.5 text-bodybox-sp md:text-button-pc`}><span className='font-bold text-gray-primary'>Distribution:</span> The tokens will be automatically sent to wallets.</li>
                      </>
                      :
                      dataPlayerMilli.is_winner ?
                      <>
                        <li className={`px-3/100 md:px-9 py-2 md:py-3.5 text-bodybox-sp md:text-button-pc ${getDataMillipads !== null && getDataMillipads.status === 'saleRound' ? 'bg-pink-primary-30' : ''}`}><span className='font-bold text-gray-primary'>Sale round:</span> Only winners can participate in this round.</li>
                        <li className={`px-3/100 md:px-9 py-2 md:py-3.5 text-bodybox-sp md:text-button-pc ${getDataMillipads !== null && getDataMillipads.status === 'distribution' ? 'bg-pink-primary-30' : ''}`}><span className='font-bold text-gray-primary'>Distribution:</span> The tokens will be automatically sent to wallets.</li>
                      </>
                      :
                      <>
                        <li className={`px-3/100 md:px-9 py-2 md:py-3.5 text-bodybox-sp md:text-button-pc ${getDataMillipads !== null && (getDataMillipads.status === 'distribution' ||  getDataMillipads.status === 'saleRound') ? 'bg-pink-primary-30' : ''}`}><span className='font-bold text-gray-primary'>Sale round:</span> Only winners can participate in this round.</li>
                        <li className={`px-3/100 md:px-9 py-2 md:py-3.5 text-bodybox-sp md:text-button-pc`}><span className='font-bold text-gray-primary'>Distribution:</span> The tokens will be automatically sent to wallets.</li>
                      </>
                    :
                    <>
                      <li className={`px-3/100 md:px-9 py-2 md:py-3.5 text-bodybox-sp md:text-button-pc ${getDataMillipads !== null && getDataMillipads.status === 'saleRound' ? 'bg-pink-primary-30' : ''}`}><span className='font-bold text-gray-primary'>Sale round:</span> Only winners can participate in this round.</li>
                      <li className={`px-3/100 md:px-9 py-2 md:py-3.5 text-bodybox-sp md:text-button-pc ${getDataMillipads !== null && getDataMillipads.status === 'distribution' ? 'bg-pink-primary-30' : ''}`}><span className='font-bold text-gray-primary'>Distribution:</span> The tokens will be automatically sent to wallets.</li>
                    </>
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Component Detect */}
      {
        playerData.data.is_connect &&
        <>
          <section className={`px-3/100 mb-5 md:mb-8 ${getDataMillipads !== null && getDataMillipads.status === 'whileList' ? 'block' : 'hidden'}`}>
            <div className='max-w-900 mx-auto bg-gray-box rounded-10 py-3 md:pt-8 md:pb-12'>
              <div className='px-4 md:px-8'>
                <div className='mb-2 md:mb-3 flex justify-between items-center md:block'>
                  <h4 className='text-h3-sp md:text-h3-pc text-pink-secondary font-bold'>NFT ticket pool</h4>
                  <p className='flex md:hidden text-blue-secondary justify-center items-center text-bodybox-pc cursor-pointer transition-all font-semibold'
                    onClick={() => {
                      // updateJoinWhiteListUser(window.sessionStorage.getItem('publicKey')).then(res => console.log(res));
                      setIsJoinWhiteList(!isJoinWhiteList);
                    }}
                  >
                    <span className={`w-4 h-4 rounded-3 inline-block border border-blue-secondary border-solid transition-all mr-2 relative ${isJoinWhiteList ? 'bg-blue-secondary' : ''}`}>
                      {
                        isJoinWhiteList &&
                        <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                          <path d="M0.919678 5.13763L3.21468 7.43263L9.07968 1.56763" stroke="#293333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      }
                    </span>
                    Join this whitelist
                  </p>
                </div>
                <p className='text-justify md:text-left mb-2'>Each NFT you own will be added a certain number of slots. These slots are calculated independently in different projects.</p>
                <p className='text-justify md:text-left mb-2'>For example, when you have 10 slots from NFT, then you all have 10 slots in all different pools whether used or not, when you use one pool, other pools will not be deducted. The NFT tickets you own will stay there and receive benefits for life until you sell them. We do not limit the number of NFTs, the more you buy, the more slots you will have.</p>
                <p className='text-justify md:text-left mb-2 md:mb-8 hidden md:block'>Tick "Join this whitelist" means that you want to join this pool.</p>
                <div className='md:flex items-center'>
                  <p className='flex justify-between items-end md:block md:mr-8'><span className='font-semibold text-gray-primary'>You have</span><span><span className='text-pink-secondary font-bold inline-block ml-8 mr-2'>0 slots</span>from your NFT tickets</span></p>
                  <p className='hidden md:flex text-blue-secondary justify-center items-center text-bodybox-pc cursor-pointer transition-all font-semibold'
                    onClick={() => {
                      // updateJoinWhiteListUser(window.sessionStorage.getItem('publicKey')).then(res => console.log(res));
                      setIsJoinWhiteList(!isJoinWhiteList);
                    }}
                  >
                    <span className={`w-5 h-5 rounded-5 inline-block border border-blue-secondary border-solid transition-all mr-2 relative ${isJoinWhiteList ? 'bg-blue-secondary' : ''}`}>
                      {
                        isJoinWhiteList &&
                        <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                          <path d="M0.919678 5.13763L3.21468 7.43263L9.07968 1.56763" stroke="#293333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      }
                    </span>
                    Join this whitelist
                  </p>
                </div>
              </div>
              <p className='h-px bg-gray-boxline my-2 md:mt-8 md:mb-9'></p>
              <div className='px-4 md:px-8'>
                <h4 className='text-h3-sp md:text-h3-pc mb-2 text-pink-secondary font-bold'>Social Pool</h4>
                <p className='text-justify md:text-left mb-2 md:mb-4'>The more slots you have, the more chance for you to win the whitelist (not the chance to purchase the whitelist). Each wallet address can only have a maximum of 1 ticket to buy whitelist in each pool/ project.</p>
                <p className='mb-4 md:mb-6 flex justify-between items-end md:block'><span className='font-semibold text-gray-primary'>You have</span><span><span className='text-pink-secondary font-bold inline-block ml-8 mr-2'>
                  {flagSlots.telegram.waggle + flagSlots.telegram.millionsy + flagSlots.telegram.retweet + flagSlots.twitter.waggle + flagSlots.twitter.millionsy + flagSlots.twitter.retweet} slots</span>from Social tasks</span></p>
              </div>
              <div className='bg-gray-lightbox p-4 md:px-8'>
                <h5 className='mb-2 text-pink-secondary font-bold text-h3-sp md:text-h3-pc'>Social Tasks</h5>
                <ul className='flex flex-col md:flex-row'>
                  <li className={`flex items-center rounded-5 border border-solid border-blue-primary transition-all px-2 h-32px md:h-34px mb-3 md:mr-3 lg:mr-12 md:mb-0 ${flagSlots.telegram.waggle + flagSlots.telegram.millionsy + flagSlots.telegram.retweet === 3 ? 'cursor-not-allowed' : 'cursor-pointer hover:opacity-70'}`}
                    onClick={() => {
                      if (flagSlots.telegram.waggle + flagSlots.telegram.millionsy + flagSlots.telegram.retweet !== 3) {
                        setSelectedTickets('telegram');
                        setIsShowNotification(true);
                        setIsHadread(false);
                      }
                    }}
                  >
                    <span className='mr-2 md:mr-5 w-4 md:w-auto'><img src="/assets/millipad/icon_telegram.svg" alt="icon_telegram" /></span>
                    <span className='font-bold w-40 text-blue-secondary'>Telegram Tasks</span>
                    <span className='text-blue-secondary text-bodybox-sp md:text-body-pc ml-auto md:ml-0'>{flagSlots.telegram.waggle + flagSlots.telegram.millionsy + flagSlots.telegram.retweet}/3 slots collected</span>
                  </li> 
                  <li className={`flex items-center rounded-5 border border-solid border-blue-primary transition-all px-2 h-32px md:h-34px mb-3 md:mr-3 lg:mr-12 md:mb-0 ${flagSlots.twitter.waggle + flagSlots.twitter.millionsy + flagSlots.twitter.retweet === 3 ? 'cursor-not-allowed' : 'cursor-pointer hover:opacity-70'}`}
                    onClick={() => {
                      if (flagSlots.twitter.waggle + flagSlots.twitter.millionsy + flagSlots.twitter.retweet !== 3) {
                        setSelectedTickets('twitter');
                        setIsShowNotification(true);
                        setIsHadread(false);
                      }
                    }}
                  >
                    <span className='mr-2 md:mr-5 w-4 md:w-auto'><img src="/assets/millipad/icon_twitter.svg" alt="icon_twitter" /></span>
                    <span className='font-bold w-40 text-blue-secondary'>Twitter Tasks</span>
                    <span className='text-blue-secondary text-bodybox-sp md:text-body-pc ml-auto md:ml-0'>{flagSlots.twitter.waggle + flagSlots.twitter.millionsy + flagSlots.twitter.retweet}/3 slots collected</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section className={`px-3/100 mb-5 md:mb-8 ${getDataMillipads !== null && getDataMillipads.status === 'lottery' ? 'block' : 'hidden'}`}>
            <div className='max-w-900 mx-auto bg-gray-box rounded-10 py-3 md:py-5'>
              <div className='px-4 md:px-8'>
                <h4 className='text-h3-sp md:text-h3-pc mb-2 text-pink-secondary font-bold'>Lottery</h4>
                <p className='text-bodybox-sp md:text-button-pc text-justify md:text-left'>The platform is choosing random winning slots. Once you have the winning slot, you can participate in the sale round.</p>
              </div>
            </div>
          </section>
          <section className={`${(getDataMillipads !== null && getDataMillipads.status === 'saleRound') || (getDataMillipads.status === 'distribution' && dataPlayerMilli !== null && !dataPlayerMilli.is_winner) ? 'block' : 'hidden'}`}>
            <div className={`px-3/100 mb-5 md:mb-8 ${dataPlayerMilli !== null && !dataPlayerMilli.is_winner ? 'block' : 'hidden'}`}>
              <div className='max-w-900 mx-auto bg-gray-box rounded-10 py-3 md:py-5'>
                <div className='px-4 md:px-8'>
                  <h4 className='text-h3-sp md:text-h3-pc mb-2 text-pink-secondary font-bold'>Sale round</h4>
                  <p className='text-bodybox-sp md:text-button-pc text-justify md:text-left'>You don’t have any winning slot in this pool. Best luck next time!</p>
                </div>
              </div>
            </div>
            <div className={`px-3/100 mb-5 md:mb-8 ${dataPlayerMilli !== null && dataPlayerMilli.is_winner && !isFinishSaleRound ? 'block' : 'hidden'}`}>
              <div className='max-w-900 mx-auto bg-gray-box rounded-10 py-3 md:py-5'>
                <div className='px-4 md:px-8'>
                  <h4 className='text-h3-sp md:text-h3-pc mb-2 text-pink-secondary font-bold'>Sale round</h4>
                  <div className='flex flex-col md:flex-row justify-between md:items-center gap-4'>
                    <p className='text-bodybox-sp md:text-button-pc text-justify md:text-left'>Congratulations! You have 1 winning slot.<br />Choose the amount USD of SOL you want to buy the tokens.</p>
                    <div className='flex justify-between sm:justify-start md:justify-center items-end'>
                      <div className={`bg-gray-box w-100 relative mr-12 lg:mr-20 ${isActiveSelect ? 'rounded-tl-5 rounded-tr-5' : 'rounded-5'}`}>
                        <p className={`absolute right-2 top-2.5 cursor-pointer transition-all ${isActiveSelect ? 'transform rotate-180' : ''}`} onClick={() => setIsActiveSelect(!isActiveSelect)}>
                          <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.86603 4.5C3.48112 5.16667 2.51887 5.16667 2.13397 4.5L0.401924 1.5C0.0170235 0.833332 0.498149 -5.6841e-07 1.26795 -5.01112e-07L4.73205 -1.9827e-07C5.50185 -1.30972e-07 5.98298 0.833333 5.59808 1.5L3.86603 4.5Z" fill="white"/>
                          </svg>
                        </p>
                        <p className='px-3 text-bodybox-sp md:text-button-pc font-bold py-1 md:py-0.5 cursor-pointer' onClick={() => setIsActiveSelect(!isActiveSelect)}>{valueOption != '' ? valueOption : (<>&nbsp;</>)}</p>
                        <ul className={`overflow-hidden border-t border-solid border-gray-boxline-50 absolute top-full left-0 bg-gray-box w-full rounded-bl-5 rounded-br-5 ${isActiveSelect ? '' : 'hidden'}`}>
                          <li className='px-3 py-1 md:py-0.5 text-bodybox-sp md:text-button-pc font-bold hover:bg-pink-primary cursor-pointer'
                            onClick={(event: React.MouseEvent) => {
                              setValueOption(event.currentTarget.innerHTML);
                              setIsActiveSelect(false);
                            }}
                          >200</li>
                          <li className='px-3 py-1 md:py-0.5 text-bodybox-sp md:text-button-pc font-bold hover:bg-pink-primary cursor-pointer'
                            onClick={(event: React.MouseEvent) => {
                              setValueOption(event.currentTarget.innerHTML);
                              setIsActiveSelect(false);
                            }}
                          >300</li>
                          <li className='px-3 py-1 md:py-0.5 text-bodybox-sp md:text-button-pc font-bold hover:bg-pink-primary cursor-pointer'
                            onClick={(event: React.MouseEvent) => {
                              setValueOption(event.currentTarget.innerHTML);
                              setIsActiveSelect(false);
                            }}
                          >400</li>
                          <li className='px-3 py-1 md:py-0.5 text-bodybox-sp md:text-button-pc font-bold hover:bg-pink-primary cursor-pointer'
                            onClick={(event: React.MouseEvent) => {
                              setValueOption(event.currentTarget.innerHTML);
                              setIsActiveSelect(false);
                            }}
                          >500</li>
                          <li className='px-3 py-1 md:py-0.5 text-bodybox-sp md:text-button-pc font-bold hover:bg-pink-primary cursor-pointer'
                            onClick={(event: React.MouseEvent) => {
                              setValueOption(event.currentTarget.innerHTML);
                              setIsActiveSelect(false);
                            }}
                          >600</li>
                          <li className='px-3 py-1 md:py-0.5 text-bodybox-sp md:text-button-pc font-bold hover:bg-pink-primary cursor-pointer'
                            onClick={(event: React.MouseEvent) => {
                              setValueOption(event.currentTarget.innerHTML);
                              setIsActiveSelect(false);
                            }}
                          >700</li>
                          <li className='px-3 py-1 md:py-0.5 text-bodybox-sp md:text-button-pc font-bold hover:bg-pink-primary cursor-pointer'
                            onClick={(event: React.MouseEvent) => {
                              setValueOption(event.currentTarget.innerHTML);
                              setIsActiveSelect(false);
                            }}
                          >800</li>
                          <li className='px-3 py-1 md:py-0.5 text-bodybox-sp md:text-button-pc font-bold hover:bg-pink-primary cursor-pointer'
                            onClick={(event: React.MouseEvent) => {
                              setValueOption(event.currentTarget.innerHTML);
                              setIsActiveSelect(false);
                            }}
                          >900</li>
                          <li className='px-3 py-1 md:py-0.5 text-bodybox-sp md:text-button-pc font-bold hover:bg-pink-primary cursor-pointer'
                            onClick={(event: React.MouseEvent) => {
                              setValueOption(event.currentTarget.innerHTML);
                              setIsActiveSelect(false);
                            }}
                          >1000</li>
                        </ul>
                      </div>
                      <p className='text-h3-sp md:text-h3-pc px-10 md:px-6 cursor-pointer transition-all hover:opacity-70 py-1.5 md:pt-2 md:pb-2.5 rounded-5 font-bold bg-blue-primary text-blue-50 inline-block'
                        onClick={() => {
                          if (valueOption !== '') {
                            buyMilliPad(
                              gameBoards !== null ? gameBoards.programId : '',
                              getDataMillipads !== null ? getDataMillipads.millipad_pubkey : '',
                              getDataMillipads !== null ? getDataMillipads.owner_pubkey : '',
                              playerData.data.adapter_type, 
                              valueOption)
                            .then(async results => {
                              try {
                                await updateMiliPadPlayer(valueOption, getDataMillipads !== null ? getDataMillipads.code : '', playerData.data.publicKey);
                                setIsFinishSaleRound(true);
                              } catch (error) {
                                console.log(error);
                              }
                            }).catch(error => {
                              console.log(error)
                            })
                          }
                        }}
                      >Purchase</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`px-3/100 mb-5 md:mb-8 ${dataPlayerMilli !== null && dataPlayerMilli.is_winner && isFinishSaleRound ? 'block' : 'hidden'}`}>
              <div className='max-w-900 mx-auto bg-gray-box rounded-10 py-3 md:py-5'>
                <div className='px-4 md:px-8'>
                  <h4 className='text-h3-sp md:text-h3-pc mb-2 text-pink-secondary font-bold'>Sale round</h4>
                  <p className='text-bodybox-sp md:text-button-pc text-justify md:text-left'>You purchased successfully. Please wait for the Distribution.</p>
                </div>
              </div>
            </div>
          </section>
          <section className={`px-3/100 mb-5 md:mb-8 ${getDataMillipads !== null && getDataMillipads.status === 'distribution' && dataPlayerMilli !== null && dataPlayerMilli.is_winner ? 'block' : 'hidden'}`}>
            <div className='max-w-900 mx-auto bg-gray-box rounded-10 py-3 md:py-5'>
                <div className='px-4 md:px-8'>
                  <h4 className='text-h3-sp md:text-h3-pc mb-2 text-pink-secondary font-bold'>Distribution</h4>
                  <p className='text-bodybox-sp md:text-button-pc text-justify md:text-left'>The tokens will be automatically sent to your wallet. Best of luck to you.</p>
                </div>
              </div>
          </section>
        </>
      }
      {/* End Component Detect */}
      <section className='px-3/100 mb-12 md:mb-16'>
        <div className='max-w-900 mx-auto rounded-10 bg-gray-box py-3/100 md:pt-8 md:pb-14'>
          <div className='px-4 md:px-6 tablet992:px-12'>
            <h4 className='text-pink-secondary text-h2-sp md:text-h2-pc font-bold mb-3 md:mb-10'>Project Detail</h4>
            <div>
              <h5 className='text-pink-secondary text-h3-sp md:text-h3-pc font-bold md:mb-1'>Features</h5>
              <p className='text-bodybox-sp md:text-button-pc text-justify md:text-left mb-2'>MILLIONSY is the first Solana-based cross-chain platform, which has 3 main products: The Lottery platform; the NFT ticket and the IDO platform for new games - NFT projects called MILLIPAD.</p>
              <p className='text-bodybox-sp md:text-button-pc text-justify md:text-left mb-2'>By transferring the Lottery to the blockchain platform, we  want to reach international participants and give them the opportunity to establish the largest PRIZE POOL in history and really win it. More to that, when the cross-chain platform begins, MILLIONSY will allow you to own  essential tickets for the specific chain you want. </p>
              <p className='text-bodybox-sp md:text-button-pc text-justify md:text-left mb-2'>Not only do its creators aim for it to be the largest lottery platform in history in the blockchain system, MILLIONSY also want to launch MILLIPAD. The platform that leverages a lottery PRIZE POOL to become an IDO model and collaborate with future projects is their significant goal. </p>
              <p className='text-bodybox-sp md:text-button-pc text-justify md:text-left mb-2'>There is no need to say that Lottery has really become a part of mankind's culture. Many people think of it as a gaming product, but it is actually a high-volume industry that may also be referred to as a commodity.</p>
              <p className='text-bodybox-sp md:text-button-pc text-justify md:text-left mb-2'>The psychology of the lottery is that people will be happy to spend $2 for a hope and for the pleasure of thinking about what might happen if they win millions of dollars. The need for buying Lottery is so huge that this industry has never died in real life.</p>
              <p className='text-bodybox-sp md:text-button-pc text-justify md:text-left mb-2'>Now with Blockchain technology every transaction, whether a ticket sale, a jackpot win, commissions, or investment, passes via the blockchain. Because each block in the chain has a record of the transactions, a hacker would have to modify every single block in order to manipulate or compromise the lottery number, which is impossible.</p>
              <p className='text-bodybox-sp md:text-button-pc text-justify md:text-left mb-2'>As a result, a blockchain lottery platform assures that there are no foul plays or lottery scandals in the ecosystem. This is a guarantee for an ever-expanding lottery industry.</p>
              <p className='text-bodybox-sp md:text-button-pc text-justify md:text-left mb-2'>You are more than welcome to participate in the greatest blockchain celebration, as long as you have a wallet and at the price of just 2$ per ticket, you now have a chance to join the millionaire-club. Tickets will be available on their website and can be purchased by SOL and  MILLI. In the near future, you will be able to buy lottery tickets via Visa, PayPal, and other payment methods.  </p>
            </div>
          </div>
        </div>
      </section>
      {
        showModalTicket &&
        <section className='fixed h-100vh w-full top-0 left-0 z-100'>
          <div className='h-full absolute w-full top-0 left-0 bg-black opacity-50' onClick={handleCloseModal}></div>

          <div className={`${selectedTickets === 'telegram' ? 'block' : 'hidden'} bg-gray-box absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-full z-1000 overflow-hidden border border-solid border-gray-boxline-50 rounded-10 max-w-280 w-full`}>
            <div className='flex justify-between items-center px-4 py-2 bg-gray-lightbox'>
              <p className='text-gray-primary text-body-pc font-semibold'>Telegram tasks</p>
              <p className='cursor-pointer transition-all hover:opacity-70 py-1.5 pl-4' onClick={handleCloseModal}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.75592 1.42259C10.0814 1.09715 10.0814 0.569515 9.75592 0.244078C9.43049 -0.0813592 8.90285 -0.0813592 8.57741 0.244078L5 3.82149L1.42259 0.244078C1.09715 -0.0813584 0.569515 -0.0813584 0.244078 0.244079C-0.0813592 0.569515 -0.0813592 1.09715 0.244078 1.42259L3.82149 5L0.244078 8.57741C-0.0813592 8.90285 -0.0813592 9.43048 0.244078 9.75592C0.569515 10.0814 1.09715 10.0814 1.42259 9.75592L5 6.17851L8.57741 9.75592C8.90285 10.0814 9.43049 10.0814 9.75592 9.75592C10.0814 9.43049 10.0814 8.90285 9.75592 8.57741L6.17851 5L9.75592 1.42259Z" fill="#f9f9f9"/>
                </svg>
              </p>
            </div>
            <div className='px-4'>
              <ul>
                <li className='flex justify-between items-center py-1.5 border-b border-solid border-gray-boxline-50 relative'>
                  <a href='https://t.me/MILLIONSYio' target='_blank' className='absolute w-full h-full'
                    onClick={() => {
                      setFlagOnclick({
                        ...flagOnclick,
                        telegram: {
                          ...flagOnclick.telegram,
                          millionsy: true
                        }
                      })
                      setFlagSlots({
                        ...flagSlots,
                        telegram: {
                          ...flagSlots.telegram,
                          waggle: 1,
                        }
                      })
                    }}
                  ></a>
                  <p className={`leading-4`}>
                    <span className='text-body-pc text-gray-primary font-bold'><span className='mr-1'>1.</span>Project_name</span>
                    <span className='text-body-sp block pl-4'>Join group</span>
                  </p>
                  <p>
                    <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.334 0C9.25728 0 7.22722 0.615814 5.5005 1.76957C3.77379 2.92332 2.42797 4.5632 1.63325 6.48182C0.838534 8.40045 0.630599 10.5116 1.03574 12.5484C1.44089 14.5852 2.44092 16.4562 3.90937 17.9246C5.37782 19.3931 7.24874 20.3931 9.28554 20.7982C11.3223 21.2034 13.4335 20.9954 15.3522 20.2007C17.2708 19.406 18.9107 18.0602 20.0644 16.3335C21.2182 14.6068 21.834 12.5767 21.834 10.5C21.834 7.71522 20.7277 5.04451 18.7586 3.07538C16.7895 1.10625 14.1188 0 11.334 0V0ZM16.4905 7.19355L14.7675 15.3142C14.6394 15.8896 14.2971 16.0303 13.8225 15.7584L11.1975 13.8243L9.93119 15.0433C9.79154 15.184 9.67394 15.3016 9.40619 15.3016L9.59309 12.6304L14.4493 8.23515C14.6593 8.0493 14.4021 7.9443 14.1228 8.13015L8.11049 11.9154L5.51909 11.1069C4.95629 10.9284 4.94474 10.5451 5.63774 10.2732L15.7618 6.3693C16.2322 6.1992 16.6417 6.48375 16.4895 7.1946L16.4905 7.19355Z" fill={`${flagOnclick.telegram.waggle ? '#ADFAFF' : '#878787'}`}/>
                    </svg>
                  </p>
                </li>

                <li className={`flex justify-between items-center py-1.5 border-b border-solid border-gray-boxline-50 relative ${flagOnclick.telegram.millionsy ? '' : 'opacity-50'}`}>
                  <a href='https://t.me/MILLIONSYio' target='_blank' className={`absolute w-full h-full ${flagOnclick.telegram.millionsy ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                    onClick={(e) => {
                      if (flagOnclick.telegram.millionsy) {
                        setFlagOnclick({
                          ...flagOnclick,
                          telegram: {
                            ...flagOnclick.telegram,
                            retweet: true
                          }
                        })
                        setFlagSlots({
                          ...flagSlots,
                          telegram: {
                            ...flagSlots.telegram,
                            millionsy: 1,
                          }
                        })
                      } else {
                        e.preventDefault();
                      }
                    }}
                  ></a>
                  <p className={`leading-4`}>
                    <span className='text-body-pc text-gray-primary font-bold'><span className='mr-1'>2.</span>Project_name</span>
                    <span className='text-body-sp block pl-4'>Join channel</span>
                  </p>
                  <p>
                    <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.334 0C9.25728 0 7.22722 0.615814 5.5005 1.76957C3.77379 2.92332 2.42797 4.5632 1.63325 6.48182C0.838534 8.40045 0.630599 10.5116 1.03574 12.5484C1.44089 14.5852 2.44092 16.4562 3.90937 17.9246C5.37782 19.3931 7.24874 20.3931 9.28554 20.7982C11.3223 21.2034 13.4335 20.9954 15.3522 20.2007C17.2708 19.406 18.9107 18.0602 20.0644 16.3335C21.2182 14.6068 21.834 12.5767 21.834 10.5C21.834 7.71522 20.7277 5.04451 18.7586 3.07538C16.7895 1.10625 14.1188 0 11.334 0V0ZM16.4905 7.19355L14.7675 15.3142C14.6394 15.8896 14.2971 16.0303 13.8225 15.7584L11.1975 13.8243L9.93119 15.0433C9.79154 15.184 9.67394 15.3016 9.40619 15.3016L9.59309 12.6304L14.4493 8.23515C14.6593 8.0493 14.4021 7.9443 14.1228 8.13015L8.11049 11.9154L5.51909 11.1069C4.95629 10.9284 4.94474 10.5451 5.63774 10.2732L15.7618 6.3693C16.2322 6.1992 16.6417 6.48375 16.4895 7.1946L16.4905 7.19355Z" fill={`${flagOnclick.telegram.waggle ? '#ADFAFF' : '#878787'}`}/>
                    </svg>
                  </p>
                </li>

                <li className={`flex justify-between items-center py-1.5 border-b border-solid border-gray-boxline-50 relative ${flagOnclick.telegram.retweet ? '' : 'opacity-50'}`}>
                  <a href='https://t.me/MILLIONSYio' target='_blank' className={`absolute w-full h-full ${flagOnclick.telegram.retweet ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                    onClick={(e) => {
                      if (flagOnclick.telegram.retweet) {
                        setIsFinishMission(true);
                        setFlagSlots({
                          ...flagSlots,
                          telegram: {
                            ...flagSlots.telegram,
                            retweet: 1,
                          }
                        })
                      } else {
                        e.preventDefault();
                      }
                    }}
                  ></a>
                  <p className={`leading-4`}>
                    <span className='text-body-pc text-gray-primary font-bold'><span className='mr-1'>3.</span>MILLIONSY</span>
                    <span className='text-body-sp block pl-4'>Join group</span>
                  </p>
                  <p>
                    <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.334 0C9.25728 0 7.22722 0.615814 5.5005 1.76957C3.77379 2.92332 2.42797 4.5632 1.63325 6.48182C0.838534 8.40045 0.630599 10.5116 1.03574 12.5484C1.44089 14.5852 2.44092 16.4562 3.90937 17.9246C5.37782 19.3931 7.24874 20.3931 9.28554 20.7982C11.3223 21.2034 13.4335 20.9954 15.3522 20.2007C17.2708 19.406 18.9107 18.0602 20.0644 16.3335C21.2182 14.6068 21.834 12.5767 21.834 10.5C21.834 7.71522 20.7277 5.04451 18.7586 3.07538C16.7895 1.10625 14.1188 0 11.334 0V0ZM16.4905 7.19355L14.7675 15.3142C14.6394 15.8896 14.2971 16.0303 13.8225 15.7584L11.1975 13.8243L9.93119 15.0433C9.79154 15.184 9.67394 15.3016 9.40619 15.3016L9.59309 12.6304L14.4493 8.23515C14.6593 8.0493 14.4021 7.9443 14.1228 8.13015L8.11049 11.9154L5.51909 11.1069C4.95629 10.9284 4.94474 10.5451 5.63774 10.2732L15.7618 6.3693C16.2322 6.1992 16.6417 6.48375 16.4895 7.1946L16.4905 7.19355Z" fill={`${flagOnclick.telegram.waggle ? '#ADFAFF' : '#878787'}`}/>
                    </svg>
                  </p>
                </li>

                <li className={`flex justify-between items-center py-1.5 border-b border-solid border-gray-boxline-50 relative ${isFinishMission ? '' : 'opacity-50'}`}>
                  <p className={`leading-4`}>
                    <span className='text-body-pc text-gray-primary font-bold'><span className='mr-1'>4.</span>Your Username</span>
                    <span className='my-1.5 block relative'>
                      <input type="text" value={userName}
                        onChange={(e) => {
                          setUserName(e.target.value);
                        }}
                        placeholder='@your_username' disabled={!isFinishMission} className={`text-body-sp rounded-3 border border-solid border-transparent focus:outline-none bg-gray-lightbox w-full pt-1.5 pb-2 px-2 placeholder-gray-body-50 ${isFinishMission ? 'focus:border-blue-primary focus:bg-transparent' : 'cursor-not-allowed'}`} 
                      />
                      {
                        userName !== '' &&
                        <span className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer inline-block'>
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                            onClick={() => setUserName('')}
                          >
                            <path d="M-3.27835e-07 7.5C-5.08894e-07 11.6421 3.35786 15 7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 -1.46777e-07 7.5 -3.27835e-07C3.35786 -5.08894e-07 -1.46777e-07 3.35786 -3.27835e-07 7.5Z" fill="#293333" />
                            <path d="M4.75512 10.2976L10.0576 4.99512" stroke="#f9f9f9" strokeLinecap="round" strokeLinejoin="bevel" />
                            <path d="M4.75512 4.99512L10.0576 10.2976" stroke="#f9f9f9" strokeLinecap="round" strokeLinejoin="bevel" />
                          </svg>
                        </span>
                      }
                    </span>
                    <span className='text-bodybox-sp block'>We need to verify you, please give your exact account and make sure you don’t change it while this round is happening.</span>
                  </p>
                </li>

                <li className={`flex justify-between items-center py-1.5 relative ${isFinishMission && userName ? '' : 'opacity-50'}`}>
                  <p className={`leading-4`}>
                    <span className='text-body-pc text-gray-primary font-bold'><span className='mr-1'>5.</span>Claim 1 slot</span>
                    <span className='text-body-sp block pl-4'>We will check your actions</span>
                  </p>
                  <p>
                    <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.334 0C9.25728 0 7.22722 0.615814 5.5005 1.76957C3.77379 2.92332 2.42797 4.5632 1.63325 6.48182C0.838534 8.40045 0.630599 10.5116 1.03574 12.5484C1.44089 14.5852 2.44092 16.4562 3.90937 17.9246C5.37782 19.3931 7.24874 20.3931 9.28554 20.7982C11.3223 21.2034 13.4335 20.9954 15.3522 20.2007C17.2708 19.406 18.9107 18.0602 20.0644 16.3335C21.2182 14.6068 21.834 12.5767 21.834 10.5C21.834 7.71522 20.7277 5.04451 18.7586 3.07538C16.7895 1.10625 14.1188 0 11.334 0V0ZM16.4905 7.19355L14.7675 15.3142C14.6394 15.8896 14.2971 16.0303 13.8225 15.7584L11.1975 13.8243L9.93119 15.0433C9.79154 15.184 9.67394 15.3016 9.40619 15.3016L9.59309 12.6304L14.4493 8.23515C14.6593 8.0493 14.4021 7.9443 14.1228 8.13015L8.11049 11.9154L5.51909 11.1069C4.95629 10.9284 4.94474 10.5451 5.63774 10.2732L15.7618 6.3693C16.2322 6.1992 16.6417 6.48375 16.4895 7.1946L16.4905 7.19355Z" fill={`${flagOnclick.telegram.waggle ? '#ADFAFF' : '#878787'}`}/>
                    </svg>
                  </p>
                </li>
              </ul>
            </div>
            <div className='p-4 bg-gray-lightbox'>
              <p className={`mx-auto p-2 font-semibold rounded-5 transition-all bg-blue-primary text-gray-box text-center w-24 ${isFinishMission && userName !== '' ? 'hover:opacity-70 cursor-pointer' : ''}`}
                onClick={() => handleUpdateMillionsy('telegram')}
              >
                {isFinishMission && userName !== '' ? 'Claim slot' : 'Next step'}
              </p>
            </div>
          </div>

          <div className={`${selectedTickets === 'twitter' ? 'block' : 'hidden'} bg-gray-box absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-full z-1000 overflow-hidden border border-solid border-gray-boxline-50 rounded-10 max-w-280 w-full`}>
            <div className='flex justify-between items-center px-4 py-2 bg-gray-lightbox'>
              <p className='text-gray-primary text-body-pc font-semibold'>Twitter tasks</p>
              <p className='cursor-pointer transition-all hover:opacity-70 py-1.5 pl-4' onClick={handleCloseModal}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.75592 1.42259C10.0814 1.09715 10.0814 0.569515 9.75592 0.244078C9.43049 -0.0813592 8.90285 -0.0813592 8.57741 0.244078L5 3.82149L1.42259 0.244078C1.09715 -0.0813584 0.569515 -0.0813584 0.244078 0.244079C-0.0813592 0.569515 -0.0813592 1.09715 0.244078 1.42259L3.82149 5L0.244078 8.57741C-0.0813592 8.90285 -0.0813592 9.43048 0.244078 9.75592C0.569515 10.0814 1.09715 10.0814 1.42259 9.75592L5 6.17851L8.57741 9.75592C8.90285 10.0814 9.43049 10.0814 9.75592 9.75592C10.0814 9.43049 10.0814 8.90285 9.75592 8.57741L6.17851 5L9.75592 1.42259Z" fill="#f9f9f9"/>
                </svg>
              </p>
            </div>
            <div className='px-4'>
              <ul>
                <li className='flex justify-between items-center py-1.5 border-b border-solid border-gray-boxline-50 relative'>
                  <a href='https://twitter.com/MILLIONSYio' target='_blank' className='absolute w-full h-full'
                    onClick={() => {
                      setFlagOnclick({
                        ...flagOnclick,
                        twitter: {
                          ...flagOnclick.twitter,
                          millionsy: true
                        }
                      })
                      setFlagSlots({
                        ...flagSlots,
                        twitter: {
                          ...flagSlots.twitter,
                          waggle: 1,
                        }
                      })
                    }}
                  ></a>
                  <p className={`leading-4`}>
                    <span className='text-body-pc text-gray-primary font-bold'><span className='mr-1'>1.</span>Project_name</span>
                    <span className='text-body-sp block pl-4'>Join group</span>
                  </p>
                  <p>
                    <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.334 0C9.25728 0 7.22722 0.615814 5.5005 1.76957C3.77379 2.92332 2.42797 4.5632 1.63325 6.48182C0.838534 8.40045 0.630599 10.5116 1.03574 12.5484C1.44089 14.5852 2.44092 16.4562 3.90937 17.9246C5.37782 19.3931 7.24874 20.3931 9.28554 20.7982C11.3223 21.2034 13.4335 20.9954 15.3522 20.2007C17.2708 19.406 18.9107 18.0602 20.0644 16.3335C21.2182 14.6068 21.834 12.5767 21.834 10.5C21.834 7.71522 20.7277 5.04451 18.7586 3.07538C16.7895 1.10625 14.1188 0 11.334 0V0ZM16.4905 7.19355L14.7675 15.3142C14.6394 15.8896 14.2971 16.0303 13.8225 15.7584L11.1975 13.8243L9.93119 15.0433C9.79154 15.184 9.67394 15.3016 9.40619 15.3016L9.59309 12.6304L14.4493 8.23515C14.6593 8.0493 14.4021 7.9443 14.1228 8.13015L8.11049 11.9154L5.51909 11.1069C4.95629 10.9284 4.94474 10.5451 5.63774 10.2732L15.7618 6.3693C16.2322 6.1992 16.6417 6.48375 16.4895 7.1946L16.4905 7.19355Z" fill={`${flagOnclick.telegram.waggle ? '#ADFAFF' : '#878787'}`}/>
                    </svg>
                  </p>
                </li>

                <li className={`flex justify-between items-center py-1.5 border-b border-solid border-gray-boxline-50 relative ${flagOnclick.twitter.millionsy ? '' : 'opacity-50'}`}>
                  <a href='https://twitter.com/MILLIONSYio' target='_blank' className={`absolute w-full h-full ${flagOnclick.twitter.millionsy ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                    onClick={(e) => {
                      if (flagOnclick.twitter.millionsy) {
                        setFlagOnclick({
                          ...flagOnclick,
                          twitter: {
                            ...flagOnclick.twitter,
                            retweet: true
                          }
                        })
                        setFlagSlots({
                          ...flagSlots,
                          twitter: {
                            ...flagSlots.twitter,
                            millionsy: 1,
                          }
                        })
                      } else {
                        e.preventDefault();
                      }
                    }}
                  ></a>
                  <p className={`leading-4`}>
                    <span className='text-body-pc text-gray-primary font-bold'><span className='mr-1'>2.</span>Project_name</span>
                    <span className='text-body-sp block pl-4'>Join channel</span>
                  </p>
                  <p>
                    <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.334 0C9.25728 0 7.22722 0.615814 5.5005 1.76957C3.77379 2.92332 2.42797 4.5632 1.63325 6.48182C0.838534 8.40045 0.630599 10.5116 1.03574 12.5484C1.44089 14.5852 2.44092 16.4562 3.90937 17.9246C5.37782 19.3931 7.24874 20.3931 9.28554 20.7982C11.3223 21.2034 13.4335 20.9954 15.3522 20.2007C17.2708 19.406 18.9107 18.0602 20.0644 16.3335C21.2182 14.6068 21.834 12.5767 21.834 10.5C21.834 7.71522 20.7277 5.04451 18.7586 3.07538C16.7895 1.10625 14.1188 0 11.334 0V0ZM16.4905 7.19355L14.7675 15.3142C14.6394 15.8896 14.2971 16.0303 13.8225 15.7584L11.1975 13.8243L9.93119 15.0433C9.79154 15.184 9.67394 15.3016 9.40619 15.3016L9.59309 12.6304L14.4493 8.23515C14.6593 8.0493 14.4021 7.9443 14.1228 8.13015L8.11049 11.9154L5.51909 11.1069C4.95629 10.9284 4.94474 10.5451 5.63774 10.2732L15.7618 6.3693C16.2322 6.1992 16.6417 6.48375 16.4895 7.1946L16.4905 7.19355Z" fill={`${flagOnclick.telegram.waggle ? '#ADFAFF' : '#878787'}`}/>
                    </svg>
                  </p>
                </li>

                <li className={`flex justify-between items-center py-1.5 border-b border-solid border-gray-boxline-50 relative ${flagOnclick.twitter.retweet ? '' : 'opacity-50'}`}>
                  <a href='https://twitter.com/MILLIONSYio' target='_blank' className={`absolute w-full h-full ${flagOnclick.twitter.retweet ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                    onClick={(e) => {
                      if (flagOnclick.twitter.retweet) {
                        setIsFinishMission(true);
                        setFlagSlots({
                          ...flagSlots,
                          twitter: {
                            ...flagSlots.twitter,
                            retweet: 1,
                          }
                        })
                      } else {
                        e.preventDefault();
                      }
                    }}
                  ></a>
                  <p className={`leading-4`}>
                    <span className='text-body-pc text-gray-primary font-bold'><span className='mr-1'>3.</span>MILLIONSY</span>
                    <span className='text-body-sp block pl-4'>Join group</span>
                  </p>
                  <p>
                    <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.334 0C9.25728 0 7.22722 0.615814 5.5005 1.76957C3.77379 2.92332 2.42797 4.5632 1.63325 6.48182C0.838534 8.40045 0.630599 10.5116 1.03574 12.5484C1.44089 14.5852 2.44092 16.4562 3.90937 17.9246C5.37782 19.3931 7.24874 20.3931 9.28554 20.7982C11.3223 21.2034 13.4335 20.9954 15.3522 20.2007C17.2708 19.406 18.9107 18.0602 20.0644 16.3335C21.2182 14.6068 21.834 12.5767 21.834 10.5C21.834 7.71522 20.7277 5.04451 18.7586 3.07538C16.7895 1.10625 14.1188 0 11.334 0V0ZM16.4905 7.19355L14.7675 15.3142C14.6394 15.8896 14.2971 16.0303 13.8225 15.7584L11.1975 13.8243L9.93119 15.0433C9.79154 15.184 9.67394 15.3016 9.40619 15.3016L9.59309 12.6304L14.4493 8.23515C14.6593 8.0493 14.4021 7.9443 14.1228 8.13015L8.11049 11.9154L5.51909 11.1069C4.95629 10.9284 4.94474 10.5451 5.63774 10.2732L15.7618 6.3693C16.2322 6.1992 16.6417 6.48375 16.4895 7.1946L16.4905 7.19355Z" fill={`${flagOnclick.telegram.waggle ? '#ADFAFF' : '#878787'}`}/>
                    </svg>
                  </p>
                </li>

                <li className={`flex justify-between items-center py-1.5 border-b border-solid border-gray-boxline-50 relative ${isFinishMission ? '' : 'opacity-50'}`}>
                  <p className={`leading-4`}>
                    <span className='text-body-pc text-gray-primary font-bold'><span className='mr-1'>4.</span>Your Username</span>
                    <span className='my-1.5 block relative'>
                      <input type="text" value={userName}
                        onChange={(e) => {
                          setUserName(e.target.value);
                        }}
                        placeholder='@your_username' disabled={!isFinishMission} className={`text-body-sp rounded-3 border border-solid border-transparent focus:outline-none bg-gray-lightbox w-full pt-1.5 pb-2 px-2 placeholder-gray-body-50 ${isFinishMission ? 'focus:border-blue-primary focus:bg-transparent' : 'cursor-not-allowed'}`} 
                      />
                      {
                        userName !== '' &&
                        <span className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer inline-block'>
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                            onClick={() => setUserName('')}
                          >
                            <path d="M-3.27835e-07 7.5C-5.08894e-07 11.6421 3.35786 15 7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 -1.46777e-07 7.5 -3.27835e-07C3.35786 -5.08894e-07 -1.46777e-07 3.35786 -3.27835e-07 7.5Z" fill="#293333" />
                            <path d="M4.75512 10.2976L10.0576 4.99512" stroke="#f9f9f9" strokeLinecap="round" strokeLinejoin="bevel" />
                            <path d="M4.75512 4.99512L10.0576 10.2976" stroke="#f9f9f9" strokeLinecap="round" strokeLinejoin="bevel" />
                          </svg>
                        </span>
                      }
                    </span>
                    <span className='text-bodybox-sp block'>We need to verify you, please give your exact account and make sure you don’t change it while this round is happening.</span>
                  </p>
                </li>

                <li className={`flex justify-between items-center py-1.5 relative ${isFinishMission && userName ? '' : 'opacity-50'}`}>
                  <p className={`leading-4`}>
                    <span className='text-body-pc text-gray-primary font-bold'><span className='mr-1'>5.</span>Claim 1 slot</span>
                    <span className='text-body-sp block pl-4'>We will check your actions</span>
                  </p>
                  <p>
                    <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.334 0C9.25728 0 7.22722 0.615814 5.5005 1.76957C3.77379 2.92332 2.42797 4.5632 1.63325 6.48182C0.838534 8.40045 0.630599 10.5116 1.03574 12.5484C1.44089 14.5852 2.44092 16.4562 3.90937 17.9246C5.37782 19.3931 7.24874 20.3931 9.28554 20.7982C11.3223 21.2034 13.4335 20.9954 15.3522 20.2007C17.2708 19.406 18.9107 18.0602 20.0644 16.3335C21.2182 14.6068 21.834 12.5767 21.834 10.5C21.834 7.71522 20.7277 5.04451 18.7586 3.07538C16.7895 1.10625 14.1188 0 11.334 0V0ZM16.4905 7.19355L14.7675 15.3142C14.6394 15.8896 14.2971 16.0303 13.8225 15.7584L11.1975 13.8243L9.93119 15.0433C9.79154 15.184 9.67394 15.3016 9.40619 15.3016L9.59309 12.6304L14.4493 8.23515C14.6593 8.0493 14.4021 7.9443 14.1228 8.13015L8.11049 11.9154L5.51909 11.1069C4.95629 10.9284 4.94474 10.5451 5.63774 10.2732L15.7618 6.3693C16.2322 6.1992 16.6417 6.48375 16.4895 7.1946L16.4905 7.19355Z" fill={`${flagOnclick.telegram.waggle ? '#ADFAFF' : '#878787'}`}/>
                    </svg>
                  </p>
                </li>
              </ul>
            </div>
            <div className='p-4 bg-gray-lightbox'>
              <p className={`mx-auto p-2 font-semibold rounded-5 transition-all bg-blue-primary text-gray-box text-center w-24 ${isFinishMission && userName !== '' ? 'hover:opacity-70 cursor-pointer' : ''}`}
                onClick={() => handleUpdateMillionsy('twitter')}
              >
                {isFinishMission && userName !== '' ? 'Claim slot' : 'Next step'}
              </p>
            </div>
          </div>
        </section>
      }
      <section className={`fixed h-100vh w-full top-0 left-0 z-100 ${isShowNotification ? 'block' : ' hidden'}`}>
        <div className='h-full absolute w-full top-0 left-0 bg-black opacity-50'></div>
        <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-280 md:max-w-700 w-full bg-gray-box rounded-5 border-gray-boxline-50 border border-solid'>
          <div className='bg-gray-lightbox px-4 md:px-6 py-5 flex justify-end items-center'></div>
          <div className='px-4 py-3 md:px-6 md:py-5'>
            <p className='text-bodybox-sp md:text-button-pc text-justify'>Persons that are citizens of, resident in or have IP addresses in any of the below countries are not allowed to participate in the IGO: Citizens of Afghanistan, Angola, Belarus, Bosnia & Herzegovina, Burkina Faso, Burundi, Cayman Island, Central African Republic, People’s Republic of China, Congo (DRC), Côte d’Ivoire (Ivory Coast), Cuba, Columbia, Ecuador, Egypt, Eritrea, Ethiopia, Guinea, Guinea-Bissau, Guyana, Haiti, Iran, Iraq, Kosovo, Laos, Lebanon, Liberia, Libya, Macedonia, Maldives, Mali, Marokko; Myanmar, Nigeria, North-Korea, Panama, Pakistan, Papua NG, Philippines, Republic of Crimea, Serbia, Somalia, Sri Lanka, Senegal, Sudan, South Sudan, Syria, Trinidad and Tobago, Tunisia, Turkmenistan, United States of America, Uganda, Ukraine, Uzbekistan, Vanuatu, Venezuela, Yemen, Zimbabwe or any other jurisdiction in which it is prohibited from using the MILLIGO</p>
          </div>
          <div className='pt-2 pb-3 md:pt-4 md:pb-6 bg-gray-lightbox'>
            <div className='flex justify-center items-center w-fit mx-auto cursor-pointer'
              onClick={() => {
                setIsHadread(!isHadread);
              }}
            >
              <span className={`w-3.5 h-3.5 border border-solid border-blue-secondary inline-block rounded-3 relative ${isHadread ? 'bg-blue-secondary' : ''}`}>
                {
                  isHadread &&
                  <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <path d="M0.919678 5.13763L3.21468 7.43263L9.07968 1.56763" stroke="#293333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              </span>
              <p className='ml-3 text-blue-secondary'>I have read and accept the conditions</p>
            </div>
            <p className='text-center mt-4'>
              <span className='inline-block cursor-pointer transition-all hover:opacity-70 text-gray-box bg-blue-primary rounded-3 md:rounded-5 py-1.5 px-2.5 font-semibold'
                onClick={() => {
                  if(isHadread) {
                    setShowModalTicket(true);
                    setIsShowNotification(false);
                  }
                }}
              >Confirm</span>
            </p>
          </div>
          
        </div>
      </section>
      <Footer></Footer>
      <ModalContent dataGiveFromWallet={dataGiveFromWallet} playerData={playerData.data} dataModal={dataModal.data} dataGiveFromModal={dataGiveFromModal}></ModalContent>
    </>
  )
}
export default Millionsy;