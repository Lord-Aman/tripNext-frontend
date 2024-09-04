import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import "./globals.css";
import { Sora } from "next/font/google";
import Login from "@/components/Login/Login";
import ClientWrapper from "@/components/ClientWrapper/ClientWrapper";
import { TripProvider } from "@/context/TripContext";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={sora.className}>
          <SignedOut>
            <Login />
          </SignedOut>
          <SignedIn>
            <TripProvider>
              <ClientWrapper>{children}</ClientWrapper>
            </TripProvider>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
