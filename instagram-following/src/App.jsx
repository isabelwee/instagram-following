import { useState } from 'react'

function App() {
  const [followingFile, setFollowingFile] = useState(null)
  const [followersFile, setFollowersFile] = useState(null)
  const [followingData, setFollowingData] = useState(null)
  const [followersData, setFollowersData] = useState(null)
  const [compareResult, setCompareResult] = useState(null)
  const [numNotFollowingBack, setNumNotFollowingBack] = useState(0)
  const [error, setError] = useState("")

  const handleFollowingUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type === "application/json") {
      setFollowingFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result)
          setFollowingData(json.relationships_following || [])
        } catch (err) {
          setError("Invalid Following JSON format")
          setFollowingData(null)
        }
      }
      reader.readAsText(file)
    } else {
      setFollowingFile(null)
      setFollowingData(null)
    }
  }

const handleFollowersUpload = (e) => {
  const file = e.target.files[0]
  if (file && file.type === "application/json") {
    setFollowersFile(file)
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result)
        // followers file is an array, extract username from string_list_data[0].value
        const usernames = json
          .map(item => item.string_list_data?.[0]?.value)
          .filter(Boolean)
        setFollowersData(usernames)
      } catch (err) {
        setError("Invalid Followers JSON format")
        setFollowersData(null)
      }
    }
    reader.readAsText(file)
  } else {
    setFollowersFile(null)
    setFollowersData(null)
  }
}

  const handleCompare = () => {
    setError("")
    if (!followingData || !followersData) {
      setError("Please upload both files.")
      return
    }
    // Get usernames
    const followingUsernames = new Set(followingData.map(u => u.title))
    const followersUsernames = new Set(followersData)

    console.log('Following Usernames:', followingUsernames)
    console.log('Followers Usernames:', followersUsernames)

    // Not following you back
    const notFollowingBack = [...followingUsernames].filter(u => !followersUsernames.has(u))
    setNumNotFollowingBack(notFollowingBack.length)

    setCompareResult({
      notFollowingBack,
      // notFollowedBack
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Instagram Following Upload */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <label className="font-semibold mb-2">Upload Instagram Following (JSON)</label>
          <input
            type="file"
            accept=".json,application/json"
            onChange={handleFollowingUpload}
            className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {followingFile && (
            <span className="mt-2 text-green-600 text-sm">
              Uploaded: {followingFile.name}
            </span>
          )}
        </div>

        {/* Instagram Followers Upload */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <label className="font-semibold mb-2">Upload Instagram Followers (JSON)</label>
          <input
            type="file"
            accept=".json,application/json"
            onChange={handleFollowersUpload}
            className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
          {followersFile && (
            <span className="mt-2 text-green-600 text-sm">
              Uploaded: {followersFile.name}
            </span>
          )}
        </div>

        {/* Compare Button */}
        <button
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
          disabled={!followingData || !followersData}
          onClick={handleCompare}
        >
          Compare Followers
        </button>

        {/* Error */}
        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}

        {/* Results */}
        {compareResult && (
          <div className="bg-white rounded-lg shadow p-6 mt-4">
            <h2 className="font-bold text-lg mb-2 text-indigo-700">Not Following You Back ({numNotFollowingBack} accounts)</h2>
            {compareResult.notFollowingBack.length === 0 ? (
              <div className="text-gray-500 mb-4">Everyone you follow follows you back!</div>
            ) : (
              <ul className="mb-4 list-disc list-inside">
                {compareResult.notFollowingBack.map(u => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App