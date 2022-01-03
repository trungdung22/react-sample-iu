import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import Parser from 'html-react-parser';
import ContentLoader from 'react-content-loader';

type Props = {
  nextData: any,
  playerData: any,
  sendDataNextToLottery: (getDataNextTolottery: any) => void,
}
const NextSection: React.FC<Props> = ({nextData, playerData, sendDataNextToLottery}) => {
  const classes = useStyles();
  const [showTooltipConnect, setShowTooltipConnect] = useState(false);
  const [timer, setTimer] = useState('');

  
  useEffect(() => {
    const countDownDate = nextData.closed_time.getTime();
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
        timerData = "DRAWING...";
      }
      setTimer(timerData);
    }, 0);
  
    return () => clearInterval(timerId);
  });
  useEffect(() => {
    if(timer === 'DRAWING...') {
      window.sessionStorage.setItem('isOverTimer', 'true')
    } else {
      window.sessionStorage.setItem('isOverTimer', 'false')
    }
  },[timer])
  


  const handleViewTicket = (event: React.MouseEvent) => {
    if(nextData.your_tickets.length > 0) {
      const next_round = {
        next_id: nextData.next_id,
        your_ticket: nextData.your_tickets
      }
      sendDataNextToLottery({
        next_round: next_round,
        view_ticket: true,
        get_ticket: false,
      })
    }
  }
  
  const handleGetTicket = (event: React.MouseEvent) => {
    if(window.sessionStorage.getItem('isOverTimer') === 'false' && playerData.is_connect) {
      sendDataNextToLottery({
        next_round: {
          next_id: -1,
          your_ticket: []
        },
        view_ticket: false,
        get_ticket: true,
      })
    }
  }

  const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className={`${classes.root} relative`}>
      <p className='absolute hidden md:block top-72 left-20'><img src="./assets/lottery/star_03.svg" alt="" /></p>
      <p className='absolute bottom-20 hidden lg:block xl:top-0 right-20 xl:right-40 2xl:right-80 w-10 xl:w-auto'><img src="./assets/lottery/star_04.svg" alt="" /></p>
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
        
        <div className={`${classes.content} relative`}>
          <p className='absolute -top-4 md:-top-6 right-0 w-32 md:w-auto'><img src="./assets/lottery/sky_01.svg" alt="" /></p>
          {
            nextData.next_id > 0 ? (
              <>
                <div className={`${classes.header}`}>
                  <p className="title">Next Party</p>
                  <p className={`${classes.infoRound}`}>
                    <span>#{nextData.next_id}</span>
                    {
                      `${monthName[nextData.closed_time.getUTCMonth()]} ${nextData.closed_time.getUTCDate()}, 
                      ${nextData.closed_time.getFullYear()}, 
                      11:00 AM UTC`
                    }
                  </p>
                </div>
                <div className={`${classes.footer}`}>
                  <div className="yourticket">
                    <p>Your Ticket</p>
                    <p>You have <span onClick={handleViewTicket}>{nextData.your_tickets.length} ticket</span> to enter this party.</p>
                  </div>
                  <div className='relative w-fit mx-auto md:mx-0'>
                    <p className={`getticket ${playerData.is_connect ? 'cursor-pointer hover:opacity-75' : 'cursor-not-allowed'}`}
                      onClick={handleGetTicket}
                      onMouseLeave={() => {
                        setShowTooltipConnect(false);
                      }}
                      onMouseEnter={() => {
                        if(!playerData.is_connect) {
                          setShowTooltipConnect(true);
                        }
                      }}
                    >Buy ticket</p>
                    { showTooltipConnect && <p className='absolute top-full left-3 md:left-1.5 transform translate-y-2 z-100 border border-solid border-pink-150 bg-purple-150 rounded-5 text-center text-12 md:text-14 pt-0.5 pb-1 text-white px-2'>Connect wallet first</p> }
                  </div>
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