import { authClient } from "~/auth/client"

import "~/main.css"

import { SignIn } from "./components/sign-in"
import { Button } from "./components/ui/button"

function IndexPopup() {
  const { data, isPending, error } = authClient.useSession()
  console.log({ data, isPending, error })

  const handleBookmark = () => {
    if (data) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0]
        if (activeTab && activeTab.url) {
          alert(`Bookmarked: ${activeTab.url}`)
        }
      })
    }
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
