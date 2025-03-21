import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import { connectToDB } from "@/lib/db";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile }) {
      if (!profile) return false;

      const { name, email, picture } = profile;

      try {
        await connectToDB();
        const userExists = await User.findOne({ email });

        if (!userExists) {
          const newUser = new User({
            name,
            email,
            image: picture,
          });
          await newUser.save();
        }
        return true; // Continue sign-in
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // Cancel sign-in on error
      }
    },
    async session({ session, user }) {
      if (session?.user && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
