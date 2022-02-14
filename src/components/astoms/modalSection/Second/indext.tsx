import { priceTicket } from 'lib/utilities/utils';
import React, { useEffect, useState } from 'react';
import useStyles from './styles';
type Props = {
  dataGiveSecond: (getDataSecond: any) => void,
  dataSendSecond: any,
  playerData: any
}
const Second: React.FC<Props> = ({dataGiveSecond, dataSendSecond, playerData}) => {
  
  const [data, setData] = useState({
    data: {
      ticketCount: 0,
      price: 0,
      unit: 0,
      tickets: [Array()],
      third: false,
      five: false,
    }
  });

  const [valueTickets, setValueTickets] = useState('1');

  useEffect(()=>{
    priceTicket().then(item => {
      setData({
        data: {
          ...data.data,
          unit: item.sol,
          ticketCount: parseInt(valueTickets),
          price: item.sol * parseInt(valueTickets),
          tickets: Array(parseInt(valueTickets)).fill(0).map(() => handleRandomTicket())
        }
     })
    });
   }, [])

  const classes = useStyles();
  const handleRandomTicket = () => {
    const result = [];
    while(result.length < 6){
      const numberRandom = Math.floor(Math.random() * 45) + 1;
      if(result.indexOf(numberRandom) === -1) result.push(numberRandom);
    }
    return result;
  }
  const handleEditNumber = (event: React.MouseEvent) => {
    if(data.data.price > 0) {
      setData({
        data: {
          ...data.data,
          third: true,
        }
      })
    }
  }
  const handleComfirm = (event: React.MouseEvent) => {
    if(data.data.price > 0) {
      setData({
        data: {
          ...data.data,
          five: true,
        }
      })
    }
  }

  useEffect(() => {
    if(data.data.ticketCount > 0 && (data.data.third || data.data.five)) {
      dataGiveSecond(data.data);
    }
  }, [data])

  useEffect(() => {
    const total = data.data.unit * parseInt(valueTickets);
    setData({
      data: {
        ...data.data,
        ticketCount: parseInt(valueTickets),
        price: total,
        tickets: Array(parseInt(valueTickets)).fill(0).map(() => handleRandomTicket())
      }
    })
  }, [valueTickets])
  
  return (
    <>
      <div className='p-4 pb-2'>
        <div className='flex justify-between items-center'>
          <p className='text-body-sp md:text-body-pc font-medium text-pink-secondary'>Max is 5 tickets</p>
          <div className='flex justify-center items-center rounded-5 overflow-hidden border border-solid border-blue-secondary w-fit'>
            <p className='inline-block w-30 h-30 bg-gray-lightbox cursor-pointer relative'
              onClick={() => {
                if (parseInt(valueTickets) > 1) {
                  setValueTickets((parseInt(valueTickets) - 1).toString());
                }
              }}
            >
              <span className={`w-2.5 h-px bg-gray-primary absolute top-1/2 left-2.5 ${parseInt(valueTickets) === 1 ? 'opacity-50' : ''}`}></span>
            </p>
            <p className='w-30 h-30 flex justify-center items-center text-h3-sp md:text-h3-pc text-blue-primary font-semibold outline-none bg-transparent text-center'>{valueTickets}</p>
            <p className='inline-block w-30 h-30 bg-gray-lightbox cursor-pointer relative'
              onClick={() => {
                if (parseInt(valueTickets) < 5) {
                  setValueTickets((parseInt(valueTickets) + 1).toString());
                }
              }}
            >
              <span className={`w-2.5 h-px bg-gray-primary absolute top-1/2 left-2.5 ${parseInt(valueTickets) === 5 ? 'opacity-50' : ''}`}></span>
              <span className={`h-2.5 w-px bg-gray-primary absolute top-2.5 left-1/2 ${parseInt(valueTickets) === 5 ? 'opacity-50' : ''}`}></span>
            </p>
          </div>
        </div>
        <p className='text-bodybox-sp md:text-bodybox-pc font-semibold text-right mt-1.5 mb-1.5'>MILLI Balance: {Number(playerData.balanceSOL).toFixed(2)}</p>
        <div className='flex justify-between items-center mb-2'>
          <p className="text-body-sp md:text-body-pc font-semibold text-gray-primary">You pay</p>
          <p className="text-h3-sp md:text-h3-pc font-bold text-pink-secondary">~ {data.data.price === 0 ? 0 : data.data.price.toFixed(2)} MILLI</p>
        </div>
      </div>
      <div className='p-4 bg-gray-lightbox'>
        <ul className='grid grid-cols-2 gap-2.5 mb-2.5'>
          <li className='transition-all hover:opacity-70 text-center col-span-1 font-semibold text-button-sp md:text-button-pc cursor-pointer rounded-3 border border-solid border-blue-17F0FF flex justify-center items-center h-32px text-blue-primary' onClick={handleEditNumber}>Edit numbers</li>
          <li className='transition-all hover:opacity-70 text-center col-span-1 font-semibold text-button-sp md:text-button-pc cursor-pointer rounded-3 border border-solid border-blue-17F0FF flex justify-center items-center h-32px text-gray-box bg-blue-primary' onClick={handleComfirm}>Buy instantly</li>
        </ul>
        <p className='text-bodybox-sp md:text-bodybox-pc'>"Buy instanly" allows you to pick no-duplicate random numbers to your tickets. By the time each round begins, prices will be set, evaluated to $2. Purchases are final.</p>
      </div>
    </>
  )
}

export default Second