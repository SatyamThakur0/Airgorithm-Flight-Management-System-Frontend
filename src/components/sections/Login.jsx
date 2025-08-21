export default function Login() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white/60 backdrop-blur-xl">
            <div className="p-8 rounded-xl shadow-xl bg-white/80 max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
