import {z} from "zod"

export const phoneValidation = z.string().nonempty({ message: 'Phone number is required.' }).length(10,{message: 'Invalid phone number'})

export const signUpSchemaWithPhone = z.object({
    name : z.string().nonempty({ message: 'Name is required.' }).min(3,"Name must be atleast 3 characters").max(15,"Name must be no more than 15 chatracters"),
    phone: phoneValidation,
    verificationCode: z.string().length(6, { message: 'Verification code must be 6 digit' })
})