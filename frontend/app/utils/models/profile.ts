import {z} from "zod/v4";

/**
 * Schema for validating profile objects
 * @shape profileId: string the primary key for the profile
 * @shape profileAbout: string | null the about section for the profile
 * @shape profileActivationToken: string | null the activation token for the profile
 * @shape profileEmail: string the email for the profile
 * @shape profileHash: string the password hash for the profile
 * @shape profileImageUrl: string  the image URL for the profile
 * @shape profileName: string the name for the profile
 */
export const ProfileSchema = z.object({
	profileId: z.uuidv7('Please provide a valid uuid for profileId'),
	profileAbout: z.string('Please provide a valid profile about')
		.max(512, 'please provide a valid profileAbout (max 512 characters)' )
		.trim()
		.nullable(),
	profileImageUrl:z.url('please provide a valid profile image url' )
		.max(255, { message: 'please provide a valid profileImageUrl (max 255 characters)' })
		.trim(),
	profileName: z.string('Please provide a valid profileName')
		.trim()
		.min(1,  'please provide a valid profileName (min 1 characters)' )
		.max(32, 'please provide a valid profileName (max 32 characters)' )
})

export type Profile = z.infer <typeof ProfileSchema>