/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Background-Colors
        'aqua-mint': '#21D4B4',
        'mint-whisper': '#F4FDFA',
        'pure-canvas': '#FFFFFF',
        'silver-mist': '#C0C0C0',

        // Text-Colors
        'midnight-carbon': '#1C1B1B',
        'lavender-haze': '#F4F5FD',
        'slate-fog': '#6F7384',
        'crimson-alert': '#EE4D4D',
        'ocean-blue': '#1F8BDA',
      },
      fontFamily: {
        'inter-regular': ['Inter-Regular'],
        'inter-medium': ['Inter-Medium'],
        'inter-semibold': ['Inter-SemiBold'],
        'inter-bold': ['Inter-Bold'],
      },
    },
  },
  plugins: [],
};