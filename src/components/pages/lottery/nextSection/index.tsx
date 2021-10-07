import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { HOST_NAME } from 'data/constants';

type Props = {
  playerData: any,
  sendDataNextToLottery: (getDataNextTolottery: any) => void,
}
const NextSection: React.FC<Props> = ({playerData, sendDataNextToLottery}) => {
  const classes = useStyles();

  const handleViewTicket = (event: React.MouseEvent) => {
    if(playerData.your_tickets.length > 0) {
      const next_round = {
        next_id: playerData.next_id,
        your_ticket: playerData.your_tickets
      }
      sendDataNextToLottery({
        next_round: next_round,
        view_ticket: true,
        get_ticket: false,
      })
    }
  }
  const handleGetTicket = (event: React.MouseEvent) => {
    sendDataNextToLottery({
      next_round: {
        next_id: -1,
        your_ticket: []
      },
      view_ticket: false,
      get_ticket: true,
    })
  }
  return (
    <div className={`${classes.root}`}>
      <div className={`${classes.container}`}>
        <h3>12<sup>h</sup> 12<sup>m</sup><span>till the party</span></h3>
        <div className={`${classes.content}`}>
          <div className={`${classes.header}`}>
            <p className="title">Next Party</p>
            <p className={`${classes.infoRound}`}><span>#{playerData.next_id}</span>Aug 18, 2021, 11:00 AM</p>
          </div>
          <div className={`${classes.footer}`}>
            <div className="yourticket">
              <p>Your Ticket</p>
              <p>You have <span onClick={handleViewTicket}>{playerData.your_tickets.length} ticket</span> to enter this party.</p>
            </div>
            <p className="getticket" onClick={handleGetTicket}>Get it now {`>`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NextSection