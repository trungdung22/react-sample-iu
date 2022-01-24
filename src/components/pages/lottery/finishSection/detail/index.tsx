import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { dataTest } from 'data/db';
import {prettyPrintTime, numberWithCommas} from '../../../../../lib/utilities/format'
type Props = {
    dataSendToDetail: any,
  dataGiveDetail: (getDataDetail: any) => void
}
const Detail: React.FC<Props> = ({dataSendToDetail, dataGiveDetail}) => {
  const [slide, setSlide] = useState(true);
  const [data, setData] = useState({
    id: 0,
    info: []
  });
  const classes = useStyles();
  const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formatTime = (time: number) => {
    return time < 10 ?  '0' + time : time;
  }
  const handleViewTicket = (event: React.MouseEvent) => {
    // if(dataSendToDetail.player_tickets.length > 0) {
      dataGiveDetail({
        your_ticket: dataSendToDetail,
        view_your: true,
      })
    // }
  }
  
  return (
    <>
      <div className='p-3.5 md:px-8 md:pt-3 md:pb-5'>
        <p className='text-gray-primary text-h3-sp md:text-h3-pc font-bold mb-2 md:mb-2.5 flex items-center'>
          <span className='inline-block mr-2 w-3 md:w-3.5 cursor-pointer transition-all hover:opacity-70' onClick={() => dataGiveDetail({
                back_your: true,
              })}
            >
              <svg className='w-full' width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 9C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7V9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM17 7L1 7V9L17 9V7Z" fill="#F9F9F9"/>
              </svg>
          </span>
          Round
        </p>
        <p className='bg-gray-lightbox text-right rounded-5 flex justify-between items-center pr-2.5'>
          <span className='text-h3-sp md:text-h3-pc font-bold text-pink-F4E0FF p-2 md:px-8 text-center bg-pink-primary rounded-5 inline-block'>{`#${dataSendToDetail.game_no}`}</span>
          {`${monthName[new Date(dataSendToDetail.updatedAt).getMonth()]} 
          ${new Date(dataSendToDetail.updatedAt).getDate()}, 
          ${new Date(dataSendToDetail.updatedAt).getFullYear()}, 11:00 AM`}
        </p>
      </div>
      <div className=''>
        <div className={`p-3.5 md:px-8 md:py-5 border-t border-solid border-gray-boxline-50`}>
          <div className='md:flex md:items-center justify-between'>
            <p className='text-gray-primary text-h3-sp md:text-h3-pc font-bold mb-2 md:mb-0'>Winning Number</p>
            {
              dataSendToDetail.roll_nums.length > 0 ? (
                <ul className='flex justify-between screen475:block'>
                {
                  dataSendToDetail.roll_nums.map((element, index) => (
                      <li key={index} className={`w-10 h-10 md:w-50 md:h-50 bg-blue-primary p-px inline-block rounded-full ${index < 5 ? 'screen475:mr-5' : ''}`}>
                        <p className='flex justify-center items-center w-full h-full text-h2-sp md:text-h2-pc font-bungee bg-gray-box rounded-full'><span className='text-blue-primary'>{element < 10 ? `0${element}` : element}</span></p>
                      </li>
                    )
                  )
                }
                </ul>
              ) : ''
            }
          </div>
        </div>
        <div className={`p-3.5 md:px-8 flex items-center md:py-5 border-t border-solid border-gray-boxline-50  ${slide ? 'border-b' : ''}`}>
          <p className='text-gray-primary text-h3-sp md:text-h3-pc font-bold mb-1 md:mb-0 md:pr-2'>Your Ticket</p>
          <div className='md:pl-32'>
            <p className='md:pl-2'>You have <span className='text-blue-secondary font-bold underline hover:opacity-70 cursor-pointer' onClick={handleViewTicket}>{dataSendToDetail.player_tickets.length} ticket</span> to enter this party.</p>
          </div>
        </div>
        <div className={`slideToggle ${slide ? 'hidden' : 'block'}`}>
          <div className='bg-gray-lightbox p-3.5 md:px-8 md:pt-6 md:pb-4'>
            <div className='md:flex justify-between md:items-end mb-4'>
              <p className='text-gray-primary text-h3-sp md:text-h3-pc font-bold mb-2 md:mb-0'>Prize pot</p>
              <div className='flex justify-between md:w-3/5'>
                <p className='text-28 md:text-h1-pc font-bungee text-blue-primary leading-none'>{`~$${numberWithCommas(dataSendToDetail.total_pool_usdt)}`}</p>
                <p className='text-h2-pc font-bungee text-blue-primary relative top-0.5'>{Math.round(dataSendToDetail.total_pool_sol)} MILLI</p>
              </div>
            </div>
            <p className='h-px opacity-50 bg-gray-575757 block md:hidden mb-4'></p>
            <ul className='flex flex-wrap justify-between'>
              <li className='text-center w-1/3 md:w-auto mb-4 md:mb-0'>
                <p className='w-fit md:w-auto'>
                  <span className='text-gray-primary text-h3-sp md:text-h3-pc font-bold'>Match 3</span>
                  <span className='text-h3-sp md:text-h3-pc font-bold text-blue-primary block leading-none md:mt-1.5 md:mb-0.5'>{dataSendToDetail.total_pool_sol/100*8} MILLI</span>
                  <span className='text-gray-primary text-bodybox-sp md:text-bodybox-pc'>{dataSendToDetail.match_pool3_count} Winners</span>
                </p>
              </li>
              <li className='text-center w-1/3 md:w-auto mb-4 md:mb-0'>
                <p className='w-fit md:w-auto mx-auto md:mx-0'>
                  <span className='text-gray-primary text-h3-sp md:text-h3-pc font-bold'>Match 4</span>
                  <span className='text-h3-sp md:text-h3-pc font-bold text-blue-primary block leading-none md:mt-1.5 md:mb-0.5'>{dataSendToDetail.total_pool_sol/100*12} MILLI</span>
                  <span className='text-gray-primary text-bodybox-sp md:text-bodybox-pc'>{dataSendToDetail.match_pool4_count} Winners</span>
                </p>
              </li>
              <li className='text-center w-1/3 md:w-auto mb-4 md:mb-0'>
                <p className='w-fit md:w-auto ml-auto md:ml-0'>
                  <span className='text-gray-primary text-h3-sp md:text-h3-pc font-bold'>Match 5</span>
                  <span className='text-h3-sp md:text-h3-pc font-bold text-blue-primary block leading-none md:mt-1.5 md:mb-0.5'>{dataSendToDetail.total_pool_sol/100*16} MILLI</span>
                  <span className='text-gray-primary text-bodybox-sp md:text-bodybox-pc'>{dataSendToDetail.match_pool5_count} Winners</span>
                </p>
              </li>
              <li className='text-center w-1/3 md:w-auto'>
                <p className='w-fit md:w-auto'>
                  <span className='text-gray-primary text-h3-sp md:text-h3-pc font-bold'>Match 6</span>
                  <span className='text-h3-sp md:text-h3-pc font-bold text-blue-primary block leading-none md:mt-1.5 md:mb-0.5'>{dataSendToDetail.total_pool_sol/100*40} MILLI</span>
                  <span className='text-gray-primary text-bodybox-sp md:text-bodybox-pc'>{dataSendToDetail.match_pool6_count} Winners</span>
                </p>
              </li>
              <li className='text-center w-1/3 md:w-auto'>
                <span className='text-gray-primary text-h3-sp md:text-h3-pc font-bold'>Burn</span>
                <span className='text-h3-sp md:text-h3-pc font-bold text-blue-primary block leading-none md:mt-1.5 md:mb-0.5'>{dataSendToDetail.total_pool_sol/100*24} MILLI</span>
                <span className='text-gray-primary text-bodybox-sp md:text-bodybox-pc'><br/></span>
              </li>
              <li className='w-1/3 flex items-center justify-end md:hidden'>
                <p className='text-white text-bodybox-sp text-right leading-tight'>Total players <br />this round<span className='text-h3-sp font-bold block'>{dataSendToDetail.total_player}</span></p>
              </li>
            </ul>
            <p className='text-white text-bodybox-pc text-right mt-2 hidden md:block'>Total players this round: <span className='text-h3-pc font-bold'>{dataSendToDetail.total_player}</span></p>
          </div>
        </div>
      </div>
      <p className='text-gray-primary text-button-sp md:text-button-sp font-semibold flex justify-center items-center cursor-pointer py-3.5 transition-all hover:opacity-70' onClick={() => setSlide(!slide)}>
        {slide ? (
          <>
            Detail
            <span className='inline-block ml-1.5'>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.0166 1.16669L4.4416 4.59169C4.59774 4.7469 4.80895 4.83401 5.0291 4.83401C5.24926 4.83401 5.46047 4.7469 5.6166 4.59169L8.94994 1.25835" stroke="white" stroke-linecap="round" stroke-linejoin="bevel"/>
              </svg>
            </span>
          </>
        ) :
          <>
            Hide
            <span className='inline-block ml-1.5'>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.9834 4.83331L5.5584 1.40831C5.40226 1.2531 5.19105 1.16599 4.9709 1.16599C4.75074 1.16599 4.53953 1.2531 4.3834 1.40831L1.05006 4.74165" stroke="white" stroke-linecap="round" stroke-linejoin="bevel"/>
              </svg>
            </span>
          </>
        }
      </p>
    </>
  )
}

export default Detail