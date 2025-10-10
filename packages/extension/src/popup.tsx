import { authClient } from "~/auth/client"

import "~/main.css"

import { SignIn } from "./components/sign-in"
import { Button } from "./components/ui/button"

function IndexPopup() {
  const { data, isPending, error } = authClient.useSession()
  console.log({ data, isPending, error })

  const handleBookmark = async () => {
    // get the current tab URL
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    const url = tab?.url
    if (!url) return
    const res = await fetch("http://localhost:3000/api/bookmark", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    })
    const result = await res.json()
    console.log(result)
    // dismiss the popup
    window.close()
  }

  if (isPending) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  if (data) {
    return (
      <div className="rounded-md border p-4">
        <Button onClick={handleBookmark}>Bookmark Current Page</Button>
      </div>
    )
  }
  return (
    <div>
      <SignIn />
    </div>
  )
}
export default IndexPopup
