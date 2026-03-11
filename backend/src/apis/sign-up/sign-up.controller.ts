import type { Request, Response } from 'express'
import { type Status } from '../../utils/interfaces/Status'
import formData from 'form-data'
import Mailgun from 'mailgun.js'
import { setActivationToken, setHash } from '../../utils/auth.utils'
import {type PrivateProfile, insertProfile } from '../profile/profile.model'
import { SignUpProfileSchema } from './sign-up.schema.ts'
import { zodErrorResponse } from '../../utils/response.utils'

/**
 * Express controller for sign-up
 * @endpoint POST /apis/sign-up/
 * @param request an object containing the body contain a name, email, password and passwordConfirm.
 * @param response an object modeling the response that will be sent to the client.
 * @returns response to the client indicating whether the sign up was successful or not
 * */
export async function signupProfileController (request: Request, response: Response) {
	try {
		// validate the new profile data coming from the request body
		const validationResult = SignUpProfileSchema.safeParse(request.body)
		// if the validation is unsuccessful, return a preformatted response to the client
		if (!validationResult.success) {
			zodErrorResponse(response, validationResult.error)
			return
		}

		// create a new mailgun client with the mailgun api key
		const mailgun: Mailgun = new Mailgun(formData)
		const mailgunClient = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY as string })

		// deconstruct the name, email and password from the request body
		const { name, email, password, id } = validationResult.data

		// hash the password
		const hash = await setHash(password)

		// create a new activationToken
		const activationToken = setActivationToken()

		// set a placeholder for imageUrl
		const imageUrl = 'https://res.cloudinary.com/cnm-ingenuity-deep-dive-bootcamp/image/upload/v1726159504/t32ematygvtcyz4ws9p5.png'

		// create a basePath variable containing the scheme, host, port, and base path
		const basePath: string = `${request.protocol}://${request.hostname}:8080${request.originalUrl}activation/${activationToken}`

		// create a message for the activation email body
		const message = `<h2>Welcome to Rethreads.</h2>
        <p>In order to start posting threads of cats you must confirm your account.</p>
        <p><a href="${basePath}">${basePath}</a></p>`

		// create a mailgun message object
		const mailgunMessage = {
			from: `Mailgun Sandbox <postmaster@${process.env.MAILGUN_DOMAIN as string}>`,
			to: email,
			subject: 'One step closer to Sticky Head -- Account Activation',
			html: message
		}
		// create a new profile object
		const profile: PrivateProfile = {
			id: id,
			about: null,
			activationToken,
			email,
			hash,
			name,
			imageUrl
		}

		// insert the new profile into the database
		await insertProfile(profile)

		// send the email
		await mailgunClient.messages.create(process.env.MAILGUN_DOMAIN as string, mailgunMessage)

		// create a status object to send back to the client
		const status: Status = {
			status: 200,
			message: 'Profile successfully created please check your email.',
			data: null
		}

		// send the status to the client
		response.status(200).json(status)

		// catch any errors that occurred during the signup process
	} catch (error: any) {
		const status: Status = {
			status: 500,
			message: error.message,
			data: null
		}

		response.status(200).json(status)
	}
}
