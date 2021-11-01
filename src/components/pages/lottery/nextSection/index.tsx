import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { HOST_NAME } from 'data/constants';
import Parser from 'html-react-parser';
import {prettyPrintTime} from '../../../../lib/utilities/format';
import ContentLoader from 'react-content-loader';

type Props = {
  playerData: any,
  sendDataNextToLottery: (getDataNextTolottery: any) => void,
}
const NextSection: React.FC<Props> = ({playerData, sendDataNextToLottery}) => {
  const classes = useStyles();
  const [timer, setTimer] = useState('');

  
  useEffect(() => {
    console.log(playerData);
    
    
    const countDownDate = playerData.closed_time.getTime();
    const timerId = setInterval(function() {

      // Get today's date and time
      const now = new Date().getTime();
    
      // Find the distance between now and the count down date
      const distance = countDownDate - now;
    
      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
      // Display the result in the element with id="demo"
      let timerData = ""

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
    }, 0);
  
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

  const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className={`${classes.root}`}>
      <div className={`${classes.container}`}>
        <h3>
          {
            timer == '' ? (
              <ContentLoader
                viewBox="0 0 700 55"
                backgroundColor="#fff"
                foregroundColor="#dcdcdc"
              >
                <rect x="140" y="0" rx="4" ry="4" width="420" height="55" />
              </ContentLoader>
            ) : Parser(timer)
          }
        <span>till the party</span></h3>
        
        <div className={`${classes.content}`}>
          {
            playerData.next_id > 0 ? (
              <>
                <div className={`${classes.header}`}>
                  <p className="title">Next Party</p>
                  <p className={`${classes.infoRound}`}>
                    <span>#{playerData.next_id}</span>
                    {
                      `${monthName[playerData.closed_time.getUTCMonth()]} ${playerData.closed_time.getUTCDate()}, 
                      ${playerData.closed_time.getFullYear()}, 
                      11:00 AM UTC`
                    }
                  </p>
                </div>
                <div className={`${classes.footer}`}>
                  <div className="yourticket">
                    <p>Your Ticket</p>
                    <p>You have <span onClick={handleViewTicket}>{playerData.your_tickets.length} ticket</span> to enter this party.</p>
                  </div>
                  <p className="getticket" onClick={handleGetTicket}>Get it now {`>`}</p>
                </div>
              </>
            ) : (
              <ContentLoader
                viewBox="0 0 700 270"
                backgroundColor="#fff"
                foregroundColor="#dcdcdc"
              >
                <rect x="32" y="32" rx="4" ry="4" width="120" height="15" />
                <rect x="32" y="64" rx="4" ry="4" width="636" height="50" />
                <rect x="32" y="180" rx="4" ry="4" width="120" height="15" />
                <rect x="32" y="220" rx="4" ry="4" width="300" height="15" />
                <rect x="468" y="180" rx="8" ry="8" width="200" height="60" />
              </ContentLoader>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default NextSection