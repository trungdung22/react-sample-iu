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
    getMillipads().then(data => {
      setGetDataMillipads(data.results)
    });
  }, [])

  const handleLoadClosedPool = () => {
    let resultClosed = [];
    // getDataMillipads.map((ele, index) => {
    //   console.log(ele, index);
    // })
    let countProject = 0;
    for(let i = getDataMillipads.length - 1; i >= 0; i--) {
      if (getDataMillipads[i].status === 'complete') {
        countProject++;
        resultClosed.push(
          <li key={i} className='relative md:rounded-10 overflow-hidden transition-all hover:opacity-80 cursor-pointer max-w-110 md:max-w-178 2xl:max-w-200'>
            <a href={`/MILLIGO/${getDataMillipads[i].code}`} className='block absolute top-0 left-0 w-full h-full md:rounded-10'></a>
            <img src="/assets/millipad/close_pool.png" alt={getDataMillipads[i].code} />
            <span className='text-10 md:text-14 text-pink-50 md:rounded-5 bg-gray-0 px-6 py-1 absolute bottom-0 md:bottom-2 left-0 md:left-2 font-bold'>Solana</span>
          </li>
        )
      }
    }
    for(let i = 0; i < 5 - countProject; i++) {
      resultClosed.push(
        <li key={countProject + i} className='relative md:rounded-10 overflow-hidden transition-all hover:opacity-80 cursor-pointer max-w-110 md:max-w-178 2xl:max-w-200'>
          <img src="/assets/millipad/under_rectangle.png" alt="Solana" />
          <span className='text-10 md:text-14 text-pink-50 md:rounded-5 bg-gray-0 px-6 py-1 absolute bottom-0 md:bottom-2 left-0 md:left-2 font-bold'>Solana</span>
        </li>
      )
    }
    return resultClosed;
  }
  

  return (
    <>
      <Header playerData={playerData.data} dataGiveFromHeader={dataGiveFromHeader}></Header>
      <section className='mb-28 md:mb-36 px-3/100 pt-14 md:pt-4 relative'>
        <div className='max-w-1110 mx-auto'>
          <p><img src="/assets/millipad/circle_02.png" alt="circle" className='mx-auto -mt-12 sm:-mt-20 md:-mt-24 lg:-mt-32' /></p>
          <h3 className='text-26 md:text-46 2xl:text-52 text-blue-0 text-center uppercase font-bungee mt-6 md:mt-8 mb-2 2xl:mb-0'>launching game, <br className='block lg:hidden' />nfts and more</h3>
          <p className='text-12 md:text-14 font-normal leading-6 text-center max-w-900 mx-auto mb-6 md:mb-8'>MILLIGO is an IGO multi-platform, raising funds for new gaming projects, NFTs and more. With MILLIGO, you won't need to lock your coins for staking, simply do the tasks or buy some NFT tickets to participate in IGO rounds for-ever!</p>
          <div className='relative'>
            <p className='onTooltip text-14 bg-blue-0 w-140 mx-auto px-0 py-2 md:px-3 text-blue-50 rounded-5 font-bold md:cursor-not-allowed mb-8 md:mb-12 text-center'
              onMouseLeave={() => {
                if(size.width > 768) {
                  setShowTooltip(false);
                }
              }}
              onMouseEnter={() => {
                if(size.width > 768) {
                  setShowTooltip(true);
                }
              }}
            >Buy NFTs</p>
            { showTooltip && <p className='absolute top-full left-1/2 transform -translate-x-1/2 translate-y-4 z-100 border border-solid border-pink-150 bg-purple-150 rounded-15 w-60 text-center py-3'>Coming real soon...</p> }
          </div>
          <p className='animation-pend'><img src="/assets/millipad/circle_02.png" alt="circle" className='mx-auto' /></p>
        </div>
      </section>
      <section className='mb-16 md:mb-28 px-3/100'>
        <h3 className='text-pink-0 font-bungee uppercase text-26 md:text-48 mb-8 md:mb-12 text-center'>upcoming Pools</h3>
        <div className='max-w-1110 mx-auto'>
          <div className='flex flex-wrap justify-center gap-5 2xl:gap-12'>
            <div className='rounded-20 overflow-hidden max-w-345 md:max-w-460 2xl:max-w-500 relative transition-all hover:opacity-70'>
              {
                getDataMillipads !== null && getDataMillipads[getDataMillipads.length - 1].status !== 'complete'
                ?
                <>
                  <a href={`/MILLIGO/${getDataMillipads[getDataMillipads.length - 1].code}`} className='block absolute top-0 left-0 w-full h-full rounded-20'></a>
                  <div className='block rounded-20 overflow-hidden'>
                    <p><img src="/assets/millipad/under_img.png" alt={getDataMillipads[getDataMillipads.length - 1].code} /></p>
                    <div className='bg-gray-0 p-3 md:px-6 md:py-4'>
                      <h4 className=' text-pink-0 font-bungee uppercase leading-none md:leading-normal text-30 md:mb-3'>{getDataMillipads[getDataMillipads.length - 1].code}</h4>
                      <p className='text-12 md:text-14 text-pink-50 mb-4'>The first crosschain Lottery platform with NFT tickets.</p>
                      <p className='text-14 text-blue-0 text-right font-bold'>Happenning...</p>
                      <p className='h-px mt-2 mb-3 md:my-4 bg-pink-100'></p>
                      <dl className='flex justify-between items-center'>
                        <dt className='text-pink-50 font-bold text-14 rounded-5 border inline-block py-1 px-6 border-solid'>Solana</dt>
                        <dd className='text-blue-0 text-16 md:text-18 leading-none md:leading-normal font-bold text-right'><span className='block md:inline'>Total raise:</span> 480,000 USDT</dd>
                      </dl>
                    </div>
                  </div>
                </>
                :
                <>
                  <div className='block rounded-20 overflow-hidden'>
                    <p><img src="/assets/millipad/under_rectangle_big.png" alt="Comming..." /></p>
                    <div className='bg-gray-0 p-3 md:px-6 md:py-4'>
                      <h4 className=' text-pink-0 font-bungee uppercase leading-none md:leading-normal text-30 md:mb-3'>Comming...</h4>
                      <p className='text-12 md:text-14 text-pink-50 mb-4'>Comming...</p>
                      <p className='text-14 text-blue-0 text-right font-bold'>Comming...</p>
                      <p className='h-px mt-2 mb-3 md:my-4 bg-pink-100'></p>
                      <dl className='flex justify-between items-center'>
                        <dt className='text-pink-50 font-bold text-14 rounded-5 border inline-block py-1 px-6 border-solid'>Solana</dt>
                        <dd className='text-blue-0 text-16 md:text-18 leading-none md:leading-normal font-bold text-right'>Comming...</dd>
                      </dl>
                    </div>
                  </div>
                </>
              }
              
            </div>
          </div>
        </div>
      </section>
      <section className='bg-purple-50 pt-10 pb-8 md:pb-5 px-3/100'>
        <div className='max-w-1110 mx-auto'>
          <h3 className='text-pink-0 font-bungee uppercase text-26 md:text-48 mb-4 md:mb-6 text-center'>closed Pools</h3>
          <ul className='flex flex-wrap justify-center gap-2 md:gap-4 2xl:gap-5'>
            {getDataMillipads !== null && handleLoadClosedPool()}
          </ul>
          <ul className='flex justify-center gap-4 mt-8'>
            <li className='cursor-pointer fill-white'>
              <svg className='max-w-20 md:max-w-26' width="26" height="12" viewBox="0 0 26 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.469669 5.46967C0.176777 5.76256 0.176777 6.23743 0.469669 6.53033L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 6L6.3033 1.75736C6.59619 1.46446 6.59619 0.989591 6.3033 0.696697C6.01041 0.403804 5.53553 0.403804 5.24264 0.696697L0.469669 5.46967ZM26 5.25L1 5.25L1 6.75L26 6.75L26 5.25Z" fill="#929292"/>
              </svg>
            </li>
            <li className='cursor-pointer fill-white'>
              <svg className='max-w-20 md:max-w-26' width="26" height="12" viewBox="0 0 26 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.5303 6.53033C25.8232 6.23744 25.8232 5.76256 25.5303 5.46967L20.7574 0.696699C20.4645 0.403806 19.9896 0.403806 19.6967 0.696699C19.4038 0.989593 19.4038 1.46447 19.6967 1.75736L23.9393 6L19.6967 10.2426C19.4038 10.5355 19.4038 11.0104 19.6967 11.3033C19.9896 11.5962 20.4645 11.5962 20.7574 11.3033L25.5303 6.53033ZM0 6.75H25V5.25H0V6.75Z" fill="#929292"/>
              </svg>
            </li>
          </ul>
        </div>
      </section>
      <Footer></Footer>
      <ModalContent dataGiveFromWallet={dataGiveFromWallet} playerData={playerData.data} dataModal={dataModal.data} dataGiveFromModal={dataGiveFromModal}></ModalContent>
    </>
  )
}
export default MILLIGO;