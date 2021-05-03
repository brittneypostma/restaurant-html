module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.html', './src/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    //! anything here overrides tailwinds defaults //
    colors: {
      white: '#ffffff',
      lightGray: '#fefefe',
      black: '#111111',
      red: '#A50022',
      darkRed: '#640A13',
      orange: '#FF7800',
      darkOrange: '#e97711',
      transparent: 'transparent',
    },
    fontFamily: {
      heading: "'Merienda One', sans-serif",
      body: "'Advent Pro', sans-serif",
    },
    extend: {
      //! anything here extends tailwind defaults //
      boxShadow: {
        outline: '0 0 0 3px rgba(0,0,0, 0.5)',
        inset: 'inset 0px 5px 10px rgba(0, 0, 0, 0.25)',
        none: 'none',
      },
      fontSize: {
        '8xl': '8rem',
      },
      gridTemplateColumns: {
        fit: 'repeat(auto-fit, minmax(300px, 1fr))',
      },
    },
  },
  variants: {
    //! add in variants that don't come in by default //
    //! order is important //
    // backgroundColor: ["responsive", "hover", "focus", "active"],
    // borderWidth: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    // scale: ['responsive', 'hover', 'focus', 'active', 'group-hover']
  },
  plugins: [],
}
