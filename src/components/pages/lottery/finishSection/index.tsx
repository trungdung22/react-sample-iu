import React, { useState } from 'react';
import All from './all';
import Jackpots from './jackpots';
import Yours from './yours';
import Detail from './detail';
import useStyles from './styles';
type Props = {
  playerData: any
  dataGiveFromFinished: (getDataFinished: any) => void
}
const FinishedSection: React.FC<Props> = ({playerData, dataGiveFromFinished}) => {
  const [component, setComponent] = useState('all');
  const [dataBackYour, setDataBackYour] = useState(false);
  const [dataYours, setDataYours] = useState(0);
  const classes = useStyles();
  const handleSetComponent = (item: string) => {
    try {
      setComponent(item);
    } finally {
      handerRenderComponent(component);
    }
  }
  
  const dataGiveFromYours = (getDataFromYours: any) => {
    setDataYours(getDataFromYours)
    setDataBackYour(false)
  }

  const dataGiveAll = (getDataAll: any) => {
    if (getDataAll.back_your) {
      setDataBackYour(getDataAll.back_your);
    } else {
      dataGiveFromFinished(getDataAll);
    }
  }

  const handerRenderComponent = (item: string) => {
    switch (component) {
      case 'jackpots':
        return (<Jackpots></Jackpots>);
      case 'yours':
        return (<Yours playerData={playerData} dataGiveFromYours={dataGiveFromYours}></Yours>);
      case 'detail': 
        return (<Detail dataSendToDetail={dataYours} dataGiveDetail={dataGiveAll}></Detail>);
      default:
        return (<All dataSendToAll={0} dataGiveAll={dataGiveAll}></All>)
    }
  }

  return (
    <div className={`${classes.root} relative`}>
      <p className='absolute top-1/3 left-10 hidden lg:block xl:left-40 2xl:left-80'><img src="./assets/lottery/star_05.svg" alt="" /></p>
      <p className='absolute bottom-1/3 hidden lg:block right-10 xl:right-32'><img src="./assets/lottery/star_06.svg" alt="" /></p>
      <div className={`${classes.container}`}>
        <h3>Millionsy airboard</h3>
        <ul className={`${classes.listButton}`}>
          <li className={component === 'jackpots' ? 'active' : ''} onClick={() =>{
            setDataYours(0)
            setDataBackYour(false)
            handleSetComponent('jackpots')
          }}>Jackpots</li>
          <li className={component === 'all' ? 'active' : ''} onClick={() => {
            setDataYours(0)
            setDataBackYour(false)
            handleSetComponent('all')
          }}>All History</li>
          <li className={component === 'yours' ? 'active' : ''} onClick={() => {
            setDataYours(0)
            setDataBackYour(false)
            handleSetComponent('yours')
          }}>Yours</li>
        </ul>
        {dataYours !== 0 && dataBackYour === false ? (<Detail dataSendToDetail={dataYours} dataGiveDetail={dataGiveAll}></Detail>) : (handerRenderComponent('detail'))}
        
      </div>
    </div>
  )
}

export default FinishedSection