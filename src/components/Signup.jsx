function Signup({ onLogin }) {
  return (
    <div className="min-h-screen bg-[#071224] flex items-center justify-center px-5 py-8">
      <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">

    
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Join Opportunity Hub and discover new opportunities
          </p>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

    
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

    
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        
        <button className="w-full rounded-xl bg-blue-500 py-3.5 text-base font-semibold text-white transition hover:bg-blue-600">
          Sign up
        </button>


        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <button 
            onClick={onLogin}
 
          className="font-semibold text-blue-600">
            Log in
          </button>
        </p>

      </div>
    </div>
  );
}

export default Signup;