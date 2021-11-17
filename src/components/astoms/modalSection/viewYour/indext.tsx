import IconNFTS from 'components/astoms/icons/nfts';
import IconStar from 'components/astoms/icons/star';
import IconTicket from 'components/astoms/icons/ticket';
import React from 'react';
import useStyles from './styles';
type Props = {
  dataSendViewYour: any,
}
const ViewYour: React.FC<Props> = ({dataSendViewYour}) => {
  const classes = useStyles();
  const nftsTicket = [
  ]
  const countWinningTicket = () => {
    let result = 0;
    const winningType = ['Match3', 'Match4', 'Match5', 'Match6']
    const roll_nums = dataSendViewYour.your_ticket.player_tickets.map(item => item.reward_type);
    
    for (let i = 0; i < roll_nums.length; i++) {
      if (winningType.indexOf(roll_nums[i]) > -1 ){
        result++;
      }
    }
    return result;
  }

  const handleRenderRoundItems = () => {
    const roll_nums = dataSendViewYour.your_ticket.player_tickets.map(item => item.roll_nums);
    return (
      roll_nums.map((el: [], index: number) => (
        <dl key={index}>
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

  return (
    <>
      <div className={`${classes.winingNumber}`}>
        <p>Winning Number</p>
        <ul>
          { 
            dataSendViewYour.your_ticket.roll_nums.map((el: number, index: number) => (
              <li key={index}>{el < 10 ? `0${el}` : el}</li>
            ))
          }
        </ul>
      </div>
      <div className={`${classes.countTicket}`}>
        <p>Your tickets</p>
        <ul>
          <li>
            <p>
              <span><IconNFTS></IconNFTS></span>
              <span>NFTS Tickets</span>
            </p>
            {nftsTicket.length}
          </li>
          <li>
            <p>
              <span><IconTicket></IconTicket></span>
              <span>Total tickets</span>
            </p>
            {dataSendViewYour.your_ticket.player_tickets.length}
          </li>
          <li>
            <p>
              <span><IconStar></IconStar></span>
              <span>Winning tickets</span>
            </p>
            {(<>{countWinningTicket()}</>)}
          </li>
        </ul>
      </div>

      <div className={`${classes.listTickets}`}>
        { 
          nftsTicket.map((el, index) => (
            <dl key={index}>
              <dt>#NFT{index < 9 ? `00${index + 1}` : `0${index + 1}`}</dt>
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
        }
        {handleRenderRoundItems()}
      </div>
    </>
  )
}

export default ViewYour