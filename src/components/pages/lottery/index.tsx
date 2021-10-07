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
import { getGameBoardInfo, fetchPlayerAccount, insertBulkTicket } from 'lib/utilities/utils';
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
      is_connect: false,
      adapter_type: '',
      publicKey: '',
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

  useEffect(() => {
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

  const dataGiveFromWallet = (getDataWallet: any) => {
    debugger
    if (getDataWallet.is_connect) {
      fetchPlayerAccount(getDataWallet.publicKey).then(item => setPlayerData({
        data: {
          adapter_type: getDataWallet.adapter_type,
          is_connect: true,
          lamportUnit: item.lamportUnit,
          publicKey: getDataWallet.publicKey,
          balanceUSDT: item.balanceUSDT,
          balanceSOL: item.balanceSOL,
        }
      }));
      setDataModal({
        data: {
          ...dataModal.data,
          show: false,
        }
      })
    } 
  }

  const dataGiveFromModal = (getDataModalTolottery: any) => {
    debugger
    setDataModal({
      data: getDataModalTolottery,
    })
    if (getDataModalTolottery.flag_submit && getDataModalTolottery.your_ticket.length > 0) {
      console.log("prepare to submit ticket");
      buyBulkTicket(partyData.data.programId,
        getDataModalTolottery.your_ticket,
        playerData.data.lamportUnit,
        partyData.data.gamePubkey,
        partyData.data.ownerPubkey,
        playerData.data.adapter_type)
        .then(async results => {
          setDataModal({
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
          insertBulkTicket(partyData.data.programId, playerData.data.publicKey, results);
        }).catch(error => console.log(error));
    }
  }


  return (
    <>
      <Star></Star>
      <Header playerData={playerData} dataGiveFromHeader={dataGiveFromHeader}></Header>
      <div className={`${classes.root}`}>
        <PartySection partyData={partyData.data} sendDataPartyToLottery={sendDataPartyToLottery}></PartySection>
        <NextSection playerData={playerData} sendDataNextToLottery={sendDataNextToLottery}></NextSection>
        <FinishedSection playerData={playerData.data} dataGiveFromFinished={dataGiveFromFinished}></FinishedSection>
        <GetSection></GetSection>
        <ModalContent dataModal={dataModal.data} playerData={playerData.data}
          dataGiveFromModal={dataGiveFromModal} dataGiveFromWallet={dataGiveFromWallet}></ModalContent>
      </div>
      <Footer></Footer>
    </>

  )
}

export default Lottery