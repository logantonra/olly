import { email, object, string } from "valibot"
import { createSubjects } from "@openauthjs/openauth/subject"

export const subjects = createSubjects({
  user: object({
    id: string(),
    // name: string(),
    // email: email(),
    // location: string(),
  }),
})