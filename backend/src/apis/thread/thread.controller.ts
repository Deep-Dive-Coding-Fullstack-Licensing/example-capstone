import type { Request, Response } from 'express'
import { z } from 'zod/v4'
import {
	type Thread,
	insertThread,
	selectThreadByThreadId,
	selectThreadsByProfileId,
	selectThreadsByReplyThreadId,
	selectThreadsByFollowing,
	selectThreadsByKeyword,
	searchThreadsByContent,
	deleteThread,
	ThreadSchema
} from './thread.model.ts'
import { zodErrorResponse, serverErrorResponse } from '../../utils/response.utils.ts'
import type { Status } from '../../utils/interfaces/Status'

/**
 * Express controller for creating a new thread/tweet
 * @endpoint POST /apis/thread
 * @param request an object containing the body with thread data
 * @param response an object modeling the response that will be sent to the client
 * @returns response to the client indicating whether the thread creation was successful
 */
export async function postThreadController(request: Request, response: Response): Promise<void> {
	try {
		// validate the full thread object from the request body
		const validationResult = ThreadSchema.safeParse(request.body)

		// if the validation is unsuccessful, return a preformatted response to the client
		if (!validationResult.success) {
			zodErrorResponse(response, validationResult.error)
			return
		}

		// get the profile from the session
		const profile = request.session?.profile
		if (!profile) {
			response.json({ status: 401, message: 'Please login to create a thread', data: null })
			return
		}

		// validate that the profileId in the request matches the session profileId
		if (validationResult.data.profileId !== profile.id) {
			response.json({ status: 403, message: 'Profile ID in request does not match authenticated user', data: null })
			return
		}

		// insert the thread into the database
		const message = await insertThread(validationResult.data)

		// return success response
		const status: Status = {
			status: 200,
			message,
			data: null
		}
		response.json(status)
	} catch (error: any) {
		console.error(error)
		serverErrorResponse(response, error.message)
	}
}

/**
 * Express controller for getting a thread by its ID
 * @endpoint GET /apis/thread/:threadId
 * @param request an object containing the thread ID in params
 * @param response an object modeling the response that will be sent to the client
 * @returns response with the thread data or null if not found
 */
export async function getThreadByThreadIdController(request: Request, response: Response): Promise<void> {
	try {
		// validate the thread ID from params
		const validationResult = ThreadSchema.pick({ id: true }).safeParse({ id: request.params.threadId })

		if (!validationResult.success) {
			zodErrorResponse(response, validationResult.error)
			return
		}

		const { id } = validationResult.data

		// get the thread
		const thread: Thread | null = await selectThreadByThreadId(id)

		response.json({ status: 200, message: null, data: thread })
	} catch (error: any) {
		console.error(error)
		serverErrorResponse(response, error.message)
	}
}

/**
 * Express controller for getting threads by profile ID
 * @endpoint GET /apis/thread/profile/:profileId
 * @param request an object containing the profile ID in params
 * @param response an object modeling the response that will be sent to the client
 * @returns response with array of threads or error
 */
export async function getThreadsByProfileIdController(request: Request, response: Response): Promise<void> {
	try {
		// validate the profile ID from params
		const validationResult = z.object({ profileId: z.uuidv7('Please provide a valid profile id') })
			.safeParse({ profileId: request.params.profileId })

		if (!validationResult.success) {
			zodErrorResponse(response, validationResult.error)
			return
		}

		const { profileId } = validationResult.data

		// get threads by profile ID
		const threads: Thread[] = await selectThreadsByProfileId(profileId)

		response.json({ status: 200, message: null, data: threads })
	} catch (error: any) {
		console.error(error)
		serverErrorResponse(response, error.message)
	}
}

/**
 * Express controller for getting threads by reply thread ID (get all replies to a thread)
 * @endpoint GET /apis/thread/reply/:replyThreadId
 * @param request an object containing the reply thread ID in params
 * @param response an object modeling the response that will be sent to the client
 * @returns response with array of threads that are replies to the specified thread
 */
export async function getThreadsByReplyThreadIdController(request: Request, response: Response): Promise<void> {
	try {
		// validate the reply thread ID from params
		const validationResult = z.object({ replyThreadId: z.uuidv7('Please provide a valid reply thread id') })
			.safeParse({ replyThreadId: request.params.replyThreadId })

		if (!validationResult.success) {
			zodErrorResponse(response, validationResult.error)
			return
		}

		const { replyThreadId } = validationResult.data

		// get threads by reply thread ID
		const threads: Thread[] = await selectThreadsByReplyThreadId(replyThreadId)

		response.json({ status: 200, message: null, data: threads })
	} catch (error: any) {
		console.error(error)
		serverErrorResponse(response, error.message)
	}
}

