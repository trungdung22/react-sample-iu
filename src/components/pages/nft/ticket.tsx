import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import useStyles from './styles';
import { useWindowSize } from 'data/constants';
import { NFTTypes, deserializeNFTTicket, MILLI_NFT_ACCOUNT_DATA_LAYOUT } from '../../../lib/program/state';
import { CLUSTERS, getConnection } from '../../../lib/program/connection';
import { Commitment, Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { format2digitNumber } from 'lib/utilities/format';

interface MilliNFTAccountDataLayout {
  status: String;
  nft_type: String;
  milli_nft_pubkey: String;
  user_pubkey: String;
  mint_pubkey: String;
  token_account_pubkey: String;
  amount: Uint8Array;
  level: Uint8Array;
  num_one: String;
  num_two: String;
  num_three: String;
  num_four: String;
  num_five: String;
  num_six: String;
  price: number;
  description: String;
}

type Props = {
  nftAccountPubkey: string,
  metadataURL: string
  swipableView: (value: any) => void,
  isShowPopupDesktop: (isShown: boolean) => void,
  emitTicketData: (ticketNumber: any) => void,
}

const Ticket: React.FC<Props> = ({
  nftAccountPubkey,
  metadataURL,
  swipableView,
  isShowPopupDesktop,
  emitTicketData
}) => {
  const [isLoaded, settIsLoaded] = useState(false);

  const [ticketNumber, setTicketNumber] = useState('######');
  const [nftData, setNftData] = useState<MilliNFTAccountDataLayout>();
  const [imageURL, setImageURL] = useState(`${metadataURL}/image.png`);

  const size = useWindowSize();
  const COMMITMENT: Commitment = "singleGossip";

  const connection = new Connection('https://api.devnet.solana.com',
    COMMITMENT
  );

  useEffect(() => {
    connection.getAccountInfo(
      new PublicKey(nftAccountPubkey)
    ).then(async res => {
      setTicketNumber('#');
      let nftInfo = {} as MilliNFTAccountDataLayout;
      const nftDecodedInfo = deserializeNFTTicket(res);
      // console.log(nftDecodedInfo);
      nftInfo.milli_nft_pubkey = nftAccountPubkey;
      nftInfo.price = nftDecodedInfo.price;
      nftInfo.status = nftDecodedInfo.status;

      nftInfo.token_account_pubkey = nftDecodedInfo.token_account_pubkey;
      nftInfo.mint_pubkey = nftDecodedInfo.mint_pubkey;
      nftInfo.user_pubkey = nftDecodedInfo.user_pubkey

      nftInfo.num_one = format2digitNumber(nftDecodedInfo.num_one);
      nftInfo.num_two = format2digitNumber(nftDecodedInfo.num_two);
      nftInfo.num_three = format2digitNumber(nftDecodedInfo.num_three);

      nftInfo.num_four = format2digitNumber(nftDecodedInfo.num_four);
      nftInfo.num_five = format2digitNumber(nftDecodedInfo.num_five);
      nftInfo.num_six = format2digitNumber(nftDecodedInfo.num_six);

      setTicketNumber(`#${nftInfo.num_one.toString() + nftInfo.num_two.toString() + nftInfo.num_three.toString() + nftInfo.num_four.toString() + nftInfo.num_five.toString() + nftInfo.num_six.toString()}`);
      switch (nftDecodedInfo.nft_type.toLocaleLowerCase()) {
        case NFTTypes[0]:
          setTicketNumber(number => number.slice(0, 7));
          break;
        case NFTTypes[1]:
          setTicketNumber(number => number.slice(0, 9));
          break;
        case NFTTypes[2]:
          setTicketNumber(number => number.slice(0, 11));
          break;
        case NFTTypes[3]:
          setTicketNumber(number => number.slice(0, 13));
      }
      
      let a = await fetch(metadataURL);
      // check for error response
      const response_data = await a.json();
      if (!a.ok) {
        // get error message from body or default to response statusText
        const error = (response_data && response_data.message) || a.statusText;
        return Promise.reject(error);
      }
      nftInfo.description = response_data.description;
      console.log( nftInfo.description.split(':'))
      setNftData(nftInfo);
      settIsLoaded(true);
    }).catch(err => {
      console.log("Could not find nft ticket info!");
      console.log(err);
    });
  }, [])

  const cardOnClickHandler = () => {
    if (!isLoaded)
      return;
    if (size.width < 768) {
      swipableView(1);
      window.scrollTo(0, 0);
    } else {
      isShowPopupDesktop(true);
    }

    emitTicketData({
      ...nftData,
      ticketNumber: ticketNumber,
      // token_account_pubkey: nftData.token_account_pubkey,
      // mint_pubkey: nftData.mint_pubkey,
      // user_pubkey: nftData.user_pubkey,
      // milli_nft_pubkey: nftData.milli_nft_pubkey,
      // price: nftData.price,
      // status: nftData.status,
      imageURL: imageURL
    });
  }

  return (
    <>
      {isLoaded &&
        <div className='col-span-1 bg-gray-151515 text-gray-EBEBEB rounded-5 md:rounded-10 border border-solid border-gray-A9A9A9-50 p-1 md:p-2 cursor-pointer transition-all hover:opacity-70'
        onClick={cardOnClickHandler}
        >
          <p className='bg-no-repeat bg-center bg-cover h-24 sm:h-36 lg:h-48 rounded-5 md:rounded-10' style={{ 'backgroundImage': `url(${imageURL}` }}></p>
          <div className='mt-1 md:mt-2.5'>
            <p className='text-16 md:text-20 text-blue-17F0FF font-bungee leading-6 md:mb-1'>{ticketNumber}</p>
            <p> {nftData.description}</p>
            {/* <p className='text-10 md:text-14'>
            <span className='inline-block mr-1 font-semibold'>Lottery:</span>
            Lifetime drawing with match 3.</p>
            <p className='text-10 md:text-14'><span className='uppercase inline-block mr-1 font-semibold'>MILLIGO:</span>1 slot for every IGO round.</p> */}
            <p className='w-full h-px bg-gray-A9A9A9-50 mt-2'></p>
            <p className='flex justify-between items-center font-bold text-14 md:text-18 text-blue-17F0FF pt-1 md:pt-2'><span className='text-10 md:text-14 font-light text-gray-EBEBEB'>~({nftData.price / 1000000 * 2})$</span><span>{nftData.price/1000000} MILLI</span></p>
          </div>
        </div>
      }
    </>
  )
}

export default Ticket