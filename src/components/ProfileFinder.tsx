import { FC, FormEvent, useState } from "react";
import axios from "axios";

import { GitHubProfile } from "../types/GitHubProfile";

export const ProfileFinder: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setProfile(null);
    try {
      const response = await axios.get<GitHubProfile>(
        `https://api.github.com/users/${username}`
      );
      setProfile(response.data);
      setUsername("");
    } catch (error) {
      setError("Profile not found!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <video
        src="/earth.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg bg-customDarkBlue rounded-lg shadow-md p-6 space-y-6">
          <h1 className="text-3xl font-bold text-center text-white">
            GitHub Profile Finder
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 transition duration-300"
            />
            <button
              type="submit"
              disabled={!username}
              className={`w-full py-2 text-white font-bold rounded-lg transition-colors duration-300 ${
                username
                  ? "bg-customNormBlue hover:bg-customHoverBlue"
                  : "bg-gray-700 cursor-not-allowed"
              }`}
            >
              Search
            </button>
          </form>

          {loading && (
            <div className="loading-container">
              <div className="dot">.</div>
              <div className="dot">.</div>
              <div className="dot">.</div>
            </div>
          )}

          {error && (
            <p className="text-center text-red-500 animate-bounce">{error}</p>
          )}

          {profile && (
            <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg shadow-lg">
              <img
                src={profile.avatar_url}
                alt="profile image"
                className="w-32 h-32 rounded-full mx-auto"
              />
              <h2 className="text-xl font-bold text-center">{profile.name}</h2>
              <p className="text-center text-gray-600">{profile.bio}</p>
              <p className="text-center text-gray-700">
                <span className="font-semibold">Followers:</span>{" "}
                {profile.followers} |{" "}
                <span className="font-semibold">Following:</span>{" "}
                {profile.following}
              </p>
              <p className="text-center text-gray-700">
                <span className="font-semibold">Public Repos:</span>{" "}
                {profile.public_repos}
              </p>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-customNormBlue font-semibold hover:underline"
              >
                View Profile on GitHub
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
