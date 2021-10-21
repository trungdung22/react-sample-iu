import React, { useState } from 'react';
import useStyles from './styles';
import { numberWithCommas } from 'lib/utilities/format';
import ContentLoader from 'react-content-loader';

type Props = {
  partyData: any,
  sendDataPartyToLottery: (getDataPartyTolottery: boolean) => void,
}

const PartySection: React.FC<Props> = ({partyData, sendDataPartyToLottery}) => {
  const classes = useStyles();
  

  return (
    <div className={`${classes.root}`}>
      <div className={`${classes.container}`}>
        {
          Math.round(partyData.gameBalanceUSDT) !== 0 ? (
            <h3><span>Pump the party</span>${numberWithCommas(Math.round(partyData.gameBalanceUSDT))}<span>~{parseFloat(partyData.gameBalanceSol).toFixed(2)} SOL</span></h3>
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
        
        <p className={`${classes.buyticket}`} onClick={() => sendDataPartyToLottery(true)}>
          <img src="/assets/lottery/ticket.svg" alt="ticket" />
          <span>Buy Ticket</span>
        </p>
      </div>
    </div>
  )
}

export default PartySection