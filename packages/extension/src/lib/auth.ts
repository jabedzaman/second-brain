import { createAuthClient } from "better-auth/react"

import { API_URL } from "./CONSTS"

export const authClient = createAuthClient({ baseURL: API_URL, plugins: [] })
