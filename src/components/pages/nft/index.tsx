import { Tab, Tabs, useTheme } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import Footer from 'components/astoms/footer';
import Header from 'components/astoms/header';
import ModalContent from 'components/astoms/modalSection';
import Star from 'components/astoms/star';
import { fetchPlayerAccount, insertNFTTransaction } from 'lib/utilities/utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import useStyles from './styles';
import SwipeableViews from 'react-swipeable-views';
import { useWindowSize } from 'data/constants';
import Ticket from './ticket';
import { HOST_NAME } from 'data/constants';
import { sendTxUsingExternalSignature, UseWallet } from '../../../lib/program/wallet-provider';
import { buyNFTTicket } from '../../../lib/program/lottery-commands';
import { buildParamRequest, splitArrayIntoChunksOfLen } from 'lib/utilities/format';
import debounce from 'lodash.debounce';
import { NFTTypes } from 'lib/program/state';

const NFT: React.FC = () => {
  const classes = useStyles();
  const size = useWindowSize();
  const searchInputEl = useRef(null);
  const [pageNo, setPageNo] = useState(1);
  
  const [tab, setTab] = useState(null);
  const [valueInputSearch, setValueInputSearch] = React.useState('');
  
  const [filteredNftTickets, setFilteredNftTickets] = useState([]);
  const [ticketEntries, setTicketEntries] = useState({
    totalPages: 0,
    currentPage: 1,
    perPage: 0,
    tickets: []
  });


  const [selectedTicketData, setSelectedTicketData] = useState({
    ticketNumber: '',
    token_account_pubkey: '',
    mint_pubkey: '',
    user_pubkey: '',
    milli_nft_pubkey: '',
    status: '',
    price: null
  });

  useEffect(() => {

    let filter = {};
    filter = {
      // isSole: false,
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
    if(tab){
      filter = {
        ...filter,
        nft_type: tab.toLowerCase()
      };
    }
    fetchTicketsEntries(pageNo, filter);
  }, [pageNo, valueInputSearch, tab]);

  const fetchTicketsEntries = (pageNo, filter) => {
    const queryParams = buildParamRequest(filter);
    fetch(`${HOST_NAME}/api/nft-ticket?page=${pageNo}&perPage=10${queryParams}`, {
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
      console.log(response_data.items);
      setFilteredNftTickets(response_data.items);
    }).catch(err => {
      console.log(err);
    })
  }

  const [notification, setNotification] = useState(true);
  const [isShowPopupDesktop, setIsShowPopupDesktop] = useState(false);

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

    buyNFTTicket(selectedTicketData.milli_nft_pubkey,
      selectedTicketData.user_pubkey,
      selectedTicketData.token_account_pubkey,
      selectedTicketData.mint_pubkey, selectedTicketData.price,
      'phantom'
    ).then(async res => {
      await insertNFTTransaction('sold',
        playerData.data.publicKey,
        selectedTicketData.mint_pubkey,
        selectedTicketData.token_account_pubkey,
        selectedTicketData.milli_nft_pubkey,
      );
      // console.log(res);
      console.log('purchase success');
    }).catch(err => {
      console.log(err);
      console.log('purchase fail');
    });
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
  }, [])

  const handleResetDataPopupTicket = () => {
    setIsShowPopupDesktop(false);
  }

  window.addEventListener('resize', function () {
    if (size.width > 767) {
      setSwipeableViewsIndex(0);
    } else {
      setIsShowPopupDesktop(false);
    }
  });

  const onChangePagination = (event, toSetpageNo) => {
    setPageNo(toSetpageNo);
  }

  return (
    <>
      <Star></Star>
      <Header playerData={playerData.data} dataGiveFromHeader={dataGiveFromHeader}></Header>

      <SwipeableViews
        axis={'x'}
        index={swipeableViewsIndex}
      >
        <section>
          {
            notification &&
            <>
              <div className='border-b font-lexend px-3/100'>
                <div className='max-w-1446 mx-auto my-4 md:my-14 relative'>
                  <div className='max-w-1011 mx-auto'>
                    <h4 className='font-bungee text-24 lg:text-32 text-blue-17F0FF leading-7 md:leading-8 mb-2 md:mb-4'>The first lifetime<br className='block md:hidden' /> lottery ticket ever in<br className='block md:hidden' /> the world!</h4>
                    <p className='text-pink-F4E0FF text-10 lg:text-14 font-medium text-justify'>NFT tickets are used for the Lottery platform and MILLIGO by MILLIONSY. When you buy a 3-digital NFT ticket, you can participate in all MILLIONSY draws for life with the highest prize of Match 3. Similarly, when you hold a 6-digit NFT ticket, you have the right to draw in the entire Match 3 to Match 6. Every NFT ticket has a unique code. NFT holders will be slotted to participate in IGO rounds on the MILLIPAD platform. And MORE for the lifetime benefit in all MILLIONSY platform.</p>
                  </div>
                  <p className='absolute top-0 right-0 transition-all hover:opacity-70 cursor-pointer'
                    onClick={() => setNotification(false)}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.0001 18.3334C14.6025 18.3334 18.3334 14.6024 18.3334 10C18.3334 5.39765 14.6025 1.66669 10.0001 1.66669C5.39771 1.66669 1.66675 5.39765 1.66675 10C1.66675 14.6024 5.39771 18.3334 10.0001 18.3334Z" stroke="#F4E0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel" />
                      <path d="M13.1085 13.0501L7.2168 7.15839" stroke="#F4E0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel" />
                      <path d="M7.2168 13.0501L13.1085 7.15839" stroke="#F4E0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel" />
                    </svg>
                  </p>
                </div>
              </div>
              <p className='h-px bg-gray-575757 opacity-50 w-full'></p>
            </>
          }
          <div className='font-lexend px-3/100'>
            <div className='max-w-1700 mx-auto py-5 md:py-20'>
              <div className='flex flex-col-reverse lg:flex-row justify-between items-center gap-5'>
                <ul className='flex justify-between md:justify-center lg:justify-start gap-1 md:gap-4 xl:gap-8 w-full rounded-5'>
                  <li className={`justify-center py-1.5 lg:py-2.5 px-1 screen475:px-3 lg:px-4 rounded-4 md:rounded-5 flex items-center border border-solid border-pink-A819FA-50 lg:border-pink-A819FA text-center text-white cursor-pointer transition-all hover:bg-pink-A819FA font-semibold text-10 md:text-14 xl:text-16 ${tab === 'all' ? 'bg-pink-150' : ''}`}
                    onClick={() => setTab(null)}
                  >All</li>
                  <li className={`justify-center py-1.5 lg:py-2.5 px-1 screen475:px-3 lg:px-4 rounded-4 md:rounded-5 flex items-center border border-solid border-pink-A819FA-50 lg:border-pink-A819FA text-center text-white cursor-pointer transition-all hover:bg-pink-A819FA font-semibold text-10 md:text-14 xl:text-16 ${tab === 'match-3' ? 'bg-pink-150' : ''}`}
                    onClick={() => setTab(NFTTypes[0])}
                  >Match 3</li>
                  <li className={`justify-center py-1.5 lg:py-2.5 px-1 screen475:px-3 lg:px-4 rounded-4 md:rounded-5 flex items-center border border-solid border-pink-A819FA-50 lg:border-pink-A819FA text-center text-white cursor-pointer transition-all hover:bg-pink-A819FA font-semibold text-10 md:text-14 xl:text-16 ${tab === 'match-4' ? 'bg-pink-150' : ''}`}
                    onClick={() => setTab(NFTTypes[1])}
                  >Match 4</li>
                  <li className={`justify-center py-1.5 lg:py-2.5 px-1 screen475:px-3 lg:px-4 rounded-4 md:rounded-5 flex items-center border border-solid border-pink-A819FA-50 lg:border-pink-A819FA text-center text-white cursor-pointer transition-all hover:bg-pink-A819FA font-semibold text-10 md:text-14 xl:text-16 ${tab === 'match-5' ? 'bg-pink-150' : ''}`}
                    onClick={() => setTab(NFTTypes[2])}
                  >Match 5</li>
                  <li className={`justify-center py-1.5 lg:py-2.5 px-1 screen475:px-3 lg:px-4 rounded-4 md:rounded-5 flex items-center border border-solid border-pink-A819FA-50 lg:border-pink-A819FA text-center text-white cursor-pointer transition-all hover:bg-pink-A819FA font-semibold text-10 md:text-14 xl:text-16 ${tab === 'match-6' ? 'bg-pink-150' : ''}`}
                    onClick={() => setTab(NFTTypes[3])}
                  >Match 6</li>
                  <li className={`justify-center py-1.5 lg:py-2.5 px-1 screen475:px-3 lg:px-4 rounded-4 md:rounded-5 flex items-center border border-solid border-pink-A819FA-50 lg:border-pink-A819FA text-center text-white cursor-pointer transition-all hover:bg-pink-A819FA font-semibold text-10 md:text-14 xl:text-16 ${tab === 'your-nfts' ? 'bg-pink-150' : ''}`}
                    onClick={() => setTab('your-nfts')}
                  >Your NFTs</li>
                </ul>
                <div className='relative lg:max-w-300 w-full'>
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
                      className={`text-white placeholder-white bg-transparent font-light pr-10 outline-none py-1 lg:py-3 w-full text-14 lg:text-16 border border-solid rounded-3 md:rounded-5 search-nft ${valueInputSearch !== '' ? 'border-blue-17F0FF pl-4' : 'border-gray-B4B4B4-80 pl-10 lg:pl-4'}`}
                    />
                  </p>
                  {
                    valueInputSearch !== ''
                      ?
                      <p className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                          onClick={onClearSearchInput}
                        >
                          <path d="M-3.27835e-07 7.5C-5.08894e-07 11.6421 3.35786 15 7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 -1.46777e-07 7.5 -3.27835e-07C3.35786 -5.08894e-07 -1.46777e-07 3.35786 -3.27835e-07 7.5Z" fill="#B4B4B4" />
                          <path d="M4.75512 10.2976L10.0576 4.99512" stroke="white" strokeLinecap="round" strokeLinejoin="bevel" />
                          <path d="M4.75512 4.99512L10.0576 10.2976" stroke="white" strokeLinecap="round" strokeLinejoin="bevel" />
                        </svg>
                      </p>
                      :
                      <p className='absolute top-1/2 left-4 lg:left-auto lg:right-4 transform -translate-y-1/2 cursor-pointer'>
                        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.61865 11.2187C11.0349 11.2187 12.9937 9.25996 12.9937 6.84372C12.9937 4.42747 11.0349 2.46872 8.61865 2.46872C6.20241 2.46872 4.24365 4.42747 4.24365 6.84372C4.24365 9.25996 6.20241 11.2187 8.61865 11.2187Z" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="bevel" />
                          <path d="M5.45005 10.0999L2.5188 13.0312" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="bevel" />
                        </svg>
                      </p>
                  }
                </div>
              </div>
              <div className='max-w-1460 mx-auto'>
                {
                  !filteredNftTickets.length &&
                  <p className='text-12 md:text-16 text-blue-ADFAFF mt-5 md:mt-10'>There is nothing here. Try something else!</p>
                }
                {
                  !!filteredNftTickets.length &&
                  <div>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-5 mt-5 md:mt-24'>
                      {
                        filteredNftTickets.map((ticket) => {
                          return <Ticket key={ticket.milli_nft_account_pubkey}
                            emitTicketData={setSelectedTicketData}
                            nftAccountPubkey={ticket.milli_nft_account_pubkey}
                            swipableView={setSwipeableViewsIndex}
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
        <div {...handlers}>
          <p className='px-3/100 py-5'
            onClick={() => {
              setSwipeableViewsIndex(0);
            }}
          >
            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 9C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7V9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM17 7L1 7V9L17 9V7Z" fill="#F9F9F9" />
            </svg>
          </p>
          <div className='grid grid-cols-1 gap-8'>
            <div className='col-span-1'>
              <p><img src="/assets/nft/under_popup.png" alt="" className='w-full' /></p>
              <div className='px-3/100 pt-5'>
                <p className='text-24 font-bungee text-blue-17F0FF leading-8 mb-1'>#051733</p>
                <div>
                  <p className='text-12 leading-4'><span className='font-bold inline-block mr-1'>Lottery:</span>Lifetime drawing with match 3.</p>
                  <p className='text-12 leading-4'><span className='font-bold uppercase inline-block mr-1'>MILLIGO:</span>1 slot for every IGO round.</p>
                </div>
                <p className='bg-gray-A9A9A9 opacity-50 h-px mt-4 mb-2'></p>
                <div className='flex justify-between items-end'>
                  <p className='text-20 text-pink-D47DFF font-bold leading-8'>~0.27 SOL <span className='text-16 font-normal'>(50$)</span></p>
                  <p className='text-12 text-blue-0B7880 font-semibold bg-blue-17F0FF py-2 px-3.5 rounded-4 inline-block transition-all cursor-pointer hover:opacity-70'>Buy ticket</p>
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
          <div className='bg-gray-400 h-full w-full z-100 top-0 left-0 absolute' onClick={handleResetDataPopupTicket}></div>
          <div className='w-full absolute z-1000 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-151515 max-w-700 rounded-10'>
            <p className='flex justify-end px-5 py-4' onClick={handleResetDataPopupTicket}>
              <span className='inline-block transition-all cursor-pointer hover:opacity-70'>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.75592 1.42259C10.0814 1.09715 10.0814 0.569515 9.75592 0.244078C9.43049 -0.0813592 8.90285 -0.0813592 8.57741 0.244078L5 3.82149L1.42259 0.244078C1.09715 -0.0813584 0.569515 -0.0813584 0.244078 0.244079C-0.0813592 0.569515 -0.0813592 1.09715 0.244078 1.42259L3.82149 5L0.244078 8.57741C-0.0813592 8.90285 -0.0813592 9.43048 0.244078 9.75592C0.569515 10.0814 1.09715 10.0814 1.42259 9.75592L5 6.17851L8.57741 9.75592C8.90285 10.0814 9.43049 10.0814 9.75592 9.75592C10.0814 9.43049 10.0814 8.90285 9.75592 8.57741L6.17851 5L9.75592 1.42259Z" fill="white" />
                </svg>
              </span>
            </p>
            <p><img src="/assets/nft/under_popup.png" alt="" className='w-full' /></p>
            <div className='px-5 py-3'>
              <div className='flex flex-col justify-center'>
                <p className='text-24 font-bungee text-blue-17F0FF leading-7'>{selectedTicketData.ticketNumber}</p>
                <div>
                  <p className='text-10 leading-4'><span className='font-bold inline-block mr-1'>Lottery:</span>Lifetime drawing with match 3.</p>
                  <p className='text-10 leading-4'><span className='font-bold uppercase inline-block mr-1'>MILLIGO:</span>1 slot for every IGO round.</p>
                </div>
              </div>
              <p className='bg-gray-575757 opacity-50 h-px mt-4 mb-3'></p>
              <div className='flex justify-between items-center gap-4'>
                <p className='text-18 text-pink-D47DFF font-bold leading-6'>~0.27 MILLI <span className='text-14 font-light'>{selectedTicketData.price} USCD</span></p>
                <p className='text-12 text-blue-0B7880 font-semibold bg-blue-17F0FF py-2 px-3.5 rounded-4 inline-block transition-all cursor-pointer hover:opacity-70' onClick={onBuyNFTTicket}>Buy ticket</p>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default NFT