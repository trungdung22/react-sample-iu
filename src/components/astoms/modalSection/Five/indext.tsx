import React, { useEffect, useState } from 'react';
import useStyles from './styles';
type Props = {
  dataGiveFive: (getDataFive: any) => void,
  dataSendFive: any,
}
const Five: React.FC<Props> = ({dataSendFive, dataGiveFive}) => {
  const classes = useStyles();
  console.log(dataSendFive);
  
  const [data, setData] = useState({
    data: {
      tickets: dataSendFive.data.tickets,
      price: dataSendFive.data.price,
      third: false,
      submit: false,
      flag_submit: false,
    }
  });
  const handleGoBack = (event: React.MouseEvent) => {
    setData({
      data: {
        ...data.data,
        third: true,
      }
    })
  }
  const handleSubmit = (event: React.MouseEvent) => {
    setData({
      data: {
        ...data.data,
        submit: true,
        flag_submit: true,
      }
    })
  }
  
  useEffect(() => {
    if(data.data.third || data.data.submit) {
      dataGiveFive(data.data);
    }
  }, [data])
  
  return (
    <>
      <div className={`${classes.body}`}>
        <div className={`${classes.buy}`}>
          <p className="title">Total cost</p>
          <p className="icon">~ {data.data.price.toFixed(2)} SOL</p>
        </div>
        <p className={`${classes.description}`}>Number are randomized, with no duplicates among your tickets. Tap a number to edit it.<br />Available digits: 01-45.</p>
        <ul className={`${classes.listButton}`}>
          <li className="random">Randomize</li>
        </ul>
        <div className={`${classes.listTickets}`}>
          { 
            data.data.tickets.map((el: [], index: number) => (
              <dl key={index}>
                <dt>#{index < 9 ? `00${index + 1}` : `0${index + 1}`}</dt>
                <dd>
                  <ul>
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
          <li className="confirming" onClick={handleSubmit}>
            Confirming
            <span>
              <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.93287 13.779C3.63991 14.0737 3.16493 14.0737 2.87197 13.779L0.219719 11.1116C-0.0732398 10.8169 -0.0732398 10.3392 0.219719 10.0446L2.87197 7.3771C3.16493 7.08246 3.63991 7.08246 3.93287 7.3771C4.22583 7.67174 4.22583 8.14945 3.93287 8.44409L2.56205 9.82277H12.3763C12.7906 9.82277 13.1265 9.48498 13.1265 9.0683V8.50882C13.1265 8.09214 13.4624 7.75435 13.8767 7.75435C14.291 7.75435 14.6268 8.09214 14.6268 8.50882V9.0683C14.6268 10.3183 13.6192 11.3317 12.3763 11.3317H2.56042L3.93287 12.712C4.22583 13.0067 4.22583 13.4844 3.93287 13.779Z" fill="#999999"/>
                <path d="M11.0671 6.6229C11.3601 6.91754 11.8351 6.91754 12.128 6.6229L14.7803 3.95543C15.0732 3.66079 15.0732 3.18309 14.7803 2.88845L12.128 0.22098C11.8351 -0.0736599 11.3601 -0.0736599 11.0671 0.22098C10.7742 0.515621 10.7742 0.993327 11.0671 1.28797L12.4415 2.67025H2.62413C1.38121 2.67025 0.373619 3.68361 0.373619 4.93366V5.49093C0.373619 5.90761 0.709481 6.2454 1.12379 6.2454C1.5381 6.2454 1.87396 5.90761 1.87396 5.49093V4.93366C1.87396 4.51698 2.20982 4.17919 2.62413 4.17919H12.436L11.0671 5.55591C10.7742 5.85055 10.7742 6.32826 11.0671 6.6229Z" fill="#999999"/>
              </svg>
            </span>
          </li>
          <li className="goback" onClick={handleGoBack}>
            <span>
              <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 9C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7V9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM17 7L1 7V9L17 9V7Z" fill="#999999"/>
              </svg>
            </span>
            Go back
          </li>
        </ul>
      </div>
    </>
  )
}

export default Five