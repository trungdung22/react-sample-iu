import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    maxWidth: 700,
    margin: '0 auto',
    background: '#303030',
    borderRadius: 20,
    border: '1px solid #17F0FF',

    '@media screen and (max-width: 767px)': {
      maxWidth: '100%',
      borderRadius: 10,
    }
  },
  header: {
    padding: '1.5rem 2rem',
    '& .top': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      '& .title': {
        fontSize: 20,
        fontWeight: 700,
        color: '#F4E0FF',
      },
      '& ul': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1.5rem',
        '& li': {
          cursor: 'pointer',
          '& svg': {
            maxWidth: 20,
          },
          '&:hover path': {
            fill: '#fff',
          },
          '&:hover line': {
            stroke: '#fff',
          }
        }
      },
      '@media screen and (max-width: 767px)': {
        marginBottom: '0.75rem',
        '& .title': {
          fontSize: 20,
        },
        '& ul': {
          gap: '0',
          '& li': {
            padding: '0 0.6rem',
            '& svg': {
              maxWidth: 18
            },
          }
        },
      },
    },
    '@media screen and (max-width: 767px)': {
      padding: '1rem',
    },
  },
  infoRound: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 20,
    color: '#F4E0FF',
    background: 'rgba(255, 255, 255, 0.25)',
    paddingRight: '1rem',
    borderRadius: 5,
    overflow: 'hidden',
    '& span': {
      display: 'inline-block',
      fontWeight: 700,
      background: 'rgba(140, 36, 191, 0.5)',
      borderRadius: 5,
      width: 100,
      padding: '0.6rem 0',
      textAlign: 'center',
    },
    '@media screen and (max-width: 767px)': {
      fontSize: 16,
      paddingRight: '0.75rem',
      borderRadius: '10px',
      '& span': {
        width: 72,
        borderRadius: '10px',
        padding: '1rem 0',
      },
    },
  },
  body: {},
  infoPrize: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: '1.5rem 2rem',
    background: 'rgba(28, 25, 25, 0.8)',
    '& .text': {
      fontSize: 20,
      fontWeight: 700,
      color: '#F4E0FF',
      alignSelf: 'center',
      width: '20%',
    },
    '& .total': {
      fontSize: 28,
      fontFamily: '\'Bungee\', cursive',
      color: '#17F0FF',
    },
    '& .unit': {
      fontSize: 22,
      fontFamily: '\'Bungee\', cursive',
      color: '#D47DFF',
      paddingBottom: 4,
    },
    '@media screen and (max-width: 767px)': {
      display: 'block',
      '& .text': {
        fontSize: 20,
        width: '100%',
      },
      '& .total': {
        fontSize: 32,
        margin: '1rem 0 0.5rem'
      },
      '& .unit': {
        fontSize: 24,
        paddingBottom: 0,
      },
    },
  },
  footer: {
    textAlign: 'center',
    padding: '1.5rem 2rem',
    fontWeight: 500,
    fontSize: 20,
    wordBreak: 'break-word',
    '@media screen and (max-width: 1920px)': {
      padding: '1rem',
      lineHeight: '1.7rem',
      fontSize: 16,
    },
    '@media screen and (max-width: 767px)': {
      fontSize: 10,
      padding: '0.5rem',

    },
  },
}));

export default useStyles;