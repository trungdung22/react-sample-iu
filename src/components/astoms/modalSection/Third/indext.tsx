import React, { useEffect, useState } from 'react';
import useStyles from './styles';
type Props = {
  dataGiveThird: (getDataThird: any) => void,
  dataSendThird: any,
}
const Third: React.FC<Props> = ({dataSendThird, dataGiveThird}) => {
  const classes = useStyles();
  const [data, setData] = useState({
    data: {
      tickets: dataSendThird.data.tickets,
      second: false,
      four: false,
      five: false,
      ticketChanges: {
        id: -1,
        numberChange: []
      }
    }
  });
  const handleRandomTickets = (event: React.MouseEvent) => {
    setData({
      data: {
        ...data.data,
        tickets: Array(dataSendThird.data.ticketCount).fill(0).map(() => Array(6).fill(0).map(() => Math.floor(Math.random() * 45) + 1))
      }
    })
  }
  const handleGoBack = (event: React.MouseEvent) => {
    setData({
      data: {
        ...data.data,
        second: true,
      }
    })
  }
  const handleConfirm = (event: React.MouseEvent) => {
    setData({
      data: {
        ...data.data,
        five: true,
      }
    })
  }
  const handleChangeNumber = (event: React.MouseEvent, index: number) => {
    const currentChangeNumber: any = [];
    event.currentTarget.childNodes.forEach((el) => {
      if(el.textContent !== null) {
        currentChangeNumber.push(parseInt(el.textContent))
      }
    })
    
    setData({
      data: {
        ...data.data,
        ticketChanges: {
          id: index,
          numberChange: currentChangeNumber
        },
        four: true,
      }
    })
  }
  
  useEffect(() => {
    if(data.data.second || data.data.four || data.data.five) {
      dataGiveThird(data.data);
    }
  }, [data])
  
  return (
    <>
      <div className={`${classes.body}`}>
        <div className={`${classes.buy}`}>
          <p className="title">Total cost</p>
          <p className="icon">~ {dataSendThird.data.price.toFixed(2)} SOL</p>
        </div>
        <p className={`${classes.description}`}>Number are randomized, with no duplicates among your tickets. Tap a number to edit it.<br />Available digits: 01-45.</p>
        <ul className={`${classes.listButton}`}>
          <li className="random" onClick={handleRandomTickets}>Randomize</li>
        </ul>
        <div className={`${classes.listTickets}`}>
          { 
            data.data.tickets.map((el: [], index: number) => (
              <dl key={index}>
                <dt>#{index < 9 ? `00${index + 1}` : `0${index + 1}`}</dt>
                <dd>
                  <ul onClick={(event)=>handleChangeNumber(event, index)}>
                    {
                      el.map((item, index) => (
                        <li key={index}>{item < 10 ? `0${item}` : item}</li>
                      ))
                    }
                  </ul>
                </dd>
              </dl>
            ))
          }
        </div>
      </div>
      <p className={`${classes.lineGray}`}><span></span></p>
      <div className={`${classes.footer}`}>
        <ul className={`${classes.listButton}`}>
          <li onClick={handleConfirm}>Confirm and Buy</li>
          <li className="goback" onClick={handleGoBack}>
            <span>
              <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 9C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7V9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM17 7L1 7V9L17 9V7Z" fill="#D47DFF"/>
              </svg>
            </span>
            Go back
          </li>
        </ul>
      </div>
    </>
  )
}

export default Third