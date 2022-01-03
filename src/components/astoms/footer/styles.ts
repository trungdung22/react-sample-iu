import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Z_BLOCK } from 'zlib';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    background: '#071526',
    padding: '5.25rem 0 2rem',
    borderTop: '1px solid rgba(100, 100, 100, 0.5)',
    '@media screen and (max-width: 1640px)': {
      padding: '5.25rem 3% 2rem',
    },
    '@media screen and (max-width: 767px)': {
      padding: '3em 3% 7rem',
    },
  },
  container: {
    maxWidth: 1110,
    margin: '0 auto',
    transition: 'all 0.2s ease',
  },
  footerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    '& > div': {
      width: '32.5%',
    },
    '& .title': {
      fontSize: 24,
      color: '#FFAC0A',
      marginBottom: '1.5rem',
      fontWeight: '700',
      '@media screen and (max-width: 1920px)': {
        fontSize: '18px',
      },
      '@media screen and (max-width: 767px)': {
        fontSize: '14px',
        marginBottom: '0.5rem',
      },
    },
    '& a': {
      color: '#B2FAFF',
      textDecoration: 'none',
      display: 'inline-block',
      lineHeight: '2.35rem',
      fontSize: 20,
      '&:hover': {
        textDecoration: 'underline'
      },
      '@media screen and (max-width: 1920px)': {
        fontSize: '18px',
      },
      '@media screen and (max-width: 767px)': {
        fontSize: '14px',
        lineHeight: '1.72em',
      },
    },
    '@media screen and (max-width: 767px)': {
      '& > div': {
        width: 'auto',
      },
    },
    '@media screen and (max-width: 640px)': {
      display: 'block',
      '& > div + div': {
        marginTop: '2rem',
      },
    },
  },
  footerBottom: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: '2.25rem',
    '& .logo': {
      display: 'inline-block',
      textDecoration: 'none',
      fontSize: 56,
      color: '#B2FAFF',
      fontFamily: '\'Bungee\', cursive',
      fontWeight: 400,
    },
    '& .copyright': {
      fontSize: 18,
      paddingBottom: '0.75rem',
      color: '#F4E0FF',
    },

    '@media screen and (max-width: 767px)': {
      '& .logo': {
        fontSize: '36px',
      },
      '& .copyright': {
        fontSize: '12px',
        paddingBottom: '4px',
      },
    },

    '@media screen and (max-width: 640px)': {
      marginTop: '3.5em',
      display: 'block',
      '& .copyright': {
        marginTop: '0.5rem',
        paddingBottom: '0',
      },
    },
  },
  footerSticky: {
    display: 'none',
    '@media screen and (max-width: 767px)': {
      position: 'fixed',
      bottom: 0,
      width: '100%',
      left: 0,
      justifyContent: 'space-evenly',
      padding: '0.55rem 0',
      borderTop: '1px solid rgba(87, 87, 87, 0.5)',
      background: '#151515',
      zIndex: 99,
      display: 'flex',
      fontSize: 9,
      '& a': {
        fontWeight: 500,
        display: 'block',
        padding: '4px 14px',
        borderRadius: 3,
        '&.active': {
          color: '#17F0FF',
          fontWeight: 700,
          background: 'rgba(11, 120, 128, 0.3)',
          '& path': {
            fill: '#17F0FF'
          }
        },
      },
      '& span': {
        color: '#fff',
        display: 'block',
        textAlign: 'center',
        paddingBottom: '0.25rem',
        '& svg': {
          margin: '0 auto',
          maxHeight: 20,
        }
      },
    }
  },
}));

export default useStyles;