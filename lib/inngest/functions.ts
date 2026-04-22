import {inngest} from "@/lib/inngest/client";
import {PERSONALIZED_WELCOME_EMAIL_PROMPT} from "@/lib/inngest/prompts";

export const sendSignUpEmail = inngest.createFunction(
    { id: 'sign-up-email', triggers: [{ event: 'app/user.created' }] },
    async ({ event, step }) => {
        const { country, investmentGoals, riskTolerance, preferredIndustry } = event.data;

        const userProfile = `
            - Country: ${country || 'Unknown'}
            - Investment goals: ${investmentGoals || 'Unknown'}
            - Risk tolerance: ${riskTolerance || 'Unknown'}
            - Preferred industry: ${preferredIndustry || 'Unknown'}
        `

        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile)

        const response = await step.ai.infer('generate-welcome-intro', {
            model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }),
            body: {
                contents: [
                    {
                        role: 'user',
                        parts: [
                            { text: prompt }
                        ]
                    }]
            }
        })

        await step.run('send-welcome-email', async () => {
            const part = response.candidates?.[0]?.content?.parts?.[0];
            const introText = (part && 'text' in part ? part.text : null) ||'Thanks for joining Signalist. You now have the tools to track markets and make smarter moves.'

            const { email, name } = event.data;

            // @ts-ignore
            if (typeof sendWelcomeEmail === 'function') {
                // @ts-ignore
                return await sendWelcomeEmail({ email, name, intro: introText });
            }

            return {
                success: false,
                message: 'sendWelcomeEmail function is not defined'
            }
        })

        return {
            success: true,
            message: 'Welcome email process completed'
        }
    }
)
