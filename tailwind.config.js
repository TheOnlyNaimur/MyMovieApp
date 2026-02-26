module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        gold: "#eab308",
        "neutral-900": "#171717",
        "neutral-700": "#262626",
        "neutral-600": "#404040",
      },
    },
  },
  plugins: [],
};
