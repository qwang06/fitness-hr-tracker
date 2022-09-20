import {
	ChakraProvider,
	Box,
	Link,
	HStack
} from '@chakra-ui/react';
import NextLink from "next/link"

function App({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<Box bg='#474973' w='100%' p={4} color='white'>
				<HStack spacing='24px'>
					<NextLink href='/' passHref>
						<Link>My Fitness</Link>
					</NextLink>
					<NextLink href='/find-exercises' passHref>
						<Link>Find Exercises</Link>
					</NextLink>
				</HStack>
			</Box>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default App