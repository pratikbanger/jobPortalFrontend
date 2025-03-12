// app/jobs/page.js (Server Component)
import { cookies } from "next/headers";

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

export default async function JobsPage() {
    const { jobs, error } = await fetchJobs();

    return (
        <div>
            <h2>JOBS</h2>
            {error ? <p>{error}</p> : null}
            {jobs.length > 0 ? (
                jobs.map((item, index) => <h4 key={index}>{item?.title}</h4>)
            ) : (
                <p>No jobs available.</p>
            )}
        </div>
    );
}
