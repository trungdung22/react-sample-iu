import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { dataTest } from 'data/db';
type Props = {
  dataSendToAll: any,
  dataGiveAll: (getDataAll: any) => void
}
const All: React.FC<Props> = ({dataSendToAll, dataGiveAll}) => {
  
  const [slide, setSlide] = useState(true);
  const [data, setData] = useState({
    id: 0,
    info: []
  });
  const classes = useStyles();
  const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formatTime = (time: number) => {
    return time < 10 ?  '0' + time : time;
  }
  const handleViewTicket = (event: React.MouseEvent) => {
    if(dataSendToAll.your_tickets.length > 0) {
      dataGiveAll({
        your_ticket: dataSendToAll,
        view_your: true,
      })
    }
  }
  
  useEffect(()=>{
    setData({
      id: dataSendToAll !== 0 ? dataSendToAll.id - 1 : dataTest.round_history.length - 1,
      info: JSON.parse(JSON.stringify(dataTest.round_history))
    });
  }, []);
  return (
    <div className={`${classes.root}`}>
      <div className={`${classes.header}`}>
        <div className="top">
          <p className="title">
            {
              dataSendToAll !== 0 ? (
                <span onClick={() => dataGiveAll({
                  back_your: true,
                })}
              >
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 9C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7V9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM17 7L1 7V9L17 9V7Z" fill="#F4E0FF"/>
                </svg>
              </span>
              ) : ''
            }
            Round
          </p>
          {
            dataSendToAll === 0 ? (
              <ul>
                <li onClick={() => setData({id: data['id'] === 0 ? data['id'] : data['id'] - 1, info: data['info']})}>
                  <svg width="26" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.292892 7.2929C-0.0976315 7.68342 -0.0976314 8.31658 0.292893 8.70711L6.65686 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928934C7.68054 0.538409 7.04738 0.538409 6.65685 0.928934L0.292892 7.2929ZM26 7L1 7L1 9L26 9L26 7Z" fill="#A2A2A2"/>
                  </svg>
                </li>
                <li onClick={() => setData({id: data['id'] === data['info'].length - 1 ? data['id'] : data['id'] + 1, info: data['info']})}>
                  <svg width="26" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z" fill="#A1A1A1"/>
                  </svg>
                </li>
                <li onClick={() => setData({id: data['info'].length - 1, info: data['info']})}>
                  <svg width="28" height="16" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z" fill="#A1A1A1"/>
                    <line x1="27" y1="2" x2="27" y2="13" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </li>
              </ul>
            ) : ''
          }
          
        </div>
        {data['info'].length > 0 ? (
          <p className={`${classes.infoRound}`}>
            <span>{`#${data['info'][data.id]['id']}`}</span>
            {`${monthName[new Date(data['info'][data.id]['date']).getMonth()]} ${new Date(data['info'][data.id]['date']).getDate()}, ${new Date(data['info'][data.id]['date']).getFullYear()}, ${formatTime(new Date(data['info'][data.id]['date']).getHours())}:${formatTime(new Date(data['info'][data.id]['date']).getMinutes())} ${(new Date(data['info'][data.id]['date']).getHours()) >= 12 ? 'PM' : 'AM' }`}
          </p>
        ) : ''}
      </div>
      <div className={`${classes.body}`}>
        <div className="content">
          <p className="text">Winning Number</p>
          {data['info'].length > 0 ? (
            <ul className="number">
              {[...data['info'][data.id]['winning_ticket']].map((element, index) => (<li key={index}>{element < 10 ? `0${element}` : element}</li>))}
            </ul>
          ) : ''}
          
        </div>
        {
          dataSendToAll !== 0 ? (
            <div className="yourticket">
              <p>Your Ticket</p>
              <div>
                <p>You have <span >{dataSendToAll.your_tickets.length} ticket</span> to enter this party.</p>
                <p onClick={handleViewTicket}>View your tickets</p>
              </div>
            </div>
          ): ''
        }
        <div className={`slideToggle ${slide ? 'active' : ''}`}>
          <div className={`${classes.infoPrize}`}>
            <div className="prizeTop">
              <p className="text">Prize pot</p>
              {data['info'].length > 0 ? (
                <p className="total">{`~$${data['info'][data.id]['prize']}`}</p>
              ) : ''}
              
              <p className="unit">190 SOL</p>
            </div>
            <ul className="prizeMatch">
              <li>
                <span>Match  3</span>
                <span>190 SOL</span>
                <span>806 Winners</span>
              </li>
              <li>
                <span>Match  4</span>
                <span>190 SOL</span>
                <span>806 Winners</span>
              </li>
              <li>
                <span>Match  5</span>
                <span>190 SOL</span>
                <span>806 Winners</span>
              </li>
              <li>
                <span>Match  6</span>
                <span>190 SOL</span>
                <span>806 Winners</span>
              </li>
              <li>
                <span>Burn</span>
                <span>190 SOL</span>
                <span>806 Winners</span>
              </li>
            </ul>
            <p className="totalMatch">Total players this round: <span>9786</span></p>
          </div>
        </div>
      </div>
      <p className={`${classes.footer}`} onClick={() => setSlide(!slide)}>
        {slide ? (
          <>
            Detail
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L0.535899 -6.52533e-07L7.4641 -4.68497e-08L4 6Z" fill="#17F0FF"/>
            </svg>
          </>
        ) :
          <>
            Hide
            <span>
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 0L7.4641 6L0.535898 6L4 0Z" fill="#17F0FF"/>
              </svg>
            </span>
          </>
        }
        
      </p>
    </div>
  )
}

export default All