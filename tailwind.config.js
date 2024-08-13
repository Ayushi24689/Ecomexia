/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/*.html",
    "./src/**/*.html",
     'node_modules/preline/dist/*.js',
  ],
  theme: {
     screens: {
                    'sm': '425px',
                    // => @media (min-width: 640px) { ... }

                    'md': '768px',
                    // => @media (min-width: 768px) { ... }

                    'lg': '1024px',
                    // => @media (min-width: 1024px) { ... }

                    'xl': '375px',
                     // => @media (min-width: 375px) { ... }

                     's': '320px',
                     // => @media (min-width: 320px) { ... }

                    '2xl': '1440px',
                    // => @media (min-width: 1536px) { ... }
                },
                 fontFamily: {
                    poppins: ['"Poppins", sans-serif'],
                     JosefinSans: ['"Josefin Sans", sans-serif']
                },
                extend: {
                  // Custom scrollbar style
      scrollbar: {
        hide: {
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      },
                    colors: {
                        clifford: 'rgba(255, 255, 255, 0.5)',
                        CustomBg: 'rgba(0, 0, 0, 0.5)',
                        pink:'#f5f5f5',
                        color:'rgb(120, 120, 120)',
                        colors:'#f4f4f4',
                    }
                },
    extend: {},
  },
  plugins: [
     // require('@tailwindcss/forms'),      
    //  require('preline/plugin'),
    ],
}