import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { HOST_NAME } from 'data/constants';
import { dataTest } from 'data/db';
import { InfiniteScroll } from 'react-simple-infinite-scroll'
import { debug } from 'console';
import ContentLoader from 'react-content-loader';

type Props = {
  playerData: any,
  dataGiveFromYours: (getDataFromYours: any) => void,
}
const Yours: React.FC<Props> = ({playerData, dataGiveFromYours}) => {
  const classes = useStyles();
  const [data, setData] = useState({
    items: [],
    isLoading: true,
    currGameNo: 0, 
    loadAll: false
  });
  
  const [error, setError] = useState('');

  const loadMore = () => {
    if (playerData.publicKey !== undefined && playerData.publicKey !== '') {
      setData({ ...data, isLoading: true});
      fetch(`${HOST_NAME}/api/game-history/${playerData.publicKey}?currGameNo=${data.currGameNo}`)
        .then(res => res.json())
        .then(
          res => {
            setData({
              items: [...data.items, ...res.results], 
              currGameNo: res.currGameNo,
              isLoading: false,
              loadAll: res.results.length > 0 ? false : true 
            })
          },
          error => {
            setError(error.toString());
            setData({ ...data, isLoading: false});
          }
      )
    }
  }

  useEffect(()=>{
    loadMore();
  }, [])
  

  const handleRenderRoundItems = (el: any) => {
    const date = new Date(el.createdAt);
    const formatTime = (time: number) => {
      return time < 10 ?  '0' + time : time;
    }
    return (
      <li key={el.id} onClick={() => dataGiveFromYours(el)}>
        <p>{el.game_no}</p>
        <p>
          <span>{`${formatTime(date.getDate())} thg ${date.getMonth() + 1}, ${date.getFullYear()}`}</span>
          <span>{`${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`}</span>
        </p>
        <p>
          <span>{el.player_tickets.length}</span>
          <span><img src="/assets/common/icon_arrow_circle.svg" alt="arrow circle" /></span>
        </p>
      </li>
    )
  }
  
  return (
    <div className={`${classes.root}`}>
      {
        true ? (
          <>
            <div className={`${classes.header}`}>
              <p className="title">Round</p>
            </div>
            <div className={`${classes.body}`}>
              <ul className="listLabel">
                <li>#</li>
                <li>Date</li>
                <li>Your<br className="sp-768"/> tickets</li>
              </ul>
              <ul className="listRound">
                <InfiniteScroll
                  throttle={100}
                  threshold={30}
                  isLoading={data.isLoading}
                  hasMore={!data.loadAll}
                  onLoadMore={loadMore}
                >
                  {data.items.length > 0
                    ? data.items.map(item => (handleRenderRoundItems(item)))
                    : null}
                </InfiniteScroll>
              </ul>
            </div>
          </>
        ) : (
          <ContentLoader
            viewBox="0 0 700 312"
            backgroundColor="#fff"
            foregroundColor="#dcdcdc"
          >
            <rect x="32" y="32" rx="4" ry="4" width="180" height="20" />
            <rect x="32" y="72" rx="4" ry="4" width="642" height="20" />
            <rect x="32" y="112" rx="4" ry="4" width="642" height="20" />
            <rect x="32" y="152" rx="4" ry="4" width="642" height="20" />
            <rect x="32" y="192" rx="4" ry="4" width="642" height="20" />
            <rect x="32" y="232" rx="4" ry="4" width="642" height="20" />
            <rect x="32" y="272" rx="4" ry="4" width="642" height="20" />
            <rect x="32" y="312" rx="4" ry="4" width="642" height="20" />
          </ContentLoader>
        )
      }
      
    </div>
  )
}

export default Yours