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
        result++;
        winningTicket.push(item.roll_nums)
      }
    })
    return result;
  }

  const handleRenderWinningTickets = () => {
    return (
      winningTicket.map((el: [], index: number) => (
        <dl key={index} className={`${filterTickets === 'winning' ? 'block' : 'hidden'}`}>
          <dt>#{index < 9 ? `00${index + 1}` : `0${index + 1}`}</dt>
          <dd>
            <ul>
              {
                el.map((item, index) => (
                  <li key={index}>{item < 10 ? `0${item}` : item}</li>
                ))
              }
            </ul>
          </dd>
        </dl>
      ))
    )
  }


  const handleRenderRoundItems = () => {
    const roll_nums = dataSendViewYour.your_ticket.player_tickets.map(item => item.roll_nums);
    return (
      roll_nums.map((el: [], index: number) => (
        <dl key={index} className={`${filterTickets === '' || filterTickets === 'all' ? 'block' : 'hidden'}`}>
          <dt>#{index < 9 ? `00${index + 1}` : `0${index + 1}`}</dt>
          <dd>
            <ul>
              {
                el.map((item, index) => (
                  <li key={index}>{item < 10 ? `0${item}` : item}</li>
                ))
              }
            </ul>
          </dd>
        </dl>
      ))
    )
  }

  const handleRenderRoundItemsNftsTickets = () => {
    return (
      nftsTicket.map((el: [], index: number) => (
        <dl key={index} className={`${filterTickets === '' || filterTickets === 'all' || filterTickets === 'nft' ? 'block' : 'hidden'}`}>
          <dt>#{index < 9 ? `00${index + 1}` : `0${index + 1}`}</dt>
          <dd>
            <ul>
              {
                el.map((item, index) => (
                  <li key={index}>{item < 10 ? `0${item}` : item}</li>
                ))
              }
            </ul>
          </dd>
        </dl>
      ))
    )
  }

  const handleOnclickFilterTicket = (event: React.MouseEvent) => {
    setFilterTickets(event.currentTarget.attributes['data-tickets'].value)
  }

  return (
    <>
      <div className='px-3 py-4'>
        <p className='text-14 font-semibold'>Winning Number</p>
        <ul className='flex justify-between my-3'>
          { 
            dataSendViewYour.your_ticket.roll_nums.map((el: number, index: number) => (
              // <li key={index} className='bg-gray-041A29-30'>{el < 10 ? `0${el}` : el}</li>
              <li key={index} className={`w-35 h-35 bg-gradient-17F0FF-to-0BA8B4 p-px inline-block rounded-full cursor-pointer`}>
                <p className={`flex justify-center items-center w-full h-full text-16 font-bungee rounded-full bg-gray-151515`}><span className='text-blue-17F0FF'>{el < 10 ? `0${el}` : el}</span></p>
              </li>
            ))
          }
        </ul>
        <p className='text-14 font-semibold'>Your tickets</p>
        <ul className='grid grid-cols-2 gap-4 mt-1'>
          <li className='col-span-1 bg-gray-575757-20 px-2 pt-1.5 pb-1 rounded-5 cursor-pointer'>
            <span className='block text-gray-EBEBEB text-10 leading-none'>NFT Tickets</span>
            <span className='text-16 font-bold text-pink-D47DFF leading-none'>0</span>
          </li>  
          <li className='col-span-1 bg-gray-575757-20 px-2 pt-1.5 pb-1 rounded-5 cursor-pointer'>
            <span className='block text-gray-EBEBEB text-10 leading-none'>Lottery Tickets</span>
            <span className='text-16 font-bold text-pink-D47DFF leading-none'>0</span>
          </li>
        </ul>
      </div>
      <div className='bg-gray-575757-30 p-4'>
        <p className='text-12 font-bold text-pink-D47DFF'>You have no ticket</p>
      </div>
      {/* <div className={`${classes.countTicket}`}>
        <p className='px-5'>Your tickets</p>
        <ul>
          <li className={`cursor-pointer px-5 mx-px transition-all ${ filterTickets === 'nft' ? 'bg-pink-4A246D' : 'hover:bg-pink-4A246D bg-gray-0D0E0E'}`} data-tickets="nft"
            onClick={handleOnclickFilterTicket}
          >
            <p>
              <span><IconNFTS></IconNFTS></span>
              <span>NFTS Tickets</span>
            </p>
            {nftsTicket.length}
          </li>
          <li className={`cursor-pointer px-5 mx-px transition-all ${ filterTickets === 'all' ? 'bg-pink-4A246D' : 'hover:bg-pink-4A246D bg-gray-0D0E0E'}`} data-tickets="all"
            onClick={handleOnclickFilterTicket}
          >
            <p>
              <span><IconTicket></IconTicket></span>
              <span>Total tickets</span>
            </p>
            {dataSendViewYour.your_ticket.player_tickets.length + nftsTicket.length}
          </li>
          <li className={`cursor-pointer px-5 mx-px transition-all ${ filterTickets === 'winning' ? 'bg-pink-4A246D' : 'hover:bg-pink-4A246D bg-gray-0D0E0E'}`} data-tickets="winning"
            onClick={handleOnclickFilterTicket}
          >
            <p>
              <span><IconStar></IconStar></span>
              <span>Winning tickets</span>
            </p>
            {(<>{countWinningTicket()}</>)}
          </li>
        </ul>
      </div> */}

      {/* <div className={`${classes.listTickets}`}>
        {handleRenderRoundItemsNftsTickets()}
        {handleRenderRoundItems()}
        {handleRenderWinningTickets()}
        { (nftsTicket.length < 1 && filterTickets === 'nft') || (winningTicket.length < 1 && filterTickets === 'winning') ? <p className='text-14 md:text-16 lg:text-18'>You don't have any ticket.</p> : '' }
      </div> */}
    </>
  )
}

export default ViewYour