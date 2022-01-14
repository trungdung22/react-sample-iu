import React, { useState } from 'react';
import useStyles from './styles';
type Props = {
  dataSendViewTicket: any,
  dataGiveViewTicket: (getDataViewTicket: boolean) => void,
}
const ViewTicket: React.FC<Props> = ({dataSendViewTicket, dataGiveViewTicket}) => {
  const classes = useStyles();
  const [data, setData] = useState({
    tickets: dataSendViewTicket.next_round.your_ticket,
  })

  const [activeLabel, setActiveLabel] = useState('lottery');

  const ticketsLottery = [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ];

  const ticketsNFT = [
    [2, 2, 2],
    [2, 2, 2, 2],
    [2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
  ];

  const [dataRender, setDataRender] = useState(ticketsLottery);

  

  const handleRenderTicket = (data: any) => {
    return(
      data.map((el: [], index: number) => (
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
    )
    
  }
  
  return (
    <>
      <div className='p-4 pt-2'>
        <ul className='mb-2'>
          <li className={`cursor-pointer transition-all text-14 font-semibold rounded-5 inline-block px-2 mr-4 ${activeLabel === 'lottery' ? 'bg-pink-8C24BF' : 'hover:bg-pink-8C24BF hover:text-gray-F9F9F9 text-gray-A9A9A9'}`}
            onClick={() => {
              setDataRender(ticketsLottery);
              setActiveLabel('lottery');
            }}
          >Lottery tickets</li>
          <li className={`cursor-pointer transition-all text-14 font-semibold rounded-5 inline-block px-2 ${activeLabel === 'nft' ? 'bg-pink-8C24BF' : 'hover:bg-pink-8C24BF hover:text-gray-F9F9F9 text-gray-A9A9A9'}`}
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
      <div className='p-4 bg-gray-575757-30'>
        <p className='transition-all hover:opacity-70 text-center col-span-1 font-semibold text-12 cursor-pointer rounded-3 border border-solid border-blue-17F0FF py-1.5 text-blue-0B7880 bg-blue-17F0FF w-fit mx-auto px-8'
          onClick={() => dataGiveViewTicket(true)}
        >Buy ticket</p>
      </div>
    </>
  )
}

export default ViewTicket