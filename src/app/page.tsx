'use client';

import { useState, useEffect } from 'react';
import Hero from "@/components/Hero";
import UnderstandingPCOS from "@/components/UnderstandingPCOS";
import HealthImplications from "@/components/HealthImplications";
import LifestyleManagement from "@/components/LifestyleManagement";
import LivingWithPCOS from "@/components/LivingWithPCOS";
import References from "@/components/References";
import Reveal from "@/components/Reveal";

export default function Home() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userType, setUserType] = useState<'admin' | 'user' | ''>('');

	useEffect(() => {
		// Check if user is already logged in (from localStorage)
		const loggedIn = localStorage.getItem('isAuthenticated');
		const savedEmail = localStorage.getItem('userEmail');
		const savedUserType = localStorage.getItem('userType') as 'admin' | 'user' | '';
		if (loggedIn === 'true') {
			setIsAuthenticated(true);
			setShowLoginModal(false);
			if (savedEmail) setUserEmail(savedEmail);
			if (savedUserType) setUserType(savedUserType);
		}
	}, []);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json() as {
				success: boolean;
				user?: {
					id: number;
					email: string;
					username: string;
					userType: 'admin' | 'user';
				};
				error?: string;
			};

			if (response.ok && data.success) {
				setIsAuthenticated(true);
				setUserEmail(data.user!.email);
				setUserType(data.user!.userType);
				setShowLoginModal(false);
				localStorage.setItem('isAuthenticated', 'true');
				localStorage.setItem('userEmail', data.user!.email);
				localStorage.setItem('userType', data.user!.userType);
				setEmail('');
				setPassword('');
			} else {
				setError(data.error || 'Invalid email or password');
			}
		} catch (error) {
			console.error('Login error:', error);
			setError('Login failed. Please try again.');
		}
	};

	const handleLogout = () => {
		setIsAuthenticated(false);
		setShowLoginModal(true);
		setUserEmail('');
		setUserType('');
		localStorage.removeItem('isAuthenticated');
		localStorage.removeItem('userEmail');
		localStorage.removeItem('userType');
	};

	const isAdminUser = userType === 'admin';

	return (
		<div className="min-h-screen relative">
			{/* Dashboard and Logout Buttons */}
			{isAuthenticated && (
				<div className="fixed top-6 right-6 z-50 flex items-center space-x-4">
					{/* Show Dashboard button only for admin users */}
					{isAdminUser && (
						<button
							onClick={() => window.location.href = '/admin'}
							className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-xl font-medium"
						>
							Admin Dashboard
						</button>
					)}
					<button
						onClick={handleLogout}
						className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300 hover:shadow-xl font-medium"
					>
						Logout
					</button>
				</div>
			)}

			{/* Login Modal */}
			{showLoginModal && !isAuthenticated && (
				<div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fadeIn">
						{/* Modal Header */}
						<div className="p-6 border-b border-gray-200">
							<h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent text-center">
								Welcome to SheManagedPCOS
							</h2>
							<p className="text-gray-600 text-center mt-2">Please login to continue</p>
						</div>

						{/* Modal Body */}
						<form onSubmit={handleLogin} className="p-6 space-y-6">
							{error && (
								<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
									{error}
								</div>
							)}

							<div>
								<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
									Email Address
								</label>
								<input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="your.email@example.com"
									required
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
								/>
							</div>

							<div>
								<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
									Password
								</label>
								<input
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Enter your password"
									required
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
								/>
							</div>

<div className="flex items-center">
							<label className="flex items-center">
								<input
									type="checkbox"
									className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
								/>
								<span className="ml-2 text-sm text-gray-600">Remember me</span>
							</label>
							</div>

							<button
								type="submit"
								className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
							>
								Sign In
							</button>

							<p className="text-center text-sm text-gray-600">
								Don't have an account?{' '}
								<a href="#" className="text-pink-600 hover:text-pink-700 font-medium">
									Sign up
								</a>
							</p>
						</form>
					</div>
				</div>
			)}

			{/* Main Content - Blurred when not authenticated */}
			<div className={`transition-all duration-500 ${!isAuthenticated ? 'filter blur-lg pointer-events-none select-none' : ''}`}>
				<Reveal>
					<Hero />
				</Reveal>

				<Reveal>
					<UnderstandingPCOS />
				</Reveal>

				<Reveal>
					<HealthImplications />
				</Reveal>

				<Reveal>
					<LifestyleManagement />
				</Reveal>

				<Reveal>
					<LivingWithPCOS />
				</Reveal>

				<Reveal>
					<References />
				</Reveal>
			</div>
		</div>
	);
}
