import {PrivateProfileSchema} from "../profile/profile.model.ts";
import {z} from "zod/v4";

/**
 * The shape of the data that comes from the client when signing up
 * @property profileId {string} the primary key for the profile
 * @property profileEmail {string} the email for the profile
 * @property profilePasswordConfirm {string} the password confirmation
 * @property profilePassword {string} the password
 */
export const SignUpProfileSchema = PrivateProfileSchema
	.omit({  profileHash: true, profileActivationToken: true, profileImageUrl: true, profileAbout: true })
	.extend({
		profilePasswordConfirm: z.string('password confirmation is required')
			.min(8, 'password confirm cannot be less than 8 characters' )
			.max(32, 'profile password ' ),
		profilePassword: z.string('password is required')
			.min(8,  'profile password cannot be less than 8 characters' )
			.max(32,  'profile password cannot be over 32 characters' )
	})
	.refine(data => data.profilePassword === data.profilePasswordConfirm, {
		message: 'passwords do not match'
	})