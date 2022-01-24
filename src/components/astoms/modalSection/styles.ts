import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 100,
    fontSize: 18,
  },
  backgroundModal: {
    background: 'rgba(0, 0, 0, 0.5)',
    height: '100vh',
    position: 'absolute',
    width: '100%',
    zIndex: 100,
  },
  content: {
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '95%',
    zIndex: 1000,
    borderRadius: 10,
    fontSize: 16,
    width: '100%',
    maxWidth: 335,
    overflow: 'hidden',
    '@media screen and (max-width: 767px)': {
      maxWidth: 280,
    },
    
  },
  header: {
    padding: '0 1.25rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '&.hasID': {
      '& span': {
        background: '#FF00FF',
        display: 'inline-block',
        cursor: 'default',
        margin: '0 0 0 0.5rem',
        padding: '2px 10px',
        fontSize: 14,
        borderRadius: 5,
        '@media screen and (max-width: 767px)': {
          fontSize: 12,
        },
        '&:hover': {
          opacity: 1
        },
      }
    },

    '& .title': {
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // '& span': {
      //   display: 'inline-block',
      //   marginRight: '0.75rem',
      //   transition: 'all 0.2s ease',
      //   cursor: 'pointer',
      //   '&:hover': {
      //     opacity: 0.6
      //   }
      // }
    },
    '& .close': {
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
    },
  },
  closeSubmit: {
    right: 0,
    position: 'absolute',
    top: 0,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    lineHeight: '0',
    '&:hover': {
      opacity: 0.6
    }
  }
},
));

export default useStyles;