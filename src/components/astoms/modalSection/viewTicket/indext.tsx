import React, { useState } from 'react';
import useStyles from './styles';
type Props = {
  dataSendViewTicket: any,
  dataGiveViewTicket: (getDataViewTicket: boolean) => void,
}
const ViewTicket: React.FC<Props> = ({dataSendViewTicket, dataGiveViewTicket}) => {
  const classes = useStyles();
  const [data, setData] = useState({
    tickets: dataSendViewTicket.next_round.your_ticket,
  })
  
  return (
    <>
      <div className={`${classes.body}`}>
        <p className="title">Your tickets</p>
        <div className={`${classes.listTickets}`}>
          { 
            data.tickets.map((el: [], index: number) => (
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
      <div className={`${classes.footer}`}>
          <ul className={`${classes.listButton}`}>
            <li onClick={() => dataGiveViewTicket(true)}>Buy ticket</li>
          </ul>
        </div>
    </>
  )
}

export default ViewTicket