import React, { useState } from 'react';
import useStyles from './styles';
import {numberWithCommas} from '../../../../lib/utilities/format';

type Props = {
  partyData: any,
  sendDataPartyToLottery: (getDataPartyTolottery: boolean) => void,
}

const PartySection: React.FC<Props> = ({partyData, sendDataPartyToLottery}) => {
  const classes = useStyles();
  

  return (
    <div className={`${classes.root}`}>
      <div className={`${classes.container}`}>
        <h3><span>Pump the party</span>${numberWithCommas(partyData.gameBalanceUSDT)}<span>~{partyData.gameBalanceSol} SOL</span></h3>
        <p className={`${classes.buyticket}`} onClick={() => sendDataPartyToLottery(true)}>
          <img src="assets/lottery/ticket.svg" alt="ticket" />
          <span>Buy Ticket</span>
        </p>
      </div>
    </div>
  )
}

export default PartySection