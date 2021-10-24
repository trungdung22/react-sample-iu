import Footer from 'components/astoms/footer';
import Header from 'components/astoms/header';
import ModalContent from 'components/astoms/modalSection';
import { isConnect } from 'data/db';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPlayerAccount } from 'lib/utilities/utils';
const MillipadUnConnected: React.FC = () => {
  const [flagStartRound, setFlagStartRound] = useState({
    whitelist: true,
    lottery: false,
    saleRound: false,
    isWindSale: false,
    distribution: false,
  })
  const [flagSlots, setFlagSlots] = useState({
    twitter: {
      waggle: 0,
      millionsy: 0,
      retweet: 0,
    },
    telegram: {
      waggle: 1,
      millionsy: 1,
      retweet: 1,
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
      millionsy: true,
      retweet: true,
    }
  })
  const [isNextStep, setIsNextStep] = useState(false);

  const [isActiveSelect, setIsActiveSelect] = useState(false);
  const [valueOption, setValueOption] = useState('');
  const [isFinishSaleRound, setIsFinishSaleRound] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState('telegram');
  const [showModalTicket, setShowModalTicket] = useState(false);
  const [timeCountDown, setTimeCountDown] = useState({
    days: '0',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

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
        show: true,
      }
    })
    if (getDataHeader.getDataHeader !== undefined && getDataHeader.publicKey !== '') {
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
    if (getDataWallet.is_connect) {
      fetchPlayerAccount(getDataWallet.publicKey).then(item => setPlayerData({
        data: {
          adapter_type: getDataWallet.adapter_type,
          is_connect: true,
          lamportUnit: item.lamportUnit,
          publicKey: getDataWallet.publicKey,
          balanceUSDT: item.balanceUSDT,
          balanceSOL: item.balanceSOL,
        }
      }));
      resetModalData();
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
  const [countDown, setCountDown] = useState(Number);
  const [windowOnLoad, setWindowOnLoad] = useState(false);
  useEffect(() => {
    setCountDown(new Date('Oct 31, 2021 13:45:00').getTime());
    setWindowOnLoad(true);
  }, [])

  useEffect(() => {
    if (windowOnLoad) {
      const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;
      const timer = setInterval(function() {    
        const now = new Date().getTime();
        const distance = countDown - now;
        if (distance < 1000) {
          clearInterval(timer);
          if(flagStartRound.whitelist) {
            setFlagStartRound({
              whitelist: false,
              lottery: true,
              saleRound: false,
              isWindSale: false,
              distribution: false,
            })
            setCountDown(new Date('Oct 31, 2021 13:45:05').getTime());
          }
          if(flagStartRound.lottery) {
            setFlagStartRound({
              whitelist: false,
              lottery: false,
              saleRound: true,
              isWindSale: true,
              distribution: false,
            })
            setCountDown(new Date('Oct 31, 2021 13:45:10').getTime());
          }
          if(flagStartRound.saleRound) {
            setFlagStartRound({
              whitelist: false,
              lottery: false,
              saleRound: false,
              isWindSale: false,
              distribution: true,
            })
            setCountDown(new Date('Oct 31, 2021 13:45:15').getTime());
          }
        }
        if (distance > 0) {
          setTimeCountDown({
            days: Math.floor(distance / (day)).toString(),
            hours: Math.floor((distance % (day)) / (hour)) < 10 ? '0' + Math.floor((distance % (day)) / (hour)) : Math.floor((distance % (day)) / (hour)).toString(),
            minutes: Math.floor((distance % (hour)) / (minute)) < 10 ? '0' + Math.floor((distance % (hour)) / (minute)) : Math.floor((distance % (hour)) / (minute)).toString(),
            seconds: Math.floor((distance % (minute)) / second) < 10 ? '0' + Math.floor((distance % (minute)) / second) : Math.floor((distance % (minute)) / second).toString(),
          })
        }
      }, 1000);
    }
  }, [countDown])
  return (
    <>
      <Header playerData={playerData.data} dataGiveFromHeader={dataGiveFromHeader}></Header>
      <section className='px-3/100 mb-7 md:mb-10'>
        <div className='max-w-900 mx-auto relative mt-54 md:mt-57'>
          <p className='absolute top-2 md:top-4 left-2 md:left-4 transition-all hover:opacity-70 w-5 md:w-auto'><Link to="/millipad"><img src="/assets/millipad/arrow_back.svg" alt="arrow_back"/></Link></p>
          <p><img src="/assets/millipad/banner.png" alt="banner"/></p>
          <h3 className='text-35 md:text-42 text-blue-0 text-center uppercase font-bungee mt-3 md:mt-5 md:mb-1'>MILLIONSY</h3>
          <p className='text-pink-50 text-center text-12 md:text-14 leading-5'>MILLIONSY is the first Solana-based cross-chain<br className='block md:hidden' /> platform, which has 3 main products: The Lottery<br className='block md:hidden' /> platform; the NFT ticket and the IDO platform for new<br className='block md:hidden' /> games - NFT projects called MILLIPAD.</p>
        </div>
      </section>
      <section className='px-3/100 mb-8 md:mb-10'>
        <div className='max-w-900 mx-auto'>
          <div className='flex flex-col md:flex-row gap-8'>
            <div className='rounded-10 bg-gray-150 flex-shrink-0'>
              <p className='flex items-center justify-between md:block text-14 text-pink-0 pl-4 md:pl-6 tablet992:pl-8 pr-6 tablet992:pr-12 py-3 md:py-2'>Followers<span className='text-26 md:text-20 block font-bungee'>250,000</span></p>
              <ul className='bg-gray-200 px-8 md:px-6 tablet992:px-12 py-6 md:pt-12 md:pb-13'>
                <li className='mb-4'><a href="/" target='_blank' className='flex items-center text-pink-50 text-14 hover:opacity-70 gap-4'><span><img src="/assets/millipad/icon_website.svg" alt="icon_website" /></span>Website</a></li>
                <li className='mb-4'><a href="/" target='_blank' className='flex items-center text-pink-50 text-14 hover:opacity-70 gap-4'><span><img src="/assets/millipad/icon_telegram.svg" alt="icon_telegram" /></span>Telegram</a></li>
                <li><a href="/" target='_blank' className='flex items-center text-pink-50 text-14 hover:opacity-70 gap-4'><span><img src="/assets/millipad/icon_twitter.svg" alt="icon_twitter" /></span>Twitter</a></li>
              </ul>
              <p className='flex md:block justify-between items-center text-14 text-pink-0 pl-4 md:pl-6 tablet992:pl-8 pr-6 tablet992:pr-12 py-4 leading-none'>Total raise:<span className='text-20 block font-bold'>200,000 USDT</span></p>
            </div>
            <div className='rounded-10 bg-gray-150 w-full'>
            <h4 className='text-14 md:text-20 text-pink-50 font-bold py-3 px-4 md:px-6 tablet992:px-12 flex flex-col md:flex-row justify-between md:items-center'>Will start in<span className='font-bungee text-blue-0 text-27 sm:text-28'>{timeCountDown.days} <span className='text-20'>days</span> : {timeCountDown.hours}<span className='text-20'>h</span> : {timeCountDown.minutes}<span className='text-20'>m</span> : {timeCountDown.seconds}<span className='text-20'>s</span></span></h4>
              <ul className='bg-gray-300'>
                <li className='px-4 md:px-6 tablet992:px-12 py-3 text-12 md:text-14 text-pink-50 border-b border-gray-250 border-solid bg-purple-100'><span className='text-16 font-bold block md:inline-block'>Whitelist<span className='hidden md:inline-block'>:</span></span> Register for the sale round and do tasks to claim slots.</li>
                <li className='px-4 md:px-6 tablet992:px-12 py-3 text-12 md:text-14 text-pink-50 border-b border-gray-250 border-solid'><span className='text-16 font-bold block md:inline-block'>Lottery<span className='hidden md:inline-block'>:</span></span> Choosing randomly the winners among participants.</li>
                <li className='px-4 md:px-6 tablet992:px-12 py-3 text-12 md:text-14 text-pink-50 border-b border-gray-250 border-solid'><span className='text-16 font-bold block md:inline-block'>Sale round<span className='hidden md:inline-block'>:</span></span> Only winners can participate in this round.</li>
                <li className='px-4 md:px-6 tablet992:px-12 py-3 text-12 md:text-14 text-pink-50'><span className='text-16 font-bold block md:inline-block'>Distribution<span className='hidden md:inline-block'>:</span></span> The tokens will be automatically sent to wallets.</li>
              </ul>
              <div className='flex items-center justify-between px-4 md:px-6 tablet992:px-12 py-6 md:py-3'>
                <p className='text-14 bg-gray-0 border border-solid border-pink-50 rounded-5 py-1 px-5 text-pink-50 font-bold'>Solana</p>
                <p className='text-14 md:text-16 cursor-pointer transition-all hover:opacity-70 px-8 pt-2 pb-2.5 rounded-5 font-bold bg-blue-0 text-blue-50' onClick={() => setDataModal({
                  data: {
                    ...dataModal.data,
                    show: true,
                  }
                })}>Connect Wallet</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='px-3/100 mb-12 md:mb-16'>
        <div className='max-w-900 mx-auto rounded-15 bg-gray-150 pt-6 md:pt-8 pb-10 md:pb-14'>
          <div className='px-4 md:px-6 tablet992:px-12'>
            <h4 className='text-pink-0 underline text-18 md:text-20 font-bold mb-10 md:mb-12'>Project Detail</h4>
            <div>
              <h5 className='text-blue-0 text-16 font-bold mb-4'>Features</h5>
              <p className='text-pink-50 text-12 md:text-14 text-justify md:text-left mb-2'>MILLIONSY is the first Solana-based cross-chain platform, which has 3 main products: The Lottery platform; the NFT ticket and the IDO platform for new games - NFT projects called MILLIPAD.</p>
              <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>By transferring the Lottery to the blockchain platform, we  want to reach international participants and give them the opportunity to establish the largest PRIZE POOL in history and really win it. More to that, when the cross-chain platform begins, MILLIONSY will allow you to own  essential tickets for the specific chain you want. </p>
              <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>Not only do its creators aim for it to be the largest lottery platform in history in the blockchain system, MILLIONSY also want to launch MILLIPAD. The platform that leverages a lottery PRIZE POOL to become an IDO model and collaborate with future projects is their significant goal. </p>
              <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>There is no need to say that Lottery has really become a part of mankind's culture. Many people think of it as a gaming product, but it is actually a high-volume industry that may also be referred to as a commodity.</p>
              <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>The psychology of the lottery is that people will be happy to spend $2 for a hope and for the pleasure of thinking about what might happen if they win millions of dollars. The need for buying Lottery is so huge that this industry has never died in real life.</p>
              <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>Now with Blockchain technology every transaction, whether a ticket sale, a jackpot win, commissions, or investment, passes via the blockchain. Because each block in the chain has a record of the transactions, a hacker would have to modify every single block in order to manipulate or compromise the lottery number, which is impossible.</p>
              <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>As a result, a blockchain lottery platform assures that there are no foul plays or lottery scandals in the ecosystem. This is a guarantee for an ever-expanding lottery industry.</p>
              <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>You are more than welcome to participate in the greatest blockchain celebration, as long as you have a wallet and at the price of just 2$ per ticket, you now have a chance to join the millionaire-club. Tickets will be available on their website and can be purchased by SOL and  MILLI. In the near future, you will be able to buy lottery tickets via Visa, PayPal, and other payment methods. </p>
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
            <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>Between September and October: Conducting Sale Rounds to fuel the initial development and growth. We appreciate the strong support from the community as well as  many funds that reached out to us. </p>
            <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>Especially, in October, Lottery platform and contract will be audited.</p>
            <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>Next, MILLIPAD and NFTs Ticket will be launched in November. Then in December, promoting social activities to keep building a community that shares our long term vision, also opening Live Drawing at this stage. </p>
            <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>From January to March 2020, cross-chain will be availabe in Millionsy platform. Users will be enable to buy ticket from other blockchains seamlessly. </p>
            <p className='text-pink-50 text-12 md:text-14 font-normal text-justify md:text-left mb-2'>From April to the end of 2022, completing Fiat Ticket Purchase feature. MILLIONSY will definately lead the next chapter of lottery industry with those unique and promising features.</p>
            <h5 className='text-blue-0 text-16 font-bold mb-3 md:mb-4 pt-3 md:pt-8'>Team</h5>
          </div>
          <p><img src="/assets/millipad/teams.png" alt="face"/></p>
        </div>
      </section>
      <Footer></Footer>
      <ModalContent dataGiveFromWallet={dataGiveFromWallet} playerData={playerData.data} dataModal={dataModal.data} dataGiveFromModal={dataGiveFromModal}></ModalContent>
    </>
  )
}
export default MillipadUnConnected;