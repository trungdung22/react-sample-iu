import { Tab, Tabs, useTheme } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import Footer from 'components/astoms/footer';
import Header from 'components/astoms/header';
import ModalContent from 'components/astoms/modalSection';
import Star from 'components/astoms/star';
import { fetchPlayerAccount } from 'lib/utilities/utils';
import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import useStyles from './styles';
import SwipeableViews from 'react-swipeable-views';
import { useWindowSize } from 'data/constants';

const NFT: React.FC = () => {
  const classes = useStyles();
  const size = useWindowSize();
  const [notification, setNotification] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isShowPopupDesktop, setIsShowPopupDesktop] = useState(false);
  const [tab, setTab] = useState('all');
  const [value, setValue] = React.useState(0);
  const [valueInputSearch, setValueInputSearch] = React.useState('');

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

  const dataGiveFromModal = (getDataModalToLottery: any) => {
    setDataModal({
      data: getDataModalToLottery,
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

  const handleResetDataPopupTicket = () => {
    setIsShowPopupDesktop(false);
  }

  window.addEventListener('resize', function() {
    if (size.width > 767) {
      setIsMobile(false);
      setValue(0);
    } else {
      setIsMobile(true);
      setIsShowPopupDesktop(false);
    }
  });
  return (
    <>
      <Star></Star>
      <Header playerData={playerData.data} dataGiveFromHeader={dataGiveFromHeader}></Header>
      
      <SwipeableViews
        index={value}
        disabled={true}
        animateHeight={isMobile ? true : false}
        animateTransitions={true}
        ignoreNativeScroll={true}
      >
        <section>
          {
            notification && 
            <>
              <div className='border-b font-lexend px-3/100'>
                <div className='max-w-1446 mx-auto my-4 md:my-14 relative'>
                  <div className='max-w-1060 mx-auto'>
                    <h4 className='font-bungee text-20 md:text-32 text-blue-17F0FF leading-7 md:leading-9 mb-2 md:mb-4 pr-4'>The first lifetime<br className='block md:hidden' /> lottery ticket ever in<br className='block md:hidden' /> the world!</h4>
                    <p className='text-gray-EBEBEB text-justify'>NFT tickets are used for the Lottery platform and MILLIGO by MILLIONSY. When you buy a 3-degit NFT ticket, you can participate in all MILLIONSY draws for life with the highest prize of Match 3. Similarly, when you hold a 6-digit NFT ticket, you have the right to draw in the entire Match 3 to Match 6. Every NFT ticket has a unique code. NFT holders will be slotted to participate in IGO rounds on the MILLIGO platform. And MORE for the lifetime benefit in all MILLIONSY platform.</p>
                  </div>
                  <p className='absolute top-0 right-0 transition-all hover:opacity-70 cursor-pointer w-3.5 md:w-auto'
                    onClick={() => setNotification(false)}
                  >
                    <svg className='w-full' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.0001 18.3334C14.6025 18.3334 18.3334 14.6024 18.3334 10C18.3334 5.39765 14.6025 1.66669 10.0001 1.66669C5.39771 1.66669 1.66675 5.39765 1.66675 10C1.66675 14.6024 5.39771 18.3334 10.0001 18.3334Z" stroke="#EBEBEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel"/>
                      <path d="M13.1085 13.0501L7.2168 7.15839" stroke="#EBEBEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel"/>
                      <path d="M7.2168 13.0501L13.1085 7.15839" stroke="#EBEBEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel"/>
                    </svg>
                  </p>
                </div>
              </div>
              <p className='h-px bg-gray-575757 opacity-50 w-full'></p>
            </>
          }
          <div className='font-lexend px-3/100'>
            <div className='max-w-1060 mx-auto py-5 md:py-12 lg:py-12'>
              <div className='flex flex-col-reverse lg:flex-row justify-between items-end lg:items-center'>
                <ul className='flex justify-between items-center md:justify-start w-full rounded-5'>
                  <li className={`justify-center h-32px md:h-34px px-1 screen475:px-3 mr-1 md:mr-3 lg:mr-5 rounded-4 md:rounded-5 flex w-1/6 lg:w-auto items-center border border-solid border-pink-8C24BF text-center text-white cursor-pointer transition-all hover:bg-pink-8C24BF font-semibold text-10 md:text-12 ${ tab === 'all' ? 'bg-pink-8C24BF' : '' }`}
                    onClick={() => setTab('all')}
                  >All</li>
                  <li className={`justify-center h-32px md:h-34px px-1 screen475:px-3 mr-1 md:mr-3 lg:mr-5 rounded-4 md:rounded-5 flex w-1/6 lg:w-auto items-center border border-solid border-pink-8C24BF text-center text-white cursor-pointer transition-all hover:bg-pink-8C24BF font-semibold text-10 md:text-12 ${ tab === 'match-3' ? 'bg-pink-8C24BF' : '' }`}
                    onClick={() => setTab('match-3')}
                  >Match 3</li>
                  <li className={`justify-center h-32px md:h-34px px-1 screen475:px-3 mr-1 md:mr-3 lg:mr-5 rounded-4 md:rounded-5 flex w-1/6 lg:w-auto items-center border border-solid border-pink-8C24BF text-center text-white cursor-pointer transition-all hover:bg-pink-8C24BF font-semibold text-10 md:text-12 ${ tab === 'match-4' ? 'bg-pink-8C24BF' : '' }`}
                    onClick={() => setTab('match-4')}
                  >Match 4</li>
                  <li className={`justify-center h-32px md:h-34px px-1 screen475:px-3 mr-1 md:mr-3 lg:mr-5 rounded-4 md:rounded-5 flex w-1/6 lg:w-auto items-center border border-solid border-pink-8C24BF text-center text-white cursor-pointer transition-all hover:bg-pink-8C24BF font-semibold text-10 md:text-12 ${ tab === 'match-5' ? 'bg-pink-8C24BF' : '' }`}
                    onClick={() => setTab('match-5')}
                  >Match 5</li>
                  <li className={`justify-center h-32px md:h-34px px-1 screen475:px-3 mr-1 md:mr-3 lg:mr-5 rounded-4 md:rounded-5 flex w-1/6 lg:w-auto items-center border border-solid border-pink-8C24BF text-center text-white cursor-pointer transition-all hover:bg-pink-8C24BF font-semibold text-10 md:text-12 ${ tab === 'match-6' ? 'bg-pink-8C24BF' : '' }`}
                    onClick={() => setTab('match-6')}
                  >Match 6</li>
                  <li className={`justify-center h-32px md:h-34px px-1 screen475:px-3 lg:px-4 rounded-4 md:rounded-5 flex w-1/6 lg:w-auto items-center border border-solid border-pink-8C24BF text-center text-white cursor-pointer transition-all hover:bg-pink-8C24BF font-semibold text-10 md:text-12 ${ tab === 'your-nfts' ? 'bg-pink-8C24BF' : '' }`}
                    onClick={() => setTab('your-nfts')}
                  >Yours</li>
                </ul>
                <div className='relative sm:max-w-230 w-full mb-5 lg:mb-0'>
                  <p>
                    <input
                      placeholder='You can try "010203"'
                      value={valueInputSearch}
                      onKeyPress={(event) => {
                        if (!/[0-9]|[#]/.test(event.key)) {
                          event.preventDefault();
                        }
                        if (/[#]/.test(event.key) && (event.currentTarget.value.indexOf('#') > -1 || parseInt(event.currentTarget.value) > -1)) {
                          event.preventDefault();
                        }
                      }}
                      onChange={(event) => {
                        setValueInputSearch(event.currentTarget.value);
                      }}
                      onKeyDown={event => {
                        if (event.keyCode === 27) {
                          setValueInputSearch('');
                        }
                      }}
                      className={`text-white placeholder-white bg-transparent font-light pr-10 outline-none h-32px md:h-34px leading-normal w-full border border-solid rounded-5 md:rounded-3 search-nft ${valueInputSearch !== '' ? 'border-pink-8C24BF pl-4' : 'border-gray-B4B4B4-80 pl-10 lg:pl-4'}`}
                    />
                  </p>
                  {
                    valueInputSearch !== ''
                    ?
                    <p className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          setValueInputSearch('');
                        }}
                      >
                        <path d="M-3.27835e-07 7.5C-5.08894e-07 11.6421 3.35786 15 7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 -1.46777e-07 7.5 -3.27835e-07C3.35786 -5.08894e-07 -1.46777e-07 3.35786 -3.27835e-07 7.5Z" fill="#B4B4B4"/>
                        <path d="M4.75512 10.2976L10.0576 4.99512" stroke="white" strokeLinecap="round" strokeLinejoin="bevel"/>
                        <path d="M4.75512 4.99512L10.0576 10.2976" stroke="white" strokeLinecap="round" strokeLinejoin="bevel"/>
                      </svg>
                    </p>
                    :
                    <p className='absolute top-1/2 left-4 lg:left-auto lg:right-4 transform -translate-y-1/2 cursor-pointer'>
                      <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.61865 11.2187C11.0349 11.2187 12.9937 9.25996 12.9937 6.84372C12.9937 4.42747 11.0349 2.46872 8.61865 2.46872C6.20241 2.46872 4.24365 4.42747 4.24365 6.84372C4.24365 9.25996 6.20241 11.2187 8.61865 11.2187Z" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="bevel"/>
                        <path d="M5.45005 10.0999L2.5188 13.0312" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="bevel"/>
                      </svg>
                    </p>
                  }
                </div>
              </div>
              <div className='max-w-1060 mx-auto'>
                <p className={`text-blue-ADFAFF mt-5 md:mt-10 ${true ? 'hidden' : ''}`}>There is nothing here. Try something else!</p>
                <div>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 lg:gap-5 mt-5 md:mt-12'>
                    <div className='col-span-1 bg-gray-151515 text-gray-EBEBEB rounded-5 md:rounded-10 border border-solid border-gray-A9A9A9-50 p-1 md:p-2 cursor-pointer transition-all hover:opacity-70'
                      onClick={() => {
                        if (size.width < 768) {
                          setValue(1);
                          window.scrollTo(0, 0);
                        } else {
                          setIsShowPopupDesktop(true);
                        }
                      }}
                    >
                      <p className='bg-no-repeat bg-center bg-cover h-24 sm:h-36 lg:h-48 rounded-5 md:rounded-10' style={{'backgroundImage': 'url("/assets/nft/under_popup.png")'}}></p>
                      <div className='mt-1 md:mt-2.5'>
                        <p className='text-16 md:text-20 text-blue-17F0FF font-bungee leading-6 md:mb-1'>#051733</p>
                        <p className='text-10 md:text-14'><span className='inline-block mr-1 font-semibold'>Lottery:</span>Lifetime drawing with match 3.</p>
                        <p className='text-10 md:text-14'><span className='uppercase inline-block mr-1 font-semibold'>MILLIGO:</span>1 slot for every IGO round.</p>
                        <p className='w-full h-px bg-gray-A9A9A9-50 mt-2'></p>
                        <p className='flex justify-between items-center font-bold text-14 md:text-18 text-blue-17F0FF pt-1 md:pt-2'><span className='text-10 md:text-14 font-light text-gray-EBEBEB'>~50$</span><span>0.27 SOL</span></p>
                      </div>
                    </div>
                    <div className='col-span-1 bg-gray-151515 text-gray-EBEBEB rounded-5 md:rounded-10 border border-solid border-gray-A9A9A9-50 p-1 md:p-2 cursor-pointer transition-all hover:opacity-70'
                      onClick={() => {
                        if (size.width < 768) {
                          setValue(1);
                          window.scrollTo(0, 0);
                        } else {
                          setIsShowPopupDesktop(true);
                        }
                      }}
                    >
                      <p className='bg-no-repeat bg-center bg-cover h-24 sm:h-36 lg:h-48 rounded-5 md:rounded-10' style={{'backgroundImage': 'url("/assets/nft/under_popup.png")'}}></p>
                      <div className='mt-1 md:mt-2.5'>
                        <p className='text-16 md:text-20 text-blue-17F0FF font-bungee leading-6 md:mb-1'>#05173341</p>
                        <p className='text-10 md:text-14'><span className='inline-block mr-1 font-semibold'>Lottery:</span>Lifetime drawing with match 4 &amp; 3.</p>
                        <p className='text-10 md:text-14'><span className='uppercase inline-block mr-1 font-semibold'>MILLIGO:</span>4 slots for every IGO round.</p>
                        <p className='w-full h-px bg-gray-A9A9A9-50 mt-2'></p>
                        <p className='flex justify-between items-center font-bold text-14 md:text-18 text-blue-17F0FF pt-1 md:pt-2'><span className='text-10 md:text-14 font-light text-gray-EBEBEB'>~50$</span><span>0.27 SOL</span></p>
                      </div>
                    </div>
                    <div className='col-span-1 bg-gray-151515 text-gray-EBEBEB rounded-5 md:rounded-10 border border-solid border-gray-A9A9A9-50 p-1 md:p-2 cursor-pointer transition-all hover:opacity-70'
                      onClick={() => {
                        if (size.width < 768) {
                          setValue(1);
                          window.scrollTo(0, 0);
                        } else {
                          setIsShowPopupDesktop(true);
                        }
                      }}
                    >
                      <p className='bg-no-repeat bg-center bg-cover h-24 sm:h-36 lg:h-48 rounded-5 md:rounded-10' style={{'backgroundImage': 'url("/assets/nft/under_popup.png")'}}></p>
                      <div className='mt-1 md:mt-2.5'>
                        <p className='text-16 md:text-20 text-blue-17F0FF font-bungee leading-6 md:mb-1'>#0517333541</p>
                        <p className='text-10 md:text-14'><span className='inline-block mr-1 font-semibold'>Lottery:</span>Lifetime drawing with match 5, 4 &amp; 3.</p>
                        <p className='text-10 md:text-14'><span className='uppercase inline-block mr-1 font-semibold'>MILLIGO:</span>10 slot for every IGO round.</p>
                        <p className='w-full h-px bg-gray-A9A9A9-50 mt-2'></p>
                        <p className='flex justify-between items-center font-bold text-14 md:text-18 text-blue-17F0FF pt-1 md:pt-2'><span className='text-10 md:text-14 font-light text-gray-EBEBEB'>~50$</span><span>0.27 SOL</span></p>
                      </div>
                    </div>
                    <div className='col-span-1 bg-gray-151515 text-gray-EBEBEB rounded-5 md:rounded-10 border border-solid border-gray-A9A9A9-50 p-1 md:p-2 cursor-pointer transition-all hover:opacity-70'
                      onClick={() => {
                        if (size.width < 768) {
                          setValue(1);
                          window.scrollTo(0, 0);
                        } else {
                          setIsShowPopupDesktop(true);
                        }
                      }}
                    >
                      <p className='bg-no-repeat bg-center bg-cover h-24 sm:h-36 lg:h-48 rounded-5 md:rounded-10' style={{'backgroundImage': 'url("/assets/nft/under_popup.png")'}}></p>
                      <div className='mt-1 md:mt-2.5'>
                        <p className='text-16 md:text-20 text-blue-17F0FF font-bungee leading-6 md:mb-1'>#051733354143</p>
                        <p className='text-10 md:text-14'><span className='inline-block mr-1 font-semibold'>Lottery:</span>Lifetime drawing with match 6, 5, 4 &amp; 3.</p>
                        <p className='text-10 md:text-14'><span className='uppercase inline-block mr-1 font-semibold'>MILLIGO:</span>50 slot for every IGO round.</p>
                        <p className='w-full h-px bg-gray-A9A9A9-50 mt-2'></p>
                        <p className='flex justify-between items-center font-bold text-14 md:text-18 text-blue-17F0FF pt-1 md:pt-2'><span className='text-10 md:text-14 font-light text-gray-EBEBEB'>~50$</span><span>0.27 SOL</span></p>
                      </div>
                    </div>
                    <div className='col-span-1 bg-gray-151515 text-gray-EBEBEB rounded-5 md:rounded-10 border border-solid border-gray-A9A9A9-50 p-1 md:p-2 cursor-pointer transition-all hover:opacity-70'
                      onClick={() => {
                        if (size.width < 768) {
                          setValue(1);
                          window.scrollTo(0, 0);
                        } else {
                          setIsShowPopupDesktop(true);
                        }
                      }}
                    >
                      <p className='bg-no-repeat bg-center bg-cover h-24 sm:h-36 lg:h-48 rounded-5 md:rounded-10' style={{'backgroundImage': 'url("/assets/nft/under_popup.png")'}}></p>
                      <div className='mt-1 md:mt-2.5'>
                        <p className='text-16 md:text-20 text-blue-17F0FF font-bungee leading-6 md:mb-1'>#051733</p>
                        <p className='text-10 md:text-14'><span className='inline-block mr-1 font-semibold'>Lottery:</span>Lifetime drawing with match 3.</p>
                        <p className='text-10 md:text-14'><span className='uppercase inline-block mr-1 font-semibold'>MILLIGO:</span>1 slot for every IGO round.</p>
                        <p className='w-full h-px bg-gray-A9A9A9-50 mt-2'></p>
                        <p className='flex justify-between items-center font-bold text-14 md:text-18 text-blue-17F0FF pt-1 md:pt-2'><span className='text-10 md:text-14 font-light text-gray-EBEBEB'>~50$</span><span>0.27 SOL</span></p>
                      </div>
                    </div>
                    <div className='col-span-1 bg-gray-151515 text-gray-EBEBEB rounded-5 md:rounded-10 border border-solid border-gray-A9A9A9-50 p-1 md:p-2 cursor-pointer transition-all hover:opacity-70'
                      onClick={() => {
                        if (size.width < 768) {
                          setValue(1);
                          window.scrollTo(0, 0);
                        } else {
                          setIsShowPopupDesktop(true);
                        }
                      }}
                    >
                      <p className='bg-no-repeat bg-center bg-cover h-24 sm:h-36 lg:h-48 rounded-5 md:rounded-10' style={{'backgroundImage': 'url("/assets/nft/under_popup.png")'}}></p>
                      <div className='mt-1 md:mt-2.5'>
                        <p className='text-16 md:text-20 text-blue-17F0FF font-bungee leading-6 md:mb-1'>#051733</p>
                        <p className='text-10 md:text-14'><span className='inline-block mr-1 font-semibold'>Lottery:</span>Lifetime drawing with match 3.</p>
                        <p className='text-10 md:text-14'><span className='uppercase inline-block mr-1 font-semibold'>MILLIGO:</span>1 slot for every IGO round.</p>
                        <p className='w-full h-px bg-gray-A9A9A9-50 mt-2'></p>
                        <p className='flex justify-between items-center font-bold text-14 md:text-18 text-blue-17F0FF pt-1 md:pt-2'><span className='text-10 md:text-14 font-light text-gray-EBEBEB'>~50$</span><span>0.27 SOL</span></p>
                      </div>
                    </div>
                    <div className='col-span-1 bg-gray-151515 text-gray-EBEBEB rounded-5 md:rounded-10 border border-solid border-gray-A9A9A9-50 p-1 md:p-2 cursor-pointer transition-all hover:opacity-70'
                      onClick={() => {
                        if (size.width < 768) {
                          setValue(1);
                          window.scrollTo(0, 0);
                        } else {
                          setIsShowPopupDesktop(true);
                        }
                      }}
                    >
                      <p className='bg-no-repeat bg-center bg-cover h-24 sm:h-36 lg:h-48 rounded-5 md:rounded-10' style={{'backgroundImage': 'url("/assets/nft/under_popup.png")'}}></p>
                      <div className='mt-1 md:mt-2.5'>
                        <p className='text-16 md:text-20 text-blue-17F0FF font-bungee leading-6 md:mb-1'>#051733</p>
                        <p className='text-10 md:text-14'><span className='inline-block mr-1 font-semibold'>Lottery:</span>Lifetime drawing with match 3.</p>
                        <p className='text-10 md:text-14'><span className='uppercase inline-block mr-1 font-semibold'>MILLIGO:</span>1 slot for every IGO round.</p>
                        <p className='w-full h-px bg-gray-A9A9A9-50 mt-2'></p>
                        <p className='flex justify-between items-center font-bold text-14 md:text-18 text-blue-17F0FF pt-1 md:pt-2'><span className='text-10 md:text-14 font-light text-gray-EBEBEB'>~50$</span><span>0.27 SOL</span></p>
                      </div>
                    </div>
                    <div className='col-span-1 bg-gray-151515 text-gray-EBEBEB rounded-5 md:rounded-10 border border-solid border-gray-A9A9A9-50 p-1 md:p-2 cursor-pointer transition-all hover:opacity-70'
                      onClick={() => {
                        if (size.width < 768) {
                          setValue(1);
                          window.scrollTo(0, 0);
                        } else {
                          setIsShowPopupDesktop(true);
                        }
                      }}
                    >
                      <p className='bg-no-repeat bg-center bg-cover h-24 sm:h-36 lg:h-48 rounded-5 md:rounded-10' style={{'backgroundImage': 'url("/assets/nft/under_popup.png")'}}></p>
                      <div className='mt-1 md:mt-2.5'>
                        <p className='text-16 md:text-20 text-blue-17F0FF font-bungee leading-6 md:mb-1'>#051733</p>
                        <p className='text-10 md:text-14'><span className='inline-block mr-1 font-semibold'>Lottery:</span>Lifetime drawing with match 3.</p>
                        <p className='text-10 md:text-14'><span className='uppercase inline-block mr-1 font-semibold'>MILLIGO:</span>1 slot for every IGO round.</p>
                        <p className='w-full h-px bg-gray-A9A9A9-50 mt-2'></p>
                        <p className='flex justify-between items-center font-bold text-14 md:text-18 text-blue-17F0FF pt-1 md:pt-2'><span className='text-10 md:text-14 font-light text-gray-EBEBEB'>~50$</span><span>0.27 SOL</span></p>
                      </div>
                    </div>
                    <div className='col-span-1 bg-gray-151515 text-gray-EBEBEB rounded-5 md:rounded-10 border border-solid border-gray-A9A9A9-50 p-1 md:p-2 cursor-pointer transition-all hover:opacity-70'
                      onClick={() => {
                        if (size.width < 768) {
                          setValue(1);
                          window.scrollTo(0, 0);
                        } else {
                          setIsShowPopupDesktop(true);
                        }
                      }}
                    >
                      <p className='bg-no-repeat bg-center bg-cover h-24 sm:h-36 lg:h-48 rounded-5 md:rounded-10' style={{'backgroundImage': 'url("/assets/nft/under_popup.png")'}}></p>
                      <div className='mt-1 md:mt-2.5'>
                        <p className='text-16 md:text-20 text-blue-17F0FF font-bungee leading-6 md:mb-1'>#051733</p>
                        <p className='text-10 md:text-14'><span className='inline-block mr-1 font-semibold'>Lottery:</span>Lifetime drawing with match 3.</p>
                        <p className='text-10 md:text-14'><span className='uppercase inline-block mr-1 font-semibold'>MILLIGO:</span>1 slot for every IGO round.</p>
                        <p className='w-full h-px bg-gray-A9A9A9-50 mt-2'></p>
                        <p className='flex justify-between items-center font-bold text-14 md:text-18 text-blue-17F0FF pt-1 md:pt-2'><span className='text-10 md:text-14 font-light text-gray-EBEBEB'>~50$</span><span>0.27 SOL</span></p>
                      </div>
                    </div>
                    <div className='col-span-1 bg-gray-151515 text-gray-EBEBEB rounded-5 md:rounded-10 border border-solid border-gray-A9A9A9-50 p-1 md:p-2 cursor-pointer transition-all hover:opacity-70'
                      onClick={() => {
                        if (size.width < 768) {
                          setValue(1);
                          window.scrollTo(0, 0);
                        } else {
                          setIsShowPopupDesktop(true);
                        }
                      }}
                    >
                      <p className='bg-no-repeat bg-center bg-cover h-24 sm:h-36 lg:h-48 rounded-5 md:rounded-10' style={{'backgroundImage': 'url("/assets/nft/under_popup.png")'}}></p>
                      <div className='mt-1 md:mt-2.5'>
                        <p className='text-16 md:text-20 text-blue-17F0FF font-bungee leading-6 md:mb-1'>#051733</p>
                        <p className='text-10 md:text-14'><span className='inline-block mr-1 font-semibold'>Lottery:</span>Lifetime drawing with match 3.</p>
                        <p className='text-10 md:text-14'><span className='uppercase inline-block mr-1 font-semibold'>MILLIGO:</span>1 slot for every IGO round.</p>
                        <p className='w-full h-px bg-gray-A9A9A9-50 mt-2'></p>
                        <p className='flex justify-between items-center font-bold text-14 md:text-18 text-blue-17F0FF pt-1 md:pt-2'><span className='text-10 md:text-14 font-light text-gray-EBEBEB'>~50$</span><span>0.27 SOL</span></p>
                      </div>
                    </div>
                    <div className='col-span-1 bg-gray-151515 text-gray-EBEBEB rounded-5 md:rounded-10 border border-solid border-gray-A9A9A9-50 p-1 md:p-2 cursor-pointer transition-all hover:opacity-70'
                      onClick={() => {
                        if (size.width < 768) {
                          setValue(1);
                          window.scrollTo(0, 0);
                        } else {
                          setIsShowPopupDesktop(true);
                        }
                      }}
                    >
                      <p className='bg-no-repeat bg-center bg-cover h-24 sm:h-36 lg:h-48 rounded-5 md:rounded-10' style={{'backgroundImage': 'url("/assets/nft/under_popup.png")'}}></p>
                      <div className='mt-1 md:mt-2.5'>
                        <p className='text-16 md:text-20 text-blue-17F0FF font-bungee leading-6 md:mb-1'>#051733</p>
                        <p className='text-10 md:text-14'><span className='inline-block mr-1 font-semibold'>Lottery:</span>Lifetime drawing with match 3.</p>
                        <p className='text-10 md:text-14'><span className='uppercase inline-block mr-1 font-semibold'>MILLIGO:</span>1 slot for every IGO round.</p>
                        <p className='w-full h-px bg-gray-A9A9A9-50 mt-2'></p>
                        <p className='flex justify-between items-center font-bold text-14 md:text-18 text-blue-17F0FF pt-1 md:pt-2'><span className='text-10 md:text-14 font-light text-gray-EBEBEB'>~50$</span><span>0.27 SOL</span></p>
                      </div>
                    </div>
                    <div className='col-span-1 bg-gray-151515 text-gray-EBEBEB rounded-5 md:rounded-10 border border-solid border-gray-A9A9A9-50 p-1 md:p-2 cursor-pointer transition-all hover:opacity-70'
                      onClick={() => {
                        if (size.width < 768) {
                          setValue(1);
                          window.scrollTo(0, 0);
                        } else {
                          setIsShowPopupDesktop(true);
                        }
                      }}
                    >
                      <p className='bg-no-repeat bg-center bg-cover h-24 sm:h-36 lg:h-48 rounded-5 md:rounded-10' style={{'backgroundImage': 'url("/assets/nft/under_popup.png")'}}></p>
                      <div className='mt-1 md:mt-2.5'>
                        <p className='text-16 md:text-20 text-blue-17F0FF font-bungee leading-6 md:mb-1'>#051733</p>
                        <p className='text-10 md:text-14'><span className='inline-block mr-1 font-semibold'>Lottery:</span>Lifetime drawing with match 3.</p>
                        <p className='text-10 md:text-14'><span className='uppercase inline-block mr-1 font-semibold'>MILLIGO:</span>1 slot for every IGO round.</p>
                        <p className='w-full h-px bg-gray-A9A9A9-50 mt-2'></p>
                        <p className='flex justify-between items-center font-bold text-14 md:text-18 text-blue-17F0FF pt-1 md:pt-2'><span className='text-10 md:text-14 font-light text-gray-EBEBEB'>~50$</span><span>0.27 SOL</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-6 md:mt-10 pb-6 md:pb-0'>
                  <Pagination count={10} showFirstButton showLastButton className={classes.root} siblingCount={1} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div>
          <p className='px-3/100 py-5'
            onClick={() => {
              setValue(0);
            }}
          >
            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 9C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7V9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM17 7L1 7V9L17 9V7Z" fill="#F9F9F9"/>
            </svg>
          </p>
          <div className='grid grid-cols-1 gap-8'>
            <div className='col-span-1'>
              <p><img src="/assets/nft/under_popup.png" alt="" className='w-full' /></p>
              <div className='px-3/100 py-5'>
                <p className='text-20 font-bungee text-blue-17F0FF leading-8 mb-1'>#051733</p>
                <div>
                  <p className='text-12 leading-4'><span className='font-bold inline-block mr-1'>Lottery:</span>Lifetime drawing with match 3.</p>
                  <p className='text-12 leading-4'><span className='font-bold uppercase inline-block mr-1'>MILLIGO:</span>1 slot for every IGO round.</p>
                </div>
                <p className='bg-gray-A9A9A9 opacity-50 h-px mt-5 mb-3'></p>
                <div className='flex justify-between items-end'>
                  <p><span className='text-20 text-blue-17F0FF font-bold leading-6 mr-2'>~0.27 SOL</span><span>(50$)</span></p>
                  <p className='text-12 text-blue-0B7880 font-semibold bg-blue-17F0FF h-32px w-20 rounded-4 inline-flex justify-center items-center transition-all cursor-pointer hover:opacity-70'>Buy ticket</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwipeableViews>
      <Footer></Footer>
      <ModalContent dataModal={dataModal.data} playerData={playerData.data}
          dataGiveFromModal={dataGiveFromModal} dataGiveFromWallet={dataGiveFromWallet}></ModalContent>
      {
        isShowPopupDesktop &&
        <div className='fixed top-0 left-0 z-1000 h-full w-full'>
          <div className='bg-black opacity-50 h-full w-full z-100 top-0 left-0 absolute' onClick={handleResetDataPopupTicket}></div>
          <div className='w-full absolute z-1000 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-151515 max-w-600 rounded-10 border border-solid border-gray-575757-50'>
            <p className='flex justify-end px-5 py-4 bg-gray-575757-30' onClick={handleResetDataPopupTicket}>
              <span className='inline-block transition-all cursor-pointer hover:opacity-70'>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.75592 1.42259C10.0814 1.09715 10.0814 0.569515 9.75592 0.244078C9.43049 -0.0813592 8.90285 -0.0813592 8.57741 0.244078L5 3.82149L1.42259 0.244078C1.09715 -0.0813584 0.569515 -0.0813584 0.244078 0.244079C-0.0813592 0.569515 -0.0813592 1.09715 0.244078 1.42259L3.82149 5L0.244078 8.57741C-0.0813592 8.90285 -0.0813592 9.43048 0.244078 9.75592C0.569515 10.0814 1.09715 10.0814 1.42259 9.75592L5 6.17851L8.57741 9.75592C8.90285 10.0814 9.43049 10.0814 9.75592 9.75592C10.0814 9.43049 10.0814 8.90285 9.75592 8.57741L6.17851 5L9.75592 1.42259Z" fill="white"/>
                </svg>
              </span>
            </p>
            <p><img src="/assets/nft/under_popup.png" alt="" className='w-full' /></p>
            <div className='px-5 py-3'>
              <div className='flex flex-col justify-center'>
                <p className='text-20 font-bungee text-blue-17F0FF mb-1'>#051733</p>
                <div>
                  <p className='text-14 leading-4'><span className='font-bold inline-block mr-1'>Lottery:</span>Lifetime drawing with match 3.</p>
                  <p className='text-14 leading-4'><span className='font-bold uppercase inline-block mr-1'>MILLIGO:</span>1 slot for every IGO round.</p>
                </div>
              </div>
              <p className='bg-gray-575757 opacity-50 h-px mt-4 mb-5'></p>
              <div className='flex justify-between items-center gap-4'>
                <p><span className='text-20 text-blue-17F0FF font-bold leading-6 mr-2'>~0.27 SOL</span><span>(50$)</span></p>
                <p className='text-12 text-blue-0B7880 font-semibold bg-blue-17F0FF w-92 h-34px rounded-4 inline-flex justify-center items-center transition-all cursor-pointer hover:opacity-70'>Buy ticket</p>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default NFT