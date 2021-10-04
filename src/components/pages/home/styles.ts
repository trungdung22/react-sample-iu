import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { keyframes } from 'styled-components';
var faceAnimate = keyframes`
    0% { 
      transform: translate(-10px, -10px); 
    }
    100% {
      transform: translate(0, 0); 
    }
`;
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '15rem 0 18rem',
    transition: 'all 0.2s ease',
    '@media screen and (max-width: 768px)': {
      padding: '8rem 0 5rem',
    },
  },
  container: {
    maxWidth: 1110,
    width: '100%',
    margin: '0 auto',
    position: 'relative',
    transition: 'all 0.2s ease',
    '@media screen and (max-width: 1180px)': {
      margin: '0 3%',
    },
  },
  content: {},
  text: {
    fontSize: 20,
    fontWeight: 600,
    margin: '1.5rem 0 1.75rem',
    transition: 'all 0.2s ease',
    '@media screen and (max-width: 1340px)': {
      fontSize: 18,
    },
    '@media screen and (max-width: 768px)': {
      fontSize: 14,
      lineHeight: '1.4rem',
      margin: '0.5rem 0',
    },
  },
  face: {
    position: 'absolute',
    right: '-10%',
    top: '-7%',
    zIndex: -1,
    maxWidth: 500,
    transition: 'all 0.2s ease',
    '& li:nth-child(2)': {
      position: 'absolute',
      left: 0,
      top: 0,
      animation: `${faceAnimate} 2.5s ease-in-out infinite alternate-reverse`
    },
    '@media screen and (max-width: 1360px)': {
      maxWidth: '41vw',
      right: '3%',
    },
    '@media screen and (max-width: 768px)': {
      position: 'relative',
      top: 0,
      right: 0,
      marginLeft: 'auto',
      width: 320,
      marginBottom: '1rem',
      maxWidth: '100%',
    },
  }
}));

export default useStyles;