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
  // const [data, setData] = useState({
  //   data: {
  //     ticketCount: data.data.ticketCount,
  //     price: data.data.price,
  //     unit: data.data.unit,
  //     tickets: data.data.tickets,
  //     third: false,
  //     five: false,
  //   }
  // });
  const handleRandomTicket = () => {
    const result = [];
    while(result.length < 6){
      const numberRandom = Math.floor(Math.random() * 45) + 1;
      if(result.indexOf(numberRandom) === -1) result.push(numberRandom);
    }
    return result;
  }
  const handleInputMax = (event: React.MouseEvent) => {
    setData({
      data: {
        ...data.data,
        tickets: Array(5).fill(0).map(() => handleRandomTicket()),
        ticketCount: 5,
        price: data.data.unit * 5,
      }
    })
  }
  
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // if (parseInt(event.target.value) > 5) {
    //   event.target.value = "5";
    // }
    // if (parseInt(event.target.value) < 1 || event.target.value === '') {
    //   event.target.value = "1";
    // }
    // const total = event.target.value !== '' ? data.data.unit * parseFloat(event.target.value) : 0;
    // setData({
    //   data: {
    //     ...data.data,
    //     ticketCount: event.target.value !== '' ? parseInt(event.target.value) : 0,
    //     price: total,
    //     tickets: event.target.value !== '' ? Array(parseInt(event.target.value)).fill(0).map(() => handleRandomTicket()) : [Array()]
    //   }
    // })
    // setValueTickets(event.target.value);
  };
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
          <p className='text-12 font-medium text-pink-D47DFF'>Max is 5 tickets</p>
          <div className='flex justify-center items-center rounded-5 overflow-hidden border border-solid border-blue-ADFAFF w-fit'>
            <p className='inline-block w-30 h-30 bg-blue-0B7880 cursor-pointer relative'
              onClick={() => {
                if (parseInt(valueTickets) > 1) {
                  setValueTickets((parseInt(valueTickets) - 1).toString());
                }
              }}
            >
              <span className={`w-2.5 h-px bg-gray-F9F9F9 absolute top-1/2 left-2.5 ${parseInt(valueTickets) === 1 ? 'opacity-50' : ''}`}></span>
            </p>
            {/* <input
              autoFocus
              value=
              // onChange={handleChangeInput}
              onKeyPress={(e) => {
                e.preventDefault();
              }}
              className=''
            /> */}
            <p className='w-30 h-30 flex justify-center items-center text-14 text-blue-17F0FF font-semibold outline-none bg-transparent text-center'>{valueTickets}</p>
            <p className='inline-block w-30 h-30 bg-blue-0B7880 cursor-pointer relative'
              onClick={() => {
                if (parseInt(valueTickets) < 5) {
                  setValueTickets((parseInt(valueTickets) + 1).toString());
                }
              }}
            >
              <span className={`w-2.5 h-px bg-gray-F9F9F9 absolute top-1/2 left-2.5 ${parseInt(valueTickets) === 5 ? 'opacity-50' : ''}`}></span>
              <span className={`h-2.5 w-px bg-gray-F9F9F9 absolute top-2.5 left-1/2 ${parseInt(valueTickets) === 5 ? 'opacity-50' : ''}`}></span>
            </p>
          </div>
        </div>
        <p className='text-10 font-semibold text-right mt-1.5 mb-1.5'>MILLI Balance: {playerData.balanceSOL}</p>
        <div className='flex justify-between items-center mb-2'>
          <p className="text-12 font-semibold">You pay</p>
          <p className="text-14 font-bold text-pink-D47DFF">~ {data.data.price === 0 ? 0 : data.data.price.toFixed(8)} MILLI</p>
        </div>
      </div>
      <div className='p-4 bg-gray-575757-30'>
        <ul className='grid grid-cols-2 gap-2.5 mb-2.5'>
          <li className='transition-all hover:opacity-70 text-center col-span-1 font-semibold text-12 cursor-pointer rounded-3 border border-solid border-blue-17F0FF flex justify-center items-center h-32px text-blue-17F0FF' onClick={handleEditNumber}>Edit numbers</li>
          <li className='transition-all hover:opacity-70 text-center col-span-1 font-semibold text-12 cursor-pointer rounded-3 border border-solid border-blue-17F0FF flex justify-center items-center h-32px text-blue-0B7880 bg-blue-17F0FF' onClick={handleComfirm}>Buy instantly</li>
        </ul>
        <p className='text-10 text-gray-EBEBEB'>"Buy instanly" allows you to pick no-duplicate random numbers to your tickets. By the time each round begins, prices will be set, evaluated to $2. Purchases are final.</p>
      </div>
    </>
  )
}

export default Second