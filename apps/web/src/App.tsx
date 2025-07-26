import {Routes, Route} from 'react-router-dom'
import {UserListPage} from './pages/users/List'
import {UserDetailPage} from './pages/users/Detail'

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
                <Route path="/" element={<UserListPage/>}/>
                <Route path="/user/:id" element={<UserDetailPage/>}/>
            </Routes>
        </div>
    )
}

export default App
