import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/Homepage'

function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold">VW Dataflow - Michel Moraes</h1>
                        </div>
                    </div>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </div>
    )
}

export default App
