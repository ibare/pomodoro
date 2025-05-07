import { PomodoroSettingsProvider } from './components/PomodoroSetting'
import Pomodoro from './Pomodoro'
import './App.css'

function App() {
  return (
    <PomodoroSettingsProvider>
      <Pomodoro />
    </PomodoroSettingsProvider>
  )
}

export default App
