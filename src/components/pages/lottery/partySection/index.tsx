import React, { useState } from 'react';
import useStyles from './styles';
import ContentLoader from 'react-content-loader';
import CountUp from 'react-countup';

type Props = {
  partyData: any,
  playerData: any,
  sendDataPartyToLottery: (getDataPartyTolottery: boolean) => void,
}

const PartySection: React.FC<Props> = ({playerData, partyData, sendDataPartyToLottery}) => {
  const [showTooltipConnect, setShowTooltipConnect] = useState(false);
  const classes = useStyles();
  
  return (
    <div className={`${classes.root} relative overflow-hidden`}>
      <p className='absolute top-32 md:top-40 lg:top-1/3 left-8 md:left-8 lg:left-20 w-6 md:w-10 lg:w-auto'><img src="./assets/lottery/star_01.svg" alt="" /></p>
      <p className='absolute bottom-20 block md:hidden md:top-40 lg:top-1/3 left-8 md:left-8 lg:left-20 w-6 md:w-10 lg:w-auto'><img src="./assets/lottery/star_01.svg" alt="" /></p>
      <p className='absolute block md:hidden bottom-10 right-20 w-12'><img src="./assets/lottery/star_01.svg" alt="" /></p>
      <p className='absolute bottom-24 md:top-1/2 right-4 md:right-8 lg:right-20'><img src="./assets/lottery/star_02.svg" alt="" /></p>
      <div className={`${classes.container} relative`}>
        <p className='absolute w-14 md:w-18 lg:w-110 translateLeftSmall christmas-santa'><img src="./assets/lottery/santa.png" alt="" /></p>
        <p className='absolute w-16 md:w-20 lg:w-auto translateRightSmall christmas-star_yellow01'><img src="./assets/lottery/star_yellow_01.png" alt="" /></p>
        <p className='absolute w-20 md:w-24 lg:w-auto translateRightSmall christmas-star_yellow02'><img src="./assets/lottery/star_yellow_02.png" alt="" /></p>
        <p className='absolute w-20 md:w-24 lg:w-auto translateLeftSmall christmas-hook'><img src="./assets/lottery/hook.png" alt="" /></p>
        {
          Math.round(partyData.gameBalanceUSDT) !== 0 ? (
            <h3>
              <span>Pump the party</span>
              <div>$<CountUp separator="," duration={1.5} start={0} end={partyData.gameBalanceUSDT} className='inline-block'/></div>
              <span>~<CountUp separator="," decimals={2} decimal="." duration={1.5} start={0} end={partyData.gameBalanceSol} />  SOL</span>
              <span>(+ <CountUp separator="," duration={1.5} start={0} end={500000} /> MILLI)</span>
            </h3>
          ) : (
            <h3>
              <span>Pump the party</span>
              <ContentLoader
                viewBox="0 0 700 90"
                backgroundColor="#fff"
                foregroundColor="#dcdcdc"
              >
                <rect x="260" y="20" rx="4" ry="4" width="180" height="35" />
                <rect x="300" y="75" rx="4" ry="4" width="100" height="15" />
              </ContentLoader>
            </h3>
          )
        }
        
        <div className='relative w-fit mx-auto'>
          <p className={`${classes.buyticket} ${playerData.is_connect ? 'cursor-pointer hover:opacity-75' : 'cursor-not-allowed'}`}
            onClick={() => {
              if(window.sessionStorage.getItem('isOverTimer') === 'false' && playerData.is_connect) {
                sendDataPartyToLottery(true)
              }
            }}
            onMouseLeave={() => {
              setShowTooltipConnect(false);
            }}
            onMouseEnter={() => {
              if(!playerData.is_connect) {
                setShowTooltipConnect(true);
              }
            }}
          >
            <img src="/assets/lottery/ticket.svg" alt="ticket" />
            <span>Buy Ticket</span>
          </p>
          { showTooltipConnect && <p className='absolute top-full left-3 md:left-16 transform translate-y-2 z-100 border border-solid border-pink-150 bg-purple-150 rounded-5 text-center text-12 md:text-14 pt-0.5 pb-1 text-white px-2'>Connect wallet first</p> }
        </div>
      </div>
    </div>
  )
}

export default PartySection