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
      let timerData = "";

      if (days > 0) {
        timerData = days + "<span class='uppercase text-h1-sp md:text-h1-pc'>d</span> " + hours + "<span class='uppercase text-h1-sp md:text-h1-pc'>h</span>" + minutes + "<span class='uppercase text-h1-sp md:text-h1-pc'>m</span> " + seconds + "<span class='uppercase text-h1-sp md:text-h1-pc'>s</span> ";
      } else {
        timerData = hours + "<span class='uppercase text-h1-sp md:text-h1-pc'>h</span> " + minutes + "<span class='uppercase text-h1-sp md:text-h1-pc'>m</span> " + seconds + "<span class='uppercase text-h1-sp md:text-h1-pc'>s</span> ";
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
    // if(nextData.your_tickets.length > 0) {
      const next_round = {
        next_id: nextData.next_id,
        your_ticket: nextData.your_tickets
      }
      sendDataNextToLottery({
        next_round: next_round,
        view_ticket: true,
        get_ticket: false,
      })
    // }
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
    <div className='px-3/100 py-16 md:pb-44 md:pt-10'>
      <div className='max-w-700 mx-auto'>
        <h3 className='font-bungee text-banner-sp md:text-banner-pc text-blue-primary text-center leading-none'>
          {
            timer == '' ? (
              <ContentLoader
                viewBox="0 0 700 55"
                backgroundColor="#293333"
                foregroundColor="#575757"
              >
                <rect x="140" y="0" rx="4" ry="4" width="420" height="55" />
              </ContentLoader>
            ) : Parser(timer)
          }
        </h3>
        <h2 className='text-h2-sp md:text-h2-pc font-bold text-center leading-none mt-4 mb-10 text-gray-primary'>till the draw</h2>
        
        <div className='bg-gray-box rounded-10 border border-solid border-gray-boxline-50'>
          {
            nextData.next_id > 0 ? (
              <>
                <div className='p-3.5 md:px-8 md:pt-4 md:pb-8'>
                  <p className='text-h3-sp md:text-h3-pc font-bold mb-2 md:mb-3 text-gray-primary'>Ongoing party</p>
                  <p className='bg-gray-lightbox text-right rounded-5 flex justify-between items-center pr-2.5'>
                    <span className='text-h3-sp md:text-h3-pc font-semibold text-gray-primary p-2 md:px-8 text-center bg-pink-primary rounded-5 inline-block'>#{nextData.next_id}</span>
                    {`${monthName[nextData.closed_time.getUTCMonth()]} ${nextData.closed_time.getUTCDate()}, 
                      ${nextData.closed_time.getFullYear()}, 
                      2:00 PM UTC`}
                  </p>
                </div>
                <p className='bg-gray-boxline opacity-50 h-px'></p>
                <div className='px-3.5 py-1.5 md:px-8 md:pt-6 md:pb-5 flex items-end justify-between'>
                  <div>
                    <p className='text-h3-sp md:text-h3-pc font-bold md:mb-1 text-gray-primary'>Your Ticket</p>
                    <p>You have <span onClick={handleViewTicket} className='text-blue-secondary underline cursor-pointer hover:opacity-70 inline-block font-bold'>{nextData.your_tickets.length} ticket</span> to enter this party.</p>
                  </div>
                  <div className='relative w-92 md:w-115'>
                    <p className={`bg-blue-primary flex items-center justify-center h-32px md:h-34px font-semibold text-gray-box rounded-5 ${playerData.is_connect ? 'cursor-pointer hover:opacity-75' : 'cursor-not-allowed'}`}
                      onClick={handleGetTicket}
                      onMouseLeave={() => {
                        setShowTooltipConnect(false);
                      }}
                      onMouseEnter={() => {
                        if(!playerData.is_connect) {
                          setShowTooltipConnect(true);
                        }
                      }}
                    >Buy ticket
                      <span className='inline-block ml-1 md:ml-2 w-2.5 md:w-3.5'>
                        <svg className='w-full' width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M11.2375 1.60002L1.58121 5.25002C1.55868 5.26062 1.53963 5.27742 1.52629 5.29845C1.51294 5.31947 1.50586 5.34386 1.50586 5.36877C1.50586 5.39367 1.51294 5.41806 1.52629 5.43909C1.53963 5.46011 1.55868 5.47691 1.58121 5.48752L5.71246 7.25627C5.72793 7.26255 5.74198 7.27188 5.75379 7.28368C5.7656 7.29549 5.77492 7.30955 5.78121 7.32502L7.54996 11.4563C7.56056 11.4788 7.57736 11.4978 7.59839 11.5112C7.61942 11.5245 7.64381 11.5316 7.66871 11.5316C7.69361 11.5316 7.718 11.5245 7.73903 11.5112C7.76005 11.4978 7.77685 11.4788 7.78746 11.4563L11.4 1.76252C11.4091 1.7398 11.4113 1.71491 11.4064 1.69095C11.4014 1.66698 11.3896 1.64498 11.3723 1.62768C11.355 1.61037 11.333 1.59853 11.309 1.59361C11.2851 1.5887 11.2602 1.59092 11.2375 1.60002V1.60002Z" stroke="#1A2222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </p>
                    { showTooltipConnect && <p className='absolute top-full right-0 md:left-1/2 transform md:-translate-x-1/2 translate-y-2 z-100 border border-solid border-pink-primary bg-gray-box rounded-5 text-center py-1 w-32 md:w-36 text-pink-primary font-medium'>Connect wallet first</p> }
                  </div>
                </div>
              </>
            ) : (
              <ContentLoader
                viewBox="0 0 700 270"
                backgroundColor="#293333"
                foregroundColor="#575757"
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