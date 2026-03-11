import type {Request, Response} from "express";
import {
	type PrivateProfile,
	PublicProfileSchema,
	selectPrivateProfileByProfileId,
	selectPublicFollowersByProfileId,
	selectPublicFollowingByProfileId,
	selectPublicProfileByProfileId,
	selectPublicProfileByProfileName,
	selectPublicProfilesByProfileName,
	updateProfile
} from "./profile.model.ts";
import {serverErrorResponse, zodErrorResponse} from "../../utils/response.utils.ts";
import {generateJwt} from "../../utils/auth.utils.ts";
import pkg from 'jsonwebtoken'

const {verify} = pkg
/**
 * Express controller for getting the public profile by id
 * @param request from the client to the server to get all threads by thread profile id
 * @param response from the server to the client with all threads by thread profile id or an error message
 * @return  A promise containing the response for the client with the requested information,
 * or null if the information could not be found, set to the data field.
 */
export async function getPublicProfileByProfileIdController(request: Request, response: Response) : Promise<void> {
	try {

		// validate the id coming from the request parameters
		const validationResult = PublicProfileSchema.pick({id: true}).safeParse(request.params)

		// if the validation is unsuccessful, return a preformatted response to the client
		if (!validationResult.success) {
			zodErrorResponse(response, validationResult.error)
			return
		}

		//grab the id off of the validated request parameters
		const {id} = validationResult.data

		// grab the profile by id
		const data= await selectPublicProfileByProfileId(id)

		// return the response to the client with the requested information
		response.json({status: 200, message: null, data})
	} catch (error: unknown) {
		console.error(error)
		// if an error occurs, return a preformatted response to the client
		serverErrorResponse(response, null)
	}
}


/**
 * Express controller for getting the public profile by name
 * `
 * @param request from the client to the server to get all  by thread profile id
 * @param response from the server to the client with all threads by thread profile id or an error message
 * @return A promise containing the response for the client with the requested information,
 * or null if the information could not be found, set to the data field.
 */

export async function getPublicProfileByProfileNameController(request: Request, response: Response): Promise<void> {
	try {

		// validate the name coming from the request parameters
		const validationResult = PublicProfileSchema.pick({name: true}).safeParse(request.params)

		// if the validation is unsuccessful, return a preformatted response to the client
		if (!validationResult.success) {
			zodErrorResponse(response, validationResult.error)
			return
		}

		// grab the name off of the validated request parameters
		const {name} = validationResult.data

		// grab the profile by name
		const data= await selectPublicProfileByProfileName(name)

		// return the response to the client with the requested information
		response.json({status: 200, message: null, data})

	} catch (error: unknown) {

		console.error(error)
		// if an error occurs, return a preformatted response to the client
		serverErrorResponse(response, null)
	}
}

export async function getPublicProfilesByProfileNameController(request: Request, response: Response) : Promise<void>  {
	try {

		// validate the name coming from the request parameters
		const validationResult = PublicProfileSchema.pick({name: true}).safeParse(request.params)

		// if the validation is unsuccessful, return a preformatted response to the client
		if (!validationResult.success) {
			 zodErrorResponse(response, validationResult.error)
			return
		}

		// grab the name off of the validated request parameters
		const {name} = validationResult.data

		// grab the profile by name
		const data = await selectPublicProfilesByProfileName(name)

		// return the response to the client with the requested information
		 response.json({status: 200, message: null, data})

	} catch (error: unknown) {
		console.error(error)
		// if an error occurs, return a preformatted response to the client
		serverErrorResponse(response, [])
	}
}


