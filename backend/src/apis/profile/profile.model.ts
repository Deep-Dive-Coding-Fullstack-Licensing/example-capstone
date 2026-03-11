import { z } from 'zod/v4'
import {sql} from "../../utils/database.utils.ts";

/**
 * Schema for validating private profile objects
 * @shape profileId: string the primary key for the profile
 * @shape profileAbout: string | null the about section for the profile
 * @shape profileActivationToken: string | null the activation token for the profile
 * @shape profileEmail: string the email for the profile
 * @shape profileHash: string the password hash for the profile
 * @shape profileImageUrl: string  the image URL for the profile
 * @shape profileName: string the name for the profile
 */
export const PrivateProfileSchema = z.object({
	profileId: z.uuidv7('Please provide a valid uuid for profileId'),
	profileAbout: z.string('Please provide a valid profile about')
		.max(512, 'please provide a valid profileAbout (max 512 characters)' )
		.trim()
		.nullable(),
	profileActivationToken: z.string('Please provide a valid profileActivationToken')
		.length(32,  'profile activation token must be 32 characters' )
		.nullable(),
	profileEmail: z
		.email('please provide a valid email')
		.max(128, 'please provide a valid profileEmail (max 128 characters)' ),
	profileHash: z.string('Please provide a valid profileHash')
		.length(97, { message: 'profile hash must be 97 characters' }),
	profileImageUrl:z.url('please provide a valid profile image url' )
		.max(255, { message: 'please provide a valid profileImageUrl (max 255 characters)' })
		.trim(),
	profileName: z.string('Please provide a valid profileName')
		.trim()
		.min(1,  'please provide a valid profileName (min 1 characters)' )
		.max(32, 'please provide a valid profileName (max 32 characters)' )
})


/**
 * Schema for validating public profile objects
 * @shape profileId: string the primary key for the profile
 * @shape profileAbout: string | null the about section for the profile
 * @shape profileImageUrl: string | null the image URL for the profile
 * @shape profileName: string the name for the profile
 */
export const PublicProfileSchema = PrivateProfileSchema.omit({profileHash: true, profileActivationToken: true, profileEmail: true})

/**
 * this type is used to represent a private profile object
 * @shape profileId: string the primary key for the profile
 * @shape profileAbout: string | null the about section for the profile
 * @shape profileActivationToken: string | null the activation token for the profile
 * @shape profileEmail: string the email for the profile
 * @shape profileHash: string the password hash for the profile
 * @shape profileImageUrl: string the image URL for the profile
 * @shape profileName: string the name for the profile
 */
export type PrivateProfile = z.infer<typeof PrivateProfileSchema>

/**
 * this type is used to represent a public profile object
 * @shape profileId: string the primary key for the profile
 * @shape profileAbout: string | null the about section for the profile
 * @shape profileImageUrl: string the image URL for the profile
 * @shape profileName: string the name for the profile
 **/
export type PublicProfile = z.infer<typeof PublicProfileSchema>

/**
 * Inserts a new profile into the profile table
 * @param profile the profile to insert
 * @returns "profile successfully created"
 */
export async function insertProfile (profile: PrivateProfile): Promise<string> {
	// validate the profile object against the PrivateProfileSchema
	PrivateProfileSchema.parse(profile)
	//
	const { profileAbout, profileActivationToken, profileEmail, profileHash, profileImageUrl, profileName, profileId } = profile
	await sql`INSERT INTO profile(profile_id, profile_about, profile_activation_token, profile_email, profile_hash, profile_image_url, profile_name) VALUES (${profileId} , ${profileAbout}, ${profileActivationToken}, ${profileEmail}, ${profileHash}, ${profileImageUrl}, ${profileName})`
	return 'Profile Successfully Created'
}
