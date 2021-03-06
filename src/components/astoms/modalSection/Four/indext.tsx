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

  const handleCheck = (val) => {
    return data.data.ticketChanges.numberChange.includes(val);
}


  const handleOnClickChooseNumber = (event: React.MouseEvent) => {
    let cloneNumberChange = data.data.ticketChanges.numberChange;
    if(event.currentTarget.childNodes[0].textContent !== null && event.currentTarget.childNodes[0].textContent !== '_') {
      const index = dataChoose.idx > 5 ? 0 : dataChoose.idx + 1;
      const currIndex = dataChoose.idx > 5 ? 0 : dataChoose.idx;
      setDataChoose({
        value: parseInt(event.currentTarget.childNodes[0].textContent),
        idx: index,
      })
      cloneNumberChange[currIndex] = parseInt(event.currentTarget.childNodes[0].textContent);
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
        <ul className={`${classes.chooseNumber}`}>
          {
            Array(45).fill(1).map((el, index) => (
              <li key={index} className={`text-gray-primary text-body-sp md:text-body-pc hover:text-blue-secondary ${index + 1 == dataChoose.value ? 'active' : ''}`} onClick={handleOnClickChooseNumber}>{!handleCheck(index+1)?(index < 9 ? `0${index + 1}` : index + 1): '_'}</li>
            ))
          }
        </ul>
        <ul className='flex justify-between mt-3'>
          {
            data.data.ticketChanges.numberChange.map((el: number, index: number) => (
              <li key={index} className={`w-35 h-35 md:w-10 md:h-10 bg-blue-primary p-px inline-block rounded-full cursor-pointer`}
                onClick={(event) => handleOnClickTicket(event, index)}
              >
                <p className={`flex justify-center items-center w-full h-full text-h3-pc md:text-18 font-bungee rounded-full ${index === dataChoose.idx ? 'bg-gray-boxline box-shadow-0440-inset' : 'bg-gray-lightbox'}`}><span className='text-blue-primary'>{el < 10 ? `0${el}` : el}</span></p>
              </li>
            ))
          }
        </ul>
      </div>
      
      <div className={`p-4 bg-gray-lightbox`}>
        <p onClick={handleSendData} className='transition-all hover:opacity-70 text-center font-semibold text-body-sp md:text-body-pc cursor-pointer rounded-3 border border-solid text-gray-box bg-blue-primary w-28 h-32px flex justify-center items-center mx-auto'>Submit</p>
      </div>
    </>
  )
}

export default Four