import React, { useEffect, useState } from 'react';
import useStyles from './styles';
type Props = {
  sendDataNextToLottery: (getDataNextTolottery: any) => void,
}
const NextSection: React.FC<Props> = ({sendDataNextToLottery}) => {
  const classes = useStyles();
  const dataTicket = {
    next_id: 15,
    your_ticket: [
      [11, 22, 11, 32, 11, 45],
      [33, 22, 12, 43, 12, 16],
      [24, 11, 12, 43, 12, 16],
      [24, 11, 12, 43, 12, 16],
      [24, 11, 12, 43, 12, 16],
      [24, 11, 12, 43, 12, 16]
    ]
  }
  const [data, setData] = useState({
    view_ticket: false,
    get_ticket: false,
    next_round: dataTicket,
  })
  const handleViewTicket = (event: React.MouseEvent) => {
    if(data.next_round.your_ticket.length > 0) {
      sendDataNextToLottery({
        next_round: dataTicket,
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
            <p className={`${classes.infoRound}`}><span>#15</span>Aug 18, 2021, 11:00 AM</p>
          </div>
          <div className={`${classes.footer}`}>
            <div className="yourticket">
              <p>Your Ticket</p>
              <p>You have <span onClick={handleViewTicket}>{data.next_round.your_ticket.length} ticket</span> to enter this party.</p>
            </div>
            <p className="getticket" onClick={handleGetTicket}>Get it now {`>`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NextSection