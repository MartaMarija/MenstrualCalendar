import { AuthContextProvider } from './src/auth/Auth';
import Navigator from './src/pages/Navigator';

export default function App() 
{
	return (
		<AuthContextProvider>
			<Navigator/>
		</AuthContextProvider>
	);
}
