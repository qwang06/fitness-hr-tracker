import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import config from '../../../config';

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: config.github.clientId,
			clientSecret: config.github.clientSecret,
		})
	],
};

export default NextAuth(authOptions);