import { Pagination, PaginationItem } from '@material-ui/lab';
import Footer from 'components/astoms/footer';
import Header from 'components/astoms/header';
import ModalContent from 'components/astoms/modalSection';
import Star from 'components/astoms/star';
import { fetchPlayerAccount } from 'lib/utilities/utils';
import React, { useEffect, useState } from 'react';
import useStyles from './styles';

const NFT: React.FC = () => {
  const classes = useStyles();
  const [notification, setNotification] = useState(true);
  const [tab, setTab] = useState('match-3');
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
  useEffect(() => {
  }, [tab])
  return (
    <>
      <Star></Star>
      <Header playerData={playerData.data} dataGiveFromHeader={dataGiveFromHeader}></Header>
      {
        notification && 
        <section className='border-b border-blue-50 border-solid font-lexend px-3/100'>
        <div className='max-w-1132 mx-auto mt-20 relative md:pr-8'>
          <div className='text-pink-50 text-12 lg:text-14 font-normal'>
            <p className='mb-4 lg:mb-5'>NFT tickets are used for the Lottery platform and MILLIGO. When you buy a 3-digit NFT ticket, you can participate in all MILLIONSY draws for life with the highest prize of Match 3 (as long as you still have the ticket).</p>
            <p className='mb-4 lg:mb-5'>Similarly, when you hold a 6-digit NFT ticket, you have the right to draw in the entire Match 3 to Match 6. Every NFT ticket has a unique code.</p>
            <p className='mb-5'>NFT holders will be slotted to participate in IDO rounds on the MILLIPAD platform. And MORE for the lifetime benefit in all MILLIONSY platform.</p>
          </div>
          <p className='absolute -bottom-2 md:top-1/2 md:transform md:-translate-y-1/3 lg:transform-none lg:top-0 right-0 transition-all hover:opacity-70 cursor-pointer'
            onClick={() => setNotification(false)}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M18.7559 7.42259C19.0814 7.09715 19.0814 6.56951 18.7559 6.24408C18.4305 5.91864 17.9028 5.91864 17.5774 6.24408L14 9.82149L10.4226 6.24408C10.0972 5.91864 9.56951 5.91864 9.24408 6.24408C8.91864 6.56952 8.91864 7.09715 9.24408 7.42259L12.8215 11L9.24408 14.5774C8.91864 14.9028 8.91864 15.4305 9.24408 15.7559C9.56951 16.0814 10.0972 16.0814 10.4226 15.7559L14 12.1785L17.5774 15.7559C17.9028 16.0814 18.4305 16.0814 18.7559 15.7559C19.0814 15.4305 19.0814 14.9028 18.7559 14.5774L15.1785 11L18.7559 7.42259Z" fill="white"/>
            </svg>
          </p>
        </div>
      </section>
      }
      <section className='font-lexend px-3/100'>
        <div className='max-w-1132 mx-auto py-8 md:py-16'>
          <div className='mb-6 md:mb-14 flex flex-col-reverse md:flex-row justify-between items-center gap-5'>
            <ul className='flex md:gap-6 lg:gap-5 w-full md:w-auto bg-purple-100 md:bg-transparent rounded-5 md:rounded-none overflow-hidden'>
              <li className={`w-1/5 md:w-24 lg:w-100 md:h-9 lg:h-8 flex items-center justify-center rounded-5 md:border border-solid border-pink-150 text-center text-pink-50 cursor-pointer transition-all hover:bg-pink-150 text-12 md:text-14 py-1 md:py-0 ${ tab === 'match-3' ? 'font-bold bg-pink-150' : 'font-light' }`}
                onClick={() => setTab('match-3')}
              >Match 3</li>
              <li className={`w-1/5 md:w-24 lg:w-100 md:h-9 lg:h-8 flex items-center justify-center rounded-5 md:border border-solid border-pink-150 text-center text-pink-50 cursor-pointer transition-all hover:bg-pink-150 text-12 md:text-14 py-1 md:py-0 ${ tab === 'match-4' ? 'font-bold bg-pink-150' : 'font-light' }`}
                onClick={() => setTab('match-4')}
              >Match 4</li>
              <li className={`w-1/5 md:w-24 lg:w-100 md:h-9 lg:h-8 flex items-center justify-center rounded-5 md:border border-solid border-pink-150 text-center text-pink-50 cursor-pointer transition-all hover:bg-pink-150 text-12 md:text-14 py-1 md:py-0 ${ tab === 'match-5' ? 'font-bold bg-pink-150' : 'font-light' }`}
                onClick={() => setTab('match-5')}
              >Match 5</li>
              <li className={`w-1/5 md:w-24 lg:w-100 md:h-9 lg:h-8 flex items-center justify-center rounded-5 md:border border-solid border-pink-150 text-center text-pink-50 cursor-pointer transition-all hover:bg-pink-150 text-12 md:text-14 py-1 md:py-0 ${ tab === 'match-6' ? 'font-bold bg-pink-150' : 'font-light' }`}
                onClick={() => setTab('match-6')}
              >Match 6</li>
              <li className={`w-1/5 md:w-24 lg:w-100 md:h-9 lg:h-8 flex items-center justify-center rounded-5 md:border border-solid border-pink-150 text-center text-pink-50 cursor-pointer transition-all hover:bg-pink-150 text-12 md:text-14 py-1 md:py-0 ${ tab === 'your-nfts' ? 'font-bold bg-pink-150' : 'font-light' }`}
                onClick={() => setTab('your-nfts')}
              >Your<br className='block md:hidden' />NFTs</li>
            </ul>
            <div className='relative md:max-w-264 lg:max-w-300 w-full'>
              <p>
                <input
                  placeholder="Search"
                  onKeyPress={(event) => {
                    if (!/[0-9]|[#]/.test(event.key)) {
                      event.preventDefault();
                    }
                    console.log(typeof parseInt(event.currentTarget.value));
                    
                    if (/[#]/.test(event.key) && (event.currentTarget.value.indexOf('#') > -1 || parseInt(event.currentTarget.value) > -1)) {
                      event.preventDefault();
                    }
                  }}
                  className='text-right bg-purple-100 text-pink-50 placeholder-pink-100 font-light pl-4 pr-12 lg:pr-6 outline-none rounded-5 py-2 md:py-1.5 w-full text-14 lg:text-12'
                />
              </p>
              <p className='absolute top-1/2 right-4 lg:right-1 transform -translate-y-1/2 cursor-pointer'>
                <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-auto lg:w-4'>
                  <path opacity="0.5" d="M18.588 18.7028C18.8784 18.4128 18.8784 17.9421 18.588 17.6521L16.3782 15.4454C17.2944 14.3027 17.8457 12.8566 17.8457 11.282C17.8457 7.60021 14.8454 4.604 11.1584 4.604C7.47154 4.604 4.47119 7.60021 4.47119 11.282C4.47119 14.9638 7.47154 17.96 11.1584 17.96C12.7352 17.96 14.1833 17.4095 15.3276 16.4946L17.5388 18.7028C17.8287 18.9922 18.2982 18.9922 18.588 18.7028ZM5.95725 11.282C5.95725 8.4179 8.29036 6.08801 11.1584 6.08801C14.0265 6.08801 16.3596 8.4179 16.3596 11.282C16.3596 14.1462 14.0265 16.476 11.1584 16.476C8.29036 16.476 5.95725 14.1462 5.95725 11.282Z" fill="#F4E0FF"/>
                </svg>
              </p>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-2 md:gap-8 lg:gap-10 '>
            <div className='col-span-1 bg-gray-0 text-pink-50 md:rounded-10 overflow-hidden md:border border-solid border-blue-0'>
              <picture>
                <source media='(min-width: 768px)' srcSet='/assets/nft/under_img.png' />
                <img src="/assets/nft/under_img_sp.png" alt="" className='w-full' />
              </picture>
              <div className='px-4 pt-3.5 pb-0.5 hidden md:block'>
                <p className='text-24 text-blue-200 font-bungee leading-6'>#051733</p>
                <p className='text-12'><span className='font-bold'>Lottery:</span> Lifetime drawing with match 3.</p>
                <p className='text-12'><span className='font-bold uppercase'>MILLIGO:</span> 1 ticket for every IDO round.</p>
                <p className='w-full h-px bg-pink-50 opacity-50 mt-2.5'></p>
                <p className='flex justify-between font-bold text-24 text-pink-0'><span>~50$</span><span>0.27 SOL</span></p>
              </div>
            </div>
            <div className='col-span-1 bg-gray-0 text-pink-50 md:rounded-10 overflow-hidden md:border border-solid border-blue-0'>
              <picture>
                <source media='(min-width: 768px)' srcSet='/assets/nft/under_img.png' />
                <img src="/assets/nft/under_img_sp.png" alt="" className='w-full' />
              </picture>
              <div className='px-4 pt-3.5 pb-0.5 hidden md:block'>
                <p className='text-24 text-blue-200 font-bungee leading-6'>#051733</p>
                <p className='text-12'><span className='font-bold'>Lottery:</span> Lifetime drawing with match 3.</p>
                <p className='text-12'><span className='font-bold uppercase'>MILLIGO:</span> 1 ticket for every IDO round.</p>
                <p className='w-full h-px bg-pink-50 opacity-50 mt-2.5'></p>
                <p className='flex justify-between font-bold text-24 text-pink-0'><span>~50$</span><span>0.27 SOL</span></p>
              </div>
            </div>
            <div className='col-span-1 bg-gray-0 text-pink-50 md:rounded-10 overflow-hidden md:border border-solid border-blue-0'>
              <picture>
                <source media='(min-width: 768px)' srcSet='/assets/nft/under_img.png' />
                <img src="/assets/nft/under_img_sp.png" alt="" className='w-full' />
              </picture>
              <div className='px-4 pt-3.5 pb-0.5 hidden md:block'>
                <p className='text-24 text-blue-200 font-bungee leading-6'>#051733</p>
                <p className='text-12'><span className='font-bold'>Lottery:</span> Lifetime drawing with match 3.</p>
                <p className='text-12'><span className='font-bold uppercase'>MILLIGO:</span> 1 ticket for every IDO round.</p>
                <p className='w-full h-px bg-pink-50 opacity-50 mt-2.5'></p>
                <p className='flex justify-between font-bold text-24 text-pink-0'><span>~50$</span><span>0.27 SOL</span></p>
              </div>
            </div>
            <div className='col-span-1 bg-gray-0 text-pink-50 md:rounded-10 overflow-hidden md:border border-solid border-blue-0'>
              <picture>
                <source media='(min-width: 768px)' srcSet='/assets/nft/under_img.png' />
                <img src="/assets/nft/under_img_sp.png" alt="" className='w-full' />
              </picture>
              <div className='px-4 pt-3.5 pb-0.5 hidden md:block'>
                <p className='text-24 text-blue-200 font-bungee leading-6'>#051733</p>
                <p className='text-12'><span className='font-bold'>Lottery:</span> Lifetime drawing with match 3.</p>
                <p className='text-12'><span className='font-bold uppercase'>MILLIGO:</span> 1 ticket for every IDO round.</p>
                <p className='w-full h-px bg-pink-50 opacity-50 mt-2.5'></p>
                <p className='flex justify-between font-bold text-24 text-pink-0'><span>~50$</span><span>0.27 SOL</span></p>
              </div>
            </div>
            <div className='col-span-1 bg-gray-0 text-pink-50 md:rounded-10 overflow-hidden md:border border-solid border-blue-0'>
              <picture>
                <source media='(min-width: 768px)' srcSet='/assets/nft/under_img.png' />
                <img src="/assets/nft/under_img_sp.png" alt="" className='w-full' />
              </picture>
              <div className='px-4 pt-3.5 pb-0.5 hidden md:block'>
                <p className='text-24 text-blue-200 font-bungee leading-6'>#051733</p>
                <p className='text-12'><span className='font-bold'>Lottery:</span> Lifetime drawing with match 3.</p>
                <p className='text-12'><span className='font-bold uppercase'>MILLIGO:</span> 1 ticket for every IDO round.</p>
                <p className='w-full h-px bg-pink-50 opacity-50 mt-2.5'></p>
                <p className='flex justify-between font-bold text-24 text-pink-0'><span>~50$</span><span>0.27 SOL</span></p>
              </div>
            </div>
            <div className='col-span-1 bg-gray-0 text-pink-50 md:rounded-10 overflow-hidden md:border border-solid border-blue-0'>
              <picture>
                <source media='(min-width: 768px)' srcSet='/assets/nft/under_img.png' />
                <img src="/assets/nft/under_img_sp.png" alt="" className='w-full' />
              </picture>
              <div className='px-4 pt-3.5 pb-0.5 hidden md:block'>
                <p className='text-24 text-blue-200 font-bungee leading-6'>#051733</p>
                <p className='text-12'><span className='font-bold'>Lottery:</span> Lifetime drawing with match 3.</p>
                <p className='text-12'><span className='font-bold uppercase'>MILLIGO:</span> 1 ticket for every IDO round.</p>
                <p className='w-full h-px bg-pink-50 opacity-50 mt-2.5'></p>
                <p className='flex justify-between font-bold text-24 text-pink-0'><span>~50$</span><span>0.27 SOL</span></p>
              </div>
            </div>
          </div>
          <div className='mt-10'>
            <Pagination count={10} showFirstButton showLastButton className={classes.root} />
          </div>
        </div>
      </section>
      <Footer></Footer>
      <ModalContent dataModal={dataModal.data} playerData={playerData.data}
          dataGiveFromModal={dataGiveFromModal} dataGiveFromWallet={dataGiveFromWallet}></ModalContent>
    </>
  )
}

export default NFT