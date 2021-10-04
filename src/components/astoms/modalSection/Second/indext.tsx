import React, { useEffect, useState } from 'react';
import useStyles from './styles';
type Props = {
  dataGiveSecond: (getDataSecond: any) => void,
  dataSendSecond: any,
  playerData: any
}
const Second: React.FC<Props> = ({dataGiveSecond, dataSendSecond, playerData}) => {
  const classes = useStyles();
  const [data, setData] = useState({
    data: {
      ticketCount: dataSendSecond.data.ticketCount,
      price: dataSendSecond.data.price,
      unit: dataSendSecond.data.unit,
      tickets: dataSendSecond.data.tickets,
      third: false,
      five: false,
    }
  });
  const handleInputMax = (event: React.MouseEvent) => {
    setData({
      data: {
        ...data.data,
        tickets: Array(99).fill(0).map(() => Array(6).fill(0).map(() => Math.floor(Math.random() * 45) + 1)),
        ticketCount: 99,
        price: data.data.unit * 99,
      }
    })
  }
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      data: {
        ...data.data,
        ticketCount: event.target.value !== '' ? parseInt(event.target.value) : 0,
        price: event.target.value !== '' ? data.data.unit * parseInt(event.target.value) : 0,
        tickets: event.target.value !== '' ? Array(parseInt(event.target.value)).fill(0).map(() => Array(6).fill(0).map(() => Math.floor(Math.random() * 45) + 1)) : [Array()]
      }
    })
  };
  const handleEditNumber = (event: React.MouseEvent) => {
    setData({
      data: {
        ...data.data,
        third: true,
      }
    })
  }
  const handleComfirm = (event: React.MouseEvent) => {
    setData({
      data: {
        ...data.data,
        five: true,
      }
    })
  }
  useEffect(() => {
    if(data.data.ticketCount > 0 && (data.data.third || data.data.five)) {
      dataGiveSecond(data.data);
    }
  }, [data])
  
  return (
    <>
      <div className={`${classes.body}`}>
        <div className={`${classes.buy}`}>
          <p className="title">Buy</p>
          <p className="icon">Tickets<span><img src="assets/common/icon_ticket_modal.svg" alt="ticket"/></span></p>
        </div>
        <div className={`${classes.inputNumber}`}>
          <input
            placeholder="0"
            maxLength={2}
            value={data.data.ticketCount}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            onChange={handleChangeInput}
          />
          <div className={`${classes.payunit}`}>
            <p className="name">SOL</p>
            <p>~{data.data.unit}</p>
          </div>
        </div>
        <p className={`${classes.balance}`}>SOL Balance: {playerData.balanceSOL}</p>
        <ul className={`${classes.listButton}`}>
          <li className="max" onClick={handleInputMax}>MAX</li>
        </ul>
      </div>
      <p className={`${classes.lineGray}`}><span></span></p>
      <div className={`${classes.footer}`}>
          <div className={`${classes.totalPay}`}>
            <p className="text">You pay</p>
            <p className="price">~ {data.data.price.toFixed(2)} SOL</p>
          </div>
          <ul className={`${classes.listButton}`}>
            <li onClick={handleComfirm}>Buy instantly</li>
            <li className="edit" onClick={handleEditNumber}>
              View / Edit numbers
              <span>
                <svg width="23" height="12" viewBox="0 0 23 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.36768 5.3335C0.953462 5.3335 0.617676 5.66928 0.617676 6.0835C0.617676 6.49771 0.953462 6.8335 1.36768 6.8335V5.3335ZM21.898 6.61383C22.1909 6.32093 22.1909 5.84606 21.898 5.55317L17.125 0.780195C16.8321 0.487302 16.3573 0.487302 16.0644 0.780195C15.7715 1.07309 15.7715 1.54796 16.0644 1.84086L20.307 6.0835L16.0644 10.3261C15.7715 10.619 15.7715 11.0939 16.0644 11.3868C16.3573 11.6797 16.8321 11.6797 17.125 11.3868L21.898 6.61383ZM1.36768 6.8335H21.3677V5.3335H1.36768V6.8335Z" fill="#17F0FF"/>
                </svg>
              </span>
            </li>
          </ul>
          <p className={`${classes.note}`}>"Buy instanly" allows you to pick no-duplicate random numbers to your tickets. By the time each round begins, prices will be set, evaluated to $2. Purchases are final.</p>
        </div>
    </>
  )
}

export default Second