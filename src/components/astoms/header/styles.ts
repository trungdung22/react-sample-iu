import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { NONAME } from 'dns';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    background: '#151515',
    borderBottom: '0.5px solid rgba(87, 87, 87, 0.5)',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 100,
    '&.active': {
      top: '-100%',
    },
    '& .listRouter': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1.25rem',
      '& a': {
        display: 'inline-block',
        fontSize: 16,
        color: '#A9A9A9',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        fontWeight: '500',
        padding: '5px 14px',
        borderRadius: '5px',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: 0,
          left: 0,
          height: 2,
          background: '#17F0FF',
          bottom: -24,
          transition: 'all 0.2s ease',
        },
        '&:not(.active):hover': {
          color: '#fff',
          background: 'rgba(11, 120, 128, 0.7)',
        },
        '&.active': {
          color: '#17F0FF',
          '&::before': {
            width: '100%',
          },
        },
        '@media screen and (max-width: 767px)': {
          fontSize: '10px',
          color: '#F4E0FF',
          '&:hover': {
            color: '#F4E0FF',
          },
        }
      },
      '@media screen and (max-width: 767px)': {
        display: 'none',
      }
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1560,
    width: '100%',
    margin: '0 auto',
    transition: 'all 0.2s ease',
    '@media screen and (max-width: 1640px)': {
      padding: '0 3%',
    }
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    textDecoration: 'none',
    color: '#fff',
    cursor: 'pointer',
    '& img': {
      maxWidth: 40,
      transition: 'all 0.2s ease',
    },
    '& span': {
      display: 'inline-block',
      fontSize: 20,
      fontFamily: '\'Bungee\', cursive',
      fontWeight: 400,
      transition: 'all 0.2s ease',
    },
    '@media screen and (max-width: 767px)': {
      gap: '0',
      '& img': {
        maxWidth: '37px',
      },
      '& span': {
        fontSize: 14,
        marginLeft: '0.75rem',
      },
    }
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2.5rem',
  },
}));

export default useStyles;