export async function putProfileController(request: Request, response: Response): Promise<void> {
	try {


		//validate the updated profile data coming from the request body
		const validationResultForRequestBody = PublicProfileSchema.safeParse(request.body)

		// if the validation of the body is unsuccessful, return a preformatted response to the client
		if(!validationResultForRequestBody.success) {
			zodErrorResponse(response, validationResultForRequestBody.error)
			return
		}

		// validate the id coming from the request parameters
		const validationResultForRequestParams = PublicProfileSchema.pick({id: true}).safeParse(request.params)

		// if the validation of the params is unsuccessful, return a preformatted response to the client
		if(!validationResultForRequestParams.success) {
			zodErrorResponse(response, validationResultForRequestParams.error)
			return
		}

		//grab the id from the session
		const profileFromSession = request.session?.profile
		const idFromSession = profileFromSession?.id

		//grab the id off of the validated request parameters
		const {id} = validationResultForRequestParams.data

		if (idFromSession !== id) {
			response.json({status: 400, message: "you cannot update a profile that is not yours", data: null})
			return
		}

		//grab the profile data off of the validated request body
		const {about, imageUrl, name} = validationResultForRequestBody.data

		//grab the profile by id
		const profile: PrivateProfile|null = await selectPrivateProfileByProfileId(id)


		//if the profile does not exist, return a preformatted response to the client
		if(profile === null) {
			 response.json({status: 400, message: "profile does not exist", data: null})
			return
		}

		//update the profile with the new data
		profile.about = about
		profile.imageUrl = imageUrl
		profile.name = name

		//update the profile in the database
		await updateProfile(profile)



		//reissue the jwt token with the updated profile
		const jwt = request.session.jwt ?? ''

		//grab the signature off of the session
		const signature = request.session.signature ?? ''

		//if the jwt token or signature are undefined return a preformatted response to the client
		const parsedJwt = verify(jwt, signature)

		if (typeof parsedJwt === 'string') {
			response.json({status: 400, message: "invalid jwt token", data: null})
			return
		}

		//update the parsed jwt token with the updated profile
		parsedJwt.auth = {
			id: profile.id,
			about: profile.about,
			imageUrl: profile.imageUrl,
			name: profile.name
		}

		//generate a new jwt token with the updated profile
		const newJwt = generateJwt(parsedJwt.auth, signature)

		//refresh the session profile with the updated profile
		request.session.profile = {
			id: profile.id,
			about: profile.about,
			imageUrl: profile.imageUrl,
			name: profile.name
		}

		//set the new jwt token in the session
		request.session.jwt = newJwt
		//set the authorization header with the new jwt token
		response.header({
			authorization: newJwt
		})

		//return a response to the client with a success message
	 response.json({status: 200, message: "profile successfully updated", data: null})


	} catch (error: unknown) {
		// if an error occurs, return a preformatted response to the client
		 response.json({status: 500,message: "internal server error", data: null})
	}
}

/**
 * Express controller for getting all the followers of a profile
 * @param request from the client to the server to get all followers of a profile
 * @param response from the server to the client with all followers of a profile or an error message
 * @return a promise containing the response with all followers of a profile, or an error message if the profile does not exist
 */

export async function getFollowersByProfileIdController(request: Request, response: Response): Promise<void> {
	try {

		// validate the id coming from the request parameters
		const validationResult = PublicProfileSchema.pick({id: true}).safeParse(request.params)

		// if the validation is unsuccessful, return a preformatted response to the client
		if (!validationResult.success) {
			zodErrorResponse(response, validationResult.error)
			return
		}

		// grab the id off of the validated request parameters
		const {id} = validationResult.data

		// grab the followers by id
		const data = await selectPublicFollowersByProfileId(id)

		// if the profile does not exist, return a preformatted response to the client
		if (data === null) {
			response.json({status: 400, message: "profile does not exist", data: null})
			return
		}

		// return the response to the client with the requested information
		 response.json({status: 200, message: null, data: data})

	} catch (error: unknown) {
		console.error(error)
		// if an error occurs, return a preformatted response to the client
		 serverErrorResponse(response, null)
	}
}

/**
 * Express controller for getting all the followings of a profile
 * @param request from the client to the server to get all followings of a profile
 * @param response from the server to the client with all followings of a profile or an error message
 * @return a promise containing the response with all followings of a profile, or an error message if the profile does not exist
 */
export async function getFollowingsByProfileIdController(request: Request, response: Response): Promise<void> {
	try {

		// validate the id coming from the request parameters
		const validationResult = PublicProfileSchema.pick({id: true}).safeParse(request.params)

		// if the validation is unsuccessful, return a preformatted response to the client
		if (!validationResult.success) {
			zodErrorResponse(response, validationResult.error)
			return
		}

		// grab the id off of the validated request parameters
		const {id} = validationResult.data

		// grab the followings by id
		const data = await selectPublicFollowingByProfileId(id)

		// if the profile does not exist, return a preformatted response to the client
		if (data === null) {
			response.json({status: 400, message: "profile does not exist", data: null})
			return
		}

		// return the response to the client with the requested information
		 response.json({status: 200, message: null, data})

	} catch (error: unknown) {
		console.error(error)
		// if an error occurs, return a preformatted response to the client
		 serverErrorResponse(response, null)
	}
}


