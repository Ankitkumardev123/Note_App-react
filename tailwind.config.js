/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      content:[
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
      ],
      colors:{
        ring:"hsl(var(--ring))",
        border:"hsl(var(--border))",
        background:"hsl((var(--bacground))",
      },
      backgroundSize:{
        '200%':'200% 200%',
      },
      keyframes:{
        gradientMove:{
          '0%, 100%':{
            backgroundPosition:'0% 50%'
          },
          '50%':{backgroundPosition:'100% 50%'},
        },
      },
      animation:{
        gradient:'gradientMove 4s ease infinite'
      },
      fontFamily:{
        pacifico:["PacificoCustom"],
        caveat:["CaveatCustom"],
        dancing:["DancingCustom"],
        great:["GreatvibeCustom"],
        outfit:["outfitCustom"],
        poppins:["poppinsCustom"]
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}