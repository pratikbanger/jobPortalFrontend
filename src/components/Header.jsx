"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { removeAuthToken } from "../Service";

export default function Header() {
    const [role, setRole] = useState(null);
    const router = useRouter()

    useEffect(() => {
        // Simulate getting role from localStorage
        const storedRole = localStorage.getItem("role"); // Default to job_seeker
        setRole(storedRole);
    }, []);

    const handleLogOut = () => {
        removeAuthToken()
        router.push('/auth/login')
    }

    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Job Portal</h1>
                <nav>
                    <ul className="flex space-x-4">
                        {role === "recruiter" ? (
                            <>
                                <li><a href="#" className="hover:underline">Post Jobs</a></li>
                                <li><a href="#" className="hover:underline">View Applications</a></li>
                                <li><a href="#" className="hover:underline">AI-Ranked Candidates</a></li>
                            </>
                        ) : (
                            <>
                                <li><a href="#" className="hover:underline">View Jobs</a></li>
                                <li><a href="#" className="hover:underline">Apply</a></li>
                                <li><a href="#" className="hover:underline">AI-Matched Recommendations</a></li>
                            </>
                        )}
                        <li className="hover:underline cursor-pointer" onClick={handleLogOut}>Logout</li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
