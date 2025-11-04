import app from './app.js'

const PORT = process.env.PORT || 8000

const startServer = async() => {
    try {
        app.listen(PORT, () => console.log(`Test 123 http://localhost:${PORT}`))
    } catch (error) {
        console.log('Failed to start server: ', error.message)
        process.exit(1)
    }
}

startServer()