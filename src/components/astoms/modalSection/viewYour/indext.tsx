import IconNFTS from 'components/astoms/icons/nfts';
import IconStar from 'components/astoms/icons/star';
import IconTicket from 'components/astoms/icons/ticket';
import React, { useState } from 'react';
import useStyles from './styles';
type Props = {
  dataSendViewYour: any,
}
const ViewYour: React.FC<Props> = ({dataSendViewYour}) => {
  const classes = useStyles();
  const [filterTickets, setFilterTickets] = useState('');
  const winningTicket = [];
  const nftsTicket = [];
  const countWinningTicket = () => {
    let result = 0;
    const winningType = ['Match3', 'Match4', 'Match5', 'Match6']
    dataSendViewYour.your_ticket.player_tickets.map(item => {
      if(winningType.indexOf(item.reward_type) > -1) {
        winningTicket.push(item.roll_nums)
      }
    })
    return result;
  }

  const [activeLabel, setActiveLabel] = useState('lottery');

  const ticketsLottery = [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ];

  const ticketsNFT = [
    // [2, 2, 2],
    // [2, 2, 2, 2],
    // [2, 2, 2, 2, 2],
    // [2, 2, 2, 2, 2, 2],
  ];

  const [dataRender, setDataRender] = useState(ticketsLottery);
  
  const handleRenderTicket = (data: any) => {
    if (data.length > 0 && window.sessionStorage.getItem('data_connect') === 'true') {
      return(
        data.map((el: [], index: number) => (
          <dl key={index} className='relative'>
            {/* <span className='text-8 md:text-10 w-16 md:w-20 px-px h-3.5 flex justify-center items-center absolute right-0 top-1 rounded-5 border border-solid border-yellow-FFAC0A bg-yellow-FFAC0A-20 text-yellow-FFAC0A'>Winning Ticktet</span> */}
            <dt className='text-body-sp md:text-body-pc'>#{index < 9 ? `00${index + 1}` : `0${index + 1}`}</dt>
            <dd>
              <ul className='border border-solid border-blue-secondary bg-gray-lightbox'>
                {
                  el.map((item, index) => (
                    <li key={index} className='text-h3-sp md:text-h3-pc font-semibold text-gray-primary'>{item < 10 ? `0${item}` : item}</li>
                  ))
                }
              </ul>
            </dd>
          </dl>
        ))
      )
    }

    return(
      <p className='text-body-sp md:text-body-pc font-bold text-pink-secondary'>You have no ticket</p>
    )
  }

  return (
    <>
      <div className='px-3 py-4'>
        <p className='text-button-sp md:text-button-pc font-semibold'>Winning Number</p>
        <ul className='flex justify-between my-3'>
          { 
            dataSendViewYour.your_ticket.roll_nums.map((el: number, index: number) => (
              <li key={index} className={`w-35 h-35 md:w-10 md:h-10 bg-blue-primary p-px inline-block rounded-full cursor-pointer`}>
                <p className={`flex justify-center items-center w-full h-full text-h3-pc md:text-18 font-bungee rounded-full bg-gray-lightbox`}><span className='text-blue-primary'>{el < 10 ? `0${el}` : el}</span></p>
              </li>
            ))
          }
        </ul>
        <p className='text-button-sp md:text-button-pc font-semibold'>Your tickets</p>
        
      </div>
      <div className='p-4 bg-gray-lightbox'>
        <ul>
          <li className={`cursor-pointer transition-all text-button-sp md:text-button-pc font-semibold rounded-5 w-115 md:w-32 inline-flex justify-center text-gray-primary items-center h-32px mr-4 ${activeLabel === 'lottery' ? 'bg-pink-primary' : 'hover:bg-gray-boxline hover:text-gray-body'}`}
            onClick={() => {
              setDataRender(ticketsLottery);
              setActiveLabel('lottery');
            }}
          >Lottery tickets</li>
          <li className={`cursor-pointer transition-all text-button-sp md:text-button-pc font-semibold rounded-5 w-90 md:w-100 inline-flex justify-center text-gray-primary items-center h-32px ${activeLabel === 'nft' ? 'bg-pink-primary' : 'hover:bg-gray-boxline hover:text-gray-body'}`}
            onClick={() => {
              setDataRender(ticketsNFT);
              setActiveLabel('nft');
            }}
          >NFT tickets</li>
        </ul>
        <div className={`${classes.listTickets}`} data-tickes='nft'>
          {handleRenderTicket(dataRender)}
        </div>
      </div>
    </>
  )
}

export default ViewYour