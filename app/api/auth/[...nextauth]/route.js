import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import User from "@/models/user";
import { connectToDB } from "@/lib/db";

const AuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { name, email, image } = user;
        try {
          await connectToDB();
          const userExists = await User.findOne({ email });

          if (!userExists) {
            const newUser = new User({ name, email, image });
            await newUser.save();
          }
          return true; // Continue with the sign-in process
        } catch (error) {
          console.error("Error during sign-in:", error);
          return false; // Cancel the sign-in process if there's an error
        }
      }
      return true;
    },
  },
};

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
