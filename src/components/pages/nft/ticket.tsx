import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import useStyles from './styles';
import { useWindowSize } from 'data/constants';
import { NFTTypes, deserializeNFTTicket, MILLI_NFT_ACCOUNT_DATA_LAYOUT } from '../../../lib/program/state';
import { CLUSTERS, getConnection } from '../../../lib/program/connection';
import { Commitment, Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { format2digitNumber } from 'lib/utilities/format';
import { off } from 'process';

export interface MilliNFTAccountDataLayout {
  ticketNumber: String;
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
  priceMilli: number;
  priceDollar: number;
  description: string;
  imageURL: string;
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
  emitTicketData,
}) => {
  const [isLoaded, settIsLoaded] = useState(false);

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
      let nftInfo = {} as MilliNFTAccountDataLayout;
      const nftDecodedInfo = deserializeNFTTicket(res);
      // console.log(nftDecodedInfo);
      nftInfo.imageURL = `${metadataURL}/image.png`;
      nftInfo.milli_nft_pubkey = nftAccountPubkey;
      nftInfo.price = nftDecodedInfo.price;
      nftInfo.priceMilli = nftDecodedInfo.price / 1000000;
      nftInfo.priceDollar = nftDecodedInfo.price / 1000000 * 2; // 1 milli  = 2 $
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

      nftInfo.ticketNumber = `#${nftInfo.num_one.toString() + nftInfo.num_two.toString() + nftInfo.num_three.toString() + nftInfo.num_four.toString() + nftInfo.num_five.toString() + nftInfo.num_six.toString()}`
      switch (nftDecodedInfo.nft_type.toLocaleLowerCase()) {
        case NFTTypes[0]:
          nftInfo.ticketNumber = nftInfo.ticketNumber.slice(0, 7);
          break;
        case NFTTypes[1]:
          nftInfo.ticketNumber = nftInfo.ticketNumber.slice(0, 9);
          break;
        case NFTTypes[2]:
          nftInfo.ticketNumber = nftInfo.ticketNumber.slice(0, 11);
          break;
        case NFTTypes[3]:
          nftInfo.ticketNumber = nftInfo.ticketNumber.slice(0, 13);
      }

      let metadataRes = await fetch(metadataURL);
      // check for error response
      const metadata_data = await metadataRes.json();
      if (!metadataRes.ok) {
        // get error message from body or default to response statusText
        const error = (metadata_data && metadata_data.message) || metadataRes.statusText;
        return Promise.reject(error);
      }
      nftInfo.description = metadata_data.description;
      setNftData(nftInfo);
      settIsLoaded(true);
    }).catch(err => {
      console.log("Could not find nft ticket info!");
      console.log(err);
    });
  }, [])

  const buildDescriptionDisplay = (desctiption) => {
    let arr = desctiption.split(' ');
    arr = arr.map(ele => {
      if (ele.includes('.')) {
        return ele += '</p>';
      }
      if (ele.includes('Lottery')) {
        return `<p class='text-bodybox-sp md:text-bodybox-pc'><span class='inline-block mr-1 font-semibold'>${ele}</span></p>`;
      }
      if (ele.includes('MILLIGO')) {
        return `<p class='text-bodybox-sp md:text-bodybox-pc'><span class='uppercase inline-block mr-1 font-semibold'>${ele}</span></p>`;
      }
      return ele;
    });
    return arr.join(' ');
  }

  const cardOnClickHandler = () => {
    if (!isLoaded)
      return;
    if (size.width < 768) {
      swipableView(1);
      window.scrollTo(0, 0);
    } else {
      isShowPopupDesktop(true);
    }

    emitTicketData(nftData);
  }

  return (
    <>
      {isLoaded &&
        <div className='col-span-1 bg-gray-box text-gray-primary rounded-5 md:rounded-10 border border-solid border-gray-boxline-50 p-1 md:p-2 cursor-pointer transition-all hover:opacity-70'
          onClick={cardOnClickHandler}
        >
          <p className='bg-no-repeat bg-center bg-cover h-24 sm:h-36 lg:h-48 rounded-5 md:rounded-10' style={{ 'backgroundImage': `url(${nftData.imageURL}` }}></p>
          <div className='mt-1 md:mt-2.5'>
            <p className='text-h2-sp md:text-h2-pc text-blue-primary font-bungee leading-6 md:mb-1'>{nftData.ticketNumber}</p>
            {/* <div dangerouslySetInnerHTML={{ __html: nftData.description }} ></div> */}
            <div>
              <p className='leading-4'><span className='font-bold inline-block mr-1'>Lottery:</span>Lifetime drawing with match 3.</p>
              <p className='leading-4'><span className='font-bold uppercase inline-block mr-1'>MILLIGO:</span>1 slot for every IGO round.</p>
            </div>
            <p className='w-full h-px bg-gray-boxline opacity-50 mt-2'></p>
            <p className='flex justify-between items-center font-bold text-h2-sp md:text-h2-pc text-blue-primary pt-1 md:pt-2'><span className='text-body-sp md:text-body-pc font-light text-gray-primary'>~({nftData.priceDollar})$</span><span>{nftData.priceMilli} MILLI</span></p>
          </div>
        </div>
      }
    </>
  )
}

export default Ticket