import { useEffect, useState } from "react";

// Debug panel to check user authentication state
// Add this temporarily to help debug user type detection
function UserDebugPanel() {
  const [userData, setUserData] = useState(null);
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    // Get all auth-related data from localStorage
    const data = {
      isLoggedIn: localStorage.getItem("isLoggedIn"),
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
      user: localStorage.getItem("user"),
      userData: localStorage.getItem("userData"),
    };

    setTokens({
      isLoggedIn: data.isLoggedIn,
      hasAccessToken: !!data.accessToken,
      hasRefreshToken: !!data.refreshToken,
    });

    // Parse user data
    try {
      const parsedUser = JSON.parse(data.user || data.userData || "{}");
      setUserData(parsedUser);
    } catch (err) {
      console.error("Error parsing user data:", err);
      setUserData(null);
    }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <div className="bg-slate-900 border-2 border-blue-500 rounded-lg p-4 shadow-2xl">
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          🔍 User Debug Panel
        </h3>

        <div className="space-y-2 text-sm">
          <div className="bg-slate-800 p-2 rounded">
            <p className="text-slate-400">Login Status:</p>
            <p className={`font-semibold ${tokens?.isLoggedIn === "true" ? "text-green-400" : "text-red-400"}`}>
              {tokens?.isLoggedIn === "true" ? "✅ Logged In" : "❌ Not Logged In"}
            </p>
          </div>

          <div className="bg-slate-800 p-2 rounded">
            <p className="text-slate-400">Tokens:</p>
            <p className="text-white text-xs">
              Access: {tokens?.hasAccessToken ? "✅ Present" : "❌ Missing"}
              <br />
              Refresh: {tokens?.hasRefreshToken ? "✅ Present" : "❌ Missing"}
            </p>
          </div>

          {userData && (
            <>
              <div className="bg-slate-800 p-2 rounded">
                <p className="text-slate-400">User Type:</p>
                <p className={`font-bold ${
                  userData.typeOfCustomer === "Owner" ? "text-purple-400" : "text-blue-400"
                }`}>
                  {userData.typeOfCustomer || "❌ Not Set"}
                </p>
              </div>

              <div className="bg-slate-800 p-2 rounded">
                <p className="text-slate-400">Owner ID:</p>
                <p className={`font-semibold ${userData.ownerID ? "text-green-400" : "text-red-400"}`}>
                  {userData.ownerID ? `✅ ${userData.ownerID}` : "❌ Not an Owner"}
                </p>
              </div>

              <div className="bg-slate-800 p-2 rounded">
                <p className="text-slate-400">Username:</p>
                <p className="text-white font-semibold">{userData.username || "N/A"}</p>
              </div>

              <div className="bg-slate-800 p-2 rounded">
                <p className="text-slate-400">Email:</p>
                <p className="text-white text-xs">{userData.email || "N/A"}</p>
              </div>
            </>
          )}

          {!userData && (
            <div className="bg-red-900/20 border border-red-500/50 p-2 rounded">
              <p className="text-red-400 text-xs">⚠️ No user data found in localStorage</p>
            </div>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-slate-700">
          <p className="text-xs text-slate-500 text-center">
            This panel helps debug user authentication
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserDebugPanel;
