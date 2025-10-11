import "~/main.css"

import { SignIn } from "./components/sign-in"
import { Button } from "./components/ui/button"
import { authClient } from "./lib/auth"
import { axiosInstance } from "./lib/axios"

function IndexPopup() {
  const { data, isPending, error } = authClient.useSession()
  console.log({ data, isPending, error })

  const handleBookmark = async () => {
    // get the current tab URL
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    const url = tab?.url
    if (!url) return
    await axiosInstance.post("/bookmark", { url })
    window.close()
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center w-24 h-10">
        <Spinner />
      </div>
    )
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  if (data) {
    return (
      <div className="border px-2 py-2">
        <Button onClick={handleBookmark}>Bookmark</Button>
      </div>
    )
  }
  return <SignIn />
}

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
)

export default IndexPopup
