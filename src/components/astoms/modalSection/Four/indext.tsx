import React, { useEffect, useState } from 'react';
import useStyles from './styles';
type Props = {
  dataGiveFour: (getDataFour: any) => void,
  dataSendFour: any,
}
const Four: React.FC<Props> = ({dataSendFour, dataGiveFour}) => {
  
  const classes = useStyles();
  const [data, setData] = useState({
    data: {
      tickets: dataSendFour.data.tickets,
      ticketChanges: {
        id: dataSendFour.data.ticketChanges.id,
        numberChange: dataSendFour.data.ticketChanges.numberChange,
      }
    }
  });

  const [dataChoose, setDataChoose] = useState({
    value: data.data.ticketChanges.numberChange[0],
    idx: 0
  });

  const handleOnClickTicket = (event: React.MouseEvent, index: number) => {
    
    if(event.currentTarget.childNodes[0].textContent !== null) {
      setDataChoose({
        value: parseInt(event.currentTarget.childNodes[0].textContent),
        idx: index
      })
    }
  }

  const handleOnClickChooseNumber = (event: React.MouseEvent) => {
    let cloneNumberChange = data.data.ticketChanges.numberChange;
    if(event.currentTarget.childNodes[0].textContent !== null) {
      const index = dataChoose.idx > 4 ? 0 : dataChoose.idx + 1;
      setDataChoose({
        value: parseInt(event.currentTarget.childNodes[0].textContent),
        idx: index,
      })
      cloneNumberChange[index] = parseInt(event.currentTarget.childNodes[0].textContent);
      setData({
        data: {
          ...data.data,
          ticketChanges: {
            ...data.data.ticketChanges,
            numberChange: cloneNumberChange,
          }
        }
      })
    }
  }
  const handleSendData = () => {
    let cloneTickets = data.data.tickets;
    cloneTickets[data.data.ticketChanges.id] = data.data.ticketChanges.numberChange
    setData({
      data: {
        tickets: cloneTickets,
        ticketChanges: {
          id: -1,
          numberChange: [],
        }
      }
    })
  }
  useEffect(() => {
    if (data.data.ticketChanges.id < 0) {
      dataGiveFour(data.data);
    }
  }, [data])
  
  return (
    <>
      <div className={`${classes.body}`}>
        <ul className={`${classes.chooseNumber} test`}>
          {
            Array(45).fill(0).map((el, index) => (
              <li key={index} className={`${index + 1 == dataChoose.value ? 'active' : ''}`} onClick={handleOnClickChooseNumber}>{index < 9 ? `0${index + 1}` : index + 1}</li>
            ))
          }
        </ul>
      </div>
      <ul className={`${classes.listNumber}`}>
        {
          data.data.ticketChanges.numberChange.map((el: number, index: number) => (
            <li key={index} className={index === dataChoose.idx ? 'active' : ''} onClick={(event) => handleOnClickTicket(event, index)}>{el < 10 ? `0${el}` : el}</li>
          ))
        }
      </ul>
      <div className={`${classes.footer}`}>
        <ul className={`${classes.listButton}`}>
          <li onClick={handleSendData}>Submit</li>
        </ul>
      </div>
    </>
  )
}

export default Four