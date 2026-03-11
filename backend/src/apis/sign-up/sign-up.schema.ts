import {PrivateProfileSchema} from "../profile/profile.model.ts";
import {z} from "zod/v4";

/**
 * The shape of the data that comes from the client when signing up
 * @property id {string} the primary key for the profile
 * @property email {string} the email for the profile
 * @property passwordConfirm {string} the password confirmation
 * @property password {string} the password
 */
export const SignUpProfileSchema = PrivateProfileSchema
	.omit({  hash: true, activationToken: true, imageUrl: true, about: true })
	.extend({
		passwordConfirm: z.string('password confirmation is required')
			.min(8, 'password confirm cannot be less than 8 characters' )
			.max(32, 'profile password ' ),
		password: z.string('password is required')
			.min(8,  'profile password cannot be less than 8 characters' )
			.max(32,  'profile password cannot be over 32 characters' )
	})
	.refine(data => data.password === data.passwordConfirm, {
		message: 'passwords do not match'
	})