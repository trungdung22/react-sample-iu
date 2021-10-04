import React, { useState, useEffect } from 'react';
import FinishedSection from './finishSection';
import GetSection from './getSection';
import NextSection from './nextSection';
import PartySection from './partySection';
import ModalContent from 'components/astoms/modalSection';
import useStyles from './styles';
import { isConnect } from 'data/db';
import Star from 'components/astoms/star';
import Header from 'components/astoms/header';
import Footer from 'components/astoms/footer';
import { getGameBoardInfo, connectPlayerAccount} from 'lib/utilities/utils';


const Lottery: React.FC = () => {
  const classes = useStyles();
  const [dataModal, setDataModal] = useState({
    data: {
      is_connect: isConnect,
      show: false,
      first: false,
      second: false,
      third: false,
      four: false,
      view_ticket: false,
      view_your: false,
      submit: false,
      flag_submit: false,
      your_ticket: [],
      next_round: {
        next_id: -1,
        your_ticket: []
      },
    }
  });

  const [playerData, setPlayerData] = useState({
    data: {
      pubKey: '', 
      balanceUSDT: 0, 
      balanceSOL: 0,
    }
  });

  const [partyData, setPartyData] = useState({
    data: {
      programId: '',
      ownerPubkey: '',
      gameStatus: '',
      gamePubkey: '',
      gameBalanceSol: '',
      gameBalanceUSDT: '',
      gameRollNums: [],
    }
  });

  useEffect(()=> {
    connectPlayerAccount().then(item => setPlayerData({
      data: {
        pubKey: item.publicKey,
        balanceUSDT: item.balanceUSDT,
        balanceSOL: item.balanceSOL,
      }
    }));
  }, [])

  useEffect(()=>{
    getGameBoardInfo().then(item => setPartyData({
      data: {
        ...partyData.data,
        programId: item.programId,
        ownerPubkey: item.ownerPubkey, 
        gameStatus: item.gameStatus, 
        gamePubkey: item.gamePubkey, 
        gameBalanceSol: item.gameBalanceSOL, 
        gameBalanceUSDT: item.gameBalanceUSDT, 
        gameRollNums: item.gameRollNums
      }
   }));
  }, [])

  const sendDataPartyToLottery = (getDataPartyTolottery: boolean) => {
    setDataModal({
      data: {
        ...dataModal.data,
        show: true,
        first: getDataPartyTolottery,
      }
    })
  }
  const sendDataNextToLottery = (getDataNextTolottery: any) => {
    setDataModal({
      data: {
        ...dataModal.data,
        show: true,
        view_ticket: getDataNextTolottery.view_ticket,
        first: getDataNextTolottery.get_ticket,
        next_round: getDataNextTolottery.next_round,
      }
    })
  }
  const dataGiveFromFinished = (getDataFinished: any) => {
    setDataModal({
      data: {
        ...dataModal.data,
        show: true,
        view_your: getDataFinished.view_your,
        your_ticket: getDataFinished.your_ticket,
      }
    })
  }
  const dataGiveFromHeader = (getDataHeader: any) => {
    setDataModal({
      data: {
        ...dataModal.data,
        show: true,
      }
    })
  }

  const dataGiveFromModal = (getDataModalTolottery: any) => {
    setDataModal({
      data: getDataModalTolottery,
    })
    if(getDataModalTolottery.flag_submit) {
      console.log("prepare to submit ticket");
    }
  }
  

  return (
    <>
      <Star></Star>
      <Header dataGiveFromHeader={dataGiveFromHeader}></Header>
      <div className={`${classes.root}`}>
          <PartySection partyData={partyData.data} sendDataPartyToLottery={sendDataPartyToLottery}></PartySection>
          <NextSection sendDataNextToLottery={sendDataNextToLottery}></NextSection>
          <FinishedSection dataGiveFromFinished={dataGiveFromFinished}></FinishedSection>
          <GetSection></GetSection>
          <ModalContent dataModal={dataModal.data} playerData={playerData.data} dataGiveFromModal={dataGiveFromModal}></ModalContent>
      </div>
      <Footer></Footer>
    </>
    
  )
}

export default Lottery