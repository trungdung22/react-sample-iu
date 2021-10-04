import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    background: '#070514',
    padding: '4.5rem 0',
    '& h3': {
      color: '#D47DFF',
      fontSize: 48,
      fontWeight: 700,
      marginBottom: '5rem',
      textAlign: 'center',
      textTransform: 'uppercase',
      '@media screen and (max-width: 1236px)': {
        marginBottom: '4rem',
      },
      '@media screen and (max-width: 768px)': {
        fontSize: 24,
        marginBottom: '2rem',
      },
    },
    '@media screen and (max-width: 1640px)': {
      padding: '4.5rem 3%',
    },
    '@media screen and (max-width: 768px)': {
      padding: '3rem 3% 6rem',
    },
  },
  container: {
    maxWidth: 1110,
    margin: '0 auto',
    transition: 'all 0.2s ease',
    '@media screen and (max-width: 768px)': {
      maxWidth: 425,
    }
  },
  listCard: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: '1rem',
    '@media screen and (max-width: 768px)': {
      rowGap: '0',
    },
  },
  item: {
    padding: '1.5rem',
    borderRadius: 10,
    background: '#0E0E0E',
    border: '1px solid #3B6294',
    width: '32.5%',
    boxSizing: 'border-box',
    position: 'relative',
    '& a': {
      display: 'block',
      position: 'absolute',
      right: 0,
      bottom: 0,
      padding: '0.75rem',
      transition: 'all 0.2s ease',
      '&:hover': {
        opacity: 0.8,
      }
    },
    '@media screen and (max-width: 1236px)': {
      width: '49%',
    },
    '@media screen and (max-width: 768px)': {
      width: '100%',
      border: 'none',
      textAlign: 'center',
      background: 'transparent',
      padding: '0 1rem',
      '& + &': {
        marginTop: '2rem'
      },
      '& a': {
        display: 'none',
        padding: 0,
      },

      '&:last-child a': {
        display: 'block',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '-3rem',
        '& svg': {
          height: 20
        }
      },
    },
  },
  title: {
    display: 'block',
    color: '#D47DFF',
    fontSize: 24,
    fontWeight: 700,
    marginBottom: '1rem',
    '@media screen and (max-width: 768px)': {
      fontSize: 20,
      marginBottom: '0.5rem',
    },
  },
  content: {
    display: 'block',
    lineHeight: '1.2rem',
    fontSize: 14,
    color: '#F4E0FF',
    '@media screen and (max-width: 768px)': {
      fontSize: 12,
      lineHeight: '1rem',
    },
  },
}));

export default useStyles;