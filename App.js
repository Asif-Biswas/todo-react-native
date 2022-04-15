
import Body from './components/Body';
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <Body/>
    </NativeBaseProvider>
  );
}
