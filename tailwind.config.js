module.exports = {
  purge: {
    content: [
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
    ],
    safelist: [/ml-/, /bg-/, /^p-/, /border-/,]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            code: {
              backgroundColor: "#eef1f5",
              color: "#DD1144",
              fontWeight: "400",
              "border-radius": "0.25rem"
            },
            "code::before": {
              content: '""',
              "padding-left": "0.25rem"
            },
            "code::after": {
              content: '""',
              "padding-right": "0.25rem"
            }
          }
        }
      },
      minWidth: {
        '0': '0',
        '1/5': "20%",
        '1/4': '25%',
        '2/5': "40%",
        '1/2': '50%',
        '3/5': '60%',
        '3/4': '75%',
        '4/5': '80%',
        'full': '100%',
      },
      maxWidth: {
        '0': '0',
        '1/5': "20%",
        '1/4': '25%',
        '2/5': "40%",
        '1/2': '50%',
        '3/5': '60%',
        '3/4': '75%',
        '4/5': '80%',
        'full': '100%',
      },
      maxHeight: {
        '0': '0',
        '1/5': "20%",
        '1/4': '25%',
        '2/5': "40%",
        '1/2': '50%',
        '3/5': '60%',
        '3/4': '75%',
        '4/5': '80%',
        'full': '100%',
        'screen': "100vh"
      },
      margin: {
        '1/4': '25%',
        '1/3': '33%',
        '1/2': '50%',
        '3/5': '60%',
        '3/4': '75%',
        '2/3': '66%',
        'full': '100%'
      },
    }
  },
  extend: {
  },
  variants: {
    backgroundColor: ({ after }) => after(['disabled']),
    extend: {
      textColor: ["disabled"],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
}
