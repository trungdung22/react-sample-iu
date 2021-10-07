import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { HOST_NAME } from 'data/constants';
type Props = {
  playerData: any,
  sendDataNextToLottery: (getDataNextTolottery: any) => void,
}
const NextSection: React.FC<Props> = ({playerData, sendDataNextToLottery}) => {
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
    next_id: 0,
    created_time: new Date(),
    your_tickets: [],
  })

  useEffect(() => {
    debugger
    fetch(`${HOST_NAME}/api/next-game-info/${playerData.publicKey}`)
      .then(async response => {
        debugger
        const response_data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (response_data && response_data.message) || response.statusText;
          return Promise.reject(error);
        }
        const round_no = response_data.result.round_no; 
        const your_tickets = response_data.result.your_tickets;
        const created_time = new Date(response_data.result.created_time);
        debugger
        setData({
          view_ticket: data.view_ticket,
          get_ticket: data.get_ticket,
          next_id: round_no,
          created_time: created_time,
          your_tickets: your_tickets
        });
      })
  }, []);
  
  const handleViewTicket = (event: React.MouseEvent) => {
    if(data.your_tickets.length > 0) {
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
            <p className={`${classes.infoRound}`}><span>#{data.next_id}</span>Aug 18, 2021, 11:00 AM</p>
          </div>
          <div className={`${classes.footer}`}>
            <div className="yourticket">
              <p>Your Ticket</p>
              <p>You have <span onClick={handleViewTicket}>{data.your_tickets.length} ticket</span> to enter this party.</p>
            </div>
            <p className="getticket" onClick={handleGetTicket}>Get it now {`>`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NextSection