/**
 * Express controller for getting recent threads from profiles the user is following
 * @endpoint GET /apis/thread/following
 * @param request an object containing the session with profile data
 * @param response an object modeling the response that will be sent to the client
 * @returns response with array of threads from followed profiles or error
 */
export async function getThreadsByFollowingController(request: Request, response: Response): Promise<void> {
	try {
		// get the profile from the session
		const profile = request.session?.profile
		if (!profile) {
			response.json({ status: 401, message: 'Please login to view your feed', data: null })
			return
		}

		// optional limit query parameter
		const limit = request.query.limit ? parseInt(request.query.limit as string) : 50

		// get threads from followed profiles
		const threads: Thread[] = await selectThreadsByFollowing(profile.id, limit)

		response.json({ status: 200, message: null, data: threads })
	} catch (error: any) {
		console.error(error)
		serverErrorResponse(response, error.message)
	}
}

/**
 * Express controller for getting threads by keyword/tag name
 * @endpoint GET /apis/thread/tag/:keyword
 * @param request an object containing the keyword in params
 * @param response an object modeling the response that will be sent to the client
 * @returns response with array of threads or error
 */
export async function getThreadsByKeywordController(request: Request, response: Response): Promise<void> {
	try {
		const keyword = request.params.keyword

		if (!keyword || keyword.trim().length === 0) {
			response.json({ status: 400, message: 'Please provide a valid keyword', data: null })
			return
		}

		// optional limit query parameter
		const limit = request.query.limit ? parseInt(request.query.limit as string) : 50

		// get threads by keyword
		const threads: Thread[] = await selectThreadsByKeyword(keyword, limit)

		response.json({ status: 200, message: null, data: threads })
	} catch (error: any) {
		console.error(error)
		serverErrorResponse(response, error.message)
	}
}

/**
 * Express controller for searching threads by content
 * @endpoint GET /apis/thread/search
 * @param request an object containing the search query in query params
 * @param response an object modeling the response that will be sent to the client
 * @returns response with array of matching threads or error
 */
export async function searchThreadsController(request: Request, response: Response): Promise<void> {
	try {
		// validate the search query parameter using Zod
		const validationResult = z.object({
			q: z.string().min(1, 'Please provide a search term')
		}).safeParse({ q: request.query.q })

		if (!validationResult.success) {
			zodErrorResponse(response, validationResult.error)
			return
		}

		const { q: searchTerm } = validationResult.data

		// optional limit query parameter
		const limit = request.query.limit ? parseInt(request.query.limit as string) : 50

		// search threads by content
		const threads: Thread[] = await searchThreadsByContent(searchTerm, limit)

		response.json({ status: 200, message: null, data: threads })
	} catch (error: any) {
		console.error(error)
		serverErrorResponse(response, error.message)
	}
}

/**
 * Express controller for deleting a thread
 * @endpoint DELETE /apis/thread/:threadId
 * @param request an object containing the thread ID in params
 * @param response an object modeling the response that will be sent to the client
 * @returns response indicating success or error
 */
export async function deleteThreadController(request: Request, response: Response): Promise<void> {
	try {
		// validate the thread ID from params
		const validationResult = ThreadSchema.pick({ id: true }).safeParse({ id: request.params.threadId })

		if (!validationResult.success) {
			zodErrorResponse(response, validationResult.error)
			return
		}

		const { id } = validationResult.data

		// get the profile from the session
		const profile = request.session?.profile
		if (!profile) {
			response.json({ status: 401, message: 'Please login to delete a thread', data: null })
			return
		}

		// check if the thread exists and belongs to the user
		const thread = await selectThreadByThreadId(id)
		if (thread === null) {
			response.json({ status: 404, message: 'Thread not found', data: null })
			return
		}

		if (thread.profileId !== profile.id) {
			response.json({ status: 403, message: 'You can only delete your own threads', data: null })
			return
		}

		// delete the thread
		const message = await deleteThread(id)

		response.json({ status: 200, message, data: null })
	} catch (error: any) {
		console.error(error)
		serverErrorResponse(response, error.message)
	}
}