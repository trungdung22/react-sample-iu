import React, { useEffect, useState } from 'react';
import All from './all';
import Jackpots from './jackpots';
import Yours from './yours';
import useStyles from './styles';
type Props = {
  dataGiveFromFinished: (getDataFinished: any) => void
}
const FinishedSection: React.FC<Props> = ({dataGiveFromFinished}) => {
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
        return (<Yours dataGiveFromYours={dataGiveFromYours}></Yours>);
      default:
        return (<All dataSendToAll={0} dataGiveAll={dataGiveAll}></All>)
    }
  }

  return (
    <div className={`${classes.root}`}>
      <div className={`${classes.container}`}>
        <h3>Millionsy airboard</h3>
        <ul className={`${classes.listButton}`}>
          <li className={component === 'jackpots' ? 'active' : ''} onClick={() =>{
            setDataYours(0)
            setDataBackYour(false)
            handleSetComponent('jackpots')
          }}>Jackpots</li>
          <li className="slash">
            <svg width="16" height="23" viewBox="0 0 16 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="7.31585" y1="1.85437" x2="1.8543" y2="20.9698" stroke="#A819FA" strokeWidth="3" strokeLinecap="round"/>
              <line x1="13.6015" y1="1.85437" x2="8.13994" y2="20.9698" stroke="#A819FA" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </li>
          <li className={component === 'all' ? 'active' : ''} onClick={() => {
            setDataYours(0)
            setDataBackYour(false)
            handleSetComponent('all')
          }}>All History</li>
          <li className="slash">
            <svg width="16" height="23" viewBox="0 0 16 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="7.31585" y1="1.85437" x2="1.8543" y2="20.9698" stroke="#A819FA" strokeWidth="3" strokeLinecap="round"/>
              <line x1="13.6015" y1="1.85437" x2="8.13994" y2="20.9698" stroke="#A819FA" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </li>
          <li className={component === 'yours' ? 'active' : ''} onClick={() => {
            setDataYours(0)
            setDataBackYour(false)
            handleSetComponent('yours')
          }}>Yours</li>
        </ul>
        {dataYours !== 0 && dataBackYour == false ? (<All dataSendToAll={dataYours} dataGiveAll={dataGiveAll}></All>) : (handerRenderComponent('all'))}
        
        {/* {dataBackYour ? (<Yours dataGiveFromYours={dataGiveFromYours}></Yours>) : (handerRenderComponent('all'))} */}
      </div>
    </div>
  )
}

export default FinishedSection