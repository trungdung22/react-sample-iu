import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& .MuiPagination-ul': {
      justifyContent: 'center',
      '& .MuiPaginationItem-root': {
        borderRadius: '5px',
        '@media screen and (max-width: 767px)' : {
          height: '24px',
          minWidth: '24px',
          borderRadius: '3px',
          '& button.Mui-selected': {
            borderRadius: '3px',
          }
        }
      },
      '& button': {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.5)',
        fontFamily: '"Lexend", sans-serif',
        fontWeight: '600',
        '&:hover': {
          color: '#B2FAFF',
        },
        '&.Mui-selected': {
          color: ' #0B7880',
          background: '#17F0FF',
          borderRadius: '5px',
        }
      },
      '& .MuiPaginationItem-ellipsis': {
        color: 'rgba(255, 255, 255, 0.5)',
      }
    }
  },
}));

export default useStyles;