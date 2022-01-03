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
        color: 'rgba(255, 255, 255, 0.5)',
        '&:hover': {
          color: '#B2FAFF',
        },
        '&.Mui-selected': {
          color: ' #0B7880',
          background: '#17F0FF',
          borderRadius: '5px',
          fontWeight: '700',
        }
      },
      '& .MuiPaginationItem-ellipsis': {
        color: 'rgba(255, 255, 255, 0.5)',
      }
    }
  },
}));

export default useStyles;