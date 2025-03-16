import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['VT323', 'monospace'],
				serif: ['Playfair Display', 'serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				sanatorio: {
					mint: '#E5FFF0',
					neon: '#32FF9A',
					green: '#46D97F',
					greenLight: '#7EFCB4',
					darkGreen: '#102518',
					darkGray: '#221F26',
					gray: '#403E43',
					lightGray: '#C8C8C9',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'pulse-gentle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'breathe': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				'wave': {
					'0%': { transform: 'translateX(0) translateZ(0) scaleY(1)' },
					'50%': { transform: 'translateX(-25%) translateZ(0) scaleY(0.9)' },
					'100%': { transform: 'translateX(-50%) translateZ(0) scaleY(1)' }
				},
				'glitch': {
					'0%, 100%': { transform: 'translateX(0)' },
					'5%, 30%': { transform: 'translateX(-2px)' },
					'10%, 70%': { transform: 'translateX(2px)' },
				},
				'scan': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100%)' }
				},
				'digital-pulse': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 1s ease-out forwards',
				'fade-up': 'fade-up 0.8s ease-out forwards',
				'pulse-gentle': 'pulse-gentle 4s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'breathe': 'breathe.8s ease-in-out infinite',
				'wave': 'wave 15s linear infinite',
				'glitch': 'glitch 0.5s ease-in-out infinite',
				'scan': 'scan 2s linear infinite',
				'digital-pulse': 'digital-pulse 2s ease-in-out infinite'
			},
			backgroundImage: {
				'digital-gradient': 'linear-gradient(180deg, rgba(16,37,24,0.9) 0%, rgba(70,217,127,0.2) 100%)',
				'lofi-noise': 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFEmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpybXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA2LTIyVDIzOjQ3OjA3LTA0OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wNi0yMlQyMzo0NzozMi0wNDowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0wNi0yMlQyMzo0NzozMi0wNDowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDplYWM5YjM1Zi0xZjZkLTVlNDItOWZlMS1iZDE1MWQwM2E1M2IiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ZWFjOWIzNWYtMWY2ZC01ZTQyLTlmZTEtYmQxNTFkMDNhNTNiIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZWFjOWIzNWYtMWY2ZC01ZTQyLTlmZTEtYmQxNTFkMDNhNTNiIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplYWM5YjM1Zi0xZjZkLTVlNDItOWZlMS1iZDE1MWQwM2E1M2IiIHN0RXZ0OndoZW49IjIwMjAtMDYtMjJUMjM6NDc6MDctMDQ6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7s0XtrAAABvElEQVRoge2aoY7CQBCGvzuBQINAwJE8AQ6Nw+MQeA4wOASJ1wDLG5yEoEl4AAKhEhCIpQJyyDZk6V1nt2Fmd6plp9n++/ebnXaLeS+XWVl2AS4pIlZERKyIiFgREbEiImJFRMSKiIgVEbE+PUAWiqYPMHYAqpZ1pQR2Jm2qBnYa+6SkpK2BQ26+2vYlsI7axrCBcBFTYBTzmhHw8K9PChQG+qS8Fbk8z3nJX5Oq+qQm1t8gj+eTwcAgVOSUFOi9NXVFZ0cSzIARKYNnlEjjX1tNH6hG5KiuaFZEEiw9x/QxJFWFhwF9UvJ49DP0vOZ94w0tUIqB3SnJ23Q/QL/MRYq0HdvbgPFyRU4B/brYiDS+5DgH9MuuLyMitS95CkRURZ5Pk5C82qeR69gLBboF1QL0w8iVXTQiVXbREYlYRdmVfvlBFNlFQ0RqiWXKDkKXXbo7sktfzh6KZZeuSO8uO4i/7NT7MdKzyw5mtzZbSbtg8nYWTYRO+T3Q2jFwxF9H+ZYdwEJjn5SUtAXcbk22/Oo16pnNgDUPpvFtlYUPzxObyJYeWRERsSIiYkVExIqIiBUREcv8AIUnVT/QA+F7AAAAAElFTkSuQmCC")',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
