import Footer from 'components/astoms/footer';
import Header from 'components/astoms/header';
import ModalContent from 'components/astoms/modalSection';
import React, { useEffect, useState } from 'react';
import { fetchPlayerAccount, getGameBoardInfo, registerMilipadPlayer, updateMiliPadPlayer, updateMissionPlayer } from 'lib/utilities/utils';
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
  const [isNextStepTelegram, setIsNextStepTelegram] = useState(false);
  const [isNextStepTwitter, setIsNextStepTwitter] = useState(false);
  const size = useWindowSize();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isActiveSelect, setIsActiveSelect] = useState(false);
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
      fetch(`${HOST_NAME}/api/milli-pads/milli-lottery/player/${playerData.data.publicKey}`, {
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
          waggle: session.indexOf('goal1') > -1 ? 1 : 0,
          millionsy: session.indexOf('goal2') > -1 ? 1 : 0,
          retweet: 0,
        },
        telegram: {
          waggle: session.indexOf('goal3') > -1 ? 1 : 0,
          millionsy: session.indexOf('goal4') > -1 ? 1 : 0,
          retweet: 0,
        }
      })
      setFlagOnclick({
        twitter: {
          waggle: true,
          millionsy: session.indexOf('goal1') > -1 ? true : false,
          retweet: session.indexOf('goal2') > -1 ? true : false,
        },
        telegram: {
          waggle: true,
          millionsy: session.indexOf('goal3') > -1 ? true : false,
          retweet: session.indexOf('goal4') > -1 ? true : false,
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
      <Header playerData={playerData.data} dataGiveFromHeader={dataGiveFromHeader}></Header>
      <section className='px-3/100 mb-7 md:mb-10'>
        <div className='max-w-900 mx-auto relative mt-54 md:mt-57'>
          <p className='absolute top-2 md:top-4 left-2 md:left-4 transition-all hover:opacity-70 w-5 md:w-auto'><a href="/MILLIGO"><img src="/assets/millipad/arrow_back.svg" alt="arrow_back"/></a></p>
          <p><img src="/assets/millipad/banner.png" alt="banner"/></p>
          <h3 className='text-35 md:text-42 text-blue-0 text-center uppercase font-bungee mt-3 md:mt-5 md:mb-1'>MILLIONSY</h3>
          <p className='text-pink-50 text-center text-12 md:text-14 leading-5'>MILLIONSY is the first Solana-based cross-chain<br className='block md:hidden' /> platform, which has 3 main products: The Lottery<br className='block md:hidden' /> platform; the NFT ticket and the IGO platform for new<br className='block md:hidden' /> games - NFT projects called MILLIGO.</p>
        </div>
      </section>
      <section className='px-3/100 mb-8 md:mb-14'>
        <div className='max-w-900 mx-auto'>
          <div className='flex flex-col md:flex-row gap-8'>
            <div className='rounded-10 bg-gray-150 flex-shrink-0'>
              <p className='flex items-center justify-between md:block text-14 text-pink-0 pl-4 md:pl-6 tablet992:pl-8 pr-6 tablet992:pr-12 py-3 md:py-2'>
                Followers
                <span className='text-26 md:text-20 block font-bungee'>
                  {
                    getFlowers !== 0 ? <CountUp delay={1.5} duration={1.5} separator="," start={0} end={getFlowers} /> : 0
                  }
                </span>
              </p>
              <ul className='bg-gray-200 px-8 md:px-6 tablet992:px-12 py-6 md:pt-12 md:pb-13'>
                <li className='mb-4'><a href="https://www.millionsy.io/" target='_blank' className='flex items-center text-pink-50 text-14 hover:opacity-70 gap-4'><span><img src="/assets/millipad/icon_website.svg" alt="icon_website" /></span>Website</a></li>
                <li className='mb-4'><a href="https://t.me/millionsyio" target='_blank' className='flex items-center text-pink-50 text-14 hover:opacity-70 gap-4'><span><img src="/assets/millipad/icon_telegram.svg" alt="icon_telegram" /></span>Telegram</a></li>
                <li><a href="https://twitter.com/millionsyio" target='_blank' className='flex items-center text-pink-50 text-14 hover:opacity-70 gap-4'><span><img src="/assets/millipad/icon_twitter.svg" alt="icon_twitter" /></span>Twitter</a></li>
              </ul>
              <p className='flex md:block justify-between items-center text-14 text-pink-0 pl-4 md:pl-6 tablet992:pl-8 pr-6 tablet992:pr-12 py-4 leading-none'>Total raise:<span className='text-20 block font-bold'>
                { getFlowers !== 0 ? <CountUp delay={1.5} duration={1.5} separator="," start={0} end={480000} /> : 0} USDT</span>
              </p>
            </div>
            <div className='rounded-10 bg-gray-150 w-full'>
              {
                playerData.data.is_connect && dataPlayerMilli !== null && !dataPlayerMilli.is_winner && getDataMillipads !== null && getDataMillipads.status === 'distribution'
                ? <h4 className='text-14 md:text-20 text-pink-50 font-bold py-3 px-4 md:px-6 tablet992:px-12 flex flex-col md:flex-row justify-between md:items-center'>Will start in<span className='font-bungee text-blue-0 text-27 sm:text-28'>0 <span className='text-20'>days</span> : 00<span className='text-20'>h</span> : 00<span className='text-20'>m</span> : 00<span className='text-20'>s</span></span></h4>
                : <h4 className='text-14 md:text-20 text-pink-50 font-bold py-3 px-4 md:px-6 tablet992:px-12 flex flex-col md:flex-row justify-between md:items-center'>Will start in<span className='font-bungee text-blue-0 text-27 sm:text-28'>{timeCountDown.days} <span className='text-20'>days</span> : {timeCountDown.hours}<span className='text-20'>h</span> : {timeCountDown.minutes}<span className='text-20'>m</span> : {timeCountDown.seconds}<span className='text-20'>s</span></span></h4>
              }
              <ul className='bg-gray-300'>
                <li className={`px-4 md:px-6 tablet992:px-12 py-3 text-12 md:text-14 text-pink-50 border-b border-gray-250 border-solid ${getDataMillipads !== null && getDataMillipads.status === 'whileList' ? 'bg-purple-100' : ''}`}><span className='text-16 font-bold block md:inline-block'>Whitelist<span className='hidden md:inline'>:</span></span> Register for the sale round and do tasks to claim slots.</li>
                <li className={`px-4 md:px-6 tablet992:px-12 py-3 text-12 md:text-14 text-pink-50 border-b border-gray-250 border-solid ${getDataMillipads !== null && getDataMillipads.status === 'lottery' ? 'bg-purple-100' : ''}`}><span className='text-16 font-bold block md:inline-block'>Lottery<span className='hidden md:inline'>:</span></span> Choosing randomly the winners among participants.</li>
                
                {
                  playerData.data.is_connect ?
                    dataPlayerMilli === null ?
                    <>
                      <li className={`px-4 md:px-6 tablet992:px-12 py-3 text-12 md:text-14 text-pink-50 border-b border-gray-250 border-solid`}><span className='text-16 font-bold block md:inline-block'>Sale round<span className='hidden md:inline'>:</span></span> Only winners can participate in this round.</li>
                      <li className={`px-4 md:px-6 tablet992:px-12 py-3 text-12 md:text-14 text-pink-50`}><span className='text-16 font-bold block md:inline-block'>Distribution<span className='hidden md:inline'>:</span></span> The tokens will be automatically sent to wallets.</li>
                    </>
                    :
                    dataPlayerMilli.is_winner ?
                    <>
                      <li className={`px-4 md:px-6 tablet992:px-12 py-3 text-12 md:text-14 text-pink-50 border-b border-gray-250 border-solid ${getDataMillipads !== null && getDataMillipads.status === 'saleRound' ? 'bg-purple-100' : ''}`}><span className='text-16 font-bold block md:inline-block'>Sale round<span className='hidden md:inline'>:</span></span> Only winners can participate in this round.</li>
                      <li className={`px-4 md:px-6 tablet992:px-12 py-3 text-12 md:text-14 text-pink-50 ${getDataMillipads !== null && getDataMillipads.status === 'distribution' ? 'bg-purple-100' : ''}`}><span className='text-16 font-bold block md:inline-block'>Distribution<span className='hidden md:inline'>:</span></span> The tokens will be automatically sent to wallets.</li>
                    </>
                    :
                    <>
                      <li className={`px-4 md:px-6 tablet992:px-12 py-3 text-12 md:text-14 text-pink-50 border-b border-gray-250 border-solid ${getDataMillipads !== null && (getDataMillipads.status === 'distribution' ||  getDataMillipads.status === 'saleRound') ? 'bg-purple-100' : ''}`}><span className='text-16 font-bold block md:inline-block'>Sale round<span className='hidden md:inline'>:</span></span> Only winners can participate in this round.</li>
                      <li className={`px-4 md:px-6 tablet992:px-12 py-3 text-12 md:text-14 text-pink-50`}><span className='text-16 font-bold block md:inline-block'>Distribution<span className='hidden md:inline'>:</span></span> The tokens will be automatically sent to wallets.</li>
                    </>
                  :
                  <>
                    <li className={`px-4 md:px-6 tablet992:px-12 py-3 text-12 md:text-14 text-pink-50 border-b border-gray-250 border-solid ${getDataMillipads !== null && getDataMillipads.status === 'saleRound' ? 'bg-purple-100' : ''}`}><span className='text-16 font-bold block md:inline-block'>Sale round<span className='hidden md:inline'>:</span></span> Only winners can participate in this round.</li>
                    <li className={`px-4 md:px-6 tablet992:px-12 py-3 text-12 md:text-14 text-pink-50 ${getDataMillipads !== null && getDataMillipads.status === 'distribution' ? 'bg-purple-100' : ''}`}><span className='text-16 font-bold block md:inline-block'>Distribution<span className='hidden md:inline'>:</span></span> The tokens will be automatically sent to wallets.</li>
                  </>
                }
              </ul>
              <div className='flex items-center justify-between px-4 md:px-6 tablet992:px-12 py-6 md:py-4'>
                <p className='text-14 bg-gray-0 border border-solid border-pink-50 rounded-5 py-1 px-5 text-pink-50 font-bold'>Solana</p>
                {
                  playerData.data.is_connect ?
                  <p className='text-14 px-0 py-2 md:px-3 text-center w-140 rounded-5 font-bold bg-pink-150 text-pink-50 cursor-pointer transition-all hover:opacity-70'
                    onClick={() => setModalDisconnect(true)}
                  >Connected</p> : 
                  <p className='text-14 cursor-pointer transition-all hover:opacity-70 px-0 py-2 md:px-3 text-center w-140 rounded-5 font-bold bg-blue-0 text-blue-50'
                    onClick={() => setDataModal({
                      data: {
                        ...dataModal.data,
                        show: true,
                      }
                    })}
                  >Connect Wallet</p>
                }
                
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Component Detect */}
      {
        playerData.data.is_connect &&
        <>
          <section className={`px-3/100 mb-9 md:mb-14 ${getDataMillipads !== null && getDataMillipads.status === 'whileList' ? 'block' : 'hidden'}`}>
            <div className='max-w-900 mx-auto bg-gray-350 rounded-15 pt-5 pb-7 md:pt-8 md:pb-12'>
              <div className='px-4 md:px-8'>
                <h4 className='text-18 md:text-20 mb-2 md:mb-4 text-pink-0'>NFT ticket pool</h4>
                <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>Each NFT you own will be added a certain number of slots. These slots are calculated independently in the IDO pools of different projects. </p>
                <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>For example, when you have 100 slots from NFT, then you all have 100 slots in all different pools whether used or not, when you use one pool, other pools will not be deducted. The NFT tickets you own will stay there and receive benefits for life until you sell them. We do not limit the number of NFTs you buy, the more you buy, the more slots you will have for potential projects.</p>
                <p className='block md:hidden h-px bg-gray-250 mt-4 mb-2'></p>
                <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-4 md:mb-8 flex justify-between items-end md:block'><span className='pb-0.5 md:pb-0'>You have</span><span><span className='text-pink-0 font-bold text-18 inline-block ml-8 mr-2 text-right'>0 slots</span>from your NFT tickets</span></p>
              </div>
              <div className='bg-gray-200 px-4 md:px-8 md:flex items-center justify-between pt-4 pb-6 md:py-4'>
                <p className='text-pink-50 text-14 tablet992:text-16 font-normal md:text-left mb-4 md:mb-0'>Buy NFT tickets for more slots and better chance to win Lottery lifetime.</p>
                <div className='relative'>
                  <p className='onTooltip text-14 md:text-16 md:cursor-not-allowed px-16 pt-2 pb-2.5 rounded-5 font-bold bg-blue-0 text-blue-50 flex-shrink-0 text-center'
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
                  >Buy NFT</p>
                  { showTooltip && <p className='absolute top-full left-1/2 transform -translate-x-1/2 translate-y-4 z-100 border border-solid border-pink-150 bg-purple-150 rounded-15 w-60 text-center py-3'>Coming real soon...</p> }
                </div>
                
              </div>
              <p className='h-px bg-gray-250 mt-7 mb-5 md:mt-12 md:mb-9'></p>
              <div className='px-4 md:px-8'>
                <h4 className='text-18 md:text-20 mb-2 md:mb-4 text-pink-0'>Social Pool</h4>
                <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>The more slots you have, the more chance for you to win the whitelist (not the chance to purchase the whitelist). Each wallet address can only have a maximum of 1 ticket to buy whitelist in each pool/ project.</p>
                <p className='block md:hidden h-px bg-gray-250 mt-4 mb-2'></p>
                <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-4 md:mb-8 flex justify-between items-end md:block'><span className='pb-0.5 md:pb-0'>You have</span><span><span className='text-pink-0 font-bold text-18 inline-block ml-8 mr-2'>
                  {flagSlots.telegram.waggle + flagSlots.telegram.millionsy + flagSlots.twitter.waggle + flagSlots.twitter.millionsy} slots</span>from Social tasks</span></p>
              </div>
              <div className='bg-gray-200 pt-5 md:pt-6'>
                <h5 className='text-16 mb-5 md:mb-6 text-pink-0 font-bold px-4 md:px-8'>Social Tasks</h5>
                <ul>
                  <li className={`flex items-center text-12 cursor-pointer transition-all px-4 md:px-8 py-3 leading-7 ${selectedTickets === 'telegram' ? 'bg-blue-100' : 'opacity-50 hover:bg-blue-100 hover:opacity-100'}`}
                    onClick={() => {
                      if (flagSlots.telegram.waggle + flagSlots.telegram.millionsy !== 2) {
                        setSelectedTickets('telegram');
                        setShowModalTicket(true);
                      }
                    }}
                  >
                    <span className='mr-3'><img src="/assets/millipad/icon_telegram.svg" alt="icon_telegram" /></span>
                    <span className='font-bold text-14 w-40 text-blue-0'>Telegram Tasks</span>
                    <span className='text-blue-200 ml-auto md:ml-0'>{flagSlots.telegram.waggle + flagSlots.telegram.millionsy}/2 slots collected</span>
                  </li> 
                  <li className={`flex items-center text-12 cursor-pointer transition-all px-4 md:px-8 py-3 leading-7 ${selectedTickets === 'twitter' ? 'bg-blue-100' : 'opacity-50 hover:bg-blue-100 hover:opacity-100'}`}
                    onClick={() => {
                      if (flagSlots.twitter.waggle + flagSlots.twitter.millionsy !== 2) {
                        setSelectedTickets('twitter');
                        setShowModalTicket(true);
                      }
                    }}
                  >
                    <span className='mr-3'><img src="/assets/millipad/icon_twitter.svg" alt="icon_twitter" /></span>
                    <span className='font-bold text-14 w-40 text-blue-0'>Twitter Tasks</span>
                    <span className='text-blue-200 ml-auto md:ml-0'>{flagSlots.twitter.waggle + flagSlots.twitter.millionsy}/2 slots collected</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section className={`px-3/100 mb-9 md:mb-14 ${getDataMillipads !== null && getDataMillipads.status === 'lottery' ? 'block' : 'hidden'}`}>
            <div className='max-w-900 mx-auto bg-gray-150 rounded-15 py-5 md:py-8'>
              <div className='px-4 md:px-8'>
                <h4 className='text-18 md:text-20 mb-2 md:mb-3.5 text-pink-0'>Lottery</h4>
                <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left'>The platform is choosing random winning slots. Once you have the winning slot, you can participate in the sale round.</p>
              </div>
            </div>
          </section>
          <section className={`${(getDataMillipads !== null && getDataMillipads.status === 'saleRound') || (getDataMillipads.status === 'distribution' && dataPlayerMilli !== null && !dataPlayerMilli.is_winner) ? 'block' : 'hidden'}`}>
            <div className={`px-3/100 mb-9 md:mb-14 ${dataPlayerMilli !== null && !dataPlayerMilli.is_winner ? 'block' : 'hidden'}`}>
              <div className='max-w-900 mx-auto bg-gray-150 rounded-15 py-5 md:py-8'>
                <div className='px-4 md:px-8'>
                  <h4 className='text-18 md:text-20 mb-2 md:mb-3.5 text-pink-0'>Sale round</h4>
                  <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left'>You don’t have any winning slot in this pool. Best luck next time!</p>
                </div>
              </div>
            </div>
            <div className={`px-3/100 mb-9 md:mb-14 ${dataPlayerMilli !== null && dataPlayerMilli.is_winner && !isFinishSaleRound ? 'block' : 'hidden'}`}>
              <div className='max-w-900 mx-auto bg-gray-150 rounded-15 py-5 md:py-8'>
                <div className='px-4 md:px-8'>
                  <h4 className='text-18 md:text-20 mb-2 md:mb-3.5 text-pink-0'>Sale round</h4>
                  <div className='flex flex-col md:flex-row justify-between md:items-center gap-4'>
                    <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left'>Congratulations! You have 1 winning slot. Choose the amount <br className='hidden tablet992:block' /> USD of SOL you want to buy the tokens <br className='hidden tablet992:block' />(please note that you will send your SOL, not USDT or USDC)</p>
                    <div className='flex justify-between sm:justify-start md:justify-center items-center gap-12'>
                      <div className={`bg-gray-600 w-100 relative ${isActiveSelect ? 'rounded-tl-5 rounded-tr-5' : 'rounded-5'}`}>
                        <p className={`absolute right-2 top-2.5 cursor-pointer transition-all ${isActiveSelect ? 'transform rotate-180' : ''}`} onClick={() => setIsActiveSelect(!isActiveSelect)}>
                          <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.86603 4.5C3.48112 5.16667 2.51887 5.16667 2.13397 4.5L0.401924 1.5C0.0170235 0.833332 0.498149 -5.6841e-07 1.26795 -5.01112e-07L4.73205 -1.9827e-07C5.50185 -1.30972e-07 5.98298 0.833333 5.59808 1.5L3.86603 4.5Z" fill="white"/>
                          </svg>
                        </p>
                        <p className='px-3 text-14 font-bold py-0.5 cursor-pointer' onClick={() => setIsActiveSelect(!isActiveSelect)}>{valueOption != '' ? valueOption : (<>&nbsp;</>)}</p>
                        <ul className={`border-t border-solid border-gray-650 absolute top-full left-0 bg-gray-600 w-full rounded-bl-5 rounded-br-5 ${isActiveSelect ? '' : 'hidden'}`}>
                          <li className='px-3 py-0.5 text-14 font-bold hover:bg-gray-700 cursor-pointer'
                            onClick={(event: React.MouseEvent) => {
                              setValueOption(event.currentTarget.innerHTML);
                              setIsActiveSelect(false);
                            }}
                          >200</li>
                          <li className='px-3 py-0.5 text-14 font-bold hover:bg-gray-700 cursor-pointer'
                            onClick={(event: React.MouseEvent) => {
                              setValueOption(event.currentTarget.innerHTML);
                              setIsActiveSelect(false);
                            }}
                          >300</li>
                          <li className='px-3 py-0.5 text-14 font-bold hover:bg-gray-700 cursor-pointer'
                            onClick={(event: React.MouseEvent) => {
                              setValueOption(event.currentTarget.innerHTML);
                              setIsActiveSelect(false);
                            }}
                          >400</li>
                          <li className='px-3 py-0.5 text-14 font-bold hover:bg-gray-700 cursor-pointer'
                            onClick={(event: React.MouseEvent) => {
                              setValueOption(event.currentTarget.innerHTML);
                              setIsActiveSelect(false);
                            }}
                          >500</li>
                          <li className='px-3 py-0.5 text-14 font-bold hover:bg-gray-700 cursor-pointer'
                            onClick={(event: React.MouseEvent) => {
                              setValueOption(event.currentTarget.innerHTML);
                              setIsActiveSelect(false);
                            }}
                          >600</li>
                          <li className='px-3 py-0.5 text-14 font-bold hover:bg-gray-700 cursor-pointer'
                            onClick={(event: React.MouseEvent) => {
                              setValueOption(event.currentTarget.innerHTML);
                              setIsActiveSelect(false);
                            }}
                          >700</li>
                          <li className='px-3 py-0.5 text-14 font-bold hover:bg-gray-700 cursor-pointer'
                            onClick={(event: React.MouseEvent) => {
                              setValueOption(event.currentTarget.innerHTML);
                              setIsActiveSelect(false);
                            }}
                          >800</li>
                          <li className='px-3 py-0.5 text-14 font-bold hover:bg-gray-700 cursor-pointer'
                            onClick={(event: React.MouseEvent) => {
                              setValueOption(event.currentTarget.innerHTML);
                              setIsActiveSelect(false);
                            }}
                          >900</li>
                          <li className='px-3 py-0.5 text-14 font-bold hover:bg-gray-700 cursor-pointer'
                            onClick={(event: React.MouseEvent) => {
                              setValueOption(event.currentTarget.innerHTML);
                              setIsActiveSelect(false);
                            }}
                          >1000</li>
                        </ul>
                      </div>
                      <p className='text-14 md:text-16 px-10 cursor-pointer transition-all hover:opacity-70 pt-2 pb-2.5 rounded-5 font-bold bg-blue-0 text-blue-50 inline-block'
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
            <div className={`px-3/100 mb-9 md:mb-14 ${dataPlayerMilli !== null && dataPlayerMilli.is_winner && isFinishSaleRound ? 'block' : 'hidden'}`}>
              <div className='max-w-900 mx-auto bg-gray-150 rounded-15 py-5 md:py-8'>
                <div className='px-4 md:px-8'>
                  <h4 className='text-18 md:text-20 mb-2 md:mb-3.5 text-pink-0'>Sale round</h4>
                  <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left'>You purchased successfully. Please wait for the Distribution.</p>
                </div>
              </div>
            </div>
          </section>
          <section className={`px-3/100 mb-9 md:mb-14 ${getDataMillipads !== null && getDataMillipads.status === 'distribution' && dataPlayerMilli !== null && dataPlayerMilli.is_winner ? 'block' : 'hidden'}`}>
            <div className='max-w-900 mx-auto bg-gray-150 rounded-15 py-5 md:py-8'>
              <div className='px-4 md:px-8'>
                <h4 className='text-18 md:text-20 mb-2 md:mb-3.5 text-pink-0'>Distribution</h4>
                <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left'>The tokens will be automatically sent to your wallet. Best of luck to you. </p>
              </div>
            </div>
          </section>
        </>
      }
      {/* End Component Detect */}
      <section className='px-3/100 mb-12 md:mb-16'>
        <div className='max-w-900 mx-auto rounded-15 bg-gray-150 pt-6 md:pt-8 pb-10 md:pb-14'>
          <div className='px-4 md:px-6 tablet992:px-12'>
            <h4 className='text-pink-0 underline text-18 md:text-20 font-bold mb-10 md:mb-12'>Project Detail</h4>
            <div>
              <h5 className='text-blue-0 text-16 font-bold mb-4'>Features</h5>
              <p className='text-pink-50 text-12 md:text-14 text-justify md:text-left mb-2'>MILLIONSY is the first Solana-based cross-chain platform, which has 3 main products: The Lottery platform; the NFT ticket and the IGO platform for new games - NFT projects called MILLIGO.</p>
              <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>By transferring the Lottery to the blockchain platform, we  want to reach international participants and give them the opportunity to establish the largest PRIZE POOL in history and really win it. More to that, when the cross-chain platform begins, MILLIONSY will allow you to own  essential tickets for the specific chain you want.<br />Not only do its creators aim for it to be the largest lottery platform in history in the blockchain system, MILLIONSY also want to launch MILLIGO. The platform that leverages a lottery PRIZE POOL to become an IGO model and collaborate with future projects is their significant goal.</p>
              <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>There is no need to say that Lottery has really become a part of mankind's culture. Many people think of it as a gaming product, but it is actually a high-volume industry that may also be referred to as a commodity.</p>
              <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>The psychology of the lottery is that people will be happy to spend $2 for a hope and for the pleasure of thinking about what might happen if they win millions of dollars. The need for buying Lottery is so huge that this industry has never died in real life.</p>
              <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>Now with Blockchain technology every transaction, whether a ticket sale, a jackpot win, commissions, or investment, passes via the blockchain. Because each block in the chain has a record of the transactions, a hacker would have to modify every single block in order to manipulate or compromise the lottery number, which is impossible.</p>
              <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>As a result, a blockchain lottery platform assures that there are no foul plays or lottery scandals in the ecosystem. This is a guarantee for an ever-expanding lottery industry.</p>
              <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>You are more than welcome to participate in the greatest blockchain celebration, as long as you have a wallet and at the price of just 2$ per ticket, you now have a chance to join the millionaire-club. Tickets will be available on their website and can be purchased by SOL and MILLI. In the near future, you will be able to buy lottery tickets via Visa, PayPal, and other payment methods.</p>
            </div>
            <h5 className='text-blue-0 text-16 font-bold mb-3 md:mb-4 pt-3 md:pt-8'>Tokenomic</h5>
          </div>
          <p className='mb-4'><img src="/assets/millipad/chart.png" alt="chart"/></p>
          <div className='px-4 md:px-6 tablet992:px-12'>
            <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-1.5'>Total max supply: 300,000,000</p>
            <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-1.5'>Team: Lock 12 months.</p>
            <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-1.5'>Advisor: Unlock from the 6th month.</p>
            <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-1.5'>Dev &amp; marketing: Unlock 1% per month after launching.</p>
            <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-1.5'>All unused tokens will be transferred to the BURN POOL</p>
            <h5 className='text-blue-0 text-16 font-bold mb-3 md:mb-4 pt-3 md:pt-8'>Roadmap</h5>
          </div>
          <p className='mb-4'><img src="/assets/millipad/list.png" alt="list"/></p>
          <div className='px-4 md:px-6 tablet992:px-12'>
            <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>Between September and October: Conducting Sale Rounds to fuel the initial development and growth. We appreciate the strong support from the community as well as many funds that reached out to us.<br />In October, the Lottery platform and contract will be audited.<br />Next, MILLIGO and NFTs Ticket will be launched in November. Then in December, promoting social activities to keep building a community that shares our long term vision, also opening Live Drawing at this stage.</p>
            <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>From January to March 2022, cross-chain will be available in MILLIONSY platform. Users will be able to buy tickets from other blockchains seamlessly.</p>
            <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>From April to the end of 2022, completing Fiat Ticket Purchase feature. MILLIONSY will definitely lead the next chapter of the lottery industry with those unique and promising features.</p>
            <h5 className='text-blue-0 text-16 font-bold mb-3 md:mb-4 pt-3 md:pt-8'>Team</h5>
          </div>
          <p><img src="/assets/millipad/teams.png" alt="face"/></p>
        </div>
      </section>
      {
        showModalTicket &&
        <section className='fixed h-100vh w-full top-0 left-0 z-100'>
          <div className='h-full absolute w-full top-0 left-0 bg-gray-400' onClick={() => setShowModalTicket(false)}></div>
          <div className={`${selectedTickets === 'twitter' ? 'block' : 'hidden'} bg-gray-450 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-full z-1000 overflow-hidden border border-solid border-blue-0 rounded-20 max-w-320 w-full`}>
            <div className='flex justify-between items-center px-5 py-6 bg-gray-0'>
              <p className='text-14 font-bold text-pink-50'>Twitter tasks</p>
              <p className='cursor-pointer transition-all hover:opacity-70 py-1.5 pl-4' onClick={() => setShowModalTicket(false)}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.75592 1.42259C10.0814 1.09715 10.0814 0.569515 9.75592 0.244078C9.43049 -0.0813592 8.90285 -0.0813592 8.57741 0.244078L5 3.82149L1.42259 0.244078C1.09715 -0.0813584 0.569515 -0.0813584 0.244078 0.244079C-0.0813592 0.569515 -0.0813592 1.09715 0.244078 1.42259L3.82149 5L0.244078 8.57741C-0.0813592 8.90285 -0.0813592 9.43048 0.244078 9.75592C0.569515 10.0814 1.09715 10.0814 1.42259 9.75592L5 6.17851L8.57741 9.75592C8.90285 10.0814 9.43049 10.0814 9.75592 9.75592C10.0814 9.43049 10.0814 8.90285 9.75592 8.57741L6.17851 5L9.75592 1.42259Z" fill="#fff"/>
                </svg>
              </p>
            </div>
            <div className='px-5 pt-1 pb-5'>
              <ul>
                <li>
                  <a href='https://twitter.com/millionsyio' target='_blank' className={`flex justify-between items-center py-3.5 border-b border-solid border-gray-550 ${flagOnclick.twitter.waggle ? '' : 'cursor-default'}`}
                    onClick={(event) => {
                      if(!flagOnclick.twitter.waggle) {
                        event.preventDefault()
                      } else {
                        setIsNextStepTwitter(true);
                        setFlagSlots({
                          ...flagSlots,
                          twitter: {
                            ...flagSlots.twitter,
                            waggle: 1,
                          }
                        })
                        updateMissionPlayer(playerData.data.publicKey, 'goal1', getDataMillipads !== null ? getDataMillipads.code : '')
                      }
                    }}
                  >
                    <p className={`leading-5 ${flagOnclick.twitter.waggle ? '' : 'opacity-50'}`}>
                      <span className='text-16 text-pink-0 font-bold'><span className='mr-2'>1.</span>MILLIONSY</span>
                      <span className='text-14 text-pink-50 block pl-6'>Twitter Follow</span>
                    </p>
                    <p className='leading-4 flex items-center flex-col'>
                      <span>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.8457 0.230774C8.769 0.230774 6.73893 0.846588 5.01222 2.00034C3.2855 3.1541 1.93969 4.79397 1.14497 6.7126C0.350253 8.63122 0.142318 10.7424 0.547462 12.7792C0.952607 14.816 1.95263 16.6869 3.42109 18.1554C4.88954 19.6238 6.76046 20.6239 8.79726 21.029C10.8341 21.4342 12.9453 21.2262 14.8639 20.4315C16.7825 19.6368 18.4224 18.291 19.5761 16.5643C20.7299 14.8375 21.3457 12.8075 21.3457 10.7308C21.3457 7.946 20.2395 5.27528 18.2703 3.30615C16.3012 1.33702 13.6305 0.230774 10.8457 0.230774ZM16.1346 8.58982L16.1419 8.91112C16.1419 12.1924 13.5684 15.9776 8.86121 15.9776C7.4749 15.9801 6.11574 15.5934 4.93841 14.8615C5.14128 14.8847 5.34531 14.8963 5.54951 14.8961C6.69691 14.8996 7.81366 14.5259 8.72786 13.8325C8.1999 13.8279 7.68638 13.6596 7.25814 13.3508C6.8299 13.042 6.50805 12.6079 6.33701 12.1084C6.49558 12.1381 6.65658 12.1528 6.81791 12.1525C7.04542 12.1526 7.272 12.1233 7.49201 12.0653C6.9205 11.9606 6.40319 11.6604 6.0287 11.2162C5.6542 10.772 5.44582 10.2114 5.43926 9.63037V9.59887C5.79441 9.79255 6.18995 9.90042 6.59426 9.91387C6.24686 9.69142 5.96094 9.38522 5.76279 9.02341C5.56464 8.6616 5.46061 8.25579 5.46026 7.84327C5.45957 7.40343 5.57902 6.97175 5.80571 6.59482C6.45851 7.36747 7.26401 7.9968 8.17163 8.44329C9.07925 8.88978 10.0694 9.14379 11.0799 9.18937C11.0353 9.00403 11.0131 8.81403 11.0137 8.62342C11.0137 7.25212 12.1593 6.14122 13.5715 6.14122C13.9195 6.13991 14.2641 6.20858 14.585 6.34314C14.9059 6.4777 15.1965 6.67542 15.4395 6.92452C16.0116 6.81582 16.5614 6.61172 17.0659 6.32077C16.8717 6.90157 16.4712 7.39097 15.9403 7.69627C16.4468 7.63796 16.942 7.50602 17.4103 7.30462C17.0648 7.80547 16.6328 8.24068 16.1346 8.58982Z" fill={`${flagOnclick.twitter.waggle ? '#17F0FF' : '#878787'}`}/>
                        </svg>
                      </span>
                      <span className={`text-10 ${flagOnclick.twitter.waggle ? 'text-blue-200' : 'text-gray-500'}`}>1 slot</span>
                    </p>
                  </a>
                </li>
                <li>
                  <a href='https://twitter.com/MILLIONSYio/status/1452649686402101251?s=20' target='_blank' className={`flex justify-between items-center py-3.5 border-b border-solid border-gray-550 ${flagOnclick.twitter.millionsy ? '' : 'cursor-default'}`}
                    onClick={(event) => {
                      if(!flagOnclick.twitter.millionsy) {
                        event.preventDefault()
                      } else {
                        setIsNextStepTwitter(true);
                        setFlagSlots({
                          ...flagSlots,
                          twitter: {
                            ...flagSlots.twitter,
                            millionsy: 1,
                          }
                        })
                        updateMissionPlayer(playerData.data.publicKey, 'goal2', getDataMillipads !== null ? getDataMillipads.code : '')
                      }
                    }}
                  >
                    <p className={`leading-5 ${flagOnclick.twitter.millionsy ? '' : 'opacity-50'}`}>
                      <span className='text-16 text-pink-0 font-bold'><span className='mr-2'>2.</span>Retweet</span>
                      <span className='text-14 text-pink-50 block pl-6'>Retweet, like and comment</span>
                    </p>
                    <p className='leading-4 flex items-center flex-col'>
                      <span>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.8457 0.230774C8.769 0.230774 6.73893 0.846588 5.01222 2.00034C3.2855 3.1541 1.93969 4.79397 1.14497 6.7126C0.350253 8.63122 0.142318 10.7424 0.547462 12.7792C0.952607 14.816 1.95263 16.6869 3.42109 18.1554C4.88954 19.6238 6.76046 20.6239 8.79726 21.029C10.8341 21.4342 12.9453 21.2262 14.8639 20.4315C16.7825 19.6368 18.4224 18.291 19.5761 16.5643C20.7299 14.8375 21.3457 12.8075 21.3457 10.7308C21.3457 7.946 20.2395 5.27528 18.2703 3.30615C16.3012 1.33702 13.6305 0.230774 10.8457 0.230774ZM16.1346 8.58982L16.1419 8.91112C16.1419 12.1924 13.5684 15.9776 8.86121 15.9776C7.4749 15.9801 6.11574 15.5934 4.93841 14.8615C5.14128 14.8847 5.34531 14.8963 5.54951 14.8961C6.69691 14.8996 7.81366 14.5259 8.72786 13.8325C8.1999 13.8279 7.68638 13.6596 7.25814 13.3508C6.8299 13.042 6.50805 12.6079 6.33701 12.1084C6.49558 12.1381 6.65658 12.1528 6.81791 12.1525C7.04542 12.1526 7.272 12.1233 7.49201 12.0653C6.9205 11.9606 6.40319 11.6604 6.0287 11.2162C5.6542 10.772 5.44582 10.2114 5.43926 9.63037V9.59887C5.79441 9.79255 6.18995 9.90042 6.59426 9.91387C6.24686 9.69142 5.96094 9.38522 5.76279 9.02341C5.56464 8.6616 5.46061 8.25579 5.46026 7.84327C5.45957 7.40343 5.57902 6.97175 5.80571 6.59482C6.45851 7.36747 7.26401 7.9968 8.17163 8.44329C9.07925 8.88978 10.0694 9.14379 11.0799 9.18937C11.0353 9.00403 11.0131 8.81403 11.0137 8.62342C11.0137 7.25212 12.1593 6.14122 13.5715 6.14122C13.9195 6.13991 14.2641 6.20858 14.585 6.34314C14.9059 6.4777 15.1965 6.67542 15.4395 6.92452C16.0116 6.81582 16.5614 6.61172 17.0659 6.32077C16.8717 6.90157 16.4712 7.39097 15.9403 7.69627C16.4468 7.63796 16.942 7.50602 17.4103 7.30462C17.0648 7.80547 16.6328 8.24068 16.1346 8.58982Z" fill={`${flagOnclick.twitter.millionsy ? '#17F0FF' : '#878787'}`}/>
                        </svg>
                      </span>
                      <span className={`text-10 ${flagOnclick.twitter.millionsy ? 'text-blue-200' : 'text-gray-500'}`}>1 slot</span>
                    </p>
                  </a>
                </li>
                <li className='flex justify-between items-center py-3.5 border-b border-solid border-gray-550'>
                  <p className={`leading-5 ${flagOnclick.twitter.retweet ? '' : 'opacity-50'}`}>
                    <span className='text-16 text-pink-0 font-bold'><span className='mr-2'>3.</span>Claim slots</span>
                    <span className='text-14 text-pink-50 block pl-6'>We will check your actions </span>
                  </p>
                </li>
              </ul>
              <p className={`mt-3 w-140 mx-auto text-center text-16 py-2 font-bold rounded-5 transition-all  ${
                flagOnclick.twitter.retweet ? 'bg-blue-0 text-blue-50 hover:opacity-70 cursor-pointer' : 
                isNextStepTwitter ? 'bg-pink-150 text-pink-50 hover:opacity-70 cursor-pointer' : 'bg-gray-550 text-gray-50 pointer-events-none'
              }`}
                onClick={() => {
                  setIsNextStepTwitter(false);
                  if(isNextStepTwitter) {
                    if(flagOnclick.twitter.waggle) {
                      setFlagOnclick({
                        ...flagOnclick,
                        twitter: {
                          ...flagOnclick.twitter,
                          millionsy: true,
                        }
                      })
                    }
                    if (flagOnclick.twitter.millionsy) {
                      setFlagOnclick({
                        ...flagOnclick,
                        twitter: {
                          ...flagOnclick.twitter,
                          retweet: true,
                        }
                      })
                    }
                  }
                  if (flagOnclick.twitter.retweet) {
                    setShowModalTicket(false);
                  }
                }}
              >{flagOnclick.twitter.retweet ? (<>Claim slots</>) : (<>Next step</>)}</p>
            </div>
          </div>
          <div className={`${selectedTickets === 'telegram' ? 'block' : 'hidden'} bg-gray-450 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-full z-1000 overflow-hidden border border-solid border-blue-0 rounded-20 max-w-320 w-full`}>
            <div className='flex justify-between items-center px-5 py-6 bg-gray-0'>
              <p className='text-14 font-bold text-pink-50'>Telegram tasks</p>
              <p className='cursor-pointer transition-all hover:opacity-70 py-1.5 pl-4' onClick={() => setShowModalTicket(false)}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.75592 1.42259C10.0814 1.09715 10.0814 0.569515 9.75592 0.244078C9.43049 -0.0813592 8.90285 -0.0813592 8.57741 0.244078L5 3.82149L1.42259 0.244078C1.09715 -0.0813584 0.569515 -0.0813584 0.244078 0.244079C-0.0813592 0.569515 -0.0813592 1.09715 0.244078 1.42259L3.82149 5L0.244078 8.57741C-0.0813592 8.90285 -0.0813592 9.43048 0.244078 9.75592C0.569515 10.0814 1.09715 10.0814 1.42259 9.75592L5 6.17851L8.57741 9.75592C8.90285 10.0814 9.43049 10.0814 9.75592 9.75592C10.0814 9.43049 10.0814 8.90285 9.75592 8.57741L6.17851 5L9.75592 1.42259Z" fill="#fff"/>
                </svg>
              </p>
            </div>
            <div className='px-5 pt-1 pb-5'>
              <ul>
                <li>
                  <a href='https://t.me/MILLIONSYio' target='_blank' className={`flex justify-between items-center py-3.5 border-b border-solid border-gray-550 ${flagOnclick.twitter.waggle ? '' : 'cursor-default'}`}
                    onClick={(event) => {
                      if(!flagOnclick.telegram.waggle) {
                        event.preventDefault()
                      } else {
                        setIsNextStepTelegram(true);
                        setFlagSlots({
                          ...flagSlots,
                          telegram: {
                            ...flagSlots.telegram,
                            waggle: 1,
                          }
                        })
                        updateMissionPlayer(playerData.data.publicKey, 'goal3', getDataMillipads !== null ? getDataMillipads.code : '')
                      }
                    }}
                  >
                    <p className={`leading-5 ${flagOnclick.telegram.waggle ? '' : 'opacity-50'}`}>
                      <span className='text-16 text-pink-0 font-bold'><span className='mr-2'>1.</span>MILLIONSY</span>
                      <span className='text-14 text-pink-50 block pl-6'>Join group</span>
                    </p>
                    <p className='leading-4 flex items-center flex-col'>
                      <span>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.8457 0.230774C8.769 0.230774 6.73893 0.846588 5.01222 2.00034C3.2855 3.1541 1.93969 4.79397 1.14497 6.7126C0.350253 8.63122 0.142318 10.7424 0.547462 12.7792C0.952607 14.816 1.95263 16.6869 3.42109 18.1554C4.88954 19.6238 6.76046 20.6239 8.79726 21.029C10.8341 21.4342 12.9453 21.2262 14.8639 20.4315C16.7825 19.6368 18.4224 18.291 19.5761 16.5643C20.7299 14.8375 21.3457 12.8075 21.3457 10.7308C21.3457 7.946 20.2395 5.27528 18.2703 3.30615C16.3012 1.33702 13.6305 0.230774 10.8457 0.230774ZM16.1346 8.58982L16.1419 8.91112C16.1419 12.1924 13.5684 15.9776 8.86121 15.9776C7.4749 15.9801 6.11574 15.5934 4.93841 14.8615C5.14128 14.8847 5.34531 14.8963 5.54951 14.8961C6.69691 14.8996 7.81366 14.5259 8.72786 13.8325C8.1999 13.8279 7.68638 13.6596 7.25814 13.3508C6.8299 13.042 6.50805 12.6079 6.33701 12.1084C6.49558 12.1381 6.65658 12.1528 6.81791 12.1525C7.04542 12.1526 7.272 12.1233 7.49201 12.0653C6.9205 11.9606 6.40319 11.6604 6.0287 11.2162C5.6542 10.772 5.44582 10.2114 5.43926 9.63037V9.59887C5.79441 9.79255 6.18995 9.90042 6.59426 9.91387C6.24686 9.69142 5.96094 9.38522 5.76279 9.02341C5.56464 8.6616 5.46061 8.25579 5.46026 7.84327C5.45957 7.40343 5.57902 6.97175 5.80571 6.59482C6.45851 7.36747 7.26401 7.9968 8.17163 8.44329C9.07925 8.88978 10.0694 9.14379 11.0799 9.18937C11.0353 9.00403 11.0131 8.81403 11.0137 8.62342C11.0137 7.25212 12.1593 6.14122 13.5715 6.14122C13.9195 6.13991 14.2641 6.20858 14.585 6.34314C14.9059 6.4777 15.1965 6.67542 15.4395 6.92452C16.0116 6.81582 16.5614 6.61172 17.0659 6.32077C16.8717 6.90157 16.4712 7.39097 15.9403 7.69627C16.4468 7.63796 16.942 7.50602 17.4103 7.30462C17.0648 7.80547 16.6328 8.24068 16.1346 8.58982Z" fill={`${flagOnclick.telegram.waggle ? '#17F0FF' : '#878787'}`}/>
                        </svg>
                      </span>
                      <span className={`text-10 ${flagOnclick.telegram.waggle ? 'text-blue-200' : 'text-gray-500'}`}>1 slot</span>
                    </p>
                  </a>
                </li>
                <li>
                  <a href='https://t.me/MILLIONSYchannel' target='_blank' className={`flex justify-between items-center py-3.5 border-b border-solid border-gray-550 ${flagOnclick.telegram.millionsy ? '' : 'cursor-default'}`}
                    onClick={(event) => {
                      if(!flagOnclick.telegram.millionsy) {
                        event.preventDefault()
                      } else {
                        setIsNextStepTelegram(true);
                        setFlagSlots({
                          ...flagSlots,
                          telegram: {
                            ...flagSlots.telegram,
                            millionsy: 1,
                          }
                        })
                        updateMissionPlayer(playerData.data.publicKey, 'goal4', getDataMillipads !== null ? getDataMillipads.code : '')
                      }
                    }}
                  >
                    <p className={`leading-5 ${flagOnclick.telegram.millionsy ? '' : 'opacity-50'}`}>
                      <span className='text-16 text-pink-0 font-bold'><span className='mr-2'>2.</span>MILLIONSY</span>
                      <span className='text-14 text-pink-50 block pl-6'>Join channel</span>
                    </p>
                    <p className='leading-4 flex items-center flex-col'>
                      <span>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.8457 0.230774C8.769 0.230774 6.73893 0.846588 5.01222 2.00034C3.2855 3.1541 1.93969 4.79397 1.14497 6.7126C0.350253 8.63122 0.142318 10.7424 0.547462 12.7792C0.952607 14.816 1.95263 16.6869 3.42109 18.1554C4.88954 19.6238 6.76046 20.6239 8.79726 21.029C10.8341 21.4342 12.9453 21.2262 14.8639 20.4315C16.7825 19.6368 18.4224 18.291 19.5761 16.5643C20.7299 14.8375 21.3457 12.8075 21.3457 10.7308C21.3457 7.946 20.2395 5.27528 18.2703 3.30615C16.3012 1.33702 13.6305 0.230774 10.8457 0.230774ZM16.1346 8.58982L16.1419 8.91112C16.1419 12.1924 13.5684 15.9776 8.86121 15.9776C7.4749 15.9801 6.11574 15.5934 4.93841 14.8615C5.14128 14.8847 5.34531 14.8963 5.54951 14.8961C6.69691 14.8996 7.81366 14.5259 8.72786 13.8325C8.1999 13.8279 7.68638 13.6596 7.25814 13.3508C6.8299 13.042 6.50805 12.6079 6.33701 12.1084C6.49558 12.1381 6.65658 12.1528 6.81791 12.1525C7.04542 12.1526 7.272 12.1233 7.49201 12.0653C6.9205 11.9606 6.40319 11.6604 6.0287 11.2162C5.6542 10.772 5.44582 10.2114 5.43926 9.63037V9.59887C5.79441 9.79255 6.18995 9.90042 6.59426 9.91387C6.24686 9.69142 5.96094 9.38522 5.76279 9.02341C5.56464 8.6616 5.46061 8.25579 5.46026 7.84327C5.45957 7.40343 5.57902 6.97175 5.80571 6.59482C6.45851 7.36747 7.26401 7.9968 8.17163 8.44329C9.07925 8.88978 10.0694 9.14379 11.0799 9.18937C11.0353 9.00403 11.0131 8.81403 11.0137 8.62342C11.0137 7.25212 12.1593 6.14122 13.5715 6.14122C13.9195 6.13991 14.2641 6.20858 14.585 6.34314C14.9059 6.4777 15.1965 6.67542 15.4395 6.92452C16.0116 6.81582 16.5614 6.61172 17.0659 6.32077C16.8717 6.90157 16.4712 7.39097 15.9403 7.69627C16.4468 7.63796 16.942 7.50602 17.4103 7.30462C17.0648 7.80547 16.6328 8.24068 16.1346 8.58982Z" fill={`${flagOnclick.telegram.millionsy ? '#17F0FF' : '#878787'}`}/>
                        </svg>
                      </span>
                      <span className={`text-10 ${flagOnclick.telegram.millionsy ? 'text-blue-200' : 'text-gray-500'}`}>1 slot</span>
                    </p>
                  </a>
                </li>
                <li className='flex justify-between items-center py-3.5 border-b border-solid border-gray-550'>
                  <p className={`leading-5 ${flagOnclick.telegram.retweet ? '' : 'opacity-50'}`}>
                    <span className='text-16 text-pink-0 font-bold'><span className='mr-2'>3.</span>Claim slots</span>
                    <span className='text-14 text-pink-50 block pl-6'>We will check your actions </span>
                  </p>
                </li>
              </ul>
              <p className={`mt-3 w-140 mx-auto text-center text-16 py-2 font-bold rounded-5 transition-all  ${
                flagOnclick.telegram.retweet ? 'bg-blue-0 text-blue-50 hover:opacity-70 cursor-pointer' : 
                isNextStepTelegram ? 'bg-pink-150 text-pink-50 hover:opacity-70 cursor-pointer' : 'bg-gray-550 text-gray-50 pointer-events-none'
              }`}
                onClick={() => {
                  setIsNextStepTelegram(false);
                  if(isNextStepTelegram) {
                    if(flagOnclick.telegram.waggle) {
                      setFlagOnclick({
                        ...flagOnclick,
                        telegram: {
                          ...flagOnclick.telegram,
                          millionsy: true,
                        }
                      })
                    }
                    if (flagOnclick.telegram.millionsy) {
                      setFlagOnclick({
                        ...flagOnclick,
                        telegram: {
                          ...flagOnclick.telegram,
                          retweet: true,
                        }
                      })
                    }
                  }
                  if (flagOnclick.telegram.retweet) {
                    setShowModalTicket(false);
                  }
                }}
              >{flagOnclick.telegram.retweet ? (<>Claim slots</>) : (<>Next step</>)}</p>
            </div>
          </div>
        </section>
      }
      <Footer></Footer>
      <ModalContent dataGiveFromWallet={dataGiveFromWallet} playerData={playerData.data} dataModal={dataModal.data} dataGiveFromModal={dataGiveFromModal}></ModalContent>
    </>
  )
}
export default Millionsy;