import { HStack } from '@chakra-ui/react';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Component() {
	const { data: session } = useSession();
	if (session) {
		return (
			<HStack spacing='24px'>
				<span>Signed in as {session.user.email}</span>
				<button onClick={() => signOut()}>Sign out</button>
			</HStack>
		)
	}
	return (
		<HStack spacing='24px'>
			<span>Not signed in</span>
			<button onClick={() => signIn()}>Sign in</button>
		</HStack>
	)
}