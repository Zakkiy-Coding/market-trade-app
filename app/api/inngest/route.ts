import {serve} from "inngest/next";
import {inngest} from "@/lib/inngest/client";
import {sendSignUpEmail} from "@/lib/inngest/functions";

// export const runtime = "edge";

export const {GET, POST, PUT} = serve({
    client: inngest,
    functions: [sendSignUpEmail],
});
