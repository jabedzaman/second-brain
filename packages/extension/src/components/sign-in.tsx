import * as React from "react"

import { authClient } from "~/lib/auth"

export const SignIn = () => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const handleSignIn = async () => {
    setLoading(true)
    try {
      const { data } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/success"
      })
      if (data?.url) {
        chrome.tabs.create({ url: data.url })
      }
    } catch (error) {
      alert("Sign-in failed.")
    } finally {
      setLoading(false)
    }
  }
  return (
    <button onClick={handleSignIn} disabled={loading}>
      {loading ? "Signing In..." : "Sign In"}
    </button>
  )
}
