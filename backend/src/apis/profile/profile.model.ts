import { z } from 'zod/v4'
import {sql} from "../../utils/database.utils.ts";

/**
 * Schema for validating private profile objects
 * @shape id: string the primary key for the profile
 * @shape about: string | null the about section for the profile
 * @shape activationToken: string | null the activation token for the profile
 * @shape email: string the email for the profile
 * @shape hash: string the password hash for the profile
 * @shape imageUrl: string  the image URL for the profile
 * @shape name: string the name for the profile
 */
export const PrivateProfileSchema = z.object({
	id: z.uuidv7('Please provide a valid uuid for id'),
	about: z.string('Please provide a valid profile about')
		.max(512, 'please provide a valid about (max 512 characters)' )
		.trim()
		.nullable(),
	activationToken: z.string('Please provide a valid activationToken')
		.length(32,  'profile activation token must be 32 characters' )
		.nullable(),
	email: z
		.email('please provide a valid email')
		.max(128, 'please provide a valid email (max 128 characters)' ),
	hash: z.string('Please provide a valid hash')
		.length(97, { message: 'profile hash must be 97 characters' }),
	imageUrl:z.url('please provide a valid profile image url' )
		.max(255, { message: 'please provide a valid imageUrl (max 255 characters)' })
		.trim(),
	name: z.string('Please provide a valid name')
		.trim()
		.min(1,  'please provide a valid name (min 1 characters)' )
		.max(32, 'please provide a valid name (max 32 characters)' )
})


/**
 * Schema for validating public profile objects
 * @shape id: string the primary key for the profile
 * @shape about: string | null the about section for the profile
 * @shape imageUrl: string | null the image URL for the profile
 * @shape name: string the name for the profile
 */
export const PublicProfileSchema = PrivateProfileSchema.omit({hash: true, activationToken: true, email: true})

/**
 * this type is used to represent a private profile object
 * @shape id: string the primary key for the profile
 * @shape about: string | null the about section for the profile
 * @shape activationToken: string | null the activation token for the profile
 * @shape email: string the email for the profile
 * @shape hash: string the password hash for the profile
 * @shape imageUrl: string the image URL for the profile
 * @shape name: string the name for the profile
 */
export type PrivateProfile = z.infer<typeof PrivateProfileSchema>

/**
 * this type is used to represent a public profile object
 * @shape id: string the primary key for the profile
 * @shape about: string | null the about section for the profile
 * @shape imageUrl: string the image URL for the profile
 * @shape name: string the name for the profile
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
	const { about, activationToken, email, hash, imageUrl, name, id } = profile
	await sql`INSERT INTO profile(id, about, activation_token, email, hash, image_url, name) VALUES (${id} , ${about}, ${activationToken}, ${email}, ${hash}, ${imageUrl}, ${name})`
	return 'Profile Successfully Created'
}

/**
 * Selects a profile from the profile table by activationToken
 * @param activationToken the profile's activation token to search for in the profile table
 * @returns Profile or null if no profile was found
 */
export async function selectPrivateProfileByProfileActivationToken (activationToken: string): Promise<PrivateProfile|null> {

	const rowList = await sql`SELECT id, about, activation_token, email, hash, image_url, name FROM profile WHERE activation_token = ${activationToken}`
	const result = PrivateProfileSchema.array().max(1).parse(rowList)
	return result[0] ?? null
}

/**
 * updates a profile in the profile table
 * @param profile
 * @returns {Promise<string>} 'Profile successfully updated'
 */
export async function updateProfile (profile: PrivateProfile): Promise<string> {
	const { id, about, activationToken, email, hash, imageUrl, name } = profile
	await sql`UPDATE profile SET about = ${about}, activation_token = ${activationToken}, email = ${email}, hash = ${hash}, image_url = ${imageUrl}, name = ${name} WHERE id = ${id}`
	return 'Profile successfully updated'
}

/**
 * Selects the privateProfile from the profile table by email
 * @param email  the profile's email to search for in the profile table
 * @returns Profile or null if no profile was found
 */
