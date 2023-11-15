import {nextui} from "@nextui-org/react";
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          success: {
            DEFAULT: "#a6ff00",
            foreground: "#000000",
          },
        }
      },
      dark: {
        colors: {
          success: {
            DEFAULT: "#a6ff00",
            foreground: "#000000",
          }
        }
      },
      "dark-cyan": {
        extend: "dark",
        colors: {
          success: {
            DEFAULT: "#00FFFF",
          }
        }
      },
      "light-cyan": {
        extend: "light",
        colors: {
          success: {
            DEFAULT: "#00FFFF",
          }
        }
      },
      "dark-hot-pink": {
        extend: "dark",
        colors: {
          success: {
            DEFAULT: "#FF69B4",
          }
        }
      },
      "light-hot-pink": {
        extend: "light",
        colors: {
          success: {
            DEFAULT: "#FF69B4",
          }
        }
      },
      "dark-bright-orange": {
        extend: "dark",
        colors: {
          success: {
            DEFAULT: "#FFA500",
          }
        }
      },
      "light-bright-orange": {
        extend: "light",
        colors: {
          success: {
            DEFAULT: "#FFA500",
          }
        }
      },
    }
  })],
}
export default config
