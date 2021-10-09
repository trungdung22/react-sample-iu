import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { HOST_NAME } from 'data/constants';
import Parser from 'html-react-parser';
import {prettyPrintTime} from '../../../../lib/utilities/format';

type Props = {
  playerData: any,
  sendDataNextToLottery: (getDataNextTolottery: any) => void,
}
const NextSection: React.FC<Props> = ({playerData, sendDataNextToLottery}) => {
  const classes = useStyles();
  const [timer, setTimer] = useState("12<sup>h</sup> 12<sup>m</sup>");

  useEffect(() => {
    const countDownDate = playerData.closed_time.getTime();
    const timerId = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();
    
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
    
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
      // Display the result in the element with id="demo"
      var timerData = ""

      if (days > 0) {
        timerData = days + "<sup>d</sup> " + hours + "<sup>h</sup> " + minutes + "<sup>m</sup> " + seconds + "<sup>s</sup> ";
      } else {
        timerData = hours + "<sup>h</sup> " + minutes + "<sup>m</sup> " + seconds + "<sup>s</sup> ";
      }
      
      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(timerId);
        timerData = "EXPIRED";
      }
      setTimer(timerData);
    }, 1000);
  
    return () => clearInterval(timerId);
  });


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
        <h3>{Parser(timer)}<span>till the party</span></h3>
        <div className={`${classes.content}`}>
          <div className={`${classes.header}`}>
            <p className="title">Next Party</p>
            <p className={`${classes.infoRound}`}>
              <span>#{playerData.next_id}</span>
              {prettyPrintTime(playerData.closed_time)}
            </p>
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