export async function selectPrivateProfileByProfileEmail (email: string): Promise<PrivateProfile | null> {

	// create a prepared statement that selects the profile by email and execute the statement
	const rowList =  await sql`SELECT id, about, activation_token, email, hash, image_url, name FROM profile WHERE email = ${email}`

	//enforce that the result is an array of one profile, or null
	const result = PrivateProfileSchema.array().max(1).parse(rowList)

	// return the profile or null if no profile was found
	return result[0] ?? null
}

/**
 * selects the publicProfile from the profile table by id
 * @param id the profile's id to search for in the profile table
 * @returns Profile or null if no profile was found
 **/
export async function selectPublicProfileByProfileId (id: string): Promise<PublicProfile | null> {

	// create a prepared statement that selects the profile by id and execute the statement
	const rowList = await sql`SELECT id, about, image_url, name FROM profile WHERE id = ${id}`

	// enforce that the result is an array of one profile, or null
	const result = PublicProfileSchema.array().max(1).parse(rowList)

	// return the profile or null if no profile was found
	return  result[0] ?? null
}

/**
 * selects the publicProfile from the profile table by name
 * @param name the profile's name to search for in the profile table
 * @returns {PublicProfile | null} if no profile was found
 */
export async function selectPublicProfileByProfileName(name: string): Promise<PublicProfile | null> {

	// create a prepared statement that selects the profile by name and execute the statement
	const rowList = await sql`SELECT id, about, image_url, name FROM profile WHERE name = ${name}`

	// enforce that the result is an array of one profile, or null
	const result = PublicProfileSchema.array().max(1).parse(rowList)

	// return the profile or null if no profile was found
	return result[0] ?? null
}

/**
 * selects a list of profiles from the profile table by name
 * @param name the profile's name to search for in the profile table
 * @returns an array of profiles
 **/

export async function selectPublicProfilesByProfileName(name: string): Promise<PublicProfile[]> {

	// format name to include wildcards
	const nameWithWildcards = `%${name}%`

	// create a prepared statement that selects profiles by name and execute the statement
	const rowList = await sql`SELECT id, about, image_url, name FROM profile WHERE name LIKE ${nameWithWildcards}`

	return PublicProfileSchema.array().parse(rowList)
}

/**
 * selects the privateProfile from the profile table by id
 * @param id the profile's id to search for in the profile table
 * @returns PrivateProfile or null if no profile was found
 */
export async function selectPrivateProfileByProfileId(id: string): Promise<PrivateProfile | null> {

	// create a prepared statement that selects the profile by id and execute the statement
	const rowList = await sql`SELECT id, about, activation_token, email, hash, image_url, name FROM profile WHERE id = ${id}`

// enforce that the result is an array of one profile, or null
	const result = PrivateProfileSchema.array().max(1).parse(rowList)

	// return the profile or null if no profile was found
	return result[0] ?? null
}

/**
 * Selects followers of a profile by id
 * @param id the profile's id to search for in the profile table
 * @return an array of profiles that are following the profile
 */

export async function selectPublicFollowersByProfileId (id: string): Promise<PublicProfile[]> {
	const rowList = await sql`SELECT profile.id, profile.about, profile.image_url, profile.name FROM profile inner join follow on profile.id = follow.follower_id WHERE following_id = ${id}`
	// enforce that the result is an array of profiles
	return PublicProfileSchema.array().parse(rowList)
}

/**
 * Selects all the profiles a profile is following by id
 * @param id the profile's id to search for in the profile table
 * @return an array of profiles that the profile is following
 **/

export async function selectPublicFollowingByProfileId (id: string): Promise<PublicProfile[]> {
	const rowList = await sql`SELECT profile.id, profile.about, profile.image_url, profile.name FROM profile inner join follow on profile.id = follow.following_id WHERE follower_id = ${id}`

	// enforce that the result is an array of profiles
	return PublicProfileSchema.array().parse(rowList)
}




