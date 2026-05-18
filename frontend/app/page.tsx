
'use client';

import { useState, useEffect } from 'react';

interface JobRequest {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  contactName: string;
  urgency: string;
  status: 'Open' | 'In Progress' | 'Closed';
  createdAt: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<JobRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      console.log('API Response:', data);
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setJobs(data);
      } else if (data && typeof data === 'object') {
        // Handle case where response is wrapped in an object
        setJobs(data.data || data.jobs || []);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(jobId: string, newStatus: 'Open' | 'In Progress' | 'Closed') {
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setJobs(jobs.map(job => 
          job._id === jobId ? { ...job, status: newStatus } : job
        ));
      }
    } catch (error) {
      console.error('Failed to update job status:', error);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <p>Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col px-10 py-10 items-center leading-6 gap-4">
      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs available</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="border p-3 rounded-xl text-[0.9rem] w-full max-w-2xl">
            <div className="flex justify-between mb-2">
              <h3 className="text-[1.1rem] font-semibold">{job.title}</h3>
              <p className={`border rounded px-2 py-1 text-xs font-semibold ${getStatusColor(job.status)}`}>
                {job.status}
              </p>
            </div>

            <div className="flex gap-2 mb-3 text-[0.85rem]">
              {job.category && <span className="bg-gray-100 px-2 py-1 rounded">{job.category}</span>}
              {job.location && <span className="bg-gray-100 px-2 py-1 rounded">{job.location}</span>}
              {job.urgency && <span className="bg-gray-100 px-2 py-1 rounded">{job.urgency}</span>}
              {job.contactName && <span className="bg-gray-100 px-2 py-1 rounded">by {job.contactName}</span>}
            </div>

            <p className="max-w-2xl mb-4 text-[0.8rem] text-gray-700">{job.description}</p>

            <div className="flex gap-2">
              <button
                onClick={() => handleStatusChange(job._id, 'In Progress')}
                className={`border px-3 py-1 rounded text-sm ${job.status === 'In Progress' ? 'bg-blue-100' : ''}`}
              >
                Start
              </button>
              <button
                onClick={() => handleStatusChange(job._id, 'Closed')}
                className={`border px-3 py-1 rounded text-sm ${job.status === 'Closed' ? 'bg-gray-200' : ''}`}
              >
                Complete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
