import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from '../components/Header';
const baseURL = "http://localhost:5000";

async function fetchJobs() {
  const authToken = cookies().get("authToken")?.value || "";

  if (!authToken) {
    return { error: "No auth token found.", jobs: [] };
  }

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authToken}`,
  };

  try {
    const res = await fetch(`${baseURL}/api/jobs`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const data = await res.json();
    return { jobs: data?.data?.rows || [], error: null };
  } catch (error) {
    return { jobs: [], error: error.message };
  }
}

export default async function Dashboard() {

  // Get the auth token from cookies
  const authToken = cookies().get("authToken")?.value;
  const { jobs, error } = await fetchJobs();

  // If there's no auth token, redirect to login
  if (!authToken) {
    redirect("/auth/login");
  }

  return (
    <>
      <div>
        <Header />


        <main className="container mx-auto p-4">
          <h1 className=" text-3xl my-5">Available JOBS</h1>
          <div className="grid md:grid-cols-3 gap-6">

            {error ? <p>{error}</p> : null}

            {jobs.length > 0 ? (
              jobs.map((item, index) =>

                <div key={index} className="bg-white shadow-2xl p-6 rounded-lg">

                  <h3 className="text-black text-lg font-semibold">{item?.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm">Description</p>
                  <p className="text-gray-600">{item?.description}</p>

                  <p className="text-gray-600 mt-2 text-sm">Skills Required</p>
                  <p className="text-gray-600">{item?.skills_required}</p>
                </div>
              )
            ) : (
              <p>No jobs available.</p>
            )}

          </div>
        </main>

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
