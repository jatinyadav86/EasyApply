import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/UserModel";

export const authOption = {
  providers: [
    CredentialsProvider({
      id: 'phoneCredential',
      name: 'phoneCredential',
      credentials: {
        phone: { label: 'phone', type: 'text' },
        verifyCode: { label: 'verifyCode', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials.phone || !credentials.verifyCode) {
          throw new Error('Invalid credetials')
        }

        await dbConnect();

        try {
          const user = await UserModel.findOne({ phone: credentials.phone });
          if (!user || !user.verifyCode) {
            throw new Error('Invalid credetials');
          }
          if (!user.isVerified) {
            throw new Error('Please verify your account before loging in');
          }

          const currDate = new Date();
          currDate.setMinutes(currDate.getMinutes() + 330);

          if (user.verifyCode === credentials.verifyCode && user.verifyCodeExpiry > currDate) {
            return { id: user._id, phone: user.phone };
          } else if (user.verifyCodeExpiry < currDate) {
            throw new Error('Verification code expired');
          } else {
            throw new Error('Invalid credetials');
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.phone = token.phone;
      return session;
    }
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOption)

export { handler as GET, handler as POST }