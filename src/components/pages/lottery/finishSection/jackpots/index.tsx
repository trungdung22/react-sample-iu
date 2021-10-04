import React from 'react';
import useStyles from './styles';
const Jackpots: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={`${classes.root}`}>
      <div className={`${classes.header}`}>
        <div className="top">
          <p className="title">Round</p>
          <ul>
            <li>
              <svg width="26" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.292892 7.2929C-0.0976315 7.68342 -0.0976314 8.31658 0.292893 8.70711L6.65686 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928934C7.68054 0.538409 7.04738 0.538409 6.65685 0.928934L0.292892 7.2929ZM26 7L1 7L1 9L26 9L26 7Z" fill="#A2A2A2"/>
              </svg>
            </li>
            <li>
              <svg width="26" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z" fill="#A1A1A1"/>
              </svg>
            </li>
            <li>
              <svg width="28" height="16" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z" fill="#A1A1A1"/>
                <line x1="27" y1="2" x2="27" y2="13" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </li>
          </ul>
        </div>
        <p className={`${classes.infoRound}`}><span>#14</span>Aug 18, 2021, 11:00 AM</p>
      </div>
      <div className={`${classes.body}`}>
        <div className={`${classes.infoPrize}`}>
          <p className="text">Total prize</p>
          <p className="total">~$228.071</p>
          <p className="unit">190 SOL</p>
        </div>
      </div>
      <p className={`${classes.footer}`}>c25B270f8FB878c6Ccf7128d4EE6e43405F</p>
    </div>
  )
}

export default Jackpots