import { Inter } from "next/font/google";
import Header, {header}from "@/components/header";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";


const inter = Inter({subsets:["latin"]});
export const metadata = {
  title: "Create Next App",
  description: "content creation powered by AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
          
          <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
      }}
    >
            <ConvexClientProvider>
            {/*Header*/}
            <Header />
            
            <main className="bg-slate-900  text-white overflow-x-hidden min-h-screen">
            {/*Nav*/}


            {children}
            </main>
            {/*Footer*/}
            </ConvexClientProvider>
            </ClerkProvider> 
            
          </ThemeProvider>
      </body>
    </html>
  );
}
