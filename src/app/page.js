// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from '../components/Header';
// import Jobs from '../components/Jobs';

export default function Dashboard() {

  // Get the auth token from cookies
  const authToken = cookies().get("authToken")?.value;

  // If there's no auth token, redirect to login
  if (!authToken) {
    redirect("/auth/login");
  }

  // const [role, setRole] = useState(null);

  // const router = useRouter()
  // let authToken = null


  // useEffect(() => {

  //   authToken = localStorage.getItem('token')
  //   if (!authToken) router.push('/auth/login')

  //   if (typeof window !== 'undefined') {
  //     const storedRole = localStorage.getItem('role');
  //     setRole(storedRole);
  //   }

  // }, []);

  return (
    <>
      <div>
        <Header />

        {/* <main className="container mx-auto p-4">
          <h2 className="text-2xl font-semibold text-center my-4">Dashboard</h2>


          {role === "Recruiter" ? (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white shadow-2xl p-6 rounded-lg">
                <h3 className="text-black text-lg font-semibold">Post Jobs</h3>
                <p className="text-gray-600">Create and manage job postings.</p>
              </div>
              <div className="bg-white shadow-2xl p-6 rounded-lg">
                <h3 className="text-black text-lg font-semibold">View Applications</h3>
                <p className="text-gray-600">Review and manage job applications.</p>
              </div>
              <div className="bg-white shadow-2xl p-6 rounded-lg">
                <h3 className="text-black text-lg font-semibold">AI-Ranked Candidates</h3>
                <p className="text-gray-600">Find the best candidates ranked by AI.</p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white shadow-2xl p-6 rounded-lg">
                <h3 className="text-black text-lg font-semibold">View Jobs</h3>
                <p className="text-gray-600">Browse available job listings.</p>
              </div>
              <div className="bg-white shadow-2xl p-6 rounded-lg">
                <h3 className="text-black text-lg font-semibold">Apply</h3>
                <p className="text-gray-600">Submit applications to jobs.</p>
              </div>
              <div className="bg-white shadow-2xl p-6 rounded-lg">
                <h3 className="text-black text-lg font-semibold">AI-Matched Recommendations</h3>
                <p className="text-gray-600">Find jobs recommended for you.</p>
              </div>
            </div>
          )}
        </main> */}

      </div>
    </>
  );
}
