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
    color: '#F9F9F9',
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
    background: '#151515',
    borderRadius: 10,
    border: '1px solid rgba(87, 87, 87, 0.5)',
    fontSize: 16,
    width: '100%',
    maxWidth: 280,
    overflow: 'hidden',
    '&.error': {
      background: '#1D1D45',
      border: '1px solid #A819FA',
    },
    '&.success': {
      background: '#1D1D45',
    },
  },
  header: {
    padding: '0 1.25rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(87, 87, 87, 0.3)',

    '&.hasID': {
      '& span': {
        background: 'rgba(140, 36, 191, 0.8)',
        display: 'inline-block',
        cursor: 'default',
        margin: '0 0 0 0.5rem',
        padding: '2px 10px',
        fontSize: 12,
        borderRadius: 5,
        '&:hover': {
          opacity: 1
        },
      }
    },

    '& .title': {
      fontSize: 14,
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
    padding: '1rem',
    '&:hover': {
      opacity: 0.6
    }
  }
},
));

export default useStyles;