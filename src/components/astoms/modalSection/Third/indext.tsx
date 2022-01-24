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
          <p className='text-body-sp md:text-body-pc font-medium text-pink-secondary'>Total cost</p>
          <p className='text-h3-sp md:text-h3-pc font-bold text-pink-secondary'>~ {dataSendThird.data.price.toFixed(8)} MILLI</p>
        </div>
        <div className={`${classes.listTickets}`}>
          { 
            data.data.tickets.map((el: [], index: number) => (
              <dl key={index}>
                <dt className='text-body-sp md:text-body-pc'>#{index < 9 ? `00${index + 1}` : `0${index + 1}`}</dt>
                <dd>
                  <ul className='border border-solid border-blue-secondary bg-gray-lightbox' 
                    onClick={(event)=>handleChangeNumber(event, index)}
                  >
                    {
                      el.map((item, index) => (
                        <li key={index} className='text-h3-sp md:text-h3-pc font-semibold text-gray-primary'>{item < 10 ? `0${item}` : item}</li>
                      ))
                    }
                  </ul>
                </dd>
              </dl>
            ))
          }
        </div>
      </div>
      <div className='p-4 bg-gray-lightbox'>
        <ul className='grid grid-cols-11 gap-2.5 mb-2.5'>
          <li className='transition-all hover:opacity-70 text-center col-span-5 font-semibold text-body-sp md:text-body-pc cursor-pointer rounded-3 border border-solid border-blue-17F0FF flex justify-center items-center h-32px text-blue-primary' onClick={handleRandomTickets}>Randomize</li>
          <li className='transition-all hover:opacity-70 text-center col-span-6 font-semibold text-body-sp md:text-body-pc cursor-pointer rounded-3 border border-solid border-blue-17F0FF flex justify-center items-center h-32px text-gray-box bg-blue-primary' onClick={handleConfirm}>Confirm and Buy</li>
        </ul>
        <p className='text-bodybox-sp md:text-bodybox-pc'>Number are randomized, with no duplicates among your tickets. Tap a number to edit it. Available digits: 01-45.</p>
      </div>
      
    </>
  )
}

export default Third