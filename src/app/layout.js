import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import { ReduxProvider } from "./redux/reduxProviders";
import { Toaster } from "react-hot-toast";
import SessionWrapper from "./providers/SessionWrapper";
import Footer from "./components/Footer";
import Modals from "./providers/Modals";
import { Playfair_Display } from "next/font/google";
import BottomBar from "./components/BottomBar";
import { getCurrentUser } from "./actions/getCurrrentUser";
import WhatsAppButton from "./components/WhatsAppButton";


const playfairDisplay = Playfair_Display({ 
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export default async function RootLayout({ children }) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <SessionWrapper>
        <body className={`${playfairDisplay.variable}`}>
          <ReduxProvider>
            <Toaster />
            <Modals />
            <Navbar currentUser={currentUser} />
            {children}
            <Footer />
            <BottomBar currentUser={currentUser} />
            <WhatsAppButton/>
          </ReduxProvider>
        </body>
      </SessionWrapper>
    </html>
  );
}
