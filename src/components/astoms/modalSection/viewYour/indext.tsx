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
      <div className={`${classes.winingNumber}`}>
        <p>Winning Number</p>
        <ul>
          { 
            dataSendViewYour.your_ticket.roll_nums.map((el: number, index: number) => (
              <li key={index} className='bg-gray-041A29-30'>{el < 10 ? `0${el}` : el}</li>
            ))
          }
        </ul>
      </div>
      <div className={`${classes.countTicket}`}>
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
      </div>

      <div className={`${classes.listTickets}`}>
        {handleRenderRoundItemsNftsTickets()}
        {handleRenderRoundItems()}
        {handleRenderWinningTickets()}
        { (nftsTicket.length < 1 && filterTickets === 'nft') || (winningTicket.length < 1 && filterTickets === 'winning') ? <p className='text-14 md:text-16 lg:text-18'>You don't have any ticket.</p> : '' }
      </div>
    </>
  )
}

export default ViewYour