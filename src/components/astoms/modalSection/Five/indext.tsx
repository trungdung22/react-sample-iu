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
          <p className='text-body-sp md:text-body-pc font-medium'>Total cost</p>
          <p className='text-h3-sp md:text-h3-pc font-bold'>~ {data.data.price.toFixed(2)} MILLI</p>
        </div>
        <div className={`${classes.listTickets}`}>
          { 
            data.data.tickets.map((el: [], index: number) => (
              <dl key={index}>
                <dt className='text-body-sp md:text-body-pc'>#{index < 9 ? `00${index + 1}` : `0${index + 1}`}</dt>
                <dd>
                  <ul className='border border-solid border-gray-boxline bg-gray-lightbox'>
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
          <li className='text-center col-span-5 font-semibold text-body-sp md:text-body-pc rounded-3 border border-solid border-gray-body flex justify-center items-center h-32px'>Randomize</li>
          <li className='text-center col-span-6 font-semibold text-body-sp md:text-body-pc rounded-3 border border-solid border-gray-primary flex justify-center items-center h-32px text-gray-boxline bg-gray-primary'>
            Confirming
            <span className='inline-block ml-2'>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 8V10.5" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 1.5V4" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 6H1.5" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.5 6H8" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.58482 4.58507L2.81982 2.82007" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.18004 9.18004L7.41504 7.41504" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.58482 7.41504L2.81982 9.18004" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.18004 2.82007L7.41504 4.58507" stroke="#575757" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </li>
        </ul>
        <p className='text-bodybox-sp md:text-bodybox-pc'>Number are randomized, with no duplicates among your tickets. Tap a number to edit it. <br />Available digits: 01-45.</p>
      </div>
    </>
  )
}

export default Five