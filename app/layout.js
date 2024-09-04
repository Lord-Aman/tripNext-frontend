import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import "./globals.css";
import { Sora } from "next/font/google";
import Login from "@/components/Login/Login";
import ClientWrapper from "@/components/ClientWrapper/ClientWrapper";

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
            <ClientWrapper>{children}</ClientWrapper>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
