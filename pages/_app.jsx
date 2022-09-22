import { ChakraProvider } from '@chakra-ui/react';
import Nav from '../components/Nav';
import { SessionProvider } from "next-auth/react";

function App({ 
	Component,
	pageProps: {
		session,
		...pageProps 
	}
}) {
	return (
		<SessionProvider session={session}>
			<ChakraProvider>
				<Nav />
				<Component {...pageProps} />
			</ChakraProvider>
		</SessionProvider>
	)
}

export default App