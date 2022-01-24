import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { NONAME } from 'dns';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
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
      '& a': {
        display: 'flex',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        fontWeight: '500',
        borderRadius: 2,
        padding: '0 4px',
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: 0,
          left: 0,
          height: 2,
          background: '#00FFFF',
          bottom: -8,
          transition: 'all 0.2s ease',
        },
        '&.active': {
          '&::before': {
            width: '100%',
          },
        },
      },
      '@media screen and (max-width: 767px)': {
        display: 'none',
      }
    },
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
    '& img': {
      maxWidth: 30,
      transition: 'all 0.2s ease',
    },
    '& span': {
      display: 'inline-block',
      fontSize: 15,
      fontFamily: '\'Bungee\', cursive',
      fontWeight: 400,
      transition: 'all 0.2s ease',
    },
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default useStyles;