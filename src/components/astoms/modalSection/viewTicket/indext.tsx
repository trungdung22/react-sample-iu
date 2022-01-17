import { HOST_NAME } from 'data/constants';
import React, { useEffect, useState } from 'react';
import useStyles from './styles';
type Props = {
  dataSendViewTicket: any,
  dataGiveViewTicket: (getDataViewTicket: boolean) => void,
}
const ViewTicket: React.FC<Props> = ({ dataSendViewTicket, dataGiveViewTicket }) => {
  const classes = useStyles();
  const [showTooltipConnect, setShowTooltipConnect] = useState(false);
  const [tickets, setTickets] = useState(dataSendViewTicket.next_round.your_ticket)

  const [nftTickets, setNftTickets] = useState([])

  const [activeLabel, setActiveLabel] = useState('lottery');

  useEffect(() => {
    if (!dataSendViewTicket.is_connect)
      return;

    const userPubkey = window.sessionStorage.getItem('publicKey');
    fetch(`${HOST_NAME}/api/nft-ticket?isSole=true&user_pubkey=${userPubkey}`)
      .then(async res => {
        let data = await res.json();
        if (!res.ok) {
          const error = (data && data.message) || res.statusText;
          return Promise.reject(error);
        }
        let nfts = data.items.map(el => el.roll_nums);
        setNftTickets(nfts)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const [dataRender, setDataRender] = useState(tickets);

  const handleRenderTicket = (data: any) => {
    if (data.length > 0 && window.sessionStorage.getItem('data_connect') === 'true') {
      return (
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
      <p className='text-12 font-bold text-pink-D47DFF mt-2'>You have no ticket</p>
    )
  }

  return (
    <>
      <div className='p-4 pt-2'>
        <ul className='mb-2'>
          <li className={`cursor-pointer transition-all text-14 font-semibold rounded-5 w-115 inline-flex justify-center items-center h-32px mr-4 ${activeLabel === 'lottery' ? 'bg-pink-8C24BF' : 'hover:bg-gray-575757-50 hover:text-gray-F9F9F9 text-gray-A9A9A9'}`}
            onClick={() => {
              setDataRender(tickets);
              setActiveLabel('lottery');
            }}
          >Lottery tickets</li>
          <li className={`cursor-pointer transition-all text-14 font-semibold rounded-5 w-90 inline-flex justify-center items-center h-32px ${activeLabel === 'nft' ? 'bg-pink-8C24BF' : 'hover:bg-gray-575757-50 hover:text-gray-F9F9F9 text-gray-A9A9A9'}`}
            onClick={() => {
              setDataRender(nftTickets);
              setActiveLabel('nft');
            }}
          >NFT tickets</li>
        </ul>
        <div className={`${classes.listTickets}`} data-tickes='nft'>
          {handleRenderTicket(dataRender)}
        </div>
      </div>
      <div className='p-4 bg-gray-575757-30'>
        <div className='relative'>
          <p className='transition-all hover:opacity-70 text-center col-span-1 font-semibold text-12 cursor-pointer rounded-3 border border-solid border-blue-17F0FF text-blue-0B7880 bg-blue-17F0FF w-28 h-32px flex justify-center items-center mx-auto'
            onClick={() => dataGiveViewTicket(true)}
            onMouseLeave={() => {
              setShowTooltipConnect(false);
            }}
            onMouseEnter={() => {
              if (window.sessionStorage.getItem('data_connect') !== 'true') {
                setShowTooltipConnect(true);
              }
            }}
          >Buy ticket</p>
          {showTooltipConnect && <p className='absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 z-100 border border-solid border-pink-A819FA bg-gray-151515 rounded-5 text-center text-14 md:text-16 py-1 w-44 text-pink-A819FA font-medium'>Connect wallet first</p>}
        </div>
      </div>
    </>
  )
}

export default ViewTicket