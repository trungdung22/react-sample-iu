import React, { useEffect, useState } from 'react';
import useStyles from './styles';
type Props = {
  dataGiveFive: (getDataFive: any) => void,
  dataSendFive: any,
}
const Five: React.FC<Props> = ({dataSendFive, dataGiveFive}) => {
  const classes = useStyles();
  
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
      <div className='p-4 pt-2'>
        <div className='flex justify-between items-center'>
          <p className='text-12 font-medium text-gray-EBEBEB'>Total cost</p>
          <p className='text-14 font-bold text-gray-EBEBEB'>~ {data.data.price.toFixed(8)} MILLI</p>
        </div>
        <div className={`${classes.listTickets}`}>
          { 
            data.data.tickets.map((el: [], index: number) => (
              <dl key={index}>
                <dt>#{index < 9 ? `00${index + 1}` : `0${index + 1}`}</dt>
                <dd>
                  <ul>
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
          <li className='text-center col-span-5 font-semibold text-12 rounded-3 border border-solid border-gray-A9A9A9 py-1.5 text-gray-A9A9A9'>Randomize</li>
          <li className='text-center col-span-6 font-semibold text-12 rounded-3 border border-solid border-gray-F9F9F9 py-1.5 text-gray-A9A9A9 bg-gray-F9F9F9 flex justify-center items-center'>
            Confirming
            <span className='inline-block ml-2'>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 8V10.5" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 1.5V4" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 6H1.5" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.5 6H8" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.58482 4.58507L2.81982 2.82007" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.18004 9.18004L7.41504 7.41504" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.58482 7.41504L2.81982 9.18004" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.18004 2.82007L7.41504 4.58507" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </li>
        </ul>
        <p className='text-10'>Number are randomized, with no duplicates among your tickets. Tap a number to edit it. Available digits: 01-45.</p>
      </div>
    </>
  )
}

export default Five