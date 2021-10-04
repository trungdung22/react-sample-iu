import React from 'react';
import useStyles from './styles';
const GetSection: React.FC = () => {
  const classes = useStyles();
  const DataItemCards = [
    {
      title: 'Get the tickets',
      content: ['Every ticket equals to 2$ and can be bought with',<br className="sp-768"/>,' $SOL token. Price will be set when the round begins.'],
      has_arrow: false,
    },
    {
      title: 'Pick your card',
      content: ['Freely choose 6 different numbers from 1 to 45 (the',<br className="sp-768"/>,'order doesn\'t matter). You can select by yourself or',<br className="sp-768"/>,' let the machine choose randomly.'],
      has_arrow: false,
    },
    {
      title: 'Wait for the party',
      content: ['There is 1 draw every day, starts at 11am UTC and',<br className="sp-768"/>,' ends 5 minutes before the next round begins.'],
      has_arrow: false,
    },
    {
      title: 'Reward',
      content: ['Once the draw\'s out, come back to see if you\'re the',<br className="sp-768"/>,' lucky winner! The prize is automatically sent to the',<br className="sp-768"/>,' winner\'s wallet.'],
      has_arrow: false,
    },
    {
      title: 'Pop the champagne',
      content: ['Match all 6 digits from the winning numbers and you',<br className="sp-768"/>,' win the jackpot. Or just match at least 3 to win a',<br className="sp-768"/>,' SHARED PRIZE.'],
      has_arrow: true,
      link: 'https://docs.millionsy.io/lottery/how-to-play'
    },
    {
      title: 'Fund?',
      content: ['After every round, the $SOL in the unclaimed',<br className="sp-768"/>,' brackets will be rolled over into the next round and',<br className="sp-768"/>,' redistributed among the PRIZE POOL.'],
      has_arrow: true,
      link: 'https://docs.millionsy.io/lottery/prize-pool'
    },
  ]

  const handleRenderCard = (el: any) => {
    if (el.has_arrow) {
      return (
        <>
          <span className={`${classes.title}`}>{el.title}</span>
          <span className={`${classes.content}`}>{el.content}</span>
          <a href={el.link} target="_blank">
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 5.25C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75L1 5.25ZM24.5303 6.53033C24.8232 6.23743 24.8232 5.76256 24.5303 5.46967L19.7574 0.696698C19.4645 0.403804 18.9896 0.403804 18.6967 0.696698C18.4038 0.989591 18.4038 1.46446 18.6967 1.75736L22.9393 6L18.6967 10.2426C18.4038 10.5355 18.4038 11.0104 18.6967 11.3033C18.9896 11.5962 19.4645 11.5962 19.7574 11.3033L24.5303 6.53033ZM1 6.75L24 6.75L24 5.25L1 5.25L1 6.75Z" fill="white"/>
            </svg>
          </a>
        </>
      )
    }
    return (
      <>
        <span className={`${classes.title}`}>{el.title}</span>
        <span className={`${classes.content}`}>{el.content}</span>
      </>
    )
  }
  return (
    <div className={`${classes.root}`}>
      <div className={`${classes.container}`}>
        <h3>HOW TO GET IN</h3>
        <ul className={`${classes.listCard}`}>
          {DataItemCards.map((el, index) => (<li key={index} className={classes.item}>{ handleRenderCard(el) }</li>))}
        </ul>
      </div>
    </div>
  )
}

export default GetSection