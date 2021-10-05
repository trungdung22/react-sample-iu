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
import { getGameBoardInfo, connectPlayerAccount, insertBulkTicket} from 'lib/utilities/utils';
import { buyBulkTicket } from 'lib/program/lottery-commands';


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
      privateKey: '',
      pubKey: '',
      lamportUnit: 0, 
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
        lamportUnit: item.lamportUnit,
        privateKey: item.privateKey,
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
    debugger
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
    debugger
    if(getDataModalTolottery.flag_submit && getDataModalTolottery.your_ticket.length > 0) {
      console.log("prepare to submit ticket");
      buyBulkTicket(partyData.data.programId, getDataModalTolottery.your_ticket, 
        playerData.data.privateKey, playerData.data.lamportUnit, partyData.data.gamePubkey, partyData.data.ownerPubkey)
        .then(async results => {
            //buyBulkTicket(partyData.data.programId, playerData.data.pubKey, results);
        }).catch( error => alert(error));
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