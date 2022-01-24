import Footer from 'components/astoms/footer';
import Header from 'components/astoms/header';
import ModalContent from 'components/astoms/modalSection';
import { isConnect } from 'data/db';
import React, { useEffect, useState } from 'react';
import { fetchPlayerAccount, getMillipads } from 'lib/utilities/utils';
import { useWindowSize } from 'data/constants';
const MILLIGO: React.FC = () => {
  const size = useWindowSize();
  const [getDataMillipads, setGetDataMillipads] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [dataModal, setDataModal] = useState({
    data: {
      is_connect: isConnect,
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

  const resetModalData = () => {
    setDataModal({
      data: {
        is_connect: dataModal.data.is_connect,
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
        window.sessionStorage.getItem("adapter_type")
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
    getMillipads().then(data => {
      // Data return leng -> 0
      setGetDataMillipads(data.results);
    });
  }, [])

  const handleLoadClosedPool = () => {
    let resultClosed = [];
    let countProject = 0;
    for(let i = getDataMillipads.length - 1; i >= 0; i--) {
      if (getDataMillipads[i].status === 'complete') {
        countProject++;
        resultClosed.push(
          <li key={i} className='m-1 md:m-2 2xl:m-2.5 relative rounded-5 md:rounded-10 overflow-hidden transition-all hover:opacity-80 cursor-pointer max-w-100 md:max-w-178 2xl:max-w-200'>
            <a href={`/milligo/${getDataMillipads[i].code}`} className='block absolute top-0 left-0 w-full h-full md:rounded-10'></a>
            <img src="/assets/millipad/close_pool1.png" alt={getDataMillipads[i].code} />
            <span className='absolute bottom-2 left-2'>
              <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="0.311401" width="22" height="20" rx="2" fill="#151515"/>
              <path d="M6.94879 5.40973C7.02239 5.3468 7.12128 5.3114 7.22478 5.3114H16.8037C16.9785 5.3114 17.0659 5.49233 16.9417 5.59655L15.0489 7.21307C14.9753 7.276 14.8764 7.3114 14.7729 7.3114H5.1963C5.02151 7.3114 4.93411 7.13048 5.0583 7.02625L6.94879 5.40973Z" fill="url(#paint0_linear_1310_2871)"/>
              <path d="M15.047 9.40973C14.9734 9.3468 14.8745 9.3114 14.7711 9.3114H5.19626C5.0215 9.3114 4.93412 9.49233 5.05829 9.59655L6.95072 11.2131C7.0243 11.276 7.12317 11.3114 7.22665 11.3114H16.8037C16.9785 11.3114 17.0659 11.1305 16.9417 11.0262L15.047 9.40973Z" fill="url(#paint1_linear_1310_2871)"/>
              <path d="M6.94879 13.4097C7.02239 13.3468 7.12128 13.3114 7.22478 13.3114H16.8037C16.9785 13.3114 17.0659 13.4923 16.9417 13.5966L15.0489 15.2131C14.9753 15.276 14.8764 15.3114 14.7729 15.3114H5.1963C5.02151 15.3114 4.93411 15.1305 5.0583 15.0262L6.94879 13.4097Z" fill="url(#paint2_linear_1310_2871)"/>
              <defs>
                <linearGradient id="paint0_linear_1310_2871" x1="12.9906" y1="3.05153" x2="7.84778" y2="14.5717" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00FFA3"/>
                  <stop offset="1" stopColor="#DC1FFF"/>
                </linearGradient>
                <linearGradient id="paint1_linear_1310_2871" x1="14.4289" y1="4.69341" x2="9.28532" y2="16.2128" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00FFA3"/>
                  <stop offset="1" stopColor="#DC1FFF"/>
                </linearGradient>
                <linearGradient id="paint2_linear_1310_2871" x1="15.8891" y1="6.30418" x2="10.7462" y2="17.8243" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00FFA3"/>
                  <stop offset="1" stopColor="#DC1FFF"/>
                </linearGradient>
              </defs>
            </svg>

            </span>
          </li>
        )
      }
    }
    for(let i = 0; i < 5 - countProject; i++) {
      resultClosed.push(
        <li key={countProject + i} className='m-1 md:m-2 2xl:m-2.5 relative rounded-5 md:rounded-10 overflow-hidden transition-all hover:opacity-80 max-w-100 md:max-w-178 2xl:max-w-200'>
          <img src="/assets/millipad/under_rectangle.png" alt="Solana" />
          <span className='absolute bottom-2 left-2'>
            <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="0.311401" width="22" height="20" rx="2" fill="#151515"/>
              <path d="M6.94879 5.40973C7.02239 5.3468 7.12128 5.3114 7.22478 5.3114H16.8037C16.9785 5.3114 17.0659 5.49233 16.9417 5.59655L15.0489 7.21307C14.9753 7.276 14.8764 7.3114 14.7729 7.3114H5.1963C5.02151 7.3114 4.93411 7.13048 5.0583 7.02625L6.94879 5.40973Z" fill="url(#paint0_linear_1310_2871)"/>
              <path d="M15.047 9.40973C14.9734 9.3468 14.8745 9.3114 14.7711 9.3114H5.19626C5.0215 9.3114 4.93412 9.49233 5.05829 9.59655L6.95072 11.2131C7.0243 11.276 7.12317 11.3114 7.22665 11.3114H16.8037C16.9785 11.3114 17.0659 11.1305 16.9417 11.0262L15.047 9.40973Z" fill="url(#paint1_linear_1310_2871)"/>
              <path d="M6.94879 13.4097C7.02239 13.3468 7.12128 13.3114 7.22478 13.3114H16.8037C16.9785 13.3114 17.0659 13.4923 16.9417 13.5966L15.0489 15.2131C14.9753 15.276 14.8764 15.3114 14.7729 15.3114H5.1963C5.02151 15.3114 4.93411 15.1305 5.0583 15.0262L6.94879 13.4097Z" fill="url(#paint2_linear_1310_2871)"/>
              <defs>
                <linearGradient id="paint0_linear_1310_2871" x1="12.9906" y1="3.05153" x2="7.84778" y2="14.5717" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00FFA3"/>
                  <stop offset="1" stopColor="#DC1FFF"/>
                </linearGradient>
                <linearGradient id="paint1_linear_1310_2871" x1="14.4289" y1="4.69341" x2="9.28532" y2="16.2128" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00FFA3"/>
                  <stop offset="1" stopColor="#DC1FFF"/>
                </linearGradient>
                <linearGradient id="paint2_linear_1310_2871" x1="15.8891" y1="6.30418" x2="10.7462" y2="17.8243" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00FFA3"/>
                  <stop offset="1" stopColor="#DC1FFF"/>
                </linearGradient>
              </defs>
            </svg>

          </span>
        </li>
      )
    }
    return resultClosed;
  }
  

  return (
    <>
      <Header playerData={playerData.data} dataGiveFromHeader={dataGiveFromHeader}></Header>
      <section className='mb-24 md:mb-40 pr-3/100 md:pl-3/100 pt-14 md:pt-4 relative'>
        <div className='max-w-930 mx-auto'>
          <div className='flex justify-between items-center'>
            <p className='flex-shrink-0 max-w-124 md:max-w-228 lg:max-w-350 mr-2 md:mr-4'><img src="/assets/millipad/milligo_banner.png" alt="" /></p>
            <div>
              <h3 className='text-20 md:text-36 lg:text-banner-pc text-blue-primary uppercase font-bungee leading-tight mb-4'>LAUNCHING GAME,<br />NFT AND MORE</h3>
              <p>MILLIGO is a multi-chain IGO platform which supports new gaming, NFT projects to raise funds and so much more. To participate in an IGO on MILLIGO, you don’t need to stake your coins, just do some social tasks or buy some NFT tickets.</p>
              <div className='hidden md:block'>
                <ul className='my-8'>
                  <li className='inline-block max-w-124 mr-4'><img src="/assets/millipad/banner_solana.png" alt="" /></li>
                  <li className='inline-block max-w-112'><img src="/assets/millipad/banner_bsc.png" alt="" /></li>
                </ul>
                <ul className='grid grid-cols-3 py-4 bg-gray-box rounded-5 max-w-500'>
                  <li className='col-span-1 px-4 text-center'>
                    <p className='text-pink-secondary text-h3-pc font-bold mb-2'>No staking</p>
                    <p><a href="/nft-ticket" className='bg-blue-primary h-34px w-20 mx-auto flex justify-center items-center text-gray-box rounded-5 font-semibold text-bodybox-pc transition-all hover:opacity-70'>Buy NFT</a></p>
                  </li>
                  <li className='col-span-1 px-4 text-center border-l border-r border-solid border-gray-boxline-50'>
                    <p className='text-pink-secondary text-h3-pc font-bold mb-4'>Raised capital</p>
                    <p>200,000</p>
                  </li>
                  <li className='col-span-1 px-4 text-center'>
                    <p className='text-pink-secondary text-h3-pc font-bold mb-4'>Funded projects</p>
                    <p>1</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className='block md:hidden pl-3/100'>
            <ul className='my-8 flex justify-center'>
              <li className='inline-block max-w-124 mr-4'><img src="/assets/millipad/banner_solana.png" alt="" /></li>
              <li className='inline-block max-w-112'><img src="/assets/millipad/banner_bsc.png" alt="" /></li>
            </ul>
            <ul className='grid grid-cols-3 py-2 bg-gray-box rounded-5'>
              <li className='col-span-1 px-2.5 text-center'>
                <p className='text-pink-secondary text-body-sp screen475:text-body-pc font-bold mb-2'>No staking</p>
                <p><a href="/nft-ticket" className='bg-blue-primary w-20 h-32px mx-auto flex justify-center items-center text-gray-box rounded-5 font-semibold text-body-sp transition-all hover:opacity-70'>Buy NFT</a></p>
              </li>
              <li className='col-span-1 px-2.5 text-center border-l border-r border-solid border-gray-boxline-50'>
                <p className='text-pink-secondary text-body-sp screen475:text-body-pc font-bold mb-4'>Raised capital</p>
                <p>200,000</p>
              </li>
              <li className='col-span-1 px-2.5 text-center'>
                <p className='text-pink-secondary text-body-sp screen475:text-body-pc font-bold mb-4'>Funded projects</p>
                <p>1</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className='mb-16 md:mb-20 px-3/100'>
        <h3 className='font-bungee text-center text-h1-sp md:text-h1-pc text-blue-primary mb-8 md:mb-14 uppercase'>upcoming projects</h3>
        <div className='max-w-1110 mx-auto'>
          <div className='flex justify-center'>
            <div className='rounded-5 overflow-hidden max-w-400 cursor-pointer relative transition-all hover:opacity-70 bg-gray-box border border-solid border-gray-boxline-50'>
              {
                getDataMillipads !== null && getDataMillipads[0].status !== 'complete'
                ?
                <>
                  <a href={`/milligo/${getDataMillipads[0].code}`} className='block absolute top-0 left-0 w-full h-full z-1'></a>
                  <p className='relative'>
                    <img src="/assets/millipad/under_img1.png" alt={getDataMillipads[0].code} />
                    <span className='text-blue-primary font-semibold text-bodybox-sp md:text-bodybox-pc rounded-5 inline-block bg-gray-box absolute top-2 right-2 py-0.5 px-2'>7 days</span>
                  </p>
                  <div className='p-4 pb-2 md:pb-1.5'>
                    <h4 className=' text-blue-primary font-bungee uppercase leading-none text-h2-sp md:text-h2-pc mb-0.5'>{getDataMillipads[0].code}</h4>
                    <p>NFT, Game</p>
                    <p className='h-px bg-gray-boxline opacity-50 mt-3 md:mt-4 mb-2'></p>
                    <dl className='flex justify-between items-end'>
                      <dt className='relative bottom-1'>Total raise</dt>
                      <dd className='text-h2-sp md:text-h2-pc font-bold text-gray-primary'>
                        <span>200,000 USDT</span>
                        <span className='inline-block ml-2 relative top-px'>
                          <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.2692 0.922105C3.37706 0.811977 3.52199 0.750031 3.67367 0.750031H17.7124C17.9685 0.750031 18.0966 1.06665 17.9146 1.24905L15.1406 4.07796C15.0327 4.18808 14.8878 4.25003 14.7361 4.25003H0.700774C0.444606 4.25003 0.316522 3.93341 0.498536 3.75101L3.2692 0.922105Z" fill="url(#paint0_linear_1310_1587)"/>
                            <path d="M15.1376 6.42211C15.0298 6.31198 14.8848 6.25003 14.7332 6.25003H0.697844C0.441676 6.25003 0.313592 6.56665 0.495606 6.74905L3.26964 9.57796C3.3775 9.68808 3.52243 9.75003 3.67411 9.75003H17.7128C17.969 9.75003 18.097 9.43341 17.915 9.25101L15.1376 6.42211Z" fill="url(#paint1_linear_1310_1587)"/>
                            <path d="M3.2692 11.9221C3.37706 11.812 3.52199 11.75 3.67367 11.75H17.7124C17.9685 11.75 18.0966 12.0666 17.9146 12.249L15.1406 15.078C15.0327 15.1881 14.8878 15.25 14.7361 15.25H0.700774C0.444606 15.25 0.316522 14.9334 0.498536 14.751L3.2692 11.9221Z" fill="url(#paint2_linear_1310_1587)"/>
                            <defs>
                              <linearGradient id="paint0_linear_1310_1587" x1="12.124" y1="-3.20474" x2="2.08754" y2="15.6233" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00FFA3"/>
                                <stop offset="1" stopColor="#DC1FFF"/>
                              </linearGradient>
                              <linearGradient id="paint1_linear_1310_1587" x1="14.2315" y1="-1.83146" x2="4.19506" y2="16.9966" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00FFA3"/>
                                <stop offset="1" stopColor="#DC1FFF"/>
                              </linearGradient>
                              <linearGradient id="paint2_linear_1310_1587" x1="16.372" y1="-0.512603" x2="6.33548" y2="18.3154" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00FFA3"/>
                                <stop offset="1" stopColor="#DC1FFF"/>
                              </linearGradient>
                            </defs>
                          </svg>
                        </span>
                      </dd>
                    </dl>
                  </div>
                </>
                :
                <>
                  <p className='relative'>
                    <img src="/assets/millipad/under_rectangle_big.png" alt="Coming" />
                    <span className='text-blue-primary font-semibold text-bodybox-sp md:text-bodybox-pc rounded-5 inline-block bg-gray-box absolute top-2 right-2 py-0.5 px-2'>Coming</span>
                  </p>
                  <div className='p-4 pb-2 md:pb-1.5'>
                    <h4 className=' text-blue-primary font-bungee uppercase leading-none text-h2-sp md:text-h2-pc mb-0.5'>Coming</h4>
                    <p>Coming</p>
                    <p className='h-px bg-gray-boxline opacity-50 mt-3 md:mt-4 mb-2'></p>
                    <dl className='flex justify-between items-end'>
                      <dt className='relative bottom-1'>Total raise</dt>
                      <dd className='text-h2-sp md:text-h2-pc font-bold text-gray-primary'>
                        <span>Coming</span>
                        <span className='inline-block ml-2 relative top-px'>
                          <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.2692 0.922105C3.37706 0.811977 3.52199 0.750031 3.67367 0.750031H17.7124C17.9685 0.750031 18.0966 1.06665 17.9146 1.24905L15.1406 4.07796C15.0327 4.18808 14.8878 4.25003 14.7361 4.25003H0.700774C0.444606 4.25003 0.316522 3.93341 0.498536 3.75101L3.2692 0.922105Z" fill="url(#paint0_linear_1310_1587)"/>
                            <path d="M15.1376 6.42211C15.0298 6.31198 14.8848 6.25003 14.7332 6.25003H0.697844C0.441676 6.25003 0.313592 6.56665 0.495606 6.74905L3.26964 9.57796C3.3775 9.68808 3.52243 9.75003 3.67411 9.75003H17.7128C17.969 9.75003 18.097 9.43341 17.915 9.25101L15.1376 6.42211Z" fill="url(#paint1_linear_1310_1587)"/>
                            <path d="M3.2692 11.9221C3.37706 11.812 3.52199 11.75 3.67367 11.75H17.7124C17.9685 11.75 18.0966 12.0666 17.9146 12.249L15.1406 15.078C15.0327 15.1881 14.8878 15.25 14.7361 15.25H0.700774C0.444606 15.25 0.316522 14.9334 0.498536 14.751L3.2692 11.9221Z" fill="url(#paint2_linear_1310_1587)"/>
                            <defs>
                              <linearGradient id="paint0_linear_1310_1587" x1="12.124" y1="-3.20474" x2="2.08754" y2="15.6233" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00FFA3"/>
                                <stop offset="1" stopColor="#DC1FFF"/>
                              </linearGradient>
                              <linearGradient id="paint1_linear_1310_1587" x1="14.2315" y1="-1.83146" x2="4.19506" y2="16.9966" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00FFA3"/>
                                <stop offset="1" stopColor="#DC1FFF"/>
                              </linearGradient>
                              <linearGradient id="paint2_linear_1310_1587" x1="16.372" y1="-0.512603" x2="6.33548" y2="18.3154" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00FFA3"/>
                                <stop offset="1" stopColor="#DC1FFF"/>
                              </linearGradient>
                            </defs>
                          </svg>
                        </span>
                      </dd>
                    </dl>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </section>
      <section className='bg-gray-box pt-6 md:pt-14 pb-5 md:pb-6 px-3/100'>
        <div className='max-w-1110 mx-auto'>
          <h3 className='font-bungee text-center text-h1-sp md:text-h1-pc text-blue-primary mb-4 md:mb-6 uppercase'>funded projects</h3>
          <ul className='flex flex-wrap justify-center'>
            {getDataMillipads !== null && handleLoadClosedPool()}
          </ul>
          <ul className='flex justify-center mt-6 md:mt-9'>
            <li className='cursor-pointer transition-all hover:opacity-70 mr-4'>
              <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.0879 7L1.46289 7" stroke="#f9f9f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel"/>
                <path d="M6.41309 1.02499L1.27559 6.16249C1.04277 6.39669 0.912095 6.71351 0.912095 7.04374C0.912095 7.37397 1.04277 7.69078 1.27559 7.92499L6.27559 12.925" stroke="#f9f9f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel"/>
              </svg>
            </li>
            <li className='cursor-pointer transition-all hover:opacity-70'>
              <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.912109 7H20.5371" stroke="#f9f9f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel"/>
                <path d="M15.5869 12.975L20.7244 7.83751C20.9572 7.60331 21.0879 7.28649 21.0879 6.95626C21.0879 6.62603 20.9572 6.30921 20.7244 6.07501L15.7244 1.07501" stroke="#f9f9f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel"/>
              </svg>
            </li>
          </ul>
        </div>
      </section>
      <section className='py-7 md:pt-24 md:pb-16 px-3/100 mb-14 md:mb-20'>
        <div className='max-w-875 mx-auto'>
          <h3 className='font-bungee text-center text-h1-sp md:text-h1-pc text-blue-primary mb-8 md:mb-10 uppercase'>About MILLIGO</h3>
          <div className='rounded-5 bg-gray-box py-4 md:py-6'>
            <ul className='grid grid-cols-1 md:grid-cols-3 md:gap-y-4 px-3/100 md:px-0'>
              <li className='col-span-1 pb-3 md:pb-0 md:px-4 border-b md:border-b-0 border-solid border-gray-boxline-50'>
                <p className='text-pink-secondary font-bold text-h3-sp md:text-h3-pc md:mb-2'>Highly Vetted Projects</p>
                <p>Get access to top projects’ IGO across multi-blockchain</p>
              </li>
              <li className='col-span-1 py-3 md:py-0 md:px-4 border-b md:border-b-0 md:border-l md:border-r border-solid border-gray-boxline-50'>
                <p className='text-pink-secondary font-bold text-h3-sp md:text-h3-pc md:mb-2'>Fair</p>
                <p>With The MILLIONSY VRF, all users have an equal chance to win a whitelist spot.</p>
              </li>
              <li className='col-span-1 py-3 md:py-0 md:px-4 border-b md:border-b-0 border-solid border-gray-boxline-50'>
                <p className='text-pink-secondary font-bold text-h3-sp md:text-h3-pc md:mb-2'>Multi-chain support</p>
                <p>MILLIGO is now available on Solana and it will soon be accessible on BSC, other platforms.</p>
              </li>
              <li className='col-span-1 py-3 md:py-0 md:px-4 border-b md:border-b-0 border-solid border-gray-boxline-50'>
                <p className='text-pink-secondary font-bold text-h3-sp md:text-h3-pc'>How to participate?</p>
                <p><a href="https://docs.millionsy.io/milligo/how-to-participate" target={`_blank`} className='text-bodybox-sp md:text-bodybox-pc text-blue-secondary underline transition-all hover:opacity-70'>Read full article</a></p>
              </li>
              <li className='col-span-1 py-3 md:py-0 md:px-4 border-b md:border-b-0 md:border-l md:border-r border-solid border-gray-boxline-50'>
                <p className='text-pink-secondary font-bold text-h3-sp md:text-h3-pc'>How to use NFT for more slots?</p>
                <p><a href="https://docs.millionsy.io/nft-tickets/introduction" target={`_blank`} className='text-bodybox-sp md:text-bodybox-pc text-blue-secondary underline transition-all hover:opacity-70'>Read full article</a></p>
              </li>
              <li className='col-span-1 pt-3 md:pt-0 md:px-4'>
                <p className='text-pink-secondary font-bold text-h3-sp md:text-h3-pc'>FAQ</p>
                <p><a href="https://docs.millionsy.io/milligo/faq" target={`_blank`} className='text-bodybox-sp md:text-bodybox-pc text-blue-secondary underline transition-all hover:opacity-70'>Read full article</a></p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Footer></Footer>
      <ModalContent dataGiveFromWallet={dataGiveFromWallet} playerData={playerData.data} dataModal={dataModal.data} dataGiveFromModal={dataGiveFromModal}></ModalContent>
    </>
  )
}
export default MILLIGO;