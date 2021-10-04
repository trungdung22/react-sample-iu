import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { dataTest } from 'data/db';
type Props = {
    dataSendToDetail: any,
  dataGiveDetail: (getDataDetail: any) => void
}
const Detail: React.FC<Props> = ({dataSendToDetail, dataGiveDetail}) => {
  
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
    debugger
    if(dataSendToDetail.your_tickets.length > 0) {
      dataGiveDetail({
        your_ticket: dataSendToDetail,
        view_your: true,
      })
    }
  }
  
  useEffect(()=>{
    debugger
    setData({
      id: 0,
      info: JSON.parse(JSON.stringify(dataTest.round_history))
    });
  }, []);
  return (
    <div className={`${classes.root}`}>
      <div className={`${classes.header}`}>
        <div className="top">
          <p className="title">
            {
              dataSendToDetail !== 0 ? (
                <span onClick={() => dataGiveDetail({
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
        </div>
        <p className={`${classes.infoRound}`}>
            <span>{`#${data.id}`}</span>
            {`${monthName[new Date(data['info'][0]['date']).getMonth()]}
            ${new Date(data['info'][0]['date']).getDate()}, 
            ${new Date(data['info'][0]['date']).getFullYear()}, 
            ${formatTime(new Date(data['info'][0]['date']).getHours())}:${formatTime(new Date(data['info'][0]['date']).getMinutes())} 
            ${(new Date(data['info'][0]['date']).getHours()) >= 12 ? 'PM' : 'AM' }`}
        </p>
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
        <div className="yourticket">
            <p>Your Ticket</p>
            <div>
            <p>You have <span >{dataSendToDetail.player_tickets.length} ticket</span> to enter this party.</p>
            <p onClick={handleViewTicket}>View your tickets</p>
            </div>
        </div>

        <div className={`slideToggle ${slide ? 'active' : ''}`}>
          <div className={`${classes.infoPrize}`}>
            <div className="prizeTop">
              <p className="text">Prize pot</p>
              <p className="total">{`~$${data['info'][0]['prize']}`}</p>
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

export default Detail