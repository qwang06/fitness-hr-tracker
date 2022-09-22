import {
	Box,
	Link,
	Flex,
	Spacer,
	Center,
	HStack,
	Image
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useSession } from 'next-auth/react';
import LoginButton from './auth/LoginButton';

export default function Nav() {
	const { data } = useSession();
	return (
		<Box bg='#474973' w='100%' p={4} color='white'>
			<Flex>
				<Center>
					<HStack spacing='24px'>
						{data?.user ? 
							<NextLink href='/' passHref>
								<Link>
									<Image
										borderRadius='full'
										boxSize='50px'
										src={data?.user?.image}
										alt={data?.user?.name}
									/>
								</Link>
							</NextLink> : ''
						}
						<NextLink href='/' passHref>
							<Link>My Fitness</Link>
						</NextLink>
						<NextLink href='/find-exercises' passHref>
							<Link>Find Exercises</Link>
						</NextLink>
					</HStack>
				</Center>
				<Spacer />
				<Center>
					<LoginButton />
				</Center>
			</Flex>
		</Box>
	);
}