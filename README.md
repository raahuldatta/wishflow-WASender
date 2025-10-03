# Wishflow WA Sender

A modern web application for sending WhatsApp messages with ease. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Send WhatsApp messages through a clean, intuitive interface
- Modern UI built with Shadcn UI components
- Responsive design that works on all devices
- Easy deployment with Vercel

## Prerequisites

- Node.js 18.0.0 or later
- npm or pnpm
- A modern web browser

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/raahuldatta/wishflow-WASender.git
   cd wishflow-WASender
   ```

2. **Install dependencies**
   ```bash
   # Using pnpm (recommended)
   pnpm install
   
   # Or using npm
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   NEXT_PUBLIC_APP_NAME=Wishflow WA Sender
   # Add other environment variables here
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser to see the application.

## Project Structure

```
wishflow-wasender/
├── app/                    # App router
│   ├── api/                # API routes
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # Reusable components
│   ├── ui/                 # Shadcn UI components
│   └── wishflow.tsx        # Main component
├── public/                 # Static files
│   └── placeholder-*.{png,svg,jpg}  # Placeholder images
├── styles/                 # Global CSS files
├── lib/                    # Utility functions
└── hooks/                  # Custom React hooks
```

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## Deployment

### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com) from the creators of Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fraahuldatta%2Fwishflow-WASender)

### Other Platforms

You can also deploy to other platforms like:
- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Heroku](https://www.heroku.com/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Vercel](https://vercel.com/)

---

Made with ❤️ by [Raahul Datta](https://github.com/raahuldatta)
