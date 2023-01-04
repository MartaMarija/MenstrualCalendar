import { AuthContextProvider } from "./src/contexts/Auth"
import Navigator from "./src/pages/Navigator"

export default function App() {
    return (
        <AuthContextProvider>
            <Navigator/>
        </AuthContextProvider>
    )
}
