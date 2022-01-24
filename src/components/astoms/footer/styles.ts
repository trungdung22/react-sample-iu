import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  footerSticky: {
    display: 'none',
    '@media screen and (max-width: 767px)': {
      position: 'fixed',
      bottom: 0,
      width: '100%',
      left: 0,
      justifyContent: 'space-evenly',
      padding: '0.55rem 0',
      zIndex: 99,
      display: 'flex',
      fontSize: 9,
      '& a': {
        fontWeight: 500,
        display: 'block',
        padding: '4px 14px',
        borderRadius: 3,
        '&.active': {
          fontWeight: 700,
          '& path': {
            fill: '#00FFFF',
            '&.special': {
              stroke: '#00FFFF',
            }
          }
        },
      },
      '& span': {
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