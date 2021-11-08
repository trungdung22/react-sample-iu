module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/*.tsx',
      './src/**/*.tsx',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        bungee: ['"Bungee", cursive']
      },
      colors: {
        blue: {
          '0': '#17F0FF',
          '50': '#0B7880',
          '100': 'rgba(16, 184, 221, 0.3)',
          '150': '#070514',
          '200': '#B2FAFF',
          '250': '#071526',
        },
        pink: {
          '0': '#D47DFF',
          '50': '#F4E0FF',
          '100': 'rgba(244,244, 255, 0.5)',
          '150': '#A819FA',
        },
        purple: {
          '0': '#250A45',
          '50': '#070514',
          '100': 'rgba(168, 25, 250, 0.3)',
          '150': '#1D1D45',
        },
        gray: {
          '0': '#303030',
          '50': '#929292',
          '100': '#3D3D3D',
          '150': 'rgba(61, 61, 61, 0.5)',
          '200': 'rgba(26, 26, 26, 0.5)',
          '250': '#424344',
          '300': 'rgba(30, 33, 37, 0.5)',
          '350': '#20252B',
          '400': 'rgba(142, 142, 142, 0.5)',
          '450': '#1A1A1A',
          '500': '#878787',
          '550': '#616161',
          '600': '#3C3C3C',
          '650': '#646464',
          '700': '#323232',
          '750': '#999999',
        }
      },
      padding: {
        '3/100': '3%',
        '13': '3.25rem',
        '57': '57px',
      },
      margin: {
        '54': '54px',
        '57': '57px',
      },
      fontSize: {
        '10': '10px',
        '12': '12px',
        '14': '14px',
        '16': '16px',
        '18': '18px',
        '20': '20px',
        '22': '22px',
        '26': '26px',
        '27': '27px',
        '28': '28px',
        '30': '30px',
        '32': '32px',
        '34': '34px',
        '35': '35px',
        '42': '42px',
        '44': '44px',
        '46': '46px',
        '48': '48px',
        '52': '52px',
      },
      maxWidth: {
        '20': '20px',
        '26': '26px',
        '110': '110px',
        '178': '178px',
        '200': '200px',
        '320': '320px',
        '345': '345px',
        '460': '460px',
        '500': '500px',
        '720': '720px',
        '900': '900px',
        '1110': '1110px'
      },
      width: {
        '100': '100px',
        '140': '140px',
      },
      height: {
        '100vh': '100vh',
      },
      borderRadius: {
        '5': '5px',
        '8': '8px',
        '10': '10px',
        '15': '15px',
        '20': '20px',
      },
      screens: {
        'tablet992': '992px',
      },
      zIndex: {
        '100': '100',
        '1000': '1000',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
