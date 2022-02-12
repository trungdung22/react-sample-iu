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
    <div className={`${classes.root} px-3/100 md:pb-44 pb-36 pt-40`}>
      <div className='max-w-700 mx-auto'>
        {
          Math.round(partyData.gameBalanceUSDT) !== 0 ? (
            <h3>
              <span className='text-h2-sp md:text-h2-pc leading-none text-center block font-bold text-gray-primary'>Pump up the party</span>
              <span className='font-bungee text-banner-sp md:text-banner-pc text-blue-primary text-center leading-none block mt-9 md:mt-7 mb-8 md:mb-10'>
                $<CountUp separator="," duration={1.5} start={0} end={partyData.gameBalanceUSDT} />
              </span>
              <span className='text-h2-sp md:text-h2-pc leading-none text-center block font-bold text-gray-primary'>~<CountUp separator="," decimals={2} decimal="." duration={1.5} start={0} end={partyData.gameBalanceSol} /> MILLI</span>
            </h3>
          ) : (
            <h3>
              <span className='text-h2-sp md:text-h2-pc leading-none text-center block font-bold text-gray-primary'>Pump up the party</span>
              <ContentLoader
                viewBox="0 0 700 90"
                backgroundColor="#293333"
                foregroundColor="#575757"
              >
                <rect x="260" y="20" rx="4" ry="4" width="180" height="35" />
                <rect x="300" y="75" rx="4" ry="4" width="100" height="15" />
              </ContentLoader>
            </h3>
          )
        }
        
        <div className='relative w-119 md:w-148 mx-auto mt-14 md:mt-18'>
          <div className={`${playerData.is_connect ? 'cursor-pointer hover:opacity-75' : 'cursor-not-allowed'}`}
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
            <picture>
              <source media="(min-width: 768px)" srcSet="/assets/lottery/buyticket_pc.png" />
              <img src="/assets/lottery/buyticket_sp.png" alt=""/>
            </picture>
          </div>
          { showTooltipConnect && <p className='absolute top-full left-1/4 screen475:left-1/2 transform -translate-x-1/2 translate-y-2 z-100 border border-solid border-pink-primary bg-gray-box rounded-5 text-center py-1 w-32 md:w-36 text-pink-primary font-medium'>Connect wallet first</p> }
        </div>
      </div>
    </div>
  )
}

export default PartySection