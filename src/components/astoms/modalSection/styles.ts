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
    color: '#F4E0FF',
  },
  backgroundModal: {
    background: 'rgba(142, 142, 142, 0.5)',
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
    background: '#303030',
    borderRadius: 20,
    border: '1px solid #17F0FF',
    fontSize: 16,
    width: '100%',
    maxWidth: 345,
    overflow: 'hidden',
    '&.error': {
      border: '1px solid #A819FA',
    }
  },
  header: {
    borderBottom: '1px solid #616161',
    padding: '1.5rem 1.25rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '&.hasID': {
      borderBottom: 0,
      padding: '1.25rem 1.5rem',
      '& span': {
        background: 'rgba(140, 36, 191, 0.5)',
        display: 'inline-block',
        cursor: 'default',
        margin: '0 0 0 0.5rem',
        padding: '0.5rem 1.25rem',
        fontSize: 16,
        borderRadius: 10,
        '&:hover': {
          opacity: 1
        },
      }
    },

    '& .title': {
      fontSize: 20,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      '& span': {
        display: 'inline-block',
        marginRight: '0.75rem',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        '&:hover': {
          opacity: 0.6
        }
      }
    },
    '& .close': {
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      maxWidth: 18,
      '&:hover': {
        opacity: 0.8,
      }
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