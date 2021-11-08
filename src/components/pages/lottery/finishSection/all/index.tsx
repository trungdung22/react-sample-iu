import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { HOST_NAME } from 'data/constants';
import { numberWithCommas} from '../../../../../lib/utilities/format';
import ContentLoader from 'react-content-loader';


type Props = {
  dataSendToAll: any,
  dataGiveAll: (getDataAll: any) => void
}
const All: React.FC<Props> = ({ dataSendToAll, dataGiveAll }) => {

  const [slide, setSlide] = useState(true);
  const [data, setData] = useState({
    id: 0,
    info: []
  });
  const classes = useStyles();
  const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formatTime = (time: number) => {
    return time < 10 ? '0' + time : time;
  }
  const handleViewTicket = (event: React.MouseEvent) => {
    if (dataSendToAll.your_tickets.length > 0) {
      dataGiveAll({
        your_ticket: dataSendToAll,
        view_your: true,
      })
    }
  }

  // This object is used to test Match results below
  // const dataS = {
  //   "_id": "6171500ae9b59ad5b38f7f57",
  //   "status": "Completed",
  //   "game_no": 24,
  //   "total_pool": 51717680426,
  //   "owner_pubkey": "545r1f24HobBVA9WkVVtUToeH58BAcjUtFo6K9DfArRc",
  //   "game_pubkey": "HmxdbmR8byGaLqKD2YUtSZhtNhFryDNKnTC27PnAwZH4",
  //   "duration": 86400000,
  //   "roll_nums": [
  //       27,
  //       8,
  //       33,
  //       31,
  //       10,
  //       36
  //   ],
  //   "num_one": 27,
  //   "num_two": 8,
  //   "num_three": 33,
  //   "num_four": 31,
  //   "num_five": 10,
  //   "num_six": 36,
  //   "createdAt": "2021-10-21T11:33:30.294Z",
  //   "updatedAt": "2021-10-22T11:01:25.403Z",
  //   "__v": 0,
  //   "burn_pool": 0,
  //   "match_pool3": 1,
  //   "match_pool3_count": 0,
  //   "match_pool4": 0,
  //   "match_pool4_count": 0,
  //   "match_pool5": 0,
  //   "match_pool5_count": 0,
  //   "match_pool6": 0,
  //   "match_pool6_count": 0,
  //   "reward_type": "Uninitialized",
  //   "closed_date": "2021-10-22T11:01:24.381Z",
  //   "total_player": 0,
  //   "total_pool_usdt": "1.013e+4",
  //   "total_pool_sol": "51.72",
  //   "match_pool3_usdt": "0.000",
  //   "match_pool3_sol": "0.000",
  //   "match_pool4_usdt": "0.000",
  //   "match_pool4_sol": "0.000",
  //   "match_pool5_usdt": "0.000",
  //   "match_pool5_sol": "0.000",
  //   "match_pool6_usdt": "0.000",
  //   "match_pool6_sol": "0.000",
  //   "burn_pool_usdt": "0.000",
  //   "burn_pool_sol": "0.000",
  //   "id": "6171500ae9b59ad5b38f7f57"
  // }

  useEffect(() => {
    fetch(`${HOST_NAME}/api/game-history-all`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(async response => {
        const data = await response.json();
        //data.results[0] = dataS;
        //console.log("data:",data);

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        setData({
          id: 0,
          info: JSON.parse(JSON.stringify(data.results))
        });
      })
  }, []);

  return (
    <div className={`${classes.root}`}>
      {
        data['info'].length > 0 ? (
          <>
            <div className={`${classes.header}`}>
              <div className="top">
                <p className="title">
                  Round
                </p>
                {
                  dataSendToAll === 0 ? (
                    <ul>
                      <li onClick={() => setData({ id: data['id'] === data['info'].length - 1 ? data['id'] : data['id'] + 1, info: data['info'] })}>
                        <svg width="26" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.292892 7.2929C-0.0976315 7.68342 -0.0976314 8.31658 0.292893 8.70711L6.65686 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928934C7.68054 0.538409 7.04738 0.538409 6.65685 0.928934L0.292892 7.2929ZM26 7L1 7L1 9L26 9L26 7Z" fill="#A2A2A2" />
                        </svg>
                      </li>
                      <li onClick={() => setData({ id: data['id'] === 0 ? data['id'] : data['id'] - 1, info: data['info'] })}>
                        <svg width="26" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z" fill="#A1A1A1" />
                        </svg>
                      </li>
                      <li onClick={() => setData({ id: data['info'].length-(data['info'].length), info: data['info'] })}>
                        <svg width="28" height="16" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z" fill="#A1A1A1" />
                          <line x1="27" y1="2" x2="27" y2="13" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </li>
                    </ul>
                  ) : ''
                }

              </div>
              <p className={`${classes.infoRound}`}>
                <span>{`#${data['info'][data.id]['game_no']}`}</span>
                {`${monthName[new Date(data['info'][data.id]['createdAt']).getMonth()]} 
                ${new Date(data['info'][data.id]['createdAt']).getDate()}, 
                ${new Date(data['info'][data.id]['createdAt']).getFullYear()}, 11:00 AM UTC`}
              </p>
            </div>
            <div className={`${classes.body}`}>
              <div className="content">
                <p className="text">Winning Number</p>
                {data['info'][data.id]['roll_nums'].length > 0 ? (
                  <ul className="number">
                    {[...data['info'][data.id]['roll_nums']].map((element, index) => (<li key={index}>{element < 10 ? `0${element}` : element}</li>))}
                  </ul>
                ) : <strong>IN PROGRESS</strong>}

              </div>
              <div className={`slideToggle ${slide ? 'active' : ''}`}>
                <div className={`${classes.infoPrize}`}>
                  <div>
                    <div className="prizeTop">
                      <p className="text">Prize pot</p>
                      <p className="total">{`~$${numberWithCommas(data['info'][data.id]['total_pool_usdt'])}`}</p>
                      < p className="unit">{data['info'][data.id]['total_pool_sol']} SOL</p>
                    </div>
                    <ul className="prizeMatch">
                      <li>
                        <span>Match  3</span>
                        <span>{Number(data['info'][data.id]['total_pool_sol']/100*8).toFixed(2)} SOL</span>
                        <span>{data['info'][data.id]['match_pool3_count']} Winners</span>
                      </li>
                      <li>
                        <span>Match  4</span>
                        <span>{Number(data['info'][data.id]['total_pool_sol']/100*12).toFixed(2)} SOL</span>
                        <span>{data['info'][data.id]['match_pool4_count']} Winners</span>
                      </li>
                      <li>
                        <span>Match  5</span>
                        <span>{Number(data['info'][data.id]['total_pool_sol']/100*16).toFixed(2)} SOL</span>
                        <span>{data['info'][data.id]['match_pool5_count']} Winners</span>
                      </li>
                      <li>
                        <span>Match  6</span>
                        <span>{Number(data['info'][data.id]['total_pool_sol']/100*40).toFixed(2)} SOL</span>
                        <span>{data['info'][data.id]['match_pool6_count']} Winners</span>
                      </li>
                      <li>
                        <span>Burn</span>
                        <span>{Number(data['info'][data.id]['total_pool_sol']/100*24).toFixed(2)} SOL</span>
                        <span><br/></span>
                      </li>
                    </ul>
                    <p className="totalMatch">Total players this round: <span>{data['info'][data.id]['total_player']}</span></p>
                  </div>
                </div>
              </div>
            </div>
            <p className={`${classes.footer}`} onClick={() => setSlide(!slide)}>
              {slide ? (
                <>
                  Detail
                  <span>
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6L0.535899 -6.52533e-07L7.4641 -4.68497e-08L4 6Z" fill="#17F0FF" />
                    </svg>
                  </span>
                </>
              ) :
                <>
                  Hide
                  <span>
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 0L7.4641 6L0.535898 6L4 0Z" fill="#17F0FF" />
                    </svg>
                  </span>
                </>
              }
            </p>
          </>
        ) : (
          <ContentLoader
            viewBox="0 0 700 306"
            backgroundColor="#fff"
            foregroundColor="#dcdcdc"
          >
            <rect x="32" y="32" rx="4" ry="4" width="80" height="15" />
            <rect x="32" y="64" rx="4" ry="4" width="636" height="50" />
            <rect x="32" y="180" rx="4" ry="4" width="180" height="15" />
            <circle cx="265" cy="190" r="24" />
            <circle cx="345" cy="190" r="24" />
            <circle cx="425" cy="190" r="24" />
            <circle cx="500" cy="190" r="24" />
            <circle cx="575" cy="190" r="24" />
            <circle cx="645" cy="190" r="24" />
            <rect x="265" y="265" rx="4" ry="4" width="180" height="15" />
          </ContentLoader>
        )
      }
    </div>
  )
}

export default All