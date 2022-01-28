import { Tab, Tabs, useTheme } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import Footer from 'components/astoms/footer';
import Header from 'components/astoms/header';
import ModalContent from 'components/astoms/modalSection';
import Star from 'components/astoms/star';
import { fetchPlayerAccount, getGameBoardInfo, insertNFTTransaction, transferNFTOnwerShip } from 'lib/utilities/utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import useStyles from './styles';
import SwipeableViews from 'react-swipeable-views';
import { useWindowSize } from 'data/constants';
import Ticket from './ticket';
import { HOST_NAME } from 'data/constants';
import { sendTxUsingExternalSignature, UseWallet } from '../../../lib/program/wallet-provider';
import { buyNFTTicket, transferNFTOwnerShip } from '../../../lib/program/lottery-commands';
import { buildParamRequest, splitArrayIntoChunksOfLen } from 'lib/utilities/format';
import debounce from 'lodash.debounce';
import { NFTTypes } from 'lib/program/state';
import ViewSubmit from 'components/astoms/modalSection/ViewSubmit';
import { MilliNFTAccountDataLayout } from './ticket';

const NFT: React.FC = () => {
  const [isShowNotification, setIsShowNotification] = useState(true);
  const classes = useStyles();
  const size = useWindowSize();
  const searchInputEl = useRef(null);
  const [showTooltipConnectDesktop, setShowTooltipConnectDesktop] = useState(false);
  const [showTooltipConnectMobile, setShowTooltipConnectMobile] = useState(false);
  // avoid first update when access page
  const firstUpdate = useRef(true);
  const [isHadread, setIsHadread] = useState(false);
  const [isBuyingNFT, setIsBuyingNFT] = useState(false);
  const [isConfirmTransfer, setIsConfirmTransfer] = useState(false);
  const [tab, setTab] = useState(null);
  const [valueInputSearch, setValueInputSearch] = React.useState('');
  const [valueInputAddress, setValueInputAddress] = React.useState('');

  const [filteredNftTickets, setFilteredNftTickets] = useState([]);
  const [ticketEntries, setTicketEntries] = useState({
    totalPages: 0,
    currentPage: 1,
    perPage: 0,
    tickets: []
  });

  const [queryParam, setQueryParam] = useState({
    isSole: false,
    page: 1,
    perPage: 10
  });
  const [programInfo, setProgramInfo] = useState({
    programId: '',
    ownerPubkey: ''
    // gameStatus: item.gameStatus,
    // gamePubkey: item.gamePubkey,
    // gameBalanceSol: item.gameBalanceSOL,
    // gameBalanceUSDT: item.gameBalanceUSDT,
    // gameRollNums: item.gameRollNums
  });

  const [selectedTicketData, setSelectedTicketData] = useState<MilliNFTAccountDataLayout>();


  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    let filter: any;
    filter = {
      isSole: false,
      page: 1,
      perPage: 10
    }
    if (valueInputSearch) {
      let filterRollNums = [];
      let rollNum = splitArrayIntoChunksOfLen(valueInputSearch, 2);
      rollNum.map(num => parseInt(num));
      rollNum.forEach((num, idx) => {
        filterRollNums.push(num);
      })
      filter = {
        ...filter,
        roll_nums: filterRollNums
      };
    }
    switch (tab) {
      case 'your-nfts':
        filter = {
          ...filter,
          isSole: true,
          user_pubkey: playerData.data.publicKey
        };
        break;
      default:
        if (tab == null)
          break;
        filter = {
          ...filter,
          nft_type: tab.toLowerCase()
        };
    }
    setQueryParam(filter);
  }, [valueInputSearch, tab]);

  useEffect(() => {
    fetchTicketsEntries();
  }, [queryParam]);

  const fetchTicketsEntries = () => {
    const queryParams = buildParamRequest(queryParam);
    fetch(`${HOST_NAME}/api/nft-ticket?${queryParams}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(async res => {
      
      const response_data = await res.json();

      // check for error response
      if (!res.ok) {
        // get error message from body or default to response statusText
        const error = (response_data && response_data.message) || res.statusText;
        return Promise.reject(error);
      }

      setTicketEntries({
        totalPages: response_data.totalPages,
        currentPage: response_data.currentPage,
        perPage: response_data.perPage,
        tickets: response_data.items
      });
      setFilteredNftTickets(response_data.items);
    }).catch(err => {
      console.log(err);
    })
  }

  const [notification, setNotification] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isShowPopupDesktop, setIsShowPopupDesktop] = useState(false);
  const [isShowPopupResults, setIsShowPopupResults] = useState('');

  const [swipeableViewsIndex, setSwipeableViewsIndex] = useState(0); // swipable view


  const [playerData, setPlayerData] = useState({
    data: {
      is_connect: false,
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
        getDataWallet.adapter_type,
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

  const onClearSearchInput = (event) => {
    setValueInputSearch('');
    searchInputEl.current.value = '';
  }

  const onClearAddressInput = (event) => {
    setValueInputAddress('');
  }

  const handleOnChangeSearchInput = (event) => {
    let searchValue = event.target.value;
    if (searchValue.length <= 12)
      setValueInputSearch(searchValue);
  }

  const debouncedChangeHandler = useCallback(
    debounce(handleOnChangeSearchInput, 300)
    , []);


  const handlers = useSwipeable({
    onSwipedRight: () => {
      setSwipeableViewsIndex(1);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const onBuyNFTTicket = () => {
    if (!playerData.data.is_connect) {
      console.log('wallet not connected')
      return;
    }
    setIsBuyingNFT(true);
    buyNFTTicket(programInfo.programId,
      selectedTicketData.milli_nft_pubkey,
      selectedTicketData.user_pubkey,
      selectedTicketData.token_account_pubkey,
      selectedTicketData.mint_pubkey, selectedTicketData.price,
      playerData.data.adapter_type
    ).then(async buyer_tokenAccount => {
      await insertNFTTransaction(
        playerData.data.publicKey,
        selectedTicketData.mint_pubkey,
        buyer_tokenAccount,
        selectedTicketData.milli_nft_pubkey,
      );
      setIsShowPopupDesktop(false);
      setIsBuyingNFT(false);
      setSwipeableViewsIndex(0);
      setIsShowPopupResults('success');
      fetchTicketsEntries();
      console.log('purchase success');
    }).catch(err => {
      setIsShowPopupDesktop(false);
      setIsShowPopupResults('error');
      setIsBuyingNFT(false);
      console.log(err);
      console.log('purchase fail');
    });
    // setDataModal({
    //   data: {
    //     ...dataModal.data,
    //     flag_submit: true,
    //   }
    // })
  }

  useEffect(() => {
    // document.body.style.overflowY = 'hidden'
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

      getGameBoardInfo().then(item => setProgramInfo({
        programId: item.programId,
        ownerPubkey: item.ownerPubkey
        // gameStatus: item.gameStatus,
        // gamePubkey: item.gamePubkey,
        // gameBalanceSol: item.gameBalanceSOL,
        // gameBalanceUSDT: item.gameBalanceUSDT,
        // gameRollNums: item.gameRollNums
      }));
    }
  }, [])

  const handleResetDataPopupTicket = () => {
    setIsShowPopupDesktop(false);
  }

  window.addEventListener('resize', function () {
    if (size.width > 767) {
      setSwipeableViewsIndex(0);
      setIsMobile(false);
    } else {
      setIsMobile(true);
      setIsShowPopupDesktop(false);
    }
  });

  useEffect(() => {
    if(isShowPopupDesktop || isShowNotification || isShowPopupResults !== '') {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [isShowPopupDesktop, isShowNotification, isShowPopupResults])

  

  const onChangePagination = (event, toSetpageNo) => {
    // console.log('asdasdasdasd')
    setQueryParam({
      ...queryParam,
      page: toSetpageNo
    });
  }

  const handleTransferNFT = () => {
    if(isConfirmTransfer && valueInputAddress) {
      console.log('true');
      transferNFTOwnerShip(programInfo.programId,
        selectedTicketData.milli_nft_pubkey,
        selectedTicketData.token_account_pubkey,
        valueInputAddress,
        playerData.data.adapter_type
      ).then(async () => {
        await transferNFTOnwerShip(
          selectedTicketData.mint_pubkey,
          valueInputAddress
        );
        setIsShowPopupDesktop(false);
        setIsBuyingNFT(false);
        setSwipeableViewsIndex(0);
        setIsShowPopupResults('success');
        fetchTicketsEntries();
        console.log('transfer success');
      }).catch(async err => {
        setIsShowPopupDesktop(false);
        setIsShowPopupResults('error');
        setIsBuyingNFT(false);
        console.log(err);
        console.log('transfer fail');
      });
    }
  }

  return (
    <>
      <Header playerData={playerData.data} dataGiveFromHeader={dataGiveFromHeader}></Header>
      <SwipeableViews
        index={swipeableViewsIndex}
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
                    <h4 className='font-bungee text-h1-sp md:text-h1-pc text-blue-primary leading-7 md:leading-9 mb-2 md:mb-4 pr-4'>The first lifetime<br className='block md:hidden' /> lottery ticket ever in<br className='block md:hidden' /> the world!</h4>
                    <p className='text-gray-EBEBEB text-justify'>NFT tickets are used for the Lottery platform and MILLIGO by MILLIONSY. When you buy a 3-degit NFT ticket, you can participate in all MILLIONSY draws for life with the highest prize of Match 3. Similarly, when you hold a 6-digit NFT ticket, you have the right to draw in the entire Match 3 to Match 6. Every NFT ticket has a unique code. NFT holders will be slotted to participate in IGO rounds on the MILLIGO platform. And MORE for the lifetime benefit in all MILLIONSY platform.</p>
                  </div>
                  <p className='absolute top-0 right-0 transition-all hover:opacity-70 cursor-pointer w-3.5 md:w-auto'
                    onClick={() => setNotification(false)}
                  >
                    <svg className='w-full' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.0001 18.3334C14.6025 18.3334 18.3334 14.6024 18.3334 10C18.3334 5.39765 14.6025 1.66669 10.0001 1.66669C5.39771 1.66669 1.66675 5.39765 1.66675 10C1.66675 14.6024 5.39771 18.3334 10.0001 18.3334Z" stroke="#EBEBEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel" />
                      <path d="M13.1085 13.0501L7.2168 7.15839" stroke="#EBEBEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel" />
                      <path d="M7.2168 13.0501L13.1085 7.15839" stroke="#EBEBEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel" />
                    </svg>
                  </p>
                </div>
              </div>
              <p className='h-px bg-gray-boxline opacity-50 w-full'></p>
            </>
          }
          <div className='font-lexend px-3/100'>
            <div className='max-w-1060 mx-auto py-5 md:py-12 lg:py-12'>
              <div className='flex flex-col-reverse lg:flex-row justify-between items-end lg:items-center'>
                <ul className='flex justify-between items-center md:justify-start w-full rounded-5'>
                  <li className={`justify-center h-32px md:h-34px px-1 screen475:px-3 mr-1 md:mr-3 lg:mr-5 rounded-4 md:rounded-5 flex w-1/6 lg:w-auto items-center text-center text-gray-primary cursor-pointer transition-all font-semibold text-bodybox-sp md:text-bodybox-pc ${size.width > 767 ? 'hover:bg-gray-lightbox' : ''} ${tab === null ? 'bg-pink-primary' : ''}`}
                    onClick={() => setTab(null)}
                  >All</li>
                  <li className={`justify-center h-32px md:h-34px px-1 screen475:px-3 mr-1 md:mr-3 lg:mr-5 rounded-4 md:rounded-5 flex w-1/6 lg:w-auto items-center text-center text-gray-primary cursor-pointer transition-all font-semibold text-bodybox-sp md:text-bodybox-pc ${size.width > 767 ? 'hover:bg-gray-lightbox' : ''} ${tab === NFTTypes[0] ? 'bg-pink-primary' : ''}`}
                    onClick={() => setTab(NFTTypes[0])}
                  >3-match</li>
                  <li className={`justify-center h-32px md:h-34px px-1 screen475:px-3 mr-1 md:mr-3 lg:mr-5 rounded-4 md:rounded-5 flex w-1/6 lg:w-auto items-center text-center text-gray-primary cursor-pointer transition-all font-semibold text-bodybox-sp md:text-bodybox-pc ${size.width > 767 ? 'hover:bg-gray-lightbox' : ''} ${tab === NFTTypes[1] ? 'bg-pink-primary' : ''}`}
                    onClick={() => setTab(NFTTypes[1])}
                  >4-match</li>
                  <li className={`justify-center h-32px md:h-34px px-1 screen475:px-3 mr-1 md:mr-3 lg:mr-5 rounded-4 md:rounded-5 flex w-1/6 lg:w-auto items-center text-center text-gray-primary cursor-pointer transition-all font-semibold text-bodybox-sp md:text-bodybox-pc ${size.width > 767 ? 'hover:bg-gray-lightbox' : ''} ${tab === NFTTypes[2] ? 'bg-pink-primary' : ''}`}
                    onClick={() => setTab(NFTTypes[2])}
                  >5-match</li>
                  <li className={`justify-center h-32px md:h-34px px-1 screen475:px-3 mr-1 md:mr-3 lg:mr-5 rounded-4 md:rounded-5 flex w-1/6 lg:w-auto items-center text-center text-gray-primary cursor-pointer transition-all font-semibold text-bodybox-sp md:text-bodybox-pc ${size.width > 767 ? 'hover:bg-gray-lightbox' : ''} ${tab === NFTTypes[3] ? 'bg-pink-primary' : ''}`}
                    onClick={() => setTab(NFTTypes[3])}
                  >6-match</li>
                  <li className={`justify-center h-32px md:h-34px px-1 screen475:px-3 mr-1 md:mr-3 lg:mr-5 rounded-4 md:rounded-5 flex w-1/6 lg:w-auto items-center text-center text-gray-primary cursor-pointer transition-all font-semibold text-bodybox-sp md:text-bodybox-pc ${size.width > 767 ? 'hover:bg-gray-lightbox' : ''} ${tab === 'your-nfts' ? 'bg-pink-primary' : ''}`}
                    onClick={() => setTab('your-nfts')}
                  >Yours</li>
                </ul>
                <div className='relative sm:max-w-230 w-full mb-5 lg:mb-0'>
                  <p>
                    <input
                      ref={searchInputEl}
                      placeholder='You can try "010203"'
                      onKeyPress={(event) => {
                        if (!/[0-9]|[#]/.test(event.key)) {
                          event.preventDefault();
                        }
                        if (/[#]/.test(event.key) && (event.currentTarget.value.indexOf('#') > -1 || parseInt(event.currentTarget.value) > -1)) {
                          event.preventDefault();
                        }
                      }}
                      onChange={debouncedChangeHandler}
                      onKeyDown={event => {
                        if (event.keyCode === 27) {
                          setValueInputSearch('');
                        }
                      }}
                      className={`${classes.placeholder} bg-transparent font-light pr-10 outline-none h-32px md:h-34px leading-normal w-full border border-solid rounded-3 search-nft ${valueInputSearch !== '' ? 'border-pink-primary pl-4' : 'border-gray-boxline pl-10 lg:pl-4'}`}
                    />
                  </p>
                  {
                    valueInputSearch !== ''
                      ?
                      <p className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                          onClick={onClearSearchInput}
                        >
                          <path d="M-3.27835e-07 7.5C-5.08894e-07 11.6421 3.35786 15 7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 -1.46777e-07 7.5 -3.27835e-07C3.35786 -5.08894e-07 -1.46777e-07 3.35786 -3.27835e-07 7.5Z" fill="#293333" />
                          <path d="M4.75512 10.2976L10.0576 4.99512" stroke="#f9f9f9" strokeLinecap="round" strokeLinejoin="bevel" />
                          <path d="M4.75512 4.99512L10.0576 10.2976" stroke="#f9f9f9" strokeLinecap="round" strokeLinejoin="bevel" />
                        </svg>
                      </p>
                      :
                      <p className='absolute top-1/2 left-4 lg:left-auto lg:right-4 transform -translate-y-1/2 cursor-pointer'>
                        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.11914 10.2188C9.53538 10.2188 11.4941 8.26 11.4941 5.84375C11.4941 3.4275 9.53538 1.46875 7.11914 1.46875C4.70289 1.46875 2.74414 3.4275 2.74414 5.84375C2.74414 8.26 4.70289 10.2188 7.11914 10.2188Z" stroke="#575757" stroke-linecap="round" stroke-linejoin="bevel"/>
                          <path d="M3.95029 9.09998L1.01904 12.0312" stroke="#575757" strokeLinecap="round" strokeLinejoin="bevel"/>
                        </svg>
                      </p>
                  }
                </div>
              </div>
              <div className='max-w-1060 mx-auto'>
                {
                  !filteredNftTickets.length &&
                  <p className='mt-5 md:mt-10'>There is nothing here. Try something else!</p>
                }
                {
                  !!filteredNftTickets.length &&
                  <div>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 lg:gap-5 mt-5 md:mt-12'>
                      {
                        filteredNftTickets.map((ticket) => {
                          return <Ticket key={ticket.milli_nft_account_pubkey}
                            metadataURL={ticket.metadataURL}
                            emitTicketData={setSelectedTicketData}
                            nftAccountPubkey={ticket.milli_nft_account_pubkey}
                            swipableView={setSwipeableViewsIndex}
                            tab={tab}
                            isShowPopupDesktop={setIsShowPopupDesktop} />
                        })
                      }
                    </div>
                  </div>
                }
                <div className='mt-6 md:mt-10 pb-6 md:pb-0'>
                  <Pagination count={ticketEntries.totalPages} showFirstButton showLastButton className={classes.root} siblingCount={1} onChange={onChangePagination} />
                </div>
              </div>
            </div>
          </div>
        </section>
        {
          selectedTicketData &&
          <div>
            
            <div className='grid grid-cols-1 gap-8'>
              <div className='col-span-1'>
                <div className='relative'>
                <p><img src={selectedTicketData.imageURL} alt="" className='w-full' /></p>
                  <p className='cursor-pointer inline-block absolute top-2 left-2'
                    onClick={() => {
                      setSwipeableViewsIndex(0);
                    }}
                  >
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="0.5">
                        <rect width="30" height="30" rx="15" fill="#1A2222"/>
                        <path d="M21.0525 15H9.27753" stroke="#F9F9F9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel"/>
                        <path d="M12.2476 11.415L9.16512 14.4975C9.02543 14.6381 8.94702 14.8281 8.94702 15.0263C8.94702 15.2244 9.02543 15.4145 9.16512 15.555L12.1651 18.555" stroke="#F9F9F9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel"/>
                      </g>
                    </svg>
                  </p>
                </div>
                <div className='px-3/100 py-5'>
                  <p className='text-h2-pc font-bungee text-blue-primary leading-8 mb-1'>{selectedTicketData.ticketNumber}</p>
                  <div>
                    {/* <div dangerouslySetInnerHTML={{ __html: selectedTicketData.description }} ></div> */}
                    {selectedTicketData.description}
                  </div>
                  
                  {
                    tab !== 'your-nfts' ?
                    <>
                      <p className='bg-gray-boxline opacity-50 h-px mt-5 mb-3'></p>
                      <div className='flex justify-between items-end'>
                        <p><span className='text-h2-pc text-blue-primary font-bold leading-6 mr-2'>{selectedTicketData.priceMilli} MILLI</span><span>({selectedTicketData.priceDollar}$)</span></p>
                        {
                          isBuyingNFT ?
                          <p className='text-center col-span-6 font-semibold text-body-sp md:text-body-pc rounded-3 border border-solid border-gray-primary flex justify-center items-center px-2 h-32px md:h-34px text-gray-boxline bg-gray-primary'>
                            Confirming
                            <span className='inline-block ml-2'>
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 8V10.5" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M6 1.5V4" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4 6H1.5" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10.5 6H8" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4.58482 4.58507L2.81982 2.82007" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9.18004 9.18004L7.41504 7.41504" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4.58482 7.41504L2.81982 9.18004" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9.18004 2.82007L7.41504 4.58507" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                          </p>
                          :
                          <div className='relative'>
                            <p className={`text-gray-box font-semibold bg-blue-primary h-32px md:h-34px w-72px md:w-80px rounded-4 inline-flex justify-center items-center transition-all ${playerData.data.is_connect ? 'cursor-pointer hover:opacity-75' : 'cursor-not-allowed'}`}
                              onClick={onBuyNFTTicket}
                              onMouseLeave={() => {
                                setShowTooltipConnectMobile(false);
                              }}
                              onMouseEnter={() => {
                                if(!playerData.data.is_connect) {
                                  setShowTooltipConnectMobile(true);
                                }
                              }}
                            >Buy NFT
                            </p>
                            { showTooltipConnectMobile && <p className='absolute bottom-full right-0 transform -translate-y-2 z-100 border border-solid border-pink-primary bg-gray-box rounded-5 text-center py-1 w-32 md:w-36 text-pink-primary font-medium'>Connect wallet first</p> }
                          </div>
                        }
                      </div>
                    </>
                    :
                    <>
                      <div className='relative w-full mt-4 mb-2'>
                        <p>
                          <input
                            placeholder='Address'
                            value={valueInputAddress}
                            onChange={(e) => {
                              setValueInputAddress(e.currentTarget.value);
                            }}
                            className={`${classes.placeholder} bg-transparent font-light outline-none h-32px md:h-34px leading-normal w-full border border-solid rounded-3 ${valueInputAddress !== '' ? 'border-pink-primary pl-2' : 'border-gray-boxline pl-7 lg:pr-4'}`}
                          />
                        </p>
                        {
                          valueInputAddress !== ''
                            ?
                            <p className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer'>
                              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                                onClick={onClearAddressInput}
                              >
                                <path d="M-3.27835e-07 7.5C-5.08894e-07 11.6421 3.35786 15 7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 -1.46777e-07 7.5 -3.27835e-07C3.35786 -5.08894e-07 -1.46777e-07 3.35786 -3.27835e-07 7.5Z" fill="#293333" />
                                <path d="M4.75512 10.2976L10.0576 4.99512" stroke="#f9f9f9" strokeLinecap="round" strokeLinejoin="bevel" />
                                <path d="M4.75512 4.99512L10.0576 10.2976" stroke="#f9f9f9" strokeLinecap="round" strokeLinejoin="bevel" />
                              </svg>
                            </p>
                            :
                            <p className='absolute top-1/2 left-2 transform -translate-y-1/2'>
                              <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_1483_4110)">
                                  <path d="M7.97522 1.1665C7.81897 1.1665 7.65647 1.1665 7.50022 1.1665C7.34397 1.1665 7.18147 1.1665 7.02522 1.1665C3.90022 1.47275 2.22522 5.004 3.70647 7.754L7.01897 13.9165C7.06509 14.0042 7.1343 14.0776 7.21912 14.1288C7.30394 14.1801 7.40114 14.2071 7.50022 14.2071C7.59931 14.2071 7.69651 14.1801 7.78132 14.1288C7.86614 14.0776 7.93535 14.0042 7.98147 13.9165L11.294 7.77275C12.7752 5.004 11.0815 1.47275 7.97522 1.1665Z" stroke="#575757" stroke-linecap="round" stroke-linejoin="bevel"/>
                                  <path d="M9.0625 5.479C9.0625 4.61606 8.36294 3.9165 7.5 3.9165C6.63706 3.9165 5.9375 4.61606 5.9375 5.479C5.9375 6.34195 6.63706 7.0415 7.5 7.0415C8.36294 7.0415 9.0625 6.34195 9.0625 5.479Z" stroke="#575757" stroke-linecap="round" stroke-linejoin="bevel"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_1483_4110">
                                    <rect width="15" height="15" fill="white" transform="translate(0 0.166504)"/>
                                  </clipPath>
                                </defs>
                              </svg>
                            </p>
                        }
                      </div>
                      <div className='flex items-center w-fit cursor-pointer mb-2'
                        onClick={() => {
                          setIsConfirmTransfer(!isConfirmTransfer);
                        }}
                      >
                        <span className={`w-3.5 h-3.5 border border-solid  inline-block rounded-3 relative
                          ${
                            isConfirmTransfer 
                            ?
                            valueInputAddress !== '' ? 'border-blue-secondary bg-blue-secondary' : 'border-pink-primary bg-pink-primary' 
                            :
                            valueInputAddress !== '' ? 'border-blue-secondary' : 'border-pink-primary'
                          }
                        `}>
                          {
                            isConfirmTransfer &&
                            <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                              <path d="M0.919678 5.13763L3.21468 7.43263L9.07968 1.56763" stroke="#293333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          }
                        </span>
                        <p className={`ml-1 font-semibold text-button-sp md:text-button-pc ${isConfirmTransfer && valueInputAddress !== '' ? 'text-blue-secondary' : 'text-pink-primary' }`}>This action can not be undone</p>
                      </div>
                      <p className='ml-auto text-gray-box font-semibold bg-blue-primary w-87px md:w-24 h-32px md:h-34px rounded-3 md:rounded-4 flex justify-center items-center transition-all cursor-pointer hover:opacity-70 pt-0.5'
                        onClick={handleTransferNFT}
                      >
                        Transfer
                        <span className='inline-block ml-1'>
                          <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1563_1716)">
                              <path d="M10.8573 8.81375L10.1197 8.07483L11.3566 9.31175C11.3658 9.32101 11.3747 9.33059 11.3831 9.34047L10.8573 8.81375ZM8.49732 9.26603C9.13238 9.53199 9.81419 9.66831 10.5027 9.667L10.501 9.66701C9.82132 9.67232 9.14742 9.54139 8.51914 9.28194C7.90925 9.03009 7.35435 8.66211 6.88521 8.19865C7.35037 8.65249 7.89725 9.01473 8.49732 9.26603Z" fill="#1A2222" stroke="#1A2222"/>
                              <path d="M10.5034 4.16618L9.35844 5.31118C9.3487 5.32434 9.33968 5.33803 9.33144 5.35218C9.25076 5.45055 9.21096 5.57617 9.22028 5.70306C9.22961 5.82995 9.28733 5.94841 9.38153 6.03394C9.47573 6.11946 9.59919 6.16552 9.72639 6.16259C9.85358 6.15966 9.97479 6.10796 10.0649 6.01818L10.9179 5.16618L11.7109 4.37368C11.845 4.23856 11.9377 4.06798 11.9782 3.88198C12.0187 3.69598 12.0052 3.5023 11.9394 3.32368C11.8909 3.18695 11.8127 3.06265 11.7104 2.95968L10.0649 1.31618C10.0193 1.26658 9.96409 1.22673 9.90265 1.19901C9.84121 1.1713 9.7748 1.15629 9.70741 1.15489C9.64002 1.1535 9.57304 1.16574 9.5105 1.19089C9.44797 1.21604 9.39116 1.25357 9.3435 1.30123C9.29583 1.34889 9.2583 1.4057 9.23315 1.46824C9.20801 1.53078 9.19576 1.59775 9.19716 1.66514C9.19855 1.73253 9.21356 1.79894 9.24128 1.86039C9.26899 1.92183 9.30885 1.97703 9.35844 2.02268L10.5049 3.16868C8.03844 3.17468 6.68644 4.50568 5.46044 5.90568C4.33444 4.63468 2.99993 3.36618 0.743431 3.18918L0.50293 3.16618C0.370322 3.16618 0.243145 3.21886 0.149377 3.31263C0.0556082 3.40639 0.00292969 3.53357 0.00292969 3.66618C0.00548976 3.79799 0.0589901 3.92368 0.152209 4.0169C0.245428 4.11012 0.371124 4.16362 0.50293 4.16618C0.538931 4.16618 0.646431 4.18268 0.646431 4.18268C2.59443 4.33018 3.71244 5.42718 4.79994 6.66618C3.71894 7.89918 2.60843 9.01618 0.676431 9.14618L0.47643 9.15668C0.344817 9.1649 0.221859 9.22507 0.134608 9.32395C0.0473564 9.42283 0.00295798 9.55231 0.0111797 9.68393C0.0194014 9.81554 0.0795698 9.9385 0.178449 10.0258C0.277327 10.113 0.406817 10.1574 0.538431 10.1492C0.616431 10.1457 0.743431 10.1427 0.805931 10.1377C3.31593 9.94418 4.67744 8.33768 5.89144 6.93318C7.11744 5.51618 8.27544 4.17518 10.5034 4.16618Z" fill="#1A2222"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_1563_1716">
                                <rect width="12" height="12" fill="white" transform="translate(0 0.666504)"/>
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                      </p>
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
        }
      </SwipeableViews>
      <Footer></Footer>
      <ModalContent dataModal={dataModal.data} playerData={playerData.data}
        dataGiveFromModal={dataGiveFromModal} dataGiveFromWallet={dataGiveFromWallet}></ModalContent>
      {
        isShowPopupDesktop &&
        <div className='fixed top-0 left-0 z-1000 h-full w-full'>
          <div className='bg-black opacity-50 h-full w-full z-100 top-0 left-0 absolute' onClick={handleResetDataPopupTicket}></div>
          <div className='w-full absolute z-1000 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-600 rounded-10 border border-solid border-gray-575757-50 overflow-hidden'>
            <p className='flex justify-end bg-gray-lightbox px-5 py-4' onClick={handleResetDataPopupTicket}>
              <span className='inline-block transition-all cursor-pointer hover:opacity-70'>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.75592 1.42259C10.0814 1.09715 10.0814 0.569515 9.75592 0.244078C9.43049 -0.0813592 8.90285 -0.0813592 8.57741 0.244078L5 3.82149L1.42259 0.244078C1.09715 -0.0813584 0.569515 -0.0813584 0.244078 0.244079C-0.0813592 0.569515 -0.0813592 1.09715 0.244078 1.42259L3.82149 5L0.244078 8.57741C-0.0813592 8.90285 -0.0813592 9.43048 0.244078 9.75592C0.569515 10.0814 1.09715 10.0814 1.42259 9.75592L5 6.17851L8.57741 9.75592C8.90285 10.0814 9.43049 10.0814 9.75592 9.75592C10.0814 9.43049 10.0814 8.90285 9.75592 8.57741L6.17851 5L9.75592 1.42259Z" fill="white" />
                </svg>
              </span>
            </p>
            <p><img src={selectedTicketData.imageURL} width='500' alt="" className='w-full' /></p>
            <div className='px-5 py-3 bg-gray-box'>
              <div className='flex flex-col justify-center'>
                <p className='text-h2-pc font-bungee text-blue-primary mb-1'>{selectedTicketData.ticketNumber}</p>
                <div>
                  {/* <div dangerouslySetInnerHTML={{ __html: selectedTicketData.description }} ></div> */}
                  {selectedTicketData.description}
                </div>
              </div>
              {
                tab !== 'your-nfts' ?
                <>
                  <p className='bg-gray-boxline opacity-50 h-px mt-4 mb-5'></p>
                  <div className='flex justify-between items-center gap-4'>
                    <p><span className='text-h2-sp text-blue-primary font-bold leading-6 mr-2'>~{selectedTicketData.priceMilli} MILLI</span><span>({selectedTicketData.priceDollar}$)</span></p>
                    {
                      isBuyingNFT ?
                      <p className='text-center col-span-6 font-semibold text-body-sp md:text-body-pc rounded-3 border border-solid border-gray-primary flex justify-center items-center px-2 h-32px md:h-34px text-gray-boxline bg-gray-primary'>
                        Confirming
                        <span className='inline-block ml-2'>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 8V10.5" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 1.5V4" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4 6H1.5" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10.5 6H8" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4.58482 4.58507L2.81982 2.82007" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9.18004 9.18004L7.41504 7.41504" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4.58482 7.41504L2.81982 9.18004" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9.18004 2.82007L7.41504 4.58507" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </p>
                      :
                      <div className='relative'>
                        <p className={`text-gray-box font-semibold bg-blue-primary h-32px md:h-34px w-72px md:w-80px rounded-4 inline-flex justify-center items-center transition-all ${playerData.data.is_connect ? 'cursor-pointer hover:opacity-75' : 'cursor-not-allowed'}`}
                          onClick={onBuyNFTTicket}
                          onMouseLeave={() => {
                            setShowTooltipConnectDesktop(false);
                          }}
                          onMouseEnter={() => {
                            if(!playerData.data.is_connect) {
                              setShowTooltipConnectDesktop(true);
                            }
                          }}
                        >Buy NFT
                        </p>
                        { showTooltipConnectDesktop && <p className='absolute bottom-full right-0 transform -translate-y-2 z-100 border border-solid border-pink-primary bg-gray-box rounded-5 text-center py-1 w-32 md:w-36 text-pink-primary font-medium'>Connect wallet first</p> }
                      </div>
                    }
                  </div>
                </>
                :
                <>
                  <div className='relative w-full mt-4 mb-2'>
                    <p>
                      <input
                        placeholder='Address'
                        value={valueInputAddress}
                        onChange={(e) => {
                          setValueInputAddress(e.currentTarget.value);
                        }}
                        className={`${classes.placeholder} bg-transparent font-light outline-none h-32px md:h-34px leading-normal w-full border border-solid rounded-3 ${valueInputAddress !== '' ? 'border-pink-primary pl-2' : 'border-gray-boxline pl-7 lg:pr-4'}`}
                      />
                    </p>
                    {
                      valueInputAddress !== ''
                        ?
                        <p className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer'>
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                            onClick={onClearAddressInput}
                          >
                            <path d="M-3.27835e-07 7.5C-5.08894e-07 11.6421 3.35786 15 7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 -1.46777e-07 7.5 -3.27835e-07C3.35786 -5.08894e-07 -1.46777e-07 3.35786 -3.27835e-07 7.5Z" fill="#293333" />
                            <path d="M4.75512 10.2976L10.0576 4.99512" stroke="#f9f9f9" strokeLinecap="round" strokeLinejoin="bevel" />
                            <path d="M4.75512 4.99512L10.0576 10.2976" stroke="#f9f9f9" strokeLinecap="round" strokeLinejoin="bevel" />
                          </svg>
                        </p>
                        :
                        <p className='absolute top-1/2 left-2 transform -translate-y-1/2'>
                          <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1483_4110)">
                              <path d="M7.97522 1.1665C7.81897 1.1665 7.65647 1.1665 7.50022 1.1665C7.34397 1.1665 7.18147 1.1665 7.02522 1.1665C3.90022 1.47275 2.22522 5.004 3.70647 7.754L7.01897 13.9165C7.06509 14.0042 7.1343 14.0776 7.21912 14.1288C7.30394 14.1801 7.40114 14.2071 7.50022 14.2071C7.59931 14.2071 7.69651 14.1801 7.78132 14.1288C7.86614 14.0776 7.93535 14.0042 7.98147 13.9165L11.294 7.77275C12.7752 5.004 11.0815 1.47275 7.97522 1.1665Z" stroke="#575757" stroke-linecap="round" stroke-linejoin="bevel"/>
                              <path d="M9.0625 5.479C9.0625 4.61606 8.36294 3.9165 7.5 3.9165C6.63706 3.9165 5.9375 4.61606 5.9375 5.479C5.9375 6.34195 6.63706 7.0415 7.5 7.0415C8.36294 7.0415 9.0625 6.34195 9.0625 5.479Z" stroke="#575757" stroke-linecap="round" stroke-linejoin="bevel"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_1483_4110">
                                <rect width="15" height="15" fill="white" transform="translate(0 0.166504)"/>
                              </clipPath>
                            </defs>
                          </svg>
                        </p>
                    }
                  </div>
                  <div className='flex items-center w-fit cursor-pointer mb-2'
                    onClick={() => {
                      setIsConfirmTransfer(!isConfirmTransfer);
                    }}
                  >
                    <span className={`w-3.5 h-3.5 border border-solid  inline-block rounded-3 relative
                      ${
                        isConfirmTransfer 
                        ?
                        valueInputAddress !== '' ? 'border-blue-secondary bg-blue-secondary' : 'border-pink-primary bg-pink-primary' 
                        :
                        valueInputAddress !== '' ? 'border-blue-secondary' : 'border-pink-primary'
                      }
                    `}>
                      {
                        isConfirmTransfer &&
                        <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                          <path d="M0.919678 5.13763L3.21468 7.43263L9.07968 1.56763" stroke="#293333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      }
                    </span>
                    <p className={`ml-1 font-semibold text-button-sp md:text-button-pc ${isConfirmTransfer && valueInputAddress !== '' ? 'text-blue-secondary' : 'text-pink-primary' }`}>This action can not be undone</p>
                  </div>
                  <p className='ml-auto text-gray-box font-semibold bg-blue-primary w-87px md:w-24 h-32px md:h-34px rounded-3 md:rounded-4 flex justify-center items-center transition-all cursor-pointer hover:opacity-70 pt-0.5'
                    onClick={handleTransferNFT}
                  >
                    Transfer
                    <span className='inline-block ml-1'>
                      <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1563_1716)">
                          <path d="M10.8573 8.81375L10.1197 8.07483L11.3566 9.31175C11.3658 9.32101 11.3747 9.33059 11.3831 9.34047L10.8573 8.81375ZM8.49732 9.26603C9.13238 9.53199 9.81419 9.66831 10.5027 9.667L10.501 9.66701C9.82132 9.67232 9.14742 9.54139 8.51914 9.28194C7.90925 9.03009 7.35435 8.66211 6.88521 8.19865C7.35037 8.65249 7.89725 9.01473 8.49732 9.26603Z" fill="#1A2222" stroke="#1A2222"/>
                          <path d="M10.5034 4.16618L9.35844 5.31118C9.3487 5.32434 9.33968 5.33803 9.33144 5.35218C9.25076 5.45055 9.21096 5.57617 9.22028 5.70306C9.22961 5.82995 9.28733 5.94841 9.38153 6.03394C9.47573 6.11946 9.59919 6.16552 9.72639 6.16259C9.85358 6.15966 9.97479 6.10796 10.0649 6.01818L10.9179 5.16618L11.7109 4.37368C11.845 4.23856 11.9377 4.06798 11.9782 3.88198C12.0187 3.69598 12.0052 3.5023 11.9394 3.32368C11.8909 3.18695 11.8127 3.06265 11.7104 2.95968L10.0649 1.31618C10.0193 1.26658 9.96409 1.22673 9.90265 1.19901C9.84121 1.1713 9.7748 1.15629 9.70741 1.15489C9.64002 1.1535 9.57304 1.16574 9.5105 1.19089C9.44797 1.21604 9.39116 1.25357 9.3435 1.30123C9.29583 1.34889 9.2583 1.4057 9.23315 1.46824C9.20801 1.53078 9.19576 1.59775 9.19716 1.66514C9.19855 1.73253 9.21356 1.79894 9.24128 1.86039C9.26899 1.92183 9.30885 1.97703 9.35844 2.02268L10.5049 3.16868C8.03844 3.17468 6.68644 4.50568 5.46044 5.90568C4.33444 4.63468 2.99993 3.36618 0.743431 3.18918L0.50293 3.16618C0.370322 3.16618 0.243145 3.21886 0.149377 3.31263C0.0556082 3.40639 0.00292969 3.53357 0.00292969 3.66618C0.00548976 3.79799 0.0589901 3.92368 0.152209 4.0169C0.245428 4.11012 0.371124 4.16362 0.50293 4.16618C0.538931 4.16618 0.646431 4.18268 0.646431 4.18268C2.59443 4.33018 3.71244 5.42718 4.79994 6.66618C3.71894 7.89918 2.60843 9.01618 0.676431 9.14618L0.47643 9.15668C0.344817 9.1649 0.221859 9.22507 0.134608 9.32395C0.0473564 9.42283 0.00295798 9.55231 0.0111797 9.68393C0.0194014 9.81554 0.0795698 9.9385 0.178449 10.0258C0.277327 10.113 0.406817 10.1574 0.538431 10.1492C0.616431 10.1457 0.743431 10.1427 0.805931 10.1377C3.31593 9.94418 4.67744 8.33768 5.89144 6.93318C7.11744 5.51618 8.27544 4.17518 10.5034 4.16618Z" fill="#1A2222"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_1563_1716">
                            <rect width="12" height="12" fill="white" transform="translate(0 0.666504)"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                  </p>
                </>
              }
            </div>
          </div>
        </div>
      }

      <section className={`fixed h-100vh w-full top-0 left-0 ${isShowNotification ? 'block' : ' hidden'}`}>
        <div className='h-full absolute w-full top-0 left-0 bg-black opacity-50'></div>
        <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-280 md:max-w-700 w-full bg-gray-box md:rounded-5 rounded-10 border-gray-boxline-50 border border-solid'>
          <div className='bg-gray-lightbox px-4 md:px-6 py-5 flex justify-end items-center'></div>
          <div className='px-4 py-3 md:px-6 md:py-5'>
            <p className='text-bodybox-sp md:text-button-pc text-justify mb-2'>Please use the NFT transfer feature on our website to send your NFT ticket to others. If you transfer the NFT from wallet to wallet (for example, on Phantom, Sollet, Coin98, Slope,...), the new owner could not be recorded on our website. By this, the old owner still receives benefits from the MILLIONSY ecosystem while the new owner does not. If you find yourself in this situation, please fill out the form below to get it resolved. This process could take up to 30 days.</p>
            <p className='text-bodybox-sp md:text-button-pc text-blue-secondary'><a href="https://forms.gle/BrGkH3mXNQH1ir7MA" className='underline hover:opacity-70' target={`_blank`}>https://forms.gle/BrGkH3mXNQH1ir7MA</a></p>
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
              <p className='ml-3 text-blue-secondary'>I have read and agree.</p>
            </div>
            <p className='text-center mt-4'>
              <span className='inline-block cursor-pointer transition-all hover:opacity-70 text-gray-box bg-blue-primary rounded-3 md:rounded-5 py-1.5 px-2.5 font-semibold'
                onClick={() => {
                  if(isHadread) {
                    setIsShowNotification(false);
                  }
                }}
              >Confirm</span>
            </p>
          </div>
          
        </div>
      </section>

      <section className={`fixed h-100vh w-full top-0 left-0 z-100 ${isShowPopupResults !== '' ? 'block' : ' hidden'}`}>
        <div className='h-full absolute w-full top-0 left-0 bg-black opacity-50'
          onClick={() => {
            setIsShowPopupResults('');
          }}
        ></div>
        {
          isShowPopupResults === 'success' ? 
          <>
            <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-box rounded-10 border-blue-primary border border-solid w-52 md:w-72'>
              <p className='inline-block absolute top-0 right-0 p-2 md:p-4 cursor-pointer transition-all hover:opacity-70 z-1'
                onClick={() => {
                  setIsShowPopupResults('');
                }}
              >
                <span className='w-2 md:w-3 h-2 md:h-3 inline-block'>
                  <svg className='max-w-full max-h-full' width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L6 4.58579L1.70711 0.292894C1.31658 -0.0976301 0.683417 -0.0976301 0.292893 0.292894C-0.0976311 0.683419 -0.0976311 1.31658 0.292893 1.70711L4.58579 6L0.292893 10.2929C-0.0976311 10.6834 -0.0976311 11.3166 0.292893 11.7071C0.683417 12.0976 1.31658 12.0976 1.70711 11.7071L6 7.41421L10.2929 11.7071C10.6834 12.0976 11.3166 12.0976 11.7071 11.7071C12.0976 11.3166 12.0976 10.6834 11.7071 10.2929L7.41421 6L11.7071 1.70711Z" fill="#F9F9F9"/>
                  </svg>
                </span>
              </p>
              <div className='flex'>
                <p className='px-2.5 md:px-4 flex flex-col justify-center border-r border-solid border-blue-primary'>
                  <span className='inline-block w-5 md:w-30 h-5 md:h-30'>
                    <svg className='max-w-full max-h-full' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="15" cy="15" r="14" stroke="#00FFFF" strokeWidth="2"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M21.9387 11.1485C22.3427 11.53 22.3427 12.1486 21.9387 12.5302L14.6974 19.3692C14.2934 19.7508 13.6384 19.7508 13.2344 19.3692L9.09645 15.4612C8.69246 15.0797 8.69246 14.461 9.09645 14.0795C9.50044 13.698 10.1554 13.698 10.5594 14.0795L13.9659 17.2967L20.4758 11.1485C20.8798 10.7669 21.5347 10.7669 21.9387 11.1485Z" fill="#00FFFF"/>
                    </svg>
                  </span>
                </p>
                <div className='px-2 py-3 md:px-4 md:py-6 relative'>
                  <p className='font-semibold text-button-sp md:text-button-pc'>Successful purchased!</p>
                </div>
              </div>
            </div>
          </>
          :
          <>
            <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-box rounded-10 border-pink-primary border border-solid w-52 md:w-72'>
              <p className='inline-block absolute top-0 right-0 p-2 md:p-4 cursor-pointer transition-all hover:opacity-70 z-1'
                onClick={() => {
                  setIsShowPopupResults('');
                }}
              >
                <span className='w-2 md:w-3 h-2 md:h-3 inline-block'>
                  <svg className='max-w-full max-h-full' width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L6 4.58579L1.70711 0.292894C1.31658 -0.0976301 0.683417 -0.0976301 0.292893 0.292894C-0.0976311 0.683419 -0.0976311 1.31658 0.292893 1.70711L4.58579 6L0.292893 10.2929C-0.0976311 10.6834 -0.0976311 11.3166 0.292893 11.7071C0.683417 12.0976 1.31658 12.0976 1.70711 11.7071L6 7.41421L10.2929 11.7071C10.6834 12.0976 11.3166 12.0976 11.7071 11.7071C12.0976 11.3166 12.0976 10.6834 11.7071 10.2929L7.41421 6L11.7071 1.70711Z" fill="#F9F9F9"/>
                  </svg>
                </span>
              </p>
              <div className='flex'>
                <p className='px-2.5 md:px-4 flex flex-col justify-center border-r border-solid border-pink-primary'>
                  <span className='inline-block w-5 md:w-30 h-5 md:h-30'>
                    <svg className='max-w-full max-h-full' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 13.5C8.17157 13.5 7.5 14.1716 7.5 15C7.5 15.8284 8.17157 16.5 9 16.5H21C21.8284 16.5 22.5 15.8284 22.5 15C22.5 14.1716 21.8284 13.5 21 13.5H9Z" fill="#FF00FF"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0ZM3 15C3 8.37258 8.37258 3 15 3C21.6274 3 27 8.37258 27 15C27 21.6274 21.6274 27 15 27C8.37258 27 3 21.6274 3 15Z" fill="#FF00FF"/>
                    </svg>
                  </span>
                </p>
                <div className='p-2 pb-2.5 md:px-4 md:py-6 relative'>
                  <p className='font-semibold text-button-sp md:text-button-pc'>Error</p>
                  <p className='text-bodybox-sp md:text-bodybox-pc'>Please try again. Confirm the transaction and make sure you are paying enough gas!</p>
                </div>
              </div>
            </div>
          </>
        }
        
      </section>
    </>
  )
}

export default NFT