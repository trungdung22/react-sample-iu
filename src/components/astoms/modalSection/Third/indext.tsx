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
  const handleRandomTicket = () => {
    const result = [];
    while(result.length < 6){
      const numberRandom = Math.floor(Math.random() * 45) + 1;
      if(result.indexOf(numberRandom) === -1) result.push(numberRandom);
    }
    return result;
  }
  const handleRandomTickets = (event: React.MouseEvent) => {
    setData({
      data: {
        ...data.data,
        tickets: Array(dataSendThird.data.ticketCount).fill(0).map(() => handleRandomTicket())
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
      <div className='p-4 pt-2'>
        <div className='flex justify-between items-center'>
          <p className='text-12 font-medium text-pink-D47DFF'>Total cost</p>
          <p className='text-14 font-bold text-pink-D47DFF'>~ {dataSendThird.data.price.toFixed(8)} MILLI</p>
        </div>
        <div className={`${classes.listTickets}`}>
          { 
            data.data.tickets.map((el: [], index: number) => (
              <dl key={index}>
                <dt>#{index < 9 ? `00${index + 1}` : `0${index + 1}`}</dt>
                <dd>
                  <ul onClick={(event)=>handleChangeNumber(event, index)}>
                    {
                      el.map((item, index) => (
                        <li key={index} className='text-14 font-semibold'>{item < 10 ? `0${item}` : item}</li>
                      ))
                    }
                  </ul>
                </dd>
              </dl>
            ))
          }
        </div>
      </div>
      <div className='p-4 bg-gray-575757-30'>
        <ul className='grid grid-cols-11 gap-2.5 mb-2'>
          <li className='transition-all hover:opacity-70 text-center col-span-5 font-semibold text-12 cursor-pointer rounded-3 border border-solid border-blue-17F0FF py-1.5 text-blue-17F0FF' onClick={handleRandomTickets}>Randomize</li>
          <li className='transition-all hover:opacity-70 text-center col-span-6 font-semibold text-12 cursor-pointer rounded-3 border border-solid border-blue-17F0FF py-1.5 text-blue-0B7880 bg-blue-17F0FF' onClick={handleConfirm}>Confirm and Buy</li>
        </ul>
        <p className='text-10 text-gray-EBEBEB'>Number are randomized, with no duplicates among your tickets. Tap a number to edit it. Available digits: 01-45.</p>
      </div>
      
    </>
  )
}

export